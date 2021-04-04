require('dotenv').config();

class Environment {
  constructor() {
    this.devEnvironment = process.env.NODE_ENV !== 'production';
    this.serverName = process.env.EXPRESS_BASE_API_NAME;
    this.whiteListedDomains = process.env.CORS_VALID_DOMAINS?.split(',');
    this.rateLimitMax = process.env.RATE_LIMIT_MAX;
    this.rateLimitInSeconds = process.env.RATE_LIMIT_IN_SECONDS;
  }

  getRateLimitMax() {
    return this.rateLimitMax;
  }

  getRateLimitInSeconds() {
    return this.rateLimitInSeconds;
  }

  getValidWhiteListDomains() {
    return this.whiteListedDomains;
  }

  isDevelopment() {
    return this.devEnvironment;
  }

  getRoutePath() {
    // Set router base path for local dev
    return this.isDevelopment()
        ? `/${this.serverName}`
        : `/.netlify/functions/${this.serverName}/`;
  }
}

export default new Environment(); // Singleton
