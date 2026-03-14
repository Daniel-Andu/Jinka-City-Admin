import React, { useEffect, useState } from 'react';
import { Card, Space, Button, Select, message } from 'antd';
import { analyticsService } from '../../services';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ranges = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
];

export const AnalyticsPage = () => {
    const [range, setRange] = useState('day');
    const [visitors, setVisitors] = useState(null);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (selectedRange = range) => {
        setLoading(true);
        try {
            const [visitorsResp, seriesResp] = await Promise.all([
                analyticsService.getVisitors(selectedRange),
                analyticsService.getVisitorsSeries(selectedRange),
            ]);
            setVisitors(visitorsResp);
            setSeries(seriesResp.points || []);
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || err?.message || 'Failed to load analytics';
            message.error(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="page-header">
                <h1>Analytics</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    View visitor analytics for your site.
                </p>
            </div>

            <Card style={{ borderRadius: 12 }} loading={loading}>
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Select
                        value={range}
                        onChange={(value) => {
                            setRange(value);
                            fetchData(value);
                        }}
                        options={ranges}
                        style={{ width: 160 }}
                    />
                    <Button onClick={() => fetchData(range)}>Refresh</Button>
                </Space>

                {visitors && (
                    <div style={{ marginBottom: 24 }}>
                        <p style={{ margin: 0 }}>Total Visits: {visitors.total_visits}</p>
                        <p style={{ margin: 0 }}>Unique Visitors: {visitors.unique_visitors}</p>
                    </div>
                )}

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={series}>
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total_visits" fill="#2E8B57" name="Total Visits" />
                        <Bar dataKey="unique_visitors" fill="#1E90FF" name="Unique Visitors" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};
