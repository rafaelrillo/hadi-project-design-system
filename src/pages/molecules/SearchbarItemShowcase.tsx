// Path: src/pages/molecules/SearchbarItemShowcase.tsx
// FING Design System - Glass-Neumorphism Searchbar Item
import React, { useState, useMemo } from 'react';
import { SearchbarItem } from '../../components/molecules/SearchbarItem';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { showcase } from '../showcaseStyles';

function SearchbarItemContent() {
  const { lightAngle } = useLightEngine();
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

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light), ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark)`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark), inset ${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light)`;
  };

  const searchContainerStyles: React.CSSProperties = {
    maxWidth: '400px',
    width: '100%',
    padding: '24px',
    background: 'var(--marble-base)',
    borderRadius: '20px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}>
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; SearchbarItem_</h1>
        <p style={showcase.header.description}>// Busqueda integrada con icono clickeable y clear</p>
      </header>

      <ShowcaseSection
        title="SearchbarItem Básico"
        description="Barra de búsqueda con ícono clickeable para buscar"
      >
        <div style={searchContainerStyles}>
          <SearchbarItem
            value={search1}
            onChange={setSearch1}
            placeholder="Buscar..."
            onSearch={(value) => console.log('Búsqueda:', value)}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Búsqueda Interactiva"
        description="Click en el ícono Search o presiona Enter"
      >
        <div style={searchContainerStyles}>
          <SearchbarItem
            value={search2}
            onChange={setSearch2}
            placeholder="Buscar productos..."
            onSearch={handleSearch}
          />
          {searchResults.length > 0 && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: 'var(--marble-base)',
              borderRadius: '20px',
              boxShadow: getNeuInsetShadow(3, 8),
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--fing-text-muted)',
                fontFamily: 'var(--fing-font-mono)',
                textTransform: 'uppercase',
              }}>
                Resultados:
              </div>
              {searchResults.map((result, index) => (
                <div key={index} style={{
                  fontSize: '14px',
                  padding: '8px 0',
                  color: 'var(--fing-text-primary)',
                  fontFamily: 'var(--fing-font-mono)',
                }}>
                  • {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Focus"
        description="Border destaca al hacer focus"
      >
        <div style={searchContainerStyles}>
          <div style={{ fontSize: '12px', marginBottom: '12px', color: 'var(--fing-text-muted)', fontFamily: 'var(--fing-font-mono)' }}>
            Click en el input para ver el focus:
          </div>
          <SearchbarItem placeholder="Click aqui..." />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sin Botón Clear"
        description="SearchbarItem sin botón de limpiar"
      >
        <div style={searchContainerStyles}>
          <SearchbarItem
            placeholder="Sin botón limpiar..."
            showClearButton={false}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Disabled"
        description="SearchbarItem deshabilitado"
      >
        <div style={searchContainerStyles}>
          <SearchbarItem
            placeholder="Búsqueda deshabilitada..."
            disabled={true}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Tecnicas">
        <div style={{
          padding: '20px',
          borderRadius: '20px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: 'var(--marble-base)',
          fontSize: '12px',
          fontFamily: 'var(--fing-font-mono)',
          color: 'var(--fing-text-muted)',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Altura:</strong> 40px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Border radius:</strong> 15px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Search icon button:</strong> 40x40px, clickeable</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Input:</strong> flex 1, padding 0 8px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Clear button:</strong> 32x32px, X icon 16px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Diferencia con SearchBar:</strong> Layout integrado con ícono clickeable</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function SearchbarItemShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <SearchbarItemContent />
    </LightEngineProvider>
  );
}
