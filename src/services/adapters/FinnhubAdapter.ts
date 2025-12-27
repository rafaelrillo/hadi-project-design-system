// Path: src/services/adapters/FinnhubAdapter.ts

import { BaseAdapter } from './BaseAdapter';
import {
  NormalizedQuote,
  NormalizedHistoricalPoint,
  NormalizedCompanyInfo,
  NormalizedMarketIndex,
  SymbolSearchResult,
  HistoricalInterval,
  AdapterError,
} from './types';
import { config } from '../../config/env';

/**
 * Finnhub API Response Types
 */
interface FinnhubQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price
  pc: number; // Previous close
  t: number;  // Timestamp
}

interface FinnhubCompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

interface FinnhubMetrics {
  metric: {
    peBasicExclExtraTTM?: number;
    epsBasicExclExtraItemsTTM?: number;
    '52WeekHigh'?: number;
    '52WeekLow'?: number;
    dividendYieldIndicatedAnnual?: number;
    [key: string]: number | undefined;
  };
}

interface FinnhubCandle {
  c: number[];  // Close prices
  h: number[];  // High prices
  l: number[];  // Low prices
  o: number[];  // Open prices
  t: number[];  // Timestamps
  v: number[];  // Volumes
  s: string;    // Status
}

interface FinnhubSearchResult {
  result: Array<{
    symbol: string;
    description: string;
    type: string;
    displaySymbol: string;
  }>;
}

/**
 * Finnhub API Adapter
 * Free tier: 60 calls/min, WebSocket included
 */
export class FinnhubAdapter extends BaseAdapter {
  readonly name = 'Finnhub';
  readonly supportsWebSocket = true;

  private companyCache: Map<string, NormalizedCompanyInfo> = new Map();
  private wsConnection: WebSocket | null = null;

  constructor(apiKey: string) {
    super(
      apiKey,
      config.financialApis.finnhub.baseUrl,
      config.financialApis.finnhub.rateLimit
    );
  }

  protected getHeaders(): Record<string, string> {
    // No custom headers needed - we use query param for auth
    return {};
  }

  /**
   * Override fetch to add token as query parameter (required for CORS)
   */
  protected async fetch<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<T> {
    await this.throttle();

    const url = new URL(endpoint, this.baseUrl);
    // Add token as query param (Finnhub doesn't allow X-Finnhub-Token header from browser due to CORS)
    url.searchParams.append('token', this.apiKey);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    try {
      const response = await window.fetch(url.toString());

      if (!response.ok) {
        if (response.status === 429) {
          throw new AdapterError('Rate limit exceeded', 'RATE_LIMIT_EXCEEDED');
        }
        if (response.status === 401 || response.status === 403) {
          throw new AdapterError('Invalid API key', 'INVALID_API_KEY');
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
      throw new AdapterError('Network error', 'NETWORK_ERROR', error);
    }
  }

  async getQuote(symbol: string): Promise<NormalizedQuote> {
    const data = await this.fetch<FinnhubQuote>('/quote', { symbol });

    if (!data.c || data.c === 0) {
      throw new AdapterError(
        `Symbol not found: ${symbol}`,
        'SYMBOL_NOT_FOUND'
      );
    }

    // Try to get name from cache or fetch it
    let name = symbol;
    try {
      const info = await this.getCompanyInfoCached(symbol);
      name = info.name;
    } catch {
      // Use symbol as fallback
    }

    return this.normalizeQuote(symbol, data, name);
  }

  async getQuotes(symbols: string[]): Promise<NormalizedQuote[]> {
    // Finnhub doesn't have a batch endpoint, so we fetch sequentially
    // respecting rate limits
    const quotes: NormalizedQuote[] = [];

    for (const symbol of symbols) {
      try {
        const quote = await this.getQuote(symbol);
        quotes.push(quote);
      } catch (error) {
        console.warn(`Failed to fetch quote for ${symbol}:`, error);
        // Continue with other symbols
      }
    }

    return quotes;
  }

  async getHistoricalData(
    symbol: string,
    from: Date,
    to: Date,
    interval: HistoricalInterval
  ): Promise<NormalizedHistoricalPoint[]> {
    const resolutionMap: Record<HistoricalInterval, string> = {
      '1min': '1',
      '5min': '5',
      '15min': '15',
      '1hour': '60',
      '1day': 'D',
    };

    const data = await this.fetch<FinnhubCandle>('/stock/candle', {
      symbol,
      resolution: resolutionMap[interval],
      from: Math.floor(from.getTime() / 1000).toString(),
      to: Math.floor(to.getTime() / 1000).toString(),
    });

    if (data.s === 'no_data' || !data.t) {
      return [];
    }

    return data.t.map((timestamp, i) => ({
      date: new Date(timestamp * 1000).toISOString(),
      open: data.o[i],
      high: data.h[i],
      low: data.l[i],
      close: data.c[i],
      volume: data.v[i],
    }));
  }

  async getCompanyInfo(symbol: string): Promise<NormalizedCompanyInfo> {
    const [profile, metrics] = await Promise.all([
      this.fetch<FinnhubCompanyProfile>('/stock/profile2', { symbol }),
      this.fetch<FinnhubMetrics>('/stock/metric', { symbol, metric: 'all' }),
    ]);

    if (!profile.name) {
      throw new AdapterError(
        `Company not found: ${symbol}`,
        'SYMBOL_NOT_FOUND'
      );
    }

    const info: NormalizedCompanyInfo = {
      symbol,
      name: profile.name,
      description: '', // Finnhub doesn't include description in profile
      sector: profile.finnhubIndustry || 'Unknown',
      industry: profile.finnhubIndustry || 'Unknown',
      marketCap: (profile.marketCapitalization || 0) * 1000000, // Comes in millions
      pe: metrics.metric?.peBasicExclExtraTTM || null,
      eps: metrics.metric?.epsBasicExclExtraItemsTTM || null,
      week52High: metrics.metric?.['52WeekHigh'] || 0,
      week52Low: metrics.metric?.['52WeekLow'] || 0,
      dividendYield: metrics.metric?.dividendYieldIndicatedAnnual || null,
      exchange: profile.exchange || 'Unknown',
      country: profile.country || 'US',
    };

    // Cache for future use
    this.companyCache.set(symbol, info);

    return info;
  }

  private async getCompanyInfoCached(symbol: string): Promise<NormalizedCompanyInfo> {
    const cached = this.companyCache.get(symbol);
    if (cached) return cached;
    return this.getCompanyInfo(symbol);
  }

  async getMarketIndices(): Promise<NormalizedMarketIndex[]> {
    // Finnhub uses special symbols for indices
    const indices = [
      { symbol: '^GSPC', name: 'S&P 500' },
      { symbol: '^IXIC', name: 'Nasdaq' },
      { symbol: '^DJI', name: 'Dow Jones' },
    ];

    const results: NormalizedMarketIndex[] = [];

    for (const index of indices) {
      try {
        // Finnhub may not support all indices on free tier
        const quote = await this.fetch<FinnhubQuote>('/quote', {
          symbol: index.symbol,
        });

        if (quote.c && quote.c > 0) {
          results.push({
            symbol: index.symbol,
            name: index.name,
            value: quote.c,
            change: quote.d,
            changePercent: quote.dp,
          });
        }
      } catch {
        // Some indices may not be available on free tier
        console.warn(`Index ${index.symbol} not available`);
      }
    }

    return results;
  }

  async searchSymbols(query: string): Promise<SymbolSearchResult[]> {
    const data = await this.fetch<FinnhubSearchResult>('/search', { q: query });

    return data.result
      .filter((item) => item.type === 'Common Stock')
      .slice(0, 10)
      .map((item) => ({
        symbol: item.symbol,
        name: item.description,
        type: item.type,
      }));
  }

  /**
   * WebSocket subscription for real-time quotes
   * Finnhub provides free WebSocket access!
   */
  subscribeToQuotes(
    symbols: string[],
    callback: (quote: NormalizedQuote) => void
  ): () => void {
    const wsUrl = `${config.financialApis.finnhub.wsUrl}?token=${this.apiKey}`;
    this.wsConnection = new WebSocket(wsUrl);

    this.wsConnection.onopen = () => {
      console.log('[Finnhub WS] Connected');
      symbols.forEach((symbol) => {
        this.wsConnection?.send(
          JSON.stringify({ type: 'subscribe', symbol })
        );
      });
    };

    this.wsConnection.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'trade' && data.data) {
          // Finnhub sends trade data
          data.data.forEach(
            (trade: { s: string; p: number; v: number; t: number }) => {
              // Get cached company info for name
              const cached = this.companyCache.get(trade.s);
              const name = cached?.name || trade.s;

              callback({
                symbol: trade.s,
                name,
                price: trade.p,
                change: 0, // Would need previous close to calculate
                changePercent: 0,
                volume: trade.v,
                high: trade.p,
                low: trade.p,
                open: trade.p,
                previousClose: trade.p,
                timestamp: new Date(trade.t),
              });
            }
          );
        }
      } catch (error) {
        console.error('[Finnhub WS] Parse error:', error);
      }
    };

    this.wsConnection.onerror = (error) => {
      console.error('[Finnhub WS] Error:', error);
    };

    this.wsConnection.onclose = () => {
      console.log('[Finnhub WS] Disconnected');
    };

    // Return unsubscribe function
    return () => {
      if (this.wsConnection) {
        // Only send unsubscribe if connection is OPEN
        if (this.wsConnection.readyState === WebSocket.OPEN) {
          symbols.forEach((symbol) => {
            this.wsConnection?.send(
              JSON.stringify({ type: 'unsubscribe', symbol })
            );
          });
        }
        this.wsConnection.close();
        this.wsConnection = null;
      }
    };
  }

  private normalizeQuote(
    symbol: string,
    data: FinnhubQuote,
    name: string
  ): NormalizedQuote {
    return {
      symbol,
      name,
      price: data.c,
      change: data.d || 0,
      changePercent: data.dp || 0,
      volume: 0, // Finnhub quote doesn't include volume
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
      timestamp: new Date(data.t * 1000),
    };
  }
}
