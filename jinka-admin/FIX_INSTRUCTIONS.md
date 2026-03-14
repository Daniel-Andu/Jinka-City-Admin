# HOW TO FIX THE BACKEND AND MAKE EVERYTHING WORK

## Problem
The backend controller expects different database tables/columns than what exists in the database. This causes all Create/Update/Delete operations to fail with errors like:
- "Failed to save department"
- "Failed to delete department"
- "Failed to create announcement"

## Solution
Run the schema fix script to add missing tables and columns.

---

## STEP 1: Run the Schema Fix

### Option A: Using Node.js Script (RECOMMENDED)

```bash
# Navigate to backend folder
cd jinka-backend

# Run the fix script
node run-fix-schema.js
```

This will:
- Create missing tables (departments, city_stats, languages, ui_translations, subscribers)
- Add missing columns to existing tables (news, services)
- Insert sample data for testing

### Option B: Using MySQL Command Line

```bash
# Navigate to backend folder
cd jinka-backend

# Run the SQL file directly
mysql -h your_host -u your_user -p Jinka_cms < fix-schema.sql
```

---

## STEP 2: Verify the Fix

After running the fix, test these operations in the admin panel:

### Test Departments
1. Go to Departments page
2. Click "Add Department"
3. Fill in: Name, Description, Icon, Status
4. Click Create
5. ✅ Should see "Department created successfully"
6. Try editing and deleting

### Test Announcements
1. Go to Announcements page
2. Click "Add Announcement"
3. Fill in: Title, Content, Image URL, Published Date, Status
4. Click Create
5. ✅ Should see "Announcement created successfully"
6. Try editing and deleting

### Test Messages
1. Go to Messages page
2. ✅ Should see "Connected to backend database (0 messages)"
3. Messages will appear when customers submit contact form on public website

---

## STEP 3: What Changed

### New Tables Created:
1. **departments** - For managing city departments
2. **city_stats** - For homepage statistics (population, area, etc.)
3. **languages** - For multi-language support (English, Amharic)
4. **ui_translations** - For translating UI text
5. **subscribers** - For newsletter subscribers

### Existing Tables Updated:
1. **news** - Added `published_at` and `is_active` columns
2. **services** - Added `link` and `is_active` columns

### Sample Data Inserted:
- 2 languages (English, Amharic)
- 5 sample departments
- 4 sample city stats

---

## STEP 4: Understanding the Schema

### Departments Table
```sql
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(255),        -- Department name
    description TEXT,         -- Department description
    icon VARCHAR(255),        -- Icon name (e.g., 'BankOutlined')
    is_active BOOLEAN,        -- Active/Inactive status
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### News Table (Used for Announcements)
```sql
CREATE TABLE news (
    id INT PRIMARY KEY,
    title VARCHAR(255),           -- Announcement title
    content LONGTEXT,             -- Announcement content
    featured_image VARCHAR(255),  -- Image URL
    published_at TIMESTAMP,       -- NEW: Publication date
    is_active BOOLEAN,            -- NEW: Active/Inactive status
    created_at TIMESTAMP
);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
    id INT PRIMARY KEY,
    name VARCHAR(120),      -- Customer name
    email VARCHAR(120),     -- Customer email
    subject VARCHAR(200),   -- Message subject
    message TEXT,           -- Message content
    created_at TIMESTAMP
);
```

---

## STEP 5: API Endpoints Reference

All endpoints require authentication token in header:
```
Authorization: Bearer <your_token>
```

### Departments
- GET `/api/admin/departments` - Get all departments
- POST `/api/admin/departments` - Create department
  ```json
  {
    "name": "Civil Registry",
    "description": "Birth certificates and ID services",
    "icon": "BankOutlined",
    "is_active": true
  }
  ```
- PUT `/api/admin/departments/:id` - Update department
- DELETE `/api/admin/departments/:id` - Delete department

### Announcements (News)
- GET `/api/admin/news` - Get all announcements
- POST `/api/admin/news` - Create announcement
  ```json
  {
    "title": "City Council Meeting",
    "content": "Meeting details...",
    "featured_image": "https://example.com/image.jpg",
    "published_at": "2026-03-15 10:00:00",
    "is_active": true
  }
  ```
- PUT `/api/admin/news/:id` - Update announcement
- DELETE `/api/admin/news/:id` - Delete announcement

### Messages (Contact Messages)
- GET `/api/admin/contacts` - Get all messages
- DELETE `/api/admin/contacts/:id` - Delete message

---

## STEP 6: Troubleshooting

### Error: "Table doesn't exist"
- Make sure you ran `run-fix-schema.js` successfully
- Check that you're connected to the correct database

### Error: "Column not found"
- The fix script might not have run completely
- Try running it again or run the SQL file manually

### Error: "Failed to save department"
- Check browser console for detailed error
- Verify backend is running on port 5001
- Check that you're logged in (token is valid)

### Error: "Failed to load departments from backend"
- Backend might not be running
- Check `.env` file has correct database credentials
- Verify database connection with `node src/config/db.js`

---

## STEP 7: Next Steps

After fixing the schema:

1. ✅ Test all CRUD operations (Create, Read, Update, Delete)
2. ✅ Verify data persists after page refresh
3. ✅ Test with multiple users/sessions
4. ✅ Add more sample data for testing
5. ✅ Push changes to GitHub

---

## Files Modified

### Backend Files:
- `jinka-backend/fix-schema.sql` - SQL script to fix schema
- `jinka-backend/run-fix-schema.js` - Node.js script to run fix

### Admin Panel Files:
- `jinka-admin/src/pages/departments/Departments.jsx` - Updated to match backend
- `jinka-admin/src/pages/announcements/Announcements.jsx` - Updated to match backend
- `jinka-admin/src/pages/messages/Messages.jsx` - Updated to match backend
- `jinka-admin/src/services/announcements.js` - Uses `/admin/news` endpoint

---

## Summary

The admin panel is now correctly configured to work with the backend. Once you run the schema fix script, all CRUD operations will work immediately:

✅ Departments - Create, Read, Update, Delete
✅ Announcements - Create, Read, Update, Delete  
✅ Messages - Read, Delete (customers create via contact form)
✅ All data persists in database
✅ All operations match backend controller expectations

Run `node run-fix-schema.js` in the backend folder and you're done! 🎉
