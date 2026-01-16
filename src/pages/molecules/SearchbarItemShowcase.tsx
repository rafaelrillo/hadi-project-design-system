// Path: src/pages/molecules/SearchbarItemShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Searchbar Item
import React, { useState, useMemo } from 'react';
import { SearchbarItem } from '../../components/molecules/SearchbarItem';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

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

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: LIGHT.base,
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

  const searchContainerStyles: React.CSSProperties = {
    maxWidth: '400px',
    width: '100%',
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; SearchbarItem_</h1>
        <p style={descStyles}>// Búsqueda integrada con ícono clickeable y clear</p>
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
              background: LIGHT.base,
              borderRadius: '15px',
              boxShadow: getNeuInsetShadow(3, 8),
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#636E72',
                fontFamily: 'var(--sentinel-font-mono)',
                textTransform: 'uppercase',
              }}>
                Resultados:
              </div>
              {searchResults.map((result, index) => (
                <div key={index} style={{
                  fontSize: '14px',
                  padding: '8px 0',
                  color: '#2D3436',
                  fontFamily: 'var(--sentinel-font-mono)',
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
          <div style={{ fontSize: '12px', marginBottom: '12px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>
            Click en el input para ver el focus:
          </div>
          <SearchbarItem placeholder="Click aquí..." />
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

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: LIGHT.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Altura:</strong> 40px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Border radius:</strong> 15px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Search icon button:</strong> 40x40px, clickeable</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Input:</strong> flex 1, padding 0 8px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Clear button:</strong> 32x32px, X icon 16px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Diferencia con SearchBar:</strong> Layout integrado con ícono clickeable</p>
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
