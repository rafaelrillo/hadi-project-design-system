---
name: workflow-stages
description: Multi-stage processing patterns and workflow transitions
---

# Workflow Stages Skill

> Understanding multi-stage processing patterns and transitions.

---

## When Active

This skill activates when:
- Designing multi-step workflows
- Creating processing pipelines
- Debugging flow issues
- Adding new workflow stages
- Understanding execution order

---

## Generic Workflow Pattern

```
+-----------------------------------------------------------------------+
|                    MULTI-STAGE WORKFLOW                                |
+-----------------------------------------------------------------------+
|                                                                       |
|  START                                                                |
|    |                                                                  |
|    v                                                                  |
|  +------------------+                                                 |
|  | Stage 1: INTAKE  |  Receive input, validate, route                 |
|  +--------+---------+                                                 |
|           |                                                           |
|           v                                                           |
|  +------------------+                                                 |
|  | Stage 2: ANALYZE |  Parse input, extract information               |
|  +--------+---------+                                                 |
|           |                                                           |
|           v                                                           |
|  +------------------+                                                 |
|  | Stage 3: PROCESS |  Core business logic, transformations           |
|  +--------+---------+                                                 |
|           |                                                           |
|           v                                                           |
|  +------------------+                                                 |
|  | Stage 4: VALIDATE|  Check outputs, ensure quality                  |
|  +--------+---------+                                                 |
|           |                                                           |
|           v                                                           |
|  +------------------+                                                 |
|  | Stage 5: OUTPUT  |  Format results, update state                   |
|  +--------+---------+                                                 |
|           |                                                           |
|           v                                                           |
|        DONE                                                           |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

## Stage Responsibilities

### Stage 1: Intake

**Purpose**: Entry point, input detection, routing
**Input**: User request, external event
**Output**: Validated input, routing decision

**Functions**:
- Detect input type
- Validate format
- Route to appropriate flow

---

### Stage 2: Analyze

**Purpose**: Parse and understand input
**Input**: Validated input from Stage 1
**Output**: Structured analysis

**Functions**:
- Extract key information
- Identify requirements
- Determine scope

---

### Stage 3: Process

**Purpose**: Core business logic
**Input**: Analysis from Stage 2
**Output**: Processed results

**Functions**:
- Execute transformations
- Apply business rules
- Generate outputs

---

### Stage 4: Validate

**Purpose**: Quality assurance
**Input**: Results from Stage 3
**Output**: Validated results or errors

**Functions**:
- Check output correctness
- Verify constraints met
- Flag issues

---

### Stage 5: Output

**Purpose**: Finalize and deliver
**Input**: Validated results
**Output**: Final output, state updates

**Functions**:
- Format output
- Update tracking
- Notify downstream

---

## Stage Transitions

```
+---------------------------------------------------------------+
|  FROM          TO              CONDITION                       |
+---------------------------------------------------------------+
|  Stage 1    -> Stage 2        Input valid                      |
|  Stage 1    -> ERROR          Input invalid                    |
|  Stage 2    -> Stage 3        Analysis complete                |
|  Stage 3    -> Stage 4        Processing complete              |
|  Stage 3    -> Stage 2        Needs re-analysis (loop)         |
|  Stage 4    -> Stage 5        Validation passed                |
|  Stage 4    -> Stage 3        Validation failed (retry)        |
|  Stage 5    -> DONE           Output complete                  |
+---------------------------------------------------------------+
```

---

## Skip Conditions

Some stages can be skipped based on context:

| Stage | Skip When |
|-------|-----------|
| Analyze | Input is already structured |
| Process | No transformation needed |
| Validate | Trusted source, low risk |

**Output stage is NEVER skipped.**

---

## Exit Codes

| Code | Meaning | Action |
|------|---------|--------|
| 0 | Success | Continue to next stage |
| 1 | Error | Halt workflow, report |
| 2 | Skip | Jump to next eligible stage |
| 3 | Retry | Re-run current stage |

---

## State Flow

```
Context flows through stages:

Stage 1 -> context: { input, routing }
Stage 2 -> context: { ..., analysis }
Stage 3 -> context: { ..., results }
Stage 4 -> context: { ..., validation }
Stage 5 -> context: { ..., output }
```

---

## Debugging Workflows

When debugging workflow issues:
1. Check which stage failed (exit code)
2. Examine input context to that stage
3. Verify prerequisites met
4. Check state for corruption

---

## Workflow Patterns

### Linear Flow
```
A -> B -> C -> D
```

### Conditional Flow
```
A -> B -> [condition] -> C1 or C2 -> D
```

### Loop Flow
```
A -> B -> C -> [validate] -> B (if failed)
                          -> D (if passed)
```

### Parallel Flow
```
A -> [B1, B2, B3] -> C (join)
```
