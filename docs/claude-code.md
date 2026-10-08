# Claude Code Setup

Claude Code uses this repo in two ways:

| What | How it reaches every project |
|------|------------------------------|
| Commands, agents, skills, hooks | Installed as the `agent-kit` plugin |
| Canonical rules (`SPEC.md`) | Imported from `~/.claude/CLAUDE.md` |

A plugin cannot load a `CLAUDE.md`, so the always-on rules need the second
step. Without it, the commands and agents work but `SPEC.md` is only read when
an agent is told to read it.

## Requirements

- Node.js on `PATH` (the secret-protection hook runs with `node`)
- `gh` authenticated (`gh auth status`)
- Optional: `supabase` and `vercel` CLIs for those skills

## 1. Install the plugin

Inside Claude Code:

```text
/plugin marketplace add rafaelmelon/agent-kit
/plugin install agent-kit@rafaelmelon
```

To work on the toolkit itself and see edits without reinstalling, add the local
clone instead. A marketplace added from a local path loads the plugin in place:

```text
/plugin marketplace add ~/Dev/agent-kit
/plugin install agent-kit@rafaelmelon
```

Check it from a terminal:

```bash
claude plugin validate ~/Dev/agent-kit
```

The validator warns that a `CLAUDE.md` at the plugin root is not loaded. That
is expected: the file is there for sessions opened inside this repo.

## 2. Load the rules globally

Create or edit `~/.claude/CLAUDE.md`:

```markdown
# Personal defaults

@~/Dev/agent-kit/SPEC.md

Project instructions (the project's own AGENTS.md / CLAUDE.md) win when they
are more specific.
```

Keep the clone at `~/Dev/agent-kit` and pull it to update the rules.

## 3. Optional: deny `.env` at the permission level

The plugin hook already blocks `.env` access. For a second layer, add this to
`~/.claude/settings.json`:

```json
{
  "permissions": {
    "deny": ["Read(**/.env)", "Read(**/.env.*)", "Edit(**/.env)", "Edit(**/.env.*)"]
  }
}
```

This also denies `.env.example`, so only add it if you are happy for agents to
read templates through the hook-approved paths instead.

## What you get

| Type | Name | Use |
|------|------|-----|
| Command | `/plan-issue <n>` | Plan from a GitHub Issue |
| Command | `/review-pr <n>` | Independent PR review with verified findings |
| Command | `/fix-review <n>` | Close one review round |
| Command | `/update-spec` | Sync the project spec after a feature |
| Agent | `pm-agent`, `plan-agent`, `build-agent`, `validation-agent`, `review-agent`, `spec-divergence-agent`, `design-to-code-agent` | Workflow roles |
| Skill | `github`, `vercel`, `supabase`, `browser-automation`, `test-rules` | Tooling and test guidance |
| Hook | `block-env-access` | Denies reads, edits and shell commands that touch `.env` files |

Plugin components are namespaced: when a name clashes, use
`/agent-kit:review-pr` or the agent `agent-kit:review-agent`.

Inside this repo the same commands also load as project files, so you may see
each one twice. Either is fine.

## Maintenance

- New agent: add `.claude/agents/<name>.md` with `name` and `description`
  frontmatter, and list it in `.claude-plugin/plugin.json` (the manifest lists
  agent files one by one).
- New skill: `.claude/skills/<name>/SKILL.md` with frontmatter. The manifest
  scans the folder, so no manifest change is needed.
- Bump `version` in `.claude-plugin/plugin.json` when you want installed copies
  to update.
- Hook changes: run `node --test 'hooks/*.test.mjs'`.
