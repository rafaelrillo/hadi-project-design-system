// Path: src/store/recommendationsStore.ts

import { create } from "zustand";
import { tiingoService } from "../services/tiingo";
import {
  type RecommendationType,
  type ConfidenceLevel,
  type RecommendationFactor,
  type StockRecommendation,
  generateRecommendation,
  determineRecommendationType,
  categorizeRecommendations,
} from "../services/engines/recommendationEngine";

export type {
  RecommendationType,
  ConfidenceLevel,
  RecommendationFactor,
  StockRecommendation,
};

// ─────────────────────────────────────────────────────────────────────────────
// STATE INTERFACE
// ─────────────────────────────────────────────────────────────────────────────

interface RecommendationsState {
  buyRecommendations: StockRecommendation[];
  sellRecommendations: StockRecommendation[];
  holdRecommendations: StockRecommendation[];
  lastGenerated: string | null;
  isLoading: boolean;
  error: string | null;
}

interface RecommendationsActions {
  generateRecommendations: () => Promise<void>;
  getRecommendationForTicker: (
    ticker: string
  ) => StockRecommendation | undefined;
  refreshRecommendations: () => Promise<void>;
  clearRecommendations: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// SELECTORS
// ─────────────────────────────────────────────────────────────────────────────

export const selectTopBuyRecommendations = (
  state: RecommendationsState,
  limit = 5
) =>
  [...state.buyRecommendations]
    .sort((a, b) => b.confidencePercent - a.confidencePercent)
    .slice(0, limit);

export const selectTopSellRecommendations = (
  state: RecommendationsState,
  limit = 5
) =>
  [...state.sellRecommendations]
    .sort((a, b) => b.confidencePercent - a.confidencePercent)
    .slice(0, limit);

export const selectHighConfidenceRecommendations = (
  state: RecommendationsState
) =>
  [...state.buyRecommendations, ...state.sellRecommendations].filter(
    (r) => r.confidence === "high"
  );

// ─────────────────────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────────────────────

export const useRecommendationsStore = create<
  RecommendationsState & RecommendationsActions
>()((set, get) => ({
  // Initial state
  buyRecommendations: [],
  sellRecommendations: [],
  holdRecommendations: [],
  lastGenerated: null,
  isLoading: false,
  error: null,

  // Generate new recommendations
  generateRecommendations: async () => {
    set({ isLoading: true, error: null });

    try {
      // Get popular tickers
      const popularTickers = await tiingoService.getPopularTickers();

      // Get prices for all tickers
      const tickers = popularTickers.slice(0, 20).map((t) => t.ticker);
      const prices = await tiingoService.getBatchPrices(tickers);

      const tickerMetaMap = new Map(popularTickers.map((t) => [t.ticker, t]));

      // Generate recommendations using engine
      const allRecommendations: StockRecommendation[] = [];

      for (const price of prices) {
        const meta = tickerMetaMap.get(price.ticker);
        if (!meta) continue;

        const dayChange =
          ((price.lastPrice - price.prevClose) / price.prevClose) * 100;
        const type = determineRecommendationType(dayChange);

        allRecommendations.push(
          generateRecommendation(price.ticker, meta.name, price, type)
        );
      }

      // Categorize using engine
      const categorized = categorizeRecommendations(allRecommendations, 5);

      set({
        buyRecommendations: categorized.buy,
        sellRecommendations: categorized.sell,
        holdRecommendations: categorized.hold,
        lastGenerated: new Date().toISOString(),
        isLoading: false,
      });
    } catch (error) {
      console.error(
        "[RecommendationsStore] Failed to generate recommendations:",
        error
      );
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate recommendations",
        isLoading: false,
      });
    }
  },

  // Get recommendation for a specific ticker
  getRecommendationForTicker: (ticker) => {
    const { buyRecommendations, sellRecommendations, holdRecommendations } =
      get();
    return (
      buyRecommendations.find((r) => r.ticker === ticker) ||
      sellRecommendations.find((r) => r.ticker === ticker) ||
      holdRecommendations.find((r) => r.ticker === ticker)
    );
  },

  // Refresh recommendations (regenerate)
  refreshRecommendations: async () => {
    await get().generateRecommendations();
  },

  // Clear all recommendations
  clearRecommendations: () => {
    set({
      buyRecommendations: [],
      sellRecommendations: [],
      holdRecommendations: [],
      lastGenerated: null,
      error: null,
    });
  },
}));
