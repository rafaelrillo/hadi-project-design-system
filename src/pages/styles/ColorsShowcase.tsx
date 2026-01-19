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
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(58, 106, 114, 0.4)',
      },
      positive: {
        color: '#7cb89a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(22, 163, 74, 0.3)',
      },
      negative: {
        color: '#8a5a4a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(220, 38, 38, 0.3)',
      },
      warning: {
        color: '#a08a4a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(217, 119, 6, 0.3)',
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
        shadow: '-1px -1px 1px var(--shadow-light), 1px 1px 1px rgba(58, 106, 114, 0.4)',
      },
      positive: {
        color: '#7cb89a',
        shadow: '-1px -1px 1px var(--shadow-light), 1px 1px 1px rgba(22, 163, 74, 0.3)',
      },
      negative: {
        color: '#8a5a4a',
        shadow: '-1px -1px 1px var(--shadow-light), 1px 1px 1px rgba(220, 38, 38, 0.3)',
      },
      warning: {
        color: '#a08a4a',
        shadow: '-1px -1px 1px var(--shadow-light), 1px 1px 1px rgba(217, 119, 6, 0.3)',
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
    { name: 'Accent Primary', variable: '--fing-accent-primary', value: '#3a6a72', description: 'Teal principal' },
    { name: 'Accent Secondary', variable: '--fing-accent-secondary', value: '#5ba3a5', description: 'Teal secundario' },
    { name: 'Accent Tertiary', variable: '--fing-accent-tertiary', value: '#6fb3b5', description: 'Teal claro' },
  ];

  const statusColors: ColorToken[] = [
    { name: 'Positive', variable: '--fing-status-positive', value: '#4a7a6a', description: 'Success' },
    { name: 'Negative', variable: '--fing-status-negative', value: '#b85c5c', description: 'Error' },
    { name: 'Warning', variable: '--fing-status-warning', value: '#c4a35a', description: 'Warning' },
    { name: 'Info', variable: '--fing-status-info', value: '#5a8fb8', description: 'Info' },
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
{`:root {
  /* Stone Marble Base */
  --marble-base: #d5d8dc;
  --marble-light: #e2e5e9;
  --marble-dark: #c8ccd1;

  /* Shadows */
  --shadow-light: rgba(255, 255, 255, 0.95);
  --shadow-dark: rgba(147, 157, 170, 0.55);

  /* Raised Levels (1-5) */
  --raised-1: 2px 2px 4px var(--shadow-dark), -2px -2px 4px var(--shadow-light);
  --raised-2: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light);

  /* Inset Levels (1-5) */
  --inset-1: inset 2px 2px 4px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light);
  --inset-2: inset 3px 3px 6px var(--shadow-dark), inset -3px -3px 6px var(--shadow-light);

  /* Glass */
  --glass-bg: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.35);
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default ColorsShowcase;
