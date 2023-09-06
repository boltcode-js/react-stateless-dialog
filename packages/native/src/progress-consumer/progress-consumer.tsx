import React from "react";
import { View, ViewStyle } from "react-native";
import { useProgressManager } from "@react-stateless-dialog/core/src/progress-manager/progress-manager";
import { getGlobalConfig } from "@react-stateless-dialog/core/src/config/global-config";

const MAIN_VIEW_STYLE: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
};

const VIEW_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const ProgressView = () => {
  const message = useProgressManager((state) => state.message);
  const Component = getGlobalConfig().progress.Component;

  return (
    <View style={VIEW_STYLE}>
      <Component message={message} />
    </View>
  );
};

export const ProgressConsumer = () => {
  const isLoading = useProgressManager((state) => state.isLoading);

  if (isLoading) {
    return (
      <View style={MAIN_VIEW_STYLE}>
        <ProgressView />
      </View>
    );
  } else {
    return null;
  }
};
