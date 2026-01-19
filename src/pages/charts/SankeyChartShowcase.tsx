// Path: src/pages/charts/SankeyChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Sankey Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { SankeyChart } from '../../components/charts/echarts';
import type { SankeyData } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const capitalFlowData: SankeyData = {
  nodes: [{ name: 'Savings' }, { name: 'Salary' }, { name: 'Investments' }, { name: 'Stocks' }, { name: 'Bonds' }, { name: 'Real Estate' }, { name: 'Crypto' }, { name: 'Dividends' }, { name: 'Interest' }],
  links: [
    { source: 'Salary', target: 'Savings', value: 3000 }, { source: 'Salary', target: 'Investments', value: 5000 },
    { source: 'Savings', target: 'Investments', value: 2000 }, { source: 'Investments', target: 'Stocks', value: 4000 },
    { source: 'Investments', target: 'Bonds', value: 2000 }, { source: 'Investments', target: 'Real Estate', value: 500 },
    { source: 'Investments', target: 'Crypto', value: 500 }, { source: 'Stocks', target: 'Dividends', value: 800 },
    { source: 'Bonds', target: 'Interest', value: 400 },
  ],
};

const portfolioRebalance: SankeyData = {
  nodes: [{ name: 'Tech Stocks' }, { name: 'Healthcare' }, { name: 'Finance' }, { name: 'Rebalance Pool' }, { name: 'US Large Cap' }, { name: 'International' }, { name: 'Bonds' }, { name: 'Cash' }],
  links: [
    { source: 'Tech Stocks', target: 'Rebalance Pool', value: 5000 }, { source: 'Healthcare', target: 'Rebalance Pool', value: 2000 },
    { source: 'Finance', target: 'Rebalance Pool', value: 1500 }, { source: 'Rebalance Pool', target: 'US Large Cap', value: 3500 },
    { source: 'Rebalance Pool', target: 'International', value: 2500 }, { source: 'Rebalance Pool', target: 'Bonds', value: 2000 },
    { source: 'Rebalance Pool', target: 'Cash', value: 500 },
  ],
};

const simpleFlow: SankeyData = {
  nodes: [{ name: 'Income' }, { name: 'Expenses' }, { name: 'Savings' }, { name: 'Investment' }],
  links: [{ source: 'Income', target: 'Expenses', value: 4000 }, { source: 'Income', target: 'Savings', value: 2000 }, { source: 'Savings', target: 'Investment', value: 1500 }],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function SankeyChartContent() {
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
        <h1 style={titleStyles}>&gt; SankeyChart_</h1>
        <p style={descStyles}>// Diagrama de flujo de capital entre nodos</p>
      </header>

      <ShowcaseSection title="Capital Flow" description="Track money flow from income to investments">
        <div style={chartContainerStyles}>
          <SankeyChart data={capitalFlowData} title="Capital Flow" height={450} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Portfolio Rebalance" description="Visualize asset reallocation">
        <div style={chartContainerStyles}>
          <SankeyChart data={portfolioRebalance} title="Rebalancing Flow" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Vertical Orientation" description="Top-to-bottom flow direction">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <SankeyChart data={simpleFlow} title="Budget Flow" height={450} orient="vertical" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Simple Flow" description="Basic three-level flow">
        <div style={chartContainerStyles}>
          <SankeyChart data={simpleFlow} height={300} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Value Format" description="Format values as currency">
        <div style={chartContainerStyles}>
          <SankeyChart data={capitalFlowData} title="Monthly Cash Flow" height={400} formatValue={(v) => `$${v.toLocaleString()}`} />
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
                { prop: 'data', type: 'SankeyData', default: 'required', desc: 'Object with nodes and links arrays' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'orient', type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: 'Flow direction' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
                { prop: 'formatValue', type: '(v: number) => string', default: '-', desc: 'Value formatter function' },
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

export function SankeyChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <SankeyChartContent />
    </LightEngineProvider>
  );
}

export default SankeyChartShowcase;
