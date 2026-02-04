---
name: memory-hierarchy
description: 4-tier memory architecture (L1-L4) for managing project state and knowledge
---

# Memory Hierarchy Skill

> Understanding the 4-tier memory architecture for project management

---

## When Active

This skill activates when:
- Discussing memory or state management
- Planning tracking updates
- Designing state persistence
- Deciding where to store information

---

## The 4 Tiers

```
+-----------------------------------------------------------------------+
|                    MEMORY HIERARCHY                                    |
+-----------------------------------------------------------------------+
|                                                                       |
|  L4: DOCUMENTATION (Semantic Memory)                                  |
|  ----------------------------------------                             |
|  Location: DOMAIN.md, knowledge/, docs/                               |
|  Lifespan: Permanent (project lifetime)                               |
|  Content: Core concepts, architecture, decisions                      |
|                                                                       |
|  L3: SESSION (Episodic Memory)                                        |
|  ----------------------------------------                             |
|  Location: _workspace/tracking/STATUS.md, CHANGELOG.md                          |
|  Lifespan: Cross-session (persists between sessions)                  |
|  Content: Progress, history, context                                  |
|                                                                       |
|  L2: TASK (Working Memory)                                            |
|  ----------------------------------------                             |
|  Location: _workspace/tickets/, _workspace/features/active/           |
|  Lifespan: Task duration                                              |
|  Content: Current tasks, active state                                 |
|                                                                       |
|  L1: EXECUTION (Procedural Memory)                                    |
|  ----------------------------------------                             |
|  Location: Commands, skills, inline instructions                      |
|  Lifespan: Single execution                                           |
|  Content: How to do things, procedures                                |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

## Tier Details

### L4: Documentation (Semantic)

**What**: Long-term knowledge about the project
**Where**: `docs/`, `DOMAIN.md`, `knowledge/`
**When Updated**: Manual consolidation, significant discoveries
**Examples**:
- Core concepts
- Architecture decisions
- Domain vocabulary
- Patterns and conventions

### L3: Session (Episodic)

**What**: What happened across sessions
**Where**: `_workspace/tracking/STATUS.md`, `CHANGELOG.md`
**When Updated**: End of each session
**Examples**:
- Current progress
- Recent changes
- Blockers
- Session summaries

### L2: Task (Working)

**What**: Active work being done
**Where**: `_workspace/tickets/in-progress/`, `_workspace/features/active/`
**When Updated**: During task execution
**Examples**:
- Current tasks
- Task status
- Active state
- Work in progress

### L1: Execution (Procedural)

**What**: How to perform operations
**Where**: `.claude/commands/`, `.claude/skills/`
**When Updated**: When procedures change
**Examples**:
- Command definitions
- Processing steps
- Validation rules
- Transformation logic

---

## Promotion Rules

Memory moves UP the hierarchy through consolidation:

```
L1 -> L2: Task completion -> Update state files
L2 -> L3: Session end -> Auto via checkpoint
L3 -> L4: Manual -> Document significant learnings
```

### Automatic Promotions

- **L2->L3**: Handled by `/checkpoint` command
  - Updates STATUS.md
  - Updates CHANGELOG.md

### Manual Promotions

- **L3->L4**: Requires human decision
  - When: Significant learning, pattern established
  - Where: Updates docs/, creates knowledge files

---

## Usage Patterns

### Reading State (Top-Down)

```
Start at L4 (docs) -> L3 (STATUS.md) -> L2 (active tasks)
```

### Writing State (Bottom-Up)

```
Execute (L1) -> Update task (L2) -> Checkpoint session (L3) -> Document (L4)
```

---

## Where to Store What

| Information Type | Tier | Location |
|-----------------|------|----------|
| Architecture decisions | L4 | `docs/decisions/` |
| API documentation | L4 | `docs/api/` |
| Session progress | L3 | `_workspace/tracking/STATUS.md` |
| Change history | L3 | `_workspace/tracking/CHANGELOG.md` |
| Active tickets | L2 | `_workspace/tickets/in-progress/` |
| Active features | L2 | `_workspace/features/active/` |
| How to run tests | L1 | `.claude/commands/test.md` |
| Workflow rules | L1 | `.claude/skills/` |

---

## Key Insight

> Higher tiers are MORE STABLE, lower tiers are MORE VOLATILE.

L4 changes rarely (big decisions)
L3 changes per session
L2 changes per task
L1 changes per execution
