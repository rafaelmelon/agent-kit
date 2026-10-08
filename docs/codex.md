# Codex Setup

Codex compatibility is centered on `AGENTS.md`. Keep that file clear and
provider-neutral so Codex can use it as the primary project contract.

## How To Use

When working with Codex:

1. Open the project repo and this toolkit in the same workspace when possible.
2. Ask Codex to read `rafaelmelon-ai/AGENTS.md`, `SPEC.md`, and
   `docs/workflow.md` before starting a workflow.
3. Use workflow names directly when slash commands are not available:
   - `plan-issue <number>`
   - `update-spec`
   - `review-pr <number>`
   - `fix-review <number>`
4. Keep project-specific knowledge in the project repo, not in this toolkit.

## Codex Behavior Contract

Codex should:

- Treat `AGENTS.md` as the neutral entrypoint.
- Follow `SPEC.md` unless the active project repo has a more specific rule.
- Read existing files before editing.
- Keep edits scoped to the confirmed task.
- Avoid reading `.env` files; read `.env.example` only.
- Run type check, lint, and tests when available after implementation.
- Never push, merge, or close PRs without explicit user confirmation.

## Workflows Without Slash Commands

If a Codex session cannot discover native slash commands, use direct prompts:

```text
Run the rafaelmelon-ai plan-issue workflow for issue 42.
Read AGENTS.md, SPEC.md, docs/workflow.md, and the project spec first.
Post or draft the plan, then wait for confirmation before implementing.
```

```text
Run the rafaelmelon-ai update-spec workflow.
Compare the current project spec with the implementation diff and propose
snapshot-style spec updates before applying them.
```

```text
Run the rafaelmelon-ai review-pr workflow for PR 15.
Review against the linked issue acceptance criteria, project spec, and SPEC.md.
Lead with findings and include file/line references.
```

```text
Run the rafaelmelon-ai fix-review workflow for PR 15.
Fix only the items the last review raised, propose follow-up issues for
anything new, and show every reply before posting it.
```

Role definitions (PM, Plan, Build, Validation, Review, Spec Divergence) live in
`.claude/agents/*.md` and test guidance in `.claude/skills/test-rules/SKILL.md`.
They are plain Markdown; read them directly.

## Keeping Codex Portable

Avoid adding Codex-only hidden state. If Codex needs new guidance, add it to
`AGENTS.md`, `SPEC.md`, or this file, then decide whether Cursor or Claude
adapters need the same update.
