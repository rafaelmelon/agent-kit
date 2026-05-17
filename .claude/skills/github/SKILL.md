# Skill: GitHub

Access GitHub Issues, Pull Requests, Actions, and releases using the `gh` CLI.

## When to use

- Reading or creating GitHub Issues
- Fetching PR diffs and review threads
- Posting comments or reviews on Issues/PRs
- Checking CI/CD workflow run status
- Creating releases or tags

## Prerequisites

- `gh` CLI installed and authenticated: `gh auth status`
- Working in a repo with a GitHub remote, or passing `--repo owner/repo`

## Key operations

### Issues

```bash
# Get issue details
gh issue view <number> --json title,body,labels,comments

# List open issues
gh issue list --state open --limit 20

# Create an issue
gh issue create --title "..." --body "..." --label "..."

# Post a comment
gh issue comment <number> --body "..."
```

### Pull Requests

```bash
# Get PR details and diff
gh pr view <number> --json title,body,files,reviews,comments
gh pr diff <number>

# List open PRs
gh pr list --state open

# Create a PR
gh pr create --title "..." --body "..." --base main

# Post a review
gh pr review <number> --comment --body "..."
gh pr review <number> --approve
gh pr review <number> --request-changes --body "..."
```

### Actions (CI/CD)

```bash
# List recent workflow runs
gh run list --limit 10

# Get run status
gh run view <run-id>

# Watch a run in real time
gh run watch <run-id>
```

### Releases

```bash
# List releases
gh release list

# Create a release
gh release create v1.0.0 --title "v1.0.0" --notes "..."
```

## Notes

- Always use `gh` CLI over direct API calls — it handles auth automatically.
- For posting plan comments on Issues, use `gh issue comment`.
- For posting PR reviews with line-level comments, use the GitHub API via `gh api`.
