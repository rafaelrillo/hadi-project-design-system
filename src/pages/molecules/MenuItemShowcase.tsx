// Path: src/pages/molecules/MenuItemShowcase.tsx
// Terminal Theme Version
import { useState } from 'react';
import { MenuItem } from '../../components/molecules/MenuItem';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Home, Settings, User, Bell, Mail, FileText, HelpCircle } from 'lucide-react';

export function MenuItemShowcase() {
  const [activeItem, setActiveItem] = useState('home');

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
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; MenuItem_</h1>
        <p style={descStyles}>
          // Item de menú con ícono, label, badge y estados active/disabled
        </p>
      </header>

      {/* Basic MenuItem */}
      <ShowcaseSection
        title="MenuItem Básico"
        description="Items de menú con íconos y labels"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '300px', width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <MenuItem icon={Home} label="Inicio" onClick={() => console.log('Inicio')} />
            <MenuItem icon={Settings} label="Configuración" onClick={() => console.log('Configuración')} />
            <MenuItem icon={User} label="Perfil" onClick={() => console.log('Perfil')} />
            <MenuItem icon={FileText} label="Documentos" onClick={() => console.log('Documentos')} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Active State */}
      <ShowcaseSection
        title="Estado Active"
        description="Item activo con background #D4F7FF, color #006081 y font-weight 600"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '300px', width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <MenuItem icon={Home} label="Inicio" active={true} onClick={() => setActiveItem('home')} />
            <MenuItem icon={Settings} label="Configuración" onClick={() => setActiveItem('settings')} />
            <MenuItem icon={User} label="Perfil" onClick={() => setActiveItem('profile')} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Badge */}
      <ShowcaseSection
        title="Con Badge"
        description="Items con badges para notificaciones o contadores. Badge rojo con texto blanco"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '300px', width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <MenuItem icon={Mail} label="Mensajes" badge={5} onClick={() => console.log('Mensajes')} />
            <MenuItem icon={Bell} label="Notificaciones" badge={12} onClick={() => console.log('Notificaciones')} />
            <MenuItem icon={FileText} label="Documentos" badge="Nuevo" onClick={() => console.log('Documentos')} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Disabled State */}
      <ShowcaseSection
        title="Estado Disabled"
        description="Items deshabilitados con opacidad 0.5 y cursor not-allowed"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '300px', width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <MenuItem icon={Settings} label="Configuración avanzada" disabled={true} />
            <MenuItem icon={HelpCircle} label="Ayuda premium" disabled={true} badge={3} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Interactive Menu */}
      <ShowcaseSection
        title="Menú Interactivo"
        description="Menú completo con selección de item activo"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '300px', width: '100%', padding: '16px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              Navegación
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <MenuItem
                icon={Home}
                label="Inicio"
                active={activeItem === 'home'}
                onClick={() => setActiveItem('home')}
              />
              <MenuItem
                icon={Mail}
                label="Mensajes"
                badge={5}
                active={activeItem === 'messages'}
                onClick={() => setActiveItem('messages')}
              />
              <MenuItem
                icon={Bell}
                label="Notificaciones"
                badge={12}
                active={activeItem === 'notifications'}
                onClick={() => setActiveItem('notifications')}
              />
              <MenuItem
                icon={FileText}
                label="Documentos"
                active={activeItem === 'documents'}
                onClick={() => setActiveItem('documents')}
              />
              <MenuItem
                icon={Settings}
                label="Configuración"
                active={activeItem === 'settings'}
                onClick={() => setActiveItem('settings')}
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Altura:</strong> 40px (fija)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Padding:</strong> 12px 16px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Gap:</strong> 12px entre ícono y label</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border radius:</strong> var(--radius-sm)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Ícono:</strong> 20px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Label:</strong> 14px, 400 (normal) | 600 (active)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Hover:</strong> background var(--background-tertiary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Active:</strong> background con glow, color var(--primary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Disabled:</strong> opacity 0.5, cursor not-allowed</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Badge:</strong> 12px Semibold (600), background var(--destructive)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
