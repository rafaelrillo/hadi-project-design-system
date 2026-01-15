// Path: src/engine/lighting/index.ts

// Types
export type {
  LightSource,
  HSLColor,
  ElevationLevel,
  ElementLighting,
  ShadowLayer,
  ComputedShadow,
  ComputedGlass,
  GlassLayers,
  NeumorphicShadows
} from './types';

// Engine class
export { LightingEngine } from './LightingEngine';

// Context and hooks
export {
  LightingProvider,
  useLighting,
  useShadow,
  useNeumorphicShadow,
  useGlassLayers
} from './LightingContext';

// Element lighting hooks
export {
  useElementLighting,
  useNeuPanel,
  useNeuInset,
  useGlassButton,
  useGlassBadge
} from './useElementLighting';

// Formulas (for advanced usage)
export {
  calculateShadowOffset,
  calculateShadowBlur,
  calculateShadowOpacity,
  calculateShadowColor,
  calculateHighlightPosition,
  calculateNeumorphicShadows,
  generateLayeredShadows,
  getTintColor,
  layersToCSS,
  blendHSL,
  getLightColorCSS
} from './formulas';

// Light color presets
export const lightPresets = {
  daylight: { h: 45, s: 10, l: 98 },      // Neutral white
  warmWhite: { h: 35, s: 30, l: 95 },     // Warm incandescent
  coolWhite: { h: 210, s: 15, l: 96 },    // Cool LED
  golden: { h: 40, s: 60, l: 85 },        // Golden hour
  sunset: { h: 25, s: 70, l: 75 },        // Orange sunset
  blue: { h: 220, s: 50, l: 80 },         // Blue hour
  pink: { h: 330, s: 45, l: 85 },         // Pink neon
  green: { h: 140, s: 40, l: 80 },        // Green tint
  purple: { h: 270, s: 45, l: 82 },       // Purple ambient
  cyan: { h: 185, s: 50, l: 82 },         // Cyan accent
} as const;

// Predefined glass colors
export const glassColors = {
  neutral: { h: 210, s: 15, l: 70 },
  teal: { h: 175, s: 35, l: 55 },
  success: { h: 145, s: 30, l: 50 },
  warning: { h: 35, s: 40, l: 55 },
  danger: { h: 355, s: 35, l: 55 },
  info: { h: 215, s: 35, l: 55 }
} as const;
