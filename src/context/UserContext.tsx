'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  xpReward: number;
}

interface UserState {
  level: number;
  xp: number;
  totalXp: number;
  streak: number;
  maxStreak: number;
  achievements: Achievement[];
  powerUps: {
    extraTime: number;
    skipQuestion: number;
    doublePoints: number;
  };
  settings: {
    soundEffects: boolean;
    darkMode: boolean;
    animations: boolean;
  };
}

const initialAchievements: Achievement[] = [
  {
    id: 'first_quiz',
    title: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯',
    unlocked: false,
    xpReward: 50
  },
  {
    id: 'streak_3',
    title: 'Hot Streak',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    unlocked: false,
    xpReward: 100
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Get all questions right in a quiz',
    icon: '⭐',
    unlocked: false,
    xpReward: 200
  },
  {
    id: 'category_master',
    title: 'Category Master',
    description: 'Complete all questions in a category',
    icon: '🏆',
    unlocked: false,
    xpReward: 300
  }
];

const initialUserState: UserState = {
  level: 1,
  xp: 0,
  totalXp: 0,
  streak: 0,
  maxStreak: 0,
  achievements: initialAchievements,
  powerUps: {
    extraTime: 3,
    skipQuestion: 2,
    doublePoints: 1
  },
  settings: {
    soundEffects: true,
    darkMode: false,
    animations: true
  }
};

interface UserContextType {
  userState: UserState;
  addXp: (amount: number) => void;
  updateStreak: (increment: boolean) => void;
  unlockAchievement: (achievementId: string) => void;
  usePowerUp: (type: 'extraTime' | 'skipQuestion' | 'doublePoints') => void;
  toggleSetting: (setting: keyof UserState['settings']) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userState, setUserState] = useState<UserState>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('userState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.settings.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return parsed;
      }
    }
    return initialUserState;
  });

  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(userState));
  }, [userState]);

  const addXp = (amount: number) => {
    setUserState(prev => {
      const newXp = prev.xp + amount;
      const newTotalXp = prev.totalXp + amount;
      const newLevel = Math.floor(Math.sqrt(newTotalXp / 100)) + 1;
      
      return {
        ...prev,
        xp: newXp,
        totalXp: newTotalXp,
        level: newLevel
      };
    });
  };

  const updateStreak = (increment: boolean) => {
    setUserState(prev => {
      const newStreak = increment ? prev.streak + 1 : 0;
      return {
        ...prev,
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak)
      };
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setUserState(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });
      
      return {
        ...prev,
        achievements: updatedAchievements
      };
    });
  };

  const usePowerUp = (type: 'extraTime' | 'skipQuestion' | 'doublePoints') => {
    setUserState(prev => {
      if (prev.powerUps[type] > 0) {
        return {
          ...prev,
          powerUps: {
            ...prev.powerUps,
            [type]: prev.powerUps[type] - 1
          }
        };
      }
      return prev;
    });
  };

  const toggleSetting = (setting: keyof UserState['settings']) => {
    setUserState(prev => {
      const newState = {
        ...prev,
        settings: {
          ...prev.settings,
          [setting]: !prev.settings[setting]
        }
      };
      
      if (setting === 'darkMode') {
        if (newState.settings.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      return newState;
    });
  };

  return (
    <UserContext.Provider value={{
      userState,
      addXp,
      updateStreak,
      unlockAchievement,
      usePowerUp,
      toggleSetting
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 