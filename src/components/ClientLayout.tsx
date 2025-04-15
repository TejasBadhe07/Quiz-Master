'use client';

import Link from "next/link";
import { SettingsMenu } from "@/components/SettingsMenu";
import { AchievementNotification } from "@/components/AchievementNotification";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { userState } = useUser();
  
  useEffect(() => {
    if (userState.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [userState.settings.darkMode]);
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${userState.settings.darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Quiz Master
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/leaderboard" 
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Leaderboard
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Profile
              </Link>
              <Link 
                href="/daily-challenge" 
                className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Daily Challenge
              </Link>
            </div>
          </div>
          <SettingsMenu />
        </nav>
        <main>{children}</main>
      </div>
      <AchievementNotification />
    </div>
  );
} 