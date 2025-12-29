// Path: src/hooks/useNews.ts

import { useState, useEffect, useCallback } from 'react';
import { tiingoService, TiingoNews } from '@/services/tiingo';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedDate: string;
  url: string;
  tickers: string[];
  tags: string[];
  sentiment?: number;
}

export interface UseNewsOptions {
  tickers?: string[];
  tags?: string[];
  limit?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export interface UseNewsResult {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA (Fallback when API unavailable)
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Fed signals potential rate cuts in 2025 as inflation cools',
    description: 'Federal Reserve officials indicated they may begin cutting interest rates next year as inflation continues to moderate toward their 2% target.',
    source: 'Reuters',
    publishedDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    url: 'https://reuters.com',
    tickers: ['SPY', 'QQQ', 'TLT'],
    tags: ['Federal Reserve', 'Interest Rates'],
    sentiment: 0.4,
  },
  {
    id: '2',
    title: 'NVIDIA announces next-generation AI chips with 2x performance',
    description: 'NVIDIA unveiled its latest AI accelerator chips, promising double the performance of previous generation at similar power consumption.',
    source: 'Bloomberg',
    publishedDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    url: 'https://bloomberg.com',
    tickers: ['NVDA', 'AMD', 'INTC'],
    tags: ['AI', 'Semiconductors'],
    sentiment: 0.7,
  },
  {
    id: '3',
    title: 'Apple faces antitrust scrutiny in European Union',
    description: "EU regulators announced new investigation into Apple's App Store practices, potentially leading to significant fines.",
    source: 'Financial Times',
    publishedDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    url: 'https://ft.com',
    tickers: ['AAPL'],
    tags: ['Regulation', 'Antitrust'],
    sentiment: -0.3,
  },
  {
    id: '4',
    title: 'Tesla deliveries beat expectations in Q4',
    description: 'Electric vehicle maker Tesla reported record quarterly deliveries, exceeding analyst estimates and boosting investor confidence.',
    source: 'CNBC',
    publishedDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    url: 'https://cnbc.com',
    tickers: ['TSLA'],
    tags: ['Electric Vehicles', 'Earnings'],
    sentiment: 0.5,
  },
  {
    id: '5',
    title: 'Microsoft cloud revenue surges as AI adoption accelerates',
    description: 'Microsoft reported strong Azure growth driven by enterprises adopting AI services, with cloud revenue up 29% year-over-year.',
    source: 'Wall Street Journal',
    publishedDate: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    url: 'https://wsj.com',
    tickers: ['MSFT', 'AMZN', 'GOOGL'],
    tags: ['Cloud Computing', 'AI'],
    sentiment: 0.6,
  },
  {
    id: '6',
    title: 'JPMorgan raises S&P 500 target amid strong earnings',
    description: 'JPMorgan strategists raised their year-end S&P 500 target, citing better-than-expected corporate earnings and resilient consumer spending.',
    source: 'MarketWatch',
    publishedDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    url: 'https://marketwatch.com',
    tickers: ['SPY', 'JPM'],
    tags: ['Market Outlook', 'Earnings'],
    sentiment: 0.5,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function tiingoToNewsItem(tiingoNews: TiingoNews): NewsItem {
  return {
    id: tiingoNews.id.toString(),
    title: tiingoNews.title,
    description: tiingoNews.description,
    source: tiingoNews.source,
    publishedDate: tiingoNews.publishedDate,
    url: tiingoNews.url,
    tickers: tiingoNews.tickers,
    tags: tiingoNews.tags,
    // Tiingo doesn't provide sentiment, so we leave it undefined
    sentiment: undefined,
  };
}

function filterMockNews(
  news: NewsItem[],
  tickers?: string[],
  tags?: string[]
): NewsItem[] {
  let filtered = [...news];

  if (tickers && tickers.length > 0) {
    const tickerSet = new Set(tickers.map((t) => t.toUpperCase()));
    filtered = filtered.filter((n) =>
      n.tickers.some((t) => tickerSet.has(t.toUpperCase()))
    );
  }

  if (tags && tags.length > 0) {
    const tagSet = new Set(tags.map((t) => t.toLowerCase()));
    filtered = filtered.filter((n) =>
      n.tags.some((t) => tagSet.has(t.toLowerCase()))
    );
  }

  return filtered;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────────────────────

export function useNews(options: UseNewsOptions = {}): UseNewsResult {
  const {
    tickers,
    tags,
    limit = 10,
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
  } = options;

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from Tiingo
      const tiingoNews = await tiingoService.getNews({
        tickers,
        tags,
        limit,
      });

      const newsItems = tiingoNews.map(tiingoToNewsItem);
      setNews(newsItems);
    } catch (err) {
      console.warn('Tiingo news fetch failed, using mock data:', err);

      // Fallback to mock data
      const filteredMock = filterMockNews(MOCK_NEWS, tickers, tags);
      setNews(filteredMock.slice(0, limit));

      // Don't set error if we have fallback data
      if (filteredMock.length === 0) {
        setError('No news available');
      }
    } finally {
      setLoading(false);
    }
  }, [tickers, tags, limit]);

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchNews, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchNews]);

  return {
    news,
    loading,
    error,
    refresh: fetchNews,
  };
}

export default useNews;
