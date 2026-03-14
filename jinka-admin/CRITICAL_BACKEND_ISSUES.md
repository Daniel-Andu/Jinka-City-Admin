# CRITICAL BACKEND ISSUES - MUST FIX

## Problem Summary
The backend `adminController.js` expects different database schemas than what exists in `base-schema.sql`. This causes ALL CRUD operations to fail.

## Issues Found

### 1. DEPARTMENTS TABLE - MISSING!
**Controller expects:**
```sql
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    icon VARCHAR(255),
    is_active BOOLEAN
);
```

**Base schema:** NO departments table exists!

**Fix:** Add this table to base-schema.sql

---

### 2. NEWS TABLE - SCHEMA MISMATCH
**Controller expects:**
```javascript
{ title, content, featured_image, published_at, is_active }
```

**Base schema has:**
```sql
CREATE TABLE news (
    title VARCHAR(255),
    slug VARCHAR(255),
    content LONGTEXT,
    featured_image VARCHAR(255),
    published_by INT,
    status ENUM('draft','published'),
    created_at TIMESTAMP
);
```

**Missing fields:** `published_at`, `is_active`
**Extra fields:** `slug`, `published_by`, `status`

**Fix Options:**
- A) Update controller to use existing schema
- B) Alter table to match controller expectations

---

### 3. SERVICES TABLE - SCHEMA MISMATCH
**Controller expects:**
```javascript
{ title, description, icon, link, is_active }
```

**Base schema has:**
```sql
CREATE TABLE services (
    title VARCHAR(200),
    description TEXT,
    icon VARCHAR(255),
    created_at TIMESTAMP
);
```

**Missing fields:** `link`, `is_active`

**Fix:** Alter table to add missing columns

---

### 4. CITY_STATS TABLE - MISSING!
**Controller expects:**
```sql
CREATE TABLE city_stats (
    id INT PRIMARY KEY,
    stat_key VARCHAR(255),
    value VARCHAR(255),
    icon VARCHAR(255),
    order_number INT,
    is_active BOOLEAN
);
```

**Base schema:** NO city_stats table exists!

**Fix:** Add this table to base-schema.sql

---

### 5. HERO_SLIDERS TABLE - SCHEMA MISMATCH
**Controller expects:**
```javascript
{ title, subtitle, button_text, button_link, image, is_active }
```

**Base schema has:**
```sql
CREATE TABLE hero_sliders (
    title VARCHAR(200),
    subtitle TEXT,
    image VARCHAR(255),
    button_text VARCHAR(100),
    button_link VARCHAR(255),
    is_active BOOLEAN,
    created_at TIMESTAMP
);
```

**Status:** ✓ MATCHES! (This one is correct)

---

### 6. CONTACT_MESSAGES TABLE
**Controller expects:**
```javascript
{ name, email, subject, message, created_at }
```

**Base schema has:**
```sql
CREATE TABLE contact_messages (
    name VARCHAR(120),
    email VARCHAR(120),
    subject VARCHAR(200),
    message TEXT,
    created_at TIMESTAMP
);
```

**Status:** ✓ MATCHES! (This one is correct)

---

### 7. LANGUAGES TABLE - MISSING!
**Controller expects:**
```sql
CREATE TABLE languages (
    id INT PRIMARY KEY,
    code VARCHAR(10),
    name VARCHAR(100),
    is_default BOOLEAN,
    is_active BOOLEAN
);
```

**Base schema:** NO languages table exists!

**Fix:** Add this table (exists in migrations but not base schema)

---

### 8. UI_TRANSLATIONS TABLE - MISSING!
**Controller expects:**
```sql
CREATE TABLE ui_translations (
    id INT PRIMARY KEY,
    language_id INT,
    translation_key VARCHAR(255),
    translation_value TEXT,
    value_type VARCHAR(50)
);
```

**Base schema:** NO ui_translations table exists!

**Fix:** Add this table (exists in migrations but not base schema)

---

## RECOMMENDED FIX STRATEGY

### Option A: Update Base Schema (RECOMMENDED)
Run this SQL to add missing tables and columns:

```sql
USE Jinka_cms;

-- Add departments table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add city_stats table
CREATE TABLE IF NOT EXISTS city_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stat_key VARCHAR(255) NOT NULL,
    value VARCHAR(255),
    icon VARCHAR(255),
    order_number INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add languages table
CREATE TABLE IF NOT EXISTS languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add ui_translations table
CREATE TABLE IF NOT EXISTS ui_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    language_id INT NOT NULL,
    translation_key VARCHAR(255) NOT NULL,
    translation_value TEXT,
    value_type VARCHAR(50) DEFAULT 'text',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
);

-- Alter news table
ALTER TABLE news 
    ADD COLUMN IF NOT EXISTS published_at TIMESTAMP NULL,
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Alter services table
ALTER TABLE services 
    ADD COLUMN IF NOT EXISTS link VARCHAR(255),
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Add subscribers table (used by controller)
CREATE TABLE IF NOT EXISTS subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Option B: Update Controller to Match Schema
Rewrite all controller functions to use existing schema fields. This is more work and requires testing all endpoints.

---

## CURRENT STATUS

### Working Pages (Schema Matches):
- ✓ Messages (contact_messages table)
- ✓ Hero Sliders (schema matches)

### Broken Pages (Schema Mismatch):
- ✗ Departments (table missing)
- ✗ Announcements/News (missing fields)
- ✗ Services (missing fields)
- ✗ City Stats (table missing)
- ✗ Languages (table missing)
- ✗ UI Translations (table missing)
- ✗ Subscribers (table missing)

---

## NEXT STEPS

1. **Backend Team**: Run the SQL script above to add missing tables and columns
2. **Test**: Try creating/updating/deleting departments and announcements
3. **Verify**: Check that all CRUD operations work correctly
4. **Document**: Update API documentation with correct schemas

---

## Admin Panel Status

The admin panel is now correctly configured to send data in the format the controller expects:

- Departments: `{ name, description, icon, is_active }`
- Announcements: `{ title, content, featured_image, published_at, is_active }`
- Messages: `{ name, email, subject, message }` (read-only)

Once the database schema is fixed, all CRUD operations will work immediately.
