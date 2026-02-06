// Path: src/pages/charts/ParallelChartShowcase.tsx
// FING Design System - Glass-Neumorphism Parallel Chart
import React from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { ParallelChart } from '../../components/charts/echarts';
import type { ParallelDimension, ParallelSeriesData } from '../../components/charts/echarts';
import { showcase } from '../showcaseStyles';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const stockDimensions: ParallelDimension[] = [
  { name: 'P/E Ratio', min: 0, max: 50 },
  { name: 'P/B Ratio', min: 0, max: 15 },
  { name: 'ROE (%)', min: 0, max: 40 },
  { name: 'Debt/Equity', min: 0, max: 3 },
  { name: 'Dividend Yield (%)', min: 0, max: 8 },
  { name: 'Revenue Growth (%)', min: -10, max: 40 },
];

const stockData: ParallelSeriesData[] = [
  { name: 'AAPL', value: [28, 35, 25, 1.2, 0.5, 8], color: '#5ba3a5' },
  { name: 'MSFT', value: [32, 12, 35, 0.4, 0.8, 12], color: '#7ecbcc' },
  { name: 'GOOGL', value: [25, 6, 28, 0.1, 0, 15], color: '#4a7a6a' },
  { name: 'AMZN', value: [45, 8, 18, 0.8, 0, 22], color: '#c4a35a' },
  { name: 'JNJ', value: [15, 5, 22, 0.5, 2.8, 5], color: '#8b7ec7' },
  { name: 'JPM', value: [10, 1.5, 15, 1.2, 3.2, 8], color: '#c47a5a' },
];

const portfolioDimensions: ParallelDimension[] = [
  { name: 'Return (%)', min: -20, max: 50 },
  { name: 'Volatility (%)', min: 0, max: 40 },
  { name: 'Sharpe Ratio', min: -1, max: 3 },
  { name: 'Max Drawdown (%)', min: 0, max: 50 },
  { name: 'Beta', min: 0, max: 2 },
];

const portfolioData: ParallelSeriesData[] = [
  { name: 'Aggressive', value: [35, 28, 1.2, 35, 1.4], color: '#b85c5c' },
  { name: 'Balanced', value: [18, 15, 1.5, 18, 0.9], color: '#5ba3a5' },
  { name: 'Conservative', value: [8, 8, 1.1, 8, 0.5], color: '#4a7a6a' },
  { name: 'Income', value: [12, 10, 1.3, 12, 0.6], color: '#c4a35a' },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function ParallelChartShowcase() {
  const chartContainerStyles: React.CSSProperties = {
    padding: '24px',
    background: 'var(--marble-base)',
    borderRadius: '20px',
    boxShadow: 'var(--raised-2)',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px',
    borderRadius: '20px',
    boxShadow: 'var(--inset-2)',
    background: 'var(--marble-base)',
    overflowX: 'auto',
  };

  return (
    <div style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}>
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; ParallelChart_</h1>
        <p style={showcase.header.description}>// Visualizacion multi-dimensional con ejes paralelos</p>
      </header>

      <ShowcaseSection title="Stock Metrics Comparison" description="Compare fundamental metrics across stocks">
        <div style={chartContainerStyles}>
          <ParallelChart dimensions={stockDimensions} data={stockData} title="Fundamental Analysis" height={450} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Portfolio Comparison" description="Compare portfolio risk/return profiles">
        <div style={chartContainerStyles}>
          <ParallelChart dimensions={portfolioDimensions} data={portfolioData} title="Portfolio Profiles" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Horizontal Axis Names" description="Axis names without rotation">
        <div style={chartContainerStyles}>
          <ParallelChart dimensions={portfolioDimensions} data={portfolioData} height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller parallel chart for dashboards">
        <div style={chartContainerStyles}>
          <ParallelChart dimensions={portfolioDimensions} data={portfolioData} height={300} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Tecnicas">
        <div style={tableContainerStyles}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--fing-font-mono)' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent)', fontWeight: 600 }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent)', fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent)', fontWeight: 600 }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent)', fontWeight: 600 }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: 'dimensions', type: 'ParallelDimension[]', default: 'required', desc: 'Array of axis definitions with name, min, max' },
                { prop: 'data', type: 'ParallelSeriesData[]', default: 'required', desc: 'Array of series with name and value array' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-primary)' }}>{row.prop}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-muted)' }}>{row.type}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-muted)' }}>{row.default}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-muted)' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export default ParallelChartShowcase;
