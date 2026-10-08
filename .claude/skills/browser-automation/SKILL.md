---
name: browser-automation
description: Drive a browser with Playwright to verify UI behavior end to end, explore a running app, or capture screenshots. Use after a UI change to confirm it works in the real app, never against production.
---

# Skill: Browser Automation

Automate browser interactions using Playwright for UI testing, exploration, and verification.

## When to use

- Verifying that a UI feature works end-to-end after implementation
- Exploring a deployed app to understand current behavior
- Taking screenshots of specific states for debugging
- Filling forms, clicking buttons, and asserting on results

## Prerequisites

- Playwright MCP server running, or Playwright installed in the project:
  `npx playwright install`
- For project-level tests: `npx playwright test`

## Key operations

### Navigation and interaction

```typescript
// Navigate to a page
await page.goto('http://localhost:3000/movies');

// Click an element
await page.click('button[data-testid="add-to-watchlist"]');

// Fill a form field
await page.fill('input[name="search"]', 'Inception');

// Wait for navigation or element
await page.waitForURL('**/dashboard');
await page.waitForSelector('[data-testid="movie-card"]');
```

### Assertions

```typescript
// Assert element visibility
await expect(page.locator('h1')).toBeVisible();

// Assert text content
await expect(page.locator('[data-testid="title"]')).toHaveText('Inception');

// Assert URL
await expect(page).toHaveURL('/dashboard');
```

### Screenshots and debugging

```typescript
// Take a screenshot
await page.screenshot({ path: 'debug.png' });

// Log console errors
page.on('console', msg => console.log(msg.text()));
```

### Running tests

```bash
# Run all Playwright tests
npx playwright test

# Run a specific test file
npx playwright test tests/watchlist.spec.ts

# Run with UI mode (visual debugger)
npx playwright test --ui

# Show last test report
npx playwright show-report
```

## Notes

- Use `data-testid` attributes for stable selectors — avoid CSS class or text selectors that change often.
- For React Native apps, use Detox or Maestro instead of Playwright.
- Always test against the local dev server (`localhost:3000`) or a preview deployment, never production.
