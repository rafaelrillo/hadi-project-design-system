// Path: src/pages/charts/FunnelChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Funnel Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { FunnelChart } from '../../components/charts/echarts';
import type { FunnelDataPoint } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

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

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const chartContainerStyles: React.CSSProperties = {
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px',
    borderRadius: '15px',
    boxShadow: getNeuInsetShadow(5, 15),
    background: LIGHT.base,
    overflowX: 'auto',
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; FunnelChart_</h1>
        <p style={descStyles}>// Visualización progresiva de embudos de conversión</p>
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

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={tableContainerStyles}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '12px',
            fontFamily: 'var(--sentinel-font-mono)',
          }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Description</th>
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
                  <td style={{ padding: '12px 16px', color: '#2D3436' }}>{row.prop}</td>
                  <td style={{ padding: '12px 16px', color: '#636E72' }}>{row.type}</td>
                  <td style={{ padding: '12px 16px', color: '#636E72' }}>{row.default}</td>
                  <td style={{ padding: '12px 16px', color: '#636E72' }}>{row.desc}</td>
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
