# rafaelmelon-ai

Personal AI tooling hub for working with Claude Code across personal projects.

## What this is

A portable tooling layer — not a deployable app. It provides:

- **Slash commands** — `/plan-issue`, `/update-spec`, `/review-pr`
- **Tooling skills** — GitHub, Vercel, Supabase, browser automation
- **Sub-agents** — PM, Plan, Build, Review, Spec Divergence
- **Canonical rules** — applied consistently across all projects

Project knowledge (specs, docs, architecture decisions) lives in each project repo.

## Setup

### 0. Environment variables (one time)

Copy `.env.example` to `.env.local` and fill in your tokens:

```bash
cp .env.example .env.local
```

Then register the Supabase token with Claude Code:

```bash
claude mcp add supabase --env SUPABASE_ACCESS_TOKEN=<your-token>
```

Tokens needed:
- **Supabase PAT** → supabase.com → Account → Access Tokens
- **GitHub token** → github.com → Settings → Developer settings → Personal access tokens (scopes: `repo`, `read:org`)

## Quick start

### 1. Add to workspace

```json
// rafaelmelon.code-workspace
{
  "folders": [
    { "path": "rafaelmelon-ai" },
    { "path": "movie-recommender" }
  ]
}
```

Claude Code picks up `CLAUDE.md` automatically.

### 2. Workflow

```text
GitHub Issue  →  /plan-issue <number>  →  implement  →  /update-spec
```

See [docs/workflow.md](docs/workflow.md) for the full guide.

## Structure

```text
rafaelmelon-ai/
├── CLAUDE.md               # AI behavioral rules
├── AGENTS.md               # Repository identity
├── SPEC.md                 # Canonical rules (R1–R6)
├── CONTRIBUTING.md         # Conventions for this repo
├── .claude/
│   ├── commands/
│   │   ├── plan-issue.md   # Plan from a GitHub Issue
│   │   ├── update-spec.md  # Sync project spec after a feature
│   │   └── review-pr.md    # Review a PR
│   ├── skills/
│   │   ├── github/         # GitHub Issues, PRs, Actions
│   │   ├── vercel/         # Deploy, logs, env vars
│   │   ├── supabase/       # Database, migrations, auth
│   │   └── browser-automation/  # Playwright
│   └── sub-agents/
│       ├── pm-agent.md
│       ├── plan-agent.md
│       ├── build-agent.md
│       ├── review-agent.md
│       └── spec-divergence-agent.md
└── docs/
    └── workflow.md
```

## Adding new tooling

| What | Where |
|------|-------|
| New slash command | `.claude/commands/<name>.md` |
| New skill | `.claude/skills/<name>/SKILL.md` |
| New sub-agent | `.claude/sub-agents/<name>.md` |
| New rule | Add section to `SPEC.md` |
