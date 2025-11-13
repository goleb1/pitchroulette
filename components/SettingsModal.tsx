'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppSettings } from '@/lib/types';
import { DEFAULT_OPTIONS } from '@/lib/constants';
import { getInitialSettings, getMaxTeams } from '@/lib/storage';

interface SettingsModalProps {
  settings: AppSettings;
  onClose: () => void;
  onSave: (settings: AppSettings) => void;
  onViewAssignments: () => void;
}

export default function SettingsModal({ settings, onClose, onSave, onViewAssignments }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<AppSettings>({ ...settings });
  const [targetUserText, setTargetUserText] = useState(
    localSettings.availableOptions.targetUser.join('\n')
  );
  const [productTypeText, setProductTypeText] = useState(
    localSettings.availableOptions.productType.join('\n')
  );
  const [coreFeatureText, setCoreFeatureText] = useState(
    localSettings.availableOptions.coreFeature.join('\n')
  );

  const maxTeams = getMaxTeams(localSettings.availableOptions, localSettings.removeOptionsAfterSelection);

  const handleSave = () => {
    const updatedSettings = { ...localSettings };

    // Parse text areas into arrays
    updatedSettings.availableOptions = {
      targetUser: targetUserText.split('\n').filter(line => line.trim() !== ''),
      productType: productTypeText.split('\n').filter(line => line.trim() !== ''),
      coreFeature: coreFeatureText.split('\n').filter(line => line.trim() !== ''),
    };

    // Ensure number of teams doesn't exceed max
    const newMaxTeams = getMaxTeams(updatedSettings.availableOptions, updatedSettings.removeOptionsAfterSelection);
    if (updatedSettings.numberOfTeams > newMaxTeams) {
      updatedSettings.numberOfTeams = newMaxTeams;
    }

    onSave(updatedSettings);
  };

  const handleResetToDefaults = () => {
    setTargetUserText(DEFAULT_OPTIONS.targetUser.join('\n'));
    setProductTypeText(DEFAULT_OPTIONS.productType.join('\n'));
    setCoreFeatureText(DEFAULT_OPTIONS.coreFeature.join('\n'));
  };

  const handleResetSession = () => {
    const freshSettings = getInitialSettings();
    onSave(freshSettings);
  };

  const handleClearUsedOptions = () => {
    const updatedSettings = { ...localSettings };

    // Restore all used options back to available
    updatedSettings.availableOptions.targetUser = [
      ...updatedSettings.availableOptions.targetUser,
      ...updatedSettings.usedOptions.targetUser,
    ];
    updatedSettings.availableOptions.productType = [
      ...updatedSettings.availableOptions.productType,
      ...updatedSettings.usedOptions.productType,
    ];
    updatedSettings.availableOptions.coreFeature = [
      ...updatedSettings.availableOptions.coreFeature,
      ...updatedSettings.usedOptions.coreFeature,
    ];

    updatedSettings.usedOptions = {
      targetUser: [],
      productType: [],
      coreFeature: [],
    };

    setLocalSettings(updatedSettings);
    setTargetUserText(updatedSettings.availableOptions.targetUser.join('\n'));
    setProductTypeText(updatedSettings.availableOptions.productType.join('\n'));
    setCoreFeatureText(updatedSettings.availableOptions.coreFeature.join('\n'));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border-2 border-primary-magenta rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-primary-orange">Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Settings Controls */}
          <div className="space-y-6 mb-6">
            {/* Number of Teams */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Number of Teams: <span className="text-primary-orange">{localSettings.numberOfTeams}</span>
                {localSettings.removeOptionsAfterSelection && (
                  <span className="text-sm text-gray-400 ml-2">(Max: {maxTeams})</span>
                )}
              </label>
              <input
                type="range"
                min="1"
                max={maxTeams}
                value={localSettings.numberOfTeams}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, numberOfTeams: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-magenta"
              />
            </div>

            {/* Remove Options Toggle */}
            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
              <div>
                <p className="text-white font-semibold">Remove options after selection</p>
                <p className="text-sm text-gray-400">Prevent duplicate combinations across teams</p>
              </div>
              <button
                onClick={() =>
                  setLocalSettings({
                    ...localSettings,
                    removeOptionsAfterSelection: !localSettings.removeOptionsAfterSelection,
                  })
                }
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  localSettings.removeOptionsAfterSelection ? 'bg-primary-magenta' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    localSettings.removeOptionsAfterSelection ? 'translate-x-7' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Options Editing */}
          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-white font-semibold mb-2">Target User Options</label>
              <textarea
                value={targetUserText}
                onChange={(e) => setTargetUserText(e.target.value)}
                rows={6}
                className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:border-primary-orange focus:outline-none font-mono text-sm"
                placeholder="One option per line..."
              />
              <p className="text-xs text-gray-400 mt-1">
                {targetUserText.split('\n').filter(line => line.trim() !== '').length} options
              </p>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Product Type Options</label>
              <textarea
                value={productTypeText}
                onChange={(e) => setProductTypeText(e.target.value)}
                rows={6}
                className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:border-primary-orange focus:outline-none font-mono text-sm"
                placeholder="One option per line..."
              />
              <p className="text-xs text-gray-400 mt-1">
                {productTypeText.split('\n').filter(line => line.trim() !== '').length} options
              </p>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Core Feature Options</label>
              <textarea
                value={coreFeatureText}
                onChange={(e) => setCoreFeatureText(e.target.value)}
                rows={6}
                className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:border-primary-orange focus:outline-none font-mono text-sm"
                placeholder="One option per line..."
              />
              <p className="text-xs text-gray-400 mt-1">
                {coreFeatureText.split('\n').filter(line => line.trim() !== '').length} options
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary-orange hover:bg-primary-magenta text-white font-bold py-3 rounded-lg transition-all"
              >
                Save Settings
              </button>
              <button
                onClick={onClose}
                className="px-6 bg-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* View Assignments Button */}
            {localSettings.teamAssignments.length > 0 && (
              <button
                onClick={onViewAssignments}
                className="w-full bg-primary-magenta hover:bg-primary-orange text-white font-bold py-3 rounded-lg transition-all"
              >
                View Team Assignments ({localSettings.teamAssignments.length} {localSettings.teamAssignments.length === 1 ? 'Team' : 'Teams'})
              </button>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleResetToDefaults}
                className="flex-1 bg-secondary-dark-blue text-white font-semibold py-2 rounded-lg hover:bg-secondary-light-blue transition-colors"
              >
                Reset to Defaults
              </button>
              <button
                onClick={handleClearUsedOptions}
                className="flex-1 bg-secondary-dark-blue text-white font-semibold py-2 rounded-lg hover:bg-secondary-light-blue transition-colors"
              >
                Clear Used Options
              </button>
            </div>

            <button
              onClick={handleResetSession}
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset Session (Clear All)
            </button>
          </div>

          {/* Used Options Display */}
          {localSettings.usedOptions.targetUser.length > 0 && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Used Options:</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Target Users: {localSettings.usedOptions.targetUser.length} used</p>
                <p>Product Types: {localSettings.usedOptions.productType.length} used</p>
                <p>Core Features: {localSettings.usedOptions.coreFeature.length} used</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
