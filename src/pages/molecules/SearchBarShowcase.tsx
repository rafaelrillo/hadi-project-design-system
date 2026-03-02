// Path: src/pages/molecules/SearchBarShowcase.tsx
// QUAFI Design System - Glass-Neumorphism Search Bar
import React, { useState, useMemo } from 'react';
import { SearchBar } from '../../components/molecules/SearchBar';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { showcase } from '../showcaseStyles';

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

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light), ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark)`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark), inset ${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light)`;
  };

  const searchContainerStyles: React.CSSProperties = {
    maxWidth: '500px',
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
        <h1 style={showcase.header.title}>&gt; SearchBar_</h1>
        <p style={showcase.header.description}>// Barra de busqueda con icono, boton limpiar y Enter</p>
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
              background: 'var(--marble-base)',
              borderRadius: '20px',
              boxShadow: getNeuInsetShadow(3, 8),
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--quafi-text-muted)',
                fontFamily: 'var(--quafi-font-mono)',
                textTransform: 'uppercase',
              }}>
                Resultados de busqueda:
              </div>
              {searchResults.map((result, index) => (
                <div key={index} style={{
                  fontSize: '14px',
                  padding: '8px 0',
                  color: 'var(--quafi-text-primary)',
                  fontFamily: 'var(--quafi-font-mono)',
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
          background: 'var(--marble-base)',
          borderRadius: '20px',
          boxShadow: getNeuInsetShadow(5, 15),
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '8px',
              color: 'var(--quafi-text-primary)',
              fontFamily: 'var(--quafi-font-display)',
              textTransform: 'uppercase',
            }}>
              Biblioteca de Documentos
            </h3>
            <p style={{
              fontSize: '14px',
              color: 'var(--quafi-text-muted)',
              fontFamily: 'var(--quafi-font-mono)',
            }}>
              Encuentra documentos por nombre o contenido
            </p>
          </div>

          <SearchBar
            placeholder="Buscar documentos..."
            onSearch={(value) => alert(`Buscando: ${value}`)}
          />

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Informe Anual 2024.pdf', 'Presupuesto Q1.xlsx', 'Presentacion Cliente.pptx'].map((doc) => (
              <div
                key={doc}
                style={{
                  padding: '14px 16px',
                  background: 'var(--marble-base)',
                  borderRadius: '20px',
                  boxShadow: getNeuPanelShadow(4, 12),
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: 'var(--quafi-text-primary)',
                  fontFamily: 'var(--quafi-font-mono)',
                  transition: 'box-shadow 150ms ease',
                }}
              >
                {doc}
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Tecnicas">
        <div style={{
          padding: '20px',
          borderRadius: '20px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: 'var(--marble-base)',
          fontSize: '12px',
          fontFamily: 'var(--quafi-font-mono)',
          color: 'var(--quafi-text-muted)',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Altura:</strong> 40px</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Padding:</strong> 0 40px (espacio para íconos)</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Border radius:</strong> 15px</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Ícono Search:</strong> 18px, position left</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Botón Clear:</strong> X icon 16px, position right</p>
          <p>✓ <strong style={{ color: 'var(--quafi-accent-primary)' }}>Enter key:</strong> Activa onSearch callback</p>
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
