// Path: src/components/showcase/SidebarGroup.tsx
import { LucideIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SidebarGroup.module.css';

export interface SidebarGroupItem {
  path: string;
  label: string;
  icon?: LucideIcon;
}

export interface SidebarGroupProps {
  title: string;
  icon: LucideIcon;
  items: SidebarGroupItem[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

const getClassName = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

export function SidebarGroup({
  title,
  icon: Icon,
  items,
  isExpanded = false,
  onToggle
}: SidebarGroupProps) {
  const location = useLocation();

  return (
    <div>
      <button
        className={styles.groupHeader}
        onClick={onToggle}
      >
        <Icon size={18} />
        <span className={styles.title}>{title}</span>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className={getClassName(
        styles.itemsContainer,
        isExpanded && styles.itemsContainerExpanded
      )}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={getClassName(styles.item, isActive && styles.itemActive)}
            >
              {item.icon && <item.icon size={16} />}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
