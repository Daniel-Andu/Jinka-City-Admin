import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { newsTranslationsService } from '../../services';

export const NewsTranslationsList = () => {
    return (
        <CrudPage
            title="News Translations"
            subtitle="Manage translations for news articles."
            service={newsTranslationsService}
            searchFields={["title", "content"]}
            columns={[
                { title: "News ID", dataIndex: "news_id", key: "news_id" },
                { title: "Language ID", dataIndex: "language_id", key: "language_id" },
                { title: "Title", dataIndex: "title", key: "title" },
                { title: "Content", dataIndex: "content", key: "content" },
            ]}
            formFields={[
                { name: 'news_id', label: 'News ID', type: 'number', rules: [{ required: true }] },
                { name: 'language_id', label: 'Language ID', type: 'number', rules: [{ required: true }] },
                { name: 'title', label: 'Title', type: 'text', rules: [{ required: true }] },
                { name: 'content', label: 'Content', type: 'textarea' },
            ]}
        />
    );
};
