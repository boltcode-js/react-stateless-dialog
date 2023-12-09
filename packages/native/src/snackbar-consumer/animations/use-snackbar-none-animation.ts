import { SnackbarConfig } from "@react-stateless-dialog/core";
import { useCallback, useEffect } from "react";
import { UseSnackbarAnimationResult } from "./use-snackbar-animation";

export const useSnackbarNoneAnimation = (
  config: SnackbarConfig,
  destroy: () => void
): UseSnackbarAnimationResult => {
  let timeout: NodeJS.Timeout;
  const handleLayout = useCallback(() => {
    timeout = setTimeout(() => {
      destroy();
      timeout = undefined;
    }, config.duration);
  }, [config.duration, destroy]);

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
    };
  }, []);

  return { handleLayout, animatedStyles: {}, close: destroy };
};
