// Path: src/pages/atoms/BadgeShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Badges
import React, { useMemo } from 'react';
import { Badge } from '../../components/atoms/Badge';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function BadgeContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}`;
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
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const badgeContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    padding: '20px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const glassIconBox = (hue: number, sat: number): React.CSSProperties => ({
    padding: '20px',
    background: `linear-gradient(${lightAngle + 45}deg, hsla(${hue}, ${sat}%, 70%, 0.28) 0%, hsla(${hue}, ${sat}%, 65%, 0.12) 50%, hsla(${hue}, ${sat}%, 60%, 0.20) 100%)`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '15px',
    border: `1px solid hsla(${hue}, ${sat}%, 80%, 0.35)`,
    boxShadow: `${getGlassReflection()}, ${shadowOffsets.x * 2}px ${shadowOffsets.y * 3}px 6px hsla(${hue}, ${sat * 0.6}%, 35%, 0.12)`,
    transition: 'box-shadow 50ms linear, background 100ms linear',
  });

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Badge_</h1>
        <p style={descStyles}>// Indicador visual de estado o categoría</p>
      </header>

      <ShowcaseSection
        title="Success Badge"
        description="Para estados exitosos o activos"
      >
        <div style={badgeContainerStyles}>
          <Badge variant="success">Activo</Badge>
          <Badge variant="success">Completado</Badge>
          <Badge variant="success">Aprobado</Badge>
          <Badge variant="success">Éxito</Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Error Badge"
        description="Para estados de error o rechazados"
      >
        <div style={badgeContainerStyles}>
          <Badge variant="error">Error</Badge>
          <Badge variant="error">Rechazado</Badge>
          <Badge variant="error">Inactivo</Badge>
          <Badge variant="error">Fallido</Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Warning Badge"
        description="Para advertencias o pendientes"
      >
        <div style={badgeContainerStyles}>
          <Badge variant="warning">Pendiente</Badge>
          <Badge variant="warning">Advertencia</Badge>
          <Badge variant="warning">En espera</Badge>
          <Badge variant="warning">Atención</Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Info Badge"
        description="Para información o estados en progreso"
      >
        <div style={badgeContainerStyles}>
          <Badge variant="info">En progreso</Badge>
          <Badge variant="info">Información</Badge>
          <Badge variant="info">Nuevo</Badge>
          <Badge variant="info">Beta</Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Neutral Badge"
        description="Para estados generales o neutrales"
      >
        <div style={badgeContainerStyles}>
          <Badge variant="neutral">Borrador</Badge>
          <Badge variant="neutral">Archivado</Badge>
          <Badge variant="neutral">General</Badge>
          <Badge variant="neutral">Otro</Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Glass Badges"
        description="Glassmorphism con sombras dinámicas - Soporte para hue/sat personalizados"
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          <div style={glassIconBox(175, 35)}>
            <h4 style={{
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '12px',
              color: '#2D3436',
              fontFamily: 'var(--sentinel-font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Colores Semánticos
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Badge variant="glass" hue={175} sat={35}>Primary</Badge>
              <Badge variant="glass" hue={145} sat={45}>Success</Badge>
              <Badge variant="glass" hue={355} sat={35}>Error</Badge>
              <Badge variant="glass" hue={35} sat={55}>Warning</Badge>
              <Badge variant="glass" hue={215} sat={50}>Info</Badge>
              <Badge variant="glass" hue={280} sat={40}>Premium</Badge>
            </div>
          </div>

          <div style={glassIconBox(215, 50)}>
            <h4 style={{
              fontSize: '12px',
              fontWeight: 600,
              marginBottom: '12px',
              color: '#2D3436',
              fontFamily: 'var(--sentinel-font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Hues Personalizados
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Badge variant="glass" hue={0} sat={50}>Hue 0°</Badge>
              <Badge variant="glass" hue={60} sat={50}>Hue 60°</Badge>
              <Badge variant="glass" hue={120} sat={50}>Hue 120°</Badge>
              <Badge variant="glass" hue={180} sat={50}>Hue 180°</Badge>
              <Badge variant="glass" hue={240} sat={50}>Hue 240°</Badge>
              <Badge variant="glass" hue={300} sat={50}>Hue 300°</Badge>
            </div>
          </div>
        </div>
        <p style={{
          marginTop: '16px',
          fontSize: '12px',
          color: '#636E72',
          fontFamily: 'var(--sentinel-font-mono)',
        }}>
          Las sombras responden dinámicamente al Light Engine global
        </p>
      </ShowcaseSection>

      <ShowcaseSection
        title="Casos de Uso"
        description="Ejemplos de badges en contexto"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <div style={{
            padding: '20px',
            background: LIGHT.base,
            borderRadius: '15px',
            boxShadow: getNeuInsetShadow(5, 15),
            transition: 'box-shadow 50ms linear',
          }}>
            <h4 style={{ fontSize: '12px', fontWeight: 600, marginBottom: '16px', color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Estados de Usuario
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>Juan Pérez</span>
                <Badge variant="success">Activo</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>María García</span>
                <Badge variant="error">Inactivo</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>Carlos López</span>
                <Badge variant="warning">Pendiente</Badge>
              </div>
            </div>
          </div>

          <div style={{
            padding: '20px',
            background: LIGHT.base,
            borderRadius: '15px',
            boxShadow: getNeuInsetShadow(5, 15),
            transition: 'box-shadow 50ms linear',
          }}>
            <h4 style={{ fontSize: '12px', fontWeight: 600, marginBottom: '16px', color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Estados de Orden
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>Orden #1234</span>
                <Badge variant="success">Entregado</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>Orden #1235</span>
                <Badge variant="info">En camino</Badge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#2D3436', fontFamily: 'var(--sentinel-font-mono)' }}>Orden #1236</span>
                <Badge variant="warning">Procesando</Badge>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: LIGHT.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Padding:</strong> 4px 8px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Border radius:</strong> 15px (neumórfico)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Tipografía:</strong> 12px Semibold, Space Mono</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Display:</strong> inline-flex, align-items center</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Glass:</strong> HSLA colores con backdrop-filter blur</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function BadgeShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <BadgeContent />
    </LightEngineProvider>
  );
}
