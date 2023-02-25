import { keyable } from '@customTypes/index';

const { PORT, KUCOIN_BASE, KUCOIN_HISTORY, KRAKEN_BASE, KRAKEN_TRADE } = process.env;

const KEYS: keyable = {
    PORT,
    KUCOIN: {
        BASE_URL: KUCOIN_BASE,
        HISOTRY_URL: KUCOIN_HISTORY,
    },
    KRAKEN: {
        BASE_URL: KRAKEN_BASE,
        TRADE_URL: KRAKEN_TRADE,
    },
};

export default KEYS;
