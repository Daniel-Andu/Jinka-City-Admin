import api from './api';

export const newsTranslationsService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/news-translations', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/news-translations', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/news-translations/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/news-translations/${id}`);
        return response;
    },
};
