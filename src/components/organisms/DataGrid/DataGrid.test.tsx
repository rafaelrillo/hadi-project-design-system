// Path: src/components/organisms/DataGrid/DataGrid.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { DataGrid } from './DataGrid';
import type { DataGridColumn } from './types';

/* ═══════════════════════════════════════════════════════════════════════════════
   DATAGRID TESTS
   ═══════════════════════════════════════════════════════════════════════════════ */

interface TestRow {
  id: string;
  name: string;
  value: number;
  status: string;
}

const testData: TestRow[] = [
  { id: '1', name: 'Item A', value: 100, status: 'active' },
  { id: '2', name: 'Item B', value: 200, status: 'inactive' },
  { id: '3', name: 'Item C', value: 150, status: 'active' },
  { id: '4', name: 'Item D', value: 300, status: 'pending' },
  { id: '5', name: 'Item E', value: 250, status: 'active' },
];

const testColumns: DataGridColumn<TestRow>[] = [
  { id: 'name', header: 'Name', accessor: 'name', sortable: true },
  { id: 'value', header: 'Value', accessor: 'value', sortable: true, align: 'right' },
  { id: 'status', header: 'Status', accessor: 'status', filterable: true },
];

describe('DataGrid', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<DataGrid data={testData} columns={testColumns} />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('displays all column headers', () => {
      render(<DataGrid data={testData} columns={testColumns} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('displays all data rows', () => {
      render(<DataGrid data={testData} columns={testColumns} />);

      expect(screen.getByText('Item A')).toBeInTheDocument();
      expect(screen.getByText('Item B')).toBeInTheDocument();
      expect(screen.getByText('Item C')).toBeInTheDocument();
    });

    it('displays cell values correctly', () => {
      render(<DataGrid data={testData} columns={testColumns} />);

      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('active')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('displays empty state when no data', () => {
      render(<DataGrid data={[]} columns={testColumns} />);

      expect(screen.getByText('No hay datos')).toBeInTheDocument();
    });

    it('displays custom empty state', () => {
      render(
        <DataGrid
          data={[]}
          columns={testColumns}
          emptyState={<div>Custom empty message</div>}
        />
      );

      expect(screen.getByText('Custom empty message')).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('renders checkboxes when selectable', () => {
      render(<DataGrid data={testData} columns={testColumns} selectable />);

      // Header checkbox + row checkboxes
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBe(testData.length + 1);
    });

    it('calls onSelectionChange when row is selected', () => {
      const onSelectionChange = jest.fn();
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // First row checkbox

      expect(onSelectionChange).toHaveBeenCalledWith(['1']);
    });

    it('selects all rows when header checkbox is clicked', () => {
      const onSelectionChange = jest.fn();
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          selectable
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]); // Header checkbox

      expect(onSelectionChange).toHaveBeenCalledWith(['1', '2', '3', '4', '5']);
    });
  });

  describe('Sorting', () => {
    it('sorts ascending on first click', () => {
      const onSortChange = jest.fn();
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          sortable
          onSortChange={onSortChange}
        />
      );

      fireEvent.click(screen.getByText('Name'));

      expect(onSortChange).toHaveBeenCalledWith({
        column: 'name',
        direction: 'asc',
      });
    });

    it('sorts descending on second click', () => {
      const onSortChange = jest.fn();
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          sortable
          sort={{ column: 'name', direction: 'asc' }}
          onSortChange={onSortChange}
        />
      );

      fireEvent.click(screen.getByText('Name'));

      expect(onSortChange).toHaveBeenCalledWith({
        column: 'name',
        direction: 'desc',
      });
    });

    it('clears sort on third click', () => {
      const onSortChange = jest.fn();
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          sortable
          sort={{ column: 'name', direction: 'desc' }}
          onSortChange={onSortChange}
        />
      );

      fireEvent.click(screen.getByText('Name'));

      expect(onSortChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Pagination', () => {
    it('shows pagination controls when pagination is enabled', () => {
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          pagination
          pageSize={2}
        />
      );

      expect(screen.getByLabelText('Primera página')).toBeInTheDocument();
      expect(screen.getByLabelText('Última página')).toBeInTheDocument();
    });

    it('displays correct page info', () => {
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          pagination
          pageSize={2}
        />
      );

      expect(screen.getByText(/1-2 de 5 registros/)).toBeInTheDocument();
    });

    it('navigates to next page', () => {
      const onPageChange = jest.fn();
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          pagination
          pageSize={2}
          onPageChange={onPageChange}
        />
      );

      fireEvent.click(screen.getByLabelText('Página siguiente'));

      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('shows only pageSize rows', () => {
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          pagination
          pageSize={2}
        />
      );

      // Should only show 2 rows
      expect(screen.getByText('Item A')).toBeInTheDocument();
      expect(screen.getByText('Item B')).toBeInTheDocument();
      expect(screen.queryByText('Item C')).not.toBeInTheDocument();
    });
  });

  describe('Row Expansion', () => {
    it('renders expand buttons when expandable', () => {
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          expandable
          renderExpandedRow={(row) => <div>Details for {row.name}</div>}
        />
      );

      const expandButtons = screen.getAllByLabelText('Expandir fila');
      expect(expandButtons.length).toBe(testData.length);
    });

    it('expands row on button click', () => {
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          expandable
          renderExpandedRow={(row) => <div>Details for {row.name}</div>}
        />
      );

      const expandButtons = screen.getAllByLabelText('Expandir fila');
      fireEvent.click(expandButtons[0]);

      expect(screen.getByText('Details for Item A')).toBeInTheDocument();
    });
  });

  describe('Row Click', () => {
    it('calls onRowClick when row is clicked', () => {
      const onRowClick = jest.fn();
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          onRowClick={onRowClick}
        />
      );

      fireEvent.click(screen.getByText('Item A'));

      expect(onRowClick).toHaveBeenCalledWith(testData[0], 0);
    });
  });

  describe('Loading State', () => {
    it('shows loading skeleton when loading and no data', () => {
      render(<DataGrid data={[]} columns={testColumns} loading />);

      // Should show skeleton rows
      expect(screen.queryByText('No hay datos')).not.toBeInTheDocument();
    });

    it('shows loading overlay when loading with data', () => {
      render(<DataGrid data={testData} columns={testColumns} loading />);

      expect(screen.getByText('Cargando...')).toBeInTheDocument();
    });
  });

  describe('Export', () => {
    it('shows export button when exportable', () => {
      render(<DataGrid data={testData} columns={testColumns} exportable />);

      expect(screen.getByLabelText('Exportar a CSV')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('makes rows focusable when onRowClick is provided', () => {
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          onRowClick={() => {}}
        />
      );

      const firstRow = screen.getByText('Item A').closest('tr');
      expect(firstRow).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Custom Cell Rendering', () => {
    it('uses custom cell renderer when provided', () => {
      const customColumns: DataGridColumn<TestRow>[] = [
        ...testColumns.slice(0, 2),
        {
          id: 'status',
          header: 'Status',
          accessor: 'status',
          cell: (value) => <span data-testid="custom-cell">{String(value).toUpperCase()}</span>,
        },
      ];

      render(<DataGrid data={testData} columns={customColumns} />);

      expect(screen.getByText('ACTIVE')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="grid" on table container', () => {
      render(<DataGrid data={testData} columns={testColumns} />);

      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('sets aria-busy when loading', () => {
      render(<DataGrid data={testData} columns={testColumns} loading />);

      expect(screen.getByRole('grid')).toHaveAttribute('aria-busy', 'true');
    });

    it('sets aria-sort on sorted column header', () => {
      render(
        <DataGrid
          data={testData}
          columns={testColumns}
          sortable
          sort={{ column: 'name', direction: 'asc' }}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    });
  });
});
