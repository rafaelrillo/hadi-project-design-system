// Path: src/components/organisms/sentinel/index.ts
// ═══════════════════════════════════════════════════════════════════════════════
// SENTINEL CORE COMPONENTS
//
// The nucleus of the SENTINEL design system - these components represent
// the most critical information hierarchy of the application.
// ═══════════════════════════════════════════════════════════════════════════════

// MarketStateIndicator - Current market outlook (bullish/bearish/neutral/uncertain)
export { MarketStateIndicator } from './MarketStateIndicator';
export type { MarketStateIndicatorProps, MarketState } from './MarketStateIndicator';

// RiskGauge - Systemic risk level indicator
export { RiskGauge } from './RiskGauge';
export type { RiskGaugeProps, RiskLevel } from './RiskGauge';

// ConfidenceLevel - System analysis confidence indicator
export { ConfidenceLevel } from './ConfidenceLevel';
export type { ConfidenceLevelProps, ConfidenceLevelType } from './ConfidenceLevel';

// SystemPulse - System operational status ("alive" indicator)
export { SystemPulse } from './SystemPulse';
export type { SystemPulseProps, SystemStatus } from './SystemPulse';

// ═══════════════════════════════════════════════════════════════════════════════
// LEVEL 4 - DEPTH COMPONENTS
//
// Detailed analysis components for deep exploration of data
// ═══════════════════════════════════════════════════════════════════════════════

// HistoricalDetailView - Expanded historical analysis with timeline
export { HistoricalDetailView } from './HistoricalDetailView';
export type {
  HistoricalDetailViewProps,
  HistoricalPeriodDetail,
  HistoricalEvent,
  HistoricalDataPoint,
} from './HistoricalDetailView';

// PeriodComparison - Side-by-side period comparison table
export { PeriodComparison } from './PeriodComparison';
export type {
  PeriodComparisonProps,
  ComparisonPeriod,
  PeriodMetric,
} from './PeriodComparison';

// ModelInsights - Technical model details and methodology
export { ModelInsights } from './ModelInsights';
export type {
  ModelInsightsProps,
  ModelInput,
  ModelOutput,
  ModelVersion,
  ModelMetadata,
} from './ModelInsights';

// CorrelationMatrix - Asset correlation heatmap
export { CorrelationMatrix } from './CorrelationMatrix';
export type {
  CorrelationMatrixProps,
  CorrelationPair,
  MatrixItem,
} from './CorrelationMatrix';

// PerformanceChart - Historical performance visualization
export { PerformanceChart } from './PerformanceChart';
export type {
  PerformanceChartProps,
  PerformanceSeries,
  DataPoint,
  PerformanceMetric,
  TimeRange,
} from './PerformanceChart';

// BacktestResults - Backtesting results display
export { BacktestResults } from './BacktestResults';
export type {
  BacktestResultsProps,
  BacktestSummary,
  BacktestStatistic,
  BacktestTrade,
} from './BacktestResults';
