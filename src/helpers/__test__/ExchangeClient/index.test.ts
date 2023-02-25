import ExchangeClient from '@helpers/ExchangeClient';
import KrakenStrategy from '@helpers/ExchangeClient/exchangeStrategies/KrakenStrategy';
import KucoinStrategy from '@helpers/ExchangeClient/exchangeStrategies/KucoinStrategy';

describe('Testing ExchangeClient', () => {
    describe('creation of Client', () => {
        test('should create exchange clients by strategies', () => {
            const kucoinExchangeClient = new ExchangeClient('kucoin');
            const KrakenExchangeClient = new ExchangeClient('kraken');

            expect(kucoinExchangeClient.getStrategy() instanceof KucoinStrategy).toBe(true);
            expect(KrakenExchangeClient.getStrategy() instanceof KrakenStrategy).toBe(true);
        });
    });
});
