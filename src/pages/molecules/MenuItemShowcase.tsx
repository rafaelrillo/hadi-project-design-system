// Path: src/pages/molecules/MenuItemShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Menu Items
import React, { useState, useMemo } from 'react';
import { MenuItem } from '../../components/molecules/MenuItem';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { Home, Settings, User, Bell, Mail, FileText, HelpCircle } from 'lucide-react';

function MenuItemContent() {
  const { lightAngle } = useLightEngine();
  const [activeItem, setActiveItem] = useState('home');

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

  const menuContainerStyles: React.CSSProperties = {
    maxWidth: '300px',
    width: '100%',
    padding: '16px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; MenuItem_</h1>
        <p style={descStyles}>// Item de menú con ícono, label, badge y estados</p>
      </header>

      <ShowcaseSection
        title="MenuItem Básico"
        description="Items de menú con íconos y labels"
      >
        <div style={menuContainerStyles}>
          <MenuItem icon={Home} label="Inicio" onClick={() => console.log('Inicio')} />
          <MenuItem icon={Settings} label="Configuración" onClick={() => console.log('Configuración')} />
          <MenuItem icon={User} label="Perfil" onClick={() => console.log('Perfil')} />
          <MenuItem icon={FileText} label="Documentos" onClick={() => console.log('Documentos')} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Active"
        description="Item activo con estilo diferenciado"
      >
        <div style={menuContainerStyles}>
          <MenuItem icon={Home} label="Inicio" active={true} onClick={() => setActiveItem('home')} />
          <MenuItem icon={Settings} label="Configuración" onClick={() => setActiveItem('settings')} />
          <MenuItem icon={User} label="Perfil" onClick={() => setActiveItem('profile')} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Badge"
        description="Items con badges para notificaciones o contadores"
      >
        <div style={menuContainerStyles}>
          <MenuItem icon={Mail} label="Mensajes" badge={5} onClick={() => console.log('Mensajes')} />
          <MenuItem icon={Bell} label="Notificaciones" badge={12} onClick={() => console.log('Notificaciones')} />
          <MenuItem icon={FileText} label="Documentos" badge="Nuevo" onClick={() => console.log('Documentos')} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estado Disabled"
        description="Items deshabilitados con opacidad reducida"
      >
        <div style={menuContainerStyles}>
          <MenuItem icon={Settings} label="Configuración avanzada" disabled={true} />
          <MenuItem icon={HelpCircle} label="Ayuda premium" disabled={true} badge={3} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Menú Interactivo"
        description="Menú completo con selección de item activo"
      >
        <div style={{
          maxWidth: '300px',
          width: '100%',
          padding: '20px',
          background: LIGHT.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={{
            marginBottom: '16px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#636E72',
            fontFamily: 'var(--sentinel-font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Navegación
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <MenuItem icon={Home} label="Inicio" active={activeItem === 'home'} onClick={() => setActiveItem('home')} />
            <MenuItem icon={Mail} label="Mensajes" badge={5} active={activeItem === 'messages'} onClick={() => setActiveItem('messages')} />
            <MenuItem icon={Bell} label="Notificaciones" badge={12} active={activeItem === 'notifications'} onClick={() => setActiveItem('notifications')} />
            <MenuItem icon={FileText} label="Documentos" active={activeItem === 'documents'} onClick={() => setActiveItem('documents')} />
            <MenuItem icon={Settings} label="Configuración" active={activeItem === 'settings'} onClick={() => setActiveItem('settings')} />
          </div>
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
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Padding:</strong> 12px 16px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Gap:</strong> 12px entre ícono y label</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Border radius:</strong> 15px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Ícono:</strong> 20px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Label:</strong> 14px, 400 normal / 600 active</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function MenuItemShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <MenuItemContent />
    </LightEngineProvider>
  );
}
