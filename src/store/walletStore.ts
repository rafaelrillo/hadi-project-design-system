// Path: src/store/walletStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tiingoService } from "../services/tiingo";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface Position {
  ticker: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell";
  ticker: string;
  name: string;
  shares: number;
  price: number;
  total: number;
  status: "completed" | "pending" | "cancelled";
  timestamp: string;
  fee: number;
}

export interface TradeOrder {
  ticker: string;
  name: string;
  type: "buy" | "sell";
  orderType: "market" | "limit";
  amount: number;
  amountType: "shares" | "dollars";
  limitPrice?: number;
}

export interface Balance {
  cash: number;
  buyingPower: number;
  portfolioValue: number;
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATE INTERFACE
// ─────────────────────────────────────────────────────────────────────────────

interface WalletState {
  balance: Balance;
  positions: Position[];
  transactions: Transaction[];
  pendingOrders: TradeOrder[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

interface WalletActions {
  // Trading
  executeOrder: (order: TradeOrder) => Promise<{ success: boolean; message: string; transaction?: Transaction }>;
  cancelOrder: (orderId: string) => void;

  // Data
  refreshPositions: () => Promise<void>;
  updatePrices: () => Promise<void>;

  // Account
  resetAccount: (initialCash?: number) => void;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean;

  // Helpers
  getPosition: (ticker: string) => Position | undefined;
  calculatePortfolioValue: () => number;
}

// ─────────────────────────────────────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_CASH = 10000;

const initialBalance: Balance = {
  cash: INITIAL_CASH,
  buyingPower: INITIAL_CASH,
  portfolioValue: 0,
  totalValue: INITIAL_CASH,
  dayChange: 0,
  dayChangePercent: 0,
};

// ─────────────────────────────────────────────────────────────────────────────
// SELECTORS
// ─────────────────────────────────────────────────────────────────────────────

export const selectWalletTotalGainLoss = (state: WalletState) =>
  state.positions.reduce((sum, p) => sum + p.gainLoss, 0);

export const selectPositionByTicker = (state: WalletState, ticker: string) =>
  state.positions.find((p) => p.ticker === ticker);

export const selectTopPositions = (state: WalletState, limit = 5) =>
  [...state.positions].sort((a, b) => b.marketValue - a.marketValue).slice(0, limit);

export const selectRecentTransactions = (state: WalletState, limit = 10) =>
  state.transactions.slice(0, limit);

// ─────────────────────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────────────────────

export const useWalletStore = create<WalletState & WalletActions>()(
  persist(
    (set, get) => ({
      // Initial state
      balance: { ...initialBalance },
      positions: [],
      transactions: [],
      pendingOrders: [],
      isLoading: false,
      error: null,
      lastUpdated: null,

      // Execute a trade order
      executeOrder: async (order) => {
        const { balance, positions, transactions } = get();

        set({ isLoading: true, error: null });

        try {
          // Get current price from Tiingo
          const priceData = await tiingoService.getCurrentPrice(order.ticker);
          const currentPrice = order.orderType === "market"
            ? priceData.lastPrice
            : order.limitPrice || priceData.lastPrice;

          // Calculate shares and total
          let shares: number;
          let total: number;

          if (order.amountType === "shares") {
            shares = order.amount;
            total = shares * currentPrice;
          } else {
            total = order.amount;
            shares = total / currentPrice;
          }

          // Add small trading fee (simulated)
          const fee = Math.max(1, total * 0.001); // 0.1% fee, min $1
          const totalWithFee = total + (order.type === "buy" ? fee : -fee);

          // Validations
          if (order.type === "buy") {
            if (totalWithFee > balance.buyingPower) {
              set({ isLoading: false, error: "Insufficient funds" });
              return { success: false, message: "Insufficient funds" };
            }
            if (total < 1) {
              set({ isLoading: false, error: "Minimum order is $1" });
              return { success: false, message: "Minimum order is $1" };
            }
          } else {
            const position = positions.find((p) => p.ticker === order.ticker);
            if (!position) {
              set({ isLoading: false, error: "No position to sell" });
              return { success: false, message: "No position to sell" };
            }
            if (shares > position.shares) {
              set({ isLoading: false, error: "Insufficient shares" });
              return { success: false, message: "Insufficient shares" };
            }
          }

          // Create transaction
          const transaction: Transaction = {
            id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: order.type,
            ticker: order.ticker,
            name: order.name,
            shares: Math.round(shares * 10000) / 10000,
            price: currentPrice,
            total: Math.round(total * 100) / 100,
            status: "completed",
            timestamp: new Date().toISOString(),
            fee: Math.round(fee * 100) / 100,
          };

          // Update positions
          let newPositions = [...positions];
          const existingIndex = positions.findIndex((p) => p.ticker === order.ticker);

          if (order.type === "buy") {
            if (existingIndex >= 0) {
              // Update existing position
              const existing = positions[existingIndex];
              const newShares = existing.shares + shares;
              const newAvgCost = (existing.avgCost * existing.shares + total) / newShares;

              newPositions[existingIndex] = {
                ...existing,
                shares: newShares,
                avgCost: Math.round(newAvgCost * 100) / 100,
                currentPrice,
                marketValue: Math.round(newShares * currentPrice * 100) / 100,
                gainLoss: Math.round((newShares * currentPrice - newShares * newAvgCost) * 100) / 100,
                gainLossPercent: Math.round(((currentPrice - newAvgCost) / newAvgCost) * 100 * 100) / 100,
              };
            } else {
              // New position
              newPositions.push({
                ticker: order.ticker,
                name: order.name,
                shares: Math.round(shares * 10000) / 10000,
                avgCost: currentPrice,
                currentPrice,
                marketValue: Math.round(total * 100) / 100,
                gainLoss: 0,
                gainLossPercent: 0,
              });
            }
          } else {
            // Sell
            const existing = positions[existingIndex];
            const newShares = existing.shares - shares;

            if (newShares <= 0.0001) {
              // Close position
              newPositions = positions.filter((_, i) => i !== existingIndex);
            } else {
              // Partial sell
              newPositions[existingIndex] = {
                ...existing,
                shares: newShares,
                marketValue: Math.round(newShares * currentPrice * 100) / 100,
                gainLoss: Math.round((newShares * currentPrice - newShares * existing.avgCost) * 100) / 100,
              };
            }
          }

          // Calculate new balance
          const portfolioValue = newPositions.reduce((sum, p) => sum + p.marketValue, 0);
          const newCash = order.type === "buy"
            ? balance.cash - totalWithFee
            : balance.cash + total - fee;

          const newBalance: Balance = {
            cash: Math.round(newCash * 100) / 100,
            buyingPower: Math.round(newCash * 100) / 100,
            portfolioValue: Math.round(portfolioValue * 100) / 100,
            totalValue: Math.round((newCash + portfolioValue) * 100) / 100,
            dayChange: balance.dayChange,
            dayChangePercent: balance.dayChangePercent,
          };

          set({
            positions: newPositions,
            balance: newBalance,
            transactions: [transaction, ...transactions].slice(0, 100),
            isLoading: false,
            lastUpdated: new Date().toISOString(),
          });

          return {
            success: true,
            message: `${order.type === "buy" ? "Bought" : "Sold"} ${shares.toFixed(4)} shares of ${order.ticker}`,
            transaction,
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : "Trade execution failed";
          set({ isLoading: false, error: message });
          return { success: false, message };
        }
      },

      // Cancel a pending order
      cancelOrder: (orderId) => {
        set((state) => ({
          pendingOrders: state.pendingOrders.filter((o) => o.ticker !== orderId),
        }));
      },

      // Refresh position prices from market
      refreshPositions: async () => {
        const { positions } = get();
        if (positions.length === 0) return;

        set({ isLoading: true });

        try {
          const tickers = positions.map((p) => p.ticker);
          const prices = await tiingoService.getBatchPrices(tickers);

          const priceMap = new Map(prices.map((p) => [p.ticker, p]));

          const updatedPositions = positions.map((position) => {
            const priceData = priceMap.get(position.ticker);
            if (!priceData) return position;

            const currentPrice = priceData.lastPrice;
            const marketValue = position.shares * currentPrice;
            const gainLoss = marketValue - position.shares * position.avgCost;
            const gainLossPercent = (gainLoss / (position.shares * position.avgCost)) * 100;

            return {
              ...position,
              currentPrice,
              marketValue: Math.round(marketValue * 100) / 100,
              gainLoss: Math.round(gainLoss * 100) / 100,
              gainLossPercent: Math.round(gainLossPercent * 100) / 100,
            };
          });

          const portfolioValue = updatedPositions.reduce((sum, p) => sum + p.marketValue, 0);

          set((state) => ({
            positions: updatedPositions,
            balance: {
              ...state.balance,
              portfolioValue: Math.round(portfolioValue * 100) / 100,
              totalValue: Math.round((state.balance.cash + portfolioValue) * 100) / 100,
            },
            isLoading: false,
            lastUpdated: new Date().toISOString(),
          }));
        } catch (error) {
          console.error("[WalletStore] Failed to refresh positions:", error);
          set({ isLoading: false });
        }
      },

      // Update prices (alias for refreshPositions)
      updatePrices: async () => {
        await get().refreshPositions();
      },

      // Reset account to initial state
      resetAccount: (initialCash = INITIAL_CASH) => {
        set({
          balance: {
            cash: initialCash,
            buyingPower: initialCash,
            portfolioValue: 0,
            totalValue: initialCash,
            dayChange: 0,
            dayChangePercent: 0,
          },
          positions: [],
          transactions: [],
          pendingOrders: [],
          error: null,
          lastUpdated: new Date().toISOString(),
        });
      },

      // Deposit funds
      deposit: (amount) => {
        if (amount <= 0) return;

        set((state) => ({
          balance: {
            ...state.balance,
            cash: state.balance.cash + amount,
            buyingPower: state.balance.buyingPower + amount,
            totalValue: state.balance.totalValue + amount,
          },
          transactions: [
            {
              id: `dep-${Date.now()}`,
              type: "buy" as const,
              ticker: "DEPOSIT",
              name: "Cash Deposit",
              shares: 0,
              price: amount,
              total: amount,
              status: "completed" as const,
              timestamp: new Date().toISOString(),
              fee: 0,
            },
            ...state.transactions,
          ].slice(0, 100),
        }));
      },

      // Withdraw funds
      withdraw: (amount) => {
        const { balance } = get();
        if (amount <= 0 || amount > balance.cash) return false;

        set((state) => ({
          balance: {
            ...state.balance,
            cash: state.balance.cash - amount,
            buyingPower: state.balance.buyingPower - amount,
            totalValue: state.balance.totalValue - amount,
          },
          transactions: [
            {
              id: `wit-${Date.now()}`,
              type: "sell" as const,
              ticker: "WITHDRAW",
              name: "Cash Withdrawal",
              shares: 0,
              price: amount,
              total: amount,
              status: "completed" as const,
              timestamp: new Date().toISOString(),
              fee: 0,
            },
            ...state.transactions,
          ].slice(0, 100),
        }));

        return true;
      },

      // Get position by ticker
      getPosition: (ticker) => {
        return get().positions.find((p) => p.ticker === ticker);
      },

      // Calculate total portfolio value
      calculatePortfolioValue: () => {
        const { positions, balance } = get();
        return positions.reduce((sum, p) => sum + p.marketValue, 0) + balance.cash;
      },
    }),
    {
      name: "fing-wallet",
      partialize: (state) => ({
        balance: state.balance,
        positions: state.positions,
        transactions: state.transactions,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);
