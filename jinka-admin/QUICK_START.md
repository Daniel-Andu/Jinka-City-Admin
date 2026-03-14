# Quick Start Guide

## Current Status

✅ **Admin Panel is running:** http://localhost:3001/
✅ **Backend API:** http://localhost:5001/api
✅ **Services configured and ready**

---

## Test the Admin Panel

### 1. Start Backend (if not running)
```bash
cd path/to/jinka-city-api
npm run dev
```
Backend should start on port 5001.

### 2. Admin Panel is Already Running
Open your browser: **http://localhost:3001/**

### 3. Test Login
Use the credentials from backend:
- **Email:** admin@jinkacity.gov.et
- **Password:** admin123

---

## What Works Now

### ✅ Fully Functional (Backend Ready)
1. **Login** - Authentication with JWT
2. **Departments** - Full CRUD operations
3. **Announcements** - Create/Edit/Delete news
4. **Messages** - View contact messages from customers
5. **Settings** - Update system settings
6. **File Upload** - Upload images and files

### ⚠️ Frontend Ready, Backend Needs Endpoints
7. **Projects** - UI ready, table exists, needs endpoints
8. **Documents** - UI ready, table exists, needs endpoints

### ❌ Needs Backend Work
9. **Events** - Needs table + endpoints
10. **Reports** - Needs analytics endpoints

---

## Testing Checklist

- [ ] Open http://localhost:3001/
- [ ] Login with admin credentials
- [ ] Navigate to Dashboard
- [ ] Test Departments page (should work with backend)
- [ ] Test Announcements page (should work with backend)
- [ ] Test Messages page (should work with backend)
- [ ] Test Settings page (should work with backend)
- [ ] Check Projects page (UI works, but no backend data yet)
- [ ] Check Events page (UI works, but no backend data yet)
- [ ] Check Documents page (UI works, but no backend data yet)

---

## Environment Configuration

The `.env` file is already configured for local development:
```
VITE_API_URL=http://localhost:5001/api
VITE_CUSTOMER_PAGE_URL=http://localhost:3000
VITE_ENV=development
```

---

## Next Steps

### For Backend Team:
1. Add Projects endpoints to `adminRoutes.js`
2. Add Documents endpoints to `adminRoutes.js`
3. Create Events table and endpoints
4. Add Reports/Analytics endpoints

### For Testing:
1. Test all working features with real backend
2. Report any bugs or issues
3. Once backend adds missing endpoints, test those features

---

## Common Issues

### CORS Errors
If you see CORS errors, make sure backend has CORS enabled for `http://localhost:3001`

### 401 Unauthorized
- Check if backend is running
- Try logging in again
- Check if JWT token is valid

### Connection Refused
- Make sure backend is running on port 5001
- Check `.env` file has correct API URL

---

## File Structure

```
jinka-admin/
├── src/
│   ├── services/          # API integration
│   │   ├── api.js         # Axios config
│   │   ├── auth.js        # Login/logout
│   │   ├── departments.js # Departments CRUD
│   │   ├── announcements.js # News CRUD
│   │   ├── messages.js    # Contact messages
│   │   ├── projects.js    # Projects (needs backend)
│   │   ├── events.js      # Events (needs backend)
│   │   ├── documents.js   # Documents (needs backend)
│   │   ├── reports.js     # Reports (needs backend)
│   │   ├── settings.js    # Settings
│   │   └── upload.js      # File uploads
│   ├── pages/             # All admin pages
│   └── components/        # Reusable components
├── .env                   # Environment config
└── BACKEND_ENDPOINTS_STATUS.md  # API status
```

---

## Support

If you encounter any issues:
1. Check browser console for errors
2. Check backend logs
3. Verify `.env` configuration
4. Make sure both servers are running
