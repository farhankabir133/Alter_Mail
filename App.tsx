import React, { useEffect } from 'react';
import { Router, Route, Switch, useLocation } from 'wouter';
import { useHashLocation } from './hooks/useHashLocation';
import { AnimatePresence, motion } from 'framer-motion';

import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import APIPage from './pages/APIPage';
import FutureIntegrationPage from './pages/FutureIntegrationPage';
import ChangelogPage from './pages/ChangelogPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
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
  const noNavRoutes = ['/login', '/signup', '/dashboard', '/forgot-password', '/reset-password'];
  const showNavbar = !noNavRoutes.some(route => location.startsWith(route));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
            <Route path="/services">
              <AnimatedRoute><ServicesPage /></AnimatedRoute>
            </Route>
            <Route path="/pricing">
              <AnimatedRoute><PricingPage /></AnimatedRoute>
            </Route>
            <Route path="/about">
              <AnimatedRoute><AboutPage /></AnimatedRoute>
            </Route>
            <Route path="/api">
              <AnimatedRoute><APIPage /></AnimatedRoute>
            </Route>
            <Route path="/future">
              <AnimatedRoute><FutureIntegrationPage /></AnimatedRoute>
            </Route>
            <Route path="/showcase">
              <AnimatedRoute><ChangelogPage /></AnimatedRoute>
            </Route>
            <Route path="/forgot-password">
              <AnimatedRoute><ForgotPasswordPage /></AnimatedRoute>
            </Route>
            <Route path="/reset-password">
              <AnimatedRoute><ResetPasswordPage /></AnimatedRoute>
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