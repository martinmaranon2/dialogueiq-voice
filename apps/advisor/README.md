> This version is included in the consolidated project. See the repository-root README for the current folder layout and primary run commands. Run version-specific commands from this folder.

# DialogueIQ — Advisor Dashboard and Voice Assistance

A Zurich hackathon prototype that helps wealth advisors review client information, analyze conversations, and identify follow-up tasks. This version adds browser speech recognition and a Swisscom-backed voice-assistance endpoint to the client-insights dashboard.

## Architecture

- `app/page.tsx` composes the advisor dashboard.
- `lib/data-service.ts` loads client profiles, conversations, and related records from Supabase.
- `POST /api/chat` forwards a question and client context to OpenAI.
- `POST /api/orchestrator` runs preprocessing → intent/entity extraction → classification → validation → finalization on a transcript.
- `components/voice.tsx` uses browser speech recognition and sends transcript text to `POST /api/ai-voice-assist`. That route tries the configured Swisscom Apertus endpoint and falls back to local heuristics when the request or response fails.

The voice route's heuristic fallback and the transcript pipeline are distinct processing paths. Some supporting AI services and uploads remain mocked.

## Tech stack

Next.js 14 App Router, React 18, TypeScript/JavaScript, Tailwind CSS 4, Radix UI, Supabase/PostgreSQL, OpenAI, Swisscom Apertus, and browser speech recognition.

## Repository map

| Location                                    | Responsibility                                              |
| ------------------------------------------- | ----------------------------------------------------------- |
| `app/api/`                                  | Chat, transcript orchestration, and voice-assistance routes |
| `components/`                               | Client dashboard, panels, speech UI, reusable controls      |
| `lib/agents/`                               | Transcript analysis and evaluation scripts                  |
| `lib/llm/`                                  | Server-side OpenAI wrapper                                  |
| `lib/prompts/`                              | Task classifier prompts                                     |
| `supabase/migrations/` and `supabase/seed/` | Database schema and example records                         |
| `public/`                                   | Demo transcripts, branding, and static assets               |

## Setup and run

The manifest specifies Node.js 22.x. Use pnpm with the committed lockfile.

```sh
git clone https://github.com/martinmaranon2/dialogueiq-voice.git
cd dialogueiq-voice
pnpm install --frozen-lockfile --ignore-scripts
```

Create an ignored root `.env` file:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
OPENAI_API_KEY=YOUR_SERVER_SIDE_API_KEY
OPENAI_MODEL=gpt-4o-mini
SWISS_AI_PLATFORM_API_KEY=YOUR_SERVER_SIDE_SWISSCOM_KEY
```

Apply `supabase/migrations/0001_initial_schema.sql` to a separate development Supabase project, then optionally apply `supabase/seed/001_mock_data.sql`. Review policies before using real data. These database steps were inspected, not executed.

```sh
pnpm dev
```

Open the URL printed by Next.js, normally `http://localhost:3000`. Voice input requires browser speech-recognition support, microphone permission, and a secure browser context (localhost or HTTPS). API availability and browser speech behavior must be checked in the intended demo environment.

## Build and validation

```sh
pnpm build
pnpm start
./node_modules/.bin/tsc --noEmit
```

Audit on 2026-10-22: frozen dependency installation with pnpm 11.25, production build, and production homepage HTTP 200 passed on Node.js 24.19. The runtime differed from the manifest's Node.js 22 requirement. TypeScript reported nine existing diagnostics, including browser speech API declarations and component types. `next.config.mjs` skips type checking and linting during builds.

No live Supabase, OpenAI, Swisscom, or microphone session was exercised. The server's configured Swisscom endpoint and model are implementation details, not a guarantee that the event-specific API remains available.

## Known implementation limits

- `lib/agents/classifier.ts` currently uses the literal prompt `"Test"` and comments out the real prompt loader.
- `lib/ai-service.ts` and file uploads include mock implementations.
- The heuristic voice fallback can return free-text task items, so consumers must not assume its output always matches the model label vocabulary.
- There is no package test script; the pipeline's `_test.ts` files are standalone experiments.
- Use only the public Supabase anon key in `NEXT_PUBLIC_*` variables. Keep model credentials server-side and out of commits.

## Collaboration and provenance

This is shared hackathon work. Preserve existing author history and use branches and pull requests for changes. Related Zurich hackathon versions have different integrations; review their differences before porting changes.

Original integration references: [v0 project](https://v0.app/chat/projects/VIBU8LKkxBa), [Vercel project](https://vercel.com/evangelosmakris-antegriscoms-projects/v0-ubs-hackathlon). Deployment and automatic sync status were not verified.

This personal fork preserves the shared source and its contributor history: [evangelosAntegris/ZurichHackathlon](https://github.com/evangelosAntegris/ZurichHackathlon).
