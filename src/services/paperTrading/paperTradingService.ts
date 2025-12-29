// Path: src/services/paperTrading/paperTradingService.ts

import type {
  Position,
  Transaction,
  TradeOrder,
  TradeResult,
  WalletSummary,
  PaperTradingState,
  OrderStatus,
} from './paperTradingTypes';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'sentinel_paper_trading';
const INITIAL_BALANCE = 100000; // $100,000 starting balance
const TRADE_FEE = 0; // No fees for paper trading

// ─────────────────────────────────────────────────────────────────────────────
// MOCK PRICE DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_PRICES: Record<string, { price: number; dayChange: number }> = {
  AAPL: { price: 178.72, dayChange: 1.39 },
  MSFT: { price: 378.91, dayChange: 1.10 },
  GOOGL: { price: 141.80, dayChange: -0.62 },
  AMZN: { price: 178.25, dayChange: 1.83 },
  NVDA: { price: 495.22, dayChange: 2.58 },
  META: { price: 505.95, dayChange: 1.67 },
  TSLA: { price: 248.48, dayChange: -2.23 },
  JPM: { price: 195.46, dayChange: 0.63 },
  V: { price: 275.50, dayChange: 0.85 },
  JNJ: { price: 156.32, dayChange: -0.42 },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function generateId(): string {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getInitialState(): PaperTradingState {
  return {
    cashBalance: INITIAL_BALANCE,
    positions: [],
    transactions: [],
    lastUpdated: new Date().toISOString(),
  };
}

function loadState(): PaperTradingState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load paper trading state:', e);
  }
  return getInitialState();
}

function saveState(state: PaperTradingState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save paper trading state:', e);
  }
}

function getCurrentPrice(ticker: string): number {
  return MOCK_PRICES[ticker]?.price ?? 100;
}

function getDayChange(ticker: string): number {
  return MOCK_PRICES[ticker]?.dayChange ?? 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const paperTradingService = {
  /**
   * Get current wallet summary
   */
  getSummary(): WalletSummary {
    const state = loadState();
    const positions = this.getPositions();

    const investedValue = positions.reduce((sum, p) => sum + p.marketValue, 0);
    const totalValue = state.cashBalance + investedValue;
    const totalCost = positions.reduce((sum, p) => sum + (p.avgCost * p.shares), 0);
    const totalGainLoss = investedValue - totalCost;
    const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
    const dayChange = positions.reduce((sum, p) => sum + p.dayChange, 0);
    const dayChangePercent = investedValue > 0 ? (dayChange / (investedValue - dayChange)) * 100 : 0;

    return {
      totalValue,
      cashBalance: state.cashBalance,
      investedValue,
      totalGainLoss,
      totalGainLossPercent,
      dayChange,
      dayChangePercent,
      positionCount: positions.length,
    };
  },

  /**
   * Get all positions with current prices
   */
  getPositions(): Position[] {
    const state = loadState();
    const totalValue = state.positions.reduce((sum, p) => {
      const currentPrice = getCurrentPrice(p.ticker);
      return sum + (p.shares * currentPrice);
    }, 0) + state.cashBalance;

    return state.positions.map((p) => {
      const currentPrice = getCurrentPrice(p.ticker);
      const marketValue = p.shares * currentPrice;
      const costBasis = p.shares * p.avgCost;
      const gainLoss = marketValue - costBasis;
      const gainLossPercent = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;
      const dayChangePercent = getDayChange(p.ticker);
      const dayChange = marketValue * (dayChangePercent / 100);
      const allocation = totalValue > 0 ? (marketValue / totalValue) * 100 : 0;

      return {
        ticker: p.ticker,
        name: p.name,
        shares: p.shares,
        avgCost: p.avgCost,
        currentPrice,
        marketValue,
        gainLoss,
        gainLossPercent,
        dayChange,
        dayChangePercent,
        allocation,
      };
    });
  },

  /**
   * Get transaction history
   */
  getTransactions(limit?: number): Transaction[] {
    const state = loadState();
    const sorted = [...state.transactions].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return limit ? sorted.slice(0, limit) : sorted;
  },

  /**
   * Get cash balance
   */
  getCashBalance(): number {
    return loadState().cashBalance;
  },

  /**
   * Execute a trade
   */
  async executeTrade(order: TradeOrder): Promise<TradeResult> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const state = loadState();
    const currentPrice = order.orderType === 'limit' && order.limitPrice
      ? order.limitPrice
      : getCurrentPrice(order.ticker);

    // Calculate shares and total
    let shares: number;
    let total: number;

    if (order.amountType === 'dollars') {
      shares = Math.floor((order.amount / currentPrice) * 10000) / 10000;
      total = shares * currentPrice;
    } else {
      shares = order.amount;
      total = shares * currentPrice;
    }

    const fee = TRADE_FEE;
    const totalWithFee = total + fee;

    // Validation
    if (order.type === 'buy') {
      if (totalWithFee > state.cashBalance) {
        return {
          success: false,
          error: `Insufficient funds. Available: $${state.cashBalance.toFixed(2)}`,
        };
      }
    } else {
      const position = state.positions.find((p) => p.ticker === order.ticker);
      if (!position || position.shares < shares) {
        return {
          success: false,
          error: `Insufficient shares. Owned: ${position?.shares ?? 0}`,
        };
      }
    }

    // Create transaction
    const transaction: Transaction = {
      id: generateId(),
      type: order.type,
      ticker: order.ticker,
      name: order.name,
      shares,
      price: currentPrice,
      total,
      fee,
      status: 'filled' as OrderStatus,
      timestamp: new Date().toISOString(),
      orderType: order.orderType,
      limitPrice: order.limitPrice,
    };

    // Update state
    if (order.type === 'buy') {
      state.cashBalance -= totalWithFee;

      const existingPosition = state.positions.find((p) => p.ticker === order.ticker);
      if (existingPosition) {
        const totalShares = existingPosition.shares + shares;
        const totalCost = (existingPosition.shares * existingPosition.avgCost) + total;
        existingPosition.shares = totalShares;
        existingPosition.avgCost = totalCost / totalShares;
      } else {
        state.positions.push({
          ticker: order.ticker,
          name: order.name,
          shares,
          avgCost: currentPrice,
          currentPrice,
          marketValue: total,
          gainLoss: 0,
          gainLossPercent: 0,
          dayChange: 0,
          dayChangePercent: 0,
          allocation: 0,
        });
      }
    } else {
      state.cashBalance += total - fee;

      const positionIndex = state.positions.findIndex((p) => p.ticker === order.ticker);
      if (positionIndex !== -1) {
        state.positions[positionIndex].shares -= shares;
        if (state.positions[positionIndex].shares <= 0) {
          state.positions.splice(positionIndex, 1);
        }
      }
    }

    state.transactions.push(transaction);
    state.lastUpdated = new Date().toISOString();
    saveState(state);

    return {
      success: true,
      transaction,
    };
  },

  /**
   * Reset wallet to initial state
   */
  reset(): void {
    saveState(getInitialState());
  },

  /**
   * Add funds to wallet
   */
  addFunds(amount: number): void {
    const state = loadState();
    state.cashBalance += amount;
    state.lastUpdated = new Date().toISOString();
    saveState(state);
  },

  /**
   * Check if user has position in a stock
   */
  hasPosition(ticker: string): boolean {
    const state = loadState();
    return state.positions.some((p) => p.ticker === ticker && p.shares > 0);
  },

  /**
   * Get position for a specific stock
   */
  getPosition(ticker: string): Position | null {
    const positions = this.getPositions();
    return positions.find((p) => p.ticker === ticker) ?? null;
  },
};

export default paperTradingService;
