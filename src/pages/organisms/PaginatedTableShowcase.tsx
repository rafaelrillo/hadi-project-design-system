// Path: src/pages/organisms/PaginatedTableShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Paginated Tables
import React, { useState, useMemo } from 'react';
import { PaginatedTable } from '../../components/organisms/PaginatedTable';
import { TableColumn, TableRow } from '../../components/organisms/Table';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function PaginatedTableContent() {
  const { lightAngle } = useLightEngine();
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [currentPage5, setCurrentPage5] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

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
      'juan.perez@example.com',
      'maria.garcia@example.com',
      'carlos.lopez@example.com',
      'ana.martinez@example.com',
      'pedro.rodriguez@example.com',
      'laura.fernandez@example.com',
      'diego.gonzalez@example.com',
      'sofia.sanchez@example.com',
      'miguel.torres@example.com',
      'carmen.diaz@example.com',
      'jorge.ramirez@example.com',
      'isabel.castro@example.com',
      'roberto.flores@example.com',
      'patricia.morales@example.com',
      'fernando.ruiz@example.com',
      'lucia.jimenez@example.com',
      'andres.alvarez@example.com',
      'valentina.romero@example.com',
      'javier.nunez@example.com',
      'daniela.medina@example.com',
      'ricardo.herrera@example.com',
      'gabriela.vargas@example.com',
      'martin.silva@example.com',
      'camila.ortiz@example.com',
      'pablo.reyes@example.com'
    ][i],
    role: ['Admin', 'Usuario', 'Editor', 'Viewer'][i % 4],
    status: i % 3 === 0 ? 'Activo' : i % 3 === 1 ? 'Inactivo' : 'Pendiente',
    expandedContent: (
      <div style={{
        padding: '16px',
        background: MARBLE.base,
        borderRadius: '12px',
        boxShadow: getNeuInsetShadow(3, 8),
        fontSize: '14px',
        fontFamily: 'var(--sentinel-font-mono)',
      }}>
        <p><strong>Información adicional del usuario #{1001 + i}</strong></p>
        <p>Fecha de registro: 2024-{String((i % 12) + 1).padStart(2, '0')}-15</p>
        <p>Último acceso: 2024-12-{String((i % 28) + 1).padStart(2, '0')}</p>
        <p>Departamento: {['Ventas', 'Marketing', 'IT', 'Recursos Humanos'][i % 4]}</p>
      </div>
    )
  }));

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Paginated Table_</h1>
        <p style={descStyles}>
          // Tabla con paginación integrada que combina Table + Pagination
        </p>
      </header>

      <ShowcaseSection
        title="Tabla Paginada Básica"
        description="10 items por página con info de resultados en el footer"
      >
        <div style={tableContainerStyles}>
          <PaginatedTable
            columns={columns}
            data={allData}
            currentPage={currentPage1}
            itemsPerPage={10}
            onPageChange={setCurrentPage1}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Selección de Filas"
        description="Permite seleccionar múltiples filas con checkboxes"
      >
        <div style={tableContainerStyles}>
          <div style={{
            marginBottom: '16px',
            fontSize: '14px',
            color: '#636E72',
            fontFamily: 'var(--sentinel-font-mono)',
          }}>
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
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Filas Expandibles"
        description="Click en el ícono > para expandir y ver contenido adicional"
      >
        <div style={tableContainerStyles}>
          <PaginatedTable
            columns={columns}
            data={allData}
            currentPage={currentPage3}
            itemsPerPage={8}
            onPageChange={setCurrentPage3}
            expandable={true}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Altura de Fila Compacta"
        description="rowHeight='compact' para reducir el espacio (32px en lugar de 42px)"
      >
        <div style={tableContainerStyles}>
          <PaginatedTable
            columns={columns}
            data={allData}
            currentPage={currentPage4}
            itemsPerPage={15}
            onPageChange={setCurrentPage4}
            rowHeight="compact"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Configuración Personalizada"
        description="5 items por página sin mostrar info de resultados"
      >
        <div style={tableContainerStyles}>
          <PaginatedTable
            columns={columns}
            data={allData}
            currentPage={currentPage5}
            itemsPerPage={5}
            onPageChange={setCurrentPage5}
            showInfo={false}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Ejemplo Completo e Interactivo"
        description="Tabla paginada con selección, expansión y altura estándar"
      >
        <div style={{
          padding: '24px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          transition: 'box-shadow 50ms linear',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '8px',
            fontFamily: 'var(--sentinel-font-display)',
            textTransform: 'uppercase',
            color: 'var(--sentinel-text-primary)',
          }}>
            Gestión de Usuarios
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#636E72',
            marginBottom: '20px',
            fontFamily: 'var(--sentinel-font-mono)',
          }}>
            Listado completo de usuarios del sistema con paginación
          </p>

          {selectedRows.length > 0 && (
            <div style={{
              padding: '12px 16px',
              background: MARBLE.base,
              borderLeft: '4px solid var(--sentinel-accent-primary)',
              borderRadius: '15px',
              boxShadow: getNeuPanelShadow(4, 12),
              marginBottom: '16px',
              fontSize: '14px',
              fontFamily: 'var(--sentinel-font-mono)',
            }}>
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
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Container:</strong> flex column, gap 20px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Components:</strong> Combina Table + Pagination</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Data slicing:</strong> Automático basado en currentPage e itemsPerPage</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Footer:</strong> flex space-between, align-items center</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Info text:</strong> "Mostrando X-Y de Z resultados" (14px Regular)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Pagination:</strong> Alineada a la derecha</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>showInfo:</strong> true por default, puede ocultarse</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Footer visibility:</strong> Solo se muestra si totalPages {'>'} 1</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Props heredadas de Table:</strong> selectable, selectedRows, onRowSelect, expandable, onRowClick, rowHeight</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Props de paginación:</strong> currentPage, itemsPerPage, onPageChange</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function PaginatedTableShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <PaginatedTableContent />
    </LightEngineProvider>
  );
}
