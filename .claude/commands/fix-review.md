---
description: Close one review round on a pull request — fix the findings that round raised, route anything new to a follow-up issue, and reply to every item
argument-hint: <pr-number> [owner/repo]
---

# /fix-review

Close the items a review raised on a pull request, so the next review finds the change safer than the last one did.

Arguments: $ARGUMENTS

## Usage

```text
/fix-review <pr-number>
/fix-review <pr-number> <owner/repo>
```

## Principles

- **Close this round; do not open a new one.** The work is the items the last review raised. Hunting for more defects is a review, and belongs to the next `/review-pr`.
- **Something new becomes a follow-up issue.** A defect you notice on the way, or a request nobody foresaw, gets its own GitHub Issue (after the user agrees), and the reply links it. Exception: a defect that breaks a live flow as soon as the PR merges is fixed now, or the PR does not merge. Let the user make that call.
- **Stay inside the issue.** Real but unrelated findings are answered with a follow-up, not fixed here.

## Steps

1. Collect the items: review comments and unresolved threads (`gh pr view <n> --comments`, `gh api repos/{owner}/{repo}/pulls/<n>/comments`), plus any review report from this conversation.
2. Present a plan: one line per item with the intended outcome (fix / follow-up / no change, with reason). Wait for the user's confirmation.
3. Check out the PR branch in its own worktree (`SPEC.md` R8.3). Rebase on the base branch first if it is behind.
4. Fix the confirmed items, smallest change first. Run type check, lint and tests.
5. Create the agreed follow-up issues with `gh issue create`. Never mention an issue number you did not create.
6. Commit and push, after the user confirms.
7. Draft one reply per item, starting with `**Round <N> — response**`, and show them to the user before posting. Never resolve a thread opened by someone else.
8. Close the round: list every item with its outcome, and say which reasons for the previous verdict are gone and which remain.

## Never

- Merge, approve, or resolve another person's thread
- Widen a fix into the surrounding code
- Push or post without explicit confirmation
