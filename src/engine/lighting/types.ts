// Path: src/engine/lighting/types.ts

import type { CSSProperties } from 'react';

/**
 * Light source configuration
 * Uses spherical coordinates for intuitive positioning
 */
export interface LightSource {
  /** Horizontal angle in degrees (0-360, where 0=right, 90=top, 180=left, 270=bottom) */
  azimuth: number;
  /** Vertical angle in degrees (0-90, where 0=horizon, 90=directly above) */
  altitude: number;
  /** Light intensity (0-1, affects shadow opacity and highlight strength) */
  intensity: number;
  /** Light color temperature in Kelvin (2700=warm, 5500=neutral, 8000=cool) */
  temperature: number;
  /** Light color in HSL (tints highlights and affects shadow hue) */
  color: HSLColor;
}

/**
 * HSL color representation for colored shadows
 */
export interface HSLColor {
  h: number; // Hue (0-360)
  s: number; // Saturation (0-100)
  l: number; // Lightness (0-100)
}

/**
 * Elevation level for elements
 * Based on Josh Comeau's doubling scale: 0, 1, 2, 4, 8, 16, 32
 */
export type ElevationLevel = 0 | 1 | 2 | 4 | 8 | 16 | 32;

/**
 * Element properties for shadow calculation
 */
export interface ElementLighting {
  /** Elevation level (distance from surface in conceptual units) */
  elevation: ElevationLevel;
  /** Element's base color in HSL (for colored shadows) */
  color?: HSLColor;
  /** Whether element is pressed/inset */
  isInset?: boolean;
  /** Custom blur multiplier (default 1) */
  blurMultiplier?: number;
}

/**
 * Individual shadow layer
 */
export interface ShadowLayer {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

/**
 * Computed shadow output
 */
export interface ComputedShadow {
  /** CSS box-shadow value */
  boxShadow: string;
  /** Individual shadow layers for fine-grained control */
  layers: ShadowLayer[];
}

/**
 * Computed glass effects
 */
export interface ComputedGlass {
  /** Highlight gradient position (0-100%) */
  highlightPosition: { x: number; y: number };
  /** Highlight opacity (0-1) */
  highlightOpacity: number;
  /** Refraction offset for inner elements */
  refractionOffset: { x: number; y: number };
  /** CSS for glass highlight pseudo-element */
  highlightCSS: CSSProperties;
  /** CSS for inner glow (bottom refraction) */
  innerGlowCSS: CSSProperties;
}

/**
 * Glass layer styles (5-layer system)
 */
export interface GlassLayers {
  container: CSSProperties;
  base: CSSProperties;
  gradient: CSSProperties;
  texture: CSSProperties;
  highlight: CSSProperties;
  innerGlow: CSSProperties;
}

/**
 * Neumorphic shadow pair (light + dark)
 */
export interface NeumorphicShadows {
  light: ShadowLayer;
  dark: ShadowLayer;
}
