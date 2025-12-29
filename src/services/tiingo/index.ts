// Path: src/services/tiingo/index.ts

// Types
export type {
  TiingoTickerMeta,
  TiingoPriceEOD,
  TiingoIEXPrice,
  TiingoNews,
  TiingoNewsParams,
  TiingoHistoricalParams,
  TiingoErrorCode,
  PopularTicker,
} from './tiingoTypes';

export { TiingoError, POPULAR_TICKERS } from './tiingoTypes';

// Service
export { tiingoService, default as tiingoServiceDefault } from './tiingoService';

// Adapter
export { TiingoAdapter } from './TiingoAdapter';
