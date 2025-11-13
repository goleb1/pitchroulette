# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Product Pitch Roulette is a casino-themed slot machine web app for facilitating team building activities. Teams receive random product constraints across three categories (Target User, Product Type, Core Feature) and must pitch a product based on those constraints.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, canvas-confetti

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (opens on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture Overview

### State Management Pattern

The application uses a centralized settings object (`AppSettings`) that manages all application state:
- Team configuration (number of teams, current team)
- Available and used options for each category
- Team assignments history
- User preferences (option removal behavior)

State flows unidirectionally: settings are loaded from localStorage on mount, updated through React state, and automatically persisted back to localStorage via a `useEffect` hook in `app/page.tsx`.

### Animation Orchestration

The slot machine uses a carefully orchestrated animation sequence controlled by the main page component (`app/page.tsx:54-133`):

1. **Selection Phase**: All three reel results are selected FIRST before any animations start
2. **Spinning Phase**: All reels spin simultaneously with rapidly cycling display values
3. **Sequential Stopping**: Reels stop one at a time with configurable delays (defined in `ANIMATION_CONFIG`)
4. **Celebration**: Confetti triggers after all reels stop, using brand colors

This pattern ensures smooth animations and prevents race conditions. The key is that `currentSpin` is set immediately with all final values, then each reel component independently animates toward its final value.

### Component Communication

- **SlotReel**: Receives `finalValue` and `isSpinning` props. When spinning, rapidly cycles through options. When stopped, displays the final value with animation.
- **SettingsModal**: Receives full settings object, manages its own local state for editing, calls `onSave` callback with updated settings.
- **TeamSummary**: Pure presentational component that receives team assignments and provides export/copy functionality.

### Data Flow for Option Management

When "Remove options after selection" is enabled:
1. Options start in `settings.availableOptions[category]`
2. After selection, options move from `availableOptions` to `usedOptions`
3. The "Clear Used Options" action moves them back to `availableOptions`
4. Max teams is dynamically calculated based on minimum available options across categories

When disabled:
- Both `availableOptions` and `usedOptions` are combined when selecting (allows duplicates)
- Max teams is capped at 12 (arbitrary limit)

### localStorage Schema

Single key: `pitchRouletteSettings`
Value: Serialized `AppSettings` object

All persistence logic is isolated in `lib/storage.ts`. The app gracefully handles localStorage errors and falls back to default settings.

## Key Configuration

### Animation Timing

Modify in `lib/constants.ts`:
```typescript
export const ANIMATION_CONFIG = {
  spinDuration: 2000,      // Reel spin duration (ms)
  reelStopDelay: 400,      // Delay between sequential stops (ms)
  celebrationDelay: 300,   // Delay before confetti (ms)
};
```

### Default Options

Modify `DEFAULT_OPTIONS` in `lib/constants.ts` to change the pool of constraints.

### Brand Colors

Brand colors are defined in `tailwind.config.ts` and consistently used throughout:
- Primary: Orange (#FF8F1C), Magenta (#EB0868)
- Secondary: Dark Blue (#01426A), Light Blue (#1E91D6)

## Important Patterns

### Client-Side Only Rendering

All main components use `'use client'` directive because they rely on:
- Browser localStorage
- Animation libraries (Framer Motion, canvas-confetti)
- Interactive state management

The app checks for `typeof window === 'undefined'` in storage utilities to prevent SSR errors.

### Type Safety

All data structures are strictly typed in `lib/types.ts`. The `Category` type is a union of string literals that ensures type safety when accessing the three constraint categories.

### Animation State Machine

The main page uses a simple state machine for spin states:
- `'idle'`: Ready to spin
- `'spinning'`: Animation in progress
- `'stopped'`: Results displayed, ready for next team

This prevents race conditions and ensures users can't trigger multiple spins.
