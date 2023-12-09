import {
  HorizontalAlignement,
  Layout,
  SafeArea,
  Size,
  VerticalAlignement,
} from "./common.models";

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
  } else {
    layout.y = safearea.top;
  }

  if (horizontal === "right") {
    layout.x = windowSize.width - componentSize.width - safearea.right;
  } else if (horizontal === "center") {
    layout.x =
      (windowSize.width - safearea.right - safearea.left) / 2 -
      componentSize.width / 2 +
      safearea.left;
  } else if (horizontal === "left") {
    layout.x = safearea.left;
  }

  return layout;
};
