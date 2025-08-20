import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    //{ name: 'Pricing', href: '/pricing' },
    //{ name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-light-secondary dark:border-dark-accent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/Untitled-1.png" 
              alt="ATINAR" 
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-110 dark:filter dark:brightness-0 dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`interactive block text-sm font-medium transition-colors hover:text-light-accent dark:hover:text-dark-secondary ${
                  isActive(item.href) ? 'text-light-accent dark:text-dark-secondary' : 'text-light-secondary dark:text-dark-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="nav-link interactive text-sm font-medium text-light-secondary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-secondary transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="interactive text-sm font-medium text-light-secondary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-secondary transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link interactive text-sm font-medium text-light-secondary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-secondary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="interactive bg-light-primary dark:bg-dark-secondary text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-light-accent dark:hover:bg-light-primary transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="interactive md:hidden p-2 rounded-lg text-light-dark dark:text-dark-primary hover:bg-light-secondary dark:hover:bg-dark-accent transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-black border-t border-light-secondary dark:border-dark-accent transition-colors duration-300"
          >
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`interactive block text-sm font-medium transition-colors hover:text-light-accent dark:hover:text-dark-secondary ${
                    isActive(item.href) ? 'text-light-accent dark:text-dark-secondary' : 'text-light-dark dark:text-dark-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <ThemeToggle />
              </div>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="interactive block text-sm font-medium text-light-secondary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-secondary transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="interactive block text-sm font-medium text-light-secondary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-secondary transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="interactive block text-sm font-medium text-light-secondary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-secondary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="interactive block bg-light-primary dark:bg-dark-secondary text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-light-accent dark:hover:bg-light-primary transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
