# Backend API Integration Status

## Overview
This document shows which admin panel features have backend support based on the actual backend code from https://github.com/Pixel-Addis-Solution-PLC/jinka-city-api

---

## ✅ AVAILABLE ENDPOINTS (From Backend)

### Authentication
- `POST /api/public/login` - Admin/User login (returns JWT token)

### Departments
- `GET /api/admin/departments` - Get all departments
- `POST /api/admin/departments` - Create department
- `PUT /api/admin/departments/:id` - Update department
- `DELETE /api/admin/departments/:id` - Delete department

### News/Announcements
- `GET /api/admin/news` - Get all news/announcements
- `POST /api/admin/news` - Create news/announcement
- `PUT /api/admin/news/:id` - Update news/announcement
- `DELETE /api/admin/news/:id` - Delete news/announcement

### Contact Messages
- `GET /api/admin/contacts` - Get all contact messages
- `DELETE /api/admin/contacts/:id` - Delete contact message

### Settings
- `GET /api/admin/settings` - Get system settings
- `PUT /api/admin/settings` - Update system settings

### Languages
- `GET /api/admin/languages` - Get all languages
- `POST /api/admin/languages` - Create language
- `PUT /api/admin/languages/:id` - Update language
- `DELETE /api/admin/languages/:id` - Delete language

### UI Translations
- `GET /api/admin/ui-translations` - Get all UI translations
- `POST /api/admin/ui-translations` - Create UI translation
- `PUT /api/admin/ui-translations/:id` - Update UI translation
- `DELETE /api/admin/ui-translations/:id` - Delete UI translation

### Hero Sliders
- `GET /api/admin/hero-sliders` - Get all hero sliders
- `POST /api/admin/hero-sliders` - Create hero slider
- `PUT /api/admin/hero-sliders/:id` - Update hero slider
- `DELETE /api/admin/hero-sliders/:id` - Delete hero slider

### City Stats
- `GET /api/admin/city-stats` - Get all city statistics
- `POST /api/admin/city-stats` - Create city stat
- `PUT /api/admin/city-stats/:id` - Update city stat
- `DELETE /api/admin/city-stats/:id` - Delete city stat

### Services
- `GET /api/admin/services` - Get all services
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/:id` - Update service
- `DELETE /api/admin/services/:id` - Delete service

### Subscribers
- `GET /api/admin/subscribers` - Get all subscribers
- `DELETE /api/admin/subscribers/:id` - Delete subscriber

### File Upload
- `POST /api/admin/upload` - Upload files (images, documents)

---

## ⚠️ DATABASE EXISTS BUT NO ENDPOINTS

These tables exist in the database but need endpoints added to `adminRoutes.js`:

### Projects (Table exists!)
**Needed endpoints:**
- `GET /api/admin/projects` - Get all projects
- `GET /api/admin/projects/:id` - Get single project
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

**Database columns:** id, title, description, image, start_date, end_date, status

### Documents (Table exists!)
**Needed endpoints:**
- `GET /api/admin/documents` - Get all documents
- `GET /api/admin/documents/:id` - Get single document
- `POST /api/admin/documents` - Create document
- `PUT /api/admin/documents/:id` - Update document
- `DELETE /api/admin/documents/:id` - Delete document

**Database columns:** id, title, file, category, uploaded_by, created_at

---

## ❌ MISSING FROM DATABASE & BACKEND

### Events
**Need to add:**
1. Create events table in database
2. Add endpoints to adminRoutes.js

**Suggested table structure:**
```sql
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    location VARCHAR(255),
    organizer VARCHAR(255),
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    attendees INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Needed endpoints:**
- `GET /api/admin/events`
- `POST /api/admin/events`
- `PUT /api/admin/events/:id`
- `DELETE /api/admin/events/:id`

### Reports/Analytics
**Need to add:**
- `GET /api/admin/reports/statistics` - Dashboard statistics
- `GET /api/admin/reports/department-performance` - Department metrics
- `GET /api/admin/reports/activities` - Recent activities

---

## 🔧 WHAT BACKEND TEAM NEEDS TO DO

### Priority 1: Add Missing Endpoints (Tables exist)
Add to `src/routes/adminRoutes.js` and `src/controllers/adminController.js`:

1. **Projects endpoints** (table exists, just add CRUD routes)
2. **Documents endpoints** (table exists, just add CRUD routes)

### Priority 2: Add Events Feature
1. Run migration to create events table
2. Add events endpoints to adminRoutes.js
3. Add events controller methods

### Priority 3: Add Reports/Analytics
1. Add report calculation logic
2. Add report endpoints

---

## 📝 Backend Configuration

**Base URL:** `http://localhost:5001/api`

**Database:** TiDB Cloud (already configured)
- Host: gateway01.eu-central-1.prod.aws.tidbcloud.com
- Port: 4000
- Database: Jinka_cms

**Authentication:** JWT Bearer Token
- Login: `POST /api/public/login`
- Returns: `{ token: "...", user: {...} }`
- Use in headers: `Authorization: Bearer <token>`

---

## 🎯 Admin Panel Status

**Working Now (with backend):**
- ✅ Login/Authentication
- ✅ Departments Management
- ✅ Announcements (News)
- ✅ Messages (Contact forms)
- ✅ Settings
- ✅ File Uploads

**Needs Backend Endpoints:**
- ⚠️ Projects (table exists)
- ⚠️ Documents (table exists)
- ❌ Events (needs table + endpoints)
- ❌ Reports (needs endpoints)
