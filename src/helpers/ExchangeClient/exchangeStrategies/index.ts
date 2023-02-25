import KrakenStrategy from './KrakenStrategy';
import KucoinStrategy from './kucoinStrategy';

const exchangeStrategies = {
    kucoin: KucoinStrategy,
    kraken: KrakenStrategy,
};

export default exchangeStrategies;
