'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SlotLeverProps {
  onPull: () => void;
  disabled: boolean;
  label?: string;
}

export default function SlotLever({ onPull, disabled, label = 'PULL!' }: SlotLeverProps) {
  const [isPulled, setIsPulled] = useState(false);

  const handlePull = () => {
    if (disabled || isPulled) return;

    setIsPulled(true);
    onPull();

    // Reset lever after animation completes
    setTimeout(() => {
      setIsPulled(false);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Lever Mechanism */}
      <div className="relative w-20 h-48 flex flex-col items-center">
        {/* Lever Base/Mount */}
        <div className="absolute top-0 w-16 h-10 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-lg border-2 border-primary-orange shadow-lg">
          <div className="absolute inset-2 bg-gray-800 rounded"></div>
        </div>

        {/* Lever Arm */}
        <motion.div
          className="relative z-10 flex flex-col items-center cursor-pointer"
          animate={{
            y: isPulled ? 90 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          onClick={handlePull}
          style={{
            originY: 0,
          }}
        >
          {/* Lever Rod */}
          <div className={`w-3 h-32 rounded-full transition-all duration-300 ${
            disabled
              ? 'bg-gradient-to-b from-gray-600 to-gray-700'
              : 'bg-gradient-to-b from-primary-orange to-primary-magenta shadow-lg shadow-primary-orange/50'
          }`}>
            {/* Rod Highlight */}
            <div className="w-1 h-full ml-0.5 bg-gradient-to-b from-white/40 to-transparent rounded-full"></div>
          </div>

          {/* Lever Ball/Handle */}
          <motion.div
            className={`w-12 h-12 rounded-full relative transition-all duration-300 ${
              disabled
                ? 'bg-gradient-to-br from-gray-500 to-gray-700'
                : 'bg-gradient-to-br from-primary-orange via-primary-magenta to-primary-orange shadow-2xl'
            }`}
            whileHover={!disabled ? { scale: 1.1 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
          >
            {/* Ball Highlight */}
            <div className="absolute top-2 left-2 w-5 h-5 bg-white/30 rounded-full blur-sm"></div>

            {/* Glow Effect when ready */}
            {!disabled && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary-orange"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Pull Instruction */}
      <motion.div
        className="text-center w-32"
        animate={{
          opacity: disabled ? 0.3 : 1,
          y: disabled ? 0 : [0, -5, 0],
        }}
        transition={{
          y: {
            duration: 1.5,
            repeat: disabled ? 0 : Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <p className={`text-base font-bold tracking-wider ${
          disabled ? 'text-gray-500' : 'text-primary-orange'
        }`}>
          {disabled ? 'SPINNING...' : label}
        </p>
      </motion.div>
    </div>
  );
}
