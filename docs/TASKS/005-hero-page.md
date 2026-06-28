# Task 005 — Hero Page

## Objective

Build the Hero screen — the player's profile showing level, rank, stats, and account actions.

## Requirements

- Display Hero level, rank title, total XP, and XP to next level
- Show streak, perfect days, and journey count
- XP progress bar with level visualization
- Logout button (moved from top navbar)
- Route: `/hero`
- Use "Hero" terminology — no "Profile"

## Acceptance Criteria

- [ ] Hero page accessible via bottom nav 👤 tab
- [ ] Displays level, rank title (from `getLevelTitle`), total XP
- [ ] Shows current streak and perfect day count
- [ ] XP progress bar accurate (XP into current level / 100)
- [ ] Logout signs out via Supabase and redirects to `/auth/login`
- [ ] No references to "Profile" in UI copy
- [ ] Mobile-first layout on 375px viewport

## Things NOT to Change

- XP calculation logic (`lib/game-system.ts`)
- Supabase auth configuration
- Database schema
- Other main app pages (Home, Execute, Journey)

## Implementation Details

_(Leave empty until implementation begins.)_
