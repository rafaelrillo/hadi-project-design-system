// Path: src/pages/charts/LineChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { LineChart } from '../../components/charts/echarts';
import type { TimeSeriesDataPoint, SeriesData } from '../../components/charts/echarts';

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
          Line Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Time series line chart for trends and comparisons. Supports single and multiple series,
          area fills, and minimal sparkline mode.
        </p>
      </header>

      {/* Default */}
      <ShowcaseSection
        title="Default"
        description="Basic line chart with single series"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LineChart data={singleSeriesData} height={350} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Title */}
      <ShowcaseSection
        title="With Title"
        description="Line chart with custom title"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LineChart data={singleSeriesData} title="Portfolio Performance" height={350} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Area Chart */}
      <ShowcaseSection
        title="Area Chart"
        description="Filled area below the line"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LineChart data={singleSeriesData} title="Growth Trend" height={350} enableArea />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Area with Custom Opacity */}
      <ShowcaseSection
        title="Area with Custom Opacity"
        description="Area fill with adjusted opacity"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LineChart
              data={singleSeriesData}
              title="Revenue Growth"
              height={350}
              enableArea
              areaOpacity={0.5}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Multi-Series */}
      <ShowcaseSection
        title="Multi-Series"
        description="Compare multiple data series"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LineChart data={multiSeriesData} title="Performance Comparison" height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Multi-Series with Area */}
      <ShowcaseSection
        title="Multi-Series with Area"
        description="Multiple series with area fills"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LineChart
              data={multiSeriesData}
              title="Index Comparison"
              height={400}
              enableArea
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Smooth Lines */}
      <ShowcaseSection
        title="Smooth Lines"
        description="Smoothed curve interpolation"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LineChart data={singleSeriesData} height={350} smooth />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Sparkline */}
      <ShowcaseSection
        title="Sparkline (Minimal)"
        description="Minimal chart without axes for inline display"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <LineChart data={sparklineData} height={80} minimal />
            </div>
            <div style={{ flex: 1 }}>
              <LineChart data={sparklineData} height={80} minimal enableArea />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Zoom */}
      <ShowcaseSection
        title="With Zoom"
        description="Enable zoom slider for data navigation"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LineChart data={singleSeriesData} height={400} showDataZoom />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Y-Axis Format */}
      <ShowcaseSection
        title="Custom Value Format"
        description="Format values as currency"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LineChart
              data={singleSeriesData}
              title="Portfolio Value"
              height={350}
              formatValue={(v) => `$${v.toLocaleString()}`}
              enableArea
            />
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

export default LineChartShowcase;
