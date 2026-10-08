# review-pr

Review a pull request against the project spec and acceptance criteria.

## Usage

```text
/review-pr <pr-number>
/review-pr <pr-number> <owner/repo>
```

## Steps

0. If this chat planned or wrote the change, recommend a fresh chat for the
   review (`SPEC.md` R8.7). Continue only if the user insists, and mark the
   review "not independent".
1. Read `AGENTS.md`, `SPEC.md`, `docs/workflow.md`, and
   `.claude/agents/review-agent.md`.
2. Fetch the PR:
   - Title, description, diff, changed files, comments, reviews.
3. Fetch the linked GitHub Issue when referenced.
4. Read the active project spec and relevant docs.
5. Review for:
   - Acceptance criteria coverage.
   - Spec violations.
   - Type safety and error handling.
   - Security issues at system boundaries.
   - Missing or weak tests (`.claude/skills/test-rules/SKILL.md`).
   - Unwanted scope creep.
6. Verify each blocking finding by trying to refute it; drop refuted ones.
7. Fact-check the report: anchors resolve, named code exists, CI claims
   match `gh pr checks`.
8. Show the review, and post it only after the user approves.

## Output

Lead with findings, ordered by severity. Include file and line references when
available.

Use this shape:

1. **Decision**: Approved / Changes Requested.
2. **Blocking issues**: must fix before merge.
3. **Non-blocking notes**: useful but optional.
4. **Missing**: unmet ACs or verification gaps.

Do not request changes for personal style preferences unless they violate
`SPEC.md` or the project spec.
