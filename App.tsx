import React from 'react';
import { Router, Route, Switch, useLocation } from 'wouter';
import { useHashLocation } from './hooks/useHashLocation';
import { AnimatePresence, motion } from 'framer-motion';

import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { Navbar } from './components/layout/Navbar';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

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

const AppContent: React.FC = () => {
  const [location] = useLocation();
  const noNavRoutes = ['/login', '/signup', '/dashboard'];
  const showNavbar = !noNavRoutes.some(route => location.startsWith(route));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900">
      {showNavbar && <Navbar />}
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
  );
};

const App: React.FC = () => {
  return (
    <Router hook={useHashLocation}>
      <AppContent />
    </Router>
  );
};

export default App;
