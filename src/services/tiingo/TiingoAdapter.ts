// Path: src/services/tiingo/TiingoAdapter.ts

import { BaseAdapter } from '../adapters/BaseAdapter';
import {
  NormalizedQuote,
  NormalizedHistoricalPoint,
  NormalizedCompanyInfo,
  NormalizedMarketIndex,
  SymbolSearchResult,
  HistoricalInterval,
  AdapterError,
} from '../adapters/types';
import { tiingoService } from './tiingoService';
import { TiingoTickerMeta, TiingoIEXPrice, TiingoPriceEOD } from './tiingoTypes';

/**
 * Tiingo API Adapter
 * Free tier: 500 requests/hour, EOD data + IEX realtime + News
 *
 * Note: This adapter uses tiingoService internally which handles
 * caching, rate limiting, and fallback to mock data automatically.
 */
export class TiingoAdapter extends BaseAdapter {
  readonly name = 'Tiingo';
  readonly supportsWebSocket = false; // Tiingo doesn't offer WebSocket on free tier

  private metaCache: Map<string, TiingoTickerMeta> = new Map();

  constructor(apiKey: string) {
    super(
      apiKey,
      import.meta.env.VITE_TIINGO_BASE_URL || '/api/tiingo',
      500 // requests per hour
    );
  }

  protected getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.apiKey}`,
    };
  }

  async getQuote(symbol: string): Promise<NormalizedQuote> {
    try {
      const [price, meta] = await Promise.all([
        tiingoService.getCurrentPrice(symbol),
        this.getTickerMetaCached(symbol),
      ]);

      return this.normalizeIEXToQuote(price, meta);
    } catch (error) {
      throw new AdapterError(
        `Failed to get quote for ${symbol}`,
        'SYMBOL_NOT_FOUND',
        error
      );
    }
  }

  async getQuotes(symbols: string[]): Promise<NormalizedQuote[]> {
    try {
      const prices = await tiingoService.getBatchPrices(symbols);

      // Fetch metadata for all symbols
      await Promise.all(
        symbols.map((s) => this.getTickerMetaCached(s))
      );

      return prices.map((price) => {
        const meta = this.metaCache.get(price.ticker.toUpperCase());
        return this.normalizeIEXToQuote(price, meta);
      });
    } catch (error) {
      throw new AdapterError(
        'Failed to get batch quotes',
        'UNKNOWN_ERROR',
        error
      );
    }
  }

  async getHistoricalData(
    symbol: string,
    from: Date,
    to: Date,
    _interval: HistoricalInterval
  ): Promise<NormalizedHistoricalPoint[]> {
    try {
      // Tiingo only supports daily data on free tier
      const data = await tiingoService.getHistoricalPrices(
        symbol,
        from.toISOString().split('T')[0],
        to.toISOString().split('T')[0]
      );

      return data.map((point) => this.normalizeEODToHistorical(point));
    } catch (error) {
      throw new AdapterError(
        `Failed to get historical data for ${symbol}`,
        'SYMBOL_NOT_FOUND',
        error
      );
    }
  }

  async getCompanyInfo(symbol: string): Promise<NormalizedCompanyInfo> {
    try {
      const meta = await tiingoService.getTickerMeta(symbol);
      const price = await tiingoService.getCurrentPrice(symbol);

      return {
        symbol: meta.ticker,
        name: meta.name,
        description: meta.description || '',
        sector: 'Unknown', // Tiingo doesn't provide sector in basic API
        industry: 'Unknown',
        marketCap: 0, // Not available in basic API
        pe: null,
        eps: null,
        week52High: price.high, // Approximate
        week52Low: price.low, // Approximate
        dividendYield: null,
        exchange: meta.exchangeCode,
        country: 'US', // Most Tiingo stocks are US
      };
    } catch (error) {
      throw new AdapterError(
        `Company not found: ${symbol}`,
        'SYMBOL_NOT_FOUND',
        error
      );
    }
  }

  async getMarketIndices(): Promise<NormalizedMarketIndex[]> {
    // Tiingo uses ETFs as proxies for indices
    const indexProxies = [
      { symbol: 'SPY', name: 'S&P 500 (SPY)' },
      { symbol: 'QQQ', name: 'Nasdaq 100 (QQQ)' },
      { symbol: 'DIA', name: 'Dow Jones (DIA)' },
    ];

    const results: NormalizedMarketIndex[] = [];

    for (const index of indexProxies) {
      try {
        const price = await tiingoService.getCurrentPrice(index.symbol);
        const change = price.lastPrice - price.prevClose;
        const changePercent = (change / price.prevClose) * 100;

        results.push({
          symbol: index.symbol,
          name: index.name,
          value: price.lastPrice,
          change,
          changePercent,
        });
      } catch (error) {
        console.warn(`[Tiingo] Failed to get index ${index.symbol}:`, error);
      }
    }

    return results;
  }

  async searchSymbols(query: string): Promise<SymbolSearchResult[]> {
    try {
      const results = await tiingoService.searchTickers(query);

      return results.slice(0, 10).map((meta) => ({
        symbol: meta.ticker,
        name: meta.name,
        type: 'Common Stock',
        exchange: meta.exchangeCode,
      }));
    } catch (error) {
      throw new AdapterError(
        'Search failed',
        'UNKNOWN_ERROR',
        error
      );
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // HELPER METHODS
  // ─────────────────────────────────────────────────────────────────────────

  private async getTickerMetaCached(symbol: string): Promise<TiingoTickerMeta | undefined> {
    const upperSymbol = symbol.toUpperCase();

    if (this.metaCache.has(upperSymbol)) {
      return this.metaCache.get(upperSymbol);
    }

    try {
      const meta = await tiingoService.getTickerMeta(symbol);
      this.metaCache.set(upperSymbol, meta);
      return meta;
    } catch {
      return undefined;
    }
  }

  private normalizeIEXToQuote(
    price: TiingoIEXPrice,
    meta?: TiingoTickerMeta
  ): NormalizedQuote {
    const change = price.lastPrice - price.prevClose;
    const changePercent = price.prevClose > 0
      ? (change / price.prevClose) * 100
      : 0;

    return {
      symbol: price.ticker,
      name: meta?.name || price.ticker,
      price: price.lastPrice,
      change,
      changePercent,
      volume: price.volume,
      high: price.high,
      low: price.low,
      open: price.open,
      previousClose: price.prevClose,
      timestamp: new Date(price.timestamp),
    };
  }

  private normalizeEODToHistorical(data: TiingoPriceEOD): NormalizedHistoricalPoint {
    return {
      date: data.date,
      open: data.adjOpen,
      high: data.adjHigh,
      low: data.adjLow,
      close: data.adjClose,
      volume: data.adjVolume,
    };
  }
}
