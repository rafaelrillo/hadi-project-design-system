// Path: src/components/charts/echarts/types.ts

// ─────────────────────────────────────────────────────────────────────────────
// COMMON TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface BaseChartProps {
  height?: number;
  className?: string;
  animate?: boolean;
  loading?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// FINANCIAL DATA TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface OHLCData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface TimeSeriesDataPoint {
  time: string;
  value: number;
}

export interface SeriesData {
  id: string;
  name: string;
  color?: string;
  data: Array<{ x: string; y: number }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// PIE/DONUT DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface PieDataPoint {
  name: string;
  value: number;
  color?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// RADAR DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface RadarIndicator {
  name: string;
  max: number;
  min?: number;
}

export interface RadarSeriesData {
  name: string;
  value: number[];
  color?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// TREEMAP DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface TreeMapNode {
  name: string;
  value?: number;
  children?: TreeMapNode[];
  itemStyle?: {
    color?: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HEATMAP DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface HeatMapDataPoint {
  x: string | number;
  y: string | number;
  value: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SANKEY DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface SankeyNode {
  name: string;
  itemStyle?: {
    color?: string;
  };
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

// ─────────────────────────────────────────────────────────────────────────────
// SCATTER DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface ScatterDataPoint {
  x: number;
  y: number;
  size?: number;
  name?: string;
  color?: string;
}

export interface ScatterSeriesData {
  name: string;
  data: ScatterDataPoint[];
  color?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// GRAPH/NETWORK DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface GraphNode {
  id: string;
  name: string;
  value?: number;
  category?: number;
  symbolSize?: number;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  categories?: Array<{ name: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALENDAR DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface CalendarDataPoint {
  date: string; // YYYY-MM-DD format
  value: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// FUNNEL DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface FunnelDataPoint {
  name: string;
  value: number;
  color?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// GAUGE DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface GaugeData {
  value: number;
  name?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// BOXPLOT DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface BoxplotData {
  name: string;
  // [min, Q1, median, Q3, max]
  value: [number, number, number, number, number];
}

// ─────────────────────────────────────────────────────────────────────────────
// SUNBURST DATA
// ─────────────────────────────────────────────────────────────────────────────

export interface SunburstNode {
  name: string;
  value?: number;
  children?: SunburstNode[];
  itemStyle?: {
    color?: string;
  };
}
