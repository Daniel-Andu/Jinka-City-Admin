import { useEffect, useMemo, useState } from 'react';
import { CrudPage } from '../../components/CrudPage';
import { heroSliderService, pageHeroSlidesService } from '../../services';

export const PageHeroSlidesList = () => {
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        let mounted = true;
        const fetchSliders = async () => {
            try {
                const response = await heroSliderService.getAll();
                const data = response.data || response || [];
                if (mounted) setSliders(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load hero sliders", err);
            }
        };
        fetchSliders();
        return () => {
            mounted = false;
        };
    }, []);

    const sliderOptions = useMemo(
        () =>
            sliders.map((slider) => ({
                label: slider.title ? `${slider.title} (ID ${slider.id})` : `Slider ${slider.id}`,
                value: slider.id,
            })),
        [sliders]
    );

    const sliderNameById = useMemo(() => {
        const map = new Map();
        sliders.forEach((slider) => {
            map.set(slider.id, slider.title || `Slider ${slider.id}`);
        });
        return map;
    }, [sliders]);

    return (
        <CrudPage
            title="Page Hero Slides"
            subtitle="Map hero slides to pages."
            service={pageHeroSlidesService}
            searchFields={["page_slug"]}
            columns={[
                { title: "Page", dataIndex: "page_slug", key: "page_slug" },
                {
                    title: "Slider",
                    dataIndex: "slider_id",
                    key: "slider_id",
                    render: (value) => sliderNameById.get(value) || value,
                },
                { title: "Order", dataIndex: "order_number", key: "order_number" },
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
                { name: 'page_slug', label: 'Page Slug', type: 'text', rules: [{ required: true }] },
                {
                    name: 'slider_id',
                    label: 'Slider',
                    type: 'select',
                    rules: [{ required: true }],
                    options: sliderOptions,
                    props: { showSearch: true, optionFilterProp: 'label', placeholder: 'Select a slider' },
                },
                { name: 'order_number', label: 'Order', type: 'number' },
                { name: 'is_active', label: 'Is Active', type: 'switch' },
            ]}
        />
    );
};
