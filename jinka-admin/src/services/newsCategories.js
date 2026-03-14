import api from './api';

export const newsCategoriesService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/news-categories', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/news-categories', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/news-categories/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/news-categories/${id}`);
        return response;
    },
};
