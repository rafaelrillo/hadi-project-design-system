// Path: src/store/calibrationStore.ts
import { create } from "zustand";
import { hadiService } from "../services/hadi";
import type {
  OptimizeRequest,
  OptimizeResponse,
  BenchmarkResponse,
} from "../services/hadi";
import { PARAM_DEFAULTS, DEFAULT_TICKERS } from "../services/hadi";
import { APPROX_PRICES } from "../services/hadi/riskProfiles";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface CalibrationOrder {
  ticker: string;
  action: "BUY" | "SELL_ALL" | "REBALANCE_BUY" | "REBALANCE_SELL";
  currentQty: number;
  targetQty: number;
  diff: number;
  estimatedValue: number;
}

export interface MarketScanResult {
  opportunities: { ticker: string; utilityScore: number }[];
  warnings: { ticker: string; utilityScore: number }[];
}

interface CalibrationState {
  // Input parameters
  tickers: string[];
  startDate: string;
  endDate: string;
  alpha1: number;
  alpha2: number;
  beta: number;
  benchmarkSymbol: string;
  investmentCapital: number;

  // Results
  optimizeResult: OptimizeResponse | null;
  benchmarkResult: BenchmarkResponse | null;

  // Market Scan (Pro)
  marketScanResult: MarketScanResult | null;
  selectedOpportunities: string[];
  acceptedExits: string[];
  recalculatedResult: OptimizeResponse | null;
  orders: CalibrationOrder[];

  // UI state
  isOptimizing: boolean;
  isBenchmarking: boolean;
  isScanning: boolean;
  isRecalculating: boolean;
  backendAvailable: boolean | null;
  error: string | null;
  activeTab: "basic" | "pro";
}

interface CalibrationActions {
  setTickers: (tickers: string[]) => void;
  setDateRange: (start: string, end: string) => void;
  setAlpha1: (value: number) => void;
  setAlpha2: (value: number) => void;
  setBeta: (value: number) => void;
  setBenchmarkSymbol: (symbol: string) => void;
  setInvestmentCapital: (value: number) => void;
  setActiveTab: (tab: "basic" | "pro") => void;
  resetParams: () => void;

  runOptimization: () => Promise<void>;
  runBenchmark: () => Promise<void>;
  runFullAnalysis: () => Promise<void>;
  runMarketScan: () => Promise<void>;
  toggleOpportunity: (ticker: string) => void;
  toggleExit: (ticker: string) => void;
  recalculateWithSelections: () => Promise<void>;
  checkBackend: () => Promise<void>;

  clearResults: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKET SCAN UNIVERSE
// ─────────────────────────────────────────────────────────────────────────────

const MARKET_SCAN_TICKERS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "NVDA",
  "META",
  "TSLA",
  "AVGO",
  "JPM",
  "V",
  "MA",
  "UNH",
  "JNJ",
  "PG",
  "KO",
  "PEP",
  "HD",
  "DIS",
  "NFLX",
  "CRM",
  "AMD",
  "QCOM",
  "TXN",
  "INTC",
  "BAC",
  "WFC",
  "GS",
  "BLK",
  "SCHW",
  "AXP",
  "XOM",
  "CVX",
  "NEE",
  "SLB",
  "COP",
  "LLY",
  "PFE",
  "ABBV",
  "MRK",
  "TMO",
  "SPY",
  "QQQ",
  "IWM",
  "VTI",
  "VOO",
  "BND",
  "TLT",
  "AGG",
  "LQD",
];

// ─────────────────────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────────────────────

export const useCalibrationStore = create<
  CalibrationState & CalibrationActions
>()((set, get) => ({
  // Initial state
  tickers: [...DEFAULT_TICKERS],
  startDate: "",
  endDate: "",
  alpha1: PARAM_DEFAULTS.alpha_1,
  alpha2: PARAM_DEFAULTS.alpha_2,
  beta: PARAM_DEFAULTS.beta,
  benchmarkSymbol: "SPY",
  investmentCapital: 100000,

  optimizeResult: null,
  benchmarkResult: null,

  marketScanResult: null,
  selectedOpportunities: [],
  acceptedExits: [],
  recalculatedResult: null,
  orders: [],

  isOptimizing: false,
  isBenchmarking: false,
  isScanning: false,
  isRecalculating: false,
  backendAvailable: null,
  error: null,
  activeTab: "basic",

  // Setters
  setTickers: (tickers) => set({ tickers }),
  setDateRange: (start, end) => set({ startDate: start, endDate: end }),
  setAlpha1: (value) => set({ alpha1: value }),
  setAlpha2: (value) => set({ alpha2: value }),
  setBeta: (value) => set({ beta: value }),
  setBenchmarkSymbol: (symbol) => set({ benchmarkSymbol: symbol }),
  setInvestmentCapital: (value) => set({ investmentCapital: value }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  resetParams: () =>
    set({
      alpha1: PARAM_DEFAULTS.alpha_1,
      alpha2: PARAM_DEFAULTS.alpha_2,
      beta: PARAM_DEFAULTS.beta,
    }),

  // API actions
  runOptimization: async () => {
    const { tickers, startDate, endDate, alpha1, alpha2, beta } = get();
    if (tickers.length < 2) {
      set({ error: "At least 2 tickers are required" });
      return;
    }

    set({ isOptimizing: true, error: null });

    try {
      const request: OptimizeRequest = {
        tickers,
        alpha_1: alpha1,
        alpha_2: alpha2,
        beta,
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      };
      const result = await hadiService.optimize(request);

      // Generate orders
      const { investmentCapital } = get();
      const orders = generateOrders(result, investmentCapital);

      set({ optimizeResult: result, orders, isOptimizing: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Optimization failed",
        isOptimizing: false,
      });
    }
  },

  runBenchmark: async () => {
    const { benchmarkSymbol, startDate, endDate } = get();
    set({ isBenchmarking: true });

    try {
      const result = await hadiService.benchmark({
        symbol: benchmarkSymbol,
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      });
      set({ benchmarkResult: result, isBenchmarking: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Benchmark fetch failed",
        isBenchmarking: false,
      });
    }
  },

  runFullAnalysis: async () => {
    set({
      error: null,
      optimizeResult: null,
      benchmarkResult: null,
      orders: [],
    });
    const { runOptimization, runBenchmark } = get();
    await Promise.all([runOptimization(), runBenchmark()]);
  },

  runMarketScan: async () => {
    const { tickers, alpha1, alpha2, beta } = get();
    set({ isScanning: true, error: null, marketScanResult: null });

    try {
      // Run optimization on the full market universe
      const result = await hadiService.optimize({
        tickers: MARKET_SCAN_TICKERS,
        alpha_1: alpha1,
        alpha_2: alpha2,
        beta,
      });

      // Separate into opportunities and warnings
      const weights = result.optimized_weights;
      const allTickers = Object.entries(weights)
        .map(([t, w]) => ({ ticker: t, utilityScore: w }))
        .sort((a, b) => b.utilityScore - a.utilityScore);

      const opportunities = allTickers
        .filter((t) => !tickers.includes(t.ticker) && t.utilityScore > 0.01)
        .slice(0, 10);

      const warnings = allTickers
        .filter((t) => tickers.includes(t.ticker) && t.utilityScore < 0.03)
        .slice(0, 5);

      set({
        marketScanResult: { opportunities, warnings },
        isScanning: false,
        selectedOpportunities: [],
        acceptedExits: [],
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Market scan failed",
        isScanning: false,
      });
    }
  },

  toggleOpportunity: (ticker) => {
    const { selectedOpportunities } = get();
    const next = selectedOpportunities.includes(ticker)
      ? selectedOpportunities.filter((t) => t !== ticker)
      : [...selectedOpportunities, ticker];
    set({ selectedOpportunities: next });
  },

  toggleExit: (ticker) => {
    const { acceptedExits } = get();
    const next = acceptedExits.includes(ticker)
      ? acceptedExits.filter((t) => t !== ticker)
      : [...acceptedExits, ticker];
    set({ acceptedExits: next });
  },

  recalculateWithSelections: async () => {
    const {
      tickers,
      selectedOpportunities,
      acceptedExits,
      alpha1,
      alpha2,
      beta,
      startDate,
      endDate,
      investmentCapital,
    } = get();

    // Build modified universe (deduplicate in case opportunities overlap with existing tickers)
    const universe = [
      ...new Set([
        ...tickers.filter((t) => !acceptedExits.includes(t)),
        ...selectedOpportunities,
      ]),
    ];

    if (universe.length < 2) {
      set({ error: "Modified portfolio needs at least 2 tickers" });
      return;
    }

    set({ isRecalculating: true, error: null });

    try {
      const result = await hadiService.optimize({
        tickers: universe,
        alpha_1: alpha1,
        alpha_2: alpha2,
        beta,
        ...(startDate && { start_date: startDate }),
        ...(endDate && { end_date: endDate }),
      });

      const orders = generateOrders(result, investmentCapital);
      set({ recalculatedResult: result, orders, isRecalculating: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Recalculation failed",
        isRecalculating: false,
      });
    }
  },

  checkBackend: async () => {
    const available = await hadiService.healthCheck();
    set({ backendAvailable: available });
  },

  clearResults: () =>
    set({
      optimizeResult: null,
      benchmarkResult: null,
      marketScanResult: null,
      recalculatedResult: null,
      selectedOpportunities: [],
      acceptedExits: [],
      orders: [],
      error: null,
    }),
}));

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function generateOrders(
  result: OptimizeResponse,
  capital: number
): CalibrationOrder[] {
  const weights = result.optimized_weights;
  return Object.entries(weights)
    .filter(([, w]) => w > 0.001)
    .map(([ticker, weight]) => {
      const price = APPROX_PRICES[ticker] || 100;
      const targetQty = Math.floor((capital * weight) / price);
      return {
        ticker,
        action: "BUY" as const,
        currentQty: 0,
        targetQty,
        diff: targetQty,
        estimatedValue: targetQty * price,
      };
    })
    .sort((a, b) => b.estimatedValue - a.estimatedValue);
}
