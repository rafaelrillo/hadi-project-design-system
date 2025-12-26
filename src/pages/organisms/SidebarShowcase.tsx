// Path: src/pages/organisms/SidebarShowcase.tsx
// SENTINEL Design System
import React, { useState } from 'react';
import { Sidebar } from '../../components/organisms/Sidebar';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Home, FileText, Settings, User, Bell, Mail } from 'lucide-react';

export function SidebarShowcase() {
  const [activePage, setActivePage] = useState('home');

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

  const SentinelLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>
  );

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      isActive: activePage === 'home',
      onClick: () => setActivePage('home')
    },
    {
      icon: FileText,
      label: 'Documentos',
      isActive: activePage === 'documents',
      onClick: () => setActivePage('documents')
    },
    {
      icon: Bell,
      label: 'Notificaciones',
      isActive: activePage === 'notifications',
      onClick: () => setActivePage('notifications')
    },
    {
      icon: Mail,
      label: 'Mensajes',
      isActive: activePage === 'messages',
      onClick: () => setActivePage('messages')
    },
    {
      icon: Settings,
      label: 'Configuración',
      isActive: activePage === 'settings',
      onClick: () => setActivePage('settings')
    }
  ];

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Sidebar_</h1>
        <p style={descStyles}>
          // Barra lateral de navegación vertical con íconos y barra activa
        </p>
      </header>

      <ShowcaseSection
        title="Sidebar Básico"
        description="Navegación vertical con product logo, menu items y user icon"
      >
        <ComponentPreview>
          <div style={{ height: '500px', position: 'relative' }}>
            <Sidebar
              productLogo={<SentinelLogo />}
              menuItems={menuItems}
              userIcon={<User size={24} color="var(--primary)" />}
              onLogsClick={() => console.log('Ver logs')}
              onLogoutClick={() => console.log('Cerrar sesión')}
              position="relative"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estados del MenuItem"
        description="Item activo con background #006081 y barra izquierda de 4px"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '20px', height: '400px' }}>
            <div style={{ position: 'relative' }}>
              <Sidebar
                productLogo={<SentinelLogo />}
                menuItems={[
                  { icon: Home, label: 'Home', isActive: true },
                  { icon: FileText, label: 'Docs' },
                  { icon: Settings, label: 'Settings' }
                ]}
                position="relative"
              />
            </div>
            <div style={{ fontSize: '14px', color: 'var(--foreground-muted)', flex: 1, fontFamily: 'var(--font-mono)' }}>
              <p><strong style={{ color: 'var(--primary)' }}>Estado Normal:</strong></p>
              <p>• Background: var(--background-secondary)</p>
              <p>• Color: var(--foreground)</p>
              <p style={{ marginTop: '12px' }}><strong style={{ color: 'var(--primary)' }}>Estado Active:</strong></p>
              <p>• Background: var(--primary)</p>
              <p>• Color: var(--background)</p>
              <p>• Barra izquierda 4px var(--primary)</p>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Botones Inferiores"
        description="Logs y Logout buttons en la sección inferior"
      >
        <ComponentPreview>
          <div style={{ height: '500px', position: 'relative' }}>
            <Sidebar
              productLogo={<SentinelLogo />}
              menuItems={menuItems}
              userIcon={<User size={24} color="var(--primary)" />}
              onLogsClick={() => alert('Ver logs del sistema')}
              onLogoutClick={() => alert('Cerrando sesión...')}
              position="relative"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sidebar Completo Interactivo"
        description="Click en los items para cambiar el estado activo"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', height: '600px' }}>
            <div style={{ position: 'relative' }}>
              <Sidebar
                productLogo={<SentinelLogo />}
                menuItems={menuItems}
                userIcon={<User size={24} color="var(--primary)" />}
                onLogsClick={() => alert('Ver logs')}
                onLogoutClick={() => alert('Logout')}
                position="relative"
              />
            </div>
            <div style={{ flex: 1, padding: '24px', backgroundColor: 'var(--background-tertiary)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                {activePage === 'home' && 'Dashboard'}
                {activePage === 'documents' && 'Documentos'}
                {activePage === 'notifications' && 'Notificaciones'}
                {activePage === 'messages' && 'Mensajes'}
                {activePage === 'settings' && 'Configuración'}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                Contenido de la página {activePage}
              </p>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Ancho:</strong> 56px (fijo)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Altura:</strong> 100vh (full height)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Position:</strong> fixed | relative | absolute</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Shadow:</strong> var(--shadow-md)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Logo container:</strong> 56x56px, padding 16px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Menu item:</strong> 56x56px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Ícono:</strong> 24px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Barra izquierda active:</strong> 4px ancho, var(--primary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Active background:</strong> var(--primary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>z-index:</strong> 40</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
