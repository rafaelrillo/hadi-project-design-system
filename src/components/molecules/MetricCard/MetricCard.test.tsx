// Path: src/components/molecules/MetricCard/MetricCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MetricCard } from './MetricCard';
import { DollarSign } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   METRICCARD TESTS
   ═══════════════════════════════════════════════════════════════════════════════ */

describe('MetricCard', () => {
  describe('Basic Rendering', () => {
    it('renders title and value', () => {
      render(<MetricCard title="Revenue" value={1000} />);

      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('1000')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      render(<MetricCard title="Revenue" value={1000} icon={<DollarSign data-testid="icon" />} />);

      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Value Formatting', () => {
    it('formats currency values', () => {
      render(<MetricCard title="Revenue" value={1234.56} format="currency" currency="USD" />);

      expect(screen.getByText('$1,234.56')).toBeInTheDocument();
    });

    it('formats percentage values', () => {
      render(<MetricCard title="Growth" value={25} format="percentage" decimals={0} />);

      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('formats number values with decimals', () => {
      render(<MetricCard title="Count" value={1234.567} format="number" decimals={2} />);

      expect(screen.getByText('1,234.57')).toBeInTheDocument();
    });

    it('applies prefix and suffix', () => {
      render(<MetricCard title="Value" value={100} prefix="~" suffix=" units" />);

      expect(screen.getByText('~100 units')).toBeInTheDocument();
    });
  });

  describe('Trend', () => {
    it('shows upward trend', () => {
      render(
        <MetricCard
          title="Revenue"
          value={1000}
          trend={{ value: 5.2, direction: 'up' }}
        />
      );

      expect(screen.getByText('+5.2%')).toBeInTheDocument();
    });

    it('shows downward trend', () => {
      render(
        <MetricCard
          title="Costs"
          value={500}
          trend={{ value: -3.1, direction: 'down' }}
        />
      );

      expect(screen.getByText('-3.1%')).toBeInTheDocument();
    });

    it('shows trend label', () => {
      render(
        <MetricCard
          title="Revenue"
          value={1000}
          trend={{ value: 5, direction: 'up', label: 'vs last week' }}
        />
      );

      expect(screen.getByText('vs last week')).toBeInTheDocument();
    });
  });

  describe('Progress Bar', () => {
    it('renders progress bar', () => {
      render(
        <MetricCard
          title="Quota"
          value={75}
          progress={{ value: 75, max: 100, showLabel: true }}
        />
      );

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });

  describe('Distribution Bar', () => {
    it('renders distribution segments', () => {
      render(
        <MetricCard
          title="Portfolio"
          value="$10,000"
          distribution={{
            segments: [
              { value: 60, label: 'Stocks' },
              { value: 30, label: 'Bonds' },
              { value: 10, label: 'Cash' },
            ],
          }}
        />
      );

      expect(screen.getByText('Stocks')).toBeInTheDocument();
      expect(screen.getByText('Bonds')).toBeInTheDocument();
      expect(screen.getByText('Cash')).toBeInTheDocument();
    });
  });

  describe('Comparison', () => {
    it('renders comparison value', () => {
      render(
        <MetricCard
          title="Revenue"
          value={1000}
          comparison={{ label: 'Target', value: '$900', difference: 11 }}
        />
      );

      expect(screen.getByText('Target:')).toBeInTheDocument();
      expect(screen.getByText('$900')).toBeInTheDocument();
      expect(screen.getByText('+11%')).toBeInTheDocument();
    });
  });

  describe('Sparkline', () => {
    it('renders sparkline when data provided', () => {
      render(
        <MetricCard
          title="Trend"
          value={100}
          sparkline={[10, 20, 15, 25, 30, 28, 35]}
        />
      );

      // SVG should be present
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      render(<MetricCard title="Revenue" value={1000} onClick={onClick} />);

      fireEvent.click(screen.getByText('Revenue').closest('div')!);
      expect(onClick).toHaveBeenCalled();
    });

    it('renders as link when href provided', () => {
      render(<MetricCard title="Revenue" value={1000} href="/dashboard" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/dashboard');
    });

    it('calls onActionClick when action button clicked', () => {
      const onActionClick = jest.fn();
      render(
        <MetricCard
          title="Revenue"
          value={1000}
          actionLabel="View details"
          onActionClick={onActionClick}
        />
      );

      fireEvent.click(screen.getByText('View details'));
      expect(onActionClick).toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('shows loading state', () => {
      render(<MetricCard title="Revenue" value={1000} loading />);

      // Should not show the value when loading
      expect(screen.queryByText('1000')).not.toBeInTheDocument();
    });

    it('shows error state', () => {
      render(<MetricCard title="Revenue" value={1000} error="Failed to load" />);

      expect(screen.getByText('Failed to load')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('applies small size class', () => {
      const { container } = render(<MetricCard title="Revenue" value={1000} size="sm" />);

      expect(container.firstChild).toHaveClass('sizeSm');
    });

    it('applies large size class', () => {
      const { container } = render(<MetricCard title="Revenue" value={1000} size="lg" />);

      expect(container.firstChild).toHaveClass('sizeLg');
    });
  });

  describe('Variants', () => {
    it('applies outlined variant class', () => {
      const { container } = render(<MetricCard title="Revenue" value={1000} variant="outlined" />);

      expect(container.firstChild).toHaveClass('variantOutlined');
    });

    it('applies filled variant class', () => {
      const { container } = render(<MetricCard title="Revenue" value={1000} variant="filled" />);

      expect(container.firstChild).toHaveClass('variantFilled');
    });
  });

  describe('Status', () => {
    it('applies success status class', () => {
      const { container } = render(<MetricCard title="Revenue" value={1000} status="success" />);

      expect(container.firstChild).toHaveClass('statusSuccess');
    });

    it('applies warning status class', () => {
      const { container } = render(<MetricCard title="Revenue" value={1000} status="warning" />);

      expect(container.firstChild).toHaveClass('statusWarning');
    });

    it('applies error status class', () => {
      const { container } = render(<MetricCard title="Revenue" value={1000} status="error" />);

      expect(container.firstChild).toHaveClass('statusError');
    });
  });

  describe('Previous Value', () => {
    it('shows previous value', () => {
      render(<MetricCard title="Revenue" value={1000} previousValue={900} />);

      expect(screen.getByText(/Anterior:/)).toBeInTheDocument();
      expect(screen.getByText(/900/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct role for interactive cards', () => {
      render(<MetricCard title="Revenue" value={1000} onClick={() => {}} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is keyboard accessible when interactive', () => {
      render(<MetricCard title="Revenue" value={1000} onClick={() => {}} />);

      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });
});
