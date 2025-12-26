// Path: src/pages/molecules/PaginationShowcase.tsx
// SENTINEL Design System
import React, { useState } from 'react';
import { Pagination } from '../../components/molecules/Pagination';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function PaginationShowcase() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);

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

  return (
    <div>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Pagination_</h1>
        <p style={descStyles}>
          // Navegación por flechas, números de página y elipsis para rangos grandes
        </p>
      </header>

      <ShowcaseSection
        title="Paginación Básica"
        description="Navegación entre páginas con botones anterior/siguiente"
      >
        <ComponentPreview>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
              Página actual: <strong style={{ color: 'var(--primary)' }}>{page1}</strong> de 10
            </div>
            <Pagination
              currentPage={page1}
              totalPages={10}
              onPageChange={setPage1}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Navegación en Medio"
        description="Cuando estás en una página del medio, se muestran elipsis en ambos lados"
      >
        <ComponentPreview>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
              Página actual: <strong style={{ color: 'var(--primary)' }}>{page2}</strong> de 20
            </div>
            <Pagination
              currentPage={page2}
              totalPages={20}
              onPageChange={setPage2}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Muchas Páginas"
        description="Cuando hay muchas páginas, se muestra con elipsis (...)"
      >
        <ComponentPreview>
          <div>
            <div style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
              Página actual: <strong style={{ color: 'var(--primary)' }}>{page3}</strong> de 100
            </div>
            <Pagination
              currentPage={page3}
              totalPages={100}
              onPageChange={setPage3}
              maxVisiblePages={5}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Disabled"
        description="Paginación deshabilitada con opacidad reducida"
      >
        <ComponentPreview>
          <Pagination
            currentPage={5}
            totalPages={10}
            onPageChange={() => {}}
            disabled={true}
          />
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Diferentes Tamaños"
        description="Ejemplos con diferentes cantidades de páginas"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>3 páginas totales:</div>
              <Pagination
                currentPage={2}
                totalPages={3}
                onPageChange={() => {}}
              />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>5 páginas totales:</div>
              <Pagination
                currentPage={3}
                totalPages={5}
                onPageChange={() => {}}
              />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>50 páginas totales:</div>
              <Pagination
                currentPage={25}
                totalPages={50}
                onPageChange={() => {}}
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Ejemplo Interactivo"
        description="Prueba la navegación completa"
      >
        <ComponentPreview>
          <div style={{ padding: '20px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                Resultados de Búsqueda
              </div>
              <div style={{ fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                Mostrando página <strong style={{ color: 'var(--primary)' }}>{page2}</strong> de 20 • 200 resultados totales
              </div>
            </div>

            <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: 'var(--background-tertiary)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '14px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                [Contenido de la página {page2}]
              </div>
            </div>

            <Pagination
              currentPage={page2}
              totalPages={20}
              onPageChange={setPage2}
              maxVisiblePages={5}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p><strong style={{ color: 'var(--primary)' }}>Botones de Números:</strong></p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Tamaño:</strong> 20x20px (circular)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border-radius:</strong> 50%</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border:</strong> none (solo activo tiene borde)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Font-size:</strong> 12px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Background:</strong> transparent</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Hover:</strong> background var(--background-tertiary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Active:</strong> border 1px solid var(--primary), font-weight 600</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>Botones de Flechas:</strong></p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Tamaño:</strong> 20x20px (circular)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border-radius:</strong> 50%</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border:</strong> none</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Background:</strong> transparent</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Íconos:</strong> ChevronLeft y ChevronRight, 14px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Hover:</strong> background var(--background-tertiary)</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>General:</strong></p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Gap:</strong> 8px entre elementos</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Disabled:</strong> opacity 0.6</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>maxVisiblePages:</strong> 5 por defecto</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>showFirstLast:</strong> false por defecto</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
