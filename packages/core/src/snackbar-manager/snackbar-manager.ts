import { create } from "zustand";
import { SnackbarComponent } from "./models/snackbar-component";
import { SnackbarConfig } from "./models/snackbar-config";
import { SnackbarInstance } from "./models/snackbar-instance";

export interface ISnackbarManager {
  push: <Args extends any>(
    snackbar: SnackbarComponent<Args>,
    args: Args,
    config?: Partial<SnackbarConfig>
  ) => void;
}

export interface ISnackbarManagerState extends ISnackbarManager {
  nextId: number;
  snackbars: SnackbarInstance<any>[];
  destroyFirst: () => void;
}

export const useSnackbarManager = create<ISnackbarManagerState>((set, get) => ({
  nextId: 1,
  snackbars: [],
  push: <Args extends any>(
    snackbar: SnackbarComponent<Args>,
    args: Args,
    config?: Partial<SnackbarConfig>
  ) => {
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
        config: config as SnackbarConfig, // TODO: Merge config here
        onClose: () => {
          closeSnackbar(snackbarId);
        },
      },
      config: config,
    };

    set((old) => ({
      nextId: old.nextId + 1,
      snackbars: [...old.snackbars, snackbarInstance],
    }));
  },
  destroyFirst: () => {
    if (get().snackbars.length > 0) {
      set((old) => ({
        snackbars: old.snackbars.filter((_b, i) => !!i),
      }));
    }
  },
}));

export const SnackbarManager = (): ISnackbarManager => {
  return useSnackbarManager.getState();
};
