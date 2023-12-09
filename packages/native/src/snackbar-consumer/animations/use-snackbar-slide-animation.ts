import {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useCallback, useRef } from "react";
import {
  LayoutChangeEvent,
  LayoutRectangle,
  useWindowDimensions,
} from "react-native";
import {
  getEffectiveSlideFromPosition,
  getRelativeStartPosition,
  RelativePosition,
  SnackbarConfig,
} from "@react-stateless-dialog/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture } from "react-native-gesture-handler";
import { UseSnackbarAnimationResult } from "./use-snackbar-animation";

const INITIAL_OFFSET = -100000;
const ANIMATION_DURATION = 300;

const selectAxis = (
  direction: RelativePosition,
  axis: { x: number; y: number }
) => {
  return direction === "right" || direction === "left" ? axis.x : axis.y;
};

/**
 * Return true if the translation go in the same direction as direction params.
 * @param direction
 * @param translation
 */
const isSameDirection = (direction: RelativePosition, translation: number) => {
  if (direction === "top" || direction === "left") {
    return translation < 0;
  } else {
    return translation > 0;
  }
};

export const useSnackbarSlideAnimation = (
  config: SnackbarConfig,
  destroy: () => void
): UseSnackbarAnimationResult => {
  const slideFrom = getEffectiveSlideFromPosition(
    config.slideFromPosition,
    config.vertical,
    config.horizontal,
    "top"
  );

  const status = useSharedValue<"starting" | "waiting" | "finishing">(
    undefined
  );
  const translateX = slideFrom === "left" || slideFrom === "right";
  const layout = useRef<LayoutRectangle>(undefined);
  const initialOffset = useRef<number>(undefined);
  const offset = useSharedValue(INITIAL_OFFSET);
  const winSize = useWindowDimensions();
  const safearea = useSafeAreaInsets();

  const swipeTranslation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: translateX
        ? [{ translateX: offset.value + swipeTranslation.value }]
        : [{ translateY: offset.value + swipeTranslation.value }],
      opacity: offset.value === INITIAL_OFFSET ? 0 : 1,
    };
  });

  const getCloseAnimation = useCallback(
    (isDelayed: boolean) => {
      function handleFinished(finished?: boolean) {
        "worklet";
        if (finished) {
          runOnJS(destroy)();
        }
      }

      const closeAnim = withTiming(
        initialOffset.current,
        { duration: ANIMATION_DURATION },
        handleFinished
      );

      if (isDelayed) {
        return withDelay(
          config.duration,
          withSequence(
            withTiming(0, { duration: 0 }, (finished) => {
              if (finished) {
                status.value = "finishing";
              }
            }),
            withTiming(
              initialOffset.current,
              { duration: ANIMATION_DURATION },
              handleFinished
            )
          )
        );
      } else {
        status.value = "finishing";
        return closeAnim;
      }
    },
    [config.duration]
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      console.log(`[${status.value}] OnLayout: `, event.nativeEvent.layout);
      layout.current = event.nativeEvent.layout;

      const startPosition = getRelativeStartPosition(
        slideFrom,
        config.vertical,
        config.horizontal,
        {
          width: layout.current.width,
          height: layout.current.height,
        },
        { width: winSize.width, height: winSize.height },
        config.insideSafeArea ? safearea : undefined
      );

      status.value = "starting";
      initialOffset.current = translateX ? startPosition.x : startPosition.y;
      offset.value = initialOffset.current;
      offset.value = withSequence(
        withTiming(0, { duration: ANIMATION_DURATION }, () => {
          status.value = "waiting";
        }),
        getCloseAnimation(true)
      );
    },
    [
      offset,
      config.duration,
      config.vertical,
      config.horizontal,
      destroy,
      slideFrom,
      translateX,
      getCloseAnimation,
    ]
  );

  const close = useCallback(
    (animated?: boolean) => {
      if (status.value && animated) {
        offset.value = getCloseAnimation(false);
      } else {
        destroy();
      }
    },
    [initialOffset]
  );

  const direction = slideFrom;
  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onStart(() => {
      if (status.value !== "waiting") {
        return;
      }
      cancelAnimation(offset);
    })
    .onUpdate((e) => {
      if (status.value !== "waiting") {
        return;
      }

      const translation = selectAxis(direction, {
        x: e.translationX,
        y: e.translationY,
      });

      if (isSameDirection(direction, translation)) {
        swipeTranslation.value = translation;
      } else {
        swipeTranslation.value = translation / 25;
      }
    })
    .onEnd((e) => {
      if (status.value !== "waiting") {
        return;
      }

      const translation = selectAxis(direction, {
        x: e.translationX,
        y: e.translationY,
      });

      const size = selectAxis(direction, {
        x: layout.current.width,
        y: layout.current.height,
      });

      if (
        isSameDirection(direction, translation) &&
        Math.abs(translation) > size * 0.2
      ) {
        swipeTranslation.value = 0;
        offset.value = offset.value + translation;
        offset.value = getCloseAnimation(false);
      } else {
        offset.value = offset.value + swipeTranslation.value;
        swipeTranslation.value = 0;

        function handleRestore() {
          offset.value = getCloseAnimation(true);
        }

        offset.value = withTiming(
          0,
          {
            duration: ANIMATION_DURATION * (1 - translation / size),
          },
          function () {
            "worklet";
            runOnJS(handleRestore)();
          }
        );
      }
    });

  return { animatedStyles, handleLayout, close, gesture };
};
