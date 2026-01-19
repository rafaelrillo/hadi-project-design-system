// Path: src/pages/molecules/SearchBarShowcase.tsx
// FING Design System - Glass-Neumorphism Search Bar
import React, { useState, useMemo } from 'react';
import { SearchBar } from '../../components/molecules/SearchBar';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function SearchBarContent() {
  const { lightAngle } = useLightEngine();
  const [searchValue1, setSearchValue1] = useState('');
  const [searchValue2, setSearchValue2] = useState('');
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
    maxWidth: '500px',
    width: '100%',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; SearchBar_</h1>
        <p style={descStyles}>// Barra de búsqueda con ícono, botón limpiar y Enter</p>
      </header>

      <ShowcaseSection
        title="SearchBar Básico"
        description="Barra de búsqueda con placeholder personalizado"
      >
        <div style={searchContainerStyles}>
          <SearchBar
            value={searchValue1}
            onChange={setSearchValue1}
            placeholder="Buscar productos..."
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Búsqueda al Presionar Enter"
        description="Escribe y presiona Enter para buscar"
      >
        <div style={searchContainerStyles}>
          <SearchBar
            value={searchValue2}
            onChange={setSearchValue2}
            onSearch={handleSearch}
            placeholder="Buscar (presiona Enter)..."
          />
          {searchResults.length > 0 && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: MARBLE.base,
              borderRadius: '15px',
              boxShadow: getNeuInsetShadow(3, 8),
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#636E72',
                fontFamily: 'var(--fing-font-mono)',
                textTransform: 'uppercase',
              }}>
                Resultados de búsqueda:
              </div>
              {searchResults.map((result, index) => (
                <div key={index} style={{
                  fontSize: '14px',
                  padding: '8px 0',
                  color: 'var(--fing-text-primary)',
                  fontFamily: 'var(--fing-font-mono)',
                  borderBottom: index < searchResults.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                }}>
                  • {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sin Botón de Limpiar"
        description="SearchBar sin el botón X para limpiar"
      >
        <div style={searchContainerStyles}>
          <SearchBar
            placeholder="Buscar sin botón limpiar..."
            showClearButton={false}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Disabled"
        description="SearchBar deshabilitado"
      >
        <div style={searchContainerStyles}>
          <SearchBar
            placeholder="Búsqueda deshabilitada..."
            disabled={true}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Ejemplo en Contexto"
        description="SearchBar integrado en una interfaz"
      >
        <div style={{
          maxWidth: '600px',
          width: '100%',
          padding: '24px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '8px',
              color: 'var(--fing-text-primary)',
              fontFamily: 'var(--fing-font-display)',
              textTransform: 'uppercase',
            }}>
              Biblioteca de Documentos
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#636E72',
              fontFamily: 'var(--fing-font-mono)',
            }}>
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
                  padding: '14px 16px',
                  background: MARBLE.base,
                  borderRadius: '15px',
                  boxShadow: getNeuPanelShadow(4, 12),
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: 'var(--fing-text-primary)',
                  fontFamily: 'var(--fing-font-mono)',
                  transition: 'box-shadow 150ms ease',
                }}
              >
                {doc}
              </div>
            ))}
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
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Altura:</strong> 40px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Padding:</strong> 0 40px (espacio para íconos)</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Border radius:</strong> 15px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Ícono Search:</strong> 18px, position left</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Botón Clear:</strong> X icon 16px, position right</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Enter key:</strong> Activa onSearch callback</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function SearchBarShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <SearchBarContent />
    </LightEngineProvider>
  );
}
