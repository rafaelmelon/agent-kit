# Workflow Guide

How to use rafaelmelon-ai when working on a personal project.

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

Claude Code picks up `CLAUDE.md` from `rafaelmelon-ai` automatically and applies all rules and skills when working in any repo in the workspace.

## Standard development cycle

### 1. Create a GitHub Issue

In the project repo, create a GitHub Issue with:
- A clear title
- Description of the problem or feature
- Any relevant context, screenshots, or links

You can also ask Claude to help draft it: "help me write a GitHub Issue for adding a watchlist feature to movie-recommender"

### 2. Plan the implementation

```text
/plan-issue 42
```

This will:
- Fetch the issue content
- Read the project spec (if it exists)
- Generate an implementation plan via the Plan Agent
- Post the plan as a comment on the issue
- Present it for your confirmation

**Do not start implementing until you confirm the plan.**

### 3. Implement on a feature branch

After confirming the plan, create a branch and implement:

```bash
git checkout -b feat/movie-add-watchlist
```

The Build Agent follows the plan step by step. It will:
- Read existing code before writing
- Implement only what the plan specifies
- Run type check and lint after finishing

### 4. Update the project spec

```text
/update-spec
```

This syncs the project's `docs/` or `SPEC.md` with what was actually built. **Always do this after merging a feature.**

### 5. Open a PR and review

```bash
gh pr create --title "feat(movie): add watchlist" --body "Closes #42"
```

Or ask Claude to review an existing PR:

```text
/review-pr 15
```

## When to use each command

| Situation | Command |
|-----------|---------|
| Starting a new feature or fix | Create a GitHub Issue, then `/plan-issue` |
| About to implement | Confirm the plan first |
| After merging a feature | `/update-spec` |
| Reviewing someone's PR (or your own) | `/review-pr <number>` |

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
