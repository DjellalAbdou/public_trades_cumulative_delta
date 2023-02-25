import exchangeStrategies from '@helpers/ExchangeClient/exchangeStrategies';
import { validate } from '@middlewares/validateRequest';
import { z } from 'zod';

const cumulativeDeltaSchema = z
    .object({
        params: z.object({
            exchange: z.string({ required_error: 'exchange is needed' }).refine(
                (exchange) => Object.keys(exchangeStrategies).includes(exchange),
                (exchange) => ({
                    message: `your selected ${exchange} exchange is not allowed is the list ${Object.keys(
                        exchangeStrategies,
                    )}`,
                }),
            ),
        }),
        query: z.object({
            pairSymbol: z.string({
                required_error: 'pair symbol is required',
            }),
        }),
    })
    .refine(
        async (data) => {
            const exchange = new exchangeStrategies[data.params.exchange as keyof typeof exchangeStrategies]();
            const availablePairs = await exchange.getAvailablePairSymbols();
            return availablePairs.includes(data.query.pairSymbol);
        },
        (data) => ({
            message: `your pair symbol ${data.query.pairSymbol} doesn't exists for the exchange ${data.params.exchange}`,
        }),
    );

export const validateCumulativeDelta = validate(cumulativeDeltaSchema);
