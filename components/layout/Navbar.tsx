import React, { useState } from 'react';
import { Link, useRoute } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isActive] = useRoute(href);
  return (
    <Link href={href}>
      <a
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'text-brand-500 dark:text-brand-400'
            : 'text-slate-600 hover:text-brand-500 dark:text-slate-300 dark:hover:text-brand-400'
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/api', label: 'API' },
    { href: '/future', label: 'Future' },
    { href: '/showcase', label: 'Showcase' },
  ];

  const menuVariants = {
    closed: { opacity: 0, y: -20, height: 0 },
    open: { opacity: 1, y: 0, height: 'auto' },
  };

  const AuthButtons = () => {
    if (user) {
        const avatarSrc = user.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;
        return (
            <Link href="/dashboard">
                <a className="flex items-center space-x-3 group">
                    <img src={avatarSrc} alt={user.name} className="w-9 h-9 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-brand-500 transition-colors" />
                    <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-brand-500 transition-colors">Dashboard</span>
                </a>
            </Link>
        );
    }
    return (
        <>
            <Link href="/login">
                <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
                <Button variant="primary">Sign Up</Button>
            </Link>
        </>
    );
  };
  
  const MobileAuthButtons = () => {
    if (user) {
        const avatarSrc = user.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;
        return (
            <Link href="/dashboard">
                <a onClick={() => setIsOpen(false)} className="flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                    <img src={avatarSrc} alt={user.name} className="w-8 h-8 rounded-full" />
                    <span className="font-medium text-slate-700 dark:text-slate-200">View Dashboard</span>
                </a>
            </Link>
        )
    }
    return (
        <div className="flex items-center justify-center space-x-4">
            <Link href="/login">
                <Button variant="ghost" className="w-full" onClick={() => setIsOpen(false)}>Login</Button>
            </Link>
            <Link href="/signup">
                <Button variant="primary" className="w-full" onClick={() => setIsOpen(false)}>Sign Up</Button>
            </Link>
        </div>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="cursor-pointer">
                <Logo />
              </a>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map(link => (
              <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-2">
            <AuthButtons />
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-200/50 dark:border-slate-800/50">
              {navLinks.map(link => (
                <Link href={link.href} key={link.href}>
                  <a
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-brand-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-brand-400 dark:hover:bg-slate-800"
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                 <MobileAuthButtons />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};