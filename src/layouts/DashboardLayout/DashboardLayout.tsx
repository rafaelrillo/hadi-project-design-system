// Path: src/layouts/DashboardLayout/DashboardLayout.tsx

import { useState, useMemo, useEffect, type CSSProperties } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Briefcase,
  TrendingUp,
  Newspaper,
  Settings,
  LogOut,
  User,
  type LucideIcon,
} from 'lucide-react';

import { useAuthStore, usePortfolioStore } from '../../store';
import { AtmosphericBackground } from '../../components/atoms/sentinel';
import { TickerTape, type TickerItem } from '../../components/organisms/sentinel';
import { useIsMobile } from '../../hooks/useBreakpoint';
import { MobileHeader } from '../../components/organisms/MobileHeader';
import { BottomNavigation } from '../../components/organisms/BottomNavigation';
import { MoreMenu } from '../../components/organisms/MoreMenu';
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
  const { logout } = useAuthStore();
  const { holdings, fetchPortfolio } = usePortfolioStore();
  const isMobile = useIsMobile();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

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

  // Fetch portfolio on mount
  useEffect(() => {
    if (holdings.length === 0) {
      fetchPortfolio();
    }
  }, [holdings.length, fetchPortfolio]);

  // Transform portfolio holdings to ticker items
  const tickerItems: TickerItem[] = useMemo(() => {
    return holdings.map((holding) => ({
      symbol: holding.symbol,
      price: holding.currentPrice,
      change: holding.dayChange,
      changePercent: holding.dayChangePercent,
    }));
  }, [holdings]);

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

          {/* Ticker Tape - Scrolling stock prices */}
          {tickerItems.length > 0 && (
            <TickerTape
              items={tickerItems}
              speed="normal"
              variant="minimal"
              pauseOnHover
              className={styles.mobileTickerTape}
            />
          )}

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

  // Desktop Layout
  return (
    <>
      {/* Atmospheric Background - Creates depth and "breathing" effect */}
      <AtmosphericBackground variant="subtle" animated />

      {/* Ticker Tape - Full width scrolling stock prices */}
      {tickerItems.length > 0 && (
        <TickerTape
          items={tickerItems}
          speed="normal"
          variant="detailed"
          pauseOnHover
          className={styles.tickerTape}
        />
      )}

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <img src="/sentinel-favicon.svg" alt="Sentinel" className={styles.logoImage} />
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ''}`
                }
                title={item.label}
              >
                <Icon size={20} />
              </NavLink>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <NavLink
            to="/app/dashboard/settings"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            title="Settings"
          >
            <Settings size={20} />
          </NavLink>
          <button className={styles.navItem} title="Profile">
            <User size={20} />
          </button>
          <button className={styles.navItem} onClick={handleLogout} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </aside>

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
