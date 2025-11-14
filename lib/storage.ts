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

// Merge new default options into existing settings
// This ensures that when DEFAULT_OPTIONS are updated, new options are added
// without losing existing progress or customizations
const mergeDefaultOptions = (stored: AppSettings): AppSettings => {
  const merged = { ...stored };
  const categories: (keyof CategoryOptions)[] = ['targetUser', 'productType', 'coreFeature'];

  categories.forEach(category => {
    const defaultOptions = DEFAULT_OPTIONS[category];
    const storedAvailable = merged.availableOptions[category] || [];
    const storedUsed = merged.usedOptions[category] || [];
    
    // Combine all stored options (available + used) to see what we already have
    const allStoredOptions = new Set([...storedAvailable, ...storedUsed]);
    
    // Find new options from defaults that aren't in stored settings
    const newOptions = defaultOptions.filter(option => !allStoredOptions.has(option));
    
    // Add new options to available options
    if (newOptions.length > 0) {
      merged.availableOptions[category] = [...storedAvailable, ...newOptions];
    }
  });

  return merged;
};

export const loadSettings = (): AppSettings => {
  if (typeof window === 'undefined') {
    return getInitialSettings();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge new default options into stored settings
      return mergeDefaultOptions(parsed);
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
