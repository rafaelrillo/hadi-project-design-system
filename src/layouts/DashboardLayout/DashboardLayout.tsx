// Path: src/layouts/DashboardLayout/DashboardLayout.tsx

import { useState, useMemo, type CSSProperties } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Briefcase,
  TrendingUp,
  Newspaper,
  type LucideIcon,
} from 'lucide-react';

import { useAuthStore } from '../../store';
import { AtmosphericBackground } from '../../components/atoms/sentinel';
import { useIsMobile } from '../../hooks/useBreakpoint';
import { MobileHeader } from '../../components/organisms/MobileHeader';
import { BottomNavigation } from '../../components/organisms/BottomNavigation';
import { MoreMenu } from '../../components/organisms/MoreMenu';
import { Sidebar } from '@organisms/Sidebar';
import type { TabItem } from '@atoms/Button';
import { LightEngineProvider, useLightEngineOptional } from '@contexts/LightEngineContext';

import styles from './DashboardLayout.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// NAV ITEMS
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
}

const navItems: NavItem[] = [
  { path: '/app/dashboard', icon: Home, label: 'Home', end: true },
  { path: '/app/dashboard/portfolio', icon: Briefcase, label: 'Portfolio' },
  { path: '/app/dashboard/recommendations', icon: TrendingUp, label: 'Calibrate' },
  { path: '/app/dashboard/news', icon: Newspaper, label: 'News' },
];

// const settingsItem: NavItem = { path: '/app/dashboard/settings', icon: Settings, label: 'Settings' };

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT STYLE TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type LayoutStyle = 'default' | 'neuPanel';

export interface DashboardLayoutProps {
  /** Visual style for the main content container */
  layoutStyle?: LayoutStyle;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
  /** Enable light animation on mount */
  animateLight?: boolean;
  /** Initial light angle (0-360) */
  initialLightAngle?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

// Mobile navigation items
const mobileNavItems = [
  { id: 'home', label: 'Home', icon: <Home size={22} />, path: '/app/dashboard' },
  { id: 'portfolio', label: 'Portfolio', icon: <Briefcase size={22} />, path: '/app/dashboard/portfolio' },
  { id: 'calibrate', label: 'Calibrate', icon: <TrendingUp size={22} />, path: '/app/dashboard/recommendations' },
  { id: 'news', label: 'News', icon: <Newspaper size={22} />, path: '/app/dashboard/news' },
];

// Inner component that uses the Light Engine context
function DashboardLayoutInner({
  layoutStyle = 'default',
  dynamicShadows = true,
}: Omit<DashboardLayoutProps, 'animateLight' | 'initialLightAngle'>) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const isMobile = useIsMobile();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Build main tabs for the TabGroup navigation
  const mainTabs: TabItem[] = useMemo(() => {
    return navItems.map((item) => ({
      label: item.label,
      icon: <item.icon size={20} />,
    }));
  }, []);

  // Calculate active tab index based on current route
  const activeTabIndex = useMemo(() => {
    const currentPath = location.pathname;
    const index = navItems.findIndex((item) =>
      item.end ? currentPath === item.path : currentPath.startsWith(item.path)
    );
    return index >= 0 ? index : 0;
  }, [location.pathname]);

  // Handle tab change - navigate to the corresponding route
  const handleTabChange = (index: number) => {
    const navItem = navItems[index];
    if (navItem) {
      navigate(navItem.path);
    }
  };


  // Get wrapper className for neuPanel style
  const getContentWrapperClassName = (): string => {
    const classes = [styles.content];
    if (layoutStyle === 'neuPanel') classes.push(styles.neuPanelContent);
    if (dynamicShadows && lightEngine && layoutStyle === 'neuPanel') {
      classes.push(styles.dynamicShadows);
    }
    return classes.join(' ');
  };

  // Get dynamic styles for neuPanel
  const getContentDynamicStyles = (): CSSProperties | undefined => {
    if (layoutStyle !== 'neuPanel' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: shadows.getNeuPanelShadow(6, 12),
    };
  };

  // Get current section based on path (can be used for breadcrumbs or page titles)
  // const getCurrentSection = (): NavItem => {
  //   const path = location.pathname;
  //   if (path.includes('/settings')) return settingsItem;
  //   for (const item of navItems) {
  //     if (item.end) {
  //       if (path === item.path) return item;
  //     } else {
  //       if (path.startsWith(item.path)) return item;
  //     }
  //   }
  //   return navItems[0];
  // };

  const handleLogout = () => {
    logout();
    navigate('/app/login');
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <>
        <AtmosphericBackground variant="subtle" animated />
        <div className={styles.mobileLayout}>
          <MobileHeader
            onMenuClick={() => setIsMoreMenuOpen(true)}
          />

          <main className={styles.mobileContent}>
            <Outlet />
          </main>

          <BottomNavigation
            items={mobileNavItems}
          />

          <MoreMenu
            isOpen={isMoreMenuOpen}
            onClose={() => setIsMoreMenuOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      </>
    );
  }

  // Animated SENTINEL Logo SVG
  const AnimatedLogo = (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.animatedLogo}
    >
      {/* Outer ring */}
      <circle
        cx="30"
        cy="30"
        r="27"
        stroke="var(--sentinel-accent-primary, #4a9a9c)"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {/* Middle ring */}
      <circle
        cx="30"
        cy="30"
        r="20"
        stroke="var(--sentinel-accent-primary, #4a9a9c)"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      {/* Inner ring */}
      <circle
        cx="30"
        cy="30"
        r="13"
        stroke="var(--sentinel-accent-primary, #4a9a9c)"
        strokeWidth="2"
        strokeOpacity="0.8"
      />
      {/* Center dot */}
      <circle
        cx="30"
        cy="30"
        r="4"
        fill="var(--sentinel-accent-primary, #4a9a9c)"
      />
      {/* Scanning line */}
      <line
        x1="30"
        y1="3"
        x2="30"
        y2="30"
        stroke="var(--sentinel-accent-primary, #4a9a9c)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={styles.scanLine}
      />
    </svg>
  );

  // Desktop Layout
  return (
    <>
      {/* Atmospheric Background - Creates depth and "breathing" effect */}
      <AtmosphericBackground variant="subtle" animated />

      <div className={styles.layout}>
        {/* Neumorphic Sidebar with TabGroup Navigation */}
        <Sidebar
          productLogo={AnimatedLogo}
          mainTabs={mainTabs}
          activeTab={activeTabIndex}
          onTabChange={handleTabChange}
          onSettingsClick={() => navigate('/app/dashboard/settings')}
          onLogoutClick={handleLogout}
          position="fixed"
          dynamicShadows={dynamicShadows}
        />

        {/* Main Content */}
        <main className={styles.main}>
          {/* Page Content */}
          <div
            className={getContentWrapperClassName()}
            style={getContentDynamicStyles()}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTED COMPONENT - Wrapped with LightEngineProvider
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardLayout({
  layoutStyle = 'default',
  dynamicShadows = true,
  animateLight = false,
  initialLightAngle = 135,
}: DashboardLayoutProps = {}) {
  return (
    <LightEngineProvider
      initialAngle={initialLightAngle}
      initialAnimating={animateLight}
      initialSpeed={0.5}
    >
      <DashboardLayoutInner
        layoutStyle={layoutStyle}
        dynamicShadows={dynamicShadows}
      />
    </LightEngineProvider>
  );
}
