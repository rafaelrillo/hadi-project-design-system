// Path: src/pages/charts/TreeChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Tree Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { TreeChart } from '../../components/charts/echarts';
import type { TreeNode } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const organizationTree: TreeNode = {
  name: 'Portfolio',
  children: [
    {
      name: 'Equities',
      children: [
        { name: 'US Large Cap', children: [{ name: 'AAPL', value: 15 }, { name: 'MSFT', value: 12 }, { name: 'GOOGL', value: 10 }] },
        { name: 'US Small Cap', children: [{ name: 'ROKU', value: 3 }, { name: 'SQ', value: 4 }] },
        { name: 'International', children: [{ name: 'TSM', value: 5 }, { name: 'ASML', value: 4 }] },
      ],
    },
    { name: 'Fixed Income', children: [{ name: 'Treasury', value: 15 }, { name: 'Corporate', value: 10 }, { name: 'Municipal', value: 5 }] },
    { name: 'Alternatives', children: [{ name: 'Real Estate', value: 8 }, { name: 'Commodities', value: 5 }, { name: 'Crypto', value: 4 }] },
  ],
};

const sectorHierarchy: TreeNode = {
  name: 'Market',
  children: [
    { name: 'Technology', children: [{ name: 'Software' }, { name: 'Hardware' }, { name: 'Semiconductors' }, { name: 'Cloud' }] },
    { name: 'Healthcare', children: [{ name: 'Pharma' }, { name: 'Biotech' }, { name: 'Medical Devices' }] },
    { name: 'Finance', children: [{ name: 'Banks' }, { name: 'Insurance' }, { name: 'Fintech' }] },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function TreeChartContent() {
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
    marginBottom: '32px', padding: '24px', background: LIGHT.base, borderRadius: '15px',
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
    padding: '24px', background: LIGHT.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px', borderRadius: '15px', boxShadow: getNeuInsetShadow(5, 15),
    background: LIGHT.base, overflowX: 'auto', transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; TreeChart_</h1>
        <p style={descStyles}>// Visualización jerárquica con nodos expandibles</p>
      </header>

      <ShowcaseSection title="Left to Right" description="Default horizontal tree layout">
        <div style={chartContainerStyles}>
          <TreeChart data={organizationTree} title="Portfolio Structure" height={500} orient="LR" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Top to Bottom" description="Vertical tree layout">
        <div style={chartContainerStyles}>
          <TreeChart data={sectorHierarchy} title="Market Sectors" height={450} orient="TB" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Radial Layout" description="Circular tree arrangement">
        <div style={chartContainerStyles}>
          <TreeChart data={organizationTree} title="Portfolio Overview" height={550} layout="radial" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Right to Left" description="Reversed horizontal tree">
        <div style={chartContainerStyles}>
          <TreeChart data={sectorHierarchy} height={400} orient="RL" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Without Labels" description="Compact tree without text">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            <TreeChart data={sectorHierarchy} height={350} showLabels={false} />
            <TreeChart data={sectorHierarchy} height={350} layout="radial" showLabels={false} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="With Pan & Zoom" description="Enable interactive navigation">
        <div style={chartContainerStyles}>
          <TreeChart data={organizationTree} height={450} roam />
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
                { prop: 'data', type: 'TreeNode', default: 'required', desc: 'Root node with name, children, optional value' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '500', desc: 'Chart height in pixels' },
                { prop: 'layout', type: "'orthogonal' | 'radial'", default: "'orthogonal'", desc: 'Tree layout style' },
                { prop: 'orient', type: "'LR' | 'RL' | 'TB' | 'BT'", default: "'LR'", desc: 'Tree direction (orthogonal only)' },
                { prop: 'showLabels', type: 'boolean', default: 'true', desc: 'Show node labels' },
                { prop: 'roam', type: 'boolean', default: 'true', desc: 'Enable pan and zoom' },
                { prop: 'initialExpandLevel', type: 'number', default: '3', desc: 'Initial tree depth' },
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

export function TreeChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <TreeChartContent />
    </LightEngineProvider>
  );
}

export default TreeChartShowcase;
