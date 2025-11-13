'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import SlotReel from '@/components/SlotReel';
import SlotLever from '@/components/SlotLever';
import SettingsModal from '@/components/SettingsModal';
import TeamSummary from '@/components/TeamSummary';
import { AppSettings, Category, SpinResult, TeamAssignment } from '@/lib/types';
import { loadSettings, saveSettings, getMaxTeams } from '@/lib/storage';
import { CATEGORY_LABELS, ANIMATION_CONFIG } from '@/lib/constants';

type SpinState = 'idle' | 'spinning' | 'stopped';

export default function Home() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [spinState, setSpinState] = useState<SpinState>('idle');
  const [spinningReels, setSpinningReels] = useState({
    targetUser: false,
    productType: false,
    coreFeature: false,
  });
  const [currentSpin, setCurrentSpin] = useState<SpinResult | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [hasSpunOnce, setHasSpunOnce] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
  }, []);

  // Save settings whenever they change
  useEffect(() => {
    if (settings) {
      saveSettings(settings);
    }
  }, [settings]);

  const selectRandomOption = (category: Category): string => {
    if (!settings) return '';

    const availableOptions = settings.removeOptionsAfterSelection
      ? settings.availableOptions[category]
      : [...settings.availableOptions[category], ...settings.usedOptions[category]];

    if (availableOptions.length === 0) {
      return 'No options available';
    }

    const randomIndex = Math.floor(Math.random() * availableOptions.length);
    return availableOptions[randomIndex];
  };

  const handleSpin = async () => {
    if (!settings || spinState !== 'idle') return;

    // Check if we've reached max teams
    if (settings.currentTeamNumber > settings.numberOfTeams) {
      setShowSummary(true);
      return;
    }

    setHasSpunOnce(true);
    setSpinState('spinning');

    // Select results for all reels FIRST
    const results: SpinResult = {
      targetUser: selectRandomOption('targetUser'),
      productType: selectRandomOption('productType'),
      coreFeature: selectRandomOption('coreFeature'),
    };

    // Set the results immediately so reels know what to land on
    setCurrentSpin(results);

    // Start all reels spinning
    setSpinningReels({
      targetUser: true,
      productType: true,
      coreFeature: true,
    });

    // Stop reels sequentially
    setTimeout(() => {
      setSpinningReels(prev => ({ ...prev, targetUser: false }));
    }, ANIMATION_CONFIG.spinDuration);

    setTimeout(() => {
      setSpinningReels(prev => ({ ...prev, productType: false }));
    }, ANIMATION_CONFIG.spinDuration + ANIMATION_CONFIG.reelStopDelay);

    setTimeout(() => {
      setSpinningReels(prev => ({ ...prev, coreFeature: false }));
    }, ANIMATION_CONFIG.spinDuration + ANIMATION_CONFIG.reelStopDelay * 2);

    // Mark as fully stopped and trigger celebration
    setTimeout(() => {
      setSpinState('stopped');

      // Trigger confetti
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF8F1C', '#EB0868', '#1E91D6'],
        });
      }, ANIMATION_CONFIG.celebrationDelay);

      // Save team assignment
      const newAssignment: TeamAssignment = {
        teamNumber: settings.currentTeamNumber,
        ...results,
      };

      const updatedSettings = { ...settings };
      updatedSettings.teamAssignments.push(newAssignment);

      // Mark options as used if setting is enabled
      if (settings.removeOptionsAfterSelection) {
        (Object.keys(results) as Category[]).forEach(category => {
          const option = results[category];
          const availableIndex = updatedSettings.availableOptions[category].indexOf(option);
          if (availableIndex > -1) {
            updatedSettings.availableOptions[category].splice(availableIndex, 1);
            updatedSettings.usedOptions[category].push(option);
          }
        });
      }

      // Don't increment currentTeamNumber here - wait until user clicks "NEXT TEAM"
      setSettings(updatedSettings);
    }, ANIMATION_CONFIG.spinDuration + ANIMATION_CONFIG.reelStopDelay * 2 + 500);
  };

  const handleNextTeam = () => {
    if (!settings) return;

    // Increment team number when moving to next team
    const updatedSettings = { ...settings };
    updatedSettings.currentTeamNumber += 1;
    setSettings(updatedSettings);

    setSpinState('idle');
    setCurrentSpin(null);

    // Check if we've completed all teams
    if (updatedSettings.currentTeamNumber > updatedSettings.numberOfTeams) {
      setShowSummary(true);
    }
  };

  const handleLeverClick = () => {
    if (spinState === 'idle') {
      handleSpin();
    } else if (spinState === 'stopped') {
      // Check if this is the last team
      if (settings && settings.currentTeamNumber === settings.numberOfTeams) {
        setShowSummary(true);
      } else {
        if (!settings) return;

        // Increment team number
        const updatedSettings = { ...settings };
        updatedSettings.currentTeamNumber += 1;

        // Check if we've reached max teams
        if (updatedSettings.currentTeamNumber > updatedSettings.numberOfTeams) {
          setShowSummary(true);
          return;
        }

        // Clear current spin
        setCurrentSpin(null);
        setHasSpunOnce(true);
        setSpinState('spinning');

        // Select results for all reels FIRST
        const results: SpinResult = {
          targetUser: selectRandomOption('targetUser'),
          productType: selectRandomOption('productType'),
          coreFeature: selectRandomOption('coreFeature'),
        };

        // Set the results immediately so reels know what to land on
        setCurrentSpin(results);

        // Start all reels spinning
        setSpinningReels({
          targetUser: true,
          productType: true,
          coreFeature: true,
        });

        // Stop reels sequentially
        setTimeout(() => {
          setSpinningReels(prev => ({ ...prev, targetUser: false }));
        }, ANIMATION_CONFIG.spinDuration);

        setTimeout(() => {
          setSpinningReels(prev => ({ ...prev, productType: false }));
        }, ANIMATION_CONFIG.spinDuration + ANIMATION_CONFIG.reelStopDelay);

        setTimeout(() => {
          setSpinningReels(prev => ({ ...prev, coreFeature: false }));
        }, ANIMATION_CONFIG.spinDuration + ANIMATION_CONFIG.reelStopDelay * 2);

        // Mark as fully stopped and trigger celebration
        setTimeout(() => {
          setSpinState('stopped');

          // Trigger confetti
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#FF8F1C', '#EB0868', '#1E91D6'],
            });
          }, ANIMATION_CONFIG.celebrationDelay);

          // Save team assignment
          const newAssignment: TeamAssignment = {
            teamNumber: updatedSettings.currentTeamNumber,
            ...results,
          };

          updatedSettings.teamAssignments.push(newAssignment);

          // Mark options as used if setting is enabled
          if (updatedSettings.removeOptionsAfterSelection) {
            (Object.keys(results) as Category[]).forEach(category => {
              const option = results[category];
              const availableIndex = updatedSettings.availableOptions[category].indexOf(option);
              if (availableIndex > -1) {
                updatedSettings.availableOptions[category].splice(availableIndex, 1);
                updatedSettings.usedOptions[category].push(option);
              }
            });
          }

          setSettings(updatedSettings);
        }, ANIMATION_CONFIG.spinDuration + ANIMATION_CONFIG.reelStopDelay * 2 + 500);
      }
    }
  };

  const handleSettingsUpdate = (newSettings: AppSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const canSpin = settings.currentTeamNumber <= settings.numberOfTeams;
  const allReelsStopped = !spinningReels.targetUser && !spinningReels.productType && !spinningReels.coreFeature;

  return (
    <main className="min-h-screen p-2 md:p-4">
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-4 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-1">
            <span className="text-primary-orange">PRODUCT </span>
            <span className="text-primary-magenta">PITCH </span>
            <span className="text-primary-orange">ROULETTE</span>
          </h1>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(true)}
            className="absolute top-0 right-0 p-2 rounded-full bg-secondary-dark-blue hover:bg-secondary-light-blue transition-colors"
            aria-label="Settings"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Team Counter */}
        <div className="text-center mb-4">
          <p className="text-lg text-white">
            Team <span className="text-primary-orange font-bold">{Math.min(settings.currentTeamNumber, settings.numberOfTeams)}</span> of <span className="text-primary-magenta font-bold">{settings.numberOfTeams}</span>
          </p>
        </div>

        {/* Main Content - Centered Reels with Lever on Right */}
        <div className="flex justify-center">
          {/* Slot Reels - Centered */}
          <div>
            <SlotReel
              label={CATEGORY_LABELS.targetUser}
              options={settings.availableOptions.targetUser}
              isSpinning={spinningReels.targetUser}
              finalValue={!spinningReels.targetUser ? currentSpin?.targetUser || null : null}
              showAsLocked={spinState === 'stopped'}
              spinDuration={ANIMATION_CONFIG.spinDuration}
            />
            <SlotReel
              label={CATEGORY_LABELS.productType}
              options={settings.availableOptions.productType}
              isSpinning={spinningReels.productType}
              finalValue={!spinningReels.productType ? currentSpin?.productType || null : null}
              showAsLocked={spinState === 'stopped'}
              spinDuration={ANIMATION_CONFIG.spinDuration}
            />
            <SlotReel
              label={CATEGORY_LABELS.coreFeature}
              options={settings.availableOptions.coreFeature}
              isSpinning={spinningReels.coreFeature}
              finalValue={!spinningReels.coreFeature ? currentSpin?.coreFeature || null : null}
              showAsLocked={spinState === 'stopped'}
              spinDuration={ANIMATION_CONFIG.spinDuration}
            />
          </div>

          {/* Slot Machine Lever - Always Visible, Positioned to Right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/4 flex flex-col items-center justify-center gap-4">
            <SlotLever
              onPull={handleLeverClick}
              disabled={spinState === 'spinning' || !canSpin}
              label={
                spinState === 'idle'
                  ? (hasSpunOnce ? 'SPINNING...' : 'PULL!')
                  : spinState === 'stopped'
                    ? (settings.currentTeamNumber === settings.numberOfTeams ? 'VIEW RESULTS' : 'NEXT TEAM')
                    : 'SPINNING...'
              }
            />
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSave={handleSettingsUpdate}
          onViewAssignments={() => {
            setShowSettings(false);
            setShowSummary(true);
          }}
        />
      )}

      {/* Team Summary */}
      {showSummary && (
        <TeamSummary
          assignments={settings.teamAssignments}
          onClose={() => setShowSummary(false)}
        />
      )}
    </main>
  );
}
