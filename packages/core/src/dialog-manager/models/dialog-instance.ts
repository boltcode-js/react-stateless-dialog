import { DialogConfig } from "./dialog-config";
import { DialogContext } from "./dialog-context";
import { DialogComponent } from "./dialog-component";

/**
 * An instance of dialog for the DialogManager
 */
export type DialogInstance<Args extends any, Result extends any> = {
  id: number;
  Component: DialogComponent<Args, Result>;
  context: DialogContext<Args, Result>;
  config?: Partial<DialogConfig>;
  interceptor?: (result: Result) => boolean | Promise<boolean>;
};
