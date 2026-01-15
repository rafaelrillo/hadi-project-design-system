// Path: src/engine/lighting/formulas.ts

import type { HSLColor, ShadowLayer, NeumorphicShadows } from './types';

/**
 * LIGHTING ENGINE MATHEMATICAL FORMULAS
 * Based on Josh Comeau's principles + physics-based light behavior
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS - Optimized for soft, diffuse glass-like shadows
// ─────────────────────────────────────────────────────────────────────────────

/** Base unit for shadow offset (pixels per elevation unit) */
const BASE_OFFSET = 1.5;

/** Base unit for shadow blur (pixels per elevation unit) - HIGH for soft shadows */
const BASE_BLUR = 6;

/** Shadow opacity at elevation 1 - LOW for subtle effect */
const BASE_OPACITY = 0.12;

/** Opacity decay factor per elevation doubling */
const OPACITY_DECAY = 0.92;

/** Layered shadow multipliers for ultra-soft effect */
const LAYER_MULTIPLIERS = [1, 2, 4, 8, 16] as const;

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA 1: Shadow Offset from Light Angle
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate shadow offset X/Y based on light position and elevation
 *
 * The shadow falls OPPOSITE to the light source:
 * - Light from top-left (azimuth=135) -> Shadow falls bottom-right
 * - Light from directly above (altitude=90) -> Shadow directly below (minimal offset)
 *
 * Formula:
 *   offsetX = -cos(azimuth) * cos(altitude) * elevation * BASE_OFFSET
 *   offsetY = -sin(azimuth) * cos(altitude) * elevation * BASE_OFFSET
 */
export function calculateShadowOffset(
  azimuth: number,
  altitude: number,
  elevation: number
): { x: number; y: number } {
  const azimuthRad = (azimuth * Math.PI) / 180;
  const altitudeRad = (altitude * Math.PI) / 180;

  // Shadow direction is opposite to light
  // Higher altitude = less horizontal spread (shadow more directly below)
  const horizontalFactor = Math.cos(altitudeRad);

  // Base offset scales with elevation
  const baseOffset = elevation * BASE_OFFSET;

  return {
    x: -Math.cos(azimuthRad) * horizontalFactor * baseOffset,
    y: -Math.sin(azimuthRad) * horizontalFactor * baseOffset
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA 2: Shadow Blur from Elevation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate shadow blur based on elevation
 *
 * Higher elevation = larger blur (light has more room to diffuse)
 * Uses Josh Comeau's principle: blur roughly doubles with elevation
 *
 * Formula:
 *   blur = elevation * BASE_BLUR * (1 + log2(elevation + 1) * 0.5)
 */
export function calculateShadowBlur(
  elevation: number,
  blurMultiplier: number = 1
): number {
  if (elevation === 0) return 0;

  const logFactor = 1 + Math.log2(elevation + 1) * 0.5;
  return elevation * BASE_BLUR * logFactor * blurMultiplier;
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA 3: Shadow Opacity from Elevation and Intensity
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate shadow opacity based on elevation and light intensity
 *
 * Higher elevation = lower opacity (shadows get softer with distance)
 * Higher intensity = stronger shadows
 *
 * Formula:
 *   opacity = BASE_OPACITY * intensity * (OPACITY_DECAY ^ log2(elevation))
 */
export function calculateShadowOpacity(
  elevation: number,
  intensity: number
): number {
  if (elevation === 0) return 0;

  const elevationFactor = Math.pow(OPACITY_DECAY, Math.log2(elevation));
  return BASE_OPACITY * intensity * elevationFactor;
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA 4: Colored Shadow from Element Color + Light Color
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Blend two HSL colors with a given ratio
 * ratio = 0 -> pure color1, ratio = 1 -> pure color2
 */
export function blendHSL(
  color1: HSLColor,
  color2: HSLColor,
  ratio: number
): HSLColor {
  // Handle hue wrapping (e.g., blending 350° with 10°)
  let h1 = color1.h;
  let h2 = color2.h;

  if (Math.abs(h2 - h1) > 180) {
    if (h1 < h2) h1 += 360;
    else h2 += 360;
  }

  return {
    h: ((h1 + (h2 - h1) * ratio) + 360) % 360,
    s: color1.s + (color2.s - color1.s) * ratio,
    l: color1.l + (color2.l - color1.l) * ratio
  };
}

/**
 * Calculate shadow color based on element's color AND light color
 * Produces soft, neutral shadows with subtle color influence
 */
export function calculateShadowColor(
  elementColor: HSLColor,
  opacity: number,
  lightColor?: HSLColor
): string {
  // Start with element hue but very desaturated for neutral shadow
  let shadowH = elementColor.h;
  let shadowS = Math.min(15, elementColor.s * 0.25); // Very low saturation
  let shadowL = 35; // Fixed dark gray

  // Subtle light color influence
  if (lightColor && lightColor.s > 15) {
    const complementaryH = (lightColor.h + 180) % 360;
    const blendRatio = Math.min(0.15, lightColor.s / 100 * 0.2);
    shadowH = ((shadowH * (1 - blendRatio) + complementaryH * blendRatio) + 360) % 360;
    shadowS = Math.min(12, shadowS + lightColor.s * 0.05);
  }

  return `hsla(${shadowH.toFixed(0)}, ${shadowS.toFixed(0)}%, ${shadowL}%, ${opacity})`;
}

/**
 * Get light color as CSS string for highlights
 */
export function getLightColorCSS(
  lightColor: HSLColor,
  opacity: number,
  lightnessBoost: number = 0
): string {
  const l = Math.min(100, lightColor.l + lightnessBoost);
  return `hsla(${lightColor.h}, ${lightColor.s}%, ${l}%, ${opacity})`;
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA 5: Glass Highlight Position from Light Angle
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate where the glass highlight should appear based on light position
 *
 * The highlight appears on the side facing the light:
 * - Light from top-left -> Highlight on top-left edge
 * - Light from above -> Highlight on top edge
 */
export function calculateHighlightPosition(
  azimuth: number,
  altitude: number
): { x: number; y: number } {
  const azimuthRad = (azimuth * Math.PI) / 180;
  const altitudeRad = (altitude * Math.PI) / 180;

  const horizontalSpread = Math.cos(altitudeRad) * 40;

  return {
    x: 50 + Math.cos(azimuthRad) * horizontalSpread,
    y: 10 + (1 - Math.sin(altitudeRad)) * 30
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA 6: Neumorphic Dual Shadow Calculation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate neumorphic light and dark shadows
 *
 * Neumorphism uses two shadows:
 * 1. Light shadow (toward light) - simulates reflected light, tinted by light color
 * 2. Dark shadow (away from light) - actual shadow, tinted by complementary
 */
export function calculateNeumorphicShadows(
  azimuth: number,
  altitude: number,
  elevation: number,
  intensity: number,
  lightColor?: HSLColor
): NeumorphicShadows {
  const offset = calculateShadowOffset(azimuth, altitude, elevation);
  const blur = calculateShadowBlur(elevation);
  const darkOpacity = calculateShadowOpacity(elevation, intensity);
  const lightOpacity = darkOpacity * 0.9;

  // Light shadow - subtle white/tinted highlight
  let lightShadowColor: string;
  if (lightColor && lightColor.s > 15) {
    // Very subtle tint from light color
    const lightL = Math.min(99, 95 + lightColor.l * 0.05);
    const lightS = Math.min(20, lightColor.s * 0.2);
    lightShadowColor = `hsla(${lightColor.h}, ${lightS}%, ${lightL}%, ${lightOpacity})`;
  } else {
    lightShadowColor = `rgba(255, 255, 255, ${lightOpacity})`;
  }

  // Dark shadow - neutral gray, very soft and diffuse
  let darkShadowColor: string;
  if (lightColor && lightColor.s > 15) {
    // Subtle complementary tint but mostly neutral
    const complementaryH = (lightColor.h + 180) % 360;
    const darkS = Math.min(8, lightColor.s * 0.08); // Very low saturation
    darkShadowColor = `hsla(${complementaryH}, ${darkS}%, 40%, ${darkOpacity})`;
  } else {
    darkShadowColor = `rgba(120, 130, 145, ${darkOpacity})`;
  }

  return {
    light: {
      offsetX: -offset.x,
      offsetY: -offset.y,
      blur: blur * 0.9,
      spread: 0,
      color: lightShadowColor,
      inset: false
    },
    dark: {
      offsetX: offset.x,
      offsetY: offset.y,
      blur: blur,
      spread: 0,
      color: darkShadowColor,
      inset: false
    }
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// FORMULA 7: Layered Shadow Generation (Josh Comeau Style)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate multiple shadow layers with doubling values
 *
 * Josh Comeau's technique: stack multiple shadows where each layer
 * has roughly double the offset/blur of the previous, but lower opacity
 */
export function generateLayeredShadows(
  azimuth: number,
  altitude: number,
  elevation: number,
  intensity: number,
  elementColor?: HSLColor
): ShadowLayer[] {
  const layers: ShadowLayer[] = [];

  for (const multiplier of LAYER_MULTIPLIERS) {
    const layerElevation = elevation * multiplier;
    const offset = calculateShadowOffset(azimuth, altitude, layerElevation);
    const blur = calculateShadowBlur(layerElevation);
    const opacity = calculateShadowOpacity(elevation, intensity) / multiplier;

    const color = elementColor
      ? calculateShadowColor(elementColor, opacity)
      : `rgba(163, 177, 198, ${opacity})`;

    layers.push({
      offsetX: offset.x,
      offsetY: offset.y,
      blur,
      spread: 0,
      color,
      inset: false
    });
  }

  return layers;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Tint Color for Glass
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create tint color from base HSL with opacity and lightness boost
 */
export function getTintColor(
  color: HSLColor,
  opacity: number,
  lightnessBoost: number = 0
): string {
  const tintL = Math.min(100, color.l + lightnessBoost);
  return `hsla(${color.h}, ${color.s}%, ${tintL}%, ${opacity})`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Layer to CSS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert shadow layers array to CSS box-shadow string
 */
export function layersToCSS(layers: ShadowLayer[]): string {
  return layers
    .map(layer => {
      const inset = layer.inset ? 'inset ' : '';
      return `${inset}${layer.offsetX.toFixed(1)}px ${layer.offsetY.toFixed(1)}px ${layer.blur.toFixed(1)}px ${layer.spread}px ${layer.color}`;
    })
    .join(', ');
}
