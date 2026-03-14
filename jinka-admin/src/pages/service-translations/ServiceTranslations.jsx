import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { serviceTranslationsService } from '../../services';

export const ServiceTranslationsList = () => {
    return (
        <CrudPage
            title="Service Translations"
            subtitle="Manage translations for services."
            service={serviceTranslationsService}
            searchFields={["name", "description"]}
            columns={[
                { title: "Service ID", dataIndex: "service_id", key: "service_id" },
                { title: "Language ID", dataIndex: "language_id", key: "language_id" },
                { title: "Name", dataIndex: "name", key: "name" },
                { title: "Description", dataIndex: "description", key: "description" },
            ]}
            formFields={[
                { name: 'service_id', label: 'Service ID', type: 'number', rules: [{ required: true }] },
                { name: 'language_id', label: 'Language ID', type: 'number', rules: [{ required: true }] },
                { name: 'name', label: 'Name', type: 'text', rules: [{ required: true }] },
                { name: 'description', label: 'Description', type: 'textarea' },
            ]}
        />
    );
};
