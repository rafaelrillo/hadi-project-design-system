// Path: src/pages/charts/ChartsDocsShowcase.tsx
// FING Design System - Charts Documentation for Product Designers
import React, { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import {
  LineChart,
  BarChart,
  PieChart,
  CandlestickChart,
  RadarChart,
  GaugeChart,
  TreeMap,
  HeatMap,
  ScatterChart,
  SankeyChart,
  FunnelChart,
  SunburstChart,
  GraphChart,
  CalendarChart,
  BoxplotChart,
  ThemeRiverChart,
  ParallelChart,
  TreeChart,
  EffectScatterChart,
  PictorialBarChart,
  pictorialSymbols,
} from '../../components/charts/echarts';
import {
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  CandlestickChart as CandlestickIcon,
  Radar,
  Gauge,
  Grid3X3,
  Flame,
  Target,
  Network,
  GitBranch,
  Layers,
  Calendar,
  BarChart2,
  Waves,
  SlidersHorizontal,
  GitMerge,
  Sparkles,
  ImageIcon,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Info,
  AlertCircle,
  Lightbulb,
  Download,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const sampleMultiSeriesData = [
  { id: 'portfolio', name: 'Portfolio', color: '#3a6a72', data: [
    { x: '2024-01', y: 100 }, { x: '2024-02', y: 108 }, { x: '2024-03', y: 115 },
  ]},
  { id: 'benchmark', name: 'Benchmark', color: '#4a7a6a', data: [
    { x: '2024-01', y: 100 }, { x: '2024-02', y: 104 }, { x: '2024-03', y: 108 },
  ]},
];

const sampleOHLCData = [
  { time: '2024-12-01', open: 175, high: 178, low: 174, close: 177, volume: 45000000 },
  { time: '2024-12-02', open: 177, high: 180, low: 176, close: 179, volume: 52000000 },
  { time: '2024-12-03', open: 179, high: 181, low: 177, close: 178, volume: 48000000 },
  { time: '2024-12-04', open: 178, high: 179, low: 175, close: 176, volume: 55000000 },
  { time: '2024-12-05', open: 176, high: 180, low: 175, close: 179, volume: 62000000 },
];

const samplePieData = [
  { name: 'US Stocks', value: 45000 },
  { name: 'Int. Stocks', value: 25000 },
  { name: 'Bonds', value: 18000 },
  { name: 'REITs', value: 8000 },
  { name: 'Cash', value: 4000 },
];

const sampleBarData = [
  { category: 'Tech', value: 45000 },
  { category: 'Healthcare', value: 28000 },
  { category: 'Finance', value: 35000 },
  { category: 'Energy', value: 18000 },
];

const sampleRadarIndicators = [
  { name: 'Return', max: 100 },
  { name: 'Risk', max: 100 },
  { name: 'Sharpe', max: 100 },
  { name: 'Alpha', max: 100 },
  { name: 'Beta', max: 100 },
];

const sampleRadarData = [
  { name: 'Portfolio', value: [85, 45, 78, 62, 55], color: '#3a6a72' },
];

const sampleTreeMapData = [
  { name: 'Tech', value: 45000, children: [
    { name: 'AAPL', value: 20000 },
    { name: 'MSFT', value: 15000 },
    { name: 'GOOGL', value: 10000 },
  ]},
  { name: 'Healthcare', value: 25000, children: [
    { name: 'JNJ', value: 15000 },
    { name: 'PFE', value: 10000 },
  ]},
];

const sampleHeatMapData = [
  { x: 'AAPL', y: 'MSFT', value: 0.85 },
  { x: 'AAPL', y: 'GOOGL', value: 0.72 },
  { x: 'MSFT', y: 'GOOGL', value: 0.68 },
];

const sampleScatterData = [
  { name: 'Tech Stocks', color: '#3a6a72', data: [
    { x: 15, y: 12, name: 'AAPL' },
    { x: 18, y: 14, name: 'MSFT' },
    { x: 22, y: 18, name: 'NVDA' },
  ]},
];

const sampleSankeyData = {
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
  ],
};

const sampleFunnelData = [
  { name: 'Screened', value: 1000 },
  { name: 'Analyzed', value: 500 },
  { name: 'Shortlisted', value: 200 },
  { name: 'Invested', value: 50 },
];

const sampleSunburstData = [
  { name: 'Portfolio', children: [
    { name: 'Equities', value: 60, children: [
      { name: 'US', value: 40 },
      { name: 'Int.', value: 20 },
    ]},
    { name: 'Fixed Income', value: 40 },
  ]},
];

const sampleGraphData = {
  nodes: [
    { id: '1', name: 'AAPL', value: 100, category: 0 },
    { id: '2', name: 'MSFT', value: 90, category: 0 },
    { id: '3', name: 'GOOGL', value: 85, category: 0 },
  ],
  links: [
    { source: '1', target: '2', value: 0.85 },
    { source: '1', target: '3', value: 0.72 },
  ],
  categories: [{ name: 'Tech' }],
};

const sampleCalendarData = Array.from({ length: 60 }, (_, i) => {
  const date = new Date(2024, 0, 1 + i);
  return {
    date: date.toISOString().split('T')[0],
    value: Math.floor(Math.random() * 100),
  };
});

const sampleBoxplotData = [
  { name: 'Q1', value: [10, 25, 35, 45, 60] as [number, number, number, number, number] },
  { name: 'Q2', value: [15, 30, 40, 50, 65] as [number, number, number, number, number] },
  { name: 'Q3', value: [8, 22, 32, 42, 55] as [number, number, number, number, number] },
];

const sampleThemeRiverData = [
  { date: '2024-01', value: 100, name: 'Tech' },
  { date: '2024-02', value: 120, name: 'Tech' },
  { date: '2024-03', value: 110, name: 'Tech' },
  { date: '2024-01', value: 80, name: 'Healthcare' },
  { date: '2024-02', value: 90, name: 'Healthcare' },
  { date: '2024-03', value: 95, name: 'Healthcare' },
];

const sampleParallelDimensions = [
  { name: 'Return', min: 0, max: 30 },
  { name: 'Risk', min: 0, max: 25 },
  { name: 'Sharpe', min: 0, max: 3 },
];

const sampleParallelData = [
  { name: 'Fund A', value: [15, 12, 1.5], color: '#3a6a72' },
  { name: 'Fund B', value: [22, 18, 1.8], color: '#4a7a6a' },
];

const sampleTreeData = {
  name: 'Portfolio',
  children: [
    { name: 'Equities', children: [
      { name: 'US Stocks', value: 40 },
      { name: 'Int. Stocks', value: 20 },
    ]},
    { name: 'Bonds', value: 30 },
  ],
};

const sampleEffectScatterData = [
  { name: 'Hot Stocks', color: '#8a5a4a', data: [
    { x: 15, y: 25, size: 30, name: 'NVDA' },
    { x: 20, y: 30, size: 25, name: 'TSLA' },
  ]},
];

const samplePictorialData = [
  { name: 'AAPL', value: 45, symbol: pictorialSymbols.chart },
  { name: 'MSFT', value: 38, symbol: pictorialSymbols.chart },
  { name: 'GOOGL', value: 32, symbol: pictorialSymbols.chart },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHART DOCUMENTATION DATA
// ─────────────────────────────────────────────────────────────────────────────

interface ChartDoc {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  useCase: string;
  whenToUse: string[];
  whenNotToUse: string[];
  dataType: string;
  dataExample: string;
  props: Array<{
    name: string;
    type: string;
    default: string;
    description: string;
  }>;
  variants?: string[];
  codeExample: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sampleData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderChart: (data: any) => React.ReactNode;
}

const chartDocs: ChartDoc[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // FINANCIAL CHARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'line',
    name: 'LineChart',
    category: 'Financial',
    icon: TrendingUp,
    description: 'Gráfico de línea para series temporales. Ideal para mostrar evolución de valores a lo largo del tiempo.',
    useCase: 'Performance de portfolio, comparación vs benchmarks, evolución de precios.',
    whenToUse: [
      'Mostrar tendencias a lo largo del tiempo',
      'Comparar múltiples series (portfolio vs benchmark)',
      'Visualizar datos continuos',
      'Sparklines en cards de KPIs',
    ],
    whenNotToUse: [
      'Datos categóricos sin orden temporal',
      'Comparar partes de un todo (usar Pie)',
      'Mostrar distribución (usar Boxplot)',
    ],
    dataType: 'TimeSeriesDataPoint[] | SeriesData[]',
    dataExample: `// Serie única
[{ time: '2024-01', value: 100 }, { time: '2024-02', value: 108 }]

// Multi-series
[{
  id: 'portfolio',
  name: 'Portfolio',
  color: '#3a6a72',
  data: [{ x: '2024-01', y: 100 }, { x: '2024-02', y: 108 }]
}]`,
    props: [
      { name: 'data', type: 'TimeSeriesDataPoint[] | SeriesData[]', default: 'required', description: 'Datos de la serie' },
      { name: 'height', type: 'number', default: '300', description: 'Altura del gráfico en px' },
      { name: 'enableArea', type: 'boolean', default: 'false', description: 'Relleno de área bajo la línea' },
      { name: 'smooth', type: 'boolean', default: 'false', description: 'Línea suavizada (curva)' },
      { name: 'showSymbol', type: 'boolean', default: 'false', description: 'Mostrar puntos en la línea' },
      { name: 'stacked', type: 'boolean', default: 'false', description: 'Apilar series' },
      { name: 'minimal', type: 'boolean', default: 'false', description: 'Modo sparkline (sin ejes)' },
      { name: 'showDataZoom', type: 'boolean', default: 'false', description: 'Control de zoom temporal' },
      { name: 'showLegend', type: 'boolean', default: 'auto', description: 'Mostrar leyenda' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { LineChart } from '@components/charts/echarts';

<LineChart
  data={portfolioData}
  height={350}
  enableArea
  smooth
  showDataZoom
  title="Portfolio Performance"
/>`,
    sampleData: sampleMultiSeriesData,
    renderChart: (data) => <LineChart data={data} height={200} enableArea smooth />,
  },
  {
    id: 'bar',
    name: 'BarChart',
    category: 'Financial',
    icon: BarChart3,
    description: 'Gráfico de barras para comparar valores entre categorías.',
    useCase: 'Distribución por sector, returns mensuales, comparación de activos.',
    whenToUse: [
      'Comparar valores entre categorías',
      'Mostrar ranking de elementos',
      'Visualizar returns positivos/negativos',
      'Distribución por sector/región',
    ],
    whenNotToUse: [
      'Datos temporales continuos (usar Line)',
      'Proporciones de un todo (usar Pie)',
      'Más de 15 categorías (considerar TreeMap)',
    ],
    dataType: 'BarDataPoint[] | BarSeriesData[]',
    dataExample: `// Simple
[{ category: 'Tech', value: 45000 }, { category: 'Finance', value: 35000 }]

// Con colores
[{ category: 'Jan', value: 2.5, color: '#4a7a6a' }]`,
    props: [
      { name: 'data', type: 'BarDataPoint[]', default: 'required', description: 'Datos de las barras' },
      { name: 'height', type: 'number', default: '300', description: 'Altura del gráfico' },
      { name: 'horizontal', type: 'boolean', default: 'false', description: 'Barras horizontales' },
      { name: 'stacked', type: 'boolean', default: 'false', description: 'Apilar series' },
      { name: 'showValues', type: 'boolean', default: 'false', description: 'Mostrar valor en barra' },
      { name: 'colorByValue', type: 'boolean', default: 'false', description: 'Color positivo/negativo' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { BarChart } from '@components/charts/echarts';

<BarChart
  data={sectorAllocation}
  height={300}
  horizontal
  showValues
  title="Sector Allocation"
/>`,
    sampleData: sampleBarData,
    renderChart: (data) => <BarChart data={data} categories={data.map((d: { category: string }) => d.category)} height={200} />,
  },
  {
    id: 'candlestick',
    name: 'CandlestickChart',
    category: 'Financial',
    icon: CandlestickIcon,
    description: 'Gráfico de velas japonesas para datos OHLC (Open, High, Low, Close).',
    useCase: 'Trading, análisis técnico, visualización de precios de acciones.',
    whenToUse: [
      'Mostrar datos OHLC de precios',
      'Análisis técnico de acciones',
      'Visualizar volatilidad intraday',
      'Trading views con volumen',
    ],
    whenNotToUse: [
      'Datos sin OHLC (usar Line)',
      'Períodos muy largos (considerar Line)',
      'Usuarios no familiarizados con trading',
    ],
    dataType: 'OHLCData[]',
    dataExample: `[{
  time: '2024-12-01',
  open: 175.5,
  high: 178.2,
  low: 174.8,
  close: 177.3,
  volume: 45000000
}]`,
    props: [
      { name: 'data', type: 'OHLCData[]', default: 'required', description: 'Datos OHLC' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'showVolume', type: 'boolean', default: 'true', description: 'Mostrar histograma de volumen' },
      { name: 'showDataZoom', type: 'boolean', default: 'true', description: 'Control de zoom temporal' },
      { name: 'upColor', type: 'string', default: 'positive', description: 'Color para velas alcistas' },
      { name: 'downColor', type: 'string', default: 'negative', description: 'Color para velas bajistas' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { CandlestickChart } from '@components/charts/echarts';

<CandlestickChart
  data={stockPrices}
  height={400}
  showVolume
  showDataZoom
  title="AAPL Price"
/>`,
    sampleData: sampleOHLCData,
    renderChart: (data) => <CandlestickChart data={data} height={250} showVolume={false} showDataZoom={false} />,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CIRCULAR CHARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'pie',
    name: 'PieChart',
    category: 'Circular',
    icon: PieIcon,
    description: 'Gráfico circular para mostrar proporciones de un todo.',
    useCase: 'Asset allocation, distribución de portfolio, composición de índices.',
    whenToUse: [
      'Mostrar partes de un todo (100%)',
      'Máximo 5-7 categorías',
      'Destacar la proporción más grande',
      'Asset allocation simple',
    ],
    whenNotToUse: [
      'Más de 7 categorías (usar TreeMap)',
      'Comparar valores exactos (usar Bar)',
      'Datos temporales (usar Line)',
      'Valores que no suman un todo',
    ],
    dataType: 'PieDataPoint[]',
    dataExample: `[
  { name: 'US Stocks', value: 45000 },
  { name: 'Bonds', value: 25000 },
  { name: 'Cash', value: 10000 }
]`,
    props: [
      { name: 'data', type: 'PieDataPoint[]', default: 'required', description: 'Datos del pie' },
      { name: 'variant', type: "'pie' | 'donut' | 'rose' | 'half'", default: "'pie'", description: 'Variante visual' },
      { name: 'height', type: 'number', default: '300', description: 'Altura del gráfico' },
      { name: 'showLabels', type: 'boolean', default: 'true', description: 'Mostrar etiquetas' },
      { name: 'showLegend', type: 'boolean', default: 'true', description: 'Mostrar leyenda' },
      { name: 'innerRadius', type: 'string', default: "'50%'", description: 'Radio interno (donut)' },
      { name: 'centerLabel', type: 'string', default: 'undefined', description: 'Texto central (donut)' },
      { name: 'centerValue', type: 'string', default: 'undefined', description: 'Valor central (donut)' },
    ],
    variants: ['pie', 'donut', 'rose', 'half'],
    codeExample: `import { PieChart } from '@components/charts/echarts';

<PieChart
  data={allocation}
  variant="donut"
  centerValue="$125K"
  centerLabel="Total"
  height={300}
/>`,
    sampleData: samplePieData,
    renderChart: (data) => <PieChart data={data} height={200} variant="donut" showLegend={false} />,
  },
  {
    id: 'radar',
    name: 'RadarChart',
    category: 'Circular',
    icon: Radar,
    description: 'Gráfico de radar para comparar múltiples métricas.',
    useCase: 'Risk profile, factor analysis, comparación multi-dimensional.',
    whenToUse: [
      'Comparar múltiples métricas (3-8)',
      'Análisis de factores de riesgo',
      'Perfil de inversión',
      'Comparar 2-3 entidades',
    ],
    whenNotToUse: [
      'Más de 8 métricas (usar Parallel)',
      'Comparar muchas entidades (usar HeatMap)',
      'Datos temporales (usar Line)',
    ],
    dataType: 'RadarIndicator[], RadarSeriesData[]',
    dataExample: `// Indicadores (ejes)
[{ name: 'Return', max: 100 }, { name: 'Risk', max: 100 }]

// Datos
[{ name: 'Portfolio', value: [85, 45, 78], color: '#3a6a72' }]`,
    props: [
      { name: 'indicators', type: 'RadarIndicator[]', default: 'required', description: 'Ejes del radar' },
      { name: 'data', type: 'RadarSeriesData[]', default: 'required', description: 'Series de datos' },
      { name: 'height', type: 'number', default: '300', description: 'Altura del gráfico' },
      { name: 'shape', type: "'polygon' | 'circle'", default: "'polygon'", description: 'Forma del radar' },
      { name: 'showLegend', type: 'boolean', default: 'true', description: 'Mostrar leyenda' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { RadarChart } from '@components/charts/echarts';

<RadarChart
  indicators={riskFactors}
  data={portfolioProfile}
  shape="polygon"
  height={300}
/>`,
    sampleData: { indicators: sampleRadarIndicators, data: sampleRadarData },
    renderChart: (data) => <RadarChart indicators={data.indicators} data={data.data} height={200} showLegend={false} />,
  },
  {
    id: 'gauge',
    name: 'GaugeChart',
    category: 'Circular',
    icon: Gauge,
    description: 'Medidor para mostrar un valor único en un rango.',
    useCase: 'Risk level, sentiment score, portfolio health, KPIs.',
    whenToUse: [
      'Mostrar un KPI único con contexto',
      'Nivel de riesgo (0-100)',
      'Score de sentimiento',
      'Progress hacia un objetivo',
    ],
    whenNotToUse: [
      'Múltiples valores (usar Bar)',
      'Datos temporales (usar Line)',
      'Comparar categorías (usar Bar)',
    ],
    dataType: 'GaugeData',
    dataExample: `{ value: 72, name: 'Risk Score' }`,
    props: [
      { name: 'data', type: 'GaugeData', default: 'required', description: 'Valor del medidor' },
      { name: 'variant', type: "'default' | 'risk' | 'progress' | 'score'", default: "'default'", description: 'Variante visual' },
      { name: 'height', type: 'number', default: '300', description: 'Altura del gráfico' },
      { name: 'min', type: 'number', default: '0', description: 'Valor mínimo' },
      { name: 'max', type: 'number', default: '100', description: 'Valor máximo' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    variants: ['default', 'risk', 'progress', 'score'],
    codeExample: `import { GaugeChart } from '@components/charts/echarts';

<GaugeChart
  data={{ value: 72, name: 'Risk' }}
  variant="risk"
  height={250}
/>`,
    sampleData: { value: 72, name: 'Risk' },
    renderChart: (data) => <GaugeChart data={data} height={180} variant="risk" />,
  },
  {
    id: 'sunburst',
    name: 'SunburstChart',
    category: 'Circular',
    icon: Layers,
    description: 'Gráfico de sol para datos jerárquicos en forma radial.',
    useCase: 'Drill-down de allocation, estructura de portfolio multi-nivel.',
    whenToUse: [
      'Datos jerárquicos (2-4 niveles)',
      'Drill-down interactivo',
      'Mostrar estructura anidada',
      'Asset allocation detallada',
    ],
    whenNotToUse: [
      'Jerarquía muy profunda (usar Tree)',
      'Sin estructura jerárquica (usar Pie)',
      'Muchos elementos pequeños (usar TreeMap)',
    ],
    dataType: 'SunburstNode[]',
    dataExample: `[{
  name: 'Portfolio',
  children: [
    { name: 'Equities', value: 60, children: [
      { name: 'US', value: 40 },
      { name: 'Int.', value: 20 }
    ]},
    { name: 'Bonds', value: 40 }
  ]
}]`,
    props: [
      { name: 'data', type: 'SunburstNode[]', default: 'required', description: 'Datos jerárquicos' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'showLabels', type: 'boolean', default: 'true', description: 'Mostrar etiquetas' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { SunburstChart } from '@components/charts/echarts';

<SunburstChart
  data={portfolioHierarchy}
  height={400}
  showLabels
/>`,
    sampleData: sampleSunburstData,
    renderChart: (data) => <SunburstChart data={data} height={200} />,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPARISON CHARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'treemap',
    name: 'TreeMap',
    category: 'Comparison',
    icon: Grid3X3,
    description: 'Mapa de árbol para visualizar proporciones jerárquicas.',
    useCase: 'Portfolio allocation, market cap por sector, holdings breakdown.',
    whenToUse: [
      'Muchas categorías (8+)',
      'Datos jerárquicos',
      'Mostrar tamaño relativo visualmente',
      'Portfolio holdings con drill-down',
    ],
    whenNotToUse: [
      'Pocas categorías (usar Pie)',
      'Sin jerarquía (considerar Bar)',
      'Valores muy similares (difícil distinguir)',
    ],
    dataType: 'TreeMapNode[]',
    dataExample: `[{
  name: 'Tech',
  value: 45000,
  children: [
    { name: 'AAPL', value: 20000 },
    { name: 'MSFT', value: 15000 }
  ]
}]`,
    props: [
      { name: 'data', type: 'TreeMapNode[]', default: 'required', description: 'Datos jerárquicos' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'showBreadcrumb', type: 'boolean', default: 'true', description: 'Mostrar breadcrumb' },
      { name: 'colorBy', type: "'value' | 'category'", default: "'category'", description: 'Modo de color' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { TreeMap } from '@components/charts/echarts';

<TreeMap
  data={portfolioBreakdown}
  height={400}
  showBreadcrumb
  colorBy="category"
/>`,
    sampleData: sampleTreeMapData,
    renderChart: (data) => <TreeMap data={data} height={200} />,
  },
  {
    id: 'heatmap',
    name: 'HeatMap',
    category: 'Comparison',
    icon: Flame,
    description: 'Mapa de calor para matrices de correlación o datos 2D.',
    useCase: 'Correlación de activos, returns por mes/año, comparación matricial.',
    whenToUse: [
      'Matriz de correlación',
      'Datos en formato grid (X × Y)',
      'Identificar patrones en matriz',
      'Calendar heatmap de returns',
    ],
    whenNotToUse: [
      'Datos unidimensionales (usar Bar)',
      'Series temporales simples (usar Line)',
      'Pocos datos (no hay patrón visible)',
    ],
    dataType: 'HeatMapDataPoint[]',
    dataExample: `[
  { x: 'AAPL', y: 'MSFT', value: 0.85 },
  { x: 'AAPL', y: 'GOOGL', value: 0.72 }
]`,
    props: [
      { name: 'data', type: 'HeatMapDataPoint[]', default: 'required', description: 'Datos de la matriz' },
      { name: 'xLabels', type: 'string[]', default: 'auto', description: 'Etiquetas eje X' },
      { name: 'yLabels', type: 'string[]', default: 'auto', description: 'Etiquetas eje Y' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'colorScheme', type: "'sequential' | 'diverging'", default: "'sequential'", description: 'Escala de color' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { HeatMap } from '@components/charts/echarts';

<HeatMap
  data={correlationMatrix}
  xLabels={tickers}
  yLabels={tickers}
  colorScheme="diverging"
  height={400}
/>`,
    sampleData: sampleHeatMapData,
    renderChart: (data) => <HeatMap data={data} xCategories={['AAPL', 'MSFT', 'GOOGL']} yCategories={['AAPL', 'MSFT', 'GOOGL']} height={200} />,
  },
  {
    id: 'scatter',
    name: 'ScatterChart',
    category: 'Comparison',
    icon: Target,
    description: 'Gráfico de dispersión para relación entre dos variables.',
    useCase: 'Risk vs Return, Efficient Frontier, factor exposure.',
    whenToUse: [
      'Mostrar relación entre 2 variables',
      'Identificar clusters o outliers',
      'Risk vs Return scatter',
      'Efficient Frontier visualization',
    ],
    whenNotToUse: [
      'Datos temporales ordenados (usar Line)',
      'Comparar categorías (usar Bar)',
      'Sin relación XY (otros charts)',
    ],
    dataType: 'ScatterSeriesData[]',
    dataExample: `[{
  name: 'Tech Stocks',
  color: '#3a6a72',
  data: [
    { x: 15, y: 12, name: 'AAPL', size: 20 },
    { x: 18, y: 14, name: 'MSFT' }
  ]
}]`,
    props: [
      { name: 'data', type: 'ScatterSeriesData[]', default: 'required', description: 'Series de puntos' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'xAxisLabel', type: 'string', default: 'undefined', description: 'Etiqueta eje X' },
      { name: 'yAxisLabel', type: 'string', default: 'undefined', description: 'Etiqueta eje Y' },
      { name: 'showRegression', type: 'boolean', default: 'false', description: 'Línea de regresión' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { ScatterChart } from '@components/charts/echarts';

<ScatterChart
  data={riskReturnData}
  xAxisLabel="Volatility (%)"
  yAxisLabel="Return (%)"
  showRegression
  height={400}
/>`,
    sampleData: sampleScatterData,
    renderChart: (data) => <ScatterChart data={data} height={200} />,
  },
  {
    id: 'boxplot',
    name: 'BoxplotChart',
    category: 'Comparison',
    icon: BarChart2,
    description: 'Diagrama de caja para distribución estadística.',
    useCase: 'Distribución de returns, comparar volatilidad, análisis de outliers.',
    whenToUse: [
      'Mostrar distribución estadística',
      'Comparar distribuciones entre grupos',
      'Identificar outliers',
      'Returns trimestrales con dispersión',
    ],
    whenNotToUse: [
      'Audiencia no técnica',
      'Datos sin variación significativa',
      'Series temporales (usar Line)',
    ],
    dataType: 'BoxplotData[]',
    dataExample: `[{
  name: 'Q1 Returns',
  value: [min, Q1, median, Q3, max] // [10, 25, 35, 45, 60]
}]`,
    props: [
      { name: 'data', type: 'BoxplotData[]', default: 'required', description: 'Datos [min, Q1, median, Q3, max]' },
      { name: 'height', type: 'number', default: '300', description: 'Altura del gráfico' },
      { name: 'horizontal', type: 'boolean', default: 'false', description: 'Orientación horizontal' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { BoxplotChart } from '@components/charts/echarts';

<BoxplotChart
  data={quarterlyReturns}
  height={300}
  title="Quarterly Return Distribution"
/>`,
    sampleData: sampleBoxplotData,
    renderChart: (data) => <BoxplotChart data={data} height={200} />,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FLOW CHARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'sankey',
    name: 'SankeyChart',
    category: 'Flow',
    icon: GitBranch,
    description: 'Diagrama de flujo para mostrar cómo se mueven valores entre nodos.',
    useCase: 'Cash flow, rebalancing flows, income allocation.',
    whenToUse: [
      'Mostrar flujos entre categorías',
      'Visualizar de dónde viene y a dónde va',
      'Rebalancing de portfolio',
      'Income → Savings → Investments flow',
    ],
    whenNotToUse: [
      'Sin flujos direccionales (usar TreeMap)',
      'Relaciones bidireccionales complejas (usar Graph)',
      'Datos simples (usar Bar)',
    ],
    dataType: 'SankeyData { nodes, links }',
    dataExample: `{
  nodes: [{ name: 'Income' }, { name: 'Stocks' }, { name: 'Bonds' }],
  links: [
    { source: 'Income', target: 'Stocks', value: 60 },
    { source: 'Income', target: 'Bonds', value: 40 }
  ]
}`,
    props: [
      { name: 'data', type: 'SankeyData', default: 'required', description: 'Nodos y enlaces' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'nodeWidth', type: 'number', default: '20', description: 'Ancho de nodos' },
      { name: 'nodeGap', type: 'number', default: '8', description: 'Espacio entre nodos' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { SankeyChart } from '@components/charts/echarts';

<SankeyChart
  data={cashFlowData}
  height={400}
  title="Income Allocation"
/>`,
    sampleData: sampleSankeyData,
    renderChart: (data) => <SankeyChart data={data} height={200} />,
  },
  {
    id: 'funnel',
    name: 'FunnelChart',
    category: 'Flow',
    icon: GitMerge,
    description: 'Embudo para mostrar reducción progresiva en etapas.',
    useCase: 'Investment screening process, conversion funnel.',
    whenToUse: [
      'Proceso de filtrado/screening',
      'Mostrar reducción secuencial',
      'Funnel de conversión',
      'Proceso de due diligence',
    ],
    whenNotToUse: [
      'Sin reducción secuencial (usar Bar)',
      'Flujos bidireccionales (usar Sankey)',
      'Datos sin orden lógico',
    ],
    dataType: 'FunnelDataPoint[]',
    dataExample: `[
  { name: 'Screened', value: 1000 },
  { name: 'Analyzed', value: 500 },
  { name: 'Invested', value: 50 }
]`,
    props: [
      { name: 'data', type: 'FunnelDataPoint[]', default: 'required', description: 'Etapas del funnel' },
      { name: 'height', type: 'number', default: '300', description: 'Altura del gráfico' },
      { name: 'sort', type: "'descending' | 'ascending' | 'none'", default: "'descending'", description: 'Ordenamiento' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { FunnelChart } from '@components/charts/echarts';

<FunnelChart
  data={screeningProcess}
  height={300}
  title="Stock Screening Funnel"
/>`,
    sampleData: sampleFunnelData,
    renderChart: (data) => <FunnelChart data={data} height={200} />,
  },
  {
    id: 'graph',
    name: 'GraphChart',
    category: 'Flow',
    icon: Network,
    description: 'Red de nodos y conexiones para relaciones complejas.',
    useCase: 'Correlation network, company relationships, ownership structure.',
    whenToUse: [
      'Relaciones muchos-a-muchos',
      'Network de correlaciones',
      'Estructura de ownership',
      'Clusters de activos relacionados',
    ],
    whenNotToUse: [
      'Flujos unidireccionales (usar Sankey)',
      'Jerarquía simple (usar Tree)',
      'Pocas relaciones (usar Radar)',
    ],
    dataType: 'GraphData { nodes, links, categories? }',
    dataExample: `{
  nodes: [
    { id: '1', name: 'AAPL', value: 100, category: 0 },
    { id: '2', name: 'MSFT', value: 90, category: 0 }
  ],
  links: [{ source: '1', target: '2', value: 0.85 }],
  categories: [{ name: 'Tech' }]
}`,
    props: [
      { name: 'data', type: 'GraphData', default: 'required', description: 'Nodos, enlaces y categorías' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'layout', type: "'force' | 'circular'", default: "'force'", description: 'Algoritmo de layout' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { GraphChart } from '@components/charts/echarts';

<GraphChart
  data={correlationNetwork}
  layout="force"
  height={400}
/>`,
    sampleData: sampleGraphData,
    renderChart: (data) => <GraphChart data={data} height={200} layout="circular" />,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIME-BASED & SPECIAL CHARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'calendar',
    name: 'CalendarChart',
    category: 'Time-Based',
    icon: Calendar,
    description: 'Calendario heatmap para actividad diaria.',
    useCase: 'Trading activity, daily returns, contribution calendar.',
    whenToUse: [
      'Actividad diaria durante un año',
      'Patrones semanales/mensuales',
      'GitHub-style activity calendar',
      'Daily return heatmap',
    ],
    whenNotToUse: [
      'Datos no diarios (usar Line)',
      'Sin patrón calendario',
      'Períodos cortos (< 3 meses)',
    ],
    dataType: 'CalendarDataPoint[]',
    dataExample: `[
  { date: '2024-01-15', value: 85 },
  { date: '2024-01-16', value: 42 }
]`,
    props: [
      { name: 'data', type: 'CalendarDataPoint[]', default: 'required', description: 'Datos diarios' },
      { name: 'year', type: 'number', default: 'current', description: 'Año a mostrar' },
      { name: 'height', type: 'number', default: '200', description: 'Altura del gráfico' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { CalendarChart } from '@components/charts/echarts';

<CalendarChart
  data={tradingActivity}
  year={2024}
  height={200}
/>`,
    sampleData: sampleCalendarData,
    renderChart: (data) => <CalendarChart data={data} year={2024} height={150} />,
  },
  {
    id: 'themeriver',
    name: 'ThemeRiverChart',
    category: 'Time-Based',
    icon: Waves,
    description: 'Río temático para evolución de múltiples series apiladas.',
    useCase: 'Market share evolution, sector performance over time.',
    whenToUse: [
      'Evolución de composición en el tiempo',
      'Múltiples series que suman un total',
      'Tendencias de market share',
      'Flujo temporal de categorías',
    ],
    whenNotToUse: [
      'Serie única (usar Area Line)',
      'Sin dimensión temporal',
      'Comparación exacta (usar Stacked Bar)',
    ],
    dataType: 'ThemeRiverDataPoint[]',
    dataExample: `[
  { date: '2024-01', value: 100, name: 'Tech' },
  { date: '2024-01', value: 80, name: 'Healthcare' }
]`,
    props: [
      { name: 'data', type: 'ThemeRiverDataPoint[]', default: 'required', description: 'Datos del río' },
      { name: 'height', type: 'number', default: '300', description: 'Altura del gráfico' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { ThemeRiverChart } from '@components/charts/echarts';

<ThemeRiverChart
  data={marketShareData}
  height={300}
/>`,
    sampleData: sampleThemeRiverData,
    renderChart: (data) => <ThemeRiverChart data={data} height={180} />,
  },
  {
    id: 'parallel',
    name: 'ParallelChart',
    category: 'Multi-Dimensional',
    icon: SlidersHorizontal,
    description: 'Coordenadas paralelas para comparar múltiples dimensiones.',
    useCase: 'Fund screening, multi-factor comparison, portfolio filtering.',
    whenToUse: [
      'Comparar 4+ métricas simultáneas',
      'Filtrar datos multi-dimensionales',
      'Análisis de fondos/ETFs',
      'Screening con múltiples criterios',
    ],
    whenNotToUse: [
      'Pocas métricas (usar Radar)',
      'Sin interacción de filtrado',
      'Audiencia no técnica',
    ],
    dataType: 'ParallelDimension[], ParallelSeriesData[]',
    dataExample: `// Dimensiones
[
  { name: 'Return', min: 0, max: 30 },
  { name: 'Risk', min: 0, max: 25 }
]

// Datos
[{ name: 'Fund A', value: [15, 12, 1.5], color: '#3a6a72' }]`,
    props: [
      { name: 'dimensions', type: 'ParallelDimension[]', default: 'required', description: 'Ejes paralelos' },
      { name: 'data', type: 'ParallelSeriesData[]', default: 'required', description: 'Series de datos' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { ParallelChart } from '@components/charts/echarts';

<ParallelChart
  dimensions={fundMetrics}
  data={fundComparison}
  height={400}
/>`,
    sampleData: { dimensions: sampleParallelDimensions, data: sampleParallelData },
    renderChart: (data) => <ParallelChart dimensions={data.dimensions} data={data.data} height={200} />,
  },
  {
    id: 'tree',
    name: 'TreeChart',
    category: 'Hierarchical',
    icon: GitBranch,
    description: 'Árbol jerárquico para estructuras padre-hijo.',
    useCase: 'Org structure, category taxonomy, decision tree.',
    whenToUse: [
      'Estructura jerárquica clara',
      'Relaciones padre-hijo',
      'Taxonomía de categorías',
      'Decision tree visualization',
    ],
    whenNotToUse: [
      'Proporciones (usar TreeMap)',
      'Datos radiales (usar Sunburst)',
      'Jerarquía muy profunda (>5 niveles)',
    ],
    dataType: 'TreeNode (recursive)',
    dataExample: `{
  name: 'Portfolio',
  children: [
    { name: 'Equities', children: [
      { name: 'US Stocks', value: 40 }
    ]},
    { name: 'Bonds', value: 30 }
  ]
}`,
    props: [
      { name: 'data', type: 'TreeNode', default: 'required', description: 'Raíz del árbol' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'layout', type: "'orthogonal' | 'radial'", default: "'orthogonal'", description: 'Layout del árbol' },
      { name: 'orient', type: "'LR' | 'TB' | 'RL' | 'BT'", default: "'LR'", description: 'Orientación' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { TreeChart } from '@components/charts/echarts';

<TreeChart
  data={portfolioStructure}
  layout="orthogonal"
  orient="LR"
  height={400}
/>`,
    sampleData: sampleTreeData,
    renderChart: (data) => <TreeChart data={data} height={200} orient="TB" />,
  },
  {
    id: 'effectscatter',
    name: 'EffectScatterChart',
    category: 'Effect',
    icon: Sparkles,
    description: 'Scatter con efectos visuales de ripple/pulsing.',
    useCase: 'Highlight hot stocks, alertas visuales, emphasis points.',
    whenToUse: [
      'Destacar puntos importantes',
      'Alertas o anomalías',
      'Hot stocks / trending',
      'Llamar atención visual',
    ],
    whenNotToUse: [
      'Muchos puntos (distrae)',
      'Análisis serio (usar Scatter normal)',
      'Datos sin necesidad de énfasis',
    ],
    dataType: 'EffectScatterSeriesData[]',
    dataExample: `[{
  name: 'Hot Stocks',
  color: '#8a5a4a',
  data: [
    { x: 15, y: 25, size: 30, name: 'NVDA' }
  ]
}]`,
    props: [
      { name: 'data', type: 'EffectScatterSeriesData[]', default: 'required', description: 'Series con efecto' },
      { name: 'height', type: 'number', default: '400', description: 'Altura del gráfico' },
      { name: 'effectType', type: "'ripple'", default: "'ripple'", description: 'Tipo de efecto' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { EffectScatterChart } from '@components/charts/echarts';

<EffectScatterChart
  data={hotStocks}
  height={400}
/>`,
    sampleData: sampleEffectScatterData,
    renderChart: (data) => <EffectScatterChart data={data} height={200} />,
  },
  {
    id: 'pictorialbar',
    name: 'PictorialBarChart',
    category: 'Pictorial',
    icon: ImageIcon,
    description: 'Barras con símbolos/iconos para representación visual.',
    useCase: 'Infographic-style data, visual reports, presentations.',
    whenToUse: [
      'Presentaciones e infografías',
      'Reportes visuales',
      'Audiencia no técnica',
      'Marketing materials',
    ],
    whenNotToUse: [
      'Análisis técnico serio',
      'Comparación precisa (usar Bar)',
      'Muchas categorías',
    ],
    dataType: 'PictorialBarDataPoint[]',
    dataExample: `[
  { name: 'AAPL', value: 45, symbol: pictorialSymbols.stock },
  { name: 'MSFT', value: 38, symbol: pictorialSymbols.stock }
]`,
    props: [
      { name: 'data', type: 'PictorialBarDataPoint[]', default: 'required', description: 'Datos con símbolos' },
      { name: 'height', type: 'number', default: '300', description: 'Altura del gráfico' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Título del gráfico' },
    ],
    codeExample: `import { PictorialBarChart, pictorialSymbols } from '@components/charts/echarts';

<PictorialBarChart
  data={stockData}
  height={300}
/>`,
    sampleData: samplePictorialData,
    renderChart: (data) => <PictorialBarChart data={data} height={200} />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SELECTION GUIDE DATA
// ─────────────────────────────────────────────────────────────────────────────

interface SelectionGuide {
  question: string;
  options: Array<{
    answer: string;
    charts: string[];
  }>;
}

const selectionGuide: SelectionGuide[] = [
  {
    question: '¿Qué quiero mostrar?',
    options: [
      { answer: 'Tendencia en el tiempo', charts: ['line', 'candlestick', 'themeriver'] },
      { answer: 'Proporciones de un todo', charts: ['pie', 'treemap', 'sunburst'] },
      { answer: 'Comparación entre categorías', charts: ['bar', 'radar', 'parallel'] },
      { answer: 'Relación entre 2 variables', charts: ['scatter', 'effectscatter', 'heatmap'] },
      { answer: 'Flujo o proceso', charts: ['sankey', 'funnel', 'graph'] },
      { answer: 'Estructura jerárquica', charts: ['tree', 'treemap', 'sunburst'] },
      { answer: 'Distribución estadística', charts: ['boxplot', 'heatmap'] },
      { answer: 'KPI único', charts: ['gauge'] },
      { answer: 'Actividad diaria', charts: ['calendar'] },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'relative',
      background: '#1e1e1e',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        background: '#2d2d2d',
        borderBottom: '1px solid #3d3d3d',
      }}>
        <span style={{ color: '#888', fontSize: '11px', fontFamily: 'var(--sentinel-font-mono)' }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: copied ? '#4a7a6a' : '#888',
            cursor: 'pointer',
            fontSize: '11px',
            fontFamily: 'var(--sentinel-font-mono)',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{
        margin: 0,
        padding: '12px',
        overflow: 'auto',
        fontSize: '12px',
        lineHeight: 1.5,
        fontFamily: 'var(--sentinel-font-mono)',
        color: '#d4d4d4',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ChartDocCard({
  doc,
  expanded,
  onToggle,
  panelShadow,
  insetShadow,
  MARBLE,
}: {
  doc: ChartDoc;
  expanded: boolean;
  onToggle: () => void;
  panelShadow: string;
  insetShadow: string;
  MARBLE: { base: string; shadowDark: string; shadowLight: string };
}) {
  const Icon = doc.icon;

  // ═══════════════════════════════════════════════════════════════════════════
  // FONTS & PETROL-BASED TEXT EFFECTS
  // ═══════════════════════════════════════════════════════════════════════════
  const FONTS = {
    display: "'Libre Baskerville', Georgia, serif",
    primary: "'DM Sans', -apple-system, sans-serif",
    mono: "'IBM Plex Mono', 'SF Mono', monospace",
  };

  const PETROL = {
    primary: '#3a6a72',
    dark: '#2a5a62',
    light: '#4a7a82',
    muted: '#5a8a92',
  };

  // Card title - Petrol mono
  const cardTitleStyle: CSSProperties = {
    fontFamily: FONTS.mono,
    color: PETROL.primary,
    textShadow: '0px -1px 0px rgba(255, 255, 255, 0.5), 0px 1px 1px rgba(58, 106, 114, 0.12)',
  };

  // Subtitle - Lighter petrol
  const subtitleStyle: CSSProperties = {
    fontFamily: FONTS.primary,
    color: PETROL.muted,
    textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.4)',
  };

  // Body text - Main petrol
  const bodyStyle: CSSProperties = {
    fontFamily: FONTS.primary,
    color: PETROL.primary,
    textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.4)',
  };

  // Section header in INSET container (embossed) - Light with petrol shadow
  const embossedStyle: CSSProperties = {
    fontFamily: FONTS.primary,
    color: '#c5d0d2',
    textShadow: '-1px -1px 0px rgba(255, 255, 255, 0.95), 1px 1px 0px rgba(58, 106, 114, 0.4)',
  };

  // Code/mono text - Petrol
  const codeStyle: CSSProperties = {
    fontFamily: FONTS.mono,
    color: PETROL.primary,
    textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.4)',
  };

  // Positive - Jade (semantic)
  const positiveStyle: CSSProperties = {
    fontFamily: FONTS.primary,
    color: '#3d7a5c',
    textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45)',
  };

  // Negative - Rust (semantic)
  const negativeStyle: CSSProperties = {
    fontFamily: FONTS.primary,
    color: '#8a4a4a',
    textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45)',
  };

  // Teal/Petrol accent
  const tealStyle: CSSProperties = {
    fontFamily: FONTS.primary,
    color: PETROL.primary,
    textShadow: '0px -1px 0px rgba(255, 255, 255, 0.5)',
  };

  // Card container - RAISED level
  const cardStyles: CSSProperties = {
    background: MARBLE.base,
    borderRadius: '20px',
    boxShadow: panelShadow,
    overflow: 'hidden',
    transition: 'box-shadow 50ms linear',
  };

  // Header in RAISED container
  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    cursor: 'pointer',
    userSelect: 'none',
  };

  // Icon container - INSET level (inside RAISED card)
  const iconContainerStyles: CSSProperties = {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: MARBLE.base,
    boxShadow: insetShadow,
  };

  // Category badge - GLASS level (inside RAISED card)
  const categoryBadgeStyles: CSSProperties = {
    padding: '6px 12px',
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '8px',
    fontSize: '10px',
    fontFamily: 'var(--sentinel-font-mono)',
    color: '#3a6a72',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  };

  return (
    <div style={cardStyles}>
      {/* Header - RAISED level */}
      <div style={headerStyles} onClick={onToggle}>
        {/* Icon - INSET level */}
        <div style={iconContainerStyles}>
          <Icon size={22} color="#3a6a72" />
        </div>

        <div style={{ flex: 1 }}>
          {/* Title - Legible typography */}
          <div style={{
            fontSize: '18px',
            fontWeight: 600,
            ...cardTitleStyle,
          }}>
            {doc.name}
          </div>
          <div style={{
            fontSize: '13px',
            marginTop: '4px',
            lineHeight: 1.4,
            ...subtitleStyle,
          }}>
            {doc.description.slice(0, 70)}...
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Category badge - GLASS level */}
          <span style={categoryBadgeStyles}>
            {doc.category}
          </span>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: MARBLE.base,
            boxShadow: insetShadow,
          }}>
            {expanded ? <ChevronDown size={16} color="#3a6a72" /> : <ChevronRight size={16} color="#3a6a72" />}
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: '0 24px 24px' }}>
          {/* Preview - INSET container */}
          <div style={{
            background: MARBLE.base,
            borderRadius: '15px',
            boxShadow: insetShadow,
            padding: '20px',
            marginBottom: '24px',
          }}>
            {doc.renderChart(doc.sampleData)}
          </div>

          {/* Description Section - INSET container */}
          <div style={{
            background: MARBLE.base,
            borderRadius: '15px',
            boxShadow: insetShadow,
            padding: '20px',
            marginBottom: '20px',
          }}>
            {/* Title with embossed typography in INSET */}
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              ...embossedStyle,
            }}>
              <Info size={16} /> Descripción
            </h4>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.7,
              margin: 0,
              ...bodyStyle,
            }}>
              {doc.description}
            </p>
            {/* Use case - GLASS item inside INSET */}
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '10px',
            }}>
              <span style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                ...subtitleStyle,
              }}>
                Caso de uso
              </span>
              <p style={{
                fontSize: '13px',
                margin: '6px 0 0',
                fontStyle: 'italic',
                lineHeight: 1.5,
                ...bodyStyle,
              }}>
                {doc.useCase}
              </p>
            </div>
          </div>

          {/* When to Use / When Not - Two INSET containers side by side */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '20px',
          }}>
            {/* When to Use - INSET container with Jade accent */}
            <div style={{
              background: MARBLE.base,
              borderRadius: '15px',
              boxShadow: insetShadow,
              padding: '16px',
              borderLeft: '3px solid #4a7a6a',
            }}>
              <h5 style={{
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                ...positiveStyle,
              }}>
                <Lightbulb size={14} /> Cuándo usar
              </h5>
              <ul style={{
                margin: 0,
                paddingLeft: '18px',
                fontSize: '12px',
                lineHeight: 1.9,
                ...bodyStyle,
              }}>
                {doc.whenToUse.map((item, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </div>

            {/* When NOT to Use - INSET container with Rust accent */}
            <div style={{
              background: MARBLE.base,
              borderRadius: '15px',
              boxShadow: insetShadow,
              padding: '16px',
              borderLeft: '3px solid #8a5a4a',
            }}>
              <h5 style={{
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                ...negativeStyle,
              }}>
                <AlertCircle size={14} /> Cuándo NO usar
              </h5>
              <ul style={{
                margin: 0,
                paddingLeft: '18px',
                fontSize: '12px',
                lineHeight: 1.9,
                ...bodyStyle,
              }}>
                {doc.whenNotToUse.map((item, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Variants - GLASS items inside RAISED card */}
          {doc.variants && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                ...cardTitleStyle,
              }}>
                Variantes
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {doc.variants.map((v) => (
                  <span
                    key={v}
                    style={{
                      padding: '8px 14px',
                      background: 'rgba(255, 255, 255, 0.35)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      borderRadius: '10px',
                      fontSize: '12px',
                      ...codeStyle,
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Data Type - INSET container */}
          <div style={{
            background: MARBLE.base,
            borderRadius: '15px',
            boxShadow: insetShadow,
            padding: '20px',
            marginBottom: '20px',
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '12px',
              ...embossedStyle,
            }}>
              Tipo de Datos
            </h4>
            {/* Type badge - GLASS inside INSET */}
            <code style={{
              display: 'inline-block',
              padding: '10px 16px',
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '10px',
              fontSize: '13px',
              ...codeStyle,
            }}>
              {doc.dataType}
            </code>
            <div style={{ marginTop: '16px' }}>
              <CodeBlock code={doc.dataExample} language="typescript" />
            </div>
          </div>

          {/* Props Table - INSET container */}
          <div style={{
            background: MARBLE.base,
            borderRadius: '15px',
            boxShadow: insetShadow,
            padding: '20px',
            marginBottom: '20px',
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '16px',
              ...embossedStyle,
            }}>
              Props
            </h4>
            {/* Table with GLASS rows */}
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '12px',
                fontFamily: FONTS.primary,
              }}>
                <thead>
                  <tr style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(8px)',
                  }}>
                    <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, ...tealStyle }}>Prop</th>
                    <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, ...tealStyle }}>Type</th>
                    <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, ...tealStyle }}>Default</th>
                    <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, ...tealStyle }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.props.map((prop, i) => (
                    <tr key={prop.name} style={{
                      background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)',
                    }}>
                      <td style={{
                        padding: '10px 14px',
                        fontWeight: 500,
                        ...codeStyle,
                      }}>
                        {prop.name}
                      </td>
                      <td style={{
                        padding: '10px 14px',
                        fontSize: '11px',
                        ...codeStyle,
                        color: '#5a6578',
                      }}>
                        {prop.type}
                      </td>
                      <td style={{
                        padding: '10px 14px',
                        ...codeStyle,
                        color: '#8896a6',
                      }}>
                        {prop.default}
                      </td>
                      <td style={{ padding: '10px 14px', ...bodyStyle }}>
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Example - INSET container */}
          <div style={{
            background: MARBLE.base,
            borderRadius: '15px',
            boxShadow: insetShadow,
            padding: '20px',
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '16px',
              ...embossedStyle,
            }}>
              Ejemplo de Código
            </h4>
            <CodeBlock code={doc.codeExample} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function ChartsDocsContent() {
  const { lightAngle } = useLightEngine();
  const [expandedChart, setExpandedChart] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // FONTS - FING Typography System
  // ═══════════════════════════════════════════════════════════════════════════
  const FONTS = {
    display: "'Libre Baskerville', Georgia, serif",
    primary: "'DM Sans', -apple-system, sans-serif",
    mono: "'IBM Plex Mono', 'SF Mono', monospace",
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LEGIBLE TEXT EFFECTS - Petrol-based for consistency
  // ═══════════════════════════════════════════════════════════════════════════
  const PETROL = {
    primary: '#3a6a72',      // Main petrol
    dark: '#2a5a62',         // Darker for emphasis
    light: '#4a7a82',        // Lighter variant
    muted: '#5a8a92',        // Muted/secondary
  };

  const fx = useMemo(() => ({
    // Page title - Large display text
    pageTitle: (): CSSProperties => ({
      fontFamily: FONTS.display,
      color: PETROL.dark,
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.6), 0px 1px 2px rgba(58, 106, 114, 0.2)',
    }),
    // Section title - Medium headers
    sectionTitle: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: PETROL.primary,
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.55), 0px 1px 1px rgba(58, 106, 114, 0.15)',
    }),
    // Card title - Component headers
    cardTitle: (): CSSProperties => ({
      fontFamily: FONTS.mono,
      color: PETROL.primary,
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.5), 0px 1px 1px rgba(58, 106, 114, 0.12)',
    }),
    // Subtitle - Secondary headers
    subtitle: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: PETROL.light,
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45), 0px 1px 1px rgba(58, 106, 114, 0.1)',
    }),
    // Body text - Readable content
    body: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: PETROL.primary,
      textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.4)',
    }),
    // Caption - Small text
    caption: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: PETROL.muted,
      textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.35)',
    }),
    // Muted - Disabled/hint text
    muted: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: '#7a9a9e',
      textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.3)',
    }),
    // Code/Mono - Technical text
    code: (): CSSProperties => ({
      fontFamily: FONTS.mono,
      color: PETROL.primary,
      textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.4)',
    }),
    // Teal accent (same as petrol for consistency)
    teal: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: PETROL.primary,
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.5)',
    }),
    // Positive - Jade (keep semantic color)
    positive: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: '#3d7a5c',
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45)',
    }),
    // Negative - Rust (keep semantic color)
    negative: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: '#8a4a4a',
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45)',
    }),
    // Warning - Gold (keep semantic color)
    warning: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: '#8a7a3a',
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45)',
    }),
    // Embossed - For INSET containers (raised text) - Petrol tinted
    embossed: (): CSSProperties => ({
      fontFamily: FONTS.primary,
      color: '#c5d0d2',
      textShadow: '-1px -1px 0px rgba(255, 255, 255, 0.95), 1px 1px 0px rgba(58, 106, 114, 0.4)',
    }),
  }), [FONTS.display, FONTS.primary, FONTS.mono]);

  // ═══════════════════════════════════════════════════════════════════════════
  // STONE MARBLE SHADOWS
  // ═══════════════════════════════════════════════════════════════════════════

  // RAISED - Elements floating above the surface
  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  // INSET - Carved into the surface
  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  // GLASS - Used for items inside INSET containers
  const glassStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  };

  const categories = ['all', ...new Set(chartDocs.map((d) => d.category))];

  const filteredCharts = chartDocs.filter((doc) => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ background: MARBLE.base, minHeight: '100vh', padding: '32px' }}>
      {/* ═══════════════════════════════════════════════════════════════════════
          HEADER - RAISED container
          ═══════════════════════════════════════════════════════════════════════ */}
      <header style={{
        marginBottom: '32px',
        padding: '28px 32px',
        background: MARBLE.base,
        borderRadius: '24px',
        boxShadow: getNeuPanelShadow(12, 36),
        transition: 'box-shadow 50ms linear',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '24px',
        }}>
          <div>
            {/* Title - Legible display typography */}
            <h1 style={{
              fontSize: '36px',
              fontWeight: 400,
              marginBottom: '8px',
              letterSpacing: '-0.01em',
              ...fx.pageTitle(),
            }}>
              Charts Documentation
            </h1>
            <p style={{
              fontSize: '14px',
              letterSpacing: '0.02em',
              lineHeight: 1.5,
              ...fx.caption(),
            }}>
              Guía completa de visualización de datos para diseñadores de producto
            </p>
          </div>

          {/* Download Button - GLASS style */}
          <a
            href="/charts-documentation.md"
            download="charts-documentation.md"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'rgba(58, 106, 114, 0.1)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(58, 106, 114, 0.25)',
              borderRadius: '12px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              ...fx.teal(),
              fontSize: '13px',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(58, 106, 114, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(58, 106, 114, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(58, 106, 114, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(58, 106, 114, 0.25)';
            }}
          >
            <Download size={16} />
            <span>Download Documentation</span>
          </a>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          SELECTION GUIDE - RAISED container with INSET options
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        marginBottom: '32px',
        padding: '28px',
        background: MARBLE.base,
        borderRadius: '24px',
        boxShadow: getNeuPanelShadow(8, 24),
        transition: 'box-shadow 50ms linear',
      }}>
        {/* Section title - Legible typography */}
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '8px',
          ...fx.sectionTitle(),
        }}>
          Guía de Selección
        </h2>
        <p style={{
          fontSize: '14px',
          marginBottom: '24px',
          lineHeight: 1.6,
          ...fx.body(),
        }}>
          {selectionGuide[0].question}
        </p>

        {/* Options grid - each option is INSET */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {selectionGuide[0].options.map((option) => (
            <div
              key={option.answer}
              style={{
                padding: '16px 20px',
                background: MARBLE.base,
                borderRadius: '15px',
                boxShadow: getNeuInsetShadow(4, 10),
                transition: 'box-shadow 50ms linear',
              }}
            >
              {/* Option title - Embossed text in INSET container */}
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                ...fx.embossed(),
              }}>
                {option.answer}
              </div>
              {/* Chart buttons - GLASS inside INSET */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {option.charts.map((chartId) => {
                  const chart = chartDocs.find((d) => d.id === chartId);
                  return chart ? (
                    <button
                      key={chartId}
                      onClick={() => {
                        setExpandedChart(chartId);
                        setSelectedCategory('all');
                      }}
                      style={{
                        padding: '6px 12px',
                        ...glassStyle,
                        borderRadius: '8px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        transition: 'all 150ms ease',
                        ...fx.code(),
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.55)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)';
                      }}
                    >
                      {chart.name}
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FILTERS - RAISED buttons
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        marginBottom: '24px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {/* Category filter buttons - RAISED when inactive, INSET when active */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px 18px',
                background: selectedCategory === cat ? '#3a6a72' : MARBLE.base,
                border: 'none',
                borderRadius: '12px',
                boxShadow: selectedCategory === cat
                  ? getNeuInsetShadow(3, 8)
                  : getNeuPanelShadow(4, 10),
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: FONTS.primary,
                transition: 'all 150ms ease, box-shadow 50ms linear',
                color: selectedCategory === cat ? '#fff' : '#4a5568',
                textShadow: selectedCategory === cat
                  ? 'none'
                  : '0px -0.5px 0px rgba(255, 255, 255, 0.4)',
              }}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        {/* Search input - INSET */}
        <input
          type="text"
          placeholder="Buscar chart..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '12px 18px',
            background: MARBLE.base,
            border: 'none',
            borderRadius: '12px',
            boxShadow: getNeuInsetShadow(4, 10),
            fontSize: '13px',
            fontFamily: FONTS.primary,
            width: '220px',
            outline: 'none',
            color: '#2d3748',
            transition: 'box-shadow 50ms linear',
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CHARTS GRID - RAISED cards
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        {filteredCharts.map((doc) => (
          <ChartDocCard
            key={doc.id}
            doc={doc}
            expanded={expandedChart === doc.id}
            onToggle={() => setExpandedChart(expandedChart === doc.id ? null : doc.id)}
            panelShadow={getNeuPanelShadow(8, 20)}
            insetShadow={getNeuInsetShadow(4, 12)}
            MARBLE={MARBLE}
          />
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          QUICK REFERENCE - RAISED container with INSET table
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        marginTop: '48px',
        padding: '28px',
        background: MARBLE.base,
        borderRadius: '24px',
        boxShadow: getNeuPanelShadow(8, 24),
        transition: 'box-shadow 50ms linear',
      }}>
        {/* Section title - Legible typography */}
        <h2 style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '20px',
          ...fx.sectionTitle(),
        }}>
          Referencia Rápida
        </h2>

        {/* Table container - INSET */}
        <div style={{
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(4, 12),
          overflow: 'hidden',
          padding: '4px',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            fontFamily: FONTS.primary,
          }}>
            <thead>
              {/* Header row - GLASS */}
              <tr style={{
                ...glassStyle,
                background: 'rgba(255, 255, 255, 0.4)',
              }}>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, ...fx.teal() }}>Chart</th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, ...fx.teal() }}>Categoría</th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, ...fx.teal() }}>Mejor para</th>
                <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, ...fx.teal() }}>Tipo de dato</th>
              </tr>
            </thead>
            <tbody>
              {/* Data rows - alternating GLASS */}
              {chartDocs.map((doc, i) => (
                <tr key={doc.id} style={{
                  background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  transition: 'background 150ms ease',
                }}
                  onClick={() => setExpandedChart(doc.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = i % 2 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <td style={{
                    padding: '12px 16px',
                    fontWeight: 500,
                    ...fx.code(),
                  }}>
                    {doc.name}
                  </td>
                  <td style={{ padding: '12px 16px', ...fx.body() }}>
                    {doc.category}
                  </td>
                  <td style={{ padding: '12px 16px', ...fx.body() }}>
                    {doc.whenToUse[0]}
                  </td>
                  <td style={{
                    padding: '10px 12px',
                    fontSize: '11px',
                    ...fx.code(),
                  }}>
                    {doc.dataType.split('|')[0].trim()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export function ChartsDocsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <ChartsDocsContent />
    </LightEngineProvider>
  );
}

export default ChartsDocsShowcase;
