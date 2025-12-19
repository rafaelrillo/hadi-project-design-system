// Path: src/pages/styles/SpacingShowcase.tsx
// Terminal Theme Version
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function SpacingShowcase() {
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

  interface SpacingToken {
    name: string;
    variable: string;
    value: string;
    pixels: string;
    usage: string;
  }

  const SpacingSample = ({ token }: { token: SpacingToken }) => {
    return (
      <div style={{
        padding: '16px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '12px' }}>
          {/* Visual representation */}
          <div style={{
            width: token.value,
            height: '40px',
            backgroundColor: 'var(--primary)',
            borderRadius: 'var(--radius-sm)',
            position: 'relative',
            boxShadow: 'var(--shadow-glow-sm)'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '10px',
              color: 'var(--background)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)'
            }}>
              {token.pixels}
            </div>
          </div>

          {/* Token info */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--foreground)',
              marginBottom: '4px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase'
            }}>
              {token.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>
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
            <div style={{ fontSize: '11px', color: 'var(--foreground-subtle)', fontStyle: 'italic', fontFamily: 'var(--font-mono)' }}>
              {token.usage}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const spacingScale: SpacingToken[] = [
    {
      name: 'Extra Small',
      variable: '--spacing-xs',
      value: '5px',
      pixels: '5px',
      usage: 'Espaciado mínimo entre elementos muy próximos'
    },
    {
      name: 'Small',
      variable: '--spacing-sm',
      value: '10px',
      pixels: '10px',
      usage: 'Espaciado pequeño entre elementos relacionados'
    },
    {
      name: 'Medium',
      variable: '--spacing-md',
      value: '15px',
      pixels: '15px',
      usage: 'Espaciado medio entre secciones relacionadas'
    },
    {
      name: 'Large',
      variable: '--spacing-lg',
      value: '20px',
      pixels: '20px',
      usage: 'Espaciado estándar entre elementos y secciones'
    },
    {
      name: 'Extra Large',
      variable: '--spacing-xl',
      value: '30px',
      pixels: '30px',
      usage: 'Espaciado grande entre secciones principales'
    },
    {
      name: '2X Large',
      variable: '--spacing-2xl',
      value: '40px',
      pixels: '40px',
      usage: 'Espaciado extra grande para separación de bloques'
    }
  ];

  const specialSpacings: SpacingToken[] = [
    {
      name: 'Content Padding',
      variable: '--content-padding',
      value: '30px',
      pixels: '30px',
      usage: 'Padding hacia cada lado del área de contenido principal'
    },
    {
      name: 'Gap Elements',
      variable: '--gap-elements',
      value: '20px',
      pixels: '20px',
      usage: 'Gap estándar entre elementos (grid, flex)'
    },
    {
      name: 'Container Padding',
      variable: '--container-padding',
      value: '20px',
      pixels: '20px',
      usage: 'Padding interno de contenedores (cards, modales)'
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Spacing_</h1>
        <p style={descStyles}>
          // Sistema de espaciado consistente basado en escala de 5px
        </p>
      </header>

      <ShowcaseSection
        title="Escala de Espaciado"
        description="Tokens de espaciado base desde 5px hasta 40px"
      >
        <ComponentPreview>
          <div>
            {spacingScale.map((token) => (
              <SpacingSample key={token.variable} token={token} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Espaciados Especiales"
        description="Tokens específicos para áreas de contenido y contenedores"
      >
        <ComponentPreview>
          <div>
            {specialSpacings.map((token) => (
              <SpacingSample key={token.variable} token={token} />
            ))}
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
{`.card {
  padding: var(--container-padding);
  margin-bottom: var(--spacing-lg);
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
      </ShowcaseSection>
    </div>
  );
}
