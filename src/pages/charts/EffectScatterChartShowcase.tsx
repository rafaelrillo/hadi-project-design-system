// Path: src/pages/charts/EffectScatterChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism EffectScatter Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { EffectScatterChart } from '../../components/charts/echarts';
import type { EffectScatterDataPoint, EffectScatterSeriesData } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const highlightData: EffectScatterDataPoint[] = [
  { x: 15, y: 25, value: 5, name: 'AAPL - Strong Buy' },
  { x: 45, y: 35, value: 3, name: 'NVDA - Momentum' },
  { x: 75, y: 55, value: 4, name: 'TSLA - Breakout' },
  { x: 30, y: 65, value: 2, name: 'MSFT - Support Level' },
];

const alertPoints: EffectScatterDataPoint[] = [
  { x: 20, y: 80, value: 5, name: 'Overbought Alert' },
  { x: 80, y: 20, value: 5, name: 'Oversold Alert' },
  { x: 50, y: 50, value: 3, name: 'Breakout Signal' },
];

const multiSeriesData: EffectScatterSeriesData[] = [
  { name: 'Strong Signals', data: [{ x: 10, y: 85 }, { x: 25, y: 90 }, { x: 40, y: 88 }], color: '#4a7a6a', showEffect: true },
  { name: 'Moderate Signals', data: [{ x: 50, y: 60 }, { x: 65, y: 55 }, { x: 80, y: 65 }], color: '#c4a35a', showEffect: true },
  { name: 'Weak Signals', data: [{ x: 30, y: 25 }, { x: 55, y: 20 }, { x: 75, y: 30 }], color: '#b85c5c', showEffect: false },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function EffectScatterChartContent() {
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
        <h1 style={titleStyles}>&gt; EffectScatterChart_</h1>
        <p style={descStyles}>// Scatter con efectos de onda animados</p>
      </header>

      <ShowcaseSection title="Trading Signals" description="Highlight important trading signals with ripple effect">
        <div style={chartContainerStyles}>
          <EffectScatterChart data={highlightData} title="Signal Alerts" xAxisLabel="RSI" yAxisLabel="Volume Score" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alert Points" description="Overbought/oversold alerts">
        <div style={chartContainerStyles}>
          <EffectScatterChart data={alertPoints} title="Market Alerts" xAxisLabel="Time" yAxisLabel="Price Level" height={400} rippleScale={5} ripplePeriod={2} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Multi-Series with Selective Effects" description="Different series with varying effect visibility">
        <div style={chartContainerStyles}>
          <EffectScatterChart data={multiSeriesData} title="Signal Strength Analysis" xAxisLabel="Confidence" yAxisLabel="Signal Strength" height={450} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Effect on Hover Only" description="Ripple effect shows only on emphasis/hover">
        <div style={chartContainerStyles}>
          <EffectScatterChart data={highlightData} title="Hover for Effect" height={350} showAllEffects={false} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Ripple Settings" description="Adjust ripple scale and period">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            <div>
              <EffectScatterChart data={alertPoints} height={300} rippleScale={2} ripplePeriod={4} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Scale: 2, Period: 4s</p>
            </div>
            <div>
              <EffectScatterChart data={alertPoints} height={300} rippleScale={6} ripplePeriod={1.5} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Scale: 6, Period: 1.5s</p>
            </div>
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
                { prop: 'data', type: 'EffectScatterDataPoint[] | EffectScatterSeriesData[]', default: 'required', desc: 'Single or multi-series data' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'xAxisLabel', type: 'string', default: '-', desc: 'X-axis label' },
                { prop: 'yAxisLabel', type: 'string', default: '-', desc: 'Y-axis label' },
                { prop: 'effectType', type: "'ripple' | 'none'", default: "'ripple'", desc: 'Animation effect type' },
                { prop: 'rippleScale', type: 'number', default: '3', desc: 'Ripple scale multiplier' },
                { prop: 'ripplePeriod', type: 'number', default: '3', desc: 'Ripple animation period in seconds' },
                { prop: 'showAllEffects', type: 'boolean', default: 'true', desc: 'Show effects on render vs hover' },
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

export function EffectScatterChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <EffectScatterChartContent />
    </LightEngineProvider>
  );
}

export default EffectScatterChartShowcase;
