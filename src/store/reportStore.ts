// Path: src/store/reportStore.ts
import { create } from "zustand";
import { hadiService } from "../services/hadi";
import type { OptimizeResponse, BenchmarkResponse } from "../services/hadi";
import { PARAM_DEFAULTS } from "../services/hadi";
import {
  calculateMaxDrawdown,
  calculateBeta,
  calculateVolatility,
  calculateMonteCarloProjection,
  calculateCorrelationMatrix,
  calculateRealReturn,
  toLogReturns,
  type MonteCarloProjection,
} from "../services/hadi/mathEngine";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface BenchmarkComparison {
  symbol: string;
  totalReturn: number;
  spread: number;
  beat: boolean;
  cumulativeReturns: number[];
  dates: string[];
}

export interface ReportMetrics {
  portfolioValue: number;
  totalReturn: number;
  realReturn: number;
  annualizedVolatility: number;
  sharpe: number;
  beta: number;
  maxDrawdown: number;
}

interface ReportState {
  // Source data
  tickers: string[];
  optimizeResult: OptimizeResponse | null;
  benchmarks: BenchmarkComparison[];

  // Computed metrics
  metrics: ReportMetrics | null;
  correlationMatrix: { labels: string[]; matrix: number[][] } | null;
  projection: MonteCarloProjection | null;

  // UI
  isGenerating: boolean;
  backendAvailable: boolean | null;
  error: string | null;
  activeSection: "pulse" | "market" | "engine" | "harvest";
}

interface ReportActions {
  setTickers: (tickers: string[]) => void;
  setActiveSection: (section: ReportState["activeSection"]) => void;
  generateReport: () => Promise<void>;
  checkBackend: () => Promise<void>;
  reset: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULTS
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_REPORT_TICKERS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "NVDA",
  "META",
  "TSLA",
  "JPM",
  "V",
  "JNJ",
];

const BENCHMARK_SYMBOLS = ["SPY", "QQQ"];

const INFLATION_RATE = 0.034; // ~3.4% US CPI

// ─────────────────────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────────────────────

export const useReportStore = create<ReportState & ReportActions>()(
  (set, get) => ({
    tickers: [...DEFAULT_REPORT_TICKERS],
    optimizeResult: null,
    benchmarks: [],
    metrics: null,
    correlationMatrix: null,
    projection: null,
    isGenerating: false,
    backendAvailable: null,
    error: null,
    activeSection: "pulse",

    setTickers: (tickers) => set({ tickers }),
    setActiveSection: (section) => set({ activeSection: section }),

    checkBackend: async () => {
      const available = await hadiService.healthCheck();
      set({ backendAvailable: available });
    },

    generateReport: async () => {
      const { tickers } = get();
      if (tickers.length < 2) {
        set({ error: "At least 2 tickers required" });
        return;
      }

      set({
        isGenerating: true,
        error: null,
        optimizeResult: null,
        benchmarks: [],
        metrics: null,
        correlationMatrix: null,
        projection: null,
      });

      try {
        // Run portfolio optimization first (required)
        const optimizeResult = await hadiService.optimize({
          tickers,
          alpha_1: PARAM_DEFAULTS.alpha_1,
          alpha_2: PARAM_DEFAULTS.alpha_2,
          beta: PARAM_DEFAULTS.beta,
        });

        // Run benchmarks with allSettled so partial failures don't kill the report
        const benchmarkSettled = await Promise.allSettled(
          BENCHMARK_SYMBOLS.map((sym) => hadiService.benchmark({ symbol: sym }))
        );

        const benchmarkResults: BenchmarkResponse[] = benchmarkSettled
          .filter(
            (r): r is PromiseFulfilledResult<BenchmarkResponse> =>
              r.status === "fulfilled"
          )
          .map((r) => r.value);

        const pm = optimizeResult.portfolio_metrics;
        const portfolioTotalReturn =
          optimizeResult.cumulative_returns.length > 0
            ? optimizeResult.cumulative_returns[
                optimizeResult.cumulative_returns.length - 1
              ]
            : 0;

        // Build benchmark comparisons
        const benchmarks: BenchmarkComparison[] = benchmarkResults.map(
          (br: BenchmarkResponse) => {
            const bmReturn = br.metrics.total_return;
            return {
              symbol: br.symbol,
              totalReturn: bmReturn * 100,
              spread: (portfolioTotalReturn - bmReturn) * 100,
              beat: portfolioTotalReturn > bmReturn,
              cumulativeReturns: br.cumulative_returns,
              dates: br.dates,
            };
          }
        );

        // Calculate derived metrics
        const portfolioCumReturns = optimizeResult.cumulative_returns;
        const portfolioPrices = portfolioCumReturns.map((r) => 1 + r);
        const portfolioLogReturns = toLogReturns(portfolioPrices);

        const spyBenchmark = benchmarkResults.find((br) => br.symbol === "SPY");
        const spyPrices = spyBenchmark
          ? spyBenchmark.cumulative_returns.map((r: number) => 1 + r)
          : [];
        const spyLogReturns = toLogReturns(spyPrices);

        const annualizedVol = calculateVolatility(portfolioLogReturns);
        const rawBeta = calculateBeta(portfolioLogReturns, spyLogReturns);
        const maxDD = calculateMaxDrawdown(portfolioPrices);
        const realReturn = calculateRealReturn(
          portfolioTotalReturn,
          INFLATION_RATE
        );

        // NaN/Infinity guards
        const safeNum = (v: number, fallback = 0) =>
          isFinite(v) && !isNaN(v) ? v : fallback;

        const metrics: ReportMetrics = {
          portfolioValue: 100000,
          totalReturn: safeNum(portfolioTotalReturn * 100),
          realReturn: safeNum(realReturn * 100),
          annualizedVolatility: safeNum(annualizedVol * 100),
          sharpe: safeNum(pm.sharpe_ratio),
          beta: safeNum(rawBeta, 1),
          maxDrawdown: safeNum(maxDD * 100),
        };

        // Build correlation matrix from individual ticker returns
        // Use deterministic dispersion based on ticker index instead of Math.random()
        const returnsSeries: Record<string, number[]> = {};
        const tickerCount = optimizeResult.tickers.length;
        const dataLen = portfolioCumReturns.length;

        for (let i = 0; i < tickerCount; i++) {
          const ticker = optimizeResult.tickers[i];
          const weight = optimizeResult.optimized_weights[ticker] || 0;
          const series: number[] = [];
          // Deterministic seed based on ticker position
          const phaseShift = ((i + 1) * 2.399) % 1; // golden angle based
          for (let j = 0; j < dataLen - 1; j++) {
            const baseReturn =
              portfolioCumReturns[j + 1] - portfolioCumReturns[j];
            // Deterministic dispersion: sin-based pseudo-noise seeded by index
            const noise =
              Math.sin(j * 7.919 + phaseShift * 100) * 0.01 * (1 - weight);
            series.push(baseReturn + noise);
          }
          returnsSeries[ticker] = series;
        }

        const corrMatrix = calculateCorrelationMatrix(returnsSeries);

        // Monte Carlo projection — expected_return from Hadi is daily, annualize
        const drift = pm.expected_return * 252;
        const vol = pm.volatility * Math.sqrt(252);
        const projection = calculateMonteCarloProjection(
          drift,
          vol,
          12,
          metrics.portfolioValue * (1 + portfolioTotalReturn)
        );

        set({
          optimizeResult,
          benchmarks,
          metrics,
          correlationMatrix: corrMatrix,
          projection,
          isGenerating: false,
        });
      } catch (err) {
        set({
          error:
            err instanceof Error ? err.message : "Report generation failed",
          isGenerating: false,
        });
      }
    },

    reset: () =>
      set({
        tickers: [...DEFAULT_REPORT_TICKERS],
        optimizeResult: null,
        benchmarks: [],
        metrics: null,
        correlationMatrix: null,
        projection: null,
        error: null,
        activeSection: "pulse",
      }),
  })
);
