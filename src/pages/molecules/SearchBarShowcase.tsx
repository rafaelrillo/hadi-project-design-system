// Path: src/pages/molecules/SearchBarShowcase.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { SearchBar } from '../../components/molecules/SearchBar';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function SearchBarShowcase() {
  const [searchValue1, setSearchValue1] = useState('');
  const [searchValue2, setSearchValue2] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    console.log('Buscando:', value);
    // Simulamos resultados de búsqueda
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
        <h1 style={titleStyles}>&gt; SearchBar_</h1>
        <p style={descStyles}>
          // Barra de búsqueda con ícono, botón limpiar y búsqueda con Enter
        </p>
      </header>

      <ShowcaseSection
        title="SearchBar Básico"
        description="Barra de búsqueda con placeholder personalizado"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <SearchBar
              value={searchValue1}
              onChange={setSearchValue1}
              placeholder="Buscar productos..."
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Búsqueda al Presionar Enter"
        description="Escribe y presiona Enter para buscar"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <SearchBar
              value={searchValue2}
              onChange={setSearchValue2}
              onSearch={handleSearch}
              placeholder="Buscar (presiona Enter)..."
            />
            {searchResults.length > 0 && (
              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--background-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Resultados de búsqueda:
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
        title="Sin Botón de Limpiar"
        description="SearchBar sin el botón X para limpiar (showClearButton={false})"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <SearchBar
              placeholder="Buscar sin botón limpiar..."
              showClearButton={false}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Disabled"
        description="SearchBar deshabilitado con background #F5F5F5"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <SearchBar
              placeholder="Búsqueda deshabilitada..."
              disabled={true}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Diferentes Anchuras"
        description="El SearchBar se adapta al ancho de su contenedor (width: 100%)"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <div style={{ width: '300px' }}>
              <div style={{ fontSize: '12px', marginBottom: '4px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>300px de ancho:</div>
              <SearchBar placeholder="Búsqueda estrecha..." />
            </div>
            <div style={{ width: '500px' }}>
              <div style={{ fontSize: '12px', marginBottom: '4px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>500px de ancho:</div>
              <SearchBar placeholder="Búsqueda mediana..." />
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: '12px', marginBottom: '4px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>100% de ancho:</div>
              <SearchBar placeholder="Búsqueda completa..." />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Ejemplo en Contexto"
        description="SearchBar integrado en una interfaz"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '600px', width: '100%', padding: '24px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                Biblioteca de Documentos
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                Encuentra documentos por nombre o contenido
              </p>
            </div>

            <SearchBar
              placeholder="Buscar documentos..."
              onSearch={(value) => alert(`Buscando: ${value}`)}
            />

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Informe Anual 2024.pdf', 'Presupuesto Q1.xlsx', 'Presentación Cliente.pptx'].map((doc) => (
                <div
                  key={doc}
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--background-tertiary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {doc}
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Altura:</strong> 40px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Padding:</strong> 0 40px (espacio para íconos)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border:</strong> 1px solid var(--border)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border-radius:</strong> var(--radius-sm)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Focus:</strong> border-color var(--primary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Ícono Search:</strong> 18px, position absolute left 12px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Botón Clear:</strong> X icon 16px, position absolute right 8px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Disabled:</strong> background var(--background-tertiary)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Width:</strong> 100% (se adapta al contenedor)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Enter key:</strong> Activa onSearch callback</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
