# Architecture

Application structure for Level Up. This document describes how the app is organized today and where it is heading.

## Route Map

```
/                          → Redirect to login or Home
/auth/login                → Login
/auth/signup               → Signup
/mission-builder           → Choose goal, generate mission (AI)
/mission-briefing          → Review mission, edit quests, save journey
/command-center            → Home (legacy name)
/execution                   → Execute daily quests (legacy name)
/projects                  → Journey prototype (mock data)
/projects-v2               → Journey prototype v2
/habits                    → Habits prototype
```

## User Flow

```
                    ┌─────────────┐
                    │   Signup    │
                    │   Login     │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Mission   │
                    │   Builder   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Mission   │
                    │  Briefing   │
                    └──────┬──────┘
                           │
              ┌────────────▼────────────┐
              │       Main App          │
              │  (bottom navigation)    │
              └─────────────────────────┘
```

Navigation is hidden during auth and onboarding (Mission Builder, Mission Briefing).

## Main App — Bottom Navigation (Target)

The main app uses four tabs. Current implementation uses a top navbar with two links; bottom nav is planned.

| Tab | Route (target) | Route (current) | Purpose |
|-----|----------------|-----------------|---------|
| 🏠 Home | `/home` | `/command-center` | Today's overview, XP, streak, active journeys |
| ⚔ Execute | `/execute` | `/execution` | Complete today's quests |
| 🧭 Journey | `/journey` | `/projects` (prototype) | View and manage journeys |
| 👤 Hero | `/hero` | _(not built)_ | Player profile, level, rank, stats |

## Module Details

### Authentication

- **Login** (`/auth/login`) — Email/password sign-in via Supabase Auth
- **Signup** (`/auth/signup`) — Account creation, redirects to Mission Builder for first journey

### Mission Builder

- Player enters a goal or selects a template
- Calls `/api/generate-mission` with AI provider
- Stores generated mission in `sessionStorage`
- Redirects to Mission Briefing

### Mission Briefing

- Reviews AI-generated mission: name, description, focus areas, quests
- Player can edit quest names, schedules, and focus areas
- Saves journey to Supabase (`projects`, `focus_areas`, `habits` tables)
- Supports multiple active journeys per user

### Home (Command Center)

- Displays Hero rank title, level, XP progress bar
- Shows streak, perfect days, total XP
- Lists active journeys with quest counts
- Recent XP activity feed
- Entry point after login

### Execute

- Loads active journeys with today's scheduled quests
- Tap to complete quests → writes to `habit_logs`, awards XP to `xp_logs`
- Perfect day detection when all quests completed
- XP popup animations on completion

### Journey (Planned)

- Full journey management: view progress, focus area levels, quest schedules
- Prototype exists at `/projects` and `/projects-v2` with mock data

### Hero (Planned)

- Player profile: avatar, level, rank, total XP, streak history
- Achievement showcase (future)
- Account settings and logout

## Data Layer

```
User (Supabase Auth)
  └── Journeys (projects)
        └── Focus Areas (focus_areas)
              └── Quests (habits)
                    └── Quest Logs (habit_logs)
  └── XP Logs (xp_logs)
```

### XP System

- Defined in `lib/game-system.ts`
- 100 XP per level
- Rank titles at level thresholds: Explorer (1), Pathfinder (5), Builder (10), Strategist (20), Architect (30), Mastermind (50)

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/generate-mission` | POST | AI mission generation from user goal |

## Shared Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Navbar` | `components/Navbar.tsx` | Top navigation (to be replaced) |
| Root Layout | `app/layout.tsx` | Fonts, dark theme, global nav |

## Future Modules

| Module | Description | Target Version |
|--------|-------------|----------------|
| **Achievements** | Badges and milestones for streaks, levels, perfect days | V2 |
| **Guilds** | Shared groups with collective goals | V3 |
| **AI Coach** | Conversational guide for mission adaptation | V3 |
| **Social** | Friends, accountability, shared progress | V3 |
