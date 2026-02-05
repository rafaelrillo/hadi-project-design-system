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

      {/* ═══════════════════════════════════════════════════════════════════════════
          DEPTH SCALE - From Stone Marble Lab
          ═══════════════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Escala de Profundidades"
        description="9 niveles de intensidad para diferentes tamaños y contextos"
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {[
            { name: 'Whisper', intensity: 'whisper', offset: '0.5px', size: '14px', useCase: 'Captions, meta' },
            { name: 'Subtle', intensity: 'subtle', offset: '0.75px', size: '16px', useCase: 'Body text' },
            { name: 'Soft', intensity: 'soft', offset: '0.75px', size: '18px', useCase: 'Subheadings' },
            { name: 'Medium', intensity: 'medium', offset: '1px', size: '20px', useCase: 'Section titles' },
            { name: 'Strong', intensity: 'strong', offset: '1.5px', size: '24px', useCase: 'Headlines' },
            { name: 'Deep', intensity: 'deep', offset: '2px', size: '28px', useCase: 'Hero text' },
            { name: 'Carved', intensity: 'carved', offset: '2px blur', size: '32px', useCase: 'Display' },
            { name: 'Stamped', intensity: 'stamped', offset: '3px', size: '40px', useCase: 'Monumental' },
            { name: 'Monumental', intensity: 'monumental', offset: '4px', size: '48px', useCase: 'Hero display' },
          ].map((item) => {
            const shadows: Record<string, string> = {
              whisper: '0.5px 0.5px 0px var(--shadow-light), -0.5px -0.5px 0px var(--shadow-dark)',
              subtle: '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)',
              soft: '0.75px 0.75px 0.5px var(--shadow-light), -0.75px -0.75px 0.5px var(--shadow-dark)',
              medium: '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)',
              strong: '1.5px 1.5px 1px var(--shadow-light), -1.5px -1.5px 1px var(--shadow-dark)',
              deep: '2px 2px 1px var(--shadow-light), -2px -2px 1px var(--shadow-dark)',
              carved: '2px 2px 2px var(--shadow-light), -2px -2px 2px var(--shadow-dark)',
              stamped: '3px 3px 2px var(--shadow-light), -3px -3px 2px var(--shadow-dark)',
              monumental: '4px 4px 3px var(--shadow-light), -4px -4px 3px var(--shadow-dark)',
            };
            return (
              <div key={item.name} style={cardStyles}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={labelStyles}>{item.name}</span>
                  <code style={{ fontSize: '9px', fontFamily: 'var(--fing-font-mono)', color: 'var(--fing-text-muted)' }}>
                    {item.offset}
                  </code>
                </div>
                <div style={{
                  fontSize: item.size,
                  fontWeight: 600,
                  fontFamily: 'var(--fing-font-display)',
                  color: 'var(--marble-base)',
                  textShadow: shadows[item.intensity],
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}>
                  FING
                </div>
                <div style={{ fontSize: '10px', color: 'var(--fing-text-tertiary)' }}>
                  {item.useCase}
                </div>
              </div>
            );
          })}
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════════
          RAISED vs INSET COMPARISON
          ═══════════════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="RAISED vs INSET"
        description="Comparación lado a lado: letterpress (hundido) vs embossed (elevado)"
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* RAISED Side */}
          <div>
            <div style={{
              fontSize: '10px',
              fontWeight: 600,
              fontFamily: 'var(--fing-font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--fing-accent)',
              marginBottom: '12px',
              padding: '6px 12px',
              background: 'var(--fing-glass-accent)',
              borderRadius: '100px',
              display: 'inline-block',
            }}>
              RAISED Container
            </div>
            <div style={cardStyles}>
              {[
                { label: 'Display 48px', size: '48px', font: 'var(--fing-font-display)', weight: 700, shadow: '3px 3px 2px var(--shadow-light), -3px -3px 2px var(--shadow-dark)' },
                { label: 'Headline 32px', size: '32px', font: 'var(--fing-font-display)', weight: 700, shadow: '2px 2px 2px var(--shadow-light), -2px -2px 2px var(--shadow-dark)' },
                { label: 'Title 24px', size: '24px', font: 'var(--fing-font-primary)', weight: 600, shadow: '1.5px 1.5px 1px var(--shadow-light), -1.5px -1.5px 1px var(--shadow-dark)' },
                { label: 'Subtitle 18px', size: '18px', font: 'var(--fing-font-primary)', weight: 500, shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)' },
                { label: 'Body 14px', size: '14px', font: 'var(--fing-font-primary)', weight: 400, shadow: '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)' },
                { label: 'Mono 14px', size: '14px', font: 'var(--fing-font-mono)', weight: 500, shadow: '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)' },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--fing-font-mono)', color: 'var(--fing-text-muted)', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: item.size,
                    fontFamily: item.font,
                    fontWeight: item.weight,
                    color: 'var(--marble-base)',
                    textShadow: item.shadow,
                    lineHeight: 1.3,
                  }}>
                    The long view
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INSET Side */}
          <div>
            <div style={{
              fontSize: '10px',
              fontWeight: 600,
              fontFamily: 'var(--fing-font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--fing-warning)',
              marginBottom: '12px',
              padding: '6px 12px',
              background: 'var(--fing-status-warning-subtle)',
              borderRadius: '100px',
              display: 'inline-block',
            }}>
              INSET Container
            </div>
            <div style={insetCardStyles}>
              {[
                { label: 'Display 48px', size: '48px', font: 'var(--fing-font-display)', weight: 700, shadow: '-3px -3px 2px var(--shadow-light), 3px 3px 2px var(--shadow-dark)' },
                { label: 'Headline 32px', size: '32px', font: 'var(--fing-font-display)', weight: 700, shadow: '-2px -2px 2px var(--shadow-light), 2px 2px 2px var(--shadow-dark)' },
                { label: 'Title 24px', size: '24px', font: 'var(--fing-font-primary)', weight: 600, shadow: '-1.5px -1.5px 1px var(--shadow-light), 1.5px 1.5px 1px var(--shadow-dark)' },
                { label: 'Subtitle 18px', size: '18px', font: 'var(--fing-font-primary)', weight: 500, shadow: '-1px -1px 1px var(--shadow-light), 1px 1px 1px var(--shadow-dark)' },
                { label: 'Body 14px', size: '14px', font: 'var(--fing-font-primary)', weight: 400, shadow: '-0.75px -0.75px 0px var(--shadow-light), 0.75px 0.75px 0px var(--shadow-dark)' },
                { label: 'Mono 14px', size: '14px', font: 'var(--fing-font-mono)', weight: 500, shadow: '-0.75px -0.75px 0px var(--shadow-light), 0.75px 0.75px 0px var(--shadow-dark)' },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--fing-font-mono)', color: 'var(--fing-text-tertiary)', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: item.size,
                    fontFamily: item.font,
                    fontWeight: item.weight,
                    color: 'var(--marble-dark)',
                    textShadow: item.shadow,
                    lineHeight: 1.3,
                  }}>
                    The long view
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════════
          FONT FAMILIES
          ═══════════════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Por Familia Tipográfica"
        description="Cómo se ve el letterpress en cada fuente del sistema"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Display - Libre Baskerville */}
          <div style={cardStyles}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <code style={{
                fontSize: '10px',
                fontFamily: 'var(--fing-font-mono)',
                background: 'var(--fing-glass-accent)',
                color: 'var(--fing-accent)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}>
                --fing-font-display
              </code>
              <span style={{ fontSize: '11px', color: 'var(--fing-text-muted)' }}>Libre Baskerville</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'baseline' }}>
              {[
                { text: 'Quiet Intelligence', size: '48px', shadow: '3px 3px 2px var(--shadow-light), -3px -3px 2px var(--shadow-dark)' },
                { text: 'Resolve', size: '36px', shadow: '2px 2px 2px var(--shadow-light), -2px -2px 2px var(--shadow-dark)' },
                { text: 'The Long View', size: '28px', shadow: '1.5px 1.5px 1px var(--shadow-light), -1.5px -1.5px 1px var(--shadow-dark)' },
              ].map((item) => (
                <span key={item.text} style={{
                  fontFamily: 'var(--fing-font-display)',
                  fontSize: item.size,
                  fontWeight: 700,
                  color: 'var(--marble-base)',
                  textShadow: item.shadow,
                }}>
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Primary - DM Sans */}
          <div style={cardStyles}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <code style={{
                fontSize: '10px',
                fontFamily: 'var(--fing-font-mono)',
                background: 'var(--fing-glass-accent)',
                color: 'var(--fing-accent)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}>
                --fing-font-primary
              </code>
              <span style={{ fontSize: '11px', color: 'var(--fing-text-muted)' }}>DM Sans</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { text: 'Portfolio Overview', size: '32px', weight: 700, shadow: '2px 2px 2px var(--shadow-light), -2px -2px 2px var(--shadow-dark)' },
                { text: 'Investment Strategy', size: '24px', weight: 600, shadow: '1.5px 1.5px 1px var(--shadow-light), -1.5px -1.5px 1px var(--shadow-dark)' },
                { text: 'Market Analysis', size: '20px', weight: 600, shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)' },
                { text: 'The market shows signs of consolidation. We observe a moderate risk level.', size: '16px', weight: 400, shadow: '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)' },
                { text: 'Analysis suggests a neutral position', size: '14px', weight: 400, shadow: '0.5px 0.5px 0px var(--shadow-light), -0.5px -0.5px 0px var(--shadow-dark)' },
              ].map((item) => (
                <div key={item.text} style={{
                  fontFamily: 'var(--fing-font-primary)',
                  fontSize: item.size,
                  fontWeight: item.weight,
                  color: 'var(--marble-base)',
                  textShadow: item.shadow,
                  lineHeight: 1.4,
                }}>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Mono - IBM Plex Mono */}
          <div style={cardStyles}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <code style={{
                fontSize: '10px',
                fontFamily: 'var(--fing-font-mono)',
                background: 'var(--fing-glass-accent)',
                color: 'var(--fing-accent)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}>
                --fing-font-mono
              </code>
              <span style={{ fontSize: '11px', color: 'var(--fing-text-muted)' }}>IBM Plex Mono</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'baseline' }}>
              {[
                { text: '$1,234,567.89', size: '36px', weight: 700, shadow: '2px 2px 2px var(--shadow-light), -2px -2px 2px var(--shadow-dark)', color: 'var(--marble-base)' },
                { text: '+24.56%', size: '28px', weight: 700, shadow: '1.5px 1.5px 1px var(--shadow-light), -1.5px -1.5px 1px rgba(74, 122, 106, 0.3)', color: 'var(--fing-positive)' },
                { text: '-12.34%', size: '28px', weight: 700, shadow: '1.5px 1.5px 1px var(--shadow-light), -1.5px -1.5px 1px rgba(138, 90, 74, 0.3)', color: 'var(--fing-negative)' },
                { text: 'AAPL', size: '24px', weight: 600, shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(58, 106, 114, 0.3)', color: 'var(--fing-accent)' },
                { text: '178.42', size: '20px', weight: 500, shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)', color: 'var(--marble-base)' },
                { text: 'VOL: 52.3M', size: '14px', weight: 500, shadow: '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)', color: 'var(--marble-base)' },
              ].map((item, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--fing-font-mono)',
                  fontSize: item.size,
                  fontWeight: item.weight,
                  color: item.color,
                  textShadow: item.shadow,
                }}>
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════════
          COLOR + DEPTH MATRIX
          ═══════════════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Matriz Color × Profundidad"
        description="Cada color semántico en 3 niveles de profundidad"
      >
        <div style={cardStyles}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(5, 1fr)',
            gap: '16px',
            alignItems: 'center',
          }}>
            {/* Header */}
            <div></div>
            {['Charcoal', 'Petrol', 'Jade', 'Gold', 'Rust'].map((color) => (
              <div key={color} style={{
                fontSize: '10px',
                fontFamily: 'var(--fing-font-mono)',
                color: 'var(--fing-text-muted)',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                {color}
              </div>
            ))}

            {/* Rows */}
            {[
              { depth: 'Subtle', offset: '0.75px', size: '18px' },
              { depth: 'Medium', offset: '1px', size: '24px' },
              { depth: 'Strong', offset: '1.5px', size: '32px' },
            ].map((row) => (
              <React.Fragment key={row.depth}>
                <div style={{
                  fontSize: '10px',
                  fontFamily: 'var(--fing-font-mono)',
                  color: 'var(--fing-text-muted)',
                  textTransform: 'uppercase',
                }}>
                  {row.depth}
                </div>
                {[
                  { color: 'var(--fing-black)', rgb: '37, 37, 40' },
                  { color: 'var(--fing-accent)', rgb: '58, 106, 114' },
                  { color: 'var(--fing-positive)', rgb: '74, 122, 106' },
                  { color: 'var(--fing-warning)', rgb: '160, 138, 74' },
                  { color: 'var(--fing-negative)', rgb: '138, 90, 74' },
                ].map((item, i) => (
                  <div key={i} style={{
                    fontSize: row.size,
                    fontWeight: 700,
                    fontFamily: 'var(--fing-font-mono)',
                    color: item.color,
                    textShadow: `${row.offset} ${row.offset} 0px var(--shadow-light), -${row.offset} -${row.offset} 0px rgba(${item.rgb}, 0.3)`,
                    textAlign: 'center',
                  }}>
                    Aa
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
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

      {/* ═══════════════════════════════════════════════════════════════════════════
          UTILITY CLASSES SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Utility Classes"
        description="Clases CSS listas para usar en el markup. Aplican color + letterpress automáticamente."
      >
        {/* Intro */}
        <div style={{
          padding: '20px 24px',
          background: MARBLE.base,
          borderRadius: '14px',
          boxShadow: 'var(--inset-2)',
          marginBottom: '24px',
        }}>
          <p style={{
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '12px',
            color: 'var(--fing-text-secondary)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            <strong>Uso:</strong> <code style={{ background: 'var(--glass-bg)', padding: '2px 6px', borderRadius: '4px' }}>&lt;span className="text-positive"&gt;+12.5%&lt;/span&gt;</code>
          </p>
        </div>

        {/* Semantic Utility Classes */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'var(--fing-font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--fing-text-muted)',
            marginBottom: '16px',
          }}>
            Clases Semánticas
          </div>
          <div style={gridStyles}>
            {[
              { class: '.text-positive', alias: '.text-jade', color: 'var(--fing-positive)', examples: ['+12.5%', 'Buy', 'Bullish', '$1,234.56'] },
              { class: '.text-warning', alias: '.text-gold', color: 'var(--fing-warning)', examples: ['Alert', 'Hold', 'Moderate', 'Pending'] },
              { class: '.text-negative', alias: '.text-rust', color: 'var(--fing-negative)', examples: ['-8.3%', 'Sell', 'Bearish', 'Decline'] },
              { class: '.text-info', alias: '.text-steel', color: 'var(--fing-info)', examples: ['Info', 'Neutral', 'Processing', 'Analysis'] },
              { class: '.text-accent', alias: '.text-petrol', color: 'var(--fing-accent)', examples: ['FING', 'Premium', 'Featured', 'Active'] },
              { class: '.text-primary', alias: '.text-charcoal', color: 'var(--fing-black)', examples: ['Portfolio', 'Total Value', 'Holdings', 'Overview'] },
            ].map((item) => (
              <div key={item.class} style={cardStyles}>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '12px',
                }}>
                  <code style={{
                    fontSize: '11px',
                    fontFamily: 'var(--fing-font-mono)',
                    background: 'var(--fing-glass-accent)',
                    color: 'var(--fing-accent)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontWeight: 500,
                  }}>
                    {item.class}
                  </code>
                  <code style={{
                    fontSize: '10px',
                    fontFamily: 'var(--fing-font-mono)',
                    color: 'var(--fing-text-tertiary)',
                    padding: '4px 8px',
                  }}>
                    {item.alias}
                  </code>
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}>
                  {item.examples.map((example, i) => (
                    <span
                      key={i}
                      className={item.class.replace('.', '')}
                      style={{
                        fontSize: i === 0 ? '20px' : '14px',
                        fontWeight: i === 0 ? 700 : 500,
                        fontFamily: i === 0 ? 'var(--fing-font-mono)' : 'var(--fing-font-primary)',
                      }}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strong variant */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'var(--fing-font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--fing-text-muted)',
            marginBottom: '16px',
          }}>
            Variante Strong (Headlines)
          </div>
          <div style={cardStyles}>
            <code style={{
              fontSize: '11px',
              fontFamily: 'var(--fing-font-mono)',
              background: 'var(--fing-glass-accent)',
              color: 'var(--fing-accent)',
              padding: '4px 8px',
              borderRadius: '6px',
              fontWeight: 500,
              marginBottom: '16px',
              display: 'inline-block',
            }}>
              .text-primary-strong
            </code>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="text-primary-strong" style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--fing-font-display)' }}>
                Portfolio Overview
              </span>
              <span className="text-primary-strong" style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--fing-font-primary)' }}>
                Market Analysis
              </span>
              <span className="text-primary-strong" style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'var(--fing-font-primary)' }}>
                Investment Strategy
              </span>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════════
          REAL-WORLD EXAMPLES
          ═══════════════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Ejemplos de Uso Real"
        description="Cómo se ven las utility classes en contextos reales de la aplicación"
      >
        {/* KPI Cards */}
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          fontFamily: 'var(--fing-font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--fing-text-muted)',
          marginBottom: '16px',
        }}>
          KPI Cards
        </div>
        <div style={{ ...gridStyles, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {[
            { label: 'Total Return', value: '+24.7%', class: 'text-positive' },
            { label: 'Daily Change', value: '-1.2%', class: 'text-negative' },
            { label: 'Risk Level', value: 'Moderate', class: 'text-warning' },
            { label: 'Market Status', value: 'Active', class: 'text-accent' },
          ].map((kpi) => (
            <div key={kpi.label} style={{
              ...cardStyles,
              padding: '20px',
            }}>
              <div style={{
                fontSize: '11px',
                fontFamily: 'var(--fing-font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--fing-text-muted)',
                marginBottom: '8px',
              }}>
                {kpi.label}
              </div>
              <span
                className={kpi.class}
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  fontFamily: 'var(--fing-font-mono)',
                }}
              >
                {kpi.value}
              </span>
            </div>
          ))}
        </div>

        {/* Stock Table Row */}
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          fontFamily: 'var(--fing-font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--fing-text-muted)',
          marginBottom: '16px',
          marginTop: '32px',
        }}>
          Stock Table Row
        </div>
        <div style={{
          ...cardStyles,
          padding: '0',
          overflow: 'hidden',
        }}>
          {[
            { symbol: 'AAPL', name: 'Apple Inc.', price: '$178.42', change: '+2.34%', changeClass: 'text-positive', signal: 'Buy', signalClass: 'text-positive' },
            { symbol: 'TSLA', name: 'Tesla Inc.', price: '$245.18', change: '-1.87%', changeClass: 'text-negative', signal: 'Hold', signalClass: 'text-warning' },
            { symbol: 'MSFT', name: 'Microsoft', price: '$378.91', change: '+0.42%', changeClass: 'text-positive', signal: 'Buy', signalClass: 'text-positive' },
            { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$721.33', change: '-3.21%', changeClass: 'text-negative', signal: 'Sell', signalClass: 'text-negative' },
          ].map((stock, i) => (
            <div
              key={stock.symbol}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 100px 80px 60px',
                gap: '16px',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: i < 3 ? '1px solid var(--fing-border-subtle)' : 'none',
              }}
            >
              <span className="text-accent" style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--fing-font-mono)' }}>
                {stock.symbol}
              </span>
              <span className="text-primary" style={{ fontSize: '13px', fontFamily: 'var(--fing-font-primary)' }}>
                {stock.name}
              </span>
              <span className="text-primary" style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--fing-font-mono)', textAlign: 'right' }}>
                {stock.price}
              </span>
              <span className={stock.changeClass} style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'var(--fing-font-mono)', textAlign: 'right' }}>
                {stock.change}
              </span>
              <span className={stock.signalClass} style={{ fontSize: '11px', fontWeight: 600, fontFamily: 'var(--fing-font-mono)', textTransform: 'uppercase' }}>
                {stock.signal}
              </span>
            </div>
          ))}
        </div>

        {/* Recommendation Card */}
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          fontFamily: 'var(--fing-font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--fing-text-muted)',
          marginBottom: '16px',
          marginTop: '32px',
        }}>
          Recommendation Card
        </div>
        <div style={{
          ...cardStyles,
          maxWidth: '400px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span className="text-accent" style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--fing-font-mono)' }}>
                AAPL
              </span>
              <span className="text-primary" style={{ fontSize: '13px', marginLeft: '12px', fontFamily: 'var(--fing-font-primary)' }}>
                Apple Inc.
              </span>
            </div>
            <span className="text-positive" style={{
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'var(--fing-font-mono)',
              background: 'var(--fing-status-positive-subtle)',
              padding: '4px 12px',
              borderRadius: '100px',
              textTransform: 'uppercase',
            }}>
              Buy
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--fing-font-mono)', color: 'var(--fing-text-muted)', marginBottom: '4px' }}>Current</div>
              <span className="text-primary" style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--fing-font-mono)' }}>$178.42</span>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--fing-font-mono)', color: 'var(--fing-text-muted)', marginBottom: '4px' }}>Target</div>
              <span className="text-positive" style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--fing-font-mono)' }}>$195.00</span>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--fing-font-mono)', color: 'var(--fing-text-muted)', marginBottom: '4px' }}>Upside</div>
              <span className="text-positive" style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--fing-font-mono)' }}>+9.3%</span>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--fing-font-mono)', color: 'var(--fing-text-muted)', marginBottom: '4px' }}>Confidence</div>
              <span className="text-accent" style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--fing-font-mono)' }}>High</span>
            </div>
          </div>
        </div>

        {/* Alert Messages */}
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          fontFamily: 'var(--fing-font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--fing-text-muted)',
          marginBottom: '16px',
          marginTop: '32px',
        }}>
          Alert Messages
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { icon: '✓', message: 'Transaction completed successfully', class: 'text-positive', bg: 'var(--fing-status-positive-subtle)' },
            { icon: '⚠', message: 'Market volatility detected — review positions', class: 'text-warning', bg: 'var(--fing-status-warning-subtle)' },
            { icon: '✕', message: 'Order failed — insufficient funds', class: 'text-negative', bg: 'var(--fing-status-negative-subtle)' },
            { icon: 'ℹ', message: 'New analysis available for your portfolio', class: 'text-info', bg: 'var(--fing-status-info-subtle)' },
          ].map((alert) => (
            <div
              key={alert.message}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: alert.bg,
                borderRadius: '10px',
                borderLeft: `3px solid`,
                borderLeftColor: `var(--fing-${alert.class.replace('text-', '')})`,
              }}
            >
              <span className={alert.class} style={{ fontSize: '16px' }}>{alert.icon}</span>
              <span className={alert.class} style={{ fontSize: '13px', fontWeight: 500, fontFamily: 'var(--fing-font-primary)' }}>
                {alert.message}
              </span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════════
          TYPOGRAPHY SCALE
          ═══════════════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Typography Scale"
        description="Cómo se ven las utility classes en diferentes tamaños de tipografía"
      >
        <div style={cardStyles}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { size: '32px', weight: 700, label: 'Display', font: 'var(--fing-font-display)' },
              { size: '24px', weight: 600, label: 'H1', font: 'var(--fing-font-primary)' },
              { size: '20px', weight: 600, label: 'H2', font: 'var(--fing-font-primary)' },
              { size: '16px', weight: 500, label: 'Body', font: 'var(--fing-font-primary)' },
              { size: '14px', weight: 500, label: 'Small', font: 'var(--fing-font-primary)' },
              { size: '12px', weight: 500, label: 'Caption', font: 'var(--fing-font-mono)' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'var(--fing-font-mono)',
                  color: 'var(--fing-text-muted)',
                  width: '60px',
                  flexShrink: 0,
                }}>
                  {item.label}
                </span>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <span className="text-primary" style={{ fontSize: item.size, fontWeight: item.weight, fontFamily: item.font }}>Primary</span>
                  <span className="text-positive" style={{ fontSize: item.size, fontWeight: item.weight, fontFamily: item.font }}>+12.5%</span>
                  <span className="text-negative" style={{ fontSize: item.size, fontWeight: item.weight, fontFamily: item.font }}>-8.3%</span>
                  <span className="text-warning" style={{ fontSize: item.size, fontWeight: item.weight, fontFamily: item.font }}>Alert</span>
                  <span className="text-accent" style={{ fontSize: item.size, fontWeight: item.weight, fontFamily: item.font }}>FING</span>
                </div>
              </div>
            ))}
          </div>
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
{`/* Utility classes (ya incluyen color + letterpress) */
<span className="text-positive">+12.5%</span>
<span className="text-negative">-8.3%</span>
<span className="text-warning">Alert</span>
<span className="text-accent">FING</span>
<span className="text-primary">Portfolio</span>
<span className="text-primary-strong">Headline</span>

/* En CSS con variables (más control) */
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
