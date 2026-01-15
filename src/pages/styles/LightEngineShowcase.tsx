// Path: src/pages/styles/LightEngineShowcase.tsx
// SENTINEL Light Engine Showcase - Sistema de Iluminacion Unificado
import React, { useState } from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function LightEngineShowcase() {
  const [activeElevation, setActiveElevation] = useState(3);

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '48px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 300,
    color: 'var(--sentinel-text-primary)',
    marginBottom: '12px',
    fontFamily: 'var(--sentinel-font-display)',
    letterSpacing: '-0.02em'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-primary)',
    lineHeight: 1.7,
    maxWidth: '700px'
  };

  const sectionHeaderStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--sentinel-accent-primary)',
    marginTop: '64px',
    marginBottom: '24px',
    fontFamily: 'var(--sentinel-font-primary)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    borderBottom: '1px solid var(--sentinel-border-subtle)',
    paddingBottom: '12px'
  };

  const conceptBoxStyles: React.CSSProperties = {
    padding: '24px',
    backgroundColor: 'var(--sentinel-glass-bg)',
    backdropFilter: 'blur(12px)',
    borderRadius: 'var(--sentinel-radius-lg)',
    border: '1px solid var(--sentinel-glass-border)',
    marginBottom: '24px'
  };

  const codeBlockStyles: React.CSSProperties = {
    fontFamily: 'var(--sentinel-font-mono)',
    fontSize: '12px',
    backgroundColor: 'var(--sentinel-bg-void)',
    color: 'var(--sentinel-text-secondary)',
    padding: '16px',
    borderRadius: 'var(--sentinel-radius-md)',
    overflow: 'auto',
    lineHeight: 1.6
  };

  // Demo box base styles
  const demoBoxBase: React.CSSProperties = {
    width: '140px',
    height: '140px',
    backgroundColor: 'var(--sentinel-bg-surface)',
    borderRadius: 'var(--sentinel-radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '8px',
    transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <div style={{ padding: '32px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>Light Engine</h1>
        <p style={descStyles}>
          Motor de iluminacion unificado basado en los principios de Josh W. Comeau.
          Una sola fuente de luz global afecta todos los elementos, creando sombras
          consistentes, profesionales y con profundidad realista.
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* PHILOSOPHY SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Filosofia del Sistema</h2>

      <div style={conceptBoxStyles}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '12px' }}>
              Una Fuente de Luz
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--sentinel-text-secondary)', lineHeight: 1.6 }}>
              Todos los elementos comparten la misma direccion de luz (arriba-izquierda).
              Esto crea coherencia visual y simula un ambiente fisico real.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '12px' }}>
              Ratio Consistente
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--sentinel-text-secondary)', lineHeight: 1.6 }}>
              Offset vertical = 2x offset horizontal. Este ratio se mantiene
              en todos los niveles de elevacion para simular la misma fuente de luz.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '12px' }}>
              Sombras en Capas
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--sentinel-text-secondary)', lineHeight: 1.6 }}>
              Multiples box-shadows apiladas crean profundidad progresiva.
              Cada capa tiene offset y blur incrementales para realismo.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* LAYERED SHADOWS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Sombras en Capas (Layered Shadows)</h2>

      <ShowcaseSection
        title="Sistema de Elevacion"
        description="5 niveles de elevacion con sombras multicapa. Cada nivel agrega mas capas para mayor profundidad."
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-base)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`elevation-${level}`}
                style={{
                  ...demoBoxBase,
                  cursor: 'pointer',
                  border: activeElevation === level ? '2px solid var(--sentinel-accent-primary)' : '2px solid transparent'
                }}
                onClick={() => setActiveElevation(level)}
              >
                <span style={{
                  fontFamily: 'var(--sentinel-font-display)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--sentinel-text-primary)'
                }}>
                  {level}
                </span>
                <span style={{
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '11px',
                  color: 'var(--sentinel-text-tertiary)'
                }}>
                  {level} capas
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <div style={conceptBoxStyles}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sentinel-accent-primary)', marginBottom: '12px' }}>
          Elevation {activeElevation} - Codigo CSS
        </h4>
        <pre style={codeBlockStyles}>
{activeElevation === 1 ? `--elevation-1:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.12),
  1px 2px 2px hsl(var(--shadow-color) / 0.08);

/* 2 capas: sombra crisp + sombra difusa */` :
activeElevation === 2 ? `--elevation-2:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.10),
  1px 2px 2px hsl(var(--shadow-color) / 0.10),
  2px 4px 4px hsl(var(--shadow-color) / 0.10);

/* 3 capas: progresion geometrica de blur */` :
activeElevation === 3 ? `--elevation-3:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.07),
  1px 2px 2px hsl(var(--shadow-color) / 0.07),
  2px 4px 4px hsl(var(--shadow-color) / 0.07),
  4px 8px 8px hsl(var(--shadow-color) / 0.07);

/* 4 capas: ideal para cards y paneles */` :
activeElevation === 4 ? `--elevation-4:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.06),
  1px 2px 2px hsl(var(--shadow-color) / 0.06),
  2px 4px 4px hsl(var(--shadow-color) / 0.06),
  4px 8px 8px hsl(var(--shadow-color) / 0.06),
  8px 16px 16px hsl(var(--shadow-color) / 0.06);

/* 5 capas: dropdowns y popovers */` :
`--elevation-5:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.04),
  1px 2px 2px hsl(var(--shadow-color) / 0.04),
  2px 4px 4px hsl(var(--shadow-color) / 0.04),
  4px 8px 8px hsl(var(--shadow-color) / 0.04),
  8px 16px 16px hsl(var(--shadow-color) / 0.04),
  16px 32px 32px hsl(var(--shadow-color) / 0.04);

/* 6 capas: maxima elevacion para modales */`}
        </pre>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* NEUMORPHIC SYSTEM */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Neumorfismo con Fuente de Luz Unificada</h2>

      <ShowcaseSection
        title="Elevaciones Neumorficas"
        description="El neumorfismo usa dos sombras opuestas. El highlight sigue la direccion de la luz, la sombra va en direccion opuesta."
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-base)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`neu-elevation-${level}`}
                style={{
                  ...demoBoxBase,
                  backgroundColor: 'var(--sentinel-bg-base)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--sentinel-font-display)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--sentinel-text-primary)'
                }}>
                  Neu {level}
                </span>
                <span style={{
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '11px',
                  color: 'var(--sentinel-text-tertiary)'
                }}>
                  elevated
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estados Inset (Hundidos)"
        description="Para inputs y elementos que necesitan verse 'dentro' de la superficie."
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-base)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`neu-inset-${level}`}
                style={{
                  ...demoBoxBase,
                  backgroundColor: 'var(--sentinel-bg-base)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--sentinel-font-display)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--sentinel-text-primary)'
                }}>
                  Inset {level}
                </span>
                <span style={{
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '11px',
                  color: 'var(--sentinel-text-tertiary)'
                }}>
                  hundido
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* GLASS SYSTEM */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Glassmorphism con Reflexion de Luz</h2>

      <ShowcaseSection
        title="Elevaciones Glass"
        description="El vidrio refleja luz en el borde superior-izquierdo (donde impacta la luz) y proyecta sombra hacia abajo-derecha."
      >
        <ComponentPreview>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`glass-elevation-${level}`}
                style={{
                  ...demoBoxBase,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--sentinel-font-display)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}>
                  Glass {level}
                </span>
                <span style={{
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  + reflexion
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* COLOR-TINTED SHADOWS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Sombras con Color (Color-Matched)</h2>

      <ShowcaseSection
        title="Sombras Tintadas por Contexto"
        description="Las sombras heredan el tono del elemento o fondo, nunca son negro puro. Esto evita el efecto 'niebla gris'."
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-base)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div
              className="shadow-positive"
              style={{
                ...demoBoxBase,
                backgroundColor: 'var(--sentinel-status-positive-subtle)',
                border: '1px solid var(--sentinel-status-positive-border)',
              }}
            >
              <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-status-positive-text)' }}>
                Positive
              </span>
              <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: 'var(--sentinel-status-positive-text)' }}>
                hsl(145 40% 25%)
              </span>
            </div>

            <div
              className="shadow-negative"
              style={{
                ...demoBoxBase,
                backgroundColor: 'var(--sentinel-status-negative-subtle)',
                border: '1px solid var(--sentinel-status-negative-border)',
              }}
            >
              <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-status-negative-text)' }}>
                Negative
              </span>
              <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: 'var(--sentinel-status-negative-text)' }}>
                hsl(0 50% 35%)
              </span>
            </div>

            <div
              className="shadow-warning"
              style={{
                ...demoBoxBase,
                backgroundColor: 'var(--sentinel-status-warning-subtle)',
                border: '1px solid var(--sentinel-status-warning-border)',
              }}
            >
              <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-status-warning-text)' }}>
                Warning
              </span>
              <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: 'var(--sentinel-status-warning-text)' }}>
                hsl(38 50% 30%)
              </span>
            </div>

            <div
              className="shadow-accent"
              style={{
                ...demoBoxBase,
                backgroundColor: 'var(--sentinel-accent-subtle)',
                border: '1px solid var(--sentinel-border-accent)',
              }}
            >
              <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-accent-primary)' }}>
                Accent
              </span>
              <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: 'var(--sentinel-accent-secondary)' }}>
                hsl(181 35% 30%)
              </span>
            </div>

            <div
              className="shadow-info"
              style={{
                ...demoBoxBase,
                backgroundColor: 'var(--sentinel-status-info-subtle)',
                border: '1px solid var(--sentinel-status-info-border)',
              }}
            >
              <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-status-info-text)' }}>
                Info
              </span>
              <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: 'var(--sentinel-status-info-text)' }}>
                hsl(210 50% 30%)
              </span>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* INTERACTIVE STATES */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Estados Interactivos</h2>

      <ShowcaseSection
        title="Hover, Active, Focus"
        description="La elevacion cambia con la interaccion. Usamos transform en lugar de animar box-shadow directamente para mejor performance."
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-base)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '48px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {/* Layered Interactive */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="elevation-interactive"
                style={{
                  ...demoBoxBase,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                  Layered
                </span>
                <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>
                  hover me
                </span>
              </div>
              <p style={{ marginTop: '12px', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>
                .elevation-interactive
              </p>
            </div>

            {/* Neumorphic Interactive */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="neu-interactive"
                style={{
                  ...demoBoxBase,
                  backgroundColor: 'var(--sentinel-bg-base)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                  Neumorphic
                </span>
                <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>
                  hover me
                </span>
              </div>
              <p style={{ marginTop: '12px', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>
                .neu-interactive
              </p>
            </div>

            {/* Glass Interactive */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="glass-interactive"
                style={{
                  ...demoBoxBase,
                  backgroundColor: 'var(--sentinel-glass-bg)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--sentinel-glass-border)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                  Glass
                </span>
                <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>
                  hover me
                </span>
              </div>
              <p style={{ marginTop: '12px', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>
                .glass-interactive
              </p>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* COMPONENT PRESETS */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Presets para Componentes</h2>

      <ShowcaseSection
        title="Sombras Semanticas"
        description="Clases pre-configuradas para casos de uso comunes"
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-base)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            {/* Card */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="shadow-card"
                style={{
                  ...demoBoxBase,
                  width: '100%',
                  height: '120px',
                }}
              >
                <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                  Card
                </span>
              </div>
              <code style={{ fontSize: '11px', color: 'var(--sentinel-accent-primary)' }}>.shadow-card</code>
            </div>

            {/* Button */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="shadow-button"
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: 'var(--sentinel-accent-primary)',
                  borderRadius: 'var(--sentinel-radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 200ms ease'
                }}
              >
                <span style={{ fontFamily: 'var(--sentinel-font-primary)', fontSize: '14px', fontWeight: 500, color: 'white' }}>
                  Button
                </span>
              </div>
              <code style={{ marginTop: '12px', display: 'block', fontSize: '11px', color: 'var(--sentinel-accent-primary)' }}>.shadow-button</code>
            </div>

            {/* Input */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="shadow-input"
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: 'var(--sentinel-bg-base)',
                  borderRadius: 'var(--sentinel-radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                }}
              >
                <span style={{ fontFamily: 'var(--sentinel-font-primary)', fontSize: '14px', color: 'var(--sentinel-text-tertiary)' }}>
                  Input field...
                </span>
              </div>
              <code style={{ marginTop: '12px', display: 'block', fontSize: '11px', color: 'var(--sentinel-accent-primary)' }}>.shadow-input</code>
            </div>

            {/* Dropdown */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="shadow-dropdown"
                style={{
                  ...demoBoxBase,
                  width: '100%',
                  height: '160px',
                }}
              >
                <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                  Dropdown
                </span>
              </div>
              <code style={{ fontSize: '11px', color: 'var(--sentinel-accent-primary)' }}>.shadow-dropdown</code>
            </div>

            {/* Modal */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="shadow-modal"
                style={{
                  ...demoBoxBase,
                  width: '100%',
                  height: '160px',
                }}
              >
                <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                  Modal
                </span>
              </div>
              <code style={{ fontSize: '11px', color: 'var(--sentinel-accent-primary)' }}>.shadow-modal</code>
            </div>

            {/* Tooltip */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="shadow-tooltip"
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: 'var(--sentinel-bg-surface)',
                  borderRadius: 'var(--sentinel-radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontFamily: 'var(--sentinel-font-primary)', fontSize: '12px', color: 'var(--sentinel-text-primary)' }}>
                  Tooltip text
                </span>
              </div>
              <code style={{ marginTop: '12px', display: 'block', fontSize: '11px', color: 'var(--sentinel-accent-primary)' }}>.shadow-tooltip</code>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* USAGE GUIDE */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Guia de Uso</h2>

      <div style={conceptBoxStyles}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '16px' }}>
          Variables CSS Disponibles
        </h4>
        <pre style={codeBlockStyles}>
{`/* Elevaciones Layered (multicapa) */
--elevation-1 ... --elevation-5

/* Elevaciones Neumorficas */
--neu-elevation-1 ... --neu-elevation-5

/* Inset Neumorficos */
--neu-inset-1 ... --neu-inset-3

/* Elevaciones Glass */
--glass-elevation-1 ... --glass-elevation-4

/* Sombras con Color */
--shadow-positive
--shadow-negative
--shadow-warning
--shadow-accent
--shadow-info

/* Estados Interactivos */
--elevation-hover
--elevation-pressed
--elevation-focus`}
        </pre>
      </div>

      <div style={conceptBoxStyles}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '16px' }}>
          Clases Utilitarias
        </h4>
        <pre style={codeBlockStyles}>
{`/* Aplicar directamente */
<div class="elevation-3">Card con sombra layered</div>
<div class="neu-elevation-2">Elemento neumorphic</div>
<div class="glass-elevation-2">Panel de vidrio</div>

/* Interactivos (incluyen hover/active) */
<button class="elevation-interactive">...</button>
<button class="neu-interactive">...</button>
<button class="glass-interactive">...</button>

/* Presets semanticos */
<div class="shadow-card">...</div>
<button class="shadow-button">...</button>
<input class="shadow-input" />
<div class="shadow-dropdown">...</div>
<div class="shadow-modal">...</div>`}
        </pre>
      </div>

      <div style={conceptBoxStyles}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '16px' }}>
          Performance: Animar Correctamente
        </h4>
        <pre style={codeBlockStyles}>
{`/* MAL: Animar box-shadow directamente (costoso) */
.card {
  box-shadow: var(--elevation-2);
  transition: box-shadow 300ms;
}
.card:hover {
  box-shadow: var(--elevation-4);  /* Repaint costoso */
}

/* BIEN: Animar transform, pre-definir sombras */
.card {
  box-shadow: var(--elevation-hover);  /* Sombra "flotante" */
  transition: transform 300ms;
}
.card:hover {
  transform: translateY(-4px);  /* GPU-accelerated */
}`}
        </pre>
      </div>

    </div>
  );
}

export default LightEngineShowcase;
