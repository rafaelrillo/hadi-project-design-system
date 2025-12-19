// Path: src/pages/terminal/TerminalWindowShowcase.tsx
import React from 'react';
import { TerminalWindow } from '../../components/terminal/TerminalWindow';
import { TypewriterText } from '../../components/terminal/TypewriterText';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function TerminalWindowShowcase() {
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
        <h1 style={titleStyles}>&gt; TerminalWindow_</h1>
        <p style={descStyles}>// Ventana de terminal con controles estilo macOS</p>
      </header>

      {/* Basic */}
      <ShowcaseSection
        title="Básico"
        description="Ventana de terminal con título y controles"
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

      {/* Without Controls */}
      <ShowcaseSection
        title="Sin Controles"
        description="Ventana sin los dots de control"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <TerminalWindow title="output.log" showControls={false}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: '1.5', color: 'var(--foreground-muted)' }}>
                <p>[2024-01-15 10:23:45] INFO: Server started on port 3000</p>
                <p>[2024-01-15 10:23:46] INFO: Database connected</p>
                <p>[2024-01-15 10:23:47] <span style={{ color: 'var(--warning)' }}>WARN: Cache miss</span></p>
                <p>[2024-01-15 10:23:48] INFO: Request handled in 45ms</p>
                <p>[2024-01-15 10:23:49] <span style={{ color: 'var(--success)' }}>SUCCESS: Backup completed</span></p>
              </div>
            </TerminalWindow>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Typewriter */}
      <ShowcaseSection
        title="Con Typewriter"
        description="Combinación con TypewriterText para efecto en vivo"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <TerminalWindow title="live-logs">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--foreground-muted)' }}>
                <TypewriterText
                  sequence={[
                    '> Checking system health...',
                    1500,
                    '> All services operational.',
                    1500,
                    '> Monitoring active.',
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* Multiple Windows */}
      <ShowcaseSection
        title="Múltiples Ventanas"
        description="Varias ventanas de terminal lado a lado"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '100%' }}>
            <TerminalWindow title="server-1">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--success)' }}>
                <p>● Status: ONLINE</p>
                <p>● CPU: 23%</p>
                <p>● Memory: 1.2GB</p>
              </div>
            </TerminalWindow>
            <TerminalWindow title="server-2">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--warning)' }}>
                <p>● Status: DEGRADED</p>
                <p>● CPU: 87%</p>
                <p>● Memory: 3.8GB</p>
              </div>
            </TerminalWindow>
          </div>
        </ComponentPreview>
      </ShowcaseSection>
    </div>
  );
}
