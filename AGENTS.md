# rafaelmelon-ai

## What This Repository Is

This is a **personal AI tooling hub**: not a deployable application, not a
project knowledge base, but a portable workflow layer for Rafael Melon across
AI coding agents.

The repository is designed around a provider-neutral core plus thin adapters for
specific tools. The neutral contract lives in Markdown so it can be read by
Cursor, Claude Code, Codex, Copilot, Windsurf, or any other capable coding
agent.

It provides:

- **Workflow commands**: reusable prompts for planning from a GitHub Issue,
  reviewing a PR, and syncing a project spec.
- **Tooling skills**: operational notes for GitHub, Vercel, Supabase, browser
  automation, and other external services.
- **Agent roles**: reusable behavior templates for PM, Plan, Build, Review,
  Spec Divergence, and Design to Code work.
- **Canonical rules**: conventions applied consistently across personal
  projects.
- **Tool adapters**: native files for agents that support their own rule,
  command, MCP, or skill formats.

Project-specific knowledge lives in each project repo (`docs/`, `SPEC.md`,
`AGENTS.md`, architecture docs, etc.). This repo is tooling only.

## Repository Structure

```text
rafaelmelon-ai/
├── AGENTS.md               # Provider-neutral identity and operating contract
├── SPEC.md                 # Canonical rules (R1-Rn)
├── CLAUDE.md               # Claude Code compatibility shim
├── CONTRIBUTING.md         # Human governance and git workflow
├── .mcp.json               # Shared MCP config for tools that support it
│
├── .cursor/                # Cursor adapter
│   ├── commands/           # Cursor custom slash commands
│   ├── rules/              # Cursor project rules (.mdc)
│   └── mcp.json            # Cursor MCP configuration
│
├── .claude/                # Claude Code adapter
│   ├── commands/           # Claude slash commands
│   ├── skills/             # Claude-compatible skill definitions
│   └── sub-agents/         # Claude-oriented role templates
│
└── docs/
    ├── adapters.md         # How to add or maintain adapters
    ├── codex.md            # Codex-specific setup
    ├── cursor.md           # Cursor-specific setup
    └── workflow.md         # Standard development workflow
```

## Canonical Sources

| What | Where |
| ---- | ----- |
| Repository identity and default agent behavior | `AGENTS.md` |
| Canonical rule set | `SPEC.md` |
| Standard workflow | `docs/workflow.md` |
| Shared MCP config | `.mcp.json` |
| Codex guidance | `AGENTS.md` and `docs/codex.md` |
| Cursor adapter | `.cursor/` |
| Claude Code adapter | `.claude/` and `CLAUDE.md` |
| Project knowledge | Each project's `AGENTS.md`, `docs/`, or `SPEC.md` |
| Planning and tasks | GitHub Issues in each project repo |

## How To Use

Use `AGENTS.md` and `SPEC.md` as the neutral source of truth. Tool-specific
files should adapt those instructions to a particular agent without changing the
workflow contract.

For Cursor, use `.cursor/rules`, `.cursor/commands`, and `.cursor/mcp.json`.
See `docs/cursor.md`.

For Codex, use `AGENTS.md` as the primary contract and see `docs/codex.md` for
workflow prompts that do not depend on slash commands.

For Claude Code, keep `CLAUDE.md` as a small compatibility shim and keep the
Claude-specific command, skill, and sub-agent files under `.claude/`.

For other AI tools, start from `AGENTS.md`, `SPEC.md`, and `docs/workflow.md`,
then add the smallest possible adapter for that tool's native format.

## Adding New Tools

- New neutral rule: add a section to `SPEC.md`.
- New workflow: document it in `docs/workflow.md`, then add adapter commands.
- New Codex guidance: `AGENTS.md` or `docs/codex.md`.
- New Cursor command: `.cursor/commands/<name>.md`.
- New Cursor rule: `.cursor/rules/<name>.mdc`.
- New Claude command: `.claude/commands/<name>.md`.
- New Claude skill: `.claude/skills/<name>/SKILL.md`.
- New Claude sub-agent: `.claude/sub-agents/<name>.md`.

## Document Precedence

When sources conflict:

1. Project-specific user instructions in the current chat.
2. Project repo instructions (`AGENTS.md`, project `SPEC.md`, project docs).
3. This toolkit's `SPEC.md`.
4. This toolkit's adapter files (`.cursor/`, `.claude/`).
5. Source code and tests.
