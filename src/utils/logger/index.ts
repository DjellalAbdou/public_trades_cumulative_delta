import winston from 'winston';
import devLogger from './devLogger';
import keys from '@config/keys';

let logger: winston.Logger = null;

if (keys.CURRENT_ENV === 'development') {
    logger = devLogger;
} else {
    // TODO: change to prod logger
    logger = devLogger;
}

export default logger;
