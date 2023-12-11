import { SnackbarConfig } from "@react-stateless-dialog/core";
import { ViewStyle } from "react-native";

export const horizontalToFlexAlign = (
  align: SnackbarConfig["horizontal"]
): ViewStyle["alignItems"] => {
  if (align === "stretch") return "stretch";
  else if (align === "left") return "flex-start";
  else if (align === "right") return "flex-end";
  else return "center";
};

export const verticalToFlexAlign = (
  align: SnackbarConfig["vertical"]
): ViewStyle["justifyContent"] => {
  if (align === "top") return "flex-start";
  else if (align === "bottom") return "flex-end";
  else return "center";
};
