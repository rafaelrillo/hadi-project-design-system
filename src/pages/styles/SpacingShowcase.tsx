// Path: src/pages/styles/SpacingShowcase.tsx
// FING Design System - Stone Marble Spacing
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

  // Core scale (4px base, Tailwind-like)
  const spacingScale: SpacingToken[] = [
    { name: 'Space 0', variable: '--fing-space-0', value: '0', usage: 'Sin espaciado' },
    { name: 'Space 1', variable: '--fing-space-1', value: '4px', usage: 'Espaciado mínimo, gaps pequeños' },
    { name: 'Space 2', variable: '--fing-space-2', value: '8px', usage: 'Espaciado pequeño entre elementos' },
    { name: 'Space 3', variable: '--fing-space-3', value: '12px', usage: 'Espaciado entre elementos relacionados' },
    { name: 'Space 4', variable: '--fing-space-4', value: '16px', usage: 'Espaciado estándar (1rem)' },
    { name: 'Space 5', variable: '--fing-space-5', value: '20px', usage: 'Padding de contenedores pequeños' },
    { name: 'Space 6', variable: '--fing-space-6', value: '24px', usage: 'Padding de cards, secciones' },
    { name: 'Space 8', variable: '--fing-space-8', value: '32px', usage: 'Padding de paneles, páginas' },
    { name: 'Space 10', variable: '--fing-space-10', value: '40px', usage: 'Separación entre secciones' },
    { name: 'Space 12', variable: '--fing-space-12', value: '48px', usage: 'Espaciado extra grande' },
    { name: 'Space 16', variable: '--fing-space-16', value: '64px', usage: 'Separación de bloques principales' },
  ];

  // Semantic aliases
  const specialSpacings: SpacingToken[] = [
    { name: 'Component', variable: '--fing-space-component', value: '16px', usage: 'Espaciado interno de componentes (= space-4)' },
    { name: 'Card', variable: '--fing-space-card', value: '24px', usage: 'Padding de cards (= space-6)' },
    { name: 'Section', variable: '--fing-space-section', value: '40px', usage: 'Separación entre secciones (= space-10)' },
    { name: 'Page', variable: '--fing-space-page', value: '32px', usage: 'Padding de página (= space-8)' },
    { name: 'Content Padding', variable: '--content-padding', value: '24px', usage: 'Padding del área de contenido (= space-6)' },
    { name: 'Gap Elements', variable: '--gap-elements', value: '16px', usage: 'Gap estándar entre elementos (= space-4)' },
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
          fontFamily: 'var(--fing-font-mono)',
        }}>
          {token.value}
        </span>
      </div>

      {/* Info - on INSET surface */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          ...lpInsetStyles('medium'),
          fontFamily: 'var(--fing-font-primary)',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '6px',
        }}>
          {token.name}
        </div>
        <div style={{
          display: 'inline-block',
          padding: '3px 10px',
          background: 'var(--fing-glass-teal-bg)',
          border: '1px solid var(--fing-glass-teal-border)',
          borderRadius: '100px',
          marginBottom: '6px',
        }}>
          <code style={{
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '10px',
            color: 'var(--fing-glass-teal-text)',
            fontWeight: 500,
          }}>
            {token.variable}
          </code>
        </div>
        <div style={{
          ...lpInsetStyles('whisper'),
          fontFamily: 'var(--fing-font-mono)',
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
        <h1 style={headerTitleStyles}>FING Spacing</h1>
        <p style={headerSubtitleStyles}>Sistema de espaciado Stone Marble - Escala basada en 4px (rem)</p>
      </header>

      {/* Spacing Scale */}
      <section style={sectionStyles}>
        <div style={sectionTitleStyles}>Escala Base (--fing-space-*)</div>
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
            fontFamily: 'var(--fing-font-mono)',
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
                  fontFamily: 'var(--fing-font-mono)',
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
        <div style={sectionTitleStyles}>Aliases Semánticos</div>
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
            fontFamily: 'var(--fing-font-mono)',
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
            padding: '20px', // --fing-space-5
          }}>
            <div style={{
              ...lpStyles('medium'),
              fontFamily: 'var(--fing-font-display)',
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '12px', // --fing-space-3
            }}>
              Card Title
            </div>
            <div style={{
              ...lpStyles('whisper'),
              fontFamily: 'var(--fing-font-primary)',
              fontSize: '12px',
              marginBottom: '16px', // --fing-space-4
            }}>
              Content with proper spacing between elements
            </div>
            <div style={{ display: 'flex', gap: '8px' }}> {/* --fing-space-2 */}
              <div style={{
                padding: '8px 16px',
                background: 'var(--fing-glass-teal-bg)',
                border: '1px solid var(--fing-glass-teal-border)',
                borderRadius: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--fing-font-primary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--fing-glass-teal-text)',
                }}>
                  Action 1
                </span>
              </div>
              <div style={{
                padding: '8px 16px',
                background: 'var(--fing-glass-teal-bg)',
                border: '1px solid var(--fing-glass-teal-border)',
                borderRadius: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--fing-font-primary)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--fing-glass-teal-text)',
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
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '11px',
            lineHeight: 1.6,
            color: 'var(--marble-base)',
            textShadow: '-0.75px -0.75px 0px var(--shadow-light), 0.75px 0.75px 0px var(--shadow-dark)',
            whiteSpace: 'pre-wrap',
          }}>
{`:root {
  /* Base Scale (4px base, Tailwind-like) */
  --fing-space-0: 0;
  --fing-space-1: 0.25rem;     /* 4px */
  --fing-space-2: 0.5rem;      /* 8px */
  --fing-space-3: 0.75rem;     /* 12px */
  --fing-space-4: 1rem;        /* 16px */
  --fing-space-5: 1.25rem;     /* 20px */
  --fing-space-6: 1.5rem;      /* 24px */
  --fing-space-8: 2rem;        /* 32px */
  --fing-space-10: 2.5rem;     /* 40px */
  --fing-space-12: 3rem;       /* 48px */
  --fing-space-16: 4rem;       /* 64px */

  /* Semantic Aliases */
  --fing-space-component: var(--fing-space-4);
  --fing-space-card: var(--fing-space-6);
  --fing-space-section: var(--fing-space-10);
  --fing-space-page: var(--fing-space-8);
  --content-padding: var(--fing-space-6);
  --gap-elements: var(--fing-space-4);
}

/* Usage Examples */
.card {
  padding: var(--fing-space-card);
  margin-bottom: var(--fing-space-6);
  border-radius: 14px;
}

.section {
  padding: var(--fing-space-section);
  gap: var(--fing-space-4);
}

.button-group {
  display: flex;
  gap: var(--fing-space-2);
}`}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default SpacingShowcase;
