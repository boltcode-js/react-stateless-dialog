import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { SnackbarInstance } from "@react-stateless-dialog/core/lib/snackbar-manager/models/snackbar-instance";
import { useSnackbarAnimation } from "./animations/use-snackbar-animation";
import { SnackbarConfig } from "@react-stateless-dialog/core/lib/snackbar-manager/models/snackbar-config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlexAlignType } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

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

const horizontalToFlexAlign = (
  align: SnackbarConfig["horizontal"]
): FlexAlignType => {
  if (align === "stretch") return "stretch";
  else if (align === "left") return "flex-start";
  else if (align === "right") return "flex-end";
  else return "center";
};

const verticalToFlexAlign = (
  align: SnackbarConfig["vertical"]
): ViewStyle["justifyContent"] => {
  if (align === "top") return "flex-start";
  else if (align === "bottom") return "flex-end";
  else return "center";
};

export const SnackbarView = (props: GlobalBannerViewProps) => {
  const { snackbar, onFinished } = props;

  const Component = snackbar.Component;
  const config = snackbar.config;

  const { handleLayout, style } = useSnackbarAnimation(config, onFinished);

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

  return (
    <View style={mainStyle} pointerEvents="box-none">
      <Animated.View
        style={style}
        onLayout={handleLayout}
        pointerEvents="box-none"
      >
        <Component {...snackbar.context} config={config} />
      </Animated.View>
    </View>
  );
};
