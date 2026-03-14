import React, { useState, useEffect } from 'react';
import { Card, Table, Space, Button, Input, Modal, Form, message, Tag, Select, DatePicker, Switch, Upload, InputNumber } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { confirm } = Modal;

const renderField = (field, form) => {
    const { name, label, type, options, props = {} } = field;

    switch (type) {
        case 'textarea':
            return (
                <Form.Item name={name} label={label} rules={field.rules}>
                    <Input.TextArea rows={4} {...props} />
                </Form.Item>
            );
        case 'select':
            return (
                <Form.Item name={name} label={label} rules={field.rules}>
                    <Select {...props} options={options || []} />
                </Form.Item>
            );
        case 'date':
            return (
                <Form.Item name={name} label={label} rules={field.rules}>
                    <DatePicker showTime style={{ width: '100%' }} {...props} />
                </Form.Item>
            );
        case 'switch':
            return (
                <Form.Item name={name} label={label} valuePropName="checked" rules={field.rules}>
                    <Switch {...props} />
                </Form.Item>
            );
        case 'number':
            return (
                <Form.Item name={name} label={label} rules={field.rules}>
                    <InputNumber style={{ width: '100%' }} {...props} />
                </Form.Item>
            );
        case 'upload':
            return (
                <Form.Item name={name} label={label} valuePropName="fileList" getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }} rules={field.rules}>
                    <Upload {...props} listType="picture" maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
            );
        default:
            return (
                <Form.Item name={name} label={label} rules={field.rules}>
                    <Input {...props} />
                </Form.Item>
            );
    }
};

export const CrudPage = ({
    title,
    subtitle,
    service,
    columns,
    formFields,
    searchFields = [],
    rowKey = 'id',
    defaultSearchValue = '',
    onFetchParams = () => ({}),
    extraPageHeader,
}) => {
    const [searchText, setSearchText] = useState(defaultSearchValue);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await service.getAll(onFetchParams());
            setData(response.data || response || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (record) => {
        confirm({
            title: `Delete this ${title.slice(0, -1)}?`,
            icon: <ExclamationCircleOutlined />,
            content: `${record.title || record.name || record.id}`,
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    await service.delete(record[rowKey]);
                    message.success('Deleted successfully');
                    fetchData();
                } catch (err) {
                    console.error('Delete failed', err);
                    message.error('Delete failed');
                }
            },
        });
    };

    const openModal = (record = null) => {
        setEditing(record);
        if (record) {
            const initial = {};
            formFields.forEach((field) => {
                if (field.type === 'date' && record[field.name]) {
                    initial[field.name] = dayjs(record[field.name]);
                }
                if (field.type === 'switch' && typeof record[field.name] === 'number') {
                    initial[field.name] = record[field.name] === 1;
                }
                if (field.type === 'number' && record[field.name] !== undefined) {
                    initial[field.name] = Number(record[field.name]);
                }
            });
            form.setFieldsValue(initial);
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (values) => {
        try {
            const payload = { ...values };
            formFields.forEach((field) => {
                if (field.type === 'date' && values[field.name]) {
                    payload[field.name] = values[field.name].format('YYYY-MM-DD HH:mm:ss');
                }
                if (field.type === 'switch') {
                    payload[field.name] = values[field.name] ? 1 : 0;
                }
                if (field.type === 'number') {
                    payload[field.name] = Number(values[field.name]) || 0;
                }
                if (field.type === 'upload' && values[field.name]) {
                    const fileItem = values[field.name][0];
                    if (fileItem && fileItem.response) {
                        payload[field.name] = fileItem.response.filePath || fileItem.response.path || fileItem.name;
                    }
                }
            });

            if (editing) {
                await service.update(editing[rowKey], payload);
                message.success('Updated successfully');
            } else {
                await service.create(payload);
                message.success('Created successfully');
            }
            setIsModalOpen(false);
            form.resetFields();
            fetchData();
        } catch (err) {
            console.error('Save failed', err);
            message.error('Save failed');
        }
    };

    const filteredData = data.filter((item) => {
        if (!searchText) return true;
        const term = searchText.toLowerCase();
        return searchFields.some((field) => (item[field.name] || '')?.toString().toLowerCase().includes(term));
    });

    const tableColumns = [
        ...columns,
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} onClick={() => openModal(record)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="page-header">
                <h1>{title}</h1>
                <p style={{ color: '#666', marginTop: 8 }}>{subtitle}</p>
                {extraPageHeader}
            </div>

            <Card style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Input
                        placeholder={`Search ${title.toLowerCase()}...`}
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
                        Add {title.slice(0, -1)}
                    </Button>
                </Space>

                <Table
                    columns={tableColumns}
                    dataSource={filteredData}
                    rowKey={rowKey}
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} ${title.toLowerCase()}`,
                    }}
                />
            </Card>

            <Modal
                title={editing ? `Edit ${title.slice(0, -1)}` : `Create ${title.slice(0, -1)}`}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                width={700}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    {formFields.map((field) => (
                        <React.Fragment key={field.name}>{renderField(field, form)}</React.Fragment>
                    ))}

                    <Form.Item>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
