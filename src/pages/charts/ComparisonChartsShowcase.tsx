// Path: src/pages/charts/ComparisonChartsShowcase.tsx
import React from 'react';
import { RadarChart } from '../../components/charts/RadarChart';
import { BumpChart } from '../../components/charts/BumpChart';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function ComparisonChartsShowcase() {
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

  const radarData = [
    { metric: 'Performance', serverA: 95, serverB: 78 },
    { metric: 'Reliability', serverA: 88, serverB: 92 },
    { metric: 'Security', serverA: 82, serverB: 85 },
    { metric: 'Scalability', serverA: 70, serverB: 88 },
    { metric: 'Cost', serverA: 65, serverB: 72 }
  ];

  const bumpData = [
    { id: 'Server A', data: [{ x: 'Q1', y: 1 }, { x: 'Q2', y: 2 }, { x: 'Q3', y: 1 }, { x: 'Q4', y: 1 }] },
    { id: 'Server B', data: [{ x: 'Q1', y: 2 }, { x: 'Q2', y: 1 }, { x: 'Q3', y: 3 }, { x: 'Q4', y: 2 }] },
    { id: 'Server C', data: [{ x: 'Q1', y: 3 }, { x: 'Q2', y: 3 }, { x: 'Q3', y: 2 }, { x: 'Q4', y: 3 }] }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Comparison Charts_</h1>
        <p style={descStyles}>// Gráficos de comparación: Radar y Bump</p>
      </header>

      <ShowcaseSection title="RadarChart" description="Comparación de múltiples variables">
        <ComponentPreview>
          <div style={{ height: '400px', width: '100%' }}>
            <RadarChart data={radarData} keys={['serverA', 'serverB']} indexBy="metric" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="BumpChart" description="Cambios de ranking a lo largo del tiempo">
        <ComponentPreview>
          <div style={{ height: '300px', width: '100%' }}>
            <BumpChart data={bumpData} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
