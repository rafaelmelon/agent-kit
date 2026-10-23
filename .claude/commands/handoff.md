---
description: Rewrite the project's session handoff (.agent/handoff.md) from the current state
---

# /handoff

Rewrite `.agent/handoff.md` in the current project so a new session can resume
from it without this conversation (SPEC.md R11).

1. Read the current `.agent/handoff.md`, if there is one.
2. Rewrite it as a snapshot of now, not a log, in this shape:

   ```markdown
   # Handoff

   ## State
   What is true now: what shipped, what is open (PRs and branches with full URLs).

   ## Next
   1. The next step, small enough to start without asking.
   2. ...

   ## Decisions
   - YYYY-MM-DD: what was settled, in one line. Not to be reopened.

   ## Resume
   The first file to read, command to run or question to ask.
   ```

3. Keep it under one screen (120 lines at most). Drop what is done and no longer
   explains anything; keep decisions while they still constrain the work.
4. Make sure `.agent/` is ignored by git (`git check-ignore .agent/handoff.md`);
   if not, add `.agent/` to `.git/info/exclude`, never to `.gitignore`.
5. Answer with the `## Next` list only.
