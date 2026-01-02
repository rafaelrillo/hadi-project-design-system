// Path: src/components/organisms/BottomNavigation/BottomNavigation.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Briefcase,
  TrendingUp,
  Newspaper,
} from 'lucide-react';
import styles from './BottomNavigation.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

export interface BottomNavigationProps {
  /** Custom navigation items (optional, uses defaults if not provided) */
  items?: NavItem[];
}

const defaultItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home size={22} />, path: '/app/dashboard' },
  { id: 'portfolio', label: 'Portfolio', icon: <Briefcase size={22} />, path: '/app/dashboard/portfolio' },
  { id: 'recommendations', label: 'Recs', icon: <TrendingUp size={22} />, path: '/app/dashboard/recommendations' },
  { id: 'news', label: 'News', icon: <Newspaper size={22} />, path: '/app/dashboard/news' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items = defaultItems,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (item: NavItem) => {
    if (!item.path) return false;

    // Home should only be active on exact match
    if (item.path === '/app/dashboard') {
      return location.pathname === '/app/dashboard';
    }

    // Other items use startsWith for sub-routes
    return location.pathname.startsWith(item.path);
  };

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      {items.map((item) => (
        <button
          key={item.id}
          className={`${styles.navItem} ${isActive(item) ? styles.active : ''}`}
          onClick={() => handleClick(item)}
          aria-current={isActive(item) ? 'page' : undefined}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
