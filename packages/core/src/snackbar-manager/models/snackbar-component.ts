import React from "react";
import { SnackbarConfig } from "./snackbar-config";
import { SnackbarContext } from "./snackbar-context";

/**
 * Represent a Snackbar compatible with DialogManager
 */
export interface SnackbarComponent<Args extends any>
  extends Partial<SnackbarConfig> {
  (props: SnackbarContext<Args>): React.JSX.Element;
}
