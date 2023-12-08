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
import { LayoutChangeEvent, useWindowDimensions } from "react-native";
import {
  SnackbarConfig,
  getEffectiveSlideFromPosition,
  getRelativeStartPosition,
} from "@react-stateless-dialog/core";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const INITIAL_OFFSET = -100000;

export const useSnackbarSlideAnimation = (
  config: SnackbarConfig,
  onFinished: () => void
) => {
  const slideFrom = getEffectiveSlideFromPosition(
    config.slideFromPosition,
    config.vertical,
    config.horizontal,
    "top"
  );

  const translateX = slideFrom === "left" || slideFrom === "right";
  const initialValue = useRef<number>(undefined);
  const offset = useSharedValue(INITIAL_OFFSET);
  const winSize = useWindowDimensions();
  const safearea = useSafeAreaInsets();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: translateX
        ? [{ translateX: offset.value }]
        : [{ translateY: offset.value }],
      opacity: offset.value === INITIAL_OFFSET ? 0 : 1,
    };
  });

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      function handleFinished(finished?: boolean) {
        "worklet";
        if (finished) {
          runOnJS(onFinished)();
        }
      }

      const startPosition = getRelativeStartPosition(
        slideFrom,
        config.vertical,
        config.horizontal,
        {
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        },
        { width: winSize.width, height: winSize.height },
        config.insideSafeArea ? safearea : undefined
      );

      initialValue.current = translateX ? startPosition.x : startPosition.y;
      offset.value = initialValue.current;
      offset.value = withSequence(
        withTiming(0, { duration: 300 }),
        withDelay(
          config.duration,
          withTiming(initialValue.current, { duration: 300 }, handleFinished)
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
    if (initialValue.current === null || initialValue.current === undefined) {
      onFinished();
    } else {
      function handleFinished(finished?: boolean) {
        "worklet";
        if (finished) {
          runOnJS(onFinished)();
        }
      }

      cancelAnimation(offset);
      offset.value = withDelay(
        config.duration,
        withTiming(initialValue.current, { duration: 300 }, handleFinished)
      );
    }
  }, [initialValue]);

  return { animatedStyles, handleLayout, closeAnimation };
};
