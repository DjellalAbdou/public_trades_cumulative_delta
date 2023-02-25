import externalApi from '@api/AxiosInstance';
import KEYS from '@config/keys';
import { IExchangeStrategy, TExchangeStrategy } from '../types';

const {
    KRAKEN: { BASE_URL, TRADE_URL },
} = KEYS;

export default class KrakenStrategy implements IExchangeStrategy {
    public readonly config = {
        tradeUrl: TRADE_URL,
        apiBaseUrl: BASE_URL,
    };

    public options: TExchangeStrategy;
    constructor(options?: TExchangeStrategy) {
        this.options = options || { initialDelta: 0 };
    }

    // ! check precision after comma
    async getCumulativeDelta(symbol: string) {
        const res = await externalApi.get(this.config.tradeUrl, {
            baseURL: this.config.apiBaseUrl,
            params: { pair: symbol, ...(this.options.fromDate ? { since: this.options.fromDate } : {}) },
        });

        // we can save result.last to use as since for polling new data => pagination
        // we use volume and not price
        const delta = res.data.result[symbol].reduce(
            (acc: number, currentVal: any) =>
                currentVal[3] === 'b' ? acc + Number(currentVal[1]) : acc - Number(currentVal[1]),
            this.options.initialDelta,
        );
        return delta;
    }
}
