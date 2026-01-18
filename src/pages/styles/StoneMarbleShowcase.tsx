// Path: src/pages/styles/StoneMarbleShowcase.tsx
// SENTINEL Design System - Stone Marble Neumorphism Reference
import React, { useState } from 'react';

type Section = 'typography' | 'containers' | 'buttons' | 'inputs' | 'badges' | 'indicators' | 'cards' | 'decorative';

export function StoneMarbleShowcase() {
  const [section, setSection] = useState<Section>('typography');
  const [toggleOn, setToggleOn] = useState(true);
  const [sliderValue] = useState(65);

  const sections: { id: Section; label: string }[] = [
    { id: 'typography', label: 'Tipografía' },
    { id: 'containers', label: 'Contenedores' },
    { id: 'buttons', label: 'Botones' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'badges', label: 'Badges & Tags' },
    { id: 'indicators', label: 'Indicadores' },
    { id: 'cards', label: 'Cards' },
    { id: 'decorative', label: 'Decorativos' },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // STYLES - Using CSS variables from theme.css
  // ═══════════════════════════════════════════════════════════════════════════

  const showcaseStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: 'var(--marble-base)',
    padding: '32px',
    fontFamily: 'var(--sentinel-font-primary)',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '32px',
  };

  const headerTitleStyles: React.CSSProperties = {
    fontFamily: 'var(--sentinel-font-display)',
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: 'var(--marble-base)',
    textShadow: 'var(--lp-carved, 2px 2px 2px var(--shadow-light), -2px -2px 2px var(--shadow-dark))',
  };

  const headerSubtitleStyles: React.CSSProperties = {
    fontSize: '14px',
    marginTop: '8px',
    color: 'var(--marble-base)',
    textShadow: 'var(--lp-subtle, 0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark))',
  };

  const navStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '32px',
    flexWrap: 'wrap',
    background: 'var(--marble-base)',
    padding: '6px',
    borderRadius: '16px',
    boxShadow: 'var(--inset-2)',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const navItemStyles = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 18px',
    border: 'none',
    borderRadius: '10px',
    fontFamily: 'var(--sentinel-font-primary)',
    fontSize: '12px',
    fontWeight: isActive ? 600 : 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: isActive ? 'var(--marble-base)' : 'transparent',
    color: 'var(--marble-base)',
    textShadow: isActive
      ? '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)'
      : '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)',
    boxShadow: isActive ? 'var(--raised-2)' : 'none',
  });

  const sectionStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    borderRadius: '24px',
    boxShadow: 'var(--raised-3)',
    padding: '32px',
    marginBottom: '24px',
  };

  const sectionTitleStyles: React.CSSProperties = {
    fontFamily: 'var(--sentinel-font-primary)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--marble-base)',
    textShadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)',
    marginBottom: '24px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--marble-dark)',
  };

  const showcaseItemStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };

  const demoLabelStyles: React.CSSProperties = {
    fontFamily: 'var(--sentinel-font-mono)',
    fontSize: '9px',
    fontWeight: 500,
    color: '#64748b',
    marginTop: '8px',
    textAlign: 'center',
  };

  // Letterpress styles
  const lpStyles = (intensity: string): React.CSSProperties => {
    const shadows: Record<string, string> = {
      whisper: '0.5px 0.5px 0px var(--shadow-light), -0.5px -0.5px 0px var(--shadow-dark)',
      subtle: '0.75px 0.75px 0px var(--shadow-light), -0.75px -0.75px 0px var(--shadow-dark)',
      soft: '1px 1px 0px var(--shadow-light), -1px -1px 0px var(--shadow-dark)',
      medium: '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)',
      strong: '1.5px 1.5px 1px var(--shadow-light), -1.5px -1.5px 1px var(--shadow-dark)',
      deep: '2px 2px 1px var(--shadow-light), -2px -2px 1px var(--shadow-dark)',
      carved: '2px 2px 2px var(--shadow-light), -2px -2px 2px var(--shadow-dark)',
      stamped: '3px 3px 2px var(--shadow-light), -3px -3px 2px var(--shadow-dark)',
      monumental: '4px 4px 3px var(--shadow-light), -4px -4px 3px var(--shadow-dark)',
    };
    return {
      color: 'var(--marble-base)',
      textShadow: shadows[intensity] || shadows.medium,
    };
  };

  // Colored letterpress
  const lpColorStyles = (color: 'teal' | 'positive' | 'negative' | 'warning'): React.CSSProperties => {
    const colors: Record<string, { color: string; shadow: string }> = {
      teal: {
        color: 'var(--sentinel-accent-tertiary, #6fb3b5)',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(74, 154, 156, 0.4)',
      },
      positive: {
        color: '#7cb89a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(22, 163, 74, 0.3)',
      },
      negative: {
        color: '#c98a8a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(220, 38, 38, 0.3)',
      },
      warning: {
        color: '#c9a87a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(217, 119, 6, 0.3)',
      },
    };
    return {
      color: colors[color].color,
      textShadow: colors[color].shadow,
    };
  };

  // Container styles
  const raisedStyles = (level: number): React.CSSProperties => {
    const radii = [12, 14, 16, 18, 20];
    return {
      background: 'var(--marble-base)',
      borderRadius: `${radii[level - 1]}px`,
      boxShadow: `var(--raised-${level})`,
    };
  };

  const insetStyles = (level: number): React.CSSProperties => {
    const radii = [10, 12, 14, 16, 18];
    return {
      background: 'var(--marble-base)',
      borderRadius: `${radii[level - 1]}px`,
      boxShadow: `var(--inset-${level})`,
    };
  };

  const glassStyles: React.CSSProperties = {
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: '12px',
    backdropFilter: 'blur(8px)',
  };

  const glassStrongStyles: React.CSSProperties = {
    background: 'var(--glass-bg-strong)',
    border: '1px solid var(--glass-border-strong)',
    borderRadius: '12px',
    backdropFilter: 'blur(12px)',
  };

  // Button styles
  const btnBaseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--sentinel-font-primary)',
    fontSize: '13px',
    fontWeight: 600,
    transition: 'all 0.15s ease',
    color: 'var(--marble-base)',
    textShadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px var(--shadow-dark)',
  };

  const btnRaisedStyles: React.CSSProperties = {
    ...btnBaseStyles,
    background: 'var(--marble-base)',
    borderRadius: '12px',
    boxShadow: 'var(--raised-2)',
  };

  const btnInsetStyles: React.CSSProperties = {
    ...btnBaseStyles,
    background: 'var(--marble-base)',
    borderRadius: '12px',
    boxShadow: 'var(--inset-1)',
  };

  const btnGlassStyles: React.CSSProperties = {
    ...btnBaseStyles,
    background: 'rgba(255, 255, 255, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '12px',
  };

  const btnTealStyles: React.CSSProperties = {
    ...btnBaseStyles,
    background: 'linear-gradient(135deg, var(--sentinel-accent-tertiary, #6fb3b5), var(--sentinel-accent-primary, #4A9A9C))',
    color: 'white',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    boxShadow: 'var(--raised-2), inset 0 1px 0 rgba(255,255,255,0.2)',
    borderRadius: '12px',
  };

  // Input styles
  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    border: 'none',
    fontFamily: 'var(--sentinel-font-primary)',
    fontSize: '14px',
    background: 'var(--marble-base)',
    borderRadius: '12px',
    boxShadow: 'var(--inset-2)',
    color: '#4a5568',
    outline: 'none',
  };

  // Toggle styles
  const toggleTrackStyles = (isActive: boolean): React.CSSProperties => ({
    width: '56px',
    height: '30px',
    background: isActive
      ? 'linear-gradient(135deg, var(--sentinel-accent-tertiary, #6fb3b5), var(--sentinel-accent-primary, #4A9A9C))'
      : 'var(--marble-base)',
    borderRadius: '100px',
    boxShadow: 'var(--inset-2)',
    position: 'relative',
    cursor: 'pointer',
  });

  const toggleKnobStyles = (isActive: boolean): React.CSSProperties => ({
    width: '24px',
    height: '24px',
    background: isActive ? 'white' : 'var(--marble-base)',
    borderRadius: '50%',
    boxShadow: 'var(--raised-2)',
    position: 'absolute',
    top: '3px',
    left: isActive ? '29px' : '3px',
    transition: 'all 0.3s ease',
  });

  // Badge styles
  const badgeBaseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 14px',
    fontFamily: 'var(--sentinel-font-mono)',
    fontSize: '11px',
    fontWeight: 600,
  };

  // Stat card styles
  const statCardStyles: React.CSSProperties = {
    background: 'var(--marble-base)',
    borderRadius: '16px',
    boxShadow: 'var(--raised-2)',
    padding: '20px',
  };

  const statIconStyles: React.CSSProperties = {
    width: '48px',
    height: '48px',
    background: 'var(--marble-base)',
    borderRadius: '12px',
    boxShadow: 'var(--inset-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    marginBottom: '16px',
  };

  // Meter styles
  const meterStyles: React.CSSProperties = {
    width: '120px',
    height: '120px',
    background: 'var(--marble-base)',
    borderRadius: '50%',
    boxShadow: 'var(--raised-3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const meterInnerStyles: React.CSSProperties = {
    width: '90px',
    height: '90px',
    background: 'var(--marble-base)',
    borderRadius: '50%',
    boxShadow: 'var(--inset-3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Table row styles
  const tableRowStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '40px 80px 1fr 80px 80px',
    gap: '12px',
    alignItems: 'center',
    padding: '14px 16px',
    background: 'var(--marble-base)',
    borderRadius: '12px',
    boxShadow: 'var(--raised-1)',
    marginBottom: '8px',
  };

  // Emblem styles
  const emblemStyles: React.CSSProperties = {
    width: '100px',
    height: '100px',
    background: 'var(--marble-base)',
    borderRadius: '50%',
    boxShadow: 'var(--raised-4), inset 0 0 20px rgba(147, 157, 170, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const emblemInnerStyles: React.CSSProperties = {
    width: '70px',
    height: '70px',
    background: 'var(--marble-base)',
    borderRadius: '50%',
    boxShadow: 'var(--inset-3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Grid helpers
  const grid = (cols: number, gap = 20): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: `${gap}px`,
  });

  const flex = (justify = 'center', align = 'center', gap = 24): React.CSSProperties => ({
    display: 'flex',
    justifyContent: justify,
    alignItems: align,
    gap: `${gap}px`,
    flexWrap: 'wrap',
  });

  return (
    <div style={showcaseStyles}>
      <header style={headerStyles}>
        <h1 style={headerTitleStyles}>SENTINEL Stone Marble</h1>
        <p style={headerSubtitleStyles}>Sistema de diseño neumórfico completo - Referencia visual de todas las variables</p>
      </header>

      <nav style={navStyles}>
        {sections.map(s => (
          <button
            key={s.id}
            style={navItemStyles(section === s.id)}
            onClick={() => setSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* TYPOGRAPHY */}
      {section === 'typography' && (
        <>
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Intensidades de Letterpress (--lp-*)</div>
            <div style={grid(4)}>
              {[
                { name: 'Whisper', intensity: 'whisper', size: '16px' },
                { name: 'Subtle', intensity: 'subtle', size: '16px' },
                { name: 'Soft', intensity: 'soft', size: '18px' },
                { name: 'Medium', intensity: 'medium', size: '20px' },
                { name: 'Strong', intensity: 'strong', size: '22px' },
                { name: 'Deep', intensity: 'deep', size: '24px' },
                { name: 'Carved', intensity: 'carved', size: '28px' },
                { name: 'Stamped', intensity: 'stamped', size: '32px' },
              ].map(v => (
                <div key={v.name} style={{ ...insetStyles(2), ...showcaseItemStyles }}>
                  <div style={{ ...lpStyles(v.intensity), fontFamily: 'var(--sentinel-font-primary)', fontSize: v.size, fontWeight: 700 }}>
                    SENTINEL
                  </div>
                  <div style={demoLabelStyles}>{v.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Letterpress con Color</div>
            <div style={grid(4)}>
              <div style={{ ...insetStyles(2), ...showcaseItemStyles }}>
                <div style={{ ...lpStyles('medium'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '24px', fontWeight: 700 }}>$191,856</div>
                <div style={demoLabelStyles}>Neutral</div>
              </div>
              <div style={{ ...insetStyles(2), ...showcaseItemStyles }}>
                <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '24px', fontWeight: 700 }}>$191,856</div>
                <div style={demoLabelStyles}>Teal</div>
              </div>
              <div style={{ ...insetStyles(2), ...showcaseItemStyles }}>
                <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '24px', fontWeight: 700 }}>+16.5%</div>
                <div style={demoLabelStyles}>Positive</div>
              </div>
              <div style={{ ...insetStyles(2), ...showcaseItemStyles }}>
                <div style={{ ...lpColorStyles('negative'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '24px', fontWeight: 700 }}>-8.2%</div>
                <div style={demoLabelStyles}>Negative</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Jerarquía Completa</div>
            <div style={{ ...insetStyles(3), padding: '24px' }}>
              <div style={{ ...lpStyles('monumental'), fontFamily: 'var(--sentinel-font-display)', fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>SENTINEL</div>
              <div style={{ ...lpStyles('stamped'), fontFamily: 'var(--sentinel-font-display)', fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>Portfolio Value</div>
              <div style={{ ...lpStyles('deep'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '56px', fontWeight: 700, marginBottom: '8px' }}>$1,234,567</div>
              <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>+16.5% this month</div>
              <div style={{ ...lpStyles('medium'), fontFamily: 'var(--sentinel-font-primary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Performance Metrics</div>
              <div style={{ ...lpStyles('soft'), fontFamily: 'var(--sentinel-font-primary)', fontSize: '15px', lineHeight: 1.6 }}>
                Your portfolio has shown consistent growth over the past quarter, outperforming the market benchmark by 3.2 percentage points.
              </div>
            </div>
          </div>
        </>
      )}

      {/* CONTAINERS */}
      {section === 'containers' && (
        <>
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Raised (--raised-1 a --raised-5) - Elevados</div>
            <div style={grid(5, 16)}>
              {[1, 2, 3, 4, 5].map(level => (
                <div key={level} style={{ ...raisedStyles(level), ...showcaseItemStyles, minHeight: '100px' }}>
                  <div style={lpStyles('medium')}>Raised {level}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Inset (--inset-1 a --inset-5) - Cavados</div>
            <div style={grid(5, 16)}>
              {[1, 2, 3, 4, 5].map(level => (
                <div key={level} style={{ ...insetStyles(level), ...showcaseItemStyles, minHeight: '100px' }}>
                  <div style={lpStyles('medium')}>Inset {level}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Glass (--glass-bg, --glass-border)</div>
            <div style={grid(3)}>
              <div style={{ ...glassStyles, ...showcaseItemStyles, minHeight: '120px' }}>
                <div style={lpStyles('medium')}>Glass</div>
                <div style={demoLabelStyles}>25% opacity</div>
              </div>
              <div style={{ ...glassStrongStyles, ...showcaseItemStyles, minHeight: '120px' }}>
                <div style={lpStyles('medium')}>Glass Strong</div>
                <div style={demoLabelStyles}>40% opacity</div>
              </div>
              <div style={{ ...raisedStyles(3), padding: '16px' }}>
                <div style={{ ...lpStyles('medium'), fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>Raised → Inset → Glass</div>
                <div style={{ ...insetStyles(2), padding: '12px' }}>
                  <div style={{ ...glassStyles, padding: '12px' }}>
                    <div style={{ ...lpStyles('soft'), fontSize: '11px' }}>Nested content</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Jerarquía de Anidación</div>
            <div style={{ ...insetStyles(3), padding: '24px' }}>
              <pre style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px', color: 'var(--sentinel-text-secondary)', lineHeight: 1.8 }}>
{`FONDO (--marble-base)
  └── RAISED (cards, sections, modals)
        └── INSET (inputs, listas, areas internas)
              └── GLASS (items, buttons dentro de inset)

REGLAS:
- NUNCA anidar RAISED dentro de RAISED
- NUNCA anidar INSET dentro de INSET
- GLASS solo va dentro de INSET`}
              </pre>
            </div>
          </div>
        </>
      )}

      {/* BUTTONS */}
      {section === 'buttons' && (
        <>
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Estilos de Botón</div>
            <div style={grid(4)}>
              <div style={showcaseItemStyles}>
                <button style={btnRaisedStyles}>Raised</button>
                <div style={demoLabelStyles}>Default</div>
              </div>
              <div style={showcaseItemStyles}>
                <button style={btnInsetStyles}>Inset</button>
                <div style={demoLabelStyles}>Pressed</div>
              </div>
              <div style={showcaseItemStyles}>
                <button style={btnGlassStyles}>Glass</button>
                <div style={demoLabelStyles}>Transparent</div>
              </div>
              <div style={showcaseItemStyles}>
                <button style={btnTealStyles}>Accent</button>
                <div style={demoLabelStyles}>Primary</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Formas de Botón</div>
            <div style={flex()}>
              <div style={showcaseItemStyles}>
                <button style={{ ...btnRaisedStyles, borderRadius: '6px' }}>Sharp</button>
                <div style={demoLabelStyles}>6px</div>
              </div>
              <div style={showcaseItemStyles}>
                <button style={btnRaisedStyles}>Default</button>
                <div style={demoLabelStyles}>12px</div>
              </div>
              <div style={showcaseItemStyles}>
                <button style={{ ...btnRaisedStyles, borderRadius: '100px' }}>Pill</button>
                <div style={demoLabelStyles}>100px</div>
              </div>
              <div style={showcaseItemStyles}>
                <button style={{ ...btnRaisedStyles, width: '48px', height: '48px', padding: 0, borderRadius: '50%' }}>●</button>
                <div style={demoLabelStyles}>Circle</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Icon Buttons</div>
            <div style={flex('center', 'center', 16)}>
              <div style={showcaseItemStyles}>
                <div style={{ ...raisedStyles(2), width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px' }}>🏠</div>
                <div style={demoLabelStyles}>Square</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...raisedStyles(2), width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px', borderRadius: '50%' }}>📊</div>
                <div style={demoLabelStyles}>Circle</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...insetStyles(2), width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px' }}>⚙️</div>
                <div style={demoLabelStyles}>Inset</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...glassStyles, width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '18px' }}>🔔</div>
                <div style={demoLabelStyles}>Glass</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* INPUTS */}
      {section === 'inputs' && (
        <>
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Text Inputs (--inset-2)</div>
            <div style={grid(2)}>
              <div>
                <div style={{ ...lpStyles('subtle'), fontSize: '11px', fontWeight: 500, marginBottom: '8px' }}>Default Input</div>
                <input style={inputStyles} placeholder="Enter text..." />
              </div>
              <div>
                <div style={{ ...lpStyles('subtle'), fontSize: '11px', fontWeight: 500, marginBottom: '8px' }}>Pill Input</div>
                <input style={{ ...inputStyles, borderRadius: '100px' }} placeholder="Search..." />
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Toggle & Slider</div>
            <div style={grid(2)}>
              <div style={flex('center', 'center', 24)}>
                <div style={showcaseItemStyles}>
                  <div style={toggleTrackStyles(false) as React.CSSProperties}>
                    <div style={toggleKnobStyles(false) as React.CSSProperties} />
                  </div>
                  <div style={demoLabelStyles}>Off</div>
                </div>
                <div style={showcaseItemStyles}>
                  <div style={toggleTrackStyles(toggleOn) as React.CSSProperties} onClick={() => setToggleOn(!toggleOn)}>
                    <div style={toggleKnobStyles(toggleOn) as React.CSSProperties} />
                  </div>
                  <div style={demoLabelStyles}>Interactive</div>
                </div>
              </div>
              <div style={{ maxWidth: '300px', margin: '0 auto', width: '100%' }}>
                <div style={{ width: '100%', height: '8px', background: 'var(--marble-base)', borderRadius: '100px', boxShadow: 'var(--inset-2)', position: 'relative' }}>
                  <div style={{ width: `${sliderValue}%`, height: '100%', background: 'linear-gradient(90deg, var(--sentinel-accent-tertiary, #6fb3b5), var(--sentinel-accent-primary, #4A9A9C))', borderRadius: '100px' }} />
                  <div style={{ width: '24px', height: '24px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-2)', position: 'absolute', top: '50%', left: `${sliderValue}%`, transform: 'translate(-50%, -50%)' }} />
                </div>
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <span style={{ ...lpStyles('strong'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '20px', fontWeight: 700 }}>{sliderValue}%</span>
                </div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Checkbox & Radio</div>
            <div style={flex('center', 'center', 24)}>
              <div style={showcaseItemStyles}>
                <div style={{ ...insetStyles(2), width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '6px' }}>
                  <span style={{ color: 'white', fontSize: '14px', opacity: 0 }}>✓</span>
                </div>
                <div style={demoLabelStyles}>Unchecked</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ width: '24px', height: '24px', background: 'var(--sentinel-accent-primary)', borderRadius: '6px', boxShadow: 'var(--raised-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ color: 'white', fontSize: '14px' }}>✓</span>
                </div>
                <div style={demoLabelStyles}>Checked</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...insetStyles(2), width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%' }}>
                  <div style={{ width: '10px', height: '10px', background: 'var(--sentinel-accent-primary)', borderRadius: '50%', boxShadow: 'var(--raised-1)', opacity: 0 }} />
                </div>
                <div style={demoLabelStyles}>Unselected</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...insetStyles(2), width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%' }}>
                  <div style={{ width: '10px', height: '10px', background: 'var(--sentinel-accent-primary)', borderRadius: '50%', boxShadow: 'var(--raised-1)' }} />
                </div>
                <div style={demoLabelStyles}>Selected</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Progress Bars</div>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <div style={{ ...lpStyles('subtle'), fontSize: '11px', marginBottom: '8px' }}>25% Complete</div>
                <div style={{ height: '12px', background: 'var(--marble-base)', borderRadius: '100px', boxShadow: 'var(--inset-2)', overflow: 'hidden' }}>
                  <div style={{ width: '25%', height: '100%', background: 'linear-gradient(90deg, var(--sentinel-accent-tertiary, #6fb3b5), var(--sentinel-accent-primary, #4A9A9C))', borderRadius: '100px' }} />
                </div>
              </div>
              <div>
                <div style={{ ...lpStyles('subtle'), fontSize: '11px', marginBottom: '8px' }}>75% Complete</div>
                <div style={{ height: '12px', background: 'var(--marble-base)', borderRadius: '100px', boxShadow: 'var(--inset-2)', overflow: 'hidden' }}>
                  <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, var(--sentinel-accent-tertiary, #6fb3b5), var(--sentinel-accent-primary, #4A9A9C))', borderRadius: '100px' }} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* BADGES */}
      {section === 'badges' && (
        <>
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Badges</div>
            <div style={flex('center', 'center', 12)}>
              <span style={{ ...badgeBaseStyles, ...raisedStyles(1), borderRadius: '100px', ...lpStyles('subtle') }}>Raised</span>
              <span style={{ ...badgeBaseStyles, ...insetStyles(1), borderRadius: '100px', ...lpColorStyles('teal') }}>Inset</span>
              <span style={{ ...badgeBaseStyles, background: 'linear-gradient(135deg, var(--sentinel-accent-tertiary), var(--sentinel-accent-primary))', color: 'white', borderRadius: '100px' }}>Teal</span>
              <span style={{ ...badgeBaseStyles, ...raisedStyles(1), borderRadius: '100px', ...lpColorStyles('positive') }}>+12.5%</span>
              <span style={{ ...badgeBaseStyles, ...raisedStyles(1), borderRadius: '100px', ...lpColorStyles('negative') }}>-8.3%</span>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Tags (Tickers)</div>
            <div style={flex('center', 'center', 8)}>
              {['$AAPL', '$MSFT', '$GOOGL', '$NVDA', '$TSLA'].map(ticker => (
                <span key={ticker} style={{ display: 'inline-block', padding: '4px 12px', fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', fontWeight: 600, background: 'var(--marble-base)', borderRadius: '6px', boxShadow: 'var(--inset-1)', ...lpColorStyles('teal') }}>{ticker}</span>
              ))}
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Avatars</div>
            <div style={flex('center', 'center', 16)}>
              <div style={showcaseItemStyles}>
                <div style={{ ...raisedStyles(2), width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sentinel-font-primary)', fontWeight: 600, fontSize: '18px', ...lpStyles('medium') }}>JD</div>
                <div style={demoLabelStyles}>Raised</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...insetStyles(2), width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sentinel-font-primary)', fontWeight: 600, fontSize: '18px', ...lpStyles('soft') }}>AB</div>
                <div style={demoLabelStyles}>Inset</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...raisedStyles(2), width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sentinel-font-primary)', fontWeight: 600, fontSize: '18px', ...lpStyles('medium') }}>MK</div>
                <div style={demoLabelStyles}>Square</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* INDICATORS */}
      {section === 'indicators' && (
        <>
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Meters / Gauges (Raised → Inset)</div>
            <div style={flex('center', 'center', 24)}>
              <div style={showcaseItemStyles}>
                <div style={meterStyles}>
                  <div style={meterInnerStyles}>
                    <div style={{ ...lpStyles('deep'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '24px', fontWeight: 700 }}>87</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '10px', fontWeight: 500 }}>SCORE</div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Confidence</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={meterStyles}>
                  <div style={meterInnerStyles}>
                    <div style={{ ...lpColorStyles('warning'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '24px', fontWeight: 700 }}>42</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '10px', fontWeight: 500 }}>RISK</div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Risk Level</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={meterStyles}>
                  <div style={meterInnerStyles}>
                    <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '24px', fontWeight: 700 }}>+16%</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '10px', fontWeight: 500 }}>YTD</div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Returns</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Stat Cards</div>
            <div style={grid(4, 16)}>
              <div style={statCardStyles}>
                <div style={statIconStyles}>💰</div>
                <div style={{ ...lpStyles('deep'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '28px', fontWeight: 700 }}>$191K</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Portfolio</div>
              </div>
              <div style={statCardStyles}>
                <div style={statIconStyles}>📈</div>
                <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '28px', fontWeight: 700 }}>+16.5%</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Returns</div>
              </div>
              <div style={statCardStyles}>
                <div style={statIconStyles}>⚖️</div>
                <div style={{ ...lpColorStyles('warning'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '28px', fontWeight: 700 }}>42</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Risk Score</div>
              </div>
              <div style={statCardStyles}>
                <div style={statIconStyles}>🎯</div>
                <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '28px', fontWeight: 700 }}>87%</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Confidence</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CARDS */}
      {section === 'cards' && (
        <>
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Card Variations</div>
            <div style={grid(3)}>
              <div style={{ ...raisedStyles(2), padding: '24px' }}>
                <div style={{ ...lpStyles('strong'), fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Raised Card</div>
                <div style={{ ...lpStyles('soft'), fontSize: '13px', lineHeight: 1.5 }}>Standard elevated card for content.</div>
              </div>
              <div style={{ ...raisedStyles(4), padding: '24px' }}>
                <div style={{ ...lpStyles('strong'), fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Elevated Card</div>
                <div style={{ ...lpStyles('soft'), fontSize: '13px', lineHeight: 1.5 }}>Higher elevation for prominence.</div>
              </div>
              <div style={{ ...glassStyles, padding: '24px' }}>
                <div style={{ ...lpStyles('strong'), fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Glass Card</div>
                <div style={{ ...lpStyles('soft'), fontSize: '13px', lineHeight: 1.5 }}>Transparent glass effect.</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Data Table</div>
            <div>
              {[
                { rank: '#1', sym: 'META', name: 'Meta Platforms', price: '$506', change: '+2.15%', pos: true },
                { rank: '#2', sym: 'AVGO', name: 'Broadcom Inc.', price: '$168', change: '+1.82%', pos: true },
                { rank: '#3', sym: 'GOOGL', name: 'Alphabet', price: '$143', change: '-0.86%', pos: false },
              ].map((s, i) => (
                <div key={i} style={tableRowStyles}>
                  <span style={{ ...lpColorStyles('teal'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '11px', fontWeight: 600 }}>{s.rank}</span>
                  <span style={{ ...lpStyles('strong'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '14px', fontWeight: 600 }}>{s.sym}</span>
                  <span style={{ ...lpStyles('subtle'), fontSize: '12px' }}>{s.name}</span>
                  <span style={{ ...lpStyles('medium'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '14px', fontWeight: 500 }}>{s.price}</span>
                  <span style={{ ...(s.pos ? lpColorStyles('positive') : lpColorStyles('negative')), fontFamily: 'var(--sentinel-font-mono)', fontSize: '13px', fontWeight: 500 }}>{s.change}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Complex Card (Raised → Inset → Glass)</div>
            <div style={{ ...raisedStyles(3), padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ ...lpStyles('strong'), fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>📈 TOP BUYS</span>
                <button style={{ ...btnGlassStyles, padding: '8px 16px', fontSize: '12px' }}>View All →</button>
              </div>
              <div style={{ ...insetStyles(2), padding: '16px' }}>
                {['META', 'AVGO', 'CRM'].map((sym, i) => (
                  <div key={sym} style={{ ...glassStyles, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', marginTop: i > 0 ? '8px' : 0 }}>
                    <span style={{ ...lpStyles('medium'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '13px', fontWeight: 600 }}>{sym}</span>
                    <span style={{ ...lpColorStyles('positive'), fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px', fontWeight: 500 }}>+{(Math.random() * 3).toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* DECORATIVE */}
      {section === 'decorative' && (
        <>
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Ornamentos</div>
            <div style={flex('center', 'center', 24)}>
              <div style={showcaseItemStyles}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ width: '8px', height: '8px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-1)' }} />
                  ))}
                </div>
                <div style={demoLabelStyles}>Dots</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ width: '60px', height: '3px', background: 'var(--marble-base)', borderRadius: '3px', boxShadow: 'var(--inset-1)' }} />
                <div style={demoLabelStyles}>Line</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ width: '12px', height: '12px', background: 'var(--marble-base)', transform: 'rotate(45deg)', boxShadow: 'var(--inset-1)' }} />
                <div style={demoLabelStyles}>Diamond</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Emblems</div>
            <div style={flex('center', 'center', 24)}>
              <div style={showcaseItemStyles}>
                <div style={emblemStyles}>
                  <div style={emblemInnerStyles}>
                    <span style={{ ...lpStyles('stamped'), fontFamily: 'var(--sentinel-font-display)', fontSize: '32px', fontWeight: 700 }}>S</span>
                  </div>
                </div>
                <div style={demoLabelStyles}>Logo Emblem</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={meterStyles}>
                  <div style={meterInnerStyles}>
                    <span style={{ ...lpStyles('deep'), fontSize: '28px' }}>◆</span>
                  </div>
                </div>
                <div style={demoLabelStyles}>Icon Emblem</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Dividers & Separators</div>
            <div style={{ display: 'grid', gap: '24px' }}>
              <div>
                <div style={{ ...lpStyles('whisper'), fontSize: '10px', marginBottom: '8px' }}>Simple</div>
                <div style={{ height: '2px', background: 'var(--marble-base)', boxShadow: '0 1px 0 var(--shadow-light), 0 -1px 0 var(--shadow-dark)' }} />
              </div>
              <div>
                <div style={{ ...lpStyles('whisper'), fontSize: '10px', marginBottom: '8px' }}>Inset</div>
                <div style={{ height: '4px', background: 'var(--marble-base)', borderRadius: '2px', boxShadow: 'var(--inset-1)' }} />
              </div>
              <div>
                <div style={{ ...lpStyles('whisper'), fontSize: '10px', marginBottom: '8px' }}>Raised</div>
                <div style={{ height: '4px', background: 'var(--marble-base)', borderRadius: '2px', boxShadow: 'var(--raised-1)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--marble-dark), transparent)' }} />
                <span style={{ ...lpStyles('subtle'), fontSize: '11px', letterSpacing: '0.1em' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--marble-dark), transparent)' }} />
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Decorative Header</div>
            <div style={{ ...raisedStyles(4), padding: '24px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '60px', height: '3px', background: 'var(--marble-base)', borderRadius: '3px', boxShadow: 'var(--inset-1)' }} />
                <div style={{ ...emblemStyles, width: '60px', height: '60px' }}>
                  <div style={{ ...emblemInnerStyles, width: '44px', height: '44px' }}>
                    <span style={{ ...lpStyles('strong'), fontSize: '18px' }}>◆</span>
                  </div>
                </div>
                <div style={{ width: '60px', height: '3px', background: 'var(--marble-base)', borderRadius: '3px', boxShadow: 'var(--inset-1)' }} />
              </div>
              <div style={{ ...lpStyles('stamped'), fontFamily: 'var(--sentinel-font-display)', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>SENTINEL</div>
              <div style={{ ...lpStyles('medium'), marginTop: '8px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Investment Analytics</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ width: '8px', height: '8px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-1)' }} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StoneMarbleShowcase;
