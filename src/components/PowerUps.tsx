'use client';

import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';

export function PowerUps() {
  const { userState, usePowerUp } = useUser();

  const powerUps = [
    {
      id: 'extraTime',
      name: 'Extra Time',
      description: 'Add 10 seconds to the timer',
      icon: '⏱️',
      count: userState.powerUps.extraTime
    },
    {
      id: 'skipQuestion',
      name: 'Skip Question',
      description: 'Skip the current question',
      icon: '⏭️',
      count: userState.powerUps.skipQuestion
    },
    {
      id: 'doublePoints',
      name: 'Double Points',
      description: 'Double points for next correct answer',
      icon: '2️⃣',
      count: userState.powerUps.doublePoints
    }
  ];

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Power-Ups</h3>
        <div className="space-y-2">
          {powerUps.map((powerUp) => (
            <motion.button
              key={powerUp.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => usePowerUp(powerUp.id as 'extraTime' | 'skipQuestion' | 'doublePoints')}
              disabled={powerUp.count === 0}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                powerUp.count === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{powerUp.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-medium">{powerUp.name}</p>
                  <p className="text-xs text-gray-500">{powerUp.description}</p>
                </div>
              </div>
              <span className="text-sm font-medium">{powerUp.count}x</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
} 