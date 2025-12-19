// Path: src/pages/animations/EntryAnimationsShowcase.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../components/animations/FadeIn';
import { StaggerList } from '../../components/animations/StaggerList';
import { staggerContainer, staggerItem } from '../../components/animations/presets';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { ArrowDown, ArrowUp, ArrowLeft, ArrowRight, Maximize } from 'lucide-react';

export function EntryAnimationsShowcase() {
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
    border: '1px solid var(--border)', borderRadius: 'var(--radius-card)'
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
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Entry Animations_</h1>
        <p style={descStyles}>// Animaciones de entrada con FadeIn y StaggerList</p>
      </header>

      <ShowcaseSection title="FadeIn Directions" description="Entrada desde diferentes direcciones">
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', width: '100%' }}>
            {directions.map(({ dir, icon: Icon, label }, i) => (
              <FadeIn key={dir} direction={dir} delay={i * 0.1}>
                <div style={{ ...cardStyles, textAlign: 'center' }}>
                  <Icon style={{ color: 'var(--primary)', marginBottom: '8px' }} size={24} />
                  <p style={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="StaggerList" description="Lista con animación escalonada">
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '100%' }}>
            <div>
              <h4 style={{ color: 'var(--foreground-muted)', marginBottom: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                // Normal Speed, Up Direction
              </h4>
              <StaggerList speed="normal" direction="up" itemClassName="">
                {listItems.map((item, i) => (
                  <div key={i} style={{
                    padding: '12px 16px', backgroundColor: 'var(--background-secondary)',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                    marginBottom: '8px', color: 'var(--success)', fontFamily: 'var(--font-mono)', fontSize: '12px'
                  }}>
                    &gt; {item}
                  </div>
                ))}
              </StaggerList>
            </div>
            <div>
              <h4 style={{ color: 'var(--foreground-muted)', marginBottom: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                // Slow Speed, Left Direction
              </h4>
              <StaggerList speed="slow" direction="left" itemClassName="">
                {listItems.map((item, i) => (
                  <div key={i} style={{
                    padding: '12px 16px', backgroundColor: 'var(--background-secondary)',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                    marginBottom: '8px', color: 'var(--info)', fontFamily: 'var(--font-mono)', fontSize: '12px'
                  }}>
                    [{i + 1}] {item}
                  </div>
                ))}
              </StaggerList>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Stagger Grid" description="Grid con animación usando presets">
        <ComponentPreview>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%' }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div key={i} variants={staggerItem} style={cardStyles}>
                <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                  Item {i}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
