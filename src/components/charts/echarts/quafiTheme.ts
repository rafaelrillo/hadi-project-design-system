// Path: src/components/charts/echarts/quafiTheme.ts
import * as echarts from 'echarts';

// ═══════════════════════════════════════════════════════════════════════════════
// QUAFI ECHARTS THEME v4.0
// Light Neumorphism - Clean, professional, minimal
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// COLOR TOKENS (matching theme.css light theme)
// ─────────────────────────────────────────────────────────────────────────────

export const quafiColors = {
  // Backgrounds (Light Theme)
  bgVoid: '#E5E5E5',
  bgBase: '#E0E5EC',
  bgElevated: '#FFFFFF',
  bgOverlay: 'rgba(255, 255, 255, 0.95)',
  bgSubtle: '#F0F4F8',
  bgInteractive: 'rgba(255, 255, 255, 0.6)',

  // Text (Dark on Light) - Charcoal
  textPrimary: '#252528',
  textSecondary: '#5F6C7A',
  textTertiary: '#8B9CAD',
  textDisabled: '#B8C5D1',

  // Borders (Gray-based for light theme)
  borderSubtle: 'rgba(163, 177, 198, 0.2)',
  borderDefault: 'rgba(163, 177, 198, 0.35)',
  borderStrong: 'rgba(163, 177, 198, 0.5)',

  // Accent (Institutional Teal - darker for contrast)
  accentPrimary: '#3a6a72',
  accentSecondary: '#3D8587',
  accentSubtle: 'rgba(58, 106, 114, 0.12)',
  accentGlow: 'rgba(58, 106, 114, 0.25)',

  // Status (More saturated for light backgrounds)
  positive: '#22C55E',
  positiveSubtle: 'rgba(34, 197, 94, 0.15)',
  negative: '#EF4444',
  negativeSubtle: 'rgba(239, 68, 68, 0.15)',
  warning: '#F59E0B',
  warningSubtle: 'rgba(245, 158, 11, 0.15)',
  info: '#3B82F6',
  infoSubtle: 'rgba(59, 130, 246, 0.15)',

  // Risk levels
  riskLow: '#22C55E',
  riskModerate: '#3a6a72',
  riskElevated: '#F59E0B',
  riskHigh: '#F97316',
  riskSevere: '#EF4444',

  // Market states
  marketBull: '#22C55E',
  marketBear: '#EF4444',
  marketNeutral: '#3a6a72',
  marketUncertain: '#6B7280',
};

// 8-color harmonious palette for chart series (adjusted for light bg)
export const chartPalette = [
  '#3a6a72', // Teal accent (primary)
  '#3D8587', // Dark teal
  '#2E7D32', // Green
  '#1976D2', // Blue
  '#7B1FA2', // Purple
  '#F57C00', // Orange
  '#C2185B', // Pink
  '#455A64', // Blue-gray
];

// Sequential colors (light to dark teal)
export const sequentialColors = [
  '#B2DFDB',
  '#80CBC4',
  '#4DB6AC',
  '#26A69A',
  '#009688',
  '#00897B',
  '#00796B',
];

// Diverging colors (negative to positive)
export const divergingColors = [
  '#EF4444', // Negative
  '#F97316',
  '#F59E0B',
  '#9E9E9E', // Neutral
  '#3a6a72',
  '#22C55E',
  '#16A34A', // Positive
];

// ─────────────────────────────────────────────────────────────────────────────
// ECHARTS THEME DEFINITION
// ─────────────────────────────────────────────────────────────────────────────

// Risk colors for exports
export const riskColors = [
  quafiColors.riskLow,
  quafiColors.riskModerate,
  quafiColors.riskElevated,
  quafiColors.riskHigh,
  quafiColors.riskSevere,
];

// Using Record type for theme to avoid strict typing issues
export const quafiEChartsTheme: Record<string, unknown> = {
  // Color palette
  color: chartPalette,

  // Background (transparent to use container bg)
  backgroundColor: 'transparent',

  // Text style
  textStyle: {
    color: quafiColors.textSecondary,
    fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 12,
  },

  // Title
  title: {
    textStyle: {
      color: quafiColors.textPrimary,
      fontFamily: "'Libre Baskerville', sans-serif",
      fontWeight: 500,
      fontSize: 16,
    },
    subtextStyle: {
      color: quafiColors.textTertiary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 12,
    },
    left: 0,
    top: 0,
  },

  // Legend
  legend: {
    textStyle: {
      color: quafiColors.textSecondary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 11,
    },
    pageTextStyle: {
      color: quafiColors.textTertiary,
    },
    pageIconColor: quafiColors.accentPrimary,
    pageIconInactiveColor: quafiColors.textDisabled,
  },

  // Tooltip - Glass effect with high z-index
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(58, 106, 114, 0.25)',
    borderWidth: 1,
    borderRadius: 16,
    padding: [14, 18],
    textStyle: {
      color: quafiColors.textPrimary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 12,
    },
    extraCssText: `
      z-index: 9999 !important;
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      box-shadow:
        0 8px 32px rgba(58, 106, 114, 0.15),
        0 4px 16px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    `,
  },

  // Axis pointer (crosshair)
  axisPointer: {
    lineStyle: {
      color: quafiColors.accentPrimary,
      width: 1,
      type: 'dashed',
    },
    crossStyle: {
      color: quafiColors.accentPrimary,
      width: 1,
      type: 'dashed',
    },
    label: {
      backgroundColor: quafiColors.bgOverlay,
      borderColor: quafiColors.borderDefault,
      color: quafiColors.textPrimary,
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 11,
    },
  },

  // Category axis (X axis)
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: quafiColors.borderSubtle,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: quafiColors.textTertiary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 11,
    },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
  },

  // Value axis (Y axis)
  valueAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: quafiColors.textTertiary,
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 11,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: quafiColors.borderSubtle,
        type: 'solid',
      },
    },
    splitArea: {
      show: false,
    },
  },

  // Time axis
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: quafiColors.borderSubtle,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: quafiColors.textTertiary,
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 11,
    },
    splitLine: {
      show: false,
    },
  },

  // Log axis
  logAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: quafiColors.textTertiary,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: quafiColors.borderSubtle,
      },
    },
  },

  // Line series
  line: {
    smooth: false,
    symbol: 'circle',
    symbolSize: 4,
    lineStyle: {
      width: 2,
    },
    emphasis: {
      lineStyle: {
        width: 3,
      },
    },
  },

  // Bar series
  bar: {
    barMaxWidth: 40,
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(163, 177, 198, 0.4)',
      },
    },
  },

  // Pie series
  pie: {
    itemStyle: {
      borderColor: quafiColors.bgElevated,
      borderWidth: 2,
    },
    label: {
      color: quafiColors.textSecondary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 11,
    },
    labelLine: {
      lineStyle: {
        color: quafiColors.borderDefault,
      },
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 20,
        shadowOffsetX: 0,
        shadowColor: 'rgba(163, 177, 198, 0.4)',
      },
    },
  },

  // Candlestick series
  candlestick: {
    itemStyle: {
      color: quafiColors.positive, // Up (bullish)
      color0: quafiColors.negative, // Down (bearish)
      borderColor: quafiColors.positive,
      borderColor0: quafiColors.negative,
      borderWidth: 1,
    },
  },

  // Radar series
  radar: {
    shape: 'polygon',
    splitNumber: 5,
    name: {
      textStyle: {
        color: quafiColors.textSecondary,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 11,
      },
    },
    axisLine: {
      lineStyle: {
        color: quafiColors.borderDefault,
      },
    },
    splitLine: {
      lineStyle: {
        color: quafiColors.borderSubtle,
      },
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['transparent', quafiColors.bgSubtle],
      },
    },
  },

  // Gauge series
  gauge: {
    axisLine: {
      lineStyle: {
        width: 10,
        color: [
          [0.3, quafiColors.positive],
          [0.7, quafiColors.warning],
          [1, quafiColors.negative],
        ],
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: quafiColors.textTertiary,
      fontSize: 10,
    },
    splitLine: {
      show: false,
    },
    pointer: {
      itemStyle: {
        color: quafiColors.textPrimary,
      },
    },
    detail: {
      color: quafiColors.textPrimary,
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 24,
      fontWeight: 600,
    },
  },

  // Treemap series
  treemap: {
    itemStyle: {
      borderColor: quafiColors.bgBase,
      borderWidth: 2,
    },
    label: {
      color: quafiColors.textPrimary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 11,
    },
    upperLabel: {
      color: quafiColors.textSecondary,
      fontFamily: "'Libre Baskerville', sans-serif",
      fontSize: 12,
    },
    breadcrumb: {
      itemStyle: {
        color: quafiColors.bgSubtle,
        borderColor: quafiColors.borderDefault,
        textStyle: {
          color: quafiColors.textSecondary,
        },
      },
    },
  },

  // Heatmap series
  heatmap: {
    itemStyle: {
      borderColor: quafiColors.bgBase,
      borderWidth: 1,
    },
    label: {
      color: quafiColors.textPrimary,
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 10,
    },
  },

  // Sankey series
  sankey: {
    nodeWidth: 20,
    nodeGap: 12,
    nodeAlign: 'justify',
    label: {
      color: quafiColors.textSecondary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 11,
    },
    lineStyle: {
      curveness: 0.5,
    },
    emphasis: {
      focus: 'adjacency',
    },
  },

  // Scatter series
  scatter: {
    symbol: 'circle',
    symbolSize: 8,
    itemStyle: {
      borderColor: quafiColors.bgElevated,
      borderWidth: 1,
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(163, 177, 198, 0.4)',
      },
    },
  },

  // Graph series
  graph: {
    color: chartPalette,
    label: {
      color: quafiColors.textSecondary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 11,
    },
    lineStyle: {
      color: quafiColors.borderDefault,
      width: 1,
      curveness: 0.3,
    },
    emphasis: {
      label: {
        color: quafiColors.textPrimary,
      },
      lineStyle: {
        width: 2,
      },
    },
  },

  // Sunburst series
  sunburst: {
    label: {
      color: quafiColors.textSecondary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 10,
    },
    itemStyle: {
      borderColor: quafiColors.bgBase,
      borderWidth: 1,
    },
  },

  // Funnel series
  funnel: {
    label: {
      color: quafiColors.textSecondary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 11,
    },
    itemStyle: {
      borderColor: quafiColors.bgBase,
      borderWidth: 2,
    },
  },

  // Boxplot series
  boxplot: {
    itemStyle: {
      color: quafiColors.bgSubtle,
      borderColor: quafiColors.accentPrimary,
      borderWidth: 1,
    },
  },

  // Data zoom
  dataZoom: [
    {
      type: 'inside',
      textStyle: {
        color: quafiColors.textSecondary,
      },
    },
    {
      type: 'slider',
      backgroundColor: quafiColors.bgSubtle,
      borderColor: quafiColors.borderSubtle,
      fillerColor: quafiColors.accentSubtle,
      handleStyle: {
        color: quafiColors.accentPrimary,
        borderColor: quafiColors.accentSecondary,
      },
      textStyle: {
        color: quafiColors.textTertiary,
      },
      dataBackground: {
        lineStyle: {
          color: quafiColors.borderDefault,
        },
        areaStyle: {
          color: quafiColors.accentSubtle,
        },
      },
    },
  ],

  // Visual map (color scale)
  visualMap: {
    textStyle: {
      color: quafiColors.textSecondary,
    },
    inRange: {
      color: sequentialColors,
    },
  },

  // Toolbox
  toolbox: {
    iconStyle: {
      borderColor: quafiColors.textTertiary,
    },
    emphasis: {
      iconStyle: {
        borderColor: quafiColors.accentPrimary,
      },
    },
  },

  // Grid
  grid: {
    left: 60,
    right: 20,
    top: 60,
    bottom: 60,
    containLabel: true,
  },

  // Calendar
  calendar: {
    itemStyle: {
      color: quafiColors.bgSubtle,
      borderColor: quafiColors.borderSubtle,
      borderWidth: 1,
    },
    dayLabel: {
      color: quafiColors.textTertiary,
    },
    monthLabel: {
      color: quafiColors.textSecondary,
    },
    yearLabel: {
      color: quafiColors.textPrimary,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER THEME
// ─────────────────────────────────────────────────────────────────────────────

echarts.registerTheme('fing', quafiEChartsTheme);

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION PRESETS
// ─────────────────────────────────────────────────────────────────────────────

export const animationPresets = {
  // Default animation (matches --fing-duration-slow)
  default: {
    animationDuration: 700,
    animationEasing: 'cubicOut' as const,
    animationDelay: 0,
  },

  // Fast animation (matches --fing-duration-normal)
  fast: {
    animationDuration: 400,
    animationEasing: 'cubicOut' as const,
    animationDelay: 0,
  },

  // Slow animation (matches --fing-duration-slower)
  slow: {
    animationDuration: 1000,
    animationEasing: 'cubicOut' as const,
    animationDelay: 0,
  },

  // Staggered animation for multiple series
  staggered: (index: number) => ({
    animationDuration: 700,
    animationEasing: 'cubicOut' as const,
    animationDelay: index * 100,
  }),

  // No animation
  none: {
    animation: false,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// TOOLTIP FORMATTERS
// ─────────────────────────────────────────────────────────────────────────────

export const tooltipFormatters = {
  // Financial value (K, M, B notation)
  financial: (value: number): string => {
    if (Math.abs(value) >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (Math.abs(value) >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (Math.abs(value) >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
  },

  // Percentage
  percentage: (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  },

  // Volume
  volume: (value: number): string => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return value.toFixed(0);
  },

  // OHLC tooltip
  ohlc: (params: { open: number; high: number; low: number; close: number }) => {
    const change = params.close - params.open;
    const changePercent = (change / params.open) * 100;
    const color = change >= 0 ? quafiColors.positive : quafiColors.negative;
    const sign = change >= 0 ? '+' : '';

    return `
      <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px;">
        <div style="display: grid; grid-template-columns: 24px 1fr; gap: 8px; margin-bottom: 8px;">
          <span style="color: ${quafiColors.textTertiary};">O</span>
          <span>${params.open.toFixed(2)}</span>
          <span style="color: ${quafiColors.textTertiary};">H</span>
          <span>${params.high.toFixed(2)}</span>
          <span style="color: ${quafiColors.textTertiary};">L</span>
          <span>${params.low.toFixed(2)}</span>
          <span style="color: ${quafiColors.textTertiary};">C</span>
          <span style="color: ${color};">${params.close.toFixed(2)}</span>
        </div>
        <div style="color: ${color}; font-weight: 600; padding-top: 8px; border-top: 1px solid ${quafiColors.borderSubtle};">
          ${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)
        </div>
      </div>
    `;
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export default quafiEChartsTheme;
