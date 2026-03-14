# ⚠️ CRITICAL: Database Schema Mismatch

## The Problem

There are **TWO DIFFERENT** database schemas in your backend:

### Schema 1: Simple (from base-schema.sql and adminController.js)
```sql
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    icon VARCHAR(255),
    is_active BOOLEAN
);
```

### Schema 2: Complex (from migrations/001_add_dynamic_tables.sql)
```sql
CREATE TABLE departments (
    id INT PRIMARY KEY,
    slug VARCHAR(150) UNIQUE,
    icon VARCHAR(120),
    color VARCHAR(20),
    order_number INT,
    is_active BOOLEAN
);

CREATE TABLE department_translations (
    id INT PRIMARY KEY,
    department_id INT,
    language_id INT,
    name VARCHAR(200),
    description TEXT
);
```

## Current Situation

- **Database has:** Complex schema (from migrations)
- **Controller expects:** Simple schema
- **Result:** Create/Update/Delete operations FAIL

## The Fix (Choose ONE)

### Option A: Use Simple Schema (Easiest)

1. Drop the migration tables:
```sql
DROP TABLE IF EXISTS department_translations;
DROP TABLE IF EXISTS departments;
```

2. Keep only the base schema (already exists from base-schema.sql)

3. Controller will work as-is

### Option B: Update Controller for Complex Schema (Better for multilingual)

Update `adminController.js`:

```javascript
// Get departments with translations
async function getDepartments(req, res, next) {
  try {
    const lang = req.query.lang || 'en';
    const departments = await query(`
      SELECT d.id, d.slug, d.icon, d.color, d.order_number, d.is_active,
             dt.name, dt.description
      FROM departments d
      LEFT JOIN department_translations dt ON d.id = dt.department_id
      LEFT JOIN languages l ON dt.language_id = l.id
      WHERE l.code = ?
      ORDER BY d.order_number
    `, [lang]);
    res.json(departments);
  } catch (err) {
    next(err);
  }
}

// Create department with translations
async function createDepartment(req, res, next) {
  try {
    const { slug, icon, color, order_number, is_active, translations } = req.body;
    
    // Insert department
    const [result] = await query(
      'INSERT INTO departments (slug, icon, color, order_number, is_active) VALUES (?, ?, ?, ?, ?)',
      [slug, icon, color, order_number, is_active]
    );
    
    const departmentId = result.insertId;
    
    // Insert translations for each language
    for (const trans of translations) {
      await query(
        'INSERT INTO department_translations (department_id, language_id, name, description) VALUES (?, ?, ?, ?)',
        [departmentId, trans.language_id, trans.name, trans.description]
      );
    }
    
    res.status(201).json({ success: true, id: departmentId });
  } catch (err) {
    next(err);
  }
}

// Similar updates for updateDepartment and deleteDepartment
```

## Recommendation

**Use Option A (Simple Schema)** for now because:
- ✅ Faster to implement
- ✅ Controller already written
- ✅ Admin panel already updated
- ✅ Can add multilingual support later

**Use Option B (Complex Schema)** if you need:
- Multilingual department names/descriptions
- Better data structure for future
- More professional implementation

## Current Status

- ✅ Admin panel updated to work with simple schema
- ❌ Database has complex schema from migrations
- ❌ Controller expects simple schema
- **Action needed:** Backend team must choose Option A or B

## Quick Test

After fixing, test with:
```bash
# Login
curl -X POST http://localhost:5001/api/public/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jinkacity.gov.et","password":"admin123"}'

# Get departments (should work)
curl http://localhost:5001/api/admin/departments \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create department (should work)
curl -X POST http://localhost:5001/api/admin/departments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Dept","description":"Test","icon":"BankOutlined","is_active":true}'
```
