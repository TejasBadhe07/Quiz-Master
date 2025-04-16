'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';

export function AdvancedFeatures() {
  const { userState, updateUserState } = useUser();
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      // Handle time up logic here
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const updateStreak = (isCorrect: boolean) => {
    if (isCorrect) {
      setCurrentStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > userState.highestStreak) {
          updateUserState({ highestStreak: newStreak });
        }
        return newStreak;
      });
    } else {
      setCurrentStreak(0);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-w-xs">
        <div className="space-y-4">
          {/* Timer Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">Timer Mode</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-600">{timeLeft}s</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startTimer}
                disabled={isTimerActive}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  isTimerActive
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }`}
              >
                {isTimerActive ? 'Running...' : 'Start Timer'}
              </motion.button>
            </div>
          </div>

          {/* Streak Section */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">Current Streak</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">{currentStreak}</span>
              <span className="text-sm text-gray-500">
                (Best: {userState.highestStreak})
              </span>
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-800">Difficulty</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDifficulty(level)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                    difficulty === level
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 