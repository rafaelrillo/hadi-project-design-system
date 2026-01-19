// Path: src/pages/charts/GaugeChartShowcase.tsx
// FING Design System - Glass-Neumorphism Gauge Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { GaugeChart } from '../../components/charts/echarts';
import type { GaugeData } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const riskScore: GaugeData = { value: 65, name: 'Risk Score' };
const lowRisk: GaugeData = { value: 25, name: 'Conservative' };
const highRisk: GaugeData = { value: 85, name: 'Aggressive' };
const performance: GaugeData = { value: 78, name: 'Performance' };
const completion: GaugeData = { value: 92, name: 'Completion' };

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function GaugeChartContent() {
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
    marginBottom: '32px',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--fing-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--fing-text-secondary)',
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const chartContainerStyles: React.CSSProperties = {
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px',
    borderRadius: '15px',
    boxShadow: getNeuInsetShadow(5, 15),
    background: MARBLE.base,
    overflowX: 'auto',
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; GaugeChart_</h1>
        <p style={descStyles}>// Indicador radial para KPIs y progreso</p>
      </header>

      <ShowcaseSection title="Default" description="Basic gauge with standard styling">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <GaugeChart data={riskScore} title="Risk Assessment" height={350} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Progress" description="Simplified progress indicator">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <GaugeChart data={completion} title="Portfolio Diversification" height={350} variant="progress" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Score" description="Color-coded score sections">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <GaugeChart data={performance} title="Health Score" height={350} variant="score" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Risk Levels" description="Different risk score visualizations">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <GaugeChart data={lowRisk} title="Low Risk" height={280} variant="score" />
            </div>
            <div>
              <GaugeChart data={riskScore} title="Medium Risk" height={280} variant="score" />
            </div>
            <div>
              <GaugeChart data={highRisk} title="High Risk" height={280} variant="score" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Range" description="Gauge with custom min/max values">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <GaugeChart data={{ value: 750, name: 'Credit Score' }} title="Credit Rating" height={350} min={300} max={850} variant="score" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact Dashboard" description="Multiple compact gauges for dashboards">
        <div style={chartContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', width: '100%' }}>
            <div>
              <GaugeChart data={{ value: 45, name: 'Volatility' }} height={180} variant="progress" />
            </div>
            <div>
              <GaugeChart data={{ value: 72, name: 'Sharpe' }} height={180} variant="progress" />
            </div>
            <div>
              <GaugeChart data={{ value: 88, name: 'Alpha' }} height={180} variant="progress" />
            </div>
            <div>
              <GaugeChart data={{ value: 35, name: 'Beta' }} height={180} variant="progress" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Format" description="Custom value formatting">
        <div style={chartContainerStyles}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '280px' }}>
              <GaugeChart data={{ value: 12.5, name: 'Return' }} height={280} variant="progress" formatValue={(v) => `${v}%`} />
            </div>
            <div style={{ width: '280px' }}>
              <GaugeChart data={{ value: 1.25, name: 'Sharpe Ratio' }} height={280} min={0} max={3} variant="score" formatValue={(v) => v.toFixed(2)} />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={tableContainerStyles}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '12px',
            fontFamily: 'var(--fing-font-mono)',
          }}>
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
                { prop: 'data', type: 'GaugeData', default: 'required', desc: 'Value and name to display' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '300', desc: 'Chart height in pixels' },
                { prop: 'variant', type: "'default' | 'risk' | 'progress' | 'score'", default: "'default'", desc: 'Gauge style variant' },
                { prop: 'min', type: 'number', default: '0', desc: 'Minimum value' },
                { prop: 'max', type: 'number', default: '100', desc: 'Maximum value' },
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

export function GaugeChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <GaugeChartContent />
    </LightEngineProvider>
  );
}

export default GaugeChartShowcase;
