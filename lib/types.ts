export type Category = 'targetUser' | 'productType' | 'coreFeature';

export interface CategoryOptions {
  targetUser: string[];
  productType: string[];
  coreFeature: string[];
}

export interface TeamAssignment {
  teamNumber: number;
  targetUser: string;
  productType: string;
  coreFeature: string;
}

export interface AppSettings {
  numberOfTeams: number;
  removeOptionsAfterSelection: boolean;
  availableOptions: CategoryOptions;
  usedOptions: CategoryOptions;
  teamAssignments: TeamAssignment[];
  currentTeamNumber: number;
}

export interface SpinResult {
  targetUser: string;
  productType: string;
  coreFeature: string;
}
