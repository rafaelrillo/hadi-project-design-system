# /status Command

> Show complete project status: systems, tickets, features, tracking.

---

## Usage

```bash
/status            # Full status overview
```

**This is the recommended first command for any session.**

---

## Implementation

When the `/status` command is invoked, display ALL sections:

### Section 1: Systems

```
SYSTEMS
  [system1]/  [ACTIVE]  Description of system 1
  [system2]/  [PLANNED] Description of system 2
  [system3]/  [ACTIVE]  Description of system 3

  > Check each system's CLAUDE.md for specific rules
```

**Implementation**: Check for presence of CLAUDE.md or package.json in each system folder.

### Section 2: Tickets

```
TICKETS
  Open (N):
    [priority] TKT-XXX: Title

  In Progress (N):
    [priority] TKT-XXX: Title

  > Use /ticket to manage
```

**Implementation**: Scan for tickets using BOTH patterns:
- `_workspace/tickets/open/*.yaml` (simple tickets)
- `_workspace/tickets/open/*/TICKET.yaml` (tickets in subfolders)

Same for in-progress: `_workspace/tickets/in-progress/*.yaml` and `_workspace/tickets/in-progress/*/TICKET.yaml`

Extract id, priority, title from each ticket file.

### Section 3: Features (4-State Workflow)

```
FEATURES
  Backlog (N): feature1, feature2
  Planned (N): feature3, feature4
  Active (N): feature5 (X files)
  Completed (N): None

  > Use /feature to manage
```

**Implementation**: Find feature folders by looking for STATUS.md files:
- `_workspace/features/backlog/*/STATUS.md` - Backlog features (ideas, not prioritized)
- `_workspace/features/planned/*/STATUS.md` - Planned features (prioritized, ready to start)
- `_workspace/features/active/*/STATUS.md` - Active features (in development)
- `_workspace/features/completed/*/STATUS.md` - Completed features (done)

Each feature folder MUST contain a STATUS.md file.

**Workflow**: `backlog/ -> planned/ -> active/ -> completed/`

### Section 4: Tracking

```
TRACKING
  Last Checkpoint: YYYY-MM-DD HH:MM
  Active Ticket: TKT-XXX (or None)
  Uncommitted Changes: N files

  > Run /checkpoint to save progress
```

**Implementation**: Read from `_workspace/tracking/STATUS.md`:
- `last_checkpoint` field for timestamp
- `session.active_ticket` for current ticket
- Run `git status --porcelain | wc -l` for uncommitted count

### Section 5: Quick Actions

```
QUICK ACTIONS
  /ticket take TKT-XXX   Take highest priority ticket
  /feature take <name>   Start working on a planned feature
  /test                  Run tests
  /checkpoint            Save progress + commit
```

---

## Complete Output Example

```
================================================================================
                           PROJECT STATUS
================================================================================

SYSTEMS
  [system1]/  [ACTIVE]  Main application
  [system2]/  [PLANNED] Supporting service

TICKETS
  Open (2): TKT-001, TKT-002
  In Progress (0): None

FEATURES
  Backlog (2): feature-a, feature-b
  Planned (1): feature-c
  Active (1): feature-d (13 files)
  Completed (0): None

TRACKING
  Last Checkpoint: 2026-01-20 13:13
  Active Ticket: None
  Uncommitted Changes: 5 files

QUICK ACTIONS
  /feature take feature-c - Start next feature
  /ticket - View/manage tickets
  /test - Run tests
  /checkpoint - Save progress + commit

================================================================================
```

---

## Integration

| System | Data Shown |
|--------|------------|
| `_workspace/tickets/` | Open and in-progress tickets |
| `_workspace/features/` | Features in 4 states |
| `_workspace/tracking/STATUS.md` | Last checkpoint, active ticket |
| `git status` | Uncommitted changes |

---

## Session Start

**IMPORTANT**: Claude should suggest this command at session start:

> "Run `status` to see the current project state."
