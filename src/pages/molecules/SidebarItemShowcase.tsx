// Path: src/pages/molecules/SidebarItemShowcase.tsx
// SENTINEL Design System
import React, { useState } from 'react';
import { SidebarItem } from '../../components/molecules/SidebarItem';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Home, FileText, Settings, User, Bell } from 'lucide-react';

export function SidebarItemShowcase() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  };

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; SidebarItem_</h1>
        <p style={descStyles}>
          // Item de sidebar con barra izquierda, ícono opcional y badge
        </p>
      </header>

      <ShowcaseSection
        title="SidebarItem Básico"
        description="Items con y sin ícono"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '250px', width: '100%' }}>
            <SidebarItem label="Dashboard" icon={Home} onClick={() => console.log('Dashboard')} />
            <SidebarItem label="Documentos" icon={FileText} onClick={() => console.log('Documentos')} />
            <SidebarItem label="Configuración" icon={Settings} onClick={() => console.log('Configuración')} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Active"
        description="Item activo con barra izquierda visible, background #F5F5F5 y color #006081"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '250px', width: '100%' }}>
            <SidebarItem label="Dashboard" icon={Home} isActive={true} onClick={() => setActiveItem('dashboard')} />
            <SidebarItem label="Documentos" icon={FileText} onClick={() => setActiveItem('documents')} />
            <SidebarItem label="Configuración" icon={Settings} onClick={() => setActiveItem('settings')} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Badge"
        description="Items con badges azules (#006081) para contadores o notificaciones"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '250px', width: '100%' }}>
            <SidebarItem label="Mensajes" icon={Bell} badge={5} onClick={() => console.log('Mensajes')} />
            <SidebarItem label="Notificaciones" icon={Bell} badge={25} onClick={() => console.log('Notificaciones')} />
            <SidebarItem label="Actualizaciones" badge={100} onClick={() => console.log('Actualizaciones')} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Disabled"
        description="Items deshabilitados con color #9E9E9E y cursor not-allowed"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '250px', width: '100%' }}>
            <SidebarItem label="Reportes Premium" icon={FileText} disabled={true} />
            <SidebarItem label="Configuración Avanzada" icon={Settings} disabled={true} badge={3} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sidebar Completo"
        description="Ejemplo de sidebar con items interactivos"
      >
        <ComponentPreview>
          <div style={{ width: '250px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Altura:</strong> 40px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Padding:</strong> 0 16px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Barra izquierda:</strong> 4px ancho, var(--primary), visible en active/hover</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Ícono:</strong> 18px, margin-right 12px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Label:</strong> 14px, 400 (normal) | 600 (active)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Active:</strong> background var(--background-tertiary), color var(--primary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Hover:</strong> background var(--background-tertiary), barra izquierda visible</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Badge:</strong> background var(--primary), border-radius 10px</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
