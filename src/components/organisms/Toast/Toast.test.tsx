// Path: src/components/organisms/Toast/Toast.test.tsx
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { ToastProvider, useToast } from './ToastContext';

/* ═══════════════════════════════════════════════════════════════════════════════
   TOAST SYSTEM TESTS
   ═══════════════════════════════════════════════════════════════════════════════ */

// Test component to access toast context
function TestComponent({ onMount }: { onMount?: (toast: ReturnType<typeof useToast>) => void }) {
  const toast = useToast();

  React.useEffect(() => {
    onMount?.(toast);
  }, [toast, onMount]);

  return (
    <div>
      <button onClick={() => toast.toast({ title: 'Test Toast' })}>
        Show Toast
      </button>
      <button onClick={() => toast.success('Success!')}>
        Show Success
      </button>
      <button onClick={() => toast.error('Error!')}>
        Show Error
      </button>
      <button onClick={() => toast.warning('Warning!')}>
        Show Warning
      </button>
      <button onClick={() => toast.info('Info!')}>
        Show Info
      </button>
      <button onClick={() => toast.dismissAll()}>
        Dismiss All
      </button>
    </div>
  );
}

// Wrapper component with provider
function renderWithProvider(ui: React.ReactElement, providerProps = {}) {
  return render(
    <ToastProvider {...providerProps}>
      {ui}
    </ToastProvider>
  );
}

describe('Toast System', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('ToastProvider', () => {
    it('renders children', () => {
      renderWithProvider(<div>Child content</div>);
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('throws error when useToast is used outside provider', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useToast must be used within a ToastProvider');

      consoleError.mockRestore();
    });
  });

  describe('Toast Creation', () => {
    it('shows toast when triggered', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Toast'));

      await waitFor(() => {
        expect(screen.getByText('Test Toast')).toBeInTheDocument();
      });
    });

    it('shows success toast', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Success'));

      await waitFor(() => {
        expect(screen.getByText('Success!')).toBeInTheDocument();
      });
    });

    it('shows error toast', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Error'));

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument();
      });
    });

    it('shows warning toast', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Warning'));

      await waitFor(() => {
        expect(screen.getByText('Warning!')).toBeInTheDocument();
      });
    });

    it('shows info toast', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Info'));

      await waitFor(() => {
        expect(screen.getByText('Info!')).toBeInTheDocument();
      });
    });

    it('shows toast with description', async () => {
      let toastApi: ReturnType<typeof useToast>;

      renderWithProvider(
        <TestComponent onMount={(t) => { toastApi = t; }} />
      );

      act(() => {
        toastApi.toast({
          title: 'Title',
          description: 'Description text',
        });
      });

      await waitFor(() => {
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description text')).toBeInTheDocument();
      });
    });
  });

  describe('Toast Dismissal', () => {
    it('dismisses toast when dismiss button is clicked', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Toast'));

      await waitFor(() => {
        expect(screen.getByText('Test Toast')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('Cerrar notificación'));

      // Wait for animation
      act(() => {
        jest.advanceTimersByTime(300);
      });

      await waitFor(() => {
        expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
      });
    });

    it('dismisses all toasts', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Toast'));
      fireEvent.click(screen.getByText('Show Success'));

      await waitFor(() => {
        expect(screen.getByText('Test Toast')).toBeInTheDocument();
        expect(screen.getByText('Success!')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Dismiss All'));

      await waitFor(() => {
        expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
        expect(screen.queryByText('Success!')).not.toBeInTheDocument();
      });
    });

    it('auto-dismisses toast after duration', async () => {
      renderWithProvider(<TestComponent />, { defaultDuration: 1000 });

      fireEvent.click(screen.getByText('Show Toast'));

      await waitFor(() => {
        expect(screen.getByText('Test Toast')).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      await waitFor(() => {
        expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
      });
    });

    it('error toast does not auto-dismiss by default', async () => {
      renderWithProvider(<TestComponent />, { defaultDuration: 1000 });

      fireEvent.click(screen.getByText('Show Error'));

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      // Error should still be visible
      expect(screen.getByText('Error!')).toBeInTheDocument();
    });
  });

  describe('Toast Actions', () => {
    it('calls action callback when action button is clicked', async () => {
      const actionCallback = jest.fn();
      let toastApi: ReturnType<typeof useToast>;

      renderWithProvider(
        <TestComponent onMount={(t) => { toastApi = t; }} />
      );

      act(() => {
        toastApi.toast({
          title: 'Action Toast',
          action: {
            label: 'Undo',
            onClick: actionCallback,
          },
        });
      });

      await waitFor(() => {
        expect(screen.getByText('Undo')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Undo'));

      expect(actionCallback).toHaveBeenCalled();
    });
  });

  describe('Toast Limits', () => {
    it('limits number of visible toasts', async () => {
      let toastApi: ReturnType<typeof useToast>;

      renderWithProvider(
        <TestComponent onMount={(t) => { toastApi = t; }} />,
        { maxVisible: 2 }
      );

      act(() => {
        toastApi.toast({ title: 'Toast 1' });
        toastApi.toast({ title: 'Toast 2' });
        toastApi.toast({ title: 'Toast 3' });
      });

      await waitFor(() => {
        // Should only show 2 toasts (max)
        expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
        expect(screen.getByText('Toast 2')).toBeInTheDocument();
        expect(screen.getByText('Toast 3')).toBeInTheDocument();
      });
    });
  });

  describe('Toast Update', () => {
    it('updates existing toast', async () => {
      let toastApi: ReturnType<typeof useToast>;
      let toastId: string;

      renderWithProvider(
        <TestComponent onMount={(t) => { toastApi = t; }} />
      );

      act(() => {
        toastId = toastApi.toast({ title: 'Original Title' });
      });

      await waitFor(() => {
        expect(screen.getByText('Original Title')).toBeInTheDocument();
      });

      act(() => {
        toastApi.update(toastId, { title: 'Updated Title' });
      });

      await waitFor(() => {
        expect(screen.queryByText('Original Title')).not.toBeInTheDocument();
        expect(screen.getByText('Updated Title')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes on container', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Toast'));

      await waitFor(() => {
        const container = screen.getByRole('region');
        expect(container).toHaveAttribute('aria-label', 'Notificaciones');
        expect(container).toHaveAttribute('aria-live', 'polite');
      });
    });

    it('has correct role on toast', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Toast'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });

    it('error toast has assertive aria-live', async () => {
      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByText('Show Error'));

      await waitFor(() => {
        const toast = screen.getByRole('alert');
        expect(toast).toHaveAttribute('aria-live', 'assertive');
      });
    });
  });

  describe('Positions', () => {
    const positions = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ] as const;

    positions.forEach((position) => {
      it(`renders in ${position} position`, async () => {
        renderWithProvider(<TestComponent />, { position });

        fireEvent.click(screen.getByText('Show Toast'));

        await waitFor(() => {
          expect(screen.getByText('Test Toast')).toBeInTheDocument();
        });
      });
    });
  });
});
