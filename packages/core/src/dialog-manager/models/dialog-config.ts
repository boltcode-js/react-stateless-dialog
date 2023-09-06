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
}

export const DIALOG_DEFAULT_CONFIG: DialogConfig = {
  backgroundColor: "#e1e3e67f",
  animationType: "none",
  quitOnTouchOutside: false,
  keyboardBehavior: undefined,
  androidCancelOnClickBack: false,
};
