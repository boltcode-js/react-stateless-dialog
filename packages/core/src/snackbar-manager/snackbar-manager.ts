import { create } from "zustand";
import {
  DefaultSnackbarProps,
  SnackbarComponent,
} from "./models/snackbar-component";
import { SnackbarConfig } from "./models/snackbar-config";
import { SnackbarInstance } from "./models/snackbar-instance";
import { deepMerge } from "../utils/utils";
import { getGlobalConfig } from "../config/global-config";

export interface ISnackbarManager {
  push: <Args extends any>(
    snackbar: SnackbarComponent<Args>,
    args: Args,
    config?: Partial<SnackbarConfig>
  ) => void;
  pushDefault: (
    type: DefaultSnackbarProps["type"],
    message: string,
    config?: Partial<SnackbarConfig>
  ) => void;
}

export interface ISnackbarManagerState extends ISnackbarManager {
  nextId: number;
  snackbars: SnackbarInstance<any>[];
  destroy: (id: number) => void;
}

export const useSnackbarManager = create<ISnackbarManagerState>((set, get) => {
  const push = <Args extends any>(
    snackbar: SnackbarComponent<Args>,
    args: Args,
    partialConfig?: Partial<SnackbarConfig>
  ) => {
    const config = deepMerge(
      {},
      getGlobalConfig().snackbar.defaultConfig,
      snackbar,
      partialConfig
    );

    const snackbarId = get().nextId;

    const closeSnackbar = (id: number) => {
      set((state) => ({
        snackbars: state.snackbars.filter((x) => x.id !== id),
      }));
    };

    const snackbarInstance: SnackbarInstance<Args> = {
      id: snackbarId,
      Component: snackbar,
      context: {
        args,
        config,
        destroy: () => {
          closeSnackbar(snackbarId);
        },
      },
      config: config,
    };

    set((old) => ({
      nextId: old.nextId + 1,
      snackbars: [...old.snackbars, snackbarInstance],
    }));
  };

  return {
    nextId: 1,
    snackbars: [],
    push,
    pushDefault: (
      type: DefaultSnackbarProps["type"],
      message: string,
      config?: Partial<SnackbarConfig>
    ) => {
      push(
        getGlobalConfig().snackbar.DefaultSnackbar,
        { type, message },
        config
      );
    },
    destroy: (id: number) => {
      set((old) => ({
        snackbars: old.snackbars.filter((snack) => snack.id !== id),
      }));
    },
  };
});

export const SnackbarManager = (): ISnackbarManager => {
  return useSnackbarManager.getState();
};
