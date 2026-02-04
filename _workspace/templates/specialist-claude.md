# [Subsystem Name] Specialist

> Specialized Claude instance for [domain/subsystem] development.

---

## Scope

**CRITICAL**: This instance ONLY works within `[project]/[subsystem]/`.

### Allowed Operations

| Operation | Allowed | Path |
|-----------|---------|------|
| Read | Yes | `[subsystem]/` only |
| Write | Yes | `[subsystem]/` only |
| Edit | Yes | `[subsystem]/` only |
| Bash | Limited | Within `[subsystem]/` |

### Forbidden Operations

- **NEVER** modify files outside `[subsystem]/`
- **NEVER** modify root CLAUDE.md
- **NEVER** modify root tracking files

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Tech 1] | [Version] | [Purpose] |
| [Tech 2] | [Version] | [Purpose] |
| [Tech 3] | [Version] | [Purpose] |

---

## MCP Servers (Optional)

If this specialist needs MCP servers:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

Available MCPs:
- **context7** - Up-to-date documentation
- **prompts-chat** - Skill discovery
- [Add domain-specific MCPs as needed]

---

## Commands

### Available Commands

| Command | Description |
|---------|-------------|
| `/status` | Show subsystem status |
| `/test` | Run subsystem tests |
| `/build` | Build subsystem |

### Custom Commands (Optional)

Add subsystem-specific commands in `.claude/commands/` within this folder.

---

## Tracking

### Local Tracking

This specialist maintains its own tracking:

```
[subsystem]/
+-- _workspace/
    +-- tracking/
        +-- STATUS.md
        +-- CHANGELOG.md
```

### Parent Coordination

For cross-system work, coordinate with parent through tickets:
1. Create ticket in parent's `_workspace/tickets/`
2. Reference subsystem work
3. Update when complete

---

## Quality Standards

### Before Committing

- [ ] Tests pass: `npm test` (or equivalent)
- [ ] Build succeeds: `npm run build` (or equivalent)
- [ ] No linting errors
- [ ] Types are complete (if TypeScript)

### Coding Conventions

1. [Convention 1]
2. [Convention 2]
3. [Convention 3]

---

## Directory Structure

```
[subsystem]/
+-- CLAUDE.md           # This file
+-- package.json        # Dependencies
+-- src/                # Source code
+-- dist/               # Build output
+-- __tests__/          # Tests
+-- _workspace/         # Local workspace
    +-- tracking/       # Local tracking
    |   +-- STATUS.md
    |   +-- CHANGELOG.md
    +-- tickets/        # Local tickets (optional)
```

---

## Starting a Session

1. `cd [project]/[subsystem]`
2. `claude`
3. Run `/status` to see current state
4. Work on assigned tasks
5. Run `/checkpoint` before ending

---

## Communication with Parent

### Requesting Help

If blocked or need parent decision:

1. Update `_workspace/tracking/STATUS.md` with blocker
2. Note: "Requires parent input: [description]"
3. End session

### Reporting Completion

When subsystem work is complete:

1. Update `_workspace/tracking/STATUS.md`
2. Mark related ticket complete if any
3. Run `/checkpoint`

---

## Meta

- **Version**: 1.0.0
- **Created**: [DATE]
- **Parent**: [PROJECT_NAME]
- **Domain**: [DOMAIN]
