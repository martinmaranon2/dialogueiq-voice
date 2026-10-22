# UBS Client Advisor — DialogueIQ

One repository for the Zurich hackathon's client-advisor project: the advisor dashboard with voice assistance is the primary app, and the earlier dashboard/client-insights versions are preserved in named folders.

## Structure

| Folder | Purpose |
| --- | --- |
| `apps/advisor/` | Primary Next.js advisor app: client profiles, conversations, transcript analysis, chat and voice assistance |
| `versions/dashboard/` | Earlier Supabase-backed dashboard and experimental transcript pipeline |
| `versions/client-insights/` | Earlier client-insights version, preserved from its original public commit |
| `history/` | Complete restorable Git histories for the shared source repositories |
| `SOURCES.json` | Repository, branch and commit provenance for each folder |

These are versions of one project, not three independent portfolio projects. Run only the app you intend to use; each version has its own dependencies and database assumptions.

## Run the primary app

The primary app specifies Node.js 22.x. Install pnpm and use the committed app lockfile.

```sh
git clone https://github.com/martinmaranon2/ubs-client-advisor.git
cd ubs-client-advisor
npm run setup
cp apps/advisor/.env.example apps/advisor/.env
```

Fill in the environment file with your development Supabase public URL/anon key and server-side model keys. Never use a service-role key in `NEXT_PUBLIC_*` values. Create a separate development database using `apps/advisor/supabase/migrations/0001_initial_schema.sql` and optionally `apps/advisor/supabase/seed/001_mock_data.sql`, after reviewing the SQL and access policies.

```sh
npm run dev
# Production build and local start:
npm run build
npm run start
# Separate type check; existing diagnostics are documented below.
npm run typecheck
```

The root scripts delegate to `apps/advisor`, so Next.js, environment loading, prompt paths and assets retain the app directory as their working root. The earlier versions are outside its TypeScript/build scope.

## How it works

The Next.js App Router dashboard loads client records from Supabase through `lib/data-service.ts`. `/api/chat` forwards advisor questions and selected client context to OpenAI. `/api/orchestrator` runs preprocessing, intent/entity extraction, classification, validation and finalization. Browser speech recognition submits transcript text to `/api/ai-voice-assist`, which tries the configured Swisscom endpoint and falls back to local heuristics.

The stack is Next.js 14, React 18, TypeScript/JavaScript, Tailwind CSS 4, Radix UI, Supabase/PostgreSQL, OpenAI and browser speech recognition. Supporting AI services and file uploads include mock implementations; the classifier currently uses a literal test prompt. No claim is made that all AI paths or uploads are production-complete.

## Earlier versions

Use `versions/dashboard/` or `versions/client-insights/` as independent app roots when studying or running those versions. Their source files are retained together here, while `history/` preserves the original Git history. The dashboard version's setup guide references a missing Supabase schema; obtain a compatible schema before expecting live client data.

## Verification and attribution

The original primary app's frozen install, production build and homepage HTTP check passed during the audit. The separate type check reported nine existing diagnostics, including browser speech declarations and UI types; its existing Next.js config skips types and lint during builds. Live Supabase/model/microphone behavior was not exercised. Consolidation checks are recorded in `VALIDATION.md`.

This is shared hackathon work from [evangelosAntegris/ZurichHackathlon](https://github.com/evangelosAntegris/ZurichHackathlon) and [epanner/zurich-ai-hack-25](https://github.com/epanner/zurich-ai-hack-25). The primary repository's existing Git ancestry is intact. No collaborator repository was moved, overwritten or force-pushed.
