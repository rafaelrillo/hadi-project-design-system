// Path: src/pages/charts/BarChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { BarChart } from '../../components/charts/echarts';
import type { BarDataPoint, BarSeriesData } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const categories = ['Technology', 'Healthcare', 'Finance', 'Consumer', 'Energy', 'Materials'];

const simpleBarData: BarDataPoint[] = [
  { category: 'Technology', value: 28.5 },
  { category: 'Healthcare', value: 18.2 },
  { category: 'Finance', value: 15.7 },
  { category: 'Consumer', value: 12.3 },
  { category: 'Energy', value: 8.9 },
  { category: 'Materials', value: 6.4 },
];

const performanceCategories = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA'];
const performanceData: BarDataPoint[] = [
  { category: 'AAPL', value: 12.5, color: '#4a9a7c' },
  { category: 'MSFT', value: 8.3, color: '#4a9a7c' },
  { category: 'GOOGL', value: 5.2, color: '#4a9a7c' },
  { category: 'AMZN', value: -2.1, color: '#b85c5c' },
  { category: 'META', value: -4.8, color: '#b85c5c' },
  { category: 'TSLA', value: -8.2, color: '#b85c5c' },
];

const quarterCategories = ['Tech', 'Health', 'Finance', 'Consumer'];
const multiSeriesData: BarSeriesData[] = [
  { name: 'Q1', data: [45, 32, 28, 21] },
  { name: 'Q2', data: [52, 38, 25, 27] },
  { name: 'Q3', data: [48, 42, 31, 24] },
];

const monthCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const stackedData: BarSeriesData[] = [
  { name: 'Stocks', data: [35, 38, 42, 40, 45, 48] },
  { name: 'Bonds', data: [25, 24, 22, 23, 21, 20] },
  { name: 'Cash', data: [15, 12, 10, 12, 8, 7] },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function BarChartShowcase() {
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
          Bar Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Vertical and horizontal bar charts for comparing categorical data.
          Supports multiple series, stacking, and automatic positive/negative coloring.
        </p>
      </header>

      {/* Default */}
      <ShowcaseSection
        title="Default"
        description="Basic vertical bar chart"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BarChart categories={categories} data={simpleBarData} title="Sector Allocation" height={350} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Horizontal */}
      <ShowcaseSection
        title="Horizontal"
        description="Horizontal bar orientation"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BarChart categories={categories} data={simpleBarData} title="Sector Allocation" height={350} horizontal />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Positive/Negative Coloring */}
      <ShowcaseSection
        title="Positive/Negative Coloring"
        description="Custom coloring based on positive or negative values"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BarChart
              categories={performanceCategories}
              data={performanceData}
              title="YTD Performance (%)"
              height={350}
              formatValue={(v) => `${v > 0 ? '+' : ''}${v}%`}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Multi-Series */}
      <ShowcaseSection
        title="Multi-Series (Grouped)"
        description="Compare multiple series side by side"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BarChart categories={quarterCategories} data={multiSeriesData} title="Quarterly Performance" height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Stacked */}
      <ShowcaseSection
        title="Stacked"
        description="Stack series on top of each other"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BarChart categories={monthCategories} data={stackedData} title="Portfolio Composition" height={400} stacked />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Stacked Horizontal */}
      <ShowcaseSection
        title="Stacked Horizontal"
        description="Horizontal stacked bars"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BarChart
              categories={monthCategories}
              data={stackedData}
              title="Monthly Allocation"
              height={350}
              stacked
              horizontal
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
                { prop: 'categories', type: 'string[]', default: 'required', desc: 'Category labels for x-axis' },
                { prop: 'data', type: 'BarDataPoint[] | BarSeriesData[]', default: 'required', desc: 'Single or multiple series data' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '300', desc: 'Chart height in pixels' },
                { prop: 'horizontal', type: 'boolean', default: 'false', desc: 'Horizontal orientation' },
                { prop: 'stacked', type: 'boolean', default: 'false', desc: 'Stack series' },
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

export default BarChartShowcase;
