import React from "react";
import {
  ComposedGesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";

export type GestureWrapperProps = {
  gesture?: ComposedGesture | GestureType;
  children: any;
};

export const GestureWrapper = (props: GestureWrapperProps) => {
  const { children, gesture } = props;

  if (gesture) {
    return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
  } else {
    return children;
  }
};
