// Path: src/components/index.ts
// Individual package imports are preferred over this barrel export
// to avoid naming conflicts between atomic design levels.
//
// Use:
//   import { Button } from '@fing/design-system/atoms'
//   import { Card } from '@fing/design-system/molecules'
//   import { Sidebar } from '@fing/design-system/organisms'
//
// Each level is exported separately in package.json "exports".

export * from "./atoms";
// NOTE: molecules and organisms have naming conflicts with atoms
// (Stepper, ScrollProgress, TabItem). Import them directly from
// their respective packages instead of from this barrel.
