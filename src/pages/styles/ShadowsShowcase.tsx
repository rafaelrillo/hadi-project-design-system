// Path: src/pages/styles/ShadowsShowcase.tsx
// Terminal Theme Version
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function ShadowsShowcase() {
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

  interface ShadowToken {
    name: string;
    variable: string;
    value: string;
    usage: string;
  }

  const ShadowSample = ({ token }: { token: ShadowToken }) => {
    return (
      <div style={{
        marginBottom: '24px'
      }}>
        <div style={{
          padding: '32px',
          backgroundColor: 'var(--background-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          boxShadow: token.value,
          textAlign: 'center'
        }}>
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
          </div>
          <div style={{ fontSize: '11px', color: 'var(--foreground-subtle)', fontStyle: 'italic', fontFamily: 'var(--font-mono)' }}>
            {token.usage}
          </div>
        </div>
        <div style={{
          marginTop: '8px',
          fontSize: '11px',
          color: 'var(--foreground-muted)',
          fontFamily: 'var(--font-mono)',
          backgroundColor: 'var(--background-tertiary)',
          padding: '8px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)'
        }}>
          {token.value}
        </div>
      </div>
    );
  };

  const shadows: ShadowToken[] = [
    {
      name: 'Shadow Card',
      variable: '--shadow-card',
      value: '0 4px 20px rgba(0, 0, 0, 0.5)',
      usage: 'Sombra base para cards y contenedores'
    },
    {
      name: 'Shadow Glow SM',
      variable: '--shadow-glow-sm',
      value: '0 0 10px rgba(255, 102, 0, 0.3)',
      usage: 'Glow pequeño para elementos interactivos'
    },
    {
      name: 'Shadow Glow',
      variable: '--shadow-glow',
      value: '0 0 20px rgba(255, 102, 0, 0.4)',
      usage: 'Glow medio para hover y focus'
    },
    {
      name: 'Shadow Glow LG',
      variable: '--shadow-glow-lg',
      value: '0 0 30px rgba(255, 102, 0, 0.5)',
      usage: 'Glow grande para elementos destacados'
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Shadows_</h1>
        <p style={descStyles}>
          // Sistema de sombras y efectos glow para tema terminal
        </p>
      </header>

      <ShowcaseSection
        title="Efectos Glow"
        description="Sombras con efecto luminoso naranja característico del tema terminal"
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--background-tertiary)',
            padding: '20px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)'
          }}>
            {shadows.map((shadow) => (
              <ShadowSample key={shadow.variable} token={shadow} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Comparación de Glow"
        description="Vista lado a lado de los diferentes niveles de glow"
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--background-tertiary)',
            padding: '40px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '140px',
              height: '140px',
              backgroundColor: 'var(--background-secondary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--primary)',
              boxShadow: '0 0 10px rgba(255, 102, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>SM</div>
              <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>10px</div>
            </div>

            <div style={{
              width: '140px',
              height: '140px',
              backgroundColor: 'var(--background-secondary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--primary)',
              boxShadow: '0 0 20px rgba(255, 102, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>MD</div>
              <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>20px</div>
            </div>

            <div style={{
              width: '140px',
              height: '140px',
              backgroundColor: 'var(--background-secondary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--primary)',
              boxShadow: '0 0 30px rgba(255, 102, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>LG</div>
              <div style={{ fontSize: '11px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>30px</div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Glow por Estado"
        description="Colores de glow para diferentes estados del sistema"
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--background-tertiary)',
            padding: '40px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'var(--background-secondary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--success)',
              boxShadow: '0 0 15px rgba(0, 255, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>SUCCESS</div>
            </div>

            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'var(--background-secondary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--destructive)',
              boxShadow: '0 0 15px rgba(255, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--destructive)', fontFamily: 'var(--font-mono)' }}>ERROR</div>
            </div>

            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'var(--background-secondary)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--warning)',
              boxShadow: '0 0 15px rgba(255, 255, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--warning)', fontFamily: 'var(--font-mono)' }}>WARNING</div>
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
{`.card {
  box-shadow: var(--shadow-card);
}

.button:hover {
  box-shadow: var(--shadow-glow-sm);
}

.button:focus {
  box-shadow: var(--shadow-glow);
}

.modal {
  box-shadow: var(--shadow-glow-lg);
}`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}
