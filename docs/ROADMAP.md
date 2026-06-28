# Roadmap

Version milestones for Level Up. Each version builds on the last. Tasks in [TASKS/](./TASKS/) map to specific roadmap items.

---

## V1 — Core Loop (Current)

**Status:** Built, in refinement

The minimum playable loop: sign up, generate a mission, complete daily quests, earn XP, level up.

### Built

| Feature | Route / Location | Notes |
|---------|------------------|-------|
| Authentication | `/auth/login`, `/auth/signup` | Supabase email/password |
| Mission Builder | `/mission-builder` | AI-generated missions from templates or custom goals |
| Mission Briefing | `/mission-briefing` | Review, edit, and save journeys to database |
| Home (Command Center) | `/command-center` | Level, XP, streak, perfect days, journey overview |
| Execute | `/execution` | Daily quest completion with XP rewards |
| XP System | `lib/game-system.ts`, `xp_logs` table | 100 XP/level, rank titles |
| Streaks | Home + Execute | Consecutive days with completed quests |
| Perfect Days | Execute | Bonus XP when all quests completed |
| Top Navigation | `components/Navbar.tsx` | Command Center + Execution links |

### In Progress / Needs Polish

- Legacy naming (Command Center → Home, Execution → Execute, projects → Journey)
- Journey and Hero pages are prototypes only
- Mobile layout optimization
- Loading states and error handling

---

## V1.1 — Mobile App Shell

**Status:** Planned

Transform the prototype into a mobile-first app experience.

### Planned

| Feature | Task | Notes |
|---------|------|-------|
| Bottom navigation | [001-bottom-navigation.md](./TASKS/001-bottom-navigation.md) | Replace top navbar with 4-tab bottom nav |
| Home redesign | [002-home-redesign.md](./TASKS/002-home-redesign.md) | Rename Command Center → Home, mobile layout |
| Execute page | [003-execute-page.md](./TASKS/003-execute-page.md) | Rename Execution → Execute, polish UX |
| Journey page | [004-journey-page.md](./TASKS/004-journey-page.md) | Production journey view from prototype |
| Hero page | [005-hero-page.md](./TASKS/005-hero-page.md) | Player profile, stats, logout |
| PWA | [006-pwa.md](./TASKS/006-pwa.md) | Manifest, service worker, install prompt |

### Acceptance

- UAT checklist: [UAT/v1-beta.md](./UAT/v1-beta.md)

---

## V2 — Engagement & Retention

**Status:** Planned

Deepen the RPG loop and keep players coming back.

### Planned

| Feature | Description |
|---------|-------------|
| Push notifications | Daily quest reminders, streak-at-risk alerts |
| Achievements | Badges for milestones (7-day streak, first perfect day, level 10, etc.) |
| Journey progress visualization | Focus area levels, weekly completion rings |
| Onboarding improvements | Guided first journey, tutorial quest |
| Database rename migration | `projects` → journeys table, `habits` → quests (with migration) |
| Performance | Optimistic UI, reduced load times |

---

## V3 — Social & AI Coach

**Status:** Future

Community and intelligent guidance.

### Planned

| Feature | Description |
|---------|-------------|
| AI Coach | Conversational agent that adapts missions and motivates in character |
| Guilds | Shared groups with collective goals and leaderboards |
| Social | Friends, accountability partners, shared achievements |
| Advanced missions | Multi-phase missions with checkpoints and story beats |
| Custom avatars | Hero visual identity that evolves with level |

---

## How to Update This Roadmap

When a feature ships, move it from Planned to Built under the appropriate version. When scope changes, update the relevant TASK file and add a decision to [DECISIONS.md](./DECISIONS.md).
