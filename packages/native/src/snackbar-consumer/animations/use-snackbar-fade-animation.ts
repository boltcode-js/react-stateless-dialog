import { SnackbarConfig } from "@react-stateless-dialog/core/lib/snackbar-manager/models/snackbar-config";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useCallback } from "react";

export const useSnackbarFadeAnimation = (
  config: SnackbarConfig,
  onFinished: () => void
) => {
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

  return { animatedStyles, handleLayout };
};
