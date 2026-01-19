// Path: src/pages/styles/LightEngineShowcase.tsx
// SENTINEL Light Engine Showcase - Sistema de Iluminacion Unificado
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Sun, Pause, Play, TrendingUp, DollarSign, BarChart2, Activity,
  Bell, Settings, ChevronRight, Zap, Star, ArrowUpRight
} from 'lucide-react';
import { LineChart } from '@/components/charts/echarts';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

// Throttle interval for shadow updates (ms)
const SHADOW_UPDATE_INTERVAL = 100;

export function LightEngineShowcase() {
  const [activeElevation, setActiveElevation] = useState(3);

  // ═══════════════════════════════════════════════════════════════════════════
  // DYNAMIC LIGHT ENGINE STATE
  // ═══════════════════════════════════════════════════════════════════════════
  const [shadowAngle, setShadowAngle] = useState(135);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(0.3);

  const visualAngleRef = useRef(135);
  const animationFrameRef = useRef<number | null>(null);
  const lastShadowUpdateRef = useRef(0);

  const updateShadowAngle = useCallback((angle: number) => {
    const now = performance.now();
    if (now - lastShadowUpdateRef.current >= SHADOW_UPDATE_INTERVAL) {
      setShadowAngle(angle);
      lastShadowUpdateRef.current = now;
    }
  }, []);

  useEffect(() => {
    if (!isAnimating) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const increment = (animationSpeed * deltaTime) / 16.67;
      visualAngleRef.current = (visualAngleRef.current + increment) % 360;

      updateShadowAngle(visualAngleRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, animationSpeed, updateShadowAngle]);

  const lightAngle = shadowAngle;

  const shadowOffsets = useMemo(() => {
    const shadowAngleRad = (lightAngle + 180) * (Math.PI / 180);
    const x = Math.cos(shadowAngleRad);
    const y = Math.sin(shadowAngleRad);
    return { x, y, angle: lightAngle };
  }, [lightAngle]);

  const handleManualAngleChange = useCallback((newAngle: number) => {
    setIsAnimating(false);
    visualAngleRef.current = newAngle;
    setShadowAngle(newAngle);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // DYNAMIC SHADOW GENERATORS
  // ═══════════════════════════════════════════════════════════════════════════
  const LIGHT = {
    base: '#d5d8dc',
    shadowDark: 'rgba(147, 157, 170, 0.55)',
    shadowLight: 'rgba(255, 255, 255, 0.95)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    const hlX = -x * distance;
    const hlY = -y * distance;
    const shX = x * distance;
    const shY = y * distance;

    return `
      ${hlX}px ${hlY}px ${blur}px ${LIGHT.shadowLight},
      ${shX}px ${shY}px ${blur}px ${LIGHT.shadowDark}
    `;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    const shX = x * distance;
    const shY = y * distance;

    return `
      inset ${shX}px ${shY}px ${blur}px ${LIGHT.shadowDark},
      inset ${-shX}px ${-shY}px ${blur}px ${LIGHT.shadowLight}
    `;
  };

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

  const getGlassReflection = (): string => {
    const { x, y } = shadowOffsets;
    const hlX = -x;
    const hlY = -y;

    const topHighlight = hlY < 0 ? 0.6 : 0.2;
    const leftHighlight = hlX < 0 ? 0.4 : 0.15;

    return `
      inset 0 ${hlY < 0 ? '-1px' : '1px'} 0 hsla(0, 0%, 100%, ${topHighlight}),
      inset ${hlX < 0 ? '-1px' : '1px'} 0 0 hsla(0, 0%, 100%, ${leftHighlight})
    `;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DYNAMIC STYLES FOR INTERACTIVE DEMO
  // ═══════════════════════════════════════════════════════════════════════════
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

  const sectionTitle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: '#3a6a72',
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
    color: 'var(--sentinel-text-primary)',
    fontFamily: 'var(--sentinel-font-display)',
    marginBottom: '24px',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // STATIC DOCUMENTATION STYLES
  // ═══════════════════════════════════════════════════════════════════════════
  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '48px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 300,
    color: 'var(--sentinel-text-primary)',
    marginBottom: '12px',
    fontFamily: 'var(--sentinel-font-display)',
    letterSpacing: '-0.02em'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-primary)',
    lineHeight: 1.7,
    maxWidth: '700px'
  };

  const sectionHeaderStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--sentinel-accent-primary)',
    marginTop: '64px',
    marginBottom: '24px',
    fontFamily: 'var(--sentinel-font-primary)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    borderBottom: '1px solid var(--sentinel-border-subtle)',
    paddingBottom: '12px'
  };

  const conceptBoxStyles: React.CSSProperties = {
    padding: '24px',
    backgroundColor: 'var(--sentinel-glass-bg)',
    backdropFilter: 'blur(12px)',
    borderRadius: 'var(--sentinel-radius-lg)',
    border: '1px solid var(--sentinel-glass-border)',
    marginBottom: '24px'
  };

  const codeBlockStyles: React.CSSProperties = {
    fontFamily: 'var(--sentinel-font-mono)',
    fontSize: '12px',
    backgroundColor: 'var(--sentinel-bg-void)',
    color: 'var(--sentinel-text-secondary)',
    padding: '16px',
    borderRadius: 'var(--sentinel-radius-md)',
    overflow: 'auto',
    lineHeight: 1.6
  };

  const demoBoxBase: React.CSSProperties = {
    width: '140px',
    height: '140px',
    backgroundColor: 'var(--sentinel-bg-surface)',
    borderRadius: 'var(--sentinel-radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '8px',
    transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <div style={{ padding: '32px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>Light Engine</h1>
        <p style={descStyles}>
          Motor de iluminacion unificado basado en los principios de Josh W. Comeau.
          Una sola fuente de luz global afecta todos los elementos, creando sombras
          consistentes, profesionales y con profundidad realista.
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════════
          INTERACTIVE DEMO SECTION
          ═══════════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Demo Interactivo</h2>

      <div
        style={{
          background: LIGHT.base,
          borderRadius: '20px',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '48px',
        }}
      >
        {/* Dynamic Light Indicator */}
        <div
          className="light-orbit-container"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '80%',
            height: '80%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 100,
            animation: isAnimating
              ? `sunOrbit ${360 / (animationSpeed * 60)}s linear infinite`
              : 'none',
            ...(isAnimating ? {} : { transform: `translate(-50%, -50%) rotate(${lightAngle}deg)` }),
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              transform: 'translate(-50%, -50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(251,191,36,0.4) 40%, transparent 70%)',
              boxShadow: '0 0 40px rgba(251,191,36,0.6), 0 0 80px rgba(251,191,36,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sun size={22} style={{ color: '#FCD34D' }} />
          </div>
        </div>

        {/* Light rays */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${lightAngle}deg)`,
            width: '300px',
            height: '300px',
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(251,191,36,0.08) 20deg, transparent 40deg, transparent 360deg)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'transform 100ms linear',
          }}
        />

        {/* Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 24px',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: '15px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          fontFamily: 'var(--sentinel-font-mono)',
          fontSize: '12px',
          marginBottom: '32px',
          position: 'relative',
          zIndex: 200,
          width: 'fit-content',
        }}>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: isAnimating ? '#3a6a72' : '#636E72',
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
              onChange={(e) => handleManualAngleChange(parseFloat(e.target.value))}
              style={{ width: '100px', cursor: 'pointer' }}
            />
            <span style={{ color: 'var(--sentinel-text-primary)', fontWeight: 600, minWidth: '36px' }}>
              {Math.round(lightAngle)}°
            </span>
          </div>
        </div>

        {/* Demo Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          position: 'relative',
          zIndex: 10,
        }}>
          {/* Neumorphic Card */}
          <div style={neuPanel}>
            <h3 style={sectionTitle}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: `linear-gradient(${lightAngle}deg, #fff, #3a6a72)`,
                boxShadow: '0 1px 3px rgba(58,106,114,0.3)',
              }} />
              Neumorphic Shadows
            </h3>
            <h2 style={cardTitle}>Portfolio</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ ...neuInset, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ ...neuInsetSm, width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign size={20} color="#3a6a72" />
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)' }}>
                    $124,500
                  </div>
                  <div style={{ fontSize: '11px', color: '#636E72' }}>Total Value</div>
                </div>
              </div>

              <div style={{ ...neuInset, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ ...neuInsetSm, width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={20} color="#22C55E" />
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#22C55E', fontFamily: 'var(--sentinel-font-mono)' }}>
                    +12.5%
                  </div>
                  <div style={{ fontSize: '11px', color: '#636E72' }}>Return</div>
                </div>
              </div>
            </div>

            {/* Elevation Demo */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  style={{
                    width: '36px',
                    height: '36px',
                    background: LIGHT.base,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
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

            {/* Glass element */}
            <div style={{
              ...glassCard(215, 50),
              position: 'absolute' as const,
              top: '-12px',
              left: '20px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 10,
            }}>
              <Activity size={12} color="#2d4a6b" />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e3550' }}>Live</span>
            </div>
          </div>

          {/* Performance Chart */}
          <div style={{ ...neuInset, padding: '24px', overflow: 'visible' }}>
            <h3 style={sectionTitle}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: `linear-gradient(${lightAngle}deg, #fff, #EF4444)`,
                boxShadow: '0 1px 3px rgba(239,68,68,0.3)',
              }} />
              Glass Reflection
            </h3>
            <h2 style={cardTitle}>Performance</h2>

            <div style={{ ...neuInset, padding: '8px', marginBottom: '12px' }}>
              <LineChart
                data={[
                  {
                    id: 'portfolio',
                    name: 'Portfolio',
                    color: '#3a6a72',
                    data: [
                      { x: 'Jan', y: 0 }, { x: 'Feb', y: 12 }, { x: 'Mar', y: 8 },
                      { x: 'Apr', y: 22 }, { x: 'May', y: 28 }, { x: 'Jun', y: 35 },
                    ],
                  },
                  {
                    id: 'nasdaq',
                    name: 'NASDAQ',
                    color: '#8B5CF6',
                    data: [
                      { x: 'Jan', y: 0 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 12 },
                      { x: 'Apr', y: 18 }, { x: 'May', y: 22 }, { x: 'Jun', y: 28 },
                    ],
                  },
                ]}
                smooth
                height={140}
                formatValue={(v) => `${v > 0 ? '+' : ''}${v}%`}
              />
            </div>

            {/* Glass Overlay */}
            <div style={{
              ...glassCard(355, 35),
              position: 'absolute' as const,
              top: '-10px',
              right: '-10px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              zIndex: 10,
            }}>
              <Bell size={12} color="#c45a5a" />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#7a2c2c' }}>3 Alerts</span>
            </div>

            {/* Green Glass */}
            <div style={{
              ...glassCard(145, 45),
              position: 'absolute' as const,
              bottom: '-12px',
              left: '-10px',
              padding: '8px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              zIndex: 10,
            }}>
              <TrendingUp size={12} color="#2d6b4a" />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e4d35' }}>+18.2%</span>
            </div>
          </div>

          {/* Actions Card */}
          <div style={{ ...neuPanel, overflow: 'visible' }}>
            <h3 style={sectionTitle}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: `linear-gradient(${lightAngle}deg, #fff, #22C55E)`,
                boxShadow: '0 1px 3px rgba(34,197,94,0.3)',
              }} />
              Color-Matched
            </h3>
            <h2 style={cardTitle}>Quick Actions</h2>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '16px' }}>
              <span style={glassBadge(145, 40)}>
                <Zap size={10} /> Active
              </span>
              <span style={glassBadge(175, 35)}>
                <Star size={10} /> Premium
              </span>
              <span style={glassBadge(215, 40)}>
                <ArrowUpRight size={10} /> +24%
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { symbol: 'AAPL', action: 'BUY', hue: 145, sat: 40 },
                { symbol: 'GOOGL', action: 'SELL', hue: 355, sat: 35 },
              ].map((item) => (
                <div key={item.symbol} style={{
                  ...neuInset,
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Activity size={14} color="#3a6a72" />
                    <span style={{ fontWeight: 600, color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)', fontSize: '13px' }}>
                      {item.symbol}
                    </span>
                  </div>
                  <span style={glassBadge(item.hue, item.sat)}>
                    {item.action}
                  </span>
                </div>
              ))}
            </div>

            {/* Teal Glass */}
            <div style={{
              ...glassCard(175, 35),
              position: 'absolute' as const,
              bottom: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap' as const,
              zIndex: 10,
            }}>
              <Settings size={12} color="#3d7a7c" style={{ animation: 'spin 4s linear infinite' }} />
              <span style={{ fontSize: '10px', color: '#2d5a5c', fontWeight: 500 }}>Auto-rebalancing</span>
              <ChevronRight size={12} color="#3a6a72" />
            </div>

            {/* Amber Glass */}
            <div style={{
              ...glassCard(35, 55),
              position: 'absolute' as const,
              top: '-8px',
              left: '30%',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              zIndex: 10,
            }}>
              <Zap size={10} color="#8a6520" />
              <span style={{ fontSize: '9px', fontWeight: 600, color: '#6b4f18' }}>Priority</span>
            </div>

            {/* Cyan Glass */}
            <div style={{
              ...glassCard(190, 50),
              position: 'absolute' as const,
              top: '40%',
              right: '-14px',
              padding: '8px 10px',
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: '2px',
              zIndex: 10,
            }}>
              <BarChart2 size={14} color="#1e5a6b" />
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#154550', fontFamily: 'var(--sentinel-font-mono)' }}>24h</span>
            </div>
          </div>
        </div>

        {/* Light Engine Info Panel */}
        <div style={{
          ...glassCard(175, 35),
          padding: '16px 24px',
          marginTop: '24px',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#2d5a5c', marginBottom: '4px' }}>
                Current Light: {Math.round(lightAngle)}°
              </div>
              <p style={{ fontSize: '10px', color: '#3d6a6c', margin: 0 }}>
                X: {shadowOffsets.x.toFixed(2)} | Y: {shadowOffsets.y.toFixed(2)} | {isAnimating ? 'Animating' : 'Paused'}
              </p>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#2d5a5c', marginBottom: '4px' }}>
                Shadow Formula
              </div>
              <p style={{ fontSize: '10px', color: '#3d6a6c', margin: 0 }}>
                X = cos(angle) × distance | Y = sin(angle) × distance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PHILOSOPHY SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Filosofia del Sistema</h2>

      <div style={conceptBoxStyles}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '12px' }}>
              Una Fuente de Luz
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--sentinel-text-secondary)', lineHeight: 1.6 }}>
              Todos los elementos comparten la misma direccion de luz (arriba-izquierda).
              Esto crea coherencia visual y simula un ambiente fisico real.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '12px' }}>
              Ratio Consistente
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--sentinel-text-secondary)', lineHeight: 1.6 }}>
              Offset vertical = 2x offset horizontal. Este ratio se mantiene
              en todos los niveles de elevacion para simular la misma fuente de luz.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '12px' }}>
              Sombras en Capas
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--sentinel-text-secondary)', lineHeight: 1.6 }}>
              Multiples box-shadows apiladas crean profundidad progresiva.
              Cada capa tiene offset y blur incrementales para realismo.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          LAYERED SHADOWS
          ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Sombras en Capas (Layered Shadows)</h2>

      <ShowcaseSection
        title="Sistema de Elevacion"
        description="5 niveles de elevacion con sombras multicapa. Cada nivel agrega mas capas para mayor profundidad."
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-base)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`elevation-${level}`}
                style={{
                  ...demoBoxBase,
                  cursor: 'pointer',
                  border: activeElevation === level ? '2px solid var(--sentinel-accent-primary)' : '2px solid transparent'
                }}
                onClick={() => setActiveElevation(level)}
              >
                <span style={{
                  fontFamily: 'var(--sentinel-font-display)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--sentinel-text-primary)'
                }}>
                  {level}
                </span>
                <span style={{
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '11px',
                  color: 'var(--sentinel-text-tertiary)'
                }}>
                  {level} capas
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <div style={conceptBoxStyles}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sentinel-accent-primary)', marginBottom: '12px' }}>
          Elevation {activeElevation} - Codigo CSS
        </h4>
        <pre style={codeBlockStyles}>
{activeElevation === 1 ? `--elevation-1:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.12),
  1px 2px 2px hsl(var(--shadow-color) / 0.08);

/* 2 capas: sombra crisp + sombra difusa */` :
activeElevation === 2 ? `--elevation-2:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.10),
  1px 2px 2px hsl(var(--shadow-color) / 0.10),
  2px 4px 4px hsl(var(--shadow-color) / 0.10);

/* 3 capas: progresion geometrica de blur */` :
activeElevation === 3 ? `--elevation-3:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.07),
  1px 2px 2px hsl(var(--shadow-color) / 0.07),
  2px 4px 4px hsl(var(--shadow-color) / 0.07),
  4px 8px 8px hsl(var(--shadow-color) / 0.07);

/* 4 capas: ideal para cards y paneles */` :
activeElevation === 4 ? `--elevation-4:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.06),
  1px 2px 2px hsl(var(--shadow-color) / 0.06),
  2px 4px 4px hsl(var(--shadow-color) / 0.06),
  4px 8px 8px hsl(var(--shadow-color) / 0.06),
  8px 16px 16px hsl(var(--shadow-color) / 0.06);

/* 5 capas: dropdowns y popovers */` :
`--elevation-5:
  0.5px 1px 1px hsl(var(--shadow-color) / 0.04),
  1px 2px 2px hsl(var(--shadow-color) / 0.04),
  2px 4px 4px hsl(var(--shadow-color) / 0.04),
  4px 8px 8px hsl(var(--shadow-color) / 0.04),
  8px 16px 16px hsl(var(--shadow-color) / 0.04),
  16px 32px 32px hsl(var(--shadow-color) / 0.04);

/* 6 capas: maxima elevacion para modales */`}
        </pre>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          NEUMORPHIC SYSTEM
          ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Neumorfismo con Fuente de Luz Unificada</h2>

      <ShowcaseSection
        title="Elevaciones Neumorficas"
        description="El neumorfismo usa dos sombras opuestas. El highlight sigue la direccion de la luz, la sombra va en direccion opuesta."
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-base)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`neu-elevation-${level}`}
                style={{
                  ...demoBoxBase,
                  backgroundColor: 'var(--sentinel-bg-base)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--sentinel-font-display)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--sentinel-text-primary)'
                }}>
                  Neu {level}
                </span>
                <span style={{
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '11px',
                  color: 'var(--sentinel-text-tertiary)'
                }}>
                  elevated
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estados Inset (Hundidos)"
        description="Para inputs y elementos que necesitan verse 'dentro' de la superficie."
      >
        <ComponentPreview>
          <div style={{
            backgroundColor: 'var(--sentinel-bg-base)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`neu-inset-${level}`}
                style={{
                  ...demoBoxBase,
                  backgroundColor: 'var(--sentinel-bg-base)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--sentinel-font-display)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--sentinel-text-primary)'
                }}>
                  Inset {level}
                </span>
                <span style={{
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '11px',
                  color: 'var(--sentinel-text-tertiary)'
                }}>
                  hundido
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          GLASS SYSTEM
          ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Glassmorphism con Reflexion de Luz</h2>

      <ShowcaseSection
        title="Elevaciones Glass"
        description="El vidrio refleja luz en el borde superior-izquierdo (donde impacta la luz) y proyecta sombra hacia abajo-derecha."
      >
        <ComponentPreview>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            padding: '48px',
            borderRadius: 'var(--sentinel-radius-xl)',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`glass-elevation-${level}`}
                style={{
                  ...demoBoxBase,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--sentinel-font-display)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}>
                  Glass {level}
                </span>
                <span style={{
                  fontFamily: 'var(--sentinel-font-mono)',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  + reflexion
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════════
          USAGE GUIDE
          ═══════════════════════════════════════════════════════════════════════ */}
      <h2 style={sectionHeaderStyles}>Guia de Uso</h2>

      <div style={conceptBoxStyles}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)', marginBottom: '16px' }}>
          Variables CSS Disponibles
        </h4>
        <pre style={codeBlockStyles}>
{`/* Elevaciones Layered (multicapa) */
--elevation-1 ... --elevation-5

/* Elevaciones Neumorficas */
--neu-elevation-1 ... --neu-elevation-5

/* Inset Neumorficos */
--neu-inset-1 ... --neu-inset-3

/* Elevaciones Glass */
--glass-elevation-1 ... --glass-elevation-4

/* Sombras con Color */
--shadow-positive
--shadow-negative
--shadow-warning
--shadow-accent
--shadow-info

/* Estados Interactivos */
--elevation-hover
--elevation-pressed
--elevation-focus`}
        </pre>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes sunOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .light-orbit-container {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

export default LightEngineShowcase;
