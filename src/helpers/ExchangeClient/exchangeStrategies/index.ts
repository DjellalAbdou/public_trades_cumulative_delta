import KrakenStrategy from './KrakenStrategy';
import KucoinStrategy from './KucoinStrategy';

const exchangeStrategies = {
    kucoin: KucoinStrategy,
    kraken: KrakenStrategy,
};

export default exchangeStrategies;
