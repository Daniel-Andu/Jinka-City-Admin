import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { newsCategoriesService } from '../../services';

export const NewsCategoriesList = () => {
    return (
        <CrudPage
            title="News Categories"
            subtitle="Manage categories for news articles."
            service={newsCategoriesService}
            searchFields={["name", "translated_name"]}
            columns={[
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                    render: (text, record) => record.translated_name || text || 'Untitled'
                },
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
