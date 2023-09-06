import { SnackbarConfig } from "./snackbar-config";

/**
 * This is used as props for a snackbar component
 */
export type SnackbarContext<Args extends any> = {
  args: Args;
  config: SnackbarConfig;
  onClose: () => void;
};
