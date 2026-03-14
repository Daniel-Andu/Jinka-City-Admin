# Backend Fix Guide (Jinka CMS)

This document summarizes the backend/database issues that are currently causing 500 errors and broken frontend behavior. It is intended for the backend team to fix server-side logic and database constraints.

## 1) SQL Syntax Error: `? WHERE id = ?`

### Symptoms (seen in browser console):
- `You have an error in your SQL syntax; check the manual that corresponds to your TiDB version for the right syntax to use line 1 column 17 near "? WHERE id = ?"`

### Likely Cause:
The backend is building update queries using a placeholder syntax like:

```sql
UPDATE table SET ? WHERE id = ?
```

This works in some MySQL libraries (e.g., older mysql2) but **TiDB does not support `SET ?` placeholder syntax**.

### Recommended Fix:
The backend should generate explicit column assignments, e.g.:

```sql
UPDATE table SET column1 = ?, column2 = ? WHERE id = ?
```

or use a query builder/ORM that expands objects into column assignments.

---

## 2) Foreign key constraint prevents deletion (services, news, categories, stats, etc.)

### Symptoms (seen in browser console):
- `Cannot delete or update a parent row: a foreign key constraint fails (...)`
- Seen when deleting: **services**, **news**, **news categories**, **city stats** (and likely others).
- Example: `FOREIGN KEY (service_id) REFERENCES services (id)`.

### Why it happens:
The backend attempts to delete a parent row while child rows still exist (e.g., news items referencing a category, translations referencing a service, stats translations referencing stats).

### Options to fix:
1. **Soft deletes**: keep the row and mark as inactive instead of deleting, so child rows remain valid.
2. **Cascade delete**: add `ON DELETE CASCADE` to the foreign key so related rows are deleted automatically.
3. **Pre-check/clear dependencies**: backend should check for child records and either delete them first or refuse with a clear message explaining which table is blocking.

---

## 3) Missing `site_visits` table (Analytics)

### Symptoms:
- `Table 'jinka_cms.site_visits' doesn't exist`
- Happens when calling: `/api/admin/analytics/visitors` and `/api/admin/analytics/visitors/series`

### Fix:
Run the migration that creates the `site_visits` table. In this repo there is a migration file called `migrations/005_add_site_visits.sql`. Ensure it runs successfully against the database.

---

## 4) SQL Placeholder syntax (`? WHERE id = ?`) - affects many update endpoints

### Symptoms (seen in backend errors):
- `You have an error in your SQL syntax; ... near "? WHERE id = ?"`
- Seen in: `news-categories`, `leaders`, `page-hero-slides`, `department-translations`, `service-translations`, `news-translations`, `news-category-translations`, etc.

### Likely cause:
The backend is building update queries like:

```sql
UPDATE table SET ? WHERE id = ?
```

This works in some MySQL libraries but not in TiDB.

### Recommended fix:
Generate explicit SET clauses, e.g.:

```sql
UPDATE table SET name = ?, description = ? WHERE id = ?
```

Or use a query builder/ORM that correctly expands objects into column assignments.

---

## 5) Null/undefined binding errors during CREATE/UPDATE

### Symptoms:
- `Bind parameters must not contain undefined. To pass SQL NULL specify JS null`
- Seen when creating a `news tag` (and likely other endpoints).

### Fix:
Ensure the backend does not pass `undefined` to the database driver. Convert missing fields to `null` or remove them entirely before binding.

---

## 6) Hero Sliders page blank (frontend crash)

### Symptoms:
- Blank page at `/hero-sliders` (frontend fails to render the component)

### Cause:
Previously the frontend code was importing `InputNumber` but not using it, which caused a crash on build. That has been fixed in the frontend, but if the backend returns invalid JSON or the request fails hard, it can still be blank.

### Frontend mitigation:
- The frontend now catches failures on data load and displays an error toast instead of crashing.

---

## What the backend team should do right now

1. **Run all migrations** (especially the `site_visits` migration).
2. **Fix the `UPDATE ... SET ?` query generation** across all controllers.
3. **Fix the foreign key constraints** so deletes either cascade or are blocked with a clear message.
4. **Ensure all APIs return a consistent error object**: `{ error: '...', message: '...' }`.

If you want, I can also provide a small “expected request/response” list for each affected endpoint so you can test the API directly with Postman.

---

## 3) Consistency of API response shape

### Issue:
The frontend expects auth responses to be either:
- `{ token, user }` or
- `{ data: { token, user } }`

But some backend endpoints might be returning nested objects (e.g., `{ data: { data: { token, user }}}`).

### Recommendation:
Standardize JSON responses for authentication endpoints to always return:

```json
{
  "token": "...",
  "user": { ... }
}
```

---

## 4) Backend should return consistent error body

### Desired behavior:
All 400/500 errors should return a JSON body with at least one of:
- `{ "message": "..." }`
- `{ "error": "..." }`
- `{ "errors": [ ... ] }`

This makes it much easier for the frontend to display user-friendly messages.

---

## 5) Prevent unhandled exceptions on update/create

### Problem:
Many endpoints are returning generic `500` errors when payloads contain unexpected fields (e.g., `id`, null values, empty strings).

### Suggestion:
- Validate incoming payloads and return `400 Bad Request` with a clear message about missing/invalid fields.
- Strip unused fields before using them in SQL.

---

## Summary
Fixing the above backend issues will remove the following frontend symptoms:
- White page / crashed views (e.g., hero-sliders page due to frontend runtime errors)
- `500 Internal Server Error` on create/update/delete
- `401 Unauthorized` when the frontend is correctly sending a valid JWT token

If you want, I can also provide a minimal example of the expected backend API behavior for one resource (e.g., `news` or `city-stats`) to match the frontend requests.
