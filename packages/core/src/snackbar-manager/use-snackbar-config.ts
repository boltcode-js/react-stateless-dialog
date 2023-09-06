import { useContext, useMemo } from "react";
import { ReactStatelessDialogContext } from "../react-stateless-dialog-provider";
import { deepMerge } from "../utils/utils";
import { SnackbarConfig } from "./models/snackbar-config";
import { SnackbarComponent } from "./models/snackbar-component";

export const useSnackbarConfig = (
  component: SnackbarComponent<any>,
  config: Partial<SnackbarConfig>
): SnackbarConfig => {
  const context = useContext(ReactStatelessDialogContext);

  return useMemo<SnackbarConfig>(
    () => deepMerge(context.defaultSnackbarConfig, component, config),
    [context.defaultDialogConfig, config]
  );
};
