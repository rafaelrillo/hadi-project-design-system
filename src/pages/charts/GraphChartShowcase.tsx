// Path: src/pages/charts/GraphChartShowcase.tsx
// FING Design System - Glass-Neumorphism Graph Chart
import React from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { GraphChart } from '../../components/charts/echarts';
import type { GraphData } from '../../components/charts/echarts';
import { showcase } from '../showcaseStyles';

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
  categories: [{ name: 'Equity' }, { name: 'Bonds' }, { name: 'Commodities' }, { name: 'Real Estate' }],
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
  categories: [{ name: 'Software' }, { name: 'E-Commerce' }, { name: 'Semiconductors' }, { name: 'Automotive' }],
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
  const chartContainerStyles: React.CSSProperties = {
    padding: '24px',
    background: 'var(--marble-base)',
    borderRadius: '20px',
    boxShadow: 'var(--raised-2)',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px',
    borderRadius: '20px',
    boxShadow: 'var(--inset-2)',
    background: 'var(--marble-base)',
    overflowX: 'auto',
  };

  return (
    <div style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}>
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; GraphChart_</h1>
        <p style={showcase.header.description}>// Red de nodos para visualizar relaciones entre entidades</p>
      </header>

      <ShowcaseSection title="Force Layout" description="Force-directed network simulation">
        <div style={chartContainerStyles}>
          <GraphChart data={assetCorrelation} title="Asset Correlations" height={500} layout="force" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Circular Layout" description="Nodes arranged in a circle">
        <div style={chartContainerStyles}>
          <GraphChart data={assetCorrelation} title="Asset Network" height={500} layout="circular" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Company Relations" description="Tech company relationships">
        <div style={chartContainerStyles}>
          <GraphChart data={companyRelations} title="Tech Network" height={500} layout="force" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Simple Network" description="Network without category coloring">
        <div style={chartContainerStyles}>
          <GraphChart data={simpleNetwork} title="Portfolio Structure" height={450} layout="force" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With Pan & Zoom" description="Enable interactive panning and zooming">
        <div style={chartContainerStyles}>
          <GraphChart data={assetCorrelation} title="Explore Network" height={450} layout="force" roam />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller graph for dashboard widgets">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            <GraphChart data={simpleNetwork} height={300} layout="force" />
            <GraphChart data={simpleNetwork} height={300} layout="circular" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Tecnicas">
        <div style={tableContainerStyles}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--fing-font-mono)' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent)', fontWeight: 600 }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent)', fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent)', fontWeight: 600 }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent)', fontWeight: 600 }}>Description</th>
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
                <tr key={i}>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-primary)' }}>{row.prop}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-muted)' }}>{row.type}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-muted)' }}>{row.default}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-muted)' }}>{row.desc}</td>
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
