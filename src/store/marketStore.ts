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
} from "../services/mockData";
import { calculateIndicators } from "../services/engines/indicatorEngine";

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
export const selectStockBySymbol = (
  state: MarketStoreState & MarketActions,
  symbol: string
) => state.stocks.find((s) => s.symbol === symbol);

export const selectTopGainers = (
  state: MarketStoreState & MarketActions,
  limit = 5
) =>
  [...state.stocks]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, limit);

export const selectTopLosers = (
  state: MarketStoreState & MarketActions,
  limit = 5
) =>
  [...state.stocks]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, limit);

export const selectHighPriorityRecommendations = (
  state: MarketStoreState & MarketActions
) => state.recommendations.filter((r) => r.priority === "high");

export const useMarketStore = create<MarketStoreState & MarketActions>()(
  (set, get) => ({
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
        console.log(
          `[MarketStore] Fetching stocks via ${marketService.getAdapterName()}...`
        );

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

        console.log(
          `[MarketStore] Loaded ${stocks.length} stocks from ${marketService.getAdapterName()}`
        );

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

      const unsubscribe = marketService.subscribeToUpdates(
        symbols,
        (updatedStocks) => {
          set((state) => {
            // Merge updated stocks with existing
            const stockMap = new Map(state.stocks.map((s) => [s.symbol, s]));
            updatedStocks.forEach((stock) => {
              stockMap.set(stock.symbol, stock);
            });

            const mergedStocks = Array.from(stockMap.values());

            // Update sector performance
            const updatedSectorPerf = state.sectorPerformance.map((sector) => {
              const sectorStocks = mergedStocks.filter(
                (s) => s.sector === sector.sector
              );
              if (sectorStocks.length === 0) return sector;

              const avgDayChange =
                sectorStocks.reduce((sum, s) => sum + s.changePercent, 0) /
                sectorStocks.length;

              return {
                ...sector,
                dayChange: Math.round(avgDayChange * 100) / 100,
                trend:
                  avgDayChange > 0.5
                    ? "up"
                    : avgDayChange < -0.5
                      ? "down"
                      : "stable",
              } as SectorPerformance;
            });

            return {
              stocks: mergedStocks,
              sectorPerformance: updatedSectorPerf,
              lastUpdate: new Date(),
            };
          });
        }
      );

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
        if (state.stocks.length === 0) return state;

        return {
          indicators: calculateIndicators(state.stocks, state.indicators),
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
  })
);
