import { useEffect } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useKeyboardHeight = (adjustSafeArea?: boolean, addOffset = 0) => {
  const safearea = useSafeAreaInsets();
  const offsetY = useSharedValue(
    Keyboard.isVisible()
      ? Keyboard.metrics().height -
          (adjustSafeArea ? safearea.bottom : 0) +
          addOffset
      : 0
  );

  useEffect(() => {
    function onKeyboardShow(e: KeyboardEvent) {
      const target =
        e.endCoordinates.height -
        (adjustSafeArea ? safearea.bottom : 0) +
        addOffset;
      offsetY.value = withTiming(target, {
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
  }, [offsetY, safearea.bottom, adjustSafeArea]);

  return offsetY;
};
