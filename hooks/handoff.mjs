// Session continuity (SPEC.md R11): the working state of a project lives in
// .agent/handoff.md, which is local and never committed, and every new session
// starts from it instead of from a summary of a conversation it never saw.
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

export const HANDOFF = ".agent/handoff.md";
export const MAX_LINES = 120;

/** Keeps .agent/ out of git in this clone only, through .git/info/exclude. */
export function ensureExcluded(cwd) {
  const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  try {
    git("rev-parse", "--is-inside-work-tree");
  } catch {
    return "not-a-repo";
  }
  try {
    git("check-ignore", "-q", HANDOFF);
    return "already";
  } catch {
    // Not ignored yet: falls through.
  }
  const exclude = resolve(cwd, git("rev-parse", "--git-path", "info/exclude").trim());
  appendFileSync(exclude, "\n# agent-kit: session handoff, local only (SPEC R11)\n.agent/\n");
  return "added";
}

/** What the session is told when it starts. */
export function handoffContext(cwd) {
  const path = join(cwd, HANDOFF);
  if (!existsSync(path)) {
    return `No ${HANDOFF} in this project yet. Create it (SPEC R11) as soon as this session leaves work pending.`;
  }
  const text = readFileSync(path, "utf8").trim();
  const lines = text.split("\n").length;
  const long = lines > MAX_LINES ? `\n\nIt is ${lines} lines, over ${MAX_LINES}: rewrite it down to the current state.` : "";
  return `Handoff from earlier sessions (${HANDOFF}, SPEC R11). Resume from it, keep it current when a task closes or a decision is made, and never copy it into issues, PRs or commits.${long}\n\n${text}`;
}
