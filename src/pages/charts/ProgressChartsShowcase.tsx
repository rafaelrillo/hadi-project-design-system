// Path: src/pages/charts/ProgressChartsShowcase.tsx
import React from 'react';
import { RadialBar } from '../../components/charts/RadialBar';
import { BulletChart } from '../../components/charts/BulletChart';
import { StatCard } from '../../components/charts/StatCard';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function ProgressChartsShowcase() {
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

  const radialData = [
    { id: 'CPU', data: [{ x: 'usage', y: 67 }] },
    { id: 'Memory', data: [{ x: 'usage', y: 45 }] },
    { id: 'Disk', data: [{ x: 'usage', y: 82 }] }
  ];

  const bulletData = [
    { id: 'CPU', ranges: [0, 50, 80, 100], measures: [67], markers: [75], title: 'CPU Usage' },
    { id: 'Memory', ranges: [0, 60, 85, 100], measures: [45], markers: [70], title: 'Memory' },
    { id: 'Latency', ranges: [0, 100, 200, 300], measures: [85], markers: [150], title: 'Latency (ms)' }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Progress Charts_</h1>
        <p style={descStyles}>// Gráficos de progreso: RadialBar, Bullet y StatCard</p>
      </header>

      <ShowcaseSection title="StatCards" description="Tarjetas con estadísticas y tendencias">
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%' }}>
            <StatCard label="Total Requests" value="1,234,567" change={12.5} trend="up" />
            <StatCard label="Error Rate" value="0.23%" change={-0.05} trend="down" />
            <StatCard label="Avg Latency" value="45ms" change={-8} trend="down" />
            <StatCard label="Uptime" value="99.99%" trend="neutral" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="RadialBar" description="Barras radiales de progreso">
        <ComponentPreview>
          <div style={{ height: '300px', width: '100%' }}>
            <RadialBar data={radialData} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="BulletChart" description="Métricas vs objetivos">
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            {bulletData.map((item) => (
              <div key={item.id} style={{ height: '80px' }}>
                <BulletChart data={[item]} height={80} layout="horizontal" />
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
