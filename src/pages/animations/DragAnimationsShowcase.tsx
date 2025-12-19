// Path: src/pages/animations/DragAnimationsShowcase.tsx
import React, { useRef } from 'react';
import { DraggablePanel } from '../../components/animations/DraggablePanel';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Move } from 'lucide-react';

export function DragAnimationsShowcase() {
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

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

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Drag Interactions_</h1>
        <p style={descStyles}>// Paneles arrastrables con Framer Motion</p>
      </header>

      <ShowcaseSection title="DraggablePanel" description="Paneles arrastrables con restricciones">
        <ComponentPreview>
          <div
            ref={dragConstraintsRef}
            style={{
              width: '100%', height: '400px', backgroundColor: 'var(--background-tertiary)',
              border: '1px dashed var(--border)', borderRadius: 'var(--radius)',
              position: 'relative', overflow: 'hidden'
            }}
          >
            <p style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px',
              textAlign: 'center', pointerEvents: 'none'
            }}>
              // Área de arrastre - mueve los paneles
            </p>

            <DraggablePanel
              constraints={dragConstraintsRef}
              elastic={0.2}
              showHandle={true}
              handlePosition="top"
              style={{
                position: 'absolute', top: '20px', left: '20px', width: '160px',
                padding: '24px 16px 16px 16px', backgroundColor: 'var(--background-secondary)',
                border: '1px solid var(--primary)', borderRadius: 'var(--radius)'
              }}
            >
              <Move style={{ color: 'var(--primary)', marginBottom: '8px' }} size={20} />
              <h4 style={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Panel A</h4>
              <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>Free movement</p>
            </DraggablePanel>

            <DraggablePanel
              constraints={dragConstraintsRef}
              elastic={0.5}
              showHandle={true}
              handlePosition="top"
              style={{
                position: 'absolute', top: '20px', right: '20px', width: '160px',
                padding: '24px 16px 16px 16px', backgroundColor: 'var(--background-secondary)',
                border: '1px solid var(--success)', borderRadius: 'var(--radius)'
              }}
            >
              <Move style={{ color: 'var(--success)', marginBottom: '8px' }} size={20} />
              <h4 style={{ color: 'var(--foreground)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Panel B</h4>
              <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>More elastic</p>
            </DraggablePanel>

            <DraggablePanel
              constraints={dragConstraintsRef}
              axis="x"
              elastic={0}
              showHandle={false}
              style={{
                position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                width: '200px', padding: '16px', backgroundColor: 'var(--background-secondary)',
                border: '1px solid var(--warning)', borderRadius: 'var(--radius)',
                textAlign: 'center', cursor: 'grab'
              }}
            >
              <h4 style={{ color: 'var(--warning)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Horizontal Only</h4>
              <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>axis="x"</p>
            </DraggablePanel>

            <DraggablePanel
              constraints={dragConstraintsRef}
              axis="y"
              elastic={0.1}
              showHandle={false}
              style={{
                position: 'absolute', top: '100px', left: '20px', width: '120px',
                padding: '16px', backgroundColor: 'var(--background-secondary)',
                border: '1px solid var(--info)', borderRadius: 'var(--radius)',
                textAlign: 'center', cursor: 'grab'
              }}
            >
              <h4 style={{ color: 'var(--info)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>Vertical</h4>
              <p style={{ color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>axis="y"</p>
            </DraggablePanel>
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
