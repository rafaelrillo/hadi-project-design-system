// Path: src/pages/charts/HeatMapShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism HeatMap
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { HeatMap } from '../../components/charts/echarts';
import type { HeatMapDataPoint } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const correlationAssets = ['SPY', 'QQQ', 'IWM', 'TLT', 'GLD', 'VNQ'];

const correlationData: HeatMapDataPoint[] = [
  { x: 'SPY', y: 'SPY', value: 1.0 }, { x: 'SPY', y: 'QQQ', value: 0.92 }, { x: 'SPY', y: 'IWM', value: 0.88 },
  { x: 'SPY', y: 'TLT', value: -0.35 }, { x: 'SPY', y: 'GLD', value: 0.12 }, { x: 'SPY', y: 'VNQ', value: 0.72 },
  { x: 'QQQ', y: 'SPY', value: 0.92 }, { x: 'QQQ', y: 'QQQ', value: 1.0 }, { x: 'QQQ', y: 'IWM', value: 0.78 },
  { x: 'QQQ', y: 'TLT', value: -0.42 }, { x: 'QQQ', y: 'GLD', value: 0.08 }, { x: 'QQQ', y: 'VNQ', value: 0.65 },
  { x: 'IWM', y: 'SPY', value: 0.88 }, { x: 'IWM', y: 'QQQ', value: 0.78 }, { x: 'IWM', y: 'IWM', value: 1.0 },
  { x: 'IWM', y: 'TLT', value: -0.28 }, { x: 'IWM', y: 'GLD', value: 0.15 }, { x: 'IWM', y: 'VNQ', value: 0.75 },
  { x: 'TLT', y: 'SPY', value: -0.35 }, { x: 'TLT', y: 'QQQ', value: -0.42 }, { x: 'TLT', y: 'IWM', value: -0.28 },
  { x: 'TLT', y: 'TLT', value: 1.0 }, { x: 'TLT', y: 'GLD', value: 0.45 }, { x: 'TLT', y: 'VNQ', value: 0.25 },
  { x: 'GLD', y: 'SPY', value: 0.12 }, { x: 'GLD', y: 'QQQ', value: 0.08 }, { x: 'GLD', y: 'IWM', value: 0.15 },
  { x: 'GLD', y: 'TLT', value: 0.45 }, { x: 'GLD', y: 'GLD', value: 1.0 }, { x: 'GLD', y: 'VNQ', value: 0.22 },
  { x: 'VNQ', y: 'SPY', value: 0.72 }, { x: 'VNQ', y: 'QQQ', value: 0.65 }, { x: 'VNQ', y: 'IWM', value: 0.75 },
  { x: 'VNQ', y: 'TLT', value: 0.25 }, { x: 'VNQ', y: 'GLD', value: 0.22 }, { x: 'VNQ', y: 'VNQ', value: 1.0 },
];

const performanceData: HeatMapDataPoint[] = [];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];
stocks.forEach((stock) => {
  months.forEach((month) => {
    performanceData.push({ x: month, y: stock, value: Math.round((Math.random() - 0.3) * 20 * 10) / 10 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function HeatMapContent() {
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
    marginBottom: '32px', padding: '24px', background: LIGHT.base, borderRadius: '15px',
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
    padding: '24px', background: LIGHT.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px', borderRadius: '15px', boxShadow: getNeuInsetShadow(5, 15),
    background: LIGHT.base, overflowX: 'auto', transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; HeatMap_</h1>
        <p style={descStyles}>// Matriz de correlación con colores codificados</p>
      </header>

      <ShowcaseSection title="Correlation Matrix" description="Asset correlation with diverging color scheme">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <HeatMap data={correlationData} xCategories={correlationAssets} yCategories={correlationAssets} title="Asset Correlations" height={450} colorScheme="diverging" showValues />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Performance Grid" description="Monthly performance by stock">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <HeatMap data={performanceData} xCategories={months} yCategories={stocks} title="Monthly Returns (%)" height={350} colorScheme="diverging" showValues formatValue={(v) => `${v > 0 ? '+' : ''}${v}%`} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sequential Color Scheme" description="Single color gradient for positive values">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <HeatMap data={correlationData.filter((d) => d.value >= 0)} xCategories={correlationAssets} yCategories={correlationAssets} title="Positive Correlations" height={450} colorScheme="sequential" showValues />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Without Values" description="Clean view without cell values">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '550px', margin: '0 auto' }}>
            <HeatMap data={correlationData} xCategories={correlationAssets} yCategories={correlationAssets} height={400} colorScheme="diverging" showValues={false} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller heatmap for dashboards">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <HeatMap data={correlationData} xCategories={correlationAssets} yCategories={correlationAssets} height={300} colorScheme="diverging" showValues={false} />
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
                { prop: 'data', type: 'HeatMapDataPoint[]', default: 'required', desc: 'Array of x, y, value data points' },
                { prop: 'xCategories', type: 'string[]', default: 'required', desc: 'X-axis category labels' },
                { prop: 'yCategories', type: 'string[]', default: 'required', desc: 'Y-axis category labels' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'colorScheme', type: "'sequential' | 'diverging'", default: "'sequential'", desc: 'Color scale type' },
                { prop: 'showValues', type: 'boolean', default: 'true', desc: 'Show values in cells' },
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

export function HeatMapShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <HeatMapContent />
    </LightEngineProvider>
  );
}

export default HeatMapShowcase;
