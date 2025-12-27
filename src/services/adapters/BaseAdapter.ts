// Path: src/services/adapters/BaseAdapter.ts

import {
  MarketDataAdapter,
  NormalizedQuote,
  NormalizedHistoricalPoint,
  NormalizedCompanyInfo,
  NormalizedMarketIndex,
  SymbolSearchResult,
  HistoricalInterval,
  AdapterError,
} from './types';

/**
 * Base adapter class with common functionality
 * All API-specific adapters extend this class
 */
export abstract class BaseAdapter implements MarketDataAdapter {
  abstract readonly name: string;
  abstract readonly supportsWebSocket: boolean;

  protected apiKey: string;
  protected baseUrl: string;
  protected rateLimitMs: number;
  private lastRequestTime: number = 0;
  private requestQueue: Promise<void> = Promise.resolve();

  constructor(apiKey: string, baseUrl: string, rateLimitPerMinute: number = 60) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    // Convert rate limit to minimum milliseconds between requests
    this.rateLimitMs = Math.ceil(60000 / rateLimitPerMinute);
  }

  /**
   * Rate limiting - ensures we don't exceed API limits
   */
  protected async throttle(): Promise<void> {
    // Queue requests to ensure sequential rate limiting
    this.requestQueue = this.requestQueue.then(async () => {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      if (timeSinceLastRequest < this.rateLimitMs) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.rateLimitMs - timeSinceLastRequest)
        );
      }

      this.lastRequestTime = Date.now();
    });

    await this.requestQueue;
  }

  /**
   * HTTP request wrapper with error handling
   */
  protected async fetch<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<T> {
    await this.throttle();

    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    try {
      const response = await fetch(url.toString(), {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new AdapterError(
            'Rate limit exceeded',
            'RATE_LIMIT_EXCEEDED'
          );
        }
        if (response.status === 401 || response.status === 403) {
          throw new AdapterError(
            'Invalid API key',
            'INVALID_API_KEY'
          );
        }
        throw new AdapterError(
          `API Error: ${response.status} ${response.statusText}`,
          'UNKNOWN_ERROR'
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof AdapterError) {
        throw error;
      }
      throw new AdapterError(
        'Network error',
        'NETWORK_ERROR',
        error
      );
    }
  }

  /**
   * Get headers for API requests - override in subclasses
   */
  protected abstract getHeaders(): Record<string, string>;

  /**
   * Check if API is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      // Try to fetch a simple quote to test connectivity
      await this.getQuote('AAPL');
      return true;
    } catch {
      return false;
    }
  }

  // Abstract methods - must be implemented by subclasses
  abstract getQuote(symbol: string): Promise<NormalizedQuote>;
  abstract getQuotes(symbols: string[]): Promise<NormalizedQuote[]>;
  abstract getHistoricalData(
    symbol: string,
    from: Date,
    to: Date,
    interval: HistoricalInterval
  ): Promise<NormalizedHistoricalPoint[]>;
  abstract getCompanyInfo(symbol: string): Promise<NormalizedCompanyInfo>;
  abstract getMarketIndices(): Promise<NormalizedMarketIndex[]>;
  abstract searchSymbols(query: string): Promise<SymbolSearchResult[]>;
}
