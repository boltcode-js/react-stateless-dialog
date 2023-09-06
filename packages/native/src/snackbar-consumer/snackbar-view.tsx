import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { SnackbarInstance } from "@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-instance";
import { useSnackbarAnimation } from "./animations/use-snackbar-animation";
import { SnackbarConfig } from "@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-config";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type GlobalBannerViewProps = {
  snackbar: SnackbarInstance<any>;
  onFinished: () => void;
};

const MAIN_VIEW_STYLE: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};

export const SnackbarView = (props: GlobalBannerViewProps) => {
  const { snackbar, onFinished } = props;

  const Component = snackbar.Component;
  const config = snackbar.config;

  const { handleLayout, style } = useSnackbarAnimation(
    config as SnackbarConfig,
    onFinished
  );

  const insets = useSafeAreaInsets();
  const mainStyle = useMemo(() => {
    if (snackbar.config.insideSafeArea) {
      return [
        MAIN_VIEW_STYLE,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingStart: insets.left,
          paddingEnd: insets.right,
        },
      ];
    } else {
      return [MAIN_VIEW_STYLE];
    }
  }, [insets]);

  return (
    <View style={mainStyle} pointerEvents="box-none">
      <Animated.View
        style={style}
        onLayout={handleLayout}
        pointerEvents="box-none"
      >
        <Component {...snackbar.context} />
      </Animated.View>
    </View>
  );
};
