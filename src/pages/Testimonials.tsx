import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      id: '1',
      name: 'Arjun Sharma',
      company: 'TechVibe Solutions',
      rating: 5,
      message: 'ATINAR helped us monitor our startup\'s APIs without breaking our budget. The free tier was perfect for our initial 3 endpoints, and the alerts saved us during our product launch.',
      logo: 'https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=TV'
    },
    {
      id: '2',
      name: 'Priya Patel',
      company: 'CodeCraft Studios',
      rating: 5,
      message: 'As a small development agency, we needed reliable monitoring for our clients. ATINAR\'s pricing is fair and the dashboard is intuitive. Our team loves the real-time alerts.',
      logo: 'https://via.placeholder.com/60x60/059669/FFFFFF?text=CC'
    },
    {
      id: '3',
      name: 'Rajesh Kumar',
      company: 'InnovateTech Pvt Ltd',
      rating: 5,
      message: 'The free tier allowed us to test ATINAR with our core APIs. When we scaled up, the paid plans were reasonably priced. Great for Indian startups on a budget.',
      logo: 'https://via.placeholder.com/60x60/DC2626/FFFFFF?text=IT'
    },
    {
      id: '4',
      name: 'Sneha Gupta',
      company: 'WebFlow Technologies',
      rating: 5,
      message: 'Perfect for our small team! We started with the free plan and upgraded as we grew. The 5-minute intervals are sufficient for most of our client projects.',
      logo: 'https://via.placeholder.com/60x60/7C3AED/FFFFFF?text=WF'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      company: 'NextGen Apps',
      rating: 4.5,
      message: 'ATINAR understands the needs of Indian tech companies. The pricing is transparent, no hidden costs, and the support team is responsive. Highly recommended!',
      logo: 'https://via.placeholder.com/60x60/EA580C/FFFFFF?text=NG'
    },
    {
      id: '6',
      name: 'Kavya Reddy',
      company: 'CloudFirst Solutions',
      rating: 5,
      message: 'We\'ve been using ATINAR for 6 months now. Started with free tier, now on Pro plan. The uptime tracking helps us maintain our SLAs with confidence.',
      logo: 'https://via.placeholder.com/60x60/0891B2/FFFFFF?text=CF'
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
            Don't just take our word for it. Here's what Indian startups and small tech companies 
            are saying about ATINAR.
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
              Based on {testimonials.length} reviews from Indian companies
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
                    src={testimonial.logo}
                    alt={`${testimonial.company} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
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
            that Indian startups and small companies trust.
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
