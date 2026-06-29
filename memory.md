# Memory — AI Profile Extraction from Resume

Last updated: 2026-06-29T12:17:35+03:00

## What was built

- Created [app/api/resume/extract/route.ts](file:///C:/Users/Johnny/Agy_test/lead_finder/app/api/resume/extract/route.ts) API endpoint to parse resume PDFs and extract structured profile details via GPT-4o.
- Created [types/pdf-parse.d.ts](file:///C:/Users/Johnny/Agy_test/lead_finder/types/pdf-parse.d.ts) to define custom type declarations for the `pdf-parse` package.
- Modified [components/profile/ProfileForm.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/components/profile/ProfileForm.tsx) to render **Extract from Resume** and **Clear** buttons on PDF file selection, manage the extraction states, and auto-fill form state variables with parsed JSON.
- Installed `pdf-parse`, `openai`, and `zod` as dependencies in [package.json](file:///C:/Users/Johnny/Agy_test/lead_finder/package.json).

## Decisions made

- **API Route Authentication**: Required authentication using `createInsforgeServer()` to reject unauthenticated requests with a 401 Unauthorized status.
- **Enum Mapping & Constraints**: Enforced exact enums (e.g. `experience_level`, `highestDegree`) and max 3 work experiences in the GPT-4o system prompt to match database and UI dropdown expectations.
- **Save Profile Requirement**: Configured the extraction UI to fill local state variables instead of writing directly to the database, requiring the user to review the fields and click "Save Profile" manually.

## Problems solved

- **Terminal Execution Policies**: Resolved a PowerShell Script execution policy block by using `npm.cmd` rather than `npm` when running packages or build commands.

## Current state

- Profile extraction from resume is fully implemented, responsive, and functional in the form UI.
- Next.js Turbopack compiler builds successfully, and strict type-checks compile without any warnings or errors.

## Next session starts with

- **08 Resume PDF Generation from Profile**: Build the POST `/api/resume/generate` API endpoint and integrate the "Generate Resume from Profile" UI action.

## Open questions

- None.
