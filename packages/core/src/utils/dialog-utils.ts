import { DialogConfig } from "../dialog-manager/models/dialog-config";
import { DialogComponent } from "../dialog-manager/models/dialog-component";

export const createDialog = <Args extends any, Result extends any>(
  component: DialogComponent<Args, Result>,
  config: Partial<DialogConfig> = {}
): DialogComponent<Args, Result> => {
  Object.assign(component, config);
  return component;
};
