// Path: src/pages/styles/BorderRadiusShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Border Radius
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { Circle, Square, RectangleHorizontal } from 'lucide-react';

// Inner component that uses the light engine context
function BorderRadiusContent() {
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

  // Glass reflection
  const getGlassReflection = (): string => {
    const { x, y } = shadowOffsets;
    const hlX = -x;
    const hlY = -y;
    const topHighlight = hlY < 0 ? 0.6 : 0.2;
    const leftHighlight = hlX < 0 ? 0.4 : 0.15;
    return `inset 0 ${hlY < 0 ? '-1px' : '1px'} 0 hsla(0, 0%, 100%, ${topHighlight}), inset ${hlX < 0 ? '-1px' : '1px'} 0 0 hsla(0, 0%, 100%, ${leftHighlight})`;
  };

  // Layered shadow
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
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const specTextStyles: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--sentinel-text-secondary)',
    lineHeight: '1.8',
    fontFamily: 'var(--sentinel-font-mono)',
  };

  // Box styles with different radius
  const neuBox = (radius: string): React.CSSProperties => ({
    width: '100px',
    height: '100px',
    background: MARBLE.base,
    borderRadius: radius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    boxShadow: getNeuPanelShadow(12, 36),
    transition: 'box-shadow 50ms linear',
  });

  const glassBox = (radius: string, hue: number, sat: number): React.CSSProperties => ({
    width: '100px',
    height: '100px',
    background: `linear-gradient(${lightAngle + 45}deg, hsla(${hue}, ${sat}%, 70%, 0.28) 0%, hsla(${hue}, ${sat}%, 65%, 0.12) 50%, hsla(${hue}, ${sat}%, 60%, 0.20) 100%)`,
    backdropFilter: 'blur(8px) saturate(140%)',
    WebkitBackdropFilter: 'blur(8px) saturate(140%)',
    borderRadius: radius,
    border: `1px solid hsla(${hue}, ${sat}%, 80%, 0.35)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    boxShadow: `${getGlassReflection()}, ${getLayeredShadow(hue, sat)}`,
    transition: 'box-shadow 50ms linear, background 100ms linear',
  });

  const neuButton = (radius: string): React.CSSProperties => ({
    padding: '12px 24px',
    background: MARBLE.base,
    borderRadius: radius,
    border: 'none',
    boxShadow: getNeuPanelShadow(8, 24),
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--sentinel-text-primary)',
    fontFamily: 'var(--sentinel-font-mono)',
    cursor: 'pointer',
    transition: 'box-shadow 50ms linear',
  });

  const glassButton = (radius: string): React.CSSProperties => ({
    padding: '12px 24px',
    background: `linear-gradient(${lightAngle + 45}deg, hsla(175, 35%, 60%, 0.28) 0%, hsla(175, 35%, 55%, 0.12) 50%, hsla(175, 35%, 60%, 0.22) 100%)`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: radius,
    border: '1px solid hsla(175, 35%, 75%, 0.30)',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--sentinel-text-primary)',
    fontFamily: 'var(--sentinel-font-mono)',
    cursor: 'pointer',
    boxShadow: `${getGlassReflection()}, ${getLayeredShadow(175, 35)}`,
    transition: 'box-shadow 50ms linear',
  });

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Border Radius_</h1>
        <p style={descStyles}>
          // Sistema unificado de border-radius: 15px
        </p>
      </header>

      {/* Standard Radius */}
      <ShowcaseSection
        title="Border Radius Estándar: 15px"
        description="El design system usa 15px como valor unificado para todos los elementos"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', alignItems: 'flex-end' }}>
          {/* Neumorphic Square */}
          <div style={{ textAlign: 'center' }}>
            <div style={neuBox('15px')}>
              <Square size={20} color="#3a6a72" />
              <span style={{ fontSize: '11px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Square</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sentinel-text-primary)', fontWeight: 600, fontFamily: 'var(--sentinel-font-mono)' }}>
              15px
            </div>
            <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
              Neumorphic
            </div>
          </div>

          {/* Neumorphic Rectangle */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...neuBox('15px'), width: '160px', height: '80px' }}>
              <RectangleHorizontal size={20} color="#3a6a72" />
              <span style={{ fontSize: '11px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Rectangle</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sentinel-text-primary)', fontWeight: 600, fontFamily: 'var(--sentinel-font-mono)' }}>
              15px
            </div>
            <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
              Neumorphic
            </div>
          </div>

          {/* Glass Square */}
          <div style={{ textAlign: 'center' }}>
            <div style={glassBox('15px', 175, 35)}>
              <Square size={20} color="#2d5a5c" />
              <span style={{ fontSize: '11px', color: '#3d6a6c', fontFamily: 'var(--sentinel-font-mono)' }}>Square</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sentinel-text-primary)', fontWeight: 600, fontFamily: 'var(--sentinel-font-mono)' }}>
              15px
            </div>
            <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
              Glass
            </div>
          </div>

          {/* Glass Rectangle */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...glassBox('15px', 215, 50), width: '160px', height: '80px' }}>
              <RectangleHorizontal size={20} color="#1e3a5c" />
              <span style={{ fontSize: '11px', color: '#2d4a6b', fontFamily: 'var(--sentinel-font-mono)' }}>Rectangle</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sentinel-text-primary)', fontWeight: 600, fontFamily: 'var(--sentinel-font-mono)' }}>
              15px
            </div>
            <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
              Glass
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Full Radius for Pills/Circles */}
      <ShowcaseSection
        title="Border Radius Full: 9999px / 50%"
        description="Para elementos circulares como avatars, badges pill y botones redondos"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', alignItems: 'flex-end' }}>
          {/* Neumorphic Circle */}
          <div style={{ textAlign: 'center' }}>
            <div style={neuBox('50%')}>
              <Circle size={20} color="#3a6a72" />
              <span style={{ fontSize: '11px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Circle</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sentinel-text-primary)', fontWeight: 600, fontFamily: 'var(--sentinel-font-mono)' }}>
              50%
            </div>
            <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
              Avatar
            </div>
          </div>

          {/* Glass Circle */}
          <div style={{ textAlign: 'center' }}>
            <div style={glassBox('50%', 145, 45)}>
              <Circle size={20} color="#2d5a4a" />
              <span style={{ fontSize: '11px', color: '#3d6a5c', fontFamily: 'var(--sentinel-font-mono)' }}>Circle</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sentinel-text-primary)', fontWeight: 600, fontFamily: 'var(--sentinel-font-mono)' }}>
              50%
            </div>
            <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
              Glass Avatar
            </div>
          </div>

          {/* Neumorphic Pill */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...neuBox('9999px'), width: '140px', height: '48px', flexDirection: 'row', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)' }}>Pill Badge</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sentinel-text-primary)', fontWeight: 600, fontFamily: 'var(--sentinel-font-mono)' }}>
              9999px
            </div>
            <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
              Badge
            </div>
          </div>

          {/* Glass Pill */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...glassBox('9999px', 280, 40), width: '140px', height: '48px', flexDirection: 'row', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#4a2d6a', fontFamily: 'var(--sentinel-font-mono)' }}>Glass Pill</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--sentinel-text-primary)', fontWeight: 600, fontFamily: 'var(--sentinel-font-mono)' }}>
              9999px
            </div>
            <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
              Glass Badge
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Button Examples */}
      <ShowcaseSection
        title="Aplicación en Botones"
        description="Cómo se aplica el border-radius en botones neumórficos y glass"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <button style={neuButton('15px')}>Neumorphic 15px</button>
            <span style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Standard</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <button style={neuButton('9999px')}>Neumorphic Pill</button>
            <span style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Pill</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <button style={glassButton('15px')}>Glass 15px</button>
            <span style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Glass Standard</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <button style={glassButton('9999px')}>Glass Pill</button>
            <span style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Glass Pill</span>
          </div>
        </div>
      </ShowcaseSection>

      {/* Nested Components */}
      <ShowcaseSection
        title="Composición de Elementos"
        description="Panel elevado con elementos inset internos - todos usan 15px"
      >
        <div style={{
          background: MARBLE.base,
          borderRadius: '15px',
          padding: '24px',
          boxShadow: getNeuPanelShadow(20, 60),
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
          }}>
            {[
              { label: 'Header', color: 175 },
              { label: 'Content', color: 215 },
              { label: 'Sidebar', color: 145 },
              { label: 'Footer', color: 35 },
            ].map((item) => (
              <div key={item.label} style={{
                padding: '20px',
                borderRadius: '15px',
                boxShadow: getNeuInsetShadow(5, 15),
                background: MARBLE.base,
                transition: 'box-shadow 50ms linear',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: `hsl(${item.color}, 35%, 35%)`, marginBottom: '4px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '10px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
                  15px radius
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Why 15px */}
      <ShowcaseSection
        title="¿Por qué 15px?"
        description="Justificación del valor unificado de border-radius"
      >
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={specTextStyles}>
            <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Consistencia Visual:</strong></p>
            <p>✓ Un solo valor de radius crea cohesión en toda la interfaz</p>
            <p>✓ Elimina decisiones arbitrarias sobre cuánto redondear</p>
            <p>✓ Facilita la implementación y mantenimiento</p>

            <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Balance Neumórfico:</strong></p>
            <p>✓ 15px es suficiente para suavizar sin perder forma</p>
            <p>✓ Funciona bien con las sombras de profundidad variable</p>
            <p>✓ Compatible con el efecto glass y sus reflexiones</p>

            <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Excepciones:</strong></p>
            <p>✓ <code style={{ color: 'var(--sentinel-accent-primary)' }}>50%</code> para círculos (avatars)</p>
            <p>✓ <code style={{ color: 'var(--sentinel-accent-primary)' }}>9999px</code> para pills (badges, tags)</p>
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
          fontFamily: 'var(--sentinel-font-mono)',
          color: 'var(--sentinel-text-secondary)',
          transition: 'box-shadow 50ms linear',
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`// Standard radius for all components
const BORDER_RADIUS = '15px';

// Panel, Card, Button, Input, etc.
const component = {
  borderRadius: '15px', // Always 15px
};

// Circle for avatars
const avatar = {
  borderRadius: '50%',
};

// Pill for badges, tags
const pill = {
  borderRadius: '9999px',
};

// CSS Variables
:root {
  --neu-radius: 15px;
  --radius-full: 9999px;
  --radius-circle: 50%;
}`}</pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}

// Main component with provider
export function BorderRadiusShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <BorderRadiusContent />
    </LightEngineProvider>
  );
}
