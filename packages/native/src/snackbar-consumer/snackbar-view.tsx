import React, { useCallback, useMemo } from "react";
import { LayoutChangeEvent, View, ViewStyle } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SnackbarInstance } from "@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-instance";
import { useSnackbarAnimation } from "./use-snackbar-animation";
import { SnackbarConfig } from "@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-config";

export type GlobalBannerViewProps = {
  snackbar: SnackbarInstance<any>;
  onFinished: () => void;
};

const MAIN_VIEW_STYLE: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

export const SnackbarView = (props: GlobalBannerViewProps) => {
  const { snackbar, onFinished } = props;

  const Component = snackbar.Component;
  const config = snackbar.config;

  // const offset = useSharedValue(INITIAL_OFFSET);
  // const duration = config.duration;

  /*const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height;

      function handleFinished(finished?: boolean) {
        "worklet";
        if (finished) {
          runOnJS(onFinished)();
        }
      }

      offset.value = -height;
      offset.value = withSequence(
        withTiming(0, { duration: 300 }),
        withDelay(
          duration,
          withTiming(-height, { duration: 300 }, handleFinished)
        )
      );
    },
    [offset, duration, onFinished]
  );

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    opacity: offset.value === INITIAL_OFFSET ? 0 : 1,
    width: "100%",
  }));

  const MAIN_VIEW_STYLE = useMemo<ViewStyle>(() => {
    const _style: ViewStyle = { position: "absolute" };

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
  }, []);*/
  const { handleLayout, style } = useSnackbarAnimation(
    config as SnackbarConfig,
    onFinished
  );

  return (
    <View style={MAIN_VIEW_STYLE} pointerEvents="box-none">
      <Animated.View
        style={style}
        onLayout={handleLayout}
        pointerEvents="box-none"
      >
        <Component {...snackbar.context} />
      </Animated.View>
    </View>
  );
};
