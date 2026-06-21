# plan-issue

Generate an implementation plan from a GitHub Issue.

## Usage

```text
/plan-issue <issue-number>
/plan-issue <issue-number> <owner/repo>
```

## Steps

1. Read `AGENTS.md`, `SPEC.md`, and `docs/workflow.md`.
2. Fetch the GitHub Issue:
   - Title, description, labels, comments, linked PRs.
3. Read the relevant project spec:
   - Prefer the active project repo's `AGENTS.md`, `SPEC.md`, and `docs/`.
   - Skip missing docs without inventing project knowledge.
4. Generate a minimal implementation plan:
   - Summary of what will be built.
   - Files to create, modify, or delete, with reasoning.
   - Key decisions and trade-offs.
   - Testing strategy.
   - Acceptance criteria derived from the issue.
5. Post or draft the plan as a GitHub Issue comment.
6. Present the plan to the user and wait for confirmation before implementing.

## Output

- Plan comment posted or ready to post.
- Short summary in the conversation.
- Explicit confirmation gate before Build work starts.
