import { useState, useEffect } from "react";
import { ApiEndpoint, ApiCheck } from "../types";
import { useAuth } from "./useAuth";

export function useApiEndpoints() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, getAuthHeaders } = useAuth();

  const fetchEndpoints = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await fetch("/api/endpoints", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || "Failed to fetch endpoints");
      }

      const data = await response.json();
      setEndpoints(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch endpoints");
    } finally {
      setLoading(false);
    }
  };

  const addEndpoint = async (
    endpoint: Omit<ApiEndpoint, "id" | "user_id" | "created_at" | "updated_at" | "status" | "last_checked">
  ) => {
    if (!user) throw new Error("User not authenticated");

    try {
      const response = await fetch("/api/endpoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(endpoint),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || "Failed to add endpoint");
      }

      const newEndpoint = await response.json();
      setEndpoints((prev) => [newEndpoint, ...prev]);
      return newEndpoint;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add endpoint");
      throw err;
    }
  };

  const updateEndpoint = async (id: string, updates: Partial<ApiEndpoint>) => {
    if (!user) throw new Error("User not authenticated");

    try {
      const response = await fetch(`/api/endpoints/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || "Failed to update endpoint");
      }

      const updated = await response.json();
      setEndpoints((prev) => prev.map((ep) => (ep.id === id ? updated : ep)));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update endpoint");
      throw err;
    }
  };

  const deleteEndpoint = async (id: string) => {
    if (!user) throw new Error("User not authenticated");

    try {
      const response = await fetch(`/api/endpoints/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || "Failed to delete endpoint");
      }

      setEndpoints((prev) => prev.filter((ep) => ep.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete endpoint");
      throw err;
    }
  };

  const triggerManualCheck = async (endpointId: string) => {
    if (!user) throw new Error("User not authenticated");

    try {
      const response = await fetch(`/api/endpoints/${endpointId}/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || "Failed to trigger manual check");
      }

      await fetchEndpoints();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Manual check failed");
      throw err;
    }
  };

  const getEndpointChecks = async (endpointId: string, limit = 50): Promise<ApiCheck[]> => {
    if (!user) throw new Error("User not authenticated");

    try {
      const response = await fetch(`/api/endpoints/${endpointId}/checks?limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.message || "Failed to fetch checks");
      }

      return (await response.json()) as ApiCheck[];
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch checks");
      throw err;
    }
  };

  useEffect(() => {
    fetchEndpoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
