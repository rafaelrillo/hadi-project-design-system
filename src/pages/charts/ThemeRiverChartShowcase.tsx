// Path: src/pages/charts/ThemeRiverChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism ThemeRiver Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { ThemeRiverChart } from '../../components/charts/echarts';
import type { ThemeRiverDataPoint } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

function generateRiverData(): ThemeRiverDataPoint[] {
  const data: ThemeRiverDataPoint[] = [];
  const categories = ['Tech', 'Healthcare', 'Finance', 'Energy', 'Consumer'];
  const now = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    categories.forEach((cat, idx) => {
      const base = 20 + idx * 10;
      const wave = Math.sin((i + idx * 2) * 0.3) * 10;
      const value = Math.max(5, base + wave + Math.random() * 5);
      data.push({ date: dateStr, value: Number(value.toFixed(1)), name: cat });
    });
  }

  return data;
}

function generateMarketData(): ThemeRiverDataPoint[] {
  const data: ThemeRiverDataPoint[] = [];
  const now = new Date();

  for (let i = 60; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const phase = i / 20;
    const bullish = 40 + Math.sin(phase) * 20 + Math.random() * 10;
    const bearish = 30 - Math.sin(phase) * 15 + Math.random() * 10;
    const neutral = 100 - bullish - bearish;

    data.push({ date: dateStr, value: Number(bullish.toFixed(1)), name: 'Bullish' });
    data.push({ date: dateStr, value: Number(neutral.toFixed(1)), name: 'Neutral' });
    data.push({ date: dateStr, value: Number(bearish.toFixed(1)), name: 'Bearish' });
  }

  return data;
}

const sectorFlowData = generateRiverData();
const sentimentData = generateMarketData();

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function ThemeRiverChartContent() {
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
        <h1 style={titleStyles}>&gt; ThemeRiverChart_</h1>
        <p style={descStyles}>// Stream graph mostrando proporciones en el tiempo</p>
      </header>

      <ShowcaseSection title="Sector Flow" description="Sector allocation changes over time">
        <div style={chartContainerStyles}>
          <ThemeRiverChart data={sectorFlowData} title="Sector Allocation Flow" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Market Sentiment" description="Shifting sentiment proportions">
        <div style={chartContainerStyles}>
          <ThemeRiverChart data={sentimentData} title="Market Sentiment Flow" height={350} colors={['#4a7a6a', '#5a8fb8', '#b85c5c']} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Colors" description="Theme-matched color palette">
        <div style={chartContainerStyles}>
          <ThemeRiverChart data={sectorFlowData} title="Portfolio Distribution" height={350} colors={['#5ba3a5', '#7ecbcc', '#4a7a6a', '#c4a35a', '#8b7ec7']} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller river chart for dashboards">
        <div style={chartContainerStyles}>
          <ThemeRiverChart data={sentimentData} height={250} />
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
                { prop: 'data', type: 'ThemeRiverDataPoint[]', default: 'required', desc: 'Array of date, value, name data points' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '350', desc: 'Chart height in pixels' },
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

export function ThemeRiverChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <ThemeRiverChartContent />
    </LightEngineProvider>
  );
}

export default ThemeRiverChartShowcase;
