import { LayoutChangeEvent, ViewStyle } from "react-native";
import { DialogConfig } from "@react-stateless-dialog/core";
import { AnimatedStyle } from "react-native-reanimated";
import { ComposedGesture, GestureType } from "react-native-gesture-handler";
import { useDialogSlideAnimation } from "./use-dialog-slide-animation";
import { useDialogFadeAnimation } from "./use-dialog-fade-animation";

export type UseDialogAnimationResult = {
  animatedStyle: AnimatedStyle<ViewStyle>;
  outsideViewStyle: AnimatedStyle<ViewStyle>;
  close: (animated?: boolean) => void;
  handleLayout?: (event: LayoutChangeEvent) => void;
  gesture?: ComposedGesture | GestureType;
};

export const useDialogAnimation = (
  config: DialogConfig,
  destroy: () => void
): UseDialogAnimationResult => {
  /*const offsetY = useSharedValue(0);
  let safearea = useSafeAreaInsets();
  if (config.disableSafeArea) {
    safearea = {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    };
  }*/

  /* eslint-disable react-hooks/rules-of-hooks */
  /*if (config.keyboardBehavior) {
    useEffect(() => {
      function onKeyboardShow(e: KeyboardEvent) {
        offsetY.value = withTiming(e.endCoordinates.height, {
          duration: Platform.OS === "android" ? 50 : 300,
        });
      }

      function onKeyboardHide() {
        offsetY.value = withTiming(0, {
          duration: Platform.OS === "android" ? 50 : 300,
        });
      }

      const showSubscription = Keyboard.addListener(
        Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
        onKeyboardShow
      );
      const hideSubscription = Keyboard.addListener(
        Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
        onKeyboardHide
      );

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, [offsetY]);
  }*/

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
