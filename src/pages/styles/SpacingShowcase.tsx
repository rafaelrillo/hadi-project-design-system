// Path: src/pages/styles/SpacingShowcase.tsx
// SENTINEL Design System - Spacing
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function SpacingShowcase() {
  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '48px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 300,
    color: 'var(--sentinel-text-primary)',
    marginBottom: '12px',
    fontFamily: 'var(--sentinel-font-primary)',
    letterSpacing: '-0.02em'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-primary)',
    lineHeight: 1.6,
    maxWidth: '600px'
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
        backgroundColor: 'var(--sentinel-bg-elevated)',
        borderRadius: 'var(--sentinel-radius-md)',
        border: '1px solid var(--sentinel-border-subtle)',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '12px' }}>
          {/* Visual representation */}
          <div style={{
            width: token.value,
            height: '40px',
            backgroundColor: 'var(--sentinel-accent-primary)',
            borderRadius: 'var(--sentinel-radius-sm)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '10px',
              color: 'var(--sentinel-bg-base)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontFamily: 'var(--sentinel-font-mono)'
            }}>
              {token.pixels}
            </div>
          </div>

          {/* Token info */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--sentinel-text-primary)',
              marginBottom: '4px',
              fontFamily: 'var(--sentinel-font-primary)'
            }}>
              {token.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--sentinel-text-secondary)', marginBottom: '2px', fontFamily: 'var(--sentinel-font-primary)' }}>
              <code style={{
                backgroundColor: 'var(--sentinel-bg-subtle)',
                padding: '2px 6px',
                borderRadius: 'var(--sentinel-radius-sm)',
                color: 'var(--sentinel-accent-primary)',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                var({token.variable})
              </code>
              {' = '}
              {token.value}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontStyle: 'italic', fontFamily: 'var(--sentinel-font-primary)' }}>
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
      usage: 'Espaciado minimo entre elementos muy proximos'
    },
    {
      name: 'Small',
      variable: '--spacing-sm',
      value: '10px',
      pixels: '10px',
      usage: 'Espaciado pequeno entre elementos relacionados'
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
      usage: 'Espaciado estandar entre elementos y secciones'
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
      usage: 'Espaciado extra grande para separacion de bloques'
    }
  ];

  const specialSpacings: SpacingToken[] = [
    {
      name: 'Content Padding',
      variable: '--content-padding',
      value: '30px',
      pixels: '30px',
      usage: 'Padding hacia cada lado del area de contenido principal'
    },
    {
      name: 'Gap Elements',
      variable: '--gap-elements',
      value: '20px',
      pixels: '20px',
      usage: 'Gap estandar entre elementos (grid, flex)'
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
        <h1 style={titleStyles}>Spacing</h1>
        <p style={descStyles}>
          Consistent spacing system based on a 5px scale for maintaining visual rhythm and hierarchy.
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
        description="Tokens especificos para areas de contenido y contenedores"
      >
        <ComponentPreview>
          <div>
            {specialSpacings.map((token) => (
              <SpacingSample key={token.variable} token={token} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Usage Example">
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--sentinel-bg-elevated)',
          borderRadius: 'var(--sentinel-radius-lg)',
          border: '1px solid var(--sentinel-border-subtle)',
          fontSize: '13px',
          lineHeight: '1.8',
          fontFamily: 'var(--sentinel-font-mono)'
        }}>
          <div style={{
            marginBottom: '12px',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'var(--sentinel-font-primary)',
            color: 'var(--sentinel-text-tertiary)',
            letterSpacing: '0.05em'
          }}>
            EXAMPLE USAGE
          </div>
          <pre style={{ margin: 0, color: 'var(--sentinel-text-secondary)' }}>
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
