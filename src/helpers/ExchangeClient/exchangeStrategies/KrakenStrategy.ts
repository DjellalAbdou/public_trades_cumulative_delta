import externalApi from '@api/AxiosInstance';
import KEYS from '@config/keys';
import { IExchangeStrategy, TExchangeStrategy } from '../types';

const {
    KRAKEN: { BASE_URL, TRADE_URL, PAIRS_URL },
} = KEYS;

type TKrakenTrade = [string, string, number, string, string, string, number];
// result record string is the pair symbol
interface IKrakenTradeResult {
    errors: string[];
    result: Record<string, TKrakenTrade[]>;
}

// any because we dont need the informations
interface IKrakenAvailablePairs {
    errors: string[];
    result: Record<string, any>;
}

export default class KrakenStrategy implements IExchangeStrategy {
    public readonly config = {
        tradeUrl: TRADE_URL,
        apiBaseUrl: BASE_URL,
        pairsUrl: PAIRS_URL,
    };

    public options: TExchangeStrategy;
    constructor(options?: TExchangeStrategy) {
        this.options = options || { initialDelta: 0 };
    }

    // ! check precision after comma
    async getCumulativeDelta(symbol: string) {
        const res = await externalApi.get<IKrakenTradeResult>(this.config.tradeUrl, {
            baseURL: this.config.apiBaseUrl,
            params: { pair: symbol, ...(this.options.fromDate ? { since: this.options.fromDate } : {}) },
        });

        // we can save result.last to use as since for polling new data => pagination
        // we use volume and not price
        const delta = res.data.result[symbol].reduce(
            (acc, currentVal) => (currentVal[3] === 'b' ? acc + Number(currentVal[1]) : acc - Number(currentVal[1])),
            this.options.initialDelta,
        );
        return delta;
    }

    async getAvailablePairSymbols() {
        const res = await externalApi.get<IKrakenAvailablePairs>(this.config.pairsUrl, {
            baseURL: this.config.apiBaseUrl,
        });

        return Object.keys(res.data.result);
    }
}
