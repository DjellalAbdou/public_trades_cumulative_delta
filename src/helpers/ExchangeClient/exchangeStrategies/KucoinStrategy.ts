import externalApi from '@api/AxiosInstance';
import KEYS from '@config/keys';
import { IExchangeStrategy, TExchangeStrategy } from '../types';

const {
    KUCOIN: { BASE_URL, HISOTRY_URL },
} = KEYS;

export default class KucoinStrategy implements IExchangeStrategy {
    public readonly config = {
        historyUrl: HISOTRY_URL,
        apiBaseUrl: BASE_URL,
    };

    public options: TExchangeStrategy;
    constructor(options?: TExchangeStrategy) {
        this.options = options || { initialDelta: 0 };
    }

    async getCumulativeDelta(symbol: string) {
        const res = await externalApi.get(this.config.historyUrl, {
            baseURL: this.config.apiBaseUrl,
            params: { symbol },
        });

        // we use size and not price because we increment or decrement by the number of tokens and not there prices
        const delta = res.data.data.reduce(
            (acc: number, currentVal: any) =>
                currentVal.side === 'buy' ? acc + Number(currentVal.size) : acc - Number(currentVal.size),
            this.options.initialDelta,
        );
        return delta;
    }
}
