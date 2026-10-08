# rafaelmelon-ai

Personal AI tooling hub for coding agents across Rafael Melon's projects.

## What This Is

A portable tooling layer, not a deployable app. The neutral source of truth is
plain Markdown (`AGENTS.md`, `SPEC.md`, `docs/`), with adapters for tools that
support native rule or command formats.

It provides:

- **Slash commands**: `/plan-issue`, `/update-spec`, `/review-pr`
- **Tooling skills**: GitHub, Vercel, Supabase, browser automation
- **Agent roles**: PM, Plan, Build, Review, Spec Divergence
- **Canonical rules**: shared conventions applied across projects
- **Adapters**: Codex, Cursor, and Claude Code today; more can be added later

Project knowledge (specs, docs, architecture decisions) lives in each project
repo.

## Setup

### 0. Environment Variables

Copy `.env.example` to `.env.local` and fill in your tokens:

```bash
cp .env.example .env.local
```

Then register the Supabase token with the agents you use.

Claude Code example:

```bash
claude mcp add supabase --env SUPABASE_ACCESS_TOKEN=<your-token>
```

Cursor and Codex can use MCP config files or their own connector settings. See
`docs/cursor.md` and `docs/codex.md`.

Tokens needed:
- **Supabase PAT**: supabase.com -> Account -> Access Tokens
- **GitHub token**: github.com -> Settings -> Developer settings -> Personal
  access tokens (scopes: `repo`, `read:org`)

## Quick start

### 1. Add To Workspace

```json
// rafaelmelon.code-workspace
{
  "folders": [
    { "path": "rafaelmelon-ai" },
    { "path": "movie-recommender" }
  ]
}
```

Any agent can read `AGENTS.md`, `SPEC.md`, and `docs/workflow.md` as the
neutral contract.

### 2. Tool Adapters

- **Codex**: use `AGENTS.md` as the primary contract. See `docs/codex.md`.
- **Cursor**: use `.cursor/rules`, `.cursor/commands`, and `.cursor/mcp.json`.
  See `docs/cursor.md`.
- **Claude Code**: install as a plugin and load `SPEC.md` globally. See
  [docs/claude-code.md](docs/claude-code.md).

### 3. Workflow

```text
GitHub Issue -> /plan-issue <number> -> build -> validation-agent
  -> PR -> /review-pr <number> (fresh session) -> /fix-review <number>
  -> /update-spec
```

See [docs/workflow.md](docs/workflow.md) for the full guide.

## Structure

```text
rafaelmelon-ai/
├── AGENTS.md               # Provider-neutral agent instructions
├── SPEC.md                 # Canonical rules (R1-R10)
├── CLAUDE.md               # Claude Code compatibility shim
├── CONTRIBUTING.md         # Conventions for this repo
├── .mcp.json               # Shared MCP config
├── .claude-plugin/
│   ├── plugin.json         # Claude Code plugin manifest
│   └── marketplace.json    # Lets /plugin install it from this repo
├── hooks/
│   ├── hooks.json          # Plugin hooks
│   ├── block-env-access.mjs  # Hook entry: keeps agents away from .env
│   └── env-guard.mjs       # Guard logic (tested in env-guard.test.mjs)
├── .cursor/
│   ├── commands/           # Cursor custom commands
│   ├── rules/              # Cursor project rules
│   └── mcp.json            # Cursor MCP config
├── .claude/
│   ├── commands/
│   │   ├── plan-issue.md   # Plan from a GitHub Issue
│   │   ├── update-spec.md  # Sync project spec after a feature
│   │   ├── review-pr.md    # Review a PR, verifying findings
│   │   └── fix-review.md   # Close one review round
│   ├── skills/
│   │   ├── github/         # GitHub Issues, PRs, Actions
│   │   ├── vercel/         # Deploy, logs, env vars
│   │   ├── supabase/       # Database, migrations, RLS, auth
│   │   ├── browser-automation/  # Playwright
│   │   └── test-rules/     # Which test, at which layer
│   └── agents/
│       ├── pm-agent.md
│       ├── plan-agent.md
│       ├── build-agent.md
│       ├── validation-agent.md
│       ├── review-agent.md
│       ├── spec-divergence-agent.md
│       └── design-to-code-agent.md
└── docs/
    ├── adapters.md
    ├── claude-code.md
    ├── codex.md
    ├── cursor.md
    └── workflow.md
```

## Adding new tooling

| What | Where |
|------|-------|
| New neutral rule | `SPEC.md` |
| New neutral workflow | `docs/workflow.md` |
| New Codex instruction | `AGENTS.md` or `docs/codex.md` |
| New Cursor command | `.cursor/commands/<name>.md` |
| New Cursor rule | `.cursor/rules/<name>.mdc` |
| New Claude command | `.claude/commands/<name>.md` |
| New Claude skill | `.claude/skills/<name>/SKILL.md` |
| New Claude agent | `.claude/agents/<name>.md` + entry in `.claude-plugin/plugin.json` |

Keep adapter files thin. The workflow should remain understandable to an AI
agent that only reads Markdown.
