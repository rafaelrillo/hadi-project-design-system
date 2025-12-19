// Path: src/pages/animations/LayoutAnimationsShowcase.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutContainer } from '../../components/animations/LayoutTransition';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Box, Grid } from 'lucide-react';

export function LayoutAnimationsShowcase() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

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
  const buttonStyles: React.CSSProperties = {
    padding: '12px 24px', backgroundColor: 'var(--primary)', color: 'var(--background)',
    border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)',
    fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase'
  };

  const gridCards = [
    { id: 1, title: 'API Gateway', color: 'var(--success)' },
    { id: 2, title: 'Auth Service', color: 'var(--info)' },
    { id: 3, title: 'Database', color: 'var(--warning)' },
    { id: 4, title: 'Cache', color: 'var(--primary)' }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Layout Animations_</h1>
        <p style={descStyles}>// Transiciones de layout y AnimatePresence</p>
      </header>

      <ShowcaseSection title="SharedElement" description="Transición suave entre estados">
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <LayoutContainer>
              {/* Grid de nodos - siempre visible */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: expandedId ? '16px' : '0' }}>
                {['node-1', 'node-2', 'node-3'].map((id) => (
                  <motion.div
                    key={id}
                    layout
                    onClick={() => setExpandedId(expandedId === id ? null : id)}
                    style={{
                      ...cardStyles,
                      cursor: 'pointer',
                      borderColor: expandedId === id ? 'var(--primary)' : 'var(--border)',
                      borderWidth: expandedId === id ? '2px' : '1px',
                      transform: expandedId === id ? 'scale(1.02)' : 'scale(1)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Box style={{ color: expandedId === id ? 'var(--primary)' : 'var(--foreground-muted)', marginBottom: '8px' }} size={20} />
                    <h4 style={{
                      color: expandedId === id ? 'var(--primary)' : 'var(--foreground)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      marginBottom: '4px'
                    }}>
                      {id.toUpperCase()}
                    </h4>
                    <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                      {expandedId === id ? 'Click to collapse' : 'Click to expand'}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Panel expandido - aparece debajo con animación */}
              <AnimatePresence mode="wait">
                {expandedId && (
                  <motion.div
                    key={expandedId}
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{
                      ...cardStyles,
                      borderColor: 'var(--primary)',
                      borderWidth: '2px',
                      padding: '32px',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <Grid style={{ color: 'var(--primary)' }} size={32} />
                      <h4 style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '18px' }}>
                        {expandedId.toUpperCase()} EXPANDED
                      </h4>
                    </div>
                    <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px', marginBottom: '16px' }}>
                      Este panel muestra los detalles del nodo seleccionado. La transición usa AnimatePresence de Framer Motion
                      para animar la entrada y salida del elemento.
                    </p>
                    <motion.button
                      style={{ ...buttonStyles, fontSize: '12px', padding: '8px 16px' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedId(null)}
                    >
                      Cerrar
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </LayoutContainer>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="AnimatePresence - Toggle" description="Animación de entrada/salida">
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <motion.button style={{ ...buttonStyles, marginBottom: '24px' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? 'Hide Element' : 'Show Element'}
            </motion.button>
            <AnimatePresence mode="wait">
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  style={{ ...cardStyles, borderColor: 'var(--primary)' }}
                >
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Animated Element</h4>
                  <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    Este elemento anima al entrar y salir del DOM.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Card Selection" description="Selección con panel expandible">
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {gridCards.map((card) => (
                <motion.div
                  key={card.id}
                  style={{ ...cardStyles, borderColor: selectedCard === card.id ? 'var(--primary)' : 'var(--border)', cursor: 'pointer' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                >
                  <h4 style={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>{card.title}</h4>
                </motion.div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {selectedCard && (
                <motion.div
                  key={selectedCard}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ ...cardStyles, borderColor: 'var(--primary)', overflow: 'hidden' }}
                >
                  <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                    {gridCards.find(c => c.id === selectedCard)?.title} Details
                  </h4>
                  <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    Selected ID: {selectedCard}. Click the card again to deselect.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
