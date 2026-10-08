import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { commandTouchesSecretEnv, decide, isSecretEnvGlob, isSecretEnvPath } from "./env-guard.mjs";

const HOOK = fileURLToPath(new URL("./block-env-access.mjs", import.meta.url));

test("secret env paths are denied", () => {
  for (const path of [".env", "/repo/.env", "apps/web/.env.local", ".env.production", "C:\\repo\\.env"]) {
    assert.equal(isSecretEnvPath(path), true, path);
  }
});

test("template env paths and look-alikes are allowed", () => {
  for (const path of [".env.example", "apps/web/.env.local.example", ".env.sample", ".env.template", ".envrc", "env.ts", "src/env/index.ts", undefined]) {
    assert.equal(isSecretEnvPath(path), false, String(path));
  }
});

test("bash commands that touch secret env files are denied", () => {
  for (const command of ["cat .env", "head -5 apps/web/.env.local", "source .env && npm start", "grep KEY .env.production", "cp .env.example .env", "cat .env*", "cat .env.*", "cat .env.example.bak"]) {
    assert.equal(commandTouchesSecretEnv(command), true, command);
  }
});

test("bash commands without secret env files are allowed", () => {
  for (const command of ["cat .env.example", "node -e 'process.env.HOME'", "direnv allow .envrc", "ls src/env", "npm test"]) {
    assert.equal(commandTouchesSecretEnv(command), false, command);
  }
});

test("globs that reach secret env files are denied", () => {
  for (const glob of [".env*", "**/.env.*", "apps/{web,api}/.env*", ".env"]) {
    assert.equal(isSecretEnvGlob(glob), true, glob);
  }
  for (const glob of ["*.ts", "**/env/*.ts", ".env.example", undefined]) {
    assert.equal(isSecretEnvGlob(glob), false, String(glob));
  }
});

test("decide inspects every path field, including multi-edits", () => {
  assert.equal(decide({ tool_name: "Grep", tool_input: { pattern: "KEY", glob: ".env*" } }), "deny");
  assert.equal(decide({ tool_name: "Read", tool_input: { file_path: "/x/.env" } }), "deny");
  assert.equal(decide({ tool_name: "Grep", tool_input: { pattern: "KEY", path: ".env.local" } }), "deny");
  assert.equal(decide({ tool_name: "MultiEdit", tool_input: { edits: [{ file_path: "a.ts" }, { file_path: ".env" }] } }), "deny");
  assert.equal(decide({ tool_name: "Read", tool_input: { file_path: ".env.example" } }), "allow");
});

test("the script prints a deny decision only when it blocks", () => {
  const run = (event) => execFileSync("node", [HOOK], { input: JSON.stringify(event) }).toString();
  const denied = JSON.parse(run({ tool_name: "Bash", tool_input: { command: "cat .env" } }));
  assert.equal(denied.hookSpecificOutput.permissionDecision, "deny");
  assert.equal(run({ tool_name: "Bash", tool_input: { command: "ls" } }), "");
  assert.equal(execFileSync("node", [HOOK], { input: "not json" }).toString(), "");
});
