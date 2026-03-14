USE Jinka_cms;

-- Seed admin user (password: admin123)
INSERT INTO roles (name, description) VALUES ('admin', 'Administrator') ON DUPLICATE KEY UPDATE name = name;
INSERT INTO users (name, email, password, role_id, status)
SELECT 'Admin User', 'admin@jinkacity.gov.et', '$2a$10$example.hash.for.admin123', r.id, 'active'
FROM roles r WHERE r.name = 'admin'
ON DUPLICATE KEY UPDATE name = name;