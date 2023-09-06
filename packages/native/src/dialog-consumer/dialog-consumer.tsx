import React from "react";
import { DialogView } from "./dialog-view";
import { useDialogManager } from "@react-stateless-dialog/core/src/dialog-manager/dialog-manager";
import { DialogInstance } from "@react-stateless-dialog/core/src/dialog-manager/models/dialog-instance";
import { useDialogConfig } from "@react-stateless-dialog/core/src/dialog-manager/use-dialog-config";

const ShowModal = (props: { dial: DialogInstance<any, any> }) => {
  const { dial } = props;

  const Component = dial.Component;
  const config = useDialogConfig(Component, dial.config);

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
