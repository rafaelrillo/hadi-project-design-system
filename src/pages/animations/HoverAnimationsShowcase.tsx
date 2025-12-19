// Path: src/pages/animations/HoverAnimationsShowcase.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { MotionCard } from '../../components/animations/MotionCard';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function HoverAnimationsShowcase() {
  const pageHeaderStyles: React.CSSProperties = { marginBottom: '32px' };
  const titleStyles: React.CSSProperties = {
    fontSize: '28px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px',
    fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };
  const descStyles: React.CSSProperties = {
    fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase', letterSpacing: '0.03em'
  };
  const cardStyles: React.CSSProperties = {
    padding: '24px', backgroundColor: 'var(--background-secondary)',
    border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', cursor: 'pointer'
  };
  const buttonStyles: React.CSSProperties = {
    padding: '12px 24px', backgroundColor: 'var(--primary)', color: 'var(--background)',
    border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)',
    fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em'
  };

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Hover & Tap_</h1>
        <p style={descStyles}>// Animaciones de hover y tap con Framer Motion</p>
      </header>

      <ShowcaseSection title="MotionCard Variants" description="Cards con diferentes efectos hover">
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
            <MotionCard variant="default" style={cardStyles}>
              <h4 style={{ color: 'var(--foreground)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Default</h4>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '12px' }}>Border glow on hover</p>
            </MotionCard>
            <MotionCard variant="scale" style={cardStyles}>
              <h4 style={{ color: 'var(--foreground)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Scale</h4>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '12px' }}>Subtle scale on hover</p>
            </MotionCard>
            <MotionCard variant="glow" style={cardStyles}>
              <h4 style={{ color: 'var(--foreground)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Glow</h4>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '12px' }}>Box shadow glow</p>
            </MotionCard>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Spring Buttons" description="Botones con física de resorte">
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'Execute', bg: 'var(--primary)' },
              { label: 'Confirm', bg: 'var(--success)' },
              { label: 'Cancel', bg: 'var(--destructive)' },
              { label: 'Info', bg: 'var(--info)' }
            ].map(({ label, bg }) => (
              <motion.button
                key={label}
                style={{ ...buttonStyles, backgroundColor: bg }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Hover Effects" description="Efectos personalizados">
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <motion.div
              style={{ ...cardStyles, width: '150px', textAlign: 'center' }}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(255,102,0,0.2)' }}
            >
              <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Lift Up</p>
            </motion.div>
            <motion.div
              style={{ ...cardStyles, width: '150px', textAlign: 'center' }}
              whileHover={{ rotate: 2, scale: 1.02 }}
            >
              <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Tilt</p>
            </motion.div>
            <motion.div
              style={{ ...cardStyles, width: '150px', textAlign: 'center' }}
              whileHover={{ borderColor: 'var(--primary)', backgroundColor: 'var(--background-tertiary)' }}
            >
              <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Color Change</p>
            </motion.div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
