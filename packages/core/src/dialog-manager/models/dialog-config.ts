import { RelativePosition } from "../../common";

export interface DialogConfig {
  /**
   * Background color applied to the whole screen, you can use alpha channel if you don't want to hide completely the screen.
   */
  backgroundColor: string;

  /**
   * Animation used when dialog is shown
   */
  animationType: "none" | "slide" | "fade";

  /**
   * The vertical position of the dialog in the container
   */
  vertical: "top" | "center" | "bottom";

  /**
   * The horizontal position of the snackbar in the container
   */
  horizontal: "left" | "center" | "right" | "stretch";

  /**
   * When animationType is set on "slide", this defines the initial position of the slide.
   * If not defined the default value is calculated using vertical & horizontal and fallback to bottom.
   */
  slideFromPosition: RelativePosition | undefined;

  /**
   * How the content of the modal should react when keyboard open
   */
  keyboardBehavior: "padding" | undefined;

  /**
   * Automatically cancel the dialog when touch outside of the view
   */
  quitOnTouchOutside: boolean;

  /**
   * Perform a cancel when click on back button (android only)
   */
  androidCancelOnClickBack: boolean;

  /**
   * The dialog will be shown outside of the safeArea
   */
  disableSafeArea: boolean;
}

export const DIALOG_DEFAULT_CONFIG: DialogConfig = {
  backgroundColor: "#e1e3e67f",
  animationType: "none",
  horizontal: "center",
  vertical: "center",
  slideFromPosition: undefined,
  quitOnTouchOutside: false,
  keyboardBehavior: undefined,
  androidCancelOnClickBack: false,
  disableSafeArea: false,
};
