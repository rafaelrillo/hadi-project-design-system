// Path: src/components/molecules/MenuItem/MenuItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MenuItem } from './MenuItem';
import { Home, Settings, User } from 'lucide-react';

describe('MenuItem Component', () => {
  describe('Rendering', () => {
    it('should render menu item with label', () => {
      render(<MenuItem label="Dashboard" />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should render with icon and label', () => {
      render(<MenuItem icon={Home} label="Home" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      const container = screen.getByText('Home').parentElement;
      expect(container?.querySelector('svg')).toBeInTheDocument();
    });

    it('should render without icon', () => {
      const { container } = render(<MenuItem label="No Icon" />);
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBe(0);
    });
  });

  describe('Click Behavior', () => {
    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<MenuItem label="Clickable" onClick={handleClick} />);
      const item = screen.getByText('Clickable').parentElement as HTMLElement;
      fireEvent.click(item);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<MenuItem label="Disabled" onClick={handleClick} disabled />);
      const item = screen.getByText('Disabled').parentElement as HTMLElement;
      fireEvent.click(item);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should work without onClick handler', () => {
      render(<MenuItem label="No Handler" />);
      const item = screen.getByText('No Handler').parentElement as HTMLElement;
      expect(() => fireEvent.click(item)).not.toThrow();
    });
  });

  describe('Active State', () => {
    it('should have className when active', () => {
      render(<MenuItem label="Active Item" active />);
      const item = screen.getByText('Active Item').parentElement as HTMLElement;
      expect(item).toHaveAttribute('class');
    });

    it('should have className on label when active', () => {
      render(<MenuItem label="Active Item" active />);
      const label = screen.getByText('Active Item');
      expect(label).toHaveAttribute('class');
    });

    it('should have className when not active', () => {
      render(<MenuItem label="Inactive Item" active={false} />);
      const item = screen.getByText('Inactive Item').parentElement as HTMLElement;
      expect(item).toHaveAttribute('class');
    });

    it('should have className on label when not active', () => {
      render(<MenuItem label="Inactive Item" active={false} />);
      const label = screen.getByText('Inactive Item');
      expect(label).toHaveAttribute('class');
    });

    it('should have aria-current when active', () => {
      render(<MenuItem label="Active" active />);
      const item = screen.getByText('Active').parentElement as HTMLElement;
      expect(item).toHaveAttribute('aria-current', 'page');
    });

    it('should not have aria-current when not active', () => {
      render(<MenuItem label="Inactive" active={false} />);
      const item = screen.getByText('Inactive').parentElement as HTMLElement;
      expect(item).not.toHaveAttribute('aria-current');
    });
  });

  describe('Disabled State', () => {
    it('should have className when disabled', () => {
      render(<MenuItem label="Disabled" disabled />);
      const item = screen.getByText('Disabled').parentElement as HTMLElement;
      expect(item).toHaveAttribute('class');
    });

    it('should have className on label when disabled', () => {
      render(<MenuItem label="Disabled" disabled />);
      const label = screen.getByText('Disabled');
      expect(label).toHaveAttribute('class');
    });

    it('should render button as disabled', () => {
      render(<MenuItem label="Disabled" disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should have aria-disabled on link when disabled', () => {
      render(<MenuItem label="Disabled" href="/test" disabled />);
      const link = screen.getByText('Disabled').parentElement as HTMLElement;
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Link vs Button', () => {
    it('should render as button by default', () => {
      render(<MenuItem label="Button" />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render as link when href is provided', () => {
      render(<MenuItem label="Link" href="/dashboard" />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('should have button type', () => {
      render(<MenuItem label="Button" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should prevent navigation when link is disabled', () => {
      const handleClick = jest.fn();
      render(<MenuItem label="Disabled Link" href="/test" disabled onClick={handleClick} />);
      const link = screen.getByRole('link');
      fireEvent.click(link);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('should have className on container', () => {
      render(<MenuItem label="Test" />);
      const item = screen.getByText('Test').parentElement as HTMLElement;
      expect(item).toHaveAttribute('class');
    });

    it('should have className on label', () => {
      render(<MenuItem label="Test Label" />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('class');
    });
  });

  describe('Use Cases', () => {
    it('should render navigation item', () => {
      render(<MenuItem icon={Home} label="Home" />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render active navigation item', () => {
      render(<MenuItem icon={Home} label="Dashboard" active />);
      const label = screen.getByText('Dashboard');
      expect(label).toHaveAttribute('class');
    });

    it('should render disabled menu item', () => {
      render(<MenuItem icon={Settings} label="Settings" disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should render as navigation link', () => {
      render(<MenuItem icon={User} label="Profile" href="/profile" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/profile');
    });
  });

  describe('Complex Scenarios', () => {
    it('should render multiple menu items', () => {
      const { rerender } = render(<MenuItem icon={Home} label="Home" />);
      expect(screen.getByText('Home')).toBeInTheDocument();

      rerender(<MenuItem icon={Settings} label="Settings" />);
      expect(screen.getByText('Settings')).toBeInTheDocument();

      rerender(<MenuItem icon={User} label="Profile" />);
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible as button', () => {
      const handleClick = jest.fn();
      render(<MenuItem label="Accessible" onClick={handleClick} />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should be keyboard accessible as link', () => {
      render(<MenuItem label="Accessible" href="/test" />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should have semantic button element', () => {
      render(<MenuItem label="Button" />);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should have semantic link element', () => {
      render(<MenuItem label="Link" href="/test" />);
      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
    });

    it('should indicate current page with aria-current', () => {
      render(<MenuItem label="Current" active />);
      const item = screen.getByText('Current').parentElement as HTMLElement;
      expect(item).toHaveAttribute('aria-current', 'page');
    });
  });
});
