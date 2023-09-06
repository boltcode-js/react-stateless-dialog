import { DialogConfig } from "./models/dialog-config";
import { DialogComponent } from "./models/dialog-component";
import { DialogHandler } from "./models/dialog-handler";
import { DialogInstance } from "./models/dialog-instance";
import { create } from "zustand";

export interface IDialogManager {
  push: <Args extends any, Result extends any>(
    dialog: DialogComponent<Args, Result>,
    args: Args,
    config?: Partial<DialogConfig>
  ) => DialogHandler<Result>;
  cancelAll: () => void;
}

export interface DialogManagerState extends IDialogManager {
  nextId: number;
  dialogs: DialogInstance<any, any>[];
}

const callInterceptor = async <T extends any>(
  result: T,
  interceptor?: (result: T) => boolean | Promise<boolean>
): Promise<boolean> => {
  if (!interceptor) {
    return true;
  }

  const callResult = interceptor(result);
  if (typeof callResult === "boolean") {
    return callResult;
  } else {
    return await callResult;
  }
};

export const useDialogManager = create<DialogManagerState>((set, get) => ({
  nextId: 1,
  dialogs: [],
  cancelAll() {
    const dialogs = get().dialogs;
    for (let i = dialogs.length - 1; i >= 0; i--) {
      dialogs[i].context.onCancel();
    }
  },
  push<Args extends any, Result extends any>(
    dialog: DialogComponent<Args, Result>,
    args: Args,
    config?: Partial<DialogConfig>
  ) {
    const closeDialog = (id: number) =>
      set((state) => ({ dialogs: state.dialogs.filter((x) => x.id !== id) }));
    const dialogId = get().nextId;

    let resolvePromise: (value: Result | PromiseLike<Result>) => void;
    let rejectPromise: (reason?: any) => void;
    const promise = new Promise<Result>((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });

    let interceptor: (result: Result) => boolean | Promise<boolean>;
    const dialogInstance: DialogInstance<Args, Result> = {
      id: dialogId,
      Component: dialog,
      context: {
        args,
        open: true,
        onConfirm: (result: Result) => {
          callInterceptor(result, interceptor).then((next) => {
            if (next) {
              resolvePromise(result);
              closeDialog(dialogId);
            }
          });
        },
        onCancel: () => {
          rejectPromise();
          closeDialog(dialogId);
        },
      },
      config: config,
    };

    const handler: DialogHandler<Result> = {
      id: dialogId,
      confirm: dialogInstance.context.onConfirm,
      cancel: dialogInstance.context.onCancel,
      waitPromise: () => promise,
      waitIgnoreCancel: () => {
        return new Promise((resolve) => {
          promise.then(resolve).catch(() => resolve(undefined));
        });
      },
      setInterceptor: undefined,
    };
    handler.setInterceptor = (_i) => {
      interceptor = _i;
      return handler;
    };

    set((state) => ({
      nextId: dialogId + 1,
      dialogs: [...state.dialogs, dialogInstance],
    }));
    return handler;
  },
}));

export const DialogManager = (): IDialogManager => {
  return useDialogManager.getState();
};
