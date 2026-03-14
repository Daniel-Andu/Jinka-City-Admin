import api from './api';

export const pageHeroSlidesService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/page-hero-slides', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/page-hero-slides', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/page-hero-slides/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/page-hero-slides/${id}`);
        return response;
    },
};
