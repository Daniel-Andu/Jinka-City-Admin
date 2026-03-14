import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { newsTagsService } from '../../services';

export const NewsTagsList = () => {
    return (
        <CrudPage
            title="News Tags"
            subtitle="Manage tags used for news articles."
            service={newsTagsService}
            searchFields={["name"]}
            columns={[
                { title: "Name", dataIndex: "name", key: "name" },
                {
                    title: "Status",
                    dataIndex: "is_active",
                    key: "is_active",
                    render: (value) => (
                        <span style={{ color: value ? '#2E8B57' : '#E02F2F' }}>
                            {value ? 'Active' : 'Inactive'}
                        </span>
                    ),
                },
            ]}
            formFields={[
                { name: 'name', label: 'Name', type: 'text', rules: [{ required: true }] },
                { name: 'is_active', label: 'Is Active', type: 'switch' },
            ]}
        />
    );
};
