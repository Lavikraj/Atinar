import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-light-dark dark:bg-black text-white dark:text-dark-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex justify-center md:justify-start mb-6">
              <img 
                src="/Untitled-1.png" 
                alt="ATINAR" 
                className="h-12 w-auto dark:filter dark:brightness-0 dark:invert"
              />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-lg font-semibold text-white dark:text-dark-primary font-sf-pro">Contact Information</h3>
              <div className="flex items-center space-x-2 text-white/80 dark:text-dark-primary/80">
                <MapPin className="h-4 w-4" />
                <span className="font-sf-pro">B-334, Opp. PNB ATM, Nehru Ground NIT<br />Faridabad, Haryana 121001, India</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80 dark:text-dark-primary/80">
                <Mail className="h-4 w-4" />
                <span className="font-sf-pro">contact@atinar.in</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80 dark:text-dark-primary/80">
                <span className="font-sf-pro font-medium">Website:</span>
                <span className="font-sf-pro">atinar.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-sf-pro text-white dark:text-dark-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 dark:text-dark-primary/80 hover:text-white dark:hover:text-dark-primary transition-colors font-sf-pro">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 dark:text-dark-primary/80 hover:text-white dark:hover:text-dark-primary transition-colors font-sf-pro">
                  About
                </Link>
              </li>
              {/* <li>
                <Link to="/testimonials" className="text-white/80 dark:text-dark-primary/80 hover:text-white dark:hover:text-dark-primary transition-colors font-sf-pro">
                  Testimonials
                </Link>
              </li> */}
              <li>
                <Link to="/contact" className="text-white/80 dark:text-dark-primary/80 hover:text-white dark:hover:text-dark-primary transition-colors font-sf-pro">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-sf-pro text-white dark:text-dark-primary">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-white/80 dark:text-dark-primary/80 font-sf-pro">API Monitoring</span>
              </li>
              <li>
                <span className="text-white/80 dark:text-dark-primary/80 font-sf-pro">Uptime Tracking</span>
              </li>
              <li>
                <span className="text-white/80 dark:text-dark-primary/80 font-sf-pro">Performance Analytics</span>
              </li>
              <li>
                <span className="text-white/80 dark:text-dark-primary/80 font-sf-pro">Alert Management</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 dark:border-dark-accent mt-8 pt-8 text-center">
          <p className="text-white/80 dark:text-dark-primary/80 font-sf-pro">
            © 2025 ATINAR. All rights reserved. Built with precision and care.
          </p>
        </div>
      </div>
    </footer>
  );
}