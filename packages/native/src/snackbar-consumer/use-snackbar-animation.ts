import { useCallback, useEffect, useMemo } from "react";
import { Dimensions, LayoutChangeEvent, ViewStyle } from "react-native";
import { SnackbarConfig } from "@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-config";
import {
  AnimatedStyle,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { FlexAlignType } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

const horizontalToFlexAlign = (
  align: SnackbarConfig["horizontal"]
): FlexAlignType => {
  if (align === "left") return "flex-start";
  else if (align === "right") return "flex-end";
  else return "center";
};

const verticalToFlexAlign = (align: SnackbarConfig["vertical"]) => {
  if (align === "top") return "flex-start";
  else if (align === "bottom") return "flex-end";
  else return "center";
};

export const useSnackbarAnimation = (
  config: SnackbarConfig,
  onFinished: () => void
): {
  style: AnimatedStyle<ViewStyle>[];
  handleLayout: (event: LayoutChangeEvent) => void;
} => {
  const defaultStyle: AnimatedStyle<ViewStyle> = {
    alignItems: horizontalToFlexAlign(config.horizontal),
    justifyContent: verticalToFlexAlign(config.vertical),
    flex: 1,
  };

  if (config.animationType === "slide") {
    const INITIAL_OFFSET = -100000;
    const offset = useSharedValue(INITIAL_OFFSET);

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height;

        function handleFinished(finished?: boolean) {
          "worklet";
          if (finished) {
            runOnJS(onFinished)();
          }
        }

        offset.value = config.vertical == "top" ? -height : height;
        offset.value = withSequence(
          withTiming(0, { duration: 300 }),
          withDelay(
            config.duration,
            withTiming(
              config.vertical == "top" ? -height : height,
              { duration: 300 },
              handleFinished
            )
          )
        );
      },
      [offset, config.duration, onFinished]
    );

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateY: offset.value }],
      opacity: offset.value === INITIAL_OFFSET ? 0 : 1,
    }));

    return { style: [defaultStyle, animatedStyles], handleLayout };
  } else if (config.animationType === "fade") {
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
    return { style: [defaultStyle, animatedStyles], handleLayout };
  } else {
    let timeout: NodeJS.Timeout;
    const handleLayout = useCallback(() => {
      timeout = setTimeout(() => {
        onFinished();
        timeout = undefined;
      }, config.duration);
    }, [config.duration, onFinished]);

    useEffect(() => {
      return () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = undefined;
        }
      };
    }, []);

    return {
      style: [defaultStyle],
      handleLayout,
    };
  }
};
