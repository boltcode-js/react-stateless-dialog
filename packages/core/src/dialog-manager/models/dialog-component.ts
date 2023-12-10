import React from "react";
import { DialogProps } from "./dialog-context";
import { DialogConfig } from "./dialog-config";

/**
 * Represent a Dialog compatible with DialogManager
 */
export interface DialogComponent<Args extends any, Result extends any>
  extends Partial<DialogConfig> {
  (props: DialogProps<Args, Result>): React.JSX.Element;
}
