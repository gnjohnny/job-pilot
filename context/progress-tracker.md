# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 — Profile Page
**Last completed:** 05 Profile Page — Full UI
**Next:** 06 Profile Save Logic


---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [x] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build

- **Server-Side OAuth callback**: Switched from client-rendered callback page to pure server Route Handler at `app/(auth)/callback/route.ts` to allow session cookie creation/deletion on HTTP response headers without violating Next.js Server Component read-only cookie rules.
- **Refresh endpoint integration**: Implemented a POST Route Handler at `app/api/auth/refresh/route.ts` using `createRefreshAuthRouter` to support the background session sync performed by the browser-side client (`createBrowserClient`) on startup.

---

## Notes

- Checked and verified that `cookies().set()` inside Route Handlers does not persist cookies to redirects if returning `NextResponse.redirect()` directly. Resolving this required writing session cookies directly onto the `NextResponse` redirect object's `response.cookies` store.
