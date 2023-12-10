import { UseDialogAnimationResult } from "./use-dialog-animation";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useCallback, useEffect, useMemo } from "react";

const ANIMATION_DURATION = 300;

export const useDialogFadeAnimation = (
  destroy: () => void
): UseDialogAnimationResult => {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity]);

  const handleFinished = useMemo(() => {
    return function (finished?: boolean) {
      "worklet";
      if (finished) {
        runOnJS(destroy)();
      }
    };
  }, [destroy]);

  const close = useCallback(
    (animated?: boolean) => {
      if (animated) {
        opacity.value = withTiming(
          0,
          { duration: ANIMATION_DURATION },
          handleFinished
        );
      } else {
        destroy();
      }
    },
    [destroy]
  );

  return {
    animatedStyle,
    outsideViewStyle: animatedStyle,
    close,
  };
};
