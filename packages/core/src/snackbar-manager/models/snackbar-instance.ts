import { SnackbarComponent } from "./snackbar-component";
import { SnackbarContext } from "./snackbar-context";
import { SnackbarConfig } from "./snackbar-config";

/**
 * An instance of dialog for the DialogManager
 */
export type SnackbarInstance<Args extends any> = {
  id: number;
  Component: SnackbarComponent<Args>;
  context: SnackbarContext<Args>;
  config?: SnackbarConfig;
};
