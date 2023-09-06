import React from "react";
import { useSnackbarManager } from "@react-stateless-dialog/core/src/snackbar-manager/snackbar-manager";
import { SnackbarView } from "./snackbar-view";

export const SnackbarConsumer = () => {
  const snackbars = useSnackbarManager((state) => state.snackbars);
  const destroyFirst = useSnackbarManager((state) => state.destroyFirst);

  if (snackbars.length <= 0) {
    return null;
  }

  return (
    <>
      {snackbars.map((snack) => (
        <SnackbarView
          key={`snackbar-${snack.id}`}
          snackbar={snack}
          onFinished={destroyFirst}
        />
      ))}
    </>
  );
};
