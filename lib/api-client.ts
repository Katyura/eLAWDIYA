/**
 * API client utilities for calling the FastAPI backend.
 * Uses NEXT_PUBLIC_API_URL if set, otherwise defaults to /api (for dev proxy).
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Construct a full API URL from a path.
 * @param path The API endpoint path (e.g., '/auth/login', 'reports')
 * @returns Full URL to the API endpoint
 */
export function getApiUrl(path: string): string {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

/**
 * Helper to make authenticated fetch requests.
 * @param path API endpoint path
 * @param options Fetch options (method, body, headers, etc.)
 * @returns Response from API
 */
export async function apiFetch(
  path: string,
  options: RequestInit & { authToken?: string } = {}
) {
  const { authToken, ...fetchOpts } = options;
  const url = getApiUrl(path);

  // Merge headers with auth if provided
  const headers = new Headers(fetchOpts.headers || {});
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  const response = await fetch(url, {
    ...fetchOpts,
    headers,
  });

  return response;
}
