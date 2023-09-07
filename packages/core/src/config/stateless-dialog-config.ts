import { DialogConfig } from "../dialog-manager/models/dialog-config";
import React from "react";
import { ProgressConfig } from "../progress-manager/models/progress-config";
import { SnackbarConfig } from "../snackbar-manager/models/snackbar-config";
import {
  DefaultSnackbarProps,
  SnackbarComponent,
} from "../snackbar-manager/models/snackbar-component";
import { deepMerge, DeepPartial } from "../utils/utils";

export type StatelessDialogConfig = {
  dialog: {
    defaultConfig?: Partial<DialogConfig>;
    pushDialogMiddleware?: () => void;
    Consumer: React.FunctionComponent;
  };

  snackbar: {
    defaultConfig?: Partial<SnackbarConfig>;
    Consumer: React.FunctionComponent;
    DefaultSnackbar: SnackbarComponent<DefaultSnackbarProps>;
  };

  progress: {
    config: ProgressConfig;
    Consumer: React.FunctionComponent;
  };
};

export const overrideStatelessDialogConfig = (
  defaultConfig: StatelessDialogConfig,
  userConfig: DeepPartial<StatelessDialogConfig>
): StatelessDialogConfig => {
  return deepMerge(defaultConfig, userConfig);
};
