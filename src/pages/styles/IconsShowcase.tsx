// Path: src/pages/styles/IconsShowcase.tsx
// Terminal Theme Version
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Home, Search, Settings, User, Check, X, Terminal, Code, Database, Cpu } from 'lucide-react';

export function IconsShowcase() {
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

  interface IconToken {
    name: string;
    variable: string;
    value: string;
    pixels: number;
    usage: string;
  }

  const IconSizeSample = ({ token }: { token: IconToken }) => {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Icon examples */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: 'var(--background-tertiary)',
            borderRadius: 'var(--radius-sm)',
            minWidth: '200px',
            border: '1px solid var(--border)'
          }}>
            <Terminal size={token.pixels} color="var(--primary)" />
            <Code size={token.pixels} color="var(--primary)" />
            <Database size={token.pixels} color="var(--primary)" />
            <Cpu size={token.pixels} color="var(--primary)" />
          </div>

          {/* Token info */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '16px',
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

  const iconSizes: IconToken[] = [
    {
      name: 'Icon Extra Small',
      variable: '--icon-size-xs',
      value: '16px',
      pixels: 16,
      usage: 'Íconos muy pequeños, indicadores, badges internos'
    },
    {
      name: 'Icon Small',
      variable: '--icon-size-sm',
      value: '20px',
      pixels: 20,
      usage: 'Íconos en inputs, botones pequeños, inline icons'
    },
    {
      name: 'Icon Medium (Estándar)',
      variable: '--icon-size-md',
      value: '24px',
      pixels: 24,
      usage: 'Tamaño ESTÁNDAR - Navegación, botones, menús, sidebar'
    },
    {
      name: 'Icon Large',
      variable: '--icon-size-lg',
      value: '32px',
      pixels: 32,
      usage: 'Íconos destacados, headers, ilustraciones'
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Icons_</h1>
        <p style={descStyles}>
          // Sistema de iconografía con Lucide React
        </p>
      </header>

      <ShowcaseSection
        title="Tamaños de Iconos"
        description="Cuatro tamaños disponibles: 16px, 20px, 24px (estándar), 32px"
      >
        <ComponentPreview>
          <div>
            {iconSizes.map((token) => (
              <IconSizeSample key={token.variable} token={token} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Comparación de Tamaños"
        description="Vista comparativa de todos los tamaños con el mismo ícono"
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
            alignItems: 'flex-end',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                height: '60px'
              }}>
                <Terminal size={16} color="var(--primary)" />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>XS</div>
              <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>16px</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                height: '60px'
              }}>
                <Terminal size={20} color="var(--primary)" />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>SM</div>
              <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>20px</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                height: '60px'
              }}>
                <Terminal size={24} color="var(--primary)" />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--primary)', fontFamily: 'var(--font-mono)', textShadow: '0 0 10px var(--accent-glow)' }}>MD (STD)</div>
              <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>24px</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                height: '60px'
              }}>
                <Terminal size={32} color="var(--primary)" />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>LG</div>
              <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>32px</div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Librería de Íconos: Lucide React"
        description="El sistema utiliza Lucide React como librería de íconos oficial"
      >
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--background-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '8px',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase'
            }}>
              Íconos Comunes del Sistema
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '16px',
              padding: '16px',
              backgroundColor: 'var(--background-tertiary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)'
            }}>
              {[
                { icon: Terminal, name: 'Terminal' },
                { icon: Code, name: 'Code' },
                { icon: Database, name: 'Database' },
                { icon: Cpu, name: 'Cpu' },
                { icon: Home, name: 'Home' },
                { icon: Search, name: 'Search' },
                { icon: Settings, name: 'Settings' },
                { icon: User, name: 'User' },
                { icon: Check, name: 'Check' },
                { icon: X, name: 'X' }
              ].map(({ icon: Icon, name }) => (
                <div key={name} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icon size={24} color="var(--primary)" />
                  <div style={{ fontSize: '10px', color: 'var(--foreground-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong style={{ color: 'var(--primary)' }}>Instalación:</strong>{' '}
              <code style={{
                backgroundColor: 'var(--background-tertiary)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)'
              }}>npm install lucide-react</code>
            </p>
            <p>
              <strong style={{ color: 'var(--primary)' }}>Explorar íconos:</strong>{' '}
              <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                https://lucide.dev/icons/
              </a>
            </p>
          </div>
        </div>
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
            // Ejemplo de uso en React:
          </div>
          <pre style={{ margin: 0, color: 'var(--foreground-muted)' }}>
{`import { Terminal, Code, Database } from 'lucide-react';

// Tamaño con variable CSS
<Terminal size={24} /> // Estándar (--icon-size-md)
<Code size={20} />     // Small (--icon-size-sm)
<Database size={16} /> // Extra Small (--icon-size-xs)

// Con color del tema
<Terminal size={24} color="var(--primary)" />
<Code size={24} color="var(--success)" />
<Database size={24} color="var(--destructive)" />`}
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
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Librería:</strong> Lucide React (MIT license)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Tamaño estándar:</strong> 24px (--icon-size-md)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Rango de tamaños:</strong> 16px, 20px, 24px, 32px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Color por defecto:</strong> #FF6600 (--primary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Stroke width:</strong> 2px (default de Lucide)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Total de íconos:</strong> 1000+ disponibles</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
