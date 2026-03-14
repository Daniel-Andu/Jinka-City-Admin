USE Jinka_cms;

CREATE TABLE IF NOT EXISTS ui_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    language_id INT NOT NULL,
    translation_key VARCHAR(191) NOT NULL,
    translation_value LONGTEXT NOT NULL,
    value_type ENUM('string','json') DEFAULT 'string',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_ui_translation (language_id, translation_key),
    CONSTRAINT fk_ui_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS page_hero_slides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_slug VARCHAR(80) NOT NULL,
    slider_id INT NOT NULL,
    order_number INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_page_slider (page_slug, slider_id),
    CONSTRAINT fk_page_hero_slides_slider
        FOREIGN KEY (slider_id) REFERENCES hero_sliders(id)
);
