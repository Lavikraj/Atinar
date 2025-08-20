import { useState, useEffect } from "react";
import { User } from "../types";

type AuthError = { message: string } | null;

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  loading: boolean;
  signUp: (email: string, password: string, username?: string) => Promise<{ data: any; error: AuthError }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: AuthError }>;
  signOut: () => Promise<{ error: AuthError }>;
  updateProfile: (updates: { username?: string }) => Promise<{ data: any; error: AuthError }>;
  getAuthHeaders: () => Record<string, string>;
}

const TOKEN_KEY = "atinar_auth_token";
const USER_KEY = "atinar_user";

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might validate the token with the server here.
    setLoading(false);
  }, []);

  const persistAuth = (newToken: string | null, newUser: User | null) => {
    try {
      if (newToken) localStorage.setItem(TOKEN_KEY, newToken);
      else localStorage.removeItem(TOKEN_KEY);
      if (newUser) localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      else localStorage.removeItem(USER_KEY);
    } catch {
      // ignore
    }
    setToken(newToken);
    setUser(newUser);
  };

  const parseJSONSafe = async (res: Response) => {
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  };

  const getAuthHeaders = (): Record<string, string> => {
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };

  // Base API URL from .env
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const payload = await parseJSONSafe(res);
      if (!res.ok) {
        return { data: null, error: { message: payload?.error || "Signup failed" } };
      }

      // Expecting { token, user }
      persistAuth(payload.token, payload.user || null);
      return { data: payload, error: null };
    } catch (err) {
      return { data: null, error: { message: err instanceof Error ? err.message : "Signup error" } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await parseJSONSafe(res);
      if (!res.ok) {
        return { data: null, error: { message: payload?.error || "Login failed" } };
      }

      // Expecting { token, user }
      persistAuth(payload.token, payload.user || null);
      return { data: payload, error: null };
    } catch (err) {
      return { data: null, error: { message: err instanceof Error ? err.message : "Login error" } };
    }
  };

  const signOut = async () => {
    persistAuth(null, null);
    return { error: null };
  };

  const updateProfile = async (updates: { username?: string }) => {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(updates),
      });

      const payload = await parseJSONSafe(res);
      if (!res.ok) {
        return { data: null, error: { message: payload?.error || "Update failed" } };
      }

      setUser(payload.user || null);
      return { data: payload, error: null };
    } catch (err) {
      return { data: null, error: { message: err instanceof Error ? err.message : "Update error" } };
    }
  };

  return { user, token, loading, signUp, signIn, signOut, updateProfile, getAuthHeaders };
}
