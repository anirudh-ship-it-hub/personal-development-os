# UI Guidelines

Design language and terminology for Level Up. All new UI must follow these guidelines.

## Theme

- **Dark only** — Background: `neutral-950`. Cards and surfaces use dark neutrals with subtle borders.
- No light mode unless explicitly approved in [DECISIONS.md](./DECISIONS.md).

## Design Style

| Attribute | Guideline |
|-----------|-----------|
| Layout | Mobile-first, single-column on phone |
| Feel | Native app, not a website |
| Touch targets | Large — minimum 44px tap area |
| Cards | Rounded (`rounded-xl` or larger), subtle borders |
| Spacing | Generous padding and gaps — avoid cramped layouts |
| Typography | Bold headings, clear hierarchy, emoji accents sparingly |
| Color | Blue accents for primary actions and progress; neutral grays for secondary |
| Navigation | Bottom tab bar in main app (planned); hide nav during onboarding flows |

## Inspiration

Draw from the best of:

- **Duolingo** — Daily streak energy, playful progress, clear next action
- **Habitica** — RPG framing for real-life habits
- **Apple Fitness** — Clean rings, celebration moments, premium dark aesthetic
- **Notion** — Calm, focused content blocks
- **Superhuman** — Speed, minimal chrome, keyboard/touch efficiency

## Terminology

Use these terms consistently in UI copy, code comments, and documentation.

| Use | Meaning |
|-----|---------|
| **Journey** | A long-term path the player is on (e.g., Transform My Health) |
| **Quest** | A daily actionable item the player completes |
| **Hero** | The player's character — profile, stats, level, rank |
| **XP** | Experience points earned from completing quests |
| **Level** | Numeric progression derived from total XP |
| **Rank** | Title at a level tier (Explorer, Pathfinder, Builder, etc.) |
| **Mission** | The AI-generated plan for a journey — focus areas and quests |
| **Home** | Main hub showing today's overview, stats, and active journeys |
| **Execute** | Screen for completing today's quests |
| **Journey** | Screen for viewing and managing journeys |

### Avoid

| Do Not Use | Use Instead |
|------------|-------------|
| Project | Journey |
| Task | Quest |
| Dashboard | Home |
| Profile | Hero |
| Command Center | Home (legacy — rename in progress) |
| Execution | Execute (legacy — rename in progress) |

## Component Patterns

- **Stat cards** — Rounded, bordered, emoji + label + value
- **Progress bars** — Thin, blue fill, percentage or XP fraction
- **Quest items** — Checkbox or tap-to-complete with XP reward shown
- **Level display** — Large level number, rank title, XP to next level
- **Empty states** — Encourage starting a journey via Mission Builder

## Onboarding Flows

Hide main navigation during:

- Login / Signup
- Mission Builder
- Mission Briefing

These are focused, full-screen experiences that should not show bottom or top nav.

## Responsive Behavior

- **Mobile (< 768px)** — Primary target. Single column, bottom nav, full-width cards.
- **Tablet / Desktop** — May use wider max-width containers but must remain fully functional on mobile first.
