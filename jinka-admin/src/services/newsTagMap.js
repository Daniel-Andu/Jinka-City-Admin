import api from './api';

export const newsTagMapService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/news-tag-map', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/news-tag-map', data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/news-tag-map/${id}`);
        return response;
    },
};
