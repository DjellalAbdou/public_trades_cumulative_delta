import externalApi from '@api/AxiosInstance';
import KEYS from '@config/keys';
import KrakenStrategy from '@helpers/ExchangeClient/exchangeStrategies/KrakenStrategy';
import { staticKrakenHistories, staticKrakenSymbol } from './exchangeClient.mocks';

const {
    KRAKEN: { BASE_URL, TRADE_URL },
} = KEYS;

jest.mock('@api/AxiosInstance');

describe('Testing Kraken Strategy', () => {
    describe('getCumulativeDelta', () => {
        const mockedExternalApiGet = jest.mocked(externalApi.get);

        test('should return correct delta from kucoin api', async () => {
            const kucoinStrategy = new KrakenStrategy();
            mockedExternalApiGet.mockResolvedValueOnce({
                data: {
                    errors: [],
                    result: {
                        [staticKrakenSymbol]: staticKrakenHistories,
                    },
                },
            });

            const delta = await kucoinStrategy.getCumulativeDelta(staticKrakenSymbol);

            expect(mockedExternalApiGet).toHaveBeenCalledTimes(1);
            expect(mockedExternalApiGet).toHaveBeenCalledWith(TRADE_URL, {
                baseUrl: BASE_URL,
                params: { pair: staticKrakenSymbol },
            });

            expect(delta).toBe(-0.8939999999999999);
        });
    });
});
