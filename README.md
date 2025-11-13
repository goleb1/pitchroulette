# Product Pitch Roulette

A casino-themed slot machine web app for facilitating the "Product Pitch Roulette" team building activity. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Animated Slot Machine**: Three spinning reels with sequential stopping animation
- **Team Management**: Configure number of teams and track assignments
- **Smart Option Removal**: Automatically prevents duplicate combinations across teams
- **Settings Panel**: Edit options for each category (Target User, Product Type, Core Feature)
- **Team Summary**: View all team assignments with export and copy functionality
- **Persistent Storage**: Settings and assignments saved to browser localStorage
- **CoverMyMeds Branding**: Custom color palette (Orange, Magenta, Dark Blue, Light Blue)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Initial Setup**: Click the settings gear icon to configure:
   - Number of teams (1-12)
   - Toggle option removal after selection
   - Edit the options for each category

2. **Running the Activity**:
   - Click "PULL LEVER" to spin for the first team
   - Watch the reels spin and stop sequentially
   - View the selected constraints
   - Click "NEXT TEAM" to continue

3. **View Results**: After all teams have been assigned, or at any time:
   - Click "View All Teams" to see the full summary
   - Copy all assignments to clipboard
   - Export as a text file

4. **Reset Options**:
   - Open settings and click "Clear Used Options" to restore the pool
   - Click "Reset Session" to start completely fresh
   - Click "Reset to Defaults" to restore original constraint lists

## Customization

### Animation Timing

Animation timing can be adjusted in `lib/constants.ts`:

```typescript
export const ANIMATION_CONFIG = {
  spinDuration: 2000, // How long each reel spins (ms)
  reelStopDelay: 400, // Delay between each reel stopping (ms)
  celebrationDelay: 300, // Delay before showing celebration (ms)
};
```

### Default Options

Default constraints can be modified in `lib/constants.ts` in the `DEFAULT_OPTIONS` object.

### Brand Colors

Colors can be customized in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    orange: '#FF8F1C',
    magenta: '#EB0868',
  },
  secondary: {
    'dark-blue': '#01426A',
    'light-blue': '#1E91D6',
  },
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings

### Other Platforms

Build the production version:

```bash
npm run build
```

Then deploy the `.next` folder and `package.json` to your hosting provider.

## Project Structure

```
pitchroulette/
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main slot machine page
├── components/
│   ├── SlotReel.tsx          # Individual slot reel component
│   ├── SettingsModal.tsx     # Settings configuration modal
│   └── TeamSummary.tsx       # Team assignments summary view
├── lib/
│   ├── constants.ts          # Default data and configuration
│   ├── storage.ts            # localStorage utilities
│   └── types.ts              # TypeScript type definitions
└── public/                   # Static assets
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Celebrations**: canvas-confetti
- **State Management**: React hooks (useState, useEffect)
- **Persistence**: Browser localStorage

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript must be enabled
- localStorage must be available

## License

ISC
