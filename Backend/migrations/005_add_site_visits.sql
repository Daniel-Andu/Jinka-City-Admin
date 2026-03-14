USE Jinka_cms;

CREATE TABLE IF NOT EXISTS site_visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    visitor_hash VARCHAR(64) NOT NULL,
    ip VARCHAR(64),
    user_agent VARCHAR(255),
    path VARCHAR(255),
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_site_visits_visited_at (visited_at),
    INDEX idx_site_visits_visitor_hash (visitor_hash)
);
