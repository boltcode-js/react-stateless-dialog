import React, { useEffect, useMemo } from "react";
import {
  DIALOG_DEFAULT_CONFIG,
  DialogConfig,
} from "./dialog-manager/models/dialog-config";
import { deepMerge } from "./utils/utils";
import { setPushMiddleware } from "./dialog-manager/dialog-manager";
import { ProgressConfig } from "./progress-manager/models/progress-config";

export const ReactStatelessDialogContext = React.createContext<{
  defaultDialogConfig: DialogConfig;
  progressConfig: ProgressConfig;
}>(undefined);

export type ReactStatelessDialogProviderProps = {
  // Dialog
  defaultDialogConfig?: Partial<DialogConfig>;
  DialogConsumer: React.FunctionComponent;
  pushDialogMiddleware: () => void;

  // Progress
  progressConfig: ProgressConfig;
  ProgressConsumer: React.FunctionComponent;

  // Snackbar
  SnackbarConsumer: React.FunctionComponent;

  // Others
  children: any;
};

export const ReactStatelessDialogProvider = (
  props: ReactStatelessDialogProviderProps
) => {
  const {
    children,
    DialogConsumer,
    pushDialogMiddleware,
    progressConfig,
    ProgressConsumer,
    SnackbarConsumer,
  } = props;

  const defaultDialogConfig = useMemo(
    () => deepMerge(DIALOG_DEFAULT_CONFIG, props.defaultDialogConfig),
    [props.defaultDialogConfig]
  );

  useEffect(() => {
    // TODO: We can probably find a better way to do this
    // Make native & web module add actions before a dialog is open
    setPushMiddleware(pushDialogMiddleware);
  });

  return (
    <ReactStatelessDialogContext.Provider
      value={{ defaultDialogConfig, progressConfig }}
    >
      {children}
      {/* IMPORTANT: We put consumers at the end to be in front of every other elements in the app */}
      <DialogConsumer />
      <ProgressConsumer />
      <SnackbarConsumer />
    </ReactStatelessDialogContext.Provider>
  );
};
