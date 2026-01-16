// Path: src/hooks/useDynamicShadows.ts
/**
 * Dynamic Shadows Hook
 *
 * Calculates shadow offsets based on a light angle (0-360°).
 * The shadow direction is opposite to the light source.
 *
 * Based on Josh W. Comeau's shadow principles:
 * - Single light source for consistency
 * - Layered shadows for depth
 * - Color-matched shadows (never pure black)
 */

import { useMemo, useCallback } from 'react';

export interface ShadowOffsets {
  x: number;
  y: number;
}

export interface DynamicShadowsConfig {
  lightAngle: number;
}

export interface DynamicShadowsResult {
  /** Shadow offsets normalized to -1 to 1 range */
  shadowOffsets: ShadowOffsets;
  /** Get neumorphic panel shadow (elevated, for cards/modals) */
  getNeuPanelShadow: (distance?: number, blur?: number) => string;
  /** Get neumorphic inset shadow (pressed, for inputs/wells) */
  getNeuInsetShadow: (distance?: number, blur?: number) => string;
  /** Get layered shadow for glass elements */
  getLayeredShadow: (hue?: number, sat?: number) => string;
  /** Get glass reflection effect */
  getGlassReflection: () => string;
  /** Get glass background gradient */
  getGlassBackground: (hue: number, sat: number, angleOffset?: number) => string;
  /** Get glass border color */
  getGlassBorder: (hue: number, sat: number) => string;
}

/**
 * Calculate shadow offsets from light angle
 * Shadow goes in the opposite direction of the light source
 */
function calculateShadowOffsets(lightAngle: number): ShadowOffsets {
  // Convert light angle to shadow angle (opposite direction)
  const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
  return {
    x: Math.cos(shadowAngle),
    y: Math.sin(shadowAngle),
  };
}

/**
 * Hook for calculating dynamic shadows based on light angle
 */
export function useDynamicShadows({ lightAngle }: DynamicShadowsConfig): DynamicShadowsResult {
  const shadowOffsets = useMemo(() => calculateShadowOffsets(lightAngle), [lightAngle]);

  /**
   * Neumorphic Panel Shadow (elevated)
   * For: Cards, Modals, Sidebars, Panels
   * Creates dual shadow with highlight towards light, shadow away from light
   */
  const getNeuPanelShadow = useCallback(
    (distance: number = 20, blur: number = 60): string => {
      const { x, y } = shadowOffsets;

      // Highlight goes towards the light (inverse of shadow direction)
      const hlX = -x * distance;
      const hlY = -y * distance;

      // Shadow goes away from light
      const shX = x * distance;
      const shY = y * distance;

      return `${hlX.toFixed(1)}px ${hlY.toFixed(1)}px ${blur}px #ffffff, ${shX.toFixed(1)}px ${shY.toFixed(1)}px ${blur}px hsl(220, 15%, 72%)`;
    },
    [shadowOffsets]
  );

  /**
   * Neumorphic Inset Shadow (pressed)
   * For: Inputs, Textareas, Wells, Recessed containers
   */
  const getNeuInsetShadow = useCallback(
    (distance: number = 5, blur: number = 15): string => {
      const { x, y } = shadowOffsets;
      const shX = x * distance;
      const shY = y * distance;

      return `inset ${shX.toFixed(1)}px ${shY.toFixed(1)}px ${blur}px hsl(220, 15%, 72%), inset ${(-shX).toFixed(1)}px ${(-shY).toFixed(1)}px ${blur}px #ffffff`;
    },
    [shadowOffsets]
  );

  /**
   * Layered Shadow for Glass elements
   * Creates 4-layer shadow with color matching
   * For: KPIs, Notifications, Tooltips, Floating elements
   */
  const getLayeredShadow = useCallback(
    (hue: number = 175, sat: number = 35): string => {
      const { x, y } = shadowOffsets;

      const layers = [
        { dist: 0.5, blur: 1, opacity: 0.12 },
        { dist: 1, blur: 2, opacity: 0.10 },
        { dist: 2, blur: 4, opacity: 0.08 },
        { dist: 4, blur: 8, opacity: 0.06 },
      ];

      return layers
        .map((layer) => {
          const offsetX = (x * layer.dist).toFixed(1);
          // Ratio: offset-y = 1.5x offset-x for natural appearance
          const offsetY = (y * layer.dist * 1.5).toFixed(1);
          return `${offsetX}px ${offsetY}px ${layer.blur}px hsla(${hue}, ${sat * 0.6}%, 35%, ${layer.opacity})`;
        })
        .join(', ');
    },
    [shadowOffsets]
  );

  /**
   * Glass Reflection Effect
   * Simulates light reflection on glass edges
   */
  const getGlassReflection = useCallback((): string => {
    const { x, y } = shadowOffsets;

    // Highlight goes towards the light source
    const hlX = -x;
    const hlY = -y;

    // Adjust highlight intensity based on angle
    const topHighlight = hlY < 0 ? 0.6 : 0.2;
    const leftHighlight = hlX < 0 ? 0.4 : 0.15;

    const topDirection = hlY < 0 ? '-1px' : '1px';
    const leftDirection = hlX < 0 ? '-1px' : '1px';

    return `inset 0 ${topDirection} 0 hsla(0, 0%, 100%, ${topHighlight}), inset ${leftDirection} 0 0 hsla(0, 0%, 100%, ${leftHighlight})`;
  }, [shadowOffsets]);

  /**
   * Glass Background Gradient
   * Creates gradient that responds to light angle
   */
  const getGlassBackground = useCallback(
    (hue: number, sat: number, angleOffset: number = 45): string => {
      const gradientAngle = lightAngle + angleOffset;
      return `linear-gradient(${gradientAngle}deg, hsla(${hue}, ${sat}%, 70%, 0.28) 0%, hsla(${hue}, ${sat}%, 65%, 0.12) 50%, hsla(${hue}, ${sat}%, 60%, 0.20) 100%)`;
    },
    [lightAngle]
  );

  /**
   * Glass Border Color
   */
  const getGlassBorder = useCallback(
    (hue: number, sat: number): string => {
      return `hsla(${hue}, ${sat}%, 80%, 0.35)`;
    },
    []
  );

  return {
    shadowOffsets,
    getNeuPanelShadow,
    getNeuInsetShadow,
    getLayeredShadow,
    getGlassReflection,
    getGlassBackground,
    getGlassBorder,
  };
}

/**
 * Standalone shadow calculation functions (for use outside React)
 */
export const shadowUtils = {
  calculateShadowOffsets,

  getNeuPanelShadow: (lightAngle: number, distance: number = 20, blur: number = 60): string => {
    const { x, y } = calculateShadowOffsets(lightAngle);
    const hlX = -x * distance;
    const hlY = -y * distance;
    const shX = x * distance;
    const shY = y * distance;
    return `${hlX.toFixed(1)}px ${hlY.toFixed(1)}px ${blur}px #ffffff, ${shX.toFixed(1)}px ${shY.toFixed(1)}px ${blur}px hsl(220, 15%, 72%)`;
  },

  getNeuInsetShadow: (lightAngle: number, distance: number = 5, blur: number = 15): string => {
    const { x, y } = calculateShadowOffsets(lightAngle);
    const shX = x * distance;
    const shY = y * distance;
    return `inset ${shX.toFixed(1)}px ${shY.toFixed(1)}px ${blur}px hsl(220, 15%, 72%), inset ${(-shX).toFixed(1)}px ${(-shY).toFixed(1)}px ${blur}px #ffffff`;
  },
};

export default useDynamicShadows;
