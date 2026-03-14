# Backend TODO - Missing Endpoints

This document tells the backend team exactly what to add to make all admin panel features work.

---

## 🔴 PRIORITY 1: Projects Endpoints

**Database:** ✅ Table already exists!

**Add to `src/routes/adminRoutes.js`:**

```javascript
// Projects
router.get('/projects', adminController.getProjects);
router.get('/projects/:id', adminController.getProject);
router.post('/projects', adminController.createProject);
router.put('/projects/:id', adminController.updateProject);
router.delete('/projects/:id', adminController.deleteProject);
```

**Add to `src/controllers/adminController.js`:**

```javascript
// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const [projects] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single project
exports.getProject = async (req, res) => {
  try {
    const [projects] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(projects[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create project
exports.createProject = async (req, res) => {
  try {
    const { title, description, image, start_date, end_date, status } = req.body;
    const [result] = await db.query(
      'INSERT INTO projects (title, description, image, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, image, start_date, end_date, status || 'Planning']
    );
    res.status(201).json({ id: result.insertId, message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { title, description, image, start_date, end_date, status } = req.body;
    await db.query(
      'UPDATE projects SET title = ?, description = ?, image = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?',
      [title, description, image, start_date, end_date, status, req.params.id]
    );
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## 🔴 PRIORITY 2: Documents Endpoints

**Database:** ✅ Table already exists!

**Add to `src/routes/adminRoutes.js`:**

```javascript
// Documents
router.get('/documents', adminController.getDocuments);
router.get('/documents/:id', adminController.getDocument);
router.post('/documents', adminController.createDocument);
router.put('/documents/:id', adminController.updateDocument);
router.delete('/documents/:id', adminController.deleteDocument);
```

**Add to `src/controllers/adminController.js`:**

```javascript
// Get all documents
exports.getDocuments = async (req, res) => {
  try {
    const [documents] = await db.query('SELECT * FROM documents ORDER BY created_at DESC');
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single document
exports.getDocument = async (req, res) => {
  try {
    const [documents] = await db.query('SELECT * FROM documents WHERE id = ?', [req.params.id]);
    if (documents.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(documents[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create document
exports.createDocument = async (req, res) => {
  try {
    const { title, file, category, uploaded_by } = req.body;
    const [result] = await db.query(
      'INSERT INTO documents (title, file, category, uploaded_by) VALUES (?, ?, ?, ?)',
      [title, file, category, uploaded_by || req.user.id]
    );
    res.status(201).json({ id: result.insertId, message: 'Document created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update document
exports.updateDocument = async (req, res) => {
  try {
    const { title, file, category } = req.body;
    await db.query(
      'UPDATE documents SET title = ?, file = ?, category = ? WHERE id = ?',
      [title, file, category, req.params.id]
    );
    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    await db.query('DELETE FROM documents WHERE id = ?', [req.params.id]);
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## 🟡 PRIORITY 3: Events Feature

**Database:** ❌ Table doesn't exist - need to create it first!

### Step 1: Create Events Table

Run this SQL migration:

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

### Step 2: Add Routes

**Add to `src/routes/adminRoutes.js`:**

```javascript
// Events
router.get('/events', adminController.getEvents);
router.get('/events/:id', adminController.getEvent);
router.post('/events', adminController.createEvent);
router.put('/events/:id', adminController.updateEvent);
router.delete('/events/:id', adminController.deleteEvent);
```

### Step 3: Add Controllers

**Add to `src/controllers/adminController.js`:**

```javascript
// Get all events
exports.getEvents = async (req, res) => {
  try {
    const [events] = await db.query('SELECT * FROM events ORDER BY start_date DESC');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single event
exports.getEvent = async (req, res) => {
  try {
    const [events] = await db.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(events[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, image, location, organizer, start_date, end_date, attendees } = req.body;
    const [result] = await db.query(
      'INSERT INTO events (title, description, image, location, organizer, start_date, end_date, attendees) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, image, location, organizer, start_date, end_date, attendees || 0]
    );
    res.status(201).json({ id: result.insertId, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, image, location, organizer, start_date, end_date, attendees } = req.body;
    await db.query(
      'UPDATE events SET title = ?, description = ?, image = ?, location = ?, organizer = ?, start_date = ?, end_date = ?, attendees = ? WHERE id = ?',
      [title, description, image, location, organizer, start_date, end_date, attendees, req.params.id]
    );
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    await db.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## 🟢 PRIORITY 4: Reports/Analytics (Optional)

These are nice-to-have for dashboard statistics.

**Add to `src/routes/adminRoutes.js`:**

```javascript
// Reports
router.get('/reports/statistics', adminController.getStatistics);
router.get('/reports/department-performance', adminController.getDepartmentPerformance);
router.get('/reports/activities', adminController.getActivities);
```

**Add to `src/controllers/adminController.js`:**

```javascript
// Get dashboard statistics
exports.getStatistics = async (req, res) => {
  try {
    const [projectCount] = await db.query('SELECT COUNT(*) as count FROM projects');
    const [newsCount] = await db.query('SELECT COUNT(*) as count FROM news');
    const [departmentCount] = await db.query('SELECT COUNT(*) as count FROM departments');
    const [messageCount] = await db.query('SELECT COUNT(*) as count FROM contact_messages');
    
    res.json({
      projects: projectCount[0].count,
      news: newsCount[0].count,
      departments: departmentCount[0].count,
      messages: messageCount[0].count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get department performance (placeholder - customize as needed)
exports.getDepartmentPerformance = async (req, res) => {
  try {
    const [departments] = await db.query('SELECT * FROM departments');
    // Add your performance calculation logic here
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent activities (placeholder - customize as needed)
exports.getActivities = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const [activities] = await db.query(
      'SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?',
      [parseInt(limit)]
    );
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

---

## Testing After Implementation

After adding each endpoint, test with:

```bash
# Test Projects
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5001/api/admin/projects

# Test Documents
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5001/api/admin/documents

# Test Events
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5001/api/admin/events
```

Or use the admin panel at http://localhost:3001/ to test visually.

---

## Summary

1. ✅ **Projects** - Just add routes + controllers (table exists)
2. ✅ **Documents** - Just add routes + controllers (table exists)
3. ⚠️ **Events** - Create table first, then add routes + controllers
4. 📊 **Reports** - Optional, add if you want dashboard analytics

Once these are done, the entire admin panel will be fully functional!
