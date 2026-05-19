import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "pattys.admin.auth";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const signIn = useCallback((password: string) => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!adminPassword) {
      setError("Admin password not configured.");
      return false;
    }
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setError(null);
      localStorage.setItem(STORAGE_KEY, "true");
      return true;
    }
    setError("Wrong password.");
    return false;
  }, []);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { isAuthenticated, loading, error, signIn, signOut };
}
