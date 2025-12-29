// Path: src/services/tiingo/tiingoTypes.ts

/**
 * Tiingo API Response Types
 * https://api.tiingo.com/documentation
 */

// ─────────────────────────────────────────────────────────────────────────────
// TICKER METADATA
// ─────────────────────────────────────────────────────────────────────────────

export interface TiingoTickerMeta {
  ticker: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  exchangeCode: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// END OF DAY PRICES
// ─────────────────────────────────────────────────────────────────────────────

export interface TiingoPriceEOD {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjOpen: number;
  adjHigh: number;
  adjLow: number;
  adjClose: number;
  adjVolume: number;
  divCash: number;
  splitFactor: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// IEX INTRADAY PRICES
// ─────────────────────────────────────────────────────────────────────────────

export interface TiingoIEXPrice {
  ticker: string;
  timestamp: string;
  lastSaleTimestamp: string;
  lastPrice: number;
  lastSize: number;
  tngoLast: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
  mid: number;
  volume: number;
  bidPrice: number;
  bidSize: number;
  askPrice: number;
  askSize: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// NEWS
// ─────────────────────────────────────────────────────────────────────────────

export interface TiingoNews {
  id: number;
  title: string;
  url: string;
  description: string;
  publishedDate: string;
  crawlDate: string;
  tickers: string[];
  tags: string[];
  source: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE PARAMS
// ─────────────────────────────────────────────────────────────────────────────

export interface TiingoNewsParams {
  tickers?: string[];
  tags?: string[];
  limit?: number;
  startDate?: string;
  endDate?: string;
  offset?: number;
  source?: string;
  sortBy?: 'publishedDate' | 'crawlDate';
}

export interface TiingoHistoricalParams {
  startDate: string;
  endDate: string;
  resampleFreq?: 'daily' | 'weekly' | 'monthly' | 'annually';
}

// ─────────────────────────────────────────────────────────────────────────────
// ERROR TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type TiingoErrorCode =
  | 'RATE_LIMIT_EXCEEDED'
  | 'INVALID_API_KEY'
  | 'TICKER_NOT_FOUND'
  | 'NETWORK_ERROR'
  | 'INVALID_PARAMS'
  | 'UNKNOWN_ERROR';

export class TiingoError extends Error {
  constructor(
    message: string,
    public readonly code: TiingoErrorCode,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'TiingoError';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// POPULAR TICKERS (Pre-defined list for quick access)
// ─────────────────────────────────────────────────────────────────────────────

export const POPULAR_TICKERS = [
  'AAPL',
  'MSFT',
  'GOOGL',
  'AMZN',
  'NVDA',
  'META',
  'TSLA',
  'BRK.B',
  'JPM',
  'V',
  'JNJ',
  'WMT',
  'PG',
  'MA',
  'HD',
  'CVX',
  'MRK',
  'ABBV',
  'PEP',
  'KO',
  'COST',
  'AVGO',
  'TMO',
  'MCD',
  'CSCO',
  'ACN',
  'ABT',
  'DHR',
  'NEE',
  'LLY',
] as const;

export type PopularTicker = (typeof POPULAR_TICKERS)[number];
