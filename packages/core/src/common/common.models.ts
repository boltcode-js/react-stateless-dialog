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
