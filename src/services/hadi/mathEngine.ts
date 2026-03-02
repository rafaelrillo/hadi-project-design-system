// Path: src/services/hadi/mathEngine.ts
// Pure mathematical functions for Quafi financial calculations (GIPS aligned)

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface CashFlow {
  date: string;
  amount: number; // positive = deposit, negative = withdrawal
}

export interface Valuation {
  date: string;
  value: number;
}

export interface MonteCarloProjection {
  dates: string[];
  base: number[];
  optimistic: number[];
  pessimistic: number[];
}

// ─────────────────────────────────────────────────────────────────────────────
// TWR — Time-Weighted Return (GIPS 2.A.2)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate Time-Weighted Return using geometric chain-linking of sub-periods.
 * Cuts at each external cash flow to neutralize deposit/withdrawal effects.
 */
export function calculateTWR(
  valuations: Valuation[],
  cashFlows: CashFlow[]
): number {
  if (valuations.length < 2) return 0;

  const sorted = [...valuations].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const cfMap = new Map<string, number>();
  for (const cf of cashFlows) {
    cfMap.set(cf.date, (cfMap.get(cf.date) || 0) + cf.amount);
  }

  let twrProduct = 1;

  for (let i = 1; i < sorted.length; i++) {
    const vStart = sorted[i - 1].value;
    const vEnd = sorted[i].value;
    const cf = cfMap.get(sorted[i].date) || 0;

    if (vStart === 0) continue;

    const subReturn = (vEnd - cf) / vStart - 1;
    twrProduct *= 1 + subReturn;
  }

  return twrProduct - 1;
}

// ─────────────────────────────────────────────────────────────────────────────
// REAL RETURN — Fisher Equation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Inflation-adjusted return using the Fisher equation.
 * Both inputs as decimals (e.g., 0.12 for 12%).
 */
export function calculateRealReturn(
  nominalReturn: number,
  inflation: number
): number {
  if (inflation === -1) return nominalReturn;
  return (1 + nominalReturn) / (1 + inflation) - 1;
}

// ─────────────────────────────────────────────────────────────────────────────
// VOLATILITY — Annualized Standard Deviation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate annualized volatility from a series of daily returns.
 * Uses log returns and 252 trading days.
 */
export function calculateVolatility(dailyReturns: number[]): number {
  if (dailyReturns.length < 2) return 0;

  const mean = dailyReturns.reduce((s, r) => s + r, 0) / dailyReturns.length;
  const variance =
    dailyReturns.reduce((s, r) => s + (r - mean) ** 2, 0) /
    (dailyReturns.length - 1);

  return Math.sqrt(variance) * Math.sqrt(252);
}

/**
 * Convert price series to log returns.
 */
export function toLogReturns(prices: number[]): number[] {
  const returns: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i - 1] <= 0) continue;
    returns.push(Math.log(prices[i] / prices[i - 1]));
  }
  return returns;
}

// ─────────────────────────────────────────────────────────────────────────────
// CORRELATION MATRIX — Pearson (for Heatmap)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate Pearson correlation matrix from multiple return series.
 * Returns { labels, matrix } where matrix[i][j] is correlation between i and j.
 */
export function calculateCorrelationMatrix(
  returnsSeries: Record<string, number[]>
): { labels: string[]; matrix: number[][] } {
  const labels = Object.keys(returnsSeries);
  const n = labels.length;
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const corr = pearsonCorrelation(
        returnsSeries[labels[i]],
        returnsSeries[labels[j]]
      );
      matrix[i][j] = corr;
      matrix[j][i] = corr;
    }
  }

  return { labels, matrix };
}

function pearsonCorrelation(x: number[], y: number[]): number {
  const len = Math.min(x.length, y.length);
  if (len < 2) return 0;

  const meanX = x.slice(0, len).reduce((s, v) => s + v, 0) / len;
  const meanY = y.slice(0, len).reduce((s, v) => s + v, 0) / len;

  let covXY = 0;
  let varX = 0;
  let varY = 0;

  for (let i = 0; i < len; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    covXY += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }

  const denom = Math.sqrt(varX * varY);
  return denom === 0 ? 0 : covXY / denom;
}

// ─────────────────────────────────────────────────────────────────────────────
// BETA — Systematic Risk
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate portfolio Beta vs a benchmark.
 * Beta = Cov(Rp, Rb) / Var(Rb)
 */
export function calculateBeta(
  portfolioReturns: number[],
  benchmarkReturns: number[]
): number {
  const len = Math.min(portfolioReturns.length, benchmarkReturns.length);
  if (len < 2) return 1;

  const meanP =
    portfolioReturns.slice(0, len).reduce((s, v) => s + v, 0) / len;
  const meanB =
    benchmarkReturns.slice(0, len).reduce((s, v) => s + v, 0) / len;

  let cov = 0;
  let varB = 0;

  for (let i = 0; i < len; i++) {
    const dp = portfolioReturns[i] - meanP;
    const db = benchmarkReturns[i] - meanB;
    cov += dp * db;
    varB += db * db;
  }

  return varB === 0 ? 1 : cov / varB;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAX DRAWDOWN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate Maximum Drawdown from a cumulative returns series.
 * Returns a negative number (e.g., -0.25 for -25% drawdown).
 */
export function calculateMaxDrawdown(cumulativeReturns: number[]): number {
  if (cumulativeReturns.length < 2) return 0;

  let peak = cumulativeReturns[0];
  let maxDD = 0;

  for (const val of cumulativeReturns) {
    if (val > peak) peak = val;
    const dd = peak === 0 ? 0 : (val - peak) / peak;
    if (dd < maxDD) maxDD = dd;
  }

  return maxDD;
}

// ─────────────────────────────────────────────────────────────────────────────
// MONTE CARLO — Parametric GBM Projection
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate Monte Carlo projection using Geometric Brownian Motion.
 * Returns base, optimistic (95% CI), and pessimistic (95% CI) paths.
 *
 * @param drift - Annualized expected return (mu)
 * @param volatility - Annualized volatility (sigma)
 * @param horizonMonths - Projection horizon in months
 * @param initialValue - Starting portfolio value
 */
export function calculateMonteCarloProjection(
  drift: number,
  volatility: number,
  horizonMonths: number,
  initialValue: number
): MonteCarloProjection {
  const dates: string[] = [];
  const base: number[] = [];
  const optimistic: number[] = [];
  const pessimistic: number[] = [];

  const now = new Date();

  for (let m = 0; m <= horizonMonths; m++) {
    const t = m / 12; // time in years
    const sqrtT = Math.sqrt(t);

    const date = new Date(now);
    date.setMonth(date.getMonth() + m);
    dates.push(date.toISOString().split("T")[0]);

    if (m === 0) {
      base.push(initialValue);
      optimistic.push(initialValue);
      pessimistic.push(initialValue);
      continue;
    }

    // GBM expected value
    const baseValue =
      initialValue * Math.exp((drift - (volatility ** 2) / 2) * t);
    base.push(baseValue);

    // 95% confidence interval (1.96 sigma)
    optimistic.push(baseValue * Math.exp(1.96 * volatility * sqrtT));
    pessimistic.push(baseValue * Math.exp(-1.96 * volatility * sqrtT));
  }

  return { dates, base, optimistic, pessimistic };
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARPE RATIO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate Sharpe Ratio.
 * @param annualizedReturn - Portfolio annualized return
 * @param annualizedVolatility - Portfolio annualized volatility
 * @param riskFreeRate - Risk-free rate (default 0.05 for 5%)
 */
export function calculateSharpe(
  annualizedReturn: number,
  annualizedVolatility: number,
  riskFreeRate: number = 0.05
): number {
  if (annualizedVolatility === 0) return 0;
  return (annualizedReturn - riskFreeRate) / annualizedVolatility;
}
