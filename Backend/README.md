# Jinka CMS Backend API

## Overview
This backend provides APIs for the Jinka City Administration website, including public content delivery and admin management.

## Authentication
Admin endpoints require JWT authentication. Login via `POST /api/public/login` to get a token, then include `Authorization: Bearer <token>` in headers.

## Public Endpoints
- `GET /api/public/bootstrap` - Get site settings and translations
- `GET /api/public/ui-texts` - Get UI translations
- `GET /api/public/hero` - Get hero slides
- `GET /api/public/stats` - Get city stats
- `GET /api/public/departments` - Get departments
- `GET /api/public/services` - Get services
- `GET /api/public/news` - Get news
- `POST /api/public/contact` - Submit contact form
- `POST /api/public/subscribe` - Subscribe to newsletter
- `POST /api/public/login` - Admin login (returns JWT token)

## Admin Endpoints (Require Auth)
All admin routes require `Authorization: Bearer <token>` header.

### Settings
- `GET /api/admin/settings` - Get settings
- `PUT /api/admin/settings` - Update settings (body: {id, ...fields})

### Languages
- `GET /api/admin/languages` - List languages
- `POST /api/admin/languages` - Create language
- `PUT /api/admin/languages/:id` - Update language
- `DELETE /api/admin/languages/:id` - Delete language

### UI Translations
- `GET /api/admin/ui-translations` - List translations
- `POST /api/admin/ui-translations` - Create translation
- `PUT /api/admin/ui-translations/:id` - Update translation
- `DELETE /api/admin/ui-translations/:id` - Delete translation

### Hero Sliders
- `GET /api/admin/hero-sliders` - List sliders
- `POST /api/admin/hero-sliders` - Create slider
- `PUT /api/admin/hero-sliders/:id` - Update slider
- `DELETE /api/admin/hero-sliders/:id` - Delete slider

### City Stats
- `GET /api/admin/city-stats` - List stats
- `POST /api/admin/city-stats` - Create stat
- `PUT /api/admin/city-stats/:id` - Update stat
- `DELETE /api/admin/city-stats/:id` - Delete stat

### Departments
- `GET /api/admin/departments` - List departments
- `POST /api/admin/departments` - Create department
- `PUT /api/admin/departments/:id` - Update department
- `DELETE /api/admin/departments/:id` - Delete department

### Services
- `GET /api/admin/services` - List services
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/:id` - Update service
- `DELETE /api/admin/services/:id` - Delete service

### News
- `GET /api/admin/news` - List news
- `POST /api/admin/news` - Create news
- `PUT /api/admin/news/:id` - Update news
- `DELETE /api/admin/news/:id` - Delete news

### Subscribers
- `GET /api/admin/subscribers` - List subscribers
- `DELETE /api/admin/subscribers/:id` - Delete subscriber

### Contacts
- `GET /api/admin/contacts` - List contact messages
- `DELETE /api/admin/contacts/:id` - Delete contact

### File Upload
- `POST /api/admin/upload` - Upload file (multipart/form-data, field: 'file')

## Setup
1. Install dependencies: `npm install`
2. Set up database with migrations in `migrations/`
3. Configure `.env` with DB credentials and `JWT_SECRET`
4. Run: `npm run dev`

## Deployment
Deploy to Heroku, Railway, or similar. Set env vars in platform dashboard.