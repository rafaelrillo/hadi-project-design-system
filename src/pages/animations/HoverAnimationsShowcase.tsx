// Path: src/pages/animations/HoverAnimationsShowcase.tsx
// QUAFI Design System - Glass-Neumorphism Hover Animations
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MotionCard } from '../../components/animations/MotionCard';
import { ShowcaseSection } from '../../components/showcase';
import { showcase } from '../showcaseStyles';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function HoverAnimationsContent() {
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
    cursor: 'pointer',
    transition: 'box-shadow 50ms linear',
  };

  const buttonStyles: React.CSSProperties = {
    padding: '12px 24px',
    background: MARBLE.base,
    color: 'var(--quafi-accent)',
    border: 'none',
    borderRadius: '20px',
    boxShadow: getNeuPanelShadow(4, 12),
    fontFamily: 'var(--quafi-font-mono)',
    fontWeight: 600,
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; Hover & Tap_</h1>
        <p style={showcase.header.description}>// Animaciones de hover y tap con Framer Motion</p>
      </header>

      <ShowcaseSection title="MotionCard Variants" description="Cards con diferentes efectos hover">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '20px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
            <MotionCard variant="default" style={cardStyles}>
              <h4 style={{ color: 'var(--quafi-text-primary)', marginBottom: '8px', fontFamily: 'var(--quafi-font-mono)' }}>Default</h4>
              <p style={{ color: 'var(--quafi-text-muted)', fontSize: '12px' }}>Border glow on hover</p>
            </MotionCard>
            <MotionCard variant="scale" style={cardStyles}>
              <h4 style={{ color: 'var(--quafi-text-primary)', marginBottom: '8px', fontFamily: 'var(--quafi-font-mono)' }}>Scale</h4>
              <p style={{ color: 'var(--quafi-text-muted)', fontSize: '12px' }}>Subtle scale on hover</p>
            </MotionCard>
            <MotionCard variant="glow" style={cardStyles}>
              <h4 style={{ color: 'var(--quafi-text-primary)', marginBottom: '8px', fontFamily: 'var(--quafi-font-mono)' }}>Glow</h4>
              <p style={{ color: 'var(--quafi-text-muted)', fontSize: '12px' }}>Box shadow glow</p>
            </MotionCard>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Spring Buttons" description="Botones con física de resorte">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '20px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'Execute', color: 'var(--quafi-accent)' },
              { label: 'Confirm', color: 'var(--quafi-positive)' },
              { label: 'Cancel', color: 'var(--quafi-negative)' },
              { label: 'Info', color: 'var(--quafi-info)' }
            ].map(({ label, color }) => (
              <motion.button
                key={label}
                style={{ ...buttonStyles, color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Hover Effects" description="Efectos personalizados">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '20px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <motion.div
              style={{ ...cardStyles, width: '150px', textAlign: 'center' }}
              whileHover={{ y: -5 }}
            >
              <p style={{ color: 'var(--quafi-text-primary)', fontFamily: 'var(--quafi-font-mono)', fontSize: '12px' }}>Lift Up</p>
            </motion.div>
            <motion.div
              style={{ ...cardStyles, width: '150px', textAlign: 'center' }}
              whileHover={{ rotate: 2, scale: 1.02 }}
            >
              <p style={{ color: 'var(--quafi-text-primary)', fontFamily: 'var(--quafi-font-mono)', fontSize: '12px' }}>Tilt</p>
            </motion.div>
            <motion.div
              style={{ ...cardStyles, width: '150px', textAlign: 'center' }}
              whileHover={{ scale: 1.05 }}
            >
              <p style={{ color: 'var(--quafi-text-primary)', fontFamily: 'var(--quafi-font-mono)', fontSize: '12px' }}>Scale</p>
            </motion.div>
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
          fontFamily: 'var(--quafi-font-mono)',
          color: 'var(--quafi-text-muted)',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--quafi-accent)' }}>MotionCard variants:</strong> default, scale, glow</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent)' }}>Spring config:</strong> stiffness: 400, damping: 17</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent)' }}>Hover scale:</strong> 1.05 (5% increase)</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent)' }}>Tap scale:</strong> 0.95 (5% decrease)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function HoverAnimationsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <HoverAnimationsContent />
    </LightEngineProvider>
  );
}
