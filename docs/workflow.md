# Workflow Guide

How to use rafaelmelon-ai when working on a personal project with Codex,
Cursor, Claude Code, or another AI coding agent.

## Setup

Add this repo to your workspace alongside project repos:

```json
// rafaelmelon.code-workspace
{
  "folders": [
    { "path": "rafaelmelon-ai" },
    { "path": "movie-recommender" }
  ]
}
```

Agents should read `AGENTS.md`, `SPEC.md`, and this guide as the neutral
workflow contract. Tool-specific files under `.cursor/` and `.claude/` adapt the
same workflow for agents that support native commands, rules, or skills.

## Tool Entry Points

| Tool | Primary entrypoint | Native adapter |
|------|--------------------|----------------|
| Codex | `AGENTS.md` | `docs/codex.md` |
| Cursor | `AGENTS.md`, `.cursor/rules/*.mdc` | `.cursor/commands/`, `.cursor/mcp.json` |
| Claude Code | `CLAUDE.md` -> `AGENTS.md` | `.claude/commands/`, `.claude/skills/`, `.claude/sub-agents/` |
| Other agents | `AGENTS.md`, `SPEC.md`, `docs/workflow.md` | Add only if useful |

## Standard development cycle

### 1. Create a GitHub Issue

In the project repo, create a GitHub Issue with:
- A clear title
- Description of the problem or feature
- Any relevant context, screenshots, or links

You can also ask your agent to help draft it: "help me write a GitHub Issue
for adding a watchlist feature to movie-recommender"

### 2. Plan the implementation

Use `/plan-issue 42` when the current tool supports slash commands. Otherwise,
ask the agent to run the `plan-issue` workflow from `docs/workflow.md`.

This will:
- Fetch the issue content
- Read the project spec (if it exists)
- Generate an implementation plan using the Plan role
- Post the plan as a comment on the issue
- Present it for your confirmation

**Do not start implementing until you confirm the plan.**

### 3. Implement on a feature branch

After confirming the plan, create a branch and implement:

```bash
git checkout -b feat/movie-add-watchlist
```

The Build role follows the plan step by step. It will:
- Read existing code before writing
- Implement only what the plan specifies
- Run type check and lint after finishing

### 4. Update The Project Spec

Use `/update-spec` when available. Otherwise ask the agent to run the
`update-spec` workflow manually.

This syncs the project's `docs/` or `SPEC.md` with what was actually built. **Always do this after merging a feature.**

### 5. Open a PR and review

```bash
gh pr create --title "feat(movie): add watchlist" --body "Closes #42"
```

Or ask your agent to review an existing PR:

```text
/review-pr 15
```

## When to use each command

| Situation | Command |
|-----------|---------|
| Starting a new feature or fix | Create a GitHub Issue, then `/plan-issue` or the equivalent prompt |
| About to implement | Confirm the plan first |
| After merging a feature | `/update-spec` or the equivalent prompt |
| Reviewing someone's PR (or your own) | `/review-pr <number>` or the equivalent prompt |

## When to use each skill

| Need | Skill |
|------|-------|
| Read/create/comment on Issues or PRs | `github` |
| Check deploy status or logs | `vercel` |
| Query the database or run migrations | `supabase` |
| Verify UI behavior end-to-end | `browser-automation` |

## Project spec conventions

Each project should have a spec at `docs/SPEC.md` or `SPEC.md` (project root) with:

```markdown
# Project Name

## Overview
What it is, tech stack, live URL.

## Architecture
Key decisions, data model, integrations.

## Features
List of implemented features with ACs.

## Open questions
Unresolved decisions.
```

The spec lives in the **project repo**, not here. This repo is tooling only.
