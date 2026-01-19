// Path: src/components/molecules/Card/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('should render card with children only', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render card with header', () => {
      render(<Card header={<h3>Card Header</h3>}>Content</Card>);
      expect(screen.getByText('Card Header')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render card with footer', () => {
      render(<Card footer={<div>Card Footer</div>}>Content</Card>);
      expect(screen.getByText('Card Footer')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render card with header, children, and footer', () => {
      render(
        <Card
          header={<h3>Header</h3>}
          footer={<div>Footer</div>}
        >
          Body Content
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('Status', () => {
    it('should render success status', () => {
      const { container } = render(<Card status="success">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });

    it('should render warning status', () => {
      const { container } = render(<Card status="warning">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });

    it('should render error status', () => {
      const { container } = render(<Card status="error">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });

    it('should render neutral status', () => {
      const { container } = render(<Card status="neutral">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });

    it('should render without status border when status is not specified', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should render card container', () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });

    it('should render header section', () => {
      render(<Card header={<div>Header Content</div>}>Body</Card>);
      const header = screen.getByText('Header Content').parentElement as HTMLElement;
      expect(header).toBeInTheDocument();
    });

    it('should render body section', () => {
      const { container } = render(<Card>Body Content</Card>);
      const card = container.firstChild as HTMLElement;
      const bodyDiv = card.querySelector('div') as HTMLElement;
      expect(bodyDiv).toBeInTheDocument();
    });

    it('should render footer section', () => {
      render(<Card footer={<div>Footer Content</div>}>Body</Card>);
      const footer = screen.getByText('Footer Content').parentElement as HTMLElement;
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Content Types', () => {
    it('should display text content', () => {
      render(<Card>Simple text content</Card>);
      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('should display complex HTML content', () => {
      render(
        <Card>
          <div>
            <h4>Title</h4>
            <p>Paragraph</p>
          </div>
        </Card>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
    });

    it('should display multiple children', () => {
      render(
        <Card>
          <div>First child</div>
          <div>Second child</div>
          <div>Third child</div>
        </Card>
      );
      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
      expect(screen.getByText('Third child')).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('should render user information card', () => {
      render(
        <Card
          header={<h3>User Profile</h3>}
        >
          <div>Name: John Doe</div>
          <div>Email: john@example.com</div>
        </Card>
      );
      expect(screen.getByText('User Profile')).toBeInTheDocument();
      expect(screen.getByText(/Name:/)).toBeInTheDocument();
      expect(screen.getByText(/Email:/)).toBeInTheDocument();
    });

    it('should render success notification card', () => {
      render(
        <Card status="success">
          <div>Operation completed successfully!</div>
        </Card>
      );
      expect(screen.getByText('Operation completed successfully!')).toBeInTheDocument();
    });

    it('should render error notification card', () => {
      render(
        <Card status="error">
          <div>An error occurred</div>
        </Card>
      );
      expect(screen.getByText('An error occurred')).toBeInTheDocument();
    });

    it('should render card with actions in footer', () => {
      render(
        <Card
          header={<h3>Title</h3>}
          footer={
            <div>
              <button>Save</button>
              <button>Cancel</button>
            </div>
          }
        >
          Content goes here
        </Card>
      );
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all props together', () => {
      const { container } = render(
        <Card
          header={<h3>Complex Card</h3>}
          footer={<div>Footer Content</div>}
          status="success"
          className="custom-card"
        >
          <p>Body content with all features</p>
        </Card>
      );

      expect(screen.getByText('Complex Card')).toBeInTheDocument();
      expect(screen.getByText('Body content with all features')).toBeInTheDocument();
      expect(screen.getByText('Footer Content')).toBeInTheDocument();

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-card');
    });

    it('should render multiple cards with different status values', () => {
      const { rerender } = render(<Card status="success">Success Card</Card>);
      expect(screen.getByText('Success Card')).toBeInTheDocument();

      rerender(<Card status="error">Error Card</Card>);
      expect(screen.getByText('Error Card')).toBeInTheDocument();

      rerender(<Card status="warning">Warning Card</Card>);
      expect(screen.getByText('Warning Card')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render semantic HTML', () => {
      const { container } = render(
        <Card header={<h3>Header</h3>}>Content</Card>
      );
      const h3 = container.querySelector('h3');
      expect(h3).toBeInTheDocument();
      expect(h3).toHaveTextContent('Header');
    });

    it('should support any valid React node as children', () => {
      render(
        <Card>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </Card>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });
});
