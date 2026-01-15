// Path: src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { LogIn, TrendingUp, DollarSign, BarChart2, Activity } from 'lucide-react';

export function Home() {
  // ═══════════════════════════════════════════════════════════════════════════
  // GLASS CARD - Efecto vidrio grueso/frosted
  // ═══════════════════════════════════════════════════════════════════════════
  const glassCard: React.CSSProperties = {
    // Fondo MUY transparente - deja ver el fondo
    background: 'rgba(255, 255, 255, 0.12)',

    // Blur fuerte - el "vidrio grueso"
    backdropFilter: 'blur(24px) saturate(200%)',
    WebkitBackdropFilter: 'blur(24px) saturate(200%)',

    // Borde luminoso más visible
    border: '1px solid rgba(255, 255, 255, 0.35)',

    // Border radius generoso
    borderRadius: '24px',

    // Sombra sutil para profundidad
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4)
    `,

    padding: '32px',
    position: 'relative' as const,
    overflow: 'hidden'
  };

  // Efecto de brillo superior (simula luz en vidrio) - más pronunciado
  const glassShine: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)',
    pointerEvents: 'none',
    borderRadius: '24px 24px 0 0'
  };

  // Contenedor principal
  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  // Header
  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: '#2D3436',
    fontFamily: 'var(--sentinel-font-display)',
    letterSpacing: '0.05em',
    margin: 0
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '14px',
    color: '#636E72',
    fontFamily: 'var(--sentinel-font-mono)',
    marginTop: '4px'
  };

  // Botón glass - más transparente
  const glassButton: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    color: '#2D3436',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'var(--sentinel-font-mono)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
  };

  // Grid de cards
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // INSET / HUNDIDO - Elementos cavados hacia adentro
  // ═══════════════════════════════════════════════════════════════════════════
  const insetStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',

    // Fondo ligeramente más oscuro
    background: 'rgba(0, 0, 0, 0.03)',

    borderRadius: '16px',

    // Borde interno sutil (oscuro arriba, claro abajo)
    border: '1px solid rgba(0, 0, 0, 0.04)',

    // Sombra INSET - crea el efecto hundido
    boxShadow: `
      inset 2px 2px 6px rgba(0, 0, 0, 0.08),
      inset -2px -2px 6px rgba(255, 255, 255, 0.5)
    `
  };

  const iconBoxStyles: React.CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // Fondo hundido
    background: 'rgba(0, 0, 0, 0.02)',

    // Sombra inset para efecto cavado
    boxShadow: `
      inset 2px 2px 4px rgba(0, 0, 0, 0.06),
      inset -2px -2px 4px rgba(255, 255, 255, 0.6)
    `,

    border: '1px solid rgba(0, 0, 0, 0.03)'
  };

  return (
    <div style={containerStyles}>
      {/* Header */}
      <header style={headerStyles}>
        <div>
          <h1 style={titleStyles}>SENTINEL</h1>
          <p style={subtitleStyles}>Design System • Glass Reference</p>
        </div>
        <Link
          to="/app/login"
          style={glassButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
          }}
        >
          <LogIn size={18} />
          Launch App
        </Link>
      </header>

      {/* Glass Cards Grid */}
      <div style={gridStyles}>

        {/* Card 1 - Stats */}
        <div style={glassCard}>
          <div style={glassShine} />
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2D3436',
            marginBottom: '24px',
            fontFamily: 'var(--sentinel-font-display)'
          }}>
            Portfolio Overview
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={insetStyles}>
              <div style={iconBoxStyles}>
                <DollarSign size={24} color="#4A9A9C" />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>
                  $124,500
                </div>
                <div style={{ fontSize: '12px', color: '#636E72' }}>Total Value</div>
              </div>
            </div>

            <div style={insetStyles}>
              <div style={iconBoxStyles}>
                <TrendingUp size={24} color="#22C55E" />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#22C55E', fontFamily: 'var(--sentinel-font-mono)' }}>
                  +12.5%
                </div>
                <div style={{ fontSize: '12px', color: '#636E72' }}>Monthly Return</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Chart Placeholder */}
        <div style={glassCard}>
          <div style={glassShine} />
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2D3436',
            marginBottom: '24px',
            fontFamily: 'var(--sentinel-font-display)'
          }}>
            Performance
          </h2>

          <div style={{
            height: '160px',
            background: 'rgba(0, 0, 0, 0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: `
              inset 3px 3px 8px rgba(0, 0, 0, 0.08),
              inset -3px -3px 8px rgba(255, 255, 255, 0.5)
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4A9A9C'
          }}>
            <BarChart2 size={48} strokeWidth={1.5} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px',
            padding: '12px 16px',
            background: 'rgba(0, 0, 0, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: `
              inset 2px 2px 6px rgba(0, 0, 0, 0.08),
              inset -2px -2px 6px rgba(255, 255, 255, 0.5)
            `
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#2D3436' }}>S&P 500</div>
              <div style={{ fontSize: '12px', color: '#22C55E' }}>+8.2%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#2D3436' }}>NASDAQ</div>
              <div style={{ fontSize: '12px', color: '#22C55E' }}>+11.4%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#2D3436' }}>Portfolio</div>
              <div style={{ fontSize: '12px', color: '#22C55E' }}>+12.5%</div>
            </div>
          </div>
        </div>

        {/* Card 3 - Activity */}
        <div style={glassCard}>
          <div style={glassShine} />
          <h2 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2D3436',
            marginBottom: '24px',
            fontFamily: 'var(--sentinel-font-display)'
          }}>
            Recent Activity
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { symbol: 'AAPL', action: 'BUY', amount: '+10 shares', color: '#22C55E' },
              { symbol: 'GOOGL', action: 'SELL', amount: '-5 shares', color: '#EF4444' },
              { symbol: 'MSFT', action: 'BUY', amount: '+15 shares', color: '#22C55E' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(0, 0, 0, 0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                boxShadow: `
                  inset 2px 2px 6px rgba(0, 0, 0, 0.08),
                  inset -2px -2px 6px rgba(255, 255, 255, 0.5)
                `
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Activity size={18} color="#4A9A9C" />
                  <span style={{ fontWeight: 600, color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>
                    {item.symbol}
                  </span>
                </div>
                <div style={{
                  padding: '4px 12px',
                  background: `${item.color}15`,
                  borderRadius: '8px',
                  color: item.color,
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: 'var(--sentinel-font-mono)'
                }}>
                  {item.action}
                </div>
                <span style={{ color: '#636E72', fontSize: '13px' }}>{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CSS Reference */}
      <div style={{
        ...glassCard,
        background: 'rgba(45, 52, 54, 0.03)',
        border: '1px dashed rgba(74, 154, 156, 0.3)'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#4A9A9C',
          marginBottom: '16px',
          fontFamily: 'var(--sentinel-font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Glass + Inset CSS Reference
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <pre style={{
            fontSize: '11px',
            color: '#2D3436',
            fontFamily: 'var(--sentinel-font-mono)',
            lineHeight: '1.8',
            margin: 0,
            whiteSpace: 'pre-wrap',
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: `
              inset 2px 2px 6px rgba(0, 0, 0, 0.08),
              inset -2px -2px 6px rgba(255, 255, 255, 0.5)
            `
          }}>
{`/* GLASS CARD - Contenedor */
.glass-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}`}
          </pre>
          <pre style={{
            fontSize: '11px',
            color: '#2D3436',
            fontFamily: 'var(--sentinel-font-mono)',
            lineHeight: '1.8',
            margin: 0,
            whiteSpace: 'pre-wrap',
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: `
              inset 2px 2px 6px rgba(0, 0, 0, 0.08),
              inset -2px -2px 6px rgba(255, 255, 255, 0.5)
            `
          }}>
{`/* INSET - Elementos hundidos */
.inset-element {
  background: rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow:
    inset 2px 2px 6px rgba(0, 0, 0, 0.08),
    inset -2px -2px 6px rgba(255, 255, 255, 0.5);
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
