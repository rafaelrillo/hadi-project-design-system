// Path: src/pages/styles/_SHOWCASE_TEMPLATE.tsx
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SHOWCASE PAGE TEMPLATE - Design System Standard
 *
 * Este archivo define el patrón estándar para todas las páginas de showcase.
 * Usar como referencia al crear nuevas páginas o refactorizar existentes.
 *
 * REGLAS:
 * 1. COLORS: Siempre usar CSS variables, nunca hardcodear
 * 2. SHADOWS: Seguir jerarquía RAISED > INSET > GLASS
 * 3. TYPOGRAPHY: Usar atoms con effect props, no inline textShadow
 * 4. SECTIONS: Usar ShowcaseSection, contenido directo sin wrappers extra
 * 5. LETTERPRESS: RAISED container → carved text, INSET container → embossed text
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { CSSProperties } from "react";
import { ShowcaseSection } from "../../components/showcase";
import { Heading4, Label } from "../../components/atoms/Typography";

// ═══════════════════════════════════════════════════════════════════════════════
// 1. COLOR REFERENCES - Siempre CSS variables
// ═══════════════════════════════════════════════════════════════════════════════

const COLORS = {
  marble: "var(--marble-base)",
  accent: "var(--quafi-accent)",
  textMuted: "var(--quafi-text-muted)",
  textPrimary: "var(--quafi-text-primary)",
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. PAGE HEADER STYLES - RAISED container
// ═══════════════════════════════════════════════════════════════════════════════

const pageHeaderStyles: CSSProperties = {
  marginBottom: "32px",
  padding: "24px",
  background: COLORS.marble,
  borderRadius: "20px",
  boxShadow: "var(--raised-3)",
};

const pageTitleStyles: CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  color: COLORS.accent,
  marginBottom: "8px",
  fontFamily: "var(--quafi-font-display)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  // Carved whisper - Petrol tint (RAISED container = carved text)
  textShadow: "var(--lp-petrol-whisper)",
};

const pageDescStyles: CSSProperties = {
  fontSize: "14px",
  color: COLORS.textMuted,
  fontFamily: "var(--quafi-font-mono)",
  textTransform: "uppercase",
  letterSpacing: "0.03em",
  // Carved muted (RAISED container = carved text)
  textShadow: "var(--lp-muted)",
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. SECTION CONTENT STYLES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Helper para crear contenedor RAISED dentro de ShowcaseSection
 * ShowcaseSection ya provee: .section (RAISED) > .content (INSET)
 * Si necesitas un RAISED dentro del INSET content, usa este helper
 */
const raised = (level: 1 | 2 | 3 = 2): CSSProperties => ({
  background: COLORS.marble,
  boxShadow: `var(--raised-${level})`,
  borderRadius: "16px",
  padding: "24px",
});

/**
 * Helper para crear contenedor INSET
 */
const inset = (level: 1 | 2 | 3 = 2): CSSProperties => ({
  background: COLORS.marble,
  boxShadow: `var(--inset-${level})`,
  borderRadius: "12px",
  padding: "20px",
});

/**
 * Helper para crear elemento GLASS (solo dentro de INSET)
 */
const glass: CSSProperties = {
  background: "var(--glass-bg)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  border: "1px solid var(--glass-border)",
  borderRadius: "12px",
  padding: "16px",
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. GRID LAYOUTS - Estándar para demos
// ═══════════════════════════════════════════════════════════════════════════════

const gridStyles = {
  /** Grid para cards/demos medianos */
  medium: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "24px",
  } as CSSProperties,

  /** Grid para items pequeños */
  small: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "16px",
  } as CSSProperties,

  /** Grid para cards grandes */
  large: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "28px",
  } as CSSProperties,

  /** Flex wrap para demos inline */
  flex: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    justifyContent: "center",
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. DEMO BOX - Elemento de demostración estándar
// ═══════════════════════════════════════════════════════════════════════════════

const demoBoxStyles: CSSProperties = {
  width: "100px",
  height: "80px",
  background: COLORS.marble,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  // Shadow se aplica dinámicamente según demo
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. LABEL STYLES - Para especificaciones y metadata
// ═══════════════════════════════════════════════════════════════════════════════

const labelStyles = {
  /** Variable name (ej: --raised-3) */
  varName: {
    fontSize: "11px",
    fontFamily: "var(--quafi-font-mono)",
    color: COLORS.accent,
    marginTop: "12px",
    textAlign: "center",
    textShadow: "var(--lp-petrol-whisper)",
  } as CSSProperties,

  /** Spec label (ej: 6px / 12px blur) */
  spec: {
    fontSize: "10px",
    fontFamily: "var(--quafi-font-mono)",
    color: COLORS.textMuted,
    marginTop: "4px",
    textAlign: "center",
  } as CSSProperties,
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function ShowcaseTemplate() {
  return (
    <div
      style={{ background: COLORS.marble, minHeight: "100%", padding: "24px" }}
    >
      {/* ═══════════════════════════════════════════════════════════════════
           PAGE HEADER - RAISED container con título carved
           ═══════════════════════════════════════════════════════════════════ */}
      <header style={pageHeaderStyles}>
        <h1 style={pageTitleStyles}>Page Title</h1>
        <p style={pageDescStyles}>Page description in uppercase mono</p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 1 - Usando ShowcaseSection
           ShowcaseSection provee: RAISED (.section) > INSET (.content)
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Section Title"
        description="Section description explaining the content"
      >
        {/*
          El contenido va DIRECTO aquí, sin wrappers extra.
          Ya estamos dentro de INSET (.content del ShowcaseSection).

          Para tipografía:
          - Usar atoms: <Label>, <Heading4>, <Paragraph>
          - effect="embossed" porque estamos en INSET container
        */}
        <div style={gridStyles.flex}>
          {[1, 2, 3].map((item) => (
            <div key={item} style={{ textAlign: "center" }}>
              <div
                style={{ ...demoBoxStyles, boxShadow: `var(--raised-${item})` }}
              >
                {/* En RAISED box dentro de INSET = usar carved */}
                <Heading4 effect="carved-muted" style={{ fontSize: "24px" }}>
                  {item}
                </Heading4>
              </div>
              <div style={labelStyles.varName}>--raised-{item}</div>
              <div style={labelStyles.spec}>Demo spec</div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 2 - Con RAISED container interno
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Section with Raised Container"
        description="When you need a RAISED element inside the section"
      >
        {/* RAISED container dentro de INSET content = OK */}
        <div style={raised(2)}>
          {/* En RAISED = usar carved para texto */}
          <Label effect="carved-muted">
            This is a RAISED container inside the INSET section content
          </Label>

          {/* INSET dentro de RAISED = OK */}
          <div style={{ ...inset(2), marginTop: "16px" }}>
            {/* En INSET = usar embossed para texto */}
            <Label effect="embossed">
              This is an INSET container inside the RAISED
            </Label>

            {/* GLASS dentro de INSET = OK */}
            <div style={{ ...glass, marginTop: "12px" }}>
              <Label effect="carved-whisper">
                This is a GLASS element inside INSET
              </Label>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 3 - Typography effects reference
           ═══════════════════════════════════════════════════════════════════ */}
      <ShowcaseSection
        title="Typography Effects Quick Reference"
        description="Qué effect usar según el container"
      >
        <div style={raised(2)}>
          <table
            style={{
              width: "100%",
              fontFamily: "var(--quafi-font-mono)",
              fontSize: "12px",
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px" }}>Container</th>
                <th style={{ textAlign: "left", padding: "8px" }}>
                  Text Effect
                </th>
                <th style={{ textAlign: "left", padding: "8px" }}>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "8px" }}>RAISED</td>
                <td style={{ padding: "8px" }}>carved-*, letterpress</td>
                <td style={{ padding: "8px" }}>
                  <Label effect="carved-muted">Carved text</Label>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px" }}>INSET</td>
                <td style={{ padding: "8px" }}>embossed-*</td>
                <td style={{ padding: "8px" }}>
                  <Label effect="embossed">Embossed text</Label>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px" }}>GLASS</td>
                <td style={{ padding: "8px" }}>carved-whisper</td>
                <td style={{ padding: "8px" }}>
                  <Label effect="carved-whisper">Whisper text</Label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTS - Para usar en otras páginas
// ═══════════════════════════════════════════════════════════════════════════════

export const showcaseStyles = {
  colors: COLORS,
  pageHeader: pageHeaderStyles,
  pageTitle: pageTitleStyles,
  pageDesc: pageDescStyles,
  raised,
  inset,
  glass,
  grid: gridStyles,
  demoBox: demoBoxStyles,
  label: labelStyles,
};

export default ShowcaseTemplate;
