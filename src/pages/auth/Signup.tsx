import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, UserPlus, Activity, Shield, Zap, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const signupSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters').optional(),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signUp(data.email, data.password, data.username);
      
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Free Forever Plan',
      description: '3 API endpoints, 5-minute intervals, 7 days retention'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Your data is protected with bank-grade encryption'
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Start monitoring your APIs in under 30 seconds'
    },
    {
      icon: Activity,
      title: '24/7 Monitoring',
      description: 'Never miss an outage with real-time alerts'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Benefits & Branding */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-light-secondary to-light-secondary/50 dark:from-dark-accent to-dark-accent/50 p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-light-primary/20 to-light-accent/20 dark:from-dark-secondary/20 to-dark-primary/20"></div>
            <div className="grid-pattern absolute inset-0"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 max-w-lg text-center"
          >
            <div className="mb-12">
              <h3 className="text-4xl font-bold text-light-dark dark:text-dark-primary mb-4">
                Start Monitoring Today
              </h3>
              <p className="text-xl text-light-dark/80 dark:text-dark-primary/80">
                Join the growing community of Indian developers and startups 
                who trust ATINAR for reliable API monitoring.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4 text-left"
                >
                  <div className="bg-light-primary/20 dark:bg-dark-secondary/20 p-3 rounded-xl">
                    <benefit.icon className="h-6 w-6 text-light-primary dark:text-dark-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-light-dark dark:text-dark-primary mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-light-dark/80 dark:text-dark-primary/80">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 p-6 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-2xl border border-light-secondary/20 dark:border-dark-accent/20"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-light-primary dark:text-dark-secondary mb-2">
                  ₹0
                </div>
                <div className="text-light-dark dark:text-dark-primary font-semibold mb-2">
                  Forever Free Plan
                </div>
                <div className="text-sm text-light-dark/80 dark:text-dark-primary/80">
                  No credit card required • Start monitoring immediately
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
                <img 
                  src="/Untitled-1.png" 
                  alt="ATINAR" 
                  className="h-12 w-auto dark:filter dark:brightness-0 dark:invert"
                />
              </Link>
              <h2 className="text-3xl font-bold text-light-dark dark:text-dark-primary mb-2">
                Create your account
              </h2>
              <p className="text-light-dark/80 dark:text-dark-primary/80">
                Start monitoring your APIs in minutes
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
              >
                <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-light-dark dark:text-dark-primary mb-2">
                  Username (Optional)
                </label>
                <input
                  {...register('username')}
                  type="text"
                  id="username"
                  autoComplete="username"
                  className="w-full px-4 py-3 border border-light-secondary dark:border-dark-accent bg-white dark:bg-black text-light-dark dark:text-dark-primary rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-secondary focus:border-transparent transition-colors"
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-light-dark dark:text-dark-primary mb-2">
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-light-secondary dark:border-dark-accent bg-white dark:bg-black text-light-dark dark:text-dark-primary rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-secondary focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-light-dark dark:text-dark-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 border border-light-secondary dark:border-dark-accent bg-white dark:bg-black text-light-dark dark:text-dark-primary rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-secondary focus:border-transparent transition-colors"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-dark/60 dark:text-dark-primary/60 hover:text-light-dark dark:hover:text-dark-primary"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-light-dark dark:text-dark-primary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 pr-12 border border-light-secondary dark:border-dark-accent bg-white dark:bg-black text-light-dark dark:text-dark-primary rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-secondary focus:border-transparent transition-colors"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-dark/60 dark:text-dark-primary/60 hover:text-light-dark dark:hover:text-dark-primary"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-light-primary dark:bg-dark-secondary text-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-light-accent dark:hover:bg-light-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-black"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center">
              <p className="text-light-dark/80 dark:text-dark-primary/80">
                Already have an account?{' '}
                <Link to="/login" className="text-light-primary dark:text-dark-secondary hover:text-light-accent dark:hover:text-light-primary font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
