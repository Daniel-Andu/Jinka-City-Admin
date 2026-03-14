import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { leaderService } from '../../services';

export const LeadersList = () => {
    return (
        <CrudPage
            title="Leaders"
            subtitle="Manage mayor and leadership profiles."
            service={leaderService}
            searchFields={["name", "position"]}
            columns={[
                { title: "Name", dataIndex: "name", key: "name" },
                { title: "Position", dataIndex: "position", key: "position" },
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
                { name: 'position', label: 'Position', type: 'text', rules: [{ required: true }] },
                { name: 'photo', label: 'Photo (path)', type: 'text' },
                { name: 'message', label: 'Message', type: 'textarea' },
                { name: 'order_number', label: 'Order', type: 'number' },
                { name: 'is_active', label: 'Is Active', type: 'switch' },
            ]}
        />
    );
};
