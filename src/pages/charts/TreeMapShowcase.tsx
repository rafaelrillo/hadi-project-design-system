// Path: src/pages/charts/TreeMapShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { TreeMap } from '../../components/charts/echarts';
import type { TreeMapNode } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const portfolioData: TreeMapNode[] = [
  {
    name: 'Technology',
    value: 35,
    children: [
      { name: 'AAPL', value: 12 },
      { name: 'MSFT', value: 10 },
      { name: 'GOOGL', value: 8 },
      { name: 'NVDA', value: 5 },
    ],
  },
  {
    name: 'Healthcare',
    value: 20,
    children: [
      { name: 'JNJ', value: 8 },
      { name: 'UNH', value: 7 },
      { name: 'PFE', value: 5 },
    ],
  },
  {
    name: 'Finance',
    value: 18,
    children: [
      { name: 'JPM', value: 8 },
      { name: 'BAC', value: 6 },
      { name: 'GS', value: 4 },
    ],
  },
  {
    name: 'Consumer',
    value: 15,
    children: [
      { name: 'AMZN', value: 8 },
      { name: 'WMT', value: 4 },
      { name: 'HD', value: 3 },
    ],
  },
  {
    name: 'Energy',
    value: 12,
    children: [
      { name: 'XOM', value: 6 },
      { name: 'CVX', value: 6 },
    ],
  },
];

const sectorPerformance: TreeMapNode[] = [
  { name: 'Technology', value: 32 },
  { name: 'Healthcare', value: 18 },
  { name: 'Finance', value: 15 },
  { name: 'Consumer', value: 12 },
  { name: 'Energy', value: 10 },
  { name: 'Utilities', value: 8 },
  { name: 'Materials', value: 5 },
];

const flatData: TreeMapNode[] = [
  { name: 'AAPL', value: 15 },
  { name: 'MSFT', value: 12 },
  { name: 'GOOGL', value: 10 },
  { name: 'AMZN', value: 8 },
  { name: 'NVDA', value: 7 },
  { name: 'META', value: 6 },
  { name: 'TSLA', value: 5 },
  { name: 'BRK.B', value: 5 },
  { name: 'JPM', value: 4 },
  { name: 'JNJ', value: 4 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function TreeMapShowcase() {
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
          TreeMap
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Hierarchical data visualization using nested rectangles. Size represents value,
          perfect for portfolio allocation, market cap weighting, and sector breakdowns.
        </p>
      </header>

      {/* Default */}
      <ShowcaseSection
        title="Default"
        description="Basic treemap with hierarchical data"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeMap data={portfolioData} title="Portfolio Allocation" height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Flat Data */}
      <ShowcaseSection
        title="Flat Data"
        description="Single level without hierarchy"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeMap data={flatData} title="Top Holdings" height={350} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Color by Value */}
      <ShowcaseSection
        title="Color by Performance"
        description="Color intensity based on performance value"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeMap
              data={sectorPerformance}
              title="Sector Performance"
              height={350}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Without Breadcrumb */}
      <ShowcaseSection
        title="Without Breadcrumb"
        description="Hide navigation breadcrumb"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeMap data={portfolioData} height={350} showBreadcrumb={false} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact"
        description="Smaller treemap for dashboard widgets"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <TreeMap data={flatData.slice(0, 6)} height={250} showBreadcrumb={false} />
            </div>
            <div>
              <TreeMap data={sectorPerformance.slice(0, 6)} height={250} showBreadcrumb={false} />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Value Format */}
      <ShowcaseSection
        title="Custom Format"
        description="Format values as percentages or currency"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeMap
              data={portfolioData}
              title="Allocation %"
              height={400}
              formatValue={(v) => `${v}%`}
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
                { prop: 'data', type: 'TreeMapNode[]', default: 'required', desc: 'Array of nodes with name, value, optional children' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'showBreadcrumb', type: 'boolean', default: 'true', desc: 'Show navigation breadcrumb' },
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

export default TreeMapShowcase;
