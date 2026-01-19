// Path: src/pages/molecules/CardShowcase.tsx
// FING Design System - Glass-Neumorphism Cards
import React, { useMemo } from 'react';
import { Card } from '../../components/molecules/Card';
import { Badge } from '../../components/atoms/Badge';
import { ShowcaseSection } from '../../components/showcase';
import { Users, TrendingUp, ShoppingCart, Bell, CheckCircle, AlertCircle, Zap, Star, Shield } from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function CardContent() {
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

  const cardContainerStyles: React.CSSProperties = {
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const glassContainer = (hue: number, sat: number): React.CSSProperties => ({
    padding: '24px',
    background: `linear-gradient(${lightAngle + 45}deg, hsla(${hue}, ${sat}%, 70%, 0.28) 0%, hsla(${hue}, ${sat}%, 65%, 0.12) 50%, hsla(${hue}, ${sat}%, 60%, 0.20) 100%)`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '15px',
    border: `1px solid hsla(${hue}, ${sat}%, 80%, 0.35)`,
    boxShadow: `${getGlassReflection()}, ${shadowOffsets.x * 2}px ${shadowOffsets.y * 3}px 6px hsla(${hue}, ${sat * 0.6}%, 35%, 0.12)`,
    transition: 'box-shadow 50ms linear, background 100ms linear',
  });

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Card_</h1>
        <p style={descStyles}>// Contenedor flexible con header, footer y contenido</p>
      </header>

      <ShowcaseSection
        title="Card Básico"
        description="Card con solo contenido, sin header ni footer"
      >
        <div style={cardContainerStyles}>
          <Card>
            <div style={{ padding: '8px 0' }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)' }}>
                Este es un card básico con contenido simple. Perfecto para mostrar información sin estructura compleja.
              </p>
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Card con Header"
        description="Card con título y acciones en el header"
      >
        <div style={cardContainerStyles}>
          <Card
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-display)' }}>Información del Usuario</h3>
                <Badge variant="success">Activo</Badge>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-mono)' }}>
              <div><strong style={{ color: 'var(--fing-accent-primary)' }}>Nombre:</strong> Juan Pérez</div>
              <div><strong style={{ color: 'var(--fing-accent-primary)' }}>Email:</strong> juan.perez@example.com</div>
              <div><strong style={{ color: 'var(--fing-accent-primary)' }}>Rol:</strong> Administrador</div>
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Cards de Estadísticas"
        description="Cards para mostrar métricas y KPIs importantes"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            { icon: Users, color: 'var(--fing-accent-primary)', label: 'Total Usuarios', value: '1,284' },
            { icon: TrendingUp, color: 'var(--fing-status-positive)', label: 'Ingresos', value: '$45,320' },
            { icon: ShoppingCart, color: 'var(--fing-status-negative)', label: 'Pedidos', value: '342' },
          ].map((stat) => (
            <div key={stat.label} style={cardContainerStyles}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    padding: '12px',
                    background: MARBLE.base,
                    borderRadius: '15px',
                    boxShadow: getNeuInsetShadow(3, 8),
                    display: 'flex',
                  }}>
                    <stat.icon size={32} color={stat.color} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#636E72', fontFamily: 'var(--fing-font-mono)', textTransform: 'uppercase' }}>{stat.label}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 700, color: stat.color, fontFamily: 'var(--fing-font-mono)' }}>{stat.value}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Glass Cards"
        description="Cards con efecto glassmorphism y sombras dinámicas"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={glassContainer(145, 45)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
                <Zap size={28} color="hsl(145, 45%, 30%)" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: 'hsl(145, 45%, 25%)', fontFamily: 'var(--fing-font-mono)', textTransform: 'uppercase' }}>Speed Score</p>
                <p style={{ margin: '4px 0 0', fontSize: '28px', fontWeight: 700, color: 'hsl(145, 45%, 25%)', fontFamily: 'var(--fing-font-display)' }}>98.5</p>
              </div>
            </div>
          </div>

          <div style={glassContainer(35, 55)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
                <Star size={28} color="hsl(35, 55%, 30%)" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: 'hsl(35, 55%, 25%)', fontFamily: 'var(--fing-font-mono)', textTransform: 'uppercase' }}>User Rating</p>
                <p style={{ margin: '4px 0 0', fontSize: '28px', fontWeight: 700, color: 'hsl(35, 55%, 25%)', fontFamily: 'var(--fing-font-display)' }}>4.9/5</p>
              </div>
            </div>
          </div>

          <div style={glassContainer(175, 35)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.3)', borderRadius: '12px' }}>
                <Shield size={28} color="hsl(175, 35%, 30%)" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: 'hsl(175, 35%, 25%)', fontFamily: 'var(--fing-font-mono)', textTransform: 'uppercase' }}>Status</p>
                <p style={{ margin: '4px 0 0', fontSize: '28px', fontWeight: 700, color: 'hsl(175, 35%, 25%)', fontFamily: 'var(--fing-font-display)' }}>Secure</p>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Cards de Notificación"
        description="Cards para alertas, mensajes y notificaciones"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { icon: CheckCircle, color: 'var(--fing-status-positive)', title: 'Operación Exitosa', msg: 'El archivo se ha subido correctamente.' },
            { icon: AlertCircle, color: 'var(--fing-status-negative)', title: 'Acción Requerida', msg: 'Tu suscripción vence en 3 días.' },
            { icon: Bell, color: 'var(--fing-accent-primary)', title: 'Nueva Notificación', msg: 'Juan Pérez ha comentado en tu publicación.' },
          ].map((notif) => (
            <div key={notif.title} style={{
              padding: '20px',
              background: MARBLE.base,
              borderRadius: '15px',
              boxShadow: getNeuPanelShadow(6, 18),
              display: 'flex',
              gap: '16px',
              transition: 'box-shadow 50ms linear',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                background: MARBLE.base,
                borderRadius: '50%',
                boxShadow: getNeuInsetShadow(3, 8),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <notif.icon size={24} color={notif.color} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600, color: 'var(--fing-text-primary)', fontFamily: 'var(--fing-font-display)' }}>{notif.title}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#636E72', lineHeight: '1.6', fontFamily: 'var(--fing-font-mono)' }}>{notif.msg}</p>
              </div>
            </div>
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
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Padding:</strong> 20px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Border radius:</strong> 15px (neumórfico)</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Sombra elevada:</strong> Dual shadow (light + dark)</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Sombra inset:</strong> Para contenedores cavados</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Glass:</strong> HSLA + backdrop-filter blur</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function CardShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <CardContent />
    </LightEngineProvider>
  );
}
