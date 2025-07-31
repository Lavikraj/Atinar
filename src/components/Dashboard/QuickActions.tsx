import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  RefreshCw, 
  Download, 
  Settings,
  Bell,
  BarChart3
} from 'lucide-react';

interface QuickActionsProps {
  onAddApi: () => void;
  onRefresh: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  isRefreshing?: boolean;
}

export function QuickActions({ 
  onAddApi, 
  onRefresh, 
  onExport, 
  onSettings,
  isRefreshing = false 
}: QuickActionsProps) {
  const actions = [
    {
      icon: Plus,
      label: 'Add API',
      onClick: onAddApi,
      primary: true
    },
    {
      icon: RefreshCw,
      label: 'Refresh',
      onClick: onRefresh,
      loading: isRefreshing
    },
    {
      icon: Download,
      label: 'Export',
      onClick: onExport,
      disabled: !onExport
    },
    {
      icon: Bell,
      label: 'Alerts',
      onClick: onSettings,
      disabled: !onSettings
    },
    {
      icon: BarChart3,
      label: 'Reports',
      onClick: onSettings,
      disabled: !onSettings
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex flex-wrap gap-3 mb-6"
    >
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          disabled={action.disabled || action.loading}
          className={`
            interactive flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
            ${action.primary 
              ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
            }
            ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${action.loading ? 'opacity-75' : ''}
          `}
        >
          <action.icon 
            className={`h-4 w-4 ${action.loading ? 'animate-spin' : ''}`} 
          />
          <span>{action.label}</span>
        </button>
      ))}
    </motion.div>
  );
}