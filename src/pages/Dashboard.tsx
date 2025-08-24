import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useApiEndpoints } from '../hooks/useApiEndpoints';
import { AddApiForm } from '../components/Dashboard/AddApiForm';
import { ApiTable } from '../components/Dashboard/ApiTable';
import { ApiDetails } from '../components/Dashboard/ApiDetails';
import { StatsCards } from '../components/Dashboard/StatsCards';
import { QuickActions } from '../components/Dashboard/QuickActions';
import { EmptyState } from '../components/Dashboard/EmptyState';
import { ApiEndpoint } from '../types';

export function Dashboard() {
  const { user, userProfile } = useAuth();
  const { 
    endpoints, 
    loading, 
    error, 
    addEndpoint, 
    deleteEndpoint, 
    getEndpointChecks,
    refetch
  } = useApiEndpoints();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleAddApi = async (data: { name: string; url: string; interval: number }) => {
    await addEndpoint(data);
  };

  const handleDeleteApi = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this API endpoint?')) {
      await deleteEndpoint(id);
    }
  };

  const handleViewDetails = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Calculate dashboard stats
  const totalEndpoints = endpoints.length;
  const upEndpoints = endpoints.filter(ep => ep.status === 'up').length;
  const downEndpoints = endpoints.filter(ep => ep.status === 'down').length;
  const uptime = totalEndpoints > 0 ? (upEndpoints / totalEndpoints) * 100 : 0;

  // Calculate additional stats
  const avgResponseTime = 0; // This would come from recent checks
  const totalChecks = 0; // This would come from api_checks count

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-sf-pro">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-secondary dark:bg-black pt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-light-dark dark:text-dark-primary mb-2 font-sf-pro tracking-tight"
          >
            Welcome back, {userProfile?.username}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-light-dark/80 dark:text-dark-primary/80 font-sf-pro"
          >
            Monitor your APIs and keep track of their health and performance.
          </motion.p>
        </div>

        {/* Stats Cards */}
        <StatsCards
          totalEndpoints={totalEndpoints}
          upEndpoints={upEndpoints}
          downEndpoints={downEndpoints}
          uptime={uptime}
          avgResponseTime={avgResponseTime}
          totalChecks={totalChecks}
        />

        {/* Quick Actions */}
        <QuickActions
          onAddApi={() => setShowAddForm(true)}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-center space-x-3"
          >
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="text-red-800 dark:text-red-300 font-sf-pro">{error}</span>
          </motion.div>
        )}

        {/* API Table or Empty State */}
        {endpoints.length === 0 ? (
          <EmptyState onAddApi={() => setShowAddForm(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <ApiTable
              endpoints={endpoints}
              onDelete={handleDeleteApi}
              onViewDetails={handleViewDetails}
            />
          </motion.div>
        )}

        {/* Add API Form Modal */}
        <AddApiForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddApi}
        />

        {/* API Details Modal */}
        {selectedEndpoint && (
          <ApiDetails
            endpoint={selectedEndpoint}
            onClose={() => setSelectedEndpoint(null)}
            getEndpointChecks={getEndpointChecks}
          />
        )}
      </div>
    </div>
  );
}