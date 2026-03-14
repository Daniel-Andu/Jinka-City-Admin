import api from './api';

export const newsCategoryMapService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/news-category-map', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/news-category-map', data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/news-category-map/${id}`);
        return response;
    },
};
