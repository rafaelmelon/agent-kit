---
name: test-rules
description: Rules for choosing the right test layer and writing a test that actually guards an acceptance criterion (unit, component, integration against a real database, end to end with Playwright). Use when planning tests for a change, writing or reviewing a test, or deciding whether a criterion is really covered.
---

# Test rules

Use these rules when you decide which test a change needs, write a test, or judge whether a criterion is covered. Running the suite and filling the plan table belong to the agent or command that loads this skill.

## Pick the layer

1. **Test where the behavior comes from.** Behavior produced by the server, the database, an RLS policy or an external API is proven against that real dependency. Behavior produced only by rendering (text, labels, formatting, conditional UI) is proven by a component test.
2. **Use the lowest layer that can see the result.** Prefer a unit test when every collaborator can be replaced and nothing depends on stored state. Keep end-to-end tests for what only the running app can show: a full user journey, auth redirects, service worker and offline behavior, a flow across services.
3. **A layer must be able to observe what it asserts.** A test that asserts stored data, an RLS decision or a provider response must reach that state. A mocked client cannot prove a database rule.
4. **Do not mock the thing you are proving.** Stubbing the dependency the criterion is about proves the stub. Mock only what the layer cannot reach, and say why next to the test.
5. **Split mixed criteria.** When part of a criterion comes from the server and part from the UI, both parts need a test. One half covered is not covered.
6. **Add a unit test for the logic a unit owns.** A rule, a calculation or a branch decided in code gets a unit test, even when a higher layer also covers the criterion. It runs on every change and fails closest to the defect.

## Make the test a real guard

7. **Assert the behavior.** Running the code path without an assertion that fails on regression is not coverage.
8. **It must fail when the change is reverted.** For a bug fix, this is the defining property: run the test against the unfixed code once.
9. **Fixtures set the fields production reads.** A fixture that fills a sibling field (`user.id` instead of `userId`) makes the test pass while production stays wrong.
10. **Money, auth and state machines need a failure case.** For a payment, a permission or a status transition, add at least one of: a rejected attempt, a double submit, an out-of-order step, a caller without permission.
11. **"Never happens" needs a guard that trips.** A claim that something never occurs needs a check that fails when the violation is introduced (a type, a lint rule, a constraint, a test that injects it). Observing its absence today guards nothing.
12. **Pin both sides of a contract.** When a change crosses an API, webhook or message boundary, one test pins what the producer sends and another pins what the consumer accepts.

## Keep the suite honest

13. **Deterministic tests only in CI.** A flaky or judgment-based check (visual review, exploratory run) stays out of the suite that gates merges.
14. **A test no pipeline runs is a claim, not a guard.** Check that CI collects the new test. If the needed layer does not exist in the repo, declare the gap instead of writing a test that cannot run.
15. **State the configuration you covered.** When behavior changes with locale, role, device size or a feature flag, say which values you tested, which you skipped, and why.
16. **Tag tests with the criterion they prove** (`AC-<PROJECT>-<NNN>` in the test name), so coverage can be read from the tests themselves.

## Typical stack mapping

| Behavior | Layer | Tool |
|----------|-------|------|
| Pure function, hook logic, reducer | Unit | Vitest |
| What a component renders for given props or state | Component | Vitest + Testing Library |
| Route handler, server action, RLS policy, SQL | Integration against local Supabase | Vitest + `supabase start` |
| Full journey, auth redirect, offline / service worker, install prompt | End to end | Playwright |
| React Native screen logic | Component | Jest + React Native Testing Library |
| React Native device journey | End to end | Maestro or Detox |
