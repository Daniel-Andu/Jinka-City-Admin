import api from './api';

export const uiTranslationsService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/ui-translations', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/ui-translations', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/ui-translations/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/ui-translations/${id}`);
        return response;
    },
};
