import { Handler } from 'express';
import httpStatus from 'http-status';

import logger from '@utils/logger';
import { calculateCumulativeDelta } from './trades.service';
import exchangeStrategies from '@helpers/ExchangeClient/exchangeStrategies';

export const getCumulativeDeltaController: Handler = async (req, res, next) => {
    try {
        const { params, query } = req;
        // params to get the exchange, and query to get the pairsymbol
        // as a best practice we use params to specify resources and query to filter, in our case exchange as a resource
        // and pairSymbol ar a filter on our response
        const delta = await calculateCumulativeDelta(
            params.exchange as keyof typeof exchangeStrategies,
            query.pairSymbol as string,
        );
        return res.status(httpStatus.OK).json({
            code: httpStatus.OK,
            delta,
        });
    } catch (error) {
        logger.error('getCumulativeDeltaController', error);
        next(error);
    }
};
