import React, { useCallback } from "react";
import { SnackbarConfig, SwipeDirection } from "@react-stateless-dialog/core";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const getSwipeDirection = (config: SnackbarConfig): SwipeDirection => {
  if (typeof config.enableGesture !== "boolean") {
    return config.enableGesture;
  } else if (config.vertical === "top") {
    return "up";
  } else if (config.vertical === "bottom") {
    return "down";
  } else if (config.horizontal === "left") {
    return "left";
  } else if (config.horizontal === "right") {
    return "right";
  } else {
    return "up";
  }
};

const selectAxis = (
  direction: SwipeDirection,
  axis: { x: number; y: number }
) => {
  return direction === "up" || direction === "down" ? axis.y : axis.x;
};

/**
 * Return positive value when translation go in the direction, or negative for the oposite
 * @param direction
 * @param translation
 */
const normalizeTranslation = (
  direction: SwipeDirection,
  translation: number
) => {
  if (direction === "up" || direction === "left") {
    return translation * -1;
  } else {
    return translation;
  }
};

export const useSwipeGesture = (
  config: SnackbarConfig,
  onFinished: () => void
) => {
  if (!config.enableGesture) {
    return useCallback((props: { children: any }) => {
      const { children } = props;
      return children;
    }, []);
  }

  const direction = getSwipeDirection(config);

  const size = useSharedValue(0);
  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      size.value = selectAxis(direction, {
        x: event.nativeEvent.layout.width,
        y: event.nativeEvent.layout.height,
      });
    },
    [direction]
  );

  const swipeTranslation = useSharedValue(0);

  const swipeGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((e) => {
      const translation = normalizeTranslation(
        direction,
        selectAxis(direction, {
          x: e.translationX,
          y: e.translationY,
        })
      );

      if (translation > 0) {
        swipeTranslation.value = translation;
      } else {
        swipeTranslation.value = translation / 25;
      }
    })
    .onEnd((e) => {
      const translation = normalizeTranslation(
        direction,
        selectAxis(direction, {
          x: e.translationX,
          y: e.translationY,
        })
      );

      if (translation > size.value * 0.2) {
        swipeTranslation.value = withTiming(
          size.value,
          { duration: 100 },
          () => {
            runOnJS(onFinished)();
          }
        );
      } else {
        swipeTranslation.value = withTiming(0, { duration: 100 });
      }
    });

  const swipeStyle = useAnimatedStyle(() => {
    if (direction === "up") {
      return { transform: [{ translateY: -swipeTranslation.value }] };
    } else if (direction === "down") {
      return { transform: [{ translateY: swipeTranslation.value }] };
    } else if (direction === "left") {
      return { transform: [{ translateX: -swipeTranslation.value }] };
    } else if (direction === "right") {
      return { transform: [{ translateX: swipeTranslation.value }] };
    }
  });

  return useCallback((props: { children: any }) => {
    const { children } = props;
    return (
      <GestureDetector gesture={swipeGesture}>
        <Animated.View
          onLayout={handleLayout}
          style={swipeStyle}
          pointerEvents="box-none"
        >
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }, []);
};
