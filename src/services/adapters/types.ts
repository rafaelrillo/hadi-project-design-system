// Path: src/services/adapters/types.ts

/**
 * Normalized types for market data
 * These are API-agnostic interfaces that all adapters must return
 */

export interface NormalizedQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: Date;
}

export interface NormalizedHistoricalPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NormalizedCompanyInfo {
  symbol: string;
  name: string;
  description: string;
  sector: string;
  industry: string;
  marketCap: number;
  pe: number | null;
  eps: number | null;
  week52High: number;
  week52Low: number;
  dividendYield: number | null;
  exchange: string;
  country: string;
}

export interface NormalizedMarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface NormalizedSectorPerformance {
  sector: string;
  dayChange: number;
  weekChange: number;
  monthChange: number;
  ytdChange: number;
}

export interface SymbolSearchResult {
  symbol: string;
  name: string;
  type: string;
  exchange?: string;
}

export type HistoricalInterval = '1min' | '5min' | '15min' | '1hour' | '1day';

/**
 * Market Data Adapter Interface
 * All API adapters must implement this interface
 */
export interface MarketDataAdapter {
  // Adapter metadata
  readonly name: string;
  readonly supportsWebSocket: boolean;

  // Quote methods
  getQuote(symbol: string): Promise<NormalizedQuote>;
  getQuotes(symbols: string[]): Promise<NormalizedQuote[]>;

  // Historical data
  getHistoricalData(
    symbol: string,
    from: Date,
    to: Date,
    interval: HistoricalInterval
  ): Promise<NormalizedHistoricalPoint[]>;

  // Company info
  getCompanyInfo(symbol: string): Promise<NormalizedCompanyInfo>;

  // Market indices
  getMarketIndices(): Promise<NormalizedMarketIndex[]>;

  // Search
  searchSymbols(query: string): Promise<SymbolSearchResult[]>;

  // Real-time subscription (optional)
  subscribeToQuotes?(
    symbols: string[],
    callback: (quote: NormalizedQuote) => void
  ): () => void;

  // Health check
  isAvailable(): Promise<boolean>;
}

/**
 * Adapter error types
 */
export class AdapterError extends Error {
  constructor(
    message: string,
    public readonly code: AdapterErrorCode,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'AdapterError';
  }
}

export type AdapterErrorCode =
  | 'RATE_LIMIT_EXCEEDED'
  | 'INVALID_API_KEY'
  | 'SYMBOL_NOT_FOUND'
  | 'NETWORK_ERROR'
  | 'PARSE_ERROR'
  | 'UNKNOWN_ERROR';
