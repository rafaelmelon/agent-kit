# fix-review

Close one review round on a pull request.

## Usage

```text
/fix-review <pr-number>
/fix-review <pr-number> <owner/repo>
```

## Steps

1. Read `AGENTS.md`, `SPEC.md`, and `docs/workflow.md`.
2. Collect the items the last review raised: PR review comments, unresolved
   threads, and any review report in this chat.
3. Present one line per item with its intended outcome (fix / follow-up issue /
   no change, with reason). Wait for confirmation.
4. Work on the PR branch in its own worktree. Rebase on the base branch first
   if it is behind.
5. Fix the confirmed items with the smallest change. Run type check, lint and
   tests.
6. Create agreed follow-up issues with `gh issue create`. Never cite an issue
   that does not exist.
7. Commit and push after confirmation.
8. Draft one reply per item, starting with `**Round <N> — response**`, and show
   them before posting.
9. Close the round: every item with its outcome, and which reasons behind the
   last verdict are gone.

## Rules

- Fix only what the round raised. Anything new becomes a follow-up issue,
  except a defect that breaks a live flow on merge: that is fixed now, or the
  PR waits. The user decides.
- Never merge, approve, or resolve another person's thread.
- Never push or post without explicit confirmation.
