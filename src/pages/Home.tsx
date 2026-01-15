// Path: src/pages/Home.tsx
import { Link } from 'react-router-dom';
import {
  LogIn, TrendingUp, DollarSign, BarChart2, Activity,
  Bell, Settings, ChevronRight, Zap, Star, ArrowUpRight
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// GLASS TEXTURES - Texturas que dan materialidad al vidrio
// ═══════════════════════════════════════════════════════════════════════════

// Textura de grano fino - simula imperfecciones del vidrio real
const grainTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`;

// Textura de micro-puntos - patrón sutil que da "cuerpo" al material
const dotPattern = `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23000' fill-opacity='0.03'/%3E%3C/svg%3E")`;

// ═══════════════════════════════════════════════════════════════════════════
// COLOR GLASS SYSTEM - Sistema de vidrio con color y refracción de luz
// Fórmulas basadas en física de luz: la sombra hereda el tono del vidrio
// ═══════════════════════════════════════════════════════════════════════════

interface GlassColor {
  h: number;  // Hue (0-360)
  s: number;  // Saturation (0-100)
  l: number;  // Lightness (0-100)
}

// Fórmula de sombra: mismo tono, saturación reducida al 60%, luminosidad al 35%
// Simula cómo la luz atraviesa vidrio coloreado y proyecta sombra del mismo tono
const getShadowColor = (color: GlassColor, opacity: number): string => {
  const shadowL = color.l * 0.35;  // Oscurecer significativamente
  const shadowS = color.s * 0.6;   // Reducir saturación para sombra natural
  return `hsla(${color.h}, ${shadowS}%, ${shadowL}%, ${opacity})`;
};

// Fórmula de tinte: mismo tono, saturación ajustada, luminosidad alta
// Para el gradiente interno del vidrio
const getTintColor = (color: GlassColor, opacity: number, lightnessBoost = 0): string => {
  const tintL = Math.min(100, color.l + lightnessBoost);
  return `hsla(${color.h}, ${color.s}%, ${tintL}%, ${opacity})`;
};

// Colores de vidrio predefinidos (HSL)
const glassColors = {
  // Neutral - vidrio claro con toque frío
  neutral: { h: 210, s: 15, l: 70 },
  // Teal - accent principal de SENTINEL
  teal: { h: 175, s: 35, l: 55 },
  // Success - vidrio verde sutil
  success: { h: 145, s: 30, l: 50 },
  // Warning - vidrio ámbar cálido
  warning: { h: 35, s: 40, l: 55 },
  // Danger - vidrio con tinte rosado
  danger: { h: 355, s: 35, l: 55 },
  // Info - vidrio azulado
  info: { h: 215, s: 35, l: 55 },
};

export function Home() {
  // ═══════════════════════════════════════════════════════════════════════════
  // NEUMORPHISM CONFIG - Valores de neumorphism.io
  // Color: #e0e5ec | Radius: 50px | Distance: 20px | Blur: 60px
  // ═══════════════════════════════════════════════════════════════════════════
  const NEU = {
    base: '#e0e5ec',
    shadowDark: '#bebebe',
    shadowLight: '#ffffff',
    distance: 20,
    blur: 60,
    radius: 50,
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // BACKGROUND - Color base sólido
  // ═══════════════════════════════════════════════════════════════════════════
  const pageBackground: React.CSSProperties = {
    minHeight: '100vh',
    padding: '40px',
    background: NEU.base,
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // NEU PANEL (Raised/Convex) - Sobresale de la superficie
  // box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff
  // ═══════════════════════════════════════════════════════════════════════════
  const neuPanel: React.CSSProperties = {
    background: NEU.base,
    borderRadius: `${NEU.radius}px`,
    padding: '32px',
    boxShadow: `
      ${NEU.distance}px ${NEU.distance}px ${NEU.blur}px ${NEU.shadowDark},
      -${NEU.distance}px -${NEU.distance}px ${NEU.blur}px ${NEU.shadowLight}
    `,
    position: 'relative' as const,
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // NEU INSET (Pressed/Concave) - Hundido a MEDIA PROFUNDIDAD del padre
  // Si raised = 20px/60px, inset = 10px/30px (mitad exacta)
  // ═══════════════════════════════════════════════════════════════════════════
  const HALF = {
    distance: NEU.distance / 2,  // 10px
    blur: NEU.blur / 2,          // 30px
    radius: NEU.radius / 2,      // 25px
  };

  const neuInset: React.CSSProperties = {
    background: NEU.base,
    borderRadius: `${HALF.radius}px`,
    boxShadow: `
      inset ${HALF.distance}px ${HALF.distance}px ${HALF.blur}px ${NEU.shadowDark},
      inset -${HALF.distance}px -${HALF.distance}px ${HALF.blur}px ${NEU.shadowLight}
    `,
  };

  // Variante pequeña - un tercio de profundidad
  const THIRD = {
    distance: Math.round(NEU.distance / 3),  // ~7px
    blur: Math.round(NEU.blur / 3),          // 20px
    radius: Math.round(NEU.radius / 3),      // ~17px
  };

  const neuInsetSm: React.CSSProperties = {
    background: NEU.base,
    borderRadius: `${THIRD.radius}px`,
    boxShadow: `
      inset ${THIRD.distance}px ${THIRD.distance}px ${THIRD.blur}px ${NEU.shadowDark},
      inset -${THIRD.distance}px -${THIRD.distance}px ${THIRD.blur}px ${NEU.shadowLight}
    `,
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LAYER 2: COLORED GLASS SYSTEM - Sistema de capas con pseudo-elementos
  //
  // Estructura de capas (de abajo hacia arriba):
  // 1. glassBase      → Color sólido base con opacidad mínima (fundamento)
  // 2. glassGradient  → Gradiente que da variación de intensidad
  // 3. glassTexture   → Grano/puntos que dan materialidad
  // 4. glassHighlight → Refracción de luz superior
  // 5. Contenido      → El contenido real del elemento
  // ═══════════════════════════════════════════════════════════════════════════

  // Contenedor principal del glass - solo estructura, sin color
  const createGlassContainer = (color: GlassColor): React.CSSProperties => ({
    backdropFilter: 'blur(3px) saturate(140%)',
    WebkitBackdropFilter: 'blur(3px) saturate(140%)',
    borderRadius: '8px',
    border: `1px solid ${getTintColor(color, 0.35, 35)}`,
    // SOMBRA COLOREADA - más intensa
    boxShadow: `
      0 4px 20px ${getShadowColor(color, 0.25)},
      0 2px 6px ${getShadowColor(color, 0.18)}
    `,
    position: 'relative' as const,
    overflow: 'hidden' as const,
    // Background transparente - las capas internas dan el color
    background: 'transparent',
  });

  // CAPA 1: Color base sólido - fundamento del vidrio
  // Opacidad media-alta, asegura presencia fuerte del color
  const createGlassBase = (color: GlassColor): React.CSSProperties => ({
    position: 'absolute' as const,
    inset: 0,
    background: getTintColor(color, 0.25, 15), // Color sólido más intenso
    borderRadius: 'inherit',
    pointerEvents: 'none' as const,
  });

  // CAPA 2: Gradiente de intensidad - da vida y movimiento
  // Varía la intensidad del color con valores más altos
  const createGlassGradient = (color: GlassColor): React.CSSProperties => ({
    position: 'absolute' as const,
    inset: 0,
    background: `
      linear-gradient(
        125deg,
        ${getTintColor(color, 0.3, 30)} 0%,
        ${getTintColor(color, 0.1, 20)} 30%,
        ${getTintColor(color, 0.05, 15)} 50%,
        ${getTintColor(color, 0.12, 20)} 70%,
        ${getTintColor(color, 0.25, 25)} 100%
      )
    `,
    borderRadius: 'inherit',
    pointerEvents: 'none' as const,
  });

  // CAPA 3: Textura de grano - materialidad del vidrio
  const glassTexture: React.CSSProperties = {
    position: 'absolute' as const,
    inset: 0,
    background: `
      ${grainTexture},
      ${dotPattern}
    `,
    backgroundSize: '200px 200px, 4px 4px',
    opacity: 0.12,
    mixBlendMode: 'multiply' as const,
    pointerEvents: 'none' as const,
    borderRadius: 'inherit',
  };

  // CAPA 4: Highlight superior - refracción de luz
  const glassHighlight: React.CSSProperties = {
    position: 'absolute' as const,
    top: 0,
    left: '10%',
    right: '10%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
    pointerEvents: 'none' as const,
  };

  // Inner highlight en el borde inferior (refracción secundaria)
  const createGlassInnerGlow = (color: GlassColor): React.CSSProperties => ({
    position: 'absolute' as const,
    bottom: 0,
    left: '15%',
    right: '15%',
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${getTintColor(color, 0.5, 45)}, transparent)`,
    pointerEvents: 'none' as const,
  });

  // Función helper que retorna todas las capas para un color
  const getGlassLayers = (color: GlassColor) => ({
    container: createGlassContainer(color),
    base: createGlassBase(color),
    gradient: createGlassGradient(color),
    texture: glassTexture,
    highlight: glassHighlight,
    innerGlow: createGlassInnerGlow(color),
  });

  // Pre-generar capas para variantes comunes
  const glassTealLayers = getGlassLayers(glassColors.teal);
  const glassDangerLayers = getGlassLayers(glassColors.danger);

  // Glass button con sistema de color
  const createGlassButton = (color: GlassColor): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    background: `
      linear-gradient(
        135deg,
        ${getTintColor(color, 0.2, 30)} 0%,
        ${getTintColor(color, 0.08, 20)} 50%,
        ${getTintColor(color, 0.15, 25)} 100%
      )
    `,
    backdropFilter: 'blur(3px) saturate(120%)',
    WebkitBackdropFilter: 'blur(3px) saturate(120%)',
    border: `1px solid ${getTintColor(color, 0.18, 35)}`,
    borderRadius: '6px',
    color: '#2D3436',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'var(--sentinel-font-mono)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: `
      0 2px 8px ${getShadowColor(color, 0.12)},
      inset 0 1px 0 ${getTintColor(color, 0.3, 40)}
    `,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  });

  const glassButton = createGlassButton(glassColors.teal);

  // Glass badge con sistema de color
  const createGlassBadge = (color: GlassColor): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    background: `
      linear-gradient(
        90deg,
        ${getTintColor(color, 0.2, 25)} 0%,
        ${getTintColor(color, 0.1, 20)} 50%,
        ${getTintColor(color, 0.15, 25)} 100%
      )
    `,
    backdropFilter: 'blur(2px)',
    WebkitBackdropFilter: 'blur(2px)',
    border: `1px solid ${getTintColor(color, 0.15, 30)}`,
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#2D3436',
    boxShadow: `0 1px 4px ${getShadowColor(color, 0.1)}`,
    position: 'relative' as const,
    overflow: 'hidden' as const,
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // TIPOGRAFÍA
  // ═══════════════════════════════════════════════════════════════════════════
  const title: React.CSSProperties = {
    fontSize: '36px',
    fontWeight: 700,
    color: '#2D3436',
    fontFamily: 'var(--sentinel-font-display)',
    letterSpacing: '0.02em',
    margin: 0,
  };

  const subtitle: React.CSSProperties = {
    fontSize: '14px',
    color: '#636E72',
    fontFamily: 'var(--sentinel-font-mono)',
    marginTop: '8px',
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: '#4A9A9C',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '20px',
  };

  const cardTitle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: '#2D3436',
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
        position: 'relative' as const,
      }}>
        <div>
          <h1 style={title}>SENTINEL</h1>
          <p style={subtitle}>Design System • Neumorphism + Glass</p>
        </div>

        {/* Glass Button - flotando */}
        <Link
          to="/app/login"
          style={glassButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
          }}
        >
          <LogIn size={18} />
          Launch App
        </Link>
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          MAIN GRID - Showcasing hierarchy
          ════════════════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '32px',
        marginBottom: '48px',
      }}>

        {/* ──────────────────────────────────────────────────────────────────
            CARD 1: Neumorphic Panel con Insets
            ────────────────────────────────────────────────────────────────── */}
        <div style={neuPanel}>
          <h3 style={sectionTitle}>Neumorphic Base</h3>
          <h2 style={cardTitle}>Portfolio Overview</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Inset con datos */}
            <div style={{ ...neuInset, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ ...neuInsetSm, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={24} color="#4A9A9C" />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>
                  $124,500
                </div>
                <div style={{ fontSize: '12px', color: '#636E72' }}>Total Value</div>
              </div>
            </div>

            {/* Inset con datos */}
            <div style={{ ...neuInset, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ ...neuInsetSm, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

        {/* ──────────────────────────────────────────────────────────────────
            CARD 2: Neumorphic Panel + Glass Overlay (DEMO jerarquía)
            ────────────────────────────────────────────────────────────────── */}
        <div style={{ ...neuPanel, overflow: 'visible' }}>
          <h3 style={sectionTitle}>Glass Overlay Demo</h3>
          <h2 style={cardTitle}>Performance</h2>

          {/* Área de chart hundida */}
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

          {/* Stats en inset */}
          <div style={{
            ...neuInset,
            padding: '14px 20px',
            display: 'flex',
            justifyContent: 'space-around',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>S&P 500</div>
              <div style={{ fontSize: '13px', color: '#22C55E', fontWeight: 600 }}>+8.2%</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(163, 177, 198, 0.3)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>NASDAQ</div>
              <div style={{ fontSize: '13px', color: '#22C55E', fontWeight: 600 }}>+11.4%</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(163, 177, 198, 0.3)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>Portfolio</div>
              <div style={{ fontSize: '13px', color: '#22C55E', fontWeight: 600 }}>+12.5%</div>
            </div>
          </div>

          {/* GLASS POPUP - Sistema de capas completo (danger) */}
          <div style={{
            ...glassDangerLayers.container,
            position: 'absolute' as const,
            top: '-12px',
            right: '-12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
          }}>
            {/* Sistema de capas del vidrio */}
            <div style={glassDangerLayers.base} />
            <div style={glassDangerLayers.gradient} />
            <div style={glassDangerLayers.texture} />
            <div style={glassDangerLayers.highlight} />
            <div style={glassDangerLayers.innerGlow} />
            {/* Contenido */}
            <Bell size={16} color="#c45a5a" style={{ position: 'relative' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#2D3436', position: 'relative' }}>3 Alerts</span>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#EF4444',
              boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
              position: 'relative',
            }} />
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            CARD 3: Glass-heavy Card (máxima elevación)
            ────────────────────────────────────────────────────────────────── */}
        <div style={{ ...neuPanel, overflow: 'visible' }}>
          <h3 style={sectionTitle}>Interactive Elements</h3>
          <h2 style={cardTitle}>Quick Actions</h2>

          {/* Glass badges - cada uno con su color y sombra correspondiente */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '20px' }}>
            <span style={{ ...createGlassBadge(glassColors.success), color: '#2d6a4f' }}>
              <Zap size={12} /> Active
            </span>
            <span style={{ ...createGlassBadge(glassColors.teal), color: '#2d5a5c' }}>
              <Star size={12} /> Premium
            </span>
            <span style={{ ...createGlassBadge(glassColors.info), color: '#2d4a6a' }}>
              <ArrowUpRight size={12} /> +24%
            </span>
          </div>

          {/* Lista con items en inset - badges con vidrio coloreado */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { symbol: 'AAPL', action: 'BUY', glassColor: glassColors.success, textColor: '#1e5631' },
              { symbol: 'GOOGL', action: 'SELL', glassColor: glassColors.danger, textColor: '#7a2c2c' },
              { symbol: 'MSFT', action: 'HOLD', glassColor: glassColors.warning, textColor: '#6b4c1a' },
            ].map((item, i) => (
              <div key={i} style={{
                ...neuInset,
                padding: '12px 16px',
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
                {/* Glass action badge - sombra del color del vidrio */}
                <span style={{
                  ...createGlassBadge(item.glassColor),
                  color: item.textColor,
                }}>
                  {item.action}
                </span>
              </div>
            ))}
          </div>

          {/* Glass floating notification - Sistema de capas (teal) */}
          <div style={{
            ...glassTealLayers.container,
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
            {/* Sistema de capas del vidrio */}
            <div style={glassTealLayers.base} />
            <div style={glassTealLayers.gradient} />
            <div style={glassTealLayers.texture} />
            <div style={glassTealLayers.highlight} />
            <div style={glassTealLayers.innerGlow} />
            {/* Contenido */}
            <Settings size={14} color="#3d7a7c" style={{ animation: 'spin 4s linear infinite', position: 'relative' }} />
            <span style={{ fontSize: '12px', color: '#2d5a5c', position: 'relative' }}>Auto-rebalancing enabled</span>
            <ChevronRight size={14} color="#4A9A9C" style={{ position: 'relative' }} />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          CSS REFERENCE SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <div style={neuPanel}>
        <h3 style={sectionTitle}>CSS Reference</h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {/* Neu Panel Reference */}
          <div style={{ ...neuInset, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#4A9A9C', marginBottom: '12px', fontFamily: 'var(--sentinel-font-mono)' }}>
              NEU-PANEL (Layer 1)
            </div>
            <pre style={{
              fontSize: '11px',
              color: '#2D3436',
              fontFamily: 'var(--sentinel-font-mono)',
              lineHeight: '1.7',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}>
{`background: #E0E5EC;
border-radius: 24px;
box-shadow:
  -12px -12px 24px rgba(255,255,255,0.8),
  12px 12px 24px rgba(163,177,198,0.6);`}
            </pre>
          </div>

          {/* Neu Inset Reference */}
          <div style={{ ...neuInset, padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#4A9A9C', marginBottom: '12px', fontFamily: 'var(--sentinel-font-mono)' }}>
              NEU-INSET (Layer 1.5)
            </div>
            <pre style={{
              fontSize: '11px',
              color: '#2D3436',
              fontFamily: 'var(--sentinel-font-mono)',
              lineHeight: '1.7',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}>
{`background: #E0E5EC;
border-radius: 16px;
box-shadow:
  inset 5px 5px 10px rgba(163,177,198,0.5),
  inset -5px -5px 10px rgba(255,255,255,0.7);`}
            </pre>
          </div>

          {/* Glass Panel Reference - Sistema de capas (teal) */}
          <div style={{ ...glassTealLayers.container, padding: '20px' }}>
            {/* Sistema completo de capas */}
            <div style={glassTealLayers.base} />
            <div style={glassTealLayers.gradient} />
            <div style={glassTealLayers.texture} />
            <div style={glassTealLayers.highlight} />
            <div style={glassTealLayers.innerGlow} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#2d5a5c', marginBottom: '12px', fontFamily: 'var(--sentinel-font-mono)', position: 'relative' as const }}>
              LAYERED GLASS (5 capas)
            </div>
            <pre style={{
              fontSize: '11px',
              color: '#2D3436',
              fontFamily: 'var(--sentinel-font-mono)',
              lineHeight: '1.7',
              margin: 0,
              whiteSpace: 'pre-wrap',
              position: 'relative' as const,
            }}>
{`1. Base    → color sólido (0.12)
2. Gradient → intensidades
3. Texture  → grano multiply
4. Highlight→ refracción top
5. InnerGlow→ refracción bottom`}
            </pre>
          </div>
        </div>

        {/* Colored Glass Showcase - Sistema de capas para cada variante */}
        <div style={{ marginTop: '32px', padding: '24px', ...neuInset }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#4A9A9C', marginBottom: '16px', fontFamily: 'var(--sentinel-font-mono)' }}>
            COLORED GLASS VARIANTS - Base sólida + gradiente de intensidad
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
            {[
              { color: glassColors.neutral, name: 'Neutral', textColor: '#4a5568' },
              { color: glassColors.teal, name: 'Teal', textColor: '#2d5a5c' },
              { color: glassColors.success, name: 'Success', textColor: '#1e5631' },
              { color: glassColors.warning, name: 'Warning', textColor: '#6b4c1a' },
              { color: glassColors.danger, name: 'Danger', textColor: '#7a2c2c' },
              { color: glassColors.info, name: 'Info', textColor: '#2d4a6a' },
            ].map((variant) => {
              const layers = getGlassLayers(variant.color);
              return (
                <div
                  key={variant.name}
                  style={{
                    ...layers.container,
                    width: '100px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* 5 capas del sistema */}
                  <div style={layers.base} />
                  <div style={layers.gradient} />
                  <div style={layers.texture} />
                  <div style={layers.highlight} />
                  <div style={layers.innerGlow} />
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: variant.textColor,
                    position: 'relative' as const,
                  }}>
                    {variant.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Keyframes for animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
