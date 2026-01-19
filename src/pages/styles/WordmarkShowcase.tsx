// Path: src/pages/styles/WordmarkShowcase.tsx
// FING Wordmark Showcase - 12 Inset/Cavado Variations
// Typography: Cormorant Garamond Light

import React from 'react';
import {
  FingWordmark,
  FingWordmarkText,
  WORDMARK_VARIANTS,
  RECOMMENDED_VARIANTS,
  type FingWordmarkVariant,
} from '@atoms/FingWordmark';

// ═══════════════════════════════════════════════════════════════════════════════
// VARIANT DESCRIPTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const variantDescriptions: Record<FingWordmarkVariant, { name: string; description: string }> = {
  whisper: {
    name: 'WHISPER',
    description: 'Casi plano, muy sutil. Para aplicaciones donde se necesita mínimo efecto.',
  },
  soft: {
    name: 'SOFT',
    description: 'Suave estándar. Equilibrio entre visibilidad y sutileza.',
  },
  medium: {
    name: 'MEDIUM',
    description: 'Moderado, equilibrado. Buen punto medio para la mayoría de usos.',
  },
  deep: {
    name: 'DEEP',
    description: 'Profundo, más sombra. Para cuando se necesita más presencia.',
  },
  carved: {
    name: 'CARVED ⭐',
    description: 'Tallado invertido. El texto parece hundido en la piedra. Recomendado para logo.',
  },
  pressed: {
    name: 'PRESSED ⭐',
    description: 'Presionado fuerte con gradiente. Efecto más dramático. Alternativa recomendada.',
  },
  bowl: {
    name: 'BOWL',
    description: 'Cuenco con gradiente radial. Efecto de depresión suave.',
  },
  channel: {
    name: 'CHANNEL',
    description: 'Canal/ranura. Sombras más horizontales.',
  },
  etched: {
    name: 'ETCHED',
    description: 'Grabado con borde interior. Añade definición al contenedor.',
  },
  crater: {
    name: 'CRATER',
    description: 'Cráter profundo con sombra direccional. Efecto más dramático.',
  },
  pillow: {
    name: 'PILLOW',
    description: 'Almohadilla con gradiente diagonal suave.',
  },
  sharp: {
    name: 'SHARP',
    description: 'Bordes definidos, menos blur. Efecto más preciso/técnico.',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SHOWCASE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function WordmarkShowcase() {
  // Neumorphic Typography System
  const typoInset = {
    soft: {
      color: 'var(--marble-dark)',
      textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
    } as React.CSSProperties,
    medium: {
      color: 'var(--marble-dark)',
      textShadow: '1px 1px 0px rgba(255, 255, 255, 0.8), -1px -1px 0px rgba(130, 140, 155, 0.5)',
    } as React.CSSProperties,
    display: {
      color: 'var(--marble-dark)',
      textShadow: '2px 2px 1px rgba(255, 255, 255, 0.9), -2px -2px 1px rgba(130, 140, 155, 0.6)',
    } as React.CSSProperties,
  };

  const typoRaised = {
    whisper: {
      color: 'var(--marble-base)',
      textShadow: '-0.5px -0.5px 0px rgba(255, 255, 255, 0.9), 0.5px 0.5px 0px rgba(147, 157, 170, 0.4)',
    } as React.CSSProperties,
    soft: {
      color: 'var(--marble-base)',
      textShadow: '-0.75px -0.75px 0px rgba(255, 255, 255, 0.9), 0.75px 0.75px 0px rgba(147, 157, 170, 0.45)',
    } as React.CSSProperties,
    medium: {
      color: 'var(--marble-base)',
      textShadow: '-1px -1px 0px rgba(255, 255, 255, 0.95), 1px 1px 0px rgba(147, 157, 170, 0.5)',
    } as React.CSSProperties,
  };

  const typoAccent = {
    teal: {
      color: 'var(--fing-teal)',
      textShadow: '-0.75px -0.75px 0px rgba(255, 255, 255, 0.8), 0.75px 0.75px 0px rgba(58, 106, 114, 0.3)',
    } as React.CSSProperties,
  };

  // Container Styles
  const showcaseStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: 'var(--marble-base)',
    padding: '32px',
    fontFamily: 'var(--fing-font-primary)',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '48px',
  };

  const sectionStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    borderRadius: '24px',
    boxShadow: 'var(--raised-3)',
    padding: '32px',
    marginBottom: '24px',
  };

  const insetStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    borderRadius: '16px',
    boxShadow: 'var(--inset-2)',
    padding: '24px',
  };

  return (
    <div style={showcaseStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <h1 style={{
          fontFamily: 'var(--fing-font-display)',
          fontSize: '36px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '8px',
          ...typoInset.display,
        }}>
          FING Wordmark
        </h1>
        <p style={{
          fontSize: '16px',
          fontStyle: 'italic',
          marginBottom: '24px',
          ...typoInset.soft,
        }}>
          12 Inset/Cavado Variations
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
        }}>
          <FingWordmark variant="carved" size={48} />
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: TYPOGRAPHY SELECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={sectionStyles}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--marble-dark)',
          ...typoAccent.teal,
        }}>
          Typography Selection
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Font Info */}
          <div style={insetStyles}>
            <div style={{ ...typoRaised.medium, fontSize: '18px', fontWeight: 500, marginBottom: '16px' }}>
              Cormorant Garamond Light
            </div>
            <div style={{ ...typoRaised.soft, fontSize: '13px', lineHeight: 1.8 }}>
              <strong>Font:</strong> Cormorant Garamond<br />
              <strong>Weight:</strong> 300 (Light)<br />
              <strong>Letter Spacing:</strong> 0.06em<br />
              <strong>Google Fonts:</strong> <code style={{ fontFamily: 'var(--fing-font-mono)', fontSize: '11px' }}>family=Cormorant+Garamond:wght@300</code>
            </div>
          </div>

          {/* CSS Example */}
          <div style={insetStyles}>
            <div style={{ ...typoRaised.medium, fontSize: '18px', fontWeight: 500, marginBottom: '16px' }}>
              CSS Implementation
            </div>
            <pre style={{
              fontFamily: 'var(--fing-font-mono)',
              fontSize: '11px',
              background: 'rgba(0,0,0,0.05)',
              padding: '16px',
              borderRadius: '8px',
              overflow: 'auto',
              ...typoRaised.whisper,
            }}>
{`.fing-wordmark {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  letter-spacing: 0.06em;
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: RECOMMENDED VARIATIONS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={sectionStyles}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--marble-dark)',
          ...typoAccent.teal,
        }}>
          Recommended Variations
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px', maxWidth: '700px' }}>
          For logo and wordmark usage, <strong>CARVED</strong> and <strong>PRESSED</strong> create the most authentic
          "carved in stone" effect that aligns with the Stone Marble design philosophy.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {RECOMMENDED_VARIANTS.map((variant) => (
            <div key={variant} style={insetStyles}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '160px',
                marginBottom: '16px',
              }}>
                <FingWordmark variant={variant} size={72} />
              </div>
              <div style={{ ...typoRaised.medium, fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                {variantDescriptions[variant].name}
              </div>
              <div style={{ ...typoRaised.soft, fontSize: '12px' }}>
                {variantDescriptions[variant].description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: ALL 12 VARIATIONS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={sectionStyles}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--marble-dark)',
          ...typoAccent.teal,
        }}>
          All 12 Inset Variations
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {WORDMARK_VARIANTS.map((variant, index) => (
            <div key={variant} style={insetStyles}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '120px',
                marginBottom: '16px',
              }}>
                <FingWordmark variant={variant} size={48} containerPadding={24} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--fing-font-mono)',
                  fontSize: '10px',
                  color: 'var(--fing-teal)',
                  background: 'rgba(58, 106, 114, 0.1)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}>
                  {index + 1}
                </span>
                <span style={{ ...typoRaised.medium, fontSize: '13px', fontWeight: 600 }}>
                  {variantDescriptions[variant].name}
                </span>
              </div>
              <div style={{ ...typoRaised.soft, fontSize: '11px', lineHeight: 1.5 }}>
                {variantDescriptions[variant].description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: SIZE VARIATIONS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={sectionStyles}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--marble-dark)',
          ...typoAccent.teal,
        }}>
          Size Variations
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px' }}>
          The wordmark scales proportionally. Recommended sizes for different use cases.
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[24, 36, 48, 72, 96, 120].map((size) => (
            <div key={size} style={{ ...insetStyles, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <FingWordmark variant="carved" size={size} containerPadding={size * 0.4} containerRadius={size * 0.2} />
              <span style={{ ...typoRaised.whisper, fontSize: '10px', fontFamily: 'var(--fing-font-mono)' }}>
                {size}px
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: TEXT ONLY (WITHOUT CONTAINER)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={sectionStyles}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--marble-dark)',
          ...typoAccent.teal,
        }}>
          Text Only (Without Container)
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px' }}>
          The wordmark text can be used without its container for inline or custom layouts.
        </p>

        <div style={{ ...insetStyles, padding: '48px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
            {RECOMMENDED_VARIANTS.map((variant) => (
              <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <FingWordmarkText variant={variant} size={72} />
                <span style={{ ...typoRaised.whisper, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {variant}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: USE CASES
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={sectionStyles}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--marble-dark)',
          ...typoAccent.teal,
        }}>
          Recommendations by Use Case
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {/* Logo/Wordmark */}
          <div style={insetStyles}>
            <div style={{ ...typoRaised.medium, fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
              Logo / Wordmark
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100px',
              marginBottom: '12px',
            }}>
              <FingWordmark variant="carved" size={48} />
            </div>
            <div style={{ ...typoRaised.soft, fontSize: '11px' }}>
              Use <strong>CARVED</strong> or <strong>PRESSED</strong> for the most authentic carved-in-stone effect.
            </div>
          </div>

          {/* UI Elements */}
          <div style={insetStyles}>
            <div style={{ ...typoRaised.medium, fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
              UI Elements
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100px',
              marginBottom: '12px',
            }}>
              <FingWordmark variant="soft" size={36} containerPadding={16} />
            </div>
            <div style={{ ...typoRaised.soft, fontSize: '11px' }}>
              Use <strong>SOFT</strong> or <strong>MEDIUM</strong> for repeated UI elements. Less dramatic, better for balance.
            </div>
          </div>

          {/* Hero / Display */}
          <div style={insetStyles}>
            <div style={{ ...typoRaised.medium, fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
              Hero / Display
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100px',
              marginBottom: '12px',
            }}>
              <FingWordmark variant="crater" size={48} />
            </div>
            <div style={{ ...typoRaised.soft, fontSize: '11px' }}>
              Use <strong>DEEP</strong> or <strong>CRATER</strong> for maximum impact in large hero presentations.
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: CSS VARIABLES REFERENCE
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={sectionStyles}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--marble-dark)',
          ...typoAccent.teal,
        }}>
          CSS Variables Reference
        </div>

        <div style={insetStyles}>
          <pre style={{
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '11px',
            lineHeight: 1.8,
            overflow: 'auto',
            ...typoRaised.whisper,
          }}>
{`:root {
  /* Wordmark Font */
  --fing-wordmark-font: 'Cormorant Garamond', serif;
  --fing-wordmark-weight: 300;
  --fing-wordmark-tracking: 0.06em;

  /* Recommended: Carved */
  --fing-wm-inset-carved:
    inset 5px 5px 10px rgba(130, 140, 155, 0.55),
    inset -5px -5px 10px rgba(255, 255, 255, 0.9);
  --fing-wm-text-carved:
    -1px -1px 0px rgba(255, 255, 255, 0.9),
    1px 1px 2px rgba(130, 140, 155, 0.6);

  /* Recommended: Pressed */
  --fing-wm-inset-pressed:
    inset 8px 8px 16px rgba(115, 125, 140, 0.65),
    inset -8px -8px 16px rgba(255, 255, 255, 0.85);
  --fing-wm-text-pressed:
    -1.5px -1.5px 1px rgba(255, 255, 255, 0.8),
    1.5px 1.5px 2px rgba(115, 125, 140, 0.7);
  --fing-wm-bg-pressed: linear-gradient(145deg, #caced3, #dce0e5);
}`}
          </pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 8: IMPLEMENTATION EXAMPLE
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={sectionStyles}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--marble-dark)',
          ...typoAccent.teal,
        }}>
          Implementation Example
        </div>

        <div style={insetStyles}>
          <pre style={{
            fontFamily: 'var(--fing-font-mono)',
            fontSize: '11px',
            lineHeight: 1.8,
            overflow: 'auto',
            ...typoRaised.whisper,
          }}>
{`import { FingWordmark, FingWordmarkText } from '@atoms/FingWordmark';

// With container (default)
<FingWordmark
  variant="carved"
  size={72}
  containerPadding={32}
  containerRadius={16}
/>

// Text only (no container)
<FingWordmarkText variant="carved" size={72} />

// Available variants:
// 'whisper' | 'soft' | 'medium' | 'deep'
// 'carved' ⭐ | 'pressed' ⭐
// 'bowl' | 'channel' | 'etched' | 'crater' | 'pillow' | 'sharp'`}
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '32px 0' }}>
        <div style={{ marginBottom: '16px' }}>
          <FingWordmark variant="carved" size={36} />
        </div>
        <p style={{ ...typoInset.soft, fontSize: '11px' }}>
          FING Wordmark System v1.0 — Stone Marble Design System
        </p>
      </footer>
    </div>
  );
}

export default WordmarkShowcase;
