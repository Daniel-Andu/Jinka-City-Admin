import api from './api';

export const mediaService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/media', { params });
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/media/${id}`);
        return response;
    },
};
