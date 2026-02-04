# Features System

> Manage features through a 4-state workflow from idea to completion.

---

## Structure

```
_workspace/features/
+-- backlog/        # Ideas captured, not prioritized
+-- planned/        # Prioritized, ready to start
+-- active/         # Currently in development
+-- completed/      # Done and documented
+-- README.md       # This file
```

---

## Workflow

```
backlog/ <-> planned/ -> active/ -> completed/
   ^                      |
   +----------------------+ (if paused)
```

| State | Description |
|-------|-------------|
| **backlog** | Ideas and features captured but not yet prioritized |
| **planned** | Prioritized and ready to start (in queue) |
| **active** | Currently in development (limit to 1-2) |
| **completed** | Done, documented, and archived |

---

## Commands

```bash
/feature                    # List features by state
/feature <name>             # View specific feature
/feature take <name>        # Move planned -> active
/feature pause <name>       # Move active -> backlog
/feature complete <name>    # Move active -> completed
/feature plan <name>        # Move backlog -> planned
```

---

## Feature Folder Structure

Each feature is a **folder** (not a file) containing:

```
my-feature/
+-- 00-INDEX.md           # Index of all files
+-- 01-VISION.md          # Vision and objectives
+-- 02-FOUNDATIONS.md     # Technical foundations
+-- 03-RESEARCH.md        # Research and exploration
+-- 04-CONCEPTS.md        # Core concepts
+-- 05-DESIGN.md          # Design decisions
+-- 06-IMPLEMENTATION.md  # Implementation plan
+-- 07-TESTING.md         # Test strategy
+-- 08-NOTES.md           # Additional notes
+-- 09-DECISIONS.md       # Decision log
+-- STATUS.md             # Current state (REQUIRED)
```

**IMPORTANT**: A folder is only recognized as a feature if it contains `STATUS.md`.

---

## STATUS.md Format

```markdown
# Feature: [Feature Name]

> [One-line description]

## State

- **Current**: [backlog | planned | active | completed]
- **Created**: [DATE]
- **Planned**: [DATE] (when moved to planned)
- **Started**: [DATE] (when moved to active)
- **Completed**: [DATE] (when moved to completed)

## Progress

- [ ] Phase 1: [Description]
- [ ] Phase 2: [Description]
- [ ] Phase 3: [Description]

## Notes

[Current status notes, blockers, context]
```

---

## Creating a Feature

1. **Create folder** in appropriate state:
   ```bash
   mkdir _workspace/features/backlog/my-feature
   ```

2. **Add STATUS.md** (required):
   ```bash
   touch _workspace/features/backlog/my-feature/STATUS.md
   ```

3. **Add documentation** as needed:
   - Start with 00-INDEX.md and 01-VISION.md
   - Add more files as feature develops

---

## Feature Lifecycle

### Backlog -> Planned

When a feature is prioritized and ready to be worked on:

```bash
/feature plan my-feature
```

Update STATUS.md:
```yaml
state: planned
planned: 2026-01-20
```

### Planned -> Active

When starting work on a feature:

```bash
/feature take my-feature
```

Update STATUS.md:
```yaml
state: active
started: 2026-01-20
```

### Active -> Completed

When feature is fully implemented:

```bash
/feature complete my-feature
```

Update STATUS.md:
```yaml
state: completed
completed: 2026-01-20
```

### Active -> Backlog (Pause)

When feature needs to be paused:

```bash
/feature pause my-feature
```

Update STATUS.md:
```yaml
state: backlog
paused: 2026-01-20
pause_reason: [reason]
```

---

## Best Practices

1. **Max 2 active features** - Avoid context switching
2. **Clear objectives** - Define success criteria in VISION.md
3. **Incremental documentation** - Update docs as you go
4. **Regular status updates** - Keep STATUS.md current
5. **Preserve everything** - Don't delete when moving states

---

## Integration

Features integrate with:
- `_workspace/tracking/STATUS.md` - Shows active features
- `_workspace/tracking/CHANGELOG.md` - Logs state transitions
- `/status` - Displays all features by state
