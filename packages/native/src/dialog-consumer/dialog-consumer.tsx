import React, { useContext, useMemo } from "react";
import { ReactStatelessDialogContext } from "@react-stateless-dialog/core/src/react-stateless-dialog-provider";
import { DialogConfig } from "@react-stateless-dialog/core/src/dialog-manager/models/dialog-config";
import { deepMerge } from "@react-stateless-dialog/core/src/utils/utils";
import { DialogView } from "./dialog-view";
import { useDialogManager } from "@react-stateless-dialog/core/src/dialog-manager/dialog-manager";
import { DialogInstance } from "@react-stateless-dialog/core/src/dialog-manager/models/dialog-instance";

const ShowModal = (props: { dial: DialogInstance<any, any> }) => {
  const { dial } = props;

  const Component = dial.Component;
  const context = useContext(ReactStatelessDialogContext);

  const config = useMemo<DialogConfig>(
    () => deepMerge(context.defaultDialogConfig, dial.config),
    [context.defaultDialogConfig, dial.config]
  );

  return (
    <DialogView onCancel={dial.context.onCancel} {...config}>
      <Component key={`component-${dial.id}`} {...dial.context} />
    </DialogView>
  );
};

export const DialogConsumer = () => {
  const dialogs = useDialogManager((state) => state.dialogs);

  if (dialogs.length <= 0) {
    return null;
  }

  return (
    <>
      {dialogs.map((dial) => (
        <ShowModal key={`dialog-${dial.id}`} dial={dial} />
      ))}
    </>
  );
};
