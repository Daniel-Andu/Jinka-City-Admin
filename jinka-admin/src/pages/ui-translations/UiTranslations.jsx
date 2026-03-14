import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { uiTranslationsService } from '../../services';

export const UiTranslationsList = () => {
    return (
        <CrudPage
            title="UI Translations"
            subtitle="Manage translations for user interface texts."
            service={uiTranslationsService}
            searchFields={["translation_key", "translation_value"]}
            columns={[
                { title: "Key", dataIndex: "translation_key", key: "translation_key" },
                { title: "Value", dataIndex: "translation_value", key: "translation_value" },
                { title: "Language ID", dataIndex: "language_id", key: "language_id" },
                {
                    title: "Type",
                    dataIndex: "value_type",
                    key: "value_type",
                },
            ]}
            formFields={[
                { name: 'language_id', label: 'Language ID', type: 'number', rules: [{ required: true }] },
                { name: 'translation_key', label: 'Translation Key', type: 'text', rules: [{ required: true }] },
                { name: 'translation_value', label: 'Translation Value', type: 'textarea', rules: [{ required: true }] },
                { name: 'value_type', label: 'Value Type', type: 'text' },
            ]}
        />
    );
};
