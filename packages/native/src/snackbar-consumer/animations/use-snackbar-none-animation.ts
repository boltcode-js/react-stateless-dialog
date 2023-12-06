import { SnackbarConfig } from "@react-stateless-dialog/core";
import { useCallback, useEffect } from "react";

export const useSnackbarNoneAnimation = (
  config: SnackbarConfig,
  onFinished: () => void
) => {
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

  return { handleLayout };
};
