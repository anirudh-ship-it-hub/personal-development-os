# Decisions

Changelog of important product and technical decisions. Add a new entry when making a choice that affects future development.

Format: **Decision** | **Reason** | **Status** | **Date**

---

## Navigation & Layout

| Decision | Reason | Status | Date |
|----------|--------|--------|------|
| Bottom navigation instead of top navigation | Mobile-first app feel; thumb-reachable tabs match native apps (Duolingo, Apple Fitness) | Planned — top nav still in codebase | 2025-06 |
| Hide navigation during onboarding | Mission Builder and Briefing are focused flows; nav would distract | Accepted | 2025-06 |
| Four main tabs: Home, Execute, Journey, Hero | Covers the core loop without overcrowding the tab bar | Planned | 2025-06 |

## Terminology

| Decision | Reason | Status | Date |
|----------|--------|--------|------|
| Rename Projects → Journeys | "Project" implies work management; "Journey" reinforces the RPG narrative of becoming your future self | In progress — UI partially updated, DB still uses `projects` | 2025-06 |
| Rename Profile → Hero | "Profile" is generic; "Hero" makes the player the protagonist of their story | Planned — Hero page not yet built | 2025-06 |
| Rename Command Center → Home | "Command Center" is corporate; "Home" is the familiar app entry point | Planned — route still `/command-center` | 2025-06 |
| Rename Execution → Execute | Verb form matches action-oriented tab (Execute today's quests) | Planned — route still `/execution` | 2025-06 |
| Rename Habits → Quests | "Habit" is tracker language; "Quest" is RPG language | In progress — DB still uses `habits` | 2025-06 |
| Avoid Dashboard, Task, Project, Profile in UI | Keeps product identity distinct from productivity tools | Accepted | 2025-06 |

## Platform & Design

| Decision | Reason | Status | Date |
|----------|--------|--------|------|
| Dark theme only | Premium game aesthetic; matches inspiration (Apple Fitness, Habitica) | Accepted | 2025-06 |
| Mobile-first PWA strategy | Primary use case is daily phone check-in; PWA avoids app store friction while feeling native | Planned | 2025-06 |
| No light mode | Simplifies design system; dark is the brand | Accepted | 2025-06 |

## Technical

| Decision | Reason | Status | Date |
|----------|--------|--------|------|
| Supabase for backend | Fast iteration, built-in auth and PostgreSQL, generous free tier | Accepted | 2025-06 |
| Next.js App Router | Server components, API routes, Vercel deployment | Accepted | 2025-06 |
| AI mission generation via API route | Keeps API keys server-side; Groq for speed, Gemini as fallback | Accepted | 2025-06 |
| Session storage for mission draft | Mission Briefing receives AI output without a DB write until user confirms | Accepted | 2025-06 |
| 100 XP per level | Simple, understandable progression; easy to award per-quest XP | Accepted | 2025-06 |
| Rank titles at level thresholds | Explorer → Pathfinder → Builder → Strategist → Architect → Mastermind | Accepted | 2025-06 |

## Documentation

| Decision | Reason | Status | Date |
|----------|--------|--------|------|
| `/docs` as single source of truth for AI agents | Ensures every agent reads the same vision, principles, and terminology before coding | Accepted | 2025-06-27 |

---

## Adding a New Decision

```markdown
| Decision | Reason | Status | Date |
|----------|--------|--------|------|
| Your decision here | Why this choice was made | Accepted / Planned / Superseded | YYYY-MM-DD |
```

Status values:

- **Accepted** — Decision is active and implemented or agreed
- **Planned** — Decision made, implementation pending
- **Superseded** — Replaced by a newer decision (link to it)
