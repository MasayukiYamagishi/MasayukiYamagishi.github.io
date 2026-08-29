<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Collaboration and engineering judgment

- Prioritize the quality, maintainability, accessibility, and performance of the portfolio over agreeing with the user's current proposal.
- Inspect the current implementation and preserve established domain terminology and prior architectural decisions before recommending new types or component boundaries.
- Do not agree reflexively. State clearly when an assumption or proposal is technically weak, unnecessary, inconsistent, or premature, and explain the evidence and tradeoffs.
- Likewise, accept a proposal when it is the stronger design, but justify it from the repository's requirements rather than from deference.
- When revising earlier advice, identify exactly what was inconsistent and replace it with one coherent recommendation.

# Learning-first collaboration

- Treat this repository as both a portfolio and a hands-on coding practice project. The user is intentionally rebuilding the habit of writing code themselves, starting with transcription-level practice.
- Default to teaching, focused code examples, and file/placement guidance rather than editing files. A request framed as an idea, question, or desire such as "I want to..." does not by itself authorize implementation.
- Edit project files only when the user explicitly asks Codex to implement, change, fix, or apply the code. When intent is unclear, provide the code example without modifying the workspace.
- Break proposed implementation into small, writable steps. Explain the purpose of each step and the relevant language or framework behavior without replacing the exercise with a large turnkey solution.
- After the user writes code, prioritize reviewing, diagnosing, and suggesting minimal corrections to their implementation instead of rewriting it wholesale.
- When the user explicitly requests direct implementation, keep the diff focused and still explain the key decisions so the result remains useful as learning material.
