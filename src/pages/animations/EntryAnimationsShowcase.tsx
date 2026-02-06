// Path: src/pages/animations/EntryAnimationsShowcase.tsx
// FING Design System - Glass-Neumorphism Entry Animations
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../components/animations/FadeIn';
import { StaggerList } from '../../components/animations/StaggerList';
import { staggerContainer, staggerItem } from '../../components/animations/presets';
import { ShowcaseSection } from '../../components/showcase';
import { showcase } from '../showcaseStyles';
import { ArrowDown, ArrowUp, ArrowLeft, ArrowRight, Maximize } from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function EntryAnimationsContent() {
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

  const directions = [
    { dir: 'up' as const, icon: ArrowUp, label: 'Up' },
    { dir: 'down' as const, icon: ArrowDown, label: 'Down' },
    { dir: 'left' as const, icon: ArrowLeft, label: 'Left' },
    { dir: 'right' as const, icon: ArrowRight, label: 'Right' },
    { dir: 'scale' as const, icon: Maximize, label: 'Scale' }
  ];

  const listItems = ['System initializing...', 'Loading modules...', 'Connecting...', 'Ready.'];

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; Entry Animations_</h1>
        <p style={showcase.header.description}>// Animaciones de entrada con FadeIn y StaggerList</p>
      </header>

      <ShowcaseSection title="FadeIn Directions" description="Entrada desde diferentes direcciones">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '20px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', width: '100%' }}>
            {directions.map(({ dir, icon: Icon, label }, i) => (
              <FadeIn key={dir} direction={dir} delay={i * 0.1}>
                <div style={{ ...cardStyles, textAlign: 'center' }}>
                  <Icon style={{ color: 'var(--fing-accent)', marginBottom: '8px' }} size={24} />
                  <p style={{ color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="StaggerList" description="Lista con animación escalonada">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '20px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '100%' }}>
            <div>
              <h4 style={{ color: 'var(--fing-text-muted)', marginBottom: '16px', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                // Normal Speed, Up Direction
              </h4>
              <StaggerList speed="normal" direction="up" itemClassName="">
                {listItems.map((item, i) => (
                  <div key={i} style={{
                    padding: '12px 16px',
                    background: MARBLE.base,
                    borderRadius: '20px',
                    boxShadow: getNeuInsetShadow(3, 8),
                    marginBottom: '8px',
                    color: 'var(--fing-positive)',
                    fontFamily: 'var(--fing-font-mono)',
                    fontSize: '12px',
                    transition: 'box-shadow 50ms linear',
                  }}>
                    &gt; {item}
                  </div>
                ))}
              </StaggerList>
            </div>
            <div>
              <h4 style={{ color: 'var(--fing-text-muted)', marginBottom: '16px', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                // Slow Speed, Left Direction
              </h4>
              <StaggerList speed="slow" direction="left" itemClassName="">
                {listItems.map((item, i) => (
                  <div key={i} style={{
                    padding: '12px 16px',
                    background: MARBLE.base,
                    borderRadius: '20px',
                    boxShadow: getNeuInsetShadow(3, 8),
                    marginBottom: '8px',
                    color: 'var(--fing-info)',
                    fontFamily: 'var(--fing-font-mono)',
                    fontSize: '12px',
                    transition: 'box-shadow 50ms linear',
                  }}>
                    [{i + 1}] {item}
                  </div>
                ))}
              </StaggerList>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Stagger Grid" description="Grid con animación usando presets">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '20px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%' }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div key={i} variants={staggerItem} style={cardStyles}>
                <p style={{ color: 'var(--fing-accent)', fontFamily: 'var(--fing-font-mono)', fontSize: '14px' }}>
                  Item {i}
                </p>
              </motion.div>
            ))}
          </motion.div>
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
          <p>✓ <strong style={{ color: 'var(--fing-accent)' }}>FadeIn directions:</strong> up, down, left, right, scale</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent)' }}>StaggerList speeds:</strong> fast, normal, slow</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent)' }}>Stagger delay:</strong> 0.05s (fast), 0.08s (normal), 0.12s (slow)</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent)' }}>Default duration:</strong> 0.4s ease-out</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function EntryAnimationsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <EntryAnimationsContent />
    </LightEngineProvider>
  );
}
