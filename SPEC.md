# SPEC — Canonical Rules

This file is the authoritative rule set for all personal projects. All AI agents, commands, and workflows defer to it.

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
| R6.6 | Use the appropriate sub-agent for each workflow step. |
