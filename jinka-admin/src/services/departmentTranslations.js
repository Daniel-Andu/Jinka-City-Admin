import api from './api';

export const departmentTranslationsService = {
    getAll: async (params = {}) => {
        const response = await api.get('/admin/department-translations', { params });
        return response;
    },

    create: async (data) => {
        const response = await api.post('/admin/department-translations', data);
        return response;
    },

    update: async (id, data) => {
        const response = await api.put(`/admin/department-translations/${id}`, data);
        return response;
    },

    delete: async (id) => {
        const response = await api.delete(`/admin/department-translations/${id}`);
        return response;
    },
};
