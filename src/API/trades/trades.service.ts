import ExchangeClient from '@helpers/ExchangeClient';
import exchangeStrategies from '@helpers/ExchangeClient/exchangeStrategies';

export const calculateCumulativeDelta = async (exchange: keyof typeof exchangeStrategies, symbol: string) => {
    const exchangeClient = new ExchangeClient(exchange);
    const delta = await exchangeClient.getCumulativeDelta(symbol);

    return delta;
};
