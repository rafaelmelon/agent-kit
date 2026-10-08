# Contributing

This document covers conventions for working in this tooling repo itself. For project-specific conventions, see each project's own docs.

## Adding a new command

1. Update the neutral workflow in `docs/workflow.md` if behavior changes.
2. Create or update the adapter command:
   - Cursor: `.cursor/commands/<name>.md`
   - Claude Code: `.claude/commands/<name>.md`
3. Follow the format: title, usage, steps, output, next step.
4. Reference the role it invokes: PM, Plan, Build, Validation, Review, or Spec Divergence.
5. Claude commands start with `description` and `argument-hint` frontmatter and
   reference `$ARGUMENTS`.

## Adding a new skill

1. Create `.claude/skills/<name>/SKILL.md`
2. Start it with YAML frontmatter: `name` and a `description` that says when to
   use it. Claude Code ignores a skill without them.
3. Include: when to use, prerequisites, key operations, examples

## Adding a new agent

1. Create `.claude/agents/<name>.md`
2. Start it with YAML frontmatter: `name`, `description` (when to delegate),
   and optionally `tools`
3. Define: role, responsibilities, inputs, outputs, constraints
4. List the file under `agents` in `.claude-plugin/plugin.json`

## Changing the hook

Run `node --test 'hooks/*.test.mjs'` before committing.

## Adding a new adapter

1. Keep the neutral source of truth in `AGENTS.md`, `SPEC.md`, and `docs/`.
2. Add setup notes in `docs/<tool>.md`.
3. Add native files only where the tool benefits from them.
4. Update `docs/adapters.md`, `README.md`, and `AGENTS.md`.

## Git conventions (applies to this repo)

### Branch naming

```text
feat/<slug>   — new command, skill, or sub-agent
fix/<slug>    — fix incorrect behavior in existing tooling
docs/<slug>   — documentation only
chore/<slug>  — maintenance, cleanup
```

### Commit format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <subject>
```

Examples:

- `feat(skills): add react-native skill`
- `fix(commands): correct plan-issue step order`
- `docs(spec): add R5 tech stack rules`

### PR format

PR title follows the same format as commits.
