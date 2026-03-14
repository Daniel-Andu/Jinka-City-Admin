import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { newsTagMapService } from '../../services';

export const NewsTagMapList = () => {
    return (
        <CrudPage
            title="News Tag Map"
            subtitle="Map news articles to tags."
            service={newsTagMapService}
            searchFields={["news_id"]}
            columns={[
                { title: "News ID", dataIndex: "news_id", key: "news_id" },
                { title: "Tag ID", dataIndex: "tag_id", key: "tag_id" },
            ]}
            formFields={[
                { name: 'news_id', label: 'News ID', type: 'number', rules: [{ required: true }] },
                { name: 'tag_id', label: 'Tag ID', type: 'number', rules: [{ required: true }] },
            ]}
        />
    );
};
