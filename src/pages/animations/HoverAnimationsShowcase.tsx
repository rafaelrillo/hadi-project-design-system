// Path: src/pages/animations/HoverAnimationsShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Hover Animations
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MotionCard } from '../../components/animations/MotionCard';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function HoverAnimationsContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: LIGHT.base,
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

  const cardStyles: React.CSSProperties = {
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(6, 18),
    cursor: 'pointer',
    transition: 'box-shadow 50ms linear',
  };

  const buttonStyles: React.CSSProperties = {
    padding: '12px 24px',
    background: LIGHT.base,
    color: 'var(--sentinel-accent-primary)',
    border: 'none',
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(4, 12),
    fontFamily: 'var(--sentinel-font-mono)',
    fontWeight: 600,
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Hover & Tap_</h1>
        <p style={descStyles}>// Animaciones de hover y tap con Framer Motion</p>
      </header>

      <ShowcaseSection title="MotionCard Variants" description="Cards con diferentes efectos hover">
        <div style={{ padding: '24px', background: LIGHT.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
            <MotionCard variant="default" style={cardStyles}>
              <h4 style={{ color: '#2D3436', marginBottom: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Default</h4>
              <p style={{ color: '#636E72', fontSize: '12px' }}>Border glow on hover</p>
            </MotionCard>
            <MotionCard variant="scale" style={cardStyles}>
              <h4 style={{ color: '#2D3436', marginBottom: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Scale</h4>
              <p style={{ color: '#636E72', fontSize: '12px' }}>Subtle scale on hover</p>
            </MotionCard>
            <MotionCard variant="glow" style={cardStyles}>
              <h4 style={{ color: '#2D3436', marginBottom: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Glow</h4>
              <p style={{ color: '#636E72', fontSize: '12px' }}>Box shadow glow</p>
            </MotionCard>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Spring Buttons" description="Botones con física de resorte">
        <div style={{ padding: '24px', background: LIGHT.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'Execute', color: 'var(--sentinel-accent-primary)' },
              { label: 'Confirm', color: 'var(--sentinel-status-positive)' },
              { label: 'Cancel', color: 'var(--sentinel-status-negative)' },
              { label: 'Info', color: 'var(--sentinel-status-info)' }
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
        <div style={{ padding: '24px', background: LIGHT.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <motion.div
              style={{ ...cardStyles, width: '150px', textAlign: 'center' }}
              whileHover={{ y: -5 }}
            >
              <p style={{ color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px' }}>Lift Up</p>
            </motion.div>
            <motion.div
              style={{ ...cardStyles, width: '150px', textAlign: 'center' }}
              whileHover={{ rotate: 2, scale: 1.02 }}
            >
              <p style={{ color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px' }}>Tilt</p>
            </motion.div>
            <motion.div
              style={{ ...cardStyles, width: '150px', textAlign: 'center' }}
              whileHover={{ scale: 1.05 }}
            >
              <p style={{ color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px' }}>Scale</p>
            </motion.div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: LIGHT.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>MotionCard variants:</strong> default, scale, glow</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Spring config:</strong> stiffness: 400, damping: 17</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Hover scale:</strong> 1.05 (5% increase)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Tap scale:</strong> 0.95 (5% decrease)</p>
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
