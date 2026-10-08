---
description: Review a GitHub pull request against its issue's acceptance criteria, the project spec and SPEC.md, verifying blocking findings before reporting
argument-hint: <pr-number> [owner/repo]
---

# /review-pr

Review a pull request against the project spec and acceptance criteria.

Arguments: $ARGUMENTS

## Usage

```text
/review-pr <pr-number>
/review-pr <pr-number> <owner/repo>
```

## Steps

0. **Independence check.** If this conversation planned or wrote the change, stop and recommend running the review in a fresh session. Continue only if the user insists, and mark the review "not independent".

1. Fetch the PR using the `github` skill:
   - Title, description, diff, linked issues, comments, CI status (`gh pr checks`)

2. Read the project spec if it exists (`docs/`, `SPEC.md`).

3. Fetch the linked GitHub Issue (if referenced in the PR) to get the original ACs.

4. Choose the depth from the diff size and state it in the report:
   - **Lean** (≤ ~150 changed lines): one inline pass with the review checklist.
   - **Deep** (larger, or touching auth, payments, migrations or RLS): delegate to the **Review Agent**, plus a second pass focused on failure paths and security.

5. Invoke the **Review Agent** to assess:
   - Does the implementation match the acceptance criteria?
   - Does each AC have a test at a layer that can observe it (`test-rules` skill)?
   - Are there spec violations (see `SPEC.md`)?
   - Code quality issues: type safety, error handling at system boundaries, security
   - Any undocumented decisions or architectural changes

6. **Verify** every blocking finding by trying to refute it (Review Agent, "Verify before you report"). Drop refuted findings and say how many were dropped.

7. **Fact-check the report** before showing it: every `file:line` resolves, every named function or flag exists, CI claims match `gh pr checks`, and the decision matches the findings.

8. Show the review to the user. Post it as a GitHub PR review only after the user approves the text.

## Review checklist

- [ ] ACs from the linked issue are all met, each with a test
- [ ] TypeScript strict mode — no unexplained `any`
- [ ] No secrets or credentials in code or comments
- [ ] `.env.example` updated if new env vars were added
- [ ] RLS on every new table; migrations follow `SPEC.md` R9
- [ ] Spec updated (or `/update-spec` is next step)
- [ ] Branch naming follows `SPEC.md` R3.1
- [ ] Commit messages follow Conventional Commits (`SPEC.md` R3.2)

## Next step

If changes are requested, run `/fix-review <pr-number>` to close this round.
