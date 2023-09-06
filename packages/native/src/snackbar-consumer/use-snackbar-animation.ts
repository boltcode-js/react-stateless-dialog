import { useCallback, useMemo } from "react";
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

export const useSnackbarAnimation = (
  config: SnackbarConfig,
  onFinished: () => void
): {
  MAIN_VIEW_STYLE: ViewStyle;
  animatedStyles: AnimatedStyle<ViewStyle>;
  handleLayout: (event: LayoutChangeEvent) => void;
} => {
  const MAIN_VIEW_STYLE = useMemo<ViewStyle>(() => {
    const _style: ViewStyle = {
      position: "absolute",
    };

    if (config.vertical === "top") {
      _style.top = 0; // TODO : SafeArea
    } else if (config.vertical === "bottom") {
      _style.bottom = 0; // TODO : SafeArea
    } else {
      // TODO
    }

    if (config.horizontal === "left") {
      _style.left = 0; // TODO : SafeArea
    } else if (config.horizontal === "right") {
      _style.right = 0; // TODO : SafeArea
    } else {
      // TODO
      _style.left = 0; // TODO : SafeArea
      _style.right = 0; // TODO : SafeArea
    }

    return _style;
  }, []);

  if (config.animationType === "slide") {
    // TODO
    const INITIAL_OFFSET = -100000;
    const offset = useSharedValue(INITIAL_OFFSET);

    // config.vertical == 'center'

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
      alignItems: "center",
      // width: "100%",
    }));

    return { MAIN_VIEW_STYLE, animatedStyles, handleLayout };
  } else if (config.animationType === "fade") {
    const opacity = useSharedValue(0);

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
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
      },
      [opacity, config.duration, onFinished]
    );

    const animatedStyles = useAnimatedStyle(() => ({
      opacity: opacity.value,
      width: "100%",
    }));
    return { MAIN_VIEW_STYLE, animatedStyles, handleLayout };
  } else {
    return { MAIN_VIEW_STYLE, animatedStyles: {}, handleLayout: undefined };
  }
};
