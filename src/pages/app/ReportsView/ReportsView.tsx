// Path: src/pages/app/ReportsView/ReportsView.tsx

import { useEffect, useMemo, useCallback, useRef } from "react";
import {
  Activity,
  AlertCircle,
  RefreshCw,
  FileText,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Layers,
  Eye,
  Plus,
  X,
  Search,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { MetricCard } from "@/components/molecules/MetricCard";
import { LineChart } from "@/components/charts/echarts/LineChart";
import { PieChart } from "@/components/charts/echarts/PieChart";
import { HeatMap } from "@/components/charts/echarts/HeatMap";
import { useReportStore } from "@/store/reportStore";
import { searchTickers } from "@/services/hadi";
import { useIsMobile } from "@/hooks/useBreakpoint";
import { useState } from "react";
import type {
  SeriesData,
  PieDataPoint,
  HeatMapDataPoint,
} from "@/components/charts/echarts/types";
import styles from "./ReportsView.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const PORTFOLIO_COLOR = "#3A6A72";
const SPY_COLOR = "#9CA3AF";
const QQQ_COLOR = "#6B7280";
const PROJECTION_BASE_COLOR = "#3A6A72";

const SECTIONS = [
  { id: "pulse" as const, label: "Pulse", icon: Activity },
  { id: "market" as const, label: "Market Race", icon: BarChart3 },
  { id: "engine" as const, label: "Engine", icon: Layers },
  { id: "harvest" as const, label: "Harvest", icon: Eye },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function ReportsView() {
  const isMobile = useIsMobile();
  const [tickerInput, setTickerInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const {
    tickers,
    optimizeResult,
    benchmarks,
    metrics,
    correlationMatrix,
    projection,
    isGenerating,
    backendAvailable,
    error,
    activeSection,
    setTickers,
    setActiveSection,
    generateReport,
    checkBackend,
  } = useReportStore();

  const hasResults = metrics !== null;

  useEffect(() => {
    checkBackend();
  }, [checkBackend]);

  // ── Ticker management ─────────────────────────────────────────────────

  const searchResults = useMemo(
    () => (tickerInput.trim() ? searchTickers(tickerInput, tickers) : []),
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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Chart data ────────────────────────────────────────────────────────

  // Section 1: Portfolio evolution
  const portfolioChartData = useMemo<SeriesData[]>(() => {
    if (!optimizeResult) return [];
    return [
      {
        id: "portfolio",
        name: "Portfolio (Nominal)",
        color: PORTFOLIO_COLOR,
        data: optimizeResult.dates.map((d, i) => ({
          x: d,
          y: optimizeResult.cumulative_returns[i] * 100,
        })),
      },
    ];
  }, [optimizeResult]);

  // Section 1: Weight allocation
  const allocationData = useMemo<PieDataPoint[]>(() => {
    if (!optimizeResult) return [];
    return Object.entries(optimizeResult.optimized_weights)
      .filter(([, w]) => w > 0.001)
      .map(([ticker, weight]) => ({
        name: ticker,
        value: parseFloat((weight * 100).toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);
  }, [optimizeResult]);

  // Section 2: Benchmark comparison chart
  const benchmarkChartData = useMemo<SeriesData[]>(() => {
    if (!optimizeResult) return [];

    const series: SeriesData[] = [
      {
        id: "portfolio",
        name: "Portfolio",
        color: PORTFOLIO_COLOR,
        data: optimizeResult.dates.map((d, i) => ({
          x: d,
          y: optimizeResult.cumulative_returns[i] * 100,
        })),
      },
    ];

    const colors = [SPY_COLOR, QQQ_COLOR];
    benchmarks.forEach((bm, idx) => {
      series.push({
        id: bm.symbol,
        name: bm.symbol,
        color: colors[idx] || "#999",
        data: bm.dates.map((d, i) => ({
          x: d,
          y: bm.cumulativeReturns[i] * 100,
        })),
      });
    });

    return series;
  }, [optimizeResult, benchmarks]);

  // Section 3: Heatmap data
  const heatmapData = useMemo<{
    data: HeatMapDataPoint[];
    xCategories: string[];
    yCategories: string[];
  }>(() => {
    if (!correlationMatrix)
      return { data: [], xCategories: [], yCategories: [] };

    const { labels, matrix } = correlationMatrix;
    const data: HeatMapDataPoint[] = [];

    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < labels.length; j++) {
        data.push({
          x: labels[j],
          y: labels[i],
          value: parseFloat(matrix[i][j].toFixed(2)),
        });
      }
    }

    return { data, xCategories: labels, yCategories: labels };
  }, [correlationMatrix]);

  // Section 4: Monte Carlo projection
  const projectionChartData = useMemo<SeriesData[]>(() => {
    if (!projection) return [];
    return [
      {
        id: "optimistic",
        name: "Optimistic (95%)",
        color: "rgba(74, 122, 106, 0.4)",
        data: projection.dates.map((d, i) => ({
          x: d,
          y: projection.optimistic[i],
        })),
      },
      {
        id: "base",
        name: "Base (Expected)",
        color: PROJECTION_BASE_COLOR,
        data: projection.dates.map((d, i) => ({
          x: d,
          y: projection.base[i],
        })),
      },
      {
        id: "pessimistic",
        name: "Pessimistic (95%)",
        color: "rgba(138, 90, 74, 0.4)",
        data: projection.dates.map((d, i) => ({
          x: d,
          y: projection.pessimistic[i],
        })),
      },
    ];
  }, [projection]);

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.pageTitle}>Reports</h2>
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
          <Button
            variant="primary"
            onClick={generateReport}
            disabled={
              isGenerating || tickers.length < 2 || backendAvailable === false
            }
            icon={
              isGenerating ? (
                <RefreshCw size={16} className={styles.spinner} />
              ) : (
                <FileText size={16} />
              )
            }
          >
            {isGenerating ? "Generating..." : "Generate Report"}
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

      {/* Ticker config (always visible) */}
      <div className={styles.tickerBar}>
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
              onChange={(e) => {
                setTickerInput(e.target.value.toUpperCase());
                setShowDropdown(true);
                setHighlightedIndex(-1);
              }}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => tickerInput.trim() && setShowDropdown(true)}
              placeholder="Add ticker..."
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
                <div className={styles.tickerDropdownEmpty}>No matches</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Section nav tabs */}
      {hasResults && (
        <div className={styles.sectionNav}>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`${styles.sectionTab} ${activeSection === s.id ? styles.sectionTabActive : ""}`}
              onClick={() => setActiveSection(s.id)}
            >
              <s.icon size={14} />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {!hasResults && !isGenerating && (
        <div className={styles.emptyState}>
          <FileText size={48} strokeWidth={1} />
          <p className={styles.emptyTitle}>Investment Report</p>
          <p className={styles.emptyDesc}>
            Select your portfolio tickers and generate a comprehensive
            performance report with benchmarking, risk analysis, and
            projections.
          </p>
        </div>
      )}

      {isGenerating && (
        <div className={styles.loadingState}>
          <RefreshCw size={32} className={styles.spinner} />
          <p>Generating report...</p>
          <p className={styles.loadingHint}>
            Fetching market data and computing metrics
          </p>
        </div>
      )}

      {hasResults && !isGenerating && (
        <div className={styles.reportContent}>
          {/* ── Section 1: The Pulse ── */}
          {activeSection === "pulse" && metrics && (
            <>
              <section className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>
                  <Activity size={16} />
                  Executive Summary
                </h3>
                <div className={styles.metricsGrid}>
                  <MetricCard
                    title="Portfolio Value"
                    value={`$${Math.round(metrics.portfolioValue * (1 + metrics.totalReturn / 100)).toLocaleString()}`}
                    format="custom"
                    size="sm"
                    variant="glass"
                    glassPreset="neutral"
                    icon={<Target size={16} />}
                  />
                  <MetricCard
                    title="Total Return (TWR)"
                    value={metrics.totalReturn.toFixed(2)}
                    suffix="%"
                    format="custom"
                    size="sm"
                    variant="glass"
                    glassPreset={metrics.totalReturn >= 0 ? "success" : "error"}
                    icon={<TrendingUp size={16} />}
                    trend={{
                      value: parseFloat(metrics.totalReturn.toFixed(2)),
                      direction: metrics.totalReturn >= 0 ? "up" : "down",
                      label: "period",
                    }}
                  />
                  <MetricCard
                    title="Real Return"
                    value={metrics.realReturn.toFixed(2)}
                    suffix="%"
                    format="custom"
                    size="sm"
                    variant="glass"
                    glassPreset={metrics.realReturn >= 0 ? "success" : "error"}
                    icon={
                      metrics.realReturn >= 0 ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )
                    }
                  />
                  <MetricCard
                    title="Sharpe Ratio"
                    value={metrics.sharpe.toFixed(3)}
                    format="custom"
                    size="sm"
                    variant="glass"
                    glassPreset={metrics.sharpe >= 1 ? "success" : "neutral"}
                    icon={<Target size={16} />}
                  />
                </div>
              </section>

              <section className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>
                  <BarChart3 size={16} />
                  Portfolio Evolution
                </h3>
                <div className={styles.chartContainer}>
                  <LineChart
                    data={portfolioChartData}
                    height={isMobile ? 250 : 320}
                    enableArea
                    areaOpacity={0.15}
                    smooth={false}
                    showDataZoom={!isMobile}
                    formatValue={(v) => `${v.toFixed(1)}%`}
                  />
                </div>
              </section>

              <section className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>
                  <PieChartIcon size={16} />
                  Top Holdings
                </h3>
                <div className={styles.holdingsLayout}>
                  <div className={styles.holdingsPie}>
                    <PieChart
                      data={allocationData}
                      height={isMobile ? 200 : 240}
                      variant="donut"
                      showLabels={false}
                      showLegend={false}
                      centerLabel="Holdings"
                      centerValue={`${allocationData.length}`}
                    />
                  </div>
                  <div className={styles.holdingsTable}>
                    {allocationData.slice(0, 10).map((item, idx) => (
                      <div key={item.name} className={styles.holdingRow}>
                        <span className={styles.holdingRank}>{idx + 1}</span>
                        <span className={styles.holdingTicker}>
                          {item.name}
                        </span>
                        <div className={styles.holdingBar}>
                          <div
                            className={styles.holdingBarFill}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                        <span className={styles.holdingWeight}>
                          {item.value.toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ── Section 2: The Market Race ── */}
          {activeSection === "market" && metrics && (
            <>
              <section className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>
                  <BarChart3 size={16} />
                  Relative Performance
                </h3>
                <div className={styles.chartContainer}>
                  <LineChart
                    data={benchmarkChartData}
                    height={isMobile ? 250 : 340}
                    enableArea={false}
                    smooth={false}
                    showDataZoom={!isMobile}
                    formatValue={(v) => `${v.toFixed(1)}%`}
                  />
                </div>
              </section>

              <section className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Performance Comparison</h3>
                <div className={styles.comparisonTable}>
                  <div className={styles.compTableHeader}>
                    <span>Benchmark</span>
                    <span>Return</span>
                    <span>Spread</span>
                    <span>Status</span>
                  </div>
                  <div className={styles.compTableRow}>
                    <span className={styles.compTicker}>Portfolio</span>
                    <span className={styles.compValue}>
                      {metrics.totalReturn.toFixed(2)}%
                    </span>
                    <span className={styles.compValue}>-</span>
                    <span className={styles.compBadge} data-status="neutral">
                      Base
                    </span>
                  </div>
                  {benchmarks.map((bm) => (
                    <div key={bm.symbol} className={styles.compTableRow}>
                      <span className={styles.compTicker}>{bm.symbol}</span>
                      <span className={styles.compValue}>
                        {bm.totalReturn.toFixed(2)}%
                      </span>
                      <span
                        className={styles.compValue}
                        data-positive={bm.spread >= 0}
                      >
                        {bm.spread >= 0 ? "+" : ""}
                        {bm.spread.toFixed(2)}%
                      </span>
                      <span
                        className={styles.compBadge}
                        data-status={bm.beat ? "beat" : "behind"}
                      >
                        {bm.beat ? "Beat" : "Behind"}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.reportSection}>
                <div className={styles.metricsGrid}>
                  <MetricCard
                    title="Beta vs S&P 500"
                    value={metrics.beta.toFixed(2)}
                    format="custom"
                    size="sm"
                    variant="glass"
                    glassPreset={metrics.beta > 1 ? "warning" : "neutral"}
                    icon={<Zap size={16} />}
                  />
                  <MetricCard
                    title="Max Drawdown"
                    value={metrics.maxDrawdown.toFixed(2)}
                    suffix="%"
                    format="custom"
                    size="sm"
                    variant="glass"
                    glassPreset="error"
                    icon={<TrendingDown size={16} />}
                  />
                  <MetricCard
                    title="Volatility"
                    value={metrics.annualizedVolatility.toFixed(2)}
                    suffix="%"
                    format="custom"
                    size="sm"
                    variant="glass"
                    glassPreset="warning"
                    icon={<Zap size={16} />}
                  />
                </div>
              </section>
            </>
          )}

          {/* ── Section 3: The Engine ── */}
          {activeSection === "engine" && (
            <>
              <section className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>
                  <PieChartIcon size={16} />
                  Asset Distribution
                </h3>
                <div className={styles.sunburstContainer}>
                  <PieChart
                    data={allocationData}
                    height={isMobile ? 280 : 360}
                    variant="donut"
                    showLabels
                    showLegend
                    centerLabel="Portfolio"
                    centerValue={`${allocationData.length} assets`}
                  />
                </div>
              </section>

              {correlationMatrix && heatmapData.data.length > 0 && (
                <section className={styles.reportSection}>
                  <h3 className={styles.sectionTitle}>
                    <Layers size={16} />
                    Correlation Matrix
                  </h3>
                  <div className={styles.heatmapContainer}>
                    <HeatMap
                      data={heatmapData.data}
                      xCategories={heatmapData.xCategories}
                      yCategories={heatmapData.yCategories}
                      height={isMobile ? 300 : 420}
                      colorScheme="diverging"
                      showValues
                      minValue={-1}
                      maxValue={1}
                      formatValue={(v) => v.toFixed(2)}
                    />
                  </div>
                  <p className={styles.insightText}>
                    Red cells indicate high correlation (concentration risk).
                    Green cells indicate low or negative correlation (good
                    diversification).
                  </p>
                </section>
              )}
            </>
          )}

          {/* ── Section 4: The Harvest ── */}
          {activeSection === "harvest" && projection && (
            <>
              <section className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>
                  <Eye size={16} />
                  12-Month Projection (Monte Carlo GBM)
                </h3>
                <div className={styles.chartContainer}>
                  <LineChart
                    data={projectionChartData}
                    height={isMobile ? 260 : 340}
                    enableArea
                    areaOpacity={0.1}
                    smooth={false}
                    showDataZoom={false}
                    formatValue={(v) => `$${Math.round(v).toLocaleString()}`}
                  />
                </div>
              </section>

              <section className={styles.reportSection}>
                <h3 className={styles.sectionTitle}>Projection Summary</h3>
                <div className={styles.projectionTable}>
                  <div className={styles.projTableHeader}>
                    <span>Scenario</span>
                    <span>3 Months</span>
                    <span>6 Months</span>
                    <span>12 Months</span>
                  </div>
                  {[
                    {
                      label: "Optimistic",
                      data: projection.optimistic,
                      cls: styles.projOptimistic,
                    },
                    {
                      label: "Base",
                      data: projection.base,
                      cls: styles.projBase,
                    },
                    {
                      label: "Pessimistic",
                      data: projection.pessimistic,
                      cls: styles.projPessimistic,
                    },
                  ].map((row) => (
                    <div key={row.label} className={styles.projTableRow}>
                      <span className={row.cls}>{row.label}</span>
                      <span>
                        ${Math.round(row.data[3] || 0).toLocaleString()}
                      </span>
                      <span>
                        ${Math.round(row.data[6] || 0).toLocaleString()}
                      </span>
                      <span>
                        ${Math.round(row.data[12] || 0).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
}
