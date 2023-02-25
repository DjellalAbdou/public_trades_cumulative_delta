import BadUserInputError from '@helpers/exceptions/BadUserInputError';
import logger from '@utils/logger';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(err);
    if (err instanceof BadUserInputError) {
        return res.status(err.statusCode).json(err.name);
    }

    next();
};
