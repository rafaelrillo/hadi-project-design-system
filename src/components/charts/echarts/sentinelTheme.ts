// Path: src/components/charts/echarts/sentinelTheme.ts
import * as echarts from 'echarts';

// ═══════════════════════════════════════════════════════════════════════════════
// SENTINEL ECHARTS THEME
// "Observatorio Nocturno" - Dark, desaturated, professional
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// COLOR TOKENS (matching theme.css and theme.ts)
// ─────────────────────────────────────────────────────────────────────────────

export const sentinelColors = {
  // Backgrounds
  bgVoid: '#05060a',
  bgBase: '#0a0b10',
  bgElevated: '#10121a',
  bgOverlay: '#161822',
  bgSubtle: '#1c1e2a',
  bgInteractive: '#22253a',

  // Text
  textPrimary: '#e8eaed',
  textSecondary: '#9aa0a6',
  textTertiary: '#5f6368',
  textDisabled: '#3c4043',

  // Borders
  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  borderDefault: 'rgba(255, 255, 255, 0.1)',
  borderStrong: 'rgba(255, 255, 255, 0.16)',

  // Accent (Institutional Teal)
  accentPrimary: '#5ba3a5',
  accentSecondary: '#4a8a8c',
  accentSubtle: 'rgba(91, 163, 165, 0.15)',
  accentGlow: 'rgba(91, 163, 165, 0.3)',

  // Status
  positive: '#4a9a7c',
  positiveSubtle: 'rgba(74, 154, 124, 0.15)',
  negative: '#b85c5c',
  negativeSubtle: 'rgba(184, 92, 92, 0.15)',
  warning: '#c4a35a',
  warningSubtle: 'rgba(196, 163, 90, 0.15)',
  info: '#5a8fb8',
  infoSubtle: 'rgba(90, 143, 184, 0.15)',

  // Risk levels
  riskLow: '#4a9a7c',
  riskModerate: '#5ba3a5',
  riskElevated: '#c4a35a',
  riskHigh: '#c47a5a',
  riskSevere: '#b85c5c',

  // Market states
  marketBull: '#4a9a7c',
  marketBear: '#b85c5c',
  marketNeutral: '#5ba3a5',
  marketUncertain: '#6b7280',
};

// 8-color harmonious palette for chart series
export const chartPalette = [
  '#5ba3a5', // Teal accent (primary)
  '#7ecbcc', // Light teal
  '#4a9a7c', // Green-teal
  '#5a8fb8', // Blue
  '#8b7ec7', // Soft purple
  '#c4a35a', // Amber
  '#c47a5a', // Terracotta
  '#b85c5c', // Coral
];

// Sequential colors (light to dark teal)
export const sequentialColors = [
  '#a8d5d7',
  '#8bc4c6',
  '#6eb3b5',
  '#5ba3a5',
  '#4a8a8c',
  '#3a7072',
  '#2a5658',
];

// Diverging colors (negative to positive)
export const divergingColors = [
  '#b85c5c', // Negative
  '#c47a5a',
  '#c4a35a',
  '#9aa0a6', // Neutral
  '#5ba3a5',
  '#4a9a7c',
  '#3a8a6c', // Positive
];

// ─────────────────────────────────────────────────────────────────────────────
// ECHARTS THEME DEFINITION
// ─────────────────────────────────────────────────────────────────────────────

// Risk colors for exports
export const riskColors = [
  sentinelColors.riskLow,
  sentinelColors.riskModerate,
  sentinelColors.riskElevated,
  sentinelColors.riskHigh,
  sentinelColors.riskSevere,
];

// Using Record type for theme to avoid strict typing issues
export const sentinelEChartsTheme: Record<string, unknown> = {
  // Color palette
  color: chartPalette,

  // Background (transparent to use container bg)
  backgroundColor: 'transparent',

  // Text style
  textStyle: {
    color: sentinelColors.textSecondary,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 12,
  },

  // Title
  title: {
    textStyle: {
      color: sentinelColors.textPrimary,
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 500,
      fontSize: 16,
    },
    subtextStyle: {
      color: sentinelColors.textTertiary,
      fontFamily: "'Inter', sans-serif",
      fontSize: 12,
    },
    left: 0,
    top: 0,
  },

  // Legend
  legend: {
    textStyle: {
      color: sentinelColors.textSecondary,
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
    },
    pageTextStyle: {
      color: sentinelColors.textTertiary,
    },
    pageIconColor: sentinelColors.accentPrimary,
    pageIconInactiveColor: sentinelColors.textDisabled,
  },

  // Tooltip
  tooltip: {
    backgroundColor: sentinelColors.bgOverlay,
    borderColor: sentinelColors.borderDefault,
    borderWidth: 1,
    borderRadius: 6,
    padding: [12, 16],
    textStyle: {
      color: sentinelColors.textPrimary,
      fontFamily: "'Inter', sans-serif",
      fontSize: 12,
    },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);',
  },

  // Axis pointer (crosshair)
  axisPointer: {
    lineStyle: {
      color: sentinelColors.accentPrimary,
      width: 1,
      type: 'dashed',
    },
    crossStyle: {
      color: sentinelColors.accentPrimary,
      width: 1,
      type: 'dashed',
    },
    label: {
      backgroundColor: sentinelColors.bgOverlay,
      borderColor: sentinelColors.borderDefault,
      color: sentinelColors.textPrimary,
      fontFamily: "'Space Mono', monospace",
      fontSize: 11,
    },
  },

  // Category axis (X axis)
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: sentinelColors.borderSubtle,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: sentinelColors.textTertiary,
      fontFamily: "'Inter', sans-serif",
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
      color: sentinelColors.textTertiary,
      fontFamily: "'Space Mono', monospace",
      fontSize: 11,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: sentinelColors.borderSubtle,
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
        color: sentinelColors.borderSubtle,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: sentinelColors.textTertiary,
      fontFamily: "'Space Mono', monospace",
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
      color: sentinelColors.textTertiary,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: sentinelColors.borderSubtle,
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
      borderRadius: [2, 2, 0, 0],
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
      },
    },
  },

  // Pie series
  pie: {
    itemStyle: {
      borderColor: sentinelColors.bgBase,
      borderWidth: 2,
    },
    label: {
      color: sentinelColors.textSecondary,
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
    },
    labelLine: {
      lineStyle: {
        color: sentinelColors.borderDefault,
      },
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 20,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
      },
    },
  },

  // Candlestick series
  candlestick: {
    itemStyle: {
      color: sentinelColors.positive, // Up (bullish)
      color0: sentinelColors.negative, // Down (bearish)
      borderColor: sentinelColors.positive,
      borderColor0: sentinelColors.negative,
      borderWidth: 1,
    },
  },

  // Radar series
  radar: {
    shape: 'polygon',
    splitNumber: 5,
    name: {
      textStyle: {
        color: sentinelColors.textSecondary,
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
      },
    },
    axisLine: {
      lineStyle: {
        color: sentinelColors.borderDefault,
      },
    },
    splitLine: {
      lineStyle: {
        color: sentinelColors.borderSubtle,
      },
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['transparent', sentinelColors.bgSubtle],
      },
    },
  },

  // Gauge series
  gauge: {
    axisLine: {
      lineStyle: {
        width: 10,
        color: [
          [0.3, sentinelColors.positive],
          [0.7, sentinelColors.warning],
          [1, sentinelColors.negative],
        ],
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: sentinelColors.textTertiary,
      fontSize: 10,
    },
    splitLine: {
      show: false,
    },
    pointer: {
      itemStyle: {
        color: sentinelColors.textPrimary,
      },
    },
    detail: {
      color: sentinelColors.textPrimary,
      fontFamily: "'Space Mono', monospace",
      fontSize: 24,
      fontWeight: 600,
    },
  },

  // Treemap series
  treemap: {
    itemStyle: {
      borderColor: sentinelColors.bgBase,
      borderWidth: 2,
    },
    label: {
      color: sentinelColors.textPrimary,
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
    },
    upperLabel: {
      color: sentinelColors.textSecondary,
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 12,
    },
    breadcrumb: {
      itemStyle: {
        color: sentinelColors.bgSubtle,
        borderColor: sentinelColors.borderDefault,
        textStyle: {
          color: sentinelColors.textSecondary,
        },
      },
    },
  },

  // Heatmap series
  heatmap: {
    itemStyle: {
      borderColor: sentinelColors.bgBase,
      borderWidth: 1,
    },
    label: {
      color: sentinelColors.textPrimary,
      fontFamily: "'Space Mono', monospace",
      fontSize: 10,
    },
  },

  // Sankey series
  sankey: {
    nodeWidth: 20,
    nodeGap: 12,
    nodeAlign: 'justify',
    label: {
      color: sentinelColors.textSecondary,
      fontFamily: "'Inter', sans-serif",
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
      borderColor: sentinelColors.bgBase,
      borderWidth: 1,
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
      },
    },
  },

  // Graph series
  graph: {
    color: chartPalette,
    label: {
      color: sentinelColors.textSecondary,
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
    },
    lineStyle: {
      color: sentinelColors.borderDefault,
      width: 1,
      curveness: 0.3,
    },
    emphasis: {
      label: {
        color: sentinelColors.textPrimary,
      },
      lineStyle: {
        width: 2,
      },
    },
  },

  // Sunburst series
  sunburst: {
    label: {
      color: sentinelColors.textSecondary,
      fontFamily: "'Inter', sans-serif",
      fontSize: 10,
    },
    itemStyle: {
      borderColor: sentinelColors.bgBase,
      borderWidth: 1,
    },
  },

  // Funnel series
  funnel: {
    label: {
      color: sentinelColors.textSecondary,
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
    },
    itemStyle: {
      borderColor: sentinelColors.bgBase,
      borderWidth: 2,
    },
  },

  // Boxplot series
  boxplot: {
    itemStyle: {
      color: sentinelColors.bgSubtle,
      borderColor: sentinelColors.accentPrimary,
      borderWidth: 1,
    },
  },

  // Data zoom
  dataZoom: [
    {
      type: 'inside',
      textStyle: {
        color: sentinelColors.textSecondary,
      },
    },
    {
      type: 'slider',
      backgroundColor: sentinelColors.bgSubtle,
      borderColor: sentinelColors.borderSubtle,
      fillerColor: sentinelColors.accentSubtle,
      handleStyle: {
        color: sentinelColors.accentPrimary,
        borderColor: sentinelColors.accentSecondary,
      },
      textStyle: {
        color: sentinelColors.textTertiary,
      },
      dataBackground: {
        lineStyle: {
          color: sentinelColors.borderDefault,
        },
        areaStyle: {
          color: sentinelColors.accentSubtle,
        },
      },
    },
  ],

  // Visual map (color scale)
  visualMap: {
    textStyle: {
      color: sentinelColors.textSecondary,
    },
    inRange: {
      color: sequentialColors,
    },
  },

  // Toolbox
  toolbox: {
    iconStyle: {
      borderColor: sentinelColors.textTertiary,
    },
    emphasis: {
      iconStyle: {
        borderColor: sentinelColors.accentPrimary,
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
      color: sentinelColors.bgSubtle,
      borderColor: sentinelColors.borderSubtle,
      borderWidth: 1,
    },
    dayLabel: {
      color: sentinelColors.textTertiary,
    },
    monthLabel: {
      color: sentinelColors.textSecondary,
    },
    yearLabel: {
      color: sentinelColors.textPrimary,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER THEME
// ─────────────────────────────────────────────────────────────────────────────

echarts.registerTheme('sentinel', sentinelEChartsTheme);

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION PRESETS
// ─────────────────────────────────────────────────────────────────────────────

export const animationPresets = {
  // Default animation (matches --sentinel-duration-slow)
  default: {
    animationDuration: 700,
    animationEasing: 'cubicOut' as const,
    animationDelay: 0,
  },

  // Fast animation (matches --sentinel-duration-normal)
  fast: {
    animationDuration: 400,
    animationEasing: 'cubicOut' as const,
    animationDelay: 0,
  },

  // Slow animation (matches --sentinel-duration-slower)
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
    const color = change >= 0 ? sentinelColors.positive : sentinelColors.negative;
    const sign = change >= 0 ? '+' : '';

    return `
      <div style="font-family: 'Space Mono', monospace; font-size: 11px;">
        <div style="display: grid; grid-template-columns: 24px 1fr; gap: 8px; margin-bottom: 8px;">
          <span style="color: ${sentinelColors.textTertiary};">O</span>
          <span>${params.open.toFixed(2)}</span>
          <span style="color: ${sentinelColors.textTertiary};">H</span>
          <span>${params.high.toFixed(2)}</span>
          <span style="color: ${sentinelColors.textTertiary};">L</span>
          <span>${params.low.toFixed(2)}</span>
          <span style="color: ${sentinelColors.textTertiary};">C</span>
          <span style="color: ${color};">${params.close.toFixed(2)}</span>
        </div>
        <div style="color: ${color}; font-weight: 600; padding-top: 8px; border-top: 1px solid ${sentinelColors.borderSubtle};">
          ${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)
        </div>
      </div>
    `;
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export default sentinelEChartsTheme;
