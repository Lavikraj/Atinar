import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative w-10 h-6 bg-light-secondary dark:bg-dark-accent rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-secondary focus:ring-offset-2 dark:focus:ring-offset-black hover:bg-light-accent/20 dark:hover:bg-dark-secondary/20"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-4 h-4 bg-white dark:bg-dark-primary rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: isDarkMode ? 16 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {isDarkMode ? (
          <Moon className="w-2 h-2 text-dark-background" />
        ) : (
          <Sun className="w-2 h-2 text-light-primary" />
        )}
      </motion.div>
    </motion.button>
  );
}