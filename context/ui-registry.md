# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Navbar

File: [components/layout/Navbar.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/components/layout/Navbar.tsx)
Last updated: 2026-06-27

| Property         | Class                                                    |
| ---------------- | -------------------------------------------------------- |
| Background       | `bg-surface` (header), `bg-surface` (dropdown)           |
| Border           | `border-b border-border` (header), `border border-border` (dropdown) |
| Border radius    | `none` (header), `rounded-xl` (dropdown), `rounded-full` (avatar) |
| Text — primary   | `text-text-primary` (active link), `text-text-primary` (dropdown items) |
| Text — secondary | `text-text-dark hover:text-text-primary` (inactive link) |
| Spacing          | `h-16 px-6 flex items-center justify-between` (header)   |
| Hover state      | `hover:text-text-primary` (links), `hover:bg-surface-secondary` (dropdown item) |
| Shadow           | `none` (header), `shadow-lg` (dropdown)                  |
| Accent usage     | `text-accent` (active nav item), `bg-accent/10 text-accent` (avatar) |

**Pattern notes:**
- Navbar uses a fixed height of `h-16` and full viewport width.
- Logo graphic size is 106x36px containing both logo icon and brand text from the raw PNG (no separate text element).
- Conditionally displays "Get started for free" (landing styling) when unauthenticated.
- Conditionally displays user avatar (initials badge) and navigation items when authenticated. Clicking the avatar toggles an actions dropdown menu (Dashboard, Profile, Sign-out triggers).


---

### Footer

File: [components/layout/Footer.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/components/layout/Footer.tsx)
Last updated: 2026-06-27

| Property         | Class                                         |
| ---------------- | --------------------------------------------- |
| Background       | `bg-surface`                                  |
| Border           | `border-t border-border`                      |
| Border radius    | `none`                                        |
| Text — primary   | `none`                                        |
| Text — secondary | `text-text-secondary hover:text-text-primary` |
| Spacing          | `px-6 py-6 flex flex-col md:flex-row gap-4`   |
| Hover state      | `hover:text-text-primary`                     |
| Shadow           | `none`                                        |
| Accent usage     | `none`                                        |

**Pattern notes:**
- Logo size is 94x32px containing both logo icon and brand text from the raw PNG (no separate text element).

---

### Hero

File: [components/homepage/Hero.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/components/homepage/Hero.tsx)
Last updated: 2026-06-27

| Property         | Class                                                       |
| ---------------- | ----------------------------------------------------------- |
| Background       | `bg-gradient-to-b from-[#e8eeff] via-[#faf5ff] to-background` |
| Border           | `border border-border` (demo window)                        |
| Border radius    | `rounded-2xl` (demo window)                                 |
| Text — primary   | `text-text-primary font-extrabold text-4xl sm:text-6xl`     |
| Text — secondary | `text-text-secondary font-medium text-base sm:text-lg`      |
| Spacing          | `pt-20 pb-16 px-6 gap-8` (between sections)                 |
| Hover state      | `hover:bg-text-darkest` (primary), `hover:bg-surface-secondary` (secondary) |
| Shadow           | `shadow-2xl` (demo window)                                  |
| Accent usage     | `bg-gradient-to-r from-accent/10 to-info/10 blur-3xl` (glow) |

**Pattern notes:**
- Incorporates a browser preview mockup wrapper featuring red/yellow/green macOS window style dots and address bar `jobpilot.ai/dashboard`.

---

### Interactive Features

File: [components/homepage/Features.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/components/homepage/Features.tsx)
Last updated: 2026-06-27

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `bg-surface-secondary` (section), `bg-surface` (mockup)   |
| Border           | `border-l-2` (tab), `border border-border` (mockup card)  |
| Border radius    | `rounded-2xl` (mockup card), `rounded-xl` (image nested)  |
| Text — primary   | `text-text-primary font-semibold text-base` (active tab)  |
| Text — secondary | `text-text-slate-medium text-sm font-semibold` (inactive tab) |
| Spacing          | `py-20 px-6 gap-12` (grid)                                |
| Hover state      | `hover:text-text-primary`                                 |
| Shadow           | `shadow-lg hover:shadow-xl` (mockup card)                 |
| Accent usage     | `border-accent text-text-primary` (active tab highlight)  |

**Pattern notes:**
- Tabs highlight using a vertical `border-l-2` left border. Inactive tabs have `border-border-muted`.
- The right-side mockup image is housed inside a card container with border radius and drop shadow.

---

### Terminal Logs (HowItWorks)

File: [components/homepage/HowItWorks.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/components/homepage/HowItWorks.tsx)
Last updated: 2026-06-27

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `bg-surface` (section), `bg-[#1A1C23]` (terminal mockup)  |
| Border           | `border-b border-[#2D313F]` (terminal header)             |
| Border radius    | `rounded-2xl` (terminal mockup), `rounded-b-xl` (terminal window nested) |
| Text — primary   | `font-mono text-xs text-[#9CA3AF]`                        |
| Text — secondary | `text-text-slate-medium text-sm font-semibold` (inactive tab) |
| Spacing          | `py-20 px-6 gap-12` (grid), `p-2` (inside terminal)       |
| Hover state      | `hover:text-text-primary`                                 |
| Shadow           | `shadow-xl hover:shadow-2xl`                              |
| Accent usage     | `border-accent` (active tab highlight)                    |

**Pattern notes:**
- Dark coding environment / terminal wrapper styling using `#1A1C23` background and macOS dot window controls.

---

### Login Page

File: [app/(auth)/login/page.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/app/(auth)/login/page.tsx)
Last updated: 2026-06-27

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `bg-background` (page), `bg-surface` (card)               |
| Border           | `border border-border` (card)                             |
| Border radius    | `rounded-2xl` (card), `rounded-lg` (buttons)              |
| Text — primary   | `text-text-primary font-semibold text-2xl`                |
| Text — secondary | `text-text-secondary text-sm`                             |
| Spacing          | `p-6` (main wrapper), `p-8` (card)                        |
| Hover state      | `hover:bg-surface-secondary` (buttons)                    |
| Shadow           | `shadow-sm`                                               |
| Accent usage     | `text-accent` (terms and Globe icon)                      |

**Pattern notes:**
- Social OAuth buttons (Google + GitHub) are styled with Lucide icons (`Globe` and `GitBranch` respectively) because brand icons are deprecated in recent lucide-react versions.

---

### Callback Route Handler

File: [app/(auth)/callback/route.ts](file:///C:/Users/Johnny/Agy_test/lead_finder/app/(auth)/callback/route.ts)
Last updated: 2026-06-27

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `none` (Route Handler redirect)                           |
| Border           | `none`                                                    |
| Border radius    | `none`                                                    |
| Text — primary   | `none`                                                    |
| Text — secondary | `none`                                                    |
| Spacing          | `none`                                                    |
| Hover state      | `none`                                                    |
| Shadow           | `none`                                                    |
| Accent usage     | `none`                                                    |

**Pattern notes:**
- Implemented as a Next.js GET Route Handler (`route.ts`) to permit session cookie creation/deletion on HTTP response headers without violating the Server Component read-only rule.
- Extracts parameters, verifies OAuth code, writes session cookies via `exchangeOAuthCode`, cleans up the verifier cookie, and performs a `NextResponse.redirect` to `/dashboard`.

---

### Refresh Route Handler

File: [app/api/auth/refresh/route.ts](file:///C:/Users/Johnny/Agy_test/lead_finder/app/api/auth/refresh/route.ts)
Last updated: 2026-06-27

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `none` (API Route Handler)                                |
| Border           | `none`                                                    |
| Border radius    | `none`                                                    |
| Text — primary   | `none`                                                    |
| Text — secondary | `none`                                                    |
| Spacing          | `none`                                                    |
| Hover state      | `none`                                                    |
| Shadow           | `none`                                                    |
| Accent usage     | `none`                                                    |

**Pattern notes:**
- POST endpoint used by the client-side browser client (`createBrowserClient`) to automatically synchronize memory session state and fetch the logged-in user profile on page reloads/initialization.
- Utilizes `createRefreshAuthRouter` to query the InsForge backend and update cookies in response headers.

---

### Dashboard (Auth Welcome & Navigation)

File: [app/dashboard/page.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/app/dashboard/page.tsx)
Last updated: 2026-06-27

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `bg-background` (page), `bg-surface` (cards)               |
| Border           | `border border-border` (cards)                             |
| Border radius    | `rounded-2xl` (cards), `rounded-xl` (inner navigation links) |
| Text — primary   | `text-text-primary font-semibold text-xl md:text-2xl`     |
| Text — secondary | `text-text-secondary text-sm`                             |
| Spacing          | `p-6 md:p-8` (page layout), `p-6` (cards)                 |
| Hover state      | `hover:bg-surface-secondary` (signout), `hover:bg-surface-tertiary` (links) |
| Shadow           | `shadow-sm`                                               |
| Accent usage     | `bg-accent/10 text-accent` (icon wrapper), `bg-accent` (CTA button) |

**Pattern notes:**
- The page acts as the main landing surface for authenticated users. Welcomes users by profile name or email.
- Wraps sign-out in a form trigger pointing to the `signOutAction` server action to cleanly expire cookies.

---

### PostHog Provider

File: [components/providers/PostHogProvider.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/components/providers/PostHogProvider.tsx)
Last updated: 2026-06-28

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `none` (Logical wrapper component)                        |
| Border           | `none`                                                    |
| Border radius    | `none`                                                    |
| Text — primary   | `none`                                                    |
| Text — secondary | `none`                                                    |
| Spacing          | `none`                                                    |
| Hover state      | `none`                                                    |
| Shadow           | `none`                                                    |
| Accent usage     | `none`                                                    |

**Pattern notes:**
- Client-side React context wrapper that loads the PostHog telemetry framework on demand, keeping layouts and root routing nodes as Server Components.

---

### Profile Form

File: [components/profile/ProfileForm.tsx](file:///C:/Users/Johnny/Agy_test/lead_finder/components/profile/ProfileForm.tsx)
Last updated: 2026-06-28

| Property         | Class                                                     |
| ---------------- | --------------------------------------------------------- |
| Background       | `bg-surface` (cards), `bg-surface-secondary` (inputs and drag-and-drop), `bg-accent` (save/generate buttons), `bg-error/10` (attention banner indicators), `bg-accent-muted` (icon circles) |
| Border           | `border border-border` (cards, inputs), `border-2 border-dashed border-border-muted` (dropzone), `border-border-light` (tags) |
| Border radius    | `rounded-2xl` (cards), `rounded-xl` (inner dynamic container/banners), `rounded-md` (buttons, inputs), `rounded-full` (tags) |
| Text — primary   | `text-text-primary` (labels, text values), `text-accent-foreground` (buttons) |
| Text — secondary | `text-text-secondary` (subtexts, helper notes), `text-text-muted` (disabled text) |
| Spacing          | `p-6` (cards), `p-5` (role card), `p-8` (dropzone), `px-3 py-2` (inputs), `px-4 py-2` (buttons), `gap-6` (page sections), `gap-4` (grid layout) |
| Hover state      | `hover:bg-accent-dark` (accent buttons), `hover:bg-surface-secondary/50` (dropzone hover), `hover:bg-surface-secondary` (secondary buttons), `hover:text-error` (delete button) |
| Shadow           | `shadow-sm` (cards and inputs)                            |
| Accent usage     | `text-accent` (role add text, icons), `bg-accent` (primary button), `bg-accent-muted` (icon wrapper) |

**Pattern notes:**
- Client-side interactive profile and resume management form.
- Dynamically manages skills and industries tags, file drag-and-drop upload, and list additions for up to 3 work experience roles.
- Custom SVG circular progress ring for rendering completion percentage dynamically.
- Email input is locked as read-only. Start Date fields are annotated with a Calendar icon. End Date fields are disabled when the "Currently working here" checkbox is checked.
- Incorporates "Cover Letter Tone" preference selection (Formal, Casual, Enthusiastic).
- Fully wired to `saveProfileAction` (Server Action) for DB saving, storage PDF upload, and PostHog tracking.



