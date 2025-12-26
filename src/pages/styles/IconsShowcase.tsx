// Path: src/pages/styles/IconsShowcase.tsx
// SENTINEL Design System - Icons
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Home, Search, Settings, User, Check, X, Terminal, Code, Database, Cpu } from 'lucide-react';

export function IconsShowcase() {
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

  interface IconToken {
    name: string;
    variable: string;
    value: string;
    pixels: number;
    usage: string;
  }

  const IconSizeSample = ({ token }: { token: IconToken }) => {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: 'var(--sentinel-bg-elevated)',
        borderRadius: 'var(--sentinel-radius-md)',
        border: '1px solid var(--sentinel-border-subtle)',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Icon examples */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: 'var(--sentinel-bg-subtle)',
            borderRadius: 'var(--sentinel-radius-sm)',
            minWidth: '200px',
            border: '1px solid var(--sentinel-border-subtle)'
          }}>
            <Terminal size={token.pixels} color="var(--sentinel-accent-primary)" />
            <Code size={token.pixels} color="var(--sentinel-accent-primary)" />
            <Database size={token.pixels} color="var(--sentinel-accent-primary)" />
            <Cpu size={token.pixels} color="var(--sentinel-accent-primary)" />
          </div>

          {/* Token info */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 500,
              color: 'var(--sentinel-text-primary)',
              marginBottom: '4px',
              fontFamily: 'var(--sentinel-font-primary)'
            }}>
              {token.name}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--sentinel-text-secondary)', marginBottom: '2px', fontFamily: 'var(--sentinel-font-primary)' }}>
              <code style={{
                backgroundColor: 'var(--sentinel-bg-subtle)',
                padding: '2px 6px',
                borderRadius: 'var(--sentinel-radius-sm)',
                color: 'var(--sentinel-accent-primary)',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                var({token.variable})
              </code>
              {' = '}
              {token.value}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontStyle: 'italic', fontFamily: 'var(--sentinel-font-primary)' }}>
              {token.usage}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const iconSizes: IconToken[] = [
    {
      name: 'Icon Extra Small',
      variable: '--icon-size-xs',
      value: '16px',
      pixels: 16,
      usage: 'Very small icons, indicators, inline badges'
    },
    {
      name: 'Icon Small',
      variable: '--icon-size-sm',
      value: '20px',
      pixels: 20,
      usage: 'Icons in inputs, small buttons, inline icons'
    },
    {
      name: 'Icon Medium (Standard)',
      variable: '--icon-size-md',
      value: '24px',
      pixels: 24,
      usage: 'STANDARD - Navigation, buttons, menus, sidebar'
    },
    {
      name: 'Icon Large',
      variable: '--icon-size-lg',
      value: '32px',
      pixels: 32,
      usage: 'Featured icons, headers, illustrations'
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>Icons</h1>
        <p style={descStyles}>
          SENTINEL uses Lucide React for iconography. A consistent icon scale ensures visual harmony across the interface.
        </p>
      </header>

      <ShowcaseSection
        title="Icon Sizes"
        description="Four available sizes: 16px, 20px, 24px (standard), 32px"
      >
        <ComponentPreview>
          <div>
            {iconSizes.map((token) => (
              <IconSizeSample key={token.variable} token={token} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Size Comparison"
        description="Visual comparison of all sizes with the same icon"
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-subtle)',
            padding: '40px',
            borderRadius: 'var(--sentinel-radius-lg)',
            border: '1px solid var(--sentinel-border-subtle)',
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                height: '60px'
              }}>
                <Terminal size={16} color="var(--sentinel-accent-primary)" />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '4px', color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-primary)' }}>XS</div>
              <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>16px</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                height: '60px'
              }}>
                <Terminal size={20} color="var(--sentinel-accent-primary)" />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '4px', color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-primary)' }}>SM</div>
              <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>20px</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                height: '60px'
              }}>
                <Terminal size={24} color="var(--sentinel-accent-primary)" />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '4px', color: 'var(--sentinel-accent-primary)', fontFamily: 'var(--sentinel-font-primary)' }}>MD (STD)</div>
              <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>24px</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                height: '60px'
              }}>
                <Terminal size={32} color="var(--sentinel-accent-primary)" />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '4px', color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-primary)' }}>LG</div>
              <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>32px</div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Icon Library: Lucide React"
        description="SENTINEL uses Lucide React as the official icon library"
      >
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--sentinel-bg-elevated)',
          borderRadius: 'var(--sentinel-radius-lg)',
          border: '1px solid var(--sentinel-border-subtle)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 500,
              marginBottom: '12px',
              color: 'var(--sentinel-text-tertiary)',
              fontFamily: 'var(--sentinel-font-primary)',
              letterSpacing: '0.05em'
            }}>
              COMMON SYSTEM ICONS
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '16px',
              padding: '16px',
              backgroundColor: 'var(--sentinel-bg-subtle)',
              borderRadius: 'var(--sentinel-radius-md)',
              border: '1px solid var(--sentinel-border-subtle)'
            }}>
              {[
                { icon: Terminal, name: 'Terminal' },
                { icon: Code, name: 'Code' },
                { icon: Database, name: 'Database' },
                { icon: Cpu, name: 'Cpu' },
                { icon: Home, name: 'Home' },
                { icon: Search, name: 'Search' },
                { icon: Settings, name: 'Settings' },
                { icon: User, name: 'User' },
                { icon: Check, name: 'Check' },
                { icon: X, name: 'X' }
              ].map(({ icon: Icon, name }) => (
                <div key={name} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Icon size={24} color="var(--sentinel-accent-primary)" />
                  <div style={{ fontSize: '10px', color: 'var(--sentinel-text-tertiary)', textAlign: 'center', fontFamily: 'var(--sentinel-font-mono)' }}>
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--sentinel-text-secondary)', lineHeight: '1.8', fontFamily: 'var(--sentinel-font-primary)' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong style={{ color: 'var(--sentinel-text-primary)' }}>Installation:</strong>{' '}
              <code style={{
                backgroundColor: 'var(--sentinel-bg-subtle)',
                padding: '2px 6px',
                borderRadius: 'var(--sentinel-radius-sm)',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>npm install lucide-react</code>
            </p>
            <p>
              <strong style={{ color: 'var(--sentinel-text-primary)' }}>Browse icons:</strong>{' '}
              <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sentinel-accent-primary)' }}>
                https://lucide.dev/icons/
              </a>
            </p>
          </div>
        </div>
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
            REACT USAGE EXAMPLE
          </div>
          <pre style={{ margin: 0, color: 'var(--sentinel-text-secondary)' }}>
{`import { Terminal, Code, Database } from 'lucide-react';

// Size with CSS variable
<Terminal size={24} /> // Standard (--icon-size-md)
<Code size={20} />     // Small (--icon-size-sm)
<Database size={16} /> // Extra Small (--icon-size-xs)

// With theme colors
<Terminal size={24} color="var(--sentinel-accent-primary)" />
<Code size={24} color="var(--sentinel-status-positive-text)" />
<Database size={24} color="var(--sentinel-status-negative-text)" />`}
          </pre>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Technical Specifications">
        <div style={{
          padding: '24px',
          backgroundColor: 'var(--sentinel-bg-elevated)',
          borderRadius: 'var(--sentinel-radius-lg)',
          border: '1px solid var(--sentinel-border-subtle)',
          fontSize: '13px',
          color: 'var(--sentinel-text-primary)',
          lineHeight: '1.8',
          fontFamily: 'var(--sentinel-font-primary)'
        }}>
          <div style={{ display: 'grid', gap: '8px' }}>
            <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Library:</strong> Lucide React (MIT license)</p>
            <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Standard size:</strong> 24px (--icon-size-md)</p>
            <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Size range:</strong> 16px, 20px, 24px, 32px</p>
            <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Default color:</strong> var(--sentinel-accent-primary)</p>
            <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Stroke width:</strong> 2px (Lucide default)</p>
            <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Available icons:</strong> 1000+ in library</p>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
