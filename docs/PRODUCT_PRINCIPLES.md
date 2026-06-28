# Product Principles

Every feature in Level Up must follow these rules. When proposing or implementing work, check each principle before shipping.

## User Value

- **Every feature must solve a real user problem.** If it doesn't help the player become their future self, it doesn't ship.
- **Simplicity over feature bloat.** One well-crafted quest flow beats ten half-built screens.
- **Prefer shipping small iterations.** Ship, learn, improve. Avoid large rewrites unless explicitly planned.

## RPG Identity

- **Reinforce the RPG feeling.** Use game terminology (Quest, Journey, Hero, XP, Level, Rank, Mission). Avoid corporate or productivity jargon.
- **Gamification should support behavior change, not distract from it.** XP and levels exist to motivate action, not to gamify for its own sake.
- **Celebrate progress.** Completing quests, leveling up, and hitting streaks should feel rewarding — visually and emotionally.

## Design & Platform

- **Mobile-first.** Design for phone screens first. Desktop is secondary.
- **Dark theme only.** No light mode unless explicitly decided otherwise.
- **Native app feeling.** Large touch targets, smooth transitions, bottom navigation, minimal chrome.
- **Spacious layouts.** Breathing room over information density. Rounded cards, clear hierarchy.

## Technical

- **Documentation is the source of truth.** Update docs when making product or architecture decisions.
- **Consistency over cleverness.** Match existing patterns in code and UI before introducing new abstractions.
- **Database naming may lag UI naming.** The `projects` table maps to Journeys in the product. Migrate carefully; don't break existing data.

## What We Avoid

- Generic productivity patterns (dashboards, task lists, project management)
- Feature flags for half-built experiences visible to users
- Over-engineering for hypothetical future scale
- Light mode, top navigation (for the main app), or desktop-first layouts
