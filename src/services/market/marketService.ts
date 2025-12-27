// Path: src/services/market/marketService.ts

import { AdapterFactory, MarketDataAdapter, NormalizedQuote } from '../adapters';
import { config, type MarketApiProvider } from '../../config/env';
import {
  stocksData,
  getStocksHistoricalData as getMockHistorical,
  getStocksBySectorTreeMap as getMockTreeMap,
  type Stock,
} from '../mockData/stocks';
import {
  marketIndicators,
  keyFactors,
  trendIndicators,
  sectorPerformance,
  type MarketIndicators,
  type Factor,
  type TrendData,
  type SectorPerformance,
} from '../mockData/marketIndicators';

export interface MarketServiceConfig {
  adapterType?: MarketApiProvider;
}

/**
 * Market Service
 * Provides unified interface to market data from any adapter
 */
class MarketService {
  private adapter: MarketDataAdapter;
  private cache: Map<string, { data: unknown; timestamp: number }> = new Map();
  private cacheTTL: number;

  constructor(serviceConfig: MarketServiceConfig = {}) {
    this.adapter = AdapterFactory.getAdapter(serviceConfig.adapterType);
    this.cacheTTL = config.features.cacheTTL;
  }

  /**
   * Change adapter at runtime
   */
  setAdapter(type: MarketApiProvider): void {
    AdapterFactory.clearInstances();
    this.adapter = AdapterFactory.getAdapter(type);
    this.clearCache();
  }

  /**
   * Get current adapter name
   */
  getAdapterName(): string {
    return this.adapter.name;
  }

  /**
   * Check if using real API or mock
   */
  isUsingRealApi(): boolean {
    return this.adapter.name !== 'Mock';
  }

  // ========================================
  // Cache helpers
  // ========================================

  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data as T;
    }
    return null;
  }

  private setCache(key: string, data: unknown): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clearCache(): void {
    this.cache.clear();
  }

  // ========================================
  // Stock Data Methods
  // ========================================

  /**
   * Get all stocks (uses predefined symbol list)
   */
  async getStocks(): Promise<Stock[]> {
    const cached = this.getCached<Stock[]>('stocks');
    if (cached) return cached;

    try {
      // Get quotes for predefined symbols
      const symbols = stocksData.map((s) => s.symbol);
      const quotes = await this.adapter.getQuotes(symbols);

      // Convert to Stock format and merge with static data
      const stocks = await Promise.all(
        quotes.map(async (quote) => {
          const staticData = stocksData.find((s) => s.symbol === quote.symbol);
          return this.quoteToStock(quote, staticData);
        })
      );

      this.setCache('stocks', stocks);
      return stocks;
    } catch (error) {
      console.error('[MarketService] Error fetching stocks:', error);
      // Fallback to mock data
      return [...stocksData];
    }
  }

  /**
   * Get single stock by symbol
   */
  async getStockBySymbol(symbol: string): Promise<Stock | null> {
    const cacheKey = `stock:${symbol}`;
    const cached = this.getCached<Stock>(cacheKey);
    if (cached) return cached;

    try {
      const quote = await this.adapter.getQuote(symbol);
      const staticData = stocksData.find((s) => s.symbol === symbol);
      const stock = await this.quoteToStock(quote, staticData);

      this.setCache(cacheKey, stock);
      return stock;
    } catch (error) {
      console.warn(`[MarketService] Error fetching ${symbol}:`, error);
      // Fallback to mock data
      return stocksData.find((s) => s.symbol === symbol) || null;
    }
  }

  /**
   * Get historical price data
   */
  async getStockHistory(
    symbol: string,
    period: '1D' | '1W' | '1M' | '3M' | '1Y' = '1M'
  ) {
    const cacheKey = `history:${symbol}:${period}`;
    const cached = this.getCached<{ date: string; price: number }[]>(cacheKey);
    if (cached) return cached;

    try {
      const now = new Date();
      const from = new Date();

      switch (period) {
        case '1D':
          from.setDate(from.getDate() - 1);
          break;
        case '1W':
          from.setDate(from.getDate() - 7);
          break;
        case '1M':
          from.setMonth(from.getMonth() - 1);
          break;
        case '3M':
          from.setMonth(from.getMonth() - 3);
          break;
        case '1Y':
          from.setFullYear(from.getFullYear() - 1);
          break;
      }

      const interval =
        period === '1D' ? '5min' : period === '1W' ? '1hour' : '1day';

      const data = await this.adapter.getHistoricalData(
        symbol,
        from,
        now,
        interval
      );

      const history = data.map((point) => ({
        date: new Date(point.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        price: point.close,
      }));

      this.setCache(cacheKey, history);
      return history;
    } catch (error) {
      console.warn(`[MarketService] Error fetching history for ${symbol}:`, error);
      // Fallback to mock
      const mockData = getMockHistorical([symbol], 30);
      return mockData[0]?.data.map((d) => ({ date: d.x, price: d.y })) || [];
    }
  }

  /**
   * Search for symbols
   */
  async searchSymbols(query: string) {
    if (query.length < 2) return [];

    try {
      return await this.adapter.searchSymbols(query);
    } catch (error) {
      console.warn('[MarketService] Search error:', error);
      // Fallback to mock search
      return stocksData
        .filter(
          (s) =>
            s.symbol.toLowerCase().includes(query.toLowerCase()) ||
            s.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10)
        .map((s) => ({ symbol: s.symbol, name: s.name, type: 'Common Stock' }));
    }
  }

  // ========================================
  // Market Indicators (still using mock data)
  // These would typically come from a different API
  // ========================================

  async getIndicators(): Promise<MarketIndicators> {
    await this.simulateDelay(200);
    return { ...marketIndicators };
  }

  async getFactors(): Promise<Factor[]> {
    await this.simulateDelay(200);
    return [...keyFactors];
  }

  async getTrends(): Promise<TrendData[]> {
    await this.simulateDelay(150);

    // Try to get real indices if available
    try {
      const indices = await this.adapter.getMarketIndices();
      if (indices.length > 0) {
        return indices.map((idx) => ({
          label: idx.name,
          value: idx.value.toLocaleString(),
          change: idx.changePercent,
          trend: idx.change > 0 ? 'up' : idx.change < 0 ? 'down' : 'stable',
          period: '1D',
        })) as TrendData[];
      }
    } catch {
      // Fallback to mock
    }

    return [...trendIndicators];
  }

  async getSectorPerformance(): Promise<SectorPerformance[]> {
    await this.simulateDelay(200);
    return [...sectorPerformance];
  }

  // ========================================
  // Chart Data Helpers
  // ========================================

  /**
   * Get historical data formatted for FinancialLineChart
   */
  async getHistoricalChartData(symbols: string[], days = 30) {
    try {
      const now = new Date();
      const from = new Date();
      from.setDate(from.getDate() - days);

      const results = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            const data = await this.adapter.getHistoricalData(
              symbol,
              from,
              now,
              '1day'
            );
            return {
              id: symbol,
              data: data.map((point) => ({
                x: new Date(point.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                }),
                y: point.close,
              })),
            };
          } catch {
            return null;
          }
        })
      );

      const validResults = results.filter((r) => r !== null);
      if (validResults.length > 0) return validResults;

      // Fallback to mock
      return getMockHistorical(symbols, days);
    } catch {
      return getMockHistorical(symbols, days);
    }
  }

  /**
   * Get sector data for TreeMap
   */
  getSectorTreeMapData() {
    return getMockTreeMap();
  }

  // ========================================
  // Real-time Subscriptions
  // ========================================

  /**
   * Subscribe to real-time stock updates
   */
  subscribeToUpdates(
    symbols: string[],
    callback: (stocks: Stock[]) => void
  ): () => void {
    if (this.adapter.subscribeToQuotes) {
      // Use WebSocket if available
      const quotesBuffer: Map<string, NormalizedQuote> = new Map();
      let debounceTimer: ReturnType<typeof setTimeout>;

      const unsubscribe = this.adapter.subscribeToQuotes(
        symbols,
        async (quote) => {
          quotesBuffer.set(quote.symbol, quote);

          // Debounce updates
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(async () => {
            const stocks = await Promise.all(
              Array.from(quotesBuffer.values()).map(async (q) => {
                const staticData = stocksData.find((s) => s.symbol === q.symbol);
                return this.quoteToStock(q, staticData);
              })
            );
            callback(stocks);
            quotesBuffer.clear();
          }, 100);
        }
      );

      return () => {
        clearTimeout(debounceTimer);
        unsubscribe();
      };
    }

    // Fallback to polling
    const interval = setInterval(async () => {
      try {
        const stocks = await this.getStocks();
        callback(stocks);
      } catch (error) {
        console.error('[MarketService] Polling error:', error);
      }
    }, config.features.pollingInterval);

    return () => clearInterval(interval);
  }

  // ========================================
  // Helpers
  // ========================================

  private async quoteToStock(
    quote: NormalizedQuote,
    staticData?: Stock
  ): Promise<Stock> {
    // Try to get company info if not in static data
    let sector = staticData?.sector || 'Unknown';
    let pe = staticData?.pe || 0;
    let marketCap = staticData?.marketCap || 0;
    let week52High = staticData?.weekHigh52 || quote.high;
    let week52Low = staticData?.weekLow52 || quote.low;

    if (!staticData && this.isUsingRealApi()) {
      try {
        const info = await this.adapter.getCompanyInfo(quote.symbol);
        sector = info.sector;
        pe = info.pe || 0;
        marketCap = info.marketCap;
        week52High = info.week52High;
        week52Low = info.week52Low;
      } catch {
        // Use defaults
      }
    }

    return {
      symbol: quote.symbol,
      name: quote.name || staticData?.name || quote.symbol,
      price: Math.round(quote.price * 100) / 100,
      change: Math.round(quote.change * 100) / 100,
      changePercent: Math.round(quote.changePercent * 100) / 100,
      volume: quote.volume || staticData?.volume || 0,
      marketCap,
      sector,
      pe,
      weekHigh52: week52High,
      weekLow52: week52Low,
    };
  }

  private simulateDelay(ms = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const marketService = new MarketService();

export default marketService;
