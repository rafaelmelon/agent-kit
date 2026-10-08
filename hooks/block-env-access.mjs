#!/usr/bin/env node
import { decide } from "./env-guard.mjs";

const REASON =
  "Blocked by rafaelmelon-ai: .env files hold secrets and are off limits (SPEC.md R1.2, R6.1). " +
  "Reference variables by name ($VAR) and read .env.example for the list. " +
  "To read a JSON field named env with jq, write .[\"env\"] instead of .env.";

async function readStdin() {
  let data = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

async function main() {
  let event;
  try {
    event = JSON.parse(await readStdin());
  } catch {
    return;
  }
  if (decide(event) !== "deny") return;
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: REASON,
      },
    }),
  );
}

await main();
