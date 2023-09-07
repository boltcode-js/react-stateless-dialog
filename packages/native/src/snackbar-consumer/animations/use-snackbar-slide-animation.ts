import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useCallback } from "react";
import { LayoutChangeEvent } from "react-native";
import { SnackbarConfig } from "@react-stateless-dialog/core/lib/snackbar-manager/models/snackbar-config";

const INITIAL_OFFSET = -100000;

export const useSnackbarSlideAnimation = (
  config: SnackbarConfig,
  onFinished: () => void
) => {
  const translateX =
    config.vertical === "center" && config.horizontal !== "center";

  const offset = useSharedValue(INITIAL_OFFSET);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      function handleFinished(finished?: boolean) {
        "worklet";
        if (finished) {
          runOnJS(onFinished)();
        }
      }

      if (translateX) {
        const width = event.nativeEvent.layout.width;

        offset.value = config.horizontal === "left" ? -width : width;
        offset.value = withSequence(
          withTiming(0, { duration: 300 }),
          withDelay(
            config.duration,
            withTiming(
              config.horizontal === "left" ? -width : width,
              { duration: 300 },
              handleFinished
            )
          )
        );
      } else {
        const height = event.nativeEvent.layout.height;

        offset.value = config.vertical === "top" ? -height : height;
        offset.value = withSequence(
          withTiming(0, { duration: 300 }),
          withDelay(
            config.duration,
            withTiming(
              config.vertical === "top" ? -height : height,
              { duration: 300 },
              handleFinished
            )
          )
        );
      }
    },
    [offset, config.duration, onFinished]
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: translateX
        ? [{ translateX: offset.value }]
        : [{ translateY: offset.value }],
      opacity: offset.value === INITIAL_OFFSET ? 0 : 1,
    };
  });

  return { animatedStyles, handleLayout };
};
