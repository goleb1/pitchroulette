'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SlotReelProps {
  label: string;
  options: string[];
  isSpinning: boolean;
  finalValue: string | null;
  showAsLocked: boolean;
  spinDuration: number;
}

const ITEM_HEIGHT = 60; // Height of each option item
const VISIBLE_ITEMS = 3; // Number of items visible in the window

export default function SlotReel({
  label,
  options,
  isSpinning,
  finalValue,
  showAsLocked,
  spinDuration
}: SlotReelProps) {
  const [spinningIndex, setSpinningIndex] = useState(0);
  const [displayItems, setDisplayItems] = useState<string[]>([]);

  useEffect(() => {
    if (isSpinning && options.length > 0) {
      // Rapidly cycle through options while spinning
      const interval = setInterval(() => {
        setSpinningIndex((prev) => (prev + 1) % options.length);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isSpinning, options]);

  useEffect(() => {
    if (!isSpinning && finalValue) {
      // When stopped, create array with final value in center
      const finalIndex = options.indexOf(finalValue);
      const items = [];

      // Get items before and after
      for (let i = -1; i <= 1; i++) {
        const index = (finalIndex + i + options.length) % options.length;
        items.push(options[index]);
      }

      setDisplayItems(items);
    } else if (isSpinning && options.length > 0) {
      // When spinning, show current spinning index in center
      const items = [];
      for (let i = -1; i <= 1; i++) {
        const index = (spinningIndex + i + options.length) % options.length;
        items.push(options[index]);
      }
      setDisplayItems(items);
    }
  }, [isSpinning, finalValue, options, spinningIndex]);

  return (
    <div className="w-[700px] mx-auto mb-3">
      {/* Label */}
      <div className="text-center mb-1">
        <h3 className="text-base md:text-lg font-bold tracking-widest text-primary-orange">
          {label}
        </h3>
      </div>

      {/* Slot Reel Window */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-lg border-4 border-primary-magenta shadow-2xl overflow-hidden">
        {/* Casino Lights Effect */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-2 left-2 w-3 h-3 bg-primary-orange rounded-full animate-pulse"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-primary-magenta rounded-full animate-pulse delay-75"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-primary-magenta rounded-full animate-pulse delay-150"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-primary-orange rounded-full animate-pulse delay-300"></div>
        </div>

        {/* Center Spotlight - appears when stopping */}
        {showAsLocked && (
          <motion.div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[60px] pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-orange/20 via-primary-magenta/20 to-primary-orange/20"></div>
            <div className="absolute inset-0 border-y-2 border-primary-orange/50"></div>
          </motion.div>
        )}

        {/* Reel Display Window */}
        <div
          className="relative overflow-hidden"
          style={{ height: `${ITEM_HEIGHT * VISIBLE_ITEMS}px` }}
        >
          {/* Gradient Masks for top/bottom fade */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

          {/* Display Items */}
          <div className="relative flex flex-col">
            {displayItems.map((item, index) => {
              const isCenter = index === 1;
              const opacity = isCenter ? 1 : 0.4;
              const scale = isCenter ? 1 : 0.9;

              return (
                <motion.div
                  key={`reel-item-${index}`}
                  className="flex items-center justify-center"
                  style={{
                    height: `${ITEM_HEIGHT}px`,
                  }}
                  initial={!isSpinning && finalValue ? { opacity: 0, y: 20 } : {}}
                  animate={{ opacity, y: 0 }}
                  transition={
                    !isSpinning && finalValue
                      ? {
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          delay: index * 0.1,
                        }
                      : { duration: 0 }
                  }
                >
                  <p
                    className={`text-lg md:text-xl font-semibold px-8 text-center leading-tight transition-all duration-200 ${
                      isSpinning
                        ? 'text-gray-400 blur-[1px]'
                        : isCenter
                        ? 'text-white'
                        : 'text-gray-600'
                    }`}
                    style={{
                      transform: `scale(${scale})`,
                    }}
                  >
                    {item || '\u00A0'}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Spinning Indicator */}
        {isSpinning && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-magenta/10 to-transparent animate-shimmer pointer-events-none z-10"></div>
        )}
      </div>
    </div>
  );
}
