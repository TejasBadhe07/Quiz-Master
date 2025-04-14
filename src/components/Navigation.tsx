'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/profile", label: "Profile" },
    { href: "/daily-challenge", label: "Daily Challenge" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="group">
              <motion.span 
                className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                Quiz Master
                <motion.span 
                  className="ml-2 text-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  🎯
                </motion.span>
              </motion.span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="relative group"
              >
                <span className={`text-gray-600 group-hover:text-purple-600 transition-colors duration-200 ${
                  pathname === item.href ? 'text-purple-600 font-medium' : ''
                }`}>
                  {item.label}
                </span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
            <motion.div 
              className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full cursor-pointer hover:bg-purple-100 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white">
                👤
              </span>
              <span className="text-sm font-medium text-gray-700">John Doe</span>
              <motion.span 
                className="text-gray-400"
                animate={{ rotate: [0, 180, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ▼
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 