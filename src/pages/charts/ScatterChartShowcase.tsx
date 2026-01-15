// Path: src/pages/charts/ScatterChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { ScatterChart } from '../../components/charts/echarts';
import type { ScatterDataPoint, ScatterSeriesData } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const riskReturnData: ScatterDataPoint[] = [
  { x: 8, y: 6.2, name: 'AAPL', size: 28 },
  { x: 12, y: 8.5, name: 'MSFT', size: 24 },
  { x: 15, y: 10.2, name: 'GOOGL', size: 18 },
  { x: 22, y: 12.8, name: 'AMZN', size: 16 },
  { x: 35, y: 18.5, name: 'TSLA', size: 12 },
  { x: 18, y: 9.2, name: 'META', size: 14 },
  { x: 25, y: 14.5, name: 'NVDA', size: 14 },
  { x: 6, y: 4.2, name: 'JNJ', size: 10 },
  { x: 10, y: 5.8, name: 'JPM', size: 11 },
  { x: 5, y: 3.5, name: 'KO', size: 8 },
];

const multiSeriesData: ScatterSeriesData[] = [
  {
    name: 'Technology',
    data: [
      { x: 15, y: 12, size: 20 },
      { x: 18, y: 14, size: 18 },
      { x: 22, y: 16, size: 15 },
      { x: 25, y: 18, size: 12 },
      { x: 28, y: 20, size: 10 },
    ],
    color: '#5ba3a5',
  },
  {
    name: 'Healthcare',
    data: [
      { x: 8, y: 6, size: 15 },
      { x: 10, y: 7, size: 13 },
      { x: 12, y: 8, size: 12 },
      { x: 14, y: 9, size: 10 },
    ],
    color: '#7ecbcc',
  },
  {
    name: 'Finance',
    data: [
      { x: 12, y: 8, size: 18 },
      { x: 14, y: 10, size: 15 },
      { x: 16, y: 11, size: 13 },
      { x: 18, y: 12, size: 11 },
    ],
    color: '#c4a35a',
  },
];

const correlationData: ScatterDataPoint[] = [];
for (let i = 0; i < 50; i++) {
  const x = Math.random() * 100;
  const y = x * 0.7 + (Math.random() - 0.5) * 30;
  correlationData.push({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function ScatterChartShowcase() {
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
          Scatter Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          XY scatter plot for correlation analysis and data distribution. Supports bubble
          sizing by value, multiple series, and customizable axis labels.
        </p>
      </header>

      {/* Risk vs Return */}
      <ShowcaseSection
        title="Risk vs Return"
        description="Bubble size represents market cap"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <ScatterChart
              data={riskReturnData}
              title="Risk-Return Analysis"
              xAxisLabel="Volatility (%)"
              yAxisLabel="Return (%)"
              height={400}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Multi-Series */}
      <ShowcaseSection
        title="Multi-Series"
        description="Compare multiple categories"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <ScatterChart
              data={multiSeriesData}
              title="Sector Comparison"
              xAxisLabel="Risk"
              yAxisLabel="Return"
              height={400}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Correlation */}
      <ShowcaseSection
        title="Correlation Plot"
        description="Data points showing linear correlation"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <ScatterChart
              data={correlationData}
              title="Price Correlation"
              xAxisLabel="Asset A"
              yAxisLabel="Asset B"
              height={400}
              symbolSize={8}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Symbol Size */}
      <ShowcaseSection
        title="Custom Symbol Size"
        description="Adjust point size for different visualizations"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <ScatterChart
                data={riskReturnData}
                xAxisLabel="Risk"
                yAxisLabel="Return"
                height={300}
                symbolSize={10}
              />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Fixed Size: 10</p>
            </div>
            <div>
              <ScatterChart
                data={riskReturnData}
                xAxisLabel="Risk"
                yAxisLabel="Return"
                height={300}
                symbolSize={20}
              />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Fixed Size: 20</p>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact"
        description="Smaller scatter for dashboards"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <ScatterChart
              data={correlationData.slice(0, 30)}
              height={250}
              symbolSize={6}
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
                { prop: 'data', type: 'ScatterDataPoint[] | ScatterSeriesData[]', default: 'required', desc: 'Single or multi-series data' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'xAxisLabel', type: 'string', default: '-', desc: 'X-axis label' },
                { prop: 'yAxisLabel', type: 'string', default: '-', desc: 'Y-axis label' },
                { prop: 'symbolSize', type: 'number | function', default: '15', desc: 'Point size or sizing function' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
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

export default ScatterChartShowcase;
