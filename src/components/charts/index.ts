// Path: src/components/charts/index.ts
// ═══════════════════════════════════════════════════════════════════════════════
// CHART COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// ECHARTS - Primary Chart Library
// Full-featured charts with SENTINEL theme integration
// ─────────────────────────────────────────────────────────────────────────────

// Re-export everything from echarts (prefixed exports available)
export * from './echarts';

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTWEIGHT CHARTS - TradingView Financial Charts (Legacy)
// Specialized financial charts - being phased out in favor of ECharts
// ─────────────────────────────────────────────────────────────────────────────

// Base Chart Wrapper (Lightweight Charts)
export * from './LightweightChart';

// SENTINEL Financial Charts (Legacy - use ECharts CandlestickChart instead)
// Re-export FinancialLineChart with renamed SeriesData type to avoid conflict with ECharts SeriesData
export { FinancialLineChart } from './FinancialLineChart';
export type { FinancialLineChartProps, SeriesData as LWSeriesData } from './FinancialLineChart';
// Rename to avoid conflict with ECharts CandlestickChart
export { CandlestickChart as LWCandlestickChart } from './CandlestickChart';
export type { CandlestickChartProps as LWCandlestickChartProps } from './CandlestickChart';
export * from './BaselineChart';
export * from './HistogramChart';
// BarChart exports OHLCData too, so we explicitly export to avoid conflict
export { BarChart as LWBarChart } from './BarChart';
export type { BarChartProps as LWBarChartProps } from './BarChart';

// Stats and Info
export * from './StatCard';

// Theme - SENTINEL tokens for Lightweight Charts
export {
  // Main theme
  chartTheme,
  sentinelChartTheme,
  sentinelChartColors,
  sentinelColors as lwSentinelColors,
  // Color schemes
  sentinelSequentialColors,
  sentinelDivergingColors,
  sentinelRiskColors,
  sentinelMarketColors,
  // Series options
  lineSeriesOptions,
  areaSeriesOptions,
  candlestickSeriesOptions,
  histogramSeriesOptions,
  // Helpers
  getAreaSeriesOptions,
  getLineSeriesOptions,
  formatFinancialValue,
  // Backwards compatibility
  terminalChartTheme,
  terminalChartColors,
} from './theme';
