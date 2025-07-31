import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Plus, ArrowRight } from 'lucide-react';
import { EnhancedButton } from '../ui/EnhancedButton';

interface EmptyStateProps {
  onAddApi: () => void;
}

export function EmptyState({ onAddApi }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Activity className="h-10 w-10 text-blue-600" />
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl font-bold text-gray-900 mb-3"
        >
          Start Monitoring Your APIs
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          Add your first API endpoint to start monitoring its health, performance, 
          and uptime. Get instant alerts when something goes wrong.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-4"
        >
          <button
            onClick={onAddApi}
            className="group"
          >
            <EnhancedButton size="lg" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add Your First API</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </EnhancedButton>
          </button>
          
          <div className="text-sm text-gray-500">
            It only takes 30 seconds to get started
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-xs text-gray-600">Monitoring</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <div className="text-xs text-gray-600">Uptime</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">&lt;1s</div>
            <div className="text-xs text-gray-600">Alerts</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}