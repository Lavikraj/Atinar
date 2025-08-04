import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Zap, 
  Shield, 
  BarChart3,
  Bell,
  Clock,
  Users,
  Star,
  ArrowRight
} from 'lucide-react';
import { EnhancedButton } from '../components/ui/EnhancedButton';

export function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for testing and small personal projects',
      features: [
        '3 API endpoints',
        '5-minute check intervals',
        '7 days data retention',
        'Email alerts',
        'Basic dashboard',
        'Community support'
      ],
      limitations: [
        'No SMS alerts',
        'No custom intervals',
        'No team collaboration',
        'No advanced analytics'
      ],
      popular: false,
      cta: 'Start Free',
      color: 'gray'
    },
    {
      name: 'Starter',
      price: '₹299',
      period: 'per month',
      description: 'Ideal for small startups and growing businesses',
      features: [
        '10 API endpoints',
        '1-minute check intervals',
        '30 days data retention',
        'Email + SMS alerts',
        'Advanced dashboard',
        'Priority support',
        'Custom alert rules',
        'Uptime reports'
      ],
      limitations: [],
      popular: true,
      cta: 'Start 14-day Free Trial',
      color: 'blue'
    },
    {
      name: 'Pro',
      price: '₹799',
      period: 'per month',
      description: 'For established companies with critical APIs',
      features: [
        '50 API endpoints',
        '30-second check intervals',
        '90 days data retention',
        'All alert channels',
        'Team collaboration (5 users)',
        'Advanced analytics',
        'Custom integrations',
        'SLA monitoring',
        'White-label reports'
      ],
      limitations: [],
      popular: false,
      cta: 'Start 14-day Free Trial',
      color: 'purple'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'Tailored solutions for large organizations',
      features: [
        'Unlimited endpoints',
        'Custom check intervals',
        'Unlimited data retention',
        'Dedicated support',
        'Unlimited team members',
        'Custom integrations',
        'On-premise deployment',
        'SLA guarantees',
        'Custom contracts'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales',
      color: 'red'
    }
  ];

  const freeTrialJustification = [
    {
      icon: Clock,
      title: '5-Minute Intervals',
      description: 'Sufficient for most development and testing scenarios. Critical issues are still caught quickly.'
    },
    {
      icon: BarChart3,
      title: '3 API Endpoints',
      description: 'Perfect for monitoring your core services - authentication, main API, and database health checks.'
    },
    {
      icon: Shield,
      title: '7 Days Retention',
      description: 'Enough historical data to identify patterns and troubleshoot recent issues effectively.'
    },
    {
      icon: Bell,
      title: 'Email Alerts Only',
      description: 'Email notifications are reliable and sufficient for non-critical monitoring needs.'
    }
  ];

  const getColorClasses = (color: string, popular: boolean) => {
    if (popular) {
      return {
        border: 'border-light-primary dark:border-dark-secondary',
        bg: 'bg-gradient-to-br from-light-primary/5 to-light-accent/5 dark:from-dark-secondary/5 to-dark-primary/5',
        badge: 'bg-light-primary dark:bg-dark-secondary text-white dark:text-black'
      };
    }
    
    const colors = {
      gray: {
        border: 'border-gray-200 dark:border-gray-700',
        bg: 'bg-white dark:bg-black',
        badge: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
      },
      blue: {
        border: 'border-blue-200 dark:border-blue-800',
        bg: 'bg-blue-50/50 dark:bg-blue-900/10',
        badge: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      },
      purple: {
        border: 'border-purple-200 dark:border-purple-800',
        bg: 'bg-purple-50/50 dark:bg-purple-900/10',
        badge: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      },
      red: {
        border: 'border-red-200 dark:border-red-800',
        bg: 'bg-red-50/50 dark:bg-red-900/10',
        badge: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      }
    };
    
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-light-secondary to-light-secondary/50 dark:from-dark-accent to-dark-accent/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-light-dark dark:text-dark-primary mb-6"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-light-dark/80 dark:text-dark-primary/80 max-w-3xl mx-auto mb-8"
          >
            Start free and scale as you grow. No hidden fees, no surprises. 
            Designed for Indian startups and businesses.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => {
              const colorClasses = getColorClasses(plan.color, plan.popular);
              
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`
                    relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg
                    ${colorClasses.border} ${colorClasses.bg}
                    ${plan.popular ? 'scale-105 shadow-xl' : ''}
                  `}
                >
                  {plan.popular && (
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-semibold ${colorClasses.badge}`}>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-light-dark dark:text-dark-primary mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-light-dark dark:text-dark-primary">
                        {plan.price}
                      </span>
                      {plan.period !== 'contact us' && (
                        <span className="text-light-dark/60 dark:text-dark-primary/60 ml-2">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-light-dark/80 dark:text-dark-primary/80">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-light-dark dark:text-dark-primary">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-center space-x-3">
                        <X className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span className="text-light-dark/60 dark:text-dark-primary/60">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                    className="block w-full"
                  >
                    <EnhancedButton
                      variant={plan.popular ? 'primary' : 'outline'}
                      className="w-full justify-center"
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </EnhancedButton>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Tier Justification */}
      <section className="py-20 bg-light-secondary dark:bg-dark-accent transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-light-dark dark:text-dark-primary mb-4"
            >
              Why Our Free Tier Makes Sense
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-light-dark/80 dark:text-dark-primary/80 max-w-2xl mx-auto"
            >
              Our free tier isn't just a trial - it's a complete solution for small projects and testing
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {freeTrialJustification.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-black p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-light-primary/20 dark:bg-dark-secondary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-light-primary dark:text-dark-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-light-dark dark:text-dark-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-light-dark/80 dark:text-dark-primary/80">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-light-dark dark:text-dark-primary mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Can I upgrade or downgrade my plan anytime?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly."
              },
              {
                question: "What happens if I exceed my plan limits?",
                answer: "We'll notify you when you're approaching your limits. For the free tier, monitoring will pause until the next billing cycle. Paid plans have soft limits with grace periods."
              },
              {
                question: "Do you offer discounts for Indian startups?",
                answer: "Yes! We offer special pricing for registered Indian startups and educational institutions. Contact us with your details for custom pricing."
              },
              {
                question: "Is there a setup fee or hidden costs?",
                answer: "No setup fees, no hidden costs. What you see is what you pay. All prices are in Indian Rupees and include applicable taxes."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-light-secondary dark:bg-dark-accent p-6 rounded-2xl"
              >
                <h3 className="text-lg font-semibold text-light-dark dark:text-dark-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-light-dark/80 dark:text-dark-primary/80">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-secondary dark:to-dark-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white dark:text-black mb-6"
          >
            Ready to Start Monitoring?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/80 dark:text-black/80 mb-8 max-w-2xl mx-auto"
          >
            Join hundreds of Indian startups and businesses monitoring their APIs with ATINAR
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/signup">
              <EnhancedButton variant="secondary" size="lg" className="bg-white dark:bg-black text-light-primary dark:text-dark-secondary hover:bg-light-secondary dark:hover:bg-dark-accent">
                <span>Start Free Forever</span>
                <Zap className="h-5 w-5" />
              </EnhancedButton>
            </Link>
            <Link to="/contact">
              <EnhancedButton variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/20 dark:border-black/50 dark:text-black dark:hover:bg-black/20">
                Contact Sales
              </EnhancedButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}