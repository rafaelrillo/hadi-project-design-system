// Path: src/pages/terminal/AsciiBoxShowcase.tsx
import React from 'react';
import { AsciiBox } from '../../components/terminal/AsciiBox';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function AsciiBoxShowcase() {
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

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; AsciiBox_</h1>
        <p style={descStyles}>// Cajas con bordes ASCII usando caracteres Unicode box-drawing</p>
      </header>

      {/* Variants */}
      <ShowcaseSection
        title="Variantes de Borde"
        description="Tres estilos de borde: single, double, rounded"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <AsciiBox title="Single" variant="single">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground)' }}>
                  Borde simple usando caracteres Unicode box-drawing estándar.
                </p>
              </AsciiBox>
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <AsciiBox title="Double" variant="double">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground)' }}>
                  Borde doble para mayor énfasis visual y estilo retro.
                </p>
              </AsciiBox>
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <AsciiBox title="Rounded" variant="rounded">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground)' }}>
                  Esquinas redondeadas ASCII para un look más suave.
                </p>
              </AsciiBox>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Without Title */}
      <ShowcaseSection
        title="Sin Título"
        description="Cajas ASCII sin título en el borde superior"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '100%' }}>
            <AsciiBox variant="single">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground)' }}>
                <p style={{ color: 'var(--primary)', marginBottom: '8px' }}>$ whoami</p>
                <p>robot_user</p>
              </div>
            </AsciiBox>
            <AsciiBox variant="double">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground)' }}>
                <p style={{ color: 'var(--primary)', marginBottom: '8px' }}>$ uptime</p>
                <p>14 days, 6:32:15</p>
              </div>
            </AsciiBox>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Status Panel */}
      <ShowcaseSection
        title="Panel de Estado"
        description="Ejemplo de uso como panel de monitoreo"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px' }}>
            <AsciiBox title="System Status" variant="double">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                <p style={{ color: 'var(--success)', marginBottom: '4px' }}>● CPU: 45% [||||.......]</p>
                <p style={{ color: 'var(--success)', marginBottom: '4px' }}>● RAM: 2.4GB/8GB [|||.......]</p>
                <p style={{ color: 'var(--warning)', marginBottom: '4px' }}>● DISK: 380GB/500GB [|||||||...]</p>
                <p style={{ color: 'var(--foreground-muted)' }}>● UPTIME: 14d 6h 32m</p>
              </div>
            </AsciiBox>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Code Block */}
      <ShowcaseSection
        title="Bloque de Código"
        description="Uso como contenedor de código"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px' }}>
            <AsciiBox title="config.ts" variant="single">
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground)', margin: 0, whiteSpace: 'pre-wrap' }}>
{`export const config = {
  theme: 'terminal',
  colors: {
    primary: '#FF6600',
    background: '#0D0D0D'
  }
};`}
              </pre>
            </AsciiBox>
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
