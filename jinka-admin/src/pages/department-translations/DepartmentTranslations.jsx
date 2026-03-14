import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { departmentTranslationsService } from '../../services';

export const DepartmentTranslationsList = () => {
    return (
        <CrudPage
            title="Department Translations"
            subtitle="Manage translations for departments."
            service={departmentTranslationsService}
            searchFields={["name", "description"]}
            columns={[
                { title: "Department ID", dataIndex: "department_id", key: "department_id" },
                { title: "Language ID", dataIndex: "language_id", key: "language_id" },
                { title: "Name", dataIndex: "name", key: "name" },
                { title: "Description", dataIndex: "description", key: "description" },
            ]}
            formFields={[
                { name: 'department_id', label: 'Department ID', type: 'number', rules: [{ required: true }] },
                { name: 'language_id', label: 'Language ID', type: 'number', rules: [{ required: true }] },
                { name: 'name', label: 'Name', type: 'text', rules: [{ required: true }] },
                { name: 'description', label: 'Description', type: 'textarea' },
            ]}
        />
    );
};
