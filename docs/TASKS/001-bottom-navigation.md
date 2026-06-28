# Task 001 — Bottom Navigation

## Objective

Replace the current top navbar with a mobile-first bottom tab bar containing four tabs: Home, Execute, Journey, and Hero.

## Requirements

- Four tabs with icons and labels: 🏠 Home, ⚔ Execute, 🧭 Journey, 👤 Hero
- Fixed to bottom of viewport on mobile
- Active tab highlighted with accent color
- Hide bottom nav on auth pages, Mission Builder, and Mission Briefing
- Logout moves to Hero page (remove from nav bar)
- Touch targets meet 44px minimum

## Acceptance Criteria

- [ ] Bottom nav visible on Home, Execute, Journey, and Hero
- [ ] Bottom nav hidden on `/auth/*`, `/mission-builder`, `/mission-briefing`
- [ ] Active tab reflects current route
- [ ] Top navbar removed from main app
- [ ] Works on mobile viewport (375px width)
- [ ] No regression to existing page functionality

## Things NOT to Change

- Mission Builder and Mission Briefing flows
- Supabase auth logic
- Database schema
- XP system or quest completion logic
- API routes

## Implementation Details

_(Leave empty until implementation begins.)_
