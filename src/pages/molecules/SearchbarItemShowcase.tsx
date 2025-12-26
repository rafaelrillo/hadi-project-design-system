// Path: src/pages/molecules/SearchbarItemShowcase.tsx
// SENTINEL Design System
import React, { useState } from 'react';
import { SearchbarItem } from '../../components/molecules/SearchbarItem';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function SearchbarItemShowcase() {
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      setSearchResults([
        `Resultado 1 para "${value}"`,
        `Resultado 2 para "${value}"`,
        `Resultado 3 para "${value}"`
      ]);
    } else {
      setSearchResults([]);
    }
  };

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
        <h1 style={titleStyles}>&gt; SearchbarItem_</h1>
        <p style={descStyles}>
          // Búsqueda integrada con ícono clickeable, botón clear y border-radius
        </p>
      </header>

      <ShowcaseSection
        title="SearchbarItem Básico"
        description="Barra de búsqueda con ícono clickeable para buscar"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <SearchbarItem
              value={search1}
              onChange={setSearch1}
              placeholder="Buscar..."
              onSearch={(value) => console.log('Búsqueda:', value)}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Búsqueda Interactiva"
        description="Click en el ícono Search o presiona Enter para buscar"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <SearchbarItem
              value={search2}
              onChange={setSearch2}
              placeholder="Buscar productos..."
              onSearch={handleSearch}
            />
            {searchResults.length > 0 && (
              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--background-tertiary)', borderRadius: 'var(--radius)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Resultados:
                </div>
                {searchResults.map((result, index) => (
                  <div key={index} style={{ fontSize: '14px', padding: '4px 0', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                    • {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Focus"
        description="Border cambia a #006081 al hacer focus"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '12px', marginBottom: '4px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>Click en el input para ver el focus:</div>
              <SearchbarItem placeholder="Click aquí..." />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sin Botón Clear"
        description="SearchbarItem sin botón de limpiar (showClearButton={false})"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <SearchbarItem
              placeholder="Sin botón limpiar..."
              showClearButton={false}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Disabled"
        description="SearchbarItem deshabilitado con background #F5F5F5"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <SearchbarItem
              placeholder="Búsqueda deshabilitada..."
              disabled={true}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Altura:</strong> 40px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border:</strong> 1px solid var(--border) | var(--primary) (focus)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border-radius:</strong> var(--radius)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Background:</strong> var(--background-secondary) | var(--background-tertiary) (disabled)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Search icon button:</strong> 40x40px, clickeable, hover color var(--primary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Input:</strong> flex 1, padding 0 8px, sin border ni outline</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Clear button:</strong> 32x32px, X icon 16px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Disabled:</strong> background var(--background-tertiary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Diferencia con SearchBar:</strong> Border-radius var(--radius), layout integrado</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
