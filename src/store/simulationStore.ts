// Path: src/store/simulationStore.ts
import { create } from "zustand";
import { hadiService } from "../services/hadi";
import type { OptimizeResponse } from "../services/hadi";
import { PARAM_DEFAULTS } from "../services/hadi";
import {
  type RiskProfile,
  type InvestmentTerm,
  getTickerUniverse,
  APPROX_PRICES,
} from "../services/hadi/riskProfiles";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface SimulationOrder {
  ticker: string;
  action: "BUY" | "SELL_ALL" | "REBALANCE";
  qty: number;
  weight: number;
  estimatedValue: number;
}

export interface ScenarioMetrics {
  expectedReturn: number;
  volatility: number;
  sharpe: number;
  utility: number;
}

interface SimulationState {
  // Step 1: Parameters
  riskProfile: RiskProfile;
  investmentTerm: InvestmentTerm;
  amount: number;
  currentStep: 1 | 2 | 3;

  // Step 2: Results from Hadi
  optimizeResult: OptimizeResponse | null;
  targetTickers: string[];
  targetWeights: Record<string, number>;

  // Step 3: Scenarios
  scenarioAOrders: SimulationOrder[];
  scenarioBOrders: SimulationOrder[];
  metricsAfterBuy: ScenarioMetrics | null;
  metricsAfterSub: ScenarioMetrics | null;

  // UI state
  isSimulating: boolean;
  backendAvailable: boolean | null;
  error: string | null;
}

interface SimulationActions {
  setRiskProfile: (profile: RiskProfile) => void;
  setInvestmentTerm: (term: InvestmentTerm) => void;
  setAmount: (amount: number) => void;
  setStep: (step: 1 | 2 | 3) => void;

  runSimulation: () => Promise<void>;
  checkBackend: () => Promise<void>;
  reset: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────────────────────

const initialState: SimulationState = {
  riskProfile: "medium",
  investmentTerm: "medium",
  amount: 10000,
  currentStep: 1,

  optimizeResult: null,
  targetTickers: [],
  targetWeights: {},

  scenarioAOrders: [],
  scenarioBOrders: [],
  metricsAfterBuy: null,
  metricsAfterSub: null,

  isSimulating: false,
  backendAvailable: null,
  error: null,
};

export const useSimulationStore = create<SimulationState & SimulationActions>()(
  (set, get) => ({
    ...initialState,

    setRiskProfile: (profile) => set({ riskProfile: profile }),
    setInvestmentTerm: (term) => set({ investmentTerm: term }),
    setAmount: (amount) => set({ amount }),
    setStep: (step) => set({ currentStep: step }),

    checkBackend: async () => {
      const available = await hadiService.healthCheck();
      set({ backendAvailable: available });
    },

    runSimulation: async () => {
      const { riskProfile, investmentTerm, amount } = get();

      const tickers = getTickerUniverse(riskProfile, investmentTerm);
      if (tickers.length < 2) {
        set({ error: "Not enough tickers for this profile" });
        return;
      }

      set({
        isSimulating: true,
        error: null,
        optimizeResult: null,
        scenarioAOrders: [],
        scenarioBOrders: [],
      });

      try {
        const result = await hadiService.optimize({
          tickers,
          alpha_1: PARAM_DEFAULTS.alpha_1,
          alpha_2: PARAM_DEFAULTS.alpha_2,
          beta: PARAM_DEFAULTS.beta,
        });

        const weights = result.optimized_weights;
        const validTickers = Object.keys(weights).filter(
          (t) => weights[t] > 0.001
        );

        const pm = result.portfolio_metrics;
        const annReturn = pm.expected_return * 252 * 100;
        const annVol = pm.volatility * Math.sqrt(252) * 100;

        // Scenario A: Buy with new capital (additive — all BUY)
        const scenarioAOrders: SimulationOrder[] = validTickers.map(
          (ticker) => {
            const w = weights[ticker];
            const price = APPROX_PRICES[ticker] || 100;
            const qty = Math.floor((amount * w) / price);
            return {
              ticker,
              action: "BUY" as const,
              qty,
              weight: w,
              estimatedValue: qty * price,
            };
          }
        );

        const metricsA: ScenarioMetrics = {
          expectedReturn: annReturn,
          volatility: annVol,
          sharpe: pm.sharpe_ratio,
          utility: pm.utility,
        };

        // Scenario B: Substitute existing portfolio (sell current, buy new)
        // Simulate selling a hypothetical equal-weight portfolio, then buying the optimized one
        const hypotheticalCurrentCount = Math.min(5, tickers.length);
        const sellTickers = tickers.slice(0, hypotheticalCurrentCount);
        const capitalPerSell = amount / hypotheticalCurrentCount;

        const sellOrders: SimulationOrder[] = sellTickers.map((ticker) => {
          const price = APPROX_PRICES[ticker] || 100;
          const qty = Math.floor(capitalPerSell / price);
          return {
            ticker,
            action: "SELL_ALL" as const,
            qty,
            weight: 0,
            estimatedValue: qty * price,
          };
        });

        const buyOrders: SimulationOrder[] = validTickers.map((ticker) => {
          const w = weights[ticker];
          const price = APPROX_PRICES[ticker] || 100;
          const qty = Math.floor((amount * w) / price);
          return {
            ticker,
            action: "BUY" as const,
            qty,
            weight: w,
            estimatedValue: qty * price,
          };
        });

        const scenarioBOrders = [...sellOrders, ...buyOrders];

        // Scenario B metrics: slightly penalized by turnover cost estimate (~0.3%)
        const turnoverPenalty = 0.3;
        const metricsB: ScenarioMetrics = {
          expectedReturn: annReturn - turnoverPenalty,
          volatility: annVol,
          sharpe: annVol === 0 ? 0 : (annReturn - turnoverPenalty - 5) / annVol,
          utility: pm.utility * 0.995,
        };

        set({
          optimizeResult: result,
          targetTickers: validTickers,
          targetWeights: weights,
          scenarioAOrders,
          scenarioBOrders,
          metricsAfterBuy: metricsA,
          metricsAfterSub: metricsB,
          isSimulating: false,
          currentStep: 2,
        });
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : "Simulation failed",
          isSimulating: false,
        });
      }
    },

    reset: () => set(initialState),
  })
);
