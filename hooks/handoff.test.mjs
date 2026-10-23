import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { ensureExcluded, handoffContext, MAX_LINES } from "./handoff.mjs";

const HOOK = fileURLToPath(new URL("./load-handoff.mjs", import.meta.url));

function repo() {
  const dir = mkdtempSync(join(tmpdir(), "handoff-"));
  execFileSync("git", ["init", "-q"], { cwd: dir });
  return dir;
}

function withHandoff(dir, text) {
  mkdirSync(join(dir, ".agent"), { recursive: true });
  writeFileSync(join(dir, ".agent", "handoff.md"), text);
}

test("keeps .agent/ out of git once, locally", () => {
  const dir = repo();
  assert.equal(ensureExcluded(dir), "added");
  assert.equal(ensureExcluded(dir), "already");
  withHandoff(dir, "# Handoff\n");
  assert.equal(execFileSync("git", ["status", "--porcelain"], { cwd: dir, encoding: "utf8" }), "");
  assert.match(readFileSync(join(dir, ".git", "info", "exclude"), "utf8"), /^\.agent\/$/m);
});

test("leaves a folder that is not a repository alone", () => {
  assert.equal(ensureExcluded(mkdtempSync(join(tmpdir(), "plain-"))), "not-a-repo");
});

test("hands over the handoff, and says so when there is none", () => {
  const dir = repo();
  assert.match(handoffContext(dir), /No \.agent\/handoff\.md in this project yet/);
  withHandoff(dir, "# Handoff\n\n## Next\n\n1. Review the folder tree\n");
  const context = handoffContext(dir);
  assert.match(context, /SPEC R11/);
  assert.match(context, /1\. Review the folder tree/);
  assert.doesNotMatch(context, /rewrite it down/);
});

test("asks for a trim when it has grown into a log", () => {
  const dir = repo();
  withHandoff(dir, Array.from({ length: MAX_LINES + 5 }, (_, i) => `line ${i}`).join("\n"));
  assert.match(handoffContext(dir), /over 120: rewrite it down to the current state/);
});

test("the hook answers as a SessionStart hook", () => {
  const dir = repo();
  withHandoff(dir, "# Handoff\n\n## State\n\nAll green.\n");
  const out = JSON.parse(execFileSync("node", [HOOK], { input: JSON.stringify({ cwd: dir }), encoding: "utf8" }));
  assert.equal(out.hookSpecificOutput.hookEventName, "SessionStart");
  assert.match(out.hookSpecificOutput.additionalContext, /All green\./);
});
