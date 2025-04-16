'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onTimeUp?: () => void;
}

export function QuizQuestion({ question, onAnswer, onTimeUp }: QuizQuestionProps) {
  const { userState, updateUserState } = useUser();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    if (userState.settings.timerMode) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [userState.settings.timerMode, onTimeUp]);

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(optionIndex);
    setShowResult(true);
    
    const isCorrect = optionIndex === question.correctAnswer;
    onAnswer(isCorrect);
    
    // Update streak
    if (isCorrect) {
      const newStreak = userState.streak + 1;
      updateUserState({
        streak: newStreak,
        highestStreak: Math.max(newStreak, userState.highestStreak)
      });
    } else {
      updateUserState({ streak: 0 });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto"
    >
      {/* Timer and Difficulty Badge */}
      <div className="flex justify-between items-center mb-4">
        {userState.settings.timerMode && (
          <div className="text-2xl font-bold text-purple-600">
            {timeLeft}s
          </div>
        )}
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </span>
      </div>

      {/* Question Text */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {question.text}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
            className={`w-full p-4 rounded-lg text-left transition-colors ${
              showResult
                ? index === question.correctAnswer
                  ? 'bg-green-100 text-green-800'
                  : selectedAnswer === index
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {/* Streak Display */}
      {userState.streak > 0 && (
        <div className="mt-4 text-center">
          <span className="text-sm font-medium text-purple-600">
            Current Streak: {userState.streak}
          </span>
        </div>
      )}
    </motion.div>
  );
} 