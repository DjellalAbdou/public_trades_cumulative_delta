import express from 'express';
import cors from 'cors';

import { requestLoggerMiddleware } from '@middlewares/logger';

import router from '@api/router';
import logger from '@utils/logger';

const server = express();

// TEMP: enable cors for all requests
server.use(cors({ credentials: true, preflightContinue: false, optionsSuccessStatus: 200 }));
server.options('*', cors({ credentials: true, preflightContinue: false, optionsSuccessStatus: 200 }));

// parse request body params and attache them ro req.body
server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ extended: true, limit: '5mb' }));

// remove information about technologies used for the server
server.disable('x-powered-by');

// add a logging message to all request calls
server.use(requestLoggerMiddleware(logger));

// mount api router
server.use('/api', router);

export default server;
