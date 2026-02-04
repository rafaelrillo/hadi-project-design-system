# /checkpoint Command

> Create a checkpoint after completing important work.

---

## Usage

```bash
/checkpoint                    # Interactive checkpoint
/checkpoint "Brief description" # Quick checkpoint with message
```

---

## What It Does

When you invoke `/checkpoint`:

### 1. Update STATUS.md

Update `_workspace/tracking/STATUS.md` with:

```yaml
session:
  last_checkpoint: "YYYY-MM-DD HH:MM"
  focus: "[Current work focus]"
  active_ticket: TKT-XXX  # If working on a ticket (null if none)

  completed:
    - [List of completed items since last checkpoint]

  pending:
    - [Remaining work]

  blockers: []
```

### 2. Add CHANGELOG Entry

Append to `_workspace/tracking/CHANGELOG.md`:

```markdown
### Checkpoint: [Brief Description] (HH:MM)

**Completed**:
- [Item 1]
- [Item 2]

**Files Changed**:
- [file1.md]
- [file2.sh]
```

### 3. Commit Changes (Scoped)

**CRITICAL: Only commit files changed in THIS session, not pre-existing changes.**

```bash
# Show ALL uncommitted changes
git status --short

# Categorize changes:
# - SESSION CHANGES: Files modified during this session's work
# - PRE-EXISTING: Changes that existed before this session started

# Only stage SESSION CHANGES:
git add [specific files from this session]
git commit -m "checkpoint: [description]"
```

---

## Scope Awareness (MANDATORY)

**Problem**: Multiple sessions may leave uncommitted changes. One session should NOT commit another session's work.

**Solution**: Always scope commits to THIS session's work only.

### How to Determine Scope

1. **By ticket**: If working on TKT-XXX, only commit files related to that ticket
2. **By tracking files**: _workspace/tracking/*.md changes are always this session
3. **By work focus**: Files matching the session's focus area

### Scope Decision Flow

```
1. Run: git status --short

2. Categorize each file:
   | File matches...         | Include in commit?                      |
   | _workspace/tracking/*.md          | YES - always this session               |
   | _workspace/tickets/ (my ticket)   | YES - my ticket work                    |
   | Files I edited          | YES - my work                           |
   | Files I didn't touch    | NO - someone else's work                |
   | System config (.claude/)| ASK - might be shared                   |

3. Show scoped files to user:
   "These files are from YOUR session work:
    - _workspace/tracking/STATUS.md
    - _workspace/tracking/CHANGELOG.md
    - _workspace/tickets/closed/TKT-004.yaml

    These files are PRE-EXISTING (not committing):
    - .claude/commands/status.md
    - CLAUDE.md

    Commit scoped changes? [y/n]"

4. Only git add the scoped files
```

---

## Ticket Awareness

If `_workspace/tracking/STATUS.md` has an `active_ticket`:

### Commit Message Format

```bash
# With active ticket:
git commit -m "checkpoint(TKT-XXX): [description]"

# Without active ticket:
git commit -m "checkpoint: [description]"
```

---

## When to Checkpoint

Create checkpoints after:

| Trigger | Example |
|---------|---------|
| **Feature complete** | Finished documenting a feature |
| **Test suite passes** | All tests green after changes |
| **Significant progress** | Completed major task |
| **Before risky work** | About to refactor |
| **Before break** | Stepping away from work |
| **Session end** | About to close session |

---

## Implementation

When `/checkpoint` is invoked, Claude should:

```bash
# 1. Get current date/time
TIMESTAMP=$(date "+%Y-%m-%d %H:%M")

# 2. Read current STATUS.md
cat _workspace/tracking/STATUS.md

# 3. Update STATUS.md with new checkpoint info
# (Claude edits the file)

# 4. Append to CHANGELOG.md
# (Claude adds entry)

# 5. Check git status
git status --short

# 6. If changes exist, ask about commit
# If user approves:
git add [scoped files]
git commit -m "checkpoint: $DESCRIPTION"
```

---

## Integration

| System | Interaction |
|--------|-------------|
| `/ticket take` | Sets `active_ticket` in STATUS.md |
| `/ticket close` | Clears `active_ticket`, suggests checkpoint |
| `/status` | Shows last checkpoint time |
| `session-handoff` skill | Triggers checkpoint at session end |
