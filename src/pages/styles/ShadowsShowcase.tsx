// Path: src/pages/styles/ShadowsShowcase.tsx
// FING Design System - Glass-Neumorphism Shadows
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { Sun } from 'lucide-react';

// Inner component that uses the light engine context
function ShadowsContent() {
  const { lightAngle } = useLightEngine();

  // ═══════════════════════════════════════════════════════════════════════════
  // SHADOW CALCULATIONS (from Home.tsx)
  // ═══════════════════════════════════════════════════════════════════════════
  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    const x = Math.cos(shadowAngle);
    const y = Math.sin(shadowAngle);
    return { x, y };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  // Neumorphic elevated shadow
  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    const hlX = -x * distance;
    const hlY = -y * distance;
    const shX = x * distance;
    const shY = y * distance;
    return `${hlX}px ${hlY}px ${blur}px ${MARBLE.shadowLight}, ${shX}px ${shY}px ${blur}px ${MARBLE.shadowDark}`;
  };

  // Neumorphic inset shadow
  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    const shX = x * distance;
    const shY = y * distance;
    return `inset ${shX}px ${shY}px ${blur}px ${MARBLE.shadowDark}, inset ${-shX}px ${-shY}px ${blur}px ${MARBLE.shadowLight}`;
  };

  // Layered shadow for glass elements
  const getLayeredShadow = (hue: number, sat: number): string => {
    const { x, y } = shadowOffsets;
    const layers = [
      { dist: 0.5, blur: 1, opacity: 0.12 },
      { dist: 1, blur: 2, opacity: 0.10 },
      { dist: 2, blur: 4, opacity: 0.08 },
      { dist: 4, blur: 8, opacity: 0.06 },
    ];
    return layers.map(layer =>
      `${x * layer.dist}px ${y * layer.dist * 1.5}px ${layer.blur}px hsla(${hue}, ${sat * 0.6}%, 35%, ${layer.opacity})`
    ).join(', ');
  };

  // Glass reflection
  const getGlassReflection = (): string => {
    const { x, y } = shadowOffsets;
    const hlX = -x;
    const hlY = -y;
    const topHighlight = hlY < 0 ? 0.6 : 0.2;
    const leftHighlight = hlX < 0 ? 0.4 : 0.15;
    return `inset 0 ${hlY < 0 ? '-1px' : '1px'} 0 hsla(0, 0%, 100%, ${topHighlight}), inset ${hlX < 0 ? '-1px' : '1px'} 0 0 hsla(0, 0%, 100%, ${leftHighlight})`;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // STYLES
  // ═══════════════════════════════════════════════════════════════════════════
  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--fing-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--fing-text-secondary)',
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const specTextStyles: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--fing-text-secondary)',
    lineHeight: '1.8',
    fontFamily: 'var(--fing-font-mono)',
  };

  // Shadow demo boxes
  const neuElevatedBox = (level: number): React.CSSProperties => ({
    width: '120px',
    height: '120px',
    background: MARBLE.base,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: getNeuPanelShadow(level * 4, level * 12),
    transition: 'box-shadow 50ms linear',
  });

  const neuInsetBox: React.CSSProperties = {
    width: '120px',
    height: '120px',
    background: MARBLE.base,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: getNeuInsetShadow(5, 15),
    transition: 'box-shadow 50ms linear',
  };

  const glassBox = (hue: number, sat: number): React.CSSProperties => ({
    width: '120px',
    height: '120px',
    background: `linear-gradient(${lightAngle + 45}deg, hsla(${hue}, ${sat}%, 70%, 0.28) 0%, hsla(${hue}, ${sat}%, 65%, 0.12) 50%, hsla(${hue}, ${sat}%, 60%, 0.20) 100%)`,
    backdropFilter: 'blur(8px) saturate(140%)',
    WebkitBackdropFilter: 'blur(8px) saturate(140%)',
    borderRadius: '15px',
    border: `1px solid hsla(${hue}, ${sat}%, 80%, 0.35)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: `${getGlassReflection()}, ${getLayeredShadow(hue, sat)}`,
    transition: 'box-shadow 50ms linear, background 100ms linear',
  });

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Shadows_</h1>
        <p style={descStyles}>
          // Sistema de sombras dinámicas con Light Engine
        </p>
      </header>

      {/* Neumorphic Elevated Shadows */}
      <ShowcaseSection
        title="Neumorphic Elevated (neuPanel)"
        description="Sombras que crean elevación - el elemento 'flota' sobre la superficie"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} style={{ textAlign: 'center' }}>
              <div style={neuElevatedBox(level)}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)' }}>
                  {level}
                </div>
                <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--fing-font-mono)' }}>
                  Level
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--fing-font-mono)' }}>
                {level * 4}px / {level * 12}px blur
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Neumorphic Inset Shadows */}
      <ShowcaseSection
        title="Neumorphic Inset (neuInset)"
        description="Sombras internas que crean profundidad - el elemento está 'hundido' en la superficie"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {[
            { label: 'Small', dist: 3, blur: 8 },
            { label: 'Medium', dist: 5, blur: 15 },
            { label: 'Large', dist: 8, blur: 20 },
          ].map((config) => (
            <div key={config.label} style={{ textAlign: 'center' }}>
              <div style={{
                ...neuInsetBox,
                boxShadow: getNeuInsetShadow(config.dist, config.blur),
              }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)' }}>
                  {config.label}
                </div>
                <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--fing-font-mono)' }}>
                  Inset
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--fing-font-mono)' }}>
                {config.dist}px / {config.blur}px blur
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Glass Shadows - Color Matched */}
      <ShowcaseSection
        title="Glass Shadows (Color-Matched)"
        description="Sombras multicapa con color que coincide con el elemento glass"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {[
            { label: 'Teal', hue: 175, sat: 35 },
            { label: 'Blue', hue: 215, sat: 50 },
            { label: 'Green', hue: 145, sat: 45 },
            { label: 'Red', hue: 355, sat: 35 },
            { label: 'Amber', hue: 35, sat: 55 },
            { label: 'Purple', hue: 280, sat: 40 },
          ].map((config) => (
            <div key={config.label} style={{ textAlign: 'center' }}>
              <div style={glassBox(config.hue, config.sat)}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: `hsl(${config.hue}, ${config.sat * 0.8}%, 25%)`, fontFamily: 'var(--fing-font-mono)' }}>
                  {config.label}
                </div>
                <div style={{ fontSize: '10px', color: `hsl(${config.hue}, ${config.sat * 0.6}%, 35%)`, fontFamily: 'var(--fing-font-mono)' }}>
                  Glass
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--fing-font-mono)' }}>
                hue: {config.hue}°
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Combined Example */}
      <ShowcaseSection
        title="Composición de Sombras"
        description="Combinación de elevated panel con elementos inset internos"
      >
        <div style={{
          background: MARBLE.base,
          borderRadius: '15px',
          padding: '24px',
          boxShadow: getNeuPanelShadow(20, 60),
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{
              flex: 1,
              padding: '20px',
              borderRadius: '15px',
              boxShadow: getNeuInsetShadow(5, 15),
              background: MARBLE.base,
              transition: 'box-shadow 50ms linear',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fing-text-primary)', marginBottom: '4px' }}>Inset Content</div>
              <div style={{ fontSize: '11px', color: '#636E72' }}>Area hundida dentro del panel</div>
            </div>
            <div style={{
              flex: 1,
              padding: '20px',
              borderRadius: '15px',
              boxShadow: getNeuInsetShadow(5, 15),
              background: MARBLE.base,
              transition: 'box-shadow 50ms linear',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fing-text-primary)', marginBottom: '4px' }}>Inset Content</div>
              <div style={{ fontSize: '11px', color: '#636E72' }}>Area hundida dentro del panel</div>
            </div>
          </div>
          <div style={{
            padding: '16px',
            borderRadius: '15px',
            boxShadow: getNeuInsetShadow(3, 10),
            background: MARBLE.base,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'box-shadow 50ms linear',
          }}>
            <Sun size={16} style={{ color: '#F59E0B' }} />
            <span style={{ fontSize: '12px', color: '#636E72', fontFamily: 'var(--fing-font-mono)' }}>
              Light Angle: {Math.round(lightAngle)}°
            </span>
          </div>
        </div>
      </ShowcaseSection>

      {/* Dynamic Shadow Formula */}
      <ShowcaseSection
        title="Fórmulas de Cálculo"
        description="Las sombras se calculan en tiempo real basadas en el ángulo de luz"
      >
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={specTextStyles}>
            <p><strong style={{ color: 'var(--fing-accent-primary)' }}>Neumorphic Elevated (neuPanel):</strong></p>
            <p>✓ Highlight: X = -cos(angle) × distance, Y = -sin(angle) × distance</p>
            <p>✓ Shadow: X = cos(angle) × distance, Y = sin(angle) × distance</p>
            <p>✓ Color: Light side = #ffffff, Dark side = hsl(220, 15%, 72%)</p>

            <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--fing-accent-primary)' }}>Neumorphic Inset (neuInset):</strong></p>
            <p>✓ Inner Shadow: inset X Y blur darkColor</p>
            <p>✓ Inner Highlight: inset -X -Y blur lightColor</p>

            <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--fing-accent-primary)' }}>Glass Layered:</strong></p>
            <p>✓ 4 capas con opacidad decreciente (0.12, 0.10, 0.08, 0.06)</p>
            <p>✓ Distancia multiplicada por layer index</p>
            <p>✓ Color: hsla(hue, sat%, 35%, opacity)</p>
            <p>✓ Y offset = X offset × 1.5 (luz desde arriba)</p>

            <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--fing-accent-primary)' }}>Glass Reflection:</strong></p>
            <p>✓ Top highlight: más brillante cuando luz viene de arriba</p>
            <p>✓ Side highlight: más brillante cuando luz viene del lado</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Usage Example */}
      <ShowcaseSection title="Código de Ejemplo">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          fontSize: '12px',
          fontFamily: 'var(--fing-font-mono)',
          color: 'var(--fing-text-secondary)',
          transition: 'box-shadow 50ms linear',
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`// Neumorphic Panel (elevated)
const neuPanel = {
  background: '#d5d8dc',
  borderRadius: '15px',
  boxShadow: \`
    \${-x * 20}px \${-y * 20}px 60px #ffffff,
    \${x * 20}px \${y * 20}px 60px hsl(220, 15%, 72%)
  \`,
};

// Neumorphic Inset (carved)
const neuInset = {
  background: '#d5d8dc',
  borderRadius: '15px',
  boxShadow: \`
    inset \${x * 5}px \${y * 5}px 15px hsl(220, 15%, 72%),
    inset \${-x * 5}px \${-y * 5}px 15px #ffffff
  \`,
};

// Glass with color-matched shadow
const glassCard = {
  background: 'linear-gradient(...)',
  backdropFilter: 'blur(8px)',
  boxShadow: \`
    \${glassReflection},
    \${layeredShadow}
  \`,
};`}</pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}

// Main component with provider
export function ShadowsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <ShadowsContent />
    </LightEngineProvider>
  );
}
