import { LayoutChangeEvent, ViewStyle } from "react-native";
import { SnackbarConfig } from "@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-config";
import { AnimatedStyle } from "react-native-reanimated";
import { FlexAlignType } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { useSnackbarSlideAnimation } from "./use-snackbar-slide-animation";
import { useSnackbarFadeAnimation } from "./use-snackbar-fade-animation";
import { useSnackbarNoneAnimation } from "./use-snackbar-none-animation";

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
    const { animatedStyles, handleLayout } = useSnackbarSlideAnimation(
      config,
      onFinished
    );

    return { style: [defaultStyle, animatedStyles], handleLayout };
  } else if (config.animationType === "fade") {
    const { animatedStyles, handleLayout } = useSnackbarFadeAnimation(
      config,
      onFinished
    );

    return { style: [defaultStyle, animatedStyles], handleLayout };
  } else {
    const { handleLayout } = useSnackbarNoneAnimation(config, onFinished);

    return {
      style: [defaultStyle],
      handleLayout,
    };
  }
};
