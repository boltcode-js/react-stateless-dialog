export type RelativePosition = "right" | "left" | "top" | "bottom";

export type VerticalAlignement = "top" | "center" | "bottom";
export type HorizontalAlignement = "left" | "center" | "right" | "stretch";

export type Size = { width: number; height: number };
export type Position = { x: number; y: number };
export type Layout = Size & Position;

export type SafeArea = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

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

export const getAbsoluteLayout = (
  vertical: VerticalAlignement,
  horizontal: HorizontalAlignement,
  componentSize: Size,
  windowSize: Size,
  safearea: SafeArea = { top: 0, bottom: 0, left: 0, right: 0 }
): Layout => {
  const layout: Layout = {
    x: 0,
    y: 0,
    width: componentSize.width,
    height: componentSize.height,
  };

  if (vertical === "bottom") {
    layout.y = windowSize.height - componentSize.height - safearea.bottom;
  } else if (vertical === "center") {
    layout.y =
      (windowSize.height - safearea.bottom - safearea.top) / 2 -
      componentSize.height / 2 +
      safearea.top;
  }

  if (horizontal === "right") {
    layout.x = windowSize.width - componentSize.width - safearea.right;
  } else if (horizontal === "center") {
    layout.x =
      (windowSize.width - safearea.right - safearea.left) / 2 -
      componentSize.width / 2 +
      safearea.left;
  }

  return layout;
};

export const getRelativeStartPosition = (
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
