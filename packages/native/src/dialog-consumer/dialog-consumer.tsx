import React from "react";
import { DialogView } from "./dialog-view";
import { useDialogManager, DialogInstance } from "@react-stateless-dialog/core";

const ShowModal = (props: { dial: DialogInstance<any, any> }) => {
  const { dial } = props;

  const Component = dial.Component;

  return (
    <DialogView onCancel={dial.context.onCancel} config={dial.config}>
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
