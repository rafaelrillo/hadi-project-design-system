# FING Charts Library Documentation

> **Version**: 2.0
> **Library**: Apache ECharts 5.6.0
> **Design System**: FING / SENTINEL Stone Marble
> **Last Updated**: January 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Installation & Setup](#installation--setup)
3. [Chart Selection Guide](#chart-selection-guide)
4. [Data Types Reference](#data-types-reference)
5. [Financial Charts](#financial-charts)
   - [LineChart](#linechart)
   - [BarChart](#barchart)
   - [CandlestickChart](#candlestickchart)
6. [Circular Charts](#circular-charts)
   - [PieChart](#piechart)
   - [RadarChart](#radarchart)
   - [GaugeChart](#gaugechart)
   - [SunburstChart](#sunburstchart)
7. [Comparison Charts](#comparison-charts)
   - [TreeMap](#treemap)
   - [HeatMap](#heatmap)
   - [ScatterChart](#scatterchart)
   - [BoxplotChart](#boxplotchart)
8. [Flow Charts](#flow-charts)
   - [SankeyChart](#sankeychart)
   - [FunnelChart](#funnelchart)
   - [GraphChart](#graphchart)
9. [Time-Based Charts](#time-based-charts)
   - [CalendarChart](#calendarchart)
   - [ThemeRiverChart](#themeriverchart)
10. [Multi-Dimensional Charts](#multi-dimensional-charts)
    - [ParallelChart](#parallelchart)
11. [Hierarchical Charts](#hierarchical-charts)
    - [TreeChart](#treechart)
12. [Effect Charts](#effect-charts)
    - [EffectScatterChart](#effectscatterchart)
13. [Pictorial Charts](#pictorial-charts)
    - [PictorialBarChart](#pictorialbarchart)
14. [Theme & Styling](#theme--styling)
15. [Best Practices](#best-practices)

---

## Overview

The FING Charts Library is a comprehensive collection of 20 chart components built on Apache ECharts, specifically designed for financial data visualization. All charts follow the FING/SENTINEL Stone Marble design system with consistent styling, animations, and interactions.

### Key Features

- **20 Chart Types**: From basic line charts to advanced parallel coordinates
- **Consistent Theming**: All charts use the FING color palette and styling
- **TypeScript Support**: Full type definitions for all props and data structures
- **Responsive**: Charts adapt to container size
- **Interactive**: Built-in tooltips, zoom, and legend interactions
- **Performance**: Optimized for large datasets using ECharts canvas rendering

### Import Path

```tsx
import {
  LineChart,
  BarChart,
  PieChart,
  // ... other charts
} from '@components/charts/echarts';
```

---

## Installation & Setup

### Dependencies

```bash
npm install echarts echarts-for-react
```

### Required Files

```
src/components/charts/echarts/
├── index.ts              # Exports all components
├── types.ts              # TypeScript type definitions
├── fingTheme.ts          # FING theme colors and formatters
├── EChart.tsx            # Base EChart wrapper component
├── LineChart.tsx         # Line chart component
├── BarChart.tsx          # Bar chart component
├── PieChart.tsx          # Pie chart component
├── CandlestickChart.tsx  # Candlestick chart component
├── RadarChart.tsx        # Radar chart component
├── GaugeChart.tsx        # Gauge chart component
├── TreeMap.tsx           # TreeMap component
├── HeatMap.tsx           # HeatMap component
├── ScatterChart.tsx      # Scatter chart component
├── SankeyChart.tsx       # Sankey diagram component
├── FunnelChart.tsx       # Funnel chart component
├── SunburstChart.tsx     # Sunburst chart component
├── GraphChart.tsx        # Network graph component
├── CalendarChart.tsx     # Calendar heatmap component
├── BoxplotChart.tsx      # Boxplot chart component
├── ThemeRiverChart.tsx   # Theme river component
├── ParallelChart.tsx     # Parallel coordinates component
├── TreeChart.tsx         # Tree hierarchy component
├── EffectScatterChart.tsx # Effect scatter component
└── PictorialBarChart.tsx # Pictorial bar component
```

---

## Chart Selection Guide

Use this guide to select the right chart for your data visualization needs.

### What do I want to show?

| Goal | Recommended Charts |
|------|-------------------|
| **Trend over time** | LineChart, CandlestickChart, ThemeRiverChart |
| **Parts of a whole** | PieChart, TreeMap, SunburstChart |
| **Compare categories** | BarChart, RadarChart, ParallelChart |
| **Relationship between 2 variables** | ScatterChart, EffectScatterChart, HeatMap |
| **Flow or process** | SankeyChart, FunnelChart, GraphChart |
| **Hierarchical structure** | TreeChart, TreeMap, SunburstChart |
| **Statistical distribution** | BoxplotChart, HeatMap |
| **Single KPI** | GaugeChart |
| **Daily activity** | CalendarChart |

---

## Data Types Reference

### Base Chart Props

All charts extend `BaseChartProps`:

```typescript
interface BaseChartProps {
  height?: number;      // Chart height in pixels (default: 300)
  className?: string;   // Additional CSS class
  animate?: boolean;    // Enable animations (default: true)
  loading?: boolean;    // Show loading state
}
```

### Common Data Types

```typescript
// Time series data point
interface TimeSeriesDataPoint {
  time: string;   // Date/time string (e.g., '2024-01', '2024-12-15')
  value: number;  // Numeric value
}

// Multi-series data
interface SeriesData {
  id: string;           // Unique series identifier
  name: string;         // Display name for legend
  color?: string;       // Series color (hex)
  data: Array<{ x: string; y: number }>;
}

// OHLC data for candlestick
interface OHLCData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

// Pie/donut data
interface PieDataPoint {
  name: string;
  value: number;
  color?: string;
}

// Hierarchical node (TreeMap, Sunburst, Tree)
interface TreeMapNode {
  name: string;
  value?: number;
  children?: TreeMapNode[];
  itemStyle?: { color?: string };
}
```

---

## Financial Charts

### LineChart

Line chart for time series data. Ideal for showing trends and comparing multiple series over time.

**Use Cases:**
- Portfolio performance over time
- Comparison vs benchmarks (S&P 500, NASDAQ)
- Stock price evolution
- Sparklines in KPI cards

**When to Use:**
- Showing trends over time
- Comparing multiple series (portfolio vs benchmark)
- Visualizing continuous data
- Sparklines in metric cards

**When NOT to Use:**
- Categorical data without temporal order
- Comparing parts of a whole (use PieChart)
- Showing distribution (use BoxplotChart)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TimeSeriesDataPoint[] \| SeriesData[]` | required | Series data |
| `height` | `number` | `300` | Chart height in px |
| `enableArea` | `boolean` | `false` | Fill area under line |
| `areaOpacity` | `number` | `0.3` | Area fill opacity |
| `smooth` | `boolean` | `false` | Smooth curved line |
| `showSymbol` | `boolean` | `false` | Show data points |
| `stacked` | `boolean` | `false` | Stack multiple series |
| `minimal` | `boolean` | `false` | Sparkline mode (no axes) |
| `showDataZoom` | `boolean` | `false` | Show zoom slider |
| `showLegend` | `boolean` | `auto` | Show legend |
| `title` | `string` | `undefined` | Chart title |
| `colors` | `string[]` | `chartPalette` | Color palette |
| `formatValue` | `(value: number) => string` | `financial` | Value formatter |

#### Data Format

```typescript
// Single series
const data: TimeSeriesDataPoint[] = [
  { time: '2024-01', value: 100 },
  { time: '2024-02', value: 108 },
  { time: '2024-03', value: 115 },
];

// Multi-series
const data: SeriesData[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    color: '#3a6a72',
    data: [
      { x: '2024-01', y: 100 },
      { x: '2024-02', y: 108 },
    ]
  },
  {
    id: 'sp500',
    name: 'S&P 500',
    color: '#4a7a6a',
    data: [
      { x: '2024-01', y: 100 },
      { x: '2024-02', y: 104 },
    ]
  }
];
```

#### Code Example

```tsx
import { LineChart } from '@components/charts/echarts';

// Basic usage
<LineChart
  data={portfolioData}
  height={350}
  enableArea
  smooth
  showDataZoom
  title="Portfolio Performance"
/>

// Sparkline mode (for cards)
<LineChart
  data={sparklineData}
  height={60}
  minimal
  enableArea
/>

// Multi-series comparison
<LineChart
  data={[portfolioSeries, benchmarkSeries]}
  height={400}
  showLegend
  showDataZoom
/>
```

---

### BarChart

Bar chart for comparing values across categories.

**Use Cases:**
- Sector allocation
- Monthly returns
- Asset comparison
- Ranking visualization

**When to Use:**
- Comparing values between categories
- Showing ranking of elements
- Visualizing positive/negative returns
- Sector/region distribution

**When NOT to Use:**
- Continuous temporal data (use LineChart)
- Proportions of a whole (use PieChart)
- More than 15 categories (consider TreeMap)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `BarDataPoint[]` | required | Bar data |
| `categories` | `string[]` | required | Category labels |
| `height` | `number` | `300` | Chart height |
| `horizontal` | `boolean` | `false` | Horizontal bars |
| `stacked` | `boolean` | `false` | Stack series |
| `showValues` | `boolean` | `false` | Show values on bars |
| `colorByValue` | `boolean` | `false` | Positive/negative colors |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface BarDataPoint {
  category: string;
  value: number;
  color?: string;
}

const data: BarDataPoint[] = [
  { category: 'Technology', value: 45000 },
  { category: 'Healthcare', value: 28000 },
  { category: 'Finance', value: 35000 },
  { category: 'Energy', value: 18000 },
];
```

#### Code Example

```tsx
import { BarChart } from '@components/charts/echarts';

<BarChart
  data={sectorAllocation}
  categories={sectorAllocation.map(d => d.category)}
  height={300}
  horizontal
  showValues
  title="Sector Allocation"
/>
```

---

### CandlestickChart

Japanese candlestick chart for OHLC (Open, High, Low, Close) price data.

**Use Cases:**
- Stock trading views
- Technical analysis
- Price volatility visualization
- Crypto trading

**When to Use:**
- Showing OHLC price data
- Technical analysis of stocks
- Visualizing intraday volatility
- Trading views with volume

**When NOT to Use:**
- Data without OHLC (use LineChart)
- Very long periods (consider LineChart)
- Users unfamiliar with trading

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `OHLCData[]` | required | OHLC data array |
| `height` | `number` | `400` | Chart height |
| `showVolume` | `boolean` | `true` | Show volume histogram |
| `showDataZoom` | `boolean` | `true` | Show zoom control |
| `upColor` | `string` | `#4a7a6a` (Jade) | Bullish candle color |
| `downColor` | `string` | `#8a5a4a` (Rust) | Bearish candle color |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface OHLCData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

const data: OHLCData[] = [
  { time: '2024-12-01', open: 175.5, high: 178.2, low: 174.8, close: 177.3, volume: 45000000 },
  { time: '2024-12-02', open: 177.3, high: 180.1, low: 176.5, close: 179.8, volume: 52000000 },
];
```

#### Code Example

```tsx
import { CandlestickChart } from '@components/charts/echarts';

<CandlestickChart
  data={stockPrices}
  height={400}
  showVolume
  showDataZoom
  title="AAPL Stock Price"
/>
```

---

## Circular Charts

### PieChart

Circular chart for showing proportions of a whole.

**Use Cases:**
- Asset allocation
- Portfolio distribution
- Index composition
- Budget breakdown

**When to Use:**
- Showing parts of a whole (100%)
- Maximum 5-7 categories
- Highlighting the largest proportion
- Simple asset allocation

**When NOT to Use:**
- More than 7 categories (use TreeMap)
- Comparing exact values (use BarChart)
- Temporal data (use LineChart)
- Values that don't sum to a whole

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `PieDataPoint[]` | required | Pie data |
| `variant` | `'pie' \| 'donut' \| 'rose' \| 'half'` | `'pie'` | Visual variant |
| `height` | `number` | `300` | Chart height |
| `showLabels` | `boolean` | `true` | Show labels |
| `showLegend` | `boolean` | `true` | Show legend |
| `innerRadius` | `string` | `'50%'` | Inner radius (donut) |
| `centerLabel` | `string` | `undefined` | Center text (donut) |
| `centerValue` | `string` | `undefined` | Center value (donut) |

#### Variants

- **`pie`**: Standard pie chart
- **`donut`**: Donut with hollow center (can display total)
- **`rose`**: Nightingale rose diagram (radius varies by value)
- **`half`**: Semi-circle gauge style

#### Data Format

```typescript
interface PieDataPoint {
  name: string;
  value: number;
  color?: string;
}

const data: PieDataPoint[] = [
  { name: 'US Stocks', value: 45000 },
  { name: 'International Stocks', value: 25000 },
  { name: 'Bonds', value: 18000 },
  { name: 'REITs', value: 8000 },
  { name: 'Cash', value: 4000 },
];
```

#### Code Example

```tsx
import { PieChart } from '@components/charts/echarts';

// Donut with center value
<PieChart
  data={allocation}
  variant="donut"
  centerValue="$125K"
  centerLabel="Total"
  height={300}
/>

// Rose diagram
<PieChart
  data={sectorWeights}
  variant="rose"
  height={350}
/>
```

---

### RadarChart

Radar/spider chart for comparing multiple metrics across entities.

**Use Cases:**
- Risk profile visualization
- Factor analysis
- Multi-dimensional comparison
- Portfolio characteristics

**When to Use:**
- Comparing multiple metrics (3-8)
- Risk factor analysis
- Investment profile
- Comparing 2-3 entities

**When NOT to Use:**
- More than 8 metrics (use ParallelChart)
- Comparing many entities (use HeatMap)
- Temporal data (use LineChart)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `indicators` | `RadarIndicator[]` | required | Radar axes |
| `data` | `RadarSeriesData[]` | required | Data series |
| `height` | `number` | `300` | Chart height |
| `shape` | `'polygon' \| 'circle'` | `'polygon'` | Radar shape |
| `showLegend` | `boolean` | `true` | Show legend |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface RadarIndicator {
  name: string;
  max: number;
  min?: number;
}

interface RadarSeriesData {
  name: string;
  value: number[];
  color?: string;
}

const indicators: RadarIndicator[] = [
  { name: 'Return', max: 100 },
  { name: 'Risk', max: 100 },
  { name: 'Sharpe Ratio', max: 100 },
  { name: 'Alpha', max: 100 },
  { name: 'Beta', max: 100 },
];

const data: RadarSeriesData[] = [
  { name: 'Portfolio', value: [85, 45, 78, 62, 55], color: '#3a6a72' },
  { name: 'Benchmark', value: [70, 50, 65, 50, 100], color: '#4a7a6a' },
];
```

#### Code Example

```tsx
import { RadarChart } from '@components/charts/echarts';

<RadarChart
  indicators={riskFactors}
  data={portfolioProfile}
  shape="polygon"
  height={300}
/>
```

---

### GaugeChart

Gauge/meter for displaying a single KPI value within a range.

**Use Cases:**
- Risk level indicator
- Sentiment score
- Portfolio health
- Goal progress

**When to Use:**
- Showing a single KPI with context
- Risk level (0-100)
- Sentiment score
- Progress toward a goal

**When NOT to Use:**
- Multiple values (use BarChart)
- Temporal data (use LineChart)
- Comparing categories (use BarChart)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `GaugeData` | required | Gauge value |
| `variant` | `'default' \| 'risk' \| 'progress' \| 'score'` | `'default'` | Visual variant |
| `height` | `number` | `300` | Chart height |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `title` | `string` | `undefined` | Chart title |

#### Variants

- **`default`**: Standard gauge
- **`risk`**: Color-coded risk levels (green → yellow → red)
- **`progress`**: Progress indicator style
- **`score`**: Score display with percentage

#### Data Format

```typescript
interface GaugeData {
  value: number;
  name?: string;
}

const data: GaugeData = { value: 72, name: 'Risk Score' };
```

#### Code Example

```tsx
import { GaugeChart } from '@components/charts/echarts';

<GaugeChart
  data={{ value: 72, name: 'Risk' }}
  variant="risk"
  height={250}
/>
```

---

### SunburstChart

Radial hierarchical chart for multi-level data.

**Use Cases:**
- Drill-down allocation views
- Multi-level portfolio structure
- Nested category breakdown

**When to Use:**
- Hierarchical data (2-4 levels)
- Interactive drill-down
- Nested structure visualization
- Detailed asset allocation

**When NOT to Use:**
- Very deep hierarchy (use TreeChart)
- No hierarchical structure (use PieChart)
- Many small elements (use TreeMap)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `SunburstNode[]` | required | Hierarchical data |
| `height` | `number` | `400` | Chart height |
| `showLabels` | `boolean` | `true` | Show labels |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface SunburstNode {
  name: string;
  value?: number;
  children?: SunburstNode[];
  itemStyle?: { color?: string };
}

const data: SunburstNode[] = [{
  name: 'Portfolio',
  children: [
    {
      name: 'Equities',
      value: 60,
      children: [
        { name: 'US Stocks', value: 40 },
        { name: 'International', value: 20 },
      ]
    },
    { name: 'Fixed Income', value: 40 }
  ]
}];
```

#### Code Example

```tsx
import { SunburstChart } from '@components/charts/echarts';

<SunburstChart
  data={portfolioHierarchy}
  height={400}
  showLabels
/>
```

---

## Comparison Charts

### TreeMap

Rectangular treemap for hierarchical proportional data.

**Use Cases:**
- Portfolio allocation by sector
- Market cap breakdown
- Holdings with drill-down

**When to Use:**
- Many categories (8+)
- Hierarchical data
- Visual size comparison
- Portfolio holdings with drill-down

**When NOT to Use:**
- Few categories (use PieChart)
- No hierarchy (consider BarChart)
- Very similar values (hard to distinguish)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TreeMapNode[]` | required | Hierarchical data |
| `height` | `number` | `400` | Chart height |
| `showBreadcrumb` | `boolean` | `true` | Show breadcrumb nav |
| `colorBy` | `'value' \| 'category'` | `'category'` | Color mode |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
const data: TreeMapNode[] = [
  {
    name: 'Technology',
    value: 45000,
    children: [
      { name: 'AAPL', value: 20000 },
      { name: 'MSFT', value: 15000 },
      { name: 'GOOGL', value: 10000 },
    ]
  },
  {
    name: 'Healthcare',
    value: 25000,
    children: [
      { name: 'JNJ', value: 15000 },
      { name: 'PFE', value: 10000 },
    ]
  }
];
```

#### Code Example

```tsx
import { TreeMap } from '@components/charts/echarts';

<TreeMap
  data={portfolioBreakdown}
  height={400}
  showBreadcrumb
  colorBy="category"
/>
```

---

### HeatMap

Matrix heatmap for correlation or 2D data visualization.

**Use Cases:**
- Asset correlation matrix
- Monthly returns by year
- Sector/region comparison

**When to Use:**
- Correlation matrices
- Grid data (X × Y)
- Pattern identification in matrices
- Calendar heatmap of returns

**When NOT to Use:**
- One-dimensional data (use BarChart)
- Simple time series (use LineChart)
- Too few data points (no visible pattern)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `HeatMapDataPoint[]` | required | Matrix data |
| `xCategories` | `string[]` | required | X-axis labels |
| `yCategories` | `string[]` | required | Y-axis labels |
| `height` | `number` | `400` | Chart height |
| `colorScheme` | `'sequential' \| 'diverging'` | `'sequential'` | Color scale |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface HeatMapDataPoint {
  x: string | number;
  y: string | number;
  value: number;
}

const data: HeatMapDataPoint[] = [
  { x: 'AAPL', y: 'MSFT', value: 0.85 },
  { x: 'AAPL', y: 'GOOGL', value: 0.72 },
  { x: 'MSFT', y: 'GOOGL', value: 0.68 },
  { x: 'AAPL', y: 'AAPL', value: 1.00 },
  { x: 'MSFT', y: 'MSFT', value: 1.00 },
  { x: 'GOOGL', y: 'GOOGL', value: 1.00 },
];
```

#### Code Example

```tsx
import { HeatMap } from '@components/charts/echarts';

<HeatMap
  data={correlationMatrix}
  xCategories={['AAPL', 'MSFT', 'GOOGL']}
  yCategories={['AAPL', 'MSFT', 'GOOGL']}
  colorScheme="diverging"
  height={400}
/>
```

---

### ScatterChart

Scatter plot for visualizing relationships between two variables.

**Use Cases:**
- Risk vs Return analysis
- Efficient Frontier visualization
- Factor exposure comparison

**When to Use:**
- Showing relationship between 2 variables
- Identifying clusters or outliers
- Risk vs Return scatter
- Efficient Frontier visualization

**When NOT to Use:**
- Ordered temporal data (use LineChart)
- Comparing categories (use BarChart)
- No XY relationship (use other charts)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ScatterSeriesData[]` | required | Point series |
| `height` | `number` | `400` | Chart height |
| `xAxisLabel` | `string` | `undefined` | X-axis label |
| `yAxisLabel` | `string` | `undefined` | Y-axis label |
| `showRegression` | `boolean` | `false` | Show trend line |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface ScatterDataPoint {
  x: number;
  y: number;
  size?: number;
  name?: string;
  color?: string;
}

interface ScatterSeriesData {
  name: string;
  data: ScatterDataPoint[];
  color?: string;
}

const data: ScatterSeriesData[] = [{
  name: 'Tech Stocks',
  color: '#3a6a72',
  data: [
    { x: 15, y: 12, name: 'AAPL', size: 20 },
    { x: 18, y: 14, name: 'MSFT', size: 25 },
    { x: 22, y: 18, name: 'NVDA', size: 15 },
  ]
}];
```

#### Code Example

```tsx
import { ScatterChart } from '@components/charts/echarts';

<ScatterChart
  data={riskReturnData}
  xAxisLabel="Volatility (%)"
  yAxisLabel="Return (%)"
  showRegression
  height={400}
/>
```

---

### BoxplotChart

Box-and-whisker plot for statistical distribution visualization.

**Use Cases:**
- Quarterly return distribution
- Volatility comparison
- Outlier identification

**When to Use:**
- Showing statistical distribution
- Comparing distributions between groups
- Identifying outliers
- Quarterly returns with dispersion

**When NOT to Use:**
- Non-technical audience
- Data without significant variation
- Time series (use LineChart)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `BoxplotData[]` | required | [min, Q1, median, Q3, max] data |
| `height` | `number` | `300` | Chart height |
| `horizontal` | `boolean` | `false` | Horizontal orientation |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface BoxplotData {
  name: string;
  value: [number, number, number, number, number]; // [min, Q1, median, Q3, max]
}

const data: BoxplotData[] = [
  { name: 'Q1 2024', value: [10, 25, 35, 45, 60] },
  { name: 'Q2 2024', value: [15, 30, 40, 50, 65] },
  { name: 'Q3 2024', value: [8, 22, 32, 42, 55] },
];
```

#### Code Example

```tsx
import { BoxplotChart } from '@components/charts/echarts';

<BoxplotChart
  data={quarterlyReturns}
  height={300}
  title="Quarterly Return Distribution"
/>
```

---

## Flow Charts

### SankeyChart

Flow diagram showing how values move between nodes.

**Use Cases:**
- Cash flow visualization
- Rebalancing flows
- Income allocation

**When to Use:**
- Showing flows between categories
- Visualizing where money comes from and goes
- Portfolio rebalancing
- Income → Savings → Investments flow

**When NOT to Use:**
- No directional flows (use TreeMap)
- Complex bidirectional relationships (use GraphChart)
- Simple data (use BarChart)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `SankeyData` | required | Nodes and links |
| `height` | `number` | `400` | Chart height |
| `nodeWidth` | `number` | `20` | Node width |
| `nodeGap` | `number` | `8` | Space between nodes |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface SankeyNode {
  name: string;
  itemStyle?: { color?: string };
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

const data: SankeyData = {
  nodes: [
    { name: 'Income' },
    { name: 'Stocks' },
    { name: 'Bonds' },
    { name: 'Growth' },
    { name: 'Dividends' },
  ],
  links: [
    { source: 'Income', target: 'Stocks', value: 60 },
    { source: 'Income', target: 'Bonds', value: 40 },
    { source: 'Stocks', target: 'Growth', value: 40 },
    { source: 'Stocks', target: 'Dividends', value: 20 },
  ]
};
```

#### Code Example

```tsx
import { SankeyChart } from '@components/charts/echarts';

<SankeyChart
  data={cashFlowData}
  height={400}
  title="Income Allocation"
/>
```

---

### FunnelChart

Funnel diagram showing progressive reduction through stages.

**Use Cases:**
- Investment screening process
- Conversion funnel
- Due diligence stages

**When to Use:**
- Filtering/screening process
- Sequential reduction
- Conversion funnel
- Due diligence process

**When NOT to Use:**
- No sequential reduction (use BarChart)
- Bidirectional flows (use SankeyChart)
- Data without logical order

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `FunnelDataPoint[]` | required | Funnel stages |
| `height` | `number` | `300` | Chart height |
| `sort` | `'descending' \| 'ascending' \| 'none'` | `'descending'` | Sort order |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface FunnelDataPoint {
  name: string;
  value: number;
  color?: string;
}

const data: FunnelDataPoint[] = [
  { name: 'Screened', value: 1000 },
  { name: 'Analyzed', value: 500 },
  { name: 'Shortlisted', value: 200 },
  { name: 'Invested', value: 50 },
];
```

#### Code Example

```tsx
import { FunnelChart } from '@components/charts/echarts';

<FunnelChart
  data={screeningProcess}
  height={300}
  title="Stock Screening Funnel"
/>
```

---

### GraphChart

Network graph for complex node-link relationships.

**Use Cases:**
- Correlation network
- Company relationships
- Ownership structure
- Asset clusters

**When to Use:**
- Many-to-many relationships
- Correlation networks
- Ownership structures
- Related asset clusters

**When NOT to Use:**
- Unidirectional flows (use SankeyChart)
- Simple hierarchy (use TreeChart)
- Few relationships (use RadarChart)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `GraphData` | required | Nodes, links, categories |
| `height` | `number` | `400` | Chart height |
| `layout` | `'force' \| 'circular'` | `'force'` | Layout algorithm |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface GraphNode {
  id: string;
  name: string;
  value?: number;
  category?: number;
  symbolSize?: number;
}

interface GraphLink {
  source: string;
  target: string;
  value?: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  categories?: Array<{ name: string }>;
}

const data: GraphData = {
  nodes: [
    { id: '1', name: 'AAPL', value: 100, category: 0 },
    { id: '2', name: 'MSFT', value: 90, category: 0 },
    { id: '3', name: 'GOOGL', value: 85, category: 0 },
  ],
  links: [
    { source: '1', target: '2', value: 0.85 },
    { source: '1', target: '3', value: 0.72 },
  ],
  categories: [{ name: 'Tech' }]
};
```

#### Code Example

```tsx
import { GraphChart } from '@components/charts/echarts';

<GraphChart
  data={correlationNetwork}
  layout="force"
  height={400}
/>
```

---

## Time-Based Charts

### CalendarChart

Calendar heatmap for daily activity visualization.

**Use Cases:**
- Trading activity
- Daily returns heatmap
- Contribution calendar (GitHub-style)

**When to Use:**
- Daily activity over a year
- Weekly/monthly patterns
- GitHub-style activity calendar
- Daily return heatmap

**When NOT to Use:**
- Non-daily data (use LineChart)
- No calendar pattern
- Short periods (< 3 months)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `CalendarDataPoint[]` | required | Daily data |
| `year` | `number` | current year | Year to display |
| `height` | `number` | `200` | Chart height |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface CalendarDataPoint {
  date: string; // YYYY-MM-DD format
  value: number;
}

const data: CalendarDataPoint[] = [
  { date: '2024-01-15', value: 85 },
  { date: '2024-01-16', value: 42 },
  { date: '2024-01-17', value: 91 },
  // ... more daily data
];
```

#### Code Example

```tsx
import { CalendarChart } from '@components/charts/echarts';

<CalendarChart
  data={tradingActivity}
  year={2024}
  height={200}
/>
```

---

### ThemeRiverChart

Stacked stream chart showing evolution of multiple series over time.

**Use Cases:**
- Market share evolution
- Sector performance over time
- Composition changes

**When to Use:**
- Composition evolution over time
- Multiple series summing to a total
- Market share trends
- Category flow over time

**When NOT to Use:**
- Single series (use Area LineChart)
- No time dimension
- Exact comparison needed (use Stacked BarChart)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ThemeRiverDataPoint[]` | required | River data |
| `height` | `number` | `300` | Chart height |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface ThemeRiverDataPoint {
  date: string;
  value: number;
  name: string;
}

const data: ThemeRiverDataPoint[] = [
  { date: '2024-01', value: 100, name: 'Technology' },
  { date: '2024-02', value: 120, name: 'Technology' },
  { date: '2024-01', value: 80, name: 'Healthcare' },
  { date: '2024-02', value: 90, name: 'Healthcare' },
];
```

#### Code Example

```tsx
import { ThemeRiverChart } from '@components/charts/echarts';

<ThemeRiverChart
  data={marketShareData}
  height={300}
/>
```

---

## Multi-Dimensional Charts

### ParallelChart

Parallel coordinates for multi-dimensional data comparison.

**Use Cases:**
- Fund screening
- Multi-factor comparison
- Portfolio filtering

**When to Use:**
- Comparing 4+ metrics simultaneously
- Filtering multi-dimensional data
- Fund/ETF analysis
- Screening with multiple criteria

**When NOT to Use:**
- Few metrics (use RadarChart)
- No interactive filtering needed
- Non-technical audience

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dimensions` | `ParallelDimension[]` | required | Parallel axes |
| `data` | `ParallelSeriesData[]` | required | Data series |
| `height` | `number` | `400` | Chart height |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface ParallelDimension {
  name: string;
  min: number;
  max: number;
}

interface ParallelSeriesData {
  name: string;
  value: number[];
  color?: string;
}

const dimensions: ParallelDimension[] = [
  { name: 'Return (%)', min: 0, max: 30 },
  { name: 'Risk (%)', min: 0, max: 25 },
  { name: 'Sharpe Ratio', min: 0, max: 3 },
];

const data: ParallelSeriesData[] = [
  { name: 'Fund A', value: [15, 12, 1.5], color: '#3a6a72' },
  { name: 'Fund B', value: [22, 18, 1.8], color: '#4a7a6a' },
];
```

#### Code Example

```tsx
import { ParallelChart } from '@components/charts/echarts';

<ParallelChart
  dimensions={fundMetrics}
  data={fundComparison}
  height={400}
/>
```

---

## Hierarchical Charts

### TreeChart

Tree diagram for parent-child hierarchical structures.

**Use Cases:**
- Organization structure
- Category taxonomy
- Decision trees
- Portfolio structure

**When to Use:**
- Clear hierarchical structure
- Parent-child relationships
- Category taxonomy
- Decision tree visualization

**When NOT to Use:**
- Proportional data (use TreeMap)
- Radial display (use SunburstChart)
- Very deep hierarchy (>5 levels)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TreeNode` | required | Tree root node |
| `height` | `number` | `400` | Chart height |
| `layout` | `'orthogonal' \| 'radial'` | `'orthogonal'` | Tree layout |
| `orient` | `'LR' \| 'TB' \| 'RL' \| 'BT'` | `'LR'` | Orientation |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}

const data: TreeNode = {
  name: 'Portfolio',
  children: [
    {
      name: 'Equities',
      children: [
        { name: 'US Stocks', value: 40 },
        { name: 'International', value: 20 },
      ]
    },
    { name: 'Bonds', value: 30 },
    { name: 'Cash', value: 10 },
  ]
};
```

#### Code Example

```tsx
import { TreeChart } from '@components/charts/echarts';

<TreeChart
  data={portfolioStructure}
  layout="orthogonal"
  orient="LR"
  height={400}
/>
```

---

## Effect Charts

### EffectScatterChart

Scatter chart with ripple/pulsing visual effects for emphasis.

**Use Cases:**
- Highlighting hot stocks
- Visual alerts
- Emphasis on specific points
- Trending items

**When to Use:**
- Highlighting important points
- Alerts or anomalies
- Hot/trending stocks
- Visual attention

**When NOT to Use:**
- Many points (distracting)
- Serious analysis (use regular ScatterChart)
- Data without need for emphasis

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `EffectScatterSeriesData[]` | required | Series with effect |
| `height` | `number` | `400` | Chart height |
| `effectType` | `'ripple'` | `'ripple'` | Effect type |
| `title` | `string` | `undefined` | Chart title |

#### Data Format

```typescript
interface EffectScatterSeriesData {
  name: string;
  color?: string;
  data: Array<{
    x: number;
    y: number;
    size?: number;
    name?: string;
  }>;
}

const data: EffectScatterSeriesData[] = [{
  name: 'Hot Stocks',
  color: '#8a5a4a',
  data: [
    { x: 15, y: 25, size: 30, name: 'NVDA' },
    { x: 20, y: 30, size: 25, name: 'TSLA' },
  ]
}];
```

#### Code Example

```tsx
import { EffectScatterChart } from '@components/charts/echarts';

<EffectScatterChart
  data={hotStocks}
  height={400}
/>
```

---

## Pictorial Charts

### PictorialBarChart

Bar chart using symbols/icons for visual representation.

**Use Cases:**
- Infographic-style data
- Visual reports
- Presentations
- Marketing materials

**When to Use:**
- Presentations and infographics
- Visual reports
- Non-technical audience
- Marketing materials

**When NOT to Use:**
- Serious technical analysis
- Precise comparison needed (use BarChart)
- Many categories

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `PictorialBarDataPoint[]` | required | Data with symbols |
| `height` | `number` | `300` | Chart height |
| `title` | `string` | `undefined` | Chart title |

#### Available Symbols

```typescript
import { pictorialSymbols } from '@components/charts/echarts';

// Available symbols:
pictorialSymbols.chart    // Bar chart icon
pictorialSymbols.person   // Person silhouette
pictorialSymbols.circle   // Circle
pictorialSymbols.rect     // Rectangle
pictorialSymbols.triangle // Triangle
```

#### Data Format

```typescript
interface PictorialBarDataPoint {
  name: string;
  value: number;
  symbol: string;
  color?: string;
}

const data: PictorialBarDataPoint[] = [
  { name: 'AAPL', value: 45, symbol: pictorialSymbols.chart },
  { name: 'MSFT', value: 38, symbol: pictorialSymbols.chart },
  { name: 'GOOGL', value: 32, symbol: pictorialSymbols.chart },
];
```

#### Code Example

```tsx
import { PictorialBarChart, pictorialSymbols } from '@components/charts/echarts';

<PictorialBarChart
  data={stockData}
  height={300}
/>
```

---

## Theme & Styling

### FING Color Palette

The charts use the FING/SENTINEL natural mineral color palette:

```typescript
// Primary colors
const fingColors = {
  // Brand
  accent: '#3a6a72',        // Petrol (primary accent)
  accentLight: '#4a7a82',   // Petrol light
  accentDark: '#2a5a62',    // Petrol dark

  // Semantic
  positive: '#4a7a6a',      // Jade (green)
  warning: '#a08a4a',       // Gold (amber)
  negative: '#8a5a4a',      // Rust (red)
  info: '#4a6a7a',          // Steel (blue)

  // Text
  textPrimary: '#252528',   // Charcoal
  textSecondary: '#5a6578',
  textTertiary: '#8a8f96',

  // Surfaces
  marbleBase: '#d5d8dc',
  borderSubtle: 'rgba(147, 157, 170, 0.25)',
};

// Chart series palette (8 colors)
const chartPalette = [
  '#3a6a72',  // Petrol
  '#4a7a6a',  // Jade
  '#a08a4a',  // Gold
  '#8a5a4a',  // Rust
  '#4a6a7a',  // Steel
  '#6a5a7a',  // Purple (Amethyst)
  '#7a6a5a',  // Bronze
  '#5a7a6a',  // Sea Green
];
```

### Tooltip Styling

All charts use consistent glass-morphism tooltips:

```typescript
const tooltipStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderColor: 'rgba(58, 106, 114, 0.25)',
  borderWidth: 1,
  borderRadius: 16,
  padding: [14, 18],
  backdropFilter: 'blur(16px)',
  boxShadow: '0 8px 32px rgba(58, 106, 114, 0.15)',
};
```

### Value Formatters

Built-in formatters for common financial values:

```typescript
import { tooltipFormatters } from '@components/charts/echarts';

// Available formatters:
tooltipFormatters.financial  // $1,234.56
tooltipFormatters.percent    // 12.34%
tooltipFormatters.compact    // 1.2K, 1.5M, 2.3B
tooltipFormatters.integer    // 1,234
```

---

## Best Practices

### Data Visualization Guidelines

1. **Choose the right chart type** - Use the selection guide to pick the appropriate chart for your data
2. **Limit categories** - Pie charts work best with 5-7 items, bar charts with up to 15
3. **Use meaningful colors** - Leverage semantic colors (Jade for positive, Rust for negative)
4. **Consider your audience** - Use simpler charts for non-technical users
5. **Provide context** - Always include axis labels, legends, and titles where appropriate

### Performance Tips

1. **Large datasets** - Enable `showDataZoom` for charts with many data points
2. **Animation** - Set `animate={false}` for frequently updating charts
3. **Loading states** - Use `loading={true}` while fetching data
4. **Lazy loading** - Load charts only when visible (intersection observer)

### Accessibility

1. **Color contrast** - The FING palette ensures WCAG AA compliance
2. **Tooltips** - All charts have keyboard-accessible tooltips
3. **Labels** - Use clear, descriptive labels for all data
4. **Alt text** - Provide chart descriptions for screen readers

### Responsive Design

```tsx
// Use container-based sizing
<div style={{ width: '100%', minWidth: 300 }}>
  <LineChart data={data} height={300} />
</div>

// Or use responsive height
const chartHeight = window.innerWidth < 768 ? 200 : 400;
<LineChart data={data} height={chartHeight} />
```

---

## Quick Reference

| Chart | Best For | Data Type | Key Props |
|-------|----------|-----------|-----------|
| LineChart | Trends | TimeSeriesDataPoint[] | `enableArea`, `smooth`, `minimal` |
| BarChart | Categories | BarDataPoint[] | `horizontal`, `stacked` |
| CandlestickChart | OHLC | OHLCData[] | `showVolume`, `showDataZoom` |
| PieChart | Proportions | PieDataPoint[] | `variant`, `centerValue` |
| RadarChart | Multi-metric | RadarSeriesData[] | `shape`, `indicators` |
| GaugeChart | Single KPI | GaugeData | `variant`, `min`, `max` |
| SunburstChart | Hierarchy | SunburstNode[] | `showLabels` |
| TreeMap | Many items | TreeMapNode[] | `showBreadcrumb`, `colorBy` |
| HeatMap | Correlation | HeatMapDataPoint[] | `colorScheme` |
| ScatterChart | XY relation | ScatterSeriesData[] | `showRegression` |
| BoxplotChart | Distribution | BoxplotData[] | `horizontal` |
| SankeyChart | Flows | SankeyData | `nodeWidth`, `nodeGap` |
| FunnelChart | Stages | FunnelDataPoint[] | `sort` |
| GraphChart | Networks | GraphData | `layout` |
| CalendarChart | Daily | CalendarDataPoint[] | `year` |
| ThemeRiverChart | Evolution | ThemeRiverDataPoint[] | - |
| ParallelChart | Multi-dim | ParallelSeriesData[] | `dimensions` |
| TreeChart | Hierarchy | TreeNode | `layout`, `orient` |
| EffectScatterChart | Emphasis | EffectScatterSeriesData[] | `effectType` |
| PictorialBarChart | Visual | PictorialBarDataPoint[] | `symbol` |

---

*FING Design System - Charts Library v2.0*
*Generated: January 2026*
