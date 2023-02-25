import express, { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';

import tradesRouter from './trades/trades.routes';

import { errorHandler } from '@middlewares/errorsHandler';
import { validateCumulativeDelta } from './trades/trades.validator';

const router = express.Router();

router.get('/status', (req, res) => {
    return res.status(httpStatus.OK).send({ code: httpStatus.OK, message: 'OK' });
});

// mount api routes
router.use('/trade', tradesRouter);

// mount centralised error handler
router.use(errorHandler);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        error: err,
        message: 'Internal server error!',
    });
    next();
});

export default router;
