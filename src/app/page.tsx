'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  questions: number;
  progress: number;
  lastPlayed?: string;
}

const features = [
  {
    title: "Multiple Categories",
    description: "Test your knowledge across various topics",
    icon: "📚",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Daily Challenges",
    description: "Compete in daily quizzes for rewards",
    icon: "🎯",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Leaderboard",
    description: "Climb the ranks and show your skills",
    icon: "🏆",
    color: "from-amber-500 to-amber-600"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement over time",
    icon: "📈",
    color: "from-green-500 to-green-600"
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Quiz Enthusiast",
    content: "The most engaging quiz platform I've ever used!",
    avatar: "👩"
  },
  {
    name: "Mike Chen",
    role: "Trivia Master",
    content: "Perfect for testing and improving my knowledge daily.",
    avatar: "👨"
  },
  {
    name: "Emma Davis",
    role: "Learning Expert",
    content: "Great way to learn while having fun!",
    avatar: "👩‍🏫"
  }
];

const quizCategories: QuizCategory[] = [
  {
    id: "general",
    title: "General Knowledge",
    description: "Test your knowledge across various topics",
    icon: "📚",
    color: "from-blue-500 to-blue-600",
    questions: 20,
    progress: 75,
    lastPlayed: "2 hours ago"
  },
  {
    id: "science",
    title: "Science & Technology",
    description: "Explore the world of science and innovation",
    icon: "🔬",
    color: "from-purple-500 to-purple-600",
    questions: 15,
    progress: 40,
    lastPlayed: "1 day ago"
  },
  {
    id: "history",
    title: "World History",
    description: "Journey through time and civilizations",
    icon: "🏛️",
    color: "from-amber-500 to-amber-600",
    questions: 25,
    progress: 0
  },
  {
    id: "sports",
    title: "Sports & Games",
    description: "Test your sports knowledge and trivia",
    icon: "⚽",
    color: "from-green-500 to-green-600",
    questions: 18,
    progress: 100,
    lastPlayed: "5 minutes ago"
  }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleQuizStart = (categoryId: string) => {
    window.location.href = `/quiz?category=${categoryId}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Master Your Knowledge
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Challenge yourself with our interactive quizzes and climb the leaderboard!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/quiz"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Quiz Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Challenge</h2>
            <p className="text-xl text-gray-600">Explore our diverse quiz categories</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quizCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredCard(category.id)}
                onHoverEnd={() => setHoveredCard(null)}
                transition={{ duration: 0.3 }}
                className={`relative bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer`}
                onClick={() => handleQuizStart(category.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl text-white">
                      {category.icon}
                    </div>
                    {category.lastPlayed && (
                      <span className="text-xs text-gray-500">{category.lastPlayed}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{category.questions} questions</span>
                      <span>{category.progress}% complete</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${category.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === category.id ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: hoveredCard === category.id ? 1 : 0.8 }}
                    className="bg-white px-4 py-2 rounded-full text-sm font-medium text-purple-600 shadow-lg"
                  >
                    Start Quiz
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Quiz Master?</h2>
            <p className="text-xl text-gray-600">Experience the best quiz platform with amazing features</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied users</p>
          </motion.div>

          <div className="relative h-[180px]">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ 
                duration: 0.8,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-5 max-w-xl mx-auto"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-xl text-white flex-shrink-0">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-sm text-purple-600">{testimonials[activeTestimonial].role}</p>
                    </div>
                    <svg className="w-6 h-6 text-purple-200" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="mt-3 text-base text-gray-600 leading-relaxed">&quot;{testimonials[activeTestimonial].content}&quot;</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Test Your Knowledge?</h2>
            <p className="text-xl text-white/80 mb-8">Join thousands of users and start your quiz journey today!</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/quiz"
                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
