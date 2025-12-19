// Path: src/pages/organisms/SearchbarShowcase.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { Searchbar } from '../../components/organisms/Searchbar';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function SearchbarShowcase() {
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [filter3, setFilter3] = useState('');
  const [textFilter, setTextFilter] = useState('');

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

  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'electronics', label: 'Electrónica' },
    { value: 'clothing', label: 'Ropa' },
    { value: 'food', label: 'Alimentos' },
    { value: 'books', label: 'Libros' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'pending', label: 'Pendiente' }
  ];

  const regionOptions = [
    { value: 'all', label: 'Todas las regiones' },
    { value: 'north', label: 'Norte' },
    { value: 'south', label: 'Sur' },
    { value: 'east', label: 'Este' },
    { value: 'west', label: 'Oeste' }
  ];

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Searchbar_</h1>
        <p style={descStyles}>
          // Barra de búsqueda con ProductKey, filtros múltiples y botón de búsqueda
        </p>
      </header>

      {/* Basic Searchbar */}
      <ShowcaseSection
        title="Searchbar Básico"
        description="Solo ProductKey y botón de búsqueda, sin filtros"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <Searchbar
              productName="Robot Resources"
              version="v1.0.1"
              onSearch={() => alert('Búsqueda ejecutada')}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Text Filter */}
      <ShowcaseSection
        title="Con Filtro de Texto"
        description="Searchbar con un filtro de texto (width 297px por defecto)"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <Searchbar
              productName="Robot Resources"
              version="v1.0.1"
              filters={[
                {
                  type: 'text',
                  placeholder: 'Buscar por nombre...',
                  value: textFilter,
                  onChange: setTextFilter
                }
              ]}
              onSearch={() => console.log('Buscar:', textFilter)}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Dropdown Filter */}
      <ShowcaseSection
        title="Con Filtro Dropdown"
        description="Searchbar con un filtro dropdown (width 192px por defecto)"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <Searchbar
              productName="Robot Resources"
              version="v1.0.1"
              filters={[
                {
                  type: 'dropdown',
                  placeholder: 'Categoría',
                  options: categoryOptions,
                  value: filter1,
                  onChange: setFilter1
                }
              ]}
              onSearch={() => console.log('Buscar categoría:', filter1)}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Multiple Filters */}
      <ShowcaseSection
        title="Múltiples Filtros"
        description="Searchbar con combinación de filtros dropdown y texto"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <Searchbar
              productName="Robot Resources"
              version="v1.0.1"
              filters={[
                {
                  type: 'dropdown',
                  placeholder: 'Categoría',
                  options: categoryOptions,
                  value: filter1,
                  onChange: setFilter1,
                  width: '192px'
                },
                {
                  type: 'dropdown',
                  placeholder: 'Estado',
                  options: statusOptions,
                  value: filter2,
                  onChange: setFilter2,
                  width: '192px'
                },
                {
                  type: 'text',
                  placeholder: 'Buscar productos...',
                  value: textFilter,
                  onChange: setTextFilter,
                  width: '297px'
                }
              ]}
              onSearch={() => {
                console.log('Filtros:', { filter1, filter2, textFilter });
                alert(`Buscando: Categoría=${filter1}, Estado=${filter2}, Texto="${textFilter}"`);
              }}
              searchButtonText="Buscar"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Width Filters */}
      <ShowcaseSection
        title="Filtros con Anchos Personalizados"
        description="Cada filtro puede tener un width personalizado"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <Searchbar
              productName="Sistema de Reportes"
              version="v2.3.0"
              filters={[
                {
                  type: 'dropdown',
                  placeholder: 'Región',
                  options: regionOptions,
                  value: filter3,
                  onChange: setFilter3,
                  width: '150px'
                },
                {
                  type: 'text',
                  placeholder: 'ID del reporte',
                  width: '200px'
                },
                {
                  type: 'text',
                  placeholder: 'Descripción o palabras clave...',
                  width: '400px'
                }
              ]}
              onSearch={() => console.log('Buscar reportes')}
              searchButtonText="Generar Reporte"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Disabled State */}
      <ShowcaseSection
        title="Estado Disabled"
        description="Searchbar deshabilitado con todos los filtros desactivados"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <Searchbar
              productName="Robot Resources"
              version="v1.0.1"
              filters={[
                {
                  type: 'dropdown',
                  placeholder: 'Categoría',
                  options: categoryOptions
                },
                {
                  type: 'text',
                  placeholder: 'Buscar...'
                }
              ]}
              onSearch={() => {}}
              disabled={true}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Complete Example */}
      <ShowcaseSection
        title="Ejemplo Completo de Interfaz"
        description="Searchbar integrado en una aplicación real"
      >
        <ComponentPreview>
          <div style={{ width: '100%', padding: '24px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <Searchbar
              productName="Robot Resources"
              version="Design System v1.0.1"
              filters={[
                {
                  type: 'dropdown',
                  placeholder: 'Categoría',
                  options: categoryOptions,
                  value: filter1,
                  onChange: setFilter1
                },
                {
                  type: 'dropdown',
                  placeholder: 'Estado',
                  options: statusOptions,
                  value: filter2,
                  onChange: setFilter2
                },
                {
                  type: 'text',
                  placeholder: 'Buscar productos, IDs, descripciones...',
                  value: textFilter,
                  onChange: setTextFilter,
                  width: '350px'
                }
              ]}
              onSearch={() => {
                alert(`Búsqueda ejecutada:\nCategoría: ${categoryOptions.find(o => o.value === filter1)?.label || 'Ninguna'}\nEstado: ${statusOptions.find(o => o.value === filter2)?.label || 'Ninguno'}\nTexto: ${textFilter || 'Vacío'}`);
              }}
            />

            <div style={{ marginTop: '24px', padding: '20px', backgroundColor: 'var(--background-tertiary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--foreground)' }}>
                Resultados de búsqueda
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                {filter1 || filter2 || textFilter ? (
                  <>
                    Mostrando resultados para:
                    {filter1 && <span style={{ display: 'block' }}>• Categoría: {categoryOptions.find(o => o.value === filter1)?.label}</span>}
                    {filter2 && <span style={{ display: 'block' }}>• Estado: {statusOptions.find(o => o.value === filter2)?.label}</span>}
                    {textFilter && <span style={{ display: 'block' }}>• Búsqueda: "{textFilter}"</span>}
                  </>
                ) : (
                  'Configure los filtros y presione Buscar'
                )}
              </p>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Altura total:</strong> 40px (fija)</p>
          <p>✓ <strong>Layout:</strong> flex, gap 20px, justify-content space-between</p>
          <p>✓ <strong>Product name:</strong> 24px Bold (700), color #DA291C</p>
          <p>✓ <strong>Version:</strong> 12px Regular (400), color #6A6A6A</p>
          <p>✓ <strong>Filters container:</strong> flex, gap 20px, flex 1</p>
          <p>✓ <strong>Dropdown filter width:</strong> 192px (default), customizable</p>
          <p>✓ <strong>Text filter width:</strong> 297px (default), customizable</p>
          <p>✓ <strong>Search button:</strong> width 192px, border-radius 10px, variant with-icon</p>
          <p>✓ <strong>Submit:</strong> Se ejecuta onSearch al presionar Enter o click en botón</p>
          <p>✓ <strong>Disabled:</strong> Deshabilita todos los filtros y el botón</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
