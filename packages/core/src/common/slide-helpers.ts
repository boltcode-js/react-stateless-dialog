import {
  HorizontalAlignement,
  Position,
  RelativePosition,
  SafeArea,
  Size,
  VerticalAlignement,
} from "./common.models";
import { getAbsoluteLayout } from "./layout";

export const getEffectiveSlideFromPosition = (
  slideFromPosition: RelativePosition | undefined,
  vertical: VerticalAlignement,
  horizontal: HorizontalAlignement,
  fallback: RelativePosition
): RelativePosition => {
  if (slideFromPosition) {
    return slideFromPosition;
  }

  if (vertical === "top") {
    return "top";
  } else if (vertical === "bottom") {
    return "bottom";
  } else if (horizontal === "left") {
    return "left";
  } else if (horizontal === "right") {
    return "right";
  } else {
    return fallback;
  }
};

export const getSlideStartPosition = (
  slideFromPosition: RelativePosition,
  vertical: VerticalAlignement,
  horizontal: HorizontalAlignement,
  componentSize: Size,
  windowSize: Size,
  safearea?: SafeArea
): Position => {
  const layout = getAbsoluteLayout(
    vertical,
    horizontal,
    componentSize,
    windowSize,
    safearea
  );

  if (slideFromPosition === "top") {
    return { x: 0, y: -(layout.y + layout.height) };
  } else if (slideFromPosition === "bottom") {
    return { x: 0, y: windowSize.height - layout.y };
  } else if (slideFromPosition === "left") {
    return { x: -(layout.x + layout.width), y: 0 };
  } else {
    return { x: windowSize.width - layout.x, y: 0 };
  }
};
