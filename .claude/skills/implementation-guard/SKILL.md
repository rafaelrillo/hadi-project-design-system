---
name: implementation-guard
description: Prevents skill bypass during feature implementation. MANDATORY before writing code.
activation: automatic
triggers:
  - /feature take
  - implementing features
  - writing implementation code
---

# Implementation Guard Skill

> **MANDATORY**: This skill activates BEFORE any implementation code is written.

---

## Purpose

Prevent Claude instances from bypassing skills by:
1. Ensuring required skills are READ and UNDERSTOOD
2. Enforcing TDD cycle with VERIFIABLE checkpoints
3. Blocking implementation until prerequisites are met

---

## When This Activates

This skill is **MANDATORY** when:
- Running `/feature take <name>`
- Starting implementation of any feature
- Writing new code files
- Creating new components

---

## Pre-Implementation Protocol

### Step 1: Load Required Skills

When `/feature take` is executed:

```bash
# 1. Read feature's STATUS.md
# 2. Extract required_skills list
# 3. Read EACH skill file
# 4. Confirm understanding
```

### Step 2: Skill Verification (NOT CHECKBOXES)

For each required skill, you MUST be able to answer:

**TDD Guard Verification:**
- Q: What is the TDD cycle?
- A: RED (failing test) → GREEN (minimal code) → REFACTOR

- Q: What must exist BEFORE writing implementation?
- A: A failing test

- Q: What is a TDD violation?
- A: Writing implementation before a failing test exists

**Test Patterns Verification:**
- Q: Where do tests go?
- A: [Depends on project - check skill]

- Q: What's the naming convention?
- A: [Depends on project - check skill]

**If you cannot answer → READ THE SKILL AGAIN.**

---

## TDD Enforcement Protocol

### The Cycle (MUST FOLLOW)

```
┌─────────────────────────────────────────────────────────────────┐
│                     TDD CYCLE - MANDATORY                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. WRITE ONE TEST                                              │
│     └── Test for ONE specific behavior                          │
│                                                                 │
│  2. RUN TEST → MUST FAIL                                        │
│     └── Show output proving it fails                            │
│     └── If it passes, test is wrong or code already exists      │
│                                                                 │
│  3. WRITE MINIMAL CODE                                          │
│     └── Just enough to make THIS test pass                      │
│     └── No extra features, no "while I'm here" additions        │
│                                                                 │
│  4. RUN TEST → MUST PASS                                        │
│     └── Show output proving it passes                           │
│                                                                 │
│  5. REFACTOR (optional)                                         │
│     └── Only if needed                                          │
│     └── Tests must still pass after                             │
│                                                                 │
│  6. REPEAT for next behavior                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### VERIFICATION CHECKPOINTS (Verifiable, not checkboxes)

| Checkpoint | How to Verify | STOP if... |
|------------|---------------|------------|
| Test exists | ls tests/ shows test file | No test file exists |
| Test fails | pytest output shows FAILED | Test passes (wrong test) |
| Code minimal | Only addresses current test | Code does more than needed |
| Test passes | pytest output shows PASSED | Test still fails |

---

## Anti-Patterns to Block

### 1. "Copy from Docs" Pattern

```
✗ WRONG: Read feature doc → Copy all code → Run tests → "Done"
✓ RIGHT: Read feature doc → Write ONE test → Fail → Implement → Pass → Repeat
```

### 2. "Write All Tests First" Pattern

```
✗ WRONG: Write all 11 tests → Write all implementation → Run tests
✓ RIGHT: Write test 1 → Fail → Implement → Pass → Write test 2 → ...
```

### 3. "Tests After" Pattern

```
✗ WRONG: Write implementation → Write tests that pass
✓ RIGHT: Write test → Verify FAIL → Write implementation → Verify PASS
```

---

## Implementation Workflow

### For Each Feature:

```
/feature take <name>
        │
        ▼
┌───────────────────────┐
│ 1. Read STATUS.md     │
│ 2. Get required_skills│
│ 3. Read each skill    │
│ 4. Answer verification│
│    questions          │
└───────────────────────┘
        │
        ▼
┌───────────────────────┐
│ 5. Identify FIRST     │
│    behavior to test   │
└───────────────────────┘
        │
        ▼
┌───────────────────────┐
│ 6. Write ONE test     │
│ 7. Run → Show FAIL    │
│ 8. Implement minimal  │
│ 9. Run → Show PASS    │
│ 10. Repeat 6-9        │
└───────────────────────┘
        │
        ▼
┌───────────────────────┐
│ 11. All behaviors     │
│     tested & passing  │
│ 12. /feature complete │
└───────────────────────┘
```

---

## Feature Docs Are SPECS, Not CODE

```
┌─────────────────────────────────────────────────────────────────┐
│                    MINDSET SHIFT                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Feature documentation contains:                                │
│                                                                 │
│  ✓ WHAT behavior is expected         (use as test specs)       │
│  ✓ WHAT the output should look like  (use as assertions)       │
│  ✓ WHAT files should exist           (use as targets)          │
│                                                                 │
│  ✗ NOT code to copy-paste                                      │
│  ✗ NOT implementation to reproduce                             │
│                                                                 │
│  The docs tell you WHAT. The skills tell you HOW.               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference Card

**BEFORE WRITING ANY CODE, ASK:**

1. Did I run /feature take?
   └── NO: Run it first

2. Did I read the required_skills?
   └── NO: Read them now

3. Does a FAILING test exist for what I'm about to write?
   └── NO: Write the test first, run it, verify it FAILS

4. Am I writing MORE than needed to pass the current test?
   └── YES: Stop, only write what's needed

5. After implementation, did the test PASS?
   └── NO: Fix implementation
   └── YES: Proceed to next test

---

## Recovery

If you find yourself with implementation but no failing test history:

1. STOP writing more code
2. Document what was written without TDD
3. Write tests for existing code (retroactive)
4. Resume TDD for remaining work
5. Note in PR/commit that partial TDD was followed
