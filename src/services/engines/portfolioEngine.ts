/**
 * Portfolio Engine — Pure business logic for portfolio calculations.
 * No Zustand, no React, no side effects. Fully testable.
 */

import type {
  PortfolioHolding,
  Allocation,
  PortfolioSummary,
} from "../mockData/portfolio";
import type { Stock } from "../mockData/stocks";

// ─────────────────────────────────────────────────────────────────────────────
// HOLDINGS + P&L
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Update a single holding with current market price and recalculate P&L.
 */
export function calculateHoldingPnL(
  holding: PortfolioHolding,
  marketStock: Stock
): PortfolioHolding {
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
}

/**
 * Update all holdings with market data.
 */
export function updateHoldingsWithMarketData(
  holdings: PortfolioHolding[],
  marketStocks: Stock[]
): PortfolioHolding[] {
  return holdings.map((holding) => {
    const marketStock = marketStocks.find((s) => s.symbol === holding.symbol);
    if (!marketStock) return holding;
    return calculateHoldingPnL(holding, marketStock);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO SUMMARY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate portfolio summary totals from holdings.
 */
export function calculatePortfolioSummary(
  holdings: PortfolioHolding[]
): Omit<PortfolioSummary, "cashBalance" | "buyingPower"> {
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.costBasis, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;
  const dayChange = holdings.reduce((sum, h) => sum + h.dayChange, 0);
  const dayChangePercent =
    totalValue - dayChange > 0
      ? (dayChange / (totalValue - dayChange)) * 100
      : 0;

  return {
    totalValue,
    totalCost,
    totalGain,
    totalGainPercent,
    dayChange,
    dayChangePercent,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// ALLOCATIONS
// ─────────────────────────────────────────────────────────────────────────────

const SECTOR_COLORS: Record<string, string> = {
  Technology: "#5ba3a5",
  Financial: "#7ecbcc",
  Healthcare: "#4a7a6a",
  "Consumer Discretionary": "#c4a35a",
  "Consumer Staples": "#c47a5a",
  Energy: "#b85c5c",
  Cash: "#6b7280",
};

/**
 * Calculate allocations from holdings and cash balance.
 */
export function calculatePortfolioAllocations(
  holdings: PortfolioHolding[],
  cashBalance: number
): Allocation[] {
  const totalValue =
    holdings.reduce((sum, h) => sum + h.value, 0) + cashBalance;

  if (totalValue === 0) return [];

  // Group by sector
  const sectorValues: Record<string, number> = {};
  holdings.forEach((h) => {
    sectorValues[h.sector] = (sectorValues[h.sector] || 0) + h.value;
  });

  const newAllocations: Allocation[] = Object.entries(sectorValues).map(
    ([sector, value], index) => ({
      id: `a${index}`,
      category: sector,
      percentage: Math.round((value / totalValue) * 100 * 100) / 100,
      value: Math.round(value * 100) / 100,
      change: 0,
      target: 0,
      color: SECTOR_COLORS[sector] || "#6b7280",
    })
  );

  // Add cash allocation
  if (cashBalance > 0) {
    newAllocations.push({
      id: "a-cash",
      category: "Cash",
      percentage:
        Math.round((cashBalance / totalValue) * 100 * 100) / 100,
      value: cashBalance,
      change: 0,
      target: 5,
      color: "#6b7280",
    });
  }

  return newAllocations;
}

/**
 * Update each holding's allocation percentage based on total value.
 */
export function updateHoldingAllocations(
  holdings: PortfolioHolding[],
  cashBalance: number
): PortfolioHolding[] {
  const totalValue =
    holdings.reduce((sum, h) => sum + h.value, 0) + cashBalance;

  if (totalValue === 0) return holdings;

  return holdings.map((h) => ({
    ...h,
    allocation: Math.round((h.value / totalValue) * 100 * 100) / 100,
  }));
}
