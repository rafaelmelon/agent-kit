# SPEC — Canonical Rules

This file is the authoritative rule set for all personal projects. All AI
agents, commands, and workflows defer to it unless a project repo defines a
more specific instruction.

## R1 — File conventions

| ID | Rule |
|----|------|
| R1.1 | Source and config files: max 300 lines. Markdown files are exempt. |
| R1.2 | Secrets: never hardcode credentials. Use environment variables. AI never reads `.env` files. |
| R1.3 | File naming: `kebab-case` for markdown and YAML files. |
| R1.4 | TypeScript: strict mode on. No `any` without justification. |
| R1.5 | Never commit `.env` files. Always provide `.env.example` with placeholder values. |

## R2 — Project knowledge

| ID | Rule |
|----|------|
| R2.1 | Project specs live in the project repo, not in this tooling hub. |
| R2.2 | Spec files: plain Markdown, no YAML frontmatter, always start with `# Title`. |
| R2.3 | Acceptance criteria IDs: `AC-<PROJECT>-<NNN>` (e.g. `AC-MOVIE-001`). |
| R2.4 | Projects use 3–5 letter uppercase prefix derived from the project name. |
| R2.5 | After every completed feature, update the project spec to reflect current state — not history, but snapshot. |

## R3 — Git workflow

| ID | Rule |
|----|------|
| R3.1 | Branch naming: `<type>/<project>-<slug>` (e.g. `feat/movie-add-watchlist`, `fix/movie-auth-redirect`). |
| R3.2 | Commits: Conventional Commits — `<type>(<scope>): <subject>`. |
| R3.3 | PR titles: same format as commit messages. |
| R3.4 | Default branch: `main`. Feature branches merge into `main`. |
| R3.5 | AI must never push, merge, or close PRs without explicit user confirmation. |
| R3.6 | No AI attribution anywhere in git or GitHub: no `Co-Authored-By` trailer for an AI model, no "Generated with ..." line, no session links. Commits are authored by the user's own identity. |

## R4 — Planning workflow

| ID | Rule |
|----|------|
| R4.1 | Planning starts from a GitHub Issue. The issue defines intent, scope, and expected outcome. |
| R4.2 | Before implementing, generate and confirm a plan (via `/plan-issue`). |
| R4.3 | Implementation follows the confirmed plan. Any deviation requires user confirmation. |
| R4.4 | After every feature, run `/update-spec` to sync the project spec. Non-negotiable. |

## R5 — Tech stack

| ID | Rule |
|----|------|
| R5.1 | Frontend: React, Next.js (App Router), TypeScript. |
| R5.2 | Mobile: React Native (Expo). |
| R5.3 | Backend/API: Next.js API routes or Node.js. |
| R5.4 | Database: Supabase (PostgreSQL). Use Supabase CLI for migrations. |
| R5.5 | Hosting: Vercel. Use Vercel CLI for deploy and log access. |
| R5.6 | GitHub `gh` CLI for all GitHub operations. |

## R6 — AI behavior

| ID | Rule |
|----|------|
| R6.1 | Never read `.env` files. Read `.env.example` only. |
| R6.2 | Never commit secrets or credentials. |
| R6.3 | Before implementing, confirm the plan is aligned with the GitHub Issue. |
| R6.4 | After implementation, always run: type check (`tsc --noEmit`), lint, tests (if they exist). |
| R6.5 | Flag spec drift: if code diverges from the project spec, report it and propose an update. |
| R6.6 | Use the appropriate role for each workflow step: PM, Plan, Build, Validation, Review, or Spec Divergence. |
| R6.7 | Prefer provider-neutral instructions first (`AGENTS.md`, `SPEC.md`, `docs/`). Tool-specific adapters must not become the only source of truth. |
| R6.8 | Keep Cursor, Codex, and Claude compatibility in sync when adding or changing core workflows. |

## R7 — AI toolkit compatibility

| ID | Rule |
|----|------|
| R7.1 | `AGENTS.md` is the neutral entrypoint for Codex and any agent that supports plain Markdown instructions. |
| R7.2 | Cursor-native rules live in `.cursor/rules/*.mdc`; keep them concise and reference the neutral docs instead of duplicating everything. |
| R7.3 | Cursor-native commands live in `.cursor/commands/*.md`; Claude-native commands live in `.claude/commands/*.md`. Commands with the same name should describe the same workflow. |
| R7.4 | Claude-specific behavior belongs in `CLAUDE.md` or `.claude/`; Cursor-specific behavior belongs in `.cursor/`; Codex guidance belongs in `AGENTS.md` and `docs/codex.md`. |
| R7.5 | MCP configuration should use environment variable placeholders and never hardcoded secrets. |
| R7.6 | New adapters must be thin translations of the neutral workflow, not competing standards. |
| R7.7 | Claude agents live in `.claude/agents/*.md` and skills in `.claude/skills/<name>/SKILL.md`; both need YAML frontmatter with `name` and `description`, or Claude Code ignores them. Every new agent is also listed in `.claude-plugin/plugin.json`. |
| R7.8 | Claude Code consumes this repo as a plugin (`.claude-plugin/`). Rules that must always be in context (this file) are loaded through `~/.claude/CLAUDE.md`, because plugins do not load a `CLAUDE.md`. See `docs/claude-code.md`. |
| R7.9 | Files under `.claude/agents/` and `.claude/skills/` are plain Markdown and part of the shared contract: Cursor and Codex may read them directly. |

## R8 — Agent guardrails

| ID | Rule |
|----|------|
| R8.1 | Bug fixes are surgical: find the root cause, align with an existing pattern, keep to ~4 production files unless the user agrees to more, no refactors in the same change. Offer the broader fix as a follow-up. |
| R8.2 | A bug fix ships with a test that fails on the unfixed code and passes on the fix. |
| R8.3 | One task, one branch. When another agent or a human has work in progress, use a dedicated git worktree branched from the up-to-date remote base. Never edit inside a dirty checkout you do not own, and never switch, reset or delete another agent's branch or worktree. |
| R8.4 | Before opening a PR, `git diff --name-only origin/<base>...HEAD` lists only the intended files. After the PR opens, remove the local worktree and branch; keep the remote branch until merge. |
| R8.5 | Never merge a PR. "Create a PR and merge" means: create it, return the URL, and wait for a separate merge instruction. |
| R8.6 | No scratch files (PR bodies, notes, debug output) in the repository. Use the session scratchpad or a temp directory. |
| R8.7 | A reviewer that helped write a change is not independent. Run reviews in a fresh session, and verify each blocking finding by trying to refute it before reporting it. |
| R8.8 | Tests follow the `test-rules` skill (`.claude/skills/test-rules/SKILL.md`): the right layer, a real assertion, failure cases on money, auth and state paths. |
| R8.9 | Plans keep deferred work (committed, later issue) separate from out-of-scope work (excluded). A plan that contradicts an earlier decision surfaces it for the user; it never keeps or drops it silently. |

## R9 — Database migrations

| ID | Rule |
|----|------|
| R9.1 | Migrate only when needed: first show that no existing column, table or enum value meets the requirement. |
| R9.2 | Classify every operation: LOW (add table, nullable column, concurrent index), MEDIUM (`NOT NULL` with default, constraint, backfill), HIGH (drop, rename, type change, drop constraint). |
| R9.3 | HIGH operations need explicit user approval and a staged rollout plan before they are written. |
| R9.4 | Migrations stay backward compatible with the previous app version: add before remove, widen before narrow, rename in steps across releases. |
| R9.5 | Every new Supabase table enables RLS and defines its policies in the same migration. |
| R9.6 | Each migration file starts with `-- migration-risk: LOW`, `MEDIUM` or `HIGH`. |
| R9.7 | Never apply migrations to a remote database (`supabase db push`) without explicit user confirmation. |

## R10 — Communication

| ID | Rule |
|----|------|
| R10.1 | Write for a smart reader who may not code: outcome first, then what it means, then technical detail. |
| R10.2 | Explain each technical term or acronym on first use, or drop it. Prefer numbers and concrete examples over vague wording. |
| R10.3 | Every reference is clickable: full URL for PRs, issues, CI runs and deployments; relative path links for files. |
| R10.4 | Reply in the language the user writes in; code, commits and repository docs stay in English. |
