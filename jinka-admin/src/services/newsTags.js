import api from './api';

export const newsTagsService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/news-tags', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/news-tags', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/news-tags/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/news-tags/${id}`);
        return response;
    },
};
