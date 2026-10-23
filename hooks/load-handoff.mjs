#!/usr/bin/env node
// SessionStart hook: hands the session its project's handoff (hooks/handoff.mjs).
import { ensureExcluded, handoffContext } from "./handoff.mjs";

let data = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) data += chunk;

let cwd = process.cwd();
try {
  cwd = JSON.parse(data).cwd || cwd;
} catch {
  // No event on stdin: the current directory will do.
}

try {
  ensureExcluded(cwd);
} catch {
  // A read-only clone still gets its handoff read.
}

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: handoffContext(cwd) },
  }),
);
