import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Master - Test Your Knowledge",
  description: "An interactive quiz platform to test and improve your knowledge",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Quiz Master
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/leaderboard"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Leaderboard
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/daily-challenge"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Daily Challenge
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white">
                    👤
                  </div>
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
