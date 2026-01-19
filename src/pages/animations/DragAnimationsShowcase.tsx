// Path: src/pages/animations/DragAnimationsShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Drag Animations
import React, { useRef, useMemo } from 'react';
import { DraggablePanel } from '../../components/animations/DraggablePanel';
import { ShowcaseSection } from '../../components/showcase';
import { Move } from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function DragAnimationsContent() {
  const { lightAngle } = useLightEngine();
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

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Drag Interactions_</h1>
        <p style={descStyles}>// Paneles arrastrables con Framer Motion</p>
      </header>

      <ShowcaseSection title="DraggablePanel" description="Paneles arrastrables con restricciones">
        <div style={{ padding: '24px', background: MARBLE.base, borderRadius: '15px', boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear' }}>
          <div
            ref={dragConstraintsRef}
            style={{
              width: '100%',
              height: '400px',
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
              fontFamily: 'var(--sentinel-font-mono)',
              fontSize: '12px',
              textAlign: 'center',
              pointerEvents: 'none'
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
                borderLeft: '4px solid var(--sentinel-accent-primary)',
              }}
            >
              <Move style={{ color: 'var(--sentinel-accent-primary)', marginBottom: '8px' }} size={20} />
              <h4 style={{ color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px' }}>Panel A</h4>
              <p style={{ color: '#636E72', fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px' }}>Free movement</p>
            </DraggablePanel>

            <DraggablePanel
              constraints={dragConstraintsRef}
              elastic={0.5}
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
                borderLeft: '4px solid var(--sentinel-status-positive)',
              }}
            >
              <Move style={{ color: 'var(--sentinel-status-positive)', marginBottom: '8px' }} size={20} />
              <h4 style={{ color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px' }}>Panel B</h4>
              <p style={{ color: '#636E72', fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px' }}>More elastic</p>
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
                borderLeft: '4px solid var(--sentinel-status-warning)',
                textAlign: 'center',
                cursor: 'grab'
              }}
            >
              <h4 style={{ color: 'var(--sentinel-status-warning)', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px' }}>Horizontal Only</h4>
              <p style={{ color: '#636E72', fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px' }}>axis="x"</p>
            </DraggablePanel>

            <DraggablePanel
              constraints={dragConstraintsRef}
              axis="y"
              elastic={0.1}
              showHandle={false}
              style={{
                position: 'absolute',
                top: '100px',
                left: '20px',
                width: '120px',
                padding: '16px',
                background: MARBLE.base,
                borderRadius: '15px',
                boxShadow: getNeuPanelShadow(6, 18),
                borderLeft: '4px solid var(--sentinel-status-info)',
                textAlign: 'center',
                cursor: 'grab'
              }}
            >
              <h4 style={{ color: 'var(--sentinel-status-info)', fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px' }}>Vertical</h4>
              <p style={{ color: '#636E72', fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px' }}>axis="y"</p>
            </DraggablePanel>
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
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>constraints:</strong> Ref to parent element for boundaries</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>axis:</strong> "x" | "y" | undefined (both)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>elastic:</strong> 0-1 bounce factor at boundaries</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>showHandle:</strong> Visual drag handle indicator</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>handlePosition:</strong> "top" | "bottom" | "left" | "right"</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function DragAnimationsShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <DragAnimationsContent />
    </LightEngineProvider>
  );
}
