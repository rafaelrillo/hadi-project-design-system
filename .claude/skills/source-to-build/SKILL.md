---
name: source-to-build
description: Source -> Build/Output pattern knowledge for projects with separate development and distribution folders
---

# Source to Build Pattern Skill

> Understanding the Source -> Build architecture for development workflows.

---

## When Active

This skill activates when:
- Working with projects that have source/output separation
- Creating new components in a source directory
- Planning features that will be built/compiled
- Explaining development vs production structure

---

## The Source -> Build Model

```
+-----------------------------------------------------------------------+
|                         PROJECT ARCHITECTURE                           |
+-----------------------------------------------------------------------+
|                                                                       |
|   SOURCE (src/, core/, source/)          OUTPUT (dist/, build/, out/) |
|   -------------------------              ---------------------------- |
|   Where we BUILD                         What we SHIP                 |
|                                                                       |
|   +---------------------+               +---------------------+       |
|   | components/         |-------------->| components/         |       |
|   | features/           |   BUILD       | features/           |       |
|   | utils/              |-------------->| utils/              |       |
|   | __tests__/          | (excluded)    |                     |       |
|   +---------------------+               +---------------------+       |
|                                                                       |
|   DEVELOPMENT                            PRODUCTION                   |
|   -----------                            ----------                   |
|   Tests, fixtures                        Optimized output             |
|   Dev dependencies                       No dev files                 |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

## Core Rules

### Rule 1: Components Created in Source, NEVER in Output

```
CORRECT:
  Create: src/components/my-component/
  Test: src/components/my-component/__tests__/
  Build: -> dist/components/my-component/

WRONG:
  Create: dist/components/my-component/  <- NEVER DO THIS
```

### Rule 2: Every Component Needs Tests

```
src/components/my-component/
+-- index.ts
+-- MyComponent.tsx
+-- __tests__/           <- REQUIRED
    +-- MyComponent.test.tsx
    +-- fixtures/
```

### Rule 3: Output is ONLY Built by Build Process

- Development: Create in source/
- Testing: Validate in source/
- Build: Copy/compile to output/

No direct modifications to output directory.

### Rule 4: Source Changes Require Test Validation

```
Change source/ -> Run tests -> Tests pass -> Build to output/
                    |
                    +-> Tests fail -> Fix first, no build
```

---

## Directory Patterns

### Pattern 1: TypeScript/JavaScript

```
src/              <- Source
dist/             <- Output (compiled)
```

### Pattern 2: Monorepo

```
packages/
  app/
    src/          <- Source
    dist/         <- Output
  lib/
    src/          <- Source
    dist/         <- Output
```

### Pattern 3: Custom

```
core/             <- Source (development)
build/            <- Output (production)
```

---

## Build Flow

```
1. Developer creates component in source/
2. Developer creates tests in __tests__/
3. CI/Build runs tests
4. Tests pass? -> Build process runs
5. Tests fail? -> Developer fixes
```

---

## Why This Model?

1. **Separation**: Development (source/) separate from delivery (output/)
2. **Quality**: Nothing reaches production without testing
3. **Clarity**: Clear ownership per area
4. **Traceability**: Know where everything is built

---

## Exclusion Rules

Files NEVER copied to output:
- `__tests__/` directories
- `*.test.*` files
- `*.spec.*` files
- `fixtures/` directories
- Development-only files
- Source maps (in production)

---

## Integration with /sync

The `/sync` command automates this pattern:

```bash
/sync           # Build from source to output
/sync --check   # Preview what would be built
/sync --force   # Skip tests (dangerous)
```
