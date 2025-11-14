import { CategoryOptions } from './types';

export const DEFAULT_OPTIONS: CategoryOptions = {
  targetUser: [
    'Toddlers with executive authority',
    'People who refuse to admit they need help',
    'Conspiracy theorists',
    'Time travelers',
    'Dog/Cat Owners',
    'People who peaked in high school',
    'Extremely competitive people',
    'People who are always running late',
    'People going through a midlife crisis',
    'Neighbors who are too friendly',
  ],
  productType: [
    'Wearable device',
    'Mobile app',
    'Subscription box service',
    'Government-mandated program',
    'Smart home device',
    'Live service with human employees',
    'Food or beverage product',
    'Piece of furniture',
    'Clothing or fashion item',
    'Training program or certification',
  ],
  coreFeature: [
    'Only works on certain days of the week',
    'Powered by embarrassment',
    'Requires a buddy system - cannot use it alone',
    'Gets worse the more you use it',
    'Makes a loud noise every time you use it',
    'Only works if you are in a bad mood',
    'Gets more expensive the more desperate you are',
    'Changes color based on your emotions',
    'Only works if you are wearing something specific',
    'Broadcasts what you are doing to social media automatically',
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
  reelStopDelay: 500, // Delay between each reel stopping
  celebrationDelay: 300, // Delay before showing celebration
};

export const DEFAULT_NUMBER_OF_TEAMS = 6;
