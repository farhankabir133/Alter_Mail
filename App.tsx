import React, { useEffect } from 'react';
import { Router, Route, Switch, useLocation, Redirect } from 'wouter';
import { useHashLocation } from './hooks/useHashLocation';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';

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
import VerifyEmailPage from './pages/VerifyEmailPage';
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

const ProtectedRoute = ({ children, path }: { children: React.ReactNode; path: string }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route path={path}>{children}</Route>;
};

const AppContent: React.FC = () => {
  const [location] = useLocation();
  const noNavRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];
  // The dashboard will have its own header, so no main navbar
  const showNavbar = !noNavRoutes.some(route => location.startsWith(route)) && !location.startsWith('/dashboard');

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
            <ProtectedRoute path="/dashboard">
              <AnimatedRoute><DashboardPage /></AnimatedRoute>
            </ProtectedRoute>
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
            <Route path="/verify-email">
              <AnimatedRoute><VerifyEmailPage /></AnimatedRoute>
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
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;