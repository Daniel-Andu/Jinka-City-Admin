import React, { useEffect, useState } from 'react';
import { Table, Button, Card, message, Space } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { mediaService } from '../../services';

export const MediaList = () => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const response = await mediaService.getAll();
            setMedia(response.data || response || []);
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || err?.message || 'Failed to load media';
            message.error(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleDelete = async (record) => {
        try {
            await mediaService.delete(record.id);
            message.success('Media deleted');
            fetchMedia();
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || err?.message || 'Failed to delete media';
            message.error(msg);
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Path', dataIndex: 'file_path', key: 'file_path' },
        { title: 'Uploaded At', dataIndex: 'created_at', key: 'created_at' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record)}
                />
            ),
        },
    ];

    return (
        <div>
            <div className="page-header">
                <h1>Media</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    Manage uploaded files used by the system.
                </p>
            </div>

            <Card style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Button icon={<ReloadOutlined />} onClick={fetchMedia}>
                        Refresh
                    </Button>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>
                            Upload files using the Upload page, then manage them here.
                        </p>
                    </div>
                </Space>
                <Table columns={columns} dataSource={media} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
            </Card>
        </div>
    );
};
