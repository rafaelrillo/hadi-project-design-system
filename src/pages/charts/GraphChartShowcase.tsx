// Path: src/pages/charts/GraphChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { GraphChart } from '../../components/charts/echarts';
import type { GraphData } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const assetCorrelation: GraphData = {
  nodes: [
    { id: 'SPY', name: 'SPY', value: 100, category: 0 },
    { id: 'QQQ', name: 'QQQ', value: 80, category: 0 },
    { id: 'IWM', name: 'IWM', value: 60, category: 0 },
    { id: 'TLT', name: 'TLT', value: 50, category: 1 },
    { id: 'GLD', name: 'GLD', value: 40, category: 2 },
    { id: 'VNQ', name: 'VNQ', value: 45, category: 3 },
    { id: 'EFA', name: 'EFA', value: 55, category: 0 },
    { id: 'EEM', name: 'EEM', value: 50, category: 0 },
  ],
  links: [
    { source: 'SPY', target: 'QQQ', value: 0.92 },
    { source: 'SPY', target: 'IWM', value: 0.88 },
    { source: 'SPY', target: 'VNQ', value: 0.72 },
    { source: 'SPY', target: 'EFA', value: 0.85 },
    { source: 'QQQ', target: 'IWM', value: 0.78 },
    { source: 'TLT', target: 'GLD', value: 0.45 },
    { source: 'EFA', target: 'EEM', value: 0.82 },
    { source: 'IWM', target: 'VNQ', value: 0.75 },
    { source: 'SPY', target: 'EEM', value: 0.70 },
  ],
  categories: [
    { name: 'Equity' },
    { name: 'Bonds' },
    { name: 'Commodities' },
    { name: 'Real Estate' },
  ],
};

const companyRelations: GraphData = {
  nodes: [
    { id: 'AAPL', name: 'AAPL', value: 100, category: 0 },
    { id: 'MSFT', name: 'MSFT', value: 90, category: 0 },
    { id: 'GOOGL', name: 'GOOGL', value: 85, category: 0 },
    { id: 'AMZN', name: 'AMZN', value: 80, category: 1 },
    { id: 'META', name: 'META', value: 70, category: 0 },
    { id: 'NVDA', name: 'NVDA', value: 75, category: 2 },
    { id: 'TSLA', name: 'TSLA', value: 65, category: 3 },
  ],
  links: [
    { source: 'AAPL', target: 'MSFT', value: 5 },
    { source: 'MSFT', target: 'GOOGL', value: 4 },
    { source: 'GOOGL', target: 'META', value: 4 },
    { source: 'AAPL', target: 'NVDA', value: 3 },
    { source: 'MSFT', target: 'NVDA', value: 5 },
    { source: 'AMZN', target: 'GOOGL', value: 3 },
    { source: 'TSLA', target: 'NVDA', value: 4 },
  ],
  categories: [
    { name: 'Software' },
    { name: 'E-Commerce' },
    { name: 'Semiconductors' },
    { name: 'Automotive' },
  ],
};

const simpleNetwork: GraphData = {
  nodes: [
    { id: 'Portfolio', name: 'Portfolio', value: 100 },
    { id: 'Stocks', name: 'Stocks', value: 60 },
    { id: 'Bonds', name: 'Bonds', value: 30 },
    { id: 'Cash', name: 'Cash', value: 10 },
    { id: 'Tech', name: 'Tech', value: 25 },
    { id: 'Health', name: 'Health', value: 20 },
    { id: 'Finance', name: 'Finance', value: 15 },
  ],
  links: [
    { source: 'Portfolio', target: 'Stocks', value: 60 },
    { source: 'Portfolio', target: 'Bonds', value: 30 },
    { source: 'Portfolio', target: 'Cash', value: 10 },
    { source: 'Stocks', target: 'Tech', value: 25 },
    { source: 'Stocks', target: 'Health', value: 20 },
    { source: 'Stocks', target: 'Finance', value: 15 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function GraphChartShowcase() {
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
          Graph Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Network graph for visualizing relationships between entities. Supports force-directed
          and circular layouts, categories, and interactive exploration.
        </p>
      </header>

      {/* Force Layout */}
      <ShowcaseSection
        title="Force Layout"
        description="Force-directed network simulation"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <GraphChart data={assetCorrelation} title="Asset Correlations" height={500} layout="force" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Circular Layout */}
      <ShowcaseSection
        title="Circular Layout"
        description="Nodes arranged in a circle"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <GraphChart data={assetCorrelation} title="Asset Network" height={500} layout="circular" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Company Relations */}
      <ShowcaseSection
        title="Company Relations"
        description="Tech company relationships"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <GraphChart data={companyRelations} title="Tech Network" height={500} layout="force" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Without Categories */}
      <ShowcaseSection
        title="Simple Network"
        description="Network without category coloring"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <GraphChart data={simpleNetwork} title="Portfolio Structure" height={450} layout="force" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Roam */}
      <ShowcaseSection
        title="With Pan & Zoom"
        description="Enable interactive panning and zooming"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <GraphChart data={assetCorrelation} title="Explore Network" height={450} layout="force" roam />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact"
        description="Smaller graph for dashboard widgets"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <GraphChart data={simpleNetwork} height={300} layout="force" />
            </div>
            <div>
              <GraphChart data={simpleNetwork} height={300} layout="circular" />
            </div>
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
                { prop: 'data', type: 'GraphData', default: 'required', desc: 'Object with nodes, links, and optional categories' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '500', desc: 'Chart height in pixels' },
                { prop: 'layout', type: "'force' | 'circular'", default: "'force'", desc: 'Node arrangement algorithm' },
                { prop: 'roam', type: 'boolean', default: 'false', desc: 'Enable pan and zoom' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette for categories' },
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

export default GraphChartShowcase;
