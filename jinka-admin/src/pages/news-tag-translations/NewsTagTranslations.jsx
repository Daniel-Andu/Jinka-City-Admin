import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { newsTagTranslationsService } from '../../services';

export const NewsTagTranslationsList = () => {
    return (
        <CrudPage
            title="News Tag Translations"
            subtitle="Manage translations for news tags."
            service={newsTagTranslationsService}
            searchFields={["name"]}
            columns={[
                { title: "Tag ID", dataIndex: "tag_id", key: "tag_id" },
                { title: "Language ID", dataIndex: "language_id", key: "language_id" },
                { title: "Name", dataIndex: "name", key: "name" },
            ]}
            formFields={[
                { name: 'tag_id', label: 'Tag ID', type: 'number', rules: [{ required: true }] },
                { name: 'language_id', label: 'Language ID', type: 'number', rules: [{ required: true }] },
                { name: 'name', label: 'Name', type: 'text', rules: [{ required: true }] },
            ]}
        />
    );
};
