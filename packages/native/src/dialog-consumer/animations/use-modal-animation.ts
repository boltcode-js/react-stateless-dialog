import { useEffect, useRef } from "react";
import {
  Keyboard,
  KeyboardEvent,
  Platform,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { DialogConfig } from "@react-stateless-dialog/core/src/dialog-manager/models/dialog-config";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MAIN_VIEW_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 0,
  elevation: 0,
};

export const useModalAnimation = (
  animationType: DialogConfig["animationType"],
  keyboardBehavior: DialogConfig["keyboardBehavior"]
) => {
  const ref = useRef(animationType);
  if (ref.current !== animationType) {
    throw new Error(
      "You can't change the animationType of a Modal during it's lifecycle"
    );
  }

  const initialMode = useRef(keyboardBehavior);
  if (initialMode.current !== keyboardBehavior) {
    throw new Error(
      "You can't change the keyboardBehavior of a Modal during it's lifecycle"
    );
  }

  const offsetY = useSharedValue(0);
  const safearea = useSafeAreaInsets();

  /* eslint-disable react-hooks/rules-of-hooks */
  if (keyboardBehavior) {
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
  }

  if (animationType === "slide") {
    const winSize = useWindowDimensions();
    const offset = useSharedValue(winSize.height);

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateY: offset.value }],
      paddingTop: safearea.top,
      paddingBottom: offsetY.value + safearea.bottom,
    }));

    useEffect(() => {
      offset.value = withTiming(0, { duration: 300 });
    }, [offset]);

    return [animatedStyles, MAIN_VIEW_STYLE];
  } else if (animationType === "fade") {
    const opacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
      opacity: opacity.value,
      paddingTop: safearea.top,
      paddingBottom: offsetY.value + safearea.bottom,
    }));

    useEffect(() => {
      opacity.value = withTiming(1, { duration: 300 });
    }, [opacity]);

    return [animatedStyles, MAIN_VIEW_STYLE];
  } else {
    const animatedStyles = useAnimatedStyle(() => ({
      paddingTop: safearea.top,
      paddingBottom: offsetY.value + safearea.bottom,
    }));
    return [animatedStyles, MAIN_VIEW_STYLE];
  }
  /* eslint-enable react-hooks/rules-of-hooks */
};
