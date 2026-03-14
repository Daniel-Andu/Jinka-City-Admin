import api from './api';

// Authentication service
export const authService = {
    // Admin Login (uses public endpoint)
    login: async (email, password) => {
        const response = await api.post('/public/login', { email, password });

        // Some backends return: { token, user }
        // Others return: { data: { token, user } }, or nested deeper.
        const unwrap = (obj) => {
            if (!obj || typeof obj !== 'object') return null;
            if (obj.token) return obj;
            if (obj.data) return unwrap(obj.data);
            return null;
        };

        const payload = unwrap(response) || {};
        const token = payload.token;
        const user = payload.user;

        if (token) {
            localStorage.setItem('token', token);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            if (import.meta.env.VITE_DEBUG === 'true') {
                // only show start of token for safety
                console.debug('[Auth] Stored token', token.slice(0, 10) + '...');
            }
        }

        return response;
    },

    // Logout (client-side only, backend does not expose a logout endpoint)
    logout: async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        if (response.success) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Get stored user
    getStoredUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};
