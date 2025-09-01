import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className={`relative bg-white dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-700/50 overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent dark:from-slate-900/10 dark:to-transparent"></div>
      <div className="relative p-6 sm:p-8">
        {children}
      </div>
    </motion.div>
  );
};