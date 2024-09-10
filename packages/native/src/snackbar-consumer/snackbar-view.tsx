import React, { useCallback, useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  SnackbarInstance,
  useSnackbarManager,
} from "@react-stateless-dialog/core";
import { useSnackbarAnimation } from "./animations/use-snackbar-animation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureWrapper } from "../common/gesture-wrapper";
import { horizontalToFlexAlign, verticalToFlexAlign } from "../common/utils";
import { useKeyboardHeight } from "../common/use-keyboard-height";

export type SnackbarViewProps = {
  snackbar: SnackbarInstance<any>;
};

const MAIN_VIEW_STYLE: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

export const SnackbarView = (props: SnackbarViewProps) => {
  const { snackbar } = props;

  const Component = snackbar.Component;
  const config = snackbar.config;

  const destroy = useCallback(() => {
    useSnackbarManager.getState().destroy(snackbar.id);
  }, [snackbar.id]);

  const { handleLayout, animatedStyle, close, gesture } = useSnackbarAnimation(
    config,
    destroy
  );

  const insets = useSafeAreaInsets();
  const mainStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      MAIN_VIEW_STYLE,
      {
        paddingTop: config.insideSafeArea ? insets.top : 0,
        paddingStart: config.insideSafeArea ? insets.left : 0,
        paddingEnd: config.insideSafeArea ? insets.right : 0,
        alignItems: horizontalToFlexAlign(config.horizontal),
        justifyContent: verticalToFlexAlign(config.vertical),
      },
    ],
    [insets]
  );

  const keyboardHeight = useKeyboardHeight(
    config.insideSafeArea,
    config.insideSafeArea ? 10 : 0
  );
  const keyboardStyle = useAnimatedStyle(() => ({
    paddingBottom:
      (config.insideSafeArea ? insets.bottom : 0) +
      (config.keyboardBehavior === "padding" ? keyboardHeight.value : 0),
  }));

  const handleClose = useCallback(() => {
    close(true);
  }, [close]);

  return (
    <View style={mainStyle} pointerEvents="box-none">
      <GestureWrapper gesture={gesture}>
        <Animated.View
          style={[animatedStyle, keyboardStyle]}
          onLayout={handleLayout}
          pointerEvents="box-none"
        >
          <Component
            {...snackbar.context}
            onClose={handleClose}
            config={config}
          />
        </Animated.View>
      </GestureWrapper>
    </View>
  );
};
