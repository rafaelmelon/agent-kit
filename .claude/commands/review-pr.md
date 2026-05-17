# /review-pr

Review a pull request against the project spec and acceptance criteria.

## Usage

```text
/review-pr <pr-number>
/review-pr <pr-number> <owner/repo>
```

## Steps

1. Fetch the PR using the `github` skill:
   - Title, description, diff, linked issues, comments

2. Read the project spec if it exists (`docs/`, `SPEC.md`).

3. Fetch the linked GitHub Issue (if referenced in the PR) to get the original ACs.

4. Invoke the **Review Agent** to assess:
   - Does the implementation match the acceptance criteria?
   - Are there spec violations (see `SPEC.md`)?
   - Code quality issues: type safety, error handling at system boundaries, security
   - Missing tests or type checks
   - Any undocumented decisions or architectural changes

5. Post the review as a GitHub PR review comment via the `github` skill.

6. Summary: approved / changes requested, with specific line-level comments.

## Review checklist

- [ ] ACs from the linked issue are all met
- [ ] TypeScript strict mode — no unexplained `any`
- [ ] No secrets or credentials in code or comments
- [ ] `.env.example` updated if new env vars were added
- [ ] Spec updated (or `/update-spec` is next step)
- [ ] Branch naming follows `SPEC.md` R3.1
- [ ] Commit messages follow Conventional Commits (`SPEC.md` R3.2)
