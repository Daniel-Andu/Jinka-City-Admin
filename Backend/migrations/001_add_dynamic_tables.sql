USE Jinka_cms;

-- Languages managed from DB for multilingual UI
CREATE TABLE IF NOT EXISTS languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional localized site settings (address, office text, labels by language)
CREATE TABLE IF NOT EXISTS setting_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_id INT NOT NULL,
    language_id INT NOT NULL,
    site_name VARCHAR(150),
    address TEXT,
    office_hours VARCHAR(255),
    footer_tagline TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_setting_language (setting_id, language_id),
    CONSTRAINT fk_setting_translations_setting
        FOREIGN KEY (setting_id) REFERENCES settings(id),
    CONSTRAINT fk_setting_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Homepage stats/cards
CREATE TABLE IF NOT EXISTS city_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stat_key VARCHAR(100) NOT NULL UNIQUE,
    value VARCHAR(120) NOT NULL,
    icon VARCHAR(120),
    order_number INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS city_stat_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stat_id INT NOT NULL,
    language_id INT NOT NULL,
    label VARCHAR(150) NOT NULL,
    description TEXT,
    UNIQUE KEY uq_city_stat_language (stat_id, language_id),
    CONSTRAINT fk_city_stat_translations_stat
        FOREIGN KEY (stat_id) REFERENCES city_stats(id),
    CONSTRAINT fk_city_stat_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Government department cards
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    icon VARCHAR(120),
    color VARCHAR(20),
    order_number INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS department_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    language_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    UNIQUE KEY uq_department_language (department_id, language_id),
    CONSTRAINT fk_department_translations_department
        FOREIGN KEY (department_id) REFERENCES departments(id),
    CONSTRAINT fk_department_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- News taxonomy for dynamic category filters
CREATE TABLE IF NOT EXISTS news_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    color VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news_category_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    language_id INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    UNIQUE KEY uq_news_category_language (category_id, language_id),
    CONSTRAINT fk_news_category_translations_category
        FOREIGN KEY (category_id) REFERENCES news_categories(id),
    CONSTRAINT fk_news_category_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Many-to-many news <-> category
CREATE TABLE IF NOT EXISTS news_category_map (
    id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    category_id INT NOT NULL,
    UNIQUE KEY uq_news_category (news_id, category_id),
    CONSTRAINT fk_news_category_map_news
        FOREIGN KEY (news_id) REFERENCES news(id),
    CONSTRAINT fk_news_category_map_category
        FOREIGN KEY (category_id) REFERENCES news_categories(id)
);

-- Optional tags for richer filtering
CREATE TABLE IF NOT EXISTS news_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news_tag_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_id INT NOT NULL,
    language_id INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    UNIQUE KEY uq_news_tag_language (tag_id, language_id),
    CONSTRAINT fk_news_tag_translations_tag
        FOREIGN KEY (tag_id) REFERENCES news_tags(id),
    CONSTRAINT fk_news_tag_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS news_tag_map (
    id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    tag_id INT NOT NULL,
    UNIQUE KEY uq_news_tag (news_id, tag_id),
    CONSTRAINT fk_news_tag_map_news
        FOREIGN KEY (news_id) REFERENCES news(id),
    CONSTRAINT fk_news_tag_map_tag
        FOREIGN KEY (tag_id) REFERENCES news_tags(id)
);

-- Translations for existing core content tables
CREATE TABLE IF NOT EXISTS hero_slider_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slider_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(200),
    subtitle TEXT,
    button_text VARCHAR(100),
    UNIQUE KEY uq_hero_slider_language (slider_id, language_id),
    CONSTRAINT fk_hero_slider_translations_slider
        FOREIGN KEY (slider_id) REFERENCES hero_sliders(id),
    CONSTRAINT fk_hero_slider_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS leader_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    leader_id INT NOT NULL,
    language_id INT NOT NULL,
    name VARCHAR(150),
    position VARCHAR(150),
    message TEXT,
    UNIQUE KEY uq_leader_language (leader_id, language_id),
    CONSTRAINT fk_leader_translations_leader
        FOREIGN KEY (leader_id) REFERENCES leaders(id),
    CONSTRAINT fk_leader_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS service_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    UNIQUE KEY uq_service_language (service_id, language_id),
    CONSTRAINT fk_service_translations_service
        FOREIGN KEY (service_id) REFERENCES services(id),
    CONSTRAINT fk_service_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS page_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    content LONGTEXT,
    UNIQUE KEY uq_page_language (page_id, language_id),
    UNIQUE KEY uq_page_slug_language (slug, language_id),
    CONSTRAINT fk_page_translations_page
        FOREIGN KEY (page_id) REFERENCES pages(id),
    CONSTRAINT fk_page_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS news_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    language_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    content LONGTEXT,
    excerpt TEXT,
    UNIQUE KEY uq_news_language (news_id, language_id),
    UNIQUE KEY uq_news_slug_language (slug, language_id),
    CONSTRAINT fk_news_translations_news
        FOREIGN KEY (news_id) REFERENCES news(id),
    CONSTRAINT fk_news_translations_language
        FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(160) NOT NULL UNIQUE,
    status ENUM('active','unsubscribed') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
);

-- Seed two initial languages
INSERT INTO languages (code, name, is_default, is_active)
VALUES
    ('en', 'English', TRUE, TRUE),
    ('am', 'Amharic', FALSE, TRUE)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    is_active = VALUES(is_active);
