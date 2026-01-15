// Path: src/pages/Home.tsx
// SENTINEL Design System Home - Powered by Dynamic Light Engine
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LogIn, TrendingUp, DollarSign, BarChart2, Activity,
  Bell, Settings, ChevronRight, Zap, Star, ArrowUpRight,
  Sun, Pause, Play
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// DYNAMIC LIGHT ENGINE SYSTEM
//
// La luz se mueve alrededor del viewport, y todas las sombras responden
// dinamicamente a su posicion. Formulas basadas en trigonometria real.
// ═══════════════════════════════════════════════════════════════════════════

export function Home() {
  // ═══════════════════════════════════════════════════════════════════════════
  // DYNAMIC LIGHT STATE
  // El angulo de la luz (0-360 grados) determina la direccion de las sombras
  // ═══════════════════════════════════════════════════════════════════════════
  const [lightAngle, setLightAngle] = useState(135); // Empieza arriba-izquierda
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(0.3); // grados por frame

  // Animar la luz orbitando
  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      setLightAngle((prev) => (prev + animationSpeed) % 360);
    };

    const intervalId = setInterval(animate, 16); // ~60fps
    return () => clearInterval(intervalId);
  }, [isAnimating, animationSpeed]);

  // ═══════════════════════════════════════════════════════════════════════════
  // SHADOW CALCULATIONS
  // Convertir el angulo de luz a offsets X/Y para las sombras
  // La sombra se proyecta en direccion OPUESTA a la luz
  // ═══════════════════════════════════════════════════════════════════════════
  const shadowOffsets = useMemo(() => {
    // Convertir angulo a radianes (la sombra va en direccion opuesta)
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);

    // Calcular offsets normalizados (-1 a 1)
    const x = Math.cos(shadowAngle);
    const y = Math.sin(shadowAngle);

    return { x, y, angle: lightAngle };
  }, [lightAngle]);

  // Posicion visual de la luz (para el indicador)
  const lightPosition = useMemo(() => {
    const rad = lightAngle * (Math.PI / 180);
    // Posicion en un circulo alrededor del viewport
    const x = 50 + Math.cos(rad) * 45; // 50% +/- 45%
    const y = 50 + Math.sin(rad) * 45;
    return { x, y };
  }, [lightAngle]);

  // ═══════════════════════════════════════════════════════════════════════════
  // DYNAMIC SHADOW GENERATORS
  // Estas funciones generan sombras basadas en la posicion actual de la luz
  // ═══════════════════════════════════════════════════════════════════════════

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  // Generar sombra neumorphica elevada
  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    // Highlight en direccion de la luz (inverso de la sombra)
    const hlX = -x * distance;
    const hlY = -y * distance;
    // Sombra en direccion opuesta a la luz
    const shX = x * distance;
    const shY = y * distance;

    return `
      ${hlX}px ${hlY}px ${blur}px ${LIGHT.shadowLight},
      ${shX}px ${shY}px ${blur}px ${LIGHT.shadowDark}
    `;
  };

  // Generar sombra neumorphica inset
  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    const shX = x * distance;
    const shY = y * distance;

    return `
      inset ${shX}px ${shY}px ${blur}px ${LIGHT.shadowDark},
      inset ${-shX}px ${-shY}px ${blur}px ${LIGHT.shadowLight}
    `;
  };

  // Generar sombra layered (multicapa) dinamica
  const getLayeredShadow = (hue: number, sat: number): string => {
    const { x, y } = shadowOffsets;
    const layers = [
      { dist: 0.5, blur: 1, opacity: 0.12 },
      { dist: 1, blur: 2, opacity: 0.10 },
      { dist: 2, blur: 4, opacity: 0.08 },
      { dist: 4, blur: 8, opacity: 0.06 },
    ];

    return layers.map(layer =>
      `${x * layer.dist}px ${y * layer.dist * 1.5}px ${layer.blur}px hsla(${hue}, ${sat * 0.6}%, 35%, ${layer.opacity})`
    ).join(',\n      ');
  };

  // Generar reflexion de luz en glass
  const getGlassReflection = (): string => {
    const { x, y } = shadowOffsets;
    // El highlight va en la direccion de la luz (inverso de la sombra)
    const hlX = -x;
    const hlY = -y;

    // Determinar que bordes iluminar basado en la direccion de la luz
    const topHighlight = hlY < 0 ? 0.6 : 0.2;
    const leftHighlight = hlX < 0 ? 0.4 : 0.15;

    return `
      inset 0 ${hlY < 0 ? '-1px' : '1px'} 0 hsla(0, 0%, 100%, ${topHighlight}),
      inset ${hlX < 0 ? '-1px' : '1px'} 0 0 hsla(0, 0%, 100%, ${leftHighlight})
    `;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DYNAMIC STYLES
  // ═══════════════════════════════════════════════════════════════════════════

  const pageBackground: React.CSSProperties = {
    minHeight: '100vh',
    padding: '40px',
    background: LIGHT.base,
    position: 'relative',
    overflow: 'hidden',
  };

  const neuPanel: React.CSSProperties = {
    background: LIGHT.base,
    borderRadius: '15px',
    padding: '32px',
    boxShadow: getNeuPanelShadow(20, 60),
    position: 'relative' as const,
    transition: 'box-shadow 50ms linear',
  };

  const neuInset: React.CSSProperties = {
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuInsetShadow(5, 15),
    transition: 'box-shadow 50ms linear',
  };

  const neuInsetSm: React.CSSProperties = {
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuInsetShadow(3, 8),
    transition: 'box-shadow 50ms linear',
  };

  // Glass con sombras dinamicas
  const glassCard = (hue: number, sat: number): React.CSSProperties => ({
    background: `
      linear-gradient(
        ${lightAngle + 45}deg,
        hsla(${hue}, ${sat}%, 70%, 0.28) 0%,
        hsla(${hue}, ${sat}%, 65%, 0.12) 50%,
        hsla(${hue}, ${sat}%, 60%, 0.20) 100%
      )
    `,
    backdropFilter: 'blur(8px) saturate(140%)',
    WebkitBackdropFilter: 'blur(8px) saturate(140%)',
    borderRadius: '15px',
    border: `1px solid hsla(${hue}, ${sat}%, 80%, 0.35)`,
    boxShadow: `
      ${getGlassReflection()},
      ${getLayeredShadow(hue, sat)}
    `,
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: 'box-shadow 50ms linear, background 100ms linear',
  });

  const glassBadge = (hue: number, sat: number): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    background: `
      linear-gradient(
        ${lightAngle}deg,
        hsla(${hue}, ${sat}%, 65%, 0.25) 0%,
        hsla(${hue}, ${sat}%, 60%, 0.12) 50%,
        hsla(${hue}, ${sat}%, 65%, 0.20) 100%
      )
    `,
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: `1px solid hsla(${hue}, ${sat}%, 75%, 0.25)`,
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 600,
    color: `hsl(${hue}, ${sat * 0.8}%, 30%)`,
    boxShadow: `
      ${getGlassReflection()},
      ${shadowOffsets.x * 1}px ${shadowOffsets.y * 2}px 4px hsla(${hue}, ${sat * 0.5}%, 40%, 0.12)
    `,
    transition: 'box-shadow 50ms linear',
  });

  const glassButton: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    background: `
      linear-gradient(
        ${lightAngle + 45}deg,
        hsla(175, 35%, 60%, 0.28) 0%,
        hsla(175, 35%, 55%, 0.12) 50%,
        hsla(175, 35%, 60%, 0.22) 100%
      )
    `,
    backdropFilter: 'blur(8px) saturate(120%)',
    WebkitBackdropFilter: 'blur(8px) saturate(120%)',
    border: '1px solid hsla(175, 35%, 75%, 0.30)',
    borderRadius: '15px',
    color: '#2D3436',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'var(--sentinel-font-mono)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 50ms linear',
    boxShadow: `
      ${getGlassReflection()},
      ${getLayeredShadow(175, 35)}
    `,
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // TYPOGRAPHY
  // ═══════════════════════════════════════════════════════════════════════════
  const title: React.CSSProperties = {
    fontSize: '42px',
    fontWeight: 700,
    color: '#2D3436',
    fontFamily: 'var(--sentinel-font-display)',
    letterSpacing: '0.02em',
    margin: 0,
    textShadow: `${-shadowOffsets.x}px ${-shadowOffsets.y}px 0 rgba(255,255,255,0.8), ${shadowOffsets.x}px ${shadowOffsets.y * 2}px 2px rgba(0,0,0,0.08)`,
    transition: 'text-shadow 50ms linear',
  };

  const subtitle: React.CSSProperties = {
    fontSize: '14px',
    color: '#636E72',
    fontFamily: 'var(--sentinel-font-mono)',
    marginTop: '8px',
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: '#4A9A9C',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const cardTitle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    color: '#2D3436',
    fontFamily: 'var(--sentinel-font-display)',
    marginBottom: '24px',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={pageBackground}>
      {/* ════════════════════════════════════════════════════════════════════
          DYNAMIC LIGHT INDICATOR - Orbiting sun
          ════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          left: `${lightPosition.x}%`,
          top: `${lightPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(251,191,36,0.4) 40%, transparent 70%)',
          boxShadow: '0 0 60px rgba(251,191,36,0.6), 0 0 120px rgba(251,191,36,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          pointerEvents: 'none',
          transition: 'left 16ms linear, top 16ms linear',
        }}
      >
        <Sun size={28} style={{ color: '#FCD34D' }} />
      </div>

      {/* Light rays emanating from source */}
      <div
        style={{
          position: 'absolute',
          left: `${lightPosition.x}%`,
          top: `${lightPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: `conic-gradient(from ${lightAngle}deg, transparent 0deg, rgba(251,191,36,0.08) 20deg, transparent 40deg, transparent 360deg)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          LIGHT CONTROLS
          ════════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 24px',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: '15px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        zIndex: 1000,
        fontFamily: 'var(--sentinel-font-mono)',
        fontSize: '12px',
      }}>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: isAnimating ? '#4A9A9C' : '#636E72',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {isAnimating ? <Pause size={14} /> : <Play size={14} />}
          {isAnimating ? 'Pause' : 'Play'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#636E72' }}>Speed:</span>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            style={{ width: '80px', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#636E72' }}>Angle:</span>
          <input
            type="range"
            min="0"
            max="360"
            value={lightAngle}
            onChange={(e) => {
              setIsAnimating(false);
              setLightAngle(parseFloat(e.target.value));
            }}
            style={{ width: '100px', cursor: 'pointer' }}
          />
          <span style={{ color: '#2D3436', fontWeight: 600, minWidth: '36px' }}>
            {Math.round(lightAngle)}°
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          HERO HEADER
          ════════════════════════════════════════════════════════════════════ */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '48px',
        marginTop: '20px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div>
          <h1 style={title}>SENTINEL</h1>
          <p style={subtitle}>Dynamic Light Engine Demo</p>
        </div>

        <Link to="/app/login" style={glassButton}>
          <LogIn size={18} />
          Launch App
        </Link>
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          MAIN GRID
          ════════════════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '32px',
        marginBottom: '48px',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* ──────────────────────────────────────────────────────────────────
            CARD 1: Neumorphic Demo
            ────────────────────────────────────────────────────────────────── */}
        <div style={neuPanel}>
          <h3 style={sectionTitle}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: `linear-gradient(${lightAngle}deg, #fff, #4A9A9C)`,
              boxShadow: '0 1px 3px rgba(74,154,156,0.3)',
            }} />
            Neumorphic Shadows
          </h3>
          <h2 style={cardTitle}>Portfolio Overview</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ ...neuInset, padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ ...neuInsetSm, width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={24} color="#4A9A9C" />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>
                  $124,500
                </div>
                <div style={{ fontSize: '12px', color: '#636E72' }}>Total Value</div>
              </div>
            </div>

            <div style={{ ...neuInset, padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ ...neuInsetSm, width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={24} color="#22C55E" />
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#22C55E', fontFamily: 'var(--sentinel-font-mono)' }}>
                  +12.5%
                </div>
                <div style={{ fontSize: '12px', color: '#636E72' }}>Monthly Return</div>
              </div>
            </div>
          </div>

          {/* Elevation Demo with dynamic shadows */}
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                style={{
                  width: '48px',
                  height: '48px',
                  background: LIGHT.base,
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#636E72',
                  fontFamily: 'var(--sentinel-font-mono)',
                  boxShadow: getNeuPanelShadow(level * 3, level * 8),
                  transition: 'box-shadow 50ms linear',
                }}
              >
                {level}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '10px', color: '#9BA4B0', fontFamily: 'var(--sentinel-font-mono)' }}>
            Dynamic Elevation 1-5
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            CARD 2: Glass with dynamic light reflection
            ────────────────────────────────────────────────────────────────── */}
        <div style={{ ...neuPanel, overflow: 'visible' }}>
          <h3 style={sectionTitle}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: `linear-gradient(${lightAngle}deg, #fff, #EF4444)`,
              boxShadow: '0 1px 3px rgba(239,68,68,0.3)',
            }} />
            Glass Light Reflection
          </h3>
          <h2 style={cardTitle}>Performance</h2>

          <div style={{
            ...neuInset,
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4A9A9C',
            marginBottom: '16px',
          }}>
            <BarChart2 size={48} strokeWidth={1.5} />
          </div>

          <div style={{
            ...neuInset,
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-around',
          }}>
            {[
              { label: 'S&P 500', value: '+8.2%' },
              { label: 'NASDAQ', value: '+11.4%' },
              { label: 'Portfolio', value: '+12.5%' },
            ].map((item, i, arr) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: i < arr.length - 1 ? '20px' : 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#2D3436' }}>{item.label}</div>
                  <div style={{ fontSize: '14px', color: '#22C55E', fontWeight: 700 }}>{item.value}</div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: '1px', height: '30px', background: 'rgba(163, 177, 198, 0.3)' }} />
                )}
              </div>
            ))}
          </div>

          {/* Glass Overlay - watch the reflection move! */}
          <div style={{
            ...glassCard(355, 35),
            position: 'absolute' as const,
            top: '-12px',
            right: '-12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
          }}>
            <Bell size={16} color="#c45a5a" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#7a2c2c' }}>3 Alerts</span>
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
            CARD 3: Color-Matched Dynamic Shadows
            ────────────────────────────────────────────────────────────────── */}
        <div style={{ ...neuPanel, overflow: 'visible' }}>
          <h3 style={sectionTitle}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: `linear-gradient(${lightAngle}deg, #fff, #22C55E)`,
              boxShadow: '0 1px 3px rgba(34,197,94,0.3)',
            }} />
            Color-Matched Shadows
          </h3>
          <h2 style={cardTitle}>Quick Actions</h2>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const, marginBottom: '24px' }}>
            <span style={glassBadge(145, 40)}>
              <Zap size={12} /> Active
            </span>
            <span style={glassBadge(175, 35)}>
              <Star size={12} /> Premium
            </span>
            <span style={glassBadge(215, 40)}>
              <ArrowUpRight size={12} /> +24%
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { symbol: 'AAPL', action: 'BUY', hue: 145, sat: 40 },
              { symbol: 'GOOGL', action: 'SELL', hue: 355, sat: 35 },
              { symbol: 'MSFT', action: 'HOLD', hue: 35, sat: 45 },
            ].map((item) => (
              <div key={item.symbol} style={{
                ...neuInset,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Activity size={16} color="#4A9A9C" />
                  <span style={{ fontWeight: 600, color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>
                    {item.symbol}
                  </span>
                </div>
                <span style={glassBadge(item.hue, item.sat)}>
                  {item.action}
                </span>
              </div>
            ))}
          </div>

          {/* Glass notification - teal */}
          <div style={{
            ...glassCard(175, 35),
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
            <Settings size={14} color="#3d7a7c" style={{ animation: 'spin 4s linear infinite' }} />
            <span style={{ fontSize: '12px', color: '#2d5a5c', fontWeight: 500 }}>Auto-rebalancing enabled</span>
            <ChevronRight size={14} color="#4A9A9C" />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          LIGHT ENGINE INFO
          ════════════════════════════════════════════════════════════════════ */}
      <div style={{ ...neuPanel, position: 'relative', zIndex: 10 }}>
        <h3 style={sectionTitle}>
          <Sun size={14} style={{ color: '#F59E0B' }} />
          Dynamic Light Engine
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}>
          <div style={{ ...neuInset, padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#4A9A9C', marginBottom: '8px' }}>
              Real-time Calculations
            </div>
            <p style={{ fontSize: '12px', color: '#636E72', lineHeight: 1.6, margin: 0 }}>
              Shadow X = cos(angle) × distance<br/>
              Shadow Y = sin(angle) × distance<br/>
              Highlight = opposite direction
            </p>
          </div>

          <div style={{ ...neuInset, padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#4A9A9C', marginBottom: '8px' }}>
              Glass Reflections
            </div>
            <p style={{ fontSize: '12px', color: '#636E72', lineHeight: 1.6, margin: 0 }}>
              Light-facing edges get brighter highlights.<br/>
              Gradient direction follows light angle.<br/>
              Shadow color matches glass hue.
            </p>
          </div>

          <div style={{ ...glassCard(175, 35), padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#2d5a5c', marginBottom: '8px' }}>
              Current Light: {Math.round(lightAngle)}°
            </div>
            <p style={{ fontSize: '12px', color: '#3d6a6c', lineHeight: 1.6, margin: 0 }}>
              X offset: {shadowOffsets.x.toFixed(2)}<br/>
              Y offset: {shadowOffsets.y.toFixed(2)}<br/>
              {isAnimating ? 'Animating...' : 'Paused'}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/showcase/styles/light-engine"
            style={glassButton}
          >
            View Full Documentation
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
