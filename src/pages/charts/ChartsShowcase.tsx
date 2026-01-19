// Path: src/pages/charts/ChartsShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Charts Hub
import { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import {
  CandlestickChart,
  LineChart,
  BarChart,
  PieChart,
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
import { StatCard } from '../../components/charts/StatCard';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  BarChart3,
  LineChart as LineIcon,
  CandlestickChart as CandlestickIcon,
  Percent,
  Wallet,
  PieChart as PieIcon,
  Target,
  Zap,
  Grid3X3,
  Network,
  GitBranch,
  Calendar,
  Radar,
  Gauge,
  Layers,
  Flame,
  Sun,
  BarChart2,
  Waves,
  SlidersHorizontal,
  GitMerge,
  Sparkles,
  ImageIcon,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - FINANCIAL
// ─────────────────────────────────────────────────────────────────────────────

const candlestickData = [
  { time: '2024-12-01', open: 175.5, high: 178.2, low: 174.8, close: 177.3, volume: 45000000 },
  { time: '2024-12-02', open: 177.3, high: 179.5, low: 176.2, close: 178.8, volume: 52000000 },
  { time: '2024-12-03', open: 178.8, high: 180.0, low: 177.0, close: 177.5, volume: 48000000 },
  { time: '2024-12-04', open: 177.5, high: 178.8, low: 175.0, close: 175.8, volume: 55000000 },
  { time: '2024-12-05', open: 175.8, high: 177.2, low: 174.5, close: 176.9, volume: 42000000 },
  { time: '2024-12-06', open: 176.9, high: 180.5, low: 176.5, close: 180.2, volume: 62000000 },
  { time: '2024-12-09', open: 180.2, high: 182.0, low: 179.0, close: 181.5, volume: 58000000 },
  { time: '2024-12-10', open: 181.5, high: 183.2, low: 180.5, close: 182.8, volume: 51000000 },
  { time: '2024-12-11', open: 182.8, high: 184.0, low: 181.0, close: 181.2, volume: 47000000 },
  { time: '2024-12-12', open: 181.2, high: 182.5, low: 179.5, close: 180.0, volume: 53000000 },
  { time: '2024-12-13', open: 180.0, high: 181.8, low: 178.2, close: 181.5, volume: 49000000 },
  { time: '2024-12-16', open: 181.5, high: 185.0, low: 181.0, close: 184.5, volume: 68000000 },
  { time: '2024-12-17', open: 184.5, high: 186.2, low: 183.5, close: 185.8, volume: 72000000 },
  { time: '2024-12-18', open: 185.8, high: 187.0, low: 184.0, close: 184.2, volume: 65000000 },
  { time: '2024-12-19', open: 184.2, high: 185.5, low: 182.0, close: 182.5, volume: 58000000 },
  { time: '2024-12-20', open: 182.5, high: 184.8, low: 182.0, close: 184.5, volume: 54000000 },
];

const lineChartData = [
  { time: '2024-01', value: 100000 },
  { time: '2024-02', value: 105000 },
  { time: '2024-03', value: 98000 },
  { time: '2024-04', value: 112000 },
  { time: '2024-05', value: 108000 },
  { time: '2024-06', value: 125000 },
  { time: '2024-07', value: 132000 },
  { time: '2024-08', value: 128000 },
  { time: '2024-09', value: 145000 },
  { time: '2024-10', value: 152000 },
  { time: '2024-11', value: 148000 },
  { time: '2024-12', value: 165000 },
];

const multiSeriesData = [
  {
    id: 'portfolio',
    name: 'My Portfolio',
    color: '#5ba3a5',
    data: [
      { x: '2024-01', y: 100 },
      { x: '2024-02', y: 108 },
      { x: '2024-03', y: 103 },
      { x: '2024-04', y: 115 },
      { x: '2024-05', y: 112 },
      { x: '2024-06', y: 125 },
      { x: '2024-07', y: 132 },
      { x: '2024-08', y: 128 },
      { x: '2024-09', y: 142 },
      { x: '2024-10', y: 148 },
      { x: '2024-11', y: 145 },
      { x: '2024-12', y: 158 },
    ],
  },
  {
    id: 'spy',
    name: 'S&P 500',
    color: '#7ecbcc',
    data: [
      { x: '2024-01', y: 100 },
      { x: '2024-02', y: 104 },
      { x: '2024-03', y: 106 },
      { x: '2024-04', y: 108 },
      { x: '2024-05', y: 110 },
      { x: '2024-06', y: 115 },
      { x: '2024-07', y: 118 },
      { x: '2024-08', y: 116 },
      { x: '2024-09', y: 122 },
      { x: '2024-10', y: 125 },
      { x: '2024-11', y: 128 },
      { x: '2024-12', y: 132 },
    ],
  },
  {
    id: 'nasdaq',
    name: 'NASDAQ',
    color: '#4a7a6a',
    data: [
      { x: '2024-01', y: 100 },
      { x: '2024-02', y: 106 },
      { x: '2024-03', y: 102 },
      { x: '2024-04', y: 112 },
      { x: '2024-05', y: 108 },
      { x: '2024-06', y: 120 },
      { x: '2024-07', y: 128 },
      { x: '2024-08', y: 122 },
      { x: '2024-09', y: 135 },
      { x: '2024-10', y: 140 },
      { x: '2024-11', y: 138 },
      { x: '2024-12', y: 148 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - BAR CHART
// ─────────────────────────────────────────────────────────────────────────────

const barCategories = ['Tech', 'Healthcare', 'Finance', 'Energy', 'Consumer', 'Industrial'];
const barData = [
  { category: 'Tech', value: 45000 },
  { category: 'Healthcare', value: 28000 },
  { category: 'Finance', value: 35000 },
  { category: 'Energy', value: 18000 },
  { category: 'Consumer', value: 42000 },
  { category: 'Industrial', value: 22000 },
];

const monthlyReturns = [
  { category: 'Jan', value: 2.5 },
  { category: 'Feb', value: -1.2 },
  { category: 'Mar', value: 3.8 },
  { category: 'Apr', value: -0.5 },
  { category: 'May', value: 1.9 },
  { category: 'Jun', value: 4.2 },
  { category: 'Jul', value: -2.1 },
  { category: 'Aug', value: 0.8 },
  { category: 'Sep', value: 3.5 },
  { category: 'Oct', value: -1.8 },
  { category: 'Nov', value: 2.2 },
  { category: 'Dec', value: 5.1 },
];

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - CIRCULAR CHARTS
// ─────────────────────────────────────────────────────────────────────────────

const pieData = [
  { name: 'US Stocks', value: 45000 },
  { name: 'Int. Stocks', value: 25000 },
  { name: 'Bonds', value: 18000 },
  { name: 'REITs', value: 8000 },
  { name: 'Cash', value: 4000 },
];

const radarIndicators = [
  { name: 'Return', max: 100 },
  { name: 'Risk', max: 100 },
  { name: 'Sharpe', max: 100 },
  { name: 'Volatility', max: 100 },
  { name: 'Liquidity', max: 100 },
  { name: 'Diversification', max: 100 },
];

const radarData = [
  { name: 'Portfolio A', value: [85, 45, 78, 35, 90, 72], color: '#5ba3a5' },
  { name: 'Portfolio B', value: [65, 70, 55, 68, 75, 85], color: '#c4a35a' },
];

const sunburstData = [
  {
    name: 'Equities',
    children: [
      {
        name: 'US',
        children: [
          { name: 'Tech', value: 25000 },
          { name: 'Healthcare', value: 12000 },
          { name: 'Finance', value: 8000 },
        ],
      },
      {
        name: 'International',
        children: [
          { name: 'Europe', value: 15000 },
          { name: 'Asia', value: 10000 },
        ],
      },
    ],
  },
  {
    name: 'Fixed Income',
    children: [
      { name: 'Government', value: 12000 },
      { name: 'Corporate', value: 8000 },
    ],
  },
  { name: 'Cash', value: 10000 },
];

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - COMPARISON CHARTS
// ─────────────────────────────────────────────────────────────────────────────

const treeMapData = [
  {
    name: 'Technology',
    value: 45000,
    children: [
      { name: 'AAPL', value: 18000 },
      { name: 'MSFT', value: 15000 },
      { name: 'GOOGL', value: 12000 },
    ],
  },
  {
    name: 'Healthcare',
    value: 28000,
    children: [
      { name: 'JNJ', value: 12000 },
      { name: 'UNH', value: 10000 },
      { name: 'PFE', value: 6000 },
    ],
  },
  {
    name: 'Finance',
    value: 22000,
    children: [
      { name: 'JPM', value: 10000 },
      { name: 'BAC', value: 8000 },
      { name: 'GS', value: 4000 },
    ],
  },
  { name: 'Energy', value: 15000 },
  { name: 'Consumer', value: 12000 },
];

const heatMapXCategories = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];
const heatMapYCategories = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];
const heatMapData = [
  { x: 'AAPL', y: 'AAPL', value: 1.0 },
  { x: 'AAPL', y: 'MSFT', value: 0.85 },
  { x: 'AAPL', y: 'GOOGL', value: 0.72 },
  { x: 'AAPL', y: 'AMZN', value: 0.68 },
  { x: 'AAPL', y: 'META', value: 0.55 },
  { x: 'MSFT', y: 'AAPL', value: 0.85 },
  { x: 'MSFT', y: 'MSFT', value: 1.0 },
  { x: 'MSFT', y: 'GOOGL', value: 0.78 },
  { x: 'MSFT', y: 'AMZN', value: 0.62 },
  { x: 'MSFT', y: 'META', value: 0.48 },
  { x: 'GOOGL', y: 'AAPL', value: 0.72 },
  { x: 'GOOGL', y: 'MSFT', value: 0.78 },
  { x: 'GOOGL', y: 'GOOGL', value: 1.0 },
  { x: 'GOOGL', y: 'AMZN', value: 0.75 },
  { x: 'GOOGL', y: 'META', value: 0.82 },
  { x: 'AMZN', y: 'AAPL', value: 0.68 },
  { x: 'AMZN', y: 'MSFT', value: 0.62 },
  { x: 'AMZN', y: 'GOOGL', value: 0.75 },
  { x: 'AMZN', y: 'AMZN', value: 1.0 },
  { x: 'AMZN', y: 'META', value: 0.58 },
  { x: 'META', y: 'AAPL', value: 0.55 },
  { x: 'META', y: 'MSFT', value: 0.48 },
  { x: 'META', y: 'GOOGL', value: 0.82 },
  { x: 'META', y: 'AMZN', value: 0.58 },
  { x: 'META', y: 'META', value: 1.0 },
];

const scatterData = [
  { x: 5.2, y: 12.5, size: 1, name: 'AAPL' },
  { x: 8.1, y: 18.2, size: 1.2, name: 'NVDA' },
  { x: 3.5, y: 8.8, size: 0.8, name: 'JNJ' },
  { x: 6.8, y: 14.5, size: 1.1, name: 'MSFT' },
  { x: 4.2, y: 9.2, size: 0.9, name: 'PG' },
  { x: 9.5, y: 22.1, size: 1.5, name: 'TSLA' },
  { x: 2.8, y: 6.5, size: 0.7, name: 'KO' },
  { x: 7.2, y: 15.8, size: 1.0, name: 'GOOGL' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - FLOW CHARTS
// ─────────────────────────────────────────────────────────────────────────────

const sankeyData = {
  nodes: [
    { name: 'Salary' },
    { name: 'Investments' },
    { name: 'Dividends' },
    { name: 'Portfolio' },
    { name: 'Stocks' },
    { name: 'Bonds' },
    { name: 'Cash' },
  ],
  links: [
    { source: 'Salary', target: 'Portfolio', value: 5000 },
    { source: 'Investments', target: 'Portfolio', value: 2000 },
    { source: 'Dividends', target: 'Portfolio', value: 800 },
    { source: 'Portfolio', target: 'Stocks', value: 5500 },
    { source: 'Portfolio', target: 'Bonds', value: 1500 },
    { source: 'Portfolio', target: 'Cash', value: 800 },
  ],
};

const funnelData = [
  { name: 'Opportunities', value: 100 },
  { name: 'Screened', value: 75 },
  { name: 'Analyzed', value: 45 },
  { name: 'Selected', value: 20 },
  { name: 'Invested', value: 12 },
];

const graphData = {
  nodes: [
    { id: 'AAPL', name: 'Apple', value: 45, category: 0 },
    { id: 'MSFT', name: 'Microsoft', value: 42, category: 0 },
    { id: 'GOOGL', name: 'Google', value: 38, category: 0 },
    { id: 'AMZN', name: 'Amazon', value: 35, category: 1 },
    { id: 'META', name: 'Meta', value: 30, category: 0 },
    { id: 'NVDA', name: 'NVIDIA', value: 48, category: 0 },
    { id: 'TSLA', name: 'Tesla', value: 32, category: 1 },
  ],
  links: [
    { source: 'AAPL', target: 'MSFT', value: 85 },
    { source: 'AAPL', target: 'GOOGL', value: 72 },
    { source: 'MSFT', target: 'GOOGL', value: 78 },
    { source: 'GOOGL', target: 'META', value: 82 },
    { source: 'NVDA', target: 'AAPL', value: 65 },
    { source: 'NVDA', target: 'MSFT', value: 70 },
    { source: 'TSLA', target: 'NVDA', value: 58 },
    { source: 'AMZN', target: 'GOOGL', value: 75 },
  ],
  categories: [{ name: 'Tech' }, { name: 'Consumer' }],
};

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - CALENDAR
// ─────────────────────────────────────────────────────────────────────────────

const generateCalendarData = () => {
  const data = [];
  const startDate = new Date('2024-01-01');
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const value = isWeekend ? Math.random() * 20 : Math.random() * 80 + 20;
    data.push({ date: dateStr, value: Math.round(value) });
  }
  return data;
};

const calendarData = generateCalendarData();

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - BOXPLOT
// ─────────────────────────────────────────────────────────────────────────────

const boxplotData = [
  { name: 'AAPL', value: [145, 165, 178, 192, 210] as [number, number, number, number, number] },
  { name: 'MSFT', value: [280, 320, 358, 390, 420] as [number, number, number, number, number] },
  { name: 'GOOGL', value: [120, 135, 148, 162, 180] as [number, number, number, number, number] },
  { name: 'AMZN', value: [130, 155, 172, 188, 205] as [number, number, number, number, number] },
  { name: 'NVDA', value: [400, 520, 620, 750, 880] as [number, number, number, number, number] },
];

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - THEME RIVER (STREAM)
// ─────────────────────────────────────────────────────────────────────────────

const themeRiverData = [
  { date: '2024-01-01', value: 30, name: 'Tech' },
  { date: '2024-01-01', value: 25, name: 'Finance' },
  { date: '2024-01-01', value: 20, name: 'Healthcare' },
  { date: '2024-01-01', value: 15, name: 'Energy' },
  { date: '2024-02-01', value: 35, name: 'Tech' },
  { date: '2024-02-01', value: 22, name: 'Finance' },
  { date: '2024-02-01', value: 25, name: 'Healthcare' },
  { date: '2024-02-01', value: 12, name: 'Energy' },
  { date: '2024-03-01', value: 40, name: 'Tech' },
  { date: '2024-03-01', value: 28, name: 'Finance' },
  { date: '2024-03-01', value: 22, name: 'Healthcare' },
  { date: '2024-03-01', value: 18, name: 'Energy' },
  { date: '2024-04-01', value: 45, name: 'Tech' },
  { date: '2024-04-01', value: 24, name: 'Finance' },
  { date: '2024-04-01', value: 28, name: 'Healthcare' },
  { date: '2024-04-01', value: 14, name: 'Energy' },
  { date: '2024-05-01', value: 50, name: 'Tech' },
  { date: '2024-05-01', value: 30, name: 'Finance' },
  { date: '2024-05-01', value: 26, name: 'Healthcare' },
  { date: '2024-05-01', value: 20, name: 'Energy' },
  { date: '2024-06-01', value: 48, name: 'Tech' },
  { date: '2024-06-01', value: 32, name: 'Finance' },
  { date: '2024-06-01', value: 30, name: 'Healthcare' },
  { date: '2024-06-01', value: 16, name: 'Energy' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - PARALLEL
// ─────────────────────────────────────────────────────────────────────────────

const parallelDimensions = [
  { name: 'P/E Ratio', min: 0, max: 50 },
  { name: 'P/B Ratio', min: 0, max: 20 },
  { name: 'Dividend Yield', min: 0, max: 8 },
  { name: 'ROE %', min: 0, max: 50 },
  { name: 'Debt/Equity', min: 0, max: 3 },
  { name: 'Market Cap (B)', min: 0, max: 3000 },
];

const parallelData = [
  { name: 'AAPL', value: [28.5, 45.2, 0.5, 147.9, 1.8, 2890] },
  { name: 'MSFT', value: [35.2, 12.4, 0.8, 39.2, 0.4, 2750] },
  { name: 'GOOGL', value: [25.8, 6.2, 0, 25.3, 0.1, 1680] },
  { name: 'AMZN', value: [42.1, 8.5, 0, 17.8, 0.6, 1520] },
  { name: 'META', value: [22.4, 7.8, 0.4, 28.1, 0.2, 980] },
];

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - TREE
// ─────────────────────────────────────────────────────────────────────────────

const treeData = {
  name: 'Portfolio',
  children: [
    {
      name: 'Equities',
      children: [
        {
          name: 'US Large Cap',
          children: [
            { name: 'AAPL', value: 15000 },
            { name: 'MSFT', value: 12000 },
            { name: 'GOOGL', value: 8000 },
          ],
        },
        {
          name: 'US Mid Cap',
          children: [
            { name: 'CRM', value: 5000 },
            { name: 'SNOW', value: 3000 },
          ],
        },
        {
          name: 'International',
          children: [
            { name: 'TSM', value: 6000 },
            { name: 'ASML', value: 4000 },
          ],
        },
      ],
    },
    {
      name: 'Fixed Income',
      children: [
        { name: 'Treasury Bonds', value: 20000 },
        { name: 'Corporate Bonds', value: 10000 },
        { name: 'Municipal Bonds', value: 5000 },
      ],
    },
    {
      name: 'Alternatives',
      children: [
        { name: 'Gold', value: 8000 },
        { name: 'REITs', value: 4000 },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - EFFECT SCATTER
// ─────────────────────────────────────────────────────────────────────────────

const effectScatterData = [
  { name: 'High Alert', data: [
    { x: 15, y: 85, value: 5, name: 'NVDA' },
    { x: 22, y: 78, value: 4, name: 'AMD' },
  ]},
  { name: 'Watch List', data: [
    { x: 8, y: 55, value: 2, name: 'AAPL' },
    { x: 12, y: 62, value: 2.5, name: 'MSFT' },
    { x: 18, y: 48, value: 1.5, name: 'GOOGL' },
  ]},
  { name: 'Stable', data: [
    { x: 5, y: 30, value: 1, name: 'JNJ' },
    { x: 3, y: 25, value: 1, name: 'PG' },
    { x: 7, y: 35, value: 1.2, name: 'KO' },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA - PICTORIAL BAR
// ─────────────────────────────────────────────────────────────────────────────

const pictorialData = [
  { name: 'Q1', value: 42000, symbol: pictorialSymbols.chart },
  { name: 'Q2', value: 58000, symbol: pictorialSymbols.chart },
  { name: 'Q3', value: 71000, symbol: pictorialSymbols.chart },
  { name: 'Q4', value: 89000, symbol: pictorialSymbols.chart },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHARTS CONTENT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function ChartsContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  const pageHeaderStyles: CSSProperties = {
    marginBottom: '48px',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '12px',
    fontFamily: 'var(--sentinel-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: CSSProperties = {
    fontSize: '14px',
    color: '#636E72',
    fontFamily: 'var(--sentinel-font-mono)',
    fontWeight: 400,
    maxWidth: '700px',
    lineHeight: 1.6,
  };

  const sectionTitleStyles: CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--sentinel-accent-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '24px',
    marginTop: '56px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(6, 18),
    transition: 'box-shadow 50ms linear',
  };

  const gridStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  };

  const chartContainerStyles: CSSProperties = {
    background: MARBLE.base,
    borderRadius: '15px',
    padding: '20px',
    boxShadow: getNeuPanelShadow(6, 18),
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '32px' }}>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Charts_</h1>
        <p style={descStyles}>
          Comprehensive chart library powered by ECharts with full SENTINEL theme integration.
          High-performance, interactive visualizations for financial data, comparisons, flows, and more.
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* STAT CARDS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <Activity size={18} />
        StatCard - Key Metrics
      </h2>

      <div style={gridStyles}>
        <StatCard label="Portfolio Value" value="$165,420" change={12.5} trend="up" icon={DollarSign} />
        <StatCard label="Daily P&L" value="+$2,340" change={1.8} trend="up" icon={TrendingUp} />
        <StatCard label="Max Drawdown" value="-8.2%" change={-2.1} trend="down" icon={TrendingDown} />
        <StatCard label="Win Rate" value="67%" change={3.5} trend="up" icon={Activity} />
      </div>

      <div style={gridStyles}>
        <StatCard label="Total Return" value="+58.2%" change={5.2} trend="up" icon={Percent} />
        <StatCard label="Cash Balance" value="$12,450" change={0} trend="neutral" icon={Wallet} />
        <StatCard label="Allocation" value="85% Stocks" change={2.0} trend="up" icon={PieIcon} />
        <StatCard label="Target Progress" value="78%" change={8.5} trend="up" icon={Target} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* FINANCIAL CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <CandlestickIcon size={18} />
        Financial Charts - CandlestickChart
      </h2>

      <ShowcaseSection
        title="Candlestick with Volume"
        description="Full OHLC chart with volume histogram. Standard for stock analysis."
      >
        <div style={chartContainerStyles}>
          <CandlestickChart data={candlestickData} height={400} showVolume />
        </div>
      </ShowcaseSection>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <ShowcaseSection title="Without Volume" description="Clean price action view.">
          <div style={chartContainerStyles}>
            <CandlestickChart data={candlestickData} height={280} showVolume={false} />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="With DataZoom" description="Scrollable and zoomable.">
          <div style={chartContainerStyles}>
            <CandlestickChart data={candlestickData} height={280} showDataZoom />
          </div>
        </ShowcaseSection>
      </div>

      {/* LINE CHARTS */}
      <h2 style={sectionTitleStyles}>
        <LineIcon size={18} />
        Financial Charts - LineChart
      </h2>

      <ShowcaseSection
        title="Area Chart"
        description="Single series with gradient fill. Ideal for portfolio value over time."
      >
        <div style={chartContainerStyles}>
          <LineChart
            data={lineChartData}
            height={280}
            enableArea
            formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Multi-Series Comparison"
        description="Compare portfolio against benchmarks with multiple lines."
      >
        <div style={chartContainerStyles}>
          <LineChart
            data={multiSeriesData}
            height={320}
            enableArea
            formatValue={(v) => `${v.toFixed(0)}%`}
          />
        </div>
      </ShowcaseSection>

      {/* BAR CHARTS */}
      <h2 style={sectionTitleStyles}>
        <BarChart3 size={18} />
        Financial Charts - BarChart
      </h2>

      <ShowcaseSection title="Sector Allocation" description="Vertical bar chart for category comparison.">
        <div style={chartContainerStyles}>
          <BarChart
            categories={barCategories}
            data={barData}
            height={300}
            formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Positive/Negative Coloring" description="Monthly returns with automatic coloring.">
        <div style={chartContainerStyles}>
          <BarChart
            categories={monthlyReturns.map((d) => d.category)}
            data={monthlyReturns}
            height={280}
            showPositiveNegative
            formatValue={(v) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`}
          />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* CIRCULAR CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <PieIcon size={18} />
        Circular Charts - PieChart
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <ShowcaseSection title="Pie Chart" description="Basic allocation view.">
          <div style={chartContainerStyles}>
            <PieChart data={pieData} height={280} formatValue={(v) => `$${(v / 1000).toFixed(0)}K`} />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Donut Chart" description="With center label.">
          <div style={chartContainerStyles}>
            <PieChart
              data={pieData}
              height={280}
              variant="donut"
              centerLabel="Total"
              centerValue="$100K"
              formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Rose Diagram" description="Nightingale chart variant.">
          <div style={chartContainerStyles}>
            <PieChart data={pieData} height={280} variant="rose" formatValue={(v) => `$${(v / 1000).toFixed(0)}K`} />
          </div>
        </ShowcaseSection>
      </div>

      {/* RADAR CHART */}
      <h2 style={sectionTitleStyles}>
        <Radar size={18} />
        Circular Charts - RadarChart
      </h2>

      <ShowcaseSection title="Portfolio Comparison" description="Multi-dimensional risk/return analysis.">
        <div style={chartContainerStyles}>
          <RadarChart indicators={radarIndicators} data={radarData} height={350} shape="polygon" />
        </div>
      </ShowcaseSection>

      {/* GAUGE CHART */}
      <h2 style={sectionTitleStyles}>
        <Gauge size={18} />
        Circular Charts - GaugeChart
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        <ShowcaseSection title="Default" description="Standard gauge.">
          <div style={chartContainerStyles}>
            <GaugeChart data={{ value: 65, name: 'Score' }} height={200} />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Risk Variant" description="5-level risk scale.">
          <div style={chartContainerStyles}>
            <GaugeChart data={{ value: 72, name: 'Risk Level' }} height={200} variant="risk" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Progress" description="Goal completion.">
          <div style={chartContainerStyles}>
            <GaugeChart data={{ value: 85, name: 'Progress' }} height={200} variant="progress" unit="%" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Score" description="Performance score.">
          <div style={chartContainerStyles}>
            <GaugeChart data={{ value: 42, name: 'Alpha' }} height={200} variant="score" />
          </div>
        </ShowcaseSection>
      </div>

      {/* SUNBURST CHART */}
      <h2 style={sectionTitleStyles}>
        <Sun size={18} />
        Circular Charts - SunburstChart
      </h2>

      <ShowcaseSection title="Hierarchical Allocation" description="Multi-level portfolio breakdown with drill-down.">
        <div style={chartContainerStyles}>
          <SunburstChart data={sunburstData} height={400} formatValue={(v) => `$${(v / 1000).toFixed(0)}K`} />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* COMPARISON CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <Layers size={18} />
        Comparison Charts - TreeMap
      </h2>

      <ShowcaseSection
        title="Portfolio Allocation"
        description="Hierarchical view of holdings by sector and stock."
      >
        <div style={chartContainerStyles}>
          <TreeMap data={treeMapData} height={400} formatValue={(v) => `$${(v / 1000).toFixed(0)}K`} />
        </div>
      </ShowcaseSection>

      {/* HEATMAP */}
      <h2 style={sectionTitleStyles}>
        <Grid3X3 size={18} />
        Comparison Charts - HeatMap
      </h2>

      <ShowcaseSection title="Correlation Matrix" description="Stock correlation heatmap with sequential colors.">
        <div style={chartContainerStyles}>
          <HeatMap
            data={heatMapData}
            xCategories={heatMapXCategories}
            yCategories={heatMapYCategories}
            height={350}
            colorScheme="sequential"
          />
        </div>
      </ShowcaseSection>

      {/* SCATTER CHART */}
      <h2 style={sectionTitleStyles}>
        <Zap size={18} />
        Comparison Charts - ScatterChart
      </h2>

      <ShowcaseSection title="Risk vs Return" description="Stock comparison with regression line.">
        <div style={chartContainerStyles}>
          <ScatterChart
            data={scatterData}
            height={350}
            xAxisLabel="Risk (%)"
            yAxisLabel="Return (%)"
            showRegression
          />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* FLOW CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <GitBranch size={18} />
        Flow Charts - SankeyChart
      </h2>

      <ShowcaseSection title="Capital Flow" description="Visualize money flow from sources to allocations.">
        <div style={chartContainerStyles}>
          <SankeyChart data={sankeyData} height={350} formatValue={(v) => `$${v.toLocaleString()}`} />
        </div>
      </ShowcaseSection>

      {/* FUNNEL CHART */}
      <h2 style={sectionTitleStyles}>
        <Flame size={18} />
        Flow Charts - FunnelChart
      </h2>

      <ShowcaseSection title="Investment Pipeline" description="From opportunities to executed investments.">
        <div style={chartContainerStyles}>
          <FunnelChart data={funnelData} height={350} />
        </div>
      </ShowcaseSection>

      {/* GRAPH CHART */}
      <h2 style={sectionTitleStyles}>
        <Network size={18} />
        Flow Charts - GraphChart
      </h2>

      <ShowcaseSection title="Stock Correlation Network" description="Force-directed graph showing relationships.">
        <div style={chartContainerStyles}>
          <GraphChart data={graphData} height={450} layout="force" draggable />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* TIME-BASED CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <Calendar size={18} />
        Time-based Charts - CalendarChart
      </h2>

      <ShowcaseSection title="Trading Activity" description="Year view of daily trading activity.">
        <div style={chartContainerStyles}>
          <CalendarChart data={calendarData} year={2024} height={200} />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* STATISTICAL CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <BarChart2 size={18} />
        Statistical Charts - BoxplotChart
      </h2>

      <ShowcaseSection title="Stock Price Distributions" description="Boxplot showing min, Q1, median, Q3, max for each stock.">
        <div style={chartContainerStyles}>
          <BoxplotChart data={boxplotData} height={350} formatValue={(v) => `$${v.toFixed(0)}`} />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* STREAM / RIVER CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <Waves size={18} />
        Stream Charts - ThemeRiverChart
      </h2>

      <ShowcaseSection title="Sector Allocation Over Time" description="Visualize how sector proportions change over time.">
        <div style={chartContainerStyles}>
          <ThemeRiverChart data={themeRiverData} height={350} formatValue={(v) => `${v}%`} />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* PARALLEL CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <SlidersHorizontal size={18} />
        Multi-Dimensional Charts - ParallelChart
      </h2>

      <ShowcaseSection title="Stock Metrics Comparison" description="Compare multiple financial metrics across stocks.">
        <div style={chartContainerStyles}>
          <ParallelChart dimensions={parallelDimensions} data={parallelData} height={400} lineOpacity={0.7} />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* TREE CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <GitMerge size={18} />
        Hierarchical Charts - TreeChart
      </h2>

      <ShowcaseSection title="Portfolio Structure" description="Visualize portfolio hierarchy with expandable nodes.">
        <div style={chartContainerStyles}>
          <TreeChart data={treeData} height={500} layout="orthogonal" orient="LR" initialExpandLevel={2} />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* EFFECT SCATTER CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <Sparkles size={18} />
        Effect Charts - EffectScatterChart
      </h2>

      <ShowcaseSection title="Alert Levels" description="Highlight important data points with ripple effects.">
        <div style={chartContainerStyles}>
          <EffectScatterChart
            data={effectScatterData}
            height={400}
            xAxisLabel="Volatility"
            yAxisLabel="Momentum Score"
            rippleScale={4}
            ripplePeriod={2}
          />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* PICTORIAL BAR CHARTS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>
        <ImageIcon size={18} />
        Pictorial Charts - PictorialBarChart
      </h2>

      <ShowcaseSection title="Quarterly Revenue" description="Visual KPIs with custom symbols.">
        <div style={chartContainerStyles}>
          <PictorialBarChart
            data={pictorialData}
            height={300}
            symbol={pictorialSymbols.chart}
            formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* API REFERENCE */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionTitleStyles}>API Reference</h2>

      <ShowcaseSection title="ECharts Components Overview">
        <div style={{
          ...chartContainerStyles,
          boxShadow: getNeuInsetShadow(5, 15),
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Financial:</strong> CandlestickChart, LineChart, BarChart</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Circular:</strong> PieChart, RadarChart, GaugeChart, SunburstChart</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Comparison:</strong> TreeMap, HeatMap, ScatterChart, BoxplotChart</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Flow:</strong> SankeyChart, FunnelChart, GraphChart</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Time-based:</strong> CalendarChart, ThemeRiverChart</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Multi-dimensional:</strong> ParallelChart</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Hierarchical:</strong> TreeChart</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Effect:</strong> EffectScatterChart</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Pictorial:</strong> PictorialBarChart</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export function ChartsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <ChartsContent />
    </LightEngineProvider>
  );
}

export default ChartsShowcase;
