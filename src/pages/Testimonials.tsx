import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      id: '1',
      name: 'Sarah Chen',
      company: 'TechFlow Inc.',
      rating: 5,
      message: 'ATINAR has been a game-changer for our API monitoring. The real-time alerts saved us from a major outage last month. The dashboard is intuitive and the performance insights are invaluable.',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      company: 'DataSync Solutions',
      rating: 5,
      message: 'The best monitoring tool we\'ve used. Setup was incredibly easy, and the analytics help us optimize our API performance continuously. Customer support is top-notch.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Emily Johnson',
      company: 'CloudFirst Technologies',
      rating: 5,
      message: 'ATINAR\'s monitoring platform gives us complete visibility into our API ecosystem. The uptime tracking and performance metrics are exactly what we needed to maintain our SLAs.',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      name: 'David Kim',
      company: 'StartupLab',
      rating: 5,
      message: 'As a startup, reliability is crucial for us. ATINAR helps us maintain 99.9% uptime and gives our customers confidence in our platform. The pricing is very reasonable too.',
      avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      company: 'Enterprise Corp',
      rating: 5,
      message: 'The detailed analytics and historical data help us make informed decisions about our infrastructure. ATINAR has become an essential part of our DevOps toolkit.',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      name: 'James Wilson',
      company: 'API Masters',
      rating: 5,
      message: 'The multi-location monitoring gives us global insights into our API performance. The alerting system is smart and doesn\'t overwhelm us with false positives.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
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
            What Our Customers Say
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-light-dark/80 dark:text-dark-primary/80 max-w-3xl mx-auto mb-8"
          >
            Don't just take our word for it. Here's what developers and businesses 
            around the world are saying about ATINAR.
          </motion.p>

          {/* Average Rating Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-black p-8 rounded-2xl shadow-lg inline-block border border-light-secondary dark:border-dark-accent transition-colors duration-300"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-3xl font-bold text-light-dark dark:text-dark-primary mb-2">
              {averageRating.toFixed(1)} out of 5
            </div>
            <div className="text-light-dark/80 dark:text-dark-primary/80">
              Based on {testimonials.length} reviews
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-light-secondary dark:bg-dark-accent p-8 rounded-2xl hover:shadow-lg transition-all duration-300 relative"
              >
                <Quote className="h-8 w-8 text-light-accent dark:text-dark-secondary mb-4 opacity-50" />
                
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-light-dark dark:text-dark-primary mb-6 leading-relaxed">
                  "{testimonial.message}"
                </p>

                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-light-dark dark:text-dark-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-light-dark/80 dark:text-dark-primary/80">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
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
            Join Our Happy Customers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/80 dark:text-black/80 mb-8 max-w-2xl mx-auto"
          >
            Start monitoring your APIs today and experience the reliability 
            that thousands of developers trust.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a
              href="/signup"
              className="inline-block bg-white dark:bg-black text-light-primary dark:text-dark-secondary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-light-secondary dark:hover:bg-dark-accent transition-colors transform hover:scale-105"
            >
              Start Your Free Trial
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}