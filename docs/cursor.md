# Cursor Setup

Cursor compatibility uses native Cursor project rules, custom commands, and MCP
configuration while keeping `AGENTS.md` and `SPEC.md` as the neutral source of
truth.

## Files

| File | Purpose |
|------|---------|
| `.cursor/rules/00-core.mdc` | Always-on pointer to the neutral toolkit contract |
| `.cursor/rules/10-workflow.mdc` | Agent-requested workflow guidance |
| `.cursor/commands/plan-issue.md` | Cursor slash command for issue planning |
| `.cursor/commands/update-spec.md` | Cursor slash command for spec sync |
| `.cursor/commands/review-pr.md` | Cursor slash command for PR review |
| `.cursor/mcp.json` | Cursor MCP server config |

## Workspace Setup

Add this repo alongside project repos in your Cursor workspace:

```json
{
  "folders": [
    { "path": "rafaelmelon-ai" },
    { "path": "movie-recommender" }
  ]
}
```

Cursor can read `AGENTS.md` directly, but native `.cursor/rules/*.mdc` files
make the most important guidance easier to keep active.

## Commands

Cursor discovers custom commands from `.cursor/commands`. Use:

```text
/plan-issue 42
/update-spec
/review-pr 15
```

If Cursor does not show a command, ask it to run the equivalent workflow from
`docs/workflow.md`. Cursor custom commands are currently beta, so keep these
files simple and avoid relying on undocumented syntax.

## MCP

Cursor uses `.cursor/mcp.json` for project MCP servers. Keep tokens in your
environment and reference them with placeholders such as
`${env:SUPABASE_ACCESS_TOKEN}`.

Never put token values in `.cursor/mcp.json`.

## Maintenance

When changing a workflow:

1. Update the neutral workflow in `docs/workflow.md`.
2. Update the matching `.cursor/commands/*.md` file.
3. Check whether `.claude/commands/*.md` and `docs/codex.md` need the same
   change.

## References

- Cursor Rules: https://docs.cursor.com/context/rules
- Cursor Commands: https://docs.cursor.com/en/agent/chat/commands
- Cursor MCP: https://docs.cursor.com/en/context/mcp
