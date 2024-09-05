/**
 * An object to manage a dialog returned by the push function
 */
export type DialogHandler<Result extends any> = {
  /**
   * Id of the dialog provided by the DialogManager
   */
  id: number;

  /**
   * Force the dialog to resolve with the given result
   * @param result
   */
  confirm: (result: Result) => void;

  /**
   * Force de dialog to cancel
   */
  cancel: () => void;

  /**
   * waitPromise return a promise that resolve with the result of the dialog, or reject when cancel.
   * If you prefer to resolve with undefined in case of cancel, use waitIgnoreCancel().
   */
  waitPromise: () => Promise<Result>;

  /**
   * waitIgnoreCancel return a promise that resolve with the result of the dialog, or resolve with undefined in case of cancel.
   * If you prefer to reject the promise in case of cancel, use waitPromise().
   */
  waitIgnoreCancel: () => Promise<Result>;

  /**
   * Add an interceptor that handle the result. If the interceptor return false, the dialog is not closed after the result is handled.
   * It can be used to perform validation before the dialog get closed.
   *
   * The function return the current DialogHandler, so you can chain your function call.
   */
  setInterceptor: (
    interceptor: (result: Result) => boolean | Promise<boolean>
  ) => DialogHandler<Result>;
};
