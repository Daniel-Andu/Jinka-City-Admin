import api from './api';

export const serviceTranslationsService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/service-translations', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/service-translations', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/service-translations/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/service-translations/${id}`);
        return response;
    },
};
