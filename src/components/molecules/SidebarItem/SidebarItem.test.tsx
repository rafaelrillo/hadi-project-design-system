// Path: src/components/molecules/SidebarItem/SidebarItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarItem } from './SidebarItem';
import { Home, Settings, Users } from 'lucide-react';

describe('SidebarItem Component', () => {
  describe('Rendering', () => {
    it('should render with label', () => {
      render(<SidebarItem label="Dashboard" />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should render as button by default', () => {
      render(<SidebarItem label="Dashboard" />);
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
      expect(screen.getByRole('menuitem')).toHaveAttribute('type', 'button');
    });

    it('should render as anchor when href is provided', () => {
      render(<SidebarItem label="Dashboard" href="/dashboard" />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('should render with icon', () => {
      const { container } = render(<SidebarItem label="Home" icon={Home} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render without icon', () => {
      const { container } = render(<SidebarItem label="Home" />);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('should render with badge', () => {
      render(<SidebarItem label="Messages" badge={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should render badge with 99+ for values over 99', () => {
      render(<SidebarItem label="Messages" badge={150} />);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('should not render badge when badge is 0', () => {
      render(<SidebarItem label="Messages" badge={0} />);
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('should not render badge when badge is undefined', () => {
      const { container } = render(<SidebarItem label="Messages" />);
      const badge = container.querySelector('[aria-label*="notificaciones"]');
      expect(badge).not.toBeInTheDocument();
    });
  });

  describe('Click Handlers', () => {
    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<SidebarItem label="Dashboard" onClick={handleClick} />);

      fireEvent.click(screen.getByText('Dashboard'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<SidebarItem label="Dashboard" onClick={handleClick} disabled />);

      fireEvent.click(screen.getByText('Dashboard'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should prevent default when href is provided and onClick is called', () => {
      const handleClick = jest.fn();
      render(<SidebarItem label="Dashboard" href="/dashboard" onClick={handleClick} />);

      const link = screen.getByRole('link');
      fireEvent.click(link);

      expect(handleClick).toHaveBeenCalled();
    });

    it('should work without onClick handler', () => {
      render(<SidebarItem label="Dashboard" />);

      expect(() => {
        fireEvent.click(screen.getByText('Dashboard'));
      }).not.toThrow();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should call onClick when Enter is pressed', () => {
      const handleClick = jest.fn();
      render(<SidebarItem label="Dashboard" onClick={handleClick} />);

      const item = screen.getByRole('menuitem');
      fireEvent.keyDown(item, { key: 'Enter' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick when Space is pressed', () => {
      const handleClick = jest.fn();
      render(<SidebarItem label="Dashboard" onClick={handleClick} />);

      const item = screen.getByRole('menuitem');
      fireEvent.keyDown(item, { key: ' ' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when other keys are pressed', () => {
      const handleClick = jest.fn();
      render(<SidebarItem label="Dashboard" onClick={handleClick} />);

      const item = screen.getByRole('menuitem');
      fireEvent.keyDown(item, { key: 'Tab' });
      fireEvent.keyDown(item, { key: 'Escape' });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not trigger onClick on keyboard when disabled', () => {
      const handleClick = jest.fn();
      render(<SidebarItem label="Dashboard" onClick={handleClick} disabled />);

      const item = screen.getByRole('menuitem');
      fireEvent.keyDown(item, { key: 'Enter' });
      fireEvent.keyDown(item, { key: ' ' });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should have tabIndex 0 when not disabled', () => {
      render(<SidebarItem label="Dashboard" />);
      expect(screen.getByRole('menuitem')).toHaveAttribute('tabIndex', '0');
    });

    it('should have tabIndex -1 when disabled', () => {
      render(<SidebarItem label="Dashboard" disabled />);
      expect(screen.getByRole('menuitem')).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Active State', () => {
    it('should have aria-current when active', () => {
      render(<SidebarItem label="Dashboard" isActive />);
      expect(screen.getByRole('menuitem')).toHaveAttribute('aria-current', 'page');
    });

    it('should not have aria-current when not active', () => {
      render(<SidebarItem label="Dashboard" />);
      expect(screen.getByRole('menuitem')).not.toHaveAttribute('aria-current');
    });

    it('should have className when active', () => {
      render(<SidebarItem label="Dashboard" isActive />);
      const item = screen.getByRole('menuitem');
      expect(item).toHaveAttribute('class');
    });

    it('should have className when not active', () => {
      render(<SidebarItem label="Dashboard" />);
      const item = screen.getByRole('menuitem');
      expect(item).toHaveAttribute('class');
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when disabled', () => {
      render(<SidebarItem label="Dashboard" disabled />);
      expect(screen.getByRole('menuitem')).toBeDisabled();
    });

    it('should have aria-disabled when disabled', () => {
      render(<SidebarItem label="Dashboard" disabled />);
      expect(screen.getByRole('menuitem')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have className when disabled', () => {
      render(<SidebarItem label="Dashboard" disabled />);
      const item = screen.getByRole('menuitem');
      expect(item).toHaveAttribute('class');
    });
  });

  describe('Styling', () => {
    it('should have className attribute', () => {
      render(<SidebarItem label="Dashboard" />);
      const item = screen.getByRole('menuitem');
      expect(item).toHaveAttribute('class');
    });

    it('should render badge with proper styles', () => {
      render(<SidebarItem label="Messages" badge={5} />);
      const badge = screen.getByText('5');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role menuitem for buttons', () => {
      render(<SidebarItem label="Dashboard" />);
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
    });

    it('should not have role menuitem for links', () => {
      render(<SidebarItem label="Dashboard" href="/dashboard" />);
      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should have accessible badge label', () => {
      render(<SidebarItem label="Messages" badge={5} />);
      expect(screen.getByLabelText('5 notificaciones')).toBeInTheDocument();
    });

    it('should have accessible badge label for 99+', () => {
      render(<SidebarItem label="Messages" badge={150} />);
      expect(screen.getByLabelText('150 notificaciones')).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(<SidebarItem label="Dashboard" />);
      const item = screen.getByRole('menuitem');
      expect(item).toHaveAttribute('tabIndex', '0');
    });

    it('should not be keyboard accessible when disabled', () => {
      render(<SidebarItem label="Dashboard" disabled />);
      const item = screen.getByRole('menuitem');
      expect(item).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Icon Rendering', () => {
    it('should render different icons', () => {
      const { container, rerender } = render(
        <SidebarItem label="Home" icon={Home} />
      );
      expect(container.querySelector('svg')).toBeInTheDocument();

      rerender(<SidebarItem label="Settings" icon={Settings} />);
      expect(container.querySelector('svg')).toBeInTheDocument();

      rerender(<SidebarItem label="Users" icon={Users} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render icon with correct size', () => {
      const { container } = render(<SidebarItem label="Home" icon={Home} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '18');
      expect(svg).toHaveAttribute('height', '18');
    });
  });

  describe('Use Cases', () => {
    it('should work as navigation link', () => {
      render(<SidebarItem label="Dashboard" href="/dashboard" icon={Home} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/dashboard');
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should work as button with onClick', () => {
      const handleClick = jest.fn();
      render(<SidebarItem label="Logout" icon={Settings} onClick={handleClick} />);

      fireEvent.click(screen.getByText('Logout'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('should work with badge for notifications', () => {
      render(<SidebarItem label="Messages" icon={Users} badge={12} />);
      expect(screen.getByText('Messages')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('should work as active menu item', () => {
      render(<SidebarItem label="Dashboard" icon={Home} isActive />);
      expect(screen.getByRole('menuitem')).toHaveAttribute('aria-current', 'page');
    });

    it('should work as disabled menu item', () => {
      render(<SidebarItem label="Premium" icon={Settings} disabled />);
      expect(screen.getByRole('menuitem')).toBeDisabled();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all props together', () => {
      const handleClick = jest.fn();
      render(
        <SidebarItem
          label="Dashboard"
          icon={Home}
          isActive
          badge={5}
          onClick={handleClick}
        />
      );

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByRole('menuitem')).toHaveAttribute('aria-current', 'page');

      fireEvent.click(screen.getByRole('menuitem'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('should handle state changes', () => {
      const { rerender } = render(<SidebarItem label="Dashboard" />);
      expect(screen.getByRole('menuitem')).not.toHaveAttribute('aria-current');

      rerender(<SidebarItem label="Dashboard" isActive />);
      expect(screen.getByRole('menuitem')).toHaveAttribute('aria-current', 'page');

      rerender(<SidebarItem label="Dashboard" isActive disabled />);
      expect(screen.getByRole('menuitem')).toBeDisabled();
    });

    it('should handle badge updates', () => {
      const { rerender } = render(<SidebarItem label="Messages" badge={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();

      rerender(<SidebarItem label="Messages" badge={10} />);
      expect(screen.getByText('10')).toBeInTheDocument();

      rerender(<SidebarItem label="Messages" badge={0} />);
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty label', () => {
      render(<SidebarItem label="" />);
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
    });

    it('should handle very long labels', () => {
      const longLabel = 'A'.repeat(200);
      render(<SidebarItem label={longLabel} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle special characters in label', () => {
      render(<SidebarItem label="Settings & Preferences" />);
      expect(screen.getByText('Settings & Preferences')).toBeInTheDocument();
    });

    it('should handle negative badge values', () => {
      render(<SidebarItem label="Messages" badge={-5} />);
      expect(screen.queryByText('-5')).not.toBeInTheDocument();
    });

    it('should handle very large badge values', () => {
      render(<SidebarItem label="Messages" badge={9999} />);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });
  });
});
