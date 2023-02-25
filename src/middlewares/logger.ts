import express from 'express';

// type is any to remove dependency from the used logger library
const requestLoggerMiddleware = (logger: any) => {
    const onRequest: express.RequestHandler = (req, res, next) => {
        const start = new Date().getTime();
        res.on('finish', () => {
            if (req.url !== '/status') {
                logger.info('request:', {
                    httpMethod: req.method,
                    url: req.originalUrl,
                    params: req.query || 'none',
                    statusCode: res.statusCode,
                    date: new Date().toISOString(),
                    dataLatency: new Date().getTime() - start,
                });
            }
        });
        next();
    };
    return onRequest;
};

export { requestLoggerMiddleware };
