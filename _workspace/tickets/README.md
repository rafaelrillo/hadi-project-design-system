# Tickets System

> Track bugs, tasks, and work items with a simple 3-state workflow.

---

## Structure

```
_workspace/tickets/
+-- open/           # Tickets awaiting work
+-- in-progress/    # Currently being worked on
+-- closed/         # Resolved tickets (history)
+-- README.md       # This file
```

---

## Workflow

```
OPEN -> IN-PROGRESS -> CLOSED
```

1. **Open**: Tickets waiting to be picked up
2. **In-Progress**: Actively being worked on (max 1-2 at a time)
3. **Closed**: Completed, with resolution documented

---

## Commands

```bash
/ticket                    # List all tickets
/ticket TKT-XXX            # View specific ticket
/ticket take TKT-XXX       # Start working on ticket
/ticket close TKT-XXX      # Complete ticket
/ticket new                # Create new ticket
```

---

## Ticket File Format

Create tickets as YAML files: `TKT-XXX.yaml`

```yaml
# _workspace/tickets/open/TKT-001.yaml
id: TKT-001
title: "Brief description of the issue"
type: bug | feature | chore
priority: critical | high | medium | low
system: [system1] | all

description: |
  Detailed description of the issue.
  Include reproduction steps for bugs.

affected_files:
  - path/to/file1.ts
  - path/to/file2.ts

acceptance_criteria:
  - [ ] Criterion 1
  - [ ] Criterion 2

# Added when ticket is taken
assigned_to: session-id
started_at: 2026-01-20T10:00:00Z

# Added when ticket is closed
resolution: |
  How the issue was resolved.
closed_at: 2026-01-20T12:00:00Z
```

---

## ID Convention

Use incrementing IDs: `TKT-001`, `TKT-002`, etc.

To find the next ID:
```bash
ls _workspace/tickets/*/TKT-*.yaml | sort -V | tail -1
```

---

## Priority Levels

| Priority | Description | Response Time |
|----------|-------------|---------------|
| **critical** | System broken, blocking all work | Immediate |
| **high** | Major functionality affected | Same session |
| **medium** | Important but workaround exists | Within week |
| **low** | Nice to have, minor issue | When convenient |

---

## Types

| Type | Description |
|------|-------------|
| **bug** | Something is broken |
| **feature** | New functionality |
| **chore** | Maintenance, refactoring, cleanup |

---

## TDD Requirement

**Every bug fix MUST include a test.**

Before closing a bug ticket:
1. [ ] Write test that reproduces the bug
2. [ ] Verify test fails
3. [ ] Implement fix
4. [ ] Verify test passes
5. [ ] All other tests still pass

---

## Best Practices

1. **One ticket = one issue** - Don't bundle unrelated work
2. **Clear acceptance criteria** - Know when you're done
3. **Update regularly** - Keep status current
4. **Link related tickets** - Reference dependencies
5. **Close promptly** - Don't leave stale in-progress tickets

---

## Integration

Tickets integrate with:
- `_workspace/tracking/STATUS.md` - Shows active ticket
- `_workspace/tracking/CHANGELOG.md` - Logs ticket events
- `/checkpoint` - Commits include ticket reference
