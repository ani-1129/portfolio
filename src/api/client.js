const BASE_URL = 'http://localhost:5000/api';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('adminToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (res.status === 401 || res.status === 403) {
      // Unauthenticated, clear local token if calling protected route
      if (endpoint.startsWith('/auth') && endpoint !== '/auth/login') {
        localStorage.removeItem('adminToken');
      }
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (error) {
    console.warn(`API Fetch Error [${endpoint}]:`, error.message);
    throw error;
  }
}
