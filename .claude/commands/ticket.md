# /ticket Command

> View and process tickets across the project

---

## Usage

```bash
/ticket                    # List open tickets (all systems)
/ticket TKT-001            # View specific ticket
/ticket take TKT-001       # Take ownership of ticket
/ticket close TKT-001      # Close ticket (after fix)
/ticket new                # Create new ticket (interactive)
```

---

## System Field

Tickets can affect one or more systems. The `system` field indicates which:

```yaml
# Example ticket
id: TKT-005
system: [system1, system2]  # Affects multiple systems
# OR
system: system1              # Single system
# OR
system: all                  # Cross-cutting concern
```

---

## Implementation

When the `/ticket` command is invoked:

### List Open Tickets (`/ticket`)

```bash
echo "=== OPEN TICKETS ==="
for ticket in _workspace/tickets/open/*.yaml _workspace/tickets/open/*/TICKET.yaml; do
    if [[ -f "$ticket" ]]; then
        id=$(grep "id:" "$ticket" | head -1 | awk '{print $2}')
        title=$(grep "title:" "$ticket" | head -1 | cut -d'"' -f2)
        priority=$(grep "priority:" "$ticket" | head -1 | awk '{print $2}')
        echo "[$priority] $id: $title"
    fi
done

echo ""
echo "=== IN PROGRESS ==="
for ticket in _workspace/tickets/in-progress/*.yaml _workspace/tickets/in-progress/*/TICKET.yaml; do
    if [[ -f "$ticket" ]]; then
        id=$(grep "id:" "$ticket" | head -1 | awk '{print $2}')
        title=$(grep "title:" "$ticket" | head -1 | cut -d'"' -f2)
        echo "$id: $title"
    fi
done
```

### View Specific Ticket (`/ticket TKT-XXX`)

1. Read the ticket YAML file
2. Display formatted summary:
   - Title, priority, type
   - Description
   - Affected files
   - Acceptance criteria

### Take Ticket (`/ticket take TKT-XXX`)

1. Move ticket from `open/` to `in-progress/`
2. Update `assigned_to` field with session identifier
3. Update `_workspace/tracking/STATUS.md`:
   - Set `session.active_ticket: TKT-XXX`
4. Add to `_workspace/tracking/CHANGELOG.md`:
   - Entry: `"Started TKT-XXX: [title]"`

### Close Ticket (`/ticket close TKT-XXX`)

1. Verify all acceptance criteria are met
2. Update `resolution` and `closed_at` fields
3. Move ticket from `in-progress/` to `closed/`
4. Run tests to confirm fix
5. Update `_workspace/tracking/STATUS.md`:
   - Clear `session.active_ticket` (set to null)
6. Add to `_workspace/tracking/CHANGELOG.md`:
   - Entry: `"Closed TKT-XXX: [resolution summary]"`
7. Suggest: **"Run /checkpoint to commit changes"**

---

## Workflow

```
/ticket                    # See what's open
    |
    +-> /ticket TKT-001    # Read details
    |
    +-> /ticket take TKT-001
    |       |
    |       +-> Write failing test (TDD)
    |       +-> Implement fix
    |       +-> Run tests
    |       +-> /ticket close TKT-001
    |
    +-> Tests pass -> Ticket closed
```

---

## TDD Requirement

**CRITICAL**: Every bug fix MUST have a test.

Before closing a ticket:
1. [ ] Failing test exists that reproduces the bug
2. [ ] Fix implemented
3. [ ] Test now passes
4. [ ] No regressions (all tests pass)

---

## Ticket File Format

```yaml
# _workspace/tickets/open/TKT-XXX.yaml
id: TKT-XXX
title: "Brief description of the issue"
type: bug | feature | chore
priority: critical | high | medium | low
system: [system1] | all

description: |
  Detailed description of the issue.

affected_files:
  - path/to/file1.ts
  - path/to/file2.ts

acceptance_criteria:
  - [ ] Criterion 1
  - [ ] Criterion 2

# Added when taken
assigned_to: session-id
started_at: 2026-01-20T10:00:00Z

# Added when closed
resolution: |
  How it was fixed.
closed_at: 2026-01-20T12:00:00Z
```

---

## Integration

This command integrates with:

| System | Action |
|--------|--------|
| `_workspace/tickets/` | Read/move ticket files |
| `_workspace/tracking/STATUS.md` | Set/clear `session.active_ticket` |
| `_workspace/tracking/CHANGELOG.md` | Log ticket start/close events |
| `/checkpoint` | Suggested after closing ticket |
