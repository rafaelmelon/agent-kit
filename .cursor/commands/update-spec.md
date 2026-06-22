# update-spec

Sync the persistent project spec after a completed feature or fix.

## Usage

```text
/update-spec
```

## Steps

1. Read `AGENTS.md`, `SPEC.md`, and `docs/workflow.md`.
2. Determine the active project from the working directory or branch.
3. Find the current project spec:
   - `SPEC.md`
   - `docs/SPEC.md`
   - `docs/architecture.md`
   - other clearly named project docs
4. Inspect what changed:
   - Git diff against the base branch.
   - Changed files and implementation summary.
5. Identify gaps between the current spec and implementation.
6. Draft snapshot-style spec updates:
   - Present tense.
   - No changelog entries.
   - No speculative future plans.
7. Present proposed updates for user review.
8. Apply approved updates only.

## Output

- Proposed spec updates by section.
- Applied spec changes after approval.
- Suggested commit message:

```text
docs(<project>): update spec after <feature-slug>
```
