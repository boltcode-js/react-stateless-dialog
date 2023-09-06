import React from "react";
import { DialogContext } from "./dialog-context";

/**
 * Represent a Dialog compatible with DialogManager
 */
export type DialogComponent<Args extends any, Result extends any> = (
  props: DialogContext<Args, Result>
) => React.JSX.Element;
