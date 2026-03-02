/**
 * Recommendation Engine — Pure business logic for generating stock recommendations.
 * No Zustand, no React, no side effects. Fully testable.
 */

import type { TiingoIEXPrice } from "../tiingo";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type RecommendationType = "buy" | "sell" | "hold";
export type ConfidenceLevel = "high" | "medium" | "low";

export interface RecommendationFactor {
  name: string;
  impact: "positive" | "negative" | "neutral";
  weight: number;
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

export interface CategorizedRecommendations {
  buy: StockRecommendation[];
  sell: StockRecommendation[];
  hold: StockRecommendation[];
}

// ─────────────────────────────────────────────────────────────────────────────
// FACTOR GENERATION
// ─────────────────────────────────────────────────────────────────────────────

const BUY_FACTORS: RecommendationFactor[] = [
  { name: "Technical Momentum", impact: "positive", weight: 85, description: "Strong upward trend with increasing volume" },
  { name: "Earnings Growth", impact: "positive", weight: 78, description: "Consistent earnings beats over last 4 quarters" },
  { name: "Institutional Buying", impact: "positive", weight: 72, description: "Increased institutional ownership" },
  { name: "Sector Strength", impact: "positive", weight: 65, description: "Technology sector showing leadership" },
];

const SELL_FACTORS: RecommendationFactor[] = [
  { name: "Valuation Concern", impact: "negative", weight: 82, description: "P/E ratio significantly above historical average" },
  { name: "Technical Weakness", impact: "negative", weight: 75, description: "Breaking below key support levels" },
  { name: "Earnings Risk", impact: "negative", weight: 68, description: "Analyst estimates trending lower" },
  { name: "Sector Rotation", impact: "negative", weight: 60, description: "Money flowing out of sector" },
];

const HOLD_FACTORS: RecommendationFactor[] = [
  { name: "Fair Valuation", impact: "neutral", weight: 70, description: "Trading near fair value estimates" },
  { name: "Mixed Signals", impact: "neutral", weight: 65, description: "Technical indicators showing no clear direction" },
  { name: "Pending Catalyst", impact: "neutral", weight: 60, description: "Wait for earnings or key announcement" },
];

export function generateFactors(type: RecommendationType): RecommendationFactor[] {
  const pool = type === "buy" ? BUY_FACTORS : type === "sell" ? SELL_FACTORS : HOLD_FACTORS;
  return pool.slice(0, 2 + Math.floor(Math.random() * 2));
}

// ─────────────────────────────────────────────────────────────────────────────
// TARGET PRICE
// ─────────────────────────────────────────────────────────────────────────────

export function calculateTargetPrice(
  currentPrice: number,
  type: RecommendationType
): number {
  let multiplier: number;
  if (type === "buy") {
    multiplier = 1 + (0.05 + Math.random() * 0.15);
  } else if (type === "sell") {
    multiplier = 1 - (0.05 + Math.random() * 0.15);
  } else {
    multiplier = 1 + (Math.random() - 0.5) * 0.05;
  }
  return Math.round(currentPrice * multiplier * 100) / 100;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIDENCE
// ─────────────────────────────────────────────────────────────────────────────

export function calculateConfidence(
  type: RecommendationType,
  dayChangePercent: number
): { level: ConfidenceLevel; percent: number } {
  const base = type === "buy" ? 70 : type === "sell" ? 65 : 50;
  const noise = Math.random() * 20 - 10;
  const percent = Math.max(40, Math.min(95, base + noise + Math.abs(dayChangePercent) * 2));
  const level: ConfidenceLevel =
    percent >= 75 ? "high" : percent >= 55 ? "medium" : "low";

  return { level, percent: Math.round(percent) };
}

// ─────────────────────────────────────────────────────────────────────────────
// RECOMMENDATION TYPE DETERMINATION
// ─────────────────────────────────────────────────────────────────────────────

export function determineRecommendationType(dayChangePercent: number): RecommendationType {
  const randomFactor = Math.random();

  if (dayChangePercent > 1 && randomFactor > 0.3) return "buy";
  if (dayChangePercent < -1 && randomFactor > 0.3) return "sell";
  if (randomFactor > 0.6) return Math.random() > 0.5 ? "buy" : "sell";
  return "hold";
}

// ─────────────────────────────────────────────────────────────────────────────
// FULL RECOMMENDATION
// ─────────────────────────────────────────────────────────────────────────────

export function generateRecommendation(
  ticker: string,
  name: string,
  priceData: TiingoIEXPrice,
  type: RecommendationType
): StockRecommendation {
  const currentPrice = priceData.lastPrice;
  const prevClose = priceData.prevClose;
  const dayChange = ((currentPrice - prevClose) / prevClose) * 100;

  const targetPrice = calculateTargetPrice(currentPrice, type);
  const potentialReturn = ((targetPrice - currentPrice) / currentPrice) * 100;
  const confidence = calculateConfidence(type, dayChange);
  const factors = generateFactors(type);

  const reasoningTemplates = {
    buy: `${name} shows strong momentum with ${dayChange > 0 ? "positive" : "recovering"} price action. Technical indicators suggest continued upside potential with a target of $${targetPrice.toFixed(2)}.`,
    sell: `${name} faces headwinds with ${dayChange < 0 ? "weakening" : "concerning"} fundamentals. Consider reducing exposure or taking profits with a price target of $${targetPrice.toFixed(2)}.`,
    hold: `${name} is trading near fair value. Current price action suggests waiting for a clearer entry or exit point before making changes.`,
  };

  const now = new Date();
  const expires = new Date(now);
  expires.setHours(23, 59, 59, 999);

  return {
    id: `rec-${ticker}-${Date.now()}`,
    ticker,
    name,
    type,
    confidence: confidence.level,
    confidencePercent: confidence.percent,
    currentPrice: Math.round(currentPrice * 100) / 100,
    targetPrice,
    potentialReturn: Math.round(potentialReturn * 100) / 100,
    factors,
    reasoning: reasoningTemplates[type],
    generatedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIZE
// ─────────────────────────────────────────────────────────────────────────────

export function categorizeRecommendations(
  recommendations: StockRecommendation[],
  limit = 5
): CategorizedRecommendations {
  const sortByConfidence = (a: StockRecommendation, b: StockRecommendation) =>
    b.confidencePercent - a.confidencePercent;

  return {
    buy: recommendations.filter((r) => r.type === "buy").sort(sortByConfidence).slice(0, limit),
    sell: recommendations.filter((r) => r.type === "sell").sort(sortByConfidence).slice(0, limit),
    hold: recommendations.filter((r) => r.type === "hold").sort(sortByConfidence).slice(0, limit),
  };
}
