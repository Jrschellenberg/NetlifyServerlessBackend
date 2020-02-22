export default class ServerUtils {
  static throwError(status, message, next) {
    const err = new Error(message);
    err.status = status;
    return next(err);
  }

  static rejectError(status, message) {
    const rejectError = {
      status,
      message,
    };
    return rejectError;
  }

  static sleep(time) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }
}
