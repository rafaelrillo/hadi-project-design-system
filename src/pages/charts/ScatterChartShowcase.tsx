// Path: src/pages/charts/ScatterChartShowcase.tsx
// FING Design System - Glass-Neumorphism Scatter Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { ScatterChart } from '../../components/charts/echarts';
import type { ScatterDataPoint, ScatterSeriesData } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const riskReturnData: ScatterDataPoint[] = [
  { x: 8, y: 6.2, name: 'AAPL', size: 28 },
  { x: 12, y: 8.5, name: 'MSFT', size: 24 },
  { x: 15, y: 10.2, name: 'GOOGL', size: 18 },
  { x: 22, y: 12.8, name: 'AMZN', size: 16 },
  { x: 35, y: 18.5, name: 'TSLA', size: 12 },
  { x: 18, y: 9.2, name: 'META', size: 14 },
  { x: 25, y: 14.5, name: 'NVDA', size: 14 },
  { x: 6, y: 4.2, name: 'JNJ', size: 10 },
  { x: 10, y: 5.8, name: 'JPM', size: 11 },
  { x: 5, y: 3.5, name: 'KO', size: 8 },
];

const multiSeriesData: ScatterSeriesData[] = [
  {
    name: 'Technology',
    data: [
      { x: 15, y: 12, size: 20 },
      { x: 18, y: 14, size: 18 },
      { x: 22, y: 16, size: 15 },
      { x: 25, y: 18, size: 12 },
      { x: 28, y: 20, size: 10 },
    ],
    color: '#5ba3a5',
  },
  {
    name: 'Healthcare',
    data: [
      { x: 8, y: 6, size: 15 },
      { x: 10, y: 7, size: 13 },
      { x: 12, y: 8, size: 12 },
      { x: 14, y: 9, size: 10 },
    ],
    color: '#7ecbcc',
  },
  {
    name: 'Finance',
    data: [
      { x: 12, y: 8, size: 18 },
      { x: 14, y: 10, size: 15 },
      { x: 16, y: 11, size: 13 },
      { x: 18, y: 12, size: 11 },
    ],
    color: '#c4a35a',
  },
];

const correlationData: ScatterDataPoint[] = [];
for (let i = 0; i < 50; i++) {
  const x = Math.random() * 100;
  const y = x * 0.7 + (Math.random() - 0.5) * 30;
  correlationData.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function ScatterChartContent() {
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
        <h1 style={titleStyles}>&gt; ScatterChart_</h1>
        <p style={descStyles}>// Dispersión XY para análisis de correlación</p>
      </header>

      <ShowcaseSection title="Risk vs Return" description="Bubble size represents market cap">
        <div style={chartContainerStyles}>
          <ScatterChart data={riskReturnData} title="Risk-Return Analysis" xAxisLabel="Volatility (%)" yAxisLabel="Return (%)" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Multi-Series" description="Compare multiple categories">
        <div style={chartContainerStyles}>
          <ScatterChart data={multiSeriesData} title="Sector Comparison" xAxisLabel="Risk" yAxisLabel="Return" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Correlation Plot" description="Data points showing linear correlation">
        <div style={chartContainerStyles}>
          <ScatterChart data={correlationData} title="Price Correlation" xAxisLabel="Asset A" yAxisLabel="Asset B" height={400} symbolSize={8} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Symbol Size" description="Adjust point size for different visualizations">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <ScatterChart data={riskReturnData} xAxisLabel="Risk" yAxisLabel="Return" height={300} symbolSize={10} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--fing-font-mono)' }}>Fixed Size: 10</p>
            </div>
            <div>
              <ScatterChart data={riskReturnData} xAxisLabel="Risk" yAxisLabel="Return" height={300} symbolSize={20} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--fing-font-mono)' }}>Fixed Size: 20</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller scatter for dashboards">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <ScatterChart data={correlationData.slice(0, 30)} height={250} symbolSize={6} />
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
                { prop: 'data', type: 'ScatterDataPoint[] | ScatterSeriesData[]', default: 'required', desc: 'Single or multi-series data' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'xAxisLabel', type: 'string', default: '-', desc: 'X-axis label' },
                { prop: 'yAxisLabel', type: 'string', default: '-', desc: 'Y-axis label' },
                { prop: 'symbolSize', type: 'number | function', default: '15', desc: 'Point size or sizing function' },
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

export function ScatterChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <ScatterChartContent />
    </LightEngineProvider>
  );
}

export default ScatterChartShowcase;
