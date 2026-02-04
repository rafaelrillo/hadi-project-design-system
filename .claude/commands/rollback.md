# /rollback Command

> Restore project state to a previous snapshot.

---

## Usage

```bash
/rollback                    # Interactive: list snapshots and choose
/rollback snap-{id}          # Rollback to specific snapshot
/rollback --dry-run snap-{id} # Preview without executing
```

---

## Implementation

When the `/rollback` command is invoked:

### Interactive Mode (no arguments)

```yaml
# Step 1: List recent snapshots
SHOW recent_snapshots (see /snapshot --list)

# Step 2: Ask user
ASK: "What would you like to rollback?"
OPTIONS:
  [1] Snapshot: snap-2026-01-18T10-30-00 (manual)
  [2] Snapshot: snap-2026-01-18T10-00-00 (checkpoint)
  [3] Snapshot: snap-2026-01-18T09-55-00 (auto)
  [4] Cancel
```

### Snapshot Rollback

When rolling back to a specific snapshot:

```yaml
# Step 1: Validate snapshot exists
IF NOT exists("history/snapshots/{snapshot_id}/meta.yaml"):
  ERROR: "Snapshot not found: {snapshot_id}"
  EXIT

# Step 2: Read snapshot metadata
READ: history/snapshots/{snapshot_id}/meta.yaml
EXTRACT:
  captured: [list of files]

# Step 3: Create safety snapshot (pre_rollback)
INVOKE /snapshot "Pre-rollback safety: before rolling back to {snapshot_id}"
safety_snapshot_id: "{result.snapshot_id}"

# Step 4: Restore files
FOR each file in captured:
  IF exists(current_file):
    REMOVE current_file
  COPY history/snapshots/{snapshot_id}/{file} -> {file}
  LOG: "Restored: {file}"

# Step 5: Log rollback
APPEND history/rollback.log:
  "{timestamp} | LOCAL | {snapshot_id} | User requested | SUCCESS"

# Step 6: Report
OUTPUT:
  status: "SUCCESS"
  restored_from: "{snapshot_id}"
  files_restored: N
  safety_snapshot: "{safety_snapshot_id}"
```

### Dry Run Mode

When `--dry-run` is specified:

```yaml
DISPLAY:
  === DRY RUN: Rollback to {snapshot_id} ===

  Files that would be restored:
  {list from meta.yaml captured}

  Current files that would be replaced:
  {list of existing files}

  Safety snapshot would be created: Yes

  === No changes made ===
```

---

## Output Format

### Successful Rollback

```
Rollback Complete
================================================================

  Restored from: snap-2026-01-18T09-55-00
  Files restored: 7
    - _workspace/tracking/STATUS.md
    - _workspace/tracking/CHANGELOG.md
    - _workspace/features/active/my-feature/STATUS.md
    - [other files]

  Safety snapshot: snap-2026-01-18T12-00-00-pre-rollback
  (Use this to undo the rollback if needed)

================================================================
```

### Failed Rollback

```
Rollback Failed
================================================================

  Error: Snapshot not found: snap-2026-01-18T08-00-00

  Available snapshots:
    snap-2026-01-18T10-30-00 [manual]
    snap-2026-01-18T10-00-00 [checkpoint]
    snap-2026-01-18T09-55-00 [auto]

  Suggestion: Use /snapshot --list to see all snapshots

================================================================
```

---

## Options

| Option | Description |
|--------|-------------|
| (none) | Interactive mode |
| `snap-{id}` | Rollback to specific snapshot |
| `--dry-run` | Preview without executing |
| `--force` | Skip confirmations |

---

## Safety Features

1. **Safety Snapshot**: Always creates pre-rollback snapshot
2. **Confirmation**: Requires explicit confirmation
3. **Dry Run**: Preview mode available
4. **Audit Log**: All rollbacks logged

---

## Integration

This command integrates with:
- `history/snapshots/` - Snapshot storage
- `history/rollback.log` - Rollback history
- `/snapshot` command - Creates safety snapshots

---

## Workflow

```
/rollback
    |
    +-> List available snapshots
    |
    +-> User selects snapshot
    |
    +-> Create safety snapshot (automatic)
    |
    +-> Restore files from selected snapshot
    |
    +-> Log rollback action
    |
    +-> Report results
```

---

## See Also

- `/snapshot` - Create manual snapshots
- `/checkpoint` - Save progress (creates implicit snapshot)
