// Path: src/services/hadi/riskProfiles.ts
// Risk profile → ticker universe mapping for Simulation module

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type RiskProfile = "low" | "medium" | "high";
export type InvestmentTerm = "short" | "medium" | "long";

export interface ProfileConfig {
  label: string;
  description: string;
  tickers: string[];
  radarScores: {
    growth: number;
    stability: number;
    income: number;
    diversification: number;
    liquidity: number;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// TICKER UNIVERSES
// ─────────────────────────────────────────────────────────────────────────────

const LOW_RISK_TICKERS = [
  "BND", "AGG", "TLT", "LQD", "VCIT", "VCSH", "SHY",
  "SPY", "VTI", "VIG", "SCHD", "VYM",
  "JNJ", "PG", "KO", "PEP", "WMT", "UNH",
];

const MEDIUM_RISK_TICKERS = [
  "SPY", "QQQ", "VTI", "VOO", "IWM",
  "AAPL", "MSFT", "GOOGL", "AMZN", "BRK-B",
  "JNJ", "PG", "KO", "JPM", "V", "MA",
  "NVDA", "UNH", "HD", "DIS",
];

const HIGH_RISK_TICKERS = [
  "NVDA", "TSLA", "AMD", "AMZN", "META",
  "NFLX", "CRM", "SHOP", "SQ", "COIN",
  "MSTR", "PLTR", "SOFI", "ABNB", "SNAP",
  "RBLX", "DKNG", "MARA", "RIOT", "ARKK",
];

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE CONFIGS
// ─────────────────────────────────────────────────────────────────────────────

const PROFILES: Record<RiskProfile, ProfileConfig> = {
  low: {
    label: "Conservative",
    description: "Focus on capital preservation and income. Bonds, ETFs, and blue-chip dividends.",
    tickers: LOW_RISK_TICKERS,
    radarScores: {
      growth: 2,
      stability: 9,
      income: 8,
      diversification: 7,
      liquidity: 9,
    },
  },
  medium: {
    label: "Balanced",
    description: "Mix of growth and stability. Large-cap stocks and diversified ETFs.",
    tickers: MEDIUM_RISK_TICKERS,
    radarScores: {
      growth: 6,
      stability: 6,
      income: 5,
      diversification: 8,
      liquidity: 8,
    },
  },
  high: {
    label: "Aggressive",
    description: "Maximum growth potential. Tech, crypto-related, and high-beta stocks.",
    tickers: HIGH_RISK_TICKERS,
    radarScores: {
      growth: 9,
      stability: 2,
      income: 1,
      diversification: 4,
      liquidity: 6,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// TERM ADJUSTMENTS
// ─────────────────────────────────────────────────────────────────────────────

const TERM_TICKER_COUNT: Record<InvestmentTerm, number> = {
  short: 8,
  medium: 12,
  long: 18,
};

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

export function getProfileConfig(profile: RiskProfile): ProfileConfig {
  return PROFILES[profile];
}

/**
 * Get the ticker universe for a given risk profile and investment term.
 * Term adjusts how many tickers to include (more tickers = more diversification for longer terms).
 */
export function getTickerUniverse(
  profile: RiskProfile,
  term: InvestmentTerm
): string[] {
  const config = PROFILES[profile];
  const count = TERM_TICKER_COUNT[term];
  return config.tickers.slice(0, Math.min(count, config.tickers.length));
}

/**
 * Get radar chart data for a profile, formatted for ECharts RadarChart.
 */
export function getProfileRadarData(profile: RiskProfile): {
  indicators: { name: string; max: number }[];
  values: number[];
} {
  const scores = PROFILES[profile].radarScores;
  return {
    indicators: [
      { name: "Growth", max: 10 },
      { name: "Stability", max: 10 },
      { name: "Income", max: 10 },
      { name: "Diversification", max: 10 },
      { name: "Liquidity", max: 10 },
    ],
    values: [
      scores.growth,
      scores.stability,
      scores.income,
      scores.diversification,
      scores.liquidity,
    ],
  };
}

/**
 * Estimate mock prices for order calculation.
 * In production this would come from market data.
 */
export function estimateOrderQty(
  weight: number,
  totalCapital: number,
  estimatedPrice: number
): number {
  return Math.floor((totalCapital * weight) / estimatedPrice);
}

/**
 * Approximate prices for common tickers (for simulation order display).
 * These are rough estimates for demo purposes.
 */
export const APPROX_PRICES: Record<string, number> = {
  SPY: 590, QQQ: 520, VTI: 290, VOO: 540, IWM: 225,
  BND: 72, AGG: 100, TLT: 92, LQD: 108, VCIT: 82,
  VCSH: 78, SHY: 82, VIG: 190, SCHD: 82, VYM: 120,
  AAPL: 230, MSFT: 440, GOOGL: 175, AMZN: 210, NVDA: 135,
  TSLA: 350, AMD: 120, META: 600, NFLX: 950, CRM: 310,
  "BRK-B": 475, JNJ: 155, PG: 170, KO: 63, PEP: 150,
  JPM: 250, V: 310, MA: 530, UNH: 520, HD: 400,
  WMT: 95, DIS: 110, SHOP: 110, SQ: 85, COIN: 270,
  MSTR: 330, PLTR: 95, SOFI: 16, ABNB: 155, SNAP: 12,
  RBLX: 65, DKNG: 45, MARA: 22, RIOT: 14, ARKK: 55,
};
