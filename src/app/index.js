/* Express App */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import expressSanitizer from 'express-sanitizer';
import rateLimit from 'express-rate-limit';
import { Environment, CustomLogger } from '../utils';

import router from '../routes';

/* My express App */
export default function expressApp() {
  const app = express();

  if (Environment.isDevelopment()) {
    app.use(cors());
  } else {
    const whitelist = Environment.getValidWhiteListDomains();
    const corsOptions = {
      origin(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };
    app.use(cors(corsOptions)); // Server lock with Cors.

    const limiter = rateLimit({
      windowMs: Environment.getRateLimitInSeconds(),
      max: Environment.getRateLimitMax(),
    });
    //  apply to all requests
    app.use(limiter);
  }

  // Apply express middlewares

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(expressSanitizer());
  // app.use(basicAuth());

  // gzip responses
  app.use(compression());

  // Attach logger
  app.use(morgan(CustomLogger));

  // Setup routes
  app.use(Environment.getRoutePath(), router);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  // Handle Error here.
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    console.error('error is ', err);
    const status = err.status || 500;
    return res.json({ success: false, status, message: err.message });
  });

  return app;
}
