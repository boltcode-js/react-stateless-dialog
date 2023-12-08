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
  onFinished: () => void
): UseSnackbarAnimationResult => {
  const slideFrom = getEffectiveSlideFromPosition(
    config.slideFromPosition,
    config.vertical,
    config.horizontal,
    "top"
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

  function handleFinished(finished?: boolean) {
    "worklet";
    if (finished) {
      runOnJS(onFinished)();
    }
  }

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
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

      initialOffset.current = translateX ? startPosition.x : startPosition.y;
      offset.value = initialOffset.current;
      offset.value = withSequence(
        withTiming(0, { duration: 300 }),
        withDelay(
          config.duration,
          withTiming(initialOffset.current, { duration: 300 }, handleFinished)
        )
      );
    },
    [
      offset,
      config.duration,
      config.vertical,
      config.horizontal,
      onFinished,
      slideFrom,
      translateX,
    ]
  );

  const closeAnimation = useCallback(() => {
    if (initialOffset.current === null || initialOffset.current === undefined) {
      onFinished();
    } else {
      offset.value = withTiming(
        initialOffset.current,
        { duration: 300 },
        handleFinished
      );
    }
  }, [initialOffset]);

  const direction = slideFrom;
  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((e) => {
      if (
        initialOffset.current === null ||
        initialOffset.current === undefined
      ) {
        return;
      }
      cancelAnimation(offset);

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
        closeAnimation();
      } else {
        offset.value = offset.value + swipeTranslation.value;
        swipeTranslation.value = 0;
        offset.value = withSequence(
          withTiming(0, { duration: 200 }),
          withDelay(
            config.duration,
            withTiming(initialOffset.current, { duration: 300 }, handleFinished)
          )
        );
      }
    });

  return { animatedStyles, handleLayout, closeAnimation, gesture };
};
