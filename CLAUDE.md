@AGENTS.md

# Claude Code Adapter

This file is a compatibility shim for Claude Code. The canonical, provider-
neutral instructions live in `AGENTS.md`, `SPEC.md`, and `docs/workflow.md`.

Claude Code should:

- Read `AGENTS.md` for repository identity and default behavior.
- Read `SPEC.md` for canonical rules.
- Use `.claude/commands/` for Claude-native slash commands.
- Use `.claude/skills/` for Claude-compatible skills.
- Use `.claude/agents/` for Claude agent roles.

Outside this repo, Claude Code gets the same tooling from the plugin and the
rules from `~/.claude/CLAUDE.md`. See `docs/claude-code.md`.

Do not add Claude-only behavior here unless Claude Code cannot express it via
the neutral docs or `.claude/` adapter files.
