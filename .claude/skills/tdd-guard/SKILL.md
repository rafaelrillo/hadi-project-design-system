---
name: tdd-guard
description: TDD enforcement - tests before implementation
---

# TDD Guard Skill

> Enforcing Test-Driven Development practices

---

## When Active

This skill activates when:
- Creating new features
- Fixing bugs
- Any code changes
- Adding new components
- Modifying critical files

---

## The TDD Principle

> **Write FAILING test BEFORE implementation code.**

```
+-----------------------------------------------------------------------+
|                       TDD CYCLE                                        |
+-----------------------------------------------------------------------+
|                                                                       |
|        +----------+                                                   |
|        |  RED     |  1. Write failing test                            |
|        |  (fail)  |                                                   |
|        +----+-----+                                                   |
|             |                                                         |
|             v                                                         |
|        +----------+                                                   |
|        |  GREEN   |  2. Write minimum code to pass                    |
|        |  (pass)  |                                                   |
|        +----+-----+                                                   |
|             |                                                         |
|             v                                                         |
|        +----------+                                                   |
|        | REFACTOR |  3. Improve code, keep tests passing              |
|        +----+-----+                                                   |
|             |                                                         |
|             +------------------------------------------------+        |
|                                                              |        |
|                            (repeat)                          |        |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

## TDD Workflow

### Step 1: Write Failing Test (RED)

```bash
# Create test file first
# Example for JavaScript/TypeScript:
cat > src/__tests__/my-feature.test.ts << 'EOF'
describe('myFeature', () => {
  it('should produce expected output', () => {
    const result = myFeature('input')
    expect(result).toBe('expected_output')
  })
})
EOF
```

### Step 2: Run Test -> Verify FAIL

```bash
npm test
# Expected: FAIL (implementation doesn't exist)
```

### Step 3: Write Minimum Code to Pass (GREEN)

```typescript
// Now write implementation - minimum code to pass
export function myFeature(input: string): string {
  return 'expected_output'
}
```

### Step 4: Run Test -> Verify PASS

```bash
npm test
# Expected: PASS
```

### Step 5: Refactor if Needed

Improve the implementation while keeping tests green.

---

## What Qualifies as "Test First"

| Scenario | Test First Required? |
|----------|---------------------|
| New component | YES - at least 1 test |
| New function | YES - at least 1 test covering main path |
| Bug fix | YES - write test that reproduces bug first |
| Refactor | NO - existing tests should cover (but verify) |
| Documentation only | NO |

---

## Test Requirements

Minimum for any new component:

```
__tests__/
+-- my-component.test.ts    # At least 1 test
+-- fixtures/
    +-- valid-input.json    # At least 1 fixture
```

---

## Common Violations

### Violation 1: Implementation Without Test

```
WRONG:
1. Create implementation.ts
2. "I'll add tests later"

RIGHT:
1. Create implementation.test.ts (failing)
2. Create implementation.ts
3. Run test (passing)
```

### Violation 2: Test After Implementation

```
WRONG:
1. Write full implementation
2. Write tests that pass immediately

RIGHT:
1. Write test for first behavior (failing)
2. Implement just enough (passing)
3. Write test for next behavior (failing)
4. Implement (passing)
...
```

### Violation 3: Skipping Edge Cases

```
WRONG:
- Only test happy path

RIGHT:
- Test happy path
- Test error conditions
- Test edge cases
```

---

## Benefits of TDD

1. **Design Feedback**: Tests reveal design issues early
2. **Regression Safety**: Changes don't break existing behavior
3. **Documentation**: Tests document expected behavior
4. **Confidence**: Know when you're done
5. **Debugging**: Failures are localized

---

## Recovery

If you find yourself with untested code:

1. STOP adding features
2. Write tests for existing code
3. Get to green
4. Resume TDD for new code
