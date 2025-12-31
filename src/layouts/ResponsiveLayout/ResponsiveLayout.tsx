// Path: src/layouts/ResponsiveLayout/ResponsiveLayout.tsx
import React from 'react';
import { useIsMobile } from '../../hooks/useBreakpoint';
import { MobileLayout, MobileLayoutProps } from '../MobileLayout';
import styles from './ResponsiveLayout.module.css';

interface ResponsiveLayoutProps extends Omit<MobileLayoutProps, 'children'> {
  children: React.ReactNode;
  /** Desktop layout content (rendered when not mobile) */
  desktopContent?: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  desktopContent,
  ...mobileProps
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout {...mobileProps}>{children}</MobileLayout>;
  }

  // Desktop: render children directly (existing DashboardLayout handles desktop)
  // Or render desktopContent if provided
  return (
    <div className={styles.desktopWrapper}>
      {desktopContent || children}
    </div>
  );
};

export default ResponsiveLayout;
