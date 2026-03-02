// Path: src/pages/charts/GaugeChartShowcase.tsx
// QUAFI Design System - Glass-Neumorphism Gauge Chart
import React from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { GaugeChart } from '../../components/charts/echarts';
import type { GaugeData } from '../../components/charts/echarts';
import { showcase } from '../showcaseStyles';

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

export function GaugeChartShowcase() {
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
        <h1 style={showcase.header.title}>&gt; GaugeChart_</h1>
        <p style={showcase.header.description}>// Indicador radial para KPIs y progreso</p>
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

      <ShowcaseSection title="Especificaciones Tecnicas">
        <div style={tableContainerStyles}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '12px',
            fontFamily: 'var(--quafi-font-mono)',
          }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--quafi-accent)', fontWeight: 600 }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--quafi-accent)', fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--quafi-accent)', fontWeight: 600 }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--quafi-accent)', fontWeight: 600 }}>Description</th>
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
                  <td style={{ padding: '12px 16px', color: 'var(--quafi-text-primary)' }}>{row.prop}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--quafi-text-muted)' }}>{row.type}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--quafi-text-muted)' }}>{row.default}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--quafi-text-muted)' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export default GaugeChartShowcase;
