import { SnackbarConfig } from "@react-stateless-dialog/core";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useCallback, useMemo } from "react";
import { UseSnackbarAnimationResult } from "./use-snackbar-animation";

const ANIMATION_DURATION = 350;

export const useSnackbarFadeAnimation = (
  config: SnackbarConfig,
  destroy: () => void
): UseSnackbarAnimationResult => {
  const opacity = useSharedValue(0);

  const handleFinished = useMemo(() => {
    return function (finished?: boolean) {
      "worklet";
      if (finished) {
        runOnJS(destroy)();
      }
    };
  }, [destroy]);

  const handleLayout = useCallback(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: ANIMATION_DURATION }),
      withDelay(
        config.duration,
        withTiming(0, { duration: ANIMATION_DURATION }, handleFinished)
      )
    );
  }, [opacity, config.duration, destroy]);

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

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { animatedStyle, handleLayout, close };
};
