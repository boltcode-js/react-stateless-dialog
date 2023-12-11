import { SnackbarConfig } from "./snackbar-config";

/**
 * This is the context defined by the manager when creating a snackbar
 */
export type SnackbarContext<Args extends any> = {
  args: Args;
  config: SnackbarConfig;

  /**
   * Remove the snackbar from the store
   */
  destroy: () => void;
};

/**
 * This is used as props for a snackbar component
 */
export type SnackbarProps<Args extends any> = SnackbarContext<Args> & {
  /**
   * Close the snackbar with animation
   */
  onClose: () => void;
};
