# API Usage Guide for Collaborator

## Overview
This guide explains how to use the Jinka CMS Backend API to build the admin dashboard. The API provides full control over the website's content.

## Base URL
- **Local Development**: `http://localhost:5001`
- **Production (Live)**: `https://jinka-city-backend.onrender.com`

## Authentication
All admin endpoints require JWT authentication.

### Step 1: Login
```bash
POST /api/public/login
Content-Type: application/json

{
  "email": "admin@jinkacity.gov.et",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@jinkacity.gov.et"
  }
}
```

### Step 2: Use Token
Include the token in all admin requests:
```
Authorization: Bearer <your-token-here>
```

## Admin Endpoints

### Settings Management
```bash
GET    /api/admin/settings          # Get current settings
PUT    /api/admin/settings          # Update settings
Body: { "id": 1, "site_name": "New Name", ... }
```

### Languages
```bash
GET    /api/admin/languages         # List all languages
POST   /api/admin/languages         # Create new language
PUT    /api/admin/languages/:id     # Update language
DELETE /api/admin/languages/:id     # Delete language
```

### UI Translations
```bash
GET    /api/admin/ui-translations   # List all translations
POST   /api/admin/ui-translations   # Create translation
PUT    /api/admin/ui-translations/:id # Update translation
DELETE /api/admin/ui-translations/:id # Delete translation
```

### Hero Sliders
```bash
GET    /api/admin/hero-sliders      # List hero slides
POST   /api/admin/hero-sliders      # Create hero slide
PUT    /api/admin/hero-sliders/:id  # Update hero slide
DELETE /api/admin/hero-sliders/:id  # Delete hero slide
```

**Example: Create Hero Slide**
```json
{
  "title": "Discover Jinka",
  "subtitle": "Culture, nature, and opportunity.",
  "button_text": "Explore",
  "button_link": "/about",
  "image": "uploads/hero-1.jpg",
  "is_active": true
}
```

### Hero Slider Translations
```bash
GET    /api/admin/hero-slider-translations            # List translations (optional ?slider_id=&language_id=)
POST   /api/admin/hero-slider-translations            # Create translation
PUT    /api/admin/hero-slider-translations/:id        # Update translation
DELETE /api/admin/hero-slider-translations/:id        # Delete translation
```

**Example: Create Hero Slide Translation**
```json
{
  "slider_id": 1,
  "language_id": 1,
  "title": "Discover Jinka",
  "subtitle": "Culture, nature, and opportunity.",
  "button_text": "Explore"
}
```

### Page Hero Slides (Page ↔ Slider Mapping)
```bash
GET    /api/admin/page-hero-slides            # List mappings (optional ?page_slug=home)
POST   /api/admin/page-hero-slides            # Create mapping
PUT    /api/admin/page-hero-slides/:id        # Update mapping
DELETE /api/admin/page-hero-slides/:id        # Delete mapping
```

**Example: Map Hero Slide to Page**
```json
{
  "page_slug": "home",
  "slider_id": 1,
  "order_number": 1,
  "is_active": true
}
```

### Leaders / Mayor
```bash
GET    /api/admin/leaders          # List leaders
POST   /api/admin/leaders          # Create leader
PUT    /api/admin/leaders/:id      # Update leader
DELETE /api/admin/leaders/:id      # Delete leader
```

**Example: Create Leader**
```json
{
  "name": "Mayor",
  "position": "Jinka City Administration",
  "photo": "uploads/mayor.jpg",
  "message": "Welcome to Jinka City Administration.",
  "order_number": 1
}
```

### Leader Translations
```bash
GET    /api/admin/leader-translations            # List translations (optional ?leader_id=&language_id=)
POST   /api/admin/leader-translations            # Create translation
PUT    /api/admin/leader-translations/:id        # Update translation
DELETE /api/admin/leader-translations/:id        # Delete translation
```

**Example: Create Leader Translation**
```json
{
  "leader_id": 1,
  "language_id": 1,
  "name": "Mayor",
  "position": "Jinka City Administration",
  "message": "Welcome to the official website of Jinka City Administration."
}
```
### City Stats
```bash
GET    /api/admin/city-stats        # List stats
POST   /api/admin/city-stats        # Create stat
PUT    /api/admin/city-stats/:id    # Update stat
DELETE /api/admin/city-stats/:id    # Delete stat
```

### Departments
```bash
GET    /api/admin/departments       # List departments
POST   /api/admin/departments       # Create department
PUT    /api/admin/departments/:id   # Update department
DELETE /api/admin/departments/:id   # Delete department
```

### Department Translations
```bash
GET    /api/admin/department-translations            # List translations (optional ?department_id=&language_id=)
POST   /api/admin/department-translations            # Create translation
PUT    /api/admin/department-translations/:id        # Update translation
DELETE /api/admin/department-translations/:id        # Delete translation
```

### Services
```bash
GET    /api/admin/services          # List services
POST   /api/admin/services          # Create service
PUT    /api/admin/services/:id      # Update service
DELETE /api/admin/services/:id      # Delete service
```

### Service Translations
```bash
GET    /api/admin/service-translations               # List translations (optional ?service_id=&language_id=)
POST   /api/admin/service-translations               # Create translation
PUT    /api/admin/service-translations/:id           # Update translation
DELETE /api/admin/service-translations/:id           # Delete translation
```

### News
```bash
GET    /api/admin/news              # List news articles
POST   /api/admin/news              # Create news article
PUT    /api/admin/news/:id          # Update news article
DELETE /api/admin/news/:id          # Delete news article
```

### News Translations
```bash
GET    /api/admin/news-translations                  # List translations (optional ?news_id=&language_id=)
POST   /api/admin/news-translations                  # Create translation
PUT    /api/admin/news-translations/:id              # Update translation
DELETE /api/admin/news-translations/:id              # Delete translation
```

### News Categories
```bash
GET    /api/admin/news-categories                    # List categories
POST   /api/admin/news-categories                    # Create category
PUT    /api/admin/news-categories/:id                # Update category
DELETE /api/admin/news-categories/:id                # Delete category
```

### News Category Translations
```bash
GET    /api/admin/news-category-translations         # List translations (optional ?category_id=&language_id=)
POST   /api/admin/news-category-translations         # Create translation
PUT    /api/admin/news-category-translations/:id     # Update translation
DELETE /api/admin/news-category-translations/:id     # Delete translation
```

### News Category Mapping
```bash
GET    /api/admin/news-category-map                  # List mappings (optional ?news_id=)
POST   /api/admin/news-category-map                  # Add mapping
DELETE /api/admin/news-category-map/:id              # Delete mapping
```

### News Tags
```bash
GET    /api/admin/news-tags                          # List tags
POST   /api/admin/news-tags                          # Create tag
PUT    /api/admin/news-tags/:id                      # Update tag
DELETE /api/admin/news-tags/:id                      # Delete tag
```

### News Tag Translations
```bash
GET    /api/admin/news-tag-translations              # List translations (optional ?tag_id=&language_id=)
POST   /api/admin/news-tag-translations              # Create translation
PUT    /api/admin/news-tag-translations/:id          # Update translation
DELETE /api/admin/news-tag-translations/:id          # Delete translation
```

### News Tag Mapping
```bash
GET    /api/admin/news-tag-map                       # List mappings (optional ?news_id=)
POST   /api/admin/news-tag-map                       # Add mapping
DELETE /api/admin/news-tag-map/:id                   # Delete mapping
```

### Subscribers Management
```bash
GET    /api/admin/subscribers       # List subscribers
DELETE /api/admin/subscribers/:id   # Remove subscriber
```

### Contact Messages
```bash
GET    /api/admin/contacts          # List contact messages
DELETE /api/admin/contacts/:id      # Delete contact message
```

### Analytics (Visitors)
```bash
GET /api/admin/analytics/visitors?range=day   # day | week | month | year
```

**Response:**
```json
{
  "range": "day",
  "total_visits": 124,
  "unique_visitors": 98
}
```

### Analytics Series (Charts)
```bash
GET /api/admin/analytics/visitors/series?range=day   # day | week | month | year
```

**Response:**
```json
{
  "range": "week",
  "points": [
    { "label": "2026-W02", "total_visits": 120, "unique_visitors": 98 },
    { "label": "2026-W03", "total_visits": 150, "unique_visitors": 112 }
  ]
}
```

## File Uploads
```bash
POST /api/admin/upload
Content-Type: multipart/form-data
Body: file=<your-image-file>
```

**Response:**
```json
{
  "filePath": "uploads/filename.jpg"
}
```

Use the returned `filePath` in image fields (e.g., hero slides, news images).

### Media Library
```bash
GET    /api/admin/media          # List uploaded media
DELETE /api/admin/media/:id      # Delete media record + file
```

## Public Endpoints (No Auth Required)
These are for the frontend website:
- `GET /api/public/bootstrap` - Site config
- `GET /api/public/ui-texts` - Translations
- `GET /api/public/hero` - Hero slides
- `GET /api/public/mayor` - Mayor / leader (first record)
- `GET /api/public/stats` - City stats
- `GET /api/public/departments` - Departments
- `GET /api/public/services` - Services
- `GET /api/public/news` - News articles
- `POST /api/public/visit` - Track a website visit (body: { "path": "/about" })

## Example: Creating a News Article
```javascript
// 1. Login first
const loginResponse = await fetch('/api/public/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@jinkacity.gov.et', password: 'admin123' })
});
const { token } = await loginResponse.json();

// 2. Create news
const newsResponse = await fetch('/api/admin/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'New City Initiative',
    content: 'Details about the initiative...',
    featured_image: '/uploads/news-image.jpg',
    published_at: '2024-03-09 10:00:00',
    is_active: true
  })
});
```

## Database Setup
**Important:** The database `Jinka_cms` already exists on TiDB. Do NOT run `Jinka_DB.session.sql` as it creates the database.

Run these migration files in order against your TiDB instance (only once):
1. `migrations/001_add_dynamic_tables.sql` - Dynamic content tables
2. `migrations/002_add_ui_translation_tables.sql` - Translation tables
3. `migrations/003_seed_current_ui_content.sql` - Sample data
4. `migrations/004_seed_admin_user.sql` - Admin user
5. `migrations/005_add_site_visits.sql` - Website visit tracking
6. `migrations/006_add_media_table.sql` - Media library

You can run them manually using a MySQL client or command line:
```bash
mysql -h your-tidb-host -P 4000 -u your-user -p your-db < migrations/001_add_dynamic_tables.sql
```

## Environment Variables
Copy `.env.example` to `.env` and fill in:
- Database credentials
- `JWT_SECRET` - Random string for token signing
- `PORT` - Usually 5001

## Running Locally
```bash
npm install
npm run dev
```

## Deployment on Render
1. Push this repo to GitHub
2. Connect Render to your GitHub repo
3. Set environment variables in Render dashboard:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME=Jinka_cms`
   - `DB_SSL_CA` (if needed)
   - `JWT_SECRET` (generate a random string)
4. Deploy - Render will run `npm install` and `npm start`
5. Optionally add a post-deploy script to run migrations if needed

## Notes
- All dates use MySQL format: `YYYY-MM-DD HH:MM:SS`
- Image paths should start with `/uploads/` for local files
- Boolean fields: use `true`/`false` in JSON
- All responses include standard HTTP status codes
