# /snapshot Command

> Create a manual state snapshot for rollback support.

---

## Usage

```bash
/snapshot                    # Create snapshot with auto-generated ID
/snapshot "reason"           # Create snapshot with note
/snapshot --list             # List recent snapshots
/snapshot --list -n 20       # List more snapshots
```

---

## Implementation

When the `/snapshot` command is invoked:

### Step 1: Generate Snapshot ID

```yaml
timestamp: "$(date -u +%Y-%m-%dT%H-%M-%S)"
snapshot_id: "snap-{timestamp}"
snapshot_path: "history/snapshots/{snapshot_id}/"
```

### Step 2: Create Directory Structure

```bash
mkdir -p "history/snapshots/${snapshot_id}"
```

### Step 3: Capture State

```yaml
# Files to capture (if they exist):
CAPTURE:
  - _workspace/tracking/STATUS.md
  - _workspace/tracking/CHANGELOG.md
  - _workspace/features/active/*/STATUS.md
  - [other critical state files]

# Copy each file preserving structure:
FOR each file in CAPTURE:
  IF exists(file):
    cp {file} history/snapshots/{snapshot_id}/{file}
    ADD to captured_files[]
```

### Step 4: Generate meta.yaml

```yaml
Write: history/snapshots/{snapshot_id}/meta.yaml

snapshot_id: "{snapshot_id}"
created_at: "{ISO_TIMESTAMP}"
trigger: "manual"
context:
  user_note: "{argument or 'Manual snapshot'}"
captured:
  - {list of captured files}
retention:
  protected: true  # Manual snapshots are protected from cleanup
```

### Step 5: Log Creation

```bash
echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) | MANUAL | ${snapshot_id} | ${user_note} | CREATED" >> history/rollback.log
```

### Step 6: Report

```yaml
OUTPUT:
  message: "Snapshot created: {snapshot_id}"
  path: "history/snapshots/{snapshot_id}/"
  files_captured: N
  protected: true
```

---

## List Mode (--list)

When `/snapshot --list` is invoked:

```bash
echo "Recent Snapshots"
echo "================================================================"
echo ""

# List snapshots sorted by date (newest first)
for dir in $(ls -t history/snapshots/ 2>/dev/null | head -${count:-10}); do
    if [[ -f "history/snapshots/$dir/meta.yaml" ]]; then
        trigger=$(grep "trigger:" "history/snapshots/$dir/meta.yaml" | cut -d: -f2 | tr -d ' "')
        note=$(grep "user_note:" "history/snapshots/$dir/meta.yaml" | cut -d: -f2 | tr -d ' "')

        printf "%-35s %-12s %s\n" "$dir" "[$trigger]" "${note:-(no note)}"
    fi
done

echo ""
echo "================================================================"
echo "Total: $(ls history/snapshots/ 2>/dev/null | wc -l | tr -d ' ') snapshots"
```

---

## Output Format

### Creation Output

```
Snapshot created: snap-2026-01-18T10-30-00

  Path: history/snapshots/snap-2026-01-18T10-30-00/
  Files captured: 7
  Protected: true (manual snapshots)

  Note: "Before major refactoring"

To rollback to this snapshot:
  /rollback snap-2026-01-18T10-30-00
```

### List Output

```
Recent Snapshots
================================================================

snap-2026-01-18T10-30-00       [manual]      Before major refactoring
snap-2026-01-18T10-00-00       [checkpoint]  (no note)
snap-2026-01-18T09-55-00       [auto]        Pre-feature change
snap-2026-01-18T09-30-00       [manual]      (no note)

================================================================
Total: 4 snapshots
```

---

## Options

| Option | Description |
|--------|-------------|
| (none) | Create snapshot with auto ID |
| `"reason"` | Create snapshot with note |
| `--list` | List recent snapshots |
| `-n N` | With --list, show N snapshots (default 10) |

---

## Integration

This command integrates with:
- `history/snapshots/` - Snapshot storage
- `history/rollback.log` - Rollback history
- `/rollback` command - For restoring snapshots

---

## Retention

Manual snapshots are **protected by default**:
- Not automatically cleaned up
- Must be manually deleted
- Persist until explicitly removed

To remove a snapshot manually:
```bash
rm -rf history/snapshots/snap-{id}
```

---

## See Also

- `/rollback` - Restore from snapshot
