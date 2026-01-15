// Path: src/pages/Home.tsx
import { Link } from 'react-router-dom';
import {
  LogIn, TrendingUp, DollarSign, BarChart2, Activity,
  Bell, Settings, ChevronRight, Zap, Star, ArrowUpRight
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM: GLASS-NEUMORPHISM (Combinación)
//
// Glassmorphism = TEXTURA/MATERIAL (transparencia, blur, backdrop-filter)
// Neumorphism   = VOLUMEN (sombras raised hacia afuera, inset hacia dentro)
//
// Jerarquía de capas:
// 0. Background      → Imagen colorida para ver la transparencia
// 1. Glass Panel     → Glass (blur 20px, 50% opacity) + Neu raised (sombras afuera)
// 1.5. Glass Inset   → Glass pulido (blur 10px, 25% opacity) + Neu inset (sombras dentro)
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// GLASSMORPHISM CONFIG (basado en ui.glass)
// ─────────────────────────────────────────────────────────────────────────────
const GLASS = {
  // Panel principal (outer)
  blur: 20,
  saturation: 120,
  bgColor: '17, 25, 40',
  bgOpacity: 0.5,
  borderOpacity: 0.125,
  // Inset (inner - vidrio fino cavado, muy transparente)
  insetBlur: 2,
  insetSaturation: 150,
  insetBgOpacity: 0.08,  // Casi transparente (vidrio fino cavado)
};

// ─────────────────────────────────────────────────────────────────────────────
// NEUMORPHISM CONFIG (basado en neumorphism.io)
// Para el VOLUMEN de los contenedores
// ─────────────────────────────────────────────────────────────────────────────
const NEU = {
  // Sombras para raised (contenedores principales)
  raisedDistance: 13,
  raisedBlur: 26,
  shadowDark: 'rgba(0, 0, 0, 0.5)',
  shadowLight: 'rgba(255, 255, 255, 0.1)',
  // Sombras para inset (contenedores internos)
  insetDistance: 5,
  insetBlur: 10,
};

export function Home() {
  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 0: BACKGROUND
  // Imagen colorida para ver la transparencia del glass
  // ═══════════════════════════════════════════════════════════════════════════
  const pageBackground: React.CSSProperties = {
    minHeight: '100vh',
    padding: '40px',
    background: `
      radial-gradient(
        ellipse 80% 50% at 20% 40%,
        rgba(120, 0, 255, 0.5) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse 60% 40% at 80% 20%,
        rgba(255, 0, 128, 0.4) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse 70% 50% at 50% 80%,
        rgba(0, 200, 255, 0.4) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse 50% 30% at 90% 70%,
        rgba(255, 200, 0, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse 40% 40% at 10% 90%,
        rgba(0, 255, 150, 0.3) 0%,
        transparent 50%
      ),
      linear-gradient(
        135deg,
        #0f0c29 0%,
        #302b63 50%,
        #24243e 100%
      )
    `,
    backgroundAttachment: 'fixed',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 1: GLASS PANEL + NEU RAISED
  // Glassmorphism (textura) + Neumorphism (volumen hacia afuera)
  // ═══════════════════════════════════════════════════════════════════════════
  const glassNeuPanel: React.CSSProperties = {
    // GLASS - Textura/Material
    backdropFilter: `blur(${GLASS.blur}px) saturate(${GLASS.saturation}%)`,
    WebkitBackdropFilter: `blur(${GLASS.blur}px) saturate(${GLASS.saturation}%)`,
    background: `rgba(${GLASS.bgColor}, ${GLASS.bgOpacity})`,
    border: `1px solid rgba(255, 255, 255, ${GLASS.borderOpacity})`,
    // NEU - Volumen (raised)
    boxShadow: `
      ${NEU.raisedDistance}px ${NEU.raisedDistance}px ${NEU.raisedBlur}px ${NEU.shadowDark},
      -${NEU.raisedDistance}px -${NEU.raisedDistance}px ${NEU.raisedBlur}px ${NEU.shadowLight}
    `,
    borderRadius: '16px',
    padding: '32px',
    position: 'relative' as const,
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 1.5: GLASS INSET + NEU INSET
  // Glass más pulido y transparente + Neumorphism hundido
  // ═══════════════════════════════════════════════════════════════════════════
  const glassNeuInset: React.CSSProperties = {
    // GLASS - Más pulido (menos blur, más saturación, más transparente)
    backdropFilter: `blur(${GLASS.insetBlur}px) saturate(${GLASS.insetSaturation}%)`,
    WebkitBackdropFilter: `blur(${GLASS.insetBlur}px) saturate(${GLASS.insetSaturation}%)`,
    background: `rgba(${GLASS.bgColor}, ${GLASS.insetBgOpacity})`,
    border: `1px solid rgba(255, 255, 255, ${GLASS.borderOpacity})`,
    // NEU - Volumen (inset/hundido)
    boxShadow: `
      inset ${NEU.insetDistance}px ${NEU.insetDistance}px ${NEU.insetBlur}px ${NEU.shadowDark},
      inset -${NEU.insetDistance}px -${NEU.insetDistance}px ${NEU.insetBlur}px ${NEU.shadowLight}
    `,
    borderRadius: '12px',
  };

  // Variante pequeña del inset
  const glassNeuInsetSm: React.CSSProperties = {
    backdropFilter: `blur(${GLASS.insetBlur}px) saturate(${GLASS.insetSaturation}%)`,
    WebkitBackdropFilter: `blur(${GLASS.insetBlur}px) saturate(${GLASS.insetSaturation}%)`,
    background: `rgba(${GLASS.bgColor}, ${GLASS.insetBgOpacity})`,
    border: `1px solid rgba(255, 255, 255, ${GLASS.borderOpacity})`,
    boxShadow: `
      inset 3px 3px 6px ${NEU.shadowDark},
      inset -3px -3px 6px ${NEU.shadowLight}
    `,
    borderRadius: '8px',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // FLOATING ELEMENTS (Glass + Neu raised)
  // ═══════════════════════════════════════════════════════════════════════════
  const glassNeuFloating: React.CSSProperties = {
    backdropFilter: `blur(${GLASS.blur}px) saturate(${GLASS.saturation}%)`,
    WebkitBackdropFilter: `blur(${GLASS.blur}px) saturate(${GLASS.saturation}%)`,
    background: `rgba(${GLASS.bgColor}, 0.6)`,
    border: `1px solid rgba(255, 255, 255, ${GLASS.borderOpacity})`,
    boxShadow: `
      8px 8px 16px ${NEU.shadowDark},
      -8px -8px 16px ${NEU.shadowLight}
    `,
    borderRadius: '12px',
  };

  // Button (Glass + Neu)
  const glassNeuButton: React.CSSProperties = {
    ...glassNeuFloating,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    color: '#E2E8F0',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'var(--sentinel-font-mono)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  // Badge (Glass + Neu small)
  const glassNeuBadge: React.CSSProperties = {
    backdropFilter: `blur(${GLASS.insetBlur}px) saturate(${GLASS.saturation}%)`,
    WebkitBackdropFilter: `blur(${GLASS.insetBlur}px) saturate(${GLASS.saturation}%)`,
    background: `rgba(${GLASS.bgColor}, 0.4)`,
    border: `1px solid rgba(255, 255, 255, 0.1)`,
    boxShadow: `
      4px 4px 8px ${NEU.shadowDark},
      -4px -4px 8px ${NEU.shadowLight}
    `,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // TIPOGRAFÍA (para fondo oscuro con glass)
  // ═══════════════════════════════════════════════════════════════════════════
  const title: React.CSSProperties = {
    fontSize: '36px',
    fontWeight: 700,
    color: '#F1F5F9',
    fontFamily: 'var(--sentinel-font-display)',
    letterSpacing: '0.02em',
    margin: 0,
  };

  const subtitle: React.CSSProperties = {
    fontSize: '14px',
    color: '#94A3B8',
    fontFamily: 'var(--sentinel-font-mono)',
    marginTop: '8px',
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: '#67E8F9',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '20px',
  };

  const cardTitle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: '#F1F5F9',
    fontFamily: 'var(--sentinel-font-display)',
    marginBottom: '20px',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={pageBackground}>
      {/* ════════════════════════════════════════════════════════════════════
          HERO HEADER
          ════════════════════════════════════════════════════════════════════ */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '48px',
      }}>
        <div>
          <h1 style={title}>SENTINEL</h1>
          <p style={subtitle}>Design System • Glass-Neumorphism</p>
        </div>

        <Link
          to="/app/login"
          style={glassNeuButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `10px 10px 20px ${NEU.shadowDark}, -10px -10px 20px ${NEU.shadowLight}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `8px 8px 16px ${NEU.shadowDark}, -8px -8px 16px ${NEU.shadowLight}`;
          }}
        >
          <LogIn size={18} />
          Launch App
        </Link>
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          MAIN GRID
          ════════════════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '32px',
        marginBottom: '48px',
      }}>

        {/* ──────────────────────────────────────────────────────────────────
            CARD 1: Portfolio Overview
            Glass+Neu Panel (raised) → Glass+Neu Inset (pressed/pulido)
            ────────────────────────────────────────────────────────────────── */}
        <div style={glassNeuPanel}>
          <h3 style={sectionTitle}>Portfolio Overview</h3>
          <h2 style={cardTitle}>Total Value</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Inset hundido y más transparente */}
            <div style={{ ...glassNeuInset, padding: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  ...glassNeuInsetSm,
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <DollarSign size={24} color="#67E8F9" />
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#F1F5F9', fontFamily: 'var(--sentinel-font-mono)' }}>
                    $124,500
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Total Value</div>
                </div>
              </div>
            </div>

            {/* Segundo inset */}
            <div style={{ ...glassNeuInset, padding: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div style={{
                  ...glassNeuInsetSm,
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <TrendingUp size={24} color="#4ADE80" />
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#4ADE80', fontFamily: 'var(--sentinel-font-mono)' }}>
                    +12.5%
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Monthly Return</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            CARD 2: Performance
            ────────────────────────────────────────────────────────────────── */}
        <div style={{ ...glassNeuPanel, overflow: 'visible' }}>
          <h3 style={sectionTitle}>Performance</h3>
          <h2 style={cardTitle}>Market Comparison</h2>

          {/* Chart area - inset (más pulido/transparente) */}
          <div style={{
            ...glassNeuInset,
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}>
            <BarChart2 size={48} strokeWidth={1.5} color="#67E8F9" />
          </div>

          {/* Stats - inset */}
          <div style={{ ...glassNeuInset, padding: '14px 20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#E2E8F0' }}>S&P 500</div>
                <div style={{ fontSize: '13px', color: '#4ADE80', fontWeight: 600 }}>+8.2%</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#E2E8F0' }}>NASDAQ</div>
                <div style={{ fontSize: '13px', color: '#4ADE80', fontWeight: 600 }}>+11.4%</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#E2E8F0' }}>Portfolio</div>
                <div style={{ fontSize: '13px', color: '#4ADE80', fontWeight: 600 }}>+12.5%</div>
              </div>
            </div>
          </div>

          {/* Floating alert (Glass + Neu) */}
          <div style={{
            ...glassNeuFloating,
            position: 'absolute' as const,
            top: '-12px',
            right: '-12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
          }}>
            <Bell size={16} color="#F87171" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#F87171' }}>3 Alerts</span>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#EF4444',
              boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
            }} />
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            CARD 3: Quick Actions
            ────────────────────────────────────────────────────────────────── */}
        <div style={{ ...glassNeuPanel, overflow: 'visible' }}>
          <h3 style={sectionTitle}>Quick Actions</h3>
          <h2 style={cardTitle}>Trading Signals</h2>

          {/* Badges (Glass + Neu) */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '20px' }}>
            <span style={{ ...glassNeuBadge, color: '#4ADE80' }}>
              <Zap size={12} /> Active
            </span>
            <span style={{ ...glassNeuBadge, color: '#67E8F9' }}>
              <Star size={12} /> Premium
            </span>
            <span style={{ ...glassNeuBadge, color: '#4ADE80' }}>
              <ArrowUpRight size={12} /> +24%
            </span>
          </div>

          {/* Lista de acciones (Inset más pulido/transparente) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { symbol: 'AAPL', action: 'BUY', color: '#4ADE80' },
              { symbol: 'GOOGL', action: 'SELL', color: '#F87171' },
              { symbol: 'MSFT', action: 'HOLD', color: '#FBBF24' },
            ].map((item, i) => (
              <div key={i} style={{ ...glassNeuInset, padding: '12px 16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Activity size={16} color="#67E8F9" />
                    <span style={{ fontWeight: 600, color: '#E2E8F0', fontFamily: 'var(--sentinel-font-mono)' }}>
                      {item.symbol}
                    </span>
                  </div>
                  <span style={{ ...glassNeuBadge, color: item.color }}>
                    {item.action}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Floating notification (Glass + Neu) */}
          <div style={{
            ...glassNeuFloating,
            position: 'absolute' as const,
            bottom: '-16px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            whiteSpace: 'nowrap' as const,
            zIndex: 10,
          }}>
            <Settings size={14} color="#67E8F9" style={{ animation: 'spin 4s linear infinite' }} />
            <span style={{ fontSize: '12px', color: '#67E8F9' }}>Auto-rebalancing enabled</span>
            <ChevronRight size={14} color="#67E8F9" />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          CSS REFERENCE
          ════════════════════════════════════════════════════════════════════ */}
      <div style={glassNeuPanel}>
        <h3 style={sectionTitle}>CSS Reference</h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {/* Glass+Neu Panel Reference */}
          <div style={{ ...glassNeuInset, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#67E8F9', marginBottom: '12px', fontFamily: 'var(--sentinel-font-mono)' }}>
              GLASS + NEU PANEL
            </div>
            <pre style={{
              fontSize: '11px',
              color: '#94A3B8',
              fontFamily: 'var(--sentinel-font-mono)',
              lineHeight: '1.7',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}>
{`/* GLASS - Textura */
backdrop-filter: blur(20px) saturate(120%);
background: rgba(17, 25, 40, 0.5);
border: 1px solid rgba(255,255,255,0.125);

/* NEU - Volumen (raised) */
box-shadow:
  13px 13px 26px rgba(0,0,0,0.5),
  -13px -13px 26px rgba(255,255,255,0.1);`}
            </pre>
          </div>

          {/* Glass+Neu Inset Reference */}
          <div style={{ ...glassNeuInset, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#67E8F9', marginBottom: '12px', fontFamily: 'var(--sentinel-font-mono)' }}>
              GLASS + NEU INSET
            </div>
            <pre style={{
              fontSize: '11px',
              color: '#94A3B8',
              fontFamily: 'var(--sentinel-font-mono)',
              lineHeight: '1.7',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}>
{`/* GLASS - Vidrio fino cavado */
backdrop-filter: blur(2px) saturate(150%);
background: rgba(17, 25, 40, 0.08);

/* NEU - Volumen (inset/cavado) */
box-shadow:
  inset 5px 5px 10px rgba(0,0,0,0.5),
  inset -5px -5px 10px rgba(255,255,255,0.1);`}
            </pre>
          </div>

          {/* Diferencias */}
          <div style={{ ...glassNeuInset, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#67E8F9', marginBottom: '12px', fontFamily: 'var(--sentinel-font-mono)' }}>
              PANEL vs INSET
            </div>
            <pre style={{
              fontSize: '11px',
              color: '#94A3B8',
              fontFamily: 'var(--sentinel-font-mono)',
              lineHeight: '1.7',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}>
{`Panel (outer):
  blur: 20px   opacity: 50%
  saturate: 120%

Inset (vidrio fino cavado):
  blur: 2px    opacity: 8%
  saturate: 150%`}
            </pre>
          </div>
        </div>

        {/* Layer visualization */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ ...glassNeuInset, padding: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#67E8F9', marginBottom: '16px', fontFamily: 'var(--sentinel-font-mono)' }}>
              LAYER HIERARCHY DEMO
            </div>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap' as const,
            }}>
              {/* Layer 1: Glass+Neu Panel */}
              <div style={{
                ...glassNeuPanel,
                padding: '16px',
                width: '220px',
              }}>
                <div style={{ fontSize: '10px', color: '#67E8F9', marginBottom: '8px' }}>Layer 1: Glass+Neu Panel</div>
                <div style={{ fontSize: '9px', color: '#94A3B8', marginBottom: '8px' }}>blur 20px • opacity 50%</div>
                {/* Layer 1.5: Glass+Neu Inset (vidrio fino cavado) */}
                <div style={{ ...glassNeuInset, padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: '#67E8F9', marginBottom: '4px' }}>Layer 1.5: Vidrio Cavado</div>
                  <div style={{ fontSize: '8px', color: '#94A3B8' }}>blur 2px • opacity 8%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
