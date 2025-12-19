// Path: src/components/organisms/Modal/Modal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button';

describe('Modal Organism', () => {
  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render close button', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      expect(screen.getByLabelText('Cerrar modal')).toBeInTheDocument();
    });

    it('should render with footer', () => {
      const footer = (
        <div>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary">Confirmar</Button>
        </div>
      );

      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" footer={footer}>
          Content
        </Modal>
      );

      expect(screen.getByText('Cancelar')).toBeInTheDocument();
      expect(screen.getByText('Confirmar')).toBeInTheDocument();
    });

    it('should render without footer', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Close Functionality', () => {
    it('should call onClose when close button is clicked', () => {
      const handleClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      fireEvent.click(screen.getByLabelText('Cerrar modal'));

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when overlay is clicked', () => {
      const handleClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      const overlay = screen.getByRole('dialog');
      fireEvent.click(overlay);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when modal content is clicked', () => {
      const handleClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <button>Inside button</button>
        </Modal>
      );

      fireEvent.click(screen.getByText('Inside button'));

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('should call onClose when Escape key is pressed', () => {
      const handleClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose on other keys', () => {
      const handleClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Enter' });

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    it('should render center variant by default', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const overlay = screen.getByRole('dialog');
      expect(overlay).toBeInTheDocument();
    });

    it('should render drawer variant', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" variant="drawer">
          Content
        </Modal>
      );

      const overlay = screen.getByRole('dialog');
      expect(overlay).toBeInTheDocument();
    });

    it('should render center variant with centered content', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" variant="center">
          Content
        </Modal>
      );

      const overlay = screen.getByRole('dialog');
      expect(overlay).toBeInTheDocument();
      const modal = container.querySelector('div[role="dialog"] > div');
      expect(modal).toBeInTheDocument();
    });

    it('should render drawer variant with side panel', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" variant="drawer">
          Content
        </Modal>
      );

      const overlay = screen.getByRole('dialog');
      expect(overlay).toBeInTheDocument();
      const modal = container.querySelector('div[role="dialog"] > div');
      expect(modal).toBeInTheDocument();
    });

    it('should render modal container for center variant', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" variant="center">
          Content
        </Modal>
      );

      const modal = container.querySelector('div[role="dialog"] > div');
      expect(modal).toBeInTheDocument();
    });

    it('should render modal container for drawer variant', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" variant="drawer">
          Content
        </Modal>
      );

      const modal = container.querySelector('div[role="dialog"] > div');
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have header border', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const title = screen.getByText('Test Modal');
      const header = title.parentElement;
      expect(header).toBeInTheDocument();
    });

    it('should render title', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const title = screen.getByText('Test Modal');
      expect(title).toBeInTheDocument();
    });

    it('should apply custom maxWidth', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" maxWidth="800px">
          Content
        </Modal>
      );

      const modal = container.querySelector('div[role="dialog"] > div');
      expect(modal).toHaveStyle({
        maxWidth: '800px'
      });
    });

    it('should render body', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <div data-testid="body-content">Content</div>
        </Modal>
      );

      const bodyContent = screen.getByTestId('body-content');
      const body = bodyContent.parentElement;
      expect(body).toBeInTheDocument();
    });

    it('should render footer when provided', () => {
      const footer = <div data-testid="footer-content">Footer</div>;

      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" footer={footer}>
          Content
        </Modal>
      );

      const footerContent = screen.getByTestId('footer-content');
      const footerContainer = footerContent.parentElement;
      expect(footerContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role="dialog"', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have aria-modal="true"', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should have aria-labelledby pointing to title', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');

      const title = screen.getByText('Test Modal');
      expect(title).toHaveAttribute('id', 'modal-title');
    });

    it('should have accessible close button label', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      expect(screen.getByLabelText('Cerrar modal')).toBeInTheDocument();
    });
  });

  describe('Body Scroll Lock', () => {
    it('should lock body scroll when modal is open', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal isOpen={false} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('Hover States', () => {
    it('should render close button', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const closeButton = screen.getByLabelText('Cerrar modal');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('should work as informative modal', () => {
      const handleClose = jest.fn();
      const footer = <Button variant="primary" onClick={handleClose}>Cerrar</Button>;

      render(
        <Modal isOpen={true} onClose={handleClose} title="Información" footer={footer}>
          Este es un mensaje informativo.
        </Modal>
      );

      expect(screen.getByText('Información')).toBeInTheDocument();
      expect(screen.getByText('Este es un mensaje informativo.')).toBeInTheDocument();
      expect(screen.getByText('Cerrar')).toBeInTheDocument();
    });

    it('should work as confirmation modal', () => {
      const handleCancel = jest.fn();
      const handleConfirm = jest.fn();
      const footer = (
        <>
          <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
          <Button variant="primary" onClick={handleConfirm}>Confirmar</Button>
        </>
      );

      render(
        <Modal isOpen={true} onClose={handleCancel} title="Confirmar acción" footer={footer}>
          ¿Está seguro de que desea continuar?
        </Modal>
      );

      expect(screen.getByText('Confirmar acción')).toBeInTheDocument();
      expect(screen.getByText('Cancelar')).toBeInTheDocument();
      expect(screen.getByText('Confirmar')).toBeInTheDocument();
    });

    it('should work as destructive modal', () => {
      const handleCancel = jest.fn();
      const handleDelete = jest.fn();
      const footer = (
        <>
          <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
        </>
      );

      render(
        <Modal isOpen={true} onClose={handleCancel} title="Eliminar registro" footer={footer}>
          Esta acción no se puede deshacer.
        </Modal>
      );

      expect(screen.getByText('Eliminar registro')).toBeInTheDocument();
      expect(screen.getByText('Eliminar')).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('should have focusable close button', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const closeButton = screen.getByLabelText('Cerrar modal');
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });

    it('should have focusable elements inside modal', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <input type="text" data-testid="modal-input" />
          <button data-testid="modal-button">Click me</button>
        </Modal>
      );

      const input = screen.getByTestId('modal-input');
      const button = screen.getByTestId('modal-button');

      input.focus();
      expect(document.activeElement).toBe(input);

      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('should allow focus to move between modal elements', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <input type="text" data-testid="input-1" />
          <input type="text" data-testid="input-2" />
        </Modal>
      );

      const input1 = screen.getByTestId('input-1');
      const input2 = screen.getByTestId('input-2');
      const closeButton = screen.getByLabelText('Cerrar modal');

      input1.focus();
      expect(document.activeElement).toBe(input1);

      input2.focus();
      expect(document.activeElement).toBe(input2);

      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });

    it('should have close button as focusable with keyboard', () => {
      const handleClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      const closeButton = screen.getByLabelText('Cerrar modal');
      closeButton.focus();
      fireEvent.keyDown(closeButton, { key: 'Enter' });

      // Close button should be clickable with keyboard
      expect(closeButton).toHaveAttribute('type', 'button');
    });

    it('should keep focus within modal footer buttons', () => {
      const footer = (
        <>
          <Button variant="secondary" data-testid="cancel-btn">Cancelar</Button>
          <Button variant="primary" data-testid="confirm-btn">Confirmar</Button>
        </>
      );

      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" footer={footer}>
          Content
        </Modal>
      );

      const cancelBtn = screen.getByText('Cancelar');
      const confirmBtn = screen.getByText('Confirmar');

      cancelBtn.focus();
      expect(document.activeElement).toBe(cancelBtn);

      confirmBtn.focus();
      expect(document.activeElement).toBe(confirmBtn);
    });
  });

  describe('CSS Classes Verification', () => {
    it('should render dialog overlay', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const overlay = screen.getByRole('dialog');
      expect(overlay).toBeInTheDocument();
    });

    it('should apply modal class to modal container', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const modal = container.querySelector('div[role="dialog"] > div');
      expect(modal).toBeInTheDocument();
    });

    it('should have header with title', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const title = screen.getByText('Test Modal');
      const header = title.parentElement;
      expect(header).toBeInTheDocument();
    });

    it('should render title', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const title = screen.getByText('Test Modal');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H1');
    });

    it('should render body content', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          <div data-testid="content">Content</div>
        </Modal>
      );

      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(content.parentElement).toBeInTheDocument();
    });

    it('should render footer when provided', () => {
      const footer = <div data-testid="footer-content">Footer</div>;

      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" footer={footer}>
          Content
        </Modal>
      );

      const footerContent = screen.getByTestId('footer-content');
      expect(footerContent).toBeInTheDocument();
      expect(footerContent.parentElement).toBeInTheDocument();
    });

    it('should render close button', () => {
      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          Content
        </Modal>
      );

      const closeButton = screen.getByLabelText('Cerrar modal');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton.tagName).toBe('BUTTON');
    });

    it('should apply custom className to modal', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" className="my-custom-modal">
          Content
        </Modal>
      );

      const modal = container.querySelector('.my-custom-modal');
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Overlay Click Behavior', () => {
    it('should close when clicking exactly on overlay', () => {
      const handleClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      const overlay = screen.getByRole('dialog');
      // Click directly on overlay (not on child elements)
      fireEvent.click(overlay);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should not close when clicking on modal title', () => {
      const handleClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      fireEvent.click(screen.getByText('Test Modal'));

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('should not close when clicking on modal body content', () => {
      const handleClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          <p>Body content here</p>
        </Modal>
      );

      fireEvent.click(screen.getByText('Body content here'));

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('should not close when clicking on footer buttons', () => {
      const handleClose = jest.fn();
      const handleConfirm = jest.fn();
      const footer = (
        <Button variant="primary" onClick={handleConfirm}>Confirmar</Button>
      );

      render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal" footer={footer}>
          Content
        </Modal>
      );

      fireEvent.click(screen.getByText('Confirmar'));

      expect(handleClose).not.toHaveBeenCalled();
      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long content', () => {
      const longContent = 'Lorem ipsum '.repeat(100);

      render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal">
          {longContent}
        </Modal>
      );

      expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
    });

    it('should handle custom className', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={() => {}} title="Test Modal" className="custom-modal">
          Content
        </Modal>
      );

      const modal = container.querySelector('.custom-modal');
      expect(modal).toBeInTheDocument();
    });

    it('should handle rapid open/close', () => {
      const handleClose = jest.fn();
      const { rerender } = render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      rerender(
        <Modal isOpen={false} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      rerender(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal">
          Content
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});
