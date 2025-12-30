// Path: src/layouts/DashboardLayout/DashboardLayout.tsx

import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
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

import { useAuthStore } from '../../store';
import { AtmosphericBackground } from '../../components/atoms/sentinel';

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
  { path: '/app/dashboard/recommendations', icon: TrendingUp, label: 'Recommendations' },
  { path: '/app/dashboard/news', icon: Newspaper, label: 'News' },
];

const settingsItem: NavItem = { path: '/app/dashboard/settings', icon: Settings, label: 'Settings' };

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  // Get current section based on path
  const getCurrentSection = (): NavItem => {
    const path = location.pathname;

    // Check settings first
    if (path.includes('/settings')) return settingsItem;

    // Check nav items (portfolio/builder should match portfolio)
    for (const item of navItems) {
      if (item.end) {
        if (path === item.path) return item;
      } else {
        if (path.startsWith(item.path)) return item;
      }
    }

    return navItems[0]; // Default to Home
  };

  const currentSection = getCurrentSection();
  const CurrentIcon = currentSection.icon;

  const handleLogout = () => {
    logout();
    navigate('/app/login');
  };

  return (
    <>
      {/* Atmospheric Background - Creates depth and "breathing" effect */}
      <AtmosphericBackground variant="subtle" animated />

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
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <CurrentIcon size={22} className={styles.headerIcon} />
            <h1 className={styles.title}>{currentSection.label}</h1>
          </div>
        </header>

        {/* Page Content */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
    </>
  );
}
