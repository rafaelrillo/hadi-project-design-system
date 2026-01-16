// Path: src/pages/molecules/PaginationShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Pagination
import React, { useState } from 'react';
import { Pagination } from '../../components/molecules/Pagination';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider } from '@/contexts/LightEngineContext';

export function PaginationShowcase() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);
  const [pageNeu, setPageNeu] = useState(5);

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: 'var(--neu-base)',
    borderRadius: '15px',
    boxShadow: '-20px -20px 60px var(--neu-shadow-light), 20px 20px 60px var(--neu-shadow-dark)',
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

  const infoLabelStyles: React.CSSProperties = {
    marginBottom: '12px',
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
  };

  const specTextStyles: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--sentinel-text-secondary)',
    lineHeight: '1.8',
    fontFamily: 'var(--sentinel-font-mono)',
  };

  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <div style={{ background: 'var(--neu-base)', minHeight: '100%', padding: '24px' }}>
        {/* Page Header */}
        <header style={pageHeaderStyles}>
          <h1 style={titleStyles}>&gt; Pagination_</h1>
          <p style={descStyles}>
            // Navegación por flechas, números de página y elipsis para rangos grandes
          </p>
        </header>

        {/* Basic Pagination */}
        <ShowcaseSection
          title="Paginación Básica"
          description="Navegación entre páginas con botones anterior/siguiente"
        >
          <div>
            <div style={infoLabelStyles}>
              Página actual: <strong style={{ color: 'var(--sentinel-accent-primary)' }}>{page1}</strong> de 10
            </div>
            <Pagination
              currentPage={page1}
              totalPages={10}
              onPageChange={setPage1}
              paginationStyle="neuInset"
            />
          </div>
        </ShowcaseSection>

        {/* Navigation in Middle */}
        <ShowcaseSection
          title="Navegación en Medio"
          description="Cuando estás en una página del medio, se muestran elipsis en ambos lados"
        >
          <div>
            <div style={infoLabelStyles}>
              Página actual: <strong style={{ color: 'var(--sentinel-accent-primary)' }}>{page2}</strong> de 20
            </div>
            <Pagination
              currentPage={page2}
              totalPages={20}
              onPageChange={setPage2}
              paginationStyle="neuInset"
            />
          </div>
        </ShowcaseSection>

        {/* Many Pages */}
        <ShowcaseSection
          title="Con Muchas Páginas"
          description="Cuando hay muchas páginas, se muestra con elipsis (...)"
        >
          <div>
            <div style={infoLabelStyles}>
              Página actual: <strong style={{ color: 'var(--sentinel-accent-primary)' }}>{page3}</strong> de 100
            </div>
            <Pagination
              currentPage={page3}
              totalPages={100}
              onPageChange={setPage3}
              maxVisiblePages={5}
              paginationStyle="neuInset"
            />
          </div>
        </ShowcaseSection>

        {/* Disabled State */}
        <ShowcaseSection
          title="Estado Disabled"
          description="Paginación deshabilitada con opacidad reducida"
        >
          <div>
            <Pagination
              currentPage={5}
              totalPages={10}
              onPageChange={() => {}}
              disabled={true}
              paginationStyle="neuInset"
            />
          </div>
        </ShowcaseSection>

        {/* Different Sizes */}
        <ShowcaseSection
          title="Diferentes Tamaños"
          description="Ejemplos con diferentes cantidades de páginas"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>3 páginas totales:</div>
              <Pagination
                currentPage={2}
                totalPages={3}
                onPageChange={() => {}}
                paginationStyle="neuInset"
              />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>5 páginas totales:</div>
              <Pagination
                currentPage={3}
                totalPages={5}
                onPageChange={() => {}}
                paginationStyle="neuInset"
              />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--sentinel-text-tertiary)', fontFamily: 'var(--sentinel-font-mono)' }}>50 páginas totales:</div>
              <Pagination
                currentPage={25}
                totalPages={50}
                onPageChange={() => {}}
                paginationStyle="neuInset"
              />
            </div>
          </div>
        </ShowcaseSection>

        {/* Interactive Example */}
        <ShowcaseSection
          title="Ejemplo Interactivo"
          description="Prueba la navegación completa con estilo neuInset"
        >
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)', textTransform: 'uppercase' }}>
                Resultados de Búsqueda
              </div>
              <div style={{ fontSize: '14px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-mono)' }}>
                Mostrando página <strong style={{ color: 'var(--sentinel-accent-primary)' }}>{pageNeu}</strong> de 15 • 150 resultados totales
              </div>
            </div>

            <div style={{
              marginBottom: '16px',
              padding: '16px',
              background: 'var(--neu-base)',
              borderRadius: '12px',
              boxShadow: 'inset 3px 3px 8px var(--neu-shadow-dark), inset -3px -3px 8px var(--neu-shadow-light)',
            }}>
              <div style={{ fontSize: '14px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-mono)' }}>
                [Contenido de la página {pageNeu}]
              </div>
            </div>

            <Pagination
              currentPage={pageNeu}
              totalPages={15}
              onPageChange={setPageNeu}
              maxVisiblePages={7}
              paginationStyle="neuInset"
            />
          </div>
        </ShowcaseSection>

        {/* Technical Specifications */}
        <ShowcaseSection title="Especificaciones Técnicas">
          <div style={specTextStyles}>
            <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Botones de Números:</strong></p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Tamaño:</strong> 20x20px (circular)</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Border-radius:</strong> 50%</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Estilo neuInset:</strong> Glass activo con sombras neumórficas</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Font-size:</strong> 12px</p>

            <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Botones de Flechas:</strong></p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Tamaño:</strong> 20x20px (circular)</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Íconos:</strong> ChevronLeft y ChevronRight, 14px</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Hover:</strong> Elevación con sombra dinámica</p>

            <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--sentinel-accent-primary)' }}>General:</strong></p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Gap:</strong> 8px entre elementos</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Disabled:</strong> opacity 0.6</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>maxVisiblePages:</strong> 5 por defecto</p>
            <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Light Engine:</strong> Sombras dinámicas integradas</p>
          </div>
        </ShowcaseSection>
      </div>
    </LightEngineProvider>
  );
}
