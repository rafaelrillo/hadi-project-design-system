// Path: src/services/hadi/types.ts
// TypeScript interfaces matching Hadi backend Pydantic models

// ─────────────────────────────────────────────────────────────────────────────
// REQUEST TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface OptimizeRequest {
  tickers: string[];
  start_date?: string;
  end_date?: string;
  alpha_1?: number;
  alpha_2?: number;
  beta?: number;
}

export interface BenchmarkRequest {
  symbol?: string;
  start_date?: string;
  end_date?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSE TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface HadiPortfolioMetrics {
  utility: number;
  expected_return: number;
  volatility: number;
  sharpe_ratio: number;
  converged: boolean;
  iterations: number;
  alpha_1: number;
  alpha_2: number;
  beta: number;
}

export interface OptimizeResponse {
  success: boolean;
  tickers: string[];
  optimized_weights: Record<string, number>;
  portfolio_metrics: HadiPortfolioMetrics;
  cumulative_returns: number[];
  dates: string[];
  execution_time_ms: number;
  error?: string;
}

export interface BenchmarkMetrics {
  total_return: number;
  annualized_return: number;
  volatility: number;
  sharpe_ratio: number;
}

export interface BenchmarkResponse {
  success: boolean;
  symbol: string;
  metrics: BenchmarkMetrics;
  cumulative_returns: number[];
  dates: string[];
  execution_time_ms: number;
  error?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PARAMETER DEFAULTS (from Agustin's paper)
// ─────────────────────────────────────────────────────────────────────────────

export const PARAM_DEFAULTS = {
  alpha_1: 3.73,
  alpha_2: 5.22,
  beta: 0.9965,
} as const;

export const PARAM_RANGES = {
  alpha_1: { min: 0.1, max: 20.0, step: 0.01, label: 'Loss Aversion (\u03B1\u2081)' },
  alpha_2: { min: 0.1, max: 20.0, step: 0.01, label: 'Risk Aversion (\u03B1\u2082)' },
  beta: { min: 0.9, max: 1.0, step: 0.0001, label: 'Time Decay (\u03B2)' },
} as const;

export const DEFAULT_TICKERS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA'] as const;
