// Path: src/pages/app/SimulateView/SimulateView.tsx

import { useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  RefreshCw,
  Play,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Repeat,
  TrendingUp,
  Zap,
  Target,
  DollarSign,
  Shield,
  Clock,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { MetricCard } from "@/components/molecules/MetricCard";
import { PieChart } from "@/components/charts/echarts/PieChart";
import { RadarChart } from "@/components/charts/echarts/RadarChart";
import { useSimulationStore } from "@/store/simulationStore";
import {
  getProfileConfig,
  getProfileRadarData,
  type RiskProfile,
  type InvestmentTerm,
} from "@/services/hadi/riskProfiles";
import { useCalibrationStore } from "@/store/calibrationStore";
import { useIsMobile } from "@/hooks/useBreakpoint";
import type {
  PieDataPoint,
  RadarIndicator,
  RadarSeriesData,
} from "@/components/charts/echarts/types";
import styles from "./SimulateView.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const RISK_OPTIONS: {
  value: RiskProfile;
  label: string;
  icon: typeof Shield;
}[] = [
  { value: "low", label: "Conservative", icon: Shield },
  { value: "medium", label: "Balanced", icon: Target },
  { value: "high", label: "Aggressive", icon: Zap },
];

const TERM_OPTIONS: { value: InvestmentTerm; label: string; sub: string }[] = [
  { value: "short", label: "Short", sub: "< 1 year" },
  { value: "medium", label: "Medium", sub: "1-3 years" },
  { value: "long", label: "Long", sub: "3+ years" },
];

const PORTFOLIO_COLOR = "#3A6A72";

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function SimulateView() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const {
    riskProfile,
    investmentTerm,
    amount,
    currentStep,
    optimizeResult,
    targetTickers,
    targetWeights,
    scenarioAOrders,
    scenarioBOrders,
    metricsAfterBuy,
    metricsAfterSub,
    isSimulating,
    backendAvailable,
    error,
    setRiskProfile,
    setInvestmentTerm,
    setAmount,
    setStep,
    runSimulation,
    checkBackend,
    reset,
  } = useSimulationStore();

  useEffect(() => {
    checkBackend();
  }, [checkBackend]);

  const profileConfig = useMemo(
    () => getProfileConfig(riskProfile),
    [riskProfile]
  );

  const radarData = useMemo(() => {
    const data = getProfileRadarData(riskProfile);
    const indicators: RadarIndicator[] = data.indicators;
    const series: RadarSeriesData[] = [
      { name: profileConfig.label, value: data.values, color: PORTFOLIO_COLOR },
    ];
    return { indicators, series };
  }, [riskProfile, profileConfig]);

  const weightData = useMemo<PieDataPoint[]>(() => {
    if (!targetWeights || Object.keys(targetWeights).length === 0) return [];
    return Object.entries(targetWeights)
      .filter(([, w]) => w > 0.001)
      .map(([ticker, weight]) => ({
        name: ticker,
        value: parseFloat((weight * 100).toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [targetWeights]);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val >= 0) setAmount(val);
    },
    [setAmount]
  );

  const totalInvested = useMemo(
    () => scenarioAOrders.reduce((s, o) => s + o.estimatedValue, 0),
    [scenarioAOrders]
  );

  const handleUseAsPortfolio = useCallback(() => {
    const { setTickers, setInvestmentCapital, clearResults } =
      useCalibrationStore.getState();
    clearResults();
    setTickers(targetTickers);
    setInvestmentCapital(amount);
    navigate("/app/dashboard/recommendations");
  }, [targetTickers, amount, navigate]);

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.pageTitle}>Simulate</h2>
          <div
            className={styles.backendStatus}
            data-status={
              backendAvailable === true
                ? "connected"
                : backendAvailable === false
                  ? "offline"
                  : "checking"
            }
          >
            <span className={styles.statusDot} />
            <span className={styles.statusText}>
              {backendAvailable === true
                ? "Engine Connected"
                : backendAvailable === false
                  ? "Engine Offline"
                  : "Checking..."}
            </span>
          </div>
        </div>
        <div className={styles.headerRight}>
          {currentStep > 1 && (
            <Button
              variant="ghost"
              onClick={reset}
              icon={<ArrowLeft size={16} />}
            >
              Start Over
            </Button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Step indicators */}
      <div className={styles.stepIndicator}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`${styles.stepDot} ${currentStep >= s ? styles.stepDotActive : ""} ${currentStep === s ? styles.stepDotCurrent : ""}`}
          >
            <span className={styles.stepNumber}>{s}</span>
            <span className={styles.stepLabel}>
              {s === 1 ? "Configure" : s === 2 ? "Results" : "Execute"}
            </span>
          </div>
        ))}
      </div>

      {/* ───────────── STEP 1: Configuration ───────────── */}
      {currentStep === 1 && (
        <div className={styles.stepContent}>
          <div className={styles.configGrid}>
            {/* Risk Profile */}
            <section className={styles.configCard}>
              <h3 className={styles.cardTitle}>
                <Shield size={16} />
                Risk Profile
              </h3>
              <div className={styles.optionButtons}>
                {RISK_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionBtn} ${riskProfile === opt.value ? styles.optionBtnActive : ""}`}
                    onClick={() => setRiskProfile(opt.value)}
                  >
                    <opt.icon size={18} />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
              <p className={styles.profileDesc}>{profileConfig.description}</p>
            </section>

            {/* Investment Term */}
            <section className={styles.configCard}>
              <h3 className={styles.cardTitle}>
                <Clock size={16} />
                Investment Term
              </h3>
              <div className={styles.optionButtons}>
                {TERM_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`${styles.optionBtn} ${investmentTerm === opt.value ? styles.optionBtnActive : ""}`}
                    onClick={() => setInvestmentTerm(opt.value)}
                  >
                    <span>{opt.label}</span>
                    <span className={styles.optionSub}>{opt.sub}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Amount */}
            <section className={styles.configCard}>
              <h3 className={styles.cardTitle}>
                <DollarSign size={16} />
                Investment Amount
              </h3>
              <div className={styles.amountInputWrapper}>
                <span className={styles.amountCurrency}>USD</span>
                <input
                  type="number"
                  className={styles.amountInput}
                  value={amount}
                  onChange={handleAmountChange}
                  min={100}
                  step={1000}
                />
              </div>
              <div className={styles.amountPresets}>
                {[5000, 10000, 25000, 50000, 100000].map((v) => (
                  <button
                    key={v}
                    className={`${styles.presetBtn} ${amount === v ? styles.presetBtnActive : ""}`}
                    onClick={() => setAmount(v)}
                  >
                    {v >= 1000 ? `${v / 1000}K` : v}
                  </button>
                ))}
              </div>
            </section>

            {/* Radar Preview */}
            <section className={styles.configCard}>
              <h3 className={styles.cardTitle}>
                <Activity size={16} />
                Profile Overview
              </h3>
              <RadarChart
                indicators={radarData.indicators}
                data={radarData.series}
                height={isMobile ? 200 : 240}
                shape="polygon"
                showLegend={false}
                fillOpacity={0.25}
              />
            </section>
          </div>

          <div className={styles.actionBar}>
            <Button
              variant="primary"
              onClick={runSimulation}
              disabled={
                isSimulating || amount < 100 || backendAvailable === false
              }
              icon={
                isSimulating ? (
                  <RefreshCw size={16} className={styles.spinner} />
                ) : (
                  <Play size={16} />
                )
              }
            >
              {isSimulating ? "Simulating..." : "Run Simulation"}
            </Button>
          </div>
        </div>
      )}

      {/* ───────────── STEP 2: Results ───────────── */}
      {currentStep === 2 && optimizeResult && (
        <div className={styles.stepContent}>
          {/* Metrics */}
          {metricsAfterBuy && (
            <div className={styles.metricsGrid}>
              <MetricCard
                title="Expected Return"
                value={metricsAfterBuy.expectedReturn.toFixed(2)}
                suffix="%"
                format="custom"
                size="sm"
                variant="glass"
                glassPreset={
                  metricsAfterBuy.expectedReturn >= 0 ? "success" : "error"
                }
                icon={<TrendingUp size={16} />}
              />
              <MetricCard
                title="Volatility"
                value={metricsAfterBuy.volatility.toFixed(2)}
                suffix="%"
                format="custom"
                size="sm"
                variant="glass"
                glassPreset="warning"
                icon={<Zap size={16} />}
              />
              <MetricCard
                title="Sharpe Ratio"
                value={metricsAfterBuy.sharpe.toFixed(3)}
                format="custom"
                size="sm"
                variant="glass"
                glassPreset={
                  metricsAfterBuy.sharpe >= 1 ? "success" : "neutral"
                }
                icon={<Target size={16} />}
              />
              <MetricCard
                title="Utility Score"
                value={metricsAfterBuy.utility.toExponential(3)}
                format="custom"
                size="sm"
                variant="glass"
                glassPreset="neutral"
                icon={<Activity size={16} />}
              />
            </div>
          )}

          {/* Allocation */}
          <div className={styles.resultsLayout}>
            <section className={styles.resultCard}>
              <h3 className={styles.cardTitle}>Optimal Allocation</h3>
              <div className={styles.pieContainer}>
                <PieChart
                  data={weightData}
                  height={isMobile ? 220 : 260}
                  variant="donut"
                  showLabels={false}
                  showLegend={false}
                  centerLabel="Assets"
                  centerValue={`${weightData.length}`}
                />
              </div>
            </section>

            <section className={styles.resultCard}>
              <h3 className={styles.cardTitle}>Target Portfolio</h3>
              <div className={styles.tickerTable}>
                <div className={styles.tickerTableHeader}>
                  <span>Ticker</span>
                  <span>Weight</span>
                  <span>Qty</span>
                  <span>Value</span>
                </div>
                {scenarioAOrders.map((order) => (
                  <div key={order.ticker} className={styles.tickerTableRow}>
                    <span className={styles.tickerName}>{order.ticker}</span>
                    <span className={styles.tickerWeight}>
                      {(order.weight * 100).toFixed(1)}%
                    </span>
                    <span className={styles.tickerQty}>{order.qty}</span>
                    <span className={styles.tickerValue}>
                      ${order.estimatedValue.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className={styles.tickerTableFooter}>
                  <span>Total Invested</span>
                  <span>${totalInvested.toLocaleString()}</span>
                  <span>Remaining</span>
                  <span>${(amount - totalInvested).toLocaleString()}</span>
                </div>
              </div>
            </section>
          </div>

          <div className={styles.actionBar}>
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              icon={<ArrowLeft size={16} />}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setStep(3)}
              icon={<ArrowRight size={16} />}
            >
              View Execution Options
            </Button>
          </div>
        </div>
      )}

      {/* ───────────── STEP 3: Decision ───────────── */}
      {currentStep === 3 && metricsAfterBuy && metricsAfterSub && (
        <div className={styles.stepContent}>
          <div className={styles.scenariosGrid}>
            {/* Scenario A: Buy */}
            <section className={styles.scenarioCard}>
              <div className={styles.scenarioHeader}>
                <ShoppingCart size={20} />
                <div>
                  <h3 className={styles.scenarioTitle}>Scenario A: Buy</h3>
                  <p className={styles.scenarioDesc}>
                    Inject ${amount.toLocaleString()} as new capital
                  </p>
                </div>
              </div>

              <div className={styles.scenarioMetrics}>
                <div className={styles.metricRow}>
                  <span>Expected Return</span>
                  <span className={styles.metricPositive}>
                    {metricsAfterBuy.expectedReturn.toFixed(2)}%
                  </span>
                </div>
                <div className={styles.metricRow}>
                  <span>Volatility</span>
                  <span>{metricsAfterBuy.volatility.toFixed(2)}%</span>
                </div>
                <div className={styles.metricRow}>
                  <span>Sharpe</span>
                  <span>{metricsAfterBuy.sharpe.toFixed(3)}</span>
                </div>
              </div>

              <div className={styles.orderList}>
                <h4 className={styles.orderListTitle}>Buy Orders</h4>
                {scenarioAOrders.slice(0, 8).map((o) => (
                  <div key={o.ticker} className={styles.orderItem}>
                    <span className={styles.orderTicker}>{o.ticker}</span>
                    <span className={styles.orderAction}>BUY {o.qty}</span>
                    <span className={styles.orderValue}>
                      ${o.estimatedValue.toLocaleString()}
                    </span>
                  </div>
                ))}
                {scenarioAOrders.length > 8 && (
                  <span className={styles.orderMore}>
                    +{scenarioAOrders.length - 8} more
                  </span>
                )}
              </div>

              <Button
                variant="primary"
                onClick={handleUseAsPortfolio}
                className={styles.scenarioBtn}
              >
                <ArrowRightLeft size={16} />
                Use as Portfolio
              </Button>
            </section>

            {/* Scenario B: Substitute */}
            <section className={styles.scenarioCard}>
              <div className={styles.scenarioHeader}>
                <Repeat size={20} />
                <div>
                  <h3 className={styles.scenarioTitle}>
                    Scenario B: Substitute
                  </h3>
                  <p className={styles.scenarioDesc}>
                    Rotate current portfolio into this strategy
                  </p>
                </div>
              </div>

              <div className={styles.scenarioMetrics}>
                <div className={styles.metricRow}>
                  <span>Expected Return</span>
                  <span className={styles.metricPositive}>
                    {metricsAfterSub.expectedReturn.toFixed(2)}%
                  </span>
                </div>
                <div className={styles.metricRow}>
                  <span>Volatility</span>
                  <span>{metricsAfterSub.volatility.toFixed(2)}%</span>
                </div>
                <div className={styles.metricRow}>
                  <span>Sharpe</span>
                  <span>{metricsAfterSub.sharpe.toFixed(3)}</span>
                </div>
              </div>

              <div className={styles.orderList}>
                <h4 className={styles.orderListTitle}>Sell Orders</h4>
                {scenarioBOrders
                  .filter((o) => o.action === "SELL_ALL")
                  .map((o) => (
                    <div key={`sell-${o.ticker}`} className={styles.orderItem}>
                      <span className={styles.orderTicker}>{o.ticker}</span>
                      <span className={styles.orderAction}>SELL {o.qty}</span>
                      <span className={styles.orderValue}>
                        ${o.estimatedValue.toLocaleString()}
                      </span>
                    </div>
                  ))}
                <h4 className={styles.orderListTitle}>Buy Orders</h4>
                {scenarioBOrders
                  .filter((o) => o.action === "BUY")
                  .slice(0, 6)
                  .map((o) => (
                    <div key={`buy-${o.ticker}`} className={styles.orderItem}>
                      <span className={styles.orderTicker}>{o.ticker}</span>
                      <span className={styles.orderAction}>BUY {o.qty}</span>
                      <span className={styles.orderValue}>
                        ${o.estimatedValue.toLocaleString()}
                      </span>
                    </div>
                  ))}
                {scenarioBOrders.filter((o) => o.action === "BUY").length >
                  6 && (
                  <span className={styles.orderMore}>
                    +
                    {scenarioBOrders.filter((o) => o.action === "BUY").length -
                      6}{" "}
                    more
                  </span>
                )}
              </div>

              <Button
                variant="secondary"
                onClick={handleUseAsPortfolio}
                className={styles.scenarioBtn}
              >
                <ArrowRightLeft size={16} />
                Use as Portfolio
              </Button>
            </section>
          </div>

          <div className={styles.actionBar}>
            <Button
              variant="ghost"
              onClick={() => setStep(2)}
              icon={<ArrowLeft size={16} />}
            >
              Back to Results
            </Button>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {isSimulating && (
        <div className={styles.loadingOverlay}>
          <RefreshCw size={32} className={styles.spinner} />
          <p>Running simulation...</p>
          <p className={styles.loadingHint}>
            Optimizing {getProfileConfig(riskProfile).label.toLowerCase()}{" "}
            portfolio
          </p>
        </div>
      )}
    </div>
  );
}
