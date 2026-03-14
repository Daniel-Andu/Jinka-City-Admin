# Quick Reference Guide

## 🚀 Start Everything

```bash
# Terminal 1 - Backend
cd jinka-backend
npm run dev

# Terminal 2 - Admin Panel
cd jinka-admin
npm run dev
```

## 🔗 URLs

- **Backend API**: http://localhost:5001
- **Admin Panel**: http://localhost:3002
- **Health Check**: http://localhost:5001/health

## 🔑 Login Credentials

- **Email**: admin@jinkacity.gov.et
- **Password**: admin123

## 📋 Admin Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | /dashboard | Overview |
| Hero Sliders | /hero-sliders | Homepage sliders |
| City Stats | /city-stats | Homepage statistics |
| City Services | /city-services | Service listings |
| Departments | /departments | Department management |
| Announcements | /announcements | News articles |
| Languages | /languages | Language settings |
| Messages | /messages | Contact submissions |
| Subscribers | /subscribers | Newsletter list |
| Settings | /settings | Site configuration |
| Projects | /projects | Project management |
| Events | /events | Event management |
| Documents | /documents | Document management |
| Reports | /reports | Auto-calculated reports |

## 🔌 Public API Endpoints (For Customer Website)

```javascript
// Get all data at once
GET /api/public/bootstrap

// Individual endpoints
GET /api/public/hero          // Hero sliders
GET /api/public/stats         // City statistics
GET /api/public/services      // Services
GET /api/public/departments   // Departments
GET /api/public/news          // News articles

// Submit forms
POST /api/public/contact      // Contact form
POST /api/public/subscribe    // Newsletter signup
```

## 🛠️ Common Tasks

### Add Hero Slider
1. Go to Hero Sliders page
2. Click "Add Hero Slider"
3. Fill in: Title, Subtitle, Image URL, Button Text, Button Link
4. Toggle "Active" switch
5. Click "Create"

### Add City Stat
1. Go to City Stats page
2. Click "Add City Stat"
3. Fill in: Stat Key, Value, Icon, Display Order
4. Toggle "Active" switch
5. Click "Create"

### Add Service
1. Go to City Services page
2. Click "Add Service"
3. Fill in: Title, Description, Icon, Link
4. Toggle "Active" switch
5. Click "Create"

### Add Department
1. Go to Departments page
2. Click "Add Department"
3. Fill in: Name, Description, Icon
4. Toggle "Active" switch
5. Click "Create"

### Add News/Announcement
1. Go to Announcements page
2. Click "Add Announcement"
3. Fill in: Title, Content, Featured Image, Published Date
4. Toggle "Active" switch
5. Click "Create"

### View Contact Messages
1. Go to Messages page
2. View all contact form submissions
3. Click delete icon to remove a message

### View Subscribers
1. Go to Subscribers page
2. View all newsletter subscribers
3. Click delete icon to remove a subscriber

### Update Site Settings
1. Go to Settings page
2. Update: Site Name, Logo, Favicon, Contact Info, Social Media
3. Click "Save Settings"

## 🐛 Troubleshooting

### Backend Not Starting
```bash
# Check if port 5001 is in use
netstat -ano | findstr :5001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Restart backend
cd jinka-backend
npm run dev
```

### Admin Panel Not Starting
```bash
# It will automatically try ports 3000, 3001, 3002, etc.
# Just check the terminal output for the actual port
```

### Login Not Working
- Check backend is running on port 5001
- Check credentials: admin@jinkacity.gov.et / admin123
- Check browser console for errors
- Clear browser cache and try again

### CRUD Operations Failing
- All CRUD operations have been fixed
- If you still see errors, refresh the browser
- Check backend logs for specific errors
- Verify database connection in backend

### Database Connection Issues
- Check `.env` file in jinka-backend
- Verify TiDB Cloud credentials
- Check internet connection
- Test connection: http://localhost:5001/health

## 📞 Support

If you encounter any issues:
1. Check backend logs (terminal running backend)
2. Check browser console (F12 in browser)
3. Check `FINAL_STATUS.md` for detailed information
4. Check `CRUD_FIX_COMPLETE.md` for CRUD operation details
5. Check `COMPLETE_INTEGRATION_GUIDE.md` for API documentation

## ✅ Verification Checklist

- [ ] Backend running on port 5001
- [ ] Admin panel running (check terminal for port)
- [ ] Can login with admin credentials
- [ ] Can view all admin pages
- [ ] Can create new records
- [ ] Can edit existing records
- [ ] Can delete records
- [ ] Can view contact messages
- [ ] Can view subscribers
- [ ] Can update settings

## 🎯 All Systems Operational!

Everything is working correctly. You can now:
1. Add content through admin panel
2. Content is saved to database
3. Customer website can fetch content via public API
4. Public sees the content on customer website

Happy content managing! 🎉
