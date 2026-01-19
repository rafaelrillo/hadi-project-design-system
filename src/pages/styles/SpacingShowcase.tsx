// Path: src/pages/styles/SpacingShowcase.tsx
// SENTINEL Design System - Stone Marble Spacing
import React from 'react';

interface SpacingToken {
  name: string;
  variable: string;
  value: string;
  usage: string;
}

export function SpacingShowcase() {
  // ═══════════════════════════════════════════════════════════════════════════
  // STYLES - Stone Marble Design System
  // ═══════════════════════════════════════════════════════════════════════════

  const showcaseStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: 'var(--marble-base)',
    padding: '32px',
    fontFamily: 'var(--sentinel-font-primary)',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '32px',
  };

  const headerTitleStyles: React.CSSProperties = {
    fontFamily: 'var(--sentinel-font-display)',
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
    fontFamily: 'var(--sentinel-font-primary)',
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

  // ═══════════════════════════════════════════════════════════════════════════
  // SPACING DATA
  // ═══════════════════════════════════════════════════════════════════════════

  const spacingScale: SpacingToken[] = [
    { name: 'Extra Small', variable: '--spacing-xs', value: '5px', usage: 'Espaciado mínimo entre elementos' },
    { name: 'Small', variable: '--spacing-sm', value: '10px', usage: 'Espaciado pequeño entre elementos relacionados' },
    { name: 'Medium', variable: '--spacing-md', value: '15px', usage: 'Espaciado medio entre secciones relacionadas' },
    { name: 'Large', variable: '--spacing-lg', value: '20px', usage: 'Espaciado estándar entre elementos y secciones' },
    { name: 'Extra Large', variable: '--spacing-xl', value: '30px', usage: 'Espaciado grande entre secciones principales' },
    { name: '2X Large', variable: '--spacing-2xl', value: '40px', usage: 'Espaciado extra grande para separación de bloques' },
  ];

  const specialSpacings: SpacingToken[] = [
    { name: 'Content Padding', variable: '--content-padding', value: '30px', usage: 'Padding del área de contenido principal' },
    { name: 'Gap Elements', variable: '--gap-elements', value: '20px', usage: 'Gap estándar entre elementos (grid, flex)' },
    { name: 'Container Padding', variable: '--container-padding', value: '20px', usage: 'Padding interno de contenedores' },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPONENTS
  // ═══════════════════════════════════════════════════════════════════════════

  const SpacingSample = ({ token }: { token: SpacingToken }) => (
    <div style={{
      background: 'var(--marble-base)',
      borderRadius: '14px',
      boxShadow: 'var(--inset-2)',
      padding: '16px 20px',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    }}>
      {/* Visual representation - RAISED element inside INSET container */}
      <div style={{
        width: token.value,
        minWidth: '40px',
        height: '40px',
        background: 'var(--marble-base)',
        borderRadius: '10px',
        boxShadow: 'var(--raised-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Text on RAISED surface uses lpStyles */}
        <span style={{
          ...lpStyles('subtle'),
          fontSize: '10px',
          fontWeight: 600,
          fontFamily: 'var(--sentinel-font-mono)',
        }}>
          {token.value}
        </span>
      </div>

      {/* Info - on INSET surface */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          ...lpInsetStyles('medium'),
          fontFamily: 'var(--sentinel-font-primary)',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '6px',
        }}>
          {token.name}
        </div>
        <div style={{
          display: 'inline-block',
          padding: '3px 10px',
          background: 'var(--sentinel-glass-teal-bg)',
          border: '1px solid var(--sentinel-glass-teal-border)',
          borderRadius: '100px',
          marginBottom: '6px',
        }}>
          <code style={{
            fontFamily: 'var(--sentinel-font-mono)',
            fontSize: '10px',
            color: 'var(--sentinel-glass-teal-text)',
            fontWeight: 500,
          }}>
            {token.variable}
          </code>
        </div>
        <div style={{
          ...lpInsetStyles('whisper'),
          fontFamily: 'var(--sentinel-font-mono)',
          fontSize: '10px',
        }}>
          {token.usage}
        </div>
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
        <h1 style={headerTitleStyles}>SENTINEL Spacing</h1>
        <p style={headerSubtitleStyles}>Sistema de espaciado Stone Marble - Escala basada en 5px</p>
      </header>

      {/* Spacing Scale */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Escala de Espaciado</div>
        <div>
          {spacingScale.map((token) => (
            <SpacingSample key={token.variable} token={token} />
          ))}
        </div>

        {/* Visual Scale Preview */}
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: 'var(--marble-base)',
          borderRadius: '14px',
          boxShadow: 'var(--inset-2)',
        }}>
          <div style={{
            ...lpInsetStyles('whisper'),
            fontFamily: 'var(--sentinel-font-mono)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Visual Scale
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', flexWrap: 'wrap' }}>
            {spacingScale.map((token) => (
              <div
                key={token.variable}
                style={{
                  width: token.value,
                  height: token.value,
                  background: 'var(--marble-base)',
                  borderRadius: '8px',
                  boxShadow: 'var(--raised-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{
                  ...lpStyles('whisper'),
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '8px',
                  fontWeight: 600,
                }}>
                  {token.value.replace('px', '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Spacings */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Espaciados Especiales</div>
        <div>
          {specialSpacings.map((token) => (
            <SpacingSample key={token.variable} token={token} />
          ))}
        </div>
      </section>

      {/* Usage Example */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Ejemplo de Uso</div>
        <div style={{
          background: 'var(--marble-base)',
          borderRadius: '14px',
          boxShadow: 'var(--inset-3)',
          padding: '24px',
        }}>
          <div style={{
            ...lpInsetStyles('whisper'),
            fontFamily: 'var(--sentinel-font-mono)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Card Layout Example
          </div>

          {/* Demo card inside inset - this is RAISED */}
          <div style={{
            background: 'var(--marble-base)',
            borderRadius: '14px',
            boxShadow: 'var(--raised-2)',
            padding: '20px', // --container-padding
          }}>
            <div style={{
              ...lpStyles('medium'),
              fontFamily: 'var(--sentinel-font-display)',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '10px', // --spacing-sm
            }}>
              Card Title
            </div>
            <div style={{
              ...lpStyles('whisper'),
              fontFamily: 'var(--sentinel-font-primary)',
              fontSize: '12px',
              marginBottom: '20px', // --spacing-lg
            }}>
              Content with proper spacing between elements
            </div>
            <div style={{ display: 'flex', gap: '10px' }}> {/* --spacing-sm */}
              <div style={{
                padding: '8px 16px',
                background: 'var(--sentinel-glass-teal-bg)',
                border: '1px solid var(--sentinel-glass-teal-border)',
                borderRadius: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--sentinel-glass-teal-text)',
                }}>
                  Action 1
                </span>
              </div>
              <div style={{
                padding: '8px 16px',
                background: 'var(--sentinel-glass-teal-bg)',
                border: '1px solid var(--sentinel-glass-teal-border)',
                borderRadius: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--sentinel-font-primary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--sentinel-glass-teal-text)',
                }}>
                  Action 2
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Reference */}
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
            fontFamily: 'var(--sentinel-font-mono)',
            fontSize: '11px',
            lineHeight: 1.6,
            color: 'var(--marble-base)',
            textShadow: '-0.75px -0.75px 0px var(--shadow-light), 0.75px 0.75px 0px var(--shadow-dark)',
            whiteSpace: 'pre-wrap',
          }}>
{`:root {
  /* Base Scale (5px increments) */
  --spacing-xs: 5px;
  --spacing-sm: 10px;
  --spacing-md: 15px;
  --spacing-lg: 20px;
  --spacing-xl: 30px;
  --spacing-2xl: 40px;

  /* Special Spacings */
  --content-padding: 30px;
  --gap-elements: 20px;
  --container-padding: 20px;
}

/* Usage Examples */
.card {
  padding: var(--container-padding);
  margin-bottom: var(--spacing-lg);
  border-radius: 14px;
}

.section {
  padding: var(--content-padding);
  gap: var(--gap-elements);
}

.button-group {
  display: flex;
  gap: var(--spacing-sm);
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default SpacingShowcase;
