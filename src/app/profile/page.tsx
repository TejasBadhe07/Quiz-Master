'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
};

const mockAchievements: Achievement[] = [
  { id: '1', title: 'Quiz Master', description: 'Complete 100 quizzes', icon: '🏆', unlocked: true },
  { id: '2', title: 'Streak Champion', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: true },
  { id: '3', title: 'Category Expert', description: 'Master all categories', icon: '📚', unlocked: false, progress: 75 },
  { id: '4', title: 'Speed Demon', description: 'Answer 50 questions in under 10 seconds', icon: '⚡', unlocked: false, progress: 30 },
];

const mockStats = {
  totalQuizzes: 42,
  averageScore: 85,
  totalQuestions: 420,
  correctAnswers: 357,
  longestStreak: 7,
  favoriteCategory: 'Science',
  level: 12,
  xp: 1250,
  nextLevelXp: 2000,
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats');

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Track your progress and achievements
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl text-white mb-4">
              👤
            </div>
            <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm font-semibold text-purple-600">Level {mockStats.level}</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  style={{ width: `${(mockStats.xp / mockStats.nextLevelXp) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{mockStats.xp}/{mockStats.nextLevelXp} XP</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'stats'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'achievements'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Achievements
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'stats' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Quizzes</span>
                      <span className="font-semibold">{mockStats.totalQuizzes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-semibold">{mockStats.averageScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Questions Answered</span>
                      <span className="font-semibold">{mockStats.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Correct Answers</span>
                      <span className="font-semibold">{mockStats.correctAnswers}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Streaks & Categories</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Longest Streak</span>
                      <span className="font-semibold">{mockStats.longestStreak} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Favorite Category</span>
                      <span className="font-semibold">{mockStats.favoriteCategory}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-xl transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-purple-50 to-pink-50'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        achievement.unlocked
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{achievement.title}</h3>
                        <p className="text-gray-600 text-sm">{achievement.description}</p>
                        {!achievement.unlocked && achievement.progress && (
                          <div className="mt-2">
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{achievement.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 