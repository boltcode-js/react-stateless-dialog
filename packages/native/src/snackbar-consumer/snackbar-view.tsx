import React, { useCallback, useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import {
  SnackbarInstance,
  useSnackbarManager,
} from "@react-stateless-dialog/core";
import { useSnackbarAnimation } from "./animations/use-snackbar-animation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureWrapper } from "../common/gesture-wrapper";
import { horizontalToFlexAlign, verticalToFlexAlign } from "../common/utils";

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
  const mainStyle = useMemo<StyleProp<ViewStyle>>(() => {
    if (config.insideSafeArea) {
      return [
        MAIN_VIEW_STYLE,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingStart: insets.left,
          paddingEnd: insets.right,
          alignItems: horizontalToFlexAlign(config.horizontal),
          justifyContent: verticalToFlexAlign(config.vertical),
        },
      ];
    } else {
      return [
        MAIN_VIEW_STYLE,
        {
          alignItems: horizontalToFlexAlign(config.horizontal),
          justifyContent: verticalToFlexAlign(config.vertical),
        },
      ];
    }
  }, [insets]);

  const handleClose = useCallback(() => {
    close(true);
  }, [close]);

  return (
    <View style={mainStyle} pointerEvents="box-none">
      <GestureWrapper gesture={gesture}>
        <Animated.View
          style={animatedStyle}
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
