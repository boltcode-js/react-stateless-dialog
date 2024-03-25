import { DialogConfig } from "../dialog-manager/models/dialog-config";
import React from "react";
import { SnackbarConfig } from "../snackbar-manager/models/snackbar-config";
import {
  DefaultSnackbarProps,
  SnackbarComponent,
} from "../snackbar-manager/models/snackbar-component";
import { deepMerge, DeepPartial } from "../utils/utils";
import { ProgressComponent } from "../progress-manager/models/progress-component";

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
    Component: ProgressComponent;
    Consumer: React.FunctionComponent;
  };
};

export const extendConfig = (
  defaultConfig: StatelessDialogConfig,
  userConfig: DeepPartial<StatelessDialogConfig>
): StatelessDialogConfig => {
  return deepMerge(defaultConfig, userConfig);
};
