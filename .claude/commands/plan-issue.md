---
description: Generate an implementation plan from a GitHub Issue, post it on the issue, and wait for confirmation before any code
argument-hint: <issue-number> [owner/repo]
---

# /plan-issue

Generate an implementation plan from a GitHub Issue.

Arguments: $ARGUMENTS

## Usage

```text
/plan-issue <issue-number>
/plan-issue <issue-number> <owner/repo>
```

## Steps

1. Fetch the GitHub Issue using the `github` skill:
   - Title, description, labels, comments, linked PRs

2. Read the persistent spec for the relevant project (in the project repo):
   - `docs/` or `SPEC.md` if they exist
   - Skip if no spec exists yet

3. Invoke the **Plan Agent** to generate the implementation plan:
   - Summary of what will be built
   - Files to create / modify / delete (with reasoning)
   - Key decisions and trade-offs
   - Testing strategy
   - Acceptance criteria derived from the issue description

4. Post the plan as a comment on the GitHub Issue via the `github` skill.

5. Present the plan to the user for confirmation before any implementation starts.

## Output

- Comment posted on the GitHub Issue with the full plan
- Summary shown in the conversation

## Next step

Implement on a feature branch following `SPEC.md` R3. After implementation, run `/update-spec`.
