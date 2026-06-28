# Tech Stack

Technologies and infrastructure used by Level Up.

## Frontend

| Technology | Version / Notes |
|------------|-----------------|
| **Next.js** | App Router (`app/` directory) |
| **React** | Client and server components |
| **TypeScript** | Strict typing across the codebase |
| **Tailwind CSS** | Utility-first styling, dark theme |
| **Geist** | Primary font (via `next/font`) |

### Key Frontend Paths

```
app/
  auth/login/          Login page
  auth/signup/         Signup page
  mission-builder/     AI mission generation
  mission-briefing/    Review and save mission
  command-center/      Home (to be renamed)
  execution/           Execute daily quests (to be renamed)
  projects/            Journey prototypes
components/
  Navbar.tsx           Top nav (to be replaced by bottom nav)
lib/
  supabase.ts          Supabase client
  game-system.ts       Level titles, XP logic
  ai/generateMission.ts AI mission generation
  data/                Data access helpers
```

## Backend

| Technology | Purpose |
|------------|---------|
| **Supabase** | Backend-as-a-service — database, auth, realtime |
| **Next.js API Routes** | Server endpoints (e.g., `/api/generate-mission`) |

## Database

| Technology | Details |
|------------|---------|
| **PostgreSQL** | Hosted via Supabase |
| **Row Level Security** | User-scoped data access |

### Core Tables

| Table | Product Term | Purpose |
|-------|--------------|---------|
| `projects` | Journey | Active journeys per user |
| `focus_areas` | Focus Area | Grouping within a journey |
| `habits` | Quest | Individual daily quests |
| `habit_logs` | Quest Log | Daily completion records |
| `xp_logs` | XP Log | XP earned per action |

> **Note:** Database table names still use legacy terms (`projects`, `habits`). UI and docs use Journey and Quest. Rename migrations are planned; do not rename tables without a migration plan.

## Authentication

| Technology | Details |
|------------|---------|
| **Supabase Auth** | Email/password login and signup |
| **Session** | Client-side via `@supabase/supabase-js` |

Protected routes check `supabase.auth.getUser()` and redirect to `/auth/login` if unauthenticated.

## AI

| Provider | Purpose |
|----------|---------|
| **Groq** | Mission generation (primary) |
| **Google Generative AI** | Mission generation (alternative) |

Mission data flows: Mission Builder → `/api/generate-mission` → sessionStorage → Mission Briefing → Supabase.

## Deployment

| Platform | Details |
|----------|---------|
| **Vercel** | Hosting, preview deployments, production |

Environment variables required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- AI provider keys (Groq, Google Generative AI)

## Future

| Technology | Purpose | Status |
|------------|---------|--------|
| **PWA** | Installable app, offline shell, home screen icon | Planned (V1.1) |
| **Push Notifications** | Daily quest reminders, streak alerts | Planned (V2) |
| **AI Coach** | In-app conversational guide | Planned (V3) |
