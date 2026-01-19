// Path: src/pages/animations/LayoutAnimationsShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Layout Animations
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutContainer } from '../../components/animations/LayoutTransition';
import { ShowcaseSection } from '../../components/showcase';
import { Box, Grid } from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function LayoutAnimationsContent() {
  const { lightAngle } = useLightEngine();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

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

  const cardStyles: React.CSSProperties = {
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(6, 18),
    transition: 'box-shadow 50ms linear',
  };

  const buttonStyles: React.CSSProperties = {
    padding: '12px 24px',
    background: MARBLE.base,
    color: 'var(--sentinel-accent-primary)',
    border: 'none',
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(4, 12),
    fontFamily: 'var(--sentinel-font-mono)',
    fontWeight: 600,
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'box-shadow 50ms linear',
  };

  const gridCards = [
    { id: 1, title: 'API Gateway', color: 'var(--sentinel-status-positive)' },
    { id: 2, title: 'Auth Service', color: 'var(--sentinel-status-info)' },
    { id: 3, title: 'Database', color: 'var(--sentinel-status-warning)' },
    { id: 4, title: 'Cache', color: 'var(--sentinel-accent-primary)' }
  ];

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Layout Animations_</h1>
        <p style={descStyles}>// Transiciones de layout y AnimatePresence</p>
      </header>

      <ShowcaseSection title="SharedElement" description="Transición suave entre estados">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
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
                      boxShadow: expandedId === id ? getNeuInsetShadow(4, 12) : getNeuPanelShadow(6, 18),
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Box style={{ color: expandedId === id ? 'var(--sentinel-accent-primary)' : '#636E72', marginBottom: '8px' }} size={20} />
                    <h4 style={{
                      color: expandedId === id ? 'var(--sentinel-accent-primary)' : 'var(--sentinel-text-primary)',
                      fontFamily: 'var(--sentinel-font-mono)',
                      fontSize: '14px',
                      marginBottom: '4px'
                    }}>
                      {id.toUpperCase()}
                    </h4>
                    <p style={{ color: '#636E72', fontFamily: 'var(--sentinel-font-mono)', fontSize: '11px' }}>
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
                      borderLeft: '4px solid var(--sentinel-accent-primary)',
                      padding: '32px',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <Grid style={{ color: 'var(--sentinel-accent-primary)' }} size={32} />
                      <h4 style={{ color: 'var(--sentinel-accent-primary)', fontFamily: 'var(--sentinel-font-mono)', fontSize: '18px' }}>
                        {expandedId.toUpperCase()} EXPANDED
                      </h4>
                    </div>
                    <p style={{ color: '#636E72', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px', marginBottom: '16px' }}>
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
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="AnimatePresence - Toggle" description="Animación de entrada/salida">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ width: '100%' }}>
            <motion.button
              style={{ ...buttonStyles, marginBottom: '24px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? 'Hide Element' : 'Show Element'}
            </motion.button>
            <AnimatePresence mode="wait">
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    ...cardStyles,
                    borderLeft: '4px solid var(--sentinel-accent-primary)',
                  }}
                >
                  <h4 style={{ color: 'var(--sentinel-accent-primary)', marginBottom: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>Animated Element</h4>
                  <p style={{ color: '#636E72', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px' }}>
                    Este elemento anima al entrar y salir del DOM.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Card Selection" description="Selección con panel expandible">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {gridCards.map((card) => (
                <motion.div
                  key={card.id}
                  style={{
                    ...cardStyles,
                    boxShadow: selectedCard === card.id ? getNeuInsetShadow(4, 12) : getNeuPanelShadow(6, 18),
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                >
                  <h4 style={{ color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)', fontSize: '14px' }}>{card.title}</h4>
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
                  style={{
                    ...cardStyles,
                    borderLeft: '4px solid var(--sentinel-accent-primary)',
                    overflow: 'hidden',
                  }}
                >
                  <h4 style={{ color: 'var(--sentinel-accent-primary)', marginBottom: '8px', fontFamily: 'var(--sentinel-font-mono)' }}>
                    {gridCards.find(c => c.id === selectedCard)?.title} Details
                  </h4>
                  <p style={{ color: '#636E72', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px' }}>
                    Selected ID: {selectedCard}. Click the card again to deselect.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>LayoutContainer:</strong> Wrapper for layout animations</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>AnimatePresence:</strong> Handles enter/exit animations</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>mode="wait":</strong> Waits for exit before enter</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>layout prop:</strong> Enables automatic layout animations</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function LayoutAnimationsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <LayoutAnimationsContent />
    </LightEngineProvider>
  );
}
