// Path: src/pages/app/RecommendationsView/RecommendationsView.tsx

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Activity,
  AlertCircle,
  RefreshCw,
  RotateCcw,
  Play,
  X,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
  Search,
  Radar,
  CheckSquare,
  Square,
  ArrowRightLeft,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Slider } from "@/components/atoms/Slider";
import { LineChart } from "@/components/charts/echarts/LineChart";
import { PieChart } from "@/components/charts/echarts/PieChart";
import { MetricCard } from "@/components/molecules/MetricCard";
import { useCalibrationStore } from "@/store";
import { PARAM_RANGES, searchTickers } from "@/services/hadi";
import { useIsMobile } from "@/hooks/useBreakpoint";
import type {
  SeriesData,
  PieDataPoint,
} from "@/components/charts/echarts/types";
import styles from "./RecommendationsView.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const BENCHMARK_PRESETS = ["SPY", "QQQ", "IWM", "DIA"] as const;
const PORTFOLIO_COLOR = "#3A6A72";
const BENCHMARK_COLOR = "#9CA3AF";

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function RecommendationsView() {
  const isMobile = useIsMobile();
  const [tickerInput, setTickerInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const {
    tickers,
    alpha1,
    alpha2,
    beta,
    benchmarkSymbol,
    startDate,
    endDate,
    investmentCapital,
    optimizeResult,
    benchmarkResult,
    marketScanResult,
    selectedOpportunities,
    acceptedExits,
    recalculatedResult,
    orders,
    isOptimizing,
    isBenchmarking,
    isScanning,
    isRecalculating,
    backendAvailable,
    error,
    activeTab,
    setTickers,
    setDateRange,
    setAlpha1,
    setAlpha2,
    setBeta,
    setBenchmarkSymbol,
    setInvestmentCapital,
    setActiveTab,
    resetParams,
    runFullAnalysis,
    runMarketScan,
    toggleOpportunity,
    toggleExit,
    recalculateWithSelections,
    checkBackend,
    clearResults,
  } = useCalibrationStore();

  const isLoading = isOptimizing || isBenchmarking;
  const hasResults = optimizeResult !== null;
  const activeResult = recalculatedResult || optimizeResult;

  // Check backend on mount
  useEffect(() => {
    checkBackend();
  }, [checkBackend]);

  // ── Ticker search & management ────────────────────────────────────────

  const searchResults = useMemo(
    () => searchTickers(tickerInput, tickers),
    [tickerInput, tickers]
  );

  const addTicker = useCallback(
    (symbol: string) => {
      if (!tickers.includes(symbol)) {
        setTickers([...tickers, symbol]);
      }
      setTickerInput("");
      setShowDropdown(false);
      setHighlightedIndex(-1);
    },
    [tickers, setTickers]
  );

  const removeTicker = useCallback(
    (ticker: string) => {
      setTickers(tickers.filter((t) => t !== ticker));
    },
    [tickers, setTickers]
  );

  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTickerInput(e.target.value.toUpperCase());
      setShowDropdown(true);
      setHighlightedIndex(-1);
    },
    []
  );

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0 && searchResults[highlightedIndex]) {
          addTicker(searchResults[highlightedIndex].symbol);
        } else if (searchResults.length === 1) {
          addTicker(searchResults[0].symbol);
        }
      } else if (e.key === "Escape") {
        setShowDropdown(false);
        setHighlightedIndex(-1);
      }
    },
    [searchResults, highlightedIndex, addTicker]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Chart data transforms ──────────────────────────────────────────────

  const chartData = useMemo<SeriesData[]>(() => {
    const series: SeriesData[] = [];
    const source = activeResult || optimizeResult;

    if (source) {
      series.push({
        id: "portfolio",
        name: "Optimized Portfolio",
        color: PORTFOLIO_COLOR,
        data: source.dates.map((d, i) => ({
          x: d,
          y: source.cumulative_returns[i] * 100,
        })),
      });
    }

    if (benchmarkResult) {
      series.push({
        id: "benchmark",
        name: benchmarkResult.symbol,
        color: BENCHMARK_COLOR,
        data: benchmarkResult.dates.map((d, i) => ({
          x: d,
          y: benchmarkResult.cumulative_returns[i] * 100,
        })),
      });
    }

    return series;
  }, [activeResult, optimizeResult, benchmarkResult]);

  const weightData = useMemo<PieDataPoint[]>(() => {
    const source = activeResult || optimizeResult;
    if (!source) return [];
    return Object.entries(source.optimized_weights)
      .filter(([, w]) => w > 0.001)
      .map(([ticker, weight]) => ({
        name: ticker,
        value: parseFloat((weight * 100).toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [activeResult, optimizeResult]);

  // ── Derived metrics ────────────────────────────────────────────────────

  const metrics = useMemo(() => {
    const source = activeResult || optimizeResult;
    if (!source) return null;

    const pm = source.portfolio_metrics;
    const annualizedReturn = pm.expected_return * 252 * 100;
    const annualizedVol = pm.volatility * Math.sqrt(252) * 100;

    const portfolioTotalReturn =
      source.cumulative_returns.length > 0
        ? source.cumulative_returns[source.cumulative_returns.length - 1] * 100
        : 0;

    const benchmarkTotalReturn = benchmarkResult?.metrics?.total_return
      ? benchmarkResult.metrics.total_return * 100
      : null;

    const alpha =
      benchmarkTotalReturn !== null
        ? portfolioTotalReturn - benchmarkTotalReturn
        : null;

    return {
      annualizedReturn,
      annualizedVol,
      sharpe: pm.sharpe_ratio,
      utility: pm.utility,
      alpha,
      converged: pm.converged,
      iterations: pm.iterations,
      portfolioTotalReturn,
      benchmarkTotalReturn,
    };
  }, [activeResult, optimizeResult, benchmarkResult]);

  // Orders summary
  const ordersSummary = useMemo(() => {
    const buys = orders.filter((o) => o.diff > 0);
    const sells = orders.filter((o) => o.diff < 0);
    const totalBuy = buys.reduce((s, o) => s + o.estimatedValue, 0);
    const totalSell = sells.reduce((s, o) => s + Math.abs(o.estimatedValue), 0);
    return { buys, sells, totalBuy, totalSell, net: totalBuy - totalSell };
  }, [orders]);

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.pageTitle}>Calibrate</h2>
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
          {hasResults && (
            <Button
              variant="ghost"
              onClick={clearResults}
              icon={<RotateCcw size={16} />}
            >
              Clear
            </Button>
          )}
          <Button
            variant="primary"
            onClick={runFullAnalysis}
            disabled={
              isLoading || tickers.length < 2 || backendAvailable === false
            }
            icon={
              isLoading ? (
                <RefreshCw size={16} className={styles.spinner} />
              ) : (
                <Play size={16} />
              )
            }
          >
            {isLoading ? "Running..." : "Run Analysis"}
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Tab toggle: Basic / Pro */}
      {hasResults && (
        <div className={styles.tabToggle}>
          <button
            className={`${styles.tabBtn} ${activeTab === "basic" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("basic")}
          >
            <Target size={14} />
            Basic Calibration
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "pro" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("pro")}
          >
            <Radar size={14} />
            Pro (Opportunities)
          </button>
        </div>
      )}

      {/* Main layout */}
      <div className={styles.mainLayout}>
        {/* Left: Configuration */}
        <aside className={styles.configPanel}>
          {/* Tickers */}
          <section className={styles.configSection}>
            <h3 className={styles.sectionTitle}>Tickers</h3>
            <div className={styles.tickerTags}>
              {tickers.map((t) => (
                <span key={t} className={styles.tickerTag}>
                  {t}
                  <button
                    className={styles.tickerRemove}
                    onClick={() => removeTicker(t)}
                    aria-label={`Remove ${t}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className={styles.tickerSearchWrapper} ref={searchWrapperRef}>
              <div className={styles.tickerInputRow}>
                <Search size={14} className={styles.tickerSearchIcon} />
                <input
                  type="text"
                  className={styles.tickerInput}
                  value={tickerInput}
                  onChange={handleSearchInput}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={() => tickerInput.trim() && setShowDropdown(true)}
                  placeholder="Search stocks..."
                />
              </div>
              {showDropdown && tickerInput.trim() && (
                <div className={styles.tickerDropdown}>
                  {searchResults.length > 0 ? (
                    searchResults.map((entry, i) => (
                      <button
                        key={entry.symbol}
                        className={`${styles.tickerDropdownItem} ${i === highlightedIndex ? styles.tickerDropdownItemHighlighted : ""}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          addTicker(entry.symbol);
                        }}
                        onMouseEnter={() => setHighlightedIndex(i)}
                      >
                        <span className={styles.tickerDropdownSymbol}>
                          {entry.symbol}
                        </span>
                        <span className={styles.tickerDropdownName}>
                          {entry.name}
                        </span>
                        <Plus size={14} className={styles.tickerDropdownAdd} />
                      </button>
                    ))
                  ) : (
                    <div className={styles.tickerDropdownEmpty}>
                      No matches found
                    </div>
                  )}
                </div>
              )}
            </div>
            {tickers.length < 2 && (
              <span className={styles.fieldHint}>
                Minimum 2 tickers required
              </span>
            )}
          </section>

          {/* Date Range */}
          <section className={styles.configSection}>
            <h3 className={styles.sectionTitle}>Date Range</h3>
            <div className={styles.dateRow}>
              <div className={styles.dateField}>
                <label className={styles.dateLabel}>From</label>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={startDate}
                  onChange={(e) => setDateRange(e.target.value, endDate)}
                />
              </div>
              <div className={styles.dateField}>
                <label className={styles.dateLabel}>To</label>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={endDate}
                  onChange={(e) => setDateRange(startDate, e.target.value)}
                />
              </div>
            </div>
            <span className={styles.fieldHint}>
              Leave empty for last 1 year
            </span>
          </section>

          {/* Parameters */}
          <section className={styles.configSection}>
            <div className={styles.sectionTitleRow}>
              <h3 className={styles.sectionTitle}>Parameters</h3>
              <button className={styles.resetLink} onClick={resetParams}>
                Reset
              </button>
            </div>
            <div className={styles.paramGroup}>
              <Slider
                label={PARAM_RANGES.alpha_1.label}
                value={alpha1}
                onChange={setAlpha1}
                min={PARAM_RANGES.alpha_1.min}
                max={PARAM_RANGES.alpha_1.max}
                step={PARAM_RANGES.alpha_1.step}
                formatValue={(v) => v.toFixed(2)}
                size="sm"
              />
            </div>
            <div className={styles.paramGroup}>
              <Slider
                label={PARAM_RANGES.alpha_2.label}
                value={alpha2}
                onChange={setAlpha2}
                min={PARAM_RANGES.alpha_2.min}
                max={PARAM_RANGES.alpha_2.max}
                step={PARAM_RANGES.alpha_2.step}
                formatValue={(v) => v.toFixed(2)}
                size="sm"
              />
            </div>
            <div className={styles.paramGroup}>
              <Slider
                label={PARAM_RANGES.beta.label}
                value={beta}
                onChange={setBeta}
                min={PARAM_RANGES.beta.min}
                max={PARAM_RANGES.beta.max}
                step={PARAM_RANGES.beta.step}
                formatValue={(v) => v.toFixed(4)}
                size="sm"
              />
            </div>
          </section>

          {/* Benchmark */}
          <section className={styles.configSection}>
            <h3 className={styles.sectionTitle}>Benchmark</h3>
            <div className={styles.benchmarkPresets}>
              {BENCHMARK_PRESETS.map((sym) => (
                <button
                  key={sym}
                  className={`${styles.benchmarkBtn} ${benchmarkSymbol === sym ? styles.benchmarkBtnActive : ""}`}
                  onClick={() => setBenchmarkSymbol(sym)}
                >
                  {sym}
                </button>
              ))}
            </div>
          </section>

          {/* Capital */}
          <section className={styles.configSection}>
            <h3 className={styles.sectionTitle}>Investment Capital</h3>
            <div className={styles.capitalInputWrapper}>
              <span className={styles.capitalCurrency}>USD</span>
              <input
                type="number"
                className={styles.capitalInput}
                value={investmentCapital}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0) setInvestmentCapital(val);
                }}
                min={1000}
                step={10000}
              />
            </div>
          </section>
        </aside>

        {/* Right: Results */}
        <main className={styles.resultsPanel}>
          {!hasResults && !isLoading && (
            <div className={styles.emptyState}>
              <Activity size={48} strokeWidth={1} />
              <p className={styles.emptyTitle}>Configure & Run</p>
              <p className={styles.emptyDesc}>
                Set your tickers, adjust parameters, and click Run Analysis to
                see optimization results.
              </p>
            </div>
          )}

          {isLoading && (
            <div className={styles.loadingState}>
              <RefreshCw size={32} className={styles.spinner} />
              <p>Running optimization...</p>
              <p className={styles.loadingHint}>
                Fetching market data and optimizing portfolio
              </p>
            </div>
          )}

          {hasResults && !isLoading && metrics && (
            <>
              {/* ── BASIC TAB ── */}
              {activeTab === "basic" && (
                <>
                  {/* Performance Chart */}
                  <section className={styles.resultSection}>
                    <h3 className={styles.resultSectionTitle}>
                      <BarChart3 size={16} />
                      Cumulative Returns
                    </h3>
                    <div className={styles.chartContainer}>
                      <LineChart
                        data={chartData}
                        height={isMobile ? 250 : 320}
                        enableArea
                        areaOpacity={0.15}
                        smooth
                        showDataZoom={!isMobile}
                        formatValue={(v) => `${v.toFixed(1)}%`}
                      />
                    </div>
                  </section>

                  {/* Metrics */}
                  <section className={styles.resultSection}>
                    <div className={styles.metricsGrid}>
                      <MetricCard
                        title="Expected Return"
                        value={metrics.annualizedReturn.toFixed(2)}
                        suffix="%"
                        format="custom"
                        size="sm"
                        variant="glass"
                        glassPreset={
                          metrics.annualizedReturn >= 0 ? "success" : "error"
                        }
                        icon={<TrendingUp size={16} />}
                        trend={
                          metrics.annualizedReturn >= 0
                            ? {
                                value: metrics.annualizedReturn,
                                direction: "up",
                                label: "annualized",
                              }
                            : {
                                value: metrics.annualizedReturn,
                                direction: "down",
                                label: "annualized",
                                sentiment: "negative",
                              }
                        }
                      />
                      <MetricCard
                        title="Volatility"
                        value={metrics.annualizedVol.toFixed(2)}
                        suffix="%"
                        format="custom"
                        size="sm"
                        variant="glass"
                        glassPreset="warning"
                        icon={<Zap size={16} />}
                      />
                      <MetricCard
                        title="Sharpe Ratio"
                        value={metrics.sharpe.toFixed(3)}
                        format="custom"
                        size="sm"
                        variant="glass"
                        glassPreset={
                          metrics.sharpe >= 1
                            ? "success"
                            : metrics.sharpe >= 0
                              ? "neutral"
                              : "error"
                        }
                        icon={<Target size={16} />}
                      />
                      {metrics.alpha !== null && (
                        <MetricCard
                          title="Alpha vs Benchmark"
                          value={metrics.alpha.toFixed(2)}
                          suffix="%"
                          format="custom"
                          size="sm"
                          variant="glass"
                          glassPreset={metrics.alpha >= 0 ? "success" : "error"}
                          icon={
                            metrics.alpha >= 0 ? (
                              <TrendingUp size={16} />
                            ) : (
                              <TrendingDown size={16} />
                            )
                          }
                          trend={
                            metrics.alpha >= 0
                              ? {
                                  value: parseFloat(metrics.alpha.toFixed(2)),
                                  direction: "up",
                                  label: `vs ${benchmarkSymbol}`,
                                }
                              : {
                                  value: parseFloat(metrics.alpha.toFixed(2)),
                                  direction: "down",
                                  label: `vs ${benchmarkSymbol}`,
                                  sentiment: "negative",
                                }
                          }
                        />
                      )}
                    </div>
                  </section>

                  {/* Allocation */}
                  <section className={styles.resultSection}>
                    <h3 className={styles.resultSectionTitle}>
                      <PieChartIcon size={16} />
                      Optimal Allocation
                    </h3>
                    <div className={styles.allocationLayout}>
                      <div className={styles.pieContainer}>
                        <PieChart
                          data={weightData}
                          height={isMobile ? 220 : 260}
                          variant="donut"
                          showLabels={false}
                          showLegend={false}
                          centerLabel="Weights"
                          centerValue={`${weightData.length}`}
                        />
                      </div>
                      <div className={styles.weightsList}>
                        {weightData.map((w) => (
                          <div key={w.name} className={styles.weightItem}>
                            <span className={styles.weightTicker}>
                              {w.name}
                            </span>
                            <div className={styles.weightBar}>
                              <div
                                className={styles.weightBarFill}
                                style={{ width: `${w.value}%` }}
                              />
                            </div>
                            <span className={styles.weightValue}>
                              {w.value.toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Orders Table */}
                  {orders.length > 0 && (
                    <section className={styles.resultSection}>
                      <h3 className={styles.resultSectionTitle}>
                        <ArrowRightLeft size={16} />
                        Orders
                      </h3>
                      <div className={styles.ordersTable}>
                        <div className={styles.ordersHeader}>
                          <span>Ticker</span>
                          <span>Action</span>
                          <span>Qty</span>
                          <span>Value</span>
                        </div>
                        {orders.map((o) => (
                          <div
                            key={o.ticker}
                            className={styles.ordersRow}
                            data-action={o.action}
                          >
                            <span className={styles.orderTicker}>
                              {o.ticker}
                            </span>
                            <span className={styles.orderAction}>
                              {o.action}
                            </span>
                            <span className={styles.orderQty}>
                              {o.targetQty}
                            </span>
                            <span className={styles.orderValue}>
                              ${o.estimatedValue.toLocaleString()}
                            </span>
                          </div>
                        ))}
                        <div className={styles.ordersFooter}>
                          <span>
                            <DollarSign size={12} />
                            Total: ${ordersSummary.totalBuy.toLocaleString()}
                          </span>
                          <span>
                            Remaining: $
                            {(
                              investmentCapital - ordersSummary.totalBuy
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Convergence info */}
                  <section className={styles.resultSection}>
                    <div className={styles.infoRow}>
                      <div className={styles.infoBadge}>
                        {metrics.converged ? (
                          <CheckCircle
                            size={14}
                            className={styles.convergedIcon}
                          />
                        ) : (
                          <XCircle
                            size={14}
                            className={styles.notConvergedIcon}
                          />
                        )}
                        <span>
                          {metrics.converged ? "Converged" : "Not Converged"}
                        </span>
                      </div>
                      <div className={styles.infoBadge}>
                        <Activity size={14} />
                        <span>{metrics.iterations} iterations</span>
                      </div>
                      <div className={styles.infoBadge}>
                        <Clock size={14} />
                        <span>
                          {(
                            ((activeResult || optimizeResult)
                              ?.execution_time_ms ?? 0) / 1000
                          ).toFixed(1)}
                          s
                        </span>
                      </div>
                      <div className={styles.infoBadge}>
                        <span className={styles.utilityLabel}>Utility:</span>
                        <span className={styles.utilityValue}>
                          {metrics.utility.toExponential(4)}
                        </span>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {/* ── PRO TAB ── */}
              {activeTab === "pro" && (
                <>
                  {/* Market Scan trigger */}
                  {!marketScanResult && (
                    <section className={styles.resultSection}>
                      <div className={styles.scanPrompt}>
                        <Radar size={32} strokeWidth={1} />
                        <h3>Market Scan</h3>
                        <p>
                          Scan the full market to find opportunities and
                          identify underperforming holdings.
                        </p>
                        <Button
                          variant="primary"
                          onClick={runMarketScan}
                          disabled={isScanning || backendAvailable === false}
                          icon={
                            isScanning ? (
                              <RefreshCw size={16} className={styles.spinner} />
                            ) : (
                              <Radar size={16} />
                            )
                          }
                        >
                          {isScanning ? "Scanning..." : "Run Market Scan"}
                        </Button>
                      </div>
                    </section>
                  )}

                  {/* Scan results */}
                  {marketScanResult && (
                    <>
                      {/* Opportunities */}
                      <section className={styles.resultSection}>
                        <h3 className={styles.resultSectionTitle}>
                          <TrendingUp size={16} />
                          Opportunities (Add to Portfolio)
                        </h3>
                        <div className={styles.scanList}>
                          {marketScanResult.opportunities.map((opp) => (
                            <button
                              key={opp.ticker}
                              className={`${styles.scanItem} ${selectedOpportunities.includes(opp.ticker) ? styles.scanItemSelected : ""}`}
                              onClick={() => toggleOpportunity(opp.ticker)}
                            >
                              {selectedOpportunities.includes(opp.ticker) ? (
                                <CheckSquare
                                  size={16}
                                  className={styles.scanCheckActive}
                                />
                              ) : (
                                <Square
                                  size={16}
                                  className={styles.scanCheck}
                                />
                              )}
                              <span className={styles.scanTicker}>
                                {opp.ticker}
                              </span>
                              <span className={styles.scanScore}>
                                Score: {(opp.utilityScore * 100).toFixed(1)}%
                              </span>
                            </button>
                          ))}
                          {marketScanResult.opportunities.length === 0 && (
                            <p className={styles.scanEmpty}>
                              No strong opportunities found outside your current
                              holdings.
                            </p>
                          )}
                        </div>
                      </section>

                      {/* Rotation warnings */}
                      <section className={styles.resultSection}>
                        <h3 className={styles.resultSectionTitle}>
                          <TrendingDown size={16} />
                          Rotation (Consider Removing)
                        </h3>
                        <div className={styles.scanList}>
                          {marketScanResult.warnings.map((warn) => (
                            <button
                              key={warn.ticker}
                              className={`${styles.scanItem} ${styles.scanItemWarn} ${acceptedExits.includes(warn.ticker) ? styles.scanItemSelected : ""}`}
                              onClick={() => toggleExit(warn.ticker)}
                            >
                              {acceptedExits.includes(warn.ticker) ? (
                                <CheckSquare
                                  size={16}
                                  className={styles.scanCheckWarn}
                                />
                              ) : (
                                <Square
                                  size={16}
                                  className={styles.scanCheck}
                                />
                              )}
                              <span className={styles.scanTicker}>
                                {warn.ticker}
                              </span>
                              <span className={styles.scanScore}>
                                Score: {(warn.utilityScore * 100).toFixed(1)}%
                              </span>
                            </button>
                          ))}
                          {marketScanResult.warnings.length === 0 && (
                            <p className={styles.scanEmpty}>
                              All your holdings look healthy.
                            </p>
                          )}
                        </div>
                      </section>

                      {/* Recalculate */}
                      {(selectedOpportunities.length > 0 ||
                        acceptedExits.length > 0) && (
                        <section className={styles.resultSection}>
                          <div className={styles.recalcBar}>
                            <div className={styles.recalcInfo}>
                              <span>
                                +{selectedOpportunities.length} added, -
                                {acceptedExits.length} removed
                              </span>
                            </div>
                            <Button
                              variant="primary"
                              onClick={recalculateWithSelections}
                              disabled={isRecalculating}
                              icon={
                                isRecalculating ? (
                                  <RefreshCw
                                    size={16}
                                    className={styles.spinner}
                                  />
                                ) : (
                                  <RefreshCw size={16} />
                                )
                              }
                            >
                              {isRecalculating
                                ? "Recalculating..."
                                : "Recalculate"}
                            </Button>
                          </div>
                        </section>
                      )}

                      {/* Recalculated results */}
                      {recalculatedResult && (
                        <>
                          <section className={styles.resultSection}>
                            <h3 className={styles.resultSectionTitle}>
                              <BarChart3 size={16} />
                              Updated Performance
                            </h3>
                            <div className={styles.chartContainer}>
                              <LineChart
                                data={chartData}
                                height={isMobile ? 250 : 300}
                                enableArea
                                areaOpacity={0.15}
                                smooth
                                showDataZoom={false}
                                formatValue={(v) => `${v.toFixed(1)}%`}
                              />
                            </div>
                          </section>

                          <section className={styles.resultSection}>
                            <h3 className={styles.resultSectionTitle}>
                              <PieChartIcon size={16} />
                              Updated Allocation
                            </h3>
                            <div className={styles.allocationLayout}>
                              <div className={styles.pieContainer}>
                                <PieChart
                                  data={weightData}
                                  height={isMobile ? 220 : 260}
                                  variant="donut"
                                  showLabels={false}
                                  showLegend={false}
                                  centerLabel="New"
                                  centerValue={`${weightData.length}`}
                                />
                              </div>
                              <div className={styles.weightsList}>
                                {weightData.map((w) => (
                                  <div
                                    key={w.name}
                                    className={styles.weightItem}
                                  >
                                    <span className={styles.weightTicker}>
                                      {w.name}
                                    </span>
                                    <div className={styles.weightBar}>
                                      <div
                                        className={styles.weightBarFill}
                                        style={{ width: `${w.value}%` }}
                                      />
                                    </div>
                                    <span className={styles.weightValue}>
                                      {w.value.toFixed(1)}%
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </section>

                          {/* Updated Orders */}
                          {orders.length > 0 && (
                            <section className={styles.resultSection}>
                              <h3 className={styles.resultSectionTitle}>
                                <ArrowRightLeft size={16} />
                                Updated Orders
                              </h3>
                              <div className={styles.ordersTable}>
                                <div className={styles.ordersHeader}>
                                  <span>Ticker</span>
                                  <span>Action</span>
                                  <span>Qty</span>
                                  <span>Value</span>
                                </div>
                                {orders.map((o) => (
                                  <div
                                    key={o.ticker}
                                    className={styles.ordersRow}
                                    data-action={o.action}
                                  >
                                    <span className={styles.orderTicker}>
                                      {o.ticker}
                                    </span>
                                    <span className={styles.orderAction}>
                                      {o.action}
                                    </span>
                                    <span className={styles.orderQty}>
                                      {o.targetQty}
                                    </span>
                                    <span className={styles.orderValue}>
                                      ${o.estimatedValue.toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </section>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
