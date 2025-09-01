import React from 'react';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
            <Logo />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              Your trusted partner for temporary, secure, and anonymous email.
            </p>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} AltMail. All rights reserved. Built for privacy.</p>
        </div>
      </div>
    </footer>
  );
};