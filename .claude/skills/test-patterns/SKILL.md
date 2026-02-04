---
name: test-patterns
description: Testing conventions, structure, and best practices
---

# Test Patterns Skill

> Testing conventions, structure, and best practices

---

## CRITICAL: Real Tests vs Simulations

> **Tests that pass with fake data are NOT tests. They're simulations.**

| Type | What It Does | Value |
|------|--------------|-------|
| Mock Test | Checks with fake data | Low - only catches format errors |
| **Real Test** | Validates REAL system state | **HIGH - catches real bugs** |

**ALWAYS prefer tests that use real data over tests with fixtures when possible.**

---

## When Active

This skill activates when:
- Creating or modifying tests
- Adding new components
- Validating coverage
- Debugging test failures
- After ANY code changes

---

## Test Hierarchy (Priority Order)

```
1. FUNCTIONAL/INTEGRATION TESTS (highest priority)
   +-- Validate real behavior
   +-- Test actual system state
   +-- Regression tests

2. UNIT TESTS
   +-- Isolated component tests
   +-- Fast feedback

3. FIXTURE-BASED TESTS (lowest priority)
   +-- Schema validation
   +-- Format checking
```

---

## Test Structure

```
src/
+-- components/
|   +-- MyComponent/
|       +-- index.ts
|       +-- __tests__/
|           +-- MyComponent.test.ts    # Unit tests
|           +-- MyComponent.int.test.ts # Integration tests
|           +-- fixtures/
|               +-- valid-input.json
```

### Location Patterns

| Test Type | Location |
|-----------|----------|
| Unit | `__tests__/*.test.ts` |
| Integration | `__tests__/*.int.test.ts` |
| E2E | `e2e/*.e2e.test.ts` |

---

## Naming Conventions

### Test Files

```bash
# Unit tests
my-component.test.ts
my-feature.test.ts

# Integration tests
my-component.int.test.ts
api-flow.int.test.ts

# E2E tests
user-journey.e2e.test.ts
```

### Test Cases

```typescript
describe('MyComponent', () => {
  it('should render with default props', () => {})
  it('should handle click events', () => {})
  it('should display error state when API fails', () => {})
})
```

---

## Test Template

```typescript
// my-feature.test.ts
import { myFeature } from '../my-feature'

describe('myFeature', () => {
  // Arrange
  const input = { /* test data */ }

  it('should produce expected output for valid input', () => {
    // Act
    const result = myFeature(input)

    // Assert
    expect(result).toEqual(expectedOutput)
  })

  it('should handle edge case X', () => {
    // Arrange
    const edgeInput = { /* edge case data */ }

    // Act & Assert
    expect(() => myFeature(edgeInput)).toThrow('Expected error')
  })
})
```

---

## Fixtures

### JSON Format

```json
// fixtures/valid-input.json
{
  "name": "test-project",
  "type": "library"
}
```

### Using Fixtures

```typescript
import validInput from './fixtures/valid-input.json'

describe('myFeature', () => {
  it('should process valid input', () => {
    const result = myFeature(validInput)
    expect(result).toBeDefined()
  })
})
```

---

## Running Tests

```bash
# All tests
npm test

# Specific file
npm test -- my-feature.test.ts

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

---

## Coverage Tracking

Aim for these minimums:

```yaml
minimum_coverage:
  statements: 80%
  branches: 70%
  functions: 80%
  lines: 80%
```

---

## TDD Flow

```
1. Write failing test FIRST
2. Run test -> verify FAIL
3. Write minimum code to pass
4. Run test -> verify PASS
5. Refactor if needed
6. Run test -> still PASS
```

---

## Common Patterns

### Testing Async Code

```typescript
it('should fetch data', async () => {
  const result = await fetchData()
  expect(result).toBeDefined()
})
```

### Testing Errors

```typescript
it('should throw on invalid input', () => {
  expect(() => myFeature(invalidInput)).toThrow('Invalid input')
})
```

### Testing Side Effects

```typescript
it('should call callback', () => {
  const mockCallback = jest.fn()
  myFeature(input, mockCallback)
  expect(mockCallback).toHaveBeenCalledWith(expectedArg)
})
```

---

## Anti-Patterns

1. **Testing implementation, not behavior**
2. **Too many mocks** - test real behavior when possible
3. **Flaky tests** - fix or delete them
4. **Slow tests** - optimize or move to integration suite
5. **No assertions** - every test must assert something
