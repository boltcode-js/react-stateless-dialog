import React, { useEffect, useMemo } from "react";
import {
  DIALOG_DEFAULT_CONFIG,
  DialogConfig,
} from "./dialog-manager/models/dialog-config";
import { deepMerge } from "./utils/utils";
import { setPushMiddleware } from "./dialog-manager/dialog-manager";
import { ProgressConfig } from "./progress-manager/models/progress-config";
import {
  SNACKBAR_DEFAULT_CONFIG,
  SnackbarConfig,
} from "./snackbar-manager/models/snackbar-config";
import { setDefaultSnackbar } from "./snackbar-manager/snackbar-manager";
import {
  DefaultSnackbarProps,
  SnackbarComponent,
} from "./snackbar-manager/models/snackbar-component";

export const ReactStatelessDialogContext = React.createContext<{
  defaultDialogConfig: DialogConfig;
  defaultSnackbarConfig: SnackbarConfig;
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
  defaultSnackbarConfig?: Partial<SnackbarConfig>;
  SnackbarConsumer: React.FunctionComponent;
  DefaultSnackbar: SnackbarComponent<DefaultSnackbarProps>;

  // Others
  children: any;
};

export const StatelessDialogProvider = (
  props: ReactStatelessDialogProviderProps
) => {
  const {
    children,
    DialogConsumer,
    pushDialogMiddleware,
    progressConfig,
    ProgressConsumer,
    SnackbarConsumer,
    DefaultSnackbar,
  } = props;

  const defaultDialogConfig = useMemo(
    () => deepMerge(DIALOG_DEFAULT_CONFIG, props.defaultDialogConfig),
    [props.defaultDialogConfig]
  );

  const defaultSnackbarConfig = useMemo(
    () => deepMerge(SNACKBAR_DEFAULT_CONFIG, props.defaultSnackbarConfig),
    [props.defaultSnackbarConfig]
  );

  useEffect(() => {
    // TODO: We can probably find a better way to do this
    // Make native & web module add actions before a dialog is open
    setPushMiddleware(pushDialogMiddleware);
    setDefaultSnackbar(DefaultSnackbar);
  });

  return (
    <ReactStatelessDialogContext.Provider
      value={{ defaultDialogConfig, progressConfig, defaultSnackbarConfig }}
    >
      {children}
      {/* IMPORTANT: We put consumers at the end to be in front of every other elements in the app */}
      <DialogConsumer />
      <ProgressConsumer />
      <SnackbarConsumer />
    </ReactStatelessDialogContext.Provider>
  );
};
