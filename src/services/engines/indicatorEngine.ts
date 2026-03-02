/**
 * Indicator Engine — Pure business logic for market indicator calculations.
 * No Zustand, no React, no side effects. Fully testable.
 */

import type { Stock } from "../mockData/stocks";
import type {
  MarketState,
  RiskLevel,
  ConfidenceLevel,
  MarketIndicators,
} from "../mockData/marketIndicators";

// ─────────────────────────────────────────────────────────────────────────────
// RISK ASSESSMENT
// ─────────────────────────────────────────────────────────────────────────────

export interface RiskAssessment {
  riskValue: number;
  riskLevel: RiskLevel;
}

export function calculateRiskLevel(stocks: Stock[]): RiskAssessment {
  if (stocks.length === 0) return { riskValue: 50, riskLevel: "elevated" };

  const avgChange =
    stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length;

  const variance =
    stocks.reduce((sum, s) => sum + Math.pow(s.changePercent - avgChange, 2), 0) /
    stocks.length;
  const volatility = Math.sqrt(variance);

  const positiveCount = stocks.filter((s) => s.changePercent > 0).length;
  const breadth = positiveCount / stocks.length;

  let baseRisk = 30 + volatility * 15;
  if (avgChange < -1) baseRisk += 20;
  if (avgChange < -2) baseRisk += 15;
  if (breadth < 0.3) baseRisk += 10;

  const riskNoise = (Math.random() - 0.5) * 3;
  const riskValue = Math.round(Math.max(10, Math.min(90, baseRisk + riskNoise)));

  return {
    riskValue,
    riskLevel: getRiskLevelFromValue(riskValue),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKET BREADTH
// ─────────────────────────────────────────────────────────────────────────────

export interface BreadthIndicator {
  breadth: number;
  advancers: number;
  decliners: number;
  avgChange: number;
}

export function calculateMarketBreadth(stocks: Stock[]): BreadthIndicator {
  if (stocks.length === 0)
    return { breadth: 0.5, advancers: 0, decliners: 0, avgChange: 0 };

  const advancers = stocks.filter((s) => s.changePercent > 0).length;
  const decliners = stocks.filter((s) => s.changePercent < 0).length;
  const avgChange =
    stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length;

  return {
    breadth: advancers / stocks.length,
    advancers,
    decliners,
    avgChange,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// VOLATILITY
// ─────────────────────────────────────────────────────────────────────────────

export function calculateVolatility(stocks: Stock[]): number {
  if (stocks.length === 0) return 0;

  const avgChange =
    stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length;
  const variance =
    stocks.reduce((sum, s) => sum + Math.pow(s.changePercent - avgChange, 2), 0) /
    stocks.length;

  return Math.sqrt(variance);
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIDENCE
// ─────────────────────────────────────────────────────────────────────────────

export function calculateMarketConfidence(
  breadth: number,
  volatility: number,
  avgChange: number
): { confidencePercent: number; confidenceLevel: ConfidenceLevel } {
  let baseConfidence = 50 + breadth * 30 - volatility * 10;
  if (Math.abs(avgChange) > 1) baseConfidence += 10;
  const confidenceNoise = (Math.random() - 0.5) * 5;
  const confidencePercent = Math.round(
    Math.max(35, Math.min(95, baseConfidence + confidenceNoise))
  );

  const confidenceLevel: ConfidenceLevel =
    confidencePercent >= 75 ? "high" : confidencePercent >= 50 ? "medium" : "low";

  return { confidencePercent, confidenceLevel };
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKET STATE
// ─────────────────────────────────────────────────────────────────────────────

export function determineMarketState(
  avgChange: number,
  breadth: number,
  volatility: number
): MarketState {
  if (avgChange > 1 && breadth > 0.6) return "bullish";
  if (avgChange < -1 && breadth < 0.4) return "bearish";
  if (Math.abs(avgChange) < 0.3 && volatility < 1) return "neutral";
  return "uncertain";
}

export function getStateDescription(
  state: MarketState,
  breadth: number,
  avgChange: number,
  volatility: number
): string {
  const descriptions: Record<MarketState, string> = {
    bullish: `Strong momentum with ${Math.round(breadth * 100)}% of stocks advancing`,
    bearish: `Risk-off sentiment with ${Math.round((1 - breadth) * 100)}% of stocks declining`,
    neutral: "Consolidation phase with balanced buying and selling pressure",
    uncertain: `Mixed signals: avg change ${avgChange.toFixed(2)}%, volatility ${volatility.toFixed(2)}%`,
  };
  return descriptions[state];
}

// ─────────────────────────────────────────────────────────────────────────────
// FULL INDICATOR UPDATE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate all market indicators from stock data.
 * Returns a partial MarketIndicators that can be merged with existing state.
 */
export function calculateIndicators(
  stocks: Stock[],
  currentIndicators: MarketIndicators
): MarketIndicators {
  if (stocks.length === 0) return currentIndicators;

  const { breadth, avgChange } = calculateMarketBreadth(stocks);
  const volatility = calculateVolatility(stocks);
  const { riskValue, riskLevel } = calculateRiskLevel(stocks);
  const { confidencePercent, confidenceLevel } = calculateMarketConfidence(
    breadth,
    volatility,
    avgChange
  );
  const state = determineMarketState(avgChange, breadth, volatility);
  const stateDescription = getStateDescription(state, breadth, avgChange, volatility);

  return {
    ...currentIndicators,
    state,
    stateDescription,
    riskValue,
    riskLevel,
    confidencePercent,
    confidenceLevel,
    lastUpdated: new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS (moved from mockData)
// ─────────────────────────────────────────────────────────────────────────────

function getRiskLevelFromValue(value: number): RiskLevel {
  if (value <= 20) return "low";
  if (value <= 40) return "moderate";
  if (value <= 60) return "elevated";
  if (value <= 80) return "high";
  return "severe";
}
