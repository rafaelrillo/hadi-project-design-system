// Path: src/components/organisms/MoreMenu/MoreMenu.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  User,
  HelpCircle,
  LogOut,
  Bell,
  Shield
} from 'lucide-react';
import { BottomSheet } from '../BottomSheet';
import styles from './MoreMenu.module.css';

export interface MoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
  destructive?: boolean;
}

export const MoreMenu: React.FC<MoreMenuProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { id: 'profile', label: 'Profile', icon: <User size={20} />, path: '/app/dashboard/profile' },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/app/dashboard/settings' },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, path: '/app/dashboard/notifications' },
    { id: 'security', label: 'Security', icon: <Shield size={20} />, path: '/app/dashboard/security' },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} />, path: '/app/dashboard/help' },
    { id: 'logout', label: 'Log Out', icon: <LogOut size={20} />, onClick: onLogout, destructive: true },
  ];

  const handleClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="More"
      height="auto"
    >
      <nav className={styles.menu}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.menuItem} ${item.destructive ? styles.destructive : ''}`}
            onClick={() => handleClick(item)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </nav>
    </BottomSheet>
  );
};

export default MoreMenu;
