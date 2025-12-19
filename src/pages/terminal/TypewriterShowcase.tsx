// Path: src/pages/terminal/TypewriterShowcase.tsx
import React, { useState } from 'react';
import { TypewriterText, wordSplitter } from '../../components/terminal/TypewriterText';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function TypewriterShowcase() {
  const [callbackMessage, setCallbackMessage] = useState('');

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
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; TypewriterText_</h1>
        <p style={descStyles}>// Efectos de máquina de escribir con react-type-animation</p>
      </header>

      {/* Basic */}
      <ShowcaseSection
        title="Básico"
        description="Secuencia de texto con efecto typewriter"
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
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Speeds */}
      <ShowcaseSection
        title="Velocidades"
        description="Diferentes velocidades de escritura"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { speed: 30, label: 'Rápido (30)' },
              { speed: 50, label: 'Normal (50)' },
              { speed: 80, label: 'Lento (80)' }
            ].map(({ speed, label }) => (
              <div key={speed}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                  {label}
                </span>
                <TypewriterText
                  sequence={[`Texto a velocidad ${speed}...`, 2000]}
                  speed={speed}
                  cursor={true}
                  repeat={Infinity}
                  wrapper="span"
                />
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Cursor Styles */}
      <ShowcaseSection
        title="Estilos de Cursor"
        description="Diferentes estilos de cursor: pipe, block, underscore"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { style: 'pipe' as const, label: 'Pipe (|)' },
              { style: 'block' as const, label: 'Block (█)' },
              { style: 'underscore' as const, label: 'Underscore (_)' }
            ].map(({ style, label }) => (
              <div key={style}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                  Cursor: {label}
                </span>
                <TypewriterText
                  sequence={[`Terminal estilo ${style}...`, 2000]}
                  speed={50}
                  cursor={true}
                  cursorStyle={style}
                  repeat={Infinity}
                  wrapper="span"
                />
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Word Splitter */}
      <ShowcaseSection
        title="Word Splitter"
        description="Escritura palabra por palabra en lugar de carácter por carácter"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                // Carácter por carácter
              </span>
              <TypewriterText
                sequence={['Esta frase se escribe carácter por carácter.', 2000]}
                speed={50}
                cursor={true}
                repeat={Infinity}
                wrapper="span"
              />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                // Palabra por palabra
              </span>
              <TypewriterText
                sequence={['Esta frase se escribe palabra por palabra.', 2000]}
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

      {/* Omit Deletion */}
      <ShowcaseSection
        title="Sin Animación de Borrado"
        description="Transición instantánea entre textos"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--foreground-muted)', display: 'block', marginBottom: '8px' }}>
                // Con borrado animado
              </span>
              <TypewriterText
                sequence={['Primera línea...', 1500, 'Segunda línea...', 1500, 'Tercera línea...', 1500]}
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
                sequence={['Log: Iniciando...', 1500, 'Log: Conectando...', 1500, 'Log: Completado.', 1500]}
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

      {/* Callbacks */}
      <ShowcaseSection
        title="Con Callbacks"
        description="Ejecutar funciones durante la secuencia"
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
    </div>
  );
}
