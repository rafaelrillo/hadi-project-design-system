// Path: src/pages/styles/ShadowsShowcase.tsx
// SENTINEL Design System - Shadows
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function ShadowsShowcase() {
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

  interface ShadowToken {
    name: string;
    variable: string;
    value: string;
    usage: string;
  }

  const ShadowSample = ({ token }: { token: ShadowToken }) => {
    return (
      <div style={{
        marginBottom: '24px'
      }}>
        <div style={{
          padding: '32px',
          backgroundColor: 'var(--sentinel-bg-elevated)',
          borderRadius: 'var(--sentinel-radius-md)',
          border: '1px solid var(--sentinel-border-subtle)',
          boxShadow: token.value,
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 500,
            color: 'var(--sentinel-text-primary)',
            marginBottom: '8px',
            fontFamily: 'var(--sentinel-font-primary)'
          }}>
            {token.name}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--sentinel-text-secondary)', marginBottom: '4px', fontFamily: 'var(--sentinel-font-primary)' }}>
            <code style={{
              backgroundColor: 'var(--sentinel-bg-subtle)',
              padding: '2px 6px',
              borderRadius: 'var(--sentinel-radius-sm)',
              color: 'var(--sentinel-accent-primary)',
              fontFamily: 'var(--sentinel-font-mono)'
            }}>
              var({token.variable})
            </code>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontStyle: 'italic', fontFamily: 'var(--sentinel-font-primary)' }}>
            {token.usage}
          </div>
        </div>
        <div style={{
          marginTop: '8px',
          fontSize: '11px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-mono)',
          backgroundColor: 'var(--sentinel-bg-subtle)',
          padding: '8px',
          borderRadius: 'var(--sentinel-radius-sm)',
          border: '1px solid var(--sentinel-border-subtle)'
        }}>
          {token.value}
        </div>
      </div>
    );
  };

  const shadows: ShadowToken[] = [
    {
      name: 'Shadow Small',
      variable: '--sentinel-shadow-sm',
      value: '0 1px 2px rgba(0, 0, 0, 0.4)',
      usage: 'Subtle elevation for small elements'
    },
    {
      name: 'Shadow Medium',
      variable: '--sentinel-shadow-md',
      value: '0 4px 8px rgba(0, 0, 0, 0.4)',
      usage: 'Standard elevation for cards and containers'
    },
    {
      name: 'Shadow Large',
      variable: '--sentinel-shadow-lg',
      value: '0 8px 24px rgba(0, 0, 0, 0.5)',
      usage: 'Higher elevation for modals and overlays'
    },
    {
      name: 'Shadow XL',
      variable: '--sentinel-shadow-xl',
      value: '0 16px 48px rgba(0, 0, 0, 0.6)',
      usage: 'Maximum elevation for prominent elements'
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>Shadows</h1>
        <p style={descStyles}>
          Shadow tokens for creating depth and elevation hierarchy in the SENTINEL interface.
        </p>
      </header>

      <ShowcaseSection
        title="Shadow Scale"
        description="Progressive shadow depths for different elevation levels"
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-subtle)',
            padding: '20px',
            borderRadius: 'var(--sentinel-radius-lg)',
            border: '1px solid var(--sentinel-border-subtle)'
          }}>
            {shadows.map((shadow) => (
              <ShadowSample key={shadow.variable} token={shadow} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Elevation Comparison"
        description="Side-by-side view of different shadow levels"
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-subtle)',
            padding: '40px',
            borderRadius: 'var(--sentinel-radius-lg)',
            border: '1px solid var(--sentinel-border-subtle)',
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '140px',
              height: '140px',
              backgroundColor: 'var(--sentinel-bg-elevated)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-border-subtle)',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-primary)' }}>SM</div>
              <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>1-2px</div>
            </div>

            <div style={{
              width: '140px',
              height: '140px',
              backgroundColor: 'var(--sentinel-bg-elevated)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-border-subtle)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-primary)' }}>MD</div>
              <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>4-8px</div>
            </div>

            <div style={{
              width: '140px',
              height: '140px',
              backgroundColor: 'var(--sentinel-bg-elevated)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-border-subtle)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-primary)' }}>LG</div>
              <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>8-24px</div>
            </div>

            <div style={{
              width: '140px',
              height: '140px',
              backgroundColor: 'var(--sentinel-bg-elevated)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-border-subtle)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-primary)' }}>XL</div>
              <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>16-48px</div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Status Indicators"
        description="Subtle color accents for different system states"
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-subtle)',
            padding: '40px',
            borderRadius: 'var(--sentinel-radius-lg)',
            border: '1px solid var(--sentinel-border-subtle)',
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'var(--sentinel-bg-elevated)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-status-positive)',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--sentinel-status-positive-text)', fontFamily: 'var(--sentinel-font-primary)' }}>POSITIVE</div>
            </div>

            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'var(--sentinel-bg-elevated)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-status-negative)',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--sentinel-status-negative-text)', fontFamily: 'var(--sentinel-font-primary)' }}>NEGATIVE</div>
            </div>

            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'var(--sentinel-bg-elevated)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-status-warning)',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--sentinel-status-warning-text)', fontFamily: 'var(--sentinel-font-primary)' }}>WARNING</div>
            </div>
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
          <div style={{
            marginBottom: '12px',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'var(--sentinel-font-primary)',
            color: 'var(--sentinel-text-tertiary)',
            letterSpacing: '0.05em'
          }}>
            EXAMPLE USAGE
          </div>
          <pre style={{ margin: 0, color: 'var(--sentinel-text-secondary)' }}>
{`.card {
  box-shadow: var(--sentinel-shadow-md);
}

.button:hover {
  box-shadow: var(--sentinel-shadow-sm);
}

.dropdown {
  box-shadow: var(--sentinel-shadow-lg);
}

.modal {
  box-shadow: var(--sentinel-shadow-xl);
}`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}
