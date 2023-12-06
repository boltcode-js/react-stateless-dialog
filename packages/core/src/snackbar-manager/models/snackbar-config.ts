export type SwipeDirection = "right" | "left" | "up" | "down";

export type SnackbarConfig = {
  /**
   * The duration in ms the snackbar should persist
   */
  duration: number;

  /**
   * The vertical position of the snackbar
   */
  vertical: "top" | "center" | "bottom";

  /**
   * The horizontal position of the snackbar
   */
  horizontal: "left" | "center" | "right" | "stretch";

  /**
   * The animation of the snackbar
   */
  animationType: "slide" | "fade" | "none";

  /**
   * If true, the snackbar will be contained inside the SafeArea
   */
  insideSafeArea: boolean;

  /**
   * If true, you can use swipe gesture to close the snackbar.
   * If enableGesture is a SwipeDirection, override the default direction to swipe.
   */
  enableGesture: boolean | SwipeDirection;
};

export const SNACKBAR_DEFAULT_CONFIG: SnackbarConfig = {
  duration: 2500,
  vertical: "top",
  horizontal: "center",
  animationType: "none",
  insideSafeArea: false,
  enableGesture: false,
};
