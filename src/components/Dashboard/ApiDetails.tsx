import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  CheckCircle,
  XCircle, 
  Clock, 
  TrendingUp,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ApiEndpoint, ApiCheck } from '../../types';

interface ApiDetailsProps {
  endpoint: ApiEndpoint;
  onClose: () => void;
  getEndpointChecks: (endpointId: string) => Promise<ApiCheck[]>;
}
 
export function ApiDetails({ endpoint, onClose, getEndpointChecks }: ApiDetailsProps) {
  const [checks, setChecks] = useState<ApiCheck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChecks = async () => {
      try {
        const data = await getEndpointChecks(endpoint.id);
        setChecks(data);
      } catch (error) {
        console.error('Failed to fetch checks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChecks();
  }, [endpoint.id, getEndpointChecks]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'down':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const calculateUptime = () => {
    if (checks.length === 0) return 0;
    const upChecks = checks.filter(check => check.status === 'up').length;
    return (upChecks / checks.length) * 100;
  };

  const getAverageResponseTime = () => {
    if (checks.length === 0) return 0;
    const total = checks.reduce((sum, check) => sum + check.response_time, 0);
    return Math.round(total / checks.length);
  };

  const getRecentFailures = () => {
    return checks.filter(check => check.status === 'down').slice(0, 5);
  };

  // Prepare chart data
  const chartData = checks
    .slice(0, 24)
    .reverse()
    .map((check, index) => ({
      time: new Date(check.checked_at).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit' 
      }),
      responseTime: check.response_time,
      status: check.status === 'up' ? 1 : 0,
    }));

  const uptime = calculateUptime();
  const avgResponseTime = getAverageResponseTime();
  const recentFailures = getRecentFailures();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(endpoint.status)}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{endpoint.name}</h2>
                <p className="text-gray-600">{endpoint.url}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-600">Uptime</p>
                    <p className="text-2xl font-bold text-green-900">
                      {uptime.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Activity className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-600">Avg Response</p>
                    <p className="text-2xl font-bold text-blue-900">
                      {avgResponseTime}ms
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-purple-600">Check Interval</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {endpoint.interval}m
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Chart */}
            {chartData.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Response Time (Last 24 Checks)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value}ms`, 'Response Time']}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="responseTime" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Uptime Chart */}
            {chartData.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Uptime Status (Last 24 Checks)
                </h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" /> {/* Ensure `time` exists in chartData */}
                      <YAxis domain={[0, 1]} tickFormatter={(value) => value === 1 ? 'Up' : 'Down'} />
                      <Tooltip
                        formatter={(value) => [value === 1 ? 'Up' : 'Down', 'Status']}
                        labelFormatter={(label) => `Time: ${label}`} 
                        />
                        {/* Ensure `label` exists in chartData */}  
                      <Area 
                        type="stepAfter" 
                        dataKey="status" 
                        stroke="#10B981" 
                        fill="#10B981"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Recent Failures */}
            {recentFailures.length > 0 && (
              <div className="bg-red-50 p-6 rounded-xl">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-900">
                    Recent Failures
                  </h3>
                </div>
                <div className="space-y-3">
                  {recentFailures.map((failure) => (
                    <div key={failure.id} className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {failure.error_message || 'Connection failed'}
                          </p>
                          <p className="text-sm text-gray-600">
                            Status Code: {failure.status_code || 'N/A'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {new Date(failure.checked_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {checks.length === 0 && (
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No monitoring data yet
                </h3>
                <p className="text-gray-600">
                  Monitoring will begin shortly. Check back in a few minutes to see your API analytics.
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}