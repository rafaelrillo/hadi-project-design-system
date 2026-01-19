// Path: src/pages/molecules/SidebarItemShowcase.tsx
// FING Design System - Glass-Neumorphism Sidebar Items
import React, { useState, useMemo } from 'react';
import { SidebarItem } from '../../components/molecules/SidebarItem';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { Home, FileText, Settings, User, Bell } from 'lucide-react';

function SidebarItemContent() {
  const { lightAngle } = useLightEngine();
  const [activeItem, setActiveItem] = useState('dashboard');

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

  const sidebarContainerStyles: React.CSSProperties = {
    maxWidth: '250px',
    width: '100%',
    padding: '16px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; SidebarItem_</h1>
        <p style={descStyles}>// Item de sidebar con barra izquierda, ícono y badge</p>
      </header>

      <ShowcaseSection
        title="SidebarItem Básico"
        description="Items con y sin ícono"
      >
        <div style={sidebarContainerStyles}>
          <SidebarItem label="Dashboard" icon={Home} onClick={() => console.log('Dashboard')} />
          <SidebarItem label="Documentos" icon={FileText} onClick={() => console.log('Documentos')} />
          <SidebarItem label="Configuración" icon={Settings} onClick={() => console.log('Configuración')} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Active"
        description="Item activo con estilo diferenciado"
      >
        <div style={sidebarContainerStyles}>
          <SidebarItem label="Dashboard" icon={Home} isActive={true} onClick={() => setActiveItem('dashboard')} />
          <SidebarItem label="Documentos" icon={FileText} onClick={() => setActiveItem('documents')} />
          <SidebarItem label="Configuración" icon={Settings} onClick={() => setActiveItem('settings')} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Badge"
        description="Items con badges para contadores o notificaciones"
      >
        <div style={sidebarContainerStyles}>
          <SidebarItem label="Mensajes" icon={Bell} badge={5} onClick={() => console.log('Mensajes')} />
          <SidebarItem label="Notificaciones" icon={Bell} badge={25} onClick={() => console.log('Notificaciones')} />
          <SidebarItem label="Actualizaciones" badge={100} onClick={() => console.log('Actualizaciones')} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Disabled"
        description="Items deshabilitados con opacidad reducida"
      >
        <div style={sidebarContainerStyles}>
          <SidebarItem label="Reportes Premium" icon={FileText} disabled={true} />
          <SidebarItem label="Configuración Avanzada" icon={Settings} disabled={true} badge={3} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sidebar Completo"
        description="Ejemplo de sidebar con items interactivos"
      >
        <div style={{
          width: '250px',
          padding: '20px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          transition: 'box-shadow 50ms linear',
        }}>
          <SidebarItem
            label="Dashboard"
            icon={Home}
            isActive={activeItem === 'dashboard'}
            onClick={() => setActiveItem('dashboard')}
          />
          <SidebarItem
            label="Documentos"
            icon={FileText}
            isActive={activeItem === 'documents'}
            onClick={() => setActiveItem('documents')}
          />
          <SidebarItem
            label="Notificaciones"
            icon={Bell}
            badge={12}
            isActive={activeItem === 'notifications'}
            onClick={() => setActiveItem('notifications')}
          />
          <SidebarItem
            label="Perfil"
            icon={User}
            isActive={activeItem === 'profile'}
            onClick={() => setActiveItem('profile')}
          />
          <SidebarItem
            label="Configuración"
            icon={Settings}
            isActive={activeItem === 'settings'}
            onClick={() => setActiveItem('settings')}
          />
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
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Altura:</strong> 40px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Padding:</strong> 0 16px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Barra izquierda:</strong> 4px ancho, visible en active/hover</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Ícono:</strong> 18px, margin-right 12px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Label:</strong> 14px, 400 normal / 600 active</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Badge:</strong> background accent, border-radius pill</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function SidebarItemShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <SidebarItemContent />
    </LightEngineProvider>
  );
}
