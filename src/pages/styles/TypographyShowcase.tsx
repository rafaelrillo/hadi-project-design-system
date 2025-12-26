// Path: src/pages/styles/TypographyShowcase.tsx
// SENTINEL Design System - Typography
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function TypographyShowcase() {
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

  interface TypographyToken {
    name: string;
    variable: string;
    size: string;
    weight: string;
    usage: string;
  }

  const TypeSample = ({ token, exampleText, fontFamily = 'primary' }: {
    token: TypographyToken;
    exampleText: string;
    fontFamily?: 'primary' | 'mono';
  }) => {
    const sizeMap: { [key: string]: string } = {
      '--sentinel-text-xs': '12px',
      '--sentinel-text-sm': '14px',
      '--sentinel-text-base': '16px',
      '--sentinel-text-lg': '18px',
      '--sentinel-text-xl': '20px',
      '--sentinel-text-2xl': '24px',
      '--sentinel-text-3xl': '30px',
      '--sentinel-text-4xl': '36px',
    };

    const weightMap: { [key: string]: number } = {
      '300': 300,
      '400': 400,
      '500': 500,
      '600': 600,
      '700': 700,
    };

    return (
      <div style={{
        padding: '20px',
        backgroundColor: 'var(--sentinel-bg-elevated)',
        borderRadius: 'var(--sentinel-radius-md)',
        border: '1px solid var(--sentinel-border-subtle)',
        marginBottom: '12px'
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '12px',
          fontSize: '12px',
          color: 'var(--sentinel-text-secondary)',
          flexWrap: 'wrap',
          fontFamily: 'var(--sentinel-font-primary)'
        }}>
          <div>
            <strong style={{ color: 'var(--sentinel-text-primary)' }}>{token.name}</strong>
          </div>
          <code style={{
            backgroundColor: 'var(--sentinel-bg-subtle)',
            padding: '2px 8px',
            borderRadius: 'var(--sentinel-radius-sm)',
            color: 'var(--sentinel-accent-primary)',
            fontFamily: 'var(--sentinel-font-mono)'
          }}>
            var({token.variable})
          </code>
          <span>{token.size}</span>
          <span>Weight: {token.weight}</span>
        </div>

        <div style={{
          fontSize: '11px',
          color: 'var(--sentinel-text-tertiary)',
          marginBottom: '12px',
          fontFamily: 'var(--sentinel-font-primary)'
        }}>
          {token.usage}
        </div>

        <div style={{
          fontSize: sizeMap[token.variable],
          fontWeight: weightMap[token.weight],
          lineHeight: 1.4,
          fontFamily: fontFamily === 'mono' ? 'var(--sentinel-font-mono)' : 'var(--sentinel-font-primary)',
          color: 'var(--sentinel-text-primary)',
          margin: 0
        }}>
          {exampleText}
        </div>
      </div>
    );
  };

  const typographySizes: TypographyToken[] = [
    { name: '4XL', variable: '--sentinel-text-4xl', size: '36px', weight: '300', usage: 'Hero headlines, major page titles' },
    { name: '3XL', variable: '--sentinel-text-3xl', size: '30px', weight: '300', usage: 'Page titles, section headers' },
    { name: '2XL', variable: '--sentinel-text-2xl', size: '24px', weight: '400', usage: 'Section titles, card headers' },
    { name: 'XL', variable: '--sentinel-text-xl', size: '20px', weight: '400', usage: 'Subsection titles' },
    { name: 'LG', variable: '--sentinel-text-lg', size: '18px', weight: '500', usage: 'Large body text, emphasis' },
    { name: 'Base', variable: '--sentinel-text-base', size: '16px', weight: '400', usage: 'Default body text' },
    { name: 'SM', variable: '--sentinel-text-sm', size: '14px', weight: '400', usage: 'Secondary text, descriptions' },
    { name: 'XS', variable: '--sentinel-text-xs', size: '12px', weight: '400', usage: 'Labels, captions, metadata' },
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>Typography</h1>
        <p style={descStyles}>
          SENTINEL uses Inter for primary text and JetBrains Mono for data and code.
          The type scale is designed for clarity and hierarchy in data-dense interfaces.
        </p>
      </header>

      <ShowcaseSection
        title="Font Families"
        description="Two font families serve distinct purposes"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gap: '16px', width: '100%' }}>
            <div style={{
              padding: '24px',
              backgroundColor: 'var(--sentinel-bg-elevated)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-border-subtle)'
            }}>
              <div style={{
                fontSize: '12px',
                color: 'var(--sentinel-text-tertiary)',
                marginBottom: '8px',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                PRIMARY FONT
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 400,
                fontFamily: 'var(--sentinel-font-primary)',
                color: 'var(--sentinel-text-primary)',
                marginBottom: '8px'
              }}>
                Inter - The quick brown fox
              </div>
              <code style={{
                fontSize: '12px',
                backgroundColor: 'var(--sentinel-bg-subtle)',
                padding: '4px 8px',
                borderRadius: 'var(--sentinel-radius-sm)',
                color: 'var(--sentinel-accent-primary)',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                var(--sentinel-font-primary)
              </code>
              <div style={{
                fontSize: '13px',
                color: 'var(--sentinel-text-secondary)',
                marginTop: '12px',
                fontFamily: 'var(--sentinel-font-primary)'
              }}>
                Used for headings, body text, and UI labels. Optimized for readability.
              </div>
            </div>

            <div style={{
              padding: '24px',
              backgroundColor: 'var(--sentinel-bg-elevated)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-border-subtle)'
            }}>
              <div style={{
                fontSize: '12px',
                color: 'var(--sentinel-text-tertiary)',
                marginBottom: '8px',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                MONOSPACE FONT
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 400,
                fontFamily: 'var(--sentinel-font-mono)',
                color: 'var(--sentinel-text-primary)',
                marginBottom: '8px'
              }}>
                JetBrains Mono - 1234567890
              </div>
              <code style={{
                fontSize: '12px',
                backgroundColor: 'var(--sentinel-bg-subtle)',
                padding: '4px 8px',
                borderRadius: 'var(--sentinel-radius-sm)',
                color: 'var(--sentinel-accent-primary)',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                var(--sentinel-font-mono)
              </code>
              <div style={{
                fontSize: '13px',
                color: 'var(--sentinel-text-secondary)',
                marginTop: '12px',
                fontFamily: 'var(--sentinel-font-primary)'
              }}>
                Used for numbers, data values, code, and technical content.
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Type Scale"
        description="Consistent sizing for clear hierarchy"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            {typographySizes.map((token) => (
              <TypeSample
                key={token.variable}
                token={token}
                exampleText="Investment Observatory Design System"
              />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Font Weights"
        description="SENTINEL uses weights from Light (300) to Bold (700)"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gap: '12px', width: '100%' }}>
            {[
              { weight: 300, name: 'Light', usage: 'Large headlines, elegant titles' },
              { weight: 400, name: 'Regular', usage: 'Body text, default weight' },
              { weight: 500, name: 'Medium', usage: 'Emphasis, section titles' },
              { weight: 600, name: 'Semibold', usage: 'Strong emphasis, buttons' },
              { weight: 700, name: 'Bold', usage: 'Maximum emphasis, alerts' },
            ].map((item) => (
              <div key={item.weight} style={{
                padding: '16px 20px',
                backgroundColor: 'var(--sentinel-bg-elevated)',
                borderRadius: 'var(--sentinel-radius-md)',
                border: '1px solid var(--sentinel-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '24px'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: item.weight,
                  fontFamily: 'var(--sentinel-font-primary)',
                  color: 'var(--sentinel-text-primary)',
                  minWidth: '200px'
                }}>
                  {item.name} ({item.weight})
                </div>
                <code style={{
                  fontSize: '12px',
                  backgroundColor: 'var(--sentinel-bg-subtle)',
                  padding: '4px 8px',
                  borderRadius: 'var(--sentinel-radius-sm)',
                  color: 'var(--sentinel-accent-primary)',
                  fontFamily: 'var(--sentinel-font-mono)'
                }}>
                  --sentinel-font-{item.name.toLowerCase()}
                </code>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--sentinel-text-secondary)',
                  fontFamily: 'var(--sentinel-font-primary)'
                }}>
                  {item.usage}
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Monospace Numbers">
        <ComponentPreview>
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--sentinel-bg-elevated)',
            borderRadius: 'var(--sentinel-radius-md)',
            border: '1px solid var(--sentinel-border-subtle)',
            width: '100%'
          }}>
            <div style={{
              fontSize: '12px',
              color: 'var(--sentinel-text-tertiary)',
              marginBottom: '16px',
              fontFamily: 'var(--sentinel-font-mono)',
              letterSpacing: '0.05em'
            }}>
              FINANCIAL DATA DISPLAY
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', marginBottom: '4px', fontFamily: 'var(--sentinel-font-primary)' }}>
                  Portfolio Value
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)' }}>
                  $1,234,567
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', marginBottom: '4px', fontFamily: 'var(--sentinel-font-primary)' }}>
                  Change
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--sentinel-status-positive-text)', fontFamily: 'var(--sentinel-font-mono)' }}>
                  +2.45%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', marginBottom: '4px', fontFamily: 'var(--sentinel-font-primary)' }}>
                  Risk Score
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--sentinel-accent-primary)', fontFamily: 'var(--sentinel-font-mono)' }}>
                  42/100
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', marginBottom: '4px', fontFamily: 'var(--sentinel-font-primary)' }}>
                  Confidence
                </div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)' }}>
                  87%
                </div>
              </div>
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
          <pre style={{ margin: 0, color: 'var(--sentinel-text-secondary)' }}>
{`.page-title {
  font-family: var(--sentinel-font-primary);
  font-size: var(--sentinel-text-3xl);
  font-weight: var(--sentinel-font-light);
  letter-spacing: -0.02em;
}

.data-value {
  font-family: var(--sentinel-font-mono);
  font-size: var(--sentinel-text-xl);
  font-weight: var(--sentinel-font-semibold);
}

.label {
  font-family: var(--sentinel-font-primary);
  font-size: var(--sentinel-text-xs);
  color: var(--sentinel-text-tertiary);
  letter-spacing: 0.05em;
}`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}
