// Path: src/pages/organisms/SidebarShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Sidebar
import { useState, useMemo } from 'react';
import { Sidebar } from '../../components/organisms/Sidebar';
import type { SidebarSection } from '../../components/organisms/Sidebar';
import { ShowcaseSection } from '../../components/showcase';
import {
  Home,
  FileText,
  Settings,
  User,
  Bell,
  Mail,
  LayoutDashboard,
  Library,
  Share2,
  CircleDot,
  RefreshCw,
  Users,
  History,
  Archive,
  Star,
  Globe,
  Sparkles,
} from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function SidebarContent() {
  const { lightAngle } = useLightEngine();
  const [activePage, setActivePage] = useState('dashboard');

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

  // Logo for sidebar
  const SentinelLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );

  // Simple menu items for rail/icon-only sidebar
  const railMenuItems = [
    { icon: Home, label: 'Dashboard', isActive: activePage === 'dashboard', onClick: () => setActivePage('dashboard') },
    { icon: Globe, label: 'Global', isActive: activePage === 'global', onClick: () => setActivePage('global') },
    { icon: Star, label: 'Favorites', isActive: activePage === 'favorites', onClick: () => setActivePage('favorites') },
    { icon: Share2, label: 'Share', isActive: activePage === 'share', onClick: () => setActivePage('share') },
    { icon: Library, label: 'Library', isActive: activePage === 'library', onClick: () => setActivePage('library') },
    { icon: Sparkles, label: 'AI', isActive: activePage === 'ai', onClick: () => setActivePage('ai') },
  ];

  // Sections for expanded panel (like in the reference image)
  const expandedSections: SidebarSection[] = [
    {
      title: 'Projects',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', isActive: activePage === 'dashboard', onClick: () => setActivePage('dashboard'), badge: 0 },
        { icon: Library, label: 'Library', isActive: activePage === 'library', onClick: () => setActivePage('library') },
        { icon: Share2, label: 'Shared Projects', isActive: activePage === 'shared', onClick: () => setActivePage('shared') },
      ],
    },
    {
      title: 'Status',
      items: [
        { icon: CircleDot, label: 'New', isActive: activePage === 'new', onClick: () => setActivePage('new'), badge: 3 },
        { icon: RefreshCw, label: 'Updates', isActive: activePage === 'updates', onClick: () => setActivePage('updates'), badge: 2 },
        { icon: Users, label: 'Team Review', isActive: activePage === 'review', onClick: () => setActivePage('review') },
      ],
    },
    {
      title: 'History',
      items: [
        { icon: History, label: 'Recently Edited', isActive: activePage === 'recent', onClick: () => setActivePage('recent') },
        { icon: Archive, label: 'Archive', isActive: activePage === 'archive', onClick: () => setActivePage('archive') },
      ],
    },
  ];

  // User profile
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  // Legacy menu items
  const legacyMenuItems = [
    { icon: Home, label: 'Dashboard', isActive: activePage === 'home', onClick: () => setActivePage('home') },
    { icon: FileText, label: 'Documentos', isActive: activePage === 'documents', onClick: () => setActivePage('documents') },
    { icon: Bell, label: 'Notificaciones', isActive: activePage === 'notifications', onClick: () => setActivePage('notifications') },
    { icon: Mail, label: 'Mensajes', isActive: activePage === 'messages', onClick: () => setActivePage('messages') },
    { icon: Settings, label: 'Configuración', isActive: activePage === 'settings', onClick: () => setActivePage('settings') },
  ];

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Sidebar_</h1>
        <p style={descStyles}>
          // Neumorphic base + Glassmorphism menu items
        </p>
      </header>

      {/* New Expanded Sidebar */}
      <ShowcaseSection
        title="Expanded Sidebar (Neu + Glass)"
        description="Neumorphic base container with glassmorphism menu items - como la referencia"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '700px', position: 'relative', display: 'flex' }}>
            <Sidebar
              productLogo={<SentinelLogo />}
              menuItems={railMenuItems}
              sections={expandedSections}
              user={user}
              onSettingsClick={() => console.log('Settings clicked')}
              onSearch={(value) => console.log('Search:', value)}
              searchPlaceholder="Search"
              position="relative"
              sidebarStyle="expanded"
              showIconRail={true}
              showExpandedPanel={true}
            />
            {/* Content area */}
            <div style={{
              flex: 1,
              marginLeft: '24px',
              padding: '24px',
              background: LIGHT.base,
              borderRadius: '20px',
              boxShadow: getNeuPanelShadow(6, 16),
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#2d3748',
                marginBottom: '8px',
              }}>
                {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#8896a6',
              }}>
                All Your Workflows And Permissions
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Only Expanded Panel (no rail) */}
      <ShowcaseSection
        title="Solo Panel Expandido"
        description="Panel neumórfico con items de cristal, sin barra de iconos"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '600px', position: 'relative', display: 'flex' }}>
            <Sidebar
              sections={expandedSections}
              user={user}
              onSearch={(value) => console.log('Search:', value)}
              position="relative"
              sidebarStyle="expanded"
              showIconRail={false}
              showExpandedPanel={true}
            />
            <div style={{
              flex: 1,
              marginLeft: '24px',
              padding: '24px',
              background: LIGHT.base,
              borderRadius: '20px',
              boxShadow: getNeuInsetShadow(5, 15),
            }}>
              <p style={{ color: '#5a6578', fontSize: '14px', fontFamily: 'var(--sentinel-font-mono)' }}>
                // Panel expandido sin icon rail
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Only Icon Rail */}
      <ShowcaseSection
        title="Solo Icon Rail"
        description="Barra vertical oscura con iconos - estilo minimalista"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '500px', position: 'relative', display: 'flex' }}>
            <Sidebar
              productLogo={<SentinelLogo />}
              menuItems={railMenuItems}
              onSettingsClick={() => console.log('Settings')}
              position="relative"
              sidebarStyle="expanded"
              showIconRail={true}
              showExpandedPanel={false}
            />
            <div style={{
              flex: 1,
              marginLeft: '24px',
              padding: '24px',
              background: LIGHT.base,
              borderRadius: '20px',
              boxShadow: getNeuPanelShadow(4, 12),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ color: '#8896a6', fontSize: '14px', fontFamily: 'var(--sentinel-font-mono)' }}>
                // Solo icon rail para interfaces compactas
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Legacy Dark Style */}
      <ShowcaseSection
        title="Estilo Legacy (Dark)"
        description="Sidebar oscuro original para compatibilidad"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '450px', position: 'relative' }}>
            <Sidebar
              productLogo={<SentinelLogo />}
              menuItems={legacyMenuItems}
              userIcon={<User size={24} color="var(--sentinel-accent-primary)" />}
              onLogsClick={() => console.log('Ver logs')}
              onLogoutClick={() => console.log('Cerrar sesión')}
              position="relative"
              sidebarStyle="dark"
            />
          </div>
        </div>
      </ShowcaseSection>

      {/* Legacy neuPanel Style */}
      <ShowcaseSection
        title="Estilo Legacy (neuPanel)"
        description="Sidebar neumórfico claro original"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '450px', position: 'relative' }}>
            <Sidebar
              productLogo={<SentinelLogo />}
              menuItems={legacyMenuItems}
              userIcon={<User size={24} color="var(--sentinel-accent-primary)" />}
              onLogsClick={() => console.log('Ver logs')}
              onLogoutClick={() => console.log('Cerrar sesión')}
              position="relative"
              sidebarStyle="neuPanel"
            />
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Comparison */}
      <ShowcaseSection
        title="Comparación de Diseños"
        description="Neumorphism base vs Glassmorphism items"
      >
        <div style={{
          ...sidebarContainerStyles,
          boxShadow: getNeuInsetShadow(5, 15),
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            padding: '20px',
          }}>
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--sentinel-accent-primary)',
                marginBottom: '16px',
                fontFamily: 'var(--sentinel-font-mono)',
              }}>
                BASE NEUMÓRFICA (Container)
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '13px',
                color: '#5a6578',
                fontFamily: 'var(--sentinel-font-mono)',
                lineHeight: '2',
              }}>
                <li>+ Background: #e0e5ec</li>
                <li>+ Border-radius: 20px</li>
                <li>+ Shadow: 8px 8px 20px #a3b1c6</li>
                <li>+ Shadow: -8px -8px 20px #ffffff</li>
                <li>+ Superficie "extruida" del fondo</li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--sentinel-accent-primary)',
                marginBottom: '16px',
                fontFamily: 'var(--sentinel-font-mono)',
              }}>
                ITEMS GLASSMORPHISM
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '13px',
                color: '#5a6578',
                fontFamily: 'var(--sentinel-font-mono)',
                lineHeight: '2',
              }}>
                <li>+ Background: rgba(255,255,255,0.45)</li>
                <li>+ Backdrop-filter: blur(8px)</li>
                <li>+ Border: 1px solid rgba(255,255,255,0.6)</li>
                <li>+ Border-radius: 12px</li>
                <li>+ Elementos de "cristal" flotando</li>
              </ul>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Technical Specs */}
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--sentinel-accent-primary)', marginBottom: '8px' }}>ICON RAIL</p>
              <p>+ Ancho: 56px</p>
              <p>+ Background: #1a1f2e</p>
              <p>+ Border-radius: 20px</p>
              <p>+ Margin: 12px</p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--sentinel-accent-primary)', marginBottom: '8px' }}>EXPANDED PANEL</p>
              <p>+ Ancho: 260px</p>
              <p>+ Background: #e0e5ec (neumorphic)</p>
              <p>+ Border-radius: 20px</p>
              <p>+ Padding: 16px</p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--sentinel-accent-primary)', marginBottom: '8px' }}>MENU ITEMS (Glass)</p>
              <p>+ Padding: 10px 12px</p>
              <p>+ Border-radius: 12px</p>
              <p>+ Backdrop-blur: 8px (hover), 12px (active)</p>
              <p>+ Transition: 150ms ease</p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--sentinel-accent-primary)', marginBottom: '8px' }}>USER PROFILE</p>
              <p>+ Avatar: 40x40px, border-radius: 50%</p>
              <p>+ Container: Glass effect</p>
              <p>+ Border: 1px solid rgba(255,255,255,0.6)</p>
            </div>
          </div>
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
