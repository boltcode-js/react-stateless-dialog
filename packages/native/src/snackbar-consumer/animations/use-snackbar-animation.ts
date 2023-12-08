import { LayoutChangeEvent, ViewStyle } from "react-native";
import { SnackbarConfig } from "@react-stateless-dialog/core";
import { AnimatedStyle } from "react-native-reanimated";
import { useSnackbarSlideAnimation } from "./use-snackbar-slide-animation";
import { useSnackbarFadeAnimation } from "./use-snackbar-fade-animation";
import { useSnackbarNoneAnimation } from "./use-snackbar-none-animation";

export const useSnackbarAnimation = (
  config: SnackbarConfig,
  onFinished: () => void
): {
  style: AnimatedStyle<ViewStyle>;
  handleLayout: (event: LayoutChangeEvent) => void;
  closeAnimation: () => void;
} => {
  if (config.animationType === "slide") {
    const { animatedStyles, handleLayout, closeAnimation } =
      useSnackbarSlideAnimation(config, onFinished);

    return { style: animatedStyles, handleLayout, closeAnimation: () => {} };
  } else if (config.animationType === "fade") {
    const { animatedStyles, handleLayout } = useSnackbarFadeAnimation(
      config,
      onFinished
    );

    return { style: animatedStyles, handleLayout, closeAnimation: () => {} };
  } else {
    const { handleLayout } = useSnackbarNoneAnimation(config, onFinished);

    return {
      style: {},
      handleLayout,
      closeAnimation: () => {},
    };
  }
};
