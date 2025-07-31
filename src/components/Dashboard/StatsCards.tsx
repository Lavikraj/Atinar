import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface StatsCardsProps {
  totalEndpoints: number;
  upEndpoints: number;
  downEndpoints: number;
  uptime: number;
  avgResponseTime?: number;
  totalChecks?: number;
}

export function StatsCards({ 
  totalEndpoints, 
  upEndpoints, 
  downEndpoints, 
  uptime,
  avgResponseTime = 0,
  totalChecks = 0
}: StatsCardsProps) {
  const stats = [
    {
      icon: Activity,
      label: 'Total APIs',
      value: totalEndpoints.toString(),
      color: 'blue',
      delay: 0.2
    },
    {
      icon: CheckCircle,
      label: 'APIs Up',
      value: upEndpoints.toString(),
      color: 'green',
      delay: 0.3
    },
    {
      icon: XCircle,
      label: 'APIs Down',
      value: downEndpoints.toString(),
      color: 'red',
      delay: 0.4
    },
    {
      icon: TrendingUp,
      label: 'Overall Uptime',
      value: `${uptime.toFixed(1)}%`,
      color: 'purple',
      delay: 0.5
    },
    {
      icon: Clock,
      label: 'Avg Response',
      value: `${avgResponseTime}ms`,
      color: 'indigo',
      delay: 0.6
    },
    {
      icon: AlertTriangle,
      label: 'Total Checks',
      value: totalChecks.toString(),
      color: 'orange',
      delay: 0.7
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      red: 'text-red-600',
      purple: 'text-purple-600',
      indigo: 'text-indigo-600',
      orange: 'text-orange-600'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stat.delay }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <stat.icon className={`h-8 w-8 ${getColorClasses(stat.color)}`} />
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}