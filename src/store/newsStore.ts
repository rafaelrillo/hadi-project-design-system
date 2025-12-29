// Path: src/store/newsStore.ts

import { create } from "zustand";
import { tiingoService } from "../services/tiingo";
import type { TiingoNews, TiingoNewsParams } from "../services/tiingo";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface NewsFilters {
  tickers: string[];
  tags: string[];
  source: string | null;
  dateRange: "today" | "week" | "month" | "all";
  category: "all" | "portfolio" | "recommendations" | "general";
}

// ─────────────────────────────────────────────────────────────────────────────
// STATE INTERFACE
// ─────────────────────────────────────────────────────────────────────────────

interface NewsState {
  articles: TiingoNews[];
  filters: NewsFilters;
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  currentPage: number;
  totalLoaded: number;
}

interface NewsActions {
  // Fetching
  fetchNews: (params?: TiingoNewsParams) => Promise<void>;
  fetchMoreNews: () => Promise<void>;
  refreshNews: () => Promise<void>;

  // Filtering
  setFilters: (filters: Partial<NewsFilters>) => void;
  clearFilters: () => void;
  filterByTickers: (tickers: string[]) => void;

  // Helpers
  getArticleById: (id: number) => TiingoNews | undefined;
  getArticlesForTicker: (ticker: string) => TiingoNews[];
}

// ─────────────────────────────────────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────────────────────────────────────

const initialFilters: NewsFilters = {
  tickers: [],
  tags: [],
  source: null,
  dateRange: "today",
  category: "all",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getStartDateFromRange(range: NewsFilters["dateRange"]): string | undefined {
  const now = new Date();

  switch (range) {
    case "today":
      return now.toISOString().split("T")[0];
    case "week": {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return weekAgo.toISOString().split("T")[0];
    }
    case "month": {
      const monthAgo = new Date(now);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return monthAgo.toISOString().split("T")[0];
    }
    case "all":
    default:
      return undefined;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SELECTORS
// ─────────────────────────────────────────────────────────────────────────────

export const selectFeaturedArticle = (state: NewsState) =>
  state.articles[0] || null;

export const selectRecentArticles = (state: NewsState, limit = 10) =>
  state.articles.slice(0, limit);

export const selectArticlesBySource = (state: NewsState, source: string) =>
  state.articles.filter((a) => a.source === source);

export const selectUniqueSources = (state: NewsState) =>
  [...new Set(state.articles.map((a) => a.source))];

export const selectUniqueTags = (state: NewsState) =>
  [...new Set(state.articles.flatMap((a) => a.tags))].slice(0, 20);

// ─────────────────────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

export const useNewsStore = create<NewsState & NewsActions>()((set, get) => ({
  // Initial state
  articles: [],
  filters: { ...initialFilters },
  isLoading: false,
  hasMore: true,
  error: null,
  currentPage: 0,
  totalLoaded: 0,

  // Fetch news with optional params
  fetchNews: async (params?: TiingoNewsParams) => {
    const { filters } = get();

    set({ isLoading: true, error: null });

    try {
      const queryParams: TiingoNewsParams = {
        limit: PAGE_SIZE,
        tickers: params?.tickers || (filters.tickers.length > 0 ? filters.tickers : undefined),
        tags: params?.tags || (filters.tags.length > 0 ? filters.tags : undefined),
        startDate: params?.startDate || getStartDateFromRange(filters.dateRange),
        source: params?.source || filters.source || undefined,
        ...params,
      };

      const articles = await tiingoService.getNews(queryParams);

      set({
        articles,
        isLoading: false,
        hasMore: articles.length >= PAGE_SIZE,
        currentPage: 1,
        totalLoaded: articles.length,
      });
    } catch (error) {
      console.error("[NewsStore] Failed to fetch news:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to fetch news",
        isLoading: false,
      });
    }
  },

  // Fetch more news (pagination)
  fetchMoreNews: async () => {
    const { filters, articles, currentPage, hasMore, isLoading } = get();

    if (!hasMore || isLoading) return;

    set({ isLoading: true });

    try {
      const queryParams: TiingoNewsParams = {
        limit: PAGE_SIZE,
        offset: currentPage * PAGE_SIZE,
        tickers: filters.tickers.length > 0 ? filters.tickers : undefined,
        tags: filters.tags.length > 0 ? filters.tags : undefined,
        startDate: getStartDateFromRange(filters.dateRange),
        source: filters.source || undefined,
      };

      const newArticles = await tiingoService.getNews(queryParams);

      // Filter out duplicates
      const existingIds = new Set(articles.map((a) => a.id));
      const uniqueNewArticles = newArticles.filter((a) => !existingIds.has(a.id));

      set({
        articles: [...articles, ...uniqueNewArticles],
        isLoading: false,
        hasMore: newArticles.length >= PAGE_SIZE,
        currentPage: currentPage + 1,
        totalLoaded: articles.length + uniqueNewArticles.length,
      });
    } catch (error) {
      console.error("[NewsStore] Failed to fetch more news:", error);
      set({ isLoading: false });
    }
  },

  // Refresh news (reset and fetch)
  refreshNews: async () => {
    set({
      articles: [],
      currentPage: 0,
      totalLoaded: 0,
      hasMore: true,
    });
    await get().fetchNews();
  },

  // Set filters and refetch
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    // Automatically refetch with new filters
    get().refreshNews();
  },

  // Clear all filters
  clearFilters: () => {
    set({ filters: { ...initialFilters } });
    get().refreshNews();
  },

  // Filter by specific tickers
  filterByTickers: (tickers) => {
    set((state) => ({
      filters: { ...state.filters, tickers },
    }));
    get().refreshNews();
  },

  // Get article by ID
  getArticleById: (id) => {
    return get().articles.find((a) => a.id === id);
  },

  // Get articles for a specific ticker
  getArticlesForTicker: (ticker) => {
    return get().articles.filter((a) =>
      a.tickers.some((t) => t.toUpperCase() === ticker.toUpperCase())
    );
  },
}));
