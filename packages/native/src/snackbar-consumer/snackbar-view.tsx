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

export type GlobalBannerViewProps = {
  snackbar: SnackbarInstance<any>;
  onFinished: () => void;
};

const INITIAL_OFFSET = -100000;

export const SnackbarView = (props: GlobalBannerViewProps) => {
  const { snackbar, onFinished } = props;

  const offset = useSharedValue(INITIAL_OFFSET);

  const Component = snackbar.Component;
  const config = snackbar.config;
  const duration = config.duration;

  const handleLayout = useCallback(
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
  }, []);

  return (
    <View style={MAIN_VIEW_STYLE}>
      <Animated.View style={animatedStyles} onLayout={handleLayout}>
        <Component {...snackbar.context} />
      </Animated.View>
    </View>
  );
};
