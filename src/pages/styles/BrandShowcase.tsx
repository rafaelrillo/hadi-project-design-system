// Path: src/pages/styles/BrandShowcase.tsx
// FING Brand Guidelines - Stone Marble Design System
import React from 'react';
import { FingEmblem, FingLockupHorizontal, FingLockupVertical, type FingEmblemAnimation } from '@atoms/FingEmblem';

// ═══════════════════════════════════════════════════════════════════════════════
// FING LOGO COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

interface FingLogoProps {
  variant: 'dark' | 'stone' | 'white' | 'light';
  size?: number;
  showWordmark?: boolean;
}

const FingLogo: React.FC<FingLogoProps> = ({ variant, size = 1, showWordmark = true }) => {
  const baseWidth = 58 * size;
  const baseHeight = 44 * size;
  const fontSize = 34 * size;

  const fills: Record<string, [string, string]> = {
    dark: ['var(--fing-logo-slate-1)', 'var(--fing-logo-slate-2)'],
    stone: ['var(--fing-logo-marble-1)', 'var(--fing-logo-marble-2)'],
    white: ['rgba(255,255,255,0.88)', 'rgba(255,255,255,0.95)'],
    light: ['var(--fing-logo-light-1)', 'var(--fing-logo-light-2)'],
  };

  const textColors: Record<string, string> = {
    dark: 'var(--fing-text-light)',
    stone: 'var(--marble-base)',
    white: '#ffffff',
    light: 'var(--fing-text-dark)',
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
      textShadow: '1.5px 1.5px 2px var(--shadow-light), -1.5px -1.5px 2px var(--shadow-dark)',
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
            fontFamily: 'var(--sentinel-font-primary)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            fontSize,
            ...wordmarkStyles[variant],
          }}
        >
          fing
        </span>
      )}
    </div>
  );
};

const FingSymbol: React.FC<{ variant: 'dark' | 'stone' | 'white' | 'light'; size?: number }> = ({
  variant,
  size = 70,
}) => {
  const fills: Record<string, [string, string]> = {
    dark: ['var(--fing-logo-slate-1)', 'var(--fing-logo-slate-2)'],
    stone: ['var(--fing-logo-marble-1)', 'var(--fing-logo-marble-2)'],
    white: ['rgba(255,255,255,0.88)', 'rgba(255,255,255,0.95)'],
    light: ['var(--fing-logo-light-1)', 'var(--fing-logo-light-2)'],
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
      color: 'var(--marble-dark)',
      textShadow: '0.5px 0.5px 0px rgba(255, 255, 255, 0.7), -0.5px -0.5px 0px rgba(130, 140, 155, 0.4)',
    } as React.CSSProperties,
    soft: {
      color: 'var(--marble-dark)',
      textShadow: '0.75px 0.75px 0px rgba(255, 255, 255, 0.7), -0.75px -0.75px 0px rgba(130, 140, 155, 0.5)',
    } as React.CSSProperties,
    medium: {
      color: 'var(--marble-dark)',
      textShadow: '1px 1px 0px rgba(255, 255, 255, 0.8), -1px -1px 0px rgba(130, 140, 155, 0.5)',
    } as React.CSSProperties,
    strong: {
      color: 'var(--marble-dark)',
      textShadow: '1.5px 1.5px 1px rgba(255, 255, 255, 0.85), -1.5px -1.5px 1px rgba(130, 140, 155, 0.55)',
    } as React.CSSProperties,
    display: {
      color: 'var(--marble-dark)',
      textShadow: '2px 2px 1px rgba(255, 255, 255, 0.9), -2px -2px 1px rgba(130, 140, 155, 0.6)',
    } as React.CSSProperties,
  };

  // Tipografía RAISED (elevada) - para usar en contenedores INSET
  // La luz viene de arriba-izquierda, creando highlight arriba-izquierda del texto
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
    strong: {
      color: 'var(--marble-base)',
      textShadow: '-1.5px -1.5px 0px rgba(255, 255, 255, 0.95), 1.5px 1.5px 1px rgba(147, 157, 170, 0.55)',
    } as React.CSSProperties,
    display: {
      color: 'var(--marble-base)',
      textShadow: '-2px -2px 1px rgba(255, 255, 255, 0.95), 2px 2px 1px rgba(147, 157, 170, 0.6)',
    } as React.CSSProperties,
  };

  // Tipografía con color de acento - para usar en contenedores INSET
  const typoAccent = {
    teal: {
      color: 'var(--fing-teal)',
      textShadow: '-0.75px -0.75px 0px rgba(255, 255, 255, 0.8), 0.75px 0.75px 0px rgba(58, 106, 114, 0.3)',
    } as React.CSSProperties,
    tealStrong: {
      color: 'var(--fing-teal)',
      textShadow: '-1px -1px 0px rgba(255, 255, 255, 0.85), 1px 1px 0px rgba(58, 106, 114, 0.35)',
    } as React.CSSProperties,
    positive: {
      color: 'var(--fing-positive)',
      textShadow: '-0.75px -0.75px 0px rgba(255, 255, 255, 0.8), 0.75px 0.75px 0px rgba(74, 154, 124, 0.3)',
    } as React.CSSProperties,
    negative: {
      color: 'var(--fing-negative)',
      textShadow: '-0.75px -0.75px 0px rgba(255, 255, 255, 0.8), 0.75px 0.75px 0px rgba(201, 138, 138, 0.3)',
    } as React.CSSProperties,
  };

  // ═══ CONTAINER STYLES ═══
  const showcaseStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: 'var(--marble-base)',
    padding: '32px',
    fontFamily: 'var(--sentinel-font-primary)',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '48px',
  };

  // RAISED container (section) styles
  const sectionStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    borderRadius: '24px',
    boxShadow: 'var(--raised-3)',
    padding: '32px',
    marginBottom: '24px',
  };

  // INSET container styles
  const insetStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    borderRadius: '16px',
    boxShadow: 'var(--inset-2)',
    padding: '24px',
  };

  // ═══ DATA ═══
  const brandColors = [
    { name: 'Fing Teal', variable: '--fing-teal', value: '#3a6a72' },
    { name: 'Fing Positive', variable: '--fing-positive', value: '#4a7a6a' },
    { name: 'Fing Negative', variable: '--fing-negative', value: '#8a5a4a' },
    { name: 'Fing Warning', variable: '--fing-warning', value: '#a08a4a' },
  ];

  const logoColors = [
    { name: 'Slate 1', variable: '--fing-logo-slate-1', value: '#3a3a42' },
    { name: 'Slate 2', variable: '--fing-logo-slate-2', value: '#44444c' },
    { name: 'Marble 1', variable: '--fing-logo-marble-1', value: '#eceef2' },
    { name: 'Marble 2', variable: '--fing-logo-marble-2', value: '#f0f2f5' },
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
      {/* Header - sobre fondo BASE, usa tipografía INSET */}
      <header style={headerStyles}>
        <h1 style={{
          fontFamily: 'var(--sentinel-font-display)',
          fontSize: '36px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '8px',
          ...typoInset.display,
        }}>
          FING Brand Guidelines
        </h1>
        <p style={{
          fontSize: '16px',
          fontStyle: 'italic',
          ...typoInset.soft,
        }}>
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
            fontFamily: 'var(--sentinel-font-primary)',
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
          The Fing logo consists of two organic forms — representing duality (risk/return),
          balance, and dialogue. They overlap, creating depth.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {/* Dark */}
          <div style={{
            background: 'var(--fing-logo-slate-1)',
            borderRadius: '20px',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            <FingLogo variant="dark" size={1} />
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
            <FingLogo variant="stone" size={1} />
            <span style={{ ...typoRaised.whisper, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Stone Marble
            </span>
          </div>

          {/* Teal/Accent */}
          <div style={{
            background: 'linear-gradient(135deg, var(--fing-teal), var(--fing-teal-dark))',
            borderRadius: '20px',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            <FingLogo variant="white" size={1} />
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
            <FingLogo variant="light" size={1} />
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
            background: 'var(--fing-logo-slate-1)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FingSymbol variant="dark" size={60} />
          </div>
          <div style={{
            aspectRatio: '1',
            ...insetStyles,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}>
            <FingSymbol variant="stone" size={60} />
          </div>
          <div style={{
            aspectRatio: '1',
            background: 'linear-gradient(135deg, var(--fing-teal), var(--fing-teal-dark))',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FingSymbol variant="white" size={60} />
          </div>
          <div style={{
            aspectRatio: '1',
            background: '#ffffff',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <FingSymbol variant="light" size={60} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3B: FING EMBLEM - Radar Symbol (RAISED container)
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
          FING Emblem — Radar Symbol
        </div>
        <p style={{ ...typoInset.soft, fontSize: '14px', marginBottom: '24px', maxWidth: '700px' }}>
          The FING emblem consists of a radar/pulse symbol (central dot + 3 concentric rings)
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
                <FingEmblem size={size} />
                <span style={{ ...typoRaised.whisper, fontSize: '10px', fontFamily: 'var(--sentinel-font-mono)' }}>{size}px</span>
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
            {(['none', 'breathe', 'pulse', 'glow', 'ripple', 'rotate'] as FingEmblemAnimation[]).map((anim) => (
              <div key={anim} style={{ ...insetStyles, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <FingEmblem size={64} animation={anim} />
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
              <FingLockupHorizontal size={70} animation="ripple" />
              <span style={{ ...typoRaised.whisper, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Horizontal Lockup
              </span>
            </div>

            {/* Vertical Lockup */}
            <div style={{ ...insetStyles, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <FingLockupVertical size={80} />
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
          The Fing palette balances warm neutrals with a distinctive teal accent.
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
                  fontFamily: 'var(--sentinel-font-mono)',
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
                  fontFamily: 'var(--sentinel-font-mono)',
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
              fontFamily: 'var(--sentinel-font-primary)',
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
              fontFamily: 'var(--sentinel-font-primary)',
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
              fontFamily: 'var(--sentinel-font-primary)',
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
              fontFamily: 'var(--sentinel-font-mono)',
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
          FING embodies the archetype of the <strong>Senior Analyst</strong> — someone who has seen complete cycles,
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
                fontFamily: 'var(--sentinel-font-primary)',
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
                color: 'var(--fing-text-muted)',
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
              <FingLogo variant="stone" size={0.7} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--fing-positive)',
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
                <FingLogo variant="stone" size={0.7} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--fing-negative)',
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
              <FingLogo variant="stone" size={0.7} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--fing-positive)',
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
                <FingLogo variant="stone" size={0.7} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--fing-negative)',
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
          <FingLogo variant="stone" size={0.6} />
        </div>
        <p style={{ ...typoInset.whisper, fontSize: '11px' }}>
          © 2025 Fing. Brand Guidelines v1.0
        </p>
      </footer>
    </div>
  );
}

export default BrandShowcase;
