import api from './api';

export const leaderService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/leaders', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/leaders', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/leaders/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/leaders/${id}`);
        return response;
    },
};
