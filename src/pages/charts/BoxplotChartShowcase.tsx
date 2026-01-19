// Path: src/pages/charts/BoxplotChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Boxplot Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { BoxplotChart } from '../../components/charts/echarts';
import type { BoxplotData } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const returnDistribution: BoxplotData[] = [
  { name: 'AAPL', value: [-8, -2, 3, 8, 15] },
  { name: 'MSFT', value: [-5, 0, 4, 10, 18] },
  { name: 'GOOGL', value: [-10, -4, 2, 7, 14] },
  { name: 'AMZN', value: [-12, -3, 5, 12, 22] },
  { name: 'META', value: [-15, -5, 0, 8, 18] },
];

const sectorComparison: BoxplotData[] = [
  { name: 'Tech', value: [-8, 2, 8, 15, 25] },
  { name: 'Healthcare', value: [-5, 0, 4, 8, 12] },
  { name: 'Finance', value: [-10, -2, 3, 8, 15] },
  { name: 'Energy', value: [-20, -8, 0, 10, 25] },
  { name: 'Utilities', value: [-3, 1, 3, 5, 8] },
];

const monthlyVolatility: BoxplotData[] = [
  { name: 'Jan', value: [5, 10, 15, 22, 30] },
  { name: 'Feb', value: [8, 12, 18, 25, 35] },
  { name: 'Mar', value: [10, 15, 22, 30, 45] },
  { name: 'Apr', value: [6, 10, 14, 20, 28] },
  { name: 'May', value: [4, 8, 12, 16, 22] },
  { name: 'Jun', value: [5, 9, 13, 18, 25] },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function BoxplotChartContent() {
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
    marginBottom: '32px', padding: '24px', background: MARBLE.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60), transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px', fontWeight: 700, color: 'var(--sentinel-accent-primary)', marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)', textTransform: 'uppercase', letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase', letterSpacing: '0.03em',
  };

  const chartContainerStyles: React.CSSProperties = {
    padding: '24px', background: MARBLE.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px', borderRadius: '15px', boxShadow: getNeuInsetShadow(5, 15),
    background: MARBLE.base, overflowX: 'auto', transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; BoxplotChart_</h1>
        <p style={descStyles}>// Distribución estadística con mediana, cuartiles y outliers</p>
      </header>

      <ShowcaseSection title="Return Distribution" description="Stock return distributions with outliers">
        <div style={chartContainerStyles}>
          <BoxplotChart data={returnDistribution} title="Annual Return Distribution (%)" height={400} formatValue={(v) => `${v}%`} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sector Comparison" description="Compare distributions across sectors">
        <div style={chartContainerStyles}>
          <BoxplotChart data={sectorComparison} title="Sector Performance Spread" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Horizontal" description="Horizontal orientation for long labels">
        <div style={chartContainerStyles}>
          <BoxplotChart data={returnDistribution} title="Return Distribution" height={400} horizontal />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Time Series" description="Monthly volatility distribution">
        <div style={chartContainerStyles}>
          <BoxplotChart data={monthlyVolatility} title="Monthly Volatility (VIX)" height={350} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller boxplot for dashboard widgets">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            <BoxplotChart data={sectorComparison.slice(0, 4)} height={250} />
            <BoxplotChart data={monthlyVolatility.slice(0, 4)} height={250} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={tableContainerStyles}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--sentinel-font-mono)' }}>
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
                { prop: 'data', type: 'BoxplotData[]', default: 'required', desc: 'Array of boxplot data with values [min, Q1, median, Q3, max]' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'horizontal', type: 'boolean', default: 'false', desc: 'Horizontal orientation' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
                { prop: 'formatValue', type: '(v: number) => string', default: '-', desc: 'Value formatter' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', color: 'var(--sentinel-text-primary)' }}>{row.prop}</td>
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

export function BoxplotChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <BoxplotChartContent />
    </LightEngineProvider>
  );
}

export default BoxplotChartShowcase;
