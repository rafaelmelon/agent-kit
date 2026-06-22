# Adapter Guide

Adapters translate the neutral rafaelmelon-ai workflow into tool-native formats.
They should stay small, boring, and easy to compare.

## Core Principle

The neutral source of truth is:

- `AGENTS.md`: repository identity and default agent behavior
- `SPEC.md`: canonical rules
- `docs/workflow.md`: development workflow

Adapters may reference, summarize, or expose these docs in a native format. They
must not introduce a competing workflow.

## Current Adapters

| Tool | Adapter files | Purpose |
|------|---------------|---------|
| Codex | `AGENTS.md`, `docs/codex.md` | Plain Markdown instructions and Codex workflow notes |
| Cursor | `.cursor/rules/`, `.cursor/commands/`, `.cursor/mcp.json` | Native rules, commands, and MCP config |
| Claude Code | `CLAUDE.md`, `.claude/` | Claude-native commands, skills, and sub-agent prompts |

The root `.mcp.json` remains available for tools that support a shared MCP
configuration. Cursor gets its own `.cursor/mcp.json` because Cursor expects
project-specific MCP config there.

## Adapter Rules

- Keep provider-specific wording in provider-specific files.
- Keep core workflow changes in `docs/workflow.md` first.
- When a command changes, update all supported command adapters with the same
  behavioral contract.
- Prefer references to neutral docs over copying long sections.
- Use environment variable placeholders for MCP and CLI examples.
- Never store secrets, tokens, project credentials, or local `.env` values.

## Adding A New Adapter

1. Confirm the target tool's native instruction format.
2. Add a short setup doc under `docs/<tool>.md`.
3. Add native rule/command/config files only when the tool benefits from them.
4. Update `README.md`, `AGENTS.md`, and this guide.
5. Check that the same workflow remains usable by an agent that only reads
   Markdown.
