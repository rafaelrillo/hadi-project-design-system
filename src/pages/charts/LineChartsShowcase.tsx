// Path: src/pages/charts/LineChartsShowcase.tsx
import React from 'react';
import { LineChart } from '../../components/charts/LineChart';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function LineChartsShowcase() {
  const pageHeaderStyles: React.CSSProperties = { marginBottom: '32px' };
  const titleStyles: React.CSSProperties = {
    fontSize: '28px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px',
    fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };
  const descStyles: React.CSSProperties = {
    fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase', letterSpacing: '0.03em'
  };

  const lineData = [
    { id: 'requests', data: [
      { x: '00:00', y: 120 }, { x: '04:00', y: 80 }, { x: '08:00', y: 250 },
      { x: '12:00', y: 380 }, { x: '16:00', y: 420 }, { x: '20:00', y: 280 }
    ]},
    { id: 'errors', data: [
      { x: '00:00', y: 5 }, { x: '04:00', y: 3 }, { x: '08:00', y: 12 },
      { x: '12:00', y: 8 }, { x: '16:00', y: 15 }, { x: '20:00', y: 6 }
    ]}
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Line & Area Charts_</h1>
        <p style={descStyles}>// Gráficos de línea y área con @nivo/line</p>
      </header>

      <ShowcaseSection title="LineChart Básico" description="Gráfico de línea con múltiples series">
        <ComponentPreview>
          <div style={{ height: '350px', width: '100%' }}>
            <LineChart data={lineData} enableArea={false} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Area Chart" description="Gráfico de área con relleno">
        <ComponentPreview>
          <div style={{ height: '350px', width: '100%' }}>
            <LineChart data={lineData} enableArea={true} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Sin Puntos" description="Línea sin marcadores de puntos">
        <ComponentPreview>
          <div style={{ height: '350px', width: '100%' }}>
            <LineChart data={lineData} enableArea={false} enablePoints={false} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
