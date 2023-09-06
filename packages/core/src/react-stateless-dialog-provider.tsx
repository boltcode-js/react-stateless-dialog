import React, { useEffect, useMemo } from "react";
import {
  DIALOG_DEFAULT_CONFIG,
  DialogConfig,
} from "./dialog-manager/models/dialog-config";
import { deepMerge } from "./utils/utils";
import { setPushMiddleware } from "./dialog-manager/dialog-manager";

export const ReactStatelessDialogContext = React.createContext<{
  defaultDialogConfig: DialogConfig;
}>(undefined);

export type ReactStatelessDialogProviderProps = {
  defaultDialogConfig?: Partial<DialogConfig>;
  DialogConsumer: any;
  pushDialogMiddleware: () => void;
  children: any;
};

export const ReactStatelessDialogProvider = (
  props: ReactStatelessDialogProviderProps
) => {
  const { children, DialogConsumer, pushDialogMiddleware } = props;

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
    <ReactStatelessDialogContext.Provider value={{ defaultDialogConfig }}>
      {children}
      {/* IMPORTANT: We put consumers at the end to be in front of every other elements in the app */}
      <DialogConsumer />
    </ReactStatelessDialogContext.Provider>
  );
};
