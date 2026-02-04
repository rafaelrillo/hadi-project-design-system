---
name: ticket-workflow
description: How to process tickets with TDD enforcement
---

# Ticket Workflow Skill

> Process tickets following TDD and quality standards.

**Scope**: Universal - applies to all systems in the project.
**Paths**: `_workspace/tickets/` (open, in-progress, closed)

---

## Ticket Lifecycle

```
OPEN -> IN-PROGRESS -> CLOSED
  |         |           |
  |         |           +-- Resolution documented
  |         +-- Work being done
  +-- Awaiting pickup
```

---

## Processing a Ticket

### 0. Take Ticket (MANDATORY)

**MUST use `/ticket take` command - do NOT edit tracking/STATUS.md manually.**

```bash
/ticket take TKT-XXX
```

This command:
- Moves ticket to `in-progress/`
- Updates `tracking/STATUS.md` -> `active_ticket: TKT-XXX`
- Logs to `tracking/CHANGELOG.md` -> "Started TKT-XXX"

### 1. Review Ticket

```yaml
# Read the ticket file
Read: _workspace/tickets/in-progress/TKT-XXX.yaml

# Understand:
- What is broken?
- What files are affected?
- What are acceptance criteria?
```

### 2. Write Failing Test FIRST (TDD)

```bash
# Create test that reproduces the bug
# Test MUST fail before fix

# Test should:
- Set up the buggy state
- Assert the expected behavior
- Currently FAIL
```

### 3. Implement Fix

```bash
# Only AFTER test exists and fails
# Fix the actual issue
# Keep changes minimal
```

### 4. Verify Fix

```bash
# Run all tests
npm test || ./run-tests.sh

# ALL tests must pass
```

**CRITICAL**: If tests don't exist for the affected area, CREATE ONE as a regression test.

### 5. Close Ticket (MANDATORY COMMAND)

**MUST use `/ticket close` command - do NOT edit files manually.**

```bash
/ticket close TKT-XXX
```

This command:
- Verifies acceptance criteria
- Moves ticket to `closed/`
- Updates ticket with resolution and closed_at
- Clears `tracking/STATUS.md` -> `active_ticket: null`
- Logs to `tracking/CHANGELOG.md` -> "Closed TKT-XXX"
- Suggests `/checkpoint`

### 6. Checkpoint

**After `/ticket close`, run `/checkpoint` to commit changes.**

```bash
/checkpoint
```

This handles all tracking updates automatically with proper scope awareness.

---

## Tracking Integration

When working on tickets, always keep tracking in sync:

| Event | tracking/STATUS.md | tracking/CHANGELOG.md |
|-------|-----------|--------------|
| Take ticket | `active_ticket: TKT-XXX` | "Started TKT-XXX" |
| Close ticket | `active_ticket: null` | "Closed TKT-XXX: [resolution]" |

After closing, suggest `/checkpoint` to commit changes.

**IMPORTANT**: `/checkpoint` should only commit files related to THIS ticket, not pre-existing changes from other sessions.

---

## Quality Gates

### Before Taking Ticket
- [ ] Understand the issue completely
- [ ] Know which files are affected

### Before Implementing Fix
- [ ] Failing test exists
- [ ] Test correctly reproduces the bug

### Before Closing Ticket
- [ ] Fix implemented
- [ ] Test now passes
- [ ] All other tests still pass
- [ ] Acceptance criteria met
- [ ] Resolution documented
- [ ] Regression test added

---

## Cross-System Tickets

When ticket `source_system` != `target_system`:

1. Fix in target system
2. Verify fix works
3. Notify source system (update ticket notes)
4. Source system verifies from their side

---

## Ticket File Locations

```
_workspace/tickets/
+-- open/           # Tickets awaiting work
+-- in-progress/    # Currently being worked on
+-- closed/         # Resolved (history)
```

Move files between folders as status changes.

**Note**: Tickets can affect multiple systems. Use the `system` field to indicate which.

---

## Common Patterns

### Bug Fix

```bash
# 1. Write test that reproduces the bug
# 2. Fix the code
# 3. Re-run tests
# 4. Run full suite
```

### Path Fix

```bash
# 1. Test that uses the path
# 2. Fix path references
# 3. Verify path resolves
# 4. Run affected tests
```

### Schema Fix

```bash
# 1. Test against schema
# 2. Fix schema or content
# 3. Validate all instances
# 4. Run full test suite
```
