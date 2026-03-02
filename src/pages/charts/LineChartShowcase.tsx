// Path: src/pages/charts/LineChartShowcase.tsx
// QUAFI Design System - Glass-Neumorphism Line Chart
import React from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { LineChart } from '../../components/charts/echarts';
import type { TimeSeriesDataPoint, SeriesData } from '../../components/charts/echarts';
import { showcase } from '../showcaseStyles';

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

export function LineChartShowcase() {
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
        <h1 style={showcase.header.title}>&gt; LineChart_</h1>
        <p style={showcase.header.description}>// Grafico de linea para series temporales y comparaciones</p>
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

export default LineChartShowcase;
