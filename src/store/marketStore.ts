// Path: src/store/marketStore.ts
import { create } from "zustand";
import { marketService } from "../services/market";
import {
  stocksData,
  recommendations,
  marketIndicators,
  keyFactors,
  trendIndicators,
  historicalPeriods,
  cycleData,
  sectorPerformance,
  type Stock,
  type Recommendation,
  type MarketIndicators,
  type Factor,
  type TrendData,
  type HistoricalPeriod,
  type CycleData,
  type SectorPerformance,
  type MarketState as MarketStateType,
  getRiskLevelFromValue,
  getConfidenceLevelFromPercent,
} from "../services/mockData";

interface MarketStoreState {
  stocks: Stock[];
  recommendations: Recommendation[];
  indicators: MarketIndicators;
  factors: Factor[];
  trends: TrendData[];
  historicalPeriods: HistoricalPeriod[];
  cycle: CycleData;
  sectorPerformance: SectorPerformance[];
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  updateInterval: number;
  lastUpdate: Date;
  dataSource: string;
  unsubscribe: (() => void) | null;
}

interface MarketActions {
  fetchStocks: () => Promise<void>;
  startLiveUpdates: () => void;
  stopLiveUpdates: () => void;
  updateIndicators: () => void;
  setUpdateInterval: (ms: number) => void;
  refreshData: () => Promise<void>;
}

// Selectors
export const selectStockBySymbol = (state: MarketStoreState & MarketActions, symbol: string) =>
  state.stocks.find((s) => s.symbol === symbol);

export const selectTopGainers = (state: MarketStoreState & MarketActions, limit = 5) =>
  [...state.stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, limit);

export const selectTopLosers = (state: MarketStoreState & MarketActions, limit = 5) =>
  [...state.stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, limit);

export const selectHighPriorityRecommendations = (state: MarketStoreState & MarketActions) =>
  state.recommendations.filter((r) => r.priority === "high");

export const useMarketStore = create<MarketStoreState & MarketActions>()((set, get) => ({
  // Initial state with mock data as fallback
  stocks: [...stocksData],
  recommendations: [...recommendations],
  indicators: { ...marketIndicators },
  factors: [...keyFactors],
  trends: [...trendIndicators],
  historicalPeriods: [...historicalPeriods],
  cycle: { ...cycleData },
  sectorPerformance: [...sectorPerformance],
  isLive: false,
  isLoading: false,
  error: null,
  updateInterval: 15000,
  lastUpdate: new Date(),
  dataSource: "mock",
  unsubscribe: null,

  // Fetch stocks from API (real or mock based on config)
  fetchStocks: async () => {
    set({ isLoading: true, error: null });

    // Create timeout promise (10 seconds max)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("API request timeout")), 10000)
    );

    try {
      console.log(`[MarketStore] Fetching stocks via ${marketService.getAdapterName()}...`);

      // Race between actual fetch and timeout
      const stocks = await Promise.race([
        marketService.getStocks(),
        timeoutPromise,
      ]);

      set({
        stocks,
        isLoading: false,
        lastUpdate: new Date(),
        dataSource: marketService.getAdapterName(),
      });

      console.log(`[MarketStore] Loaded ${stocks.length} stocks from ${marketService.getAdapterName()}`);

      // Update indicators based on real stock data
      get().updateIndicators();
    } catch (error) {
      console.error("[MarketStore] Error fetching stocks:", error);
      // Keep the mock data already in state, just update loading status
      set({
        error: "Failed to fetch market data - using cached data",
        isLoading: false,
        dataSource: "Mock (cached)",
      });
    }
  },

  // Start real-time updates (WebSocket or polling)
  startLiveUpdates: () => {
    const { isLive, unsubscribe: existingUnsub } = get();
    if (isLive && existingUnsub) return;

    console.log("[MarketStore] Starting live updates...");

    const symbols = get().stocks.map((s) => s.symbol);

    const unsubscribe = marketService.subscribeToUpdates(symbols, (updatedStocks) => {
      set((state) => {
        // Merge updated stocks with existing
        const stockMap = new Map(state.stocks.map((s) => [s.symbol, s]));
        updatedStocks.forEach((stock) => {
          stockMap.set(stock.symbol, stock);
        });

        const mergedStocks = Array.from(stockMap.values());

        // Update sector performance
        const updatedSectorPerf = state.sectorPerformance.map((sector) => {
          const sectorStocks = mergedStocks.filter((s) => s.sector === sector.sector);
          if (sectorStocks.length === 0) return sector;

          const avgDayChange =
            sectorStocks.reduce((sum, s) => sum + s.changePercent, 0) / sectorStocks.length;

          return {
            ...sector,
            dayChange: Math.round(avgDayChange * 100) / 100,
            trend: avgDayChange > 0.5 ? "up" : avgDayChange < -0.5 ? "down" : "stable",
          } as SectorPerformance;
        });

        return {
          stocks: mergedStocks,
          sectorPerformance: updatedSectorPerf,
          lastUpdate: new Date(),
        };
      });
    });

    set({ isLive: true, unsubscribe });
  },

  stopLiveUpdates: () => {
    const { unsubscribe } = get();
    if (unsubscribe) {
      console.log("[MarketStore] Stopping live updates...");
      unsubscribe();
    }
    set({ isLive: false, unsubscribe: null });
  },

  updateIndicators: () => {
    set((state) => {
      // Calculate metrics from real stock data
      const stocks = state.stocks;
      if (stocks.length === 0) return state;

      // Average change across all stocks
      const avgChange = stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length;

      // Standard deviation of changes (volatility proxy)
      const variance = stocks.reduce((sum, s) => sum + Math.pow(s.changePercent - avgChange, 2), 0) / stocks.length;
      const volatility = Math.sqrt(variance);

      // Count positive vs negative stocks
      const positiveCount = stocks.filter(s => s.changePercent > 0).length;
      const breadth = positiveCount / stocks.length; // Market breadth

      // Calculate risk based on volatility and market direction
      // Higher volatility + negative market = higher risk
      let baseRisk = 30 + volatility * 15;
      if (avgChange < -1) baseRisk += 20;
      if (avgChange < -2) baseRisk += 15;
      if (breadth < 0.3) baseRisk += 10; // Most stocks down

      // Add small random variation for realism
      const riskNoise = (Math.random() - 0.5) * 3;
      const newRiskValue = Math.max(10, Math.min(90, baseRisk + riskNoise));

      // Calculate confidence based on market breadth and consistency
      // High breadth + low volatility = high confidence
      let baseConfidence = 50 + breadth * 30 - volatility * 10;
      if (Math.abs(avgChange) > 1) baseConfidence += 10; // Strong move = clearer signal
      const confidenceNoise = (Math.random() - 0.5) * 5;
      const newConfidence = Math.max(35, Math.min(95, baseConfidence + confidenceNoise));

      // Determine market state from real data
      let newState: MarketStateType;
      if (avgChange > 1 && breadth > 0.6) {
        newState = "bullish";
      } else if (avgChange < -1 && breadth < 0.4) {
        newState = "bearish";
      } else if (Math.abs(avgChange) < 0.3 && volatility < 1) {
        newState = "neutral";
      } else {
        newState = "uncertain";
      }

      // Update state description based on conditions
      const stateDescriptions: Record<MarketStateType, string> = {
        bullish: `Strong momentum with ${Math.round(breadth * 100)}% of stocks advancing`,
        bearish: `Risk-off sentiment with ${Math.round((1 - breadth) * 100)}% of stocks declining`,
        neutral: "Consolidation phase with balanced buying and selling pressure",
        uncertain: `Mixed signals: avg change ${avgChange.toFixed(2)}%, volatility ${volatility.toFixed(2)}%`,
      };

      return {
        indicators: {
          ...state.indicators,
          state: newState,
          stateDescription: stateDescriptions[newState],
          riskValue: Math.round(newRiskValue),
          riskLevel: getRiskLevelFromValue(newRiskValue),
          confidencePercent: Math.round(newConfidence),
          confidenceLevel: getConfidenceLevelFromPercent(newConfidence),
          lastUpdated: new Date().toISOString(),
        },
        lastUpdate: new Date(),
      };
    });
  },

  setUpdateInterval: (ms: number) => {
    set({ updateInterval: ms });
  },

  refreshData: async () => {
    const { stopLiveUpdates, fetchStocks, startLiveUpdates, isLive } = get();

    // Stop current updates
    stopLiveUpdates();

    // Fetch fresh data
    await fetchStocks();

    // Restart if was live
    if (isLive) {
      startLiveUpdates();
    }
  },
}));
