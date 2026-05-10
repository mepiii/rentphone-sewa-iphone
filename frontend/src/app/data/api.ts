// Purpose: Backend API client for Laravel Sanctum endpoints.
// Callers: auth pages and protected frontend flows.
// Deps: browser fetch.
// API: apiUrl, apiRequest.
// Side effects: performs HTTP requests.
const apiBaseUrl = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export const apiUrl = (path: string) => `${apiBaseUrl}${path}`;

export async function apiRequest<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message ?? "Request gagal");
  return payload as T;
}
