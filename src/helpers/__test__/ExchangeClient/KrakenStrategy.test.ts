import externalApi from '@api/AxiosInstance';
import KEYS from '@config/keys';
import KrakenStrategy from '@helpers/ExchangeClient/exchangeStrategies/KrakenStrategy';
import { staticKrakenHistories, staticKrakenSymbol, staticKrakenPairSymbols } from './exchangeClient.mocks';

const {
    KRAKEN: { BASE_URL, TRADE_URL, PAIRS_URL },
} = KEYS;

jest.mock('@api/AxiosInstance');

describe('Testing Kraken Strategy', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCumulativeDelta', () => {
        const mockedExternalApiGet = jest.mocked(externalApi.get);

        test('should return correct delta from kucoin api', async () => {
            const krakenStrategy = new KrakenStrategy();
            mockedExternalApiGet.mockResolvedValueOnce({
                data: {
                    errors: [],
                    result: {
                        [staticKrakenSymbol]: staticKrakenHistories,
                    },
                },
            });

            const delta = await krakenStrategy.getCumulativeDelta(staticKrakenSymbol);

            expect(mockedExternalApiGet).toHaveBeenCalledTimes(1);
            expect(mockedExternalApiGet).toHaveBeenCalledWith(TRADE_URL, {
                baseUrl: BASE_URL,
                params: { pair: staticKrakenSymbol },
            });

            expect(delta).toBe(-0.8939999999999999);
        });
    });

    describe('getAvailablePairSymbols', () => {
        const mockedExternalApiGet = jest.mocked(externalApi.get);

        test('should return list of available pair symbols', async () => {
            const krakenStrategy = new KrakenStrategy();
            mockedExternalApiGet.mockResolvedValueOnce({
                data: {
                    errors: [],
                    result: staticKrakenPairSymbols,
                },
            });

            const pairSymbols = await krakenStrategy.getAvailablePairSymbols();
            expect(mockedExternalApiGet).toHaveBeenCalledTimes(1);
            expect(mockedExternalApiGet).toHaveBeenCalledWith(PAIRS_URL, {
                baseUrl: BASE_URL,
            });
            expect(pairSymbols.length).toBe(4);
            expect(pairSymbols.includes(staticKrakenSymbol)).toBe(true);
            expect(pairSymbols.includes(staticKrakenSymbol + 'something')).toBe(false);
        });
    });
});
