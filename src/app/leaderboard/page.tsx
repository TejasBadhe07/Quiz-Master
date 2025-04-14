'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
  category: string;
  date: string;
  streak: number;
  avatar: string;
};

const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'Alex Johnson', score: 950, category: 'General Knowledge', date: '2024-03-15', streak: 5, avatar: '👨‍💻' },
  { id: '2', name: 'Sarah Chen', score: 920, category: 'Science', date: '2024-03-15', streak: 3, avatar: '👩‍🔬' },
  { id: '3', name: 'Mike Wilson', score: 890, category: 'History', date: '2024-03-15', streak: 4, avatar: '👨‍🏫' },
  { id: '4', name: 'Emma Davis', score: 870, category: 'General Knowledge', date: '2024-03-15', streak: 2, avatar: '👩‍🎓' },
  { id: '5', name: 'David Kim', score: 850, category: 'Science', date: '2024-03-15', streak: 1, avatar: '👨‍🔬' },
];

const categories = ['All', 'General Knowledge', 'Science', 'History'];
const timeFrames = ['All', 'Today', 'Week', 'Month'];

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('All');

  const filteredLeaderboard = mockLeaderboard.filter(entry => {
    const categoryMatch = selectedCategory === 'All' || entry.category === selectedCategory;
    return categoryMatch;
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Leaderboard
          </h1>
          <p className="text-gray-600 text-lg">
            Compete with others and climb to the top!
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Frame</label>
              <select
                value={selectedTimeFrame}
                onChange={(e) => setSelectedTimeFrame(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {timeFrames.map((timeFrame) => (
                  <option key={timeFrame} value={timeFrame}>
                    {timeFrame}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {filteredLeaderboard.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl transition-all duration-300 ${
                    index < 3
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        index < 3 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200'
                      }`}>
                        {entry.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{entry.name}</h3>
                        <p className="text-gray-600 text-sm">{entry.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{entry.score}</div>
                      <div className="flex items-center justify-end space-x-2">
                        <span className="text-sm text-gray-600">Streak:</span>
                        <span className="text-sm font-semibold text-purple-600">{entry.streak} 🔥</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-600">
            Your current rank: <span className="font-semibold text-purple-600">#8</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Keep playing to climb the leaderboard!
          </p>
        </motion.div>
      </div>
    </div>
  );
} 