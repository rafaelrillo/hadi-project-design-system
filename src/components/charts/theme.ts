// Path: src/components/charts/theme.ts
// ═══════════════════════════════════════════════════════════════════════════════
// SENTINEL CHART THEME - Lightweight Charts Configuration
// ═══════════════════════════════════════════════════════════════════════════════
//
// IMPORTANT: These values should match the CSS variables in theme.css
// Keep in sync with:
//   - src/styles/theme.css
//
// Palette: "Observatorio Nocturno"
// - Desaturated, calm colors
// - Subtle grids and axes
// - Clean, professional tooltips
// - No vibrant colors that "scream"
//
// ═══════════════════════════════════════════════════════════════════════════════

import type { DeepPartial, ChartOptions } from 'lightweight-charts';
import { ColorType } from 'lightweight-charts';

// Font stacks
const FONT_PRIMARY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// ─────────────────────────────────────────────────────────────────────────────
// SENTINEL COLOR TOKENS
// Matching theme.css values exactly
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

  // Accent (Teal)
  accentPrimary: '#5ba3a5',
  accentSecondary: '#4a8a8c',
  accentSubtle: 'rgba(91, 163, 165, 0.15)',
  accentGlow: 'rgba(91, 163, 165, 0.3)',

  // Status
  positive: '#4a9a7c',
  positiveText: '#6bb89a',
  negative: '#b85c5c',
  negativeText: '#d17878',
  warning: '#c4a35a',
  warningText: '#d9bc78',
  info: '#5a8fb8',
  infoText: '#78a8cc',
  neutral: '#6b7280',

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

  // Chart series colors (harmonious palette)
  chart1: '#5ba3a5',  // Accent primary (teal)
  chart2: '#7ecbcc',  // Accent light
  chart3: '#4a9a7c',  // Green teal
  chart4: '#5a8fb8',  // Blue
  chart5: '#8b7ec7',  // Purple soft
  chart6: '#c4a35a',  // Amber
  chart7: '#c47a5a',  // Terracotta
  chart8: '#b85c5c',  // Coral
};

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTWEIGHT CHARTS THEME
// Complete theme configuration for TradingView Lightweight Charts
// ─────────────────────────────────────────────────────────────────────────────

export const chartTheme: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      type: ColorType.Solid,
      color: 'transparent',
    },
    textColor: sentinelColors.textSecondary,
    fontFamily: FONT_PRIMARY,
    fontSize: 12,
    attributionLogo: false, // Disable TradingView logo
  },
  grid: {
    vertLines: {
      color: sentinelColors.borderSubtle,
      style: 1, // Solid
      visible: false,
    },
    horzLines: {
      color: sentinelColors.borderSubtle,
      style: 1,
      visible: true,
    },
  },
  crosshair: {
    mode: 1, // Normal
    vertLine: {
      color: sentinelColors.accentPrimary,
      width: 1,
      style: 2, // Dashed
      labelBackgroundColor: sentinelColors.bgOverlay,
    },
    horzLine: {
      color: sentinelColors.accentPrimary,
      width: 1,
      style: 2,
      labelBackgroundColor: sentinelColors.bgOverlay,
    },
  },
  timeScale: {
    borderColor: sentinelColors.borderSubtle,
    timeVisible: true,
    secondsVisible: false,
  },
  rightPriceScale: {
    borderColor: sentinelColors.borderSubtle,
    scaleMargins: {
      top: 0.1,
      bottom: 0.1,
    },
  },
  leftPriceScale: {
    borderColor: sentinelColors.borderSubtle,
    visible: false,
  },
  handleScale: {
    axisPressedMouseMove: {
      time: true,
      price: true,
    },
  },
  handleScroll: {
    mouseWheel: true,
    pressedMouseMove: true,
    horzTouchDrag: true,
    vertTouchDrag: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SERIES OPTIONS
// Pre-configured options for different series types
// ─────────────────────────────────────────────────────────────────────────────

export const lineSeriesOptions = {
  color: sentinelColors.accentPrimary,
  lineWidth: 2 as const,
  lineStyle: 0, // Solid
  crosshairMarkerVisible: true,
  crosshairMarkerRadius: 4,
  crosshairMarkerBorderColor: sentinelColors.accentPrimary,
  crosshairMarkerBackgroundColor: sentinelColors.bgElevated,
  crosshairMarkerBorderWidth: 2 as const,
  lastValueVisible: true,
  priceLineVisible: false,
};

export const areaSeriesOptions = {
  topColor: 'rgba(91, 163, 165, 0.4)',
  bottomColor: 'rgba(91, 163, 165, 0.0)',
  lineColor: sentinelColors.accentPrimary,
  lineWidth: 2 as const,
  lineStyle: 0,
  crosshairMarkerVisible: true,
  crosshairMarkerRadius: 4,
  crosshairMarkerBorderColor: sentinelColors.accentPrimary,
  crosshairMarkerBackgroundColor: sentinelColors.bgElevated,
  crosshairMarkerBorderWidth: 2 as const,
  lastValueVisible: true,
  priceLineVisible: false,
};

export const candlestickSeriesOptions = {
  upColor: sentinelColors.positive,
  downColor: sentinelColors.negative,
  borderUpColor: sentinelColors.positive,
  borderDownColor: sentinelColors.negative,
  wickUpColor: sentinelColors.positive,
  wickDownColor: sentinelColors.negative,
};

export const histogramSeriesOptions = {
  color: sentinelColors.accentPrimary,
  priceFormat: {
    type: 'volume' as const,
  },
  priceLineVisible: false,
  lastValueVisible: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// CHART COLOR SCHEMES
// Different palettes for different use cases
// ─────────────────────────────────────────────────────────────────────────────

// Primary chart colors (8 color palette)
export const sentinelChartColors = [
  sentinelColors.chart1,  // Teal (accent)
  sentinelColors.chart2,  // Light teal
  sentinelColors.chart3,  // Green teal
  sentinelColors.chart4,  // Blue
  sentinelColors.chart5,  // Purple
  sentinelColors.chart6,  // Amber
  sentinelColors.chart7,  // Terracotta
  sentinelColors.chart8,  // Coral
];

// Sequential color scheme (single hue, light to dark)
export const sentinelSequentialColors = [
  '#e0f2f2',
  '#b3dede',
  '#7ecbcc',
  '#5ba3a5',
  '#4a8a8c',
  '#3a7072',
  '#2a5658',
  '#1a3c3e',
];

// Diverging color scheme (negative to positive)
export const sentinelDivergingColors = [
  sentinelColors.negative,   // Negative (coral)
  '#c98080',
  '#d4a6a6',
  sentinelColors.neutral,    // Neutral (gray)
  '#8eb5a3',
  '#6bb89a',
  sentinelColors.positive,   // Positive (green)
];

// Risk level colors (for specific risk visualizations)
export const sentinelRiskColors = [
  sentinelColors.riskLow,
  sentinelColors.riskModerate,
  sentinelColors.riskElevated,
  sentinelColors.riskHigh,
  sentinelColors.riskSevere,
];

// Market state colors
export const sentinelMarketColors = {
  bull: sentinelColors.marketBull,
  bear: sentinelColors.marketBear,
  neutral: sentinelColors.marketNeutral,
  uncertain: sentinelColors.marketUncertain,
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get area series options with custom color
 */
export function getAreaSeriesOptions(color: string, opacity = 0.4) {
  return {
    ...areaSeriesOptions,
    topColor: `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    bottomColor: `${color}00`,
    lineColor: color,
    crosshairMarkerBorderColor: color,
  };
}

/**
 * Get line series options with custom color
 */
export function getLineSeriesOptions(color: string) {
  return {
    ...lineSeriesOptions,
    color,
    crosshairMarkerBorderColor: color,
  };
}

/**
 * Format financial values (K/M/B notation)
 */
export function formatFinancialValue(value: number): string {
  const absValue = Math.abs(value);
  if (absValue >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (absValue >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (absValue >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toFixed(2);
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKWARDS COMPATIBILITY
// Keep the old export names working
// ─────────────────────────────────────────────────────────────────────────────

export const sentinelChartTheme = chartTheme;
export const terminalChartTheme = chartTheme;
export const terminalChartColors = sentinelChartColors;
