const {
    PORT,
    KUCOIN_BASE,
    KUCOIN_HISTORY,
    KUCOIN_SYMBOLS,
    KRAKEN_BASE,
    KRAKEN_TRADE,
    KRAKEN_PAIRS,
    TEST_ENV,
    LOG_LEVEL,
} = process.env;

const KEYS = {
    KUCOIN: {
        BASE_URL: KUCOIN_BASE,
        HISOTRY_URL: KUCOIN_HISTORY,
        SYMBOLS_URL: KUCOIN_SYMBOLS,
    },
    KRAKEN: {
        BASE_URL: KRAKEN_BASE,
        TRADE_URL: KRAKEN_TRADE,
        PAIRS_URL: KRAKEN_PAIRS,
    },
    CURRENT_ENV: TEST_ENV,
    LOG_LEVEL,
    PORT,
};

export default KEYS;
