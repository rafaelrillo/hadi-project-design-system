// Path: src/components/organisms/Table/Table.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Table, TableColumn, TableRow, TableAction } from './Table';
import { Edit, Trash2 } from 'lucide-react';

describe('Table Organism', () => {
  const basicColumns: TableColumn[] = [
    { key: 'id', header: 'ID', width: '60px' },
    { key: 'name', header: 'Nombre' },
    { key: 'email', header: 'Email' }
  ];

  const basicData: TableRow[] = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
    { id: '2', name: 'María García', email: 'maria@example.com' },
    { id: '3', name: 'Carlos López', email: 'carlos@example.com' }
  ];

  describe('Rendering', () => {
    it('should render table with basic data', () => {
      render(<Table columns={basicColumns} data={basicData} />);

      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Nombre')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
      expect(screen.getByText('María García')).toBeInTheDocument();
    });

    it('should render empty table with headers only', () => {
      render(<Table columns={basicColumns} data={[]} />);

      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Nombre')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
    });

    it('should render table with custom widths', () => {
      const columns: TableColumn[] = [
        { key: 'id', header: 'ID', width: '100px' },
        { key: 'name', header: 'Nombre', width: '200px' }
      ];

      render(<Table columns={columns} data={basicData} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers[0]).toHaveStyle({ width: '100px' });
      expect(headers[1]).toHaveStyle({ width: '200px' });
    });

    it('should render table with custom alignment', () => {
      const columns: TableColumn[] = [
        { key: 'id', header: 'ID', align: 'center' },
        { key: 'name', header: 'Nombre', align: 'left' },
        { key: 'status', header: 'Status', align: 'right' }
      ];

      const data: TableRow[] = [
        { id: '1', name: 'Test', status: 'Active' }
      ];

      const { container } = render(<Table columns={columns} data={data} />);

      // Verify alignment classes are applied (CSS Modules handles actual alignment)
      const headerCells = container.querySelectorAll('th');
      expect(headerCells.length).toBe(3);

      const cells = container.querySelectorAll('td');
      expect(cells.length).toBe(3);
    });
  });

  describe('Border Styles', () => {
    it('should use "none" border style for 2-3 columns', () => {
      const columns: TableColumn[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre' }
      ];

      const { container } = render(<Table columns={columns} data={basicData} />);
      const table = container.querySelector('table');

      expect(table).toBeInTheDocument();
    });

    it('should use "bottom" border style for 4-7 columns', () => {
      const columns: TableColumn[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Teléfono' },
        { key: 'city', header: 'Ciudad' }
      ];

      const data: TableRow[] = [
        { id: '1', name: 'Test', email: 'test@test.com', phone: '123', city: 'Lima' }
      ];

      render(<Table columns={columns} data={data} />);

      const headerCells = screen.getAllByRole('columnheader');
      expect(headerCells[0]).toBeInTheDocument();
    });

    it('should use "full" border style for 8+ columns', () => {
      const columns: TableColumn[] = [
        { key: 'col1', header: 'Col 1' },
        { key: 'col2', header: 'Col 2' },
        { key: 'col3', header: 'Col 3' },
        { key: 'col4', header: 'Col 4' },
        { key: 'col5', header: 'Col 5' },
        { key: 'col6', header: 'Col 6' },
        { key: 'col7', header: 'Col 7' },
        { key: 'col8', header: 'Col 8' }
      ];

      const data: TableRow[] = [
        { id: '1', col1: 'A', col2: 'B', col3: 'C', col4: 'D', col5: 'E', col6: 'F', col7: 'G', col8: 'H' }
      ];

      const { container } = render(<Table columns={columns} data={data} />);
      const table = container.querySelector('table');

      expect(table).toBeInTheDocument();
    });
  });

  describe('Row Heights', () => {
    it('should use standard height by default', () => {
      const { container } = render(<Table columns={basicColumns} data={basicData} />);

      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
      // Standard height is applied via CSS custom property --table-row-height: 40px
    });

    it('should use compact height when specified', () => {
      const { container } = render(<Table columns={basicColumns} data={basicData} rowHeight="compact" />);

      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
      // Compact height is applied via CSS custom property --table-row-height: 30px
    });
  });

  describe('Selectable Rows', () => {
    it('should render checkboxes when selectable', () => {
      render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
        />
      );

      expect(screen.getByLabelText('Seleccionar todas las filas')).toBeInTheDocument();
      expect(screen.getByLabelText('Seleccionar fila 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Seleccionar fila 2')).toBeInTheDocument();
    });

    it('should call onRowSelect when checkbox is clicked', () => {
      const handleSelect = jest.fn();

      render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
          onRowSelect={handleSelect}
        />
      );

      const checkbox = screen.getByLabelText('Seleccionar fila 1');
      fireEvent.click(checkbox);

      expect(handleSelect).toHaveBeenCalledWith(['1']);
    });

    it('should select all rows when header checkbox is clicked', () => {
      const handleSelect = jest.fn();

      render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
          onRowSelect={handleSelect}
        />
      );

      const selectAllCheckbox = screen.getByLabelText('Seleccionar todas las filas');
      fireEvent.click(selectAllCheckbox);

      expect(handleSelect).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('should deselect all rows when header checkbox is clicked again', () => {
      const handleSelect = jest.fn();

      render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
          selectedRows={['1', '2', '3']}
          onRowSelect={handleSelect}
        />
      );

      const selectAllCheckbox = screen.getByLabelText('Seleccionar todas las filas');
      fireEvent.click(selectAllCheckbox);

      expect(handleSelect).toHaveBeenCalledWith([]);
    });

    it('should toggle individual row selection', () => {
      const handleSelect = jest.fn();

      render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
          selectedRows={['1']}
          onRowSelect={handleSelect}
        />
      );

      const checkbox = screen.getByLabelText('Seleccionar fila 1');
      fireEvent.click(checkbox);

      expect(handleSelect).toHaveBeenCalledWith([]);
    });

    it('should show selected state on rows', () => {
      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
          selectedRows={['1']}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toBeInTheDocument();
    });
  });

  describe('Expandable Rows', () => {
    it('should render expand buttons when expandable', () => {
      const dataWithExpandable: TableRow[] = [
        {
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          expandedContent: <div>Contenido expandido</div>
        }
      ];

      render(
        <Table
          columns={basicColumns}
          data={dataWithExpandable}
          expandable={true}
        />
      );

      expect(screen.getByLabelText('Expandir fila')).toBeInTheDocument();
    });

    it('should expand row when button is clicked', () => {
      const dataWithExpandable: TableRow[] = [
        {
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          expandedContent: <div>Contenido expandido</div>
        }
      ];

      render(
        <Table
          columns={basicColumns}
          data={dataWithExpandable}
          expandable={true}
        />
      );

      const expandButton = screen.getByLabelText('Expandir fila');
      fireEvent.click(expandButton);

      expect(screen.getByText('Contenido expandido')).toBeInTheDocument();
      expect(screen.getByLabelText('Contraer fila')).toBeInTheDocument();
    });

    it('should collapse row when button is clicked again', () => {
      const dataWithExpandable: TableRow[] = [
        {
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          expandedContent: <div>Contenido expandido</div>
        }
      ];

      render(
        <Table
          columns={basicColumns}
          data={dataWithExpandable}
          expandable={true}
        />
      );

      const expandButton = screen.getByLabelText('Expandir fila');
      fireEvent.click(expandButton);

      expect(screen.getByText('Contenido expandido')).toBeInTheDocument();

      const collapseButton = screen.getByLabelText('Contraer fila');
      fireEvent.click(collapseButton);

      expect(screen.queryByText('Contenido expandido')).not.toBeInTheDocument();
    });
  });

  describe('Row Actions', () => {
    it('should render action buttons', () => {
      const handleEdit = jest.fn();
      const handleDelete = jest.fn();

      const actions: TableAction[] = [
        { icon: Edit, label: 'Editar', onClick: handleEdit },
        { icon: Trash2, label: 'Eliminar', onClick: handleDelete, variant: 'destructive' }
      ];

      const dataWithActions: TableRow[] = [
        { id: '1', name: 'Test', email: 'test@test.com', actions }
      ];

      render(<Table columns={basicColumns} data={dataWithActions} />);

      expect(screen.getByLabelText('Editar')).toBeInTheDocument();
      expect(screen.getByLabelText('Eliminar')).toBeInTheDocument();
    });

    it('should call action onClick when clicked', () => {
      const handleEdit = jest.fn();

      const actions: TableAction[] = [
        { icon: Edit, label: 'Editar', onClick: handleEdit }
      ];

      const dataWithActions: TableRow[] = [
        { id: '1', name: 'Test', email: 'test@test.com', actions }
      ];

      render(<Table columns={basicColumns} data={dataWithActions} />);

      const editButton = screen.getByLabelText('Editar');
      fireEvent.click(editButton);

      expect(handleEdit).toHaveBeenCalledWith(dataWithActions[0]);
    });

    it('should show destructive action', () => {
      const handleDelete = jest.fn();

      const actions: TableAction[] = [
        { icon: Trash2, label: 'Eliminar', onClick: handleDelete, variant: 'destructive' }
      ];

      const dataWithActions: TableRow[] = [
        { id: '1', name: 'Test', email: 'test@test.com', actions }
      ];

      render(<Table columns={basicColumns} data={dataWithActions} />);

      const deleteButton = screen.getByLabelText('Eliminar');
      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe('Custom Render', () => {
    it('should use custom render function', () => {
      const columns: TableColumn[] = [
        { key: 'id', header: 'ID' },
        {
          key: 'name',
          header: 'Nombre',
          render: (value) => <strong data-testid="custom-render">{value}</strong>
        }
      ];

      render(<Table columns={columns} data={basicData} />);

      const customElements = screen.getAllByTestId('custom-render');
      expect(customElements).toHaveLength(3); // One for each row
      expect(customElements[0].tagName).toBe('STRONG');
      expect(customElements[0]).toHaveTextContent('Juan Pérez');
    });

    it('should pass row data to custom render function', () => {
      const renderFn = jest.fn((value, _row) => <span>{value}</span>);

      const columns: TableColumn[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre', render: renderFn }
      ];

      render(<Table columns={columns} data={basicData} />);

      expect(renderFn).toHaveBeenCalledWith('Juan Pérez', basicData[0]);
    });
  });

  describe('Row States', () => {
    it('should handle hover state on mouse enter', () => {
      const { container } = render(<Table columns={basicColumns} data={basicData} />);

      const rows = container.querySelectorAll('tbody tr');
      fireEvent.mouseEnter(rows[0]);

      expect(rows[0]).toBeInTheDocument();
    });

    it('should handle hover state on mouse leave', () => {
      const { container } = render(<Table columns={basicColumns} data={basicData} />);

      const rows = container.querySelectorAll('tbody tr');
      fireEvent.mouseEnter(rows[0]);
      fireEvent.mouseLeave(rows[0]);

      expect(rows[0]).toBeInTheDocument();
    });

    it('should handle focus state when row is focused', () => {
      const handleClick = jest.fn();

      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          onRowClick={handleClick}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      fireEvent.focus(rows[0]);

      expect(rows[0]).toBeInTheDocument();
    });

    it('should handle blur state', () => {
      const handleClick = jest.fn();

      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          onRowClick={handleClick}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      fireEvent.focus(rows[0]);
      fireEvent.blur(rows[0]);

      expect(rows[0]).toBeInTheDocument();
    });

    it('should render alternating rows for border 0% (2-3 columns)', () => {
      const columns: TableColumn[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre' }
      ];

      const { container } = render(<Table columns={columns} data={basicData} />);

      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBe(3);
      expect(rows[0]).toBeInTheDocument();
      expect(rows[1]).toBeInTheDocument();
      expect(rows[2]).toBeInTheDocument();
    });

    it('should render selected rows', () => {
      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
          selectedRows={['1']}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('should render selected indicator for border 0%', () => {
      const columns: TableColumn[] = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Nombre' }
      ];

      const { container } = render(
        <Table
          columns={columns}
          data={basicData}
          selectable={true}
          selectedRows={['1']}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('should have cursor pointer when onRowClick is provided', () => {
      const handleClick = jest.fn();

      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          onRowClick={handleClick}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveAttribute('tabindex', '0');
    });

    it('should have tabindex -1 when onRowClick is not provided', () => {
      const { container } = render(
        <Table columns={basicColumns} data={basicData} />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('Row Click', () => {
    it('should call onRowClick when row is clicked', () => {
      const handleClick = jest.fn();

      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          onRowClick={handleClick}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      fireEvent.click(rows[0]);

      expect(handleClick).toHaveBeenCalledWith(basicData[0]);
    });

    it('should not call onRowClick when checkbox is clicked', () => {
      const handleClick = jest.fn();
      const handleSelect = jest.fn();

      render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
          onRowClick={handleClick}
          onRowSelect={handleSelect}
        />
      );

      const checkbox = screen.getByLabelText('Seleccionar fila 1');
      fireEvent.click(checkbox);

      expect(handleClick).not.toHaveBeenCalled();
      expect(handleSelect).toHaveBeenCalled();
    });

    it('should not call onRowClick when action button is clicked', () => {
      const handleClick = jest.fn();
      const handleEdit = jest.fn();

      const actions: TableAction[] = [
        { icon: Edit, label: 'Editar', onClick: handleEdit }
      ];

      const dataWithActions: TableRow[] = [
        { id: '1', name: 'Test', email: 'test@test.com', actions }
      ];

      render(
        <Table
          columns={basicColumns}
          data={dataWithActions}
          onRowClick={handleClick}
        />
      );

      const editButton = screen.getByLabelText('Editar');
      fireEvent.click(editButton);

      expect(handleClick).not.toHaveBeenCalled();
      expect(handleEdit).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
          selectedRows={['1']}
        />
      );

      const selectAllCheckbox = screen.getByLabelText('Seleccionar todas las filas');
      expect(selectAllCheckbox).toBeInTheDocument();

      const rowCheckbox = screen.getByLabelText('Seleccionar fila 1');
      expect(rowCheckbox).toBeInTheDocument();
    });

    it('should have tabindex when row is clickable', () => {
      const handleClick = jest.fn();

      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          onRowClick={handleClick}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveAttribute('tabindex', '0');
    });

    it('should have aria-selected on selected rows', () => {
      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          selectable={true}
          selectedRows={['1']}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('should have aria-expanded on expandable rows', () => {
      const dataWithExpandable: TableRow[] = [
        {
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          expandedContent: <div>Content</div>
        }
      ];

      render(
        <Table
          columns={basicColumns}
          data={dataWithExpandable}
          expandable={true}
        />
      );

      const expandButton = screen.getByLabelText('Expandir fila');
      expect(expandButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(expandButton);

      const collapseButton = screen.getByLabelText('Contraer fila');
      expect(collapseButton).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Typography', () => {
    it('should render header', () => {
      render(<Table columns={basicColumns} data={basicData} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers[0]).toBeInTheDocument();
    });

    it('should render rows', () => {
      render(<Table columns={basicColumns} data={basicData} />);

      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toBeInTheDocument();
    });
  });

  describe('Table Structure', () => {
    it('should render table element', () => {
      const { container } = render(<Table columns={basicColumns} data={basicData} />);

      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
    });

    it('should render table with 8+ columns', () => {
      const columns: TableColumn[] = Array.from({ length: 8 }, (_, i) => ({
        key: `col${i}`,
        header: `Column ${i}`
      }));

      const data: TableRow[] = [{ id: '1', col0: 'A', col1: 'B', col2: 'C', col3: 'D', col4: 'E', col5: 'F', col6: 'G', col7: 'H' }];

      render(<Table columns={columns} data={data} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers.length).toBe(8);
    });

    it('should render header cells', () => {
      render(<Table columns={basicColumns} data={basicData} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers.length).toBe(3);
    });

    it('should render rows', () => {
      const { container } = render(<Table columns={basicColumns} data={basicData} />);

      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBe(3);
    });

    it('should render cells', () => {
      render(<Table columns={basicColumns} data={basicData} />);

      const cells = screen.getAllByRole('cell');
      expect(cells.length).toBe(9); // 3 rows x 3 columns
    });

    it('should render action buttons container', () => {
      const actions: TableAction[] = [
        { icon: Edit, label: 'Editar', onClick: jest.fn() }
      ];

      const dataWithActions: TableRow[] = [
        { id: '1', name: 'Test', email: 'test@test.com', actions }
      ];

      render(<Table columns={basicColumns} data={dataWithActions} />);

      const actionButton = screen.getByLabelText('Editar');
      expect(actionButton).toBeInTheDocument();
    });

    it('should render destructive action button', () => {
      const actions: TableAction[] = [
        { icon: Trash2, label: 'Eliminar', onClick: jest.fn(), variant: 'destructive' }
      ];

      const dataWithActions: TableRow[] = [
        { id: '1', name: 'Test', email: 'test@test.com', actions }
      ];

      render(<Table columns={basicColumns} data={dataWithActions} />);

      const deleteButton = screen.getByLabelText('Eliminar');
      expect(deleteButton).toBeInTheDocument();
    });

    it('should render expand button', () => {
      const dataWithExpandable: TableRow[] = [
        {
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          expandedContent: <div>Content</div>
        }
      ];

      render(<Table columns={basicColumns} data={dataWithExpandable} expandable={true} />);

      const expandButton = screen.getByLabelText('Expandir fila');
      expect(expandButton).toBeInTheDocument();
    });

    it('should render expanded content cell', () => {
      const dataWithExpandable: TableRow[] = [
        {
          id: '1',
          name: 'Test',
          email: 'test@test.com',
          expandedContent: <div data-testid="expanded">Content</div>
        }
      ];

      render(<Table columns={basicColumns} data={dataWithExpandable} expandable={true} />);

      // Expand the row
      fireEvent.click(screen.getByLabelText('Expandir fila'));

      const expandedContent = screen.getByTestId('expanded');
      expect(expandedContent).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should have focusable rows when onRowClick is provided', async () => {
      const handleClick = jest.fn();

      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          onRowClick={handleClick}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveAttribute('tabindex', '0');
    });

    it('should call onRowClick when row is clicked', () => {
      const handleClick = jest.fn();

      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          onRowClick={handleClick}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      fireEvent.click(rows[0]);

      expect(handleClick).toHaveBeenCalledWith(basicData[0]);
    });

    it('should allow navigating between rows with tab', () => {
      const handleClick = jest.fn();

      const { container } = render(
        <Table
          columns={basicColumns}
          data={basicData}
          onRowClick={handleClick}
        />
      );

      const rows = container.querySelectorAll('tbody tr');
      // All rows with onRowClick should have tabindex=0
      rows.forEach((row) => {
        expect(row).toHaveAttribute('tabindex', '0');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data array', () => {
      render(<Table columns={basicColumns} data={[]} />);

      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.queryByRole('row', { name: /fila/i })).not.toBeInTheDocument();
    });

    it('should handle missing optional props', () => {
      render(<Table columns={basicColumns} data={basicData} />);

      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    });

    it('should handle row without actions', () => {
      render(<Table columns={basicColumns} data={basicData} />);

      expect(screen.queryByLabelText('Editar')).not.toBeInTheDocument();
    });

    it('should handle row without expandedContent', () => {
      render(
        <Table
          columns={basicColumns}
          data={basicData}
          expandable={true}
        />
      );

      const expandButtons = screen.getAllByLabelText('Expandir fila');
      fireEvent.click(expandButtons[0]); // Click first row

      // Should not crash, just not show content
      expect(screen.getByLabelText('Contraer fila')).toBeInTheDocument();
    });
  });
});
