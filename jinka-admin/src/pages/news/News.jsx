import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { newsService } from '../../services';

export const NewsList = () => {
    return (
        <CrudPage
            title="News"
            subtitle="Create and manage news articles."
            service={newsService}
            searchFields={["title", "content", "slug"]}
            columns={[
                {
                    title: "Title",
                    dataIndex: "title",
                    key: "title",
                },
                {
                    title: "Created",
                    dataIndex: "created_at",
                    key: "created_at",
                    render: (value) => (value ? new Date(value).toLocaleString() : '-'),
                },
                {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (value) => (
                        <span style={{ color: value === 'published' ? '#2E8B57' : '#E02F2F' }}>
                            {value || 'draft'}
                        </span>
                    ),
                },
            ]}
            formFields={[
                { name: 'title', label: 'Title', type: 'text', rules: [{ required: true }] },
                { name: 'content', label: 'Content', type: 'textarea', rules: [{ required: true }] },
                { name: 'featured_image', label: 'Featured Image URL or Path', type: 'text' },
                { name: 'excerpt', label: 'Excerpt (optional)', type: 'textarea', props: { rows: 2 } },
                { name: 'slug', label: 'Slug (optional)', type: 'text' },
                {
                    name: 'status',
                    label: 'Status',
                    type: 'select',
                    options: [
                        { label: 'Published', value: 'published' },
                        { label: 'Draft', value: 'draft' },
                    ],
                    rules: [{ required: true }],
                    props: { placeholder: 'Select status' },
                },
            ]}
        />
    );
};
