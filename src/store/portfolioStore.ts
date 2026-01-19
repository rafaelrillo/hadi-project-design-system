// Path: src/store/portfolioStore.ts
import { create } from "zustand";
import {
  portfolioHoldings,
  allocations,
  portfolioSummary,
  portfolioPerformance,
  recentTransactions,
  calculatePortfolioTotals,
  type PortfolioHolding,
  type Allocation,
  type PortfolioSummary,
  type PerformanceDataPoint,
  type Transaction,
} from "../services/mockData";
import { useMarketStore } from "./marketStore";

export interface Trade {
  symbol: string;
  name: string;
  type: "buy" | "sell";
  shares: number;
  price: number;
  orderType: "market" | "limit";
  limitPrice?: number;
}

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
  executeTrade: (trade: Trade) => Promise<TradeResult>;
  updateHoldingsWithMarketData: () => void;
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

    executeTrade: async (trade: Trade): Promise<TradeResult> => {
      const { holdings, transactions, summary } = get();

      // Simulate execution delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      const executedPrice =
        trade.orderType === "market"
          ? trade.price * (1 + (Math.random() - 0.5) * 0.002) // Slight slippage
          : trade.limitPrice || trade.price;

      const total = executedPrice * trade.shares;

      if (trade.type === "buy") {
        // Check if enough cash
        if (total > summary.cashBalance) {
          return {
            success: false,
            trade,
            executedPrice,
            total,
            message: "Insufficient funds",
            transactionId: "",
          };
        }

        // Find existing holding or create new
        const existingIndex = holdings.findIndex(
          (h) => h.symbol === trade.symbol
        );

        if (existingIndex >= 0) {
          // Update existing holding
          const existing = holdings[existingIndex];
          const newShares = existing.shares + trade.shares;
          const newCostBasis = existing.costBasis + total;
          const newAvgCost = newCostBasis / newShares;

          const updatedHolding: PortfolioHolding = {
            ...existing,
            shares: newShares,
            avgCost: Math.round(newAvgCost * 100) / 100,
            costBasis: Math.round(newCostBasis * 100) / 100,
            value: Math.round(newShares * existing.currentPrice * 100) / 100,
            gain: Math.round(
              (newShares * existing.currentPrice - newCostBasis) * 100
            ) / 100,
            gainPercent: Math.round(
              (((newShares * existing.currentPrice - newCostBasis) /
                newCostBasis) *
                100) *
                100
            ) / 100,
          };

          const newHoldings = [...holdings];
          newHoldings[existingIndex] = updatedHolding;

          set({
            holdings: newHoldings,
            summary: {
              ...summary,
              cashBalance: Math.round((summary.cashBalance - total) * 100) / 100,
              buyingPower: Math.round((summary.buyingPower - total) * 100) / 100,
            },
          });
        } else {
          // Create new holding
          const marketStock = useMarketStore
            .getState()
            .stocks.find((s) => s.symbol === trade.symbol);

          const newHolding: PortfolioHolding = {
            id: `h${Date.now()}`,
            symbol: trade.symbol,
            name: trade.name,
            shares: trade.shares,
            avgCost: Math.round(executedPrice * 100) / 100,
            currentPrice: executedPrice,
            value: Math.round(total * 100) / 100,
            costBasis: Math.round(total * 100) / 100,
            gain: 0,
            gainPercent: 0,
            dayChange: 0,
            dayChangePercent: 0,
            allocation: 0,
            sector: marketStock?.sector || "Other",
          };

          set({
            holdings: [...holdings, newHolding],
            summary: {
              ...summary,
              cashBalance: Math.round((summary.cashBalance - total) * 100) / 100,
              buyingPower: Math.round((summary.buyingPower - total) * 100) / 100,
            },
          });
        }
      } else {
        // Sell
        const existingIndex = holdings.findIndex(
          (h) => h.symbol === trade.symbol
        );

        if (existingIndex < 0) {
          return {
            success: false,
            trade,
            executedPrice,
            total,
            message: "No position to sell",
            transactionId: "",
          };
        }

        const existing = holdings[existingIndex];
        if (trade.shares > existing.shares) {
          return {
            success: false,
            trade,
            executedPrice,
            total,
            message: "Insufficient shares",
            transactionId: "",
          };
        }

        if (trade.shares === existing.shares) {
          // Close position
          const newHoldings = holdings.filter((_, i) => i !== existingIndex);
          set({
            holdings: newHoldings,
            summary: {
              ...summary,
              cashBalance: Math.round((summary.cashBalance + total) * 100) / 100,
              buyingPower: Math.round((summary.buyingPower + total) * 100) / 100,
            },
          });
        } else {
          // Partial sell
          const newShares = existing.shares - trade.shares;
          const costReduction = (trade.shares / existing.shares) * existing.costBasis;
          const newCostBasis = existing.costBasis - costReduction;

          const updatedHolding: PortfolioHolding = {
            ...existing,
            shares: newShares,
            costBasis: Math.round(newCostBasis * 100) / 100,
            value: Math.round(newShares * existing.currentPrice * 100) / 100,
            gain: Math.round(
              (newShares * existing.currentPrice - newCostBasis) * 100
            ) / 100,
          };

          const newHoldings = [...holdings];
          newHoldings[existingIndex] = updatedHolding;

          set({
            holdings: newHoldings,
            summary: {
              ...summary,
              cashBalance: Math.round((summary.cashBalance + total) * 100) / 100,
              buyingPower: Math.round((summary.buyingPower + total) * 100) / 100,
            },
          });
        }
      }

      // Add transaction
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        type: trade.type,
        symbol: trade.symbol,
        shares: trade.shares,
        price: Math.round(executedPrice * 100) / 100,
        total: Math.round(total * 100) / 100,
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
        executedPrice: Math.round(executedPrice * 100) / 100,
        total: Math.round(total * 100) / 100,
        message: `${trade.type === "buy" ? "Purchased" : "Sold"} ${trade.shares} shares of ${trade.symbol}`,
        transactionId: newTransaction.id,
      };
    },

    updateHoldingsWithMarketData: () => {
      const marketStocks = useMarketStore.getState().stocks;

      set((state) => {
        const updatedHoldings = state.holdings.map((holding) => {
          const marketStock = marketStocks.find(
            (s) => s.symbol === holding.symbol
          );
          if (!marketStock) return holding;

          const newValue = holding.shares * marketStock.price;
          const newGain = newValue - holding.costBasis;
          const newGainPercent = (newGain / holding.costBasis) * 100;
          const dayChange = holding.shares * marketStock.change;
          const dayChangePercent = marketStock.changePercent;

          return {
            ...holding,
            currentPrice: marketStock.price,
            value: Math.round(newValue * 100) / 100,
            gain: Math.round(newGain * 100) / 100,
            gainPercent: Math.round(newGainPercent * 100) / 100,
            dayChange: Math.round(dayChange * 100) / 100,
            dayChangePercent: Math.round(dayChangePercent * 100) / 100,
          };
        });

        const newSummary = calculatePortfolioTotals(updatedHoldings);

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
      const totalValue = holdings.reduce((sum, h) => sum + h.value, 0) + summary.cashBalance;

      // Group by sector
      const sectorValues: Record<string, number> = {};
      holdings.forEach((h) => {
        sectorValues[h.sector] = (sectorValues[h.sector] || 0) + h.value;
      });

      // Map to allocation format
      const colors: Record<string, string> = {
        Technology: "#5ba3a5",
        Financial: "#7ecbcc",
        Healthcare: "#4a7a6a",
        "Consumer Discretionary": "#c4a35a",
        "Consumer Staples": "#c47a5a",
        Energy: "#b85c5c",
        Cash: "#6b7280",
      };

      const newAllocations: Allocation[] = Object.entries(sectorValues).map(
        ([sector, value], index) => ({
          id: `a${index}`,
          category: sector,
          percentage: Math.round((value / totalValue) * 100 * 100) / 100,
          value: Math.round(value * 100) / 100,
          change: 0,
          target: 0,
          color: colors[sector] || "#6b7280",
        })
      );

      // Add cash
      if (summary.cashBalance > 0) {
        newAllocations.push({
          id: "a-cash",
          category: "Cash",
          percentage: Math.round((summary.cashBalance / totalValue) * 100 * 100) / 100,
          value: summary.cashBalance,
          change: 0,
          target: 5,
          color: "#6b7280",
        });
      }

      // Update holdings with allocation percentages
      const updatedHoldings = holdings.map((h) => ({
        ...h,
        allocation: Math.round((h.value / totalValue) * 100 * 100) / 100,
      }));

      set({
        allocations: newAllocations,
        holdings: updatedHoldings,
      });
    },
  })
);
