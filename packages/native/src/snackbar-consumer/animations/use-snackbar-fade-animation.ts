import { SnackbarConfig } from "@react-stateless-dialog/core";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useCallback } from "react";
import { UseSnackbarAnimationResult } from "./use-snackbar-animation";

export const useSnackbarFadeAnimation = (
  config: SnackbarConfig,
  onFinished: () => void
): UseSnackbarAnimationResult => {
  const opacity = useSharedValue(0);

  const handleLayout = useCallback(() => {
    function handleFinished(finished?: boolean) {
      "worklet";
      if (finished) {
        runOnJS(onFinished)();
      }
    }

    opacity.value = withSequence(
      withTiming(1, { duration: 300 }),
      withDelay(
        config.duration,
        withTiming(0, { duration: 300 }, handleFinished)
      )
    );
  }, [opacity, config.duration, onFinished]);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // TODO: Close animation
  return { animatedStyles, handleLayout, closeAnimation: onFinished };
};
