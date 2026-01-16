// Path: src/pages/styles/TypographyShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Typography
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function TypographyContent() {
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

  const sizeMap: { [key: string]: string } = {
    '4xl': '36px', '3xl': '30px', '2xl': '24px', 'xl': '20px',
    'lg': '18px', 'base': '16px', 'sm': '14px', 'xs': '12px',
  };

  const weightMap: { [key: string]: number } = {
    'light': 300, 'regular': 400, 'medium': 500, 'semibold': 600, 'bold': 700,
  };

  const typographySizes = [
    { name: '4XL', size: '4xl', weight: 'light', usage: 'Hero headlines' },
    { name: '3XL', size: '3xl', weight: 'light', usage: 'Page titles' },
    { name: '2XL', size: '2xl', weight: 'regular', usage: 'Section titles' },
    { name: 'XL', size: 'xl', weight: 'regular', usage: 'Subsection titles' },
    { name: 'LG', size: 'lg', weight: 'medium', usage: 'Large body text' },
    { name: 'Base', size: 'base', weight: 'regular', usage: 'Default body text' },
    { name: 'SM', size: 'sm', weight: 'regular', usage: 'Secondary text' },
    { name: 'XS', size: 'xs', weight: 'regular', usage: 'Labels, captions' },
  ];

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Typography_</h1>
        <p style={descStyles}>// Sistema tipográfico para Glass-Neumorphism</p>
      </header>

      <ShowcaseSection
        title="Familias Tipográficas"
        description="Libre Baskerville para display, IBM Plex Sans para UI, IBM Plex Mono para datos"
      >
        <div style={{ display: 'grid', gap: '16px', width: '100%' }}>
          <div style={{
            padding: '24px',
            background: LIGHT.base,
            borderRadius: '15px',
            boxShadow: getNeuInsetShadow(5, 15),
            transition: 'box-shadow 50ms linear',
          }}>
            <div style={{ fontSize: '12px', color: '#9BA4B0', marginBottom: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>
              DISPLAY FONT (h1-h3)
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 700,
              fontFamily: 'var(--sentinel-font-display)',
              color: '#2D3436',
              marginBottom: '8px'
            }}>
              Libre Baskerville - SENTINEL
            </div>
            <code style={{
              fontSize: '11px',
              backgroundColor: 'rgba(74, 154, 156, 0.15)',
              padding: '4px 8px',
              borderRadius: '15px',
              color: 'var(--sentinel-accent-primary)',
              fontFamily: 'var(--sentinel-font-mono)'
            }}>
              var(--sentinel-font-display)
            </code>
          </div>

          <div style={{
            padding: '24px',
            background: LIGHT.base,
            borderRadius: '15px',
            boxShadow: getNeuInsetShadow(5, 15),
            transition: 'box-shadow 50ms linear',
          }}>
            <div style={{ fontSize: '12px', color: '#9BA4B0', marginBottom: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>
              UI PRIMARY FONT (h4-h6, body)
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 500,
              fontFamily: 'var(--sentinel-font-primary)',
              color: '#2D3436',
              marginBottom: '8px'
            }}>
              IBM Plex Sans - Interface
            </div>
            <code style={{
              fontSize: '11px',
              backgroundColor: 'rgba(74, 154, 156, 0.15)',
              padding: '4px 8px',
              borderRadius: '15px',
              color: 'var(--sentinel-accent-primary)',
              fontFamily: 'var(--sentinel-font-mono)'
            }}>
              var(--sentinel-font-primary)
            </code>
          </div>

          <div style={{
            padding: '24px',
            background: LIGHT.base,
            borderRadius: '15px',
            boxShadow: getNeuInsetShadow(5, 15),
            transition: 'box-shadow 50ms linear',
          }}>
            <div style={{ fontSize: '12px', color: '#9BA4B0', marginBottom: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>
              MONOSPACE FONT (datos, código)
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 400,
              fontFamily: 'var(--sentinel-font-mono)',
              color: '#2D3436',
              marginBottom: '8px',
              fontVariantNumeric: 'tabular-nums lining-nums'
            }}>
              IBM Plex Mono - 1234567890
            </div>
            <code style={{
              fontSize: '11px',
              backgroundColor: 'rgba(74, 154, 156, 0.15)',
              padding: '4px 8px',
              borderRadius: '15px',
              color: 'var(--sentinel-accent-primary)',
              fontFamily: 'var(--sentinel-font-mono)'
            }}>
              var(--sentinel-font-mono)
            </code>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Escala Tipográfica"
        description="Jerarquía de tamaños desde 12px hasta 36px"
      >
        <div style={{ width: '100%' }}>
          {typographySizes.map((item) => (
            <div key={item.name} style={{
              padding: '16px 20px',
              background: LIGHT.base,
              borderRadius: '15px',
              boxShadow: getNeuInsetShadow(3, 8),
              marginBottom: '12px',
              transition: 'box-shadow 50ms linear',
            }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '8px', fontSize: '11px', color: '#9BA4B0', flexWrap: 'wrap' }}>
                <strong style={{ color: '#2D3436' }}>{item.name}</strong>
                <code style={{
                  backgroundColor: 'rgba(74, 154, 156, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '15px',
                  color: 'var(--sentinel-accent-primary)',
                  fontFamily: 'var(--sentinel-font-mono)'
                }}>
                  {sizeMap[item.size]}
                </code>
                <span>{item.usage}</span>
              </div>
              <div style={{
                fontSize: sizeMap[item.size],
                fontWeight: weightMap[item.weight],
                fontFamily: 'var(--sentinel-font-display)',
                color: '#2D3436',
              }}>
                SENTINEL Design System
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Pesos Tipográficos"
        description="Light (300) a Bold (700)"
      >
        <div style={{ display: 'grid', gap: '12px', width: '100%' }}>
          {[
            { weight: 300, name: 'Light', usage: 'Headlines elegantes' },
            { weight: 400, name: 'Regular', usage: 'Texto por defecto' },
            { weight: 500, name: 'Medium', usage: 'Énfasis' },
            { weight: 600, name: 'Semibold', usage: 'Botones, títulos' },
            { weight: 700, name: 'Bold', usage: 'Máximo énfasis' },
          ].map((item) => (
            <div key={item.weight} style={{
              padding: '16px 20px',
              background: LIGHT.base,
              borderRadius: '15px',
              boxShadow: getNeuInsetShadow(3, 8),
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              transition: 'box-shadow 50ms linear',
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: item.weight,
                fontFamily: 'var(--sentinel-font-display)',
                color: '#2D3436',
                minWidth: '180px'
              }}>
                {item.name} ({item.weight})
              </div>
              <div style={{ fontSize: '12px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
                {item.usage}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Datos Financieros">
        <div style={{
          padding: '24px',
          background: LIGHT.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          width: '100%',
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={{ fontSize: '12px', color: '#9BA4B0', marginBottom: '16px', fontFamily: 'var(--sentinel-font-mono)', letterSpacing: '0.05em' }}>
            FINANCIAL DATA DISPLAY
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px' }}>
            {[
              { label: 'Portfolio Value', value: '$1,234,567', color: '#2D3436' },
              { label: 'Change', value: '+2.45%', color: 'var(--sentinel-status-positive)' },
              { label: 'Risk Score', value: '42/100', color: 'var(--sentinel-accent-primary)' },
              { label: 'Confidence', value: '87%', color: '#2D3436' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontSize: '11px', color: '#9BA4B0', marginBottom: '4px', fontFamily: 'var(--sentinel-font-mono)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: item.color, fontFamily: 'var(--sentinel-font-mono)' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
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
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`/* Libre Baskerville para títulos elegantes */
.page-title {
  font-family: var(--sentinel-font-display);
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: lining-nums;
}

/* IBM Plex Mono para datos financieros */
.data-value {
  font-family: var(--sentinel-font-mono);
  font-size: 20px;
  font-weight: 600;
  font-variant-numeric: tabular-nums lining-nums;
}

/* IBM Plex Sans para UI general */
.label {
  font-family: var(--sentinel-font-primary);
  font-size: 12px;
  color: var(--sentinel-text-tertiary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}`}</pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function TypographyShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <TypographyContent />
    </LightEngineProvider>
  );
}
