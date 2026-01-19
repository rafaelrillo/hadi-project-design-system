// Path: src/pages/styles/StoneMarbleShowcase.tsx
// FING Design System - Stone Marble Neumorphism Reference
import React, { useState } from 'react';

type Section = 'typography' | 'containers' | 'buttons' | 'inputs' | 'badges' | 'indicators' | 'cards' | 'decorative' | 'icons';

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
    { id: 'icons', label: 'Icon Containers' },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // STYLES - Using CSS variables from theme.css
  // ═══════════════════════════════════════════════════════════════════════════

  const showcaseStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: 'var(--marble-base)',
    padding: '32px',
    fontFamily: 'var(--fing-font-primary)',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '32px',
  };

  const headerTitleStyles: React.CSSProperties = {
    fontFamily: 'var(--fing-font-display)',
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
    fontFamily: 'var(--fing-font-primary)',
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
    fontFamily: 'var(--fing-font-primary)',
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
    fontFamily: 'var(--fing-font-mono)',
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
        color: 'var(--fing-accent-tertiary, #6fb3b5)',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(58, 106, 114, 0.4)',
      },
      positive: {
        color: '#7cb89a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(22, 163, 74, 0.3)',
      },
      negative: {
        color: '#8a5a4a',
        shadow: '1px 1px 1px var(--shadow-light), -1px -1px 1px rgba(220, 38, 38, 0.3)',
      },
      warning: {
        color: '#a08a4a',
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
    fontFamily: 'var(--fing-font-primary)',
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
    background: 'linear-gradient(135deg, var(--fing-accent-tertiary, #6fb3b5), var(--fing-accent-primary, #3a6a72))',
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
    fontFamily: 'var(--fing-font-primary)',
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
      ? 'linear-gradient(135deg, var(--fing-accent-tertiary, #6fb3b5), var(--fing-accent-primary, #3a6a72))'
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
    fontFamily: 'var(--fing-font-mono)',
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
        <h1 style={headerTitleStyles}>FING Stone Marble</h1>
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
                  <div style={{ ...lpStyles(v.intensity), fontFamily: 'var(--fing-font-primary)', fontSize: v.size, fontWeight: 700 }}>
                    FING
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
                <div style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-mono)', fontSize: '24px', fontWeight: 700 }}>$191,856</div>
                <div style={demoLabelStyles}>Neutral</div>
              </div>
              <div style={{ ...insetStyles(2), ...showcaseItemStyles }}>
                <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '24px', fontWeight: 700 }}>$191,856</div>
                <div style={demoLabelStyles}>Teal</div>
              </div>
              <div style={{ ...insetStyles(2), ...showcaseItemStyles }}>
                <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '24px', fontWeight: 700 }}>+16.5%</div>
                <div style={demoLabelStyles}>Positive</div>
              </div>
              <div style={{ ...insetStyles(2), ...showcaseItemStyles }}>
                <div style={{ ...lpColorStyles('negative'), fontFamily: 'var(--fing-font-mono)', fontSize: '24px', fontWeight: 700 }}>-8.2%</div>
                <div style={demoLabelStyles}>Negative</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Jerarquía Completa</div>
            <div style={{ ...insetStyles(3), padding: '24px' }}>
              <div style={{ ...lpStyles('monumental'), fontFamily: 'var(--fing-font-display)', fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '24px' }}>FING</div>
              <div style={{ ...lpStyles('stamped'), fontFamily: 'var(--fing-font-display)', fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>Portfolio Value</div>
              <div style={{ ...lpStyles('deep'), fontFamily: 'var(--fing-font-mono)', fontSize: '56px', fontWeight: 700, marginBottom: '8px' }}>$1,234,567</div>
              <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>+16.5% this month</div>
              <div style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-primary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Performance Metrics</div>
              <div style={{ ...lpStyles('soft'), fontFamily: 'var(--fing-font-primary)', fontSize: '15px', lineHeight: 1.6 }}>
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
              <pre style={{ fontFamily: 'var(--fing-font-mono)', fontSize: '12px', color: 'var(--fing-text-secondary)', lineHeight: 1.8 }}>
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
                  <div style={{ width: `${sliderValue}%`, height: '100%', background: 'linear-gradient(90deg, var(--fing-accent-tertiary, #6fb3b5), var(--fing-accent-primary, #3a6a72))', borderRadius: '100px' }} />
                  <div style={{ width: '24px', height: '24px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-2)', position: 'absolute', top: '50%', left: `${sliderValue}%`, transform: 'translate(-50%, -50%)' }} />
                </div>
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <span style={{ ...lpStyles('strong'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 700 }}>{sliderValue}%</span>
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
                <div style={{ width: '24px', height: '24px', background: 'var(--fing-accent-primary)', borderRadius: '6px', boxShadow: 'var(--raised-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ color: 'white', fontSize: '14px' }}>✓</span>
                </div>
                <div style={demoLabelStyles}>Checked</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...insetStyles(2), width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%' }}>
                  <div style={{ width: '10px', height: '10px', background: 'var(--fing-accent-primary)', borderRadius: '50%', boxShadow: 'var(--raised-1)', opacity: 0 }} />
                </div>
                <div style={demoLabelStyles}>Unselected</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...insetStyles(2), width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%' }}>
                  <div style={{ width: '10px', height: '10px', background: 'var(--fing-accent-primary)', borderRadius: '50%', boxShadow: 'var(--raised-1)' }} />
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
                  <div style={{ width: '25%', height: '100%', background: 'linear-gradient(90deg, var(--fing-accent-tertiary, #6fb3b5), var(--fing-accent-primary, #3a6a72))', borderRadius: '100px' }} />
                </div>
              </div>
              <div>
                <div style={{ ...lpStyles('subtle'), fontSize: '11px', marginBottom: '8px' }}>75% Complete</div>
                <div style={{ height: '12px', background: 'var(--marble-base)', borderRadius: '100px', boxShadow: 'var(--inset-2)', overflow: 'hidden' }}>
                  <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, var(--fing-accent-tertiary, #6fb3b5), var(--fing-accent-primary, #3a6a72))', borderRadius: '100px' }} />
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
              <span style={{ ...badgeBaseStyles, background: 'linear-gradient(135deg, var(--fing-accent-tertiary), var(--fing-accent-primary))', color: 'white', borderRadius: '100px' }}>Teal</span>
              <span style={{ ...badgeBaseStyles, ...raisedStyles(1), borderRadius: '100px', ...lpColorStyles('positive') }}>+12.5%</span>
              <span style={{ ...badgeBaseStyles, ...raisedStyles(1), borderRadius: '100px', ...lpColorStyles('negative') }}>-8.3%</span>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Tags (Tickers)</div>
            <div style={flex('center', 'center', 8)}>
              {['$AAPL', '$MSFT', '$GOOGL', '$NVDA', '$TSLA'].map(ticker => (
                <span key={ticker} style={{ display: 'inline-block', padding: '4px 12px', fontFamily: 'var(--fing-font-mono)', fontSize: '10px', fontWeight: 600, background: 'var(--marble-base)', borderRadius: '6px', boxShadow: 'var(--inset-1)', ...lpColorStyles('teal') }}>{ticker}</span>
              ))}
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Avatars</div>
            <div style={flex('center', 'center', 16)}>
              <div style={showcaseItemStyles}>
                <div style={{ ...raisedStyles(2), width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fing-font-primary)', fontWeight: 600, fontSize: '18px', ...lpStyles('medium') }}>JD</div>
                <div style={demoLabelStyles}>Raised</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...insetStyles(2), width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fing-font-primary)', fontWeight: 600, fontSize: '18px', ...lpStyles('soft') }}>AB</div>
                <div style={demoLabelStyles}>Inset</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={{ ...raisedStyles(2), width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fing-font-primary)', fontWeight: 600, fontSize: '18px', ...lpStyles('medium') }}>MK</div>
                <div style={demoLabelStyles}>Square</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* INDICATORS */}
      {section === 'indicators' && (
        <>
          {/* ═══════════════════════════════════════════════════════════════════════════
              CIRCULAR METERS - Los 3 originales
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Meters Circulares (Raised → Inset)</div>
            <div style={flex('center', 'center', 24)}>
              <div style={showcaseItemStyles}>
                <div style={meterStyles}>
                  <div style={meterInnerStyles}>
                    <div style={{ ...lpStyles('deep'), fontFamily: 'var(--fing-font-mono)', fontSize: '24px', fontWeight: 700 }}>87</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '10px', fontWeight: 500 }}>SCORE</div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Confidence</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={meterStyles}>
                  <div style={meterInnerStyles}>
                    <div style={{ ...lpColorStyles('warning'), fontFamily: 'var(--fing-font-mono)', fontSize: '24px', fontWeight: 700 }}>42</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '10px', fontWeight: 500 }}>RISK</div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Risk Level</div>
              </div>
              <div style={showcaseItemStyles}>
                <div style={meterStyles}>
                  <div style={meterInnerStyles}>
                    <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '24px', fontWeight: 700 }}>+16%</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '10px', fontWeight: 500 }}>YTD</div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Returns</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              DIAMOND INDICATORS
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Indicadores Diamante</div>
            <div style={flex('center', 'center', 32)}>
              {/* Diamond Score */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  background: 'var(--marble-base)',
                  transform: 'rotate(45deg)',
                  borderRadius: '12px',
                  boxShadow: 'var(--raised-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '65px',
                    height: '65px',
                    background: 'var(--marble-base)',
                    borderRadius: '8px',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{ transform: 'rotate(-45deg)', textAlign: 'center' }}>
                      <div style={{ ...lpStyles('deep'), fontFamily: 'var(--fing-font-mono)', fontSize: '22px', fontWeight: 700 }}>78</div>
                      <div style={{ ...lpStyles('whisper'), fontSize: '8px', letterSpacing: '0.08em' }}>QUALITY</div>
                    </div>
                  </div>
                </div>
                <div style={{ ...demoLabelStyles, marginTop: '16px' }}>Quality Score</div>
              </div>

              {/* Diamond with Accent Border */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  background: 'var(--marble-base)',
                  transform: 'rotate(45deg)',
                  borderRadius: '12px',
                  boxShadow: 'var(--raised-3)',
                  border: '3px solid var(--fing-accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'var(--marble-base)',
                    borderRadius: '6px',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{ transform: 'rotate(-45deg)', textAlign: 'center' }}>
                      <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '18px', fontWeight: 700 }}>$12K</div>
                      <div style={{ ...lpStyles('whisper'), fontSize: '7px', letterSpacing: '0.08em' }}>DAILY</div>
                    </div>
                  </div>
                </div>
                <div style={{ ...demoLabelStyles, marginTop: '16px' }}>Volume</div>
              </div>

              {/* Diamond Triple Nested */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: 'var(--marble-base)',
                  transform: 'rotate(45deg)',
                  borderRadius: '14px',
                  boxShadow: 'var(--raised-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '75px',
                    height: '75px',
                    background: 'var(--marble-base)',
                    borderRadius: '10px',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, var(--fing-accent-tertiary), var(--fing-accent-primary))',
                      borderRadius: '6px',
                      boxShadow: 'var(--raised-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{ transform: 'rotate(-45deg)', textAlign: 'center' }}>
                        <div style={{ color: 'white', fontFamily: 'var(--fing-font-mono)', fontSize: '16px', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>★</div>
                        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '7px', letterSpacing: '0.05em' }}>PREMIUM</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ ...demoLabelStyles, marginTop: '16px' }}>Premium Status</div>
              </div>

              {/* Diamond Negative */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  background: 'var(--marble-base)',
                  transform: 'rotate(45deg)',
                  borderRadius: '12px',
                  boxShadow: 'var(--raised-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '65px',
                    height: '65px',
                    background: 'var(--marble-base)',
                    borderRadius: '8px',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{ transform: 'rotate(-45deg)', textAlign: 'center' }}>
                      <div style={{ ...lpColorStyles('negative'), fontFamily: 'var(--fing-font-mono)', fontSize: '18px', fontWeight: 700 }}>-3.2%</div>
                      <div style={{ ...lpStyles('whisper'), fontSize: '7px', letterSpacing: '0.08em' }}>DRAWDOWN</div>
                    </div>
                  </div>
                </div>
                <div style={{ ...demoLabelStyles, marginTop: '16px' }}>Max Drawdown</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              SHIELD INDICATORS
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Indicadores Escudo</div>
            <div style={flex('center', 'center', 32)}>
              {/* Shield Security */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '80px',
                  height: '96px',
                  background: 'var(--marble-base)',
                  clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                  filter: 'drop-shadow(4px 4px 8px var(--shadow-dark)) drop-shadow(-4px -4px 8px var(--shadow-light))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '8px',
                }}>
                  <div style={{ ...lpColorStyles('positive'), fontSize: '24px', marginBottom: '2px' }}>✓</div>
                  <div style={{ ...lpStyles('strong'), fontSize: '16px', fontWeight: 700 }}>100%</div>
                  <div style={{ ...lpStyles('whisper'), fontSize: '7px', letterSpacing: '0.08em' }}>SECURE</div>
                </div>
                <div style={demoLabelStyles}>Security Score</div>
              </div>

              {/* Shield with Ring */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '90px',
                  height: '108px',
                  background: 'var(--marble-base)',
                  clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                  filter: 'drop-shadow(5px 5px 10px var(--shadow-dark)) drop-shadow(-5px -5px 10px var(--shadow-light))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '70px',
                    height: '84px',
                    background: 'var(--marble-base)',
                    clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                    boxShadow: 'inset 3px 3px 6px var(--shadow-dark), inset -3px -3px 6px var(--shadow-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '6px',
                  }}>
                    <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 700 }}>A</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '7px', letterSpacing: '0.08em', marginTop: '2px' }}>GRADE</div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Risk Grade</div>
              </div>

              {/* Shield Verified */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '80px',
                  height: '96px',
                  background: 'linear-gradient(180deg, var(--fing-accent-primary), var(--fing-accent-tertiary))',
                  clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                  filter: 'drop-shadow(4px 4px 8px var(--shadow-dark)) drop-shadow(-4px -4px 8px var(--shadow-light))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '60px',
                    height: '72px',
                    background: 'var(--marble-base)',
                    clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '4px',
                  }}>
                    <div style={{ ...lpStyles('deep'), fontSize: '18px' }}>🏆</div>
                    <div style={{ ...lpStyles('strong'), fontSize: '9px', letterSpacing: '0.06em', marginTop: '2px' }}>VERIFIED</div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Verified</div>
              </div>

              {/* Shield Warning */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '80px',
                  height: '96px',
                  background: 'var(--marble-base)',
                  clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                  filter: 'drop-shadow(4px 4px 8px var(--shadow-dark)) drop-shadow(-4px -4px 8px var(--shadow-light))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '8px',
                }}>
                  <div style={{ ...lpColorStyles('warning'), fontSize: '20px', marginBottom: '2px' }}>⚠</div>
                  <div style={{ ...lpColorStyles('warning'), fontFamily: 'var(--fing-font-mono)', fontSize: '14px', fontWeight: 700 }}>MED</div>
                  <div style={{ ...lpStyles('whisper'), fontSize: '7px', letterSpacing: '0.08em' }}>ALERT</div>
                </div>
                <div style={demoLabelStyles}>Alert Level</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              PILL & STADIUM INDICATORS
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Indicadores Pill & Stadium</div>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Horizontal Pills Row */}
              <div style={flex('center', 'center', 16)}>
                {/* Simple Pill */}
                <div style={{
                  width: '140px',
                  height: '50px',
                  background: 'var(--marble-base)',
                  borderRadius: '25px',
                  boxShadow: 'var(--raised-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: 'var(--inset-1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ ...lpColorStyles('positive'), fontSize: '14px' }}>↑</span>
                  </div>
                  <div>
                    <div style={{ ...lpStyles('strong'), fontFamily: 'var(--fing-font-mono)', fontSize: '16px', fontWeight: 700 }}>$247</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '8px', letterSpacing: '0.05em' }}>PRICE</div>
                  </div>
                </div>

                {/* Inset Pill */}
                <div style={{
                  width: '140px',
                  height: '50px',
                  background: 'var(--marble-base)',
                  borderRadius: '25px',
                  boxShadow: 'var(--inset-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}>
                  <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '18px', fontWeight: 700 }}>12</div>
                  <div style={{ width: '1px', height: '24px', background: 'var(--marble-dark)' }} />
                  <div>
                    <div style={{ ...lpStyles('medium'), fontSize: '10px', fontWeight: 600 }}>HOLDINGS</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '8px' }}>Active</div>
                  </div>
                </div>

                {/* Accent Pill */}
                <div style={{
                  width: '150px',
                  height: '50px',
                  background: 'linear-gradient(90deg, var(--fing-accent-tertiary), var(--fing-accent-primary))',
                  borderRadius: '25px',
                  boxShadow: 'var(--raised-2), 0 4px 12px rgba(58, 106, 114, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '0 8px',
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    background: 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: 'var(--inset-1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ ...lpStyles('medium'), fontSize: '12px' }}>🎯</span>
                  </div>
                  <div>
                    <div style={{ color: 'white', fontFamily: 'var(--fing-font-mono)', fontSize: '16px', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>94.2%</div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '8px', letterSpacing: '0.05em' }}>HIT RATE</div>
                  </div>
                </div>
              </div>

              {/* Stadium Displays */}
              <div style={flex('center', 'center', 20)}>
                {/* Stadium with Dividers */}
                <div style={{
                  width: '200px',
                  height: '60px',
                  background: 'var(--marble-base)',
                  borderRadius: '30px',
                  boxShadow: 'var(--raised-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '0 16px',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '16px', fontWeight: 700 }}>+18</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '8px' }}>WINS</div>
                  </div>
                  <div style={{ width: '1px', height: '30px', background: 'var(--marble-dark)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...lpColorStyles('negative'), fontFamily: 'var(--fing-font-mono)', fontSize: '16px', fontWeight: 700 }}>-4</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '8px' }}>LOSSES</div>
                  </div>
                  <div style={{ width: '1px', height: '30px', background: 'var(--marble-dark)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '16px', fontWeight: 700 }}>82%</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '8px' }}>RATE</div>
                  </div>
                </div>

                {/* Stadium Inset */}
                <div style={{
                  width: '180px',
                  height: '60px',
                  background: 'var(--marble-base)',
                  borderRadius: '30px',
                  boxShadow: 'var(--raised-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '160px',
                    height: '44px',
                    background: 'var(--marble-base)',
                    borderRadius: '22px',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                  }}>
                    <div style={{ ...lpStyles('stamped'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 700 }}>$1.2M</div>
                    <div style={{ ...lpStyles('stamped'), color: 'var(--fing-status-positive)', fontFamily: 'var(--fing-font-mono)', fontSize: '12px', fontWeight: 600 }}>↑ 12%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              FRAMED STAT DISPLAYS
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Displays con Marco Decorativo</div>
            <div style={grid(3, 20)}>
              {/* Double Frame Stat */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: `
                  var(--raised-2),
                  inset 0 0 0 3px var(--marble-base),
                  inset 0 0 0 4px var(--shadow-dark),
                  inset 0 0 0 6px var(--shadow-light)
                `,
                padding: '24px',
                textAlign: 'center',
              }}>
                <div style={{ ...lpStyles('whisper'), fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>NET WORTH</div>
                <div style={{ ...lpStyles('monumental'), fontFamily: 'var(--fing-font-mono)', fontSize: '32px', fontWeight: 700 }}>$2.4M</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
                  <span style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>↑ 8.2%</span>
                  <span style={{ ...lpStyles('whisper'), fontSize: '10px' }}>YTD</span>
                </div>
              </div>

              {/* Ridge Frame Stat */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: `
                  var(--raised-2),
                  inset 0 0 0 1px var(--shadow-light),
                  inset 0 0 0 3px var(--marble-dark),
                  inset 0 0 0 4px var(--shadow-light)
                `,
                padding: '24px',
                textAlign: 'center',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}>📊</div>
                </div>
                <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '28px', fontWeight: 700 }}>156</div>
                <div style={{ ...lpStyles('medium'), fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>TRANSACTIONS</div>
              </div>

              {/* Corner Accent Frame */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--raised-2)',
                padding: '24px',
                textAlign: 'center',
                position: 'relative',
              }}>
                {/* Corner accents */}
                <div style={{ position: 'absolute', top: '0', left: '0', width: '20px', height: '20px', borderTopLeftRadius: '16px', borderTop: '3px solid var(--fing-accent-primary)', borderLeft: '3px solid var(--fing-accent-primary)' }} />
                <div style={{ position: 'absolute', top: '0', right: '0', width: '20px', height: '20px', borderTopRightRadius: '16px', borderTop: '3px solid var(--fing-accent-primary)', borderRight: '3px solid var(--fing-accent-primary)' }} />
                <div style={{ position: 'absolute', bottom: '0', left: '0', width: '20px', height: '20px', borderBottomLeftRadius: '16px', borderBottom: '3px solid var(--fing-accent-primary)', borderLeft: '3px solid var(--fing-accent-primary)' }} />
                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '20px', height: '20px', borderBottomRightRadius: '16px', borderBottom: '3px solid var(--fing-accent-primary)', borderRight: '3px solid var(--fing-accent-primary)' }} />

                <div style={{ ...lpStyles('whisper'), fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>SHARPE RATIO</div>
                <div style={{ ...lpStyles('stamped'), fontFamily: 'var(--fing-font-mono)', fontSize: '36px', fontWeight: 700 }}>1.84</div>
                <div style={{ ...lpColorStyles('positive'), fontSize: '11px', marginTop: '4px' }}>Excellent</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              RING EMBLEMS WITH DATA
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Emblemas con Datos</div>
            <div style={flex('center', 'center', 32)}>
              {/* Triple Ring Emblem */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: 'var(--marble-base)',
                  borderRadius: '50%',
                  boxShadow: 'var(--raised-4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '95px',
                    height: '95px',
                    background: 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: 'var(--marble-base)',
                      borderRadius: '50%',
                      boxShadow: 'var(--raised-2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{ ...lpStyles('stamped'), fontFamily: 'var(--fing-font-mono)', fontSize: '22px', fontWeight: 700 }}>98</div>
                      <div style={{ ...lpStyles('whisper'), fontSize: '8px', letterSpacing: '0.08em' }}>SCORE</div>
                    </div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Performance Score</div>
              </div>

              {/* Emblem with Accent Ring */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, var(--fing-accent-tertiary), var(--fing-accent-primary))',
                  borderRadius: '50%',
                  boxShadow: 'var(--raised-3), 0 4px 20px rgba(58, 106, 114, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: 'var(--inset-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '75px',
                      height: '75px',
                      background: 'var(--marble-base)',
                      borderRadius: '50%',
                      boxShadow: 'var(--raised-2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '18px', fontWeight: 700 }}>TOP</div>
                      <div style={{ ...lpStyles('deep'), fontFamily: 'var(--fing-font-mono)', fontSize: '24px', fontWeight: 700 }}>5%</div>
                    </div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Percentile Rank</div>
              </div>

              {/* Emblem with Inner Badge */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: 'var(--marble-base)',
                  borderRadius: '50%',
                  boxShadow: 'var(--raised-4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '95px',
                    height: '95px',
                    background: 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: 'var(--inset-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '65px',
                      height: '65px',
                      background: 'linear-gradient(135deg, #ffd700, #ffb700)',
                      borderRadius: '50%',
                      boxShadow: 'var(--raised-2), 0 2px 8px rgba(255, 183, 0, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{ color: '#5a4800', fontSize: '20px' }}>★</div>
                      <div style={{ color: '#5a4800', fontFamily: 'var(--fing-font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em' }}>GOLD</div>
                    </div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Tier Status</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              STAT CARDS - Los originales
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Stat Cards Clásicas</div>
            <div style={grid(4, 16)}>
              <div style={statCardStyles}>
                <div style={statIconStyles}>💰</div>
                <div style={{ ...lpStyles('deep'), fontFamily: 'var(--fing-font-mono)', fontSize: '28px', fontWeight: 700 }}>$191K</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Portfolio</div>
              </div>
              <div style={statCardStyles}>
                <div style={statIconStyles}>📈</div>
                <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '28px', fontWeight: 700 }}>+16.5%</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Returns</div>
              </div>
              <div style={statCardStyles}>
                <div style={statIconStyles}>⚖️</div>
                <div style={{ ...lpColorStyles('warning'), fontFamily: 'var(--fing-font-mono)', fontSize: '28px', fontWeight: 700 }}>42</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Risk Score</div>
              </div>
              <div style={statCardStyles}>
                <div style={statIconStyles}>🎯</div>
                <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '28px', fontWeight: 700 }}>87%</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Confidence</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              MULTI-STAT PANELS
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Paneles Multi-Stat</div>
            <div style={grid(2, 20)}>
              {/* Panel with Hexagon Header */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '20px',
                boxShadow: 'var(--raised-3)',
                padding: '24px',
                position: 'relative',
              }}>
                {/* Hexagon badge at top */}
                <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
                  <div style={{
                    width: '50px',
                    height: '43px',
                    background: 'linear-gradient(135deg, var(--fing-accent-tertiary), var(--fing-accent-primary))',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    filter: 'drop-shadow(2px 2px 4px var(--shadow-dark))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ color: 'white', fontSize: '16px' }}>📊</span>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '12px', marginBottom: '16px' }}>
                  <div style={{ ...lpStyles('strong'), fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>PORTFOLIO OVERVIEW</div>
                </div>
                <div style={{
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  boxShadow: 'var(--inset-2)',
                  padding: '16px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...lpStyles('deep'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 700 }}>$247K</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '9px', letterSpacing: '0.08em' }}>TOTAL VALUE</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 700 }}>+12.4%</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '9px', letterSpacing: '0.08em' }}>YTD RETURN</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 700 }}>24</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '9px', letterSpacing: '0.08em' }}>HOLDINGS</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...lpColorStyles('warning'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 700 }}>38</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '9px', letterSpacing: '0.08em' }}>RISK SCORE</div>
                  </div>
                </div>
              </div>

              {/* Panel with Shield Badge */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '20px',
                boxShadow: 'var(--raised-3)',
                padding: '24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  {/* Shield */}
                  <div style={{
                    width: '60px',
                    height: '72px',
                    background: 'var(--marble-base)',
                    clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                    filter: 'drop-shadow(3px 3px 6px var(--shadow-dark)) drop-shadow(-3px -3px 6px var(--shadow-light))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <div style={{ ...lpColorStyles('positive'), fontSize: '20px' }}>✓</div>
                    <div style={{ ...lpStyles('whisper'), fontSize: '7px' }}>SAFE</div>
                  </div>
                  {/* Stats */}
                  <div style={{ flex: 1 }}>
                    <div style={{ ...lpStyles('strong'), fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>SECURITY STATUS</div>
                    <div style={{
                      background: 'var(--marble-base)',
                      borderRadius: '10px',
                      boxShadow: 'var(--inset-1)',
                      padding: '12px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                    }}>
                      <div>
                        <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '14px', fontWeight: 700 }}>100%</div>
                        <div style={{ ...lpStyles('whisper'), fontSize: '8px' }}>ENCRYPTED</div>
                      </div>
                      <div>
                        <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '14px', fontWeight: 700 }}>2FA</div>
                        <div style={{ ...lpStyles('whisper'), fontSize: '8px' }}>ENABLED</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Panel */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '20px',
                boxShadow: 'var(--raised-3)',
                padding: '24px',
                gridColumn: 'span 2',
              }}>
                <div style={{ ...lpStyles('strong'), fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center' }}>BENCHMARK COMPARISON</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                  {/* Your Portfolio */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'var(--marble-base)',
                      borderRadius: '50%',
                      boxShadow: 'var(--raised-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'var(--marble-base)',
                        borderRadius: '50%',
                        boxShadow: 'var(--inset-2)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '16px', fontWeight: 700 }}>+18%</div>
                      </div>
                    </div>
                    <div style={{ ...lpStyles('medium'), fontSize: '11px', fontWeight: 600 }}>YOUR PORTFOLIO</div>
                  </div>

                  {/* VS Divider */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '1px', height: '30px', background: 'var(--marble-dark)' }} />
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'var(--marble-base)',
                      borderRadius: '50%',
                      boxShadow: 'var(--inset-1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{ ...lpStyles('medium'), fontSize: '10px', fontWeight: 700 }}>VS</span>
                    </div>
                    <div style={{ width: '1px', height: '30px', background: 'var(--marble-dark)' }} />
                  </div>

                  {/* S&P 500 */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'var(--marble-base)',
                      borderRadius: '50%',
                      boxShadow: 'var(--raised-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'var(--marble-base)',
                        borderRadius: '50%',
                        boxShadow: 'var(--inset-2)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <div style={{ ...lpStyles('deep'), fontFamily: 'var(--fing-font-mono)', fontSize: '16px', fontWeight: 700 }}>+12%</div>
                      </div>
                    </div>
                    <div style={{ ...lpStyles('medium'), fontSize: '11px', fontWeight: 600 }}>S&P 500</div>
                  </div>

                  {/* Outperformance Badge */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, var(--fing-accent-tertiary), var(--fing-accent-primary))',
                      transform: 'rotate(45deg)',
                      borderRadius: '10px',
                      boxShadow: 'var(--raised-2), 0 4px 12px rgba(58, 106, 114, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                    }}>
                      <div style={{ transform: 'rotate(-45deg)', textAlign: 'center' }}>
                        <div style={{ color: 'white', fontFamily: 'var(--fing-font-mono)', fontSize: '16px', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>+6%</div>
                        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '7px', letterSpacing: '0.05em' }}>ALPHA</div>
                      </div>
                    </div>
                    <div style={{ ...lpColorStyles('teal'), fontSize: '11px', fontWeight: 600 }}>OUTPERFORM</div>
                  </div>
                </div>
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
                  <span style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '11px', fontWeight: 600 }}>{s.rank}</span>
                  <span style={{ ...lpStyles('strong'), fontFamily: 'var(--fing-font-mono)', fontSize: '14px', fontWeight: 600 }}>{s.sym}</span>
                  <span style={{ ...lpStyles('subtle'), fontSize: '12px' }}>{s.name}</span>
                  <span style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-mono)', fontSize: '14px', fontWeight: 500 }}>{s.price}</span>
                  <span style={{ ...(s.pos ? lpColorStyles('positive') : lpColorStyles('negative')), fontFamily: 'var(--fing-font-mono)', fontSize: '13px', fontWeight: 500 }}>{s.change}</span>
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
                    <span style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-mono)', fontSize: '13px', fontWeight: 600 }}>{sym}</span>
                    <span style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '12px', fontWeight: 500 }}>+{(Math.random() * 3).toFixed(2)}%</span>
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
          {/* ═══════════════════════════════════════════════════════════════════════════
              GEOMETRIC SHAPES - Formas básicas con relief
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Formas Geométricas - Raised</div>
            <div style={flex('center', 'center', 20)}>
              {/* Circle */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '48px', height: '48px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-2)' }} />
                <div style={demoLabelStyles}>Circle</div>
              </div>
              {/* Square */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '48px', height: '48px', background: 'var(--marble-base)', borderRadius: '8px', boxShadow: 'var(--raised-2)' }} />
                <div style={demoLabelStyles}>Square</div>
              </div>
              {/* Pill Horizontal */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '80px', height: '32px', background: 'var(--marble-base)', borderRadius: '100px', boxShadow: 'var(--raised-2)' }} />
                <div style={demoLabelStyles}>Pill H</div>
              </div>
              {/* Pill Vertical */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '32px', height: '80px', background: 'var(--marble-base)', borderRadius: '100px', boxShadow: 'var(--raised-2)' }} />
                <div style={demoLabelStyles}>Pill V</div>
              </div>
              {/* Diamond */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '40px', height: '40px', background: 'var(--marble-base)', transform: 'rotate(45deg)', borderRadius: '6px', boxShadow: 'var(--raised-2)' }} />
                <div style={demoLabelStyles}>Diamond</div>
              </div>
              {/* Hexagon */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '52px', height: '45px', background: 'var(--marble-base)', clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', boxShadow: 'var(--raised-2)', filter: 'drop-shadow(3px 3px 6px var(--shadow-dark)) drop-shadow(-3px -3px 6px var(--shadow-light))' }} />
                <div style={demoLabelStyles}>Hexagon</div>
              </div>
              {/* Octagon */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '48px', height: '48px', background: 'var(--marble-base)', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', filter: 'drop-shadow(3px 3px 6px var(--shadow-dark)) drop-shadow(-3px -3px 6px var(--shadow-light))' }} />
                <div style={demoLabelStyles}>Octagon</div>
              </div>
              {/* Shield */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '44px', height: '52px', background: 'var(--marble-base)', clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)', filter: 'drop-shadow(3px 3px 6px var(--shadow-dark)) drop-shadow(-3px -3px 6px var(--shadow-light))' }} />
                <div style={demoLabelStyles}>Shield</div>
              </div>
            </div>
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Formas Geométricas - Inset</div>
            <div style={flex('center', 'center', 20)}>
              {/* Circle */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '48px', height: '48px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-2)' }} />
                <div style={demoLabelStyles}>Circle</div>
              </div>
              {/* Square */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '48px', height: '48px', background: 'var(--marble-base)', borderRadius: '8px', boxShadow: 'var(--inset-2)' }} />
                <div style={demoLabelStyles}>Square</div>
              </div>
              {/* Pill */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '80px', height: '32px', background: 'var(--marble-base)', borderRadius: '100px', boxShadow: 'var(--inset-2)' }} />
                <div style={demoLabelStyles}>Pill</div>
              </div>
              {/* Stadium */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '100px', height: '40px', background: 'var(--marble-base)', borderRadius: '20px', boxShadow: 'var(--inset-2)' }} />
                <div style={demoLabelStyles}>Stadium</div>
              </div>
              {/* Squircle */}
              <div style={showcaseItemStyles}>
                <div style={{ width: '48px', height: '48px', background: 'var(--marble-base)', borderRadius: '35%', boxShadow: 'var(--inset-2)' }} />
                <div style={demoLabelStyles}>Squircle</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              THIN RAISED BORDERS - Bordes finos elevados
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Bordes Finos Elevados</div>
            <div style={grid(3, 20)}>
              {/* Simple Frame */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '120px',
                  height: '80px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  border: '2px solid var(--marble-base)',
                  boxShadow: '0 0 0 2px var(--shadow-dark), 0 0 0 4px var(--shadow-light), var(--raised-1)',
                }} />
                <div style={demoLabelStyles}>Simple Frame</div>
              </div>
              {/* Double Frame */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '120px',
                  height: '80px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  boxShadow: `
                    inset 0 0 0 3px var(--marble-base),
                    inset 0 0 0 4px var(--shadow-dark),
                    inset 0 0 0 6px var(--shadow-light),
                    var(--raised-2)
                  `,
                }} />
                <div style={demoLabelStyles}>Double Frame</div>
              </div>
              {/* Ridge Frame */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '120px',
                  height: '80px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  boxShadow: `
                    inset 0 0 0 1px var(--shadow-light),
                    inset 0 0 0 3px var(--marble-dark),
                    inset 0 0 0 4px var(--shadow-light),
                    var(--raised-2)
                  `,
                }} />
                <div style={demoLabelStyles}>Ridge Frame</div>
              </div>
              {/* Groove Frame */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '120px',
                  height: '80px',
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  boxShadow: `
                    inset 2px 2px 4px var(--shadow-dark),
                    inset -2px -2px 4px var(--shadow-light),
                    inset 0 0 0 8px var(--marble-base),
                    inset 0 0 0 10px var(--shadow-dark),
                    inset 0 0 0 12px var(--shadow-light)
                  `,
                }} />
                <div style={demoLabelStyles}>Groove Frame</div>
              </div>
              {/* Bevel Frame */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '120px',
                  height: '80px',
                  background: 'var(--marble-base)',
                  borderRadius: '4px',
                  boxShadow: `
                    inset 1px 1px 0 var(--shadow-light),
                    inset -1px -1px 0 var(--shadow-dark),
                    3px 3px 6px var(--shadow-dark),
                    -3px -3px 6px var(--shadow-light)
                  `,
                }} />
                <div style={demoLabelStyles}>Bevel Frame</div>
              </div>
              {/* Pill Frame */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '140px',
                  height: '50px',
                  background: 'var(--marble-base)',
                  borderRadius: '25px',
                  boxShadow: `
                    inset 0 0 0 2px var(--marble-light),
                    inset 0 0 0 4px var(--shadow-dark),
                    var(--raised-2)
                  `,
                }} />
                <div style={demoLabelStyles}>Pill Frame</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              VISUAL ACCENTS - Acentos visuales y líneas
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Líneas y Acentos</div>
            <div style={{ display: 'grid', gap: '24px' }}>
              {/* Thin Lines */}
              <div style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center' }}>
                <div style={showcaseItemStyles}>
                  <div style={{ width: '100px', height: '2px', background: 'var(--marble-base)', boxShadow: '1px 1px 2px var(--shadow-dark), -1px -1px 2px var(--shadow-light)' }} />
                  <div style={demoLabelStyles}>Raised Line</div>
                </div>
                <div style={showcaseItemStyles}>
                  <div style={{ width: '100px', height: '2px', background: 'var(--marble-base)', boxShadow: 'inset 1px 1px 2px var(--shadow-dark), inset -1px -1px 2px var(--shadow-light)' }} />
                  <div style={demoLabelStyles}>Inset Line</div>
                </div>
                <div style={showcaseItemStyles}>
                  <div style={{ width: '100px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--shadow-dark), var(--shadow-light), transparent)' }} />
                  <div style={demoLabelStyles}>Gradient Line</div>
                </div>
              </div>
              {/* Grooves */}
              <div style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center' }}>
                <div style={showcaseItemStyles}>
                  <div style={{ width: '120px', height: '6px', background: 'var(--marble-base)', borderRadius: '3px', boxShadow: 'var(--inset-2)' }} />
                  <div style={demoLabelStyles}>Wide Groove</div>
                </div>
                <div style={showcaseItemStyles}>
                  <div style={{ width: '6px', height: '60px', background: 'var(--marble-base)', borderRadius: '3px', boxShadow: 'var(--inset-2)' }} />
                  <div style={demoLabelStyles}>Vertical Groove</div>
                </div>
                <div style={showcaseItemStyles}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{ width: '3px', height: '40px', background: 'var(--marble-base)', borderRadius: '2px', boxShadow: 'var(--inset-1)' }} />
                    ))}
                  </div>
                  <div style={demoLabelStyles}>Ridges</div>
                </div>
              </div>
              {/* Decorative Separators */}
              <div style={{ ...insetStyles(2), padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Ornate Divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--shadow-dark))' }} />
                    <div style={{ width: '8px', height: '8px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-1)' }} />
                    <div style={{ width: '12px', height: '12px', background: 'var(--marble-base)', transform: 'rotate(45deg)', boxShadow: 'var(--raised-2)' }} />
                    <div style={{ width: '8px', height: '8px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-1)' }} />
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--shadow-dark), transparent)' }} />
                  </div>
                  {/* Triple Line */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                    <div style={{ width: '60%', height: '1px', background: 'var(--shadow-dark)' }} />
                    <div style={{ width: '40%', height: '2px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)', borderRadius: '1px' }} />
                    <div style={{ width: '60%', height: '1px', background: 'var(--shadow-light)' }} />
                  </div>
                  {/* Dots Separator */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                      <div key={i} style={{
                        width: i === 4 ? '10px' : '6px',
                        height: i === 4 ? '10px' : '6px',
                        background: 'var(--marble-base)',
                        borderRadius: '50%',
                        boxShadow: i === 4 ? 'var(--raised-2)' : 'var(--raised-1)',
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              INFORMATION CONTAINERS - Elementos para presentar información
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Contenedores de Información</div>
            <div style={grid(2, 20)}>
              {/* Callout Box */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--raised-2)',
                padding: '20px',
                borderLeft: '4px solid var(--fing-accent-primary)',
              }}>
                <div style={{ ...lpColorStyles('teal'), fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>CALLOUT</div>
                <div style={{ ...lpStyles('medium'), fontSize: '14px', lineHeight: 1.5 }}>Important information highlighted with accent border.</div>
              </div>

              {/* Quote Block */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--inset-2)',
                padding: '20px',
                position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '32px', ...lpStyles('whisper'), opacity: 0.3 }}>"</div>
                <div style={{ ...lpStyles('medium'), fontSize: '14px', fontStyle: 'italic', lineHeight: 1.6, paddingLeft: '20px' }}>Information presented as a quote or highlight.</div>
              </div>

              {/* Stat Box with Border */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: `var(--raised-2), inset 0 0 0 1px var(--shadow-light), inset 0 0 0 2px var(--shadow-dark)`,
                padding: '24px',
                textAlign: 'center',
              }}>
                <div style={{ ...lpStyles('whisper'), fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>PORTFOLIO VALUE</div>
                <div style={{ ...lpStyles('stamped'), fontFamily: 'var(--fing-font-mono)', fontSize: '32px', fontWeight: 700 }}>$191,856</div>
                <div style={{ ...lpColorStyles('positive'), fontFamily: 'var(--fing-font-mono)', fontSize: '13px', marginTop: '4px' }}>+16.5%</div>
              </div>

              {/* Label Card */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--raised-2)',
                overflow: 'hidden',
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, var(--fing-accent-tertiary), var(--fing-accent-primary))',
                  padding: '10px 20px',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>Premium Feature</div>
                <div style={{ padding: '20px' }}>
                  <div style={{ ...lpStyles('medium'), fontSize: '14px', lineHeight: 1.5 }}>Content with a colored header label.</div>
                </div>
              </div>

              {/* Inset Info Panel */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '20px',
                boxShadow: 'var(--raised-3)',
                padding: '20px',
              }}>
                <div style={{
                  background: 'var(--marble-base)',
                  borderRadius: '12px',
                  boxShadow: 'var(--inset-2)',
                  padding: '16px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...lpStyles('whisper'), fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>RISK</div>
                    <div style={{ ...lpColorStyles('warning'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 700 }}>42</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ ...lpStyles('whisper'), fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SCORE</div>
                    <div style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '20px', fontWeight: 700 }}>87</div>
                  </div>
                </div>
              </div>

              {/* Numbered List Item */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--raised-2)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--marble-base)',
                  borderRadius: '50%',
                  boxShadow: 'var(--inset-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...lpColorStyles('teal'),
                  fontFamily: 'var(--fing-font-mono)',
                  fontSize: '16px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>01</div>
                <div style={{ ...lpStyles('medium'), fontSize: '14px' }}>Numbered list item with inset number badge.</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              SEALS & BADGES - Sellos y emblemas decorativos
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Sellos y Emblemas</div>
            <div style={flex('center', 'center', 32)}>
              {/* Classic Emblem */}
              <div style={showcaseItemStyles}>
                <div style={emblemStyles}>
                  <div style={emblemInnerStyles}>
                    <span style={{ ...lpStyles('stamped'), fontFamily: 'var(--fing-font-display)', fontSize: '32px', fontWeight: 700 }}>S</span>
                  </div>
                </div>
                <div style={demoLabelStyles}>Classic Emblem</div>
              </div>

              {/* Ring Emblem */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: 'var(--marble-base)',
                  borderRadius: '50%',
                  boxShadow: 'var(--raised-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--marble-base)',
                      borderRadius: '50%',
                      boxShadow: 'var(--raised-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{ ...lpStyles('deep'), fontSize: '24px' }}>★</span>
                    </div>
                  </div>
                </div>
                <div style={demoLabelStyles}>Ring Emblem</div>
              </div>

              {/* Certificate Seal */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  background: 'linear-gradient(135deg, var(--fing-accent-tertiary), var(--fing-accent-primary))',
                  borderRadius: '50%',
                  boxShadow: 'var(--raised-3), inset 0 2px 4px rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ ...lpStyles('strong'), fontSize: '10px', letterSpacing: '0.1em' }}>VERIFIED</span>
                    <span style={{ ...lpColorStyles('teal'), fontSize: '20px', marginTop: '2px' }}>✓</span>
                  </div>
                </div>
                <div style={demoLabelStyles}>Verified Seal</div>
              </div>

              {/* Hexagon Badge */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '90px',
                  height: '78px',
                  background: 'var(--marble-base)',
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  filter: 'drop-shadow(4px 4px 8px var(--shadow-dark)) drop-shadow(-4px -4px 8px var(--shadow-light))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '70px',
                    height: '60px',
                    background: 'var(--marble-base)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ ...lpColorStyles('teal'), fontFamily: 'var(--fing-font-mono)', fontSize: '18px', fontWeight: 700 }}>PRO</span>
                  </div>
                </div>
                <div style={demoLabelStyles}>Hex Badge</div>
              </div>

              {/* Shield Badge */}
              <div style={showcaseItemStyles}>
                <div style={{
                  width: '70px',
                  height: '84px',
                  background: 'var(--marble-base)',
                  clipPath: 'polygon(50% 0%, 100% 15%, 100% 65%, 50% 100%, 0% 65%, 0% 15%)',
                  filter: 'drop-shadow(4px 4px 8px var(--shadow-dark)) drop-shadow(-4px -4px 8px var(--shadow-light))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: '8px',
                }}>
                  <span style={{ ...lpStyles('deep'), fontSize: '24px' }}>🛡</span>
                  <span style={{ ...lpStyles('strong'), fontSize: '8px', letterSpacing: '0.08em', marginTop: '4px' }}>SECURE</span>
                </div>
                <div style={demoLabelStyles}>Shield Badge</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              CORNER DECORATIONS & FLOURISHES
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Decoraciones de Esquina</div>
            <div style={grid(3, 20)}>
              {/* Corner Dots */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--raised-2)',
                padding: '24px',
                position: 'relative',
                minHeight: '100px',
              }}>
                {/* Top-left */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '6px', height: '6px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-1)' }} />
                {/* Top-right */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '6px', height: '6px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-1)' }} />
                {/* Bottom-left */}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '6px', height: '6px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-1)' }} />
                {/* Bottom-right */}
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '6px', height: '6px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-1)' }} />
                <div style={{ textAlign: 'center', ...lpStyles('medium'), fontSize: '12px' }}>Corner Dots</div>
              </div>

              {/* Corner Lines */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--raised-2)',
                padding: '24px',
                position: 'relative',
                minHeight: '100px',
              }}>
                {/* Top-left corner */}
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  <div style={{ width: '20px', height: '2px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)' }} />
                  <div style={{ width: '2px', height: '20px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)' }} />
                </div>
                {/* Top-right corner */}
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <div style={{ width: '20px', height: '2px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)', marginLeft: 'auto' }} />
                  <div style={{ width: '2px', height: '20px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)', marginLeft: 'auto' }} />
                </div>
                {/* Bottom-left corner */}
                <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                  <div style={{ width: '2px', height: '20px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)' }} />
                  <div style={{ width: '20px', height: '2px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)' }} />
                </div>
                {/* Bottom-right corner */}
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ width: '2px', height: '20px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)' }} />
                  <div style={{ width: '20px', height: '2px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)' }} />
                </div>
                <div style={{ textAlign: 'center', ...lpStyles('medium'), fontSize: '12px' }}>Corner Lines</div>
              </div>

              {/* Corner Accents */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--raised-2)',
                padding: '24px',
                position: 'relative',
                minHeight: '100px',
              }}>
                {/* Teal accent corners */}
                <div style={{ position: 'absolute', top: '0', left: '0', width: '24px', height: '24px', borderTopLeftRadius: '16px', borderTop: '3px solid var(--fing-accent-primary)', borderLeft: '3px solid var(--fing-accent-primary)' }} />
                <div style={{ position: 'absolute', top: '0', right: '0', width: '24px', height: '24px', borderTopRightRadius: '16px', borderTop: '3px solid var(--fing-accent-primary)', borderRight: '3px solid var(--fing-accent-primary)' }} />
                <div style={{ position: 'absolute', bottom: '0', left: '0', width: '24px', height: '24px', borderBottomLeftRadius: '16px', borderBottom: '3px solid var(--fing-accent-primary)', borderLeft: '3px solid var(--fing-accent-primary)' }} />
                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '24px', height: '24px', borderBottomRightRadius: '16px', borderBottom: '3px solid var(--fing-accent-primary)', borderRight: '3px solid var(--fing-accent-primary)' }} />
                <div style={{ textAlign: 'center', ...lpStyles('medium'), fontSize: '12px' }}>Corner Accents</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              ORNAMENTAL DIVIDERS
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Divisores Ornamentales</div>
            <div style={{ display: 'grid', gap: '32px', padding: '20px 0' }}>
              {/* Classic Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, height: '2px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)', borderRadius: '1px' }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '6px', height: '6px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-1)' }} />
                  <div style={{ width: '10px', height: '10px', background: 'var(--marble-base)', transform: 'rotate(45deg)', boxShadow: 'var(--raised-2)' }} />
                  <div style={{ width: '6px', height: '6px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-1)' }} />
                </div>
                <div style={{ flex: 1, height: '2px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)', borderRadius: '1px' }} />
              </div>

              {/* Pill Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '3px', background: 'var(--marble-base)', boxShadow: 'var(--inset-1)', borderRadius: '2px' }} />
                <div style={{ padding: '6px 20px', background: 'var(--marble-base)', borderRadius: '100px', boxShadow: 'var(--raised-2)' }}>
                  <span style={{ ...lpStyles('soft'), fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>SECTION</span>
                </div>
                <div style={{ flex: 1, height: '3px', background: 'var(--marble-base)', boxShadow: 'var(--inset-1)', borderRadius: '2px' }} />
              </div>

              {/* Wave Dots */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                {[4, 6, 8, 10, 12, 10, 8, 6, 4].map((size, i) => (
                  <div key={i} style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: i === 4 ? 'var(--fing-accent-primary)' : 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: i === 4 ? 'var(--raised-2)' : 'var(--raised-1)',
                  }} />
                ))}
              </div>

              {/* Emblem Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--shadow-dark))' }} />
                  <div style={{ width: '4px', height: '4px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-1)' }} />
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'var(--marble-base)',
                  borderRadius: '50%',
                  boxShadow: 'var(--raised-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'var(--marble-base)',
                    borderRadius: '50%',
                    boxShadow: 'var(--inset-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ ...lpStyles('medium'), fontSize: '14px' }}>◆</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '4px', height: '4px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-1)' }} />
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--shadow-dark), transparent)' }} />
                </div>
              </div>

              {/* Teal Accent Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, transparent, var(--fing-accent-primary))', borderRadius: '1px' }} />
                <div style={{ width: '40px', height: '4px', background: 'linear-gradient(90deg, var(--fing-accent-tertiary), var(--fing-accent-primary))', borderRadius: '2px', boxShadow: '0 2px 4px rgba(58, 106, 114, 0.3)' }} />
                <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, var(--fing-accent-primary), transparent)', borderRadius: '1px' }} />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              STATUS & INDICATOR DOTS
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Indicadores de Estado</div>
            <div style={flex('center', 'center', 32)}>
              {/* Status Dots */}
              <div style={showcaseItemStyles}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { color: '#4a7a6a', label: 'Active' },
                    { color: '#a08a4a', label: 'Pending' },
                    { color: '#8a5a4a', label: 'Error' },
                    { color: 'var(--marble-dark)', label: 'Inactive' },
                  ].map(status => (
                    <div key={status.label} style={{
                      width: '12px',
                      height: '12px',
                      background: status.color,
                      borderRadius: '50%',
                      boxShadow: `var(--raised-1), 0 0 8px ${status.color}40`,
                    }} />
                  ))}
                </div>
                <div style={demoLabelStyles}>Status Dots</div>
              </div>

              {/* Pips (Rating) */}
              <div style={showcaseItemStyles}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                      width: '10px',
                      height: '10px',
                      background: i <= 3 ? 'var(--fing-accent-primary)' : 'var(--marble-base)',
                      borderRadius: '50%',
                      boxShadow: i <= 3 ? 'var(--raised-1)' : 'var(--inset-1)',
                    }} />
                  ))}
                </div>
                <div style={demoLabelStyles}>Rating Pips (3/5)</div>
              </div>

              {/* Step Indicator */}
              <div style={showcaseItemStyles}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[1, 2, 3, 4].map(i => (
                    <React.Fragment key={i}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        background: i <= 2 ? 'var(--fing-accent-primary)' : 'var(--marble-base)',
                        borderRadius: '50%',
                        boxShadow: i <= 2 ? 'var(--raised-1)' : 'var(--inset-1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: i <= 2 ? 'white' : 'var(--marble-dark)',
                      }}>{i}</div>
                      {i < 4 && <div style={{ width: '20px', height: '2px', background: i < 2 ? 'var(--fing-accent-primary)' : 'var(--marble-base)', boxShadow: i < 2 ? 'none' : 'var(--inset-1)', borderRadius: '1px' }} />}
                    </React.Fragment>
                  ))}
                </div>
                <div style={demoLabelStyles}>Step Indicator</div>
              </div>

              {/* Signal Bars */}
              <div style={showcaseItemStyles}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '24px' }}>
                  {[6, 10, 14, 18, 22].map((h, i) => (
                    <div key={i} style={{
                      width: '5px',
                      height: `${h}px`,
                      background: i < 3 ? 'var(--fing-accent-primary)' : 'var(--marble-base)',
                      borderRadius: '2px',
                      boxShadow: i < 3 ? 'var(--raised-1)' : 'var(--inset-1)',
                    }} />
                  ))}
                </div>
                <div style={demoLabelStyles}>Signal Bars</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              DECORATIVE HEADER EXAMPLE
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Header Decorativo Completo</div>
            <div style={{ ...raisedStyles(4), padding: '32px', textAlign: 'center' }}>
              {/* Top ornament */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '2px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)', borderRadius: '1px' }} />
                <div style={{ width: '6px', height: '6px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-1)' }} />
                <div style={{ width: '70px', height: '70px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--raised-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '50px', height: '50px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ ...lpStyles('stamped'), fontFamily: 'var(--fing-font-display)', fontSize: '24px', fontWeight: 700 }}>S</span>
                  </div>
                </div>
                <div style={{ width: '6px', height: '6px', background: 'var(--marble-base)', borderRadius: '50%', boxShadow: 'var(--inset-1)' }} />
                <div style={{ width: '40px', height: '2px', background: 'var(--marble-base)', boxShadow: 'var(--raised-1)', borderRadius: '1px' }} />
              </div>

              {/* Title */}
              <div style={{ ...lpStyles('monumental'), fontFamily: 'var(--fing-font-display)', fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em' }}>FING</div>
              <div style={{ ...lpStyles('medium'), marginTop: '8px', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Investment Analytics Platform</div>

              {/* Bottom ornament */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                <div style={{ width: '60px', height: '3px', background: 'var(--marble-base)', borderRadius: '2px', boxShadow: 'var(--inset-1)' }} />
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{
                      width: i === 2 ? '10px' : '6px',
                      height: i === 2 ? '10px' : '6px',
                      background: i === 2 ? 'var(--fing-accent-primary)' : 'var(--marble-base)',
                      borderRadius: '50%',
                      boxShadow: i === 2 ? 'var(--raised-2)' : 'var(--raised-1)',
                    }} />
                  ))}
                </div>
                <div style={{ width: '60px', height: '3px', background: 'var(--marble-base)', borderRadius: '2px', boxShadow: 'var(--inset-1)' }} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ICON CONTAINERS */}
      {section === 'icons' && (
        <>
          {/* ═══════════════════════════════════════════════════════════════════════════
              CIRCLE INSET + RAISED ICON - Para títulos de secciones
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Circle Inset + Raised Icon (Títulos)</div>
            <p style={{ ...lpStyles('soft'), fontSize: '13px', marginBottom: '24px', lineHeight: 1.6 }}>
              Contenedor circular con efecto INSET que envuelve un icono con efecto RAISED mediante drop-shadow.
              El icono puede usar color de marca (teal) para destacar.
            </p>
            <div style={flex('center', 'flex-start', 32)}>
              {/* Neutral Icon */}
              <div style={showcaseItemStyles}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 1.5px 1.5px 3px var(--shadow-dark), inset -1.5px -1.5px 3px var(--shadow-light)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'var(--marble-dark)',
                      filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                    }}
                  >📊</span>
                </span>
                <div style={demoLabelStyles}>Neutral</div>
              </div>

              {/* Accent Icon (Teal) */}
              <div style={showcaseItemStyles}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 1.5px 1.5px 3px var(--shadow-dark), inset -1.5px -1.5px 3px var(--shadow-light)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'var(--fing-accent-primary)',
                      filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                    }}
                  >📈</span>
                </span>
                <div style={demoLabelStyles}>Accent (Teal)</div>
              </div>

              {/* Small Size */}
              <div style={showcaseItemStyles}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 1.5px 1.5px 3px var(--shadow-dark), inset -1.5px -1.5px 3px var(--shadow-light)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--fing-accent-primary)',
                      filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                    }}
                  >💼</span>
                </span>
                <div style={demoLabelStyles}>Small (24px)</div>
              </div>

              {/* Large Size */}
              <div style={showcaseItemStyles}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--marble-base)',
                    boxShadow: 'inset 2px 2px 4px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '18px',
                      color: 'var(--fing-accent-primary)',
                      filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                    }}
                  >🔔</span>
                </span>
                <div style={demoLabelStyles}>Large (36px)</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              USO EN TÍTULOS - Ejemplo práctico
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Uso en Títulos de Sección</div>
            <div style={grid(2, 24)}>
              {/* Title with neutral icon */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--raised-2)',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--marble-base)',
                      boxShadow: 'inset 1.5px 1.5px 3px var(--shadow-dark), inset -1.5px -1.5px 3px var(--shadow-light)',
                    }}
                  >
                    <span style={{ fontSize: '14px', color: 'var(--marble-dark)', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }}>📊</span>
                  </span>
                  <span style={{ ...lpStyles('strong'), fontSize: '16px', fontWeight: 600 }}>Analytics</span>
                </div>
                <div style={{ ...lpStyles('soft'), fontSize: '13px', lineHeight: 1.5 }}>Icono neutral para secciones secundarias.</div>
              </div>

              {/* Title with accent icon */}
              <div style={{
                background: 'var(--marble-base)',
                borderRadius: '16px',
                boxShadow: 'var(--raised-2)',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--marble-base)',
                      boxShadow: 'inset 1.5px 1.5px 3px var(--shadow-dark), inset -1.5px -1.5px 3px var(--shadow-light)',
                    }}
                  >
                    <span style={{ fontSize: '14px', color: 'var(--fing-accent-primary)', filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))' }}>📈</span>
                  </span>
                  <span style={{ ...lpStyles('strong'), fontSize: '16px', fontWeight: 600 }}>Recommendations</span>
                </div>
                <div style={{ ...lpStyles('soft'), fontSize: '13px', lineHeight: 1.5 }}>Icono con color de marca para secciones principales.</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              CÓDIGO DE REFERENCIA
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Código de Referencia</div>
            <div style={{ ...insetStyles(2), padding: '24px' }}>
              <pre style={{
                fontFamily: 'var(--fing-font-mono)',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                margin: 0,
                whiteSpace: 'pre-wrap',
              }}>
{`/* CIRCLE INSET CONTAINER */
.iconContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;                    /* 24px small, 28px medium, 36px large */
  height: 28px;
  border-radius: 50%;
  background: var(--marble-base);
  box-shadow:
    inset 1.5px 1.5px 3px var(--shadow-dark),
    inset -1.5px -1.5px 3px var(--shadow-light);
}

/* RAISED ICON (via drop-shadow filter) */
.iconRaised {
  color: var(--fing-accent-primary);  /* o var(--marble-dark) para neutral */
  filter:
    drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9))
    drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4));
}

/* JERARQUÍA */
Card RAISED
  └── Title (flex row)
        └── Circle INSET container (28x28px)
              └── Icon RAISED (color accent + drop-shadow)`}
              </pre>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════════
              VARIANTES DE TAMAÑO
              ═══════════════════════════════════════════════════════════════════════════ */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Tabla de Tamaños</div>
            <div style={{ ...insetStyles(2), padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 80px 100px 1fr', gap: '16px', alignItems: 'center' }}>
                <div style={{ ...lpStyles('whisper'), fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Size</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Container</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Icon</div>
                <div style={{ ...lpStyles('whisper'), fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Uso</div>

                <div style={{ ...lpStyles('medium'), fontSize: '12px' }}>Small</div>
                <div style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>24px</div>
                <div style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>12-13px</div>
                <div style={{ ...lpStyles('soft'), fontSize: '12px' }}>Títulos de chart, headers pequeños</div>

                <div style={{ ...lpStyles('medium'), fontSize: '12px' }}>Medium</div>
                <div style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>28px</div>
                <div style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>14-15px</div>
                <div style={{ ...lpStyles('soft'), fontSize: '12px' }}>Títulos de card, secciones principales</div>

                <div style={{ ...lpStyles('medium'), fontSize: '12px' }}>Large</div>
                <div style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>36px</div>
                <div style={{ ...lpStyles('medium'), fontFamily: 'var(--fing-font-mono)', fontSize: '12px' }}>18-20px</div>
                <div style={{ ...lpStyles('soft'), fontSize: '12px' }}>Headers de página, KPIs destacados</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StoneMarbleShowcase;
