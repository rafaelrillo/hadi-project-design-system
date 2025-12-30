// Path: src/services/tiingo/tiingoService.ts

import { config } from '../../config/env';
import {
  TiingoTickerMeta,
  TiingoPriceEOD,
  TiingoIEXPrice,
  TiingoNews,
  TiingoNewsParams,
  TiingoHistoricalParams,
  TiingoError,
  POPULAR_TICKERS,
} from './tiingoTypes';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

const TIINGO_CONFIG = {
  baseUrl: import.meta.env.VITE_TIINGO_BASE_URL || '/api/tiingo',
  apiKey: import.meta.env.VITE_TIINGO_API_KEY || '',
  rateLimit: 500, // Tiingo allows 500 requests/hour on free tier
  cacheTTL: config.features.cacheTTL,
};

// ─────────────────────────────────────────────────────────────────────────────
// CACHE
// ─────────────────────────────────────────────────────────────────────────────

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > TIINGO_CONFIG.cacheTTL) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ─────────────────────────────────────────────────────────────────────────────
// RATE LIMITING
// ─────────────────────────────────────────────────────────────────────────────

let requestCount = 0;
let windowStart = Date.now();

async function throttle(): Promise<void> {
  const now = Date.now();
  const windowDuration = 3600000; // 1 hour in ms

  // Reset window if needed
  if (now - windowStart > windowDuration) {
    requestCount = 0;
    windowStart = now;
  }

  // Check rate limit
  if (requestCount >= TIINGO_CONFIG.rateLimit) {
    const waitTime = windowStart + windowDuration - now;
    throw new TiingoError(
      `Rate limit exceeded. Try again in ${Math.ceil(waitTime / 60000)} minutes.`,
      'RATE_LIMIT_EXCEEDED'
    );
  }

  requestCount++;
}

// ─────────────────────────────────────────────────────────────────────────────
// FETCH HELPER
// ─────────────────────────────────────────────────────────────────────────────

async function tiingoFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  await throttle();

  const url = new URL(endpoint, TIINGO_CONFIG.baseUrl);

  // Add token
  if (TIINGO_CONFIG.apiKey) {
    url.searchParams.append('token', TIINGO_CONFIG.apiKey);
  }

  // Add other params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new TiingoError('Rate limit exceeded', 'RATE_LIMIT_EXCEEDED');
      }
      if (response.status === 401 || response.status === 403) {
        throw new TiingoError('Invalid API key', 'INVALID_API_KEY');
      }
      if (response.status === 404) {
        throw new TiingoError('Ticker not found', 'TICKER_NOT_FOUND');
      }
      throw new TiingoError(
        `API Error: ${response.status} ${response.statusText}`,
        'UNKNOWN_ERROR'
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof TiingoError) {
      throw error;
    }
    throw new TiingoError('Network error', 'NETWORK_ERROR', error);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA GENERATORS
// ─────────────────────────────────────────────────────────────────────────────

function generateMockTickerMeta(ticker: string): TiingoTickerMeta {
  const names: Record<string, string> = {
    AAPL: 'Apple Inc.',
    MSFT: 'Microsoft Corporation',
    GOOGL: 'Alphabet Inc.',
    AMZN: 'Amazon.com Inc.',
    NVDA: 'NVIDIA Corporation',
    META: 'Meta Platforms Inc.',
    TSLA: 'Tesla Inc.',
    'BRK.B': 'Berkshire Hathaway Inc.',
    JPM: 'JPMorgan Chase & Co.',
    V: 'Visa Inc.',
    JNJ: 'Johnson & Johnson',
    WMT: 'Walmart Inc.',
    PG: 'Procter & Gamble Co.',
    MA: 'Mastercard Inc.',
    HD: 'Home Depot Inc.',
  };

  return {
    ticker: ticker.toUpperCase(),
    name: names[ticker.toUpperCase()] || `${ticker.toUpperCase()} Corp.`,
    description: `${names[ticker.toUpperCase()] || ticker} is a publicly traded company.`,
    startDate: '2000-01-01',
    endDate: new Date().toISOString().split('T')[0],
    exchangeCode: 'NASDAQ',
  };
}

function generateMockIEXPrice(ticker: string): TiingoIEXPrice {
  const basePrices: Record<string, number> = {
    AAPL: 195.5,
    MSFT: 378.2,
    GOOGL: 141.8,
    AMZN: 178.9,
    NVDA: 495.2,
    META: 505.3,
    TSLA: 248.5,
    'BRK.B': 362.8,
    JPM: 171.2,
    V: 262.4,
  };

  const basePrice = basePrices[ticker.toUpperCase()] || 100 + Math.random() * 200;
  const change = (Math.random() - 0.5) * 10;
  const price = basePrice + change;

  return {
    ticker: ticker.toUpperCase(),
    timestamp: new Date().toISOString(),
    lastSaleTimestamp: new Date().toISOString(),
    lastPrice: price,
    lastSize: Math.floor(Math.random() * 1000),
    tngoLast: price,
    prevClose: basePrice,
    open: basePrice + (Math.random() - 0.5) * 5,
    high: price + Math.random() * 3,
    low: price - Math.random() * 3,
    mid: price,
    volume: Math.floor(Math.random() * 10000000),
    bidPrice: price - 0.01,
    bidSize: Math.floor(Math.random() * 500),
    askPrice: price + 0.01,
    askSize: Math.floor(Math.random() * 500),
  };
}

function generateMockHistoricalPrices(
  _ticker: string,
  startDate: string,
  endDate: string
): TiingoPriceEOD[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const prices: TiingoPriceEOD[] = [];

  let price = 100 + Math.random() * 100;
  const currentDate = new Date(start);

  while (currentDate <= end) {
    // Skip weekends
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      const change = (Math.random() - 0.48) * 5; // Slight upward bias
      price = Math.max(10, price + change);

      const high = price + Math.random() * 3;
      const low = price - Math.random() * 3;
      const open = price + (Math.random() - 0.5) * 2;
      const volume = Math.floor(Math.random() * 10000000) + 1000000;

      prices.push({
        date: currentDate.toISOString().split('T')[0],
        open,
        high,
        low,
        close: price,
        volume,
        adjOpen: open,
        adjHigh: high,
        adjLow: low,
        adjClose: price,
        adjVolume: volume,
        divCash: 0,
        splitFactor: 1,
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return prices;
}

function generateMockNews(tickers?: string[]): TiingoNews[] {
  const mockNews: TiingoNews[] = [
    {
      id: 1,
      title: 'Market Rally Continues as Tech Stocks Lead Gains',
      url: 'https://example.com/news/1',
      description: 'Technology stocks continue their strong performance as investors remain optimistic about AI developments.',
      publishedDate: new Date().toISOString(),
      crawlDate: new Date().toISOString(),
      tickers: ['AAPL', 'MSFT', 'NVDA'],
      tags: ['technology', 'stocks', 'ai'],
      source: 'Financial Times',
    },
    {
      id: 2,
      title: 'Federal Reserve Signals Potential Rate Cuts in 2024',
      url: 'https://example.com/news/2',
      description: 'The Federal Reserve indicated it may begin cutting interest rates, boosting market sentiment.',
      publishedDate: new Date(Date.now() - 3600000).toISOString(),
      crawlDate: new Date(Date.now() - 3600000).toISOString(),
      tickers: ['JPM', 'V', 'MA'],
      tags: ['federal-reserve', 'interest-rates', 'banking'],
      source: 'Reuters',
    },
    {
      id: 3,
      title: 'Electric Vehicle Sales Surge in Q4',
      url: 'https://example.com/news/3',
      description: 'Electric vehicle manufacturers report record sales as consumer adoption accelerates.',
      publishedDate: new Date(Date.now() - 7200000).toISOString(),
      crawlDate: new Date(Date.now() - 7200000).toISOString(),
      tickers: ['TSLA', 'RIVN', 'F'],
      tags: ['ev', 'automotive', 'electric-vehicles'],
      source: 'Bloomberg',
    },
    {
      id: 4,
      title: 'Cloud Computing Growth Exceeds Expectations',
      url: 'https://example.com/news/4',
      description: 'Major cloud providers report strong growth as enterprise digital transformation continues.',
      publishedDate: new Date(Date.now() - 10800000).toISOString(),
      crawlDate: new Date(Date.now() - 10800000).toISOString(),
      tickers: ['AMZN', 'MSFT', 'GOOGL'],
      tags: ['cloud', 'technology', 'enterprise'],
      source: 'TechCrunch',
    },
    {
      id: 5,
      title: 'Semiconductor Demand Remains Strong Amid AI Boom',
      url: 'https://example.com/news/5',
      description: 'Chip manufacturers see unprecedented demand driven by AI and data center expansion.',
      publishedDate: new Date(Date.now() - 14400000).toISOString(),
      crawlDate: new Date(Date.now() - 14400000).toISOString(),
      tickers: ['NVDA', 'AMD', 'INTC'],
      tags: ['semiconductors', 'ai', 'chips'],
      source: 'WSJ',
    },
    {
      id: 6,
      title: 'Big Tech Earnings Beat Wall Street Expectations',
      url: 'https://example.com/news/6',
      description: 'Major technology companies report better-than-expected quarterly results, driving market optimism.',
      publishedDate: new Date(Date.now() - 18000000).toISOString(),
      crawlDate: new Date(Date.now() - 18000000).toISOString(),
      tickers: ['AAPL', 'GOOGL', 'META'],
      tags: ['earnings', 'technology', 'stocks'],
      source: 'CNBC',
    },
    {
      id: 7,
      title: 'Retail Sector Shows Resilience Despite Economic Headwinds',
      url: 'https://example.com/news/7',
      description: 'Consumer spending remains strong as retail giants report solid holiday season performance.',
      publishedDate: new Date(Date.now() - 21600000).toISOString(),
      crawlDate: new Date(Date.now() - 21600000).toISOString(),
      tickers: ['WMT', 'AMZN', 'TGT'],
      tags: ['retail', 'consumer', 'economy'],
      source: 'MarketWatch',
    },
    {
      id: 8,
      title: 'Healthcare Innovation Drives Sector Growth',
      url: 'https://example.com/news/8',
      description: 'Biotech and pharmaceutical companies see increased investor interest amid breakthrough treatments.',
      publishedDate: new Date(Date.now() - 25200000).toISOString(),
      crawlDate: new Date(Date.now() - 25200000).toISOString(),
      tickers: ['JNJ', 'PFE', 'UNH'],
      tags: ['healthcare', 'biotech', 'pharma'],
      source: 'Barron\'s',
    },
  ];

  if (tickers && tickers.length > 0) {
    return mockNews.filter((news) =>
      news.tickers.some((t) => tickers.includes(t.toUpperCase()))
    );
  }

  return mockNews;
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECK IF TIINGO API IS AVAILABLE
// ─────────────────────────────────────────────────────────────────────────────

function isTiingoAvailable(): boolean {
  return !!TIINGO_CONFIG.apiKey && TIINGO_CONFIG.apiKey.length > 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// TIINGO SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const tiingoService = {
  /**
   * Check if Tiingo API is configured
   */
  isAvailable: isTiingoAvailable,

  /**
   * Search for tickers by query
   * Falls back to mock data if API unavailable
   */
  searchTickers: async (query: string): Promise<TiingoTickerMeta[]> => {
    if (!query || query.length < 1) return [];

    const cacheKey = `search:${query.toLowerCase()}`;
    const cached = getCached<TiingoTickerMeta[]>(cacheKey);
    if (cached) return cached;

    // If API not available, use mock search
    if (!isTiingoAvailable()) {
      const mockResults = POPULAR_TICKERS
        .filter((ticker) =>
          ticker.toLowerCase().includes(query.toLowerCase()) ||
          generateMockTickerMeta(ticker).name.toLowerCase().includes(query.toLowerCase())
        )
        .map((ticker) => generateMockTickerMeta(ticker));

      setCache(cacheKey, mockResults);
      return mockResults;
    }

    try {
      // Tiingo doesn't have a direct search endpoint
      // We'll search our popular tickers list and fetch their metadata
      const matches = POPULAR_TICKERS.filter((ticker) =>
        ticker.toLowerCase().includes(query.toLowerCase())
      );

      const results = await Promise.all(
        matches.slice(0, 10).map((ticker) => tiingoService.getTickerMeta(ticker))
      );

      setCache(cacheKey, results);
      return results;
    } catch (error) {
      console.warn('[Tiingo] Search failed, using mock data:', error);
      const mockResults = POPULAR_TICKERS
        .filter((ticker) => ticker.toLowerCase().includes(query.toLowerCase()))
        .map((ticker) => generateMockTickerMeta(ticker));
      return mockResults;
    }
  },

  /**
   * Get ticker metadata
   */
  getTickerMeta: async (ticker: string): Promise<TiingoTickerMeta> => {
    const cacheKey = `meta:${ticker.toUpperCase()}`;
    const cached = getCached<TiingoTickerMeta>(cacheKey);
    if (cached) return cached;

    if (!isTiingoAvailable()) {
      const mock = generateMockTickerMeta(ticker);
      setCache(cacheKey, mock);
      return mock;
    }

    try {
      const data = await tiingoFetch<TiingoTickerMeta>(`/tiingo/daily/${ticker}`);
      setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.warn(`[Tiingo] Failed to get metadata for ${ticker}, using mock:`, error);
      return generateMockTickerMeta(ticker);
    }
  },

  /**
   * Get current price (IEX intraday)
   */
  getCurrentPrice: async (ticker: string): Promise<TiingoIEXPrice> => {
    const cacheKey = `price:${ticker.toUpperCase()}`;
    const cached = getCached<TiingoIEXPrice>(cacheKey);
    if (cached) return cached;

    if (!isTiingoAvailable()) {
      const mock = generateMockIEXPrice(ticker);
      setCache(cacheKey, mock);
      return mock;
    }

    try {
      const data = await tiingoFetch<TiingoIEXPrice[]>(`/iex/${ticker}`);
      if (!data || data.length === 0) {
        throw new TiingoError('No price data available', 'TICKER_NOT_FOUND');
      }
      const price = data[0];
      setCache(cacheKey, price);
      return price;
    } catch (error) {
      console.warn(`[Tiingo] Failed to get price for ${ticker}, using mock:`, error);
      return generateMockIEXPrice(ticker);
    }
  },

  /**
   * Get historical EOD prices
   */
  getHistoricalPrices: async (
    ticker: string,
    startDate: string,
    endDate: string,
    options?: Omit<TiingoHistoricalParams, 'startDate' | 'endDate'>
  ): Promise<TiingoPriceEOD[]> => {
    const cacheKey = `historical:${ticker}:${startDate}:${endDate}`;
    const cached = getCached<TiingoPriceEOD[]>(cacheKey);
    if (cached) return cached;

    if (!isTiingoAvailable()) {
      const mock = generateMockHistoricalPrices(ticker, startDate, endDate);
      setCache(cacheKey, mock);
      return mock;
    }

    try {
      const data = await tiingoFetch<TiingoPriceEOD[]>(
        `/tiingo/daily/${ticker}/prices`,
        {
          startDate,
          endDate,
          resampleFreq: options?.resampleFreq,
        }
      );
      setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.warn(`[Tiingo] Failed to get historical prices for ${ticker}, using mock:`, error);
      return generateMockHistoricalPrices(ticker, startDate, endDate);
    }
  },

  /**
   * Get batch prices for multiple tickers
   */
  getBatchPrices: async (tickers: string[]): Promise<TiingoIEXPrice[]> => {
    if (!tickers || tickers.length === 0) return [];

    // Check cache first
    const uncached: string[] = [];
    const results: TiingoIEXPrice[] = [];

    for (const ticker of tickers) {
      const cached = getCached<TiingoIEXPrice>(`price:${ticker.toUpperCase()}`);
      if (cached) {
        results.push(cached);
      } else {
        uncached.push(ticker);
      }
    }

    if (uncached.length === 0) return results;

    if (!isTiingoAvailable()) {
      const mockPrices = uncached.map((ticker) => {
        const mock = generateMockIEXPrice(ticker);
        setCache(`price:${ticker.toUpperCase()}`, mock);
        return mock;
      });
      return [...results, ...mockPrices];
    }

    try {
      // Tiingo IEX supports comma-separated tickers
      const data = await tiingoFetch<TiingoIEXPrice[]>(
        `/iex/${uncached.join(',')}`
      );

      // Cache individual prices
      data.forEach((price) => {
        setCache(`price:${price.ticker}`, price);
      });

      return [...results, ...data];
    } catch (error) {
      console.warn('[Tiingo] Failed to get batch prices, using mock:', error);
      const mockPrices = uncached.map((ticker) => generateMockIEXPrice(ticker));
      return [...results, ...mockPrices];
    }
  },

  /**
   * Get news articles
   */
  getNews: async (params: TiingoNewsParams = {}): Promise<TiingoNews[]> => {
    const { tickers, tags, limit = 10, startDate, offset, source, sortBy } = params;

    const cacheKey = `news:${JSON.stringify(params)}`;
    const cached = getCached<TiingoNews[]>(cacheKey);
    if (cached) return cached;

    if (!isTiingoAvailable()) {
      const mock = generateMockNews(tickers).slice(0, limit);
      setCache(cacheKey, mock);
      return mock;
    }

    try {
      const queryParams: Record<string, string | number | undefined> = {
        limit,
        offset,
        source,
        sortBy,
        startDate,
      };

      if (tickers && tickers.length > 0) {
        queryParams.tickers = tickers.join(',');
      }

      if (tags && tags.length > 0) {
        queryParams.tags = tags.join(',');
      }

      const data = await tiingoFetch<TiingoNews[]>('/tiingo/news', queryParams);
      setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.warn('[Tiingo] Failed to get news, using mock:', error);
      return generateMockNews(tickers).slice(0, limit);
    }
  },

  /**
   * Get list of popular tickers with their metadata
   */
  getPopularTickers: async (): Promise<TiingoTickerMeta[]> => {
    const cacheKey = 'popular-tickers';
    const cached = getCached<TiingoTickerMeta[]>(cacheKey);
    if (cached) return cached;

    if (!isTiingoAvailable()) {
      const mock = POPULAR_TICKERS.slice(0, 20).map((ticker) =>
        generateMockTickerMeta(ticker)
      );
      setCache(cacheKey, mock);
      return mock;
    }

    try {
      const results = await Promise.all(
        POPULAR_TICKERS.slice(0, 20).map((ticker) =>
          tiingoService.getTickerMeta(ticker)
        )
      );
      setCache(cacheKey, results);
      return results;
    } catch (error) {
      console.warn('[Tiingo] Failed to get popular tickers, using mock:', error);
      return POPULAR_TICKERS.slice(0, 20).map((ticker) =>
        generateMockTickerMeta(ticker)
      );
    }
  },

  /**
   * Clear all cached data
   */
  clearCache: (): void => {
    cache.clear();
  },
};

export default tiingoService;
