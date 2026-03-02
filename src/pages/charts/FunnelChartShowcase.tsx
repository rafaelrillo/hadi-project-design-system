// Path: src/pages/charts/FunnelChartShowcase.tsx
// QUAFI Design System - Glass-Neumorphism Funnel Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { FunnelChart } from '../../components/charts/echarts';
import type { FunnelDataPoint } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { showcase } from '../showcaseStyles';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const investmentFunnel: FunnelDataPoint[] = [
  { name: 'Prospects', value: 1000 },
  { name: 'Qualified Leads', value: 600 },
  { name: 'Proposals', value: 300 },
  { name: 'Negotiations', value: 150 },
  { name: 'Closed Deals', value: 80 },
];

const screeningProcess: FunnelDataPoint[] = [
  { name: 'Universe', value: 5000 },
  { name: 'Market Cap Filter', value: 2500 },
  { name: 'Liquidity Filter', value: 1200 },
  { name: 'Fundamental Screen', value: 400 },
  { name: 'Technical Screen', value: 150 },
  { name: 'Final Selection', value: 50 },
];

const portfolioFunnel: FunnelDataPoint[] = [
  { name: 'Total AUM', value: 100 },
  { name: 'Active Strategies', value: 75 },
  { name: 'Core Holdings', value: 50 },
  { name: 'Top Performers', value: 25 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function FunnelChartContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light), ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark)`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark), inset ${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light)`;
  };

  const chartContainerStyles: React.CSSProperties = {
    padding: '24px',
    background: 'var(--marble-base)',
    borderRadius: '20px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px',
    borderRadius: '20px',
    boxShadow: getNeuInsetShadow(5, 15),
    background: 'var(--marble-base)',
    overflowX: 'auto',
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}>
      <header style={{ ...showcase.header.container, boxShadow: 'var(--raised-3)' }}>
        <h1 style={showcase.header.title}>&gt; FunnelChart_</h1>
        <p style={showcase.header.description}>// Visualizacion progresiva de embudos de conversion</p>
      </header>

      <ShowcaseSection title="Default" description="Standard descending funnel">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <FunnelChart data={investmentFunnel} title="Sales Funnel" height={400} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Screening Process" description="Stock screening filter visualization">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <FunnelChart data={screeningProcess} title="Stock Screening" height={450} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Ascending Sort" description="Inverted funnel (pyramid)">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <FunnelChart data={portfolioFunnel} title="Portfolio Structure" height={350} sort="ascending" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="No Sort" description="Maintain original data order">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <FunnelChart
              data={[
                { name: 'Step 1', value: 60 },
                { name: 'Step 2', value: 80 },
                { name: 'Step 3', value: 40 },
                { name: 'Step 4', value: 70 },
                { name: 'Step 5', value: 30 },
              ]}
              title="Process Steps"
              height={350}
              sort="none"
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Labels Inside" description="Position labels inside the funnel segments">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <FunnelChart data={investmentFunnel} height={350} labelPosition="inside" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Format" description="Format values as currency or percentage">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <FunnelChart data={investmentFunnel} title="Revenue Funnel" height={350} formatValue={(v) => `$${v}K`} />
            </div>
            <div>
              <FunnelChart data={portfolioFunnel} title="Allocation %" height={350} formatValue={(v) => `${v}%`} />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller funnel for dashboards">
        <div style={chartContainerStyles}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '250px' }}>
              <FunnelChart data={portfolioFunnel} height={250} labelPosition="inside" />
            </div>
            <div style={{ width: '250px' }}>
              <FunnelChart data={portfolioFunnel} height={250} sort="ascending" labelPosition="inside" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Tecnicas">
        <div style={tableContainerStyles}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '12px',
            fontFamily: 'var(--quafi-font-mono)',
          }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--quafi-accent)', fontWeight: 600 }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--quafi-accent)', fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--quafi-accent)', fontWeight: 600 }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--quafi-accent)', fontWeight: 600 }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: 'data', type: 'FunnelDataPoint[]', default: 'required', desc: 'Array of name/value pairs' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'sort', type: "'descending' | 'ascending' | 'none'", default: "'descending'", desc: 'Sort order' },
                { prop: 'labelPosition', type: 'string', default: "'outer'", desc: 'Label position (inside/outer)' },
                { prop: 'showPercent', type: 'boolean', default: 'true', desc: 'Show percentage in labels' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
                { prop: 'formatValue', type: '(v: number) => string', default: '-', desc: 'Value formatter' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', color: 'var(--quafi-text-primary)' }}>{row.prop}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--quafi-text-muted)' }}>{row.type}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--quafi-text-muted)' }}>{row.default}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--quafi-text-muted)' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function FunnelChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <FunnelChartContent />
    </LightEngineProvider>
  );
}

export default FunnelChartShowcase;
