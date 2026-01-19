// Path: src/pages/charts/PieChartShowcase.tsx
// FING Design System - Glass-Neumorphism Pie Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { PieChart } from '../../components/charts/echarts';
import type { PieDataPoint } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const allocationData: PieDataPoint[] = [
  { name: 'US Stocks', value: 45 },
  { name: 'International', value: 20 },
  { name: 'Bonds', value: 20 },
  { name: 'Real Estate', value: 10 },
  { name: 'Cash', value: 5 },
];

const sectorData: PieDataPoint[] = [
  { name: 'Technology', value: 32, color: '#5ba3a5' },
  { name: 'Healthcare', value: 18, color: '#7ecbcc' },
  { name: 'Finance', value: 15, color: '#4a7a6a' },
  { name: 'Consumer', value: 12, color: '#5a8fb8' },
  { name: 'Energy', value: 10, color: '#c4a35a' },
  { name: 'Materials', value: 8, color: '#8b7ec7' },
  { name: 'Other', value: 5, color: '#c47a5a' },
];

const simpleData: PieDataPoint[] = [
  { name: 'Stocks', value: 60 },
  { name: 'Bonds', value: 30 },
  { name: 'Cash', value: 10 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function PieChartContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--fing-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--fing-text-secondary)',
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const chartContainerStyles: React.CSSProperties = {
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px',
    borderRadius: '15px',
    boxShadow: getNeuInsetShadow(5, 15),
    background: MARBLE.base,
    overflowX: 'auto',
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; PieChart_</h1>
        <p style={descStyles}>// Gráficos circulares para proporciones y distribuciones</p>
      </header>

      <ShowcaseSection title="Default Pie" description="Basic pie chart">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={allocationData} title="Portfolio Allocation" height={400} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Donut" description="Pie with inner radius for center content">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={allocationData} title="Asset Allocation" height={400} variant="donut" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Rose (Nightingale)" description="Radius varies by value for emphasis">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={sectorData} title="Sector Distribution" height={400} variant="rose" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Donut with Center Label" description="Display aggregate value in center">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart
              data={simpleData}
              title="Allocation"
              height={400}
              variant="donut"
              centerLabel="Total"
              centerValue="$125,000"
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Colors" description="Per-segment custom coloring">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={sectorData} title="Sector Breakdown" height={400} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Without Labels" description="Clean look without slice labels">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={allocationData} height={350} showLabels={false} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact Size" description="Smaller charts for dashboards">
        <div style={chartContainerStyles}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '200px' }}>
              <PieChart data={simpleData} height={200} showLabels={false} />
            </div>
            <div style={{ width: '200px' }}>
              <PieChart data={simpleData} height={200} variant="donut" showLabels={false} />
            </div>
            <div style={{ width: '200px' }}>
              <PieChart data={simpleData} height={200} variant="rose" showLabels={false} />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Variants Comparison" description="All three variants side by side">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <PieChart data={allocationData} title="Pie" height={300} variant="pie" />
            </div>
            <div>
              <PieChart data={allocationData} title="Donut" height={300} variant="donut" />
            </div>
            <div>
              <PieChart data={allocationData} title="Rose" height={300} variant="rose" />
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
            fontFamily: 'var(--fing-font-mono)',
          }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: 'data', type: 'PieDataPoint[]', default: 'required', desc: 'Array of segments with name and value' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '350', desc: 'Chart height in pixels' },
                { prop: 'variant', type: "'pie' | 'donut' | 'rose'", default: "'pie'", desc: 'Chart variant style' },
                { prop: 'showLabels', type: 'boolean', default: 'true', desc: 'Show segment labels' },
                { prop: 'centerLabel', type: 'string', default: '-', desc: 'Center label (donut only)' },
                { prop: 'centerValue', type: 'string', default: '-', desc: 'Center value (donut only)' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-primary)' }}>{row.prop}</td>
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

export function PieChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <PieChartContent />
    </LightEngineProvider>
  );
}

export default PieChartShowcase;
