import { AppSettings, CategoryOptions } from './types';
import { DEFAULT_OPTIONS, DEFAULT_NUMBER_OF_TEAMS } from './constants';

const STORAGE_KEY = 'pitchRouletteSettings';

export const getInitialSettings = (): AppSettings => {
  return {
    numberOfTeams: DEFAULT_NUMBER_OF_TEAMS,
    removeOptionsAfterSelection: true,
    availableOptions: JSON.parse(JSON.stringify(DEFAULT_OPTIONS)),
    usedOptions: {
      targetUser: [],
      productType: [],
      coreFeature: [],
    },
    teamAssignments: [],
    currentTeamNumber: 1,
  };
};

export const loadSettings = (): AppSettings => {
  if (typeof window === 'undefined') {
    return getInitialSettings();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading settings from localStorage:', error);
  }

  return getInitialSettings();
};

export const saveSettings = (settings: AppSettings): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
};

export const clearSettings = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing settings from localStorage:', error);
  }
};

// Get the minimum number of options across all categories
export const getMinOptionCount = (options: CategoryOptions): number => {
  return Math.min(
    options.targetUser.length,
    options.productType.length,
    options.coreFeature.length
  );
};

// Calculate max teams based on available options (if removing after selection)
export const getMaxTeams = (availableOptions: CategoryOptions, removeAfterSelection: boolean): number => {
  if (!removeAfterSelection) {
    return 12; // Arbitrary max when allowing duplicates
  }
  return getMinOptionCount(availableOptions);
};
