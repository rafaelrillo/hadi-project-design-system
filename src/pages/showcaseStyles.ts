// Path: src/pages/showcaseStyles.ts
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SHOWCASE STYLES - Unified Design System Standards
 *
 * Este módulo exporta todos los estilos estándar para páginas de showcase.
 * Importar y usar en todas las páginas para mantener consistencia.
 *
 * USAGE:
 *   import { showcase } from '../showcaseStyles';
 *   // or
 *   import { showcase } from '../../showcaseStyles';
 *
 *   <header style={showcase.header.container}>
 *     <h1 style={showcase.header.title}>Title</h1>
 *     <p style={showcase.header.description}>Description</p>
 *   </header>
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { CSSProperties } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// CSS VARIABLE REFERENCES
// ═══════════════════════════════════════════════════════════════════════════════

export const colors = {
  marble: 'var(--marble-base)',
  marbleDark: 'var(--marble-dark)',
  accent: 'var(--fing-accent)',
  textPrimary: 'var(--fing-text-primary)',
  textMuted: 'var(--fing-text-muted)',
  textSecondary: 'var(--fing-text-secondary)',
  shadowLight: 'var(--shadow-light)',
  shadowDark: 'var(--shadow-dark)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE HEADER - RAISED container
// ═══════════════════════════════════════════════════════════════════════════════

export const header = {
  /** Page header container - RAISED level 3 */
  container: {
    marginBottom: '32px',
    padding: '24px',
    background: colors.marble,
    borderRadius: '20px',
    boxShadow: 'var(--raised-3)',
  } as CSSProperties,

  /** Page title - Petrol accent with carved whisper effect */
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: colors.accent,
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: 'var(--lp-petrol-whisper)',
  } as CSSProperties,

  /** Page description - Muted mono with carved effect */
  description: {
    fontSize: '14px',
    color: colors.textMuted,
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    textShadow: 'var(--lp-muted)',
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE WRAPPER
// ═══════════════════════════════════════════════════════════════════════════════

export const page = {
  /** Full page wrapper with marble background */
  wrapper: {
    background: colors.marble,
    minHeight: '100%',
    padding: '24px',
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CONTAINER HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * RAISED container - Elements floating above surface
 * Use inside ShowcaseSection's INSET content
 */
export const raised = (level: 1 | 2 | 3 | 4 | 5 = 2): CSSProperties => ({
  background: colors.marble,
  boxShadow: `var(--raised-${level})`,
  borderRadius: '16px',
  padding: '24px',
});

/**
 * INSET container - Carved into surface
 * Use inside RAISED containers
 */
export const inset = (level: 1 | 2 | 3 | 4 | 5 = 2): CSSProperties => ({
  background: colors.marble,
  boxShadow: `var(--inset-${level})`,
  borderRadius: '12px',
  padding: '20px',
});

/**
 * GLASS element - Semi-transparent floating
 * Use inside INSET containers only
 */
export const glass: CSSProperties = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '1px solid var(--glass-border)',
  borderRadius: '12px',
  padding: '16px',
};

// ═══════════════════════════════════════════════════════════════════════════════
// GRID LAYOUTS
// ═══════════════════════════════════════════════════════════════════════════════

export const grid = {
  /** Grid for medium cards/demos (200px min) */
  medium: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '24px',
  } as CSSProperties,

  /** Grid for small items (140px min) */
  small: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '16px',
  } as CSSProperties,

  /** Grid for large cards (280px min) */
  large: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '28px',
  } as CSSProperties,

  /** Flex wrap for inline demos */
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'center',
  } as CSSProperties,

  /** Flex wrap with smaller gap */
  flexCompact: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
  } as CSSProperties,

  /** Single column stack */
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO BOX
// ═══════════════════════════════════════════════════════════════════════════════

export const demoBox = {
  /** Standard demo box */
  base: {
    width: '100px',
    height: '80px',
    background: colors.marble,
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  /** Large demo box */
  large: {
    width: '140px',
    height: '100px',
    background: colors.marble,
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,

  /** Small demo box */
  small: {
    width: '80px',
    height: '60px',
    background: colors.marble,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════════════════
// LABELS
// ═══════════════════════════════════════════════════════════════════════════════

export const label = {
  /** Variable name (e.g., --raised-3) */
  varName: {
    fontSize: '11px',
    fontFamily: 'var(--fing-font-mono)',
    color: colors.accent,
    marginTop: '12px',
    textAlign: 'center',
    textShadow: 'var(--lp-petrol-whisper)',
  } as CSSProperties,

  /** Spec/description label */
  spec: {
    fontSize: '10px',
    fontFamily: 'var(--fing-font-mono)',
    color: colors.textMuted,
    marginTop: '4px',
    textAlign: 'center',
  } as CSSProperties,

  /** Section label (uppercase) */
  section: {
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: 'var(--fing-font-mono)',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '16px',
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY PRESETS (for inline use when atoms aren't suitable)
// ═══════════════════════════════════════════════════════════════════════════════

export const text = {
  /** Heading in RAISED container (carved effect) */
  headingCarved: {
    fontFamily: 'var(--fing-font-display)',
    fontWeight: 600,
    color: colors.textPrimary,
    textShadow: 'var(--lp-primary)',
  } as CSSProperties,

  /** Heading in INSET container (embossed effect) */
  headingEmbossed: {
    fontFamily: 'var(--fing-font-display)',
    fontWeight: 600,
    color: colors.marble,
    textShadow: 'var(--lp-embossed)',
  } as CSSProperties,

  /** Body text in RAISED (carved muted) */
  bodyCarved: {
    fontFamily: 'var(--fing-font-primary)',
    color: colors.textMuted,
    textShadow: 'var(--lp-muted)',
  } as CSSProperties,

  /** Body text in INSET (embossed subtle) */
  bodyEmbossed: {
    fontFamily: 'var(--fing-font-primary)',
    color: colors.textSecondary,
    textShadow: 'var(--lp-embossed-subtle)',
  } as CSSProperties,

  /** Mono code/data text */
  mono: {
    fontFamily: 'var(--fing-font-mono)',
    fontSize: '12px',
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE STYLES
// ═══════════════════════════════════════════════════════════════════════════════

export const table = {
  container: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'var(--fing-font-mono)',
    fontSize: '12px',
  } as CSSProperties,

  header: {
    textAlign: 'left',
    padding: '12px 8px',
    borderBottom: '1px solid var(--border)',
    fontSize: '10px',
    color: colors.textMuted,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  } as CSSProperties,

  cell: {
    padding: '12px 8px',
    borderBottom: '1px solid var(--border)',
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const showcase = {
  colors,
  page,
  header,
  raised,
  inset,
  glass,
  grid,
  demoBox,
  label,
  text,
  table,
};

export default showcase;
