// Path: src/engine/lighting/useElementLighting.ts

import { useMemo, CSSProperties } from 'react';
import { useLighting } from './LightingContext';
import type { ElevationLevel, HSLColor } from './types';

/**
 * useElementLighting Hook
 *
 * Primary API for components to consume lighting effects
 * Combines shadow, neumorphism, and glass into a single hook
 */

interface UseElementLightingOptions {
  /** Elevation level (0, 1, 2, 4, 8, 16, 32) */
  elevation?: ElevationLevel;
  /** Whether element is pressed/inset */
  isInset?: boolean;
  /** Element's base color for colored shadows */
  color?: HSLColor;
  /** Use neumorphic (dual) shadows */
  neumorphic?: boolean;
  /** Include glass highlight effect */
  glassHighlight?: boolean;
  /** Custom blur multiplier */
  blurMultiplier?: number;
}

interface ElementLightingResult {
  /** Box shadow CSS value */
  boxShadow: string;
  /** Style object with shadow applied */
  shadowStyle: CSSProperties;
  /** Glass highlight style (for pseudo-element) */
  highlightStyle?: CSSProperties;
  /** Combined styles (shadow + position relative) */
  combinedStyle: CSSProperties;
}

export function useElementLighting(
  options: UseElementLightingOptions = {}
): ElementLightingResult {
  const {
    elevation = 4,
    isInset = false,
    color,
    neumorphic = true,
    glassHighlight = false,
    blurMultiplier = 1
  } = options;

  const {
    computeShadow,
    computeNeumorphicShadow,
    computeGlassEffects
  } = useLighting();

  return useMemo(() => {
    const shadow =
      neumorphic && !color
        ? computeNeumorphicShadow(elevation)
        : computeShadow({ elevation, color, isInset, blurMultiplier });

    const shadowStyle: CSSProperties = {
      boxShadow: shadow.boxShadow
    };

    let highlightStyle: CSSProperties | undefined;
    if (glassHighlight) {
      const glassEffects = computeGlassEffects(color);
      highlightStyle = glassEffects.highlightCSS;
    }

    const combinedStyle: CSSProperties = {
      ...shadowStyle,
      position: 'relative' as const
    };

    return {
      boxShadow: shadow.boxShadow,
      shadowStyle,
      highlightStyle,
      combinedStyle
    };
  }, [
    elevation,
    isInset,
    color,
    neumorphic,
    glassHighlight,
    blurMultiplier,
    computeShadow,
    computeNeumorphicShadow,
    computeGlassEffects
  ]);
}

/**
 * Neumorphic panel styles - soft floating glass effect
 */
export function useNeuPanel(elevation: ElevationLevel = 8) {
  const { computeNeumorphicShadow, light } = useLighting();

  return useMemo(() => {
    const shadow = computeNeumorphicShadow(elevation);

    // Subtle tint from light color
    const hasLightColor = light.color && light.color.s > 10;
    const tintH = hasLightColor ? light.color.h : 210;
    const tintS = hasLightColor ? Math.min(8, light.color.s * 0.1) : 3;

    return {
      background: `
        linear-gradient(
          145deg,
          hsla(${tintH}, ${tintS}%, 95%, 0.9) 0%,
          hsla(${tintH}, ${tintS}%, 92%, 0.85) 50%,
          hsla(${tintH}, ${tintS}%, 90%, 0.9) 100%
        )
      `,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      padding: '32px',
      boxShadow: shadow.boxShadow,
      position: 'relative' as const
    } as CSSProperties;
  }, [computeNeumorphicShadow, elevation, light]);
}

/**
 * Neumorphic inset styles
 */
export function useNeuInset(elevation: ElevationLevel = 4) {
  const { computeShadow } = useLighting();

  return useMemo(() => {
    const shadow = computeShadow({ elevation, isInset: true });

    return {
      background: `
        linear-gradient(
          145deg,
          #DADFE6 0%,
          #E0E5EC 40%,
          #E2E7EE 100%
        )
      `,
      borderRadius: '8px',
      border: 'none',
      boxShadow: shadow.boxShadow
    } as CSSProperties;
  }, [computeShadow, elevation]);
}

/**
 * Glass button styles
 */
export function useGlassButton(color: HSLColor) {
  const { computeColoredGlassShadow, computeGlassEffects } = useLighting();

  return useMemo(() => {
    const shadow = computeColoredGlassShadow(color, 2);
    const glassEffects = computeGlassEffects(color);

    const tintColor = (opacity: number, lightnessBoost: number = 0): string => {
      const tintL = Math.min(100, color.l + lightnessBoost);
      return `hsla(${color.h}, ${color.s}%, ${tintL}%, ${opacity})`;
    };

    return {
      button: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 28px',
        background: `
          linear-gradient(
            135deg,
            ${tintColor(0.2, 30)} 0%,
            ${tintColor(0.08, 20)} 50%,
            ${tintColor(0.15, 25)} 100%
          )
        `,
        backdropFilter: 'blur(3px) saturate(120%)',
        WebkitBackdropFilter: 'blur(3px) saturate(120%)',
        border: `1px solid ${tintColor(0.18, 35)}`,
        borderRadius: '6px',
        color: '#2D3436',
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'var(--sentinel-font-mono)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: `
          ${shadow},
          inset 0 1px 0 ${tintColor(0.3, 40)}
        `,
        position: 'relative' as const,
        overflow: 'hidden' as const
      } as CSSProperties,
      highlight: glassEffects.highlightCSS
    };
  }, [color, computeColoredGlassShadow, computeGlassEffects]);
}

/**
 * Glass badge styles
 */
export function useGlassBadge(color: HSLColor) {
  const { computeColoredGlassShadow } = useLighting();

  return useMemo(() => {
    const shadow = computeColoredGlassShadow(color, 1);

    const tintColor = (opacity: number, lightnessBoost: number = 0): string => {
      const tintL = Math.min(100, color.l + lightnessBoost);
      return `hsla(${color.h}, ${color.s}%, ${tintL}%, ${opacity})`;
    };

    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '6px 12px',
      background: `
        linear-gradient(
          90deg,
          ${tintColor(0.2, 25)} 0%,
          ${tintColor(0.1, 20)} 50%,
          ${tintColor(0.15, 25)} 100%
        )
      `,
      backdropFilter: 'blur(2px)',
      WebkitBackdropFilter: 'blur(2px)',
      border: `1px solid ${tintColor(0.15, 30)}`,
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 600,
      color: '#2D3436',
      boxShadow: shadow,
      position: 'relative' as const,
      overflow: 'hidden' as const
    } as CSSProperties;
  }, [color, computeColoredGlassShadow]);
}
