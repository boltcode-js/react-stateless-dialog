// Provider
export { StatelessDialogProvider } from "./stateless-dialog-provider";
export type { StatelessDialogProviderProps } from "./stateless-dialog-provider";

// Dialog Manager
export {
  DialogManager,
  useDialogManager,
} from "./dialog-manager/dialog-manager";
export type { DialogHandler } from "./dialog-manager/models/dialog-handler";
export type { DialogContext } from "./dialog-manager/models/dialog-context";
export type { DialogComponent } from "./dialog-manager/models/dialog-component";
export type { DialogConfig } from "./dialog-manager/models/dialog-config";
export { DIALOG_DEFAULT_CONFIG } from "./dialog-manager/models/dialog-config";
export type { DialogInstance } from "./dialog-manager/models/dialog-instance";

// Progress Manager
export {
  ProgressManager,
  useProgressManager,
} from "./progress-manager/progress-manager";
export type { ProgressComponent } from "./progress-manager/models/progress-component";

// Snackbar Manager
export {
  SnackbarManager,
  useSnackbarManager,
} from "./snackbar-manager/snackbar-manager";
export type { SnackbarConfig } from "./snackbar-manager/models/snackbar-config";
export { SNACKBAR_DEFAULT_CONFIG } from "./snackbar-manager/models/snackbar-config";
export type { SnackbarInstance } from "./snackbar-manager/models/snackbar-instance";
export type {
  SnackbarComponent,
  DefaultSnackbarProps,
} from "./snackbar-manager/models/snackbar-component";
export type { SnackbarContext } from "./snackbar-manager/models/snackbar-context";

// Utils
export { getGlobalConfig } from "./config/global-config";
export { overrideStatelessDialogConfig } from "./config/stateless-dialog-config";
export { invertColor } from "./utils/utils";
export type { StatelessDialogConfig } from "./config/stateless-dialog-config";
export type {
  RelativePosition,
  HorizontalAlignement,
  VerticalAlignement,
  Position,
  Size,
  Layout,
  SafeArea,
} from "./common/common.models";
export {
  getEffectiveSlideFromPosition,
  getSlideStartPosition,
} from "./common/slide-helpers";
export { getAbsoluteLayout } from "./common/layout";
