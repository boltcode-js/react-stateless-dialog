import { LayoutChangeEvent, ViewStyle } from "react-native";
import { SnackbarConfig } from "@react-stateless-dialog/core";
import { AnimatedStyle } from "react-native-reanimated";
import { useSnackbarFadeAnimation } from "./use-snackbar-fade-animation";
import { useSnackbarNoneAnimation } from "./use-snackbar-none-animation";
import { ComposedGesture, GestureType } from "react-native-gesture-handler";
import { useSlideAnimation } from "../../common/use-slide-animation";

export type UseSnackbarAnimationResult = {
  animatedStyle: AnimatedStyle<ViewStyle>;
  handleLayout: (event: LayoutChangeEvent) => void;
  close: (animated?: boolean) => void;
  gesture?: ComposedGesture | GestureType;
};

export const useSnackbarAnimation = (
  config: SnackbarConfig,
  destroy: () => void
): UseSnackbarAnimationResult => {
  if (config.animationType === "slide") {
    return useSlideAnimation({
      vertical: config.vertical,
      horizontal: config.horizontal,
      insideSafeArea: config.insideSafeArea,
      slideFromPosition: config.slideFromPosition,
      defaultSlideFromPosition: "top",
      autoCloseDelay: config.duration,
      gestureEnable: config.enableGesture,
      finish: destroy,
      exitThreshold: 0.2,
    });
  } else if (config.animationType === "fade") {
    return useSnackbarFadeAnimation(config, destroy);
  } else {
    return useSnackbarNoneAnimation(config, destroy);
  }
};
