// Path: src/pages/charts/TreeMapShowcase.tsx
// FING Design System - Glass-Neumorphism TreeMap
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { TreeMap } from '../../components/charts/echarts';
import type { TreeMapNode } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const portfolioData: TreeMapNode[] = [
  { name: 'Technology', value: 35, children: [{ name: 'AAPL', value: 12 }, { name: 'MSFT', value: 10 }, { name: 'GOOGL', value: 8 }, { name: 'NVDA', value: 5 }] },
  { name: 'Healthcare', value: 20, children: [{ name: 'JNJ', value: 8 }, { name: 'UNH', value: 7 }, { name: 'PFE', value: 5 }] },
  { name: 'Finance', value: 18, children: [{ name: 'JPM', value: 8 }, { name: 'BAC', value: 6 }, { name: 'GS', value: 4 }] },
  { name: 'Consumer', value: 15, children: [{ name: 'AMZN', value: 8 }, { name: 'WMT', value: 4 }, { name: 'HD', value: 3 }] },
  { name: 'Energy', value: 12, children: [{ name: 'XOM', value: 6 }, { name: 'CVX', value: 6 }] },
];

const sectorPerformance: TreeMapNode[] = [
  { name: 'Technology', value: 32 }, { name: 'Healthcare', value: 18 }, { name: 'Finance', value: 15 },
  { name: 'Consumer', value: 12 }, { name: 'Energy', value: 10 }, { name: 'Utilities', value: 8 }, { name: 'Materials', value: 5 },
];

const flatData: TreeMapNode[] = [
  { name: 'AAPL', value: 15 }, { name: 'MSFT', value: 12 }, { name: 'GOOGL', value: 10 }, { name: 'AMZN', value: 8 },
  { name: 'NVDA', value: 7 }, { name: 'META', value: 6 }, { name: 'TSLA', value: 5 }, { name: 'BRK.B', value: 5 },
  { name: 'JPM', value: 4 }, { name: 'JNJ', value: 4 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function TreeMapContent() {
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
    fontSize: '28px', fontWeight: 700, color: 'var(--fing-accent-primary)', marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)', textTransform: 'uppercase', letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px', color: 'var(--fing-text-secondary)', fontFamily: 'var(--fing-font-mono)',
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
        <h1 style={titleStyles}>&gt; TreeMap_</h1>
        <p style={descStyles}>// Visualización jerárquica con rectángulos anidados</p>
      </header>

      <ShowcaseSection title="Default" description="Basic treemap with hierarchical data">
        <div style={chartContainerStyles}>
          <TreeMap data={portfolioData} title="Portfolio Allocation" height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Flat Data" description="Single level without hierarchy">
        <div style={chartContainerStyles}>
          <TreeMap data={flatData} title="Top Holdings" height={350} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color by Performance" description="Color intensity based on performance value">
        <div style={chartContainerStyles}>
          <TreeMap data={sectorPerformance} title="Sector Performance" height={350} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Without Breadcrumb" description="Hide navigation breadcrumb">
        <div style={chartContainerStyles}>
          <TreeMap data={portfolioData} height={350} showBreadcrumb={false} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller treemap for dashboard widgets">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', width: '100%' }}>
            <div><TreeMap data={flatData.slice(0, 6)} height={250} showBreadcrumb={false} /></div>
            <div><TreeMap data={sectorPerformance.slice(0, 6)} height={250} showBreadcrumb={false} /></div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Format" description="Format values as percentages or currency">
        <div style={chartContainerStyles}>
          <TreeMap data={portfolioData} title="Allocation %" height={400} formatValue={(v) => `${v}%`} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={tableContainerStyles}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--fing-font-mono)' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Description</th>
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
                <tr key={i}>
                  <td style={{ padding: '12px 16px', color: 'var(--fing-text-primary)' }}>{row.prop}</td>
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

export function TreeMapShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <TreeMapContent />
    </LightEngineProvider>
  );
}

export default TreeMapShowcase;
