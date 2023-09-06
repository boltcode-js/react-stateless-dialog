import { create } from "zustand";

export interface ISnackbarManager {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useSnackbarManager = create<ISnackbarManager>((set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export const SnackbarManager = (): ISnackbarManager => {
  return useSnackbarManager.getState();
};
