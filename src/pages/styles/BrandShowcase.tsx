// Path: src/pages/styles/BrandShowcase.tsx
// QUAFI Brand Guidelines - Stone Marble Design System
import React from 'react';
import { QuafiEmblem, QuafiLockupHorizontal, QuafiLockupVertical, type QuafiEmblemAnimation } from '@atoms/QuafiEmblem';
import { showcase } from '../showcaseStyles';

// ═══════════════════════════════════════════════════════════════════════════════
// QUAFI LOGO COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

interface QuafiLogoProps {
  variant: 'dark' | 'stone' | 'white' | 'light';
  size?: number;
  showWordmark?: boolean;
}

const QuafiLogo: React.FC<QuafiLogoProps> = ({ variant, size = 1, showWordmark = true }) => {
  const baseWidth = 58 * size;
  const baseHeight = 44 * size;
  const fontSize = 34 * size;

  const fills: Record<string, [string, string]> = {
    dark: ['var(--quafi-logo-slate-1)', 'var(--quafi-logo-slate-2)'],
    stone: ['var(--quafi-logo-marble-1)', 'var(--quafi-logo-marble-2)'],
    white: ['rgba(255,255,255,0.88)', 'rgba(255,255,255,0.95)'],
    light: ['var(--quafi-logo-light-1)', 'var(--quafi-logo-light-2)'],
  };

  const textColors: Record<string, string> = {
    dark: 'var(--quafi-text-light)',
    stone: 'var(--marble-base)',
    white: '#ffffff',
    light: 'var(--quafi-text-dark)',
  };

  const filters: Record<string, React.CSSProperties> = {
    dark: { filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5)) drop-shadow(-3px -3px 6px rgba(60, 60, 70, 0.4))' },
    stone: { filter: 'drop-shadow(5px 5px 10px var(--shadow-dark)) drop-shadow(-4px -4px 8px var(--shadow-light))' },
    white: { filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.3))' },
    light: { filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.08))' },
  };

  const wordmarkStyles: Record<string, React.CSSProperties> = {
    dark: { color: textColors.dark },
    stone: {
      color: textColors.stone,
      textShadow: 'var(--lp-embossed)',
    },
    white: { color: textColors.white },
    light: { color: textColors.light },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 * size }}>
      <svg
        width={baseWidth}
        height={baseHeight}
        viewBox="0 0 120 100"
        style={filters[variant]}
      >
        <ellipse cx="42" cy="52" rx="34" ry="42" fill={fills[variant][0]} transform="rotate(-10 42 52)" />
        <ellipse cx="78" cy="52" rx="34" ry="42" fill={fills[variant][1]} transform="rotate(10 78 52)" />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: 'var(--quafi-font-primary)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            fontSize,
            ...wordmarkStyles[variant],
          }}
        >
          quafi
        </span>
      )}
    </div>
  );
};

const QuafiSymbol: React.FC<{ variant: 'dark' | 'stone' | 'white' | 'light'; size?: number }> = ({
  variant,
  size = 70,
}) => {
  const fills: Record<string, [string, string]> = {
    dark: ['var(--quafi-logo-slate-1)', 'var(--quafi-logo-slate-2)'],
    stone: ['var(--quafi-logo-marble-1)', 'var(--quafi-logo-marble-2)'],
    white: ['rgba(255,255,255,0.88)', 'rgba(255,255,255,0.95)'],
    light: ['var(--quafi-logo-light-1)', 'var(--quafi-logo-light-2)'],
  };

  const filters: Record<string, React.CSSProperties> = {
    dark: { filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5)) drop-shadow(-3px -3px 6px rgba(60, 60, 70, 0.4))' },
    stone: { filter: 'drop-shadow(5px 5px 10px var(--shadow-dark)) drop-shadow(-4px -4px 8px var(--shadow-light))' },
    white: { filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.3))' },
    light: { filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.08))' },
  };

  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 120 100" style={filters[variant]}>
      <ellipse cx="42" cy="52" rx="34" ry="42" fill={fills[variant][0]} transform="rotate(-10 42 52)" />
      <ellipse cx="78" cy="52" rx="34" ry="42" fill={fills[variant][1]} transform="rotate(10 78 52)" />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BRAND SHOWCASE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function BrandShowcase() {
  // ═══════════════════════════════════════════════════════════════════════════════
  // NEUMORPHIC TYPOGRAPHY SYSTEM
  //
  // REGLA CRÍTICA:
  // - Contenedor RAISED → Tipografía INSET (cavada/debossed/engraved)
  // - Contenedor INSET → Tipografía RAISED (elevada/embossed)
  // - Fondo BASE → Tipografía INSET (el fondo actúa como superficie raised)
  // ═══════════════════════════════════════════════════════════════════════════════

  // Tipografía INSET (cavada) - para usar en contenedores RAISED o sobre fondo BASE
  // La luz viene de arriba-izquierda, creando sombra abajo-derecha dentro del texto
  const typoInset = {
    whisper: {
      color: showcase.colors.marbleDark,
      textShadow: 'var(--lp-muted)',
    } as React.CSSProperties,
    soft: {
      color: showcase.colors.marbleDark,
      textShadow: 'var(--lp-muted)',
    } as React.CSSProperties,
    medium: {
      color: showcase.colors.marbleDark,
      textShadow: 'var(--lp-primary)',
    } as React.CSSProperties,
    strong: {
      color: showcase.colors.marbleDark,
      textShadow: 'var(--lp-primary-strong)',
    } as React.CSSProperties,
    display: {
      color: showcase.colors.marbleDark,
      textShadow: 'var(--lp-primary-strong)',
    } as React.CSSProperties,
  };

  // Tipografía RAISED (elevada) - para usar en contenedores INSET
  // La luz viene de arriba-izquierda, creando highlight arriba-izquierda del texto
  const typoRaised = {
    whisper: {
      color: showcase.colors.marble,
      textShadow: 'var(--lp-embossed-subtle)',
    } as React.CSSProperties,
    soft: {
      color: showcase.colors.marble,
      textShadow: 'var(--lp-embossed-subtle)',
    } as React.CSSProperties,
    medium: {
      color: showcase.colors.marble,
      textShadow: 'var(--lp-embossed)',
    } as React.CSSProperties,
    strong: {
      color: showcase.colors.marble,
      textShadow: 'var(--lp-embossed)',
    } as React.CSSProperties,
    display: {
      color: showcase.colors.marble,
      textShadow: 'var(--lp-embossed)',
    } as React.CSSProperties,
  };

  // Tipografía con color de acento - para usar en contenedores INSET
  const typoAccent = {
    teal: {
      color: 'var(--quafi-teal)',
      textShadow: 'var(--lp-petrol-whisper)',
    } as React.CSSProperties,
    tealStrong: {
      color: 'var(--quafi-teal)',
      textShadow: 'var(--lp-petrol)',
    } as React.CSSProperties,
    positive: {
      color: 'var(--quafi-positive)',
      textShadow: 'var(--lp-positive)',
    } as React.CSSProperties,
    negative: {
      color: 'var(--quafi-negative)',
      textShadow: 'var(--lp-negative)',
    } as React.CSSProperties,
  };

  // ═══ CONTAINER STYLES ═══
  const showcaseStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: showcase.colors.marble,
    padding: '32px',
    fontFamily: 'var(--quafi-font-primary)',
  };

  // RAISED container (section) styles
  const sectionStyles: React.CSSProperties = {
    background: showcase.colors.marble,
    borderRadius: '20px',
    boxShadow: 'var(--raised-3)',
    padding: '32px',
    marginBottom: '24px',
  };

  // INSET container styles
  const insetStyles: React.CSSProperties = {
    background: showcase.colors.marble,
    borderRadius: '16px',
    boxShadow: 'var(--inset-2)',
    padding: '24px',
  };

  // ═══ DATA ═══
  const brandColors = [
    { name: 'Quafi Teal', variable: '--quafi-teal', value: '#3a6a72' },
    { name: 'Quafi Positive', variable: '--quafi-positive', value: '#4a7a6a' },
    { name: 'Quafi Negative', variable: '--quafi-negative', value: '#8a5a4a' },
    { name: 'Quafi Warning', variable: '--quafi-warning', value: '#a08a4a' },
  ];

  const logoColors = [
    { name: 'Slate 1', variable: '--quafi-logo-slate-1', value: '#3a3a42' },
    { name: 'Slate 2', variable: '--quafi-logo-slate-2', value: '#44444c' },
    { name: 'Marble 1', variable: '--quafi-logo-marble-1', value: '#eceef2' },
    { name: 'Marble 2', variable: '--quafi-logo-marble-2', value: '#f0f2f5' },
  ];

  const traits = [
    { name: 'Silent', desc: 'Speaks little, but with weight' },
    { name: 'Patient', desc: 'Observes the long term' },
    { name: 'Precise', desc: 'Every word counts' },
    { name: 'Institutional', desc: 'Serious, professional' },
    { name: 'Intelligent', desc: 'Sophisticated, not pretentious' },
  ];

  const taglines = [
    { text: 'Quiet intelligence', emphasis: 'The personality' },
    { text: 'Resolve', emphasis: 'The action' },
    { text: 'The long view', emphasis: 'The patience' },
  ];

  // ═══ RENDER ═══
  return (
    <div style={showcaseStyles}>
      {/* Header - usando unified showcase styles */}
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>
          QUAFI Brand Guidelines
        </h1>
        <p style={showcase.header.description}>
          Quiet intelligence
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: NAME ORIGIN (RAISED container)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section style={sectionStyles}>
        {/* Section title - en RAISED, usa tipografía INSET */}
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
          The Name
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          {/* FINIS - INSET container, usa tipografía RAISED */}
          <div style={insetStyles}>
            <div style={{
              ...typoAccent.tealStrong,
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              FINIS → FINANCE
            </div>
            <div style={{ ...typoRaised.strong, fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>
              To resolve, to conclude
            </div>
            <div style={{ ...typoRaised.soft, fontSize: '13px', lineHeight: 1.6 }}>
              From Latin <em>fīnis</em> — the root that gave us "finance."
              The original meaning wasn't about money, but about <strong>completing what's pending</strong>:
              settling debts, fulfilling commitments, reaching objectives.
            </div>
          </div>

          {/* INGENIUM - INSET container, usa tipografía RAISED */}
          <div style={insetStyles}>
            <div style={{
              ...typoAccent.tealStrong,
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              INGENIUM → ENGINE
            </div>
            <div style={{ ...typoRaised.strong, fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>
              Innate talent, ingenuity
            </div>
            <div style={{ ...typoRaised.soft, fontSize: '13px', lineHeight: 1.6 }}>
              From Latin <em>ingenium</em> — "what is born within." Before meaning "machine,"
              engine meant <strong>ingenuity</strong>: the human ability to create devices that solve problems.
            </div>
          </div>
        </div>

        {/* Synthesis - INSET container, usa tipografía RAISED */}
        <div style={{ ...insetStyles, textAlign: 'center', padding: '40px' }}>
          <div style={{
            ...typoAccent.tealStrong,
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            The Synthesis
          </div>
          <div style={{
            fontFamily: 'var(--quafi-font-primary)',
            fontSize: '48px',
            fontWeight: 500,
            marginBottom: '16px',
          }}>
            <span style={{ ...typoAccent.tealStrong }}>F</span>
            <span style={typoRaised.display}>IN + </span>
            <span style={{ ...typoAccent.tealStrong }}>ING</span>
            <span style={typoRaised.display}>ENIUM</span>
          </div>
          <div style={{ ...typoRaised.medium, fontSize: '16px', fontStyle: 'italic' }}>
            The engine of conclusions. Intelligence that doesn't speculate — it resolves.
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: LOGO VARIATIONS (RAISED container)
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
          Logo Variations
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px', maxWidth: '600px' }}>
          The Quafi logo consists of two organic forms — representing duality (risk/return),
          balance, and dialogue. They overlap, creating depth.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {/* Dark */}
          <div style={{
            background: 'var(--quafi-logo-slate-1)',
            borderRadius: '20px',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            <QuafiLogo variant="dark" size={1} />
            <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
              Primary — Dark
            </span>
          </div>

          {/* Stone - INSET, usa tipografía RAISED */}
          <div style={{
            ...insetStyles,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            padding: '48px',
          }}>
            <QuafiLogo variant="stone" size={1} />
            <span style={{ ...typoRaised.whisper, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Stone Marble
            </span>
          </div>

          {/* Teal/Accent */}
          <div style={{
            background: 'linear-gradient(135deg, var(--quafi-teal), var(--quafi-teal-dark))',
            borderRadius: '20px',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            <QuafiLogo variant="white" size={1} />
            <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
              Accent
            </span>
          </div>

          {/* Light */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            <QuafiLogo variant="light" size={1} />
            <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a8f96' }}>
              Light
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: SYMBOL (RAISED container)
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
          Standalone Symbol
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px', maxWidth: '600px' }}>
          The symbol can be used independently when brand recognition is established,
          such as app icons, favicons, or social media avatars.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{
            aspectRatio: '1',
            background: 'var(--quafi-logo-slate-1)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <QuafiSymbol variant="dark" size={60} />
          </div>
          <div style={{
            aspectRatio: '1',
            ...insetStyles,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}>
            <QuafiSymbol variant="stone" size={60} />
          </div>
          <div style={{
            aspectRatio: '1',
            background: 'linear-gradient(135deg, var(--quafi-teal), var(--quafi-teal-dark))',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <QuafiSymbol variant="white" size={60} />
          </div>
          <div style={{
            aspectRatio: '1',
            background: '#ffffff',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <QuafiSymbol variant="light" size={60} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3B: QUAFI EMBLEM - Radar Symbol (RAISED container)
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
          QUAFI Emblem — Radar Symbol
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px', maxWidth: '700px' }}>
          The QUAFI emblem consists of a radar/pulse symbol (central dot + 3 concentric rings)
          carved with a subtle inset effect inside a circular stone marble container.
          It represents <strong>quiet intelligence</strong> — scanning, analyzing, resolving.
        </p>

        {/* Emblem Sizes */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ ...typoInset.soft, fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Recommended Sizes
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
            {[32, 48, 64, 100, 120].map((size) => (
              <div key={size} style={{ ...insetStyles, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <QuafiEmblem size={size} />
                <span style={{ ...typoRaised.whisper, fontSize: '10px', fontFamily: 'var(--quafi-font-mono)' }}>{size}px</span>
              </div>
            ))}
          </div>
        </div>

        {/* Animations */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ ...typoInset.soft, fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Animations
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {(['none', 'breathe', 'pulse', 'glow', 'ripple', 'rotate'] as QuafiEmblemAnimation[]).map((anim) => (
              <div key={anim} style={{ ...insetStyles, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <QuafiEmblem size={64} animation={anim} />
                <span style={{ ...typoRaised.whisper, fontSize: '10px', textTransform: 'capitalize' }}>{anim}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lockups */}
        <div>
          <div style={{ ...typoInset.soft, fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Lockups with Wordmark
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Horizontal Lockup */}
            <div style={{ ...insetStyles, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <QuafiLockupHorizontal size={70} animation="ripple" />
              <span style={{ ...typoRaised.whisper, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Horizontal Lockup
              </span>
            </div>

            {/* Vertical Lockup */}
            <div style={{ ...insetStyles, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <QuafiLockupVertical size={80} />
              <span style={{ ...typoRaised.whisper, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Vertical Lockup
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: BRAND COLORS (RAISED container)
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
          Brand Colors
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px' }}>
          The Quafi palette balances warm neutrals with a distinctive teal accent.
          Semantic colors are conservative, reflecting the "Senior Analyst" voice.
        </p>

        {/* Semantic Colors - label en RAISED usa INSET */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ ...typoInset.soft, fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Semantic Colors
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {brandColors.map((color) => (
              <div key={color.variable} style={insetStyles}>
                <div style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `var(${color.variable})`,
                  boxShadow: 'var(--raised-1)',
                  marginBottom: '12px',
                }} />
                {/* En INSET usa RAISED */}
                <div style={{ ...typoRaised.medium, fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  {color.name}
                </div>
                <code style={{
                  fontFamily: 'var(--quafi-font-mono)',
                  fontSize: '10px',
                  ...typoAccent.teal,
                }}>
                  {color.value}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Colors */}
        <div>
          <div style={{ ...typoInset.soft, fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Logo Colors
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {logoColors.map((color) => (
              <div key={color.variable} style={insetStyles}>
                <div style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: `var(${color.variable})`,
                  boxShadow: 'var(--raised-1)',
                  marginBottom: '12px',
                }} />
                <div style={{ ...typoRaised.medium, fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  {color.name}
                </div>
                <code style={{
                  fontFamily: 'var(--quafi-font-mono)',
                  fontSize: '10px',
                  ...typoAccent.teal,
                }}>
                  {color.value}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: TYPOGRAPHY (RAISED container)
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
          Typography
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px', maxWidth: '600px' }}>
          DM Sans is the primary typeface, chosen for its friendly geometry and excellent legibility.
          IBM Plex Mono is used for data and financial figures.
        </p>

        {/* Typography showcase - INSET container */}
        <div style={insetStyles}>
          {/* Display */}
          <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--marble-dark)' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              ...typoAccent.teal,
            }}>
              Display — DM Sans Medium
            </div>
            <div style={{
              ...typoRaised.display,
              fontFamily: 'var(--quafi-font-primary)',
              fontSize: '48px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}>
              Portfolio Value
            </div>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--marble-dark)' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              ...typoAccent.teal,
            }}>
              Heading — DM Sans Medium
            </div>
            <div style={{
              ...typoRaised.strong,
              fontFamily: 'var(--quafi-font-primary)',
              fontSize: '32px',
              fontWeight: 500,
            }}>
              Investment Analytics
            </div>
          </div>

          {/* Body */}
          <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--marble-dark)' }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              ...typoAccent.teal,
            }}>
              Body — DM Sans Regular
            </div>
            <div style={{
              ...typoRaised.medium,
              fontFamily: 'var(--quafi-font-primary)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.7,
            }}>
              Your portfolio has shown consistent growth over the past quarter,
              outperforming the market benchmark by 3.2 percentage points.
            </div>
          </div>

          {/* Mono */}
          <div>
            <div style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              ...typoAccent.teal,
            }}>
              Mono — IBM Plex Mono
            </div>
            <div style={{
              fontFamily: 'var(--quafi-font-mono)',
              fontSize: '16px',
              fontWeight: 400,
              ...typoAccent.tealStrong,
            }}>
              $1,234,567.89 • +16.5% • 2025-01-15
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: PERSONALITY & VOICE (RAISED container)
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
          Brand Personality
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px', maxWidth: '700px' }}>
          QUAFI embodies the archetype of the <strong>Senior Analyst</strong> — someone who has seen complete cycles,
          who isn't impressed by daily noise, who speaks only when there's something worth saying.
        </p>

        {/* Traits - INSET containers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {traits.map((trait) => (
            <div key={trait.name} style={{ ...insetStyles, textAlign: 'center', padding: '24px 16px' }}>
              <div style={{ ...typoRaised.strong, fontSize: '15px', fontWeight: 500, marginBottom: '8px' }}>
                {trait.name}
              </div>
              <div style={{ ...typoRaised.soft, fontSize: '11px' }}>
                {trait.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Voice Do's and Don'ts - INSET containers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
          {/* Do */}
          <div style={insetStyles}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
              fontWeight: 600,
              fontSize: '13px',
              ...typoAccent.positive,
            }}>
              <span>✓</span> We say
            </div>
            <div style={{ ...typoRaised.soft, fontSize: '13px', lineHeight: 2 }}>
              "The market shows signs of consolidation"<br />
              "We observe a moderate risk level"<br />
              "Analysis suggests a neutral position"
            </div>
          </div>

          {/* Don't */}
          <div style={insetStyles}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
              fontWeight: 600,
              fontSize: '13px',
              ...typoAccent.negative,
            }}>
              <span>✗</span> We don't say
            </div>
            <div style={{ ...typoRaised.soft, fontSize: '13px', lineHeight: 2 }}>
              "BUY NOW! Don't miss this opportunity!"<br />
              "We guarantee 20% returns"<br />
              "ALERT: Market crash imminent!"
            </div>
          </div>
        </div>

        {/* Taglines - INSET containers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {taglines.map((item) => (
            <div key={item.text} style={{ ...insetStyles, textAlign: 'center', padding: '32px 24px' }}>
              <div style={{
                ...typoRaised.strong,
                fontFamily: 'var(--quafi-font-primary)',
                fontSize: '22px',
                fontWeight: 400,
                fontStyle: 'italic',
                marginBottom: '12px',
              }}>
                {item.text}
              </div>
              <div style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--quafi-text-muted)',
              }}>
                {item.emphasis}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: USAGE GUIDELINES (RAISED container)
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
          Usage Guidelines
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px' }}>
          Maintain brand integrity by following these guidelines.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {/* Do: Approved colors - INSET */}
          <div style={insetStyles}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '120px',
              marginBottom: '16px',
            }}>
              <QuafiLogo variant="stone" size={0.7} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--quafi-positive)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
              }}>✓</span>
              <span style={{ ...typoRaised.soft, fontSize: '12px' }}>Use approved color combinations</span>
            </div>
          </div>

          {/* Don't: Stretch - INSET */}
          <div style={insetStyles}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '120px',
              marginBottom: '16px',
            }}>
              <div style={{ transform: 'scaleX(1.4)' }}>
                <QuafiLogo variant="stone" size={0.7} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--quafi-negative)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
              }}>✗</span>
              <span style={{ ...typoRaised.soft, fontSize: '12px' }}>Don't stretch or distort</span>
            </div>
          </div>

          {/* Do: Spacing - INSET */}
          <div style={insetStyles}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '120px',
              marginBottom: '16px',
            }}>
              <QuafiLogo variant="stone" size={0.7} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--quafi-positive)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
              }}>✓</span>
              <span style={{ ...typoRaised.soft, fontSize: '12px' }}>Maintain proper spacing</span>
            </div>
          </div>

          {/* Don't: Rotate - INSET */}
          <div style={insetStyles}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '120px',
              marginBottom: '16px',
            }}>
              <div style={{ transform: 'rotate(15deg)' }}>
                <QuafiLogo variant="stone" size={0.7} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--quafi-negative)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
              }}>✗</span>
              <span style={{ ...typoRaised.soft, fontSize: '12px' }}>Don't rotate the logo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - sobre fondo BASE, usa tipografía INSET */}
      <footer style={{ textAlign: 'center', padding: '32px 0' }}>
        <div style={{ marginBottom: '16px' }}>
          <QuafiLogo variant="stone" size={0.6} />
        </div>
        <p style={{ ...typoInset.whisper, fontSize: '11px' }}>
          © 2025 Quafi. Brand Guidelines v1.0
        </p>
      </footer>
    </div>
  );
}

export default BrandShowcase;
