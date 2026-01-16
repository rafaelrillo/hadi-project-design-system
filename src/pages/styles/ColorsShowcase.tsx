// Path: src/pages/styles/ColorsShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Color Palette
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function ColorsContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  interface ColorToken {
    name: string;
    variable: string;
    value: string;
    description?: string;
  }

  const ColorSwatch = ({ color }: { color: ColorToken }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px',
      background: LIGHT.base,
      borderRadius: '15px',
      boxShadow: getNeuInsetShadow(3, 8),
      marginBottom: '8px',
      transition: 'box-shadow 50ms linear',
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '15px',
        backgroundColor: `var(${color.variable})`,
        boxShadow: getNeuPanelShadow(6, 18),
        flexShrink: 0,
        transition: 'box-shadow 50ms linear',
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#2D3436',
          marginBottom: '4px',
          fontFamily: 'var(--sentinel-font-display)'
        }}>
          {color.name}
        </div>
        <code style={{
          display: 'inline-block',
          fontSize: '11px',
          backgroundColor: 'rgba(74, 154, 156, 0.15)',
          padding: '2px 8px',
          borderRadius: '15px',
          color: 'var(--sentinel-accent-primary)',
          fontFamily: 'var(--sentinel-font-mono)',
          marginBottom: '4px'
        }}>
          var({color.variable})
        </code>
        <div style={{
          fontSize: '11px',
          color: '#636E72',
          fontFamily: 'var(--sentinel-font-mono)'
        }}>
          {color.value}
        </div>
        {color.description && (
          <div style={{
            fontSize: '11px',
            color: '#9BA4B0',
            marginTop: '4px',
            fontFamily: 'var(--sentinel-font-mono)'
          }}>
            {color.description}
          </div>
        )}
      </div>
    </div>
  );

  const backgroundColors: ColorToken[] = [
    { name: 'Neumorphic Base', variable: '--neu-base', value: '#e0e5ec', description: 'Base for neumorphic elements' },
    { name: 'Shadow Light', variable: '--neu-shadow-light', value: '#ffffff', description: 'Light highlight' },
    { name: 'Shadow Dark', variable: '--neu-shadow-dark', value: 'hsl(220, 15%, 72%)', description: 'Dark shadow' },
  ];

  const accentColors: ColorToken[] = [
    { name: 'Accent Primary', variable: '--sentinel-accent-primary', value: '#5ba3a5', description: 'Primary teal accent' },
    { name: 'Accent Secondary', variable: '--sentinel-accent-secondary', value: '#4a8a8c', description: 'Secondary accent' },
  ];

  const glassColors: ColorToken[] = [
    { name: 'Glass Teal', variable: '--glass-teal', value: 'hsla(175, 35%, 60%, 0.28)', description: 'Primary glass' },
    { name: 'Glass Blue', variable: '--glass-blue', value: 'hsla(215, 50%, 65%, 0.28)', description: 'Info glass' },
    { name: 'Glass Green', variable: '--glass-green', value: 'hsla(145, 45%, 60%, 0.28)', description: 'Success glass' },
    { name: 'Glass Red', variable: '--glass-red', value: 'hsla(355, 35%, 60%, 0.28)', description: 'Error glass' },
    { name: 'Glass Amber', variable: '--glass-amber', value: 'hsla(35, 55%, 60%, 0.28)', description: 'Warning glass' },
    { name: 'Glass Purple', variable: '--glass-purple', value: 'hsla(280, 40%, 65%, 0.28)', description: 'Premium glass' },
  ];

  const statusColors: ColorToken[] = [
    { name: 'Positive', variable: '--sentinel-status-positive', value: '#4a9a7c', description: 'Success states' },
    { name: 'Negative', variable: '--sentinel-status-negative', value: '#b85c5c', description: 'Error states' },
    { name: 'Warning', variable: '--sentinel-status-warning', value: '#c4a35a', description: 'Warning states' },
    { name: 'Info', variable: '--sentinel-status-info', value: '#5a8fb8', description: 'Info states' },
  ];

  const textColors: ColorToken[] = [
    { name: 'Text Primary', variable: '--sentinel-text-primary', value: '#2D3436', description: 'Main text on light' },
    { name: 'Text Secondary', variable: '--sentinel-text-secondary', value: '#636E72', description: 'Secondary text' },
    { name: 'Text Tertiary', variable: '--sentinel-text-tertiary', value: '#9BA4B0', description: 'Muted text' },
  ];

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Colors_</h1>
        <p style={descStyles}>// Paleta de colores para Glass-Neumorphism</p>
      </header>

      <ShowcaseSection
        title="Colores Neumórficos"
        description="Base y sombras para el sistema neumórfico"
      >
        <div style={{ width: '100%' }}>
          {backgroundColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Colores de Acento"
        description="Acentos teal institucionales"
      >
        <div style={{ width: '100%' }}>
          {accentColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Colores Glass"
        description="Colores semitransparentes para elementos glassmorphism"
      >
        <div style={{ width: '100%' }}>
          {glassColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Colores de Estado"
        description="Colores semánticos para feedback"
      >
        <div style={{ width: '100%' }}>
          {statusColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Colores de Texto"
        description="Jerarquía tipográfica"
      >
        <div style={{ width: '100%' }}>
          {textColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Código de Ejemplo">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: LIGHT.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          transition: 'box-shadow 50ms linear',
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`:root {
  /* Neumorphic Base */
  --neu-base: #e0e5ec;
  --neu-shadow-light: #ffffff;
  --neu-shadow-dark: hsl(220, 15%, 72%);

  /* Glass Colors (HSLA) */
  --glass-teal: hsla(175, 35%, 60%, 0.28);
  --glass-blue: hsla(215, 50%, 65%, 0.28);
  --glass-green: hsla(145, 45%, 60%, 0.28);
  --glass-red: hsla(355, 35%, 60%, 0.28);

  /* Usage */
  .neu-panel {
    background: var(--neu-base);
    box-shadow:
      -20px -20px 60px var(--neu-shadow-light),
      20px 20px 60px var(--neu-shadow-dark);
  }
}`}</pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function ColorsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <ColorsContent />
    </LightEngineProvider>
  );
}
