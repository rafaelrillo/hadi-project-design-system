---
name: feature-planning
description: Guide for planning and organizing features. Activates when creating, planning, or reviewing features to ensure proper granularity, documentation, and dependency management.
---

# Feature Planning Skill

> Guide for creating well-structured features that maximize Claude's effectiveness.

---

## Overview

This skill guides the creation of well-structured features that maximize Claude's effectiveness with the tracking system. Features should be rich knowledge bases, not just implementation checklists.

## When to Use This Skill

Activate when:
- Creating new features
- Moving features between states (backlog/planned/active/completed)
- Reviewing feature scope or dependencies
- Splitting or merging features

---

## Decision Tree for Granularity

### Is the Feature the Right Size?

```
START
  │
  ▼
┌───────────────────────────────────────┐
│ Can this be completed in 1-2          │
│ Claude sessions?                      │
└───────────────────────────────────────┘
  │
  ├─► NO  ──► SPLIT: Break into smaller features
  │           with clear boundaries
  │
  ▼ YES
┌───────────────────────────────────────┐
│ Are dependencies crystal clear?       │
│ (Can you list exactly which           │
│  features must complete first?)       │
└───────────────────────────────────────┘
  │
  ├─► NO  ──► CLARIFY: Research dependencies,
  │           document in STATUS.md
  │
  ▼ YES
┌───────────────────────────────────────┐
│ Does the scope allow for rich         │
│ documentation? (concepts, research,   │
│ design decisions, examples)           │
└───────────────────────────────────────┘
  │
  ├─► NO (too narrow) ──► MERGE: Combine with
  │                       related features
  │
  ├─► NO (too broad)  ──► SPLIT: Scope is
  │                       too ambitious
  │
  ▼ YES
┌───────────────────────────────────────┐
│ Feature is well-sized!                │
│ Proceed to documentation checklist    │
└───────────────────────────────────────┘
```

---

## Mandatory Checklist Before Creating a Feature

### 1. Required Files (Minimum)

| File | Purpose | Required? |
|------|---------|-----------|
| `STATUS.md` | State, deps, progress | **YES** |
| `00-INDEX.md` | Navigation, file descriptions | **YES** |
| `01-VISION.md` | What and why | **YES** |

### 2. Content Files (At Least 3)

| File | Purpose | When Needed |
|------|---------|-------------|
| `02-FOUNDATIONS.md` | Prerequisites, theory | Has learning curve |
| `03-RESEARCH.md` | Investigation, findings | Requires discovery |
| `04-CONCEPTS.md` | Definitions, terminology | Introduces new terms |
| `05-DESIGN.md` | Architecture decisions | Has design choices |
| `06-IMPLEMENTATION.md` | Code structure, patterns | Has implementation |
| `07-TESTING.md` | Test strategy, validation | Has deliverables |
| `08-EXAMPLES.md` | Usage examples | Complex to use |

### 3. Documentation Quality Check

- [ ] Each concept is defined (don't assume knowledge)
- [ ] Design decisions include rationale
- [ ] Cross-references use relative paths
- [ ] Code snippets are realistic, not pseudo

---

## Mandatory Questions Before Creating Features

Answer these BEFORE creating any feature:

### Scope Questions

1. **What investigation/research will this feature document?**
   - If none → Feature may be too narrow, consider merging
   - Examples: API patterns, framework comparisons, algorithm analysis

2. **What new concepts/terminology will this feature define?**
   - If none → Feature may lack teaching value
   - Examples: "utility function", "execution context", "node contract"

3. **What design decisions will be made?**
   - If none → Feature may be pure implementation (reconsider)
   - Examples: error handling strategy, interface design, data flow

4. **What other features will reference this one?**
   - Document as "Referenced by" in STATUS.md
   - This helps prioritization

### Dependency Questions

5. **What must be complete before this can start?**
   - List specific feature names, not vague concepts
   - If unsure, feature needs more research

6. **What blocks on this feature?**
   - List features that depend on this
   - Helps identify critical path

---

## Anti-Patterns to Avoid

### ✗ Implementation-Only Feature

```yaml
# BAD
name: "backend-api"
description: "Implement FastAPI endpoints"
files:
  - STATUS.md
  - 06-IMPLEMENTATION.md

# Why bad: No learning, no decisions documented, just code.
# Fix: Add research on API patterns, document design decisions, include testing strategy.
```

### ✗ Kitchen-Sink Feature

```yaml
# BAD
name: "backend-complete"
description: "All backend work"
estimated_sessions: 10+

# Why bad: Too broad, no clear stopping point, context overload.
# Fix: Split into foundation, services, framework, nodes, api, e2e.
```

### ✗ Dependency-Blind Feature

```yaml
# BAD
name: "screener-node"
deps: []  # Empty!
# But actually needs: services, framework

# Why bad: Will fail when started, wasted context loading.
# Fix: Research and document ALL dependencies explicitly.
```

### ✗ Feature > 2 Sessions

```yaml
# BAD
name: "backend-framework"
estimated_sessions: 4

# Why bad: Too long for single context, checkpoints become stale.
# Fix: Split into "framework-base", "framework-executor", etc.
```

---

## STATUS.md Template

```yaml
# Feature: {feature-name}

## State
state: backlog  # backlog | planned | active | completed

## Dependencies
depends_on:
  - feature-name-1  # Must complete first
  - feature-name-2

blocks:
  - feature-name-3  # Waiting on this feature
  - feature-name-4

## Cross-References
references:
  - docs/notebooks/example.ipynb  # External sources
  - docs/golden_outputs/data.json

referenced_by:
  - feature-name-5  # Features that cite this one

## Required Skills
required_skills:
  - tdd-guard
  - test-patterns

## Progress
checkpoints: []

## Notes
- Key decisions or context here
```

---

## Feature File Naming Convention

```
{feature-name}/
├── STATUS.md          # Always first - state and deps
├── 00-INDEX.md        # Navigation and overview
├── 01-VISION.md       # Objectives and scope
├── 02-FOUNDATIONS.md  # Prerequisites
├── 03-RESEARCH.md     # Investigation findings
├── 04-CONCEPTS.md     # Definitions
├── 05-DESIGN.md       # Architecture decisions
├── 06-IMPLEMENTATION.md # Code patterns
├── 07-TESTING.md      # Test strategy
└── 08-EXAMPLES.md     # Usage examples
```

**Numbering rationale:**
- 00: Meta/navigation
- 01: Big picture
- 02-03: Input (learning, research)
- 04-05: Thinking (concepts, design)
- 06-07: Output (implementation, testing)
- 08: Reference (examples)

---

## Cross-Reference Format

Use relative markdown links:

```markdown
## References

- Uses: [`backend-services/04-CONCEPTS.md#utility-function`](../backend-services/04-CONCEPTS.md#utility-function)
- Implements: [`backend-framework/04-CONCEPTS.md#base-node`](../backend-framework/04-CONCEPTS.md#base-node)
```

---

## Checklist: Ready to Create Feature?

Before running /feature or creating feature files:

- [ ] Answered all 6 mandatory questions above
- [ ] Feature completable in 1-2 sessions
- [ ] Dependencies explicitly listed (not "TBD")
- [ ] At least 3 content files planned
- [ ] Cross-references identified
- [ ] No anti-patterns present
