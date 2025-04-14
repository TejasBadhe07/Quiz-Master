'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type QuizCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    timeLimit: number;
  }[];
};

const categories: QuizCategory[] = [
  {
    id: 'general',
    name: 'General Knowledge',
    icon: '🌍',
    color: 'from-blue-500 to-blue-600',
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['London', 'Paris', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
        timeLimit: 15
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
        timeLimit: 15
      }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: 'from-purple-500 to-purple-600',
    questions: [
      {
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'N2'],
        correctAnswer: 'H2O',
        timeLimit: 10
      },
      {
        question: 'What is the largest organ in the human body?',
        options: ['Heart', 'Liver', 'Skin', 'Brain'],
        correctAnswer: 'Skin',
        timeLimit: 10
      }
    ]
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    color: 'from-amber-500 to-amber-600',
    questions: [
      {
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'],
        correctAnswer: 'George Washington',
        timeLimit: 15
      },
      {
        question: 'In which year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: '1945',
        timeLimit: 15
      }
    ]
  }
];

export default function QuizPage() {
  const [currentCategory, setCurrentCategory] = useState<QuizCategory | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswerClick = useCallback((selectedAnswer: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedAnswer(selectedAnswer);
    setShowFeedback(true);
    
    const isCorrect = selectedAnswer === currentCategory?.questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setIsAnimating(false);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < (currentCategory?.questions.length || 0)) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1500);
  }, [currentCategory, currentQuestion, isAnimating, score, streak, maxStreak]);

  useEffect(() => {
    if (currentCategory && !showScore) {
      setTimeLeft(currentCategory.questions[currentQuestion].timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAnswerClick('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentCategory, currentQuestion, showScore, handleAnswerClick]);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setStreak(0);
    setCurrentCategory(null);
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen py-6 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Choose a Category
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Select a category to start your quiz journey!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => setCurrentCategory(category)}
                  className={`w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${category.color} text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-4xl sm:text-5xl">{category.icon}</span>
                    <span className="text-xs sm:text-sm bg-white/20 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                      {category.questions.length} questions
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">{category.name}</h3>
                  <p className="text-sm sm:text-base text-white/80">Test your knowledge in this category</p>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="min-h-screen py-6 sm:py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
              >
                Quiz Completed! 🎉
              </motion.h2>
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl sm:text-2xl text-gray-700"
                >
                  Your score: {score} out of {currentCategory.questions.length}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl text-gray-700"
                >
                  Max Streak: {maxStreak}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl text-gray-700"
                >
                  Accuracy: {Math.round((score / currentCategory.questions.length) * 100)}%
                </motion.div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={resetQuiz}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Play Again
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={resetQuiz}
                  className="w-full sm:w-auto bg-white text-purple-600 border-2 border-purple-600 px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Choose Category
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="text-2xl sm:text-3xl mr-3">{currentCategory.icon}</span>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{currentCategory.name}</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Question {currentQuestion + 1}/{currentCategory.questions.length}</p>
              <p className="text-sm text-gray-600">Streak: {streak}</p>
            </div>
          </div>
          
          <div className="mb-6 sm:mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <motion.div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 sm:h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(timeLeft / currentCategory.questions[currentQuestion].timeLimit) * 100}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl mb-6 sm:mb-8 text-gray-800"
          >
            {currentCategory.questions[currentQuestion].question}
          </motion.p>
          
          <div className="space-y-3 sm:space-y-4">
            {currentCategory.questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswerClick(option)}
                className={`w-full text-left p-4 sm:p-6 rounded-xl transition-all duration-200 ${
                  selectedAnswer === option
                    ? option === currentCategory.questions[currentQuestion].correctAnswer
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-red-100 border-2 border-red-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                }`}
                disabled={showFeedback}
              >
                <span className="text-base sm:text-lg">{option}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-4 sm:mt-6 p-4 rounded-xl text-center ${
                  selectedAnswer === currentCategory.questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {selectedAnswer === currentCategory.questions[currentQuestion].correctAnswer
                  ? 'Correct! 🎉'
                  : `Incorrect! The correct answer is: ${currentCategory.questions[currentQuestion].correctAnswer}`}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 