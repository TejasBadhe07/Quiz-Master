'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
}

export function AchievementNotification() {
  const { userState } = useUser();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const newAchievements = userState.achievements.filter(
      achievement => achievement.unlocked && 
      !achievements.some(a => a.id === achievement.id)
    );

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      setCurrentAchievement(newAchievements[0]);
    }
  }, [userState.achievements]);

  const handleClose = () => {
    setCurrentAchievement(null);
    if (achievements.length > 1) {
      setAchievements(prev => prev.slice(1));
      setCurrentAchievement(achievements[1]);
    } else {
      setAchievements([]);
    }
  };

  return (
    <AnimatePresence>
      {currentAchievement && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-w-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
                {currentAchievement.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Achievement Unlocked!
                </h3>
                <p className="text-sm font-medium text-purple-600">
                  {currentAchievement.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {currentAchievement.description}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500">+{currentAchievement.xpReward} XP</span>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 