import React from "react";
import { useSnackbarManager } from "@react-stateless-dialog/core";
import { SnackbarView } from "./snackbar-view";

export const SnackbarConsumer = () => {
  const snackbars = useSnackbarManager((state) => state.snackbars);

  if (snackbars.length <= 0) {
    return null;
  }

  return (
    <>
      {snackbars.map((snack) => (
        <SnackbarView key={snack.id} snackbar={snack} />
      ))}
    </>
  );
};
