import { LayoutChangeEvent, ViewStyle } from "react-native";
import { DialogConfig } from "@react-stateless-dialog/core";
import { AnimatedStyle } from "react-native-reanimated";
import { ComposedGesture, GestureType } from "react-native-gesture-handler";
import { useDialogSlideAnimation } from "./use-dialog-slide-animation";
import { useDialogFadeAnimation } from "./use-dialog-fade-animation";

export type UseDialogAnimationResult = {
  animatedStyle: AnimatedStyle<ViewStyle>;
  outsideViewStyle: AnimatedStyle<ViewStyle>;
  close: (animated?: boolean, callback?: () => void) => void;
  handleLayout?: (event: LayoutChangeEvent) => void;
  gesture?: ComposedGesture | GestureType;
};

export const useDialogAnimation = (
  config: DialogConfig,
  destroy: () => void
): UseDialogAnimationResult => {
  if (config.animationType === "slide") {
    return useDialogSlideAnimation(config, destroy);
  } else if (config.animationType === "fade") {
    return useDialogFadeAnimation(destroy);
  } else {
    return {
      animatedStyle: {},
      outsideViewStyle: {},
      handleLayout: undefined,
      close: destroy,
      gesture: undefined,
    };
  }
  /* eslint-enable react-hooks/rules-of-hooks */
};
