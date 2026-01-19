// Path: src/components/charts/echarts/index.ts

// ─────────────────────────────────────────────────────────────────────────────
// THEME & UTILS
// ─────────────────────────────────────────────────────────────────────────────

export {
  fingColors,
  chartPalette,
  sequentialColors,
  divergingColors,
  riskColors,
  fingEChartsTheme,
  tooltipFormatters,
  animationPresets,
} from './fingTheme';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type {
  BaseChartProps,
  OHLCData,
  TimeSeriesDataPoint,
  SeriesData,
  PieDataPoint,
  RadarIndicator,
  RadarSeriesData,
  TreeMapNode,
  HeatMapDataPoint,
  SankeyNode,
  SankeyLink,
  SankeyData,
  ScatterDataPoint,
  ScatterSeriesData,
  GraphNode,
  GraphLink,
  GraphData,
  CalendarDataPoint,
  FunnelDataPoint,
  GaugeData,
  BoxplotData,
  SunburstNode,
} from './types';

// ─────────────────────────────────────────────────────────────────────────────
// BASE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export { EChart } from './EChart';
export type { EChartProps, EChartRef } from './EChart';

// ─────────────────────────────────────────────────────────────────────────────
// FINANCIAL CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { CandlestickChart } from './CandlestickChart';
export type { CandlestickChartProps } from './CandlestickChart';

export { LineChart } from './LineChart';
export type { LineChartProps } from './LineChart';

export { BarChart } from './BarChart';
export type { BarChartProps, BarDataPoint, BarSeriesData } from './BarChart';

// ─────────────────────────────────────────────────────────────────────────────
// CIRCULAR CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { PieChart } from './PieChart';
export type { PieChartProps, PieVariant } from './PieChart';

export { RadarChart } from './RadarChart';
export type { RadarChartProps } from './RadarChart';

export { GaugeChart } from './GaugeChart';
export type { GaugeChartProps, GaugeVariant } from './GaugeChart';

export { SunburstChart } from './SunburstChart';
export type { SunburstChartProps } from './SunburstChart';

// ─────────────────────────────────────────────────────────────────────────────
// COMPARISON CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { TreeMap } from './TreeMap';
export type { TreeMapProps } from './TreeMap';

export { HeatMap } from './HeatMap';
export type { HeatMapProps, ColorScheme } from './HeatMap';

export { ScatterChart } from './ScatterChart';
export type { ScatterChartProps } from './ScatterChart';

// ─────────────────────────────────────────────────────────────────────────────
// FLOW CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { SankeyChart } from './SankeyChart';
export type { SankeyChartProps } from './SankeyChart';

export { FunnelChart } from './FunnelChart';
export type { FunnelChartProps, FunnelSort } from './FunnelChart';

export { GraphChart } from './GraphChart';
export type { GraphChartProps, GraphLayout } from './GraphChart';

// ─────────────────────────────────────────────────────────────────────────────
// TIME-BASED CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { CalendarChart } from './CalendarChart';
export type { CalendarChartProps, CalendarColorScheme } from './CalendarChart';

// ─────────────────────────────────────────────────────────────────────────────
// STATISTICAL CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { BoxplotChart } from './BoxplotChart';
export type { BoxplotChartProps } from './BoxplotChart';

// ─────────────────────────────────────────────────────────────────────────────
// STREAM / RIVER CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { ThemeRiverChart } from './ThemeRiverChart';
export type { ThemeRiverChartProps, ThemeRiverDataPoint } from './ThemeRiverChart';

// ─────────────────────────────────────────────────────────────────────────────
// MULTI-DIMENSIONAL CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { ParallelChart } from './ParallelChart';
export type { ParallelChartProps, ParallelDimension, ParallelSeriesData } from './ParallelChart';

// ─────────────────────────────────────────────────────────────────────────────
// HIERARCHICAL CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { TreeChart } from './TreeChart';
export type { TreeChartProps, TreeNode, TreeLayout, TreeOrient } from './TreeChart';

// ─────────────────────────────────────────────────────────────────────────────
// EFFECT CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { EffectScatterChart } from './EffectScatterChart';
export type { EffectScatterChartProps, EffectScatterDataPoint, EffectScatterSeriesData, EffectType } from './EffectScatterChart';

// ─────────────────────────────────────────────────────────────────────────────
// PICTORIAL CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export { PictorialBarChart, pictorialSymbols } from './PictorialBarChart';
export type { PictorialBarChartProps, PictorialBarDataPoint } from './PictorialBarChart';
