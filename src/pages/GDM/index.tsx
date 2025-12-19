// Path: src/pages/GDM/index.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { Sidebar } from '../../components/organisms/Sidebar/Sidebar';
import { ClipboardList, SlidersHorizontal, User } from 'lucide-react';
import { ConsultaMateriales } from './ConsultaMateriales';
import { GestionMateriales } from './GestionMateriales';
import { LogsModal } from './LogsModal';

export function GDM() {
  const [activeView, setActiveView] = useState<'consulta' | 'gestion'>('consulta');
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
    marginBottom: '24px'
  };

  const logoTextStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    fontFamily: 'var(--font-mono)',
    lineHeight: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };

  const versionStyles: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 400,
    color: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)'
  };

  const terminalLogo = (
    <div style={{ padding: '12px 8px' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19h8"></path>
        <path d="m4 17 6-6-6-6"></path>
      </svg>
    </div>
  );

  const menuItems = [
    {
      icon: ClipboardList,
      label: 'Consulta de materiales',
      isActive: activeView === 'consulta',
      onClick: () => setActiveView('consulta')
    },
    {
      icon: SlidersHorizontal,
      label: 'Gestión de materiales',
      isActive: activeView === 'gestion',
      onClick: () => setActiveView('gestion')
    }
  ];

  const userIcon = (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'var(--background-tertiary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: '1px solid var(--border)'
    }}>
      <User size={20} color="var(--foreground)" />
    </div>
  );

  const mainContentStyles: React.CSSProperties = {
    marginLeft: '56px',
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
    padding: '32px',
    fontFamily: 'var(--font-mono)'
  };

  return (
    <>
      <Sidebar
        productLogo={terminalLogo}
        menuItems={menuItems}
        userIcon={userIcon}
        onLogsClick={() => setIsLogsModalOpen(true)}
      />
      <main style={mainContentStyles}>
        <div style={headerStyles}>
          <span style={logoTextStyles}>GDM</span>
          <span style={versionStyles}>v.0.0.0</span>
        </div>
        {activeView === 'consulta' ? <ConsultaMateriales /> : <GestionMateriales />}
      </main>

      <LogsModal
        isOpen={isLogsModalOpen}
        onClose={() => setIsLogsModalOpen(false)}
      />
    </>
  );
}
