import {
  StatelessDialogConfig,
  DIALOG_DEFAULT_CONFIG,
  SNACKBAR_DEFAULT_CONFIG,
} from "@react-stateless-dialog/core";
import { Keyboard } from "react-native";
import { DialogConsumer } from "./dialog-consumer/dialog-consumer";
import { SnackbarConsumer } from "./snackbar-consumer/snackbar-consumer";
import { DefaultSnackbar } from "./snackbar-consumer/default-snackbar";
import { ProgressConsumer } from "./progress-consumer/progress-consumer";
import { DefaultProgressComponent } from "./progress-consumer/default-progress-component";

export const StatelessDialogConfigNative: StatelessDialogConfig = {
  dialog: {
    defaultConfig: DIALOG_DEFAULT_CONFIG,
    pushDialogMiddleware: Keyboard.dismiss,
    Consumer: DialogConsumer,
  },
  snackbar: {
    defaultConfig: SNACKBAR_DEFAULT_CONFIG,
    Consumer: SnackbarConsumer,
    DefaultSnackbar: DefaultSnackbar,
  },
  progress: {
    Consumer: ProgressConsumer,
    Component: DefaultProgressComponent,
  },
};
