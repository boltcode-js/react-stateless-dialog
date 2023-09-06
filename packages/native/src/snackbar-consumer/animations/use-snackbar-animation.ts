import { LayoutChangeEvent, ViewStyle } from "react-native";
import { SnackbarConfig } from "@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-config";
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
} => {
  if (config.animationType === "slide") {
    const { animatedStyles, handleLayout } = useSnackbarSlideAnimation(
      config,
      onFinished
    );

    return { style: animatedStyles, handleLayout };
  } else if (config.animationType === "fade") {
    const { animatedStyles, handleLayout } = useSnackbarFadeAnimation(
      config,
      onFinished
    );

    return { style: animatedStyles, handleLayout };
  } else {
    const { handleLayout } = useSnackbarNoneAnimation(config, onFinished);

    return {
      style: {},
      handleLayout,
    };
  }
};
