import React, { useEffect, useRef } from "react";
import { DIALOG_DEFAULT_CONFIG } from "./dialog-manager/models/dialog-config";
import { deepMerge, DeepPartial } from "./utils/utils";
import { SNACKBAR_DEFAULT_CONFIG } from "./snackbar-manager/models/snackbar-config";
import { StatelessDialogConfig } from "./config/stateless-dialog-config";
import { setGlobalConfig } from "./config/global-config";

export type StatelessDialogProviderProps = {
  config: StatelessDialogConfig;
  children: any;
};

export const StatelessDialogProvider = (
  props: StatelessDialogProviderProps
) => {
  const { children, config } = props;

  const configRef = useRef(config);
  if (configRef.current !== config) {
    throw new Error(
      "StatelessDialogProvider error: config should be immutable"
    );
  }

  useEffect(() => {
    const effectiveConfig = deepMerge({}, config, {
      dialog: {
        defaultConfig: deepMerge(
          DIALOG_DEFAULT_CONFIG,
          config.dialog?.defaultConfig || {}
        ),
      },
      snackbar: {
        defaultConfig: deepMerge(
          SNACKBAR_DEFAULT_CONFIG,
          config.snackbar?.defaultConfig || {}
        ),
      },
    } as DeepPartial<StatelessDialogConfig>);
    setGlobalConfig(effectiveConfig);
  }, []);

  const DialogConsumer = config.dialog.Consumer;
  const ProgressConsumer = config.progress.Consumer;
  const SnackbarConsumer = config.snackbar.Consumer;

  return (
    <>
      {children}
      {/* IMPORTANT: We put consumers at the end to be in front of every other elements in the app */}
      <DialogConsumer />
      <ProgressConsumer />
      <SnackbarConsumer />
    </>
  );
};
