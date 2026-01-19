// Path: src/pages/charts/SunburstChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Sunburst Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { SunburstChart } from '../../components/charts/echarts';
import type { SunburstNode } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const portfolioHierarchy: SunburstNode = {
  name: 'Portfolio',
  children: [
    {
      name: 'Equities', value: 60,
      children: [
        { name: 'US Large Cap', value: 25, children: [{ name: 'AAPL', value: 8 }, { name: 'MSFT', value: 7 }, { name: 'GOOGL', value: 5 }, { name: 'AMZN', value: 5 }] },
        { name: 'US Mid Cap', value: 15, children: [{ name: 'SQ', value: 5 }, { name: 'ROKU', value: 5 }, { name: 'SNAP', value: 5 }] },
        { name: 'International', value: 20, children: [{ name: 'Developed', value: 12 }, { name: 'Emerging', value: 8 }] },
      ],
    },
    { name: 'Fixed Income', value: 30, children: [{ name: 'Treasury', value: 15 }, { name: 'Corporate', value: 10 }, { name: 'Municipal', value: 5 }] },
    { name: 'Alternatives', value: 10, children: [{ name: 'Real Estate', value: 5 }, { name: 'Commodities', value: 3 }, { name: 'Crypto', value: 2 }] },
  ],
};

const sectorData: SunburstNode = {
  name: 'Market',
  children: [
    { name: 'Technology', value: 35, children: [{ name: 'Software', value: 15 }, { name: 'Hardware', value: 10 }, { name: 'Semiconductors', value: 10 }] },
    { name: 'Healthcare', value: 20, children: [{ name: 'Pharma', value: 12 }, { name: 'Biotech', value: 8 }] },
    { name: 'Finance', value: 18, children: [{ name: 'Banks', value: 10 }, { name: 'Insurance', value: 8 }] },
    { name: 'Consumer', value: 15 },
    { name: 'Energy', value: 12 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function SunburstChartContent() {
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
        <h1 style={titleStyles}>&gt; SunburstChart_</h1>
        <p style={descStyles}>// Visualización jerárquica radial</p>
      </header>

      <ShowcaseSection title="Default" description="Basic sunburst with hierarchical data">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '550px', margin: '0 auto' }}>
            <SunburstChart data={[portfolioHierarchy]} title="Portfolio Breakdown" height={450} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sector Breakdown" description="Market sector hierarchy">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '550px', margin: '0 auto' }}>
            <SunburstChart data={[sectorData]} title="Market Sectors" height={450} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Without Labels" description="Clean view without text labels">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <SunburstChart data={[portfolioHierarchy]} height={400} showLabels={false} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Inner Radius" description="Adjusted inner radius for different looks">
        <div style={chartContainerStyles}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '300px' }}>
              <SunburstChart data={[sectorData]} height={300} innerRadius="10%" showLabels={false} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Inner: 10%</p>
            </div>
            <div style={{ width: '300px' }}>
              <SunburstChart data={[sectorData]} height={300} innerRadius="30%" showLabels={false} />
              <p style={{ textAlign: 'center', color: '#636E72', fontSize: '12px', marginTop: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Inner: 30%</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller charts for dashboard widgets">
        <div style={chartContainerStyles}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '220px' }}>
              <SunburstChart data={[portfolioHierarchy]} height={220} showLabels={false} />
            </div>
            <div style={{ width: '220px' }}>
              <SunburstChart data={[sectorData]} height={220} showLabels={false} />
            </div>
          </div>
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
                { prop: 'data', type: 'SunburstNode', default: 'required', desc: 'Hierarchical data with name, value, children' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'showLabels', type: 'boolean', default: 'true', desc: 'Show segment labels' },
                { prop: 'innerRadius', type: 'string', default: "'20%'", desc: 'Inner radius percentage' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
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

export function SunburstChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <SunburstChartContent />
    </LightEngineProvider>
  );
}

export default SunburstChartShowcase;
