// Path: src/pages/styles/BorderRadiusShowcase.tsx
// Terminal Theme Version
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function BorderRadiusShowcase() {
  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  };

  interface RadiusToken {
    name: string;
    variable: string;
    value: string;
    usage: string;
    examples: string[];
  }

  const RadiusSample = ({ token }: { token: RadiusToken }) => {
    return (
      <div style={{
        padding: '24px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        marginBottom: '20px'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--foreground)',
            marginBottom: '8px',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase'
          }}>
            {token.name}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
            <code style={{
              backgroundColor: 'var(--background-tertiary)',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              color: 'var(--primary)'
            }}>
              var({token.variable})
            </code>
            {' = '}
            {token.value}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--foreground-subtle)', fontStyle: 'italic', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
            {token.usage}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
            <strong style={{ color: 'var(--primary)' }}>Ejemplos:</strong> {token.examples.join(', ')}
          </div>
        </div>

        {/* Visual representation */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Square sample */}
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--primary)',
            borderRadius: token.value,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--background)',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            boxShadow: 'var(--shadow-glow-sm)'
          }}>
            {token.value}
          </div>

          {/* Rectangle sample */}
          <div style={{
            width: '160px',
            height: '60px',
            backgroundColor: 'var(--accent)',
            border: '2px solid var(--primary)',
            borderRadius: token.value,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)'
          }}>
            RECTANGLE
          </div>

          {/* Button sample */}
          <div style={{
            padding: '10px 20px',
            backgroundColor: 'var(--primary)',
            color: 'var(--background)',
            borderRadius: token.value,
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            boxShadow: 'var(--shadow-glow-sm)'
          }}>
            Button
          </div>
        </div>
      </div>
    );
  };

  const radiusTokens: RadiusToken[] = [
    {
      name: 'Radius SM (Minimal)',
      variable: '--radius-sm',
      value: '2px',
      usage: 'Bordes mínimos para badges y chips',
      examples: ['Badges', 'Tags', 'Code blocks']
    },
    {
      name: 'Radius (Standard)',
      variable: '--radius',
      value: '4px',
      usage: 'Radio estándar para la mayoría de componentes',
      examples: ['Buttons', 'Inputs', 'Cards', 'Modales']
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Border Radius_</h1>
        <p style={descStyles}>
          // Sistema de bordes angular para estética terminal
        </p>
      </header>

      <ShowcaseSection
        title="Tokens de Border Radius"
        description="Bordes mínimos para mantener estética angular de terminal"
      >
        <ComponentPreview>
          <div>
            {radiusTokens.map((token) => (
              <RadiusSample key={token.variable} token={token} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Comparación Visual"
        description="Diferencia entre radius-sm (2px) y radius (4px)"
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--background-tertiary)',
            padding: '40px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            {/* 2px sample */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: 'var(--primary)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--background)',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                fontFamily: 'var(--font-mono)',
                boxShadow: 'var(--shadow-glow-sm)'
              }}>
                2px
              </div>
              <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                Minimal
              </div>
            </div>

            {/* 4px sample */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: 'var(--primary)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--background)',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                fontFamily: 'var(--font-mono)',
                boxShadow: 'var(--shadow-glow-sm)'
              }}>
                4px
              </div>
              <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                Standard
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Uso de Variables CSS">
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--background-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          fontSize: '12px',
          lineHeight: '1.8',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            color: 'var(--foreground)',
            textTransform: 'uppercase'
          }}>
            // Ejemplo de uso:
          </div>
          <pre style={{ margin: 0, color: 'var(--foreground-muted)' }}>
{`/* Elementos pequeños (2px) */
.badge {
  border-radius: var(--radius-sm);
}

/* Elementos estándar (4px) */
.button {
  border-radius: var(--radius);
}

.card {
  border-radius: var(--radius);
}

.input {
  border-radius: var(--radius);
}`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}
