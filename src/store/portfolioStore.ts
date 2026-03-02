// Path: src/store/portfolioStore.ts
import { create } from "zustand";
import {
  portfolioHoldings,
  allocations,
  portfolioSummary,
  portfolioPerformance,
  recentTransactions,
  type PortfolioHolding,
  type Allocation,
  type PortfolioSummary,
  type PerformanceDataPoint,
  type Transaction,
} from "../services/mockData";
import type { Stock } from "../services/mockData/stocks";
import {
  type Trade,
  validateBuyOrder,
  validateSellOrder,
  calculateTradeExecution,
  calculateBuyPositionUpdate,
  calculateSellPositionUpdate,
} from "../services/engines/tradingEngine";
import {
  updateHoldingsWithMarketData as engineUpdateHoldings,
  calculatePortfolioSummary,
  calculatePortfolioAllocations,
  updateHoldingAllocations,
} from "../services/engines/portfolioEngine";

export type { Trade };

export interface TradeResult {
  success: boolean;
  trade: Trade;
  executedPrice: number;
  total: number;
  message: string;
  transactionId: string;
}

interface PortfolioState {
  holdings: PortfolioHolding[];
  allocations: Allocation[];
  summary: PortfolioSummary;
  performance: PerformanceDataPoint[];
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

interface PortfolioActions {
  fetchPortfolio: () => Promise<void>;
  executeTrade: (trade: Trade, marketStocks?: Stock[]) => Promise<TradeResult>;
  updateHoldingsWithMarketData: (marketStocks: Stock[]) => void;
  refreshAllocations: () => void;
}

// Selectors
export const selectHoldingBySymbol = (
  state: PortfolioState & PortfolioActions,
  symbol: string
) => state.holdings.find((h) => h.symbol === symbol);

export const selectTopHoldings = (
  state: PortfolioState & PortfolioActions,
  limit = 5
) => [...state.holdings].sort((a, b) => b.value - a.value).slice(0, limit);

export const selectTotalGainLoss = (state: PortfolioState & PortfolioActions) =>
  state.holdings.reduce((sum, h) => sum + h.gain, 0);

export const usePortfolioStore = create<PortfolioState & PortfolioActions>()(
  (set, get) => ({
    holdings: [],
    allocations: [],
    summary: portfolioSummary,
    performance: [],
    transactions: [],
    isLoading: false,
    error: null,

    fetchPortfolio: async () => {
      set({ isLoading: true, error: null });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      set({
        holdings: [...portfolioHoldings],
        allocations: [...allocations],
        summary: { ...portfolioSummary },
        performance: [...portfolioPerformance],
        transactions: [...recentTransactions],
        isLoading: false,
      });
    },

    executeTrade: async (
      trade: Trade,
      marketStocks?: Stock[]
    ): Promise<TradeResult> => {
      const { holdings, transactions, summary } = get();

      // Simulate execution delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      const execution = calculateTradeExecution(trade);
      const { executedPrice, total } = execution;

      // Validate
      if (trade.type === "buy") {
        const validation = validateBuyOrder(total, summary.cashBalance);
        if (!validation.valid) {
          return {
            success: false,
            trade,
            executedPrice,
            total,
            message: validation.message,
            transactionId: "",
          };
        }

        const update = calculateBuyPositionUpdate(
          holdings,
          trade,
          executedPrice,
          total,
          marketStocks
        );
        set({
          holdings: update.holdings,
          summary: {
            ...summary,
            cashBalance:
              Math.round(
                (summary.cashBalance + (update.summaryPatch.cashBalance || 0)) *
                  100
              ) / 100,
            buyingPower:
              Math.round(
                (summary.buyingPower + (update.summaryPatch.buyingPower || 0)) *
                  100
              ) / 100,
          },
        });
      } else {
        const validation = validateSellOrder(trade, holdings);
        if (!validation.valid) {
          return {
            success: false,
            trade,
            executedPrice,
            total,
            message: validation.message,
            transactionId: "",
          };
        }

        const update = calculateSellPositionUpdate(holdings, trade, total);
        set({
          holdings: update.holdings,
          summary: {
            ...summary,
            cashBalance:
              Math.round(
                (summary.cashBalance + (update.summaryPatch.cashBalance || 0)) *
                  100
              ) / 100,
            buyingPower:
              Math.round(
                (summary.buyingPower + (update.summaryPatch.buyingPower || 0)) *
                  100
              ) / 100,
          },
        });
      }

      // Add transaction
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        type: trade.type,
        symbol: trade.symbol,
        shares: trade.shares,
        price: executedPrice,
        total,
        status: "completed",
      };

      set({
        transactions: [newTransaction, ...transactions].slice(0, 20),
      });

      // Refresh allocations
      get().refreshAllocations();

      return {
        success: true,
        trade,
        executedPrice,
        total,
        message: `${trade.type === "buy" ? "Purchased" : "Sold"} ${trade.shares} shares of ${trade.symbol}`,
        transactionId: newTransaction.id,
      };
    },

    updateHoldingsWithMarketData: (marketStocks: Stock[]) => {
      set((state) => {
        const updatedHoldings = engineUpdateHoldings(
          state.holdings,
          marketStocks
        );
        const newSummary = calculatePortfolioSummary(updatedHoldings);

        return {
          holdings: updatedHoldings,
          summary: {
            ...newSummary,
            cashBalance: state.summary.cashBalance,
            buyingPower: state.summary.buyingPower,
          },
        };
      });
    },

    refreshAllocations: () => {
      const { holdings, summary } = get();
      const newAllocations = calculatePortfolioAllocations(
        holdings,
        summary.cashBalance
      );
      const updatedHoldings = updateHoldingAllocations(
        holdings,
        summary.cashBalance
      );

      set({
        allocations: newAllocations,
        holdings: updatedHoldings,
      });
    },
  })
);
