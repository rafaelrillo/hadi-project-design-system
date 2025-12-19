// Path: src/pages/organisms/PaginatedTableShowcase.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { PaginatedTable } from '../../components/organisms/PaginatedTable';
import { TableColumn, TableRow } from '../../components/organisms/Table';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function PaginatedTableShowcase() {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  };

  // Mock data - 25 users
  const columns: TableColumn[] = [
    { key: 'id', header: 'ID', width: '80px' },
    { key: 'name', header: 'Nombre', width: '200px' },
    { key: 'email', header: 'Email', width: 'auto' },
    { key: 'role', header: 'Rol', width: '150px' },
    { key: 'status', header: 'Estado', width: '120px' }
  ];

  const allData: TableRow[] = Array.from({ length: 25 }, (_, i) => ({
    id: `${1001 + i}`,
    name: [
      'Juan Pérez',
      'María García',
      'Carlos López',
      'Ana Martínez',
      'Pedro Rodríguez',
      'Laura Fernández',
      'Diego González',
      'Sofía Sánchez',
      'Miguel Torres',
      'Carmen Díaz',
      'Jorge Ramírez',
      'Isabel Castro',
      'Roberto Flores',
      'Patricia Morales',
      'Fernando Ruiz',
      'Lucía Jiménez',
      'Andrés Álvarez',
      'Valentina Romero',
      'Javier Núñez',
      'Daniela Medina',
      'Ricardo Herrera',
      'Gabriela Vargas',
      'Martín Silva',
      'Camila Ortiz',
      'Pablo Reyes'
    ][i],
    email: [
      'juan.perez@claro.com',
      'maria.garcia@claro.com',
      'carlos.lopez@claro.com',
      'ana.martinez@claro.com',
      'pedro.rodriguez@claro.com',
      'laura.fernandez@claro.com',
      'diego.gonzalez@claro.com',
      'sofia.sanchez@claro.com',
      'miguel.torres@claro.com',
      'carmen.diaz@claro.com',
      'jorge.ramirez@claro.com',
      'isabel.castro@claro.com',
      'roberto.flores@claro.com',
      'patricia.morales@claro.com',
      'fernando.ruiz@claro.com',
      'lucia.jimenez@claro.com',
      'andres.alvarez@claro.com',
      'valentina.romero@claro.com',
      'javier.nunez@claro.com',
      'daniela.medina@claro.com',
      'ricardo.herrera@claro.com',
      'gabriela.vargas@claro.com',
      'martin.silva@claro.com',
      'camila.ortiz@claro.com',
      'pablo.reyes@claro.com'
    ][i],
    role: ['Admin', 'Usuario', 'Editor', 'Viewer'][i % 4],
    status: i % 3 === 0 ? 'Activo' : i % 3 === 1 ? 'Inactivo' : 'Pendiente',
    expandedContent: (
      <div style={{ padding: '16px', backgroundColor: 'var(--background-tertiary)', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
        <p><strong>Información adicional del usuario #{1001 + i}</strong></p>
        <p>Fecha de registro: 2024-{String((i % 12) + 1).padStart(2, '0')}-15</p>
        <p>Último acceso: 2024-12-{String((i % 28) + 1).padStart(2, '0')}</p>
        <p>Departamento: {['Ventas', 'Marketing', 'IT', 'Recursos Humanos'][i % 4]}</p>
      </div>
    )
  }));

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Paginated Table_</h1>
        <p style={descStyles}>
          // Tabla con paginación integrada que combina Table + Pagination
        </p>
      </header>

      {/* Basic Paginated Table */}
      <ShowcaseSection
        title="Tabla Paginada Básica"
        description="10 items por página con info de resultados en el footer"
      >
        <ComponentPreview>
          <PaginatedTable
            columns={columns}
            data={allData}
            currentPage={currentPage1}
            itemsPerPage={10}
            onPageChange={setCurrentPage1}
          />
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Row Selection */}
      <ShowcaseSection
        title="Con Selección de Filas"
        description="Permite seleccionar múltiples filas con checkboxes"
      >
        <ComponentPreview>
          <div style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
            Filas seleccionadas: {selectedRows.length > 0 ? selectedRows.join(', ') : 'Ninguna'}
          </div>
          <PaginatedTable
            columns={columns}
            data={allData}
            currentPage={currentPage2}
            itemsPerPage={10}
            onPageChange={setCurrentPage2}
            selectable={true}
            selectedRows={selectedRows}
            onRowSelect={setSelectedRows}
          />
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Expandable Rows */}
      <ShowcaseSection
        title="Con Filas Expandibles"
        description="Click en el ícono > para expandir y ver contenido adicional"
      >
        <ComponentPreview>
          <PaginatedTable
            columns={columns}
            data={allData}
            currentPage={currentPage3}
            itemsPerPage={8}
            onPageChange={setCurrentPage3}
            expandable={true}
          />
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact Row Height */}
      <ShowcaseSection
        title="Altura de Fila Compacta"
        description="rowHeight='compact' para reducir el espacio (32px en lugar de 42px)"
      >
        <ComponentPreview>
          <PaginatedTable
            columns={columns}
            data={allData}
            currentPage={currentPage4}
            itemsPerPage={15}
            onPageChange={setCurrentPage4}
            rowHeight="compact"
          />
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Items Per Page */}
      <ShowcaseSection
        title="Configuración Personalizada"
        description="5 items por página sin mostrar info de resultados"
      >
        <ComponentPreview>
          <PaginatedTable
            columns={columns}
            data={allData}
            currentPage={currentPage5}
            itemsPerPage={5}
            onPageChange={setCurrentPage5}
            showInfo={false}
          />
        </ComponentPreview>
      </ShowcaseSection>

      {/* Complete Interactive Example */}
      <ShowcaseSection
        title="Ejemplo Completo e Interactivo"
        description="Tabla paginada con selección, expansión y altura estándar"
      >
        <ComponentPreview>
          <div style={{ width: '100%', padding: '24px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--foreground)' }}>
              Gestión de Usuarios
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--foreground-muted)', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
              Listado completo de usuarios del sistema con paginación
            </p>

            {selectedRows.length > 0 && (
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--background-tertiary)', border: '1px solid var(--primary)', borderRadius: 'var(--radius)', marginBottom: '16px', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
                <strong>{selectedRows.length}</strong> usuario(s) seleccionado(s): {selectedRows.join(', ')}
              </div>
            )}

            <PaginatedTable
              columns={columns}
              data={allData}
              currentPage={currentPage2}
              itemsPerPage={10}
              onPageChange={setCurrentPage2}
              selectable={true}
              selectedRows={selectedRows}
              onRowSelect={setSelectedRows}
              expandable={true}
              onRowClick={(row) => console.log('Row clicked:', row)}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Container:</strong> flex column, gap 20px</p>
          <p>✓ <strong>Components:</strong> Combina Table + Pagination</p>
          <p>✓ <strong>Data slicing:</strong> Automático basado en currentPage e itemsPerPage</p>
          <p>✓ <strong>Footer:</strong> flex space-between, align-items center</p>
          <p>✓ <strong>Info text:</strong> "Mostrando X-Y de Z resultados" (14px Regular #6A6A6A)</p>
          <p>✓ <strong>Pagination:</strong> Alineada a la derecha</p>
          <p>✓ <strong>showInfo:</strong> true por default, puede ocultarse</p>
          <p>✓ <strong>Footer visibility:</strong> Solo se muestra si totalPages {'>'} 1</p>
          <p>✓ <strong>Props heredadas de Table:</strong> selectable, selectedRows, onRowSelect, expandable, onRowClick, rowHeight</p>
          <p>✓ <strong>Props de paginación:</strong> currentPage, itemsPerPage, onPageChange</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
