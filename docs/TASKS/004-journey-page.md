# Task 004 — Journey Page

## Objective

Build the production Journey screen where players view and manage their active journeys, replacing the mock-data prototypes at `/projects` and `/projects-v2`.

## Requirements

- List all active journeys for the authenticated user
- Show journey title, description, focus areas, and progress
- Display focus area levels and weekly quest completion
- Tap a journey to view detail (focus areas, quests, schedules)
- Option to start a new journey (link to Mission Builder)
- Use "Journey" terminology throughout — no "Project"
- Route: `/journey`

## Acceptance Criteria

- [ ] Loads real journey data from Supabase (`projects`, `focus_areas`, `habits`)
- [ ] Journey list shows all active journeys for the user
- [ ] Journey detail view shows focus areas and quests
- [ ] "Start New Journey" CTA links to Mission Builder
- [ ] No references to "Project" in UI copy
- [ ] Mobile-first layout on 375px viewport
- [ ] Empty state when user has no journeys

## Things NOT to Change

- Database table names (`projects`, `focus_areas`, `habits`) — rename is a separate migration
- Mission Builder or Mission Briefing flows
- Execute page quest completion logic
- XP system

## Implementation Details

_(Leave empty until implementation begins.)_
