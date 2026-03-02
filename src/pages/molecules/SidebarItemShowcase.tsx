// Path: src/pages/molecules/SidebarItemShowcase.tsx
// QUAFI Design System - Glass-Neumorphism Sidebar Items
import React, { useState, useMemo } from 'react';
import { SidebarItem } from '../../components/molecules/SidebarItem';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { Home, FileText, Settings, User, Bell } from 'lucide-react';
import { showcase } from '../showcaseStyles';

function SidebarItemContent() {
  const { lightAngle } = useLightEngine();
  const [activeItem, setActiveItem] = useState('dashboard');

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light), ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark)`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark), inset ${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light)`;
  };

  const sidebarContainerStyles: React.CSSProperties = {
    maxWidth: '250px',
    width: '100%',
    padding: '16px',
    background: 'var(--marble-base)',
    borderRadius: '20px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}>
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; SidebarItem_</h1>
        <p style={showcase.header.description}>// Item de sidebar con barra izquierda, icono y badge</p>
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
          background: 'var(--marble-base)',
          borderRadius: '20px',
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

      <ShowcaseSection title="Especificaciones Tecnicas">
        <div style={{
          padding: '20px',
          borderRadius: '20px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: 'var(--marble-base)',
          fontSize: '12px',
          fontFamily: 'var(--quafi-font-mono)',
          color: 'var(--quafi-text-muted)',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Altura:</strong> 40px</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Padding:</strong> 0 16px</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Barra izquierda:</strong> 4px ancho, visible en active/hover</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Ícono:</strong> 18px, margin-right 12px</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Label:</strong> 14px, 400 normal / 600 active</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Badge:</strong> background accent, border-radius pill</p>
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
