require('dotenv').config();

class ServerUtils {
  constructor() {
    if (!ServerUtils.instance) {
      // if an instance does not exist
      this.serverName = process.env.EXPRESS_BASE_API_NAME;
      this.publicKey = process.env.ENCRYPTION_PUBLIC_KEY;
      this.secretKey = process.env.ENCRYPTION_SECRET_KEY;
      ServerUtils.instance = this;
    }
    return ServerUtils.instance;
  }

  getSecretKey() {
    return this.secretKey;
  }

  getPublicKey() {
    return this.publicKey;
  }

  getRoutePath() {
    // Set router base path for local dev
    return process.env.DEV_ENV === 'true' ? `/${this.serverName}` : `/.netlify/functions/${this.serverName}/`;
  }

  throwError(status, message, next) {
    let err = new Error(message);
    err.status = status;
    return next(err);
  }

  rejectError(status, message) {
    let rejectError = {
      status: status,
      message: message
    };
    return rejectError;
  }

  sleep(time) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }
}

const instance = new ServerUtils();
export default instance; //Singleton pattern. only exposing this one instance.
