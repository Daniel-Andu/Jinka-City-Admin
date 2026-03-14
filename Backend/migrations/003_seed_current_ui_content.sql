USE Jinka_cms;

-- Widen image URL columns to support long CDN links
ALTER TABLE hero_sliders MODIFY image VARCHAR(1024);
ALTER TABLE leaders MODIFY photo VARCHAR(1024);
ALTER TABLE news MODIFY featured_image VARCHAR(1024);

-- Base settings row
INSERT INTO settings (site_name, logo, favicon, address, phone, email, facebook, twitter, youtube, updated_at)
SELECT
    'Jinka City Administration',
    '',
    '',
    'Jinka City Administration, South Omo Zone, Ethiopia',
    '+251 46 220 5050',
    'info@jinkacity.gov.et',
    '',
    '',
    '',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM settings);

-- Localized setting values
INSERT INTO setting_translations (setting_id, language_id, site_name, address, office_hours, footer_tagline)
VALUES
(
    (SELECT id FROM settings ORDER BY id ASC LIMIT 1),
    (SELECT id FROM languages WHERE code = 'en' LIMIT 1),
    'Jinka City Administration',
    'Jinka City Administration, South Omo Zone, Ethiopia',
    'Monday - Friday: 8:30 AM - 5:30 PM',
    'Jinka City Administration is committed to providing transparent and efficient services for all residents.'
),
(
    (SELECT id FROM settings ORDER BY id ASC LIMIT 1),
    (SELECT id FROM languages WHERE code = 'am' LIMIT 1),
    'ጅንካ ከተማ አስተዳደር',
    'ጅንካ ከተማ አስተዳደር፣ ደቡብ ኦሞ ዞን፣ ኢትዮጵያ',
    'ሰኞ - ዓርብ: 8:30 - 5:30',
    'የጅንካ ከተማ አስተዳደር ለሁሉም ነዋሪዎች ግልጽና ውጤታማ አገልግሎት ለመስጠት ቁርጠኛ ነው።'
)
ON DUPLICATE KEY UPDATE
    site_name = VALUES(site_name),
    address = VALUES(address),
    office_hours = VALUES(office_hours),
    footer_tagline = VALUES(footer_tagline),
    updated_at = CURRENT_TIMESTAMP;

-- Hero slides (all currently hardcoded image assets)
INSERT INTO hero_sliders (title, subtitle, image, button_text, button_link, is_active)
SELECT 'Welcome to Jinka City', NULL, 'https://images.unsplash.com/photo-1666830320769-e979b6b82c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYXdhc3NhJTIwRXRoaW9waWElMjBsYWtlJTIwY2l0eSUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODAzNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, TRUE
WHERE NOT EXISTS (SELECT 1 FROM hero_sliders WHERE image = 'https://images.unsplash.com/photo-1666830320769-e979b6b82c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYXdhc3NhJTIwRXRoaW9waWElMjBsYWtlJTIwY2l0eSUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODAzNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080');

INSERT INTO hero_sliders (title, subtitle, image, button_text, button_link, is_active)
SELECT 'Welcome to Jinka City', NULL, 'https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, TRUE
WHERE NOT EXISTS (SELECT 1 FROM hero_sliders WHERE image = 'https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080');

INSERT INTO hero_sliders (title, subtitle, image, button_text, button_link, is_active)
SELECT 'Welcome to Jinka City', NULL, 'https://images.unsplash.com/photo-1722725384325-7ba56456db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFrZSUyMHN1bnNldCUyMG5hdHVyZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcyODA0MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, TRUE
WHERE NOT EXISTS (SELECT 1 FROM hero_sliders WHERE image = 'https://images.unsplash.com/photo-1722725384325-7ba56456db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFrZSUyMHN1bnNldCUyMG5hdHVyZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcyODA0MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080');

INSERT INTO hero_sliders (title, subtitle, image, button_text, button_link, is_active)
SELECT 'About Jinka City', NULL, 'https://images.unsplash.com/photo-1764145177622-8317fbfe1877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzcyODA0MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, TRUE
WHERE NOT EXISTS (SELECT 1 FROM hero_sliders WHERE image = 'https://images.unsplash.com/photo-1764145177622-8317fbfe1877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzcyODA0MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080');

INSERT INTO hero_sliders (title, subtitle, image, button_text, button_link, is_active)
SELECT 'Government', NULL, 'https://images.unsplash.com/photo-1604560842632-bd795d8f1275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, TRUE
WHERE NOT EXISTS (SELECT 1 FROM hero_sliders WHERE image = 'https://images.unsplash.com/photo-1604560842632-bd795d8f1275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080');

INSERT INTO hero_sliders (title, subtitle, image, button_text, button_link, is_active)
SELECT 'Government', NULL, 'https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, TRUE
WHERE NOT EXISTS (SELECT 1 FROM hero_sliders WHERE image = 'https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080');

INSERT INTO hero_sliders (title, subtitle, image, button_text, button_link, is_active)
SELECT 'News', NULL, 'https://images.unsplash.com/photo-1680686096607-368be87896ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHNvY2lhbCUyMHByb2dyYW0lMjBldmVudHxlbnwxfHx8fDE3NzI4MDM2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, TRUE
WHERE NOT EXISTS (SELECT 1 FROM hero_sliders WHERE image = 'https://images.unsplash.com/photo-1680686096607-368be87896ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHNvY2lhbCUyMHByb2dyYW0lMjBldmVudHxlbnwxfHx8fDE3NzI4MDM2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080');

INSERT INTO hero_sliders (title, subtitle, image, button_text, button_link, is_active)
SELECT 'News', NULL, 'https://images.unsplash.com/photo-1620996148754-c4b4fa9aca78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjB1cmJhbiUyMGNpdHklMjBwYXJrJTIwcHVibGljJTIwc3BhY2V8ZW58MXx8fHwxNzcyODAzNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080', NULL, NULL, TRUE
WHERE NOT EXISTS (SELECT 1 FROM hero_sliders WHERE image = 'https://images.unsplash.com/photo-1620996148754-c4b4fa9aca78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjB1cmJhbiUyMGNpdHklMjBwYXJrJTIwcHVibGljJTIwc3BhY2V8ZW58MXx8fHwxNzcyODAzNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080');

-- Map slides to pages
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'home', hs.id, 1, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1666830320769-e979b6b82c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYXdhc3NhJTIwRXRoaW9waWElMjBsYWtlJTIwY2l0eSUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODAzNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'home', hs.id, 2, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'home', hs.id, 3, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1722725384325-7ba56456db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFrZSUyMHN1bnNldCUyMG5hdHVyZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcyODA0MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;

INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'about', hs.id, 1, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'about', hs.id, 2, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1722725384325-7ba56456db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFrZSUyMHN1bnNldCUyMG5hdHVyZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcyODA0MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'about', hs.id, 3, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1764145177622-8317fbfe1877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzcyODA0MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;

INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'government', hs.id, 1, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1604560842632-bd795d8f1275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'government', hs.id, 2, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'government', hs.id, 3, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;

INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'services', hs.id, 1, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1604560842632-bd795d8f1275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'services', hs.id, 2, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'services', hs.id, 3, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1722725384325-7ba56456db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFrZSUyMHN1bnNldCUyMG5hdHVyZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcyODA0MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;

INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'news', hs.id, 1, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'news', hs.id, 2, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1680686096607-368be87896ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHNvY2lhbCUyMHByb2dyYW0lMjBldmVudHxlbnwxfHx8fDE3NzI4MDM2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'news', hs.id, 3, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1620996148754-c4b4fa9aca78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjB1cmJhbiUyMGNpdHklMjBwYXJrJTIwcHVibGljJTIwc3BhY2V8ZW58MXx8fHwxNzcyODAzNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;

INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'contact', hs.id, 1, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'contact', hs.id, 2, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1764145177622-8317fbfe1877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzcyODA0MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;
INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active)
SELECT 'contact', hs.id, 3, TRUE FROM hero_sliders hs
WHERE hs.image = 'https://images.unsplash.com/photo-1604560842632-bd795d8f1275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYW4lMjBnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number), is_active = TRUE;

-- Home stats
INSERT INTO city_stats (stat_key, value, icon, order_number, is_active)
VALUES
('established', '1936', 'Calendar', 1, TRUE),
('total_area', '120 km²', 'Map', 2, TRUE),
('population', '60,000+', 'Users', 3, TRUE),
('elevation', '1,490 m', 'Mountain', 4, TRUE)
ON DUPLICATE KEY UPDATE
    value = VALUES(value),
    icon = VALUES(icon),
    order_number = VALUES(order_number),
    is_active = VALUES(is_active),
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO city_stat_translations (stat_id, language_id, label, description)
VALUES
((SELECT id FROM city_stats WHERE stat_key = 'established'), (SELECT id FROM languages WHERE code = 'en'), 'Established', 'Modern city administration formed'),
((SELECT id FROM city_stats WHERE stat_key = 'total_area'), (SELECT id FROM languages WHERE code = 'en'), 'Total Area', 'Administrative city area'),
((SELECT id FROM city_stats WHERE stat_key = 'population'), (SELECT id FROM languages WHERE code = 'en'), 'Population', 'Estimated residents'),
((SELECT id FROM city_stats WHERE stat_key = 'elevation'), (SELECT id FROM languages WHERE code = 'en'), 'Elevation', 'Above sea level'),
((SELECT id FROM city_stats WHERE stat_key = 'established'), (SELECT id FROM languages WHERE code = 'am'), 'የተመሰረተ', 'ዘመናዊ የከተማ አስተዳደር ተጀመረ'),
((SELECT id FROM city_stats WHERE stat_key = 'total_area'), (SELECT id FROM languages WHERE code = 'am'), 'ጠቅላላ ስፋት', 'የከተማ አስተዳደር አካባቢ'),
((SELECT id FROM city_stats WHERE stat_key = 'population'), (SELECT id FROM languages WHERE code = 'am'), 'ህዝብ', 'ግምታዊ የነዋሪዎች ብዛት'),
((SELECT id FROM city_stats WHERE stat_key = 'elevation'), (SELECT id FROM languages WHERE code = 'am'), 'ከፍታ', 'ከባህር ወለል በላይ')
ON DUPLICATE KEY UPDATE
    label = VALUES(label),
    description = VALUES(description);

-- Mayor / leader
INSERT INTO leaders (name, position, photo, message, order_number)
SELECT
    'Mayor',
    'Jinka City Administration',
    'https://images.unsplash.com/photo-1731093714827-ba0353e09bfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWF5b3IlMjBnb3Zlcm5tZW50JTIwb2ZmaWNpYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Welcome to the official website of Jinka City Administration. Our city is rich in culture, diversity, and opportunity.',
    1
WHERE NOT EXISTS (
    SELECT 1 FROM leaders WHERE order_number = 1
);

INSERT INTO leader_translations (leader_id, language_id, name, position, message)
VALUES
(
    (SELECT id FROM leaders ORDER BY order_number ASC, id ASC LIMIT 1),
    (SELECT id FROM languages WHERE code = 'en'),
    'Mayor',
    'Jinka City Administration',
    'Welcome to the official website of Jinka City Administration. Our city is rich in culture, diversity, and opportunity.

The administration is committed to delivering transparent governance, improving infrastructure, and providing quality public services to all residents.

Together we are building a modern, inclusive, and sustainable city for future generations.'
),
(
    (SELECT id FROM leaders ORDER BY order_number ASC, id ASC LIMIT 1),
    (SELECT id FROM languages WHERE code = 'am'),
    'ከንቲባ',
    'ጅንካ ከተማ አስተዳደር',
    'ወደ ጅንካ ከተማ አስተዳደር ይፋዊ ድህረ ገጽ እንኳን ደህና መጡ።

ከተማችን በባህል፣ በልዩነት እና በእድገት ዕድሎች የበለፀገች ናት።

አስተዳደራችን ግልጽነት፣ ጥራት ያለው የህዝብ አገልግሎት እና የመሰረተ ልማት ማሻሻል ላይ ተግቶ እየሰራ ነው።'
)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    position = VALUES(position),
    message = VALUES(message);

-- Government departments
INSERT INTO departments (slug, icon, color, order_number, is_active)
VALUES
('mayors-office', 'Landmark', '#1a3a6b', 1, TRUE),
('city-council-office', 'Users', '#e8a020', 2, TRUE),
('finance-department', 'Landmark', '#1a7ab5', 3, TRUE),
('urban-development', 'Landmark', '#2a8a5c', 4, TRUE),
('public-service-office', 'Landmark', '#6a5acd', 5, TRUE),
('health-sanitation', 'Landmark', '#d13030', 6, TRUE),
('education-culture', 'Landmark', '#e84a7c', 7, TRUE),
('trade-investment', 'Landmark', '#c9a818', 8, TRUE)
ON DUPLICATE KEY UPDATE
    icon = VALUES(icon),
    color = VALUES(color),
    order_number = VALUES(order_number),
    is_active = VALUES(is_active),
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO department_translations (department_id, language_id, name, description)
VALUES
((SELECT id FROM departments WHERE slug = 'mayors-office'), (SELECT id FROM languages WHERE code = 'en'), 'Mayor''s Office', 'Provides strategic leadership and oversight for city administration.'),
((SELECT id FROM departments WHERE slug = 'city-council-office'), (SELECT id FROM languages WHERE code = 'en'), 'City Council Office', 'Coordinates council sessions, records resolutions, and public representation.'),
((SELECT id FROM departments WHERE slug = 'finance-department'), (SELECT id FROM languages WHERE code = 'en'), 'Finance Department', 'Manages budgeting, municipal revenue, and financial accountability.'),
((SELECT id FROM departments WHERE slug = 'urban-development'), (SELECT id FROM languages WHERE code = 'en'), 'Urban Development', 'Leads planning, land management, and infrastructure expansion efforts.'),
((SELECT id FROM departments WHERE slug = 'public-service-office'), (SELECT id FROM languages WHERE code = 'en'), 'Public Service Office', 'Coordinates citizen-facing services and administrative support.'),
((SELECT id FROM departments WHERE slug = 'health-sanitation'), (SELECT id FROM languages WHERE code = 'en'), 'Health & Sanitation', 'Oversees urban health initiatives, sanitation, and community wellbeing programs.'),
((SELECT id FROM departments WHERE slug = 'education-culture'), (SELECT id FROM languages WHERE code = 'en'), 'Education & Culture', 'Supports schools, youth initiatives, and cultural development programs.'),
((SELECT id FROM departments WHERE slug = 'trade-investment'), (SELECT id FROM languages WHERE code = 'en'), 'Trade & Investment', 'Promotes local business growth, investment, and economic opportunity.'),
((SELECT id FROM departments WHERE slug = 'mayors-office'), (SELECT id FROM languages WHERE code = 'am'), 'Mayor''s Office', 'Provides strategic leadership and oversight for city administration.'),
((SELECT id FROM departments WHERE slug = 'city-council-office'), (SELECT id FROM languages WHERE code = 'am'), 'City Council Office', 'Coordinates council sessions, records resolutions, and public representation.'),
((SELECT id FROM departments WHERE slug = 'finance-department'), (SELECT id FROM languages WHERE code = 'am'), 'Finance Department', 'Manages budgeting, municipal revenue, and financial accountability.'),
((SELECT id FROM departments WHERE slug = 'urban-development'), (SELECT id FROM languages WHERE code = 'am'), 'Urban Development', 'Leads planning, land management, and infrastructure expansion efforts.'),
((SELECT id FROM departments WHERE slug = 'public-service-office'), (SELECT id FROM languages WHERE code = 'am'), 'Public Service Office', 'Coordinates citizen-facing services and administrative support.'),
((SELECT id FROM departments WHERE slug = 'health-sanitation'), (SELECT id FROM languages WHERE code = 'am'), 'Health & Sanitation', 'Oversees urban health initiatives, sanitation, and community wellbeing programs.'),
((SELECT id FROM departments WHERE slug = 'education-culture'), (SELECT id FROM languages WHERE code = 'am'), 'Education & Culture', 'Supports schools, youth initiatives, and cultural development programs.'),
((SELECT id FROM departments WHERE slug = 'trade-investment'), (SELECT id FROM languages WHERE code = 'am'), 'Trade & Investment', 'Promotes local business growth, investment, and economic opportunity.')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    description = VALUES(description);

-- Services
INSERT INTO services (title, description, icon, created_at)
SELECT 'Civil Registration', 'Birth, marriage, and residence registration services.', 'FileText', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Civil Registration');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Permit & Licensing', 'Construction permits, business licenses, and approvals.', 'Building', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Permit & Licensing');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Water Services', 'Water connections, billing support, and maintenance requests.', 'Droplets', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Water Services');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Electricity Support', 'Power service coordination and outage reporting support.', 'Zap', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Electricity Support');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Parks & Environment', 'Urban greenery, parks maintenance, and environmental care.', 'TreePine', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Parks & Environment');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Waste Management', 'Household and commercial waste collection coordination.', 'Trash2', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Waste Management');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Public Safety', 'Community safety support and emergency coordination channels.', 'ShieldCheck', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Public Safety');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Health Services', 'Access information for municipal health programs and clinics.', 'HeartPulse', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Health Services');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Education Services', 'School support services and local education administration.', 'GraduationCap', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Education Services');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Transport Services', 'Traffic, public transport guidance, and mobility assistance.', 'Bus', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Transport Services');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Business Support', 'Support and guidance for startups and local enterprises.', 'Briefcase', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Business Support');
INSERT INTO services (title, description, icon, created_at)
SELECT 'Revenue & Tax', 'Municipal fee, tax payment, and compliance assistance.', 'BarChart3', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Revenue & Tax');

INSERT INTO service_translations (service_id, language_id, title, description)
SELECT s.id, (SELECT id FROM languages WHERE code = 'en'), s.title, s.description FROM services s
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);
INSERT INTO service_translations (service_id, language_id, title, description)
SELECT s.id, (SELECT id FROM languages WHERE code = 'am'), s.title, s.description FROM services s
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description);

-- News categories
INSERT INTO news_categories (slug, color, is_active)
VALUES
('infrastructure', '#1a3a6b', TRUE),
('community', '#e8a020', TRUE),
('environment', '#2a8a5c', TRUE),
('health', '#d13030', TRUE),
('education', '#1a7ab5', TRUE),
('economy', '#6a5acd', TRUE)
ON DUPLICATE KEY UPDATE
    color = VALUES(color),
    is_active = VALUES(is_active);

INSERT INTO news_category_translations (category_id, language_id, name)
VALUES
((SELECT id FROM news_categories WHERE slug = 'infrastructure'), (SELECT id FROM languages WHERE code = 'en'), 'Infrastructure'),
((SELECT id FROM news_categories WHERE slug = 'community'), (SELECT id FROM languages WHERE code = 'en'), 'Community'),
((SELECT id FROM news_categories WHERE slug = 'environment'), (SELECT id FROM languages WHERE code = 'en'), 'Environment'),
((SELECT id FROM news_categories WHERE slug = 'health'), (SELECT id FROM languages WHERE code = 'en'), 'Health'),
((SELECT id FROM news_categories WHERE slug = 'education'), (SELECT id FROM languages WHERE code = 'en'), 'Education'),
((SELECT id FROM news_categories WHERE slug = 'economy'), (SELECT id FROM languages WHERE code = 'en'), 'Economy'),
((SELECT id FROM news_categories WHERE slug = 'infrastructure'), (SELECT id FROM languages WHERE code = 'am'), 'Infrastructure'),
((SELECT id FROM news_categories WHERE slug = 'community'), (SELECT id FROM languages WHERE code = 'am'), 'Community'),
((SELECT id FROM news_categories WHERE slug = 'environment'), (SELECT id FROM languages WHERE code = 'am'), 'Environment'),
((SELECT id FROM news_categories WHERE slug = 'health'), (SELECT id FROM languages WHERE code = 'am'), 'Health'),
((SELECT id FROM news_categories WHERE slug = 'education'), (SELECT id FROM languages WHERE code = 'am'), 'Education'),
((SELECT id FROM news_categories WHERE slug = 'economy'), (SELECT id FROM languages WHERE code = 'am'), 'Economy')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- News posts
INSERT INTO news (title, slug, content, featured_image, published_by, status, created_at)
SELECT
    'Infrastructure Works Begin',
    'infrastructure-works-begin',
    'Construction of new roads and utilities has started across the city.',
    'https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMGRldmVsb3BtZW50JTIwcHJvamVjdHxlbnwxfHx8fDE3NzI4MDM2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    NULL, 'published', '2026-02-20 10:00:00'
WHERE NOT EXISTS (SELECT 1 FROM news WHERE slug = 'infrastructure-works-begin');

INSERT INTO news (title, slug, content, featured_image, published_by, status, created_at)
SELECT
    'Community Health Fair',
    'community-health-fair',
    'Local health services host a free fair for residents with screenings and advice.',
    'https://images.unsplash.com/photo-1680686096607-368be87896ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHNvY2lhbCUyMHByb2dyYW0lMjBldmVudHxlbnwxfHx8fDE3NzI4MDM2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    NULL, 'published', '2026-02-14 10:00:00'
WHERE NOT EXISTS (SELECT 1 FROM news WHERE slug = 'community-health-fair');

INSERT INTO news (title, slug, content, featured_image, published_by, status, created_at)
SELECT
    'Environmental Awareness Campaign',
    'environmental-awareness-campaign',
    'City launches tree planting initiative to improve green spaces.',
    'https://images.unsplash.com/photo-1620996148754-c4b4fa9aca78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjB1cmJhbiUyMGNpdHklMjBwYXJrJTIwcHVibGljJTIwc3BhY2V8ZW58MXx8fHwxNzcyODAzNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    NULL, 'published', '2026-01-30 10:00:00'
WHERE NOT EXISTS (SELECT 1 FROM news WHERE slug = 'environmental-awareness-campaign');

INSERT INTO news (title, slug, content, featured_image, published_by, status, created_at)
SELECT
    'Jinka City Expands Free Health Screening Programme',
    'health-screening-programme',
    'The city health bureau launches free health screening clinics across 12 sub-cities, offering blood pressure checks, diabetes tests, and nutritional counselling to residents.',
    'https://images.unsplash.com/photo-1764145177622-8317fbfe1877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFdGhpb3BpYSUyMGNvbW11bml0eSUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzcyODA0MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    NULL, 'published', '2026-01-18 10:00:00'
WHERE NOT EXISTS (SELECT 1 FROM news WHERE slug = 'health-screening-programme');

INSERT INTO news (title, slug, content, featured_image, published_by, status, created_at)
SELECT
    'Jinka City Attracts 5 New Foreign Investors',
    'new-foreign-investors',
    'Jinka City has welcomed five new international companies, creating an estimated 3,400 jobs in manufacturing and local business value chains.',
    'https://images.unsplash.com/photo-1765475467677-579353b25ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBjaXR5JTIwdXJiYW4lMjBkZXZlbG9wbWVudCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcyODA0MzM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    NULL, 'published', '2026-01-10 10:00:00'
WHERE NOT EXISTS (SELECT 1 FROM news WHERE slug = 'new-foreign-investors');

INSERT INTO news (title, slug, content, featured_image, published_by, status, created_at)
SELECT
    'New Public Library to Open in Jinka City Centre',
    'public-library-opening',
    'Jinka City Administration announces the opening of a modern public library equipped with digital learning resources, study halls, and a children''s reading corner.',
    'https://images.unsplash.com/photo-1722725384325-7ba56456db3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFrZSUyMHN1bnNldCUyMG5hdHVyZSUyMHNjZW5lcnl8ZW58MXx8fHwxNzcyODA0MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    NULL, 'published', '2025-12-28 10:00:00'
WHERE NOT EXISTS (SELECT 1 FROM news WHERE slug = 'public-library-opening');

INSERT INTO news_translations (news_id, language_id, title, slug, content, excerpt)
VALUES
((SELECT id FROM news WHERE slug = 'infrastructure-works-begin' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'en'), 'Infrastructure Works Begin', 'infrastructure-works-begin', 'Construction of new roads and utilities has started across the city.', 'Construction of new roads and utilities has started across the city.'),
((SELECT id FROM news WHERE slug = 'community-health-fair' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'en'), 'Community Health Fair', 'community-health-fair', 'Local health services host a free fair for residents with screenings and advice.', 'Local health services host a free fair for residents with screenings and advice.'),
((SELECT id FROM news WHERE slug = 'environmental-awareness-campaign' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'en'), 'Environmental Awareness Campaign', 'environmental-awareness-campaign', 'City launches tree planting initiative to improve green spaces.', 'City launches tree planting initiative to improve green spaces.'),
((SELECT id FROM news WHERE slug = 'health-screening-programme' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'en'), 'Jinka City Expands Free Health Screening Programme', 'health-screening-programme', 'The city health bureau launches free health screening clinics across 12 sub-cities, offering blood pressure checks, diabetes tests, and nutritional counselling to residents.', 'The city health bureau launches free health screening clinics across 12 sub-cities.'),
((SELECT id FROM news WHERE slug = 'new-foreign-investors' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'en'), 'Jinka City Attracts 5 New Foreign Investors', 'new-foreign-investors', 'Jinka City has welcomed five new international companies, creating an estimated 3,400 jobs in manufacturing and local business value chains.', 'Jinka City has welcomed five new international companies.'),
((SELECT id FROM news WHERE slug = 'public-library-opening' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'en'), 'New Public Library to Open in Jinka City Centre', 'public-library-opening', 'Jinka City Administration announces the opening of a modern public library equipped with digital learning resources, study halls, and a children''s reading corner.', 'Jinka City Administration announces the opening of a modern public library.'),
((SELECT id FROM news WHERE slug = 'infrastructure-works-begin' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'am'), 'የቅርብ ጊዜ መንገዶች ስራዎች ጀምረዋል', 'infrastructure-works-begin-am', 'በከተማ ዙሪያ አዲስ መንገዶችና አገልግሎቶች ስራዎች ተከናወኑ።', 'በከተማ ዙሪያ አዲስ መንገዶችና አገልግሎቶች ስራዎች ተከናወኑ።'),
((SELECT id FROM news WHERE slug = 'community-health-fair' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'am'), 'የማህበረሰብ ጤና ትርኢት ተካሄደ', 'community-health-fair-am', 'ከከተማ ጤና አገልግሎቶች ለነዋሪዎች ነፃ ምርመራዎችና ምክር ሰጥተዋል።', 'ከከተማ ጤና አገልግሎቶች ለነዋሪዎች ነፃ ምርመራዎችና ምክር ሰጥተዋል።'),
((SELECT id FROM news WHERE slug = 'environmental-awareness-campaign' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'am'), 'የኢኮሎጂ እውቀት ዘመቻ', 'environmental-awareness-campaign-am', 'ከተማዋ የዛፎችን መትከል ዕርምጃ ጀምራ አረንጓዴ ቦታዎችን ለማሻሻል ተግባራዊ እርምጃዎችን አቀረበች።', 'ከተማዋ የዛፎችን መትከል ዕርምጃ ጀምራለች።'),
((SELECT id FROM news WHERE slug = 'health-screening-programme' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'am'), 'Jinka City Expands Free Health Screening Programme', 'health-screening-programme-am', 'The city health bureau launches free health screening clinics across 12 sub-cities, offering blood pressure checks, diabetes tests, and nutritional counselling to residents.', 'The city health bureau launches free health screening clinics across 12 sub-cities.'),
((SELECT id FROM news WHERE slug = 'new-foreign-investors' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'am'), 'Jinka City Attracts 5 New Foreign Investors', 'new-foreign-investors-am', 'Jinka City has welcomed five new international companies, creating an estimated 3,400 jobs in manufacturing and local business value chains.', 'Jinka City has welcomed five new international companies.'),
((SELECT id FROM news WHERE slug = 'public-library-opening' ORDER BY id DESC LIMIT 1), (SELECT id FROM languages WHERE code = 'am'), 'New Public Library to Open in Jinka City Centre', 'public-library-opening-am', 'Jinka City Administration announces the opening of a modern public library equipped with digital learning resources, study halls, and a children''s reading corner.', 'Jinka City Administration announces the opening of a modern public library.')
ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    content = VALUES(content),
    excerpt = VALUES(excerpt);

INSERT INTO news_category_map (news_id, category_id)
VALUES
((SELECT id FROM news WHERE slug = 'infrastructure-works-begin' ORDER BY id DESC LIMIT 1), (SELECT id FROM news_categories WHERE slug = 'infrastructure')),
((SELECT id FROM news WHERE slug = 'community-health-fair' ORDER BY id DESC LIMIT 1), (SELECT id FROM news_categories WHERE slug = 'community')),
((SELECT id FROM news WHERE slug = 'environmental-awareness-campaign' ORDER BY id DESC LIMIT 1), (SELECT id FROM news_categories WHERE slug = 'environment')),
((SELECT id FROM news WHERE slug = 'health-screening-programme' ORDER BY id DESC LIMIT 1), (SELECT id FROM news_categories WHERE slug = 'health')),
((SELECT id FROM news WHERE slug = 'new-foreign-investors' ORDER BY id DESC LIMIT 1), (SELECT id FROM news_categories WHERE slug = 'economy')),
((SELECT id FROM news WHERE slug = 'public-library-opening' ORDER BY id DESC LIMIT 1), (SELECT id FROM news_categories WHERE slug = 'education'))
ON DUPLICATE KEY UPDATE news_id = VALUES(news_id);

-- UI texts (nested keys) - English
INSERT INTO ui_translations (language_id, translation_key, translation_value, value_type)
VALUES
((SELECT id FROM languages WHERE code = 'en'), 'nav.home', 'Home', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'nav.about', 'About', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'nav.government', 'Government', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'nav.council', 'Council', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'nav.programs', 'Programs', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'nav.services', 'Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'nav.explore', 'Explore', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'nav.resources', 'Resources', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'nav.announcements', 'Announcements', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news', 'News', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'nav.contact', 'Contact', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'topbar.country', 'Federal Democratic Republic of Ethiopia', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'topbar.langLabel', 'English', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'search.placeholder', 'Search...', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'hero.badge', 'Official Government Website', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'hero.title', 'Welcome to Jinka City', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'hero.subtitle', 'Jinka is the administrative capital of South Omo Zone in Southern Ethiopia. The city is known for its cultural diversity, natural beauty, and growing economic opportunities.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'hero.btnServices', 'City Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'hero.btnLearnMore', 'Learn More', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'hero.scroll', 'SCROLL', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'stats.sectionTitle', 'Jinka at a Glance', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'stats.sectionSubtitle', 'Key facts about Jinka City and its development as the capital of South Omo Zone.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'mayor.tag', 'Mayor''s Message', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'mayor.title', 'Working Together for the Development of Jinka', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'mayor.nameQuote', '— Mayor of Jinka City', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'mayor.messages', '["Welcome to the official website of Jinka City Administration. Our city is rich in culture, diversity, and opportunity.","The administration is committed to delivering transparent governance, improving infrastructure, and providing quality public services to all residents.","Together we are building a modern, inclusive, and sustainable city for future generations."]', 'json'),
((SELECT id FROM languages WHERE code = 'en'), 'mayor.signatureName', 'Mayor', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'mayor.signatureTitle', 'Jinka City Administration', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'mayor.btnReadMore', 'Read Full Message', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'mayor.cityMayorLabel', 'City Mayor', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'mayor.yearsLabel', 'Present', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.sectionTitle', 'Latest News', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.sectionSubtitle', 'Updates and announcements from Jinka City', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.btnViewAll', 'View All News', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.btnReadMore', 'Read More', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.heroTitle', 'News & Updates', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.heroSubtitle', 'Stay informed with the latest stories from Jinka City.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.breadcrumbHome', 'Home', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.breadcrumbNews', 'News', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'newsPage.heroTitle', 'News & Updates', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'newsPage.heroSubtitle', 'Stay informed with the latest stories from Jinka City.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'newsPage.categories', '["All","Infrastructure","Community","Environment","Health","Education","Economy"]', 'json'),
((SELECT id FROM languages WHERE code = 'en'), 'services.sectionTitle', 'Public Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.sectionSubtitle', 'Essential municipal services available for residents, businesses, and visitors.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.btnAccess', 'Access', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.btnViewAll', 'View All Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.heroTitle', 'City Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.heroSubtitle', 'Find and access municipal services provided by Jinka City Administration.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.breadcrumbHome', 'Home', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.breadcrumbServices', 'Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'servicesPage.heroTitle', 'City Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'servicesPage.heroSubtitle', 'Find and access municipal services provided by Jinka City Administration.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'servicesPage.allServicesTitle', 'All Available Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'servicesPage.allServicesSubtitle', 'Browse services by category or use search to quickly find what you need.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.allServicesTitle', 'All Available Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.allServicesSubtitle', 'Browse services by category or use search to quickly find what you need.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.noResults', 'No services found for "{search}". Try adjusting your search terms.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.clearSearch', 'Clear Search', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'government.heroTitle', 'City Government', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'government.heroSubtitle', 'Learn about the leadership, offices, and departments serving Jinka City.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'government.structureTitle', 'Government Structure', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'government.structureSubtitle', 'Key departments working to deliver public services and city development.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'government.ctaTitle', 'Engage with Your City Government', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'government.ctaSubtitle', 'Citizens can participate in public meetings, submit feedback, and stay informed about decisions that shape Jinka City.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'government.ctaPrimary', 'Contact Administration', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'government.ctaSecondary', 'Access Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.breadcrumbHome', 'Home', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.breadcrumbAbout', 'About', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.heroTitle', 'About Jinka City', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.heroSubtitle', 'A growing administrative, cultural, and economic center in South Omo Zone.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.overviewTitle', 'City Overview', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.overviewText1', 'Jinka is the administrative capital of South Omo Zone and serves as a key center for public administration, trade, and services in the region.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.overviewText2', 'The city is known for its cultural diversity and strategic role in connecting surrounding communities with essential government and market services.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.historyTitle', 'History & Identity', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.historyText', 'Jinka has evolved into an important urban center through steady growth in infrastructure, governance, and social services while preserving its rich local heritage.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.visionTitle', 'Our Vision', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.visionText', 'To build an inclusive, well-managed, and resilient city that provides equitable opportunities and quality public services for all residents.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.missionTitle', 'Our Mission', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'about.missionText', 'To deliver transparent governance, strengthen urban services, and enable sustainable local development through responsive city administration.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.heroTitle', 'Contact Us', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.heroSubtitle', 'Reach Jinka City Administration for information, support, and public service requests.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.officeTitle', 'Administration Office', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.officeAddress', 'Jinka City Administration, South Omo Zone, Ethiopia', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.hours', 'Monday - Friday: 8:30 AM - 5:30 PM', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.getInTouchTitle', 'Get In Touch', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.getInTouchSubtitle', 'Send us a message and our team will respond as soon as possible.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.formName', 'Full Name', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.formEmail', 'Email Address', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.formSubject', 'Subject', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.formMessage', 'Message', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'contact.formSend', 'Send Message', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'notFound.title', 'Page Not Found', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'notFound.subtitle', 'The page you are looking for does not exist or may have been moved.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'notFound.btn', 'Back to Home', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.tagline', 'Jinka City Administration is committed to providing transparent and efficient services for all residents.', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.address', 'Jinka City Administration, South Omo Zone, Ethiopia', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.hours', 'Monday – Friday: 8:30 AM – 5:30 PM', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.quickLinksTitle', 'Quick Links', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.quickLinks', '["About Jinka","City Government","Council Office","Programs","News","Announcements","Resources","Contact"]', 'json'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.servicesTitle', 'Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.serviceLinks', '["Civil Registration","Permit & Licensing","Water Services","Electricity Support","Parks & Environment","Waste Management","Public Safety","Health Services"]', 'json'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.resourcesTitle', 'Resources', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.resources', '["Citizen Charter","Open Data","Procurement","Downloads"]', 'json'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.newsletterLabel', 'Stay Updated', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.newsletterPlaceholder', 'Enter your email', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.subscribeBtnLabel', 'Subscribe', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'footer.copyright', '© 2026 Jinka City Administration | Federal Democratic Republic of Ethiopia', 'string')
ON DUPLICATE KEY UPDATE
    translation_value = VALUES(translation_value),
    value_type = VALUES(value_type),
    updated_at = CURRENT_TIMESTAMP;

-- UI texts (nested keys) - Amharic
INSERT INTO ui_translations (language_id, translation_key, translation_value, value_type)
VALUES
((SELECT id FROM languages WHERE code = 'am'), 'nav.home', 'መነሻ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'nav.about', 'ስለ ከተማው', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'nav.government', 'መንግስት', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'nav.council', 'ምክር ቤት', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'nav.programs', 'ፕሮግራሞች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'nav.services', 'አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'nav.explore', 'ያስሱ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'nav.resources', 'ሀብቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'nav.announcements', 'ማስታወቂያዎች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news', 'ዜና', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'nav.contact', 'ያግኙን', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'topbar.country', 'የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'topbar.langLabel', 'አማርኛ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'search.placeholder', 'ፈልግ...', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'hero.badge', 'ይፋዊ የመንግስት ድህረ ገጽ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'hero.title', 'ወደ ጅንካ ከተማ እንኳን ደህና መጡ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'hero.subtitle', 'ጅንካ የደቡብ ኦሞ ዞን ዋና ከተማ ሲሆን በደቡብ ኢትዮጵያ የምትገኝ ከተማ ናት። ከተማዋ በባህላዊ ብዝሃነት፣ በተፈጥሯዊ ውበት እና በእየጨመረ በሚገኝ ኢኮኖሚ እድገት ታዋቂ ናት።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'hero.btnServices', 'የከተማ አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'hero.btnLearnMore', 'ተጨማሪ ይወቁ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'hero.scroll', 'ወደ ታች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'stats.sectionTitle', 'ጅንካ በአጭሩ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'stats.sectionSubtitle', 'ስለ ጅንካ ከተማ እና እድገቷ የሚያሳዩ አስፈላጊ መረጃዎች።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'mayor.tag', 'የከንቲባ መልዕክት', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'mayor.title', 'ለጅንካ እድገት በአንድነት እንስራ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'mayor.nameQuote', '— የጅንካ ከተማ ከንቲባ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'mayor.messages', '["ወደ ጅንካ ከተማ አስተዳደር ይፋዊ ድህረ ገጽ እንኳን ደህና መጡ።","ከተማችን በባህል፣ በልዩነት እና በእድገት ዕድሎች የበለፀገች ናት።","አስተዳደራችን ግልጽነት፣ ጥራት ያለው የህዝብ አገልግሎት እና የመሰረተ ልማት ማሻሻል ላይ ተግቶ እየሰራ ነው።"]', 'json'),
((SELECT id FROM languages WHERE code = 'am'), 'mayor.signatureName', 'ከንቲባ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'mayor.signatureTitle', 'ጅንካ ከተማ አስተዳደር', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'mayor.btnReadMore', 'ሙሉ መልዕት ያንብቡ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'mayor.cityMayorLabel', 'የከተማ ከንቲባ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'mayor.yearsLabel', 'አሁን', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.sectionTitle', 'የአዳዲስ ዜናዎች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.sectionSubtitle', 'ከጅንካ ከተማ የተለያዩ ማስታወቂያዎችና ዜናዎች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.btnViewAll', 'ሁሉን ይመልከቱ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.btnReadMore', 'ተጨማሪ ያንብቡ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.heroTitle', 'ዜና እና ማስታወቂያዎች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.heroSubtitle', 'ከጅንካ ከተማ ያሉ የቅርብ ጊዜ ዜናዎችን ይከታተሉ።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.breadcrumbHome', 'መነሻ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.breadcrumbNews', 'ዜና', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'newsPage.heroTitle', 'ዜና እና ማስታወቂያዎች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'newsPage.heroSubtitle', 'ከጅንካ ከተማ ያሉ የቅርብ ጊዜ ዜናዎችን ይከታተሉ።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'newsPage.categories', '["ሁሉም","Infrastructure","Community","Environment","Health","Education","Economy"]', 'json'),
((SELECT id FROM languages WHERE code = 'am'), 'services.sectionTitle', 'የህዝብ አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.sectionSubtitle', 'ለነዋሪዎች፣ ለንግዦች እና ለእንግዳ ሰዎች የሚቀርቡ አስፈላጊ የከተማ አገልግሎቶች።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.btnAccess', 'ያስተዳድሩ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.btnViewAll', 'ሁሉን ይመልከቱ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.heroTitle', 'የከተማ አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.heroSubtitle', 'በጅንካ ከተማ አስተዳደር የሚሰጡ የከተማ አገልግሎቶችን ያግኙ እና ያስተዳድሩ።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.breadcrumbHome', 'መነሻ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.breadcrumbServices', 'አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'servicesPage.heroTitle', 'የከተማ አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'servicesPage.heroSubtitle', 'በጅንካ ከተማ አስተዳደር የሚሰጡ የከተማ አገልግሎቶችን ያግኙ እና ያስተዳድሩ።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'servicesPage.allServicesTitle', 'ሁሉም የሚቀርቡ አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'servicesPage.allServicesSubtitle', 'በምድብ ወይም በፍለጋ በፍጥነት የሚሹን ያግኙ።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.allServicesTitle', 'ሁሉም የሚቀርቡ አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.allServicesSubtitle', 'በምድብ ወይም በፍለጋ በፍጥነት የሚሹን ያግኙ።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.noResults', '"{search}" ለ ምንም አገልግሎቶች አልተለመዱም። የፍለጋ ቃላትዎን ያስተካክሉ።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.clearSearch', 'ፍለጋ አጽዳ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'government.heroTitle', 'City Government', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'government.heroSubtitle', 'Learn about the leadership, offices, and departments serving Jinka City.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'government.structureTitle', 'Government Structure', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'government.structureSubtitle', 'Key departments working to deliver public services and city development.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'government.ctaTitle', 'Engage with Your City Government', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'government.ctaSubtitle', 'Citizens can participate in public meetings, submit feedback, and stay informed about decisions that shape Jinka City.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'government.ctaPrimary', 'Contact Administration', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'government.ctaSecondary', 'Access Services', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.breadcrumbHome', 'Home', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.breadcrumbAbout', 'About', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.heroTitle', 'About Jinka City', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.heroSubtitle', 'A growing administrative, cultural, and economic center in South Omo Zone.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.overviewTitle', 'City Overview', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.overviewText1', 'Jinka is the administrative capital of South Omo Zone and serves as a key center for public administration, trade, and services in the region.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.overviewText2', 'The city is known for its cultural diversity and strategic role in connecting surrounding communities with essential government and market services.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.historyTitle', 'History & Identity', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.historyText', 'Jinka has evolved into an important urban center through steady growth in infrastructure, governance, and social services while preserving its rich local heritage.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.visionTitle', 'Our Vision', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.visionText', 'To build an inclusive, well-managed, and resilient city that provides equitable opportunities and quality public services for all residents.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.missionTitle', 'Our Mission', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'about.missionText', 'To deliver transparent governance, strengthen urban services, and enable sustainable local development through responsive city administration.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.heroTitle', 'Contact Us', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.heroSubtitle', 'Reach Jinka City Administration for information, support, and public service requests.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.officeTitle', 'Administration Office', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.officeAddress', 'Jinka City Administration, South Omo Zone, Ethiopia', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.hours', 'Monday - Friday: 8:30 AM - 5:30 PM', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.getInTouchTitle', 'Get In Touch', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.getInTouchSubtitle', 'Send us a message and our team will respond as soon as possible.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.formName', 'Full Name', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.formEmail', 'Email Address', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.formSubject', 'Subject', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.formMessage', 'Message', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'contact.formSend', 'Send Message', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'notFound.title', 'Page Not Found', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'notFound.subtitle', 'The page you are looking for does not exist or may have been moved.', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'notFound.btn', 'Back to Home', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.tagline', 'የጅንካ ከተማ አስተዳደር ለሁሉም ነዋሪዎች ግልጽና ውጤታማ አገልግሎት ለመስጠት ቁርጠኛ ነው።', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.address', 'ጅንካ ከተማ አስተዳደር፣ ደቡብ ኦሞ ዞን፣ ኢትዮጵያ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.hours', 'ሰኞ – ዓርብ: 8:30 – 5:30', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.quickLinksTitle', 'ፈጣን አገናኞች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.quickLinks', '["ስለ ጅንካ","የከተማ መንግስት","ምክር ቤት","ፕሮግራሞች","ዜና","ማስታወቂያዎች","ሀብቶች","ያግኙን"]', 'json'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.servicesTitle', 'አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.serviceLinks', '["ሲቪል ምዝገባ","ፈቃድ እና ፍቃድ ስርዓት","የውሃ አገልግሎት","የኤሌክትሪክ ድጋፍ","ፓርኮች እና አካባቢ","የቆሻሻ አስተዳደር","የህዝብ ደህንነት","የጤና አገልግሎት"]', 'json'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.resourcesTitle', 'ሀብቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.resources', '["የዜጎች ቻርተር","ክፍት ዳታ","ግዢ","ማውረጃዎች"]', 'json'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.newsletterLabel', 'ዝማኔ ይቀበሉ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.newsletterPlaceholder', 'ኢሜይልዎን ያስገቡ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.subscribeBtnLabel', 'ይመዝገቡ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'footer.copyright', '© 2026 ጅንካ ከተማ አስተዳደር | የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ', 'string'),
-- Missing breadcrumb translations
((SELECT id FROM languages WHERE code = 'en'), 'services.breadcrumbHome', 'Home', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.breadcrumbServices', 'Services', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.breadcrumbHome', 'Home', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'news.breadcrumbNews', 'News', 'string'),
((SELECT id FROM languages WHERE code = 'en'), 'services.searchPlaceholder', 'Search services...', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.breadcrumbHome', 'መነሻ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.breadcrumbServices', 'አገልግሎቶች', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.breadcrumbHome', 'መነሻ', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'news.breadcrumbNews', 'ዜና', 'string'),
((SELECT id FROM languages WHERE code = 'am'), 'services.searchPlaceholder', 'አገልግሎቶችን ፈልግ...', 'string')
ON DUPLICATE KEY UPDATE
    translation_value = VALUES(translation_value),
    value_type = VALUES(value_type),
    updated_at = CURRENT_TIMESTAMP;
