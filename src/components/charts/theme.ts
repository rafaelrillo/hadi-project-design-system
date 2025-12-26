// Path: src/components/charts/theme.ts
// ═══════════════════════════════════════════════════════════════════════════════
// SENTINEL CHART THEME - Nivo Charts Configuration
// ═══════════════════════════════════════════════════════════════════════════════
//
// IMPORTANT: These values should match the CSS variables in theme.css
// Nivo requires JavaScript values, not CSS variables, so we duplicate
// the theme values here. Keep in sync with:
//   - src/styles/theme.css
//
// Palette: "Observatorio Nocturno"
// - Desaturated, calm colors
// - Subtle grids and axes
// - Clean, professional tooltips
// - No vibrant colors that "scream"
//
// ═══════════════════════════════════════════════════════════════════════════════

// Font stacks
const FONT_PRIMARY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const FONT_MONO = "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace";

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
// SENTINEL CHART THEME
// Complete theme configuration for Nivo charts
// ─────────────────────────────────────────────────────────────────────────────

export const sentinelChartTheme = {
  background: 'transparent',

  // Default text styles
  text: {
    fontSize: 12,
    fill: sentinelColors.textSecondary,
    fontFamily: FONT_PRIMARY,
    fontWeight: 400,
  },

  // Axis configuration
  axis: {
    domain: {
      line: {
        stroke: sentinelColors.borderSubtle,
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: sentinelColors.borderSubtle,
        strokeWidth: 1,
      },
      text: {
        fill: sentinelColors.textTertiary,
        fontSize: 11,
        fontFamily: FONT_MONO,
      },
    },
    legend: {
      text: {
        fill: sentinelColors.textSecondary,
        fontSize: 12,
        fontWeight: 500,
        fontFamily: FONT_PRIMARY,
      },
    },
  },

  // Grid lines
  grid: {
    line: {
      stroke: sentinelColors.borderSubtle,
      strokeWidth: 1,
    },
  },

  // Legends
  legends: {
    text: {
      fill: sentinelColors.textSecondary,
      fontSize: 11,
      fontFamily: FONT_PRIMARY,
    },
    ticks: {
      line: {
        stroke: sentinelColors.borderDefault,
        strokeWidth: 1,
      },
      text: {
        fill: sentinelColors.textTertiary,
        fontSize: 10,
      },
    },
  },

  // Tooltip
  tooltip: {
    container: {
      background: sentinelColors.bgOverlay,
      color: sentinelColors.textPrimary,
      fontSize: 12,
      fontFamily: FONT_PRIMARY,
      borderRadius: '8px',
      border: `1px solid ${sentinelColors.borderDefault}`,
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
      padding: '12px 16px',
    },
    basic: {
      whiteSpace: 'pre' as const,
      display: 'flex' as const,
      alignItems: 'center' as const,
    },
    chip: {
      marginRight: 7,
    },
    table: {},
    tableCell: {
      padding: '3px 7px',
    },
    tableCellValue: {
      fontWeight: 600,
      fontFamily: FONT_MONO,
    },
  },

  // Crosshair
  crosshair: {
    line: {
      stroke: sentinelColors.accentPrimary,
      strokeWidth: 1,
      strokeOpacity: 0.5,
      strokeDasharray: '4 4',
    },
  },

  // Annotations
  annotations: {
    text: {
      fontSize: 13,
      fill: sentinelColors.textSecondary,
      fontFamily: FONT_PRIMARY,
      outlineWidth: 2,
      outlineColor: sentinelColors.bgBase,
      outlineOpacity: 1,
    },
    link: {
      stroke: sentinelColors.accentPrimary,
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: sentinelColors.bgBase,
      outlineOpacity: 1,
    },
    outline: {
      stroke: sentinelColors.accentPrimary,
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: sentinelColors.bgBase,
      outlineOpacity: 1,
    },
    symbol: {
      fill: sentinelColors.accentPrimary,
      outlineWidth: 2,
      outlineColor: sentinelColors.bgBase,
      outlineOpacity: 1,
    },
  },

  // Labels
  labels: {
    text: {
      fill: sentinelColors.textPrimary,
      fontSize: 11,
      fontWeight: 500,
      fontFamily: FONT_MONO,
    },
  },

  // Dots (for line/scatter charts)
  dots: {
    text: {
      fill: sentinelColors.textPrimary,
      fontSize: 10,
      fontFamily: FONT_MONO,
    },
  },

  // Markers
  markers: {
    text: {
      fill: sentinelColors.textSecondary,
      fontSize: 11,
      fontFamily: FONT_PRIMARY,
      outlineWidth: 0,
      outlineColor: 'transparent',
      outlineOpacity: 0,
    },
  },
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
// CHART-SPECIFIC CONFIGURATIONS
// Pre-configured options for specific chart types
// ─────────────────────────────────────────────────────────────────────────────

// Line chart defaults
export const lineChartDefaults = {
  colors: sentinelChartColors,
  theme: sentinelChartTheme,
  lineWidth: 2,
  pointSize: 6,
  pointColor: sentinelColors.bgElevated,
  pointBorderWidth: 2,
  pointBorderColor: { from: 'serieColor' },
  enableSlices: 'x' as const,
  enableGridX: false,
  enableGridY: true,
  enableArea: false,
  areaOpacity: 0.1,
  curve: 'monotoneX' as const,
  useMesh: true,
};

// Bar chart defaults
export const barChartDefaults = {
  colors: sentinelChartColors,
  theme: sentinelChartTheme,
  borderRadius: 4,
  borderWidth: 0,
  padding: 0.3,
  enableGridX: false,
  enableGridY: true,
  labelTextColor: sentinelColors.textPrimary,
};

// Pie/Donut chart defaults
export const pieChartDefaults = {
  colors: sentinelChartColors,
  theme: sentinelChartTheme,
  innerRadius: 0.5,
  padAngle: 0.7,
  cornerRadius: 4,
  borderWidth: 0,
  enableArcLabels: false,
  enableArcLinkLabels: true,
  arcLinkLabelsColor: { from: 'color' },
  arcLinkLabelsThickness: 1,
  arcLinkLabelsTextColor: sentinelColors.textSecondary,
};

// Heatmap defaults
export const heatmapDefaults = {
  theme: sentinelChartTheme,
  colors: sentinelSequentialColors,
  emptyColor: sentinelColors.bgSubtle,
  borderWidth: 1,
  borderColor: sentinelColors.bgBase,
  labelTextColor: sentinelColors.textPrimary,
  cellOpacity: 1,
  cellBorderWidth: 0,
};

// ─────────────────────────────────────────────────────────────────────────────
// BACKWARDS COMPATIBILITY
// Keep the old export names working
// ─────────────────────────────────────────────────────────────────────────────

export const terminalChartTheme = sentinelChartTheme;
export const terminalChartColors = sentinelChartColors;
