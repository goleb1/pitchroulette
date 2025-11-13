'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SlotReelProps {
  label: string;
  options: string[];
  isSpinning: boolean;
  finalValue: string | null;
  showAsLocked: boolean;
  spinDuration: number;
}

export default function SlotReel({
  label,
  options,
  isSpinning,
  finalValue,
  showAsLocked,
  spinDuration
}: SlotReelProps) {
  const [displayValue, setDisplayValue] = useState<string>('');
  const [spinIndex, setSpinIndex] = useState(0);

  useEffect(() => {
    if (isSpinning && options.length > 0) {
      // Rapidly cycle through options while spinning
      const interval = setInterval(() => {
        setSpinIndex((prev) => (prev + 1) % options.length);
      }, 80); // Change option every 80ms for blur effect

      return () => clearInterval(interval);
    } else if (finalValue) {
      setDisplayValue(finalValue);
    } else if (!finalValue && !isSpinning) {
      // Clear display when no final value and not spinning
      setDisplayValue('');
    }
  }, [isSpinning, options, finalValue]);

  useEffect(() => {
    if (isSpinning && options.length > 0) {
      setDisplayValue(options[spinIndex]);
    }
  }, [spinIndex, isSpinning, options]);

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      {/* Label */}
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold tracking-widest text-primary-orange">
          {label}
        </h3>
      </div>

      {/* Slot Reel Window */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-lg border-4 border-primary-magenta shadow-2xl overflow-hidden">
        {/* Casino Lights Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-2 h-2 bg-primary-orange rounded-full animate-pulse"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-primary-magenta rounded-full animate-pulse delay-75"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary-magenta rounded-full animate-pulse delay-150"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary-orange rounded-full animate-pulse delay-300"></div>
        </div>

        {/* Reel Display */}
        <div className="relative min-h-[120px] flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSpinning ? `spin-${spinIndex}` : `final-${finalValue}`}
              initial={{ opacity: isSpinning ? 0.6 : 0, y: isSpinning ? 0 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: isSpinning ? 0.4 : 0, y: isSpinning ? 0 : -50 }}
              transition={{
                duration: isSpinning ? 0.08 : 0.5,
                ease: isSpinning ? 'linear' : 'easeOut'
              }}
              className={`text-center ${
                isSpinning
                  ? 'blur-sm text-gray-400'
                  : 'text-white'
              }`}
            >
              <p className="text-xl md:text-2xl font-semibold px-4">
                {displayValue || '\u00A0'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Spinning Indicator */}
        {isSpinning && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-magenta/10 to-transparent animate-shimmer pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}
