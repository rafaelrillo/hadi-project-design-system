// Path: src/pages/terminal/TerminalShowcase.tsx
// Terminal Theme Version
import React, { useRef, useState } from 'react';
import { AsciiBox } from '../../components/terminal/AsciiBox';
import { GlitchText, GlitchTextRef } from '../../components/terminal/GlitchText';
import { TerminalWindow } from '../../components/terminal/TerminalWindow';
import { TypewriterText, wordSplitter } from '../../components/terminal/TypewriterText';
import {
  criticalErrorGlitch,
  subtleAmbientGlitch,
  hoverInteractiveGlitch,
  warningGlitch,
  hackingEffectGlitch,
  corruptedDataGlitch
} from '../../components/terminal/glitchPresets';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function TerminalShowcase() {
  const manualGlitchRef = useRef<GlitchTextRef>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [callbackMessage, setCallbackMessage] = useState('');

  const handleTriggerGlitch = () => {
    if (manualGlitchRef.current) {
      setIsGlitching(true);
      manualGlitchRef.current.startGlitch();
      setTimeout(() => {
        manualGlitchRef.current?.stopGlitch();
        setIsGlitching(false);
      }, 500);
    }
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  };

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Terminal Components_</h1>
        <p style={descStyles}>
          // Componentes con estética de terminal retro y efectos ASCII
        </p>
      </header>

      {/* AsciiBox Variants */}
      <ShowcaseSection
        title="AsciiBox - Variantes"
        description="Cajas con bordes ASCII: single, double, rounded"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <AsciiBox title="Single" variant="single">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground)' }}>
                  Contenido con borde simple usando caracteres Unicode box-drawing.
                </p>
              </AsciiBox>
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <AsciiBox title="Double" variant="double">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground)' }}>
                  Contenido con borde doble para mayor énfasis visual.
                </p>
              </AsciiBox>
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <AsciiBox title="Rounded" variant="rounded">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground)' }}>
                  Contenido con esquinas redondeadas ASCII.
                </p>
              </AsciiBox>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* AsciiBox without Title */}
      <ShowcaseSection
        title="AsciiBox - Sin Título"
        description="Cajas ASCII sin título en el borde superior"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px' }}>
            <AsciiBox variant="double">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground)' }}>
                <p style={{ color: 'var(--primary)', marginBottom: '8px' }}>$ system status</p>
                <p>CPU: 45% | RAM: 2.4GB/8GB</p>
                <p>DISK: 120GB/500GB</p>
                <p>UPTIME: 14d 6h 32m</p>
              </div>
            </AsciiBox>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* GlitchText Intensities */}
      <ShowcaseSection
        title="GlitchText - Intensidades"
        description="Texto con efecto glitch: subtle, low, medium, high, extreme"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '80px' }}>Subtle:</span>
              <GlitchText intensity="subtle" as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  SYSTEM ONLINE
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '80px' }}>Low:</span>
              <GlitchText intensity="low" as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  SYSTEM ONLINE
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '80px' }}>Medium:</span>
              <GlitchText intensity="medium" as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  SYSTEM ONLINE
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '80px' }}>High:</span>
              <GlitchText intensity="high" as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  SYSTEM ONLINE
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '80px' }}>Extreme:</span>
              <GlitchText intensity="extreme" as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--destructive)', fontFamily: 'var(--font-mono)' }}>
                  CRITICAL ERROR
                </span>
              </GlitchText>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* GlitchText as Different Elements */}
      <ShowcaseSection
        title="GlitchText - Elementos"
        description="Efecto glitch aplicado a diferentes elementos HTML"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <GlitchText intensity="medium" as="h1">
              <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                TITULO H1 CON GLITCH
              </span>
            </GlitchText>
            <GlitchText intensity="low" as="h2">
              <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                Subtítulo H2 con efecto sutil
              </span>
            </GlitchText>
            <GlitchText intensity="low" as="p">
              <span style={{ fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                Párrafo de texto con efecto glitch mínimo para contenido legible.
              </span>
            </GlitchText>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* GlitchText Play Modes */}
      <ShowcaseSection
        title="GlitchText - Modos de Reproducción"
        description="Control del momento en que se activa el glitch: always, hover, manual"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '100px' }}>Always:</span>
              <GlitchText intensity="medium" playMode="always" as="span">
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  GLITCH CONSTANTE
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '100px' }}>Hover:</span>
              <GlitchText intensity="medium" playMode="hover" as="span">
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--info)', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
                  HOVER PARA GLITCH
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '100px' }}>Manual:</span>
              <GlitchText ref={manualGlitchRef} intensity="extreme" playMode="manual" as="span">
                <span style={{ fontSize: '20px', fontWeight: 700, color: isGlitching ? 'var(--destructive)' : 'var(--success)', fontFamily: 'var(--font-mono)' }}>
                  {isGlitching ? 'GLITCHING!' : 'ESTABLE'}
                </span>
              </GlitchText>
              <button
                onClick={handleTriggerGlitch}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--background)',
                  border: 'none',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                Trigger Glitch
              </button>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* GlitchText Hue Rotate */}
      <ShowcaseSection
        title="GlitchText - Efectos de Color"
        description="Rotación de hue y filtros CSS para efectos cromáticos"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '120px' }}>Sin Hue:</span>
              <GlitchText intensity="high" hueRotate={false} as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  COLOR NORMAL
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '120px' }}>Con Hue:</span>
              <GlitchText intensity="high" hueRotate={true} as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  RAINBOW GLITCH
                </span>
              </GlitchText>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--foreground-muted)', width: '120px' }}>CSS Filters:</span>
              <GlitchText intensity="medium" cssFilters="brightness(1.3) contrast(1.2)" as="span">
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--warning)', fontFamily: 'var(--font-mono)' }}>
                  BRIGHT EFFECT
                </span>
              </GlitchText>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* GlitchText Presets */}
      <ShowcaseSection
        title="GlitchText - Presets"
        description="Configuraciones predefinidas para casos de uso comunes"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '100%' }}>
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--background-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                subtleAmbientGlitch
              </span>
              <GlitchText {...subtleAmbientGlitch} as="span">
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                  Ambiente Sutil
                </span>
              </GlitchText>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--background-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                hoverInteractiveGlitch
              </span>
              <GlitchText {...hoverInteractiveGlitch} as="span">
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--info)', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}>
                  Hover Interactivo
                </span>
              </GlitchText>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--background-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                warningGlitch
              </span>
              <GlitchText {...warningGlitch} as="span">
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--warning)', fontFamily: 'var(--font-mono)' }}>
                  Warning Alert
                </span>
              </GlitchText>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--background-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                hackingEffectGlitch
              </span>
              <GlitchText {...hackingEffectGlitch} as="span">
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>
                  Hacking Mode
                </span>
              </GlitchText>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--background-secondary)',
              border: '1px solid var(--destructive)',
              borderRadius: 'var(--radius)'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                criticalErrorGlitch
              </span>
              <GlitchText {...criticalErrorGlitch} playMode="always" as="span">
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--destructive)', fontFamily: 'var(--font-mono)' }}>
                  Critical Error
                </span>
              </GlitchText>
            </div>
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--background-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                corruptedDataGlitch
              </span>
              <GlitchText {...corruptedDataGlitch} as="span">
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--destructive)', fontFamily: 'var(--font-mono)' }}>
                  Data Corrupted
                </span>
              </GlitchText>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* TerminalWindow Basic */}
      <ShowcaseSection
        title="TerminalWindow - Básico"
        description="Ventana de terminal con controles de ventana"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <TerminalWindow title="bash - robot@server:~">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ color: 'var(--success)' }}>robot@server:~$</p>
                <p style={{ color: 'var(--foreground)' }}>$ npm install robot-resources-ui</p>
                <p style={{ color: 'var(--foreground-muted)' }}>Installing dependencies...</p>
                <p style={{ color: 'var(--foreground-muted)' }}>+ robot-resources-ui@1.0.0</p>
                <p style={{ color: 'var(--success)' }}>✓ Done in 2.3s</p>
              </div>
            </TerminalWindow>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* TerminalWindow without Controls */}
      <ShowcaseSection
        title="TerminalWindow - Sin Controles"
        description="Ventana de terminal sin los dots de control"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <TerminalWindow title="output.log" showControls={false}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: '1.5', color: 'var(--foreground-muted)' }}>
                <p>[2024-01-15 10:23:45] INFO: Server started on port 3000</p>
                <p>[2024-01-15 10:23:46] INFO: Database connected</p>
                <p>[2024-01-15 10:23:47] <span style={{ color: 'var(--warning)' }}>WARN: Cache miss for key "user_session"</span></p>
                <p>[2024-01-15 10:23:48] INFO: Request handled in 45ms</p>
                <p>[2024-01-15 10:23:49] <span style={{ color: 'var(--success)' }}>SUCCESS: Backup completed</span></p>
              </div>
            </TerminalWindow>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* TypewriterText Basic */}
      <ShowcaseSection
        title="TypewriterText - Básico"
        description="Texto con efecto de escritura de máquina de escribir"
      >
        <ComponentPreview>
          <div style={{ minHeight: '60px' }}>
            <TypewriterText
              sequence={[
                'Bienvenido al sistema...',
                2000,
                'Iniciando conexión...',
                2000,
                'Sistema listo.',
                2000
              ]}
              speed={50}
              cursor={true}
              repeat={Infinity}
              wrapper="div"
              className=""
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* TypewriterText Different Speeds */}
      <ShowcaseSection
        title="TypewriterText - Velocidades"
        description="Diferentes velocidades de escritura"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                Velocidad: 30 (rápido)
              </span>
              <TypewriterText
                sequence={['Texto rápido de ejemplo...', 2000]}
                speed={30}
                cursor={true}
                repeat={Infinity}
                wrapper="span"
              />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                Velocidad: 50 (normal)
              </span>
              <TypewriterText
                sequence={['Texto a velocidad normal...', 2000]}
                speed={50}
                cursor={true}
                repeat={Infinity}
                wrapper="span"
              />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                Velocidad: 80 (lento)
              </span>
              <TypewriterText
                sequence={['Texto lento dramático...', 2000]}
                speed={80}
                cursor={true}
                repeat={Infinity}
                wrapper="span"
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* TypewriterText Cursor Styles */}
      <ShowcaseSection
        title="TypewriterText - Estilos de Cursor"
        description="Diferentes estilos de cursor: pipe, block, underscore"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                Cursor: Pipe (|)
              </span>
              <TypewriterText
                sequence={['Terminal estilo pipe...', 2000]}
                speed={50}
                cursor={true}
                cursorStyle="pipe"
                repeat={Infinity}
                wrapper="span"
              />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                Cursor: Block (█)
              </span>
              <TypewriterText
                sequence={['Terminal estilo block...', 2000]}
                speed={50}
                cursor={true}
                cursorStyle="block"
                repeat={Infinity}
                wrapper="span"
              />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                Cursor: Underscore (_)
              </span>
              <TypewriterText
                sequence={['Terminal estilo underscore...', 2000]}
                speed={50}
                cursor={true}
                cursorStyle="underscore"
                repeat={Infinity}
                wrapper="span"
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* TypewriterText Word Splitter */}
      <ShowcaseSection
        title="TypewriterText - Word Splitter"
        description="Escritura palabra por palabra en lugar de carácter por carácter"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                // Modo normal (carácter por carácter)
              </span>
              <TypewriterText
                sequence={['Esta es una frase escrita carácter por carácter.', 2000]}
                speed={50}
                cursor={true}
                repeat={Infinity}
                wrapper="span"
              />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                // Modo word splitter (palabra por palabra)
              </span>
              <TypewriterText
                sequence={['Esta es una frase escrita palabra por palabra.', 2000]}
                speed={50}
                cursor={true}
                splitter={wordSplitter}
                repeat={Infinity}
                wrapper="span"
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* TypewriterText Omit Deletion */}
      <ShowcaseSection
        title="TypewriterText - Sin Animación de Borrado"
        description="Secuencias que no borran el texto anterior"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                // Con borrado (normal)
              </span>
              <TypewriterText
                sequence={[
                  'Primera línea...',
                  1500,
                  'Segunda línea...',
                  1500,
                  'Tercera línea...',
                  1500
                ]}
                speed={50}
                cursor={true}
                repeat={Infinity}
                wrapper="span"
              />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                // Sin borrado (instantáneo)
              </span>
              <TypewriterText
                sequence={[
                  'Log: Iniciando...',
                  1500,
                  'Log: Conectando...',
                  1500,
                  'Log: Completado.',
                  1500
                ]}
                speed={50}
                cursor={true}
                omitDeletionAnimation={true}
                repeat={Infinity}
                wrapper="span"
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* TypewriterText with Callbacks */}
      <ShowcaseSection
        title="TypewriterText - Con Callbacks"
        description="Ejecutar funciones durante la secuencia de escritura"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TypewriterText
              sequence={[
                'Procesando...',
                1000,
                () => setCallbackMessage('Paso 1 completado'),
                'Verificando...',
                1000,
                () => setCallbackMessage('Paso 2 completado'),
                'Finalizando...',
                1000,
                () => setCallbackMessage('Proceso terminado'),
                2000
              ]}
              speed={40}
              cursor={true}
              repeat={Infinity}
              wrapper="span"
            />
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'var(--background-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: callbackMessage ? 'var(--success)' : 'var(--foreground-muted)'
            }}>
              Callback: {callbackMessage || 'Esperando...'}
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Combined Example */}
      <ShowcaseSection
        title="Ejemplo Combinado"
        description="Combinación de componentes terminal"
      >
        <ComponentPreview>
          <div style={{
            width: '100%',
            padding: '24px',
            backgroundColor: 'var(--background-secondary)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <GlitchText intensity="low" as="h2">
                <span style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase'
                }}>
                  Robot Resources Terminal
                </span>
              </GlitchText>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <AsciiBox title="Status" variant="double">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                  <p style={{ color: 'var(--success)' }}>● Sistema: ONLINE</p>
                  <p style={{ color: 'var(--success)' }}>● Base de datos: CONECTADA</p>
                  <p style={{ color: 'var(--warning)' }}>● Cache: PARCIAL</p>
                  <p style={{ color: 'var(--foreground-muted)' }}>● Último backup: 2h ago</p>
                </div>
              </AsciiBox>

              <TerminalWindow title="logs">
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)' }}>
                  <TypewriterText
                    sequence={[
                      '> Checking system health...',
                      1000,
                      '> All services operational.',
                      1000,
                      '> Ready for commands.',
                      2000
                    ]}
                    speed={40}
                    cursor={true}
                    repeat={Infinity}
                    wrapper="span"
                  />
                </div>
              </TerminalWindow>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p><strong style={{ color: 'var(--primary)' }}>AsciiBox:</strong></p>
          <p>✓ <strong>Props:</strong> title, children, variant (single|double|rounded), className</p>
          <p>✓ <strong>Caracteres:</strong> Unicode box-drawing characters</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>GlitchText:</strong></p>
          <p>✓ <strong>Basado en:</strong> react-powerglitch</p>
          <p>✓ <strong>Props básicas:</strong> children, className, as (span|div|h1|h2|h3|p)</p>
          <p>✓ <strong>Intensidad:</strong> subtle, low, medium, high, extreme</p>
          <p>✓ <strong>Play Mode:</strong> always, hover, manual</p>
          <p>✓ <strong>Efectos:</strong> hueRotate (boolean), cssFilters (string)</p>
          <p>✓ <strong>Control Manual:</strong> ref con startGlitch() y stopGlitch()</p>
          <p>✓ <strong>Presets:</strong> subtleAmbientGlitch, hoverInteractiveGlitch, warningGlitch, hackingEffectGlitch, criticalErrorGlitch, corruptedDataGlitch, minimalGlitch, buttonHoverGlitch</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>TerminalWindow:</strong></p>
          <p>✓ <strong>Props:</strong> title, children, className, showControls</p>
          <p>✓ <strong>Controles:</strong> Dots rojo/amarillo/verde estilo macOS</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>TypewriterText:</strong></p>
          <p>✓ <strong>Basado en:</strong> react-type-animation</p>
          <p>✓ <strong>Props básicas:</strong> sequence, speed, cursor, repeat, className, wrapper</p>
          <p>✓ <strong>Cursor Styles:</strong> pipe, block, underscore</p>
          <p>✓ <strong>Splitter:</strong> wordSplitter para escribir palabra por palabra</p>
          <p>✓ <strong>Opciones:</strong> omitDeletionAnimation, preRenderFirstString</p>
          <p>✓ <strong>Sequence:</strong> Array de [texto, delay, callback, texto...]</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
