# Task 003 — Execute Page

## Objective

Polish the Execute screen (currently Execution) as the primary daily action screen where players complete today's quests.

## Requirements

- Rename UI copy from "Execution" to "Execute"
- Mobile-first layout with large tap-to-complete quest items
- Show quests grouped by journey and focus area
- XP popup on quest completion
- Perfect day celebration when all quests completed
- Route migration from `/execution` to `/execute` with redirect from old route

## Acceptance Criteria

- [ ] Page title and headings use "Execute" not "Execution"
- [ ] Quest completion writes to `habit_logs` and awards XP to `xp_logs`
- [ ] XP popup appears on completion
- [ ] Perfect day detection and celebration works
- [ ] `/execute` is the primary route; `/execution` redirects to `/execute`
- [ ] Layout works on 375px mobile viewport
- [ ] Completed quests visually distinct from pending

## Things NOT to Change

- XP award amounts or perfect day logic
- Database schema (`habit_logs`, `xp_logs`)
- Quest scheduling logic
- Mission Builder or Mission Briefing

## Implementation Details

_(Leave empty until implementation begins.)_
