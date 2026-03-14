// import axios from 'axios';

// // Get API URL from environment variables
// const API_URL = import.meta.env.VITE_API_URL || 'https://api.jinka.gov.et/api';

// // Create axios instance
// const api = axios.create({
//     baseURL: API_URL,
//     timeout: 30000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Request interceptor - Add auth token to requests
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response interceptor - Handle errors globally
// api.interceptors.response.use(
//     (response) => {
//         return response.data;
//     },
//     (error) => {
//         // Handle 401 Unauthorized - redirect to login
//         if (error.response?.status === 401) {
//             localStorage.removeItem('token');
//             window.location.href = '/login';
//         }

//         // Handle other errors
//         const errorMessage = error.response?.data?.error?.message || error.message || 'An error occurred';

//         console.error('API Error:', {
//             url: error.config?.url,
//             method: error.config?.method,
//             status: error.response?.status,
//             message: errorMessage,
//         });

//         return Promise.reject(error);
//     }
// );

// export default api;
// export { API_URL };



import axios from 'axios';

// Get API URL from environment variables, with a fallback for local development.
// If you want to point to a different backend (e.g., localhost), create a `.env` file with `VITE_API_URL`.
const API_URL = import.meta.env.VITE_API_URL || 'https://jinka-city-backend.onrender.com/api';

const DEBUG = import.meta.env.VITE_DEBUG === 'true';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            if (DEBUG) {
                console.debug('[API] Auth header set', { url: config.url, token: token?.slice(0, 10) + '...' });
            }
        } else if (DEBUG) {
            console.debug('[API] No token found for request', { url: config.url });
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        const errorData = error.response?.data;
        const errorMessageFromData =
            errorData?.error?.message ||
            errorData?.message ||
            (typeof errorData === 'string' ? errorData : null);
        const errorMessage =
            errorMessageFromData ||
            (errorData ? JSON.stringify(errorData) : null) ||
            error.message ||
            'An error occurred';

        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            message: errorMessage,
            responseData: errorData,
        });

        return Promise.reject(error);
    }
);

export default api;
export { API_URL };