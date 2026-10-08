---
description: Sync the project spec with what was actually built after a feature or fix
argument-hint: [feature-slug]
---

# /update-spec

Sync the persistent spec for the current project after a completed feature or fix.

Arguments: $ARGUMENTS

This command is **mandatory** after every development cycle. The spec must reflect the current state of the project — not what was planned, but what was built.

## Steps

1. Determine the current project from the working directory or active branch name.

2. Check if a spec exists:
   - Look for `docs/`, `SPEC.md`, or `docs/architecture.md` in the project root
   - If none exists, offer to create an initial spec

3. Inspect what changed:
   - Review the git diff against the base branch
   - Identify which features, components, or integrations were added or modified

4. Invoke the **Spec Divergence Agent** to:
   - Identify gaps between the current spec and the implementation
   - Draft updates for each section that changed
   - Flag any decisions made during implementation that are not yet documented

5. Present the proposed spec updates to the user for review.

6. Apply approved updates.

7. Commit the spec update:
   ```text
   docs(<project>): update spec after <feature-slug>
   ```

## What to update

- **Features**: add the new feature with its ACs and current status
- **Architecture**: update if new patterns, integrations, or data model changes were introduced
- **Tech stack**: update if new dependencies were added
- **Open questions**: resolve answered ones; add new ones surfaced during implementation

## What NOT to update

- Do not add implementation details that belong in code comments
- Do not record "what changed this cycle" — the spec is a snapshot, not a changelog
- Git log is the history; the spec is the current state
