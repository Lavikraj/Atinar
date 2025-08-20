import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ApiEndpoint, ApiCheck } from '../types';
import { useAuth } from './useAuth';

export function useApiEndpoints() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchEndpoints = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('api_endpoints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEndpoints(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch endpoints');
    } finally {
      setLoading(false);
    }
  };

  const addEndpoint = async (endpoint: Omit<ApiEndpoint, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status' | 'last_checked'>) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('api_endpoints')
      .insert([{
        ...endpoint,
        user_id: user.id,
      }])
      .select()
      .single();

    if (error) throw error;
    
    setEndpoints(prev => [data, ...prev]);
    return data;
  };

  const updateEndpoint = async (id: string, updates: Partial<ApiEndpoint>) => {
    const { data, error } = await supabase
      .from('api_endpoints')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    setEndpoints(prev => prev.map(ep => ep.id === id ? data : ep));
    return data;
  };

  const deleteEndpoint = async (id: string) => {
    const { error } = await supabase
      .from('api_endpoints')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    setEndpoints(prev => prev.filter(ep => ep.id !== id));
  };

  const triggerManualCheck = async (endpointId: string) => {
    // This would trigger the monitoring function for a specific endpoint
    try {
      // First, get the endpoint details
      const { data: endpoint, error: fetchError } = await supabase
        .from('api_endpoints')
        .select('*')
        .eq('id', endpointId)
        .single();

      if (fetchError || !endpoint) {
        throw new Error('Endpoint not found');
      }

      // Perform the health check
      const startTime = Date.now();
      let checkResult;
      
      try {
        const response = await fetch(endpoint.url, {
          method: 'GET',
          headers: {
            'User-Agent': 'ATINAR-Monitor/1.0',
          },
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        checkResult = {
          endpoint_id: endpointId,
          status: response.ok ? 'up' : 'down',
          response_time: responseTime,
          status_code: response.status,
          error_message: response.ok ? null : `HTTP ${response.status}: ${response.statusText}`,
        };
      } catch (error) {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        checkResult = {
          endpoint_id: endpointId,
          status: 'down',
          response_time: responseTime,
          error_message: error instanceof Error ? error.message : 'Connection failed',
        };
      }

      // Insert check record
      const { error: insertError } = await supabase
        .from('api_checks')
        .insert([checkResult]);

      if (insertError) {
        console.error('Failed to insert check:', insertError);
      }

      // Update endpoint status
      const { error: updateError } = await supabase
        .from('api_endpoints')
        .update({
          status: checkResult.status,
          last_checked: new Date().toISOString(),
        })
        .eq('id', endpointId);

      if (updateError) {
        console.error('Failed to update endpoint:', updateError);
      }

      // Alternative: Call the edge function if available
      /*
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/api-monitor`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ endpointId })
      });
      
      if (!response.ok) {
        throw new Error('Failed to trigger manual check');
      }
      */
      
      // Refresh endpoints after manual check
      await fetchEndpoints();
    } catch (error) {
      console.error('Manual check failed:', error);
      throw error;
    }
  };

  const getEndpointChecks = async (endpointId: string, limit = 50): Promise<ApiCheck[]> => {
    const { data, error } = await supabase
      .from('api_checks')
      .select('*')
      .eq('endpoint_id', endpointId)
      .order('checked_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  };

  useEffect(() => {
    fetchEndpoints();
  }, [user]);

  return {
    endpoints,
    loading,
    error,
    addEndpoint,
    updateEndpoint,
    deleteEndpoint,
    triggerManualCheck,
    getEndpointChecks,
    refetch: fetchEndpoints,
  };
}