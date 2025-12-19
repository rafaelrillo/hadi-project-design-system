// Path: src/pages/styles/TypographyShowcase.tsx
// Terminal Theme Version
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function TypographyShowcase() {
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

  interface TypographyToken {
    name: string;
    variable: string;
    size: string;
    weight: string;
    lineHeight: string;
    usage: string;
    element: string;
  }

  const TypeSample = ({ token, exampleText }: { token: TypographyToken; exampleText: string }) => {
    const getStyles = (): React.CSSProperties => {
      const sizeMap: { [key: string]: string } = {
        '--text-siglas': '24px',
        '--text-titulo-1': '18px',
        '--text-titulo-2': '16px',
        '--text-cuerpo-1': '14px',
        '--text-cuerpo-2': '12px'
      };

      const weightMap: { [key: string]: number } = {
        'Bold/700': 700,
        'Semibold/600': 600,
        'Regular/400': 400
      };

      return {
        fontSize: sizeMap[token.variable],
        fontWeight: weightMap[token.weight],
        lineHeight: '1.2',
        fontFamily: 'var(--font-mono)',
        color: 'var(--foreground)',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.03em'
      };
    };

    return (
      <div style={{
        padding: '20px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        marginBottom: '16px'
      }}>
        {/* Type Info */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '12px',
          fontSize: '12px',
          color: 'var(--foreground-muted)',
          flexWrap: 'wrap',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            <strong style={{ color: 'var(--foreground)' }}>{token.name}</strong>
          </div>
          <div>
            <code style={{
              backgroundColor: 'var(--background-tertiary)',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              color: 'var(--primary)'
            }}>
              var({token.variable})
            </code>
          </div>
          <div>{token.size}</div>
          <div>{token.weight}</div>
        </div>

        {/* Usage Info */}
        <div style={{
          fontSize: '11px',
          color: 'var(--foreground-subtle)',
          marginBottom: '12px',
          fontStyle: 'italic',
          fontFamily: 'var(--font-mono)'
        }}>
          {token.usage} • {token.element}
        </div>

        {/* Example */}
        <div style={getStyles()}>
          {exampleText}
        </div>
      </div>
    );
  };

  const typographyTokens: TypographyToken[] = [
    {
      name: 'Siglas',
      variable: '--text-siglas',
      size: '24px',
      weight: 'Bold/700',
      lineHeight: '1.2',
      usage: 'Product Key y títulos principales',
      element: 'Siglas de productos'
    },
    {
      name: 'Título 1',
      variable: '--text-titulo-1',
      size: '18px',
      weight: 'Semibold/600',
      lineHeight: '1.2',
      usage: 'Títulos principales',
      element: '<h1>'
    },
    {
      name: 'Título 2',
      variable: '--text-titulo-2',
      size: '16px',
      weight: 'Semibold/600',
      lineHeight: '1.2',
      usage: 'Subtítulos',
      element: '<h2>, <h3>'
    },
    {
      name: 'Cuerpo 1',
      variable: '--text-cuerpo-1',
      size: '14px',
      weight: 'Regular/400',
      lineHeight: '1.2',
      usage: 'Texto de párrafos, botones, inputs',
      element: '<p>, <span>, <button>, <input>'
    },
    {
      name: 'Cuerpo 1 Semibold',
      variable: '--text-cuerpo-1',
      size: '14px',
      weight: 'Semibold/600',
      lineHeight: '1.2',
      usage: 'Énfasis en cuerpo',
      element: '<strong>, <b>'
    },
    {
      name: 'Cuerpo 2',
      variable: '--text-cuerpo-2',
      size: '12px',
      weight: 'Regular/400',
      lineHeight: '1.2',
      usage: 'Labels y textos pequeños',
      element: '<label>, <small>'
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Typography_</h1>
        <p style={descStyles}>
          // Sistema tipográfico basado en JetBrains Mono
        </p>
      </header>

      <ShowcaseSection
        title="Escala Tipográfica"
        description="Tamaños de fuente y pesos disponibles en el sistema"
      >
        <ComponentPreview>
          <div>
            <TypeSample
              token={typographyTokens[0]}
              exampleText="> SYSTEM_INIT"
            />
            <TypeSample
              token={typographyTokens[1]}
              exampleText="> Este es un título principal (H1)"
            />
            <TypeSample
              token={typographyTokens[2]}
              exampleText="> Este es un subtítulo (H2, H3)"
            />
            <TypeSample
              token={typographyTokens[3]}
              exampleText="Este es un párrafo de cuerpo regular. Se usa para la mayoría del contenido."
            />
            <TypeSample
              token={typographyTokens[4]}
              exampleText="Este es un párrafo con énfasis (Semibold)."
            />
            <TypeSample
              token={typographyTokens[5]}
              exampleText="Este es un label o texto pequeño (Cuerpo 2)"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Pesos de Fuente"
        description="JetBrains Mono soporta tres pesos: Regular (400), Semibold (600) y Bold (700)"
      >
        <ComponentPreview>
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--background-secondary)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 400, fontFamily: 'var(--font-mono)', color: 'var(--foreground)' }}>
                Regular (400) - Texto de cuerpo estándar
              </div>
              <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                <code style={{
                  backgroundColor: 'var(--background-tertiary)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  color: 'var(--primary)'
                }}>
                  var(--font-weight-normal)
                </code>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--foreground)' }}>
                Semibold (600) - Títulos y énfasis
              </div>
              <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                <code style={{
                  backgroundColor: 'var(--background-tertiary)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  color: 'var(--primary)'
                }}>
                  var(--font-weight-semibold)
                </code>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--primary)', textShadow: '0 0 10px var(--accent-glow)' }}>
                Bold (700) - Product Key y destacados
              </div>
              <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                <code style={{
                  backgroundColor: 'var(--background-tertiary)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  color: 'var(--primary)'
                }}>
                  var(--font-weight-bold)
                </code>
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
{`.title {
  font-size: var(--text-titulo-1);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.body-text {
  font-size: var(--text-cuerpo-1);
  font-weight: var(--font-weight-normal);
  font-family: var(--font-mono);
}

.label {
  font-size: var(--text-cuerpo-2);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}`}
          </pre>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--background-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          fontSize: '12px',
          color: 'var(--foreground)',
          lineHeight: '1.8',
          fontFamily: 'var(--font-mono)'
        }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Familia:</strong> JetBrains Mono (Google Fonts)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Tamaños:</strong> 12px, 14px, 16px, 18px, 24px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Pesos:</strong> 400 (Regular), 600 (Semibold), 700 (Bold)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Line Height:</strong> 1.2 (120%)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Text Transform:</strong> uppercase para títulos y labels</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Letter Spacing:</strong> 0.03em - 0.1em</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
