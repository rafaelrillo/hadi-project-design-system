# /sync Command

> Sync source files to build/output directory

---

## Usage

```bash
/sync              # Full sync with tests
/sync --check      # Dry run (show what would change)
/sync --force      # Skip test check (dangerous)
```

---

## When to Use

Use this command when your project has a **source -> build** pattern:

- `src/` -> `dist/`
- `core/` -> `build/`
- `source/` -> `output/`

This ensures only tested code makes it to the output.

---

## Implementation

When the `/sync` command is invoked:

### Step 1: Pre-flight Checks

```bash
# 1. Run all tests
echo "Running tests..."
npm test || ./run-tests.sh || {
    echo "BLOCKED: Tests failing. Fix tests before sync."
    exit 1
}

# 2. Check for uncommitted changes
if [[ -n $(git status --porcelain [SOURCE_DIR]/) ]]; then
    echo "WARNING: Uncommitted changes in [SOURCE_DIR]/"
    echo "Consider committing before sync."
fi
```

### Step 2: Perform Sync (if --check not specified)

```bash
if [[ "$1" != "--check" ]]; then
    # Clean output directory
    echo "Cleaning [OUTPUT_DIR]/..."
    rm -rf [OUTPUT_DIR]/*

    # Copy (excluding tests and dev files)
    echo "Copying [SOURCE_DIR]/ to [OUTPUT_DIR]/..."
    rsync -av \
        --exclude='__tests__' \
        --exclude='*.test.*' \
        --exclude='*.spec.*' \
        --exclude='fixtures/' \
        [SOURCE_DIR]/ [OUTPUT_DIR]/
fi
```

### Step 3: Report

```bash
echo ""
echo "Sync Report"
echo "================================================"
echo "Source: [SOURCE_DIR]/"
echo "Target: [OUTPUT_DIR]/"
echo ""
echo "Files synced: $(find [OUTPUT_DIR] -type f | wc -l)"
echo ""
echo "Excluded:"
echo "  - __tests__/ directories"
echo "  - *.test.* files"
echo "  - fixtures/"
echo "================================================"
```

---

## Configuration

Customize for your project by setting these in your CLAUDE.md:

```markdown
## Sync Configuration

| Setting | Value |
|---------|-------|
| Source | `src/` |
| Output | `dist/` |
| Test Command | `npm test` |
| Excluded | `__tests__/`, `*.test.*`, `fixtures/` |
```

---

## Options

| Option | Description |
|--------|-------------|
| (none) | Full sync with tests |
| `--check` | Dry run, show what would change |
| `--force` | Skip test check (dangerous!) |

---

## Workflow

```
/sync
  |
  +-> Run all tests
  |     |
  |     +-> FAIL: Block sync, show failures
  |     |
  |     +-> PASS: Continue
  |
  +-> Check uncommitted changes
  |     |
  |     +-> WARNING if present (but continue)
  |
  +-> Clean output directory
  |
  +-> Copy source -> output (exclude tests)
  |
  +-> Report results
```

---

## Exclusions

These are NEVER copied to output:
- `__tests__/` directories
- `*.test.*` files
- `*.spec.*` files
- `fixtures/` directories
- Development-only files

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Sync completed successfully |
| 1 | Sync blocked (tests failing) |

---

## Safety

The `/sync` command is designed to be SAFE:

1. **Test Gate**: Won't sync if tests fail
2. **Clean Target**: Removes old files before copying
3. **Exclude Tests**: No test code in output
4. **Dry Run**: `--check` to preview

**DANGER**: Using `--force` bypasses the test gate. Only use when you know what you're doing.
