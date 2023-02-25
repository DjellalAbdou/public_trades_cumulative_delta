import exchangeStrategies from './exchangeStrategies';
import { IExchangeStrategy } from './types';

export default class ExchangeClient {
    private _strategy: IExchangeStrategy;

    constructor(strategy: keyof typeof exchangeStrategies) {
        this._strategy = new exchangeStrategies[strategy]();
    }

    public setStrategy(strategy: keyof typeof exchangeStrategies) {
        this._strategy = new exchangeStrategies[strategy]();
    }

    public getStrategy() {
        return this._strategy;
    }

    async getCumulativeDelta(pairSymbol: string): Promise<number> {
        return await this._strategy.getCumulativeDelta(pairSymbol);
    }

    async getAvailablePairSymbols(): Promise<string[]> {
        return await this._strategy.getAvailablePairSymbols();
    }
}
