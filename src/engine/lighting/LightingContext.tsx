// Path: src/engine/lighting/LightingContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react';
import { LightingEngine } from './LightingEngine';
import type {
  LightSource,
  ElevationLevel,
  ElementLighting,
  ComputedShadow,
  ComputedGlass,
  HSLColor,
  GlassLayers
} from './types';
import { getTintColor } from './formulas';

/**
 * LIGHTING CONTEXT
 * Provides unified lighting engine access throughout the application
 */

interface LightingContextValue {
  light: LightSource;
  setLight: (updates: Partial<LightSource>) => void;
  computeShadow: (element: ElementLighting) => ComputedShadow;
  computeNeumorphicShadow: (elevation: ElevationLevel) => ComputedShadow;
  computeGlassEffects: (color?: HSLColor) => ComputedGlass;
  computeColoredGlassShadow: (color: HSLColor, elevation?: ElevationLevel) => string;
  getGlassLayers: (color: HSLColor) => GlassLayers;
  cssVariables: Record<string, string>;
}

const LightingContext = createContext<LightingContextValue | null>(null);

interface LightingProviderProps {
  children: React.ReactNode;
  initialLight?: Partial<LightSource>;
  injectCSSVariables?: boolean;
}

// Glass textures (moved from Home.tsx)
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`;
const dotPattern = `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23000' fill-opacity='0.03'/%3E%3C/svg%3E")`;

export function LightingProvider({
  children,
  initialLight,
  injectCSSVariables = true
}: LightingProviderProps) {
  const engineRef = useRef<LightingEngine | null>(null);

  if (!engineRef.current) {
    engineRef.current = new LightingEngine(initialLight);
  }

  const engine = engineRef.current;
  const [light, setLightState] = useState<LightSource>(engine.getLight());

  const setLight = useCallback((updates: Partial<LightSource>) => {
    engine.setLight(updates);
    setLightState(engine.getLight());
  }, [engine]);

  const computeShadow = useCallback(
    (element: ElementLighting) => engine.computeShadow(element),
    [engine, light]
  );

  const computeNeumorphicShadow = useCallback(
    (elevation: ElevationLevel) => engine.computeNeumorphicShadow(elevation),
    [engine, light]
  );

  const computeGlassEffects = useCallback(
    (color?: HSLColor) => engine.computeGlassEffects(color),
    [engine, light]
  );

  const computeColoredGlassShadow = useCallback(
    (color: HSLColor, elevation?: ElevationLevel) =>
      engine.computeColoredGlassShadow(color, elevation),
    [engine, light]
  );

  // Generate complete glass layers for 5-layer system
  const getGlassLayers = useCallback(
    (color: HSLColor): GlassLayers => {
      const glassEffects = engine.computeGlassEffects(color);
      const shadow = engine.computeColoredGlassShadow(color, 4);

      return {
        container: {
          backdropFilter: 'blur(3px) saturate(140%)',
          WebkitBackdropFilter: 'blur(3px) saturate(140%)',
          borderRadius: '8px',
          border: `1px solid ${getTintColor(color, 0.35, 35)}`,
          boxShadow: shadow,
          position: 'relative' as const,
          overflow: 'hidden' as const,
          background: 'transparent'
        },
        base: {
          position: 'absolute' as const,
          inset: 0,
          background: getTintColor(color, 0.25, 15),
          borderRadius: 'inherit',
          pointerEvents: 'none' as const
        },
        gradient: {
          position: 'absolute' as const,
          inset: 0,
          background: `
            linear-gradient(
              125deg,
              ${getTintColor(color, 0.3, 30)} 0%,
              ${getTintColor(color, 0.1, 20)} 30%,
              ${getTintColor(color, 0.05, 15)} 50%,
              ${getTintColor(color, 0.12, 20)} 70%,
              ${getTintColor(color, 0.25, 25)} 100%
            )
          `,
          borderRadius: 'inherit',
          pointerEvents: 'none' as const
        },
        texture: {
          position: 'absolute' as const,
          inset: 0,
          background: `${grainTexture}, ${dotPattern}`,
          backgroundSize: '200px 200px, 4px 4px',
          opacity: 0.12,
          mixBlendMode: 'multiply' as const,
          pointerEvents: 'none' as const,
          borderRadius: 'inherit'
        },
        highlight: glassEffects.highlightCSS,
        innerGlow: glassEffects.innerGlowCSS
      };
    },
    [engine, light]
  );

  const cssVariables = useMemo(
    () => engine.generateCSSVariables(),
    [engine, light]
  );

  useEffect(() => {
    if (!injectCSSVariables) return;

    const root = document.documentElement;
    const previousValues: Record<string, string> = {};

    Object.entries(cssVariables).forEach(([key, value]) => {
      previousValues[key] = root.style.getPropertyValue(key);
      root.style.setProperty(key, value);
    });

    return () => {
      Object.entries(previousValues).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(key, value);
        } else {
          root.style.removeProperty(key);
        }
      });
    };
  }, [cssVariables, injectCSSVariables]);

  const contextValue: LightingContextValue = {
    light,
    setLight,
    computeShadow,
    computeNeumorphicShadow,
    computeGlassEffects,
    computeColoredGlassShadow,
    getGlassLayers,
    cssVariables
  };

  return (
    <LightingContext.Provider value={contextValue}>
      {children}
    </LightingContext.Provider>
  );
}

/**
 * Hook to access lighting engine
 */
export function useLighting(): LightingContextValue {
  const context = useContext(LightingContext);

  if (!context) {
    throw new Error('useLighting must be used within a LightingProvider');
  }

  return context;
}

/**
 * Hook to get shadow for specific elevation
 */
export function useShadow(
  elevation: ElevationLevel,
  options?: Omit<ElementLighting, 'elevation'>
) {
  const { computeShadow } = useLighting();
  return useMemo(
    () => computeShadow({ elevation, ...options }),
    [computeShadow, elevation, options]
  );
}

/**
 * Hook to get neumorphic shadow
 */
export function useNeumorphicShadow(elevation: ElevationLevel) {
  const { computeNeumorphicShadow } = useLighting();
  return useMemo(
    () => computeNeumorphicShadow(elevation),
    [computeNeumorphicShadow, elevation]
  );
}

/**
 * Hook to get glass layers for a color
 */
export function useGlassLayers(color: HSLColor): GlassLayers {
  const { getGlassLayers } = useLighting();
  return useMemo(
    () => getGlassLayers(color),
    [getGlassLayers, color]
  );
}
