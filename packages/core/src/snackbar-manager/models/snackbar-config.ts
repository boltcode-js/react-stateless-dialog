import {
  HorizontalAlignement,
  RelativePosition,
  VerticalAlignement,
} from "../../common/common.models";

export type SnackbarConfig = {
  /**
   * The duration in ms the snackbar should persist
   */
  duration: number;

  /**
   * The vertical position of the snackbar
   */
  vertical: VerticalAlignement;

  /**
   * The horizontal position of the snackbar
   */
  horizontal: HorizontalAlignement;

  /**
   * The animation of the snackbar
   */
  animationType: "slide" | "fade" | "none";

  /**
   * This defines the initial position of the slide animation
   */
  slideFromPosition: RelativePosition | undefined;

  /**
   * If true, you can use swipe gesture to close the snackbar (only work with slide animation).
   */
  enableGesture: boolean;

  /**
   * If true, the snackbar will be contained inside the SafeArea
   */
  insideSafeArea: boolean;

  /**
   * [NATIVE ONLY] How the content of the modal should react when keyboard open
   */
  keyboardBehavior: "padding" | undefined;
};

export const SNACKBAR_DEFAULT_CONFIG: SnackbarConfig = {
  duration: 2500,
  vertical: "top",
  horizontal: "center",
  animationType: "none",
  slideFromPosition: undefined,
  insideSafeArea: false,
  enableGesture: false,
  keyboardBehavior: "padding",
};
