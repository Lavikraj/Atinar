import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnhancedButton } from '../components/ui/EnhancedButton';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { 
  Activity, 
  Shield, 
  Zap, 
  BarChart3, 
  Bell, 
  Globe,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Monitor your APIs 24/7 with instant status updates and comprehensive health checks.'
    },
    {
      icon: Shield,
      title: 'Reliable Alerts',
      description: 'Get notified immediately when your APIs go down with customizable alert channels.'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track response times, uptime percentages, and performance trends over time.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sub-second response times and instant notifications to keep you informed.'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Intelligent alerting that reduces noise and focuses on what matters most.'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Monitor from multiple locations worldwide for comprehensive coverage.'
    }
  ];

  const stats = [
    { label: 'APIs Monitored', value: '100+' },
    { label: 'Uptime Target', value: '99.5%' },
    { label: 'Response Time', value: '<200ms' },
    { label: 'Active Users', value: '25+' }
  ];

  return (
    <div className="pt-16 bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative galaxy-background py-20 lg:py-32 overflow-hidden">
        
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-4 h-4 bg-white/10 dark:bg-dark-primary/10 rounded-full"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 right-20 w-6 h-6 bg-light-accent/15 dark:bg-dark-secondary/15 rounded-full"
          />
          <motion.div
            animate={{ 
              x: [0, 120, 0],
              y: [0, -80, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-32 left-1/4 w-3 h-3 bg-light-secondary/20 dark:bg-dark-accent/20 rounded-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative"
            >
              <span className="text-white dark:text-dark-primary drop-shadow-2xl">
                Monitor your APIs.{' '}
              </span>
              <span className="bg-gradient-to-r from-light-primary via-light-accent to-light-primary dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">
                Never miss a heartbeat.
              </span>
              
              {/* Floating Rocket Animation */}
              <motion.div
                animate={{ 
                  x: [0, 100, 200, 100, 0],
                  y: [0, -20, -10, -30, 0],
                  rotate: [0, 15, -10, 20, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-8 -right-8 text-4xl opacity-70"
              >
                🚀
              </motion.div>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 dark:text-dark-primary/90 mb-8 max-w-3xl mx-auto drop-shadow-lg"
            >
              Keep your APIs healthy with real-time monitoring, instant alerts, 
              and comprehensive analytics. Built for developers who care about reliability.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/signup"
                className="inline-block"
              >
                <EnhancedButton size="lg" className="group">
                  <span>Start Monitoring</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </EnhancedButton>
              </Link>
              <Link
                to="/about"
                className="inline-block"
              >
                <EnhancedButton variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/20 dark:border-dark-primary/50 dark:text-dark-primary dark:hover:bg-dark-accent/30">
                  Learn More
                </EnhancedButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-light-secondary dark:bg-black relative transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-light-accent/10 dark:from-dark-accent/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative z-10"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-secondary dark:to-dark-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-light-dark dark:text-dark-primary/90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-accent transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-light-secondary dark:text-dark-primary mb-4"
            >
              Everything you need to monitor APIs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-light-secondary/80 dark:text-dark-primary/80 max-w-2xl mx-auto"
            >
              Comprehensive monitoring tools designed to keep your APIs running smoothly
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedCard
                key={feature.title}
                delay={index * 0.1}
                className="p-8 group bg-white dark:bg-black"
              >
                <div className="bg-light-primary/20 dark:bg-dark-secondary/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-light-accent/20 dark:group-hover:bg-dark-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-light-primary dark:text-dark-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-light-secondary dark:text-dark-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-light-secondary/80 dark:text-dark-primary/80 leading-relaxed">
                  {feature.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-secondary dark:to-dark-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white dark:text-black mb-6"
          >
            Ready to start monitoring?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/80 dark:text-black/80 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of developers who trust ATINAR to keep their APIs healthy
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/signup"
              className="inline-block"
            >
              <EnhancedButton variant="secondary" size="lg" className="bg-white dark:bg-black text-light-primary dark:text-dark-secondary hover:bg-light-secondary dark:hover:bg-dark-background">
                <span>Get Started Free</span>
                <CheckCircle className="h-5 w-5" />
              </EnhancedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}