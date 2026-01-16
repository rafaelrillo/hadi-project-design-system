// Path: src/pages/organisms/SidebarShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Sidebar
import React, { useState, useMemo } from 'react';
import { Sidebar } from '../../components/organisms/Sidebar';
import { ShowcaseSection } from '../../components/showcase';
import { Home, FileText, Settings, User, Bell, Mail } from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function SidebarContent() {
  const { lightAngle } = useLightEngine();
  const [activePage, setActivePage] = useState('home');

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

  const sidebarContainerStyles: React.CSSProperties = {
    padding: '20px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const SentinelLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--sentinel-accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
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
        <div style={sidebarContainerStyles}>
          <div style={{ height: '500px', position: 'relative' }}>
            <Sidebar
              productLogo={<SentinelLogo />}
              menuItems={menuItems}
              userIcon={<User size={24} color="var(--sentinel-accent-primary)" />}
              onLogsClick={() => console.log('Ver logs')}
              onLogoutClick={() => console.log('Cerrar sesión')}
              position="relative"
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estados del MenuItem"
        description="Item activo con background accent y barra izquierda de 4px"
      >
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={sidebarContainerStyles}>
            <div style={{ height: '400px', position: 'relative' }}>
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
          </div>
          <div style={{
            ...sidebarContainerStyles,
            flex: 1,
            boxShadow: getNeuInsetShadow(5, 15),
          }}>
            <div style={{
              fontSize: '14px',
              color: '#636E72',
              fontFamily: 'var(--sentinel-font-mono)',
            }}>
              <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Estado Normal:</strong></p>
              <p>• Background: base neumórfico</p>
              <p>• Color: texto secundario</p>
              <p style={{ marginTop: '12px' }}><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Estado Active:</strong></p>
              <p>• Background: accent primary</p>
              <p>• Color: texto claro</p>
              <p>• Barra izquierda 4px accent</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Botones Inferiores"
        description="Logs y Logout buttons en la sección inferior"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '500px', position: 'relative' }}>
            <Sidebar
              productLogo={<SentinelLogo />}
              menuItems={menuItems}
              userIcon={<User size={24} color="var(--sentinel-accent-primary)" />}
              onLogsClick={() => alert('Ver logs del sistema')}
              onLogoutClick={() => alert('Cerrando sesión...')}
              position="relative"
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sidebar Completo Interactivo"
        description="Click en los items para cambiar el estado activo"
      >
        <div style={{
          ...sidebarContainerStyles,
          boxShadow: getNeuInsetShadow(5, 15),
        }}>
          <div style={{ display: 'flex', height: '600px' }}>
            <div style={{ position: 'relative' }}>
              <Sidebar
                productLogo={<SentinelLogo />}
                menuItems={menuItems}
                userIcon={<User size={24} color="var(--sentinel-accent-primary)" />}
                onLogsClick={() => alert('Ver logs')}
                onLogoutClick={() => alert('Logout')}
                position="relative"
              />
            </div>
            <div style={{
              flex: 1,
              padding: '24px',
              background: LIGHT.base,
              borderRadius: '15px',
              marginLeft: '16px',
              boxShadow: getNeuPanelShadow(4, 12),
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#2D3436',
                fontFamily: 'var(--sentinel-font-display)',
                textTransform: 'uppercase',
              }}>
                {activePage === 'home' && 'Dashboard'}
                {activePage === 'documents' && 'Documentos'}
                {activePage === 'notifications' && 'Notificaciones'}
                {activePage === 'messages' && 'Mensajes'}
                {activePage === 'settings' && 'Configuración'}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#636E72',
                fontFamily: 'var(--sentinel-font-mono)',
              }}>
                Contenido de la página {activePage}
              </p>
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
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Ancho:</strong> 56px (fijo)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Altura:</strong> 100vh (full height)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Position:</strong> fixed | relative | absolute</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Shadow:</strong> Neumorphic panel shadow</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Logo container:</strong> 56x56px, padding 16px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Menu item:</strong> 56x56px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Ícono:</strong> 24px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Barra izquierda active:</strong> 4px ancho, accent</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Active background:</strong> accent primary</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>z-index:</strong> 40</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function SidebarShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <SidebarContent />
    </LightEngineProvider>
  );
}
