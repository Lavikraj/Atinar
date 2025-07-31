import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'up' | 'down' | 'unknown' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function StatusBadge({ 
  status, 
  size = 'md', 
  showIcon = true 
}: StatusBadgeProps) {
  const configs = {
    up: {
      icon: CheckCircle,
      label: 'Up',
      classes: 'bg-green-100 text-green-800 border-green-200'
    },
    down: {
      icon: XCircle,
      label: 'Down',
      classes: 'bg-red-100 text-red-800 border-red-200'
    },
    unknown: {
      icon: Clock,
      label: 'Unknown',
      classes: 'bg-gray-100 text-gray-800 border-gray-200'
    },
    warning: {
      icon: AlertTriangle,
      label: 'Warning',
      classes: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span className={`
      inline-flex items-center space-x-1 rounded-full font-medium border
      ${config.classes}
      ${sizeClasses[size]}
    `}>
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{config.label}</span>
    </span>
  );
}