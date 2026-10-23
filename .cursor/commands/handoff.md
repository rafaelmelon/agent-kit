# handoff

Rewrite the project's session handoff, `.agent/handoff.md`, from the current
state, so a new session can resume without this conversation (SPEC.md R11).

## Usage

```text
/handoff
```

Follow `.claude/commands/handoff.md`: same shape (State, Next, Decisions,
Resume), a snapshot under 120 lines, `.agent/` kept out of git through
`.git/info/exclude`. Cursor has no session hook, so read `.agent/handoff.md`
first when a chat starts in a project that has one.
