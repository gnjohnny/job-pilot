# Memory — InsForge Auth Implementation

Last updated: 2026-06-27T21:49:00+03:00

## What was built

- **Auth Client wrappers**: Created client wrapper `lib/insforge-client.ts` and server client wrapper `lib/insforge-server.ts`.
- **Route Handlers**: 
  - Created `app/(auth)/callback/route.ts` for OAuth token exchange.
  - Created `app/api/auth/refresh/route.ts` for browser client session refresh sync.
- **Server Actions**: Created `actions/auth.ts` to manage server-side OAuth initiation and sign-out.
- **Pages**:
  - Created `app/(auth)/login/page.tsx` with social login triggers.
  - Created placeholder pages for `app/dashboard/page.tsx`, `app/profile/page.tsx`, and `app/find-jobs/page.tsx`.
- **Middleware**: Setup `proxy.ts` (Next.js 16 middleware) to handle token verification and route protection.
- **Navbar Layout**: Updated `components/layout/Navbar.tsx` to conditionally fetch user profile, show initials avatar with profile/logout dropdown when authenticated, and show get started when unauthenticated.

## Decisions made

- **Server-Side OAuth Callback**: Directed redirect callback to GET Route Handler to permit response headers cookies modification, avoiding Server Component read-only cookie limitations.
- **Cookie Redirect Bypass**: Instantiated `NextResponse.redirect` object first and wrote session cookies directly onto `response.cookies` to bypass the Next.js App Router bug where `cookies().set()` changes are lost during redirects.
- **Refresh Endpoint Sync**: Created `/api/auth/refresh` API Route Handler to satisfy the startup token-refresh POST requests initiated automatically by the browser-side client (`createBrowserClient`).

## Problems solved

- **Next.js 16 Proxy Convention**: Renamed `middleware.ts` to `proxy.ts` with `export default async function proxy(...)` to align with Next.js 16 compiler specifications.
- **TypeScript Cookie Overloads**: Cast Next.js request/response cookie store wrappers `as any` when passing to `updateSession` to prevent TS compiler errors with overload signatures.
- **Lucide Brand Icon Deprecations**: Replaced deprecated brand SVGs with standard Lucide icons (`Globe` and `GitBranch`) to ensure type safety.

## Current state

- **Homepage & Auth flow**: Mostly complete. The build compiles successfully.
- **OAuth Callback**: Correctly retrieves code and verifier, and redirects to dashboard.
- **Debugging status**: Active log lines added in the callback handler and refresh handler to print the `insforge_refresh_token` cookie values to debug why `getCurrentUser()` returns null on `/dashboard`.

## Next session starts with

- **Session Refresh Debugging**: Verify if `insforge_refresh_token` contains a valid token value or resolves to the string `"undefined"` / `"null"` when visiting `/dashboard` and hitting `/api/auth/refresh`.
- **03 PostHog Initialization**: Begin PostHog SDK tracking and pageview triggers setup.

## Open questions

- None.
