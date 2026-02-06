// Path: src/pages/animations/ScrollAnimationsShowcase.tsx
// FING Design System - Glass-Neumorphism Scroll Animations
import React, { useMemo } from 'react';
import { ScrollReveal, ScrollProgress } from '../../components/animations/ScrollReveal';
import { Parallax } from '../../components/animations/Parallax';
import { ShowcaseSection } from '../../components/showcase';
import { showcase } from '../showcaseStyles';
import { ArrowDown, Zap } from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function ScrollAnimationsContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: 'var(--marble-base)',
    shadowDark: 'var(--shadow-dark)',
    shadowLight: 'var(--shadow-light)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light), ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark)`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark), inset ${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light)`;
  };

  const cardStyles: React.CSSProperties = {
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '20px',
    boxShadow: getNeuPanelShadow(6, 18),
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <ScrollProgress color="var(--fing-accent)" height={3} />

      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; Scroll Animations_</h1>
        <p style={showcase.header.description}>// Animaciones vinculadas al scroll</p>
      </header>

      <ShowcaseSection title="ScrollProgress" description="Barra de progreso en la parte superior">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '20px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{
            ...cardStyles,
            boxShadow: getNeuInsetShadow(4, 12),
            textAlign: 'center',
          }}>
            <Zap style={{ color: 'var(--fing-accent)', marginBottom: '16px' }} size={48} />
            <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>
              Scroll Progress Active
            </h4>
            <p style={{ color: 'var(--fing-text-muted)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
              La barra en la parte superior muestra el progreso de scroll.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="ScrollReveal" description="Elementos que aparecen al entrar en viewport">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[1, 2, 3].map((i) => (
            <ScrollReveal key={i}>
              <div style={{
                ...cardStyles,
                borderLeft: '4px solid var(--fing-accent)',
              }}>
                <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>
                  Log Entry #{i}
                </h4>
                <p style={{ color: 'var(--fing-text-muted)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                  Este elemento aparece con animación cuando entra en el viewport.
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Parallax" description="Elementos que se mueven a diferentes velocidades">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '40px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Parallax speed={0.3}>
              <div style={{
                ...cardStyles,
                borderLeft: '4px solid var(--fing-positive)',
                textAlign: 'center',
              }}>
                <ArrowDown style={{ color: 'var(--fing-positive)', marginBottom: '8px' }} size={24} />
                <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>Slow (0.3)</h4>
              </div>
            </Parallax>
            <Parallax speed={0.6}>
              <div style={{
                ...cardStyles,
                borderLeft: '4px solid var(--fing-warning)',
                textAlign: 'center',
              }}>
                <ArrowDown style={{ color: 'var(--fing-warning)', marginBottom: '8px' }} size={24} />
                <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>Medium (0.6)</h4>
              </div>
            </Parallax>
            <Parallax speed={-0.4}>
              <div style={{
                ...cardStyles,
                borderLeft: '4px solid var(--fing-info)',
                textAlign: 'center',
              }}>
                <ArrowDown style={{ color: 'var(--fing-info)', marginBottom: '8px', transform: 'rotate(180deg)' }} size={24} />
                <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>Reverse (-0.4)</h4>
              </div>
            </Parallax>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '20px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          fontSize: '12px',
          fontFamily: 'var(--fing-font-mono)',
          color: 'var(--fing-text-muted)',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--fing-accent)' }}>ScrollProgress:</strong> Fixed progress bar, customizable color and height</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent)' }}>ScrollReveal:</strong> Intersection Observer based, once: true</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent)' }}>Parallax speed:</strong> -1 to 1 (negative = opposite direction)</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent)' }}>Default threshold:</strong> 0.1 (10% visibility triggers animation)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function ScrollAnimationsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <ScrollAnimationsContent />
    </LightEngineProvider>
  );
}
