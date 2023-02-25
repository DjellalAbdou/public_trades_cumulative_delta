import exchangeStrategies from './exchangeStrategies';
import { IExchangeStrategy } from './types';

export default class ExchangeClient {
    private strategy: IExchangeStrategy;

    constructor(strategy: keyof typeof exchangeStrategies) {
        this.strategy = new exchangeStrategies[strategy]();
    }

    public setStrategy(strategy: keyof typeof exchangeStrategies) {
        this.strategy = new exchangeStrategies[strategy]();
    }

    async getCumulativeDelta(pairSymbol: string): Promise<number> {
        return await this.strategy.getCumulativeDelta(pairSymbol);
    }
}
