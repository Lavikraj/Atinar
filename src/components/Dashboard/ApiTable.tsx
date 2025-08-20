import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2, 
  BarChart3,
  ExternalLink 
} from 'lucide-react';
import { ApiEndpoint } from '../../types';

interface ApiTableProps {
  // The endpoints data is now received as a prop from the parent component
  endpoints: ApiEndpoint[];
  onDelete: (id: string) => void;
  onViewDetails: (endpoint: ApiEndpoint) => void;
}

export function ApiTable({ endpoints, onDelete, onViewDetails }: ApiTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'up':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'down':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatLastChecked = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>API Endpoints ({endpoints.length})</span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                API Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                URL
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Interval
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Last Checked
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {endpoints.map((endpoint, index) => (
              <motion.tr
                key={endpoint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(endpoint.status)}
                    <div>
                      <div className="font-medium text-gray-900">{endpoint.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={getStatusBadge(endpoint.status)}>
                    {endpoint.status.charAt(0).toUpperCase() + endpoint.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 truncate max-w-xs">{endpoint.url}</span>
                    <a
                      href={endpoint.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {endpoint.interval}m
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {formatLastChecked(endpoint.last_checked)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewDetails(endpoint)}
                      className="interactive p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(endpoint.id)}
                      className="interactive p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}