# UAT — V1 Beta

User acceptance test checklist for the V1 Beta release. Test on a mobile device (or mobile viewport in browser dev tools) unless noted otherwise.

**Tester:** _______________
**Date:** _______________
**Environment:** _______________ (local / staging / production)
**Device:** _______________

---

## Authentication

- [ ] Signup with email and password creates an account
- [ ] Signup redirects to Mission Builder
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials shows an error
- [ ] Authenticated user visiting `/` redirects to Home
- [ ] Unauthenticated user visiting protected routes redirects to Login

## Mission Builder

- [ ] Goal templates populate the input field
- [ ] Custom goal text can be entered
- [ ] "Begin Journey" triggers AI mission generation
- [ ] Loading states display during generation
- [ ] Successful generation redirects to Mission Briefing
- [ ] Error state shown if generation fails
- [ ] Navigation hidden during Mission Builder

## Mission Briefing

- [ ] AI-generated mission data displays correctly
- [ ] Mission name, description, and focus areas are editable
- [ ] Quest names and schedules can be modified
- [ ] Saving mission creates journey in database
- [ ] Redirect to Home after save
- [ ] Navigation hidden during Mission Briefing

## Home

- [ ] Level and rank title display correctly
- [ ] XP progress bar reflects current XP
- [ ] Streak count is accurate
- [ ] Perfect days count is accurate
- [ ] Total XP displays correctly
- [ ] Active journeys listed with quest counts
- [ ] Recent XP activity feed shows latest entries
- [ ] Page loads without errors for user with journeys
- [ ] Page loads without errors for user with no journeys

## Execute

- [ ] Today's quests load for active journeys
- [ ] Tapping a quest marks it complete
- [ ] XP popup appears on quest completion
- [ ] Completed quests visually distinct from pending
- [ ] Perfect day celebration when all quests completed
- [ ] Quest completion persists after page refresh
- [ ] Quests grouped by journey and focus area

## Journey

- [ ] Journey list loads from database (not mock data)
- [ ] Journey detail shows focus areas and quests
- [ ] "Start New Journey" links to Mission Builder
- [ ] Empty state shown when no journeys exist
- [ ] UI uses "Journey" not "Project"

## Hero

- [ ] Level, rank, and XP display correctly
- [ ] Streak and perfect day stats shown
- [ ] XP progress bar accurate
- [ ] Logout signs out and redirects to Login
- [ ] UI uses "Hero" not "Profile"

## PWA Installation

- [ ] Manifest present and valid
- [ ] App icon displays on home screen after install
- [ ] App opens in standalone mode (no browser URL bar)
- [ ] Install prompt or instructions available

## Responsive Design

- [ ] All main screens usable at 375px width (iPhone SE)
- [ ] All main screens usable at 390px width (iPhone 14)
- [ ] Touch targets are easily tappable (no mis-taps)
- [ ] Text readable without horizontal scrolling
- [ ] Bottom navigation accessible and not obscured by device UI

## XP System

- [ ] Quest completion awards XP
- [ ] XP total increases on Home and Hero after completion
- [ ] Level increases at 100 XP thresholds
- [ ] Rank title updates at level thresholds (5, 10, 20, 30, 50)
- [ ] Perfect day awards bonus XP
- [ ] XP logs recorded in activity feed

## Streaks

- [ ] Streak increments on consecutive days with completed quests
- [ ] Streak resets after a missed day
- [ ] Streak displays on Home and Hero
- [ ] Streak uses local date (not UTC shift)

## Navigation

- [ ] Bottom nav shows four tabs: Home, Execute, Journey, Hero
- [ ] Active tab highlighted on current page
- [ ] Bottom nav hidden on auth and onboarding pages
- [ ] All four tabs navigate to correct routes
- [ ] No top navbar on main app pages

## Logout

- [ ] Logout accessible from Hero page
- [ ] Logout clears session
- [ ] After logout, protected routes redirect to Login

## Deployment

- [ ] Production build succeeds (`next build`)
- [ ] App loads on Vercel deployment URL
- [ ] Environment variables configured (Supabase, AI keys)
- [ ] No console errors on initial load
- [ ] Auth works on deployed URL (not just localhost)

---

## Test Results Summary

| Area | Pass | Fail | Notes |
|------|------|------|-------|
| Authentication | | | |
| Mission Builder | | | |
| Mission Briefing | | | |
| Home | | | |
| Execute | | | |
| Journey | | | |
| Hero | | | |
| PWA | | | |
| Responsive Design | | | |
| XP System | | | |
| Streaks | | | |
| Navigation | | | |
| Logout | | | |
| Deployment | | | |

**Overall Result:** ☐ Pass  ☐ Fail  ☐ Pass with notes

**Blockers:**

**Notes:**
