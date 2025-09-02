import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const ExclamationCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 13a1 1 0 112 0v-5a1 1 0 11-2 0v5zm2-8a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
  </svg>
);


export const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', error, ...props }) => {
  // FIX: Added 'as const' to ensure the 'ease' property is inferred as a literal type, not a generic string, which resolves the TypeScript error with framer-motion's Variants type.
  const errorVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
  } as const;

  const hasError = !!error;

  return (
    <div>
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type={type}
          id={props.id || props.name}
          className={`w-full p-3 pr-10 border rounded-lg bg-slate-50 dark:bg-slate-800/50 outline-none transition-all duration-200
            ${hasError
              ? 'border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 placeholder-red-400/70 focus:ring-red-500/50 focus:border-red-500'
              : 'border-slate-300 dark:border-slate-700 focus:ring-brand-500/50 focus:border-brand-500'
            } 
            focus:ring-2`}
          {...props}
        />
        <AnimatePresence>
          {hasError && (
             <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
             >
              <ExclamationCircleIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {hasError && (
          <motion.p
            key="error-message"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-red-600 dark:text-red-400 text-xs mt-1.5 overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
