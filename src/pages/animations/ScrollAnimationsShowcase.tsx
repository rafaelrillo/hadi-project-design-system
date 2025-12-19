// Path: src/pages/animations/ScrollAnimationsShowcase.tsx
import React from 'react';
import { ScrollReveal, ScrollProgress } from '../../components/animations/ScrollReveal';
import { Parallax } from '../../components/animations/Parallax';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { ArrowDown, Zap } from 'lucide-react';

export function ScrollAnimationsShowcase() {
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

  return (
    <div>
      <ScrollProgress color="#FF6600" height={3} />

      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Scroll Animations_</h1>
        <p style={descStyles}>// Animaciones vinculadas al scroll</p>
      </header>

      <ShowcaseSection title="ScrollProgress" description="Barra de progreso en la parte superior">
        <ComponentPreview>
          <div style={{ ...cardStyles, textAlign: 'center' }}>
            <Zap style={{ color: 'var(--primary)', marginBottom: '16px' }} size={48} />
            <h4 style={{ color: 'var(--foreground)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
              Scroll Progress Active
            </h4>
            <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              La barra naranja en la parte superior muestra el progreso de scroll.
            </p>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="ScrollReveal" description="Elementos que aparecen al entrar en viewport">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[1, 2, 3].map((i) => (
            <ScrollReveal key={i}>
              <div style={{ ...cardStyles, borderLeft: '3px solid var(--primary)' }}>
                <h4 style={{ color: 'var(--foreground)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                  Log Entry #{i}
                </h4>
                <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
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
              <div style={{ ...cardStyles, borderLeft: '3px solid var(--success)', textAlign: 'center' }}>
                <ArrowDown style={{ color: 'var(--success)', marginBottom: '8px' }} size={24} />
                <h4 style={{ color: 'var(--foreground)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Slow (0.3)</h4>
              </div>
            </Parallax>
            <Parallax speed={0.6}>
              <div style={{ ...cardStyles, borderLeft: '3px solid var(--warning)', textAlign: 'center' }}>
                <ArrowDown style={{ color: 'var(--warning)', marginBottom: '8px' }} size={24} />
                <h4 style={{ color: 'var(--foreground)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Medium (0.6)</h4>
              </div>
            </Parallax>
            <Parallax speed={-0.4}>
              <div style={{ ...cardStyles, borderLeft: '3px solid var(--info)', textAlign: 'center' }}>
                <ArrowDown style={{ color: 'var(--info)', marginBottom: '8px', transform: 'rotate(180deg)' }} size={24} />
                <h4 style={{ color: 'var(--foreground)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Reverse (-0.4)</h4>
              </div>
            </Parallax>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
