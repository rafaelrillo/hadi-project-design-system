// Path: src/pages/animations/AnimationsShowcase.tsx
// Framer Motion Animations Showcase - Glass-Neumorphism
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionCard } from '../../components/animations/MotionCard';
import { FadeIn } from '../../components/animations/FadeIn';
import { StaggerList } from '../../components/animations/StaggerList';
import { ScrollReveal, ScrollProgress } from '../../components/animations/ScrollReveal';
import { Parallax } from '../../components/animations/Parallax';
import { SharedElement, LayoutContainer } from '../../components/animations/LayoutTransition';
import { DraggablePanel } from '../../components/animations/DraggablePanel';
import {
  staggerContainer,
  staggerItem
} from '../../components/animations/presets';
import { ShowcaseSection } from '../../components/showcase';
import { Zap, ArrowDown, Layers, Move, Box, Grid } from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function AnimationsContent() {
  const { lightAngle } = useLightEngine();
  const [isVisible, setIsVisible] = useState(true);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

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
    color: 'var(--fing-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--fing-text-secondary)',
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const sectionHeaderStyles: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--fing-accent-primary)',
    marginTop: '48px',
    marginBottom: '24px',
    padding: '16px 20px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(6, 18),
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'box-shadow 50ms linear',
  };

  const cardStyles: React.CSSProperties = {
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(6, 18),
    cursor: 'pointer',
    transition: 'box-shadow 50ms linear',
  };

  const cardInsetStyles: React.CSSProperties = {
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuInsetShadow(4, 12),
    transition: 'box-shadow 50ms linear',
  };

  const buttonStyles: React.CSSProperties = {
    padding: '12px 24px',
    background: MARBLE.base,
    color: 'var(--fing-accent-primary)',
    border: 'none',
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(4, 12),
    fontFamily: 'var(--fing-font-mono)',
    fontWeight: 600,
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'box-shadow 50ms linear',
  };

  const listItems = [
    'Initializing system...',
    'Loading modules...',
    'Connecting to database...',
    'Fetching user data...',
    'System ready.'
  ];

  const gridCards = [
    { id: 1, title: 'API Gateway', status: 'Online', color: 'var(--fing-status-positive)' },
    { id: 2, title: 'Auth Service', status: 'Online', color: 'var(--fing-status-positive)' },
    { id: 3, title: 'Database', status: 'Warning', color: 'var(--fing-status-warning)' },
    { id: 4, title: 'Cache', status: 'Online', color: 'var(--fing-status-positive)' }
  ];

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      {/* Scroll Progress Bar */}
      <ScrollProgress color="var(--fing-accent-primary)" height={3} />

      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Animations_</h1>
        <p style={descStyles}>
          // Componentes de animación con Framer Motion
        </p>
      </header>

      {/* ============================================ */}
      {/* HOVER & TAP */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Hover & Tap Animations</h2>

      <ShowcaseSection
        title="MotionCard - Variantes de Hover"
        description="Cards interactivas con diferentes efectos hover"
      >
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
            <MotionCard variant="default" style={cardStyles}>
              <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>Default</h4>
              <p style={{ color: '#636E72', fontSize: '12px' }}>Border glow on hover</p>
            </MotionCard>
            <MotionCard variant="scale" style={cardStyles}>
              <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>Scale</h4>
              <p style={{ color: '#636E72', fontSize: '12px' }}>Subtle scale on hover</p>
            </MotionCard>
            <MotionCard variant="glow" style={cardStyles}>
              <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>Glow</h4>
              <p style={{ color: '#636E72', fontSize: '12px' }}>Box shadow glow</p>
            </MotionCard>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Spring Button"
        description="Botones con física de resorte al hacer click"
      >
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <motion.button
              style={buttonStyles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Execute Command
            </motion.button>
            <motion.button
              style={{ ...buttonStyles, color: 'var(--fing-status-positive)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Confirm Action
            </motion.button>
            <motion.button
              style={{ ...buttonStyles, color: 'var(--fing-status-negative)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Terminate Process
            </motion.button>
          </div>
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* ENTRY ANIMATIONS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Entry Animations</h2>

      <ShowcaseSection
        title="FadeIn - Direcciones"
        description="Elementos que aparecen desde diferentes direcciones"
      >
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
            <FadeIn direction="up" delay={0}>
              <div style={cardStyles}>
                <ArrowDown style={{ color: 'var(--fing-accent-primary)', marginBottom: '8px', transform: 'rotate(180deg)' }} size={24} />
                <p style={{ color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>Fade In Up</p>
              </div>
            </FadeIn>
            <FadeIn direction="down" delay={0.1}>
              <div style={cardStyles}>
                <ArrowDown style={{ color: 'var(--fing-accent-primary)', marginBottom: '8px' }} size={24} />
                <p style={{ color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>Fade In Down</p>
              </div>
            </FadeIn>
            <FadeIn direction="scale" delay={0.2}>
              <div style={cardStyles}>
                <Layers style={{ color: 'var(--fing-accent-primary)', marginBottom: '8px' }} size={24} />
                <p style={{ color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>Scale In</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* STAGGER ANIMATIONS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Stagger Animations</h2>

      <ShowcaseSection
        title="StaggerList - Lista Animada"
        description="Items que aparecen secuencialmente con delay"
      >
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '100%' }}>
            <div>
              <h4 style={{ color: '#636E72', marginBottom: '16px', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                // Normal Speed
              </h4>
              <StaggerList speed="normal" direction="up" itemClassName="">
                {listItems.map((item, i) => (
                  <div key={i} style={{
                    padding: '12px 16px',
                    background: MARBLE.base,
                    borderRadius: '15px',
                    boxShadow: getNeuInsetShadow(3, 8),
                    marginBottom: '8px',
                    color: 'var(--fing-status-positive)',
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
              <h4 style={{ color: '#636E72', marginBottom: '16px', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                // Slow Speed (left direction)
              </h4>
              <StaggerList speed="slow" direction="left" itemClassName="">
                {listItems.map((item, i) => (
                  <div key={i} style={{
                    padding: '12px 16px',
                    background: MARBLE.base,
                    borderRadius: '15px',
                    boxShadow: getNeuInsetShadow(3, 8),
                    marginBottom: '8px',
                    color: 'var(--fing-status-info)',
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

      <ShowcaseSection
        title="Stagger Grid"
        description="Grid de cards con animación escalonada usando presets"
      >
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%' }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {gridCards.map((card) => (
              <motion.div
                key={card.id}
                variants={staggerItem}
                style={{
                  ...cardStyles,
                  borderLeft: `4px solid ${card.color}`,
                  borderRadius: '15px',
                }}
              >
                <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)', fontSize: '14px' }}>
                  {card.title}
                </h4>
                <p style={{ color: card.color, fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                  {card.status}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* EXIT ANIMATIONS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Exit Animations (AnimatePresence)</h2>

      <ShowcaseSection
        title="Toggle Visibility"
        description="Elementos que animan al entrar y salir del DOM"
      >
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
                    borderLeft: '4px solid var(--fing-accent-primary)',
                  }}
                >
                  <h4 style={{ color: 'var(--fing-accent-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>
                    Animated Element
                  </h4>
                  <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                    This element animates when entering and exiting the DOM.
                    Click the button above to toggle visibility.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Card Selection"
        description="Selección con animación de entrada/salida"
      >
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
                  <h4 style={{ color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)', fontSize: '14px' }}>
                    {card.title}
                  </h4>
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
                  transition={{ duration: 0.3 }}
                  style={{
                    ...cardStyles,
                    borderLeft: '4px solid var(--fing-accent-primary)',
                    overflow: 'hidden',
                  }}
                >
                  <h4 style={{ color: 'var(--fing-accent-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>
                    {gridCards.find(c => c.id === selectedCard)?.title} Details
                  </h4>
                  <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                    Status: {gridCards.find(c => c.id === selectedCard)?.status}<br />
                    Selected card ID: {selectedCard}<br />
                    Click the same card again to deselect.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* SCROLL ANIMATIONS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Scroll Animations</h2>

      <ShowcaseSection
        title="ScrollReveal"
        description="Elementos que aparecen al hacer scroll"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[1, 2, 3].map((i) => (
            <ScrollReveal key={i}>
              <div style={{
                ...cardStyles,
                borderLeft: '4px solid var(--fing-accent-primary)',
              }}>
                <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>
                  Log Entry #{i}
                </h4>
                <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                  [2024-01-{10 + i} 14:{20 + i}:00] System process completed successfully.
                  This element reveals when you scroll it into view.
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="ScrollProgress"
        description="Barra de progreso vinculada al scroll (visible en la parte superior)"
      >
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{
            ...cardInsetStyles,
            textAlign: 'center',
          }}>
            <Zap style={{ color: 'var(--fing-accent-primary)', marginBottom: '16px' }} size={48} />
            <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>
              Scroll Progress Active
            </h4>
            <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
              La barra en la parte superior de la página muestra el progreso de scroll.
              Desplázate hacia arriba y abajo para ver el efecto.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* PARALLAX */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Parallax Effects</h2>

      <ShowcaseSection
        title="Parallax - Velocidades"
        description="Elementos que se mueven a diferentes velocidades durante el scroll"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '40px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Parallax speed={0.3}>
              <div style={{
                ...cardStyles,
                borderLeft: '4px solid var(--fing-status-positive)',
                textAlign: 'center',
              }}>
                <ArrowDown style={{ color: 'var(--fing-status-positive)', marginBottom: '8px' }} size={24} />
                <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>Slow (0.3)</h4>
                <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '11px' }}>
                  Se mueve lentamente
                </p>
              </div>
            </Parallax>
            <Parallax speed={0.6}>
              <div style={{
                ...cardStyles,
                borderLeft: '4px solid var(--fing-status-warning)',
                textAlign: 'center',
              }}>
                <ArrowDown style={{ color: 'var(--fing-status-warning)', marginBottom: '8px' }} size={24} />
                <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>Medium (0.6)</h4>
                <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '11px' }}>
                  Velocidad media
                </p>
              </div>
            </Parallax>
            <Parallax speed={-0.4}>
              <div style={{
                ...cardStyles,
                borderLeft: '4px solid var(--fing-status-info)',
                textAlign: 'center',
              }}>
                <ArrowDown style={{ color: 'var(--fing-status-info)', marginBottom: '8px', transform: 'rotate(180deg)' }} size={24} />
                <h4 style={{ color: 'var(--fing-text-primary)', marginBottom: '8px', fontFamily: 'var(--fing-font-mono)' }}>Reverse (-0.4)</h4>
                <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '11px' }}>
                  Dirección opuesta
                </p>
              </div>
            </Parallax>
          </div>
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* LAYOUT TRANSITIONS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Layout Transitions</h2>

      <ShowcaseSection
        title="SharedElement - Transición entre estados"
        description="Elementos que animan suavemente entre diferentes posiciones y tamaños"
      >
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div style={{ width: '100%' }}>
            <LayoutContainer>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {['node-1', 'node-2', 'node-3'].map((id) => (
                  expandedId !== id && (
                    <SharedElement
                      key={id}
                      layoutId={id}
                      onClick={() => setExpandedId(id)}
                      style={{
                        ...cardStyles,
                        cursor: 'pointer',
                      }}
                    >
                      <Box style={{ color: 'var(--fing-accent-primary)', marginBottom: '8px' }} size={20} />
                      <h4 style={{ color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)', fontSize: '14px' }}>
                        {id.toUpperCase()}
                      </h4>
                      <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '11px' }}>
                        Click to expand
                      </p>
                    </SharedElement>
                  )
                ))}
              </div>

              {expandedId && (
                <SharedElement
                  layoutId={expandedId}
                  onClick={() => setExpandedId(null)}
                  style={{
                    ...cardStyles,
                    borderLeft: '4px solid var(--fing-accent-primary)',
                    cursor: 'pointer',
                    padding: '32px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <Grid style={{ color: 'var(--fing-accent-primary)' }} size={32} />
                    <h4 style={{ color: 'var(--fing-accent-primary)', fontFamily: 'var(--fing-font-mono)', fontSize: '18px' }}>
                      {expandedId.toUpperCase()} EXPANDED
                    </h4>
                  </div>
                  <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                    Este elemento se expande suavemente desde su posición original.
                    La transición usa layout animations de Framer Motion para animar
                    automáticamente los cambios de tamaño y posición.
                    <br /><br />
                    Click para colapsar.
                  </p>
                </SharedElement>
              )}
            </LayoutContainer>
          </div>
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* DRAGGABLE */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Drag Interactions</h2>

      <ShowcaseSection
        title="DraggablePanel - Paneles arrastrables"
        description="Elementos que se pueden arrastrar con restricciones y física"
      >
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div
            ref={dragConstraintsRef}
            style={{
              width: '100%',
              height: '300px',
              background: MARBLE.base,
              borderRadius: '15px',
              boxShadow: getNeuInsetShadow(5, 15),
              position: 'relative',
              overflow: 'hidden',
              transition: 'box-shadow 50ms linear',
            }}
          >
            <p style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#636E72',
              fontFamily: 'var(--fing-font-mono)',
              fontSize: '12px',
              textAlign: 'center',
              pointerEvents: 'none',
            }}>
              // Área de arrastre - mueve los paneles
            </p>

            <DraggablePanel
              constraints={dragConstraintsRef}
              elastic={0.2}
              showHandle={true}
              handlePosition="top"
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '160px',
                padding: '24px 16px 16px 16px',
                background: MARBLE.base,
                borderRadius: '15px',
                boxShadow: getNeuPanelShadow(6, 18),
                borderLeft: '4px solid var(--fing-accent-primary)',
              }}
            >
              <Move style={{ color: 'var(--fing-accent-primary)', marginBottom: '8px' }} size={20} />
              <h4 style={{ color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                Panel A
              </h4>
              <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '10px' }}>
                Arrástralo
              </p>
            </DraggablePanel>

            <DraggablePanel
              constraints={dragConstraintsRef}
              elastic={0.2}
              showHandle={true}
              handlePosition="top"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '160px',
                padding: '24px 16px 16px 16px',
                background: MARBLE.base,
                borderRadius: '15px',
                boxShadow: getNeuPanelShadow(6, 18),
                borderLeft: '4px solid var(--fing-status-positive)',
              }}
            >
              <Move style={{ color: 'var(--fing-status-positive)', marginBottom: '8px' }} size={20} />
              <h4 style={{ color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                Panel B
              </h4>
              <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '10px' }}>
                Con elastic
              </p>
            </DraggablePanel>

            <DraggablePanel
              constraints={dragConstraintsRef}
              axis="x"
              elastic={0}
              showHandle={false}
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                padding: '16px',
                background: MARBLE.base,
                borderRadius: '15px',
                boxShadow: getNeuPanelShadow(6, 18),
                borderLeft: '4px solid var(--fing-status-warning)',
                textAlign: 'center',
                cursor: 'grab',
              }}
            >
              <h4 style={{ color: 'var(--fing-status-warning)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>
                Solo Horizontal
              </h4>
              <p style={{ color: '#636E72', fontFamily: 'var(--fing-font-mono)', fontSize: '10px' }}>
                axis="x"
              </p>
            </DraggablePanel>
          </div>
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* PRESETS REFERENCE */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Presets Reference</h2>

      <ShowcaseSection title="Configuraciones Disponibles">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          fontSize: '12px',
          fontFamily: 'var(--fing-font-mono)',
          color: '#636E72',
          lineHeight: '2',
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div>
              <p><strong style={{ color: 'var(--fing-accent-primary)' }}>Hover Presets:</strong></p>
              <p>✓ cardHover - Border glow effect</p>
              <p>✓ scaleHover - Subtle scale transform</p>
              <p>✓ glowHover - Box shadow glow</p>
              <p>✓ springButton - Spring physics tap</p>
            </div>
            <div>
              <p><strong style={{ color: 'var(--fing-accent-primary)' }}>Entry Presets:</strong></p>
              <p>✓ fadeIn - Simple opacity</p>
              <p>✓ fadeInUp/Down/Left/Right - Directional</p>
              <p>✓ scaleIn - Scale + opacity</p>
            </div>
            <div>
              <p><strong style={{ color: 'var(--fing-accent-primary)' }}>Stagger Presets:</strong></p>
              <p>✓ staggerContainer - Parent config</p>
              <p>✓ staggerContainerFast/Slow - Speed variants</p>
              <p>✓ staggerItem - Child animation</p>
              <p>✓ staggerItemLeft - Left direction</p>
            </div>
            <div>
              <p><strong style={{ color: 'var(--fing-accent-primary)' }}>Transitions:</strong></p>
              <p>✓ springTransition - Bouncy</p>
              <p>✓ smoothTransition - Gentle</p>
              <p>✓ snappyTransition - Quick</p>
              <p>✓ gentleTransition - Ease out</p>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <p><strong style={{ color: 'var(--fing-accent-primary)' }}>Components:</strong></p>
            <p>✓ MotionCard - Card with hover variants (default/scale/glow)</p>
            <p>✓ FadeIn - Wrapper with direction and delay props</p>
            <p>✓ StaggerList - Animated list with speed control</p>
            <p>✓ ScrollReveal - Viewport entry animation</p>
            <p>✓ ScrollProgress - Fixed progress bar</p>
            <p>✓ Parallax - Scroll-based offset with speed control</p>
            <p>✓ SharedElement - Layout transition between states</p>
            <p>✓ LayoutContainer - Wrapper for layout animations</p>
            <p>✓ DraggablePanel - Drag with constraints and physics</p>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function AnimationsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <AnimationsContent />
    </LightEngineProvider>
  );
}
