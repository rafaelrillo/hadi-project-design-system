// Path: src/pages/molecules/MenuItemShowcase.tsx
// FING Design System - Glass-Neumorphism Menu Items
import React, { useState, useMemo } from 'react';
import { MenuItem } from '../../components/molecules/MenuItem';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { Home, Settings, User, Bell, Mail, FileText, HelpCircle } from 'lucide-react';
import { showcase } from '../showcaseStyles';

function MenuItemContent() {
  const { lightAngle } = useLightEngine();
  const [activeItem, setActiveItem] = useState('home');

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

  const menuContainerStyles: React.CSSProperties = {
    maxWidth: '300px',
    width: '100%',
    padding: '16px',
    background: 'var(--marble-base)',
    borderRadius: '20px',
    boxShadow: getNeuPanelShadow(8, 24),
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}>
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; MenuItem_</h1>
        <p style={showcase.header.description}>// Item de menu con icono, label, badge y estados</p>
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
          background: 'var(--marble-base)',
          borderRadius: '20px',
          boxShadow: getNeuInsetShadow(5, 15),
          transition: 'box-shadow 50ms linear',
        }}>
          <div style={{
            marginBottom: '16px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--fing-text-muted)',
            fontFamily: 'var(--fing-font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Navegacion
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
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Padding:</strong> 12px 16px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Gap:</strong> 12px entre ícono y label</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Border radius:</strong> 15px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Ícono:</strong> 20px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Label:</strong> 14px, 400 normal / 600 active</p>
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
