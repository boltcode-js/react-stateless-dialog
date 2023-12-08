import React, { useCallback } from "react";
import {
  ComposedGesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";

export const useGestureWrapper = (gesture?: ComposedGesture | GestureType) => {
  return useCallback(
    (props: { children: any }) => {
      const { children } = props;

      if (gesture) {
        return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
      } else {
        return children;
      }
    },
    [gesture]
  );
};
