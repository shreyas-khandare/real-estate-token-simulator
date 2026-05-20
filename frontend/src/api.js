import { useAuth } from "@clerk/clerk-react";

// Local backend
// const BASE = "http://localhost:3000";

// Production later:
const BASE = import.meta.env.VITE_API_BASE_URL;

// Normal public API
export async function api(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  return res.json();
}

// Authenticated API
export function useApi() {
  const { getToken } = useAuth();

  async function authenticatedApi(path, options = {}) {
    const token = await getToken();

    const res = await fetch(`${BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
          ? `Bearer ${token}`
          : "",
      },
      ...options,
    });

    return res.json();
  }

  return authenticatedApi;
}