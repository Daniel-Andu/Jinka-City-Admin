import api from './api';

export const analyticsService = {
    getVisitors: async (range = 'day') => {
        const response = await api.get('/admin/analytics/visitors', { params: { range } });
        return response;
    },

    getVisitorsSeries: async (range = 'day') => {
        const response = await api.get('/admin/analytics/visitors/series', { params: { range } });
        return response;
    },
};
