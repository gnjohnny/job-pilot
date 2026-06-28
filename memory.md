# Memory — PostHog Telemetry Integration

Last updated: 2026-06-28T14:55:00+03:00

## What was built

- **Auth Client wrappers (carried over)**: Created client wrapper `lib/insforge-client.ts` and server client wrapper `lib/insforge-server.ts`.
- **Route Handlers (carried over)**:
  - Created `app/(auth)/callback/route.ts` for OAuth token exchange.
  - Created `app/api/auth/refresh/route.ts` for browser client session refresh sync.
- **Server Actions (carried over)**: Created `actions/auth.ts` to manage server-side OAuth initiation and sign-out.
- **Pages (carried over)**: Created `app/(auth)/login/page.tsx` with social login triggers, and placeholder pages for `/dashboard`, `/profile`, and `/find-jobs`.
- **Middleware (carried over)**: Setup `proxy.ts` (Next.js 16 middleware) to handle token verification and route protection.
- **PostHog Telemetry Integration**:
  - Created `lib/posthog-client.ts` to initialize client-side browser tracking with manual pageviews disabled.
  - Created `lib/posthog-server.ts` to initialize server-side event tracking with immediate flush (`flushAt: 1`, `flushInterval: 0`).
  - Created `components/providers/PostHogProvider.tsx` Client Component React context provider.
  - Integrated `PostHogProvider` into `app/layout.tsx`.
  - Added user identification (`posthog.identify()`) and sign-out reset (`posthog.reset()`) lifecycle hooks inside `components/layout/Navbar.tsx`.

## Decisions made

- **PostHog Client Provider Structure**: Decided to isolate PostHog client initialization inside `components/providers/PostHogProvider.tsx` Client Component wrapper. This keeps the root layout `app/layout.tsx` as a Server Component for optimized metadata and server-rendered features.
- **Server-Side OAuth Callback (carried over)**: Directed redirect callback to GET Route Handler to permit response headers cookies modification, avoiding Server Component read-only cookie limitations.
- **Cookie Redirect Bypass (carried over)**: Instantiated `NextResponse.redirect` object first and wrote session cookies directly onto `response.cookies` to bypass the Next.js App Router bug where `cookies().set()` changes are lost during redirects.
- **Refresh Endpoint Sync (carried over)**: Created `/api/auth/refresh` API Route Handler to satisfy the startup token-refresh POST requests initiated automatically by the browser-side client (`createBrowserClient`).

## Problems solved

- **PostHog Token Mismatch**: Detected that `.env` and `.env.local` use the variable name `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` instead of `NEXT_PUBLIC_POSTHOG_KEY`. Configured client and server PostHog initializers to check `process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_KEY` to resolve silent tracking failures.
- **PowerShell Script Policy Restriction**: Solved Windows execution policy blocking script execution (`npm.ps1`) by running node commands through `npm.cmd` explicitly.
- **Stale Next.js Dev Cache**: Diagnosed next compiler type errors (`Cannot find name 'ler'`) inside `.next/dev/types/validator.ts` as stale dev cache, which is resolved by manually clearing `.next/` and restarting the Next.js dev server.

## Current state

- Auth integration and PostHog tracking baseline are complete.
- Production build compiles successfully.

## Next session starts with

- **04 Database Schema**: Set up InsForge database tables (`profiles`, `agent_runs`, `jobs`, `agent_logs`) and storage buckets (`resumes`).

## Open questions

- None.
