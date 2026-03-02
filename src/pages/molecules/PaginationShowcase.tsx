// Path: src/pages/molecules/PaginationShowcase.tsx
// QUAFI Design System - Glass-Neumorphism Pagination
import React, { useState } from 'react';
import { Pagination } from '../../components/molecules/Pagination';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider } from '@/contexts/LightEngineContext';
import { showcase } from '../showcaseStyles';

export function PaginationShowcase() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);
  const [pageNeu, setPageNeu] = useState(5);

  const infoLabelStyles: React.CSSProperties = {
    marginBottom: '12px',
    fontSize: '14px',
    color: 'var(--quafi-text-secondary)',
    fontFamily: 'var(--quafi-font-mono)',
  };

  const specTextStyles: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--quafi-text-muted)',
    lineHeight: '1.8',
    fontFamily: 'var(--quafi-font-mono)',
  };

  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <div style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}>
        {/* Page Header */}
        <header style={showcase.header.container}>
          <h1 style={showcase.header.title}>&gt; Pagination_</h1>
          <p style={showcase.header.description}>
            // Navegacion por flechas, numeros de pagina y elipsis para rangos grandes
          </p>
        </header>

        {/* Basic Pagination */}
        <ShowcaseSection
          title="Paginacion Basica"
          description="Navegacion entre paginas con botones anterior/siguiente"
        >
          <div>
            <div style={infoLabelStyles}>
              Pagina actual: <strong style={{ color: 'var(--quafi-accent)' }}>{page1}</strong> de 10
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
          title="Navegacion en Medio"
          description="Cuando estas en una pagina del medio, se muestran elipsis en ambos lados"
        >
          <div>
            <div style={infoLabelStyles}>
              Pagina actual: <strong style={{ color: 'var(--quafi-accent)' }}>{page2}</strong> de 20
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
          title="Con Muchas Paginas"
          description="Cuando hay muchas paginas, se muestra con elipsis (...)"
        >
          <div>
            <div style={infoLabelStyles}>
              Pagina actual: <strong style={{ color: 'var(--quafi-accent)' }}>{page3}</strong> de 100
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
          description="Paginacion deshabilitada con opacidad reducida"
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
          title="Diferentes Tamanos"
          description="Ejemplos con diferentes cantidades de paginas"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--quafi-text-muted)', fontFamily: 'var(--quafi-font-mono)' }}>3 paginas totales:</div>
              <Pagination
                currentPage={2}
                totalPages={3}
                onPageChange={() => {}}
                paginationStyle="neuInset"
              />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--quafi-text-muted)', fontFamily: 'var(--quafi-font-mono)' }}>5 paginas totales:</div>
              <Pagination
                currentPage={3}
                totalPages={5}
                onPageChange={() => {}}
                paginationStyle="neuInset"
              />
            </div>
            <div>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--quafi-text-muted)', fontFamily: 'var(--quafi-font-mono)' }}>50 paginas totales:</div>
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
          description="Prueba la navegacion completa con estilo neuInset"
        >
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--quafi-text-primary)', fontFamily: 'var(--quafi-font-mono)', textTransform: 'uppercase' }}>
                Resultados de Busqueda
              </div>
              <div style={{ fontSize: '14px', color: 'var(--quafi-text-secondary)', fontFamily: 'var(--quafi-font-mono)' }}>
                Mostrando pagina <strong style={{ color: 'var(--quafi-accent)' }}>{pageNeu}</strong> de 15 - 150 resultados totales
              </div>
            </div>

            <div style={{
              marginBottom: '16px',
              padding: '16px',
              background: 'var(--marble-base)',
              borderRadius: '20px',
              boxShadow: 'var(--inset-2)',
            }}>
              <div style={{ fontSize: '14px', color: 'var(--quafi-text-secondary)', fontFamily: 'var(--quafi-font-mono)' }}>
                [Contenido de la pagina {pageNeu}]
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
        <ShowcaseSection title="Especificaciones Tecnicas">
          <div style={specTextStyles}>
            <p><strong style={{ color: 'var(--quafi-accent)' }}>Botones de Numeros:</strong></p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Tamano:</strong> 20x20px (circular)</p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Border-radius:</strong> 50%</p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Estilo neuInset:</strong> Glass activo con sombras neumorficas</p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Font-size:</strong> 12px</p>

            <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--quafi-accent)' }}>Botones de Flechas:</strong></p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Tamano:</strong> 20x20px (circular)</p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Iconos:</strong> ChevronLeft y ChevronRight, 14px</p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Hover:</strong> Elevacion con sombra dinamica</p>

            <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--quafi-accent)' }}>General:</strong></p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Gap:</strong> 8px entre elementos</p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Disabled:</strong> opacity 0.6</p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>maxVisiblePages:</strong> 5 por defecto</p>
            <p>- <strong style={{ color: 'var(--quafi-accent)' }}>Light Engine:</strong> Sombras dinamicas integradas</p>
          </div>
        </ShowcaseSection>
      </div>
    </LightEngineProvider>
  );
}
