// Path: src/pages/charts/CandlestickChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Candlestick Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { CandlestickChart } from '../../components/charts/echarts';
import type { OHLCData } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

function generateCandlestickData(days: number, trend: 'bullish' | 'bearish' | 'sideways' = 'sideways'): OHLCData[] {
  const data: OHLCData[] = [];
  let basePrice = 150;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const trendFactor = trend === 'bullish' ? 0.002 : trend === 'bearish' ? -0.002 : 0;
    const volatility = 0.03;

    const open = basePrice;
    const change = (Math.random() - 0.5) * volatility * basePrice + trendFactor * basePrice;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5;
    const volume = Math.floor(Math.random() * 10000000) + 1000000;

    data.push({
      time: date.toISOString().split('T')[0],
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });

    basePrice = close;
  }

  return data;
}

const bullishData = generateCandlestickData(60, 'bullish');
const bearishData = generateCandlestickData(60, 'bearish');
const sidewaysData = generateCandlestickData(60, 'sideways');
const shortData = generateCandlestickData(20, 'bullish');

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function CandlestickChartContent() {
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
        <h1 style={titleStyles}>&gt; CandlestickChart_</h1>
        <p style={descStyles}>// Gráfico OHLC para visualización de datos financieros</p>
      </header>

      <ShowcaseSection title="Default" description="Basic candlestick chart with OHLC data">
        <div style={chartContainerStyles}>
          <CandlestickChart data={sidewaysData} height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Bullish Trend" description="Upward price movement pattern">
        <div style={chartContainerStyles}>
          <CandlestickChart data={bullishData} height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Bearish Trend" description="Downward price movement pattern">
        <div style={chartContainerStyles}>
          <CandlestickChart data={bearishData} height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With Volume" description="Candlestick chart with volume indicator below">
        <div style={chartContainerStyles}>
          <CandlestickChart data={bullishData} height={500} showVolume />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With Zoom Controls" description="Enable zoom slider for data navigation">
        <div style={chartContainerStyles}>
          <CandlestickChart data={bullishData} height={450} showDataZoom />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Full Featured" description="All features enabled: volume, zoom, and custom title">
        <div style={chartContainerStyles}>
          <CandlestickChart
            data={bullishData}
            title="AAPL Stock Price"
            height={550}
            showVolume
            showDataZoom
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller height for dashboard widgets">
        <div style={chartContainerStyles}>
          <CandlestickChart data={shortData} height={250} />
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
                { prop: 'data', type: 'OHLCData[]', default: 'required', desc: 'Array of OHLC data points' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'showVolume', type: 'boolean', default: 'false', desc: 'Show volume indicator' },
                { prop: 'showDataZoom', type: 'boolean', default: 'true', desc: 'Show zoom slider' },
                { prop: 'upColor', type: 'string', default: 'theme', desc: 'Color for bullish candles' },
                { prop: 'downColor', type: 'string', default: 'theme', desc: 'Color for bearish candles' },
                { prop: 'animate', type: 'boolean', default: 'true', desc: 'Enable animations' },
                { prop: 'loading', type: 'boolean', default: 'false', desc: 'Show loading state' },
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

export function CandlestickChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <CandlestickChartContent />
    </LightEngineProvider>
  );
}

export default CandlestickChartShowcase;
