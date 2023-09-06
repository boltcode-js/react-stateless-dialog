import { create } from "zustand";

export interface IProgressManager {
  isLoading: boolean;
  setLoading: (isLoading: boolean, message?: string) => void;
  show: (message?: string) => void;
  hide: () => void;
}

export interface ProgressManagerState extends IProgressManager {
  message?: string;
}

export const useProgressManager = create<ProgressManagerState>((set) => {
  const setLoading = (isLoading: boolean, message?: string) => {
    set({ isLoading, message });
  };

  return {
    isLoading: false,
    message: undefined,
    setLoading,
    show: (message?: string) => setLoading(true, message),
    hide: () => setLoading(false),
  };
});

export const ProgressManager = (): IProgressManager => {
  return useProgressManager.getState();
};
