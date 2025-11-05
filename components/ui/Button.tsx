import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// FIX: Changed from interface extension to a type alias with an intersection (&).
// This correctly merges the custom props with all standard button attributes from
// HTMLMotionProps, resolving numerous type errors across the application where
// props like 'className', 'onClick', and 'type' were not recognized.
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
} & HTMLMotionProps<'button'>;

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading = false, size = 'md', className = '', ...props }) => {
  const baseClasses = "rounded-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm";
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-4 text-base tracking-wide',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:shadow-lg hover:shadow-brand-500/40 focus-visible:ring-brand-500',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 focus-visible:ring-slate-400',
    ghost: 'bg-transparent text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 focus-visible:ring-brand-500 shadow-none',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : children}
    </motion.button>
  );
};
