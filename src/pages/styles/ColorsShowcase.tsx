// Path: src/pages/styles/ColorsShowcase.tsx
// FING Design System - Stone Marble Color Palette
import React from 'react';

interface ColorToken {
  name: string;
  variable: string;
  value: string;
  description?: string;
}

export function ColorsShowcase() {
  // ═══════════════════════════════════════════════════════════════════════════
  // STYLES - Stone Marble Design System
  // ═══════════════════════════════════════════════════════════════════════════

  const showcaseStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: 'var(--marble-base)',
    padding: '32px',
    fontFamily: 'var(--fing-font-primary)',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '32px',
  };

  const headerTitleStyles: React.CSSProperties = {
    fontFamily: 'var(--fing-font-display)',
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: 'var(--marble-base)',
    textShadow: '2px 2px 2px var(--shadow-light), -2px -2px 2px var(--shadow-dark)',
  };

  const headerSubtitleStyles: React.CSSProperties = {
    fontSize: '14px',
    marginTop: '8px',
    color: 'var(--marble-base)',
    textShadow: '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)',
  };

  const sectionStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    borderRadius: '24px',
    boxShadow: 'var(--raised-3)',
    padding: '32px',
    marginBottom: '24px',
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontFamily: 'var(--fing-font-primary)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--marble-base)',
    textShadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)',
    marginBottom: '24px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--marble-dark)',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  };

  const swatchContainerStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    borderRadius: '14px',
    boxShadow: 'var(--inset-2)',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const colorBoxStyles = (variable: string): React.CSSProperties => ({
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    backgroundColor: `var(${variable})`,
    boxShadow: 'var(--raised-2)',
    flexShrink: 0,
  });

  // Letterpress para superficies RAISED (elevadas)
  const lpStyles = (intensity: 'whisper' | 'subtle' | 'soft' | 'medium'): React.CSSProperties => {
    const shadows: Record<string, string> = {
      whisper: '0.5px 0.5px 0px var(--shadow-light), -0.5px -0.5px 0px var(--shadow-dark)',
      subtle: '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)',
      soft: '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)',
      medium: '1.5px 1.5px 1px var(--shadow-light), -1.5px -1.5px 1px var(--shadow-dark)',
    };
    return {
      color: 'var(--marble-base)',
      textShadow: shadows[intensity],
    };
  };

  // Letterpress para superficies INSET (cavadas) - sombras invertidas
  const lpInsetStyles = (intensity: 'whisper' | 'subtle' | 'soft' | 'medium'): React.CSSProperties => {
    const shadows: Record<string, string> = {
      whisper: '-0.5px -0.5px 0px var(--shadow-light), 0.5px 0.5px 0px var(--shadow-dark)',
      subtle: '-0.75px -0.75px 0px var(--shadow-light), 0.75px 0.75px 0px var(--shadow-dark)',
      soft: '-1px -1px 1px var(--shadow-light), 1px 1px 1px var(--shadow-dark)',
      medium: '-1.5px -1.5px 1px var(--shadow-light), 1.5px 1.5px 1px var(--shadow-dark)',
    };
    return {
      color: 'var(--marble-base)',
      textShadow: shadows[intensity],
    };
  };

  // Letterpress con color para superficies RAISED
  const lpColorStyles = (color: 'teal' | 'positive' | 'negative' | 'warning'): React.CSSProperties => {
    const colors: Record<string, { color: string; shadow: string }> = {
      teal: {
        color: 'var(--fing-accent-tertiary, #6fb3b5)',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(var(--fing-accent-rgb), 0.4)',
      },
      positive: {
        color: '#7cb89a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(var(--fing-positive-rgb), 0.3)',
      },
      negative: {
        color: '#8a5a4a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(var(--fing-negative-rgb), 0.3)',
      },
      warning: {
        color: '#a08a4a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(var(--fing-warning-rgb), 0.3)',
      },
    };
    return {
      color: colors[color].color,
      textShadow: colors[color].shadow,
    };
  };

  // Letterpress con color para superficies INSET - sombras invertidas
  const lpColorInsetStyles = (color: 'teal' | 'positive' | 'negative' | 'warning'): React.CSSProperties => {
    const colors: Record<string, { color: string; shadow: string }> = {
      teal: {
        color: 'var(--fing-accent-tertiary, #6fb3b5)',
        shadow: '-1px -1px 1px var(--shadow-light), 1px 1px 1px rgba(var(--fing-accent-rgb), 0.4)',
      },
      positive: {
        color: '#7cb89a',
        shadow: '-1px -1px 1px var(--shadow-light), 1px 1px 1px rgba(var(--fing-positive-rgb), 0.3)',
      },
      negative: {
        color: '#8a5a4a',
        shadow: '-1px -1px 1px var(--shadow-light), 1px 1px 1px rgba(var(--fing-negative-rgb), 0.3)',
      },
      warning: {
        color: '#a08a4a',
        shadow: '-1px -1px 1px var(--shadow-light), 1px 1px 1px rgba(var(--fing-warning-rgb), 0.3)',
      },
    };
    return {
      color: colors[color].color,
      textShadow: colors[color].shadow,
    };
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // COLOR DATA
  // ═══════════════════════════════════════════════════════════════════════════

  const marbleColors: ColorToken[] = [
    { name: 'Marble Base', variable: '--marble-base', value: '#d5d8dc', description: 'Fondo principal' },
    { name: 'Marble Light', variable: '--marble-light', value: '#e2e5e9', description: 'Variante clara' },
    { name: 'Marble Dark', variable: '--marble-dark', value: '#c8ccd1', description: 'Variante oscura' },
    { name: 'Shadow Light', variable: '--shadow-light', value: 'rgba(255,255,255,0.95)', description: 'Highlight' },
    { name: 'Shadow Dark', variable: '--shadow-dark', value: 'rgba(147,157,170,0.55)', description: 'Sombra' },
  ];

  const accentColors: ColorToken[] = [
    { name: 'Petrol', variable: '--fing-accent', value: '#3a6a72', description: 'Brand primary' },
    { name: 'Petrol Light', variable: '--fing-accent-light', value: '#4a7a82', description: 'Hover state' },
    { name: 'Petrol Dark', variable: '--fing-accent-dark', value: '#2a5a62', description: 'Active state' },
    { name: 'Steel (Text)', variable: '--fing-text-accent', value: '#4a6a7a', description: 'Secondary accent' },
  ];

  const statusColors: ColorToken[] = [
    { name: 'Positive (Jade)', variable: '--fing-positive', value: '#4a7a6a', description: 'Success - green stone' },
    { name: 'Warning (Gold)', variable: '--fing-warning', value: '#a08a4a', description: 'Warning - pure metal' },
    { name: 'Negative (Rust)', variable: '--fing-negative', value: '#8a5a4a', description: 'Error - iron oxide' },
    { name: 'Info (Steel)', variable: '--fing-info', value: '#4a6a7a', description: 'Info - refined iron' },
  ];

  const glassColors: ColorToken[] = [
    { name: 'Glass BG', variable: '--glass-bg', value: 'rgba(255,255,255,0.25)', description: 'Fondo glass' },
    { name: 'Glass BG Strong', variable: '--glass-bg-strong', value: 'rgba(255,255,255,0.40)', description: 'Glass fuerte' },
    { name: 'Glass Border', variable: '--glass-border', value: 'rgba(255,255,255,0.35)', description: 'Borde glass' },
    { name: 'Glass Teal BG', variable: '--fing-glass-teal-bg', value: 'rgba(58,106,114,0.15)', description: 'Glass teal' },
  ];

  const textColors: ColorToken[] = [
    { name: 'Text Primary', variable: '--fing-text-primary', value: '#252528', description: 'Texto principal' },
    { name: 'Text Secondary', variable: '--fing-text-secondary', value: '#636E72', description: 'Texto secundario' },
    { name: 'Text Tertiary', variable: '--fing-text-tertiary', value: '#9BA4B0', description: 'Texto terciario' },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // COLOR SWATCH COMPONENT
  // ═══════════════════════════════════════════════════════════════════════════

  const ColorSwatch = ({ color }: { color: ColorToken }) => (
    <div style={swatchContainerStyles}>
      <div style={colorBoxStyles(color.variable)} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          ...lpInsetStyles('medium'),
          fontFamily: 'var(--fing-font-primary)',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '4px',
        }}>
          {color.name}
        </div>
        <div style={{
          display: 'inline-block',
          padding: '3px 10px',
          background: 'var(--fing-glass-teal-bg)',
          border: '1px solid var(--fing-glass-teal-border)',
          borderRadius: '100px',
          marginBottom: '4px',
        }}>
          <code style={{
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '10px',
            color: 'var(--fing-glass-teal-text)',
            fontWeight: 500,
          }}>
            {color.variable}
          </code>
        </div>
        <div style={{
          ...lpInsetStyles('whisper'),
          fontFamily: 'var(--fing-font-mono)',
          fontSize: '10px',
        }}>
          {color.value}
        </div>
        {color.description && (
          <div style={{
            ...lpInsetStyles('whisper'),
            fontSize: '10px',
            marginTop: '2px',
            opacity: 0.7,
          }}>
            {color.description}
          </div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div style={showcaseStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <h1 style={headerTitleStyles}>FING Colors</h1>
        <p style={headerSubtitleStyles}>Sistema de colores Stone Marble - Referencia visual de todas las variables</p>
      </header>

      {/* Stone Marble Base */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Stone Marble (Base del Sistema)</div>
        <div style={gridStyles}>
          {marbleColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
      </section>

      {/* Accent Colors */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Colores de Acento (Teal Institucional)</div>
        <div style={gridStyles}>
          {accentColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
        {/* Preview de uso - dentro de inset, usar lpColorInsetStyles */}
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: 'var(--marble-base)',
          borderRadius: '14px',
          boxShadow: 'var(--inset-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}>
          <div style={{
            ...lpColorInsetStyles('teal'),
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '32px',
            fontWeight: 700,
          }}>
            $191,856
          </div>
          <div style={{
            ...lpColorInsetStyles('positive'),
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '18px',
            fontWeight: 600,
          }}>
            +16.5%
          </div>
        </div>
      </section>

      {/* Status Colors */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Colores de Estado (Feedback Semántico)</div>
        <div style={gridStyles}>
          {statusColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
        {/* Preview de uso */}
        <div style={{
          marginTop: '24px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {[
            { label: '+12.5%', style: lpColorStyles('positive') },
            { label: '-8.3%', style: lpColorStyles('negative') },
            { label: 'ALERT', style: lpColorStyles('warning') },
            { label: 'INFO', style: lpColorStyles('teal') },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: '10px 20px',
                background: 'var(--marble-base)',
                borderRadius: '100px',
                boxShadow: 'var(--raised-1)',
              }}
            >
              <span style={{
                ...item.style,
                fontFamily: 'var(--fing-font-mono)',
                fontSize: '13px',
                fontWeight: 600,
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Glass Colors */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Colores Glass (Glassmorphism)</div>
        <div style={gridStyles}>
          {glassColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
        {/* Preview de glass */}
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: 'var(--marble-base)',
          borderRadius: '14px',
          boxShadow: 'var(--inset-3)',
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <div style={{
            padding: '12px 24px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ ...lpStyles('medium'), fontSize: '13px', fontWeight: 500 }}>Glass Item</span>
          </div>
          <div style={{
            padding: '12px 24px',
            background: 'var(--fing-glass-teal-bg)',
            border: '1px solid var(--fing-glass-teal-border)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{
              fontFamily: 'var(--fing-font-primary)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--fing-glass-teal-text)',
            }}>Glass Teal</span>
          </div>
        </div>
      </section>

      {/* Text Colors */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Colores de Texto (Jerarquía Tipográfica)</div>
        <div style={gridStyles}>
          {textColors.map((color) => (
            <ColorSwatch key={color.variable} color={color} />
          ))}
        </div>
        {/* Preview de jerarquía - dentro de inset, usar lpInsetStyles */}
        <div style={{
          marginTop: '24px',
          padding: '24px',
          background: 'var(--marble-base)',
          borderRadius: '14px',
          boxShadow: 'var(--inset-2)',
        }}>
          <div style={{
            ...lpInsetStyles('medium'),
            fontFamily: 'var(--fing-font-display)',
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '8px',
          }}>
            Título Principal
          </div>
          <div style={{
            ...lpInsetStyles('soft'),
            fontFamily: 'var(--fing-font-primary)',
            fontSize: '14px',
            marginBottom: '4px',
          }}>
            Texto secundario con información adicional
          </div>
          <div style={{
            ...lpInsetStyles('whisper'),
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '11px',
          }}>
            // metadata o texto terciario
          </div>
        </div>
      </section>

      {/* RGB Companion System */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>RGB Companions — Opacity System</div>
        <p style={{
          ...lpStyles('subtle'),
          fontSize: '13px',
          marginBottom: '20px',
          lineHeight: 1.6,
        }}>
          Every semantic color has an <code style={{ fontFamily: 'var(--fing-font-mono)', fontSize: '11px' }}>-rgb</code> companion variable
          enabling opacity variations without hardcoding RGBA values.
        </p>

        {/* RGB variable table */}
        <div style={{
          background: 'var(--marble-base)',
          borderRadius: '14px',
          boxShadow: 'var(--inset-2)',
          padding: '20px',
          marginBottom: '20px',
        }}>
          {[
            { name: 'Petrol', var: '--fing-accent-rgb', rgb: '58, 106, 114', hex: '#3a6a72' },
            { name: 'Jade', var: '--fing-positive-rgb', rgb: '74, 122, 106', hex: '#4a7a6a' },
            { name: 'Gold', var: '--fing-warning-rgb', rgb: '160, 138, 74', hex: '#a08a4a' },
            { name: 'Rust', var: '--fing-negative-rgb', rgb: '138, 90, 74', hex: '#8a5a4a' },
            { name: 'Steel', var: '--fing-info-rgb', rgb: '74, 106, 122', hex: '#4a6a7a' },
            { name: 'Charcoal', var: '--fing-black-rgb', rgb: '37, 37, 40', hex: '#252528' },
            { name: 'Border', var: '--fing-border-base-rgb', rgb: '163, 177, 198', hex: '#a3b1c6' },
          ].map((item) => (
            <div key={item.var} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 0',
              borderBottom: '1px solid var(--fing-border-subtle)',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                backgroundColor: item.hex, flexShrink: 0,
                boxShadow: 'var(--raised-1)',
              }} />
              <span style={{
                ...lpInsetStyles('subtle'), fontSize: '12px', fontWeight: 600, width: '70px',
              }}>{item.name}</span>
              <code style={{
                fontFamily: 'var(--fing-font-mono)', fontSize: '10px',
                color: 'var(--fing-accent)', flex: 1,
              }}>{item.var}</code>
              <code style={{
                fontFamily: 'var(--fing-font-mono)', fontSize: '10px',
                ...lpInsetStyles('whisper'),
              }}>{item.rgb}</code>
            </div>
          ))}
        </div>

        {/* Usage example */}
        <div style={{
          background: 'var(--marble-base)',
          borderRadius: '14px',
          boxShadow: 'var(--inset-3)',
          padding: '20px',
          marginBottom: '20px',
        }}>
          <div style={{ ...lpInsetStyles('subtle'), fontSize: '11px', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
            Usage Pattern
          </div>
          <pre style={{
            margin: 0, fontFamily: 'var(--fing-font-mono)', fontSize: '11px', lineHeight: 1.8,
            ...lpInsetStyles('whisper'), whiteSpace: 'pre-wrap',
          }}>
{`/* Before — hardcoded RGBA */
border: 1px solid rgba(var(--fing-accent-rgb), 0.4);
background: rgba(var(--fing-accent-rgb), 0.08);

/* After — RGB companion */
border: 1px solid rgba(var(--fing-accent-rgb), 0.4);
background: rgba(var(--fing-accent-rgb), 0.08);`}
          </pre>
        </div>

        {/* Live opacity scale */}
        <div style={{ ...lpStyles('subtle'), fontSize: '11px', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
          Petrol Opacity Scale
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1.0].map((opacity) => (
            <div key={opacity} style={{
              width: '64px', textAlign: 'center',
              background: 'var(--marble-base)', borderRadius: '12px',
              boxShadow: 'var(--raised-1)', padding: '8px 4px',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '8px', margin: '0 auto 6px',
                backgroundColor: `rgba(var(--fing-accent-rgb), ${opacity})`,
                border: '1px solid var(--fing-border-subtle)',
              }} />
              <code style={{
                fontFamily: 'var(--fing-font-mono)', fontSize: '9px',
                ...lpStyles('whisper'),
              }}>{opacity}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Status System */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Status System — Complete Token Set</div>
        <p style={{
          ...lpStyles('subtle'), fontSize: '13px', marginBottom: '20px', lineHeight: 1.6,
        }}>
          Each semantic color generates a full set of status tokens: base, text, subtle, muted, and border.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {(['positive', 'warning', 'negative', 'info'] as const).map((status) => {
            const names: Record<string, string> = { positive: 'Jade', warning: 'Gold', negative: 'Rust', info: 'Steel' };
            return (
              <div key={status} style={{
                background: 'var(--marble-base)', borderRadius: '14px',
                boxShadow: 'var(--inset-2)', padding: '16px',
              }}>
                <div style={{
                  ...lpInsetStyles('subtle'), fontSize: '12px', fontWeight: 600, marginBottom: '12px',
                  color: `var(--fing-${status})`,
                }}>
                  {names[status]}
                </div>
                {[
                  { label: 'base', var: `--fing-${status}` },
                  { label: 'text', var: `--fing-status-${status}-text` },
                  { label: 'subtle', var: `--fing-status-${status}-subtle` },
                  { label: 'muted', var: `--fing-status-${status}-muted` },
                  { label: 'border', var: `--fing-status-${status}-border` },
                ].map((token) => (
                  <div key={token.var} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '4px 0', fontSize: '10px',
                  }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '4px',
                      backgroundColor: `var(${token.var})`, flexShrink: 0,
                      border: '1px solid var(--fing-border-subtle)',
                    }} />
                    <span style={{ fontFamily: 'var(--fing-font-mono)', ...lpInsetStyles('whisper') }}>
                      {token.label}
                    </span>
                    <code style={{
                      fontFamily: 'var(--fing-font-mono)', fontSize: '9px',
                      color: 'var(--fing-text-accent)', marginLeft: 'auto',
                    }}>
                      {token.var}
                    </code>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* Code Example */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Código de Referencia</div>
        <div style={{
          padding: '24px',
          background: 'var(--marble-base)',
          borderRadius: '14px',
          boxShadow: 'var(--inset-3)',
        }}>
          <pre style={{
            margin: 0,
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '11px',
            lineHeight: 1.6,
            color: 'var(--marble-base)',
            textShadow: '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)',
            whiteSpace: 'pre-wrap',
          }}>
{`/* colors.css — Canonical Source of Truth */
:root {
  /* Base + RGB companion */
  --fing-accent: #3a6a72;
  --fing-accent-rgb: 58, 106, 114;

  /* Use RGB for opacity variations */
  background: rgba(var(--fing-accent-rgb), 0.08);
  border: 1px solid rgba(var(--fing-accent-rgb), 0.4);

  /* Status system (auto-derived) */
  --fing-status-positive-subtle: rgba(var(--fing-positive-rgb), 0.15);
  --fing-status-positive-muted: rgba(var(--fing-positive-rgb), 0.1);
  --fing-status-positive-border: rgba(var(--fing-positive-rgb), 0.3);

  /* Letterpress uses RGB too */
  --lp-positive: 0.5px 0.5px 0px rgba(255,255,255,0.9),
    -0.5px -0.5px 0px rgba(var(--fing-positive-rgb), 0.25);
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default ColorsShowcase;
