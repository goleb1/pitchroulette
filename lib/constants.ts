import { CategoryOptions } from './types';

export const DEFAULT_OPTIONS: CategoryOptions = {
  targetUser: [
    'Toddlers with executive authority',
    'People who refuse to admit they need help',
    'Conspiracy theorists',
    'Time travelers from exactly 1987',
    'Cats (house cats specifically)',
    'People who peaked in high school',
    'Grandparents trying to understand "the youths"',
    'People who exclusively communicate in movie quotes',
  ],
  productType: [
    'Wearable device (must be visible)',
    'Mobile app (but it can\'t use notifications)',
    'Subscription box service',
    'Physical product (no electronics)',
    'Government-mandated program',
    'Browser extension',
    'Smart home device',
    'Live service with human employees',
  ],
  coreFeature: [
    'Only works on Tuesdays',
    'Powered by embarrassment (the more embarrassed you are, the better it works)',
    'Requires a buddy system - can\'t use it alone',
    'Gets worse the more you use it',
    'Illegal in at least 3 states',
    'Requires you to share something personal with a stranger first',
    'Only works if you\'re lying',
    'Makes a loud noise every time you use it',
  ],
};

export const CATEGORY_LABELS = {
  targetUser: 'TARGET USER',
  productType: 'PRODUCT TYPE',
  coreFeature: 'CORE FEATURE',
};

// Animation timing constants (in milliseconds) - easily tweakable
export const ANIMATION_CONFIG = {
  spinDuration: 2000, // How long each reel spins
  reelStopDelay: 400, // Delay between each reel stopping
  celebrationDelay: 300, // Delay before showing celebration
};

export const DEFAULT_NUMBER_OF_TEAMS = 6;
