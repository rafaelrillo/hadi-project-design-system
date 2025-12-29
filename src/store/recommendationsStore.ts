// Path: src/store/recommendationsStore.ts

import { create } from "zustand";
import { tiingoService } from "../services/tiingo";
import type { TiingoIEXPrice } from "../services/tiingo";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type RecommendationType = "buy" | "sell" | "hold";
export type ConfidenceLevel = "high" | "medium" | "low";

export interface RecommendationFactor {
  name: string;
  impact: "positive" | "negative" | "neutral";
  weight: number; // 0-100
  description: string;
}

export interface StockRecommendation {
  id: string;
  ticker: string;
  name: string;
  type: RecommendationType;
  confidence: ConfidenceLevel;
  confidencePercent: number;
  currentPrice: number;
  targetPrice: number;
  potentialReturn: number;
  factors: RecommendationFactor[];
  reasoning: string;
  generatedAt: string;
  expiresAt: string;
}

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
  getRecommendationForTicker: (ticker: string) => StockRecommendation | undefined;
  refreshRecommendations: () => Promise<void>;
  clearRecommendations: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// RECOMMENDATION ENGINE (Simplified mock logic)
// ─────────────────────────────────────────────────────────────────────────────

function generateMockFactors(type: RecommendationType): RecommendationFactor[] {
  const buyFactors: RecommendationFactor[] = [
    { name: "Technical Momentum", impact: "positive", weight: 85, description: "Strong upward trend with increasing volume" },
    { name: "Earnings Growth", impact: "positive", weight: 78, description: "Consistent earnings beats over last 4 quarters" },
    { name: "Institutional Buying", impact: "positive", weight: 72, description: "Increased institutional ownership" },
    { name: "Sector Strength", impact: "positive", weight: 65, description: "Technology sector showing leadership" },
  ];

  const sellFactors: RecommendationFactor[] = [
    { name: "Valuation Concern", impact: "negative", weight: 82, description: "P/E ratio significantly above historical average" },
    { name: "Technical Weakness", impact: "negative", weight: 75, description: "Breaking below key support levels" },
    { name: "Earnings Risk", impact: "negative", weight: 68, description: "Analyst estimates trending lower" },
    { name: "Sector Rotation", impact: "negative", weight: 60, description: "Money flowing out of sector" },
  ];

  const holdFactors: RecommendationFactor[] = [
    { name: "Fair Valuation", impact: "neutral", weight: 70, description: "Trading near fair value estimates" },
    { name: "Mixed Signals", impact: "neutral", weight: 65, description: "Technical indicators showing no clear direction" },
    { name: "Pending Catalyst", impact: "neutral", weight: 60, description: "Wait for earnings or key announcement" },
  ];

  switch (type) {
    case "buy":
      return buyFactors.slice(0, 2 + Math.floor(Math.random() * 2));
    case "sell":
      return sellFactors.slice(0, 2 + Math.floor(Math.random() * 2));
    default:
      return holdFactors.slice(0, 2 + Math.floor(Math.random() * 2));
  }
}

function generateRecommendation(
  ticker: string,
  name: string,
  priceData: TiingoIEXPrice,
  type: RecommendationType
): StockRecommendation {
  const currentPrice = priceData.lastPrice;
  const prevClose = priceData.prevClose;
  const dayChange = ((currentPrice - prevClose) / prevClose) * 100;

  // Generate target price based on type
  let targetMultiplier: number;
  if (type === "buy") {
    targetMultiplier = 1 + (0.05 + Math.random() * 0.15); // 5-20% upside
  } else if (type === "sell") {
    targetMultiplier = 1 - (0.05 + Math.random() * 0.15); // 5-20% downside
  } else {
    targetMultiplier = 1 + (Math.random() - 0.5) * 0.05; // -2.5% to +2.5%
  }

  const targetPrice = currentPrice * targetMultiplier;
  const potentialReturn = ((targetPrice - currentPrice) / currentPrice) * 100;

  // Generate confidence based on factors
  const baseConfidence = type === "buy" ? 70 : type === "sell" ? 65 : 50;
  const confidenceNoise = Math.random() * 20 - 10;
  const confidencePercent = Math.max(40, Math.min(95, baseConfidence + confidenceNoise + Math.abs(dayChange) * 2));

  const confidenceLevel: ConfidenceLevel =
    confidencePercent >= 75 ? "high" : confidencePercent >= 55 ? "medium" : "low";

  const factors = generateMockFactors(type);

  const reasoningTemplates = {
    buy: `${name} shows strong momentum with ${dayChange > 0 ? "positive" : "recovering"} price action. Technical indicators suggest continued upside potential with a target of $${targetPrice.toFixed(2)}.`,
    sell: `${name} faces headwinds with ${dayChange < 0 ? "weakening" : "concerning"} fundamentals. Consider reducing exposure or taking profits with a price target of $${targetPrice.toFixed(2)}.`,
    hold: `${name} is trading near fair value. Current price action suggests waiting for a clearer entry or exit point before making changes.`,
  };

  const now = new Date();
  const expires = new Date(now);
  expires.setHours(23, 59, 59, 999); // End of day

  return {
    id: `rec-${ticker}-${Date.now()}`,
    ticker,
    name,
    type,
    confidence: confidenceLevel,
    confidencePercent: Math.round(confidencePercent),
    currentPrice: Math.round(currentPrice * 100) / 100,
    targetPrice: Math.round(targetPrice * 100) / 100,
    potentialReturn: Math.round(potentialReturn * 100) / 100,
    factors,
    reasoning: reasoningTemplates[type],
    generatedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SELECTORS
// ─────────────────────────────────────────────────────────────────────────────

export const selectTopBuyRecommendations = (state: RecommendationsState, limit = 5) =>
  [...state.buyRecommendations]
    .sort((a, b) => b.confidencePercent - a.confidencePercent)
    .slice(0, limit);

export const selectTopSellRecommendations = (state: RecommendationsState, limit = 5) =>
  [...state.sellRecommendations]
    .sort((a, b) => b.confidencePercent - a.confidencePercent)
    .slice(0, limit);

export const selectHighConfidenceRecommendations = (state: RecommendationsState) =>
  [...state.buyRecommendations, ...state.sellRecommendations].filter(
    (r) => r.confidence === "high"
  );

// ─────────────────────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────────────────────

export const useRecommendationsStore = create<RecommendationsState & RecommendationsActions>()(
  (set, get) => ({
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

        // Generate recommendations
        const recommendations: StockRecommendation[] = [];

        for (const price of prices) {
          const meta = tickerMetaMap.get(price.ticker);
          if (!meta) continue;

          // Determine recommendation type based on price movement and random factor
          const dayChange = ((price.lastPrice - price.prevClose) / price.prevClose) * 100;
          const randomFactor = Math.random();

          let type: RecommendationType;
          if (dayChange > 1 && randomFactor > 0.3) {
            type = "buy";
          } else if (dayChange < -1 && randomFactor > 0.3) {
            type = "sell";
          } else if (randomFactor > 0.6) {
            type = Math.random() > 0.5 ? "buy" : "sell";
          } else {
            type = "hold";
          }

          recommendations.push(
            generateRecommendation(price.ticker, meta.name, price, type)
          );
        }

        // Sort and categorize
        const buyRecs = recommendations
          .filter((r) => r.type === "buy")
          .sort((a, b) => b.confidencePercent - a.confidencePercent)
          .slice(0, 5);

        const sellRecs = recommendations
          .filter((r) => r.type === "sell")
          .sort((a, b) => b.confidencePercent - a.confidencePercent)
          .slice(0, 5);

        const holdRecs = recommendations
          .filter((r) => r.type === "hold")
          .sort((a, b) => b.confidencePercent - a.confidencePercent)
          .slice(0, 5);

        set({
          buyRecommendations: buyRecs,
          sellRecommendations: sellRecs,
          holdRecommendations: holdRecs,
          lastGenerated: new Date().toISOString(),
          isLoading: false,
        });
      } catch (error) {
        console.error("[RecommendationsStore] Failed to generate recommendations:", error);
        set({
          error: error instanceof Error ? error.message : "Failed to generate recommendations",
          isLoading: false,
        });
      }
    },

    // Get recommendation for a specific ticker
    getRecommendationForTicker: (ticker) => {
      const { buyRecommendations, sellRecommendations, holdRecommendations } = get();
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
  })
);
