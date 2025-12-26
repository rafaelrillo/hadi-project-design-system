// Path: src/pages/styles/BorderRadiusShowcase.tsx
// SENTINEL Design System - Border Radius
import React from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function BorderRadiusShowcase() {
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

  interface RadiusToken {
    name: string;
    variable: string;
    value: string;
    usage: string;
    examples: string[];
  }

  const RadiusSample = ({ token }: { token: RadiusToken }) => {
    return (
      <div style={{
        padding: '24px',
        backgroundColor: 'var(--sentinel-bg-elevated)',
        borderRadius: 'var(--sentinel-radius-md)',
        border: '1px solid var(--sentinel-border-subtle)',
        marginBottom: '20px'
      }}>
        <div style={{ marginBottom: '20px' }}>
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
            {' = '}
            {token.value}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--sentinel-text-tertiary)', fontStyle: 'italic', marginBottom: '12px', fontFamily: 'var(--sentinel-font-primary)' }}>
            {token.usage}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-primary)' }}>
            <strong style={{ color: 'var(--sentinel-text-primary)' }}>Examples:</strong> {token.examples.join(', ')}
          </div>
        </div>

        {/* Visual representation */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Square sample */}
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--sentinel-accent-primary)',
            borderRadius: token.value,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--sentinel-bg-base)',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'var(--sentinel-font-mono)'
          }}>
            {token.value}
          </div>

          {/* Rectangle sample */}
          <div style={{
            width: '160px',
            height: '60px',
            backgroundColor: 'var(--sentinel-bg-subtle)',
            border: '2px solid var(--sentinel-accent-primary)',
            borderRadius: token.value,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--sentinel-accent-primary)',
            fontSize: '12px',
            fontWeight: 500,
            fontFamily: 'var(--sentinel-font-primary)'
          }}>
            RECTANGLE
          </div>

          {/* Button sample */}
          <div style={{
            padding: '10px 20px',
            backgroundColor: 'var(--sentinel-accent-primary)',
            color: 'var(--sentinel-bg-base)',
            borderRadius: token.value,
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'var(--sentinel-font-primary)'
          }}>
            Button
          </div>
        </div>
      </div>
    );
  };

  const radiusTokens: RadiusToken[] = [
    {
      name: 'Radius Small',
      variable: '--sentinel-radius-sm',
      value: '4px',
      usage: 'Subtle rounding for small elements',
      examples: ['Badges', 'Tags', 'Code blocks', 'Chips']
    },
    {
      name: 'Radius Medium',
      variable: '--sentinel-radius-md',
      value: '8px',
      usage: 'Standard radius for most components',
      examples: ['Buttons', 'Inputs', 'Cards', 'Dropdowns']
    },
    {
      name: 'Radius Large',
      variable: '--sentinel-radius-lg',
      value: '12px',
      usage: 'Softer corners for larger elements',
      examples: ['Modals', 'Panels', 'Large cards']
    },
    {
      name: 'Radius Full',
      variable: '--sentinel-radius-full',
      value: '9999px',
      usage: 'Fully rounded for circular elements',
      examples: ['Pills', 'Avatars', 'Circular buttons']
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>Border Radius</h1>
        <p style={descStyles}>
          A consistent radius scale for creating a cohesive, modern interface with appropriate softness at each scale.
        </p>
      </header>

      <ShowcaseSection
        title="Radius Scale"
        description="Progressive border radius values for different component sizes"
      >
        <ComponentPreview>
          <div>
            {radiusTokens.map((token) => (
              <RadiusSample key={token.variable} token={token} />
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Visual Comparison"
        description="Side-by-side comparison of radius values"
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
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            {/* 4px sample */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--sentinel-accent-primary)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--sentinel-bg-base)',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                4px
              </div>
              <div style={{ fontSize: '12px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-primary)' }}>
                Small
              </div>
            </div>

            {/* 8px sample */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--sentinel-accent-primary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--sentinel-bg-base)',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                8px
              </div>
              <div style={{ fontSize: '12px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-primary)' }}>
                Medium
              </div>
            </div>

            {/* 12px sample */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--sentinel-accent-primary)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--sentinel-bg-base)',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                12px
              </div>
              <div style={{ fontSize: '12px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-primary)' }}>
                Large
              </div>
            </div>

            {/* Full sample */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--sentinel-accent-primary)',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--sentinel-bg-base)',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '12px',
                fontFamily: 'var(--sentinel-font-mono)'
              }}>
                Full
              </div>
              <div style={{ fontSize: '12px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-primary)' }}>
                Circular
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
{`/* Small elements */
.badge {
  border-radius: var(--sentinel-radius-sm);
}

/* Standard components */
.button {
  border-radius: var(--sentinel-radius-md);
}

.card {
  border-radius: var(--sentinel-radius-md);
}

/* Large containers */
.modal {
  border-radius: var(--sentinel-radius-lg);
}

/* Circular elements */
.avatar {
  border-radius: var(--sentinel-radius-full);
}`}
          </pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}
