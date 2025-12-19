// Path: src/pages/charts/CorrelationChartsShowcase.tsx
import React from 'react';
import { ScatterPlot } from '../../components/charts/ScatterPlot';
import { StreamChart } from '../../components/charts/StreamChart';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function CorrelationChartsShowcase() {
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

  const scatterData = [
    {
      id: 'Cluster A',
      data: Array.from({ length: 20 }, () => ({
        x: Math.random() * 50 + 10,
        y: Math.random() * 50 + 20
      }))
    },
    {
      id: 'Cluster B',
      data: Array.from({ length: 20 }, () => ({
        x: Math.random() * 40 + 50,
        y: Math.random() * 40 + 50
      }))
    }
  ];

  const streamData = Array.from({ length: 12 }, () => ({
    API: Math.floor(Math.random() * 50) + 20,
    Database: Math.floor(Math.random() * 40) + 15,
    Cache: Math.floor(Math.random() * 30) + 10,
    Auth: Math.floor(Math.random() * 25) + 5
  }));

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Correlation Charts_</h1>
        <p style={descStyles}>// Gráficos de correlación: ScatterPlot y StreamChart</p>
      </header>

      <ShowcaseSection title="ScatterPlot" description="Distribución de puntos en dos dimensiones">
        <ComponentPreview>
          <div style={{ height: '400px', width: '100%' }}>
            <ScatterPlot data={scatterData} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="StreamChart" description="Flujo de datos apilados a lo largo del tiempo">
        <ComponentPreview>
          <div style={{ height: '350px', width: '100%' }}>
            <StreamChart data={streamData} keys={['API', 'Database', 'Cache', 'Auth']} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
