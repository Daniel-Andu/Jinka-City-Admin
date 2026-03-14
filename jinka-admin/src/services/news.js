import api from './api';

// News service
export const newsService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/news', { params });
        return response;
    },

    getById: async (id) => {
        const response = await api.get(`/admin/news/${id}`);
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/news', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/news/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/news/${id}`);
        return response;
    },
};
