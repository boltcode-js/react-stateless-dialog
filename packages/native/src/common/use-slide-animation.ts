import {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
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
  getSlideStartPosition,
  HorizontalAlignement,
  RelativePosition,
  VerticalAlignement,
} from "@react-stateless-dialog/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, PanGesture } from "react-native-gesture-handler";

const ANIMATION_DURATION = 300;
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

export type SlideStatus = "starting" | "waiting" | "finishing";

export type UseSlideAnimationArgs = {
  slideFromPosition: RelativePosition;
  defaultSlideFromPosition: RelativePosition;
  vertical: VerticalAlignement;
  horizontal: HorizontalAlignement;
  insideSafeArea: boolean;
  destroy: () => void;
  autoCloseDelay?: number;
  gestureEnable: boolean;
  exitThreshold: number;
};

export const useSlideAnimation = (args: UseSlideAnimationArgs) => {
  const slideFrom = getEffectiveSlideFromPosition(
    args.slideFromPosition,
    args.vertical,
    args.horizontal,
    args.defaultSlideFromPosition
  );

  const status = useSharedValue<SlideStatus>(undefined);
  const translateX = slideFrom === "left" || slideFrom === "right";
  const layout = useRef<LayoutRectangle>(undefined);
  const initialOffset = useSharedValue<number>(undefined);
  const offset = useSharedValue(INITIAL_OFFSET);
  const winSize = useWindowDimensions();
  const safearea = useSafeAreaInsets();

  const swipeTranslation = useSharedValue(0);
  const progress = useDerivedValue(() => {
    if (initialOffset.value === null || initialOffset.value === undefined) {
      return 0;
    }
    const absInitial = Math.abs(initialOffset.value);
    const absOffset = Math.abs(offset.value + swipeTranslation.value);
    return (absInitial - absOffset) / absInitial;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: translateX
      ? [{ translateX: offset.value + swipeTranslation.value }]
      : [{ translateY: offset.value + swipeTranslation.value }],
    opacity: offset.value === INITIAL_OFFSET ? 0 : 1,
  }));

  const getCloseAnimation = useCallback(
    (isDelayed: boolean) => {
      if (isDelayed && !args.autoCloseDelay) {
        return null;
      }

      function handleFinished(finished?: boolean) {
        "worklet";
        if (finished) {
          runOnJS(args.destroy)();
        }
      }

      const closeAnim = withTiming(
        initialOffset.value,
        { duration: ANIMATION_DURATION },
        handleFinished
      );

      if (isDelayed) {
        return withDelay(
          args.autoCloseDelay,
          withSequence(
            withTiming(0, { duration: 0 }, (finished) => {
              if (finished) {
                status.value = "finishing";
              }
            }),
            withTiming(
              initialOffset.value,
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
    [args.autoCloseDelay, args.destroy]
  );

  const isLayouted = useRef(false);
  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (isLayouted.current) {
        return;
      }
      isLayouted.current = true;

      layout.current = event.nativeEvent.layout;

      const startPosition = getSlideStartPosition(
        slideFrom,
        args.vertical,
        args.horizontal,
        {
          width: layout.current.width,
          height: layout.current.height,
        },
        { width: winSize.width, height: winSize.height },
        args.insideSafeArea ? safearea : undefined
      );

      status.value = "starting";
      const tmpInitialOffset = translateX ? startPosition.x : startPosition.y;
      initialOffset.value = tmpInitialOffset;
      offset.value = tmpInitialOffset;
      offset.value = withSequence(
        ...[
          withTiming(0, { duration: ANIMATION_DURATION }, () => {
            status.value = "waiting";
          }),
          args.autoCloseDelay ? getCloseAnimation(true) : undefined,
        ].filter((x) => !!x)
      );
    },
    [offset, args, safearea, slideFrom, translateX, getCloseAnimation]
  );

  const close = useCallback(
    (animated?: boolean) => {
      if (status.value && animated) {
        offset.value = getCloseAnimation(false);
      } else {
        args.destroy();
      }
    },
    [getCloseAnimation, args.destroy]
  );

  let gesture: PanGesture;
  if (args.gestureEnable) {
    const direction = slideFrom;
    gesture = Gesture.Pan()
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
          Math.abs(translation) > size * args.exitThreshold
        ) {
          swipeTranslation.value = 0;
          offset.value = offset.value + translation;
          offset.value = getCloseAnimation(false);
        } else {
          offset.value = offset.value + swipeTranslation.value;
          swipeTranslation.value = 0;

          function handleRestore() {
            if (args.autoCloseDelay) {
              offset.value = getCloseAnimation(true);
            }
          }

          offset.value = withTiming(
            0,
            {
              duration: ANIMATION_DURATION,
            },
            function () {
              "worklet";
              runOnJS(handleRestore)();
            }
          );
        }
      });
  }

  return { animatedStyle, handleLayout, close, gesture, progress };
};
