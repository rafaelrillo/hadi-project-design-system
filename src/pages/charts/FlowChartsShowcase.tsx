// Path: src/pages/charts/FlowChartsShowcase.tsx
import React from 'react';
import { SankeyDiagram } from '../../components/charts/SankeyDiagram';
import { ChordDiagram } from '../../components/charts/ChordDiagram';
import { NetworkGraph } from '../../components/charts/NetworkGraph';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function FlowChartsShowcase() {
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

  const sankeyData = {
    nodes: [
      { id: 'Users' }, { id: 'API Gateway' }, { id: 'Auth' },
      { id: 'Database' }, { id: 'Cache' }, { id: 'Response' }
    ],
    links: [
      { source: 'Users', target: 'API Gateway', value: 100 },
      { source: 'API Gateway', target: 'Auth', value: 100 },
      { source: 'Auth', target: 'Database', value: 60 },
      { source: 'Auth', target: 'Cache', value: 40 },
      { source: 'Database', target: 'Response', value: 60 },
      { source: 'Cache', target: 'Response', value: 40 }
    ]
  };

  const chordData = [
    [0, 58, 23, 15], [45, 0, 32, 28],
    [18, 27, 0, 42], [22, 35, 19, 0]
  ];
  const chordKeys = ['Frontend', 'API', 'Database', 'Cache'];

  const networkData = {
    nodes: [
      { id: 'Gateway', height: 2, size: 24, color: 'var(--primary)' },
      { id: 'Auth', height: 1, size: 18, color: 'var(--success)' },
      { id: 'API-1', height: 1, size: 18, color: 'var(--info)' },
      { id: 'API-2', height: 1, size: 18, color: 'var(--info)' },
      { id: 'DB', height: 0, size: 20, color: 'var(--warning)' }
    ],
    links: [
      { source: 'Gateway', target: 'Auth', distance: 80 },
      { source: 'Gateway', target: 'API-1', distance: 80 },
      { source: 'Gateway', target: 'API-2', distance: 80 },
      { source: 'API-1', target: 'DB', distance: 60 },
      { source: 'API-2', target: 'DB', distance: 60 }
    ]
  };

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Flow Charts_</h1>
        <p style={descStyles}>// Gráficos de flujo: Sankey, Chord y Network</p>
      </header>

      <ShowcaseSection title="SankeyDiagram" description="Visualización de flujo de datos">
        <ComponentPreview>
          <div style={{ height: '400px', width: '100%' }}>
            <SankeyDiagram data={sankeyData} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="ChordDiagram" description="Relaciones circulares entre entidades">
        <ComponentPreview>
          <div style={{ height: '400px', width: '100%' }}>
            <ChordDiagram matrix={chordData} keys={chordKeys} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="NetworkGraph" description="Topología de red con nodos y enlaces">
        <ComponentPreview>
          <div style={{ height: '400px', width: '100%' }}>
            <NetworkGraph data={networkData} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
