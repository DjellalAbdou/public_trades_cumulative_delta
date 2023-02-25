export interface IExchangeStrategy {
    getCumulativeDelta: (pairSymbol: string) => Promise<number>;
    getAvailablePairSymbols: () => Promise<string[]>;
}

export type TExchangeStrategy = {
    initialDelta: number;
    fromDate?: Date;
};
