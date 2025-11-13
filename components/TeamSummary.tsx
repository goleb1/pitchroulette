'use client';

import { motion } from 'framer-motion';
import { TeamAssignment } from '@/lib/types';
import { useState } from 'react';

interface TeamSummaryProps {
  assignments: TeamAssignment[];
  onClose: () => void;
}

export default function TeamSummary({ assignments, onClose }: TeamSummaryProps) {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const formatAssignmentsAsText = () => {
    let text = 'TEAM ASSIGNMENTS\n';
    text += '═'.repeat(50) + '\n\n';

    assignments.forEach((assignment) => {
      text += `Team ${assignment.teamNumber}\n`;
      text += `├─ Target User: ${assignment.targetUser}\n`;
      text += `├─ Product Type: ${assignment.productType}\n`;
      text += `└─ Core Feature: ${assignment.coreFeature}\n\n`;
    });

    return text;
  };

  const handleCopyAll = async () => {
    const text = formatAssignmentsAsText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleExport = () => {
    const text = formatAssignmentsAsText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `team-assignments-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-secondary-dark-blue via-black to-black z-50 overflow-y-auto">
      <div className="min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="text-primary-orange">TEAM </span>
            <span className="text-primary-magenta">ASSIGNMENTS</span>
          </motion.h1>

          {/* Action Menu Toggle */}
          <div className="absolute top-0 right-0">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-full bg-secondary-dark-blue hover:bg-secondary-light-blue transition-colors text-white"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>

            {/* Dropdown Actions */}
            {showActions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={handleCopyAll}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy All
                    </>
                  )}
                </button>
                <button
                  onClick={handleExport}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2 border-t border-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Teams Grid */}
        <div className={`grid gap-6 max-w-7xl mx-auto ${
          assignments.length === 1 ? 'grid-cols-1 max-w-2xl' :
          assignments.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          assignments.length <= 4 ? 'grid-cols-1 md:grid-cols-2' :
          assignments.length <= 6 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.teamNumber}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 border-primary-magenta shadow-xl"
            >
              {/* Team Number Badge */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary-orange text-white font-bold text-2xl px-6 py-2 rounded-full">
                  Team {assignment.teamNumber}
                </div>
              </div>

              {/* Assignment Details */}
              <div className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-primary-orange font-bold text-sm uppercase tracking-wider mb-1">
                    Target User
                  </div>
                  <div className="text-white text-lg">
                    {assignment.targetUser}
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-primary-magenta font-bold text-sm uppercase tracking-wider mb-1">
                    Product Type
                  </div>
                  <div className="text-white text-lg">
                    {assignment.productType}
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-secondary-light-blue font-bold text-sm uppercase tracking-wider mb-1">
                    Core Feature
                  </div>
                  <div className="text-white text-lg">
                    {assignment.coreFeature}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Close Button at Bottom */}
        <div className="text-center mt-12">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-primary-orange hover:bg-primary-magenta text-white font-bold rounded-full shadow-xl transform hover:scale-105 transition-all"
          >
            Back to Roulette
          </button>
        </div>
      </div>
    </div>
  );
}
