import React from "react";
import { SnackbarConfig } from "./snackbar-config";
import { SnackbarProps } from "./snackbar-context";

/**
 * Represent a Snackbar compatible with DialogManager
 */
export interface SnackbarComponent<Args extends any>
  extends Partial<SnackbarConfig> {
  (props: SnackbarProps<Args>): React.JSX.Element;
}

/**
 * SnackbarProps used for default Snackbar
 */
export interface DefaultSnackbarProps {
  message: string;
  type: "info" | "success" | "warn" | "error";
}
