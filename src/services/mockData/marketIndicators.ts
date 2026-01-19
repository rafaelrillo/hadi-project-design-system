// Path: src/services/mockData/marketIndicators.ts

export type MarketState = "bullish" | "bearish" | "neutral" | "uncertain";
export type RiskLevel = "low" | "moderate" | "elevated" | "high" | "severe";
export type ConfidenceLevel = "high" | "medium" | "low";
export type SystemStatus = "active" | "processing" | "idle" | "error";
export type TrendDirection = "up" | "down" | "stable";
export type CyclePhase = "expansion" | "peak" | "contraction" | "trough";

export interface MarketIndicators {
  state: MarketState;
  stateDescription: string;
  riskLevel: RiskLevel;
  riskValue: number;
  confidenceLevel: ConfidenceLevel;
  confidencePercent: number;
  systemStatus: SystemStatus;
  indicatorCount: number;
  lastUpdated: string;
}

export interface Factor {
  id: string;
  name: string;
  weight: number;
  impact: "positive" | "negative" | "neutral";
  trend: TrendDirection;
  value?: number;
  description?: string;
}

export interface TrendData {
  label: string;
  value: string;
  change: number;
  trend: TrendDirection;
  period: string;
}

export interface HistoricalPeriod {
  year: number;
  label: string;
  similarity: number;
  outcome: "positive" | "negative" | "neutral";
  description: string;
  returnPercent: number;
}

export interface CycleData {
  currentPhase: CyclePhase;
  confidence: number;
  description: string;
  timeInPhase: string;
  estimatedDuration: string;
  historicalAvgReturn: number;
}

export interface SectorPerformance {
  sector: string;
  dayChange: number;
  weekChange: number;
  monthChange: number;
  ytdChange: number;
  trend: TrendDirection;
}

export const marketIndicators: MarketIndicators = {
  state: "bullish",
  stateDescription:
    "Market conditions favor risk assets with supportive macro environment",
  riskLevel: "moderate",
  riskValue: 38,
  confidenceLevel: "high",
  confidencePercent: 82,
  systemStatus: "active",
  indicatorCount: 47,
  lastUpdated: new Date().toISOString(),
};

export const keyFactors: Factor[] = [
  {
    id: "f1",
    name: "Interest Rates",
    weight: 92,
    impact: "positive",
    trend: "down",
    description: "Fed signaling rate cuts in 2025, supportive for equities",
  },
  {
    id: "f2",
    name: "Corporate Earnings",
    weight: 88,
    impact: "positive",
    trend: "up",
    description: "S&P 500 earnings growing 8% YoY with positive revisions",
  },
  {
    id: "f3",
    name: "Inflation",
    weight: 75,
    impact: "positive",
    trend: "down",
    description: "Core PCE trending toward 2% target, disinflation continues",
  },
  {
    id: "f4",
    name: "Employment",
    weight: 72,
    impact: "positive",
    trend: "stable",
    description: "Labor market cooling gradually without sharp deterioration",
  },
  {
    id: "f5",
    name: "Consumer Spending",
    weight: 68,
    impact: "positive",
    trend: "stable",
    description: "Consumer resilience despite higher rates, spending normalized",
  },
  {
    id: "f6",
    name: "Geopolitical Risk",
    weight: 45,
    impact: "negative",
    trend: "stable",
    description: "Elevated uncertainty from regional conflicts and trade tensions",
  },
  {
    id: "f7",
    name: "Credit Spreads",
    weight: 78,
    impact: "positive",
    trend: "stable",
    description: "Investment grade spreads tight, credit conditions supportive",
  },
  {
    id: "f8",
    name: "Market Breadth",
    weight: 65,
    impact: "neutral",
    trend: "up",
    description: "Breadth improving from narrow AI-led rally, participation expanding",
  },
];

export const trendIndicators: TrendData[] = [
  {
    label: "S&P 500",
    value: "4,768.37",
    change: 1.23,
    trend: "up",
    period: "1D",
  },
  {
    label: "Nasdaq",
    value: "15,003.22",
    change: 1.67,
    trend: "up",
    period: "1D",
  },
  {
    label: "VIX",
    value: "14.52",
    change: -5.32,
    trend: "down",
    period: "1D",
  },
  {
    label: "10Y Treasury",
    value: "4.18%",
    change: -0.08,
    trend: "down",
    period: "1D",
  },
  {
    label: "Dollar Index",
    value: "103.45",
    change: 0.15,
    trend: "stable",
    period: "1D",
  },
  {
    label: "Gold",
    value: "$2,045.30",
    change: 0.82,
    trend: "up",
    period: "1D",
  },
  {
    label: "WTI Crude",
    value: "$72.84",
    change: -1.45,
    trend: "down",
    period: "1D",
  },
  {
    label: "Bitcoin",
    value: "$43,250",
    change: 2.34,
    trend: "up",
    period: "1D",
  },
];

export const historicalPeriods: HistoricalPeriod[] = [
  {
    year: 1995,
    label: "Mid-90s Expansion",
    similarity: 78,
    outcome: "positive",
    description:
      "Tech-driven growth with Fed achieving soft landing after rate hikes",
    returnPercent: 34.1,
  },
  {
    year: 2019,
    label: "Pre-COVID Bull",
    similarity: 72,
    outcome: "positive",
    description:
      "Late-cycle expansion with Fed pivot to rate cuts supporting markets",
    returnPercent: 28.9,
  },
  {
    year: 2017,
    label: "Synchronized Growth",
    similarity: 65,
    outcome: "positive",
    description: "Global synchronized growth with low volatility and tech leadership",
    returnPercent: 19.4,
  },
  {
    year: 2007,
    label: "Pre-GFC Peak",
    similarity: 22,
    outcome: "negative",
    description:
      "Late-cycle warning with credit excesses preceding financial crisis",
    returnPercent: -38.5,
  },
];

export const cycleData: CycleData = {
  currentPhase: "expansion",
  confidence: 75,
  description:
    "Economy in mid-to-late expansion phase with moderating growth and stable employment",
  timeInPhase: "18 months",
  estimatedDuration: "6-12 months remaining",
  historicalAvgReturn: 12.4,
};

export const sectorPerformance: SectorPerformance[] = [
  {
    sector: "Technology",
    dayChange: 1.82,
    weekChange: 3.45,
    monthChange: 8.12,
    ytdChange: 52.3,
    trend: "up",
  },
  {
    sector: "Healthcare",
    dayChange: 0.95,
    weekChange: 1.23,
    monthChange: 4.56,
    ytdChange: 12.8,
    trend: "up",
  },
  {
    sector: "Financial",
    dayChange: 1.12,
    weekChange: 2.34,
    monthChange: 5.67,
    ytdChange: 18.4,
    trend: "up",
  },
  {
    sector: "Consumer Discretionary",
    dayChange: 1.45,
    weekChange: 2.89,
    monthChange: 6.23,
    ytdChange: 28.5,
    trend: "up",
  },
  {
    sector: "Consumer Staples",
    dayChange: 0.34,
    weekChange: 0.78,
    monthChange: 1.45,
    ytdChange: 5.2,
    trend: "stable",
  },
  {
    sector: "Energy",
    dayChange: -1.23,
    weekChange: -2.45,
    monthChange: -4.56,
    ytdChange: -8.3,
    trend: "down",
  },
  {
    sector: "Industrials",
    dayChange: 0.78,
    weekChange: 1.56,
    monthChange: 3.89,
    ytdChange: 15.2,
    trend: "up",
  },
  {
    sector: "Materials",
    dayChange: 0.45,
    weekChange: 0.89,
    monthChange: 2.34,
    ytdChange: 8.7,
    trend: "stable",
  },
  {
    sector: "Utilities",
    dayChange: -0.23,
    weekChange: -0.56,
    monthChange: -1.23,
    ytdChange: -4.5,
    trend: "down",
  },
  {
    sector: "Real Estate",
    dayChange: 0.56,
    weekChange: 1.23,
    monthChange: 3.45,
    ytdChange: 7.8,
    trend: "up",
  },
  {
    sector: "Communication Services",
    dayChange: 1.34,
    weekChange: 2.67,
    monthChange: 5.89,
    ytdChange: 45.2,
    trend: "up",
  },
];

export function getMarketStateInfo(state: MarketState) {
  const stateInfo = {
    bullish: {
      label: "Bullish",
      description: "Market conditions favor upward price movement",
      color: "var(--fing-market-bull)",
    },
    bearish: {
      label: "Bearish",
      description: "Market conditions suggest downward pressure",
      color: "var(--fing-market-bear)",
    },
    neutral: {
      label: "Neutral",
      description: "Market lacking clear directional bias",
      color: "var(--fing-market-neutral)",
    },
    uncertain: {
      label: "Uncertain",
      description: "High uncertainty with conflicting signals",
      color: "var(--fing-market-uncertain)",
    },
  };
  return stateInfo[state];
}

export function getRiskLevelInfo(level: RiskLevel) {
  const riskInfo = {
    low: {
      label: "Low",
      description: "Minimal risk environment",
      color: "var(--fing-risk-low)",
    },
    moderate: {
      label: "Moderate",
      description: "Normal risk levels",
      color: "var(--fing-risk-moderate)",
    },
    elevated: {
      label: "Elevated",
      description: "Above-average risk",
      color: "var(--fing-risk-elevated)",
    },
    high: {
      label: "High",
      description: "Significant risk factors present",
      color: "var(--fing-risk-high)",
    },
    severe: {
      label: "Severe",
      description: "Extreme risk conditions",
      color: "var(--fing-risk-severe)",
    },
  };
  return riskInfo[level];
}

export function getRiskLevelFromValue(value: number): RiskLevel {
  if (value <= 20) return "low";
  if (value <= 40) return "moderate";
  if (value <= 60) return "elevated";
  if (value <= 80) return "high";
  return "severe";
}

export function getConfidenceLevelFromPercent(percent: number): ConfidenceLevel {
  if (percent >= 75) return "high";
  if (percent >= 50) return "medium";
  return "low";
}
