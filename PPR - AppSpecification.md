# Product Pitch Roulette - Web App Specification

## Project Overview

A casino-themed slot machine web app for facilitating the "Product Pitch Roulette" team building activity. The app will randomly select constraints across three categories (Target User, Product Type, Core Feature) with animated slot machine reels and CoverMyMeds branding.

* * *

## Core Requirements

### 1\. Visual Design & Branding

**Theme:** Casino/slot machine aesthetic with CoverMyMeds brand colors

**Color Palette:**

- Primary: Orange (#FF8F1C), Magenta (#EB0868)
- Secondary: Dark Blue (#01426A), Light Blue (#1E91D6)
- Use orange and magenta prominently; blues as accents

**Layout:**

- Large, bold "PRODUCT PITCH ROULETTE" header
- Three vertically-stacked slot machine reels (one per category)
- Each reel labeled: "TARGET USER", "PRODUCT TYPE", "CORE FEATURE"
- Pull lever/spin button (prominent, casino-styled)
- Settings gear icon (subtle, corner placement)
- Reset button (appears after spin completes)

**Slot Machine Reels:**

- Style as classic slot machine windows
- **Nice-to-have:** Show selected option plus options above/below through the "window" (if feasible)
- **Minimum viable:** Just show the selected option clearly
- Full text of each option should be visible (not truncated)

**Visual Effects:**

- Flashing lights/casino styling around reels
- Animated confetti or celebration when all reels stop
- Clear visual indicator when final results are locked in

* * *

## 2\. Spinning Mechanics

**Trigger:** User clicks prominent "PULL LEVER" or "SPIN" button

**Animation Sequence:**

1. All three reels start spinning simultaneously
2. Options blur/cycle through rapidly (animated)
3. Reels stop sequentially with brief delay between each:
    - Reel 1 (Target User) stops first
    - Reel 2 (Product Type) stops second
    - Reel 3 (Core Feature) stops third
4. Final "reveal" state with visual emphasis on the complete result set

**Selection Logic:**

- Random selection from available options in each category
- **Important:** After a combination is selected, remove those specific options from the pool for subsequent spins (prevent duplicate assignments to different teams)
- Must be able to reset/restore all options between sessions

**Sound Effects (Low Priority):**

- Slot machine spinning sound (if easy to implement)
- "Ding" or celebration sound when reels stop
- Keep sound optional/toggleable given venue uncertainty

* * *

## 3\. Settings/Configuration Panel

**Access:** Gear icon in corner → opens modal/overlay

**Security:**

- Simple PIN protection (4-digit code or similar)
- Defaults: PIN = "1234" or make it configurable
- **Alternative:** Leave openly accessible if PIN adds too much complexity

**Editing Interface:** Three text areas (one per category) where each line = one option:

```
TARGET USER
-------------------
Toddlers with executive authority
People who refuse to admit they need help
Conspiracy theorists
Time travelers from exactly 1987
[etc.]
```

**Functionality:**

- Add new options (new line in text box)
- Edit existing options (modify text)
- Remove options (delete line)
- Should support 8-15 options per category
- Save button to persist changes

**Persistence:**

- Save to browser localStorage (simple, no backend needed)
- Changes persist across page reloads
- Include "Reset to Defaults" button to restore original constraint list

**Additional Settings:**

- "Clear Used Options" button - restores all options to available pool
- Option to toggle sound on/off

* * *

## 4\. Post-Spin Display

**After All Reels Stop:**

- Prominent display of the three selected constraints
- Visual treatment that says "YOUR COMBINATION" or "TEAM X GETS..."
- "SPIN AGAIN" or "NEXT TEAM" button appears
- Optional: Team counter (Team 1, Team 2, etc.) that increments

**Used Options Tracking:**

- Visual indicator in settings showing which options have been used
- Ability to manually mark options as available/unavailable

* * *

## 5\. Technical Specifications

**Tech Stack:**

- **Framework:** React (Next.js for easy Vercel deployment)
- **Styling:** Tailwind CSS or vanilla CSS (whatever's simpler for animations)
- **State Management:** React hooks (useState, useEffect)
- **Persistence:** localStorage for settings and used options
- **Deployment:** Vercel

**Key Libraries (Suggestions):**

- `framer-motion` or `react-spring` for animations (if needed)
- `canvas-confetti` for celebration effects (lightweight)
- Optional: `howler.js` for sound effects (if implemented)

**File Structure:**

```
/app or /pages
  - page.jsx (main slot machine interface)
  - components/
    - SlotReel.jsx
    - SettingsModal.jsx
    - SpinButton.jsx
/public
  - sounds/ (if adding audio)
/styles
  - globals.css
```

**Key Functions:**

- `spinReels()` - triggers animation sequence
- `selectRandomOption(category, excludeUsed)` - selection logic
- `markAsUsed(option, category)` - removes from available pool
- `saveSettings()` - persist to localStorage
- `loadSettings()` - restore from localStorage

* * *

## 6\. Default Data

**Initial Options (from facilitation guide):**

**TARGET USER:**

1. Toddlers with executive authority
2. People who refuse to admit they need help
3. Conspiracy theorists
4. Time travelers from exactly 1987
5. Cats (house cats specifically)
6. People who peaked in high school
7. Grandparents trying to understand "the youths"
8. People who exclusively communicate in movie quotes

**PRODUCT TYPE:**

1. Wearable device (must be visible)
2. Mobile app (but it can't use notifications)
3. Subscription box service
4. Physical product (no electronics)
5. Government-mandated program
6. Browser extension
7. Smart home device
8. Live service with human employees

**CORE FEATURE/CONSTRAINT:**

1. Only works on Tuesdays
2. Powered by embarrassment (the more embarrassed you are, the better it works)
3. Requires a buddy system - can't use it alone
4. Gets worse the more you use it
5. Illegal in at least 3 states
6. Requires you to share something personal with a stranger first
7. Only works if you're lying
8. Makes a loud noise every time you use it

* * *

## 7\. User Flow

### Primary Flow:

1. User opens app → sees branded slot machine interface
2. Clicks "PULL LEVER" button
3. All reels start spinning with blur/animation
4. Reels stop sequentially (1, 2, 3)
5. Final combination displayed with celebration
6. "SPIN AGAIN" button appears
7. User clicks to spin for next team
8. Selected options are removed from pool automatically

### Settings Flow:

1. User clicks gear icon
2. Enters PIN (if implemented) or modal opens directly
3. Edits options in three text boxes
4. Clicks "Save"
5. Returns to main view with updated options

### Reset Flow:

1. User goes to settings
2. Clicks "Clear Used Options" to restore full pool
3. Or clicks "Reset to Defaults" to restore original constraint list

* * *

## 8\. Priority Levels

### Must Have (MVP):

- ✅ Three slot reels with animated spinning
- ✅ Sequential stopping of reels
- ✅ Random selection from available options
- ✅ CoverMyMeds branding and colors
- ✅ Settings panel to edit options
- ✅ localStorage persistence
- ✅ Remove used options from pool
- ✅ Spin again/reset functionality

### Nice to Have:

- 🎯 Multiple options visible through slot "window" (above/below selected)
- 🎯 Sound effects (spinning, ding)
- 🎯 PIN protection on settings
- 🎯 Team counter display
- 🎯 More elaborate casino visual effects

### Could Add Later:

- 💭 Export results (copy/download team assignments)
- 💭 History log of all spins
- 💭 Multiple "game" presets with different constraint sets

* * *

## 9\. Responsive Design

- Primary target: Desktop/laptop (presenter screen)
- Should work on tablet if needed
- Mobile not a priority but shouldn't break

* * *

## 10\. Success Criteria

- Loads quickly and reliably
- Animations are smooth and fun (not janky)
- Easy to edit options in settings
- No duplicate combinations across teams
- Visually engaging and on-brand
- Works consistently in Vercel deployment

* * *

## 11\. Team Assignment Tracking & Display

### Settings Configuration:

**Team Management:**

- Input field: "Number of Teams" (default: 6, range: 1-12)
- Toggle: "Remove options after selection" (ON by default)
    - When ON: Selected options removed from pool for subsequent spins
    - When OFF: Options can repeat (useful for practice runs)

### Assignment Tracking:

**During Spins:**

- App automatically tracks: Team 1 → \[constraints\], Team 2 → \[constraints\], etc.
- Small counter on main screen: "Team 1 of 6" (updates after each spin)
- Optional: "Edit Team Label" button if you want to name teams on the fly

**Storage:**

- All team assignments saved to localStorage
- Persist even if page is refreshed mid-session

### Results Summary View:

**Access:**

- "View All Teams" button (visible after first spin completes)
- Or automatic display after reaching the configured number of teams

**Display:**

```
TEAM ASSIGNMENTS
════════════════

Team 1
├─ Target User: Toddlers with executive authority
├─ Product Type: Wearable device (must be visible)  
└─ Core Feature: Only works on Tuesdays

Team 2
├─ Target User: Conspiracy theorists
├─ Product Type: Subscription box service
└─ Core Feature: Powered by embarrassment

[etc.]
```

**Features:**

- Clean, scannable list format
- Each team clearly separated
- Easy to reference during presentations
- "Copy All" button to copy full list to clipboard
- "Export as Text" button (downloads .txt file)
- Optional: "Print" friendly CSS styling

**In Settings:**

- "Clear All Team Assignments" button - resets the list
- "Start New Session" button - clears teams AND restores all options to pool

### Modified User Flow:

1. Open app → Set number of teams in settings (if not default 6)
2. Spin for Team 1 → results displayed
3. Click "Next Team" → spins for Team 2
4. Continue through all teams
5. After final team OR anytime: Click "View All Teams"
6. Reference summary during activity
7. Copy/export if needed for documentation

### Visual Indicator:

- Progress bar or counter showing: "3 of 6 teams assigned"
- Maybe subtle checkmarks or completion status

* * *

## Next Steps for Development

1. Set up Next.js project with Vercel config
2. Build basic slot machine UI with static content
3. Implement spinning animation and sequential stopping
4. Add random selection logic
5. Create settings modal with text area editing
6. Implement localStorage persistence
7. Add "used options" tracking and removal
8. Polish visuals and add casino styling
9. Test with real data
10. Deploy to Vercel