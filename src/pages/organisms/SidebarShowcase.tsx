// Path: src/pages/organisms/SidebarShowcase.tsx
// FING Design System v5.0 - Neumorphic Sidebar Showcase
import { useState, useMemo } from 'react';
import { Sidebar } from '../../components/organisms/Sidebar';
import type { SidebarSection } from '../../components/organisms/Sidebar';
import { ShowcaseSection } from '../../components/showcase';
import {
  Home,
  FileText,
  Settings,
  Bell,
  LayoutDashboard,
  Library,
  Share2,
  CircleDot,
  RefreshCw,
  Users,
  History,
  Archive,
  Star,
  TrendingUp,
  Briefcase,
  Newspaper,
} from 'lucide-react';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { FingEmblem } from '@/components/atoms/FingEmblem';

function SidebarContent() {
  const { lightAngle } = useLightEngine();
  const [activePage, setActivePage] = useState('dashboard');

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
    padding: '20px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  // FING Emblem Logo for sidebar
  const FingLogo = <FingEmblem size={48} animation="ripple" />;

  // Main navigation sections (like a real app)
  const mainSections: SidebarSection[] = [
    {
      title: 'Navigation',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', isActive: activePage === 'dashboard', onClick: () => setActivePage('dashboard') },
        { icon: Briefcase, label: 'Portfolio', isActive: activePage === 'portfolio', onClick: () => setActivePage('portfolio') },
        { icon: TrendingUp, label: 'Calibrate', isActive: activePage === 'calibrate', onClick: () => setActivePage('calibrate'), badge: 5 },
        { icon: Newspaper, label: 'News', isActive: activePage === 'news', onClick: () => setActivePage('news') },
      ],
    },
    {
      title: 'Library',
      items: [
        { icon: Library, label: 'Watchlists', isActive: activePage === 'watchlists', onClick: () => setActivePage('watchlists') },
        { icon: Star, label: 'Favorites', isActive: activePage === 'favorites', onClick: () => setActivePage('favorites'), badge: 12 },
        { icon: History, label: 'History', isActive: activePage === 'history', onClick: () => setActivePage('history') },
      ],
      onAddClick: () => console.log('Add new watchlist'),
    },
  ];

  // Expanded sections for detailed view
  const expandedSections: SidebarSection[] = [
    {
      title: 'Projects',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', isActive: activePage === 'dashboard', onClick: () => setActivePage('dashboard') },
        { icon: Library, label: 'Library', isActive: activePage === 'library', onClick: () => setActivePage('library') },
        { icon: Share2, label: 'Shared Projects', isActive: activePage === 'shared', onClick: () => setActivePage('shared') },
      ],
      onAddClick: () => console.log('Add project'),
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

  // Simple menu items
  const simpleMenuItems = [
    { icon: Home, label: 'Home', isActive: activePage === 'home', onClick: () => setActivePage('home') },
    { icon: FileText, label: 'Documents', isActive: activePage === 'documents', onClick: () => setActivePage('documents') },
    { icon: Bell, label: 'Notifications', isActive: activePage === 'notifications', onClick: () => setActivePage('notifications'), badge: 8 },
    { icon: Settings, label: 'Settings', isActive: activePage === 'settings', onClick: () => setActivePage('settings') },
  ];

  // User profile
  const user = {
    name: 'John Doe',
    email: 'john.doe@fing.io',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Sidebar_</h1>
        <p style={descStyles}>
          // Neumorphic sidebar with inset sections + glass items
        </p>
      </header>

      {/* Main Demo - Full Neumorphic Sidebar */}
      <ShowcaseSection
        title="Neumorphic Sidebar (Full)"
        description="Superficie neumórfica elevada + secciones cavadas (inset) + items de cristal"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '700px', position: 'relative', display: 'flex' }}>
            <Sidebar
              productLogo={FingLogo}
              sections={mainSections}
              user={user}
              onUserClick={() => console.log('User profile clicked')}
              onSettingsClick={() => console.log('Settings clicked')}
              onLogoutClick={() => console.log('Logout clicked')}
              onSearch={(value) => console.log('Search:', value)}
              searchPlaceholder="Search..."
              position="relative"
            />
            {/* Content area preview */}
            <div style={{
              flex: 1,
              marginLeft: '24px',
              padding: '32px',
              background: MARBLE.base,
              borderRadius: '24px',
              boxShadow: getNeuPanelShadow(8, 24),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 700,
                fontFamily: 'var(--fing-font-display)',
                color: '#2d3748',
                marginBottom: '12px',
              }}>
                {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#8896a6',
                fontFamily: 'var(--fing-font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                // Content area
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Multiple Sections Demo */}
      <ShowcaseSection
        title="Multiple Sections"
        description="Múltiples grupos de navegación con secciones cavadas"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '650px', position: 'relative', display: 'flex' }}>
            <Sidebar
              productLogo={FingLogo}
              sections={expandedSections}
              user={user}
              onSearch={(value) => console.log('Search:', value)}
              position="relative"
            />
            <div style={{
              flex: 1,
              marginLeft: '24px',
              padding: '24px',
              background: MARBLE.base,
              borderRadius: '20px',
              boxShadow: getNeuInsetShadow(5, 15),
            }}>
              <p style={{ color: '#5a6578', fontSize: '14px', fontFamily: 'var(--fing-font-mono)' }}>
                // Cada sección tiene su propio contenedor inset
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Simple Menu Demo */}
      <ShowcaseSection
        title="Simple Menu (No Sections)"
        description="Sidebar con items directos sin agrupación"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '500px', position: 'relative', display: 'flex' }}>
            <Sidebar
              productLogo={FingLogo}
              menuItems={simpleMenuItems}
              user={user}
              onSettingsClick={() => console.log('Settings')}
              onLogoutClick={() => console.log('Logout')}
              position="relative"
            />
            <div style={{
              flex: 1,
              marginLeft: '24px',
              padding: '24px',
              background: MARBLE.base,
              borderRadius: '20px',
              boxShadow: getNeuPanelShadow(4, 12),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ color: '#8896a6', fontSize: '14px', fontFamily: 'var(--fing-font-mono)' }}>
                // Menú simple sin secciones
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Collapsed Mode Demo */}
      <ShowcaseSection
        title="Collapsed Mode"
        description="Modo colapsado (solo iconos)"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '500px', position: 'relative', display: 'flex' }}>
            <Sidebar
              productLogo={FingLogo}
              sections={mainSections}
              position="relative"
              collapsed={true}
            />
            <div style={{
              flex: 1,
              marginLeft: '24px',
              padding: '24px',
              background: MARBLE.base,
              borderRadius: '20px',
              boxShadow: getNeuPanelShadow(4, 12),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ color: '#8896a6', fontSize: '14px', fontFamily: 'var(--fing-font-mono)' }}>
                // collapsed=true para modo compacto
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Minimal Demo */}
      <ShowcaseSection
        title="Minimal (No User, No Search)"
        description="Sidebar minimalista solo con navegación"
      >
        <div style={sidebarContainerStyles}>
          <div style={{ height: '400px', position: 'relative', display: 'flex' }}>
            <Sidebar
              productLogo={FingLogo}
              menuItems={simpleMenuItems.slice(0, 4)}
              position="relative"
            />
            <div style={{
              flex: 1,
              marginLeft: '24px',
              padding: '24px',
              background: MARBLE.base,
              borderRadius: '20px',
              boxShadow: getNeuInsetShadow(5, 15),
            }}>
              <p style={{ color: '#5a6578', fontSize: '14px', fontFamily: 'var(--fing-font-mono)' }}>
                // Sin user, sin search, sin footer
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Philosophy */}
      <ShowcaseSection
        title="Design Philosophy"
        description="Neumorphism + Glassmorphism + Light Engine"
      >
        <div style={{
          ...sidebarContainerStyles,
          boxShadow: getNeuInsetShadow(5, 15),
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            padding: '20px',
          }}>
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--fing-accent-primary)',
                marginBottom: '16px',
                fontFamily: 'var(--fing-font-mono)',
              }}>
                NEUMORPHIC CONTAINER
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '13px',
                color: '#5a6578',
                fontFamily: 'var(--fing-font-mono)',
                lineHeight: '2',
              }}>
                <li>+ Background: #d5d8dc</li>
                <li>+ Border-radius: 24px</li>
                <li>+ Elevated shadow</li>
                <li>+ Dynamic via Light Engine</li>
                <li>+ "Flota" sobre la página</li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--fing-accent-primary)',
                marginBottom: '16px',
                fontFamily: 'var(--fing-font-mono)',
              }}>
                INSET SECTIONS (Cavados)
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '13px',
                color: '#5a6578',
                fontFamily: 'var(--fing-font-mono)',
                lineHeight: '2',
              }}>
                <li>+ Inset shadow</li>
                <li>+ Border-radius: 16px</li>
                <li>+ "Hundido" en superficie</li>
                <li>+ Agrupa items relacionados</li>
                <li>+ Search input también inset</li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--fing-accent-primary)',
                marginBottom: '16px',
                fontFamily: 'var(--fing-font-mono)',
              }}>
                GLASS ITEMS
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '13px',
                color: '#5a6578',
                fontFamily: 'var(--fing-font-mono)',
                lineHeight: '2',
              }}>
                <li>+ Background: rgba(255,255,255,0.45)</li>
                <li>+ Backdrop-filter: blur(8-12px)</li>
                <li>+ Border: glass-border</li>
                <li>+ Hover/Active states</li>
                <li>+ User profile card</li>
              </ul>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Technical Specs */}
      <ShowcaseSection title="Technical Specifications">
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--fing-accent-primary)', marginBottom: '8px' }}>MAIN CONTAINER</p>
              <p>+ Width: 280px (expanded), 80px (collapsed)</p>
              <p>+ Border-radius: 24px</p>
              <p>+ Shadow: 10px 10px 30px (elevated)</p>
              <p>+ Margin: 12px (floats)</p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--fing-accent-primary)', marginBottom: '8px' }}>INSET SECTIONS</p>
              <p>+ Shadow: inset 3px 3px 8px</p>
              <p>+ Border-radius: 16px</p>
              <p>+ Padding: 8px</p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--fing-accent-primary)', marginBottom: '8px' }}>MENU ITEMS</p>
              <p>+ Padding: 11px 14px</p>
              <p>+ Border-radius: 12px</p>
              <p>+ Backdrop-blur: 8px (hover), 12px (active)</p>
              <p>+ Glass background on hover/active</p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--fing-accent-primary)', marginBottom: '8px' }}>USER PROFILE</p>
              <p>+ Glass card with blur(10px)</p>
              <p>+ Avatar: 42x42px, border-radius: 50%</p>
              <p>+ Chevron indicator for dropdown</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Code Example */}
      <ShowcaseSection title="Usage Example">
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
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`import { Sidebar } from '@organisms/Sidebar';

const sections = [
  {
    title: 'Navigation',
    items: [
      { icon: Home, label: 'Dashboard', isActive: true },
      { icon: Briefcase, label: 'Portfolio', badge: 3 },
    ],
    onAddClick: () => console.log('Add'),
  },
];

const user = {
  name: 'John Doe',
  email: 'john@example.com',
};

<Sidebar
  productLogo={<Logo />}
  sections={sections}
  user={user}
  onSearch={(v) => console.log(v)}
  onSettingsClick={() => {}}
  onLogoutClick={() => {}}
  position="relative"    // 'fixed' | 'relative' | 'absolute'
  collapsed={false}      // Icon-only mode
  dynamicShadows={true}  // Light Engine integration
/>`}</pre>
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
