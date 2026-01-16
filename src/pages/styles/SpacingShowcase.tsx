// Path: src/pages/styles/SpacingShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Spacing
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function SpacingContent() {
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

  interface SpacingToken {
    name: string;
    variable: string;
    value: string;
    pixels: string;
    usage: string;
  }

  const SpacingSample = ({ token }: { token: SpacingToken }) => (
    <div style={{
      padding: '16px',
      background: LIGHT.base,
      borderRadius: '15px',
      boxShadow: getNeuInsetShadow(3, 8),
      marginBottom: '12px',
      transition: 'box-shadow 50ms linear',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          width: token.value,
          height: '40px',
          background: LIGHT.base,
          borderRadius: '15px',
          boxShadow: getNeuPanelShadow(8, 24),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 50ms linear',
        }}>
          <span style={{
            fontSize: '10px',
            color: '#2D3436',
            fontWeight: 600,
            fontFamily: 'var(--sentinel-font-mono)'
          }}>
            {token.pixels}
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#2D3436',
            marginBottom: '4px',
            fontFamily: 'var(--sentinel-font-display)'
          }}>
            {token.name}
          </div>
          <div style={{ fontSize: '12px', color: '#636E72', marginBottom: '2px' }}>
            <code style={{
              backgroundColor: 'rgba(74, 154, 156, 0.15)',
              padding: '2px 6px',
              borderRadius: '15px',
              color: 'var(--sentinel-accent-primary)',
              fontFamily: 'var(--sentinel-font-mono)'
            }}>
              var({token.variable})
            </code>
            {' = '}{token.value}
          </div>
          <div style={{ fontSize: '11px', color: '#9BA4B0', fontFamily: 'var(--sentinel-font-mono)' }}>
            {token.usage}
          </div>
        </div>
      </div>
    </div>
  );

  const spacingScale: SpacingToken[] = [
    { name: 'Extra Small', variable: '--spacing-xs', value: '5px', pixels: '5px', usage: 'Espaciado mínimo entre elementos' },
    { name: 'Small', variable: '--spacing-sm', value: '10px', pixels: '10px', usage: 'Espaciado pequeño entre elementos relacionados' },
    { name: 'Medium', variable: '--spacing-md', value: '15px', pixels: '15px', usage: 'Espaciado medio entre secciones relacionadas' },
    { name: 'Large', variable: '--spacing-lg', value: '20px', pixels: '20px', usage: 'Espaciado estándar entre elementos y secciones' },
    { name: 'Extra Large', variable: '--spacing-xl', value: '30px', pixels: '30px', usage: 'Espaciado grande entre secciones principales' },
    { name: '2X Large', variable: '--spacing-2xl', value: '40px', pixels: '40px', usage: 'Espaciado extra grande para separación de bloques' }
  ];

  const specialSpacings: SpacingToken[] = [
    { name: 'Content Padding', variable: '--content-padding', value: '30px', pixels: '30px', usage: 'Padding del área de contenido principal' },
    { name: 'Gap Elements', variable: '--gap-elements', value: '20px', pixels: '20px', usage: 'Gap estándar entre elementos (grid, flex)' },
    { name: 'Container Padding', variable: '--container-padding', value: '20px', pixels: '20px', usage: 'Padding interno de contenedores' }
  ];

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Spacing_</h1>
        <p style={descStyles}>// Sistema de espaciado basado en escala de 5px</p>
      </header>

      <ShowcaseSection
        title="Escala de Espaciado"
        description="Tokens de espaciado base desde 5px hasta 40px"
      >
        <div>
          {spacingScale.map((token) => (
            <SpacingSample key={token.variable} token={token} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Espaciados Especiales"
        description="Tokens específicos para áreas de contenido"
      >
        <div>
          {specialSpacings.map((token) => (
            <SpacingSample key={token.variable} token={token} />
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
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`.neu-card {
  padding: var(--container-padding);
  margin-bottom: var(--spacing-lg);
  border-radius: 15px;
}

.section {
  padding: var(--content-padding);
  gap: var(--gap-elements);
}

.button-group {
  display: flex;
  gap: var(--spacing-sm);
}`}</pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function SpacingShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <SpacingContent />
    </LightEngineProvider>
  );
}
