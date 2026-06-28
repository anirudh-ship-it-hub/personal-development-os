# Level Up — Product Documentation

**Level Up** is a mobile-first RPG where the player becomes their future self by completing daily quests, earning XP, and leveling up through meaningful journeys.

## Current Status

**Prototype → Production transition.** Core flows are built and functional: authentication, AI-powered mission generation, mission briefing, daily quest execution, XP/leveling, and streak tracking. The app still uses legacy naming in places (Command Center, Execution, projects in the database) while the product vision standardizes on Home, Execute, Journey, and Hero with bottom navigation.

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Backend | Supabase |
| Database | PostgreSQL (via Supabase) |
| Authentication | Supabase Auth |
| AI | Groq / Google Generative AI (mission generation) |
| Deployment | Vercel |

See [TECH_STACK.md](./TECH_STACK.md) for details.

## High-Level Architecture

```
Auth (Login / Signup)
        ↓
Mission Builder → Mission Briefing
        ↓
Main App
  ├── Home (Command Center today)
  ├── Execute (daily quests)
  ├── Journey (journeys overview)
  └── Hero (player profile & stats)
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full application structure.

## How AI Agents Should Use This Documentation

1. **Start here** — Read this README, then [VISION.md](./VISION.md) and [PRODUCT_PRINCIPLES.md](./PRODUCT_PRINCIPLES.md) before writing code.
2. **Check terminology** — Use [UI_GUIDELINES.md](./UI_GUIDELINES.md) for naming and design language. Do not introduce avoided terms (Project, Task, Dashboard, Profile).
3. **Understand the stack** — [TECH_STACK.md](./TECH_STACK.md) and [ARCHITECTURE.md](./ARCHITECTURE.md) define how the app is built and organized.
4. **Pick up work** — Active implementation specs live in [TASKS/](./TASKS/). Read the relevant task file before starting a feature.
5. **Respect decisions** — [DECISIONS.md](./DECISIONS.md) records product choices already made. Do not reverse them without explicit user approval.
6. **Plan ahead** — [ROADMAP.md](./ROADMAP.md) shows what is built vs. planned. Stay within the current milestone unless directed otherwise.
7. **Test releases** — [UAT/](./UAT/) contains acceptance checklists for each release.

When in doubt, prefer consistency with existing docs over inventing new patterns.

## Documentation Index

| Document | Purpose |
|----------|---------|
| [VISION.md](./VISION.md) | Product identity and long-term direction |
| [PRODUCT_PRINCIPLES.md](./PRODUCT_PRINCIPLES.md) | Rules every feature must follow |
| [UI_GUIDELINES.md](./UI_GUIDELINES.md) | Design language and terminology |
| [TECH_STACK.md](./TECH_STACK.md) | Technologies and infrastructure |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Application structure and modules |
| [ROADMAP.md](./ROADMAP.md) | Version milestones and planned work |
| [DECISIONS.md](./DECISIONS.md) | Product decision log |
| [LESSONS_LEARNED.md](./LESSONS_LEARNED.md) | Post-release retrospectives |
| [TASKS/](./TASKS/) | Feature implementation specs |
| [UAT/](./UAT/) | User acceptance test checklists |
