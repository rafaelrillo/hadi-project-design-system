// Path: src/pages/charts/DistributionChartsShowcase.tsx
import React from 'react';
import { HeatMap } from '../../components/charts/HeatMap';
import { TreeMap } from '../../components/charts/TreeMap';
import { CalendarHeatmap } from '../../components/charts/CalendarHeatmap';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function DistributionChartsShowcase() {
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

  const heatmapData = [
    { id: 'Mon', data: [{ x: '00', y: 12 }, { x: '06', y: 45 }, { x: '12', y: 89 }, { x: '18', y: 67 }] },
    { id: 'Tue', data: [{ x: '00', y: 8 }, { x: '06', y: 52 }, { x: '12', y: 95 }, { x: '18', y: 72 }] },
    { id: 'Wed', data: [{ x: '00', y: 15 }, { x: '06', y: 48 }, { x: '12', y: 78 }, { x: '18', y: 58 }] },
    { id: 'Thu', data: [{ x: '00', y: 10 }, { x: '06', y: 55 }, { x: '12', y: 92 }, { x: '18', y: 65 }] },
    { id: 'Fri', data: [{ x: '00', y: 18 }, { x: '06', y: 42 }, { x: '12', y: 85 }, { x: '18', y: 45 }] }
  ];

  const treemapData = {
    name: 'root',
    children: [
      { name: 'API', value: 450, color: 'var(--primary)' },
      { name: 'Database', value: 320, color: 'var(--success)' },
      { name: 'Cache', value: 180, color: 'var(--info)' },
      { name: 'Auth', value: 120, color: 'var(--warning)' },
      { name: 'Storage', value: 90, color: 'var(--destructive)' }
    ]
  };

  const calendarData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(2024, 0, 1);
    date.setDate(date.getDate() + i);
    return { day: date.toISOString().split('T')[0], value: Math.floor(Math.random() * 100) };
  });

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Distribution Charts_</h1>
        <p style={descStyles}>// Gráficos de distribución: HeatMap, TreeMap y Calendar</p>
      </header>

      <ShowcaseSection title="HeatMap" description="Matriz de intensidad de valores">
        <ComponentPreview>
          <div style={{ height: '300px', width: '100%' }}>
            <HeatMap data={heatmapData} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="TreeMap" description="Visualización jerárquica proporcional">
        <ComponentPreview>
          <div style={{ height: '300px', width: '100%' }}>
            <TreeMap data={treemapData} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="CalendarHeatmap" description="Actividad a lo largo del año">
        <ComponentPreview>
          <div style={{ height: '400px', width: '100%' }}>
            <CalendarHeatmap data={calendarData} from="2024-01-01" to="2024-12-31" height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
