// Path: src/services/adapters/MockAdapter.ts

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
import {
  stocksData,
  getStockBySymbol,
  generateHistoricalPrices,
  type Stock,
} from '../mockData/stocks';
import { trendIndicators } from '../mockData/marketIndicators';
import { config } from '../../config/env';

/**
 * Mock Adapter for development and fallback
 * Uses local mock data with simulated delays and price variations
 */
export class MockAdapter implements MarketDataAdapter {
  readonly name = 'Mock';
  readonly supportsWebSocket = false;

  private simulateDelay: boolean;
  private delayMs: number;
  private priceVariation: number;

  constructor(
    options: {
      simulateDelay?: boolean;
      delayMs?: number;
      priceVariation?: number;
    } = {}
  ) {
    this.simulateDelay = options.simulateDelay ?? true;
    this.delayMs = options.delayMs ?? 300;
    this.priceVariation = options.priceVariation ?? 0.02; // 2% max variation
  }

  private async delay(): Promise<void> {
    if (this.simulateDelay) {
      const variance = Math.random() * 200; // 0-200ms variance
      await new Promise((r) => setTimeout(r, this.delayMs + variance));
    }
  }

  private addPriceVariation(price: number): number {
    const variation = (Math.random() - 0.5) * 2 * this.priceVariation;
    return Math.round(price * (1 + variation) * 100) / 100;
  }

  async getQuote(symbol: string): Promise<NormalizedQuote> {
    await this.delay();

    const stock = getStockBySymbol(symbol);
    if (!stock) {
      throw new AdapterError(`Symbol not found: ${symbol}`, 'SYMBOL_NOT_FOUND');
    }

    return this.stockToQuote(stock);
  }

  async getQuotes(symbols: string[]): Promise<NormalizedQuote[]> {
    await this.delay();

    return symbols
      .map((symbol) => getStockBySymbol(symbol))
      .filter((stock): stock is Stock => stock !== undefined)
      .map((stock) => this.stockToQuote(stock));
  }

  async getHistoricalData(
    symbol: string,
    from: Date,
    to: Date,
    _interval: HistoricalInterval
  ): Promise<NormalizedHistoricalPoint[]> {
    await this.delay();

    const stock = getStockBySymbol(symbol);
    if (!stock) {
      throw new AdapterError(`Symbol not found: ${symbol}`, 'SYMBOL_NOT_FOUND');
    }

    // Calculate days between from and to
    const days = Math.ceil(
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
    );

    const history = generateHistoricalPrices(stock, Math.max(days, 30));

    return history.map((point) => ({
      date: point.date,
      open: point.price * 0.998,
      high: point.price * 1.01,
      low: point.price * 0.99,
      close: point.price,
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    }));
  }

  async getCompanyInfo(symbol: string): Promise<NormalizedCompanyInfo> {
    await this.delay();

    const stock = getStockBySymbol(symbol);
    if (!stock) {
      throw new AdapterError(`Symbol not found: ${symbol}`, 'SYMBOL_NOT_FOUND');
    }

    return {
      symbol: stock.symbol,
      name: stock.name,
      description: `${stock.name} is a leading company in the ${stock.sector} sector.`,
      sector: stock.sector,
      industry: stock.sector,
      marketCap: stock.marketCap,
      pe: stock.pe,
      eps: stock.pe ? stock.price / stock.pe : null,
      week52High: stock.weekHigh52,
      week52Low: stock.weekLow52,
      dividendYield: Math.random() * 3, // Random dividend yield
      exchange: 'NASDAQ',
      country: 'US',
    };
  }

  async getMarketIndices(): Promise<NormalizedMarketIndex[]> {
    await this.delay();

    // Convert trend indicators to market indices format
    return trendIndicators
      .filter((t) =>
        ['S&P 500', 'Nasdaq', 'VIX', '10Y Treasury'].includes(t.label)
      )
      .map((t) => {
        const value = parseFloat(t.value.replace(/[$,%]/g, '').replace(',', ''));
        return {
          symbol: t.label.replace(' ', ''),
          name: t.label,
          value: isNaN(value) ? 0 : value,
          change: t.change,
          changePercent: t.change,
        };
      });
  }

  async searchSymbols(query: string): Promise<SymbolSearchResult[]> {
    await this.delay();

    const lowerQuery = query.toLowerCase();
    return stocksData
      .filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(lowerQuery) ||
          stock.name.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 10)
      .map((stock) => ({
        symbol: stock.symbol,
        name: stock.name,
        type: 'Common Stock',
        exchange: 'NASDAQ',
      }));
  }

  /**
   * Simulated real-time updates using polling
   */
  subscribeToQuotes(
    symbols: string[],
    callback: (quote: NormalizedQuote) => void
  ): () => void {
    const interval = setInterval(() => {
      symbols.forEach((symbol) => {
        const stock = getStockBySymbol(symbol);
        if (stock) {
          const quote = this.stockToQuote(stock);
          callback(quote);
        }
      });
    }, config.features.pollingInterval);

    return () => clearInterval(interval);
  }

  async isAvailable(): Promise<boolean> {
    // Mock is always available
    return true;
  }

  private stockToQuote(stock: Stock): NormalizedQuote {
    const newPrice = this.addPriceVariation(stock.price);
    const priceChange = newPrice - stock.price;

    return {
      symbol: stock.symbol,
      name: stock.name,
      price: newPrice,
      change: Math.round((stock.change + priceChange) * 100) / 100,
      changePercent:
        Math.round(
          (stock.changePercent + (priceChange / stock.price) * 100) * 100
        ) / 100,
      volume: stock.volume,
      high: Math.max(newPrice, stock.price) * 1.005,
      low: Math.min(newPrice, stock.price) * 0.995,
      open: stock.price - stock.change,
      previousClose: stock.price - stock.change,
      timestamp: new Date(),
    };
  }
}
