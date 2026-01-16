// Path: src/pages/charts/LineChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Line Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { LineChart } from '../../components/charts/echarts';
import type { TimeSeriesDataPoint, SeriesData } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

function generateTimeSeriesData(days: number, baseValue: number, volatility: number): TimeSeriesDataPoint[] {
  const data: TimeSeriesDataPoint[] = [];
  const now = new Date();
  let value = baseValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    value += (Math.random() - 0.45) * volatility;
    data.push({
      time: date.toISOString().split('T')[0],
      value: Number(value.toFixed(2)),
    });
  }

  return data;
}

function generateSeriesData(days: number, baseValue: number, volatility: number): Array<{ x: string; y: number }> {
  const data: Array<{ x: string; y: number }> = [];
  const now = new Date();
  let value = baseValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    value += (Math.random() - 0.45) * volatility;
    data.push({
      x: date.toISOString().split('T')[0],
      y: Number(value.toFixed(2)),
    });
  }

  return data;
}

const singleSeriesData = generateTimeSeriesData(90, 100, 3);

const multiSeriesData: SeriesData[] = [
  { id: 'portfolio', name: 'Portfolio', data: generateSeriesData(90, 100, 3), color: '#5ba3a5' },
  { id: 'sp500', name: 'S&P 500', data: generateSeriesData(90, 100, 2), color: '#7ecbcc' },
  { id: 'nasdaq', name: 'NASDAQ', data: generateSeriesData(90, 100, 4), color: '#c4a35a' },
];

const sparklineData = generateTimeSeriesData(30, 50, 2);

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function LineChartContent() {
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
        <h1 style={titleStyles}>&gt; LineChart_</h1>
        <p style={descStyles}>// Gráfico de línea para series temporales y comparaciones</p>
      </header>

      <ShowcaseSection title="Default" description="Basic line chart with single series">
        <div style={chartContainerStyles}>
          <LineChart data={singleSeriesData} height={350} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With Title" description="Line chart with custom title">
        <div style={chartContainerStyles}>
          <LineChart data={singleSeriesData} title="Portfolio Performance" height={350} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Area Chart" description="Filled area below the line">
        <div style={chartContainerStyles}>
          <LineChart data={singleSeriesData} title="Growth Trend" height={350} enableArea />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Area with Custom Opacity" description="Area fill with adjusted opacity">
        <div style={chartContainerStyles}>
          <LineChart data={singleSeriesData} title="Revenue Growth" height={350} enableArea areaOpacity={0.5} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Multi-Series" description="Compare multiple data series">
        <div style={chartContainerStyles}>
          <LineChart data={multiSeriesData} title="Performance Comparison" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Multi-Series with Area" description="Multiple series with area fills">
        <div style={chartContainerStyles}>
          <LineChart data={multiSeriesData} title="Index Comparison" height={400} enableArea />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Smooth Lines" description="Smoothed curve interpolation">
        <div style={chartContainerStyles}>
          <LineChart data={singleSeriesData} height={350} smooth />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sparkline (Minimal)" description="Minimal chart without axes for inline display">
        <div style={chartContainerStyles}>
          <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <LineChart data={sparklineData} height={80} minimal />
            </div>
            <div style={{ flex: 1 }}>
              <LineChart data={sparklineData} height={80} minimal enableArea />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With Zoom" description="Enable zoom slider for data navigation">
        <div style={chartContainerStyles}>
          <LineChart data={singleSeriesData} height={400} showDataZoom />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Value Format" description="Format values as currency">
        <div style={chartContainerStyles}>
          <LineChart
            data={singleSeriesData}
            title="Portfolio Value"
            height={350}
            formatValue={(v) => `$${v.toLocaleString()}`}
            enableArea
          />
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
                { prop: 'data', type: 'TimeSeriesDataPoint[] | SeriesData[]', default: 'required', desc: 'Single or multiple series data' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '300', desc: 'Chart height in pixels' },
                { prop: 'enableArea', type: 'boolean', default: 'false', desc: 'Fill area below line' },
                { prop: 'areaOpacity', type: 'number', default: '0.3', desc: 'Opacity of area fill' },
                { prop: 'smooth', type: 'boolean', default: 'false', desc: 'Smooth line interpolation' },
                { prop: 'minimal', type: 'boolean', default: 'false', desc: 'Hide axes for sparkline mode' },
                { prop: 'showDataZoom', type: 'boolean', default: 'false', desc: 'Show zoom slider' },
                { prop: 'stacked', type: 'boolean', default: 'false', desc: 'Stack multi-series data' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
                { prop: 'formatValue', type: '(v: number) => string', default: '-', desc: 'Value formatter function' },
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

export function LineChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <LineChartContent />
    </LightEngineProvider>
  );
}

export default LineChartShowcase;
