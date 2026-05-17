# rafaelmelon-ai

## What this repository is

This is a **personal AI tooling hub** — not a deployable application, not a knowledge base for specific projects, but a **portable tooling layer** that Rafael Melón uses when working with Claude Code across all personal projects.

It provides:

- **Workflow commands** — slash commands that guide common development tasks (planning from a GitHub Issue, reviewing a PR, etc.)
- **Tooling skills** — reusable skill definitions for GitHub, Vercel, Supabase, and other services
- **Sub-agent roles** — specialized AI behavior templates (PM, Plan, Build, Review)
- **Canonical rules** — conventions applied consistently across all projects

**Project-specific knowledge lives in each project repo** (`docs/`, `SPEC.md`, etc.). This repo is tooling only.

## Repository structure

```text
rafaelmelon-ai/
├── CLAUDE.md               # AI behavioral rules (main guide)
├── AGENTS.md               # This file — repository identity for AI context
├── SPEC.md                 # Canonical rules (R1–Rn)
├── CONTRIBUTING.md         # Human governance & git workflow
│
├── .claude/
│   ├── commands/           # Slash commands (workflow helpers)
│   │   ├── plan-issue.md   # Plan implementation from a GitHub Issue
│   │   ├── update-spec.md  # Sync project spec after a feature
│   │   └── review-pr.md    # Review a PR against spec and ACs
│   │
│   ├── skills/             # Tooling skills (external service access)
│   │   ├── github/         # GitHub Issues, PRs, Actions
│   │   ├── vercel/         # Deploy status, logs, env vars
│   │   ├── supabase/       # Database queries, migrations
│   │   └── browser-automation/  # Playwright for UI testing
│   │
│   └── sub-agents/         # Specialized AI role templates
│       ├── pm-agent.md
│       ├── plan-agent.md
│       ├── build-agent.md
│       └── review-agent.md
│
└── docs/
    └── workflow.md         # How to use this toolkit
```

## Canonical sources of truth

| What | Where |
| ---- | ----- |
| AI behavioral rules | `CLAUDE.md` |
| Canonical rule set | `SPEC.md` |
| Workflow commands | `.claude/commands/` |
| Tooling skills | `.claude/skills/` |
| Sub-agent roles | `.claude/sub-agents/` |
| Project knowledge | Each project's `docs/` or `SPEC.md` |
| Planning & tasks | GitHub Issues (per-project repo) |

## How to use

Add this repo alongside project repos in a multi-root workspace. Claude Code picks up `CLAUDE.md` automatically and applies all rules and skills when working in any repo in the workspace.

```json
{
  "folders": [
    { "path": "rafaelmelon-ai" },
    { "path": "movie-recommender" }
  ]
}
```

## Adding new tools

- New slash command → `.claude/commands/<name>.md`
- New skill → `.claude/skills/<name>/SKILL.md`
- New sub-agent → `.claude/sub-agents/<name>.md`
- New rule → add a section to `SPEC.md`

## Document precedence

When sources conflict: `SPEC.md` > `docs/` > project docs > source code.
