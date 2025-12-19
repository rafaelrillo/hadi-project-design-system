// Path: src/pages/terminal/GlitchShowcase.tsx
import React, { useRef, useState } from 'react';
import { GlitchText, GlitchTextRef } from '../../components/terminal/GlitchText';
import {
  criticalErrorGlitch,
  subtleAmbientGlitch,
  hoverInteractiveGlitch,
  warningGlitch,
  hackingEffectGlitch,
  corruptedDataGlitch
} from '../../components/terminal/glitchPresets';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function GlitchShowcase() {
  const manualGlitchRef = useRef<GlitchTextRef>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const handleTriggerGlitch = () => {
    if (manualGlitchRef.current) {
      setIsGlitching(true);
      manualGlitchRef.current.startGlitch();
      setTimeout(() => {
        manualGlitchRef.current?.stopGlitch();
        setIsGlitching(false);
      }, 500);
    }
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  };

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; GlitchText_</h1>
        <p style={descStyles}>// Efectos de glitch con react-powerglitch</p>
      </header>

      {/* Intensities */}
      <ShowcaseSection
        title="Intensidades"
        description="Niveles de intensidad del glitch: subtle, low, medium, high, extreme"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
            {(['subtle', 'low', 'medium', 'high', 'extreme'] as const).map((intensity) => (
              <div key={intensity} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '80px' }}>
                  {intensity}:
                </span>
                <GlitchText intensity={intensity} as="span">
                  <span style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: intensity === 'extreme' ? 'var(--destructive)' : 'var(--primary)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    SYSTEM ONLINE
                  </span>
                </GlitchText>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Play Modes */}
      <ShowcaseSection
        title="Modos de Reproducción"
        description="Control del momento en que se activa el glitch"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '100px' }}>Always:</span>
              <GlitchText intensity="medium" playMode="always" as="span">
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  GLITCH CONSTANTE
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '100px' }}>Hover:</span>
              <GlitchText intensity="medium" playMode="hover" as="span">
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--info)', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
                  HOVER PARA GLITCH
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '100px' }}>Manual:</span>
              <GlitchText ref={manualGlitchRef} intensity="extreme" playMode="manual" as="span">
                <span style={{ fontSize: '20px', fontWeight: 700, color: isGlitching ? 'var(--destructive)' : 'var(--success)', fontFamily: 'var(--font-mono)' }}>
                  {isGlitching ? 'GLITCHING!' : 'ESTABLE'}
                </span>
              </GlitchText>
              <button
                onClick={handleTriggerGlitch}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--background)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                Trigger
              </button>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Color Effects */}
      <ShowcaseSection
        title="Efectos de Color"
        description="Rotación de hue y filtros CSS"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '120px' }}>Normal:</span>
              <GlitchText intensity="high" hueRotate={false} as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  COLOR NORMAL
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '120px' }}>Hue Rotate:</span>
              <GlitchText intensity="high" hueRotate={true} as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  RAINBOW GLITCH
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '120px' }}>CSS Filters:</span>
              <GlitchText intensity="medium" cssFilters="brightness(1.3) contrast(1.2)" as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--warning)', fontFamily: 'var(--font-mono)' }}>
                  BRIGHT EFFECT
                </span>
              </GlitchText>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Presets */}
      <ShowcaseSection
        title="Presets"
        description="Configuraciones predefinidas para casos de uso comunes"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '100%' }}>
            {[
              { preset: subtleAmbientGlitch, name: 'subtleAmbientGlitch', color: 'var(--foreground)' },
              { preset: hoverInteractiveGlitch, name: 'hoverInteractiveGlitch', color: 'var(--info)' },
              { preset: warningGlitch, name: 'warningGlitch', color: 'var(--warning)' },
              { preset: hackingEffectGlitch, name: 'hackingEffectGlitch', color: 'var(--success)' },
              { preset: { ...criticalErrorGlitch, playMode: 'always' as const }, name: 'criticalErrorGlitch', color: 'var(--destructive)' },
              { preset: corruptedDataGlitch, name: 'corruptedDataGlitch', color: 'var(--destructive)' }
            ].map(({ preset, name, color }) => (
              <div key={name} style={{
                padding: '16px',
                backgroundColor: 'var(--background-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)'
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                  {name}
                </span>
                <GlitchText {...preset} as="span">
                  <span style={{ fontSize: '16px', fontWeight: 700, color, fontFamily: 'var(--font-mono)' }}>
                    {name.replace('Glitch', '')}
                  </span>
                </GlitchText>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
