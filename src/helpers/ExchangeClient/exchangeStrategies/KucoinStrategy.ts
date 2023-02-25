import externalApi from '@api/AxiosInstance';
import KEYS from '@config/keys';
import { IExchangeStrategy, TExchangeStrategy } from '../types';

const {
    KUCOIN: { BASE_URL, HISOTRY_URL, SYMBOLS_URL },
} = KEYS;

type TKucoinTrade = {
    sequence: string;
    price: string;
    size: string;
    side: string;
    time: Date;
};
// result record string is the pair symbol
interface IKucoinTradeResult {
    data: TKucoinTrade[];
}

interface IKucoinSymbolsResult {
    data: {
        symbol: string;
        name: string;
    }[];
}

export default class KucoinStrategy implements IExchangeStrategy {
    public readonly config = {
        historyUrl: HISOTRY_URL,
        apiBaseUrl: BASE_URL,
        symbolsUrl: SYMBOLS_URL,
    };

    public options: TExchangeStrategy;
    constructor(options?: TExchangeStrategy) {
        this.options = options || { initialDelta: 0 };
    }

    // ! check precision after comma
    async getCumulativeDelta(symbol: string) {
        const res = await externalApi.get<IKucoinTradeResult>(this.config.historyUrl, {
            baseURL: this.config.apiBaseUrl,
            params: { symbol },
        });

        // we use size and not price because we increment or decrement by the number of tokens and not there prices
        const delta = res.data.data.reduce(
            (acc, currentVal) =>
                currentVal.side === 'buy' ? acc + Number(currentVal.size) : acc - Number(currentVal.size),
            this.options.initialDelta,
        );
        return delta;
    }

    async getAvailablePairSymbols() {
        const res = await externalApi.get<IKucoinSymbolsResult>(this.config.symbolsUrl, {
            baseURL: this.config.apiBaseUrl,
        });

        return res.data.data.map((symbol) => symbol.symbol);
    }
}
