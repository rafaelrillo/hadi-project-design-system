// Path: src/pages/styles/TypographyShowcase.tsx
// FING Design System - Typography System Reference Guide
import React, { useState, useMemo } from 'react';

type TypographySection =
  | 'overview'
  | 'hierarchy'
  | 'combinations'
  | 'effects'
  | 'use-cases'
  | 'financial';

export function TypographyShowcase() {
  const [section, setSection] = useState<TypographySection>('overview');

  const sections: { id: TypographySection; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'hierarchy', label: 'Jerarquía' },
    { id: 'combinations', label: 'Combinaciones' },
    { id: 'effects', label: 'Efectos' },
    { id: 'use-cases', label: 'Casos de Uso' },
    { id: 'financial', label: 'Financiero' },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN TOKENS
  // ═══════════════════════════════════════════════════════════════════════════

  const MARBLE = {
    base: '#d5d8dc',
    light: '#e2e5e9',
    dark: '#c8ccd1',
    deeper: '#b8bcc2',
  };

  const FONTS = {
    display: "'Libre Baskerville', Georgia, serif",
    primary: "'IBM Plex Sans', -apple-system, sans-serif",
    mono: "'IBM Plex Mono', 'SF Mono', monospace",
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // TEXT EFFECTS - Sistema completo de efectos tipográficos
  // ═══════════════════════════════════════════════════════════════════════════

  const fx = useMemo(() => {
    // ─── LEGIBLE EFFECTS (Para contenido que necesita leerse) ───
    const title = (intensity: 'subtle' | 'medium' | 'strong' = 'medium'): React.CSSProperties => {
      const configs = {
        subtle: { highlight: 0.4, depth: 0.15 },
        medium: { highlight: 0.55, depth: 0.2 },
        strong: { highlight: 0.7, depth: 0.25 },
      };
      const { highlight, depth } = configs[intensity];
      return {
        color: '#3a4555',
        textShadow: `0px -1px 0px rgba(255, 255, 255, ${highlight}), 0px 1px 2px rgba(100, 110, 125, ${depth})`,
      };
    };

    const subtitle = (): React.CSSProperties => ({
      color: '#4a5568',
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.4), 0px 1px 1px rgba(100, 110, 125, 0.12)',
    });

    const body = (): React.CSSProperties => ({
      color: '#2d3748',
      textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.3)',
    });

    const caption = (): React.CSSProperties => ({
      color: '#5a6578',
      textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.35)',
    });

    const muted = (): React.CSSProperties => ({
      color: '#8896a6',
      textShadow: '0px -0.5px 0px rgba(255, 255, 255, 0.25)',
    });

    const inset = (intensity: 'subtle' | 'medium' = 'subtle'): React.CSSProperties => {
      const configs = {
        subtle: { light: 0.4, dark: 0.12 },
        medium: { light: 0.5, dark: 0.18 },
      };
      const { light, dark } = configs[intensity];
      return {
        color: '#4a5568',
        textShadow: `1px 1px 0px rgba(255, 255, 255, ${light}), -0.5px -0.5px 0px rgba(100, 110, 125, ${dark})`,
      };
    };

    // ─── COLORED LEGIBLE (Para datos con semántica) ───
    const teal = (): React.CSSProperties => ({
      color: '#3d7a7c',
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45)',
    });

    const positive = (): React.CSSProperties => ({
      color: '#3d7a5c',
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45)',
    });

    const negative = (): React.CSSProperties => ({
      color: '#8a4a4a',
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45)',
    });

    const warning = (): React.CSSProperties => ({
      color: '#8a7a3a',
      textShadow: '0px -1px 0px rgba(255, 255, 255, 0.45)',
    });

    // ─── DECORATIVE EFFECTS (Para elementos hero/decorativos) ───

    // EMBOSSED - Texto elevado/realzado (parece salir de la superficie)
    const embossed = (level: 1 | 2 | 3 | 4 | 5 = 3): React.CSSProperties => {
      const d = [0.5, 1, 1.5, 2, 3][level - 1];
      const b = level > 2 ? 1 : 0;
      return {
        color: MARBLE.base,
        textShadow: `${-d}px ${-d}px ${b}px rgba(255, 255, 255, 0.95), ${d}px ${d}px ${b}px rgba(147, 157, 170, 0.55)`,
      };
    };

    // DEBOSSED - Texto hundido/presionado (parece estar presionado en la superficie)
    const debossed = (level: 1 | 2 | 3 | 4 | 5 = 3): React.CSSProperties => {
      const d = [0.5, 1, 1.5, 2, 3][level - 1];
      const b = level > 2 ? 1 : 0;
      return {
        color: MARBLE.dark,
        textShadow: `${d}px ${d}px ${b}px rgba(255, 255, 255, 0.85), ${-d}px ${-d}px ${b}px rgba(147, 157, 170, 0.4)`,
      };
    };

    // LETTERPRESS - Efecto de imprenta clásica (raised/elevated)
    const letterpress = (intensity: 'soft' | 'medium' | 'deep' | 'stamped' = 'medium'): React.CSSProperties => {
      const configs = {
        soft: { d: 1, b: 0, o: 0.6 },
        medium: { d: 1.5, b: 1, o: 0.7 },
        deep: { d: 2, b: 1, o: 0.8 },
        stamped: { d: 2.5, b: 2, o: 0.9 },
      };
      const { d, b, o } = configs[intensity];
      return {
        color: MARBLE.base,
        textShadow: `${d}px ${d}px ${b}px rgba(255, 255, 255, ${o}), ${-d}px ${-d}px ${b}px rgba(130, 140, 155, ${o})`,
      };
    };

    // LETTERPRESS INSET - Letterpress pero hundido (inset)
    const letterpressInset = (intensity: 'whisper' | 'subtle' | 'soft' | 'medium' = 'subtle'): React.CSSProperties => {
      const configs = {
        whisper: { d: 0.3, b: 0, light: 0.5, dark: 0.25 },
        subtle: { d: 0.5, b: 0, light: 0.6, dark: 0.3 },
        soft: { d: 0.75, b: 0, light: 0.7, dark: 0.35 },
        medium: { d: 1, b: 1, light: 0.8, dark: 0.4 },
      };
      const { d, b, light, dark } = configs[intensity];
      return {
        color: MARBLE.dark,
        textShadow: `${d}px ${d}px ${b}px rgba(255, 255, 255, ${light}), ${-d}px ${-d}px ${b}px rgba(130, 140, 155, ${dark})`,
      };
    };

    // LETTERPRESS COLORED - Letterpress con color
    const letterpressColored = (hue: 'teal' | 'positive' | 'negative' | 'warning' = 'teal'): React.CSSProperties => {
      const colors = {
        teal: { color: '#3a6a72', shadow: 'rgba(58, 106, 114, 0.45)' },
        positive: { color: '#4a7a6a', shadow: 'rgba(74, 154, 124, 0.45)' },
        negative: { color: '#9a5a5a', shadow: 'rgba(154, 90, 90, 0.45)' },
        warning: { color: '#9a8a4a', shadow: 'rgba(154, 138, 74, 0.45)' },
      };
      const { color, shadow } = colors[hue];
      return {
        color,
        textShadow: `1px 1px 1px rgba(255, 255, 255, 0.7), -1px -1px 1px ${shadow}`,
      };
    };

    // LETTERPRESS COLORED INSET - Letterpress hundido con color
    const letterpressColoredInset = (hue: 'teal' | 'positive' | 'negative' = 'teal'): React.CSSProperties => {
      const colors = {
        teal: { color: '#5ba3a5', shadow: 'rgba(58, 106, 114, 0.35)' },
        positive: { color: '#5a9a7c', shadow: 'rgba(74, 154, 124, 0.35)' },
        negative: { color: '#b87070', shadow: 'rgba(184, 92, 92, 0.35)' },
      };
      const { color, shadow } = colors[hue];
      return {
        color,
        textShadow: `0.5px 0.5px 0px rgba(255, 255, 255, 0.6), -0.5px -0.5px 0px ${shadow}`,
      };
    };

    // ENGRAVED - Grabado fino (efecto de incisión delicada)
    const engraved = (intensity: 'whisper' | 'subtle' | 'visible' | 'deep' = 'subtle'): React.CSSProperties => {
      const configs = {
        whisper: { d: 0.3, light: 0.4, dark: 0.25 },
        subtle: { d: 0.5, light: 0.5, dark: 0.35 },
        visible: { d: 0.75, light: 0.7, dark: 0.5 },
        deep: { d: 1, light: 0.85, dark: 0.6 },
      };
      const { d, light, dark } = configs[intensity];
      return {
        color: MARBLE.dark,
        textShadow: `${d}px ${d}px 0px rgba(255, 255, 255, ${light}), ${-d}px ${-d}px 0px rgba(130, 140, 155, ${dark})`,
      };
    };

    // ENGRAVED COLORED - Grabado con color (para títulos con acento)
    const engravedColored = (hue: 'teal' | 'positive' | 'negative' | 'warning' = 'teal'): React.CSSProperties => {
      const colors = {
        teal: { color: '#5ba3a5', shadow: 'rgba(58, 106, 114, 0.35)' },
        positive: { color: '#5a9a7c', shadow: 'rgba(74, 154, 124, 0.35)' },
        negative: { color: '#b87070', shadow: 'rgba(184, 92, 92, 0.35)' },
        warning: { color: '#c4a35a', shadow: 'rgba(196, 163, 90, 0.35)' },
      };
      const { color, shadow } = colors[hue];
      return {
        color,
        textShadow: `0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px ${shadow}`,
      };
    };

    // LONG SHADOW - Sombra larga dramática (para hero sections)
    const longShadow = (
      length: 'short' | 'medium' | 'long' | 'dramatic' = 'medium',
      direction: 'se' | 'sw' | 'ne' | 'nw' = 'se'
    ): React.CSSProperties => {
      const lengths = { short: 3, medium: 6, long: 10, dramatic: 15 };
      const dirs = {
        se: { x: 1, y: 1 },
        sw: { x: -1, y: 1 },
        ne: { x: 1, y: -1 },
        nw: { x: -1, y: -1 },
      };
      const count = lengths[length];
      const { x, y } = dirs[direction];
      const shadows = [];
      for (let i = 1; i <= count; i++) {
        const opacity = 0.15 - (i * (0.15 / count));
        shadows.push(`${x * i}px ${y * i}px 0px rgba(120, 130, 145, ${Math.max(0.02, opacity)})`);
      }
      return {
        color: MARBLE.light,
        textShadow: shadows.join(', '),
      };
    };

    // BEVELED - Efecto biselado 3D
    const beveled = (intensity: 'soft' | 'medium' | 'sharp' = 'medium'): React.CSSProperties => {
      const configs = {
        soft: { d: 1, blur: 1, light: 0.6, dark: 0.25 },
        medium: { d: 1.5, blur: 0, light: 0.85, dark: 0.4 },
        sharp: { d: 2, blur: 0, light: 0.95, dark: 0.55 },
      };
      const { d, blur, light, dark } = configs[intensity];
      return {
        color: MARBLE.base,
        textShadow: `
          ${-d}px ${-d}px ${blur}px rgba(255, 255, 255, ${light}),
          ${d}px ${d}px ${blur}px rgba(140, 150, 165, ${dark}),
          0px ${-d * 0.5}px ${blur}px rgba(255, 255, 255, ${light * 0.5}),
          0px ${d * 0.5}px ${blur}px rgba(140, 150, 165, ${dark * 0.5})
        `.trim().replace(/\s+/g, ' '),
      };
    };

    // CARVED DEEP - Tallado profundo (para elementos muy decorativos)
    const carvedDeep = (): React.CSSProperties => ({
      color: MARBLE.deeper,
      textShadow: `
        inset 1px 1px 1px rgba(255, 255, 255, 0.5),
        1.5px 1.5px 0px rgba(255, 255, 255, 0.9),
        -1px -1px 1px rgba(130, 140, 155, 0.5)
      `.trim().replace(/\s+/g, ' '),
    });

    // PILLOW - Efecto almohada (soft 3D)
    const pillow = (): React.CSSProperties => ({
      color: MARBLE.base,
      textShadow: `
        -1px -1px 1px rgba(255, 255, 255, 0.8),
        1px 1px 1px rgba(140, 150, 165, 0.4),
        -2px -2px 3px rgba(255, 255, 255, 0.4),
        2px 2px 3px rgba(140, 150, 165, 0.2)
      `.trim().replace(/\s+/g, ' '),
    });

    // CHISELED - Efecto cincelado con bordes duros (como tallado en piedra)
    const chiseled = (intensity: 'light' | 'medium' | 'deep' = 'medium'): React.CSSProperties => {
      const configs = {
        light: { d: 0.5, light: 0.7, dark: 0.35 },
        medium: { d: 1, light: 0.85, dark: 0.45 },
        deep: { d: 1.5, light: 0.95, dark: 0.55 },
      };
      const { d, light, dark } = configs[intensity];
      return {
        color: MARBLE.base,
        textShadow: `
          ${d}px ${d}px 0px rgba(255, 255, 255, ${light}),
          ${-d}px ${-d}px 0px rgba(130, 140, 155, ${dark}),
          ${d * 0.5}px ${d * 0.5}px 0px rgba(255, 255, 255, ${light * 0.5})
        `.trim().replace(/\s+/g, ' '),
      };
    };

    // SOFT RELIEF - Relieve suave y delicado (menos pronunciado que embossed)
    const softRelief = (intensity: 'whisper' | 'subtle' | 'gentle' = 'subtle'): React.CSSProperties => {
      const configs = {
        whisper: { d: 0.3, blur: 1, light: 0.6, dark: 0.2 },
        subtle: { d: 0.5, blur: 2, light: 0.7, dark: 0.3 },
        gentle: { d: 0.75, blur: 3, light: 0.8, dark: 0.35 },
      };
      const { d, blur, light, dark } = configs[intensity];
      return {
        color: MARBLE.base,
        textShadow: `
          ${-d}px ${-d}px ${blur}px rgba(255, 255, 255, ${light}),
          ${d}px ${d}px ${blur}px rgba(147, 157, 170, ${dark})
        `.trim().replace(/\s+/g, ' '),
      };
    };

    // COLORED DEBOSSED - Hundido con color (para títulos de secciones con énfasis)
    const coloredDebossed = (hue: 'teal' | 'positive' | 'negative' | 'warning' | 'neutral' = 'teal'): React.CSSProperties => {
      const colors = {
        teal: { color: '#5ba3a5', shadow: 'rgba(58, 106, 114, 0.4)' },
        positive: { color: '#5a9a7c', shadow: 'rgba(74, 154, 124, 0.4)' },
        negative: { color: '#b87070', shadow: 'rgba(184, 92, 92, 0.4)' },
        warning: { color: '#c4a35a', shadow: 'rgba(196, 163, 90, 0.4)' },
        neutral: { color: MARBLE.dark, shadow: 'rgba(147, 157, 170, 0.4)' },
      };
      const { color, shadow } = colors[hue];
      return {
        color,
        textShadow: `1px 1px 0px rgba(255, 255, 255, 0.75), -0.5px -0.5px 1px ${shadow}`,
      };
    };

    // STAMPED - Efecto de sello/estampado (como si se hubiera presionado con fuerza)
    const stamped = (depth: 'light' | 'medium' | 'heavy' = 'medium'): React.CSSProperties => {
      const configs = {
        light: { d: 1, blur: 0, darkVal: 0.35 },
        medium: { d: 1.5, blur: 0, darkVal: 0.45 },
        heavy: { d: 2, blur: 1, darkVal: 0.55 },
      };
      const { d, blur, darkVal } = configs[depth];
      return {
        color: MARBLE.deeper,
        textShadow: `
          ${d}px ${d}px ${blur}px rgba(255, 255, 255, 0.9),
          ${-d * 0.5}px ${-d * 0.5}px ${blur}px rgba(130, 140, 155, ${darkVal})
        `.trim().replace(/\s+/g, ' '),
      };
    };

    // INTAGLIO - Efecto de grabado profundo (como una moneda o medalla)
    const intaglio = (): React.CSSProperties => ({
      color: MARBLE.deeper,
      textShadow: `
        1px 1px 0px rgba(255, 255, 255, 0.85),
        2px 2px 0px rgba(255, 255, 255, 0.5),
        -1px -1px 1px rgba(130, 140, 155, 0.5),
        0px 2px 2px rgba(130, 140, 155, 0.2)
      `.trim().replace(/\s+/g, ' '),
    });

    // PRESSED - Efecto de presión (como un botón presionado)
    const pressed = (intensity: 'light' | 'medium' | 'deep' = 'medium'): React.CSSProperties => {
      const configs = {
        light: { d: 0.5, inner: 0.15, outer: 0.4 },
        medium: { d: 1, inner: 0.2, outer: 0.5 },
        deep: { d: 1.5, inner: 0.25, outer: 0.6 },
      };
      const { d, inner, outer } = configs[intensity];
      return {
        color: MARBLE.dark,
        textShadow: `
          ${d}px ${d}px 0px rgba(255, 255, 255, ${outer}),
          ${-d * 0.5}px ${-d * 0.5}px 0px rgba(147, 157, 170, ${inner})
        `.trim().replace(/\s+/g, ' '),
      };
    };

    // EXTRUDED - Efecto extruido 3D (múltiples capas de profundidad)
    const extruded = (layers: 2 | 3 | 4 | 5 = 3): React.CSSProperties => {
      const shadows = [];
      for (let i = 1; i <= layers; i++) {
        const opacity = 0.4 - (i * 0.08);
        shadows.push(`${i}px ${i}px 0px rgba(140, 150, 165, ${opacity})`);
      }
      return {
        color: MARBLE.light,
        textShadow: shadows.join(', '),
      };
    };

    // OUTLINE GLOW - Contorno con resplandor sutil
    const outlineGlow = (hue: 'teal' | 'positive' | 'negative' | 'warning' | 'white' = 'white'): React.CSSProperties => {
      const glowColors = {
        teal: 'rgba(58, 106, 114, 0.4)',
        positive: 'rgba(74, 154, 124, 0.4)',
        negative: 'rgba(184, 92, 92, 0.4)',
        warning: 'rgba(196, 163, 90, 0.4)',
        white: 'rgba(255, 255, 255, 0.6)',
      };
      return {
        color: MARBLE.base,
        textShadow: `
          0 0 1px ${glowColors[hue]},
          0 0 2px ${glowColors[hue]},
          -1px -1px 0px rgba(255, 255, 255, 0.8),
          1px 1px 0px rgba(140, 150, 165, 0.3)
        `.trim().replace(/\s+/g, ' '),
      };
    };

    // VINTAGE - Efecto desgastado/antiguo
    const vintage = (): React.CSSProperties => ({
      color: '#a8a0a0',
      textShadow: `
        1px 1px 0px rgba(255, 255, 255, 0.5),
        -1px -1px 0px rgba(120, 110, 110, 0.3),
        2px 2px 3px rgba(100, 90, 90, 0.15)
      `.trim().replace(/\s+/g, ' '),
    });

    // CRISP - Bordes nítidos y definidos (minimalista)
    const crisp = (): React.CSSProperties => ({
      color: MARBLE.dark,
      textShadow: `
        0.5px 0.5px 0px rgba(255, 255, 255, 0.9),
        -0.5px -0.5px 0px rgba(130, 140, 155, 0.25)
      `.trim().replace(/\s+/g, ' '),
    });

    // COLORED EMBOSSED - Embossed con color (para logos y branding)
    const coloredEmbossed = (hue: 'teal' | 'positive' | 'negative' | 'warning' = 'teal'): React.CSSProperties => {
      const colors = {
        teal: { color: '#3a6a72', light: 'rgba(120, 200, 202, 0.7)', dark: 'rgba(50, 120, 122, 0.5)' },
        positive: { color: '#4a7a6a', light: 'rgba(120, 200, 160, 0.7)', dark: 'rgba(50, 120, 100, 0.5)' },
        negative: { color: '#9a5a5a', light: 'rgba(200, 140, 140, 0.7)', dark: 'rgba(120, 70, 70, 0.5)' },
        warning: { color: '#9a8a4a', light: 'rgba(200, 180, 120, 0.7)', dark: 'rgba(120, 100, 50, 0.5)' },
      };
      const { color, light, dark } = colors[hue];
      return {
        color,
        textShadow: `-1.5px -1.5px 1px ${light}, 1.5px 1.5px 1px ${dark}`,
      };
    };

    // SUNKEN - Efecto muy hundido (como grabado en metal)
    const sunken = (depth: 'shallow' | 'medium' | 'deep' = 'medium'): React.CSSProperties => {
      const configs = {
        shallow: { d: 0.5, light: 0.7, dark: 0.25 },
        medium: { d: 1, light: 0.85, dark: 0.35 },
        deep: { d: 1.5, light: 0.95, dark: 0.45 },
      };
      const { d, light, dark } = configs[depth];
      return {
        color: MARBLE.deeper,
        textShadow: `
          ${d}px ${d}px 0px rgba(255, 255, 255, ${light}),
          ${-d * 0.5}px ${-d * 0.5}px 0px rgba(130, 140, 155, ${dark}),
          ${d * 0.5}px ${d * 0.5}px 1px rgba(255, 255, 255, ${light * 0.5})
        `.trim().replace(/\s+/g, ' '),
      };
    };

    // RAISED - Efecto elevado simple (versión más limpia de embossed)
    const raised = (level: 'subtle' | 'medium' | 'strong' = 'medium'): React.CSSProperties => {
      const configs = {
        subtle: { d: 0.5, light: 0.7, dark: 0.3 },
        medium: { d: 1, light: 0.85, dark: 0.4 },
        strong: { d: 1.5, light: 0.95, dark: 0.5 },
      };
      const { d, light, dark } = configs[level];
      return {
        color: MARBLE.base,
        textShadow: `${-d}px ${-d}px 0px rgba(255, 255, 255, ${light}), ${d}px ${d}px 0px rgba(140, 150, 165, ${dark})`,
      };
    };

    // GHOST - Efecto fantasma (muy sutil, apenas visible)
    const ghost = (): React.CSSProperties => ({
      color: MARBLE.dark,
      textShadow: `
        0.25px 0.25px 0px rgba(255, 255, 255, 0.5),
        -0.25px -0.25px 0px rgba(130, 140, 155, 0.15)
      `.trim().replace(/\s+/g, ' '),
    });

    // DOUBLE - Efecto de doble sombra (para énfasis)
    const double = (): React.CSSProperties => ({
      color: MARBLE.base,
      textShadow: `
        -1px -1px 0px rgba(255, 255, 255, 0.9),
        1px 1px 0px rgba(140, 150, 165, 0.5),
        -2px -2px 0px rgba(255, 255, 255, 0.5),
        2px 2px 0px rgba(140, 150, 165, 0.25)
      `.trim().replace(/\s+/g, ' '),
    });

    // CARVED LIGHT - Tallado ligero (más sutil que carvedDeep)
    const carvedLight = (): React.CSSProperties => ({
      color: MARBLE.dark,
      textShadow: `
        0.75px 0.75px 0px rgba(255, 255, 255, 0.8),
        -0.5px -0.5px 0px rgba(130, 140, 155, 0.35)
      `.trim().replace(/\s+/g, ' '),
    });

    // FROSTED - Efecto esmerilado (como vidrio esmerilado)
    const frosted = (): React.CSSProperties => ({
      color: 'rgba(213, 216, 220, 0.8)',
      textShadow: `
        0 0 2px rgba(255, 255, 255, 0.6),
        -1px -1px 1px rgba(255, 255, 255, 0.4),
        1px 1px 1px rgba(140, 150, 165, 0.3)
      `.trim().replace(/\s+/g, ' '),
    });

    // METALLIC - Efecto metálico (como grabado en metal)
    const metallic = (tone: 'silver' | 'gold' | 'bronze' = 'silver'): React.CSSProperties => {
      const tones = {
        silver: { base: '#b8bcc2', light: 'rgba(220, 225, 230, 0.9)', dark: 'rgba(130, 140, 155, 0.6)' },
        gold: { base: '#c4a860', light: 'rgba(230, 210, 150, 0.9)', dark: 'rgba(140, 120, 60, 0.6)' },
        bronze: { base: '#a08060', light: 'rgba(200, 170, 140, 0.9)', dark: 'rgba(100, 80, 50, 0.6)' },
      };
      const { base, light, dark } = tones[tone];
      return {
        color: base,
        textShadow: `-1px -1px 0px ${light}, 1px 1px 0px ${dark}, 0px -0.5px 0px ${light}`,
      };
    };

    // NEON - Efecto neón (resplandor suave)
    const neon = (hue: 'teal' | 'positive' | 'negative' | 'warning' = 'teal'): React.CSSProperties => {
      const glows = {
        teal: { color: '#3a6a72', glow: 'rgba(58, 106, 114, 0.6)' },
        positive: { color: '#4a7a6a', glow: 'rgba(74, 154, 124, 0.6)' },
        negative: { color: '#b85c5c', glow: 'rgba(184, 92, 92, 0.6)' },
        warning: { color: '#c4a35a', glow: 'rgba(196, 163, 90, 0.6)' },
      };
      const { color, glow } = glows[hue];
      return {
        color,
        textShadow: `0 0 4px ${glow}, 0 0 8px ${glow}, 0 0 12px ${glow}`,
      };
    };

    // RETRO - Efecto retro (offset shadow)
    const retro = (offset: 'small' | 'medium' | 'large' = 'medium'): React.CSSProperties => {
      const offsets = { small: 2, medium: 3, large: 5 };
      const d = offsets[offset];
      return {
        color: MARBLE.light,
        textShadow: `${d}px ${d}px 0px rgba(100, 110, 125, 0.5)`,
      };
    };

    return {
      // Legible
      title, subtitle, body, caption, muted, inset,
      // Colored Legible
      teal, positive, negative, warning,
      // Decorative - Neumorphic Classic
      embossed, debossed, raised, sunken,
      letterpress, letterpressInset, letterpressColored, letterpressColoredInset,
      engraved, engravedColored,
      // Decorative - Shadows & Depth
      longShadow, beveled, carvedDeep, carvedLight, pillow,
      // Decorative - Textured
      chiseled, softRelief, coloredDebossed, coloredEmbossed, stamped,
      intaglio, pressed, extruded,
      // Decorative - Special FX
      outlineGlow, vintage, crisp, ghost, double, frosted,
      metallic, neon, retro,
    };
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // SHARED STYLES
  // ═══════════════════════════════════════════════════════════════════════════

  const page: React.CSSProperties = {
    minHeight: '100vh',
    background: MARBLE.base,
    padding: '40px',
    fontFamily: FONTS.primary,
  };

  const header: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '40px',
  };

  const nav: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '40px',
    background: MARBLE.base,
    padding: '6px',
    borderRadius: '16px',
    boxShadow: 'var(--inset-2)',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const navBtn = (active: boolean): React.CSSProperties => ({
    padding: '12px 20px',
    border: 'none',
    borderRadius: '10px',
    fontFamily: FONTS.primary,
    fontSize: '13px',
    fontWeight: active ? 600 : 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: active ? MARBLE.base : 'transparent',
    boxShadow: active ? 'var(--raised-2)' : 'none',
    ...(active ? fx.title('medium') : fx.caption()),
  });

  const card: React.CSSProperties = {
    background: MARBLE.base,
    borderRadius: '24px',
    boxShadow: 'var(--raised-3)',
    padding: '32px',
    marginBottom: '24px',
  };

  const cardTitle: React.CSSProperties = {
    ...fx.title('strong'),
    fontFamily: FONTS.primary,
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${MARBLE.dark}`,
  };

  const insetBox: React.CSSProperties = {
    background: MARBLE.base,
    borderRadius: '16px',
    boxShadow: 'var(--inset-2)',
    padding: '24px',
  };

  const glassBox: React.CSSProperties = {
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: '12px',
    padding: '20px',
  };

  const grid = (cols: number, gap = 16): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: `${gap}px`,
  });

  const label: React.CSSProperties = {
    ...fx.muted(),
    fontFamily: FONTS.mono,
    fontSize: '10px',
    letterSpacing: '0.05em',
    marginTop: '12px',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div style={page}>
      {/* Header */}
      <header style={header}>
        <h1 style={{
          ...fx.embossed(5),
          fontFamily: FONTS.display,
          fontSize: '42px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          Typography System
        </h1>
        <p style={{
          ...fx.caption(),
          fontSize: '15px',
          marginTop: '12px',
        }}>
          FING Design System - Guía de Referencia Tipográfica
        </p>
      </header>

      {/* Navigation */}
      <nav style={nav}>
        {sections.map(s => (
          <button key={s.id} style={navBtn(section === s.id)} onClick={() => setSection(s.id)}>
            {s.label}
          </button>
        ))}
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          OVERVIEW - Las 3 familias tipográficas
          ═══════════════════════════════════════════════════════════════════════ */}
      {section === 'overview' && (
        <>
          {/* Intro */}
          <section style={card}>
            <div style={cardTitle}>Sistema Tipográfico</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
                FING utiliza un sistema de <strong>tres familias tipográficas</strong> cuidadosamente
                seleccionadas para crear una jerarquía visual clara y profesional. Cada familia tiene un
                propósito específico que refuerza la identidad de marca y optimiza la legibilidad de
                datos financieros.
              </p>
            </div>
          </section>

          {/* Display Font */}
          <section style={card}>
            <div style={cardTitle}>Display — Libre Baskerville</div>
            <div style={{ ...insetBox, marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    ...fx.title('strong'),
                    fontFamily: FONTS.display,
                    fontSize: '64px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}>
                    Aa
                  </div>
                  <div style={{
                    ...fx.muted(),
                    fontFamily: FONTS.mono,
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                  }}>
                    --fing-font-display
                  </div>
                </div>
                <div style={{ flex: 2 }}>
                  <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                    <strong>Propósito:</strong> Elegancia institucional. Reservada para títulos principales,
                    headlines y elementos de marca que requieren presencia y autoridad.
                  </p>
                  <p style={{ ...fx.caption(), fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                    Serif clásica con raíces en la tradición tipográfica. Transmite confianza, estabilidad
                    y profesionalismo — valores esenciales para una plataforma de inversiones.
                  </p>
                </div>
              </div>
            </div>
            <div style={grid(3)}>
              <div style={glassBox}>
                <div style={{
                  ...fx.title('strong'),
                  fontFamily: FONTS.display,
                  fontSize: '28px',
                  fontWeight: 700,
                }}>
                  FING
                </div>
                <div style={label}>Brand / Logo</div>
              </div>
              <div style={glassBox}>
                <div style={{
                  ...fx.title('medium'),
                  fontFamily: FONTS.display,
                  fontSize: '24px',
                  fontWeight: 700,
                  fontStyle: 'italic',
                }}>
                  Market Analysis
                </div>
                <div style={label}>Page Title</div>
              </div>
              <div style={glassBox}>
                <div style={{
                  ...fx.subtitle(),
                  fontFamily: FONTS.display,
                  fontSize: '18px',
                  fontWeight: 400,
                }}>
                  Premium Intelligence
                </div>
                <div style={label}>Tagline</div>
              </div>
            </div>
          </section>

          {/* Primary Font */}
          <section style={card}>
            <div style={cardTitle}>Primary — IBM Plex Sans</div>
            <div style={{ ...insetBox, marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    ...fx.title('strong'),
                    fontFamily: FONTS.primary,
                    fontSize: '64px',
                    fontWeight: 600,
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}>
                    Aa
                  </div>
                  <div style={{
                    ...fx.muted(),
                    fontFamily: FONTS.mono,
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                  }}>
                    --fing-font-primary
                  </div>
                </div>
                <div style={{ flex: 2 }}>
                  <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                    <strong>Propósito:</strong> Claridad funcional. La fuente de trabajo para toda la interfaz:
                    navegación, botones, labels, cuerpo de texto y elementos interactivos.
                  </p>
                  <p style={{ ...fx.caption(), fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                    Sans-serif humanista con excelente legibilidad en pantalla. Diseñada por IBM para
                    interfaces digitales, ofrece claridad en todos los tamaños y pesos.
                  </p>
                </div>
              </div>
            </div>
            <div style={grid(4)}>
              <div style={glassBox}>
                <div style={{
                  ...fx.inset('medium'),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  Section Title
                </div>
                <div style={label}>Uppercase Label</div>
              </div>
              <div style={glassBox}>
                <div style={{
                  ...fx.subtitle(),
                  fontFamily: FONTS.primary,
                  fontSize: '16px',
                  fontWeight: 600,
                }}>
                  Card Header
                </div>
                <div style={label}>Heading</div>
              </div>
              <div style={glassBox}>
                <div style={{
                  ...fx.body(),
                  fontFamily: FONTS.primary,
                  fontSize: '14px',
                  fontWeight: 400,
                }}>
                  Body text content
                </div>
                <div style={label}>Paragraph</div>
              </div>
              <div style={glassBox}>
                <div style={{
                  ...fx.caption(),
                  fontFamily: FONTS.primary,
                  fontSize: '12px',
                  fontWeight: 500,
                }}>
                  View Details
                </div>
                <div style={label}>Button / Link</div>
              </div>
            </div>
          </section>

          {/* Mono Font */}
          <section style={card}>
            <div style={cardTitle}>Mono — IBM Plex Mono</div>
            <div style={{ ...insetBox, marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    ...fx.title('strong'),
                    fontFamily: FONTS.mono,
                    fontSize: '64px',
                    fontWeight: 600,
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}>
                    09
                  </div>
                  <div style={{
                    ...fx.muted(),
                    fontFamily: FONTS.mono,
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                  }}>
                    --fing-font-mono
                  </div>
                </div>
                <div style={{ flex: 2 }}>
                  <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                    <strong>Propósito:</strong> Precisión numérica. Exclusiva para datos financieros,
                    tickers, porcentajes, código y cualquier valor que requiera alineación tabular.
                  </p>
                  <p style={{ ...fx.caption(), fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                    Monoespaciada para alineación perfecta de columnas numéricas. Los caracteres de
                    igual ancho facilitan la comparación visual de valores financieros.
                  </p>
                </div>
              </div>
            </div>
            <div style={grid(4)}>
              <div style={glassBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.mono,
                  fontSize: '18px',
                  fontWeight: 600,
                }}>
                  $AAPL
                </div>
                <div style={label}>Ticker</div>
              </div>
              <div style={glassBox}>
                <div style={{
                  ...fx.title('medium'),
                  fontFamily: FONTS.mono,
                  fontSize: '18px',
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  $1,234.56
                </div>
                <div style={label}>Price</div>
              </div>
              <div style={glassBox}>
                <div style={{
                  ...fx.positive(),
                  fontFamily: FONTS.mono,
                  fontSize: '18px',
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  +12.45%
                </div>
                <div style={label}>Positive Change</div>
              </div>
              <div style={glassBox}>
                <div style={{
                  ...fx.negative(),
                  fontFamily: FONTS.mono,
                  fontSize: '18px',
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  -3.21%
                </div>
                <div style={label}>Negative Change</div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          HIERARCHY - Escala tipográfica completa
          ═══════════════════════════════════════════════════════════════════════ */}
      {section === 'hierarchy' && (
        <>
          {/* Type Scale */}
          <section style={card}>
            <div style={cardTitle}>Escala Tipográfica</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Hero', size: '48px', weight: 700, font: 'display', sample: 'FING' },
                { name: 'H1', size: '36px', weight: 700, font: 'display', sample: 'Page Title' },
                { name: 'H2', size: '28px', weight: 700, font: 'display', sample: 'Section Header' },
                { name: 'H3', size: '22px', weight: 600, font: 'primary', sample: 'Card Title' },
                { name: 'H4', size: '18px', weight: 600, font: 'primary', sample: 'Subsection' },
                { name: 'H5', size: '16px', weight: 600, font: 'primary', sample: 'Group Header' },
                { name: 'Body LG', size: '16px', weight: 400, font: 'primary', sample: 'Large body text for important content' },
                { name: 'Body', size: '14px', weight: 400, font: 'primary', sample: 'Default body text for reading and descriptions' },
                { name: 'Body SM', size: '13px', weight: 400, font: 'primary', sample: 'Secondary text and supporting information' },
                { name: 'Caption', size: '12px', weight: 500, font: 'primary', sample: 'Labels, metadata, and timestamps' },
                { name: 'Overline', size: '11px', weight: 600, font: 'primary', sample: 'SECTION LABEL', transform: 'uppercase', spacing: '0.12em' },
              ].map((item, i) => (
                <div key={item.name} style={{
                  ...insetBox,
                  display: 'grid',
                  gridTemplateColumns: '80px 70px 1fr',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '16px 24px',
                }}>
                  <div style={{
                    ...fx.title('medium'),
                    fontFamily: FONTS.primary,
                    fontSize: '13px',
                    fontWeight: 600,
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    padding: '4px 10px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '100px',
                    textAlign: 'center',
                  }}>
                    <code style={{
                      fontFamily: FONTS.mono,
                      fontSize: '10px',
                      ...fx.teal(),
                    }}>
                      {item.size}
                    </code>
                  </div>
                  <div style={{
                    ...(i < 6 ? fx.title(i < 3 ? 'strong' : 'medium') : i < 9 ? fx.body() : fx.caption()),
                    fontFamily: item.font === 'display' ? FONTS.display : FONTS.primary,
                    fontSize: item.size,
                    fontWeight: item.weight,
                    textTransform: (item.transform as 'uppercase') || 'none',
                    letterSpacing: item.spacing || 'normal',
                  }}>
                    {item.sample}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Font Weights */}
          <section style={card}>
            <div style={cardTitle}>Pesos Tipográficos</div>
            <div style={grid(5)}>
              {[
                { weight: 400, name: 'Regular', use: 'Body text' },
                { weight: 500, name: 'Medium', use: 'Labels, buttons' },
                { weight: 600, name: 'Semibold', use: 'Headings, emphasis' },
                { weight: 700, name: 'Bold', use: 'Titles, brand' },
              ].map(item => (
                <div key={item.weight} style={{ ...insetBox, textAlign: 'center' }}>
                  <div style={{
                    ...fx.title('medium'),
                    fontFamily: FONTS.primary,
                    fontSize: '36px',
                    fontWeight: item.weight,
                    marginBottom: '8px',
                  }}>
                    Aa
                  </div>
                  <div style={{
                    ...fx.subtitle(),
                    fontFamily: FONTS.primary,
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    ...fx.muted(),
                    fontFamily: FONTS.mono,
                    fontSize: '11px',
                  }}>
                    {item.weight}
                  </div>
                  <div style={{
                    ...fx.caption(),
                    fontSize: '11px',
                    marginTop: '8px',
                  }}>
                    {item.use}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Line Heights */}
          <section style={card}>
            <div style={cardTitle}>Interlineado (Line Height)</div>
            <div style={grid(3, 24)}>
              {[
                { value: 1, name: 'Tight', use: 'Headlines, números grandes' },
                { value: 1.4, name: 'Normal', use: 'UI text, labels' },
                { value: 1.7, name: 'Relaxed', use: 'Párrafos, lectura' },
              ].map(item => (
                <div key={item.name} style={insetBox}>
                  <div style={{
                    ...fx.teal(),
                    fontFamily: FONTS.mono,
                    fontSize: '11px',
                    marginBottom: '12px',
                  }}>
                    line-height: {item.value}
                  </div>
                  <p style={{
                    ...fx.body(),
                    fontFamily: FONTS.primary,
                    fontSize: '14px',
                    lineHeight: item.value,
                    margin: '0 0 12px 0',
                  }}>
                    The portfolio has demonstrated remarkable resilience during market volatility periods.
                  </p>
                  <div style={{ ...fx.caption(), fontSize: '12px' }}>
                    <strong>{item.name}</strong> — {item.use}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          COMBINATIONS - Cómo combinar las fuentes
          ═══════════════════════════════════════════════════════════════════════ */}
      {section === 'combinations' && (
        <>
          {/* Combination Rules */}
          <section style={card}>
            <div style={cardTitle}>Reglas de Combinación</div>
            <div style={insetBox}>
              <div style={grid(3, 24)}>
                <div>
                  <div style={{
                    ...fx.title('medium'),
                    fontFamily: FONTS.display,
                    fontSize: '20px',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}>
                    Display + Primary
                  </div>
                  <p style={{ ...fx.body(), fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                    Título serif con cuerpo sans-serif. La combinación principal para páginas y cards.
                    Crea contraste visual elegante.
                  </p>
                </div>
                <div>
                  <div style={{
                    ...fx.title('medium'),
                    fontFamily: FONTS.primary,
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}>
                    Primary Only
                  </div>
                  <p style={{ ...fx.body(), fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                    Para UI funcional donde la claridad es prioritaria. Modales, forms, navegación.
                  </p>
                </div>
                <div>
                  <div style={{
                    ...fx.title('medium'),
                    fontFamily: FONTS.mono,
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}>
                    Primary + Mono
                  </div>
                  <p style={{ ...fx.body(), fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                    Labels en Primary, valores en Mono. Estándar para tablas y métricas financieras.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Combination Examples */}
          <section style={card}>
            <div style={cardTitle}>Patrón: Page Header</div>
            <div style={insetBox}>
              <div style={{
                ...fx.title('strong'),
                fontFamily: FONTS.display,
                fontSize: '32px',
                fontWeight: 700,
                marginBottom: '8px',
              }}>
                Portfolio Overview
              </div>
              <p style={{
                ...fx.caption(),
                fontFamily: FONTS.primary,
                fontSize: '14px',
                margin: 0,
              }}>
                Monitor your investments and track performance against market benchmarks
              </p>
            </div>
          </section>

          <section style={card}>
            <div style={cardTitle}>Patrón: Card con Datos</div>
            <div style={insetBox}>
              <div style={glassBox}>
                <div style={{
                  ...fx.inset('medium'),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  Total Portfolio Value
                </div>
                <div style={{
                  ...fx.title('strong'),
                  fontFamily: FONTS.mono,
                  fontSize: '36px',
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                  marginBottom: '8px',
                }}>
                  $1,847,392.45
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{
                    ...fx.positive(),
                    fontFamily: FONTS.mono,
                    fontSize: '14px',
                    fontWeight: 600,
                  }}>
                    +$24,567.00 (1.35%)
                  </span>
                  <span style={{
                    ...fx.caption(),
                    fontFamily: FONTS.primary,
                    fontSize: '13px',
                  }}>
                    Today
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section style={card}>
            <div style={cardTitle}>Patrón: Table Row</div>
            <div style={insetBox}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 120px 100px 80px',
                gap: '16px',
                padding: '16px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                alignItems: 'center',
              }}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.mono,
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  AAPL
                </div>
                <div style={{
                  ...fx.body(),
                  fontFamily: FONTS.primary,
                  fontSize: '14px',
                }}>
                  Apple Inc.
                </div>
                <div style={{
                  ...fx.title('medium'),
                  fontFamily: FONTS.mono,
                  fontSize: '14px',
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  $189.45
                </div>
                <div style={{
                  ...fx.positive(),
                  fontFamily: FONTS.mono,
                  fontSize: '14px',
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  +2.34%
                </div>
                <div style={{
                  ...fx.caption(),
                  fontFamily: FONTS.mono,
                  fontSize: '13px',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  15.2%
                </div>
              </div>
              <div style={{
                ...fx.muted(),
                fontFamily: FONTS.mono,
                fontSize: '10px',
                marginTop: '12px',
                display: 'grid',
                gridTemplateColumns: '100px 1fr 120px 100px 80px',
                gap: '16px',
                padding: '0 16px',
              }}>
                <span>Ticker (mono/teal)</span>
                <span>Name (primary/body)</span>
                <span>Price (mono/title)</span>
                <span>Change (mono/color)</span>
                <span>Weight (mono/caption)</span>
              </div>
            </div>
          </section>

          <section style={card}>
            <div style={cardTitle}>Patrón: Section con Lista</div>
            <div style={insetBox}>
              <div style={{
                ...fx.title('medium'),
                fontFamily: FONTS.display,
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '8px',
              }}>
                Top Recommendations
              </div>
              <p style={{
                ...fx.caption(),
                fontFamily: FONTS.primary,
                fontSize: '13px',
                marginBottom: '20px',
              }}>
                AI-powered stock picks based on your risk profile and market conditions
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { rank: 1, ticker: 'NVDA', name: 'NVIDIA Corp.', score: 94 },
                  { rank: 2, ticker: 'META', name: 'Meta Platforms', score: 91 },
                  { rank: 3, ticker: 'MSFT', name: 'Microsoft Corp.', score: 88 },
                ].map(item => (
                  <div key={item.ticker} style={{
                    ...glassBox,
                    display: 'grid',
                    gridTemplateColumns: '32px 80px 1fr auto',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 18px',
                  }}>
                    <span style={{
                      ...fx.teal(),
                      fontFamily: FONTS.mono,
                      fontSize: '12px',
                      fontWeight: 600,
                    }}>
                      #{item.rank}
                    </span>
                    <span style={{
                      ...fx.subtitle(),
                      fontFamily: FONTS.mono,
                      fontSize: '14px',
                      fontWeight: 600,
                    }}>
                      {item.ticker}
                    </span>
                    <span style={{
                      ...fx.body(),
                      fontFamily: FONTS.primary,
                      fontSize: '14px',
                    }}>
                      {item.name}
                    </span>
                    <span style={{
                      ...fx.teal(),
                      fontFamily: FONTS.mono,
                      fontSize: '16px',
                      fontWeight: 700,
                    }}>
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          EFFECTS - Efectos tipográficos
          ═══════════════════════════════════════════════════════════════════════ */}
      {section === 'effects' && (
        <>
          {/* Legible vs Decorative */}
          <section style={card}>
            <div style={cardTitle}>Legible vs Decorativo</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                El sistema de efectos se divide en dos categorías: <strong>Legible</strong> (para contenido que
                necesita leerse) y <strong>Decorativo</strong> (para elementos hero y de marca).
              </p>
              <div style={grid(2, 24)}>
                <div>
                  <div style={{
                    ...fx.positive(),
                    fontFamily: FONTS.primary,
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}>
                    Legible — Alto Contraste
                  </div>
                  <div style={glassBox}>
                    <p style={{
                      ...fx.body(),
                      fontFamily: FONTS.primary,
                      fontSize: '15px',
                      lineHeight: 1.7,
                      margin: 0,
                    }}>
                      Este texto usa efectos legibles. El color es oscuro (#2d3748) para buen contraste,
                      con un highlight muy sutil que da profundidad sin sacrificar la lectura.
                    </p>
                  </div>
                </div>
                <div>
                  <div style={{
                    ...fx.warning(),
                    fontFamily: FONTS.primary,
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}>
                    Decorativo — Bajo Contraste
                  </div>
                  <div style={glassBox}>
                    <p style={{
                      ...fx.letterpress('medium'),
                      fontFamily: FONTS.primary,
                      fontSize: '15px',
                      lineHeight: 1.7,
                      margin: 0,
                    }}>
                      Este texto usa efectos decorativos. El color es cercano al fondo para crear efecto
                      de relieve. Solo para títulos cortos o elementos decorativos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Legible Effects */}
          <section style={card}>
            <div style={cardTitle}>Efectos Legibles</div>
            <div style={grid(2, 24)}>
              {[
                { name: 'fx.title("strong")', effect: fx.title('strong'), sample: 'Page Title', size: '28px', weight: 700 },
                { name: 'fx.title("medium")', effect: fx.title('medium'), sample: 'Section Header', size: '22px', weight: 600 },
                { name: 'fx.subtitle()', effect: fx.subtitle(), sample: 'Card Header', size: '18px', weight: 600 },
                { name: 'fx.body()', effect: fx.body(), sample: 'Body text for reading content', size: '14px', weight: 400 },
                { name: 'fx.caption()', effect: fx.caption(), sample: 'Labels, metadata, timestamps', size: '12px', weight: 500 },
                { name: 'fx.inset("medium")', effect: fx.inset('medium'), sample: 'SECTION LABEL', size: '11px', weight: 600, transform: 'uppercase', spacing: '0.1em' },
              ].map(item => (
                <div key={item.name} style={insetBox}>
                  <div style={{
                    ...item.effect,
                    fontFamily: FONTS.primary,
                    fontSize: item.size,
                    fontWeight: item.weight,
                    textTransform: (item.transform as 'uppercase') || 'none',
                    letterSpacing: item.spacing || 'normal',
                    marginBottom: '12px',
                  }}>
                    {item.sample}
                  </div>
                  <code style={{
                    ...fx.muted(),
                    fontFamily: FONTS.mono,
                    fontSize: '11px',
                  }}>
                    {item.name}
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Colored Effects */}
          <section style={card}>
            <div style={cardTitle}>Efectos con Color Semántico</div>
            <div style={grid(4)}>
              {[
                { name: 'fx.teal()', effect: fx.teal(), sample: '$AAPL', desc: 'Brand / Accent' },
                { name: 'fx.positive()', effect: fx.positive(), sample: '+12.45%', desc: 'Gains / Success' },
                { name: 'fx.negative()', effect: fx.negative(), sample: '-3.21%', desc: 'Losses / Error' },
                { name: 'fx.warning()', effect: fx.warning(), sample: '42/100', desc: 'Warning / Risk' },
              ].map(item => (
                <div key={item.name} style={{ ...insetBox, textAlign: 'center' }}>
                  <div style={{
                    ...item.effect,
                    fontFamily: FONTS.mono,
                    fontSize: '24px',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    marginBottom: '8px',
                  }}>
                    {item.sample}
                  </div>
                  <div style={{ ...fx.caption(), fontSize: '12px', marginBottom: '4px' }}>
                    {item.desc}
                  </div>
                  <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                    {item.name}
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Decorative Effects - Neumorphic */}
          <section style={card}>
            <div style={cardTitle}>Efectos Neumórficos — Realzado vs Hundido</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Los efectos neumórficos crean la ilusión de que el texto está <strong>elevado</strong> o <strong>hundido</strong> en
                la superficie. Ideal para logos, títulos hero y elementos de marca.
              </p>
              <div style={grid(2, 24)}>
                {/* Embossed Column */}
                <div>
                  <div style={{
                    ...fx.positive(),
                    fontFamily: FONTS.primary,
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}>
                    Embossed — Realzado (sale de la superficie)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {([1, 2, 3, 4, 5] as const).map(level => (
                      <div key={level} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{
                          ...fx.embossed(level),
                          fontFamily: FONTS.display,
                          fontSize: '28px',
                          fontWeight: 700,
                        }}>
                          FING
                        </div>
                        <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                          fx.embossed({level})
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Debossed Column */}
                <div>
                  <div style={{
                    ...fx.warning(),
                    fontFamily: FONTS.primary,
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}>
                    Debossed — Hundido (entra en la superficie)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {([1, 2, 3, 4, 5] as const).map(level => (
                      <div key={level} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{
                          ...fx.debossed(level),
                          fontFamily: FONTS.display,
                          fontSize: '28px',
                          fontWeight: 700,
                        }}>
                          FING
                        </div>
                        <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                          fx.debossed({level})
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Engraved Effects */}
          <section style={card}>
            <div style={cardTitle}>Engraved — Grabado Fino</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Efecto de incisión delicada, como si el texto estuviera tallado con un buril fino. Excelente para títulos de cards y secciones.
              </p>
              <div style={grid(3, 24)}>
                {(['subtle', 'visible', 'deep'] as const).map(intensity => (
                  <div key={intensity} style={{ ...glassBox, textAlign: 'center' }}>
                    <div style={{
                      ...fx.engraved(intensity),
                      fontFamily: FONTS.primary,
                      fontSize: '22px',
                      fontWeight: 600,
                      marginBottom: '12px',
                    }}>
                      Card Title
                    </div>
                    <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                      fx.engraved("{intensity}")
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Engraved Colored */}
          <section style={card}>
            <div style={cardTitle}>Engraved Colored — Grabado con Color</div>
            <div style={grid(4)}>
              {([
                { hue: 'teal' as const, label: 'Teal / Accent' },
                { hue: 'positive' as const, label: 'Positive' },
                { hue: 'negative' as const, label: 'Negative' },
                { hue: 'warning' as const, label: 'Warning' },
              ]).map(item => (
                <div key={item.hue} style={{ ...insetBox, textAlign: 'center' }}>
                  <div style={{
                    ...fx.engravedColored(item.hue),
                    fontFamily: FONTS.primary,
                    fontSize: '18px',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}>
                    Section Title
                  </div>
                  <div style={{ ...fx.caption(), fontSize: '11px', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                    fx.engravedColored("{item.hue}")
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Letterpress */}
          <section style={card}>
            <div style={cardTitle}>Letterpress — Imprenta Clásica</div>
            <div style={grid(3, 24)}>
              {(['soft', 'medium', 'deep'] as const).map(intensity => (
                <div key={intensity} style={{ ...insetBox, textAlign: 'center' }}>
                  <div style={{
                    ...fx.letterpress(intensity),
                    fontFamily: FONTS.display,
                    fontSize: '32px',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    marginBottom: '12px',
                  }}>
                    Premium
                  </div>
                  <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                    fx.letterpress("{intensity}")
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Advanced Decorative */}
          <section style={card}>
            <div style={cardTitle}>Efectos Avanzados</div>
            <div style={grid(2, 24)}>
              {/* Beveled */}
              <div style={insetBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Beveled — Biselado 3D
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(['soft', 'medium', 'sharp'] as const).map(intensity => (
                    <div key={intensity} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        ...fx.beveled(intensity),
                        fontFamily: FONTS.display,
                        fontSize: '26px',
                        fontWeight: 700,
                      }}>
                        INVEST
                      </div>
                      <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                        fx.beveled("{intensity}")
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long Shadow */}
              <div style={insetBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Long Shadow — Sombra Dramática
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(['short', 'medium', 'long', 'dramatic'] as const).map(len => (
                    <div key={len} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        ...fx.longShadow(len, 'se'),
                        fontFamily: FONTS.display,
                        fontSize: '26px',
                        fontWeight: 700,
                      }}>
                        MARKETS
                      </div>
                      <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                        fx.longShadow("{len}")
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Special Effects */}
          <section style={card}>
            <div style={cardTitle}>Efectos Especiales</div>
            <div style={grid(2, 24)}>
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.carvedDeep(),
                  fontFamily: FONTS.display,
                  fontSize: '42px',
                  fontWeight: 700,
                  marginBottom: '12px',
                }}>
                  PORTFOLIO
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                  fx.carvedDeep()
                </code>
                <div style={{ ...fx.caption(), fontSize: '11px', marginTop: '8px' }}>
                  Tallado profundo — para títulos hero muy decorativos
                </div>
              </div>
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.pillow(),
                  fontFamily: FONTS.display,
                  fontSize: '42px',
                  fontWeight: 700,
                  marginBottom: '12px',
                }}>
                  WEALTH
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                  fx.pillow()
                </code>
                <div style={{ ...fx.caption(), fontSize: '11px', marginTop: '8px' }}>
                  Efecto almohada — soft 3D para hero sections
                </div>
              </div>
            </div>
          </section>

          {/* Quick Reference for Decorative */}
          <section style={card}>
            <div style={cardTitle}>Referencia Rápida — Efectos Decorativos</div>
            <div style={insetBox}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr 1fr',
                gap: '10px 24px',
                fontFamily: FONTS.primary,
                fontSize: '13px',
              }}>
                <div style={{ ...fx.subtitle(), fontWeight: 600 }}>Efecto</div>
                <div style={{ ...fx.subtitle(), fontWeight: 600 }}>Uso Ideal</div>
                <div style={{ ...fx.subtitle(), fontWeight: 600 }}>Niveles / Variantes</div>

                <div style={fx.body()}>embossed</div>
                <div style={fx.caption()}>Logo, hero titles</div>
                <div style={fx.caption()}>1-5 (1=sutil, 5=fuerte)</div>

                <div style={fx.body()}>debossed</div>
                <div style={fx.caption()}>Títulos pressed-in</div>
                <div style={fx.caption()}>1-5 (1=sutil, 5=fuerte)</div>

                <div style={fx.body()}>engraved</div>
                <div style={fx.caption()}>Card titles, section headers</div>
                <div style={fx.caption()}>subtle, visible, deep</div>

                <div style={fx.body()}>engravedColored</div>
                <div style={fx.caption()}>Títulos con acento de color</div>
                <div style={fx.caption()}>teal, positive, negative, warning</div>

                <div style={fx.body()}>letterpress</div>
                <div style={fx.caption()}>Taglines, decorative text</div>
                <div style={fx.caption()}>soft, medium, deep</div>

                <div style={fx.body()}>beveled</div>
                <div style={fx.caption()}>Efecto biselado 3D</div>
                <div style={fx.caption()}>subtle, medium, strong</div>

                <div style={fx.body()}>longShadow</div>
                <div style={fx.caption()}>Hero sections dramáticas</div>
                <div style={fx.caption()}>se, sw, ne, nw (dirección)</div>

                <div style={fx.body()}>carvedDeep</div>
                <div style={fx.caption()}>Elementos muy decorativos</div>
                <div style={fx.caption()}>—</div>

                <div style={fx.body()}>pillow</div>
                <div style={fx.caption()}>Soft 3D hero titles</div>
                <div style={fx.caption()}>—</div>

                <div style={fx.body()}>chiseled</div>
                <div style={fx.caption()}>Tallado en piedra, bordes duros</div>
                <div style={fx.caption()}>light, medium, deep</div>

                <div style={fx.body()}>softRelief</div>
                <div style={fx.caption()}>Relieve suave y delicado</div>
                <div style={fx.caption()}>whisper, subtle, gentle</div>

                <div style={fx.body()}>coloredDebossed</div>
                <div style={fx.caption()}>Hundido con color semántico</div>
                <div style={fx.caption()}>teal, positive, negative, warning, neutral</div>

                <div style={fx.body()}>stamped</div>
                <div style={fx.caption()}>Sello presionado con fuerza</div>
                <div style={fx.caption()}>light, medium, heavy</div>

                <div style={fx.body()}>intaglio</div>
                <div style={fx.caption()}>Grabado profundo (moneda/medalla)</div>
                <div style={fx.caption()}>—</div>

                <div style={fx.body()}>pressed</div>
                <div style={fx.caption()}>Botón presionado</div>
                <div style={fx.caption()}>light, medium, deep</div>

                <div style={fx.body()}>extruded</div>
                <div style={fx.caption()}>Extruido 3D con capas</div>
                <div style={fx.caption()}>2, 3, 4, 5 (capas)</div>

                <div style={fx.body()}>outlineGlow</div>
                <div style={fx.caption()}>Contorno con resplandor</div>
                <div style={fx.caption()}>teal, positive, negative, warning, white</div>

                <div style={fx.body()}>vintage</div>
                <div style={fx.caption()}>Desgastado/antiguo</div>
                <div style={fx.caption()}>—</div>

                <div style={fx.body()}>crisp</div>
                <div style={fx.caption()}>Bordes nítidos minimalistas</div>
                <div style={fx.caption()}>—</div>
              </div>
            </div>
          </section>

          {/* Additional Neumorphic Effects */}
          <section style={card}>
            <div style={cardTitle}>Efectos Adicionales — Chiseled, Soft Relief, Stamped</div>
            <div style={grid(3, 24)}>
              {/* Chiseled */}
              <div style={insetBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Chiseled — Cincelado
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(['light', 'medium', 'deep'] as const).map(intensity => (
                    <div key={intensity} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        ...fx.chiseled(intensity),
                        fontFamily: FONTS.display,
                        fontSize: '22px',
                        fontWeight: 700,
                      }}>
                        STONE
                      </div>
                      <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                        {intensity}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft Relief */}
              <div style={insetBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Soft Relief — Relieve Suave
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(['whisper', 'subtle', 'gentle'] as const).map(intensity => (
                    <div key={intensity} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        ...fx.softRelief(intensity),
                        fontFamily: FONTS.display,
                        fontSize: '22px',
                        fontWeight: 700,
                      }}>
                        SOFT
                      </div>
                      <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                        {intensity}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stamped */}
              <div style={insetBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Stamped — Estampado
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(['light', 'medium', 'heavy'] as const).map(depth => (
                    <div key={depth} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        ...fx.stamped(depth),
                        fontFamily: FONTS.display,
                        fontSize: '22px',
                        fontWeight: 700,
                      }}>
                        STAMP
                      </div>
                      <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                        {depth}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Colored Debossed */}
          <section style={card}>
            <div style={cardTitle}>Colored Debossed — Hundido con Color</div>
            <div style={grid(5)}>
              {(['teal', 'positive', 'negative', 'warning', 'neutral'] as const).map(hue => (
                <div key={hue} style={{ ...insetBox, textAlign: 'center' }}>
                  <div style={{
                    ...fx.coloredDebossed(hue),
                    fontFamily: FONTS.primary,
                    fontSize: '16px',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}>
                    Section
                  </div>
                  <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                    {hue}
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Pressed & Intaglio */}
          <section style={card}>
            <div style={cardTitle}>Pressed & Intaglio — Efectos de Presión</div>
            <div style={grid(2, 24)}>
              <div style={insetBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Pressed — Presionado
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(['light', 'medium', 'deep'] as const).map(intensity => (
                    <div key={intensity} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        ...fx.pressed(intensity),
                        fontFamily: FONTS.display,
                        fontSize: '24px',
                        fontWeight: 700,
                      }}>
                        PRESS
                      </div>
                      <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                        fx.pressed("{intensity}")
                      </code>
                    </div>
                  ))}
                </div>
              </div>
              <div style={insetBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Intaglio — Grabado Profundo
                </div>
                <div style={{ ...glassBox, textAlign: 'center', padding: '32px' }}>
                  <div style={{
                    ...fx.intaglio(),
                    fontFamily: FONTS.display,
                    fontSize: '42px',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}>
                    MEDAL
                  </div>
                  <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                    fx.intaglio() — Como una moneda o medalla antigua
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* Extruded */}
          <section style={card}>
            <div style={cardTitle}>Extruded — Capas de Profundidad 3D</div>
            <div style={grid(4)}>
              {([2, 3, 4, 5] as const).map(layers => (
                <div key={layers} style={{ ...insetBox, textAlign: 'center' }}>
                  <div style={{
                    ...fx.extruded(layers),
                    fontFamily: FONTS.display,
                    fontSize: '32px',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}>
                    3D
                  </div>
                  <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                    fx.extruded({layers})
                  </code>
                  <div style={{ ...fx.caption(), fontSize: '11px', marginTop: '4px' }}>
                    {layers} capas
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Outline Glow */}
          <section style={card}>
            <div style={cardTitle}>Outline Glow — Contorno con Resplandor</div>
            <div style={grid(5)}>
              {(['white', 'teal', 'positive', 'negative', 'warning'] as const).map(hue => (
                <div key={hue} style={{ ...insetBox, textAlign: 'center' }}>
                  <div style={{
                    ...fx.outlineGlow(hue),
                    fontFamily: FONTS.display,
                    fontSize: '24px',
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}>
                    GLOW
                  </div>
                  <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                    {hue}
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Vintage & Crisp */}
          <section style={card}>
            <div style={cardTitle}>Vintage & Crisp — Estilos Especiales</div>
            <div style={grid(2, 24)}>
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.vintage(),
                  fontFamily: FONTS.display,
                  fontSize: '36px',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  marginBottom: '12px',
                }}>
                  VINTAGE
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                  fx.vintage()
                </code>
                <div style={{ ...fx.caption(), fontSize: '11px', marginTop: '8px' }}>
                  Efecto desgastado y antiguo
                </div>
              </div>
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.crisp(),
                  fontFamily: FONTS.primary,
                  fontSize: '36px',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}>
                  CRISP
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                  fx.crisp()
                </code>
                <div style={{ ...fx.caption(), fontSize: '11px', marginTop: '8px' }}>
                  Bordes nítidos y minimalistas
                </div>
              </div>
            </div>
          </section>

          {/* Letterpress Variants */}
          <section style={card}>
            <div style={cardTitle}>Letterpress Variants — Variantes de Imprenta</div>
            <div style={grid(2, 24)}>
              {/* Letterpress Inset */}
              <div style={insetBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Letterpress Inset — Hundido
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(['whisper', 'subtle', 'soft', 'medium'] as const).map(intensity => (
                    <div key={intensity} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        ...fx.letterpressInset(intensity),
                        fontFamily: FONTS.display,
                        fontSize: '22px',
                        fontWeight: 700,
                      }}>
                        INSET
                      </div>
                      <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                        {intensity}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Letterpress Colored */}
              <div style={insetBox}>
                <div style={{
                  ...fx.teal(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Letterpress Colored
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(['teal', 'positive', 'negative', 'warning'] as const).map(hue => (
                    <div key={hue} style={{ ...glassBox, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        ...fx.letterpressColored(hue),
                        fontFamily: FONTS.display,
                        fontSize: '22px',
                        fontWeight: 700,
                      }}>
                        COLOR
                      </div>
                      <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                        {hue}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Metallic Effects */}
          <section style={card}>
            <div style={cardTitle}>Metallic — Efectos Metálicos</div>
            <div style={grid(3, 24)}>
              {(['silver', 'gold', 'bronze'] as const).map(tone => (
                <div key={tone} style={{ ...insetBox, textAlign: 'center' }}>
                  <div style={{
                    ...fx.metallic(tone),
                    fontFamily: FONTS.display,
                    fontSize: '32px',
                    fontWeight: 700,
                    marginBottom: '12px',
                  }}>
                    METAL
                  </div>
                  <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                    fx.metallic("{tone}")
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Neon Effects */}
          <section style={card}>
            <div style={cardTitle}>Neon — Resplandor</div>
            <div style={grid(4)}>
              {(['teal', 'positive', 'negative', 'warning'] as const).map(hue => (
                <div key={hue} style={{ ...insetBox, textAlign: 'center' }}>
                  <div style={{
                    ...fx.neon(hue),
                    fontFamily: FONTS.display,
                    fontSize: '28px',
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}>
                    NEON
                  </div>
                  <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                    fx.neon("{hue}")
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* More Special Effects */}
          <section style={card}>
            <div style={cardTitle}>Más Efectos Especiales</div>
            <div style={grid(4)}>
              {/* Raised */}
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.raised('strong'),
                  fontFamily: FONTS.display,
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}>
                  RAISED
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                  fx.raised()
                </code>
              </div>

              {/* Sunken */}
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.sunken('deep'),
                  fontFamily: FONTS.display,
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}>
                  SUNKEN
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                  fx.sunken()
                </code>
              </div>

              {/* Ghost */}
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.ghost(),
                  fontFamily: FONTS.display,
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}>
                  GHOST
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                  fx.ghost()
                </code>
              </div>

              {/* Double */}
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.double(),
                  fontFamily: FONTS.display,
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}>
                  DOUBLE
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                  fx.double()
                </code>
              </div>
            </div>

            <div style={{ ...grid(4), marginTop: '16px' }}>
              {/* Carved Light */}
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.carvedLight(),
                  fontFamily: FONTS.display,
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}>
                  CARVED
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                  fx.carvedLight()
                </code>
              </div>

              {/* Frosted */}
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.frosted(),
                  fontFamily: FONTS.display,
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}>
                  FROSTED
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                  fx.frosted()
                </code>
              </div>

              {/* Retro */}
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.retro('large'),
                  fontFamily: FONTS.display,
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}>
                  RETRO
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                  fx.retro()
                </code>
              </div>

              {/* Colored Embossed */}
              <div style={{ ...insetBox, textAlign: 'center' }}>
                <div style={{
                  ...fx.coloredEmbossed('teal'),
                  fontFamily: FONTS.display,
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}>
                  COLOR
                </div>
                <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '9px' }}>
                  fx.coloredEmbossed()
                </code>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════════
              CARVED ALPHABET - Alfabeto Completo Tallado
              ═══════════════════════════════════════════════════════════════════════ */}
          <section style={card}>
            <div style={cardTitle}>Alfabeto Tallado — Carved Typography</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Demostración del efecto de tallado en todas las letras del alfabeto. El efecto simula letras
                cinceladas en la superficie de mármol, con luz entrando desde arriba-izquierda.
              </p>

              {/* Uppercase Alphabet - Display Font */}
              <div style={{
                ...fx.teal(),
                fontFamily: FONTS.primary,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Mayúsculas — Libre Baskerville (Display)
              </div>
              <div style={{
                ...glassBox,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
                marginBottom: '24px',
                padding: '24px',
              }}>
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                  <div key={`upper-${letter}`} style={{
                    ...fx.debossed(3),
                    fontFamily: FONTS.display,
                    fontSize: '42px',
                    fontWeight: 700,
                    width: '54px',
                    height: '54px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {letter}
                  </div>
                ))}
              </div>

              {/* Lowercase Alphabet */}
              <div style={{
                ...fx.teal(),
                fontFamily: FONTS.primary,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Minúsculas — Libre Baskerville (Display)
              </div>
              <div style={{
                ...glassBox,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
                marginBottom: '24px',
                padding: '24px',
              }}>
                {'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => (
                  <div key={`lower-${letter}`} style={{
                    ...fx.debossed(3),
                    fontFamily: FONTS.display,
                    fontSize: '42px',
                    fontWeight: 700,
                    width: '54px',
                    height: '54px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {letter}
                  </div>
                ))}
              </div>

              {/* Numbers - Mono Font */}
              <div style={{
                ...fx.teal(),
                fontFamily: FONTS.primary,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Números — IBM Plex Mono (Financial Data)
              </div>
              <div style={{
                ...glassBox,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
                padding: '24px',
              }}>
                {'0123456789'.split('').map(num => (
                  <div key={`num-${num}`} style={{
                    ...fx.debossed(3),
                    fontFamily: FONTS.mono,
                    fontSize: '42px',
                    fontWeight: 600,
                    width: '54px',
                    height: '54px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Embossed Alphabet - Raised */}
          <section style={card}>
            <div style={cardTitle}>Alfabeto Realzado — Embossed Typography</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Contraparte del tallado: letras que emergen de la superficie, como si fueran moldeadas en
                relieve sobre el mármol.
              </p>

              {/* Uppercase Embossed */}
              <div style={{
                ...fx.positive(),
                fontFamily: FONTS.primary,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Mayúsculas Embossed — IBM Plex Sans (Primary)
              </div>
              <div style={{
                ...glassBox,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center',
                padding: '24px',
              }}>
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                  <div key={`emboss-${letter}`} style={{
                    ...fx.embossed(3),
                    fontFamily: FONTS.primary,
                    fontSize: '38px',
                    fontWeight: 600,
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Engraved Alphabet */}
          <section style={card}>
            <div style={cardTitle}>Alfabeto Grabado — Engraved Fine Lines</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Efecto de grabado fino, como si las letras fueran incisas con un buril de precisión.
                Más delicado que el tallado profundo.
              </p>

              <div style={{
                ...glassBox,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                justifyContent: 'center',
                padding: '24px',
              }}>
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                  <div key={`engrave-${letter}`} style={{
                    ...fx.engraved('deep'),
                    fontFamily: FONTS.display,
                    fontSize: '36px',
                    fontWeight: 700,
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Typography Comparisons */}
          <section style={card}>
            <div style={cardTitle}>Comparativa de Efectos — Misma Palabra</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Comparación directa de todos los efectos de profundidad aplicados a la misma palabra,
                facilitando la selección del efecto apropiado para cada caso de uso.
              </p>
              <div style={grid(2, 20)}>
                {[
                  { name: 'Embossed (3)', effect: fx.embossed(3), desc: 'Elevado - Sale de la superficie' },
                  { name: 'Debossed (3)', effect: fx.debossed(3), desc: 'Hundido - Entra en la superficie' },
                  { name: 'Engraved (deep)', effect: fx.engraved('deep'), desc: 'Grabado fino - Incisión delicada' },
                  { name: 'Letterpress (deep)', effect: fx.letterpress('deep'), desc: 'Imprenta - Efecto clásico tipográfico' },
                  { name: 'Chiseled (deep)', effect: fx.chiseled('deep'), desc: 'Cincelado - Bordes duros de piedra' },
                  { name: 'Stamped (heavy)', effect: fx.stamped('heavy'), desc: 'Estampado - Presión con fuerza' },
                  { name: 'Pressed (deep)', effect: fx.pressed('deep'), desc: 'Presionado - Como botón' },
                  { name: 'Intaglio', effect: fx.intaglio(), desc: 'Grabado profundo - Moneda/medalla' },
                  { name: 'Beveled (sharp)', effect: fx.beveled('sharp'), desc: 'Biselado - 3D con bordes' },
                  { name: 'Pillow', effect: fx.pillow(), desc: 'Almohada - Soft 3D' },
                  { name: 'Soft Relief (gentle)', effect: fx.softRelief('gentle'), desc: 'Relieve suave - Delicado' },
                  { name: 'Carved Deep', effect: fx.carvedDeep(), desc: 'Tallado profundo - Muy decorativo' },
                ].map(item => (
                  <div key={item.name} style={{ ...glassBox, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{
                      ...item.effect,
                      fontFamily: FONTS.display,
                      fontSize: '32px',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}>
                      FING
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <code style={{ ...fx.teal(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                        {item.name}
                      </code>
                      <span style={{ ...fx.muted(), fontSize: '10px' }}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Word Combinations with Effects */}
          <section style={card}>
            <div style={cardTitle}>Combinaciones Tipográficas — Palabras Hero</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Ejemplos de cómo usar los efectos neumórficos para crear títulos impactantes y
                elementos de marca distintivos.
              </p>

              {/* Hero Titles Grid */}
              <div style={grid(2, 24)}>
                {/* Market Watch */}
                <div style={{ ...glassBox, textAlign: 'center', padding: '32px' }}>
                  <div style={{
                    ...fx.embossed(4),
                    fontFamily: FONTS.display,
                    fontSize: '36px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                  }}>
                    MARKET
                  </div>
                  <div style={{
                    ...fx.debossed(3),
                    fontFamily: FONTS.display,
                    fontSize: '24px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}>
                    WATCH
                  </div>
                  <div style={{ ...fx.caption(), fontSize: '10px', marginTop: '12px' }}>
                    Embossed + Debossed contrast
                  </div>
                </div>

                {/* Investment Analytics */}
                <div style={{ ...glassBox, textAlign: 'center', padding: '32px' }}>
                  <div style={{
                    ...fx.letterpress('deep'),
                    fontFamily: FONTS.display,
                    fontSize: '28px',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    marginBottom: '4px',
                  }}>
                    Investment
                  </div>
                  <div style={{
                    ...fx.engraved('deep'),
                    fontFamily: FONTS.primary,
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}>
                    ANALYTICS
                  </div>
                  <div style={{ ...fx.caption(), fontSize: '10px', marginTop: '12px' }}>
                    Letterpress + Engraved
                  </div>
                </div>

                {/* Wealth Manager */}
                <div style={{ ...glassBox, textAlign: 'center', padding: '32px' }}>
                  <div style={{
                    ...fx.pillow(),
                    fontFamily: FONTS.display,
                    fontSize: '42px',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}>
                    WEALTH
                  </div>
                  <div style={{
                    ...fx.chiseled('deep'),
                    fontFamily: FONTS.primary,
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.3em',
                  }}>
                    MANAGER
                  </div>
                  <div style={{ ...fx.caption(), fontSize: '10px', marginTop: '12px' }}>
                    Pillow + Chiseled
                  </div>
                </div>

                {/* Portfolio Pro */}
                <div style={{ ...glassBox, textAlign: 'center', padding: '32px' }}>
                  <div style={{
                    ...fx.beveled('sharp'),
                    fontFamily: FONTS.display,
                    fontSize: '38px',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}>
                    PORTFOLIO
                  </div>
                  <div style={{
                    ...fx.engravedColored('teal'),
                    fontFamily: FONTS.mono,
                    fontSize: '16px',
                    fontWeight: 600,
                  }}>
                    PRO
                  </div>
                  <div style={{ ...fx.caption(), fontSize: '10px', marginTop: '12px' }}>
                    Beveled + Engraved Colored
                  </div>
                </div>

                {/* Stock Signals */}
                <div style={{ ...glassBox, textAlign: 'center', padding: '32px' }}>
                  <div style={{
                    ...fx.stamped('heavy'),
                    fontFamily: FONTS.display,
                    fontSize: '36px',
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}>
                    STOCK
                  </div>
                  <div style={{
                    ...fx.extruded(4),
                    fontFamily: FONTS.primary,
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                  }}>
                    SIGNALS
                  </div>
                  <div style={{ ...fx.caption(), fontSize: '10px', marginTop: '12px' }}>
                    Stamped + Extruded
                  </div>
                </div>

                {/* Alpha Returns */}
                <div style={{ ...glassBox, textAlign: 'center', padding: '32px' }}>
                  <div style={{
                    ...fx.intaglio(),
                    fontFamily: FONTS.display,
                    fontSize: '40px',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}>
                    ALPHA
                  </div>
                  <div style={{
                    ...fx.coloredDebossed('positive'),
                    fontFamily: FONTS.mono,
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                  }}>
                    RETURNS
                  </div>
                  <div style={{ ...fx.caption(), fontSize: '10px', marginTop: '12px' }}>
                    Intaglio + Colored Debossed
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Characters & Symbols */}
          <section style={card}>
            <div style={cardTitle}>Símbolos y Caracteres Especiales — Neumórficos</div>
            <div style={insetBox}>
              <div style={grid(2, 24)}>
                {/* Currency Symbols */}
                <div>
                  <div style={{
                    ...fx.teal(),
                    fontFamily: FONTS.primary,
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}>
                    Símbolos de Moneda
                  </div>
                  <div style={{
                    ...glassBox,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    justifyContent: 'center',
                    padding: '24px',
                  }}>
                    {['$', '€', '£', '¥', '₿', '₹'].map(symbol => (
                      <div key={symbol} style={{
                        ...fx.embossed(4),
                        fontFamily: FONTS.mono,
                        fontSize: '48px',
                        fontWeight: 700,
                        width: '72px',
                        height: '72px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {symbol}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Symbols */}
                <div>
                  <div style={{
                    ...fx.teal(),
                    fontFamily: FONTS.primary,
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}>
                    Símbolos Financieros
                  </div>
                  <div style={{
                    ...glassBox,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    justifyContent: 'center',
                    padding: '24px',
                  }}>
                    {['%', '+', '-', '×', '÷', '='].map(symbol => (
                      <div key={symbol} style={{
                        ...fx.debossed(3),
                        fontFamily: FONTS.mono,
                        fontSize: '48px',
                        fontWeight: 600,
                        width: '72px',
                        height: '72px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {symbol}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Intensity Scale Demo */}
          <section style={card}>
            <div style={cardTitle}>Escala de Intensidad — Todos los Niveles</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Visualización de cómo cambia la apariencia del texto a medida que aumenta la intensidad
                de los efectos. Útil para elegir el nivel correcto según el contexto.
              </p>

              {/* Debossed Scale */}
              <div style={{
                ...fx.warning(),
                fontFamily: FONTS.primary,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Escala Debossed — Nivel 1 a 5
              </div>
              <div style={{
                ...glassBox,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '32px',
                marginBottom: '24px',
              }}>
                {([1, 2, 3, 4, 5] as const).map(level => (
                  <div key={level} style={{ textAlign: 'center' }}>
                    <div style={{
                      ...fx.debossed(level),
                      fontFamily: FONTS.display,
                      fontSize: '48px',
                      fontWeight: 700,
                      marginBottom: '8px',
                    }}>
                      A
                    </div>
                    <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                      Level {level}
                    </code>
                  </div>
                ))}
              </div>

              {/* Embossed Scale */}
              <div style={{
                ...fx.positive(),
                fontFamily: FONTS.primary,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Escala Embossed — Nivel 1 a 5
              </div>
              <div style={{
                ...glassBox,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '32px',
              }}>
                {([1, 2, 3, 4, 5] as const).map(level => (
                  <div key={level} style={{ textAlign: 'center' }}>
                    <div style={{
                      ...fx.embossed(level),
                      fontFamily: FONTS.display,
                      fontSize: '48px',
                      fontWeight: 700,
                      marginBottom: '8px',
                    }}>
                      A
                    </div>
                    <code style={{ ...fx.muted(), fontFamily: FONTS.mono, fontSize: '10px' }}>
                      Level {level}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          USE CASES - Ejemplos prácticos
          ═══════════════════════════════════════════════════════════════════════ */}
      {section === 'use-cases' && (
        <>
          {/* Dashboard Card */}
          <section style={card}>
            <div style={cardTitle}>Dashboard: Metric Card</div>
            <div style={insetBox}>
              <div style={{ ...glassBox, maxWidth: '320px' }}>
                <div style={{
                  ...fx.inset('subtle'),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  Portfolio Value
                </div>
                <div style={{
                  ...fx.title('strong'),
                  fontFamily: FONTS.mono,
                  fontSize: '32px',
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                  marginBottom: '4px',
                }}>
                  $191,856
                </div>
                <div style={{
                  ...fx.positive(),
                  fontFamily: FONTS.mono,
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  +16.5% all time
                </div>
              </div>
            </div>
          </section>

          {/* News Card */}
          <section style={card}>
            <div style={cardTitle}>News: Article Preview</div>
            <div style={insetBox}>
              <div style={{ ...glassBox, maxWidth: '480px' }}>
                <div style={{
                  ...fx.title('medium'),
                  fontFamily: FONTS.display,
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  lineHeight: 1.3,
                }}>
                  Fed Signals Potential Rate Cuts Amid Economic Uncertainty
                </div>
                <p style={{
                  ...fx.body(),
                  fontFamily: FONTS.primary,
                  fontSize: '14px',
                  lineHeight: 1.6,
                  margin: '0 0 12px 0',
                }}>
                  Federal Reserve officials indicated they may begin cutting interest rates later this year
                  as inflation continues to cool toward the central bank's 2% target...
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    ...fx.caption(),
                    fontFamily: FONTS.primary,
                    fontSize: '12px',
                  }}>
                    Financial Times
                  </span>
                  <span style={{ ...fx.muted(), fontSize: '12px' }}>•</span>
                  <span style={{
                    ...fx.muted(),
                    fontFamily: FONTS.primary,
                    fontSize: '12px',
                  }}>
                    2 hours ago
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  {['$AAPL', '$MSFT', '$GOOGL'].map(ticker => (
                    <span key={ticker} style={{
                      ...fx.teal(),
                      fontFamily: FONTS.mono,
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 8px',
                      background: 'rgba(58, 106, 114, 0.1)',
                      borderRadius: '4px',
                    }}>
                      {ticker}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Modal */}
          <section style={card}>
            <div style={cardTitle}>Modal: Confirmation Dialog</div>
            <div style={insetBox}>
              <div style={{
                ...glassBox,
                maxWidth: '400px',
                textAlign: 'center',
                padding: '32px',
              }}>
                <div style={{
                  ...fx.title('strong'),
                  fontFamily: FONTS.primary,
                  fontSize: '20px',
                  fontWeight: 600,
                  marginBottom: '12px',
                }}>
                  Confirm Transaction
                </div>
                <p style={{
                  ...fx.body(),
                  fontFamily: FONTS.primary,
                  fontSize: '14px',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                }}>
                  You are about to purchase <strong style={fx.teal()}>50 shares</strong> of <strong>AAPL</strong> at
                  market price. This action cannot be undone.
                </p>
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  justifyContent: 'center',
                  padding: '16px',
                  background: MARBLE.base,
                  borderRadius: '12px',
                  boxShadow: 'var(--inset-1)',
                  marginBottom: '24px',
                }}>
                  <div>
                    <div style={{
                      ...fx.caption(),
                      fontFamily: FONTS.primary,
                      fontSize: '11px',
                      marginBottom: '4px',
                    }}>
                      Estimated Total
                    </div>
                    <div style={{
                      ...fx.title('medium'),
                      fontFamily: FONTS.mono,
                      fontSize: '24px',
                      fontWeight: 700,
                    }}>
                      $9,472.50
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button style={{
                    ...fx.caption(),
                    fontFamily: FONTS.primary,
                    fontSize: '14px',
                    fontWeight: 600,
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '10px',
                    background: MARBLE.base,
                    boxShadow: 'var(--raised-2)',
                    cursor: 'pointer',
                  }}>
                    Cancel
                  </button>
                  <button style={{
                    color: 'white',
                    fontFamily: FONTS.primary,
                    fontSize: '14px',
                    fontWeight: 600,
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '10px',
                    background: '#3a6a72',
                    cursor: 'pointer',
                  }}>
                    Confirm Purchase
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Form */}
          <section style={card}>
            <div style={cardTitle}>Form: Input with Label</div>
            <div style={insetBox}>
              <div style={{ maxWidth: '320px' }}>
                <label style={{
                  ...fx.subtitle(),
                  fontFamily: FONTS.primary,
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Investment Amount
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 16px',
                  background: MARBLE.base,
                  borderRadius: '12px',
                  boxShadow: 'var(--inset-2)',
                  marginBottom: '8px',
                }}>
                  <span style={{
                    ...fx.caption(),
                    fontFamily: FONTS.mono,
                    fontSize: '16px',
                    marginRight: '8px',
                  }}>
                    $
                  </span>
                  <span style={{
                    ...fx.title('medium'),
                    fontFamily: FONTS.mono,
                    fontSize: '18px',
                    fontWeight: 600,
                  }}>
                    10,000.00
                  </span>
                </div>
                <p style={{
                  ...fx.muted(),
                  fontFamily: FONTS.primary,
                  fontSize: '12px',
                  margin: 0,
                }}>
                  Minimum investment: $1,000
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          FINANCIAL - Específico para datos financieros
          ═══════════════════════════════════════════════════════════════════════ */}
      {section === 'financial' && (
        <>
          {/* Number Formatting */}
          <section style={card}>
            <div style={cardTitle}>Formato de Números</div>
            <div style={insetBox}>
              <p style={{ ...fx.body(), fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Usar <code style={{ ...fx.teal(), fontFamily: FONTS.mono }}>font-variant-numeric: tabular-nums</code> para
                alineación perfecta en columnas. IBM Plex Mono incluye cifras tabulares por defecto.
              </p>
              <div style={grid(4)}>
                <div style={glassBox}>
                  <div style={{
                    ...fx.inset('subtle'),
                    fontFamily: FONTS.primary,
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    Currency
                  </div>
                  <div style={{
                    ...fx.title('medium'),
                    fontFamily: FONTS.mono,
                    fontSize: '20px',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    $1,234,567.89
                  </div>
                </div>
                <div style={glassBox}>
                  <div style={{
                    ...fx.inset('subtle'),
                    fontFamily: FONTS.primary,
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    Percentage
                  </div>
                  <div style={{
                    ...fx.positive(),
                    fontFamily: FONTS.mono,
                    fontSize: '20px',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    +24.57%
                  </div>
                </div>
                <div style={glassBox}>
                  <div style={{
                    ...fx.inset('subtle'),
                    fontFamily: FONTS.primary,
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    Ratio
                  </div>
                  <div style={{
                    ...fx.warning(),
                    fontFamily: FONTS.mono,
                    fontSize: '20px',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    1.42
                  </div>
                </div>
                <div style={glassBox}>
                  <div style={{
                    ...fx.inset('subtle'),
                    fontFamily: FONTS.primary,
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    Volume
                  </div>
                  <div style={{
                    ...fx.subtitle(),
                    fontFamily: FONTS.mono,
                    fontSize: '20px',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    52.4M
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Color Semantics */}
          <section style={card}>
            <div style={cardTitle}>Semántica de Color</div>
            <div style={grid(2, 24)}>
              <div style={insetBox}>
                <div style={{
                  ...fx.positive(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Positive / Gains
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['+$12,456.78', '+15.67%', '↑ 234 pts'].map(v => (
                    <div key={v} style={{
                      ...fx.positive(),
                      fontFamily: FONTS.mono,
                      fontSize: '18px',
                      fontWeight: 600,
                    }}>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
              <div style={insetBox}>
                <div style={{
                  ...fx.negative(),
                  fontFamily: FONTS.primary,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  Negative / Losses
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['-$3,456.78', '-8.23%', '↓ 89 pts'].map(v => (
                    <div key={v} style={{
                      ...fx.negative(),
                      fontFamily: FONTS.mono,
                      fontSize: '18px',
                      fontWeight: 600,
                    }}>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Complete Table */}
          <section style={card}>
            <div style={cardTitle}>Holdings Table Completa</div>
            <div style={insetBox}>
              {/* Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 100px 100px 100px 80px',
                gap: '12px',
                padding: '12px 16px',
                borderBottom: `1px solid ${MARBLE.dark}`,
                marginBottom: '8px',
              }}>
                {['Ticker', 'Name', 'Price', 'Change', 'Value', 'Weight'].map(h => (
                  <div key={h} style={{
                    ...fx.inset('subtle'),
                    fontFamily: FONTS.mono,
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {h}
                  </div>
                ))}
              </div>
              {/* Rows */}
              {[
                { ticker: 'AAPL', name: 'Apple Inc.', price: 189.45, change: 2.34, value: 28417.50, weight: 15.2 },
                { ticker: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 1.87, value: 22734.60, weight: 12.2 },
                { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 141.23, change: -0.45, value: 19772.20, weight: 10.6 },
                { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 495.22, change: 4.12, value: 17332.70, weight: 9.3 },
                { ticker: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -1.23, value: 12425.00, weight: 6.7 },
              ].map(row => (
                <div key={row.ticker} style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 100px 100px 100px 80px',
                  gap: '12px',
                  padding: '14px 16px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  marginBottom: '6px',
                  alignItems: 'center',
                }}>
                  <div style={{
                    ...fx.teal(),
                    fontFamily: FONTS.mono,
                    fontSize: '13px',
                    fontWeight: 600,
                  }}>
                    {row.ticker}
                  </div>
                  <div style={{
                    ...fx.body(),
                    fontFamily: FONTS.primary,
                    fontSize: '13px',
                  }}>
                    {row.name}
                  </div>
                  <div style={{
                    ...fx.title('medium'),
                    fontFamily: FONTS.mono,
                    fontSize: '13px',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    ${row.price.toFixed(2)}
                  </div>
                  <div style={{
                    ...(row.change >= 0 ? fx.positive() : fx.negative()),
                    fontFamily: FONTS.mono,
                    fontSize: '13px',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {row.change >= 0 ? '+' : ''}{row.change.toFixed(2)}%
                  </div>
                  <div style={{
                    ...fx.subtitle(),
                    fontFamily: FONTS.mono,
                    fontSize: '13px',
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    ${row.value.toLocaleString()}
                  </div>
                  <div style={{
                    ...fx.caption(),
                    fontFamily: FONTS.mono,
                    fontSize: '12px',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {row.weight}%
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Reference */}
          <section style={card}>
            <div style={cardTitle}>Referencia Rápida</div>
            <div style={insetBox}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr 1fr',
                gap: '12px 24px',
                fontFamily: FONTS.primary,
                fontSize: '13px',
              }}>
                <div style={{ ...fx.subtitle(), fontWeight: 600 }}>Elemento</div>
                <div style={{ ...fx.subtitle(), fontWeight: 600 }}>Font</div>
                <div style={{ ...fx.subtitle(), fontWeight: 600 }}>Efecto</div>

                <div style={fx.body()}>Ticker symbols</div>
                <div style={fx.caption()}>Mono, 600</div>
                <div style={fx.caption()}>fx.teal()</div>

                <div style={fx.body()}>Prices</div>
                <div style={fx.caption()}>Mono, 500-600</div>
                <div style={fx.caption()}>fx.title("medium")</div>

                <div style={fx.body()}>Positive changes</div>
                <div style={fx.caption()}>Mono, 500-600</div>
                <div style={fx.caption()}>fx.positive()</div>

                <div style={fx.body()}>Negative changes</div>
                <div style={fx.caption()}>Mono, 500-600</div>
                <div style={fx.caption()}>fx.negative()</div>

                <div style={fx.body()}>Column headers</div>
                <div style={fx.caption()}>Mono, 600, uppercase</div>
                <div style={fx.caption()}>fx.inset("subtle")</div>

                <div style={fx.body()}>Company names</div>
                <div style={fx.caption()}>Primary, 400</div>
                <div style={fx.caption()}>fx.body()</div>

                <div style={fx.body()}>Secondary values</div>
                <div style={fx.caption()}>Mono, 400-500</div>
                <div style={fx.caption()}>fx.caption()</div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default TypographyShowcase;
