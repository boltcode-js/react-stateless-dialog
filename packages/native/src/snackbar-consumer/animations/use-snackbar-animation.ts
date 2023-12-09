import { LayoutChangeEvent, ViewStyle } from "react-native";
import { SnackbarConfig } from "@react-stateless-dialog/core";
import { AnimatedStyle } from "react-native-reanimated";
import { useSnackbarSlideAnimation } from "./use-snackbar-slide-animation";
import { useSnackbarFadeAnimation } from "./use-snackbar-fade-animation";
import { useSnackbarNoneAnimation } from "./use-snackbar-none-animation";
import { ComposedGesture, GestureType } from "react-native-gesture-handler";

export type UseSnackbarAnimationResult = {
  animatedStyles: AnimatedStyle<ViewStyle>;
  handleLayout: (event: LayoutChangeEvent) => void;
  close: (animated?: boolean) => void;
  gesture?: ComposedGesture | GestureType;
};

export const useSnackbarAnimation = (
  config: SnackbarConfig,
  destroy: () => void
): UseSnackbarAnimationResult => {
  if (config.animationType === "slide") {
    return useSnackbarSlideAnimation(config, destroy);
  } else if (config.animationType === "fade") {
    return useSnackbarFadeAnimation(config, destroy);
  } else {
    return useSnackbarNoneAnimation(config, destroy);
  }
};
