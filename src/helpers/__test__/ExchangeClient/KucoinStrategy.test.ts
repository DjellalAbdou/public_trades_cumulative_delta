import externalApi from '@api/AxiosInstance';
import KEYS from '@config/keys';
import KucoinStrategy from '@helpers/ExchangeClient/exchangeStrategies/KucoinStrategy';
import { staticKucoinHistories, staticKucoinSymbol } from './exchangeClient.mocks';

const {
    KUCOIN: { BASE_URL, HISOTRY_URL },
} = KEYS;

jest.mock('@api/AxiosInstance');

describe('Testing Kucoin Strategy', () => {
    describe('getCumulativeDelta', () => {
        const mockedExternalApiGet = jest.mocked(externalApi.get);

        test('should return correct delta from kucoin api', async () => {
            const kucoinStrategy = new KucoinStrategy();
            mockedExternalApiGet.mockResolvedValueOnce({ data: { data: staticKucoinHistories } });

            const delta = await kucoinStrategy.getCumulativeDelta(staticKucoinSymbol);

            expect(mockedExternalApiGet).toHaveBeenCalledTimes(1);
            expect(mockedExternalApiGet).toHaveBeenCalledWith(HISOTRY_URL, {
                baseUrl: BASE_URL,
                params: { symbol: staticKucoinSymbol },
            });

            expect(delta).toBe(0.00350506);
        });
    });
});
