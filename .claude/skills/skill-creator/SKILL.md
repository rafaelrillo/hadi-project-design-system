---
name: skill-creator
description: Guide for creating effective skills. Use when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
---

## Overview

This skill guides the creation of effective Agent Skills that extend Claude's capabilities. Skills are modular, reusable components that teach Claude how to perform specialized tasks.

## When to Use This Skill

Activate when the user:

- Wants to create a new skill
- Needs to update an existing skill
- Asks about skill best practices
- Wants to package knowledge for reuse

## Skill Structure

```
.claude/skills/{skill-name}/
+-- SKILL.md           # Required: Main instructions
+-- references/        # Optional: Documentation files
|   +-- api-docs.md
|   +-- examples.md
+-- scripts/           # Optional: Helper scripts
|   +-- setup.sh
|   +-- validate.py
+-- config/            # Optional: Configuration files
    +-- defaults.json
```

## SKILL.md Format

### Required Frontmatter

```yaml
---
name: my-skill-name
description: One-line description of when this skill activates. Be specific about triggers.
---
```

### Best Practices for Frontmatter

**name**:
- Use kebab-case (e.g., `react-testing`, `api-design`)
- Keep it short and descriptive
- Avoid generic names like "helper" or "utils"

**description**:
- Start with action verb: "Activates when...", "Use for...", "Guides..."
- Be specific about triggers: "when user asks about X", "when working with Y"
- Include keywords users might use

### Content Structure

1. **Overview** - What this skill does (2-3 sentences)
2. **When to Use** - Specific activation triggers
3. **Instructions** - Step-by-step guidance
4. **Examples** - Concrete usage examples
5. **Guidelines** - Do's and don'ts

## Writing Effective Instructions

### Be Specific, Not Vague

```markdown
# Bad
Help the user with React.

# Good
When creating React components:
1. Use functional components with hooks
2. Follow the naming convention: PascalCase for components
3. Place in src/components/{feature}/ directory
4. Include PropTypes or TypeScript interfaces
```

### Include Decision Trees

```markdown
## Component Type Selection

If the component:
- Has no state -> Create as pure function
- Has local state only -> Use useState
- Needs lifecycle -> Use useEffect
- Shares state globally -> Use context or state library
```

### Provide Templates

```markdown
## Component Template

\`\`\`tsx
interface ${ComponentName}Props {
  // Define props here
}

export function ${ComponentName}({ ...props }: ${ComponentName}Props) {
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
\`\`\`
```

## Skill Categories

Choose the most appropriate category:

| Category | Use For |
|----------|---------|
| `coding` | Programming patterns, languages |
| `testing` | Test strategies, frameworks |
| `devops` | CI/CD, deployment, infrastructure |
| `frontend` | UI, React, CSS, accessibility |
| `backend` | APIs, databases, servers |
| `documentation` | Writing docs, comments |
| `automation` | Workflows, scripts |
| `knowledge-base` | Domain knowledge |

## Quality Checklist

Before finalizing a skill, verify:

- [ ] Frontmatter has valid `name` and `description`
- [ ] Description clearly states activation triggers
- [ ] Instructions are actionable, not philosophical
- [ ] Examples show real usage scenarios
- [ ] No sensitive data (API keys, passwords)
- [ ] File size under 50KB (smaller is better)
- [ ] References are organized in `references/` folder

## Common Mistakes to Avoid

1. **Too broad**: "Helps with coding" -> Be specific
2. **Too narrow**: Only works for one edge case
3. **No examples**: Abstract instructions without concrete usage
4. **Conflicting rules**: Instructions that contradict each other
5. **Outdated info**: References to deprecated APIs/patterns

## Testing Your Skill

1. Save to `.claude/skills/{name}/SKILL.md`
2. Start a new Claude conversation
3. Ask questions that should trigger the skill
4. Verify Claude follows the instructions
5. Iterate based on results

## Sharing Skills

To share a skill:

1. Create a GitHub repository
2. Place skill files in `.claude/skills/{name}/`
3. Add a README explaining the skill
4. Submit to skillsmp.com (optional)
