import { StatelessDialogConfig } from "./stateless-dialog-config";

let globalConfig: StatelessDialogConfig;

export const setGlobalConfig = (config: StatelessDialogConfig) => {
  globalConfig = Object.freeze(config);
};

export const getGlobalConfig = () => {
  return globalConfig;
};
