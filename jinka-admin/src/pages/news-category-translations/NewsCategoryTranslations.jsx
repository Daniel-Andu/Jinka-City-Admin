import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { newsCategoryTranslationsService } from '../../services';

export const NewsCategoryTranslationsList = () => {
    return (
        <CrudPage
            title="News Category Translations"
            subtitle="Manage translations for news categories."
            service={newsCategoryTranslationsService}
            searchFields={["name"]}
            columns={[
                { title: "Category ID", dataIndex: "category_id", key: "category_id" },
                { title: "Language ID", dataIndex: "language_id", key: "language_id" },
                { title: "Name", dataIndex: "name", key: "name" },
            ]}
            formFields={[
                { name: 'category_id', label: 'Category ID', type: 'number', rules: [{ required: true }] },
                { name: 'language_id', label: 'Language ID', type: 'number', rules: [{ required: true }] },
                { name: 'name', label: 'Name', type: 'text', rules: [{ required: true }] },
            ]}
        />
    );
};
