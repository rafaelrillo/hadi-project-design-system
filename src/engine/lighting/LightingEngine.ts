// Path: src/engine/lighting/LightingEngine.ts

import type {
  LightSource,
  ElevationLevel,
  ElementLighting,
  ComputedShadow,
  ComputedGlass,
  ShadowLayer,
  HSLColor
} from './types';
import {
  calculateShadowOffset,
  calculateShadowBlur,
  calculateShadowOpacity,
  calculateShadowColor,
  calculateHighlightPosition,
  calculateNeumorphicShadows,
  generateLayeredShadows,
  getTintColor,
  layersToCSS,
  getLightColorCSS
} from './formulas';

/**
 * SENTINEL UNIFIED LIGHTING ENGINE
 *
 * A centralized engine that computes all lighting-related effects based on a
 * single light source configuration. Implements Josh Comeau's shadow principles.
 */
export class LightingEngine {
  private light: LightSource;
  private listeners: Set<() => void> = new Set();

  constructor(initialLight?: Partial<LightSource>) {
    this.light = {
      azimuth: 135,      // Default: top-left
      altitude: 45,      // Default: 45 degrees above horizon
      intensity: 1.0,    // Default: full intensity
      temperature: 5500, // Default: neutral daylight
      color: { h: 45, s: 20, l: 95 }, // Default: warm white
      ...initialLight
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // LIGHT SOURCE CONFIGURATION
  // ─────────────────────────────────────────────────────────────────────────────

  setLight(updates: Partial<LightSource>): void {
    this.light = { ...this.light, ...updates };
    this.notifyListeners();
  }

  getLight(): LightSource {
    return { ...this.light };
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SHADOW COMPUTATION
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Compute shadow for an element with given lighting properties
   */
  computeShadow(element: ElementLighting): ComputedShadow {
    const { elevation, color, isInset, blurMultiplier = 1 } = element;

    if (elevation === 0) {
      return { boxShadow: 'none', layers: [] };
    }

    if (isInset) {
      return this.computeInsetShadow(elevation, color, blurMultiplier);
    }

    const layers = generateLayeredShadows(
      this.light.azimuth,
      this.light.altitude,
      elevation,
      this.light.intensity,
      color
    );

    return {
      boxShadow: layersToCSS(layers),
      layers
    };
  }

  /**
   * Compute neumorphic (dual) shadow with light color
   */
  computeNeumorphicShadow(elevation: ElevationLevel): ComputedShadow {
    if (elevation === 0) {
      return { boxShadow: 'none', layers: [] };
    }

    const { light, dark } = calculateNeumorphicShadows(
      this.light.azimuth,
      this.light.altitude,
      elevation,
      this.light.intensity,
      this.light.color
    );

    const layers = [light, dark];

    return {
      boxShadow: layersToCSS(layers),
      layers
    };
  }

  /**
   * Compute inset (pressed) shadow with light color
   */
  private computeInsetShadow(
    elevation: number,
    color?: HSLColor,
    blurMultiplier: number = 1
  ): ComputedShadow {
    const offset = calculateShadowOffset(
      this.light.azimuth,
      this.light.altitude,
      elevation
    );
    const blur = calculateShadowBlur(elevation, blurMultiplier);
    const opacity = calculateShadowOpacity(elevation, this.light.intensity);

    // Light color for the inset highlight
    const lightColor = this.light.color;
    const hasLightColor = lightColor && lightColor.s > 5;

    const darkShadowColor = color
      ? calculateShadowColor(color, opacity, lightColor)
      : hasLightColor
        ? `hsla(${(lightColor.h + 180) % 360}, 15%, 45%, ${opacity})`
        : `rgba(163, 177, 198, ${opacity})`;

    const lightShadowColor = hasLightColor
      ? getLightColorCSS(lightColor, opacity * 0.8, 10)
      : `rgba(255, 255, 255, ${opacity * 0.8})`;

    const layers: ShadowLayer[] = [
      {
        offsetX: -offset.x,
        offsetY: -offset.y,
        blur: blur,
        spread: 0,
        color: darkShadowColor,
        inset: true
      },
      {
        offsetX: offset.x,
        offsetY: offset.y,
        blur: blur * 0.9,
        spread: 0,
        color: lightShadowColor,
        inset: true
      }
    ];

    return {
      boxShadow: layersToCSS(layers),
      layers
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GLASS EFFECTS
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Compute glass highlight and refraction effects with light color
   */
  computeGlassEffects(elementColor?: HSLColor): ComputedGlass {
    const highlightPos = calculateHighlightPosition(
      this.light.azimuth,
      this.light.altitude
    );

    const highlightOpacity = 0.3 + this.light.intensity * 0.4;
    const lightColor = this.light.color;
    const hasLightColor = lightColor && lightColor.s > 5;

    const azimuthRad = (this.light.azimuth * Math.PI) / 180;
    const refractionOffset = {
      x: Math.cos(azimuthRad) * 2,
      y: Math.sin(azimuthRad) * 2
    };

    // Highlight color: blend light color with element color or use light color alone
    let highlightColorCSS: string;
    if (elementColor && hasLightColor) {
      // Blend element color with light color for highlight
      const blendedH = (elementColor.h * 0.6 + lightColor.h * 0.4 + 360) % 360;
      const blendedS = Math.min(60, (elementColor.s + lightColor.s) * 0.5);
      highlightColorCSS = `hsla(${blendedH}, ${blendedS}%, 95%, ${highlightOpacity})`;
    } else if (hasLightColor) {
      highlightColorCSS = getLightColorCSS(lightColor, highlightOpacity, 20);
    } else if (elementColor) {
      highlightColorCSS = `hsla(${elementColor.h}, ${elementColor.s}%, 95%, ${highlightOpacity})`;
    } else {
      highlightColorCSS = `rgba(255, 255, 255, ${highlightOpacity})`;
    }

    const highlightCSS: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: `${Math.max(0, highlightPos.x - 40)}%`,
      right: `${Math.max(0, 100 - highlightPos.x - 40)}%`,
      height: '1px',
      background: `linear-gradient(90deg, transparent, ${highlightColorCSS}, transparent)`,
      pointerEvents: 'none'
    };

    // Inner glow: secondary refraction at bottom
    let innerGlowColorCSS: string;
    if (elementColor) {
      innerGlowColorCSS = getTintColor(elementColor, 0.5, 45);
    } else if (hasLightColor) {
      innerGlowColorCSS = getLightColorCSS(lightColor, highlightOpacity * 0.6, 30);
    } else {
      innerGlowColorCSS = `rgba(255, 255, 255, ${highlightOpacity * 0.6})`;
    }

    const innerGlowCSS: React.CSSProperties = {
      position: 'absolute',
      bottom: 0,
      left: `${Math.max(0, 100 - highlightPos.x - 35)}%`,
      right: `${Math.max(0, highlightPos.x - 35)}%`,
      height: '1px',
      background: `linear-gradient(90deg, transparent, ${innerGlowColorCSS}, transparent)`,
      pointerEvents: 'none'
    };

    return {
      highlightPosition: highlightPos,
      highlightOpacity,
      refractionOffset,
      highlightCSS,
      innerGlowCSS
    };
  }

  /**
   * Compute colored glass shadow (for the 5-layer system) with light color influence
   */
  computeColoredGlassShadow(
    color: HSLColor,
    elevation: ElevationLevel = 4
  ): string {
    const offset = calculateShadowOffset(
      this.light.azimuth,
      this.light.altitude,
      elevation
    );
    const blur = calculateShadowBlur(elevation);
    const opacity = calculateShadowOpacity(elevation, this.light.intensity);

    const shadowColor = calculateShadowColor(color, opacity, this.light.color);
    const ambientColor = calculateShadowColor(color, opacity * 0.5, this.light.color);

    return `
      ${offset.x.toFixed(1)}px ${offset.y.toFixed(1)}px ${blur.toFixed(1)}px ${shadowColor},
      0 ${(blur / 2).toFixed(1)}px ${blur.toFixed(1)}px ${ambientColor}
    `.trim();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // CSS VARIABLES GENERATION
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Generate CSS custom properties for the current light configuration
   */
  generateCSSVariables(): Record<string, string> {
    const vars: Record<string, string> = {};

    vars['--sentinel-light-azimuth'] = `${this.light.azimuth}deg`;
    vars['--sentinel-light-altitude'] = `${this.light.altitude}deg`;
    vars['--sentinel-light-intensity'] = `${this.light.intensity}`;
    vars['--sentinel-light-temperature'] = `${this.light.temperature}K`;

    const elevations: ElevationLevel[] = [1, 2, 4, 8, 16, 32];

    for (const elev of elevations) {
      const shadow = this.computeNeumorphicShadow(elev);
      vars[`--sentinel-shadow-${elev}`] = shadow.boxShadow;

      const insetShadow = this.computeShadow({ elevation: elev, isInset: true });
      vars[`--sentinel-shadow-inset-${elev}`] = insetShadow.boxShadow;
    }

    const highlight = this.computeGlassEffects();
    vars['--sentinel-highlight-x'] = `${highlight.highlightPosition.x}%`;
    vars['--sentinel-highlight-y'] = `${highlight.highlightPosition.y}%`;
    vars['--sentinel-highlight-opacity'] = `${highlight.highlightOpacity}`;

    return vars;
  }
}
