# Task 002 — Home Redesign

## Objective

Redesign the Home screen (currently Command Center) as a mobile-first hub that shows today's overview, Hero stats, and active journeys.

## Requirements

- Rename UI copy from "Command Center" to "Home"
- Mobile-first single-column layout
- Display: level, rank title, XP progress bar, streak, perfect days, total XP
- Show active journeys with today's quest progress
- Recent XP activity feed
- CTA to start a new journey (Mission Builder) when no journeys exist
- Route migration from `/command-center` to `/home` with redirect from old route

## Acceptance Criteria

- [ ] Page title and headings use "Home" not "Command Center"
- [ ] Layout optimized for 375px mobile viewport
- [ ] All existing stats load correctly (XP, streak, perfect days, journeys)
- [ ] `/home` is the primary route; `/command-center` redirects to `/home`
- [ ] Root `/` redirect points to `/home` for authenticated users
- [ ] Matches dark theme and UI guidelines

## Things NOT to Change

- XP calculation logic (`lib/game-system.ts`)
- Database queries for stats (may refactor for readability, not behavior)
- Mission Builder or Mission Briefing
- Execute page functionality

## Implementation Details

_(Leave empty until implementation begins.)_
