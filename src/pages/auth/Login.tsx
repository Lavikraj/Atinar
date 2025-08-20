import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn, Activity, Shield, Zap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(data.email, data.password);
      
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

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Get started with monitoring in under 30 seconds'
    },
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Monitor your APIs 24/7 with instant alerts'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
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
                Welcome back
              </h2>
              <p className="text-light-dark/80 dark:text-dark-primary/80">
                Sign in to your monitoring dashboard
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
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-12 border border-light-secondary dark:border-dark-accent bg-white dark:bg-black text-light-dark dark:text-dark-primary rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-secondary focus:border-transparent transition-colors"
                    placeholder="Enter your password"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-light-primary dark:bg-dark-secondary text-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-light-accent dark:hover:bg-light-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-black"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center">
              <p className="text-light-dark/80 dark:text-dark-primary/80">
                Don't have an account?{' '}
                <Link to="/signup" className="text-light-primary dark:text-dark-secondary hover:text-light-accent dark:hover:text-light-primary font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Features & Branding */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-light-secondary to-light-secondary/50 dark:from-dark-accent to-dark-accent/50 p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-light-primary/20 to-light-accent/20 dark:from-dark-secondary/20 to-dark-primary/20"></div>
            <div className="grid-pattern absolute inset-0"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 max-w-lg text-center"
          >
            <div className="mb-12">
              <h3 className="text-4xl font-bold text-light-dark dark:text-dark-primary mb-4">
                Monitor with Confidence
              </h3>
              <p className="text-xl text-light-dark/80 dark:text-dark-primary/80">
                Join hundreds of Indian startups and businesses who trust ATINAR 
                to keep their APIs healthy and reliable.
              </p>
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4 text-left"
                >
                  <div className="bg-light-primary/20 dark:bg-dark-secondary/20 p-3 rounded-xl">
                    <feature.icon className="h-6 w-6 text-light-primary dark:text-dark-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-light-dark dark:text-dark-primary mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-light-dark/80 dark:text-dark-primary/80">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 p-6 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-2xl border border-light-secondary/20 dark:border-dark-accent/20"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-light-primary dark:text-dark-secondary">99.9%</div>
                  <div className="text-sm text-light-dark/80 dark:text-dark-primary/80">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-light-primary dark:text-dark-secondary">24/7</div>
                  <div className="text-sm text-light-dark/80 dark:text-dark-primary/80">Monitoring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-light-primary dark:text-dark-secondary">&lt;1s</div>
                  <div className="text-sm text-light-dark/80 dark:text-dark-primary/80">Alerts</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
