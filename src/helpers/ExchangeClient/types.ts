export interface IExchangeStrategy {
    getCumulativeDelta: (pairSymbol: string) => Promise<number>;
}

export type TExchangeStrategy = {
    initialDelta: number;
    fromDate?: Date;
};
