import { SnackbarConfig } from "@react-stateless-dialog/core";
import { useCallback, useEffect } from "react";
import { UseSnackbarAnimationResult } from "./use-snackbar-animation";

export const useSnackbarNoneAnimation = (
  config: SnackbarConfig,
  onFinished: () => void
): UseSnackbarAnimationResult => {
  let timeout: NodeJS.Timeout;
  const handleLayout = useCallback(() => {
    timeout = setTimeout(() => {
      onFinished();
      timeout = undefined;
    }, config.duration);
  }, [config.duration, onFinished]);

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
    };
  }, []);

  return { handleLayout, animatedStyles: {}, close: onFinished };
};
