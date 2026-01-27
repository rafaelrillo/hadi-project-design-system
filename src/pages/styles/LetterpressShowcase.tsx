// Path: src/pages/styles/LetterpressShowcase.tsx
// FING Design System - Letterpress Text Shadows Showcase
import React from 'react';
import { ShowcaseSection } from '../../components/showcase';

// ═══════════════════════════════════════════════════════════════════════════════
// LETTERPRESS SHOWCASE
// Demuestra el sistema de letterpress extraído del Home
// ═══════════════════════════════════════════════════════════════════════════════

export function LetterpressShowcase() {
  const MARBLE = {
    base: '#d5d8dc',
    dark: '#c8ccd1',
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: 'var(--raised-3)',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--fing-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--fing-text-secondary)',
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  };

  // Letterpress Card - RAISED container
  const cardStyles: React.CSSProperties = {
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '16px',
    boxShadow: 'var(--raised-2)',
  };

  // Letterpress Card - INSET container
  const insetCardStyles: React.CSSProperties = {
    padding: '24px',
    background: MARBLE.dark,
    borderRadius: '16px',
    boxShadow: 'var(--inset-2)',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 500,
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'var(--fing-text-muted)',
    marginBottom: '8px',
  };

  const codeStyles: React.CSSProperties = {
    fontSize: '11px',
    fontFamily: 'var(--fing-font-mono)',
    color: 'var(--fing-text-tertiary)',
    marginTop: '12px',
    padding: '8px 12px',
    background: 'var(--marble-dark)',
    borderRadius: '6px',
    boxShadow: 'var(--inset-1)',
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // LETTERPRESS DEFINITIONS
  // ═══════════════════════════════════════════════════════════════════════════════

  const semanticLetterpress = [
    {
      name: '--lp-primary',
      color: 'var(--fing-black)',
      label: 'Charcoal',
      description: 'Primary text on RAISED containers',
    },
    {
      name: '--lp-primary-strong',
      color: 'var(--fing-black)',
      label: 'Charcoal Strong',
      description: 'Larger primary text',
    },
    {
      name: '--lp-positive',
      color: 'var(--fing-positive)',
      label: 'Jade',
      description: 'Success/positive text',
    },
    {
      name: '--lp-warning',
      color: 'var(--fing-warning)',
      label: 'Gold',
      description: 'Warning text',
    },
    {
      name: '--lp-negative',
      color: 'var(--fing-negative)',
      label: 'Rust',
      description: 'Error/negative text',
    },
    {
      name: '--lp-info',
      color: 'var(--fing-info)',
      label: 'Steel',
      description: 'Info text',
    },
    {
      name: '--lp-accent',
      color: 'var(--fing-accent)',
      label: 'Petrol',
      description: 'Brand accent text',
    },
  ];

  const contextLetterpress = [
    {
      name: '--lp-steel',
      color: 'var(--fing-text-accent)',
      label: 'Steel',
      description: 'Secondary text accent',
    },
    {
      name: '--lp-petrol',
      color: 'var(--fing-accent)',
      label: 'Petrol',
      description: 'Brand accent buttons',
    },
    {
      name: '--lp-petrol-whisper',
      color: 'var(--fing-accent)',
      label: 'Petrol Whisper',
      description: 'Subtle petrol (wordmark, highlights)',
    },
    {
      name: '--lp-muted',
      color: 'var(--fing-text-muted)',
      label: 'Muted',
      description: 'Muted/subtle text',
    },
  ];

  const embossedLetterpress = [
    {
      name: '--lp-embossed',
      label: 'Embossed',
      description: 'Standard embossed in INSET',
    },
    {
      name: '--lp-embossed-subtle',
      label: 'Embossed Subtle',
      description: 'Subtle embossed effect',
    },
    {
      name: '--lp-embossed-sm',
      label: 'Embossed Small',
      description: 'Small text in INSET',
    },
    {
      name: '--lp-embossed-petrol',
      label: 'Embossed Petrol',
      description: 'Petrol-tinted embossed',
    },
    {
      name: '--lp-embossed-petrol-sm',
      label: 'Embossed Petrol Small',
      description: 'Small petrol embossed',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={pageHeaderStyles}>
        <h1 style={titleStyles}>Letterpress</h1>
        <p style={descStyles}>
          Text shadow system for Stone Marble Neumorphism
        </p>
      </div>

      {/* Rule */}
      <ShowcaseSection
        title="Regla de Uso"
        description="El letterpress crea efecto de texto presionado o elevado según el contexto"
      >
        <div style={{
          padding: '24px',
          background: MARBLE.base,
          borderRadius: '16px',
          boxShadow: 'var(--raised-2)',
          marginBottom: '24px',
        }}>
          <p style={{
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '14px',
            color: 'var(--fing-text-secondary)',
            lineHeight: 1.8,
          }}>
            <strong>RAISED container</strong> → Texto con <strong>letterpress</strong> (parece hundido)<br />
            <strong>INSET container</strong> → Texto con <strong>embossed</strong> (parece elevado)
          </p>
        </div>
      </ShowcaseSection>

      {/* Semantic Colors */}
      <ShowcaseSection
        title="Semantic Letterpress"
        description="Variables de letterpress para colores semánticos (uso en contenedores RAISED)"
      >
        <div style={gridStyles}>
          {semanticLetterpress.map((item) => (
            <div key={item.name} style={cardStyles}>
              <div style={labelStyles}>{item.label}</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 600,
                color: item.color,
                textShadow: `var(${item.name})`,
                marginBottom: '8px',
              }}>
                Sample Text
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--fing-text-tertiary)',
              }}>
                {item.description}
              </div>
              <div style={codeStyles}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Context Variants */}
      <ShowcaseSection
        title="Context Variants"
        description="Variantes específicas de contexto extraídas del Home"
      >
        <div style={gridStyles}>
          {contextLetterpress.map((item) => (
            <div key={item.name} style={cardStyles}>
              <div style={labelStyles}>{item.label}</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 600,
                color: item.color,
                textShadow: `var(${item.name})`,
                marginBottom: '8px',
              }}>
                Sample Text
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--fing-text-tertiary)',
              }}>
                {item.description}
              </div>
              <div style={codeStyles}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Embossed (for INSET containers) */}
      <ShowcaseSection
        title="Embossed (INSET containers)"
        description="Variables de texto embossed para uso dentro de contenedores INSET"
      >
        <div style={gridStyles}>
          {embossedLetterpress.map((item) => (
            <div key={item.name} style={insetCardStyles}>
              <div style={{ ...labelStyles, color: 'var(--fing-text-tertiary)' }}>{item.label}</div>
              <div style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--marble-dark)',
                textShadow: `var(${item.name})`,
                marginBottom: '8px',
              }}>
                Sample Text
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--fing-text-muted)',
              }}>
                {item.description}
              </div>
              <div style={{
                ...codeStyles,
                background: 'var(--marble-deeper)',
              }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Usage Examples */}
      <ShowcaseSection
        title="Uso en CSS"
        description="Cómo aplicar las variables de letterpress"
      >
        <div style={{
          padding: '24px',
          background: MARBLE.base,
          borderRadius: '16px',
          boxShadow: 'var(--raised-2)',
        }}>
          <pre style={{
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '13px',
            color: 'var(--fing-text-secondary)',
            lineHeight: 1.6,
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}>
{`/* En contenedor RAISED - texto se ve hundido */
.titleInRaisedContainer {
  color: var(--fing-accent);
  text-shadow: var(--lp-petrol);
}

/* En contenedor INSET - texto se ve elevado */
.titleInInsetContainer {
  color: var(--marble-dark);
  text-shadow: var(--lp-embossed);
}

/* Texto positivo (jade) */
.positiveText {
  color: var(--fing-positive);
  text-shadow: var(--lp-positive);
}

/* Texto de advertencia (gold) */
.warningText {
  color: var(--fing-warning);
  text-shadow: var(--lp-warning);
}`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}
