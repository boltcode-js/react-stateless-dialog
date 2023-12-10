import React from "react";
import { DialogView } from "./dialog-view";
import { useDialogManager } from "@react-stateless-dialog/core";

export const DialogConsumer = () => {
  const dialogs = useDialogManager((state) => state.dialogs);

  if (dialogs.length <= 0) {
    return null;
  }

  return (
    <>
      {dialogs.map((dialog) => (
        <DialogView key={dialog.id} dialog={dialog} />
      ))}
    </>
  );
};
