// Path: src/pages/charts/RadarChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Radar Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { RadarChart } from '../../components/charts/echarts';
import type { RadarIndicator, RadarSeriesData } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const riskIndicators: RadarIndicator[] = [
  { name: 'Volatility', max: 100 },
  { name: 'Liquidity', max: 100 },
  { name: 'Concentration', max: 100 },
  { name: 'Beta', max: 100 },
  { name: 'Drawdown', max: 100 },
  { name: 'Correlation', max: 100 },
];

const singleSeries: RadarSeriesData[] = [
  { name: 'Current Portfolio', value: [75, 85, 45, 60, 55, 70] },
];

const multiSeries: RadarSeriesData[] = [
  { name: 'Your Portfolio', value: [75, 85, 45, 60, 55, 70], color: '#5ba3a5' },
  { name: 'Benchmark', value: [60, 70, 60, 50, 65, 55], color: '#c4a35a' },
];

const stockIndicators: RadarIndicator[] = [
  { name: 'P/E Ratio', max: 50 },
  { name: 'P/B Ratio', max: 10 },
  { name: 'ROE', max: 40 },
  { name: 'Debt/Equity', max: 2 },
  { name: 'Revenue Growth', max: 30 },
  { name: 'Margin', max: 50 },
];

const stockComparison: RadarSeriesData[] = [
  { name: 'AAPL', value: [28, 35, 25, 1.2, 8, 25], color: '#5ba3a5' },
  { name: 'MSFT', value: [32, 12, 35, 0.4, 12, 35], color: '#7ecbcc' },
  { name: 'GOOGL', value: [25, 6, 28, 0.1, 15, 28], color: '#c4a35a' },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function RadarChartContent() {
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
        <h1 style={titleStyles}>&gt; RadarChart_</h1>
        <p style={descStyles}>// Comparación multidimensional para perfiles de riesgo</p>
      </header>

      <ShowcaseSection title="Single Series" description="Basic radar with one data series">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <RadarChart indicators={riskIndicators} data={singleSeries} title="Risk Profile" height={400} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Comparison" description="Compare two or more data series">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <RadarChart indicators={riskIndicators} data={multiSeries} title="Portfolio vs Benchmark" height={400} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Stock Comparison" description="Compare multiple stocks across metrics">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '550px', margin: '0 auto' }}>
            <RadarChart indicators={stockIndicators} data={stockComparison} title="Fundamental Analysis" height={450} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With Area Fill" description="Filled area for better visualization">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <RadarChart indicators={riskIndicators} data={singleSeries} title="Risk Assessment" height={400} fillOpacity={0.4} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Circle Shape" description="Circular radar instead of polygon">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <RadarChart indicators={riskIndicators} data={multiSeries} title="Circular Comparison" height={400} shape="circle" fillOpacity={0.4} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact Size" description="Smaller charts for dashboards">
        <div style={chartContainerStyles}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '250px' }}>
              <RadarChart indicators={riskIndicators} data={singleSeries} height={250} fillOpacity={0.4} />
            </div>
            <div style={{ width: '250px' }}>
              <RadarChart indicators={riskIndicators} data={multiSeries} height={250} shape="circle" />
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
                { prop: 'indicators', type: 'RadarIndicator[]', default: 'required', desc: 'Axis definitions with name and max value' },
                { prop: 'data', type: 'RadarSeriesData[]', default: 'required', desc: 'Array of data series' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'fillOpacity', type: 'number', default: '0.3', desc: 'Opacity of area fill' },
                { prop: 'shape', type: "'polygon' | 'circle'", default: "'polygon'", desc: 'Grid shape' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
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

export function RadarChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <RadarChartContent />
    </LightEngineProvider>
  );
}

export default RadarChartShowcase;
