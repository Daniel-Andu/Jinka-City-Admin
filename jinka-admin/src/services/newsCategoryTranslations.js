import api from './api';

export const newsCategoryTranslationsService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/news-category-translations', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/news-category-translations', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/news-category-translations/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/news-category-translations/${id}`);
        return response;
    },
};
