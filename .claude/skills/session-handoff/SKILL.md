---
name: session-handoff
description: Ensures tracking files are updated and changes committed before session ends
---

# Session Handoff Skill

> Automatic checkpointing and tracking to prevent lost work.

**Scope**: Universal - applies to all systems in the project.
**Paths**: `_workspace/tracking/STATUS.md`, `_workspace/tracking/CHANGELOG.md`

---

## CRITICAL: Never Lose Work

> **Every session must end with a checkpoint. No exceptions.**

Before ending ANY session:
1. Run `/checkpoint` with meaningful description
2. Verify `_workspace/tracking/STATUS.md` is current
3. Verify `_workspace/tracking/CHANGELOG.md` has entry
4. Commit all changes

---

## When This Skill Activates

### Automatic Triggers

| Trigger | Detection | Action |
|---------|-----------|--------|
| **Session ending** | User says "bye", "done", "that's all", "gotta go" | Force checkpoint |
| **Important task complete** | Feature finished, tests pass, bug fixed | Suggest checkpoint |
| **Context getting long** | Conversation > 50 turns | Suggest checkpoint |
| **Before risky work** | About to refactor, delete, or restructure | Force checkpoint |

### Manual Trigger

```bash
/checkpoint "description"   # Explicit checkpoint
```

---

## Checkpoint Flow

```
TRIGGER DETECTED
     |
     v
+---------------------------------------------------------------+
| 1. COLLECT SUMMARY                                             |
|    - What was completed this session/task?                     |
|    - What files were changed?                                  |
|    - What's still pending?                                     |
+---------------------------------------------------------------+
     |
     v
+---------------------------------------------------------------+
| 2. UPDATE STATUS.MD                                            |
|    - Update session.completed list                             |
|    - Update session.pending list                               |
|    - Set last_checkpoint timestamp                             |
+---------------------------------------------------------------+
     |
     v
+---------------------------------------------------------------+
| 3. UPDATE CHANGELOG.MD                                         |
|    - Add timestamped entry                                     |
|    - List completed items                                      |
|    - List files changed                                        |
+---------------------------------------------------------------+
     |
     v
+---------------------------------------------------------------+
| 4. GIT COMMIT                                                  |
|    - git status --short                                        |
|    - git add [scoped files]                                    |
|    - git commit -m "checkpoint: [description]"                 |
+---------------------------------------------------------------+
     |
     v
+---------------------------------------------------------------+
| 5. CONFIRM TO USER                                             |
|    - Show what was saved                                       |
|    - Show commit hash                                          |
|    - Ready for handoff                                         |
+---------------------------------------------------------------+
```

---

## STATUS.md Format

```yaml
# _workspace/tracking/STATUS.md

session:
  started: 2026-01-19
  last_checkpoint: 2026-01-19 15:30
  focus: "Feature documentation"

  completed:
    - Created feature-x (11 files)
    - Created feature-y (11 files)
    - Added tests

  pending:
    - Implement feature-x
    - Write tests for feature-y

  blockers: []

parallel_instances:
  - area: "testing"
    status: "in progress"
    contact: "other instance"
```

---

## CHANGELOG.md Format

```markdown
## 2026-01-19

### Checkpoint: Feature Documentation Complete (15:30)

**Completed**:
- Created 5 feature folders in _workspace/features/pending/
- Wrote 56 documentation files
- Added cross-references

**Files Changed**:
- _workspace/features/pending/feature-x/* (11 files)
- _workspace/features/pending/feature-y/* (11 files)
- _workspace/tracking/STATUS.md
- _workspace/tracking/CHANGELOG.md

**Commit**: abc1234

---

### Checkpoint: Started Session (10:00)

**Focus**: Document brainstorm conclusions as feature specs

**Starting State**:
- No _workspace/features/ folder
- Brainstorm conclusions not documented
```

---

## Enforcement

Claude should self-enforce by:

1. **Detecting session end signals** in user messages
2. **Proactively suggesting checkpoints** after significant work
3. **Never ending without checkpoint** - treat as mandatory

---

## Integration Points

| System | Integration |
|--------|-------------|
| `/checkpoint` command | Primary mechanism |
| `/status` command | View without checkpointing |
| `_workspace/tickets/` | Close tickets at checkpoint |
| `_workspace/features/` | Update feature STATUS.md |
| Git | Commit at each checkpoint |

---

## Handoff Information

At session end, ensure STATUS.md contains:

```yaml
handoff:
  next_steps:
    - "Start implementing feature-x"
    - "Run tests to verify baseline"

  warnings:
    - "tests/ being modified by other instance"
    - "Don't touch __tests__/"

  context:
    - "Features are in _workspace/features/pending/"
    - "Implementation order: x -> y -> z"
```

---

## Recovery

If session ended without checkpoint:

1. Next instance reads `_workspace/tracking/STATUS.md`
2. Checks git log for recent commits
3. Reviews uncommitted changes with `git status`
4. Creates recovery checkpoint with findings

---

## Self-Check Questions

Before considering session complete:

- [ ] Is `_workspace/tracking/STATUS.md` updated?
- [ ] Is `_workspace/tracking/CHANGELOG.md` updated?
- [ ] Are all changes committed?
- [ ] Are tickets updated if worked on?
- [ ] Is handoff information clear for next instance?
