import {
  BackHandler,
  Platform,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useDialogAnimation } from "./animations/use-dialog-animation";
import { DialogInstance } from "@react-stateless-dialog/core";
import { horizontalToFlexAlign, verticalToFlexAlign } from "../common/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureWrapper } from "../common/gesture-wrapper";
import { useKeyboardHeight } from "../common/use-keyboard-height";

export type DialogViewProps = {
  dialog: DialogInstance<any, any>;
};

const MAIN_VIEW_STYLE: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 0,
  elevation: 0,
  flex: 1,
};

const OUTSIDE_VIEW_STYLE: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 0,
  elevation: 0,
};

const useCancelOnBackButton = (
  androidCancelOnClickBack: boolean,
  onCancel: () => void
) => {
  if (Platform.OS !== "android") {
    return;
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    function cancelOnBack() {
      if (androidCancelOnClickBack) {
        onCancel();
      }
      return true;
    }

    const sub = BackHandler.addEventListener("hardwareBackPress", cancelOnBack);

    return () => {
      sub.remove();
    };
  }, [androidCancelOnClickBack, onCancel]);
  /* eslint-enable react-hooks/rules-of-hooks */
};

export const DialogView = (props: DialogViewProps) => {
  const { dialog } = props;
  const { Component, config, context } = dialog;
  const { onCancel, destroy } = context;

  const { backgroundColor, quitOnTouchOutside, androidCancelOnClickBack } =
    config;

  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight(!config.disableSafeArea);
  const fixedMainStyle = useMemo<ViewStyle>(
    () => ({
      paddingTop: config.disableSafeArea ? 0 : insets.top,
      paddingStart: config.disableSafeArea ? 0 : insets.left,
      paddingEnd: config.disableSafeArea ? 0 : insets.right,
      alignItems: horizontalToFlexAlign(config.horizontal),
      justifyContent: verticalToFlexAlign(config.vertical),
    }),
    [config, insets]
  );

  const animatedMainStyle = useAnimatedStyle(() => ({
    paddingBottom:
      (config.disableSafeArea ? 0 : insets.bottom) +
      (config.keyboardBehavior === "padding" ? keyboardHeight.value : 0),
  }));

  const cancelAndDestroy = useCallback(() => {
    onCancel();
    destroy();
  }, [onCancel, destroy]);

  const { animatedStyle, outsideViewStyle, handleLayout, close, gesture } =
    useDialogAnimation(config, cancelAndDestroy);
  useCancelOnBackButton(androidCancelOnClickBack, cancelAndDestroy);

  useEffect(() => {
    if (dialog.isClosing) {
      close(true);
    }
  }, [dialog.isClosing]);

  return (
    <GestureWrapper gesture={config.gestureFullscreen ? gesture : undefined}>
      <Animated.View
        style={[MAIN_VIEW_STYLE, fixedMainStyle, animatedMainStyle]}
      >
        <TouchableWithoutFeedback
          onPress={quitOnTouchOutside ? onCancel : undefined}
        >
          <Animated.View
            style={[OUTSIDE_VIEW_STYLE, { backgroundColor }, outsideViewStyle]}
          />
        </TouchableWithoutFeedback>
        <GestureWrapper
          gesture={config.gestureFullscreen ? undefined : gesture}
        >
          <Animated.View
            style={[animatedStyle, config.containerStyle]}
            onLayout={handleLayout}
          >
            <Component key={dialog.id} {...context} />
          </Animated.View>
        </GestureWrapper>
      </Animated.View>
    </GestureWrapper>
  );
};
