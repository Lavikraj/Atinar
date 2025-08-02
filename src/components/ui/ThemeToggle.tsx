import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative w-8 h-5 bg-light-secondary dark:bg-dark-accent rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-secondary focus:ring-offset-1 dark:focus:ring-offset-black hover:bg-light-accent/20 dark:hover:bg-dark-secondary/20"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-3 h-3 bg-white dark:bg-dark-primary rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: isDarkMode ? 12 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {isDarkMode ? (
          <Moon className="w-1.5 h-1.5 text-dark-background" />
        ) : (
          <Sun className="w-1.5 h-1.5 text-light-primary" />
        )}
      </motion.div>
    </motion.button>
  );
}