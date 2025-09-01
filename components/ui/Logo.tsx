import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
        <path d="M16 2L2 9.5V22.5L16 30L30 22.5V9.5L16 2Z" fill="url(#logoGradient)" />
        <path d="M16 16L30 9.5L16 2L2 9.5L16 16Z" fill="white" fillOpacity="0.2"/>
        <path d="M9 13.5L16 17.5L23 13.5V19.5L16 23.5L9 19.5V13.5Z" fill="white"/>
      </svg>
      <span className="text-2xl font-bold tracking-tighter text-slate-800 dark:text-white">AltMail</span>
    </div>
  );
};