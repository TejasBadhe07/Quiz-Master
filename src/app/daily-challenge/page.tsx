'use client';

import { useState } from 'react';

type DailyChallenge = {
  id: string;
  title: string;
  description: string;
  reward: string;
  completed: boolean;
  questions: number;
  timeLimit: number;
};

const mockDailyChallenges: DailyChallenge[] = [
  {
    id: '1',
    title: 'Science Sprint',
    description: 'Answer 10 science questions in under 2 minutes',
    reward: '100 XP + Special Badge',
    completed: false,
    questions: 10,
    timeLimit: 120,
  },
  {
    id: '2',
    title: 'General Knowledge Marathon',
    description: 'Complete 3 quizzes in different categories',
    reward: '200 XP + Streak Booster',
    completed: true,
    questions: 15,
    timeLimit: 300,
  },
  {
    id: '3',
    title: 'Quick Fire Round',
    description: 'Answer 5 questions correctly in a row',
    reward: '50 XP + Speed Badge',
    completed: false,
    questions: 5,
    timeLimit: 60,
  },
];

export default function DailyChallenge() {
  const [selectedChallenge, setSelectedChallenge] = useState<DailyChallenge | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Daily Challenges</h1>
          
          <div className="mb-6 text-center">
            <p className="text-gray-600 mb-2">Complete challenges to earn rewards and climb the leaderboard!</p>
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-purple-600 font-medium">Current Streak: 3 days</span>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-purple-600 font-medium">Total XP: 1,250</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockDailyChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`p-6 rounded-lg border ${
                  challenge.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{challenge.title}</h3>
                    <p className="text-gray-600 mt-1">{challenge.description}</p>
                  </div>
                  {challenge.completed && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Completed
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Questions</span>
                    <span>{challenge.questions}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Time Limit</span>
                    <span>{challenge.timeLimit} seconds</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Reward</span>
                    <span className="text-purple-600 font-medium">{challenge.reward}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedChallenge(challenge)}
                  className={`w-full py-2 px-4 rounded-lg ${
                    challenge.completed
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                  disabled={challenge.completed}
                >
                  {challenge.completed ? 'Completed' : 'Start Challenge'}
                </button>
              </div>
            ))}
          </div>

          {selectedChallenge && (
            <div className="mt-8 p-6 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Challenge Details</h3>
              <p className="text-gray-600 mb-4">{selectedChallenge.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Reward: {selectedChallenge.reward}</p>
                  <p className="text-sm text-gray-600">Time Limit: {selectedChallenge.timeLimit} seconds</p>
                </div>
                <button
                  onClick={() => setSelectedChallenge(null)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
                >
                  Start Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 