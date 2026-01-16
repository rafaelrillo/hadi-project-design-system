// Path: src/pages/charts/PictorialBarChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism PictorialBar Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { PictorialBarChart, pictorialSymbols } from '../../components/charts/echarts';
import type { PictorialBarDataPoint } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const investorData: PictorialBarDataPoint[] = [
  { name: 'Retail', value: 35 },
  { name: 'Institutional', value: 45 },
  { name: 'Hedge Funds', value: 12 },
  { name: 'Banks', value: 8 },
];

const growthData: PictorialBarDataPoint[] = [
  { name: 'Q1', value: 15, color: '#4a9a7c' },
  { name: 'Q2', value: 22, color: '#5ba3a5' },
  { name: 'Q3', value: 18, color: '#7ecbcc' },
  { name: 'Q4', value: 28, color: '#5ba3a5' },
];

const comparisonData: PictorialBarDataPoint[] = [
  { name: 'Tech', value: 85 },
  { name: 'Health', value: 72 },
  { name: 'Finance', value: 65 },
  { name: 'Energy', value: 45 },
  { name: 'Consumer', value: 55 },
];

const walletData: PictorialBarDataPoint[] = [
  { name: 'Stocks', value: 60 },
  { name: 'Bonds', value: 25 },
  { name: 'Cash', value: 10 },
  { name: 'Crypto', value: 5 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function PictorialBarChartContent() {
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

  const symbolChipStyles: React.CSSProperties = {
    padding: '4px 12px',
    background: 'rgba(91, 163, 165, 0.15)',
    borderRadius: '8px',
    fontSize: '12px',
    fontFamily: 'var(--sentinel-font-mono)',
    color: '#636E72',
  };

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; PictorialBarChart_</h1>
        <p style={descStyles}>// Barras con símbolos personalizados</p>
      </header>

      <ShowcaseSection title="Default (Round Rectangle)" description="Basic pictorial bar with rounded rectangle symbols">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <PictorialBarChart data={investorData} title="Investor Distribution" height={350} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Circle Symbol" description="Circular symbols scale by value">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <PictorialBarChart data={growthData} title="Quarterly Growth (%)" height={350} symbol={pictorialSymbols.circle} symbolSize={50} formatValue={(v) => `${v}%`} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Diamond Symbol" description="Diamond shapes scale proportionally">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <PictorialBarChart data={walletData} title="Portfolio Allocation" height={350} symbol={pictorialSymbols.diamond} symbolSize={50} formatValue={(v) => `${v}%`} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Horizontal" description="Horizontal orientation with bar fill">
        <div style={chartContainerStyles}>
          <PictorialBarChart data={comparisonData} title="Sector Ratings" height={350} horizontal symbol={pictorialSymbols.roundRect} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Symbol Repeat" description="Repeat symbols to show quantity (isotype visualization)">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <PictorialBarChart data={[{ name: 'Jan', value: 5 }, { name: 'Feb', value: 8 }, { name: 'Mar', value: 6 }, { name: 'Apr', value: 10 }]} title="Monthly Trades" height={350} symbol={pictorialSymbols.rect} symbolRepeat symbolSize={[25, 25]} maxValue={12} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Triangle Symbol" description="Triangle pointing up for growth metrics">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <PictorialBarChart data={growthData} title="Growth Indicators" height={350} symbol={pictorialSymbols.triangle} symbolSize={45} formatValue={(v) => `${v}%`} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Shape Comparison" description="All built-in geometric shapes side by side">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            <div>
              <PictorialBarChart data={walletData.slice(0, 3)} height={220} symbol={pictorialSymbols.circle} symbolSize={40} showLabels={false} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Circle</p>
            </div>
            <div>
              <PictorialBarChart data={walletData.slice(0, 3)} height={220} symbol={pictorialSymbols.diamond} symbolSize={40} showLabels={false} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Diamond</p>
            </div>
            <div>
              <PictorialBarChart data={walletData.slice(0, 3)} height={220} symbol={pictorialSymbols.roundRect} showLabels={false} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Round Rect</p>
            </div>
            <div>
              <PictorialBarChart data={walletData.slice(0, 3)} height={220} symbol={pictorialSymbols.triangle} symbolSize={40} showLabels={false} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Triangle</p>
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
                { prop: 'data', type: 'PictorialBarDataPoint[]', default: 'required', desc: 'Array of name/value pairs' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '350', desc: 'Chart height in pixels' },
                { prop: 'symbol', type: 'string', default: "'roundRect'", desc: 'Symbol shape (see pictorialSymbols)' },
                { prop: 'symbolSize', type: 'number | [w, h]', default: '30', desc: 'Symbol size in pixels' },
                { prop: 'symbolRepeat', type: 'boolean | number', default: 'false', desc: 'Repeat symbols (isotype)' },
                { prop: 'horizontal', type: 'boolean', default: 'false', desc: 'Horizontal orientation' },
                { prop: 'showLabels', type: 'boolean', default: 'true', desc: 'Show value labels' },
                { prop: 'showBackground', type: 'boolean', default: 'true', desc: 'Show ghost background bar' },
                { prop: 'maxValue', type: 'number', default: 'auto', desc: 'Maximum axis value' },
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

        <div style={{ marginTop: '24px' }}>
          <h4 style={{ color: '#2D3436', marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Available Symbols (pictorialSymbols)</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.keys(pictorialSymbols).map((key) => (
              <span key={key} style={symbolChipStyles}>{key}</span>
            ))}
          </div>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#636E72', fontStyle: 'italic', fontFamily: 'var(--sentinel-font-mono)' }}>
            Note: Basic shapes (circle, rect, roundRect, triangle, diamond, pin, arrow) work best.
            Custom SVG path symbols (person, dollar, chart, growth, star) may require specific symbolSize tuning.
          </p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function PictorialBarChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <PictorialBarChartContent />
    </LightEngineProvider>
  );
}

export default PictorialBarChartShowcase;
