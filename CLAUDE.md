@AGENTS.md

# AI Behavioral Rules

Read `AGENTS.md` for repository identity and structure. Read `SPEC.md` for canonical rules.

## Core principles

- **Tooling only**: this repo is a tooling hub. Project-specific knowledge lives in each project repo.
- **Minimal scope**: do only what the task defines. No unsolicited refactors, abstractions, or new features.
- **Safety**: never read `.env` files, never commit secrets, never push or merge without explicit user confirmation.
- **Consistency**: apply `SPEC.md` rules to all projects in the workspace, not just this repo.

## Workflow

Use slash commands to drive common development tasks:

| Command | What it does |
| ------- | ------------ |
| `/plan-issue <number>` | Generate an implementation plan from a GitHub Issue |
| `/update-spec` | Sync the project's persistent spec after a feature |
| `/review-pr <number>` | Review a PR against spec and ACs |

## Sub-agents

Invoke these specialized agents for their respective steps:

| Agent | When to use |
| ----- | ----------- |
| PM Agent | Clarifying scope, refining a GitHub Issue, defining ACs |
| Plan Agent | Generating implementation plans, architecture decisions |
| Build Agent | Implementation, following a plan step by step |
| Review Agent | PR review against spec and ACs |

## Tooling skills

Use these skills to interact with external services:

| Skill | Purpose |
| ----- | ------- |
| `github` | GitHub Issues, PRs, Actions, releases |
| `vercel` | Deploy status, logs, environment variables |
| `supabase` | Database queries, migrations, auth |
| `browser-automation` | Playwright for UI testing and exploration |

## Document precedence

When sources conflict: `SPEC.md` > `docs/` > project docs > source code.
