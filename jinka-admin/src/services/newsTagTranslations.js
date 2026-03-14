import api from './api';

export const newsTagTranslationsService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/news-tag-translations', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/news-tag-translations', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/news-tag-translations/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/news-tag-translations/${id}`);
        return response;
    },
};
