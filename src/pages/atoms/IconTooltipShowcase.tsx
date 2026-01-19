// Path: src/pages/atoms/IconTooltipShowcase.tsx
// FING Design System - Glass-Neumorphism Icons & Tooltips
import React, { useMemo } from 'react';
import { Icon } from '../../components/atoms/Icon';
import { Tooltip } from '../../components/atoms/Tooltip';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { Home, Search, Settings, User, Bell, Mail, Star, Download, Edit, Trash2, Eye, Check, X, AlertCircle, Info, HelpCircle, Terminal, Code, Database, Cpu } from 'lucide-react';

function IconTooltipContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  const getGlassReflection = (): string => {
    const { x, y } = shadowOffsets;
    const topHighlight = -y < 0 ? 0.6 : 0.2;
    const leftHighlight = -x < 0 ? 0.4 : 0.15;
    return `inset 0 ${-y < 0 ? '-1px' : '1px'} 0 hsla(0, 0%, 100%, ${topHighlight}), inset ${-x < 0 ? '-1px' : '1px'} 0 0 hsla(0, 0%, 100%, ${leftHighlight})`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--fing-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--fing-text-secondary)',
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const iconBoxStyles: React.CSSProperties = {
    width: '52px',
    height: '52px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'box-shadow 50ms linear',
  };

  const glassIconBox = (hue: number, sat: number): React.CSSProperties => ({
    width: '52px',
    height: '52px',
    background: `linear-gradient(${lightAngle + 45}deg, hsla(${hue}, ${sat}%, 70%, 0.28) 0%, hsla(${hue}, ${sat}%, 65%, 0.12) 50%, hsla(${hue}, ${sat}%, 60%, 0.20) 100%)`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '15px',
    border: `1px solid hsla(${hue}, ${sat}%, 80%, 0.35)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `${getGlassReflection()}, ${shadowOffsets.x * 2}px ${shadowOffsets.y * 3}px 6px hsla(${hue}, ${sat * 0.6}%, 35%, 0.12)`,
    transition: 'box-shadow 50ms linear, background 100ms linear',
  });

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Icon & Tooltip_</h1>
        <p style={descStyles}>// Iconos Lucide con 4 tamaños y Tooltip con variantes</p>
      </header>

      <ShowcaseSection
        title="Tamaños de Iconos"
        description="xs (16px), sm (20px), md (24px), lg (32px)"
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '24px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuPanelShadow(8, 24),
          transition: 'box-shadow 50ms linear',
        }}>
          {[
            { size: 'xs' as const, label: 'xs (16px)' },
            { size: 'sm' as const, label: 'sm (20px)' },
            { size: 'md' as const, label: 'md (24px)' },
            { size: 'lg' as const, label: 'lg (32px)' },
          ].map((item) => (
            <div key={item.size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={iconBoxStyles}>
                <Icon icon={Terminal} size={item.size} />
              </div>
              <span style={{ fontSize: '11px', color: '#636E72', fontFamily: 'var(--fing-font-mono)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Iconos con Glass Effect"
        description="Colores semánticos con glassmorphism"
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
        }}>
          {[
            { icon: Star, hue: 175, sat: 35, label: 'Primary' },
            { icon: Check, hue: 145, sat: 45, label: 'Success' },
            { icon: X, hue: 355, sat: 35, label: 'Error' },
            { icon: AlertCircle, hue: 35, sat: 55, label: 'Warning' },
            { icon: Info, hue: 215, sat: 50, label: 'Info' },
            { icon: Cpu, hue: 280, sat: 40, label: 'Premium' },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={glassIconBox(item.hue, item.sat)}>
                <item.icon size={24} color={`hsl(${item.hue}, ${item.sat * 0.8}%, 30%)`} />
              </div>
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--fing-font-mono)' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Iconos Neumórficos"
        description="Contenedores elevados con sombras dinámicas"
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}>
          {[
            { icon: Terminal, label: 'Terminal' },
            { icon: Code, label: 'Code' },
            { icon: Database, label: 'Database' },
            { icon: Cpu, label: 'Cpu' },
            { icon: Home, label: 'Home' },
            { icon: Search, label: 'Search' },
            { icon: Settings, label: 'Settings' },
            { icon: User, label: 'User' },
            { icon: Bell, label: 'Bell' },
            { icon: Mail, label: 'Mail' },
            { icon: Download, label: 'Download' },
            { icon: Edit, label: 'Edit' },
          ].map(({ icon: IconComp, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={iconBoxStyles}>
                <Icon icon={IconComp} size="md" color="primary" />
              </div>
              <span style={{ fontSize: '10px', textAlign: 'center', color: '#636E72', fontFamily: 'var(--fing-font-mono)', textTransform: 'uppercase' }}>{label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tooltip - Variantes"
        description="Dark (default) y Light - Hover sobre los iconos"
      >
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
          padding: '32px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuPanelShadow(8, 24),
          justifyContent: 'center',
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Tooltip content="Tooltip oscuro con fondo oscuro" variant="dark">
              <div style={iconBoxStyles}>
                <Icon icon={Info} size="md" color="primary" />
              </div>
            </Tooltip>
            <span style={{ fontSize: '11px', color: '#636E72', fontFamily: 'var(--fing-font-mono)', textTransform: 'uppercase' }}>Dark (hover)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Tooltip content="Tooltip claro" variant="light">
              <div style={iconBoxStyles}>
                <Icon icon={HelpCircle} size="md" color="primary" />
              </div>
            </Tooltip>
            <span style={{ fontSize: '11px', color: '#636E72', fontFamily: 'var(--fing-font-mono)', textTransform: 'uppercase' }}>Light (hover)</span>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Tooltip - Posiciones"
        description="Top, Right, Bottom, Left - Hover sobre cada icono"
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '32px',
          padding: '48px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          transition: 'box-shadow 50ms linear',
        }}>
          {[
            { position: 'top' as const, label: 'Top' },
            { position: 'right' as const, label: 'Right' },
            { position: 'bottom' as const, label: 'Bottom' },
            { position: 'left' as const, label: 'Left' },
          ].map((item) => (
            <div key={item.position} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <Tooltip content={`Tooltip ${item.label.toLowerCase()}`} position={item.position}>
                <div style={iconBoxStyles}>
                  <Icon icon={AlertCircle} size="md" color="primary" />
                </div>
              </Tooltip>
              <span style={{ fontSize: '11px', color: '#636E72', fontFamily: 'var(--fing-font-mono)', textTransform: 'uppercase' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Casos de Uso: Iconos con Tooltip"
        description="Ejemplos de iconos con tooltips informativos"
      >
        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '24px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuPanelShadow(8, 24),
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 50ms linear',
        }}>
          {[
            { icon: Edit, tooltip: 'Editar información', color: 'primary' as const },
            { icon: Trash2, tooltip: 'Eliminar permanentemente', color: 'destructive' as const },
            { icon: Eye, tooltip: 'Ver detalles completos', color: 'secondary' as const },
            { icon: Download, tooltip: 'Descargar reporte', color: 'primary' as const },
            { icon: HelpCircle, tooltip: 'Ayuda y soporte', color: 'info' as const },
          ].map(({ icon: IconComp, tooltip, color }, index) => (
            <Tooltip key={index} content={tooltip}>
              <button style={{
                ...iconBoxStyles,
                border: 'none',
                cursor: 'pointer',
              }}>
                <Icon icon={IconComp} size="md" color={color} />
              </button>
            </Tooltip>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          fontSize: '12px',
          fontFamily: 'var(--fing-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p><strong style={{ color: 'var(--fing-accent-primary)' }}>Icon:</strong></p>
          <p>✓ <strong>Basado en:</strong> Lucide React</p>
          <p>✓ <strong>Tamaños:</strong> xs (16px), sm (20px), md (24px), lg (32px)</p>
          <p>✓ <strong>Contenedor:</strong> 52x52px neumórfico elevado</p>
          <p>✓ <strong>Glass:</strong> HSLA con backdrop-filter blur</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--fing-accent-primary)' }}>Tooltip:</strong></p>
          <p>✓ <strong>Padding:</strong> 8px 12px</p>
          <p>✓ <strong>Border radius:</strong> 15px</p>
          <p>✓ <strong>Font:</strong> Space Mono, 12px</p>
          <p>✓ <strong>Dark:</strong> bg #252528</p>
          <p>✓ <strong>Light:</strong> bg #FFFFFF</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function IconTooltipShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <IconTooltipContent />
    </LightEngineProvider>
  );
}
