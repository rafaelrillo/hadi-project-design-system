// Path: src/pages/charts/CandlestickChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { CandlestickChart } from '../../components/charts/echarts';
import type { OHLCData } from '../../components/charts/echarts';

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

export function CandlestickChartShowcase() {
  return (
    <div>
      {/* Page Header */}
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: 'var(--sentinel-text-primary)',
          marginBottom: '8px',
          fontFamily: 'var(--sentinel-font-display)',
        }}>
          Candlestick Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          OHLC candlestick chart for financial data visualization. Shows price movement with
          optional volume indicator and zoom controls.
        </p>
      </header>

      {/* Default */}
      <ShowcaseSection
        title="Default"
        description="Basic candlestick chart with OHLC data"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CandlestickChart data={sidewaysData} height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Bullish Trend */}
      <ShowcaseSection
        title="Bullish Trend"
        description="Upward price movement pattern"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CandlestickChart data={bullishData} height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Bearish Trend */}
      <ShowcaseSection
        title="Bearish Trend"
        description="Downward price movement pattern"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CandlestickChart data={bearishData} height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Volume */}
      <ShowcaseSection
        title="With Volume"
        description="Candlestick chart with volume indicator below"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CandlestickChart data={bullishData} height={500} showVolume />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Zoom */}
      <ShowcaseSection
        title="With Zoom Controls"
        description="Enable zoom slider for data navigation"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CandlestickChart data={bullishData} height={450} showDataZoom />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Full Featured */}
      <ShowcaseSection
        title="Full Featured"
        description="All features enabled: volume, zoom, and custom title"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CandlestickChart
              data={bullishData}
              title="AAPL Stock Price"
              height={550}
              showVolume
              showDataZoom
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact"
        description="Smaller height for dashboard widgets"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CandlestickChart data={shortData} height={250} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* API Reference */}
      <ShowcaseSection title="API Reference">
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            fontFamily: 'var(--sentinel-font-mono)',
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--sentinel-border-default)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>Description</th>
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
                <tr key={i} style={{ borderBottom: '1px solid var(--sentinel-border-subtle)' }}>
                  <td style={{ padding: '12px 16px', color: 'var(--sentinel-accent-primary)' }}>{row.prop}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--sentinel-text-tertiary)' }}>{row.type}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--sentinel-text-tertiary)' }}>{row.default}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export default CandlestickChartShowcase;
