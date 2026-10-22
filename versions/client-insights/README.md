> This version is included in the consolidated project. See the repository-root README for the current folder layout and primary run commands. Run version-specific commands from this folder.

# DialogueIQ — Client Conversation Insights

A Zurich hackathon prototype for wealth advisors: browse client profiles and conversations, ask questions about a selected client, and extract follow-up tasks from conversation transcripts.

This repository contains a Next.js dashboard and an experimental transcript-processing pipeline. It shares code with [evangelosAntegris/ZurichHackathlon](https://github.com/evangelosAntegris/ZurichHackathlon), whose version also includes voice assistance. Treat these as related versions; preserve their separate history and integrations.

## How it works

1. `app/page.tsx` selects a client and loads its profile through `lib/data-service.ts`.
2. The data service queries Supabase and maps database rows into frontend types.
3. The header sends questions and client context to `POST /api/chat`, which calls OpenAI and returns a response for the dashboard.
4. `POST /api/orchestrator` accepts a `transcript` or `raw` string. The pipeline performs preprocessing → intent/entity extraction → task classification → validation → finalization.
5. Other panels use a mixture of persisted records, mock responses, and placeholder upload behavior. This is a prototype rather than a complete production banking integration.

## Tech stack

Next.js 14 App Router, React 18, TypeScript, Tailwind CSS 4, Radix UI, Supabase/PostgreSQL, OpenAI's Node SDK, and Zod. The project originated with v0.

## Repository map

| Location               | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `app/`                 | Dashboard, layout, styles, and server API routes |
| `components/`          | Advisor panels and reusable UI                   |
| `lib/data-service.ts`  | Supabase queries and row mapping                 |
| `lib/agents/`          | Transcript pipeline and evaluation scripts       |
| `lib/llm/`             | Server-side model client                         |
| `lib/prompts/`         | Classifier prompt assets and wrappers            |
| `supabase/migrations/` | Database schema                                  |
| `supabase/seed/`       | Example records                                  |
| `public/`              | Static assets and sample transcripts             |

## Setup

Use a recent Node.js runtime and npm. The audit used Node.js 24.

```sh
git clone https://github.com/martinmaranon2/ZurichHackathlon.git
cd ZurichHackathlon
npm ci --ignore-scripts
```

Access to this private repository is required. Create an ignored `.env` file at the repository root:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
OPENAI_API_KEY=YOUR_SERVER_SIDE_API_KEY
OPENAI_MODEL=gpt-4o-mini
```

The Supabase URL and anon key are used by browser code; never substitute a service-role key. The OpenAI key stays server-side. The transcript SDK explicitly reads `.env`; Next.js also loads it.

In a separate development Supabase project, run `supabase/migrations/0001_initial_schema.sql` in the SQL editor, followed by `supabase/seed/001_mock_data.sql` if sample records are wanted. Review the SQL and access policies before applying it. Database setup was inspected but not executed during the audit.

```sh
npm run dev
```

Open the local URL printed by Next.js, normally `http://localhost:3000`.

## Build and checks

```sh
npm run build
npm run start
# Separate check: the build configuration skips TypeScript validation.
./node_modules/.bin/tsc --noEmit
```

Audit on 2026-10-22: locked dependency installation, production build, and production homepage HTTP 200 passed using placeholder environment values. Live Supabase queries and paid model calls were not exercised. TypeScript reported 21 existing diagnostics, mainly pipeline types resolving to `lib/types.ts` instead of `lib/types/index.ts`. A successful build therefore does not establish type correctness.

There is no `test` script. Files ending in `_test.ts` are individual experimental scripts, some requiring external transcript datasets and model credentials.

## Current limitations

- The classifier currently sets `rawTxt = "Test"`; its prompt-loading call is commented out. Changing `CLASSIFIER_PROMPT_PATH` does not restore the intended classifier behavior.
- The standalone `AIService` includes mocked responses; the header chat uses the separate live API route.
- File uploads return mock storage URLs; they do not persist uploaded files.
- The chat route hardcodes its model separately from `OPENAI_MODEL`, which configures the transcript SDK.
- Authentication, permissions, and real-data handling require further review before deployment beyond a demo.

## Project integrations

The original README referenced [the v0 project](https://v0.app/chat/projects/VIBU8LKkxBa) and [the Vercel project](https://vercel.com/evangelosmakris-antegriscoms-projects/v0-ubs-hackathlon). These are retained as project references; their deployment and sync status were not verified. Propose shared changes through branches and pull requests.
