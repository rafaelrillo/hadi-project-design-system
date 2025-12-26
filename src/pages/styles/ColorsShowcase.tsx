// Path: src/pages/styles/ColorsShowcase.tsx
// SENTINEL Design System - Color Palette
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function ColorsShowcase() {
  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '48px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 300,
    color: 'var(--sentinel-text-primary)',
    marginBottom: '12px',
    fontFamily: 'var(--sentinel-font-primary)',
    letterSpacing: '-0.02em'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-primary)',
    lineHeight: 1.6,
    maxWidth: '600px'
  };

  interface ColorToken {
    name: string;
    variable: string;
    value: string;
    description?: string;
  }

  const ColorSwatch = ({ color }: { color: ColorToken }) => {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: 'var(--sentinel-bg-elevated)',
        borderRadius: 'var(--sentinel-radius-md)',
        border: '1px solid var(--sentinel-border-subtle)',
        marginBottom: '8px'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: 'var(--sentinel-radius-md)',
          backgroundColor: `var(${color.variable})`,
          border: '1px solid var(--sentinel-border-subtle)',
          flexShrink: 0
        }} />
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sentinel-text-primary)',
            marginBottom: '4px',
            fontFamily: 'var(--sentinel-font-primary)'
          }}>
            {color.name}
          </div>
          <code style={{
            display: 'inline-block',
            fontSize: '12px',
            backgroundColor: 'var(--sentinel-bg-subtle)',
            padding: '2px 8px',
            borderRadius: 'var(--sentinel-radius-sm)',
            color: 'var(--sentinel-accent-primary)',
            fontFamily: 'var(--sentinel-font-mono)',
            marginBottom: '4px'
          }}>
            var({color.variable})
          </code>
          <div style={{
            fontSize: '12px',
            color: 'var(--sentinel-text-tertiary)',
            fontFamily: 'var(--sentinel-font-mono)'
          }}>
            {color.value}
          </div>
          {color.description && (
            <div style={{
              fontSize: '12px',
              color: 'var(--sentinel-text-secondary)',
              marginTop: '4px',
              fontFamily: 'var(--sentinel-font-primary)'
            }}>
              {color.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  const backgroundColors: ColorToken[] = [
    { name: 'Void', variable: '--sentinel-bg-void', value: '#05060a', description: 'Deepest background' },
    { name: 'Base', variable: '--sentinel-bg-base', value: '#0a0b10', description: 'Main background' },
    { name: 'Elevated', variable: '--sentinel-bg-elevated', value: '#10121a', description: 'Cards and panels' },
    { name: 'Overlay', variable: '--sentinel-bg-overlay', value: '#161822', description: 'Modals and overlays' },
    { name: 'Subtle', variable: '--sentinel-bg-subtle', value: '#1c1e2a', description: 'Subtle backgrounds' },
    { name: 'Interactive', variable: '--sentinel-bg-interactive', value: '#22253a', description: 'Interactive elements' },
  ];

  const textColors: ColorToken[] = [
    { name: 'Primary', variable: '--sentinel-text-primary', value: '#e8eaed', description: 'Main text' },
    { name: 'Secondary', variable: '--sentinel-text-secondary', value: '#9aa0a6', description: 'Secondary text' },
    { name: 'Tertiary', variable: '--sentinel-text-tertiary', value: '#5f6368', description: 'Tertiary/muted text' },
    { name: 'Disabled', variable: '--sentinel-text-disabled', value: '#3c4043', description: 'Disabled text' },
  ];

  const accentColors: ColorToken[] = [
    { name: 'Accent Primary', variable: '--sentinel-accent-primary', value: '#5ba3a5', description: 'Primary accent (teal)' },
    { name: 'Accent Secondary', variable: '--sentinel-accent-secondary', value: '#4a8a8c', description: 'Secondary accent' },
    { name: 'Accent Subtle', variable: '--sentinel-accent-subtle', value: 'rgba(91, 163, 165, 0.15)', description: 'Subtle accent bg' },
  ];

  const statusColors: ColorToken[] = [
    { name: 'Positive', variable: '--sentinel-status-positive', value: '#4a9a7c', description: 'Success states' },
    { name: 'Positive Text', variable: '--sentinel-status-positive-text', value: '#6bb89a', description: 'Positive text' },
    { name: 'Negative', variable: '--sentinel-status-negative', value: '#b85c5c', description: 'Error states' },
    { name: 'Negative Text', variable: '--sentinel-status-negative-text', value: '#d17878', description: 'Negative text' },
    { name: 'Warning', variable: '--sentinel-status-warning', value: '#c4a35a', description: 'Warning states' },
    { name: 'Warning Text', variable: '--sentinel-status-warning-text', value: '#d9bc78', description: 'Warning text' },
    { name: 'Info', variable: '--sentinel-status-info', value: '#5a8fb8', description: 'Info states' },
    { name: 'Info Text', variable: '--sentinel-status-info-text', value: '#78a8cc', description: 'Info text' },
  ];

  const marketColors: ColorToken[] = [
    { name: 'Bull', variable: '--sentinel-market-bull', value: '#4a9a7c', description: 'Bullish market state' },
    { name: 'Bear', variable: '--sentinel-market-bear', value: '#b85c5c', description: 'Bearish market state' },
    { name: 'Neutral', variable: '--sentinel-market-neutral', value: '#5ba3a5', description: 'Neutral market state' },
    { name: 'Uncertain', variable: '--sentinel-market-uncertain', value: '#6b7280', description: 'Uncertain market state' },
  ];

  const riskColors: ColorToken[] = [
    { name: 'Risk Low', variable: '--sentinel-risk-low', value: '#4a9a7c', description: 'Low risk level' },
    { name: 'Risk Moderate', variable: '--sentinel-risk-moderate', value: '#5ba3a5', description: 'Moderate risk level' },
    { name: 'Risk Elevated', variable: '--sentinel-risk-elevated', value: '#c4a35a', description: 'Elevated risk level' },
    { name: 'Risk High', variable: '--sentinel-risk-high', value: '#c47a5a', description: 'High risk level' },
    { name: 'Risk Severe', variable: '--sentinel-risk-severe', value: '#b85c5c', description: 'Severe risk level' },
  ];

  const borderColors: ColorToken[] = [
    { name: 'Border Subtle', variable: '--sentinel-border-subtle', value: 'rgba(255, 255, 255, 0.06)', description: 'Subtle borders' },
    { name: 'Border Default', variable: '--sentinel-border-default', value: 'rgba(255, 255, 255, 0.1)', description: 'Default borders' },
    { name: 'Border Strong', variable: '--sentinel-border-strong', value: 'rgba(255, 255, 255, 0.16)', description: 'Strong borders' },
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>Color Palette</h1>
        <p style={descStyles}>
          SENTINEL uses a desaturated, professional color palette designed for financial interfaces.
          Colors are calm and confident, avoiding alarming or distracting hues.
        </p>
      </header>

      <ShowcaseSection
        title="Background Colors"
        description="Layered backgrounds create depth and hierarchy"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            {backgroundColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Text Colors"
        description="Typography hierarchy from primary to disabled"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            {textColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Accent Colors"
        description="Teal accent for interactive elements and focus states"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            {accentColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Status Colors"
        description="Semantic colors for system feedback"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            {statusColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Market State Colors"
        description="Visual indicators for market conditions"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            {marketColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Risk Level Colors"
        description="Graduated scale for risk visualization"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            {riskColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Border Colors"
        description="Subtle borders for separation without distraction"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            {borderColors.map((color) => (
              <ColorSwatch key={color.variable} color={color} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Usage Example">
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--sentinel-bg-elevated)',
          borderRadius: 'var(--sentinel-radius-lg)',
          border: '1px solid var(--sentinel-border-subtle)',
          fontSize: '13px',
          lineHeight: '1.8',
          fontFamily: 'var(--sentinel-font-mono)'
        }}>
          <pre style={{ margin: 0, color: 'var(--sentinel-text-secondary)' }}>
{`.sentinel-card {
  background-color: var(--sentinel-bg-elevated);
  border: 1px solid var(--sentinel-border-subtle);
  color: var(--sentinel-text-primary);
}

.sentinel-button-primary {
  background-color: var(--sentinel-accent-primary);
  color: var(--sentinel-bg-base);
}

.market-indicator.bullish {
  color: var(--sentinel-market-bull);
}

.risk-badge.high {
  background-color: var(--sentinel-risk-high);
}`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}
