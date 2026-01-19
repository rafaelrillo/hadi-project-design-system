// Path: src/pages/organisms/SearchbarShowcase.tsx
// FING Design System - Glass-Neumorphism Searchbar
import React, { useState, useMemo } from 'react';
import { Searchbar } from '../../components/organisms/Searchbar';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function SearchbarContent() {
  const { lightAngle } = useLightEngine();
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [filter3, setFilter3] = useState('');
  const [textFilter, setTextFilter] = useState('');

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
    color: 'var(--fing-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--fing-text-secondary)',
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const searchContainerStyles: React.CSSProperties = {
    padding: '20px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
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
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Searchbar_</h1>
        <p style={descStyles}>
          // Barra de búsqueda con ProductKey, filtros múltiples y botón de búsqueda
        </p>
      </header>

      <ShowcaseSection
        title="Searchbar Básico"
        description="Solo ProductKey y botón de búsqueda, sin filtros"
      >
        <div style={searchContainerStyles}>
          <Searchbar
            productName="FING"
            version="v1.0.1"
            onSearch={() => alert('Búsqueda ejecutada')}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Filtro de Texto"
        description="Searchbar con un filtro de texto (width 297px por defecto)"
      >
        <div style={searchContainerStyles}>
          <Searchbar
            productName="FING"
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Filtro Dropdown"
        description="Searchbar con un filtro dropdown (width 192px por defecto)"
      >
        <div style={searchContainerStyles}>
          <Searchbar
            productName="FING"
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Múltiples Filtros"
        description="Searchbar con combinación de filtros dropdown y texto"
      >
        <div style={searchContainerStyles}>
          <Searchbar
            productName="FING"
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Filtros con Anchos Personalizados"
        description="Cada filtro puede tener un width personalizado"
      >
        <div style={searchContainerStyles}>
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Disabled"
        description="Searchbar deshabilitado con todos los filtros desactivados"
      >
        <div style={searchContainerStyles}>
          <Searchbar
            productName="FING"
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Ejemplo Completo de Interfaz"
        description="Searchbar integrado en una aplicación real"
      >
        <div style={{
          padding: '24px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          transition: 'box-shadow 50ms linear',
        }}>
          <Searchbar
            productName="FING"
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

          <div style={{
            marginTop: '24px',
            padding: '20px',
            background: MARBLE.base,
            borderRadius: '15px',
            boxShadow: getNeuPanelShadow(4, 12),
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '12px',
              fontFamily: 'var(--fing-font-display)',
              textTransform: 'uppercase',
              color: 'var(--fing-text-primary)',
            }}>
              Resultados de búsqueda
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#636E72',
              fontFamily: 'var(--fing-font-mono)',
            }}>
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
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          fontSize: '12px',
          fontFamily: 'var(--fing-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Altura total:</strong> 40px (fija)</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Layout:</strong> flex, gap 20px, justify-content space-between</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Product name:</strong> 24px Bold (700), color accent</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Version:</strong> 12px Regular (400), color secundario</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Filters container:</strong> flex, gap 20px, flex 1</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Dropdown filter width:</strong> 192px (default), customizable</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Text filter width:</strong> 297px (default), customizable</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Search button:</strong> width 192px, border-radius 15px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Submit:</strong> Se ejecuta onSearch al presionar Enter o click en botón</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Disabled:</strong> Deshabilita todos los filtros y el botón</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function SearchbarShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <SearchbarContent />
    </LightEngineProvider>
  );
}
