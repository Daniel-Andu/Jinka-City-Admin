import React from 'react';
import { CrudPage } from '../../components/CrudPage';
import { newsCategoryMapService } from '../../services';

export const NewsCategoryMapList = () => {
    return (
        <CrudPage
            title="News Category Map"
            subtitle="Map news articles to categories."
            service={newsCategoryMapService}
            searchFields={["news_id"]}
            columns={[
                { title: "News ID", dataIndex: "news_id", key: "news_id" },
                { title: "Category ID", dataIndex: "category_id", key: "category_id" },
            ]}
            formFields={[
                { name: 'news_id', label: 'News ID', type: 'number', rules: [{ required: true }] },
                { name: 'category_id', label: 'Category ID', type: 'number', rules: [{ required: true }] },
            ]}
        />
    );
};
