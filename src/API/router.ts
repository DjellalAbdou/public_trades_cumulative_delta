import express, { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';

import { errorHandler } from '@middlewares/errorsHandler';

const router = express.Router();

router.get('/status', (req, res) => {
    return res.status(httpStatus.OK).send({ code: httpStatus.OK, message: 'OK' });
});

// mount api routes

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
