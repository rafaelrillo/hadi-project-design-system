// Path: src/layouts/DashboardLayout/DashboardLayout.tsx

import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PieChart,
  TrendingUp,
  Wallet,
  Newspaper,
  MessageSquare,
  Settings,
  LogOut,
  User,
} from 'lucide-react';

import { useAuthStore } from '../../store';

import styles from './DashboardLayout.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// NAV ITEMS
// ─────────────────────────────────────────────────────────────────────────────

const navItems = [
  { path: '/app/dashboard', icon: LayoutDashboard, label: 'Home', end: true },
  { path: '/app/dashboard/portfolio', icon: PieChart, label: 'Portfolio' },
  { path: '/app/dashboard/recommendations', icon: TrendingUp, label: 'Recommendations' },
  { path: '/app/dashboard/wallet', icon: Wallet, label: 'Wallet' },
  { path: '/app/dashboard/news', icon: Newspaper, label: 'News' },
  { path: '/app/dashboard/chat', icon: MessageSquare, label: 'AI Chat' },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/app/login');
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoText}>S</span>
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
            <h1 className={styles.title}>SENTINEL</h1>
            <span className={styles.version}>v2.0.0</span>
          </div>
        </header>

        {/* Page Content */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
