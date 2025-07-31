import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function EnhancedButton({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: EnhancedButtonProps) {
  const baseClasses = "relative overflow-hidden font-semibold rounded-xl transition-all duration-300 transform";
  
  const variants = {
    primary: "bg-light-primary dark:bg-dark-secondary text-white dark:text-black hover:bg-light-accent dark:hover:bg-dark-primary shadow-lg hover:shadow-xl",
    secondary: "bg-light-secondary dark:bg-dark-accent text-light-dark dark:text-dark-primary hover:bg-light-accent/20 dark:hover:bg-dark-secondary/20",
    outline: "border-2 border-light-primary dark:border-dark-secondary text-light-primary dark:text-dark-secondary hover:bg-light-primary dark:hover:bg-dark-secondary hover:text-white dark:hover:text-black"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"
        initial={false}
        whileHover={{ opacity: 0.1 }}
      />
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </span>
    </motion.button>
  );
}