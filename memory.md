# Memory — Database Schema and Storage Setup

Last updated: 2026-06-28T15:07:00+03:00

## What was built

- **Auth Client wrappers (carried over)**: Created client wrapper `lib/insforge-client.ts` and server client wrapper `lib/insforge-server.ts`.
- **Route Handlers (carried over)**:
  - Created `app/(auth)/callback/route.ts` for OAuth token exchange.
  - Created `app/api/auth/refresh/route.ts` for browser client session refresh sync.
- **Server Actions (carried over)**: Created `actions/auth.ts` to manage server-side OAuth initiation and sign-out.
- **Pages (carried over)**: Created `app/(auth)/login/page.tsx` with social login triggers, and placeholder pages for `/dashboard`, `/profile`, and `/find-jobs`.
- **Middleware (carried over)**: Setup `proxy.ts` (Next.js 16 middleware) to handle token verification and route protection.
- **PostHog Telemetry Integration (carried over)**: Added client/server PostHog event tracking integrated into layouts and hooks.
- **Database Schema**: Created tables `profiles`, `agent_runs`, `jobs`, and `agent_logs` in the InsForge Postgres database with proper cascading keys, types, and defaults.
- **Row-Level Security**: Enabled RLS on all 4 tables with policies restricting operations based on `auth.uid()`.
- **Private Resumes Storage**: Created `resumes` storage bucket in InsForge. Configured RLS policies on `storage.objects` to ensure users can only access their own files under `resumes/{auth.uid()}/resume.pdf`.

## Decisions made

- **Relational Integrity**: Linked all secondary tables (`agent_runs`, `jobs`, `agent_logs`) directly to `profiles.id` (which references `auth.users(id)`) using `ON DELETE CASCADE` to keep database deletion mechanics simple and clean.
- **Storage and Object Security**: Placed RLS rules on the `storage.objects` table using the prefix check `(key LIKE auth.uid()::text || '/%')` on the private `resumes` bucket.
- **PostHog Client Provider Structure (carried over)**: Isolated PostHog client initialization inside `components/providers/PostHogProvider.tsx`.
- **Server-Side OAuth Callback (carried over)**: Directed redirect callback to GET Route Handler to permit response headers cookies modification.

## Problems solved

- **PostHog Token Mismatch (carried over)**: Added fallback logic to resolve PostHog key name differences between `.env` and `.env.local`.
- **PowerShell Script Policy Restriction (carried over)**: Executed node commands using `npm.cmd` explicitly instead of `npm`.

## Current state

- All foundation setup (Phase 1) is complete.
- Database schemas are active, storage bucket is created, auth is integrated, and PostHog tracking baseline works.

## Next session starts with

- **05 Profile Page — Full UI**: Build the complete profile page UI (banners, upload forms, personal/professional detail forms, preferences, and save triggers) using mock data.

## Open questions

- None.
