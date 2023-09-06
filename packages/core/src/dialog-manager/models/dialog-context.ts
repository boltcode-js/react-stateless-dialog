/**
 * This is used as props for a dialog
 */
export type DialogContext<Args extends any, Result extends any> = {
  open: boolean;
  args: Args;
  onConfirm: (result: Result) => void;
  onCancel: () => void;
};
