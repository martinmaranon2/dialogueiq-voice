# Consolidation validation — 2026-10-22

- Frozen primary-app pnpm installation passed from `apps/advisor`.
- Production build passed through the repository-root `npm run build` command.
- Production root `npm run start -- -p 3121` correctly forwards arguments and served the homepage with HTTP 200.
- Primary app source/assets/configuration were compared byte-for-byte with the original source commit, excluding the improved README and `.gitignore` template exception.
- Both earlier version snapshots were compared against their original commits, excluding improved Markdown docs. Earlier versions remain outside the primary app's TypeScript/build scope.
- Both original source-history bundles passed `git bundle verify` and record complete histories.
- Runtime code, schema SQL, dependencies and lockfiles are preserved. No private runtime environment files or installed dependencies are publication candidates.
- A bounded credential-pattern scan of candidate text files found no matches; it is not a full historical secret audit.

The inherited Next.js build configuration skips type checking and linting. The prior independent type check reported nine existing diagnostics; consolidation did not change the relevant source. Node 24 was used locally, while the primary app's manifest specifies Node 22. No live Supabase, OpenAI, Swisscom or microphone session was exercised.
