import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveMap } from '../components/ui/InteractiveMap';
import { 
  Target, 
  Eye, 
  Users, 
  MapPin, 
  Award,
  Lightbulb,
  Heart,
  Zap
} from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible in API monitoring.'
    },
    {
      icon: Heart,
      title: 'Reliability',
      description: 'Your trust is our foundation. We build systems you can depend on.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Speed and efficiency are at the core of everything we create.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building together and supporting each other.'
    }
  ];

  const team = [
       {
      name: 'Praveen Kumar',
      role: 'Founder',
      image: 'https://icon-library.com/images/instagram-tag-icon/instagram-tag-icon-13.jpg',
      description: 'Expert in real-time systems and monitoring infrastructure with a passion for reliability.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-sf-pro tracking-tight"
            >
              About ATINAR
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-sf-pro"
            >
              We're a focused team of developers dedicated to making 
              API monitoring simple, reliable, and accessible for everyone.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-sf-pro">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sf-pro">
                To empower developers and businesses with the most reliable and intuitive 
                API monitoring platform. We believe that every API deserves to be monitored 
                with precision, and every developer deserves tools that just work.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sf-pro">
                Our mission is to eliminate the stress and uncertainty that comes with 
                managing critical API infrastructure, allowing teams to focus on building 
                amazing products instead of worrying about uptime.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-sf-pro">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sf-pro">
                To become a trusted solution for API monitoring and observability. 
                We envision helping developers build more reliable services with 
                better monitoring tools and insights.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sf-pro">
                We're building towards a future where monitoring is proactive, 
                intelligent, and seamlessly integrated into every development workflow.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-sf-pro tracking-tight"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-sf-pro"
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-sf-pro">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-sf-pro">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-sf-pro tracking-tight"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-sf-pro"
            >
              The passionate individuals behind ATINAR
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-sf-pro">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4 font-sf-pro">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 font-sf-pro">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-sf-pro">Our Location</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sf-pro">
                Founded in 2022 and based in Faridabad, Haryana, we're a focused team 
                dedicated to providing reliable API monitoring solutions. As a small 
                company, we prioritize quality over quantity, ensuring each project 
                receives our full attention and expertise.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-sf-pro">Security Focused</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-sf-pro">Quality Driven</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-sf-pro">Customer Focused</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg"
            >
              <InteractiveMap className="aspect-video mb-6" />
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-sf-pro">ATINAR Technologies</h3>
                <p className="text-gray-600 dark:text-gray-300 font-sf-pro">
                  B-334, Opp. PNB ATM, Nehru Ground NIT<br />
                  Faridabad, Haryana 121001, India
                </p>
                <p className="text-gray-600 dark:text-gray-300 font-sf-pro">
                  <strong>Email:</strong> contact@atinar.in<br />
                  <strong>Website:</strong> atinar.in
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}