import React from 'react';
import { Router, Route, Switch, Link } from 'wouter';
import { useHashLocation } from './hooks/useHashLocation';
import { AnimatePresence, motion } from 'framer-motion';

import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { Logo } from './components/ui/Logo';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

// FIX: Add `as const` to ensure TypeScript infers the literal types for the transition object.
// This prevents the `type` property from being widened to `string`, which is incompatible with framer-motion's `Transition` type.
const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
} as const;

const AnimatedRoute = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  return (
    <Router hook={useHashLocation}>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900">
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 transition-colors">
          <div className="max-w-7xl mx-auto py-3 px-6 md:px-12">
            <div className="flex justify-between items-center">
              <Link href="/">
                <a className="cursor-pointer">
                  <Logo />
                </a>
              </Link>
              <nav className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/login">
                  <a className="text-sm font-medium text-slate-600 hover:text-brand-500 dark:text-slate-300 dark:hover:text-brand-400 transition-colors">
                    Login
                  </a>
                </Link>
                <Link href="/signup">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm font-medium bg-gradient-to-r from-brand-500 to-brand-600 text-white px-4 py-2 rounded-md hover:shadow-lg hover:shadow-brand-500/30 transition-shadow"
                  >
                    Sign Up
                  </motion.a>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Switch>
              <Route path="/">
                <AnimatedRoute><LandingPage /></AnimatedRoute>
              </Route>
              <Route path="/app">
                <AnimatedRoute><AppPage /></AnimatedRoute>
              </Route>
              <Route path="/login">
                <AnimatedRoute><LoginPage /></AnimatedRoute>
              </Route>
              <Route path="/signup">
                <AnimatedRoute><SignupPage /></AnimatedRoute>
              </Route>
              <Route path="/dashboard">
                <AnimatedRoute><DashboardPage /></AnimatedRoute>
              </Route>
              <Route>
                <AnimatedRoute><NotFoundPage /></AnimatedRoute>
              </Route>
            </Switch>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
};

export default App;
