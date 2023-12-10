import { DialogConfig } from "@react-stateless-dialog/core";
import { UseDialogAnimationResult } from "./use-dialog-animation";
import { useSlideAnimation } from "../../common/use-slide-animation";
import { useAnimatedStyle } from "react-native-reanimated";

export const useDialogSlideAnimation = (
  config: DialogConfig,
  destroy: () => void
): UseDialogAnimationResult => {
  const { animatedStyle, close, gesture, handleLayout, progress } =
    useSlideAnimation({
      finish: destroy,
      vertical: config.vertical,
      horizontal: config.horizontal,
      slideFromPosition: config.slideFromPosition,
      defaultSlideFromPosition: "bottom",
      insideSafeArea: !config.disableSafeArea,
      gestureEnable: config.enableGesture,
      exitThreshold: 0.4,
    });

  const outsideViewStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return {
    animatedStyle: animatedStyle,
    close,
    gesture,
    handleLayout,
    outsideViewStyle,
  };
};
