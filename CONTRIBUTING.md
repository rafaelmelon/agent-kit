# Contributing

This document covers conventions for working in this tooling repo itself. For project-specific conventions, see each project's own docs.

## Adding a new command

1. Create `.claude/commands/<name>.md`
2. Follow the format: title, usage, steps, output, next step
3. Reference any sub-agents it invokes

## Adding a new skill

1. Create `.claude/skills/<name>/SKILL.md`
2. Include: description, when to use, prerequisites, key operations, examples

## Adding a new sub-agent

1. Create `.claude/sub-agents/<name>.md`
2. Define: role, responsibilities, inputs, outputs, constraints

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
