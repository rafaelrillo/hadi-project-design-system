/**
 * Trading Engine — Pure business logic for trade validation and execution.
 * No Zustand, no React, no side effects. Fully testable.
 */

import type { PortfolioHolding, PortfolioSummary } from "../mockData/portfolio";
import type { Stock } from "../mockData/stocks";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface Trade {
  symbol: string;
  name: string;
  type: "buy" | "sell";
  shares: number;
  price: number;
  orderType: "market" | "limit";
  limitPrice?: number;
}

export interface TradeExecution {
  executedPrice: number;
  total: number;
  slippage: number;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface PositionUpdate {
  holdings: PortfolioHolding[];
  summaryPatch: Partial<PortfolioSummary>;
}

// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

export function validateBuyOrder(
  total: number,
  cashBalance: number
): ValidationResult {
  if (total > cashBalance) {
    return { valid: false, message: "Insufficient funds" };
  }
  return { valid: true, message: "OK" };
}

export function validateSellOrder(
  trade: Pick<Trade, "symbol" | "shares">,
  holdings: PortfolioHolding[]
): ValidationResult {
  const existing = holdings.find((h) => h.symbol === trade.symbol);
  if (!existing) {
    return { valid: false, message: "No position to sell" };
  }
  if (trade.shares > existing.shares) {
    return { valid: false, message: "Insufficient shares" };
  }
  return { valid: true, message: "OK" };
}

// ─────────────────────────────────────────────────────────────────────────────
// EXECUTION CALCULATION
// ─────────────────────────────────────────────────────────────────────────────

export function calculateTradeExecution(trade: Trade): TradeExecution {
  const executedPrice =
    trade.orderType === "market"
      ? trade.price * (1 + (Math.random() - 0.5) * 0.002)
      : trade.limitPrice || trade.price;

  const total = executedPrice * trade.shares;
  const slippage = executedPrice - trade.price;

  return {
    executedPrice: Math.round(executedPrice * 100) / 100,
    total: Math.round(total * 100) / 100,
    slippage: Math.round(slippage * 100) / 100,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// POSITION CALCULATION
// ─────────────────────────────────────────────────────────────────────────────

export function calculateBuyPositionUpdate(
  holdings: PortfolioHolding[],
  trade: Trade,
  executedPrice: number,
  total: number,
  marketStocks?: Stock[]
): PositionUpdate {
  const existingIndex = holdings.findIndex((h) => h.symbol === trade.symbol);
  const newHoldings = [...holdings];

  if (existingIndex >= 0) {
    const existing = holdings[existingIndex];
    const newShares = existing.shares + trade.shares;
    const newCostBasis = existing.costBasis + total;
    const newAvgCost = newCostBasis / newShares;

    newHoldings[existingIndex] = {
      ...existing,
      shares: newShares,
      avgCost: Math.round(newAvgCost * 100) / 100,
      costBasis: Math.round(newCostBasis * 100) / 100,
      value: Math.round(newShares * existing.currentPrice * 100) / 100,
      gain: Math.round((newShares * existing.currentPrice - newCostBasis) * 100) / 100,
      gainPercent:
        Math.round(
          ((newShares * existing.currentPrice - newCostBasis) / newCostBasis) * 100 * 100
        ) / 100,
    };
  } else {
    const marketStock = marketStocks?.find((s) => s.symbol === trade.symbol);

    newHoldings.push({
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
    });
  }

  return {
    holdings: newHoldings,
    summaryPatch: {
      cashBalance: -total,
      buyingPower: -total,
    },
  };
}

export function calculateSellPositionUpdate(
  holdings: PortfolioHolding[],
  trade: Trade,
  total: number
): PositionUpdate {
  const existingIndex = holdings.findIndex((h) => h.symbol === trade.symbol);
  const existing = holdings[existingIndex];
  let newHoldings: PortfolioHolding[];

  if (trade.shares === existing.shares) {
    // Close position entirely
    newHoldings = holdings.filter((_, i) => i !== existingIndex);
  } else {
    // Partial sell
    newHoldings = [...holdings];
    const newShares = existing.shares - trade.shares;
    const costReduction = (trade.shares / existing.shares) * existing.costBasis;
    const newCostBasis = existing.costBasis - costReduction;

    newHoldings[existingIndex] = {
      ...existing,
      shares: newShares,
      costBasis: Math.round(newCostBasis * 100) / 100,
      value: Math.round(newShares * existing.currentPrice * 100) / 100,
      gain: Math.round((newShares * existing.currentPrice - newCostBasis) * 100) / 100,
    };
  }

  return {
    holdings: newHoldings,
    summaryPatch: {
      cashBalance: total,
      buyingPower: total,
    },
  };
}

/**
 * Calculate new average cost after adding to a position.
 */
export function calculateCostBasis(
  existingShares: number,
  existingCostBasis: number,
  newShares: number,
  newTotal: number
): number {
  return Math.round(((existingCostBasis + newTotal) / (existingShares + newShares)) * 100) / 100;
}
