// Path: src/pages/charts/BarChartShowcase.tsx
// FING Design System - Glass-Neumorphism Bar Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { BarChart } from '../../components/charts/echarts';
import type { BarDataPoint, BarSeriesData } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const categories = ['Technology', 'Healthcare', 'Finance', 'Consumer', 'Energy', 'Materials'];

const simpleBarData: BarDataPoint[] = [
  { category: 'Technology', value: 28.5 },
  { category: 'Healthcare', value: 18.2 },
  { category: 'Finance', value: 15.7 },
  { category: 'Consumer', value: 12.3 },
  { category: 'Energy', value: 8.9 },
  { category: 'Materials', value: 6.4 },
];

const performanceCategories = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA'];
const performanceData: BarDataPoint[] = [
  { category: 'AAPL', value: 12.5, color: '#4a7a6a' },
  { category: 'MSFT', value: 8.3, color: '#4a7a6a' },
  { category: 'GOOGL', value: 5.2, color: '#4a7a6a' },
  { category: 'AMZN', value: -2.1, color: '#b85c5c' },
  { category: 'META', value: -4.8, color: '#b85c5c' },
  { category: 'TSLA', value: -8.2, color: '#b85c5c' },
];

const quarterCategories = ['Tech', 'Health', 'Finance', 'Consumer'];
const multiSeriesData: BarSeriesData[] = [
  { name: 'Q1', data: [45, 32, 28, 21] },
  { name: 'Q2', data: [52, 38, 25, 27] },
  { name: 'Q3', data: [48, 42, 31, 24] },
];

const monthCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const stackedData: BarSeriesData[] = [
  { name: 'Stocks', data: [35, 38, 42, 40, 45, 48] },
  { name: 'Bonds', data: [25, 24, 22, 23, 21, 20] },
  { name: 'Cash', data: [15, 12, 10, 12, 8, 7] },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function BarChartContent() {
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
        <h1 style={titleStyles}>&gt; BarChart_</h1>
        <p style={descStyles}>// Gráfico de barras para comparar datos categóricos</p>
      </header>

      <ShowcaseSection title="Default" description="Basic vertical bar chart">
        <div style={chartContainerStyles}>
          <BarChart categories={categories} data={simpleBarData} title="Sector Allocation" height={350} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Horizontal" description="Horizontal bar orientation">
        <div style={chartContainerStyles}>
          <BarChart categories={categories} data={simpleBarData} title="Sector Allocation" height={350} horizontal />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Positive/Negative Coloring" description="Custom coloring based on positive or negative values">
        <div style={chartContainerStyles}>
          <BarChart
            categories={performanceCategories}
            data={performanceData}
            title="YTD Performance (%)"
            height={350}
            formatValue={(v) => `${v > 0 ? '+' : ''}${v}%`}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Multi-Series (Grouped)" description="Compare multiple series side by side">
        <div style={chartContainerStyles}>
          <BarChart categories={quarterCategories} data={multiSeriesData} title="Quarterly Performance" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Stacked" description="Stack series on top of each other">
        <div style={chartContainerStyles}>
          <BarChart categories={monthCategories} data={stackedData} title="Portfolio Composition" height={400} stacked />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Stacked Horizontal" description="Horizontal stacked bars">
        <div style={chartContainerStyles}>
          <BarChart
            categories={monthCategories}
            data={stackedData}
            title="Monthly Allocation"
            height={350}
            stacked
            horizontal
          />
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
                { prop: 'categories', type: 'string[]', default: 'required', desc: 'Category labels for x-axis' },
                { prop: 'data', type: 'BarDataPoint[] | BarSeriesData[]', default: 'required', desc: 'Single or multiple series data' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '300', desc: 'Chart height in pixels' },
                { prop: 'horizontal', type: 'boolean', default: 'false', desc: 'Horizontal orientation' },
                { prop: 'stacked', type: 'boolean', default: 'false', desc: 'Stack series' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
                { prop: 'formatValue', type: '(v: number) => string', default: '-', desc: 'Value formatter function' },
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

export function BarChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <BarChartContent />
    </LightEngineProvider>
  );
}

export default BarChartShowcase;
