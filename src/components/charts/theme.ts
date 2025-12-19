// src/components/charts/theme.ts
// ============================================
// CHART THEME - Nivo Charts Configuration
// ============================================
//
// IMPORTANT: These values should match the CSS variables in theme.css
// Nivo requires JavaScript values, not CSS variables, so we duplicate
// the theme values here. Keep in sync with:
//   - src/styles/theme.css
//
// Color Reference (from theme.css):
//   --primary: #FF6600
//   --foreground: #FFFFFF
//   --foreground-muted: #888888
//   --background-secondary: #0a0a0a
//   --background-tertiary: #111111
//   --border: #333333
//   --success: #00FF41
//   --info: #00BFFF
//   --warning: #FFB800
//   --destructive: #FF3333
// ============================================

// Font stack matching --font-mono
const FONT_MONO = "'JetBrains Mono', 'Fira Code', 'Consolas', monospace";

// Color tokens (matching theme.css)
const colors = {
  primary: '#FF6600',
  foreground: '#FFFFFF',
  foregroundMuted: '#888888',
  backgroundSecondary: '#0a0a0a',
  backgroundTertiary: '#111111',
  border: '#333333',
  success: '#00FF41',
  info: '#00BFFF',
  warning: '#FFB800',
  destructive: '#FF3333',
};

export const terminalChartTheme = {
  background: 'transparent',
  text: {
    fontSize: 12,
    fill: colors.foregroundMuted,
    fontFamily: FONT_MONO,
  },
  axis: {
    domain: {
      line: {
        stroke: colors.border,
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: colors.border,
        strokeWidth: 1,
      },
      text: {
        fill: colors.foregroundMuted,
        fontSize: 10,
        fontFamily: FONT_MONO,
      },
    },
    legend: {
      text: {
        fill: colors.foreground,
        fontSize: 12,
        fontWeight: 500,
        fontFamily: FONT_MONO,
      },
    },
  },
  grid: {
    line: {
      stroke: colors.backgroundTertiary,
      strokeWidth: 1,
    },
  },
  legends: {
    text: {
      fill: colors.foreground,
      fontSize: 11,
      fontFamily: FONT_MONO,
    },
  },
  tooltip: {
    container: {
      background: colors.backgroundSecondary,
      color: colors.foreground,
      fontSize: 12,
      borderRadius: '4px',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      fontFamily: FONT_MONO,
    },
  },
  crosshair: {
    line: {
      stroke: colors.primary,
      strokeWidth: 1,
      strokeOpacity: 0.5,
    },
  },
};

export const terminalChartColors = [
  colors.primary,      // Primary (naranja)
  colors.success,      // Success (verde)
  colors.info,         // Info (cyan)
  colors.warning,      // Warning (amarillo)
  colors.destructive,  // Destructive (rojo)
  '#9D4EDD',           // Purple
  '#00CED1',           // Dark cyan
  '#FF69B4',           // Pink
];
