import { DialogComponent } from "./models/dialog-component";
import { DialogConfig } from "./models/dialog-config";
import { useContext, useMemo } from "react";
import { ReactStatelessDialogContext } from "../react-stateless-dialog-provider";
import { deepMerge } from "../utils/utils";

export const useDialogConfig = (
  component: DialogComponent<any, any>,
  config: Partial<DialogConfig>
): DialogConfig => {
  const context = useContext(ReactStatelessDialogContext);

  return useMemo<DialogConfig>(
    () => deepMerge(context.defaultDialogConfig, component, config),
    [context.defaultDialogConfig, config]
  );
};
