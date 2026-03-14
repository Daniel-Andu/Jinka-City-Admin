# Backend Integration Guide for Jinka Admin Panel

## 📋 Overview

This guide explains how your backend team should send you the API and how to integrate it with the admin panel and customer page.

---

## 🔄 How Your Team Should Send the API

### Option 1: API Documentation (Recommended)
Your backend team should provide:

1. **OpenAPI/Swagger Documentation**
   - URL: `https://api.jinka.gov.et/docs` or `https://api.jinka.gov.et/swagger`
   - This provides interactive API documentation
   - You can test endpoints directly

2. **Postman Collection**
   - A `.json` file with all API endpoints
   - Import into Postman to test APIs
   - Includes example requests and responses

3. **API Base URL**
   - Development: `http://localhost:8000` or `https://dev-api.jinka.gov.et`
   - Production: `https://api.jinka.gov.et`

### Option 2: Git Repository
Your backend team can:
- Push backend code to a separate branch: `backend/api`
- Or create a separate repository: `jinka-backend`
- Share the repository URL with you

### Option 3: Deployed API
- Backend team deploys API to a server
- Provides you with:
  - Base URL
  - Authentication credentials (API keys, test accounts)
  - Endpoint documentation

---

## 📦 What You Need from Backend Team

### 1. API Endpoints List
```
Authentication:
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

Departments:
- GET /api/departments
- POST /api/departments
- PUT /api/departments/:id
- DELETE /api/departments/:id

Announcements:
- GET /api/announcements
- POST /api/announcements
- PUT /api/announcements/:id
- DELETE /api/announcements/:id

Projects:
- GET /api/projects
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id

Events:
- GET /api/events
- POST /api/events
- PUT /api/events/:id
- DELETE /api/events/:id

Documents:
- GET /api/documents
- POST /api/documents (multipart/form-data)
- DELETE /api/documents/:id

Reports:
- GET /api/reports/statistics
- GET /api/reports/department-performance
- GET /api/reports/activities

Messages:
- GET /api/messages
- POST /api/messages
- DELETE /api/messages/:id

Settings:
- GET /api/settings
- PUT /api/settings
```

### 2. Authentication Details
- Token type (JWT, OAuth, API Key)
- Token expiration time
- Refresh token mechanism
- Test user credentials

### 3. Response Format
Example of expected response format:
```json
{
  "success": true,
  "data": [...],
  "total": 100,
  "page": 1,
  "pageSize": 10
}
```

### 4. Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {...}
  }
}
```

---

## 🔧 Integration Steps

### Step 1: Set Up Environment Variables

Create `.env.development` file:
```bash
VITE_API_URL=http://localhost:8000/api
VITE_CUSTOMER_PAGE_URL=http://localhost:3001
```

Create `.env.production` file:
```bash
VITE_API_URL=https://api.jinka.gov.et/api
VITE_CUSTOMER_PAGE_URL=https://jinka.gov.et
```

### Step 2: Update API Configuration

The API URL is already configured in `src/App.jsx`. Update it to use environment variables:

```javascript
const API_URL = import.meta.env.VITE_API_URL || "https://api.jinka.gov.et/api";
```

### Step 3: Test API Connection

1. Start your admin panel: `npm run dev`
2. Open browser console (F12)
3. Try to login
4. Check Network tab for API calls
5. Verify responses

### Step 4: Update API Services

All API service files are in `src/services/` folder. Update them with actual endpoints.

---

## 🔗 Connecting Admin Panel with Customer Page

### Scenario 1: Same Domain (Recommended)
```
Admin Panel: https://admin.jinka.gov.et
Customer Page: https://jinka.gov.et
API: https://api.jinka.gov.et
```

**Benefits:**
- Shared authentication
- No CORS issues
- Easy session management

### Scenario 2: Different Domains
```
Admin Panel: https://admin-jinka.netlify.app
Customer Page: https://jinka-customer.netlify.app
API: https://api.jinka.gov.et
```

**Requirements:**
- Backend must enable CORS
- Use JWT tokens for authentication
- Store tokens in localStorage

### Scenario 3: Monorepo (All in One)
```
project/
├── admin/          # Admin panel
├── customer/       # Customer page
├── backend/        # API
└── shared/         # Shared utilities
```

---

## 🔐 Authentication Flow

### Admin Panel → API
```
1. Admin logs in → POST /api/auth/login
2. API returns JWT token
3. Store token in localStorage
4. Send token in all requests: Authorization: Bearer {token}
5. On 401 error → Redirect to login
```

### Customer Page → API
```
1. Customer logs in → POST /api/auth/customer-login
2. API returns JWT token
3. Store token in localStorage
4. Customer can view public data
```

### Shared Data Between Admin & Customer
- Admin creates announcements → Customers see them
- Admin creates events → Customers can register
- Admin uploads documents → Customers can download

---

## 📁 Project Structure After Integration

```
jinka-admin/
├── src/
│   ├── services/           # API service files
│   │   ├── api.js         # Base API configuration
│   │   ├── auth.js        # Authentication APIs
│   │   ├── departments.js # Department APIs
│   │   ├── projects.js    # Project APIs
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.js     # Authentication hook
│   │   └── useApi.js      # API call hook
│   ├── utils/             # Utility functions
│   │   ├── token.js       # Token management
│   │   └── api-error.js   # Error handling
│   └── ...
├── .env.development       # Dev environment variables
├── .env.production        # Prod environment variables
└── ...
```

---

## 🧪 Testing Integration

### 1. Test Authentication
```bash
# Login test
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jinka.gov.et","password":"password"}'
```

### 2. Test Protected Endpoint
```bash
# Get departments
curl -X GET http://localhost:8000/api/departments \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Test CORS
Open browser console and run:
```javascript
fetch('http://localhost:8000/api/departments')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## 🚀 Deployment Strategy

### Option 1: Separate Deployments
```
Admin Panel → Vercel/Netlify
Customer Page → Vercel/Netlify
Backend API → AWS/Heroku/DigitalOcean
```

### Option 2: Same Server
```
Nginx Server:
├── /admin → Admin panel (port 3000)
├── / → Customer page (port 3001)
└── /api → Backend API (port 8000)
```

### Option 3: Docker Containers
```yaml
version: '3'
services:
  admin:
    build: ./admin
    ports: ["3000:3000"]
  customer:
    build: ./customer
    ports: ["3001:3001"]
  api:
    build: ./backend
    ports: ["8000:8000"]
```

---

## 📞 Communication with Backend Team

### Questions to Ask:

1. **API Documentation**
   - "Can you provide Swagger/OpenAPI documentation?"
   - "What's the base URL for development and production?"

2. **Authentication**
   - "What authentication method are you using?"
   - "How long do tokens last?"
   - "Is there a refresh token mechanism?"

3. **Data Format**
   - "What's the response format for success/error?"
   - "How is pagination handled?"
   - "What date format do you use?"

4. **File Uploads**
   - "What's the maximum file size?"
   - "What file types are allowed?"
   - "How should I send files (multipart/form-data)?"

5. **CORS**
   - "Is CORS enabled for our frontend domain?"
   - "What headers are allowed?"

6. **Rate Limiting**
   - "Are there any rate limits?"
   - "How many requests per minute?"

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
```
Error: Access to fetch at 'http://api.jinka.gov.et' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Solution:** Backend team needs to add CORS headers:
```javascript
// Express.js example
app.use(cors({
  origin: ['http://localhost:3000', 'https://admin.jinka.gov.et'],
  credentials: true
}));
```

### Issue 2: 401 Unauthorized
**Solution:** Check if token is being sent correctly:
```javascript
// In browser console
console.log(localStorage.getItem('token'));
```

### Issue 3: Network Error
**Solution:** Verify API is running:
```bash
curl http://localhost:8000/api/health
```

---

## 📚 Next Steps

1. ✅ Get API documentation from backend team
2. ✅ Set up environment variables
3. ✅ Test API endpoints with Postman
4. ✅ Update API services in admin panel
5. ✅ Test authentication flow
6. ✅ Test CRUD operations
7. ✅ Deploy to staging environment
8. ✅ Final testing
9. ✅ Deploy to production

---

## 💡 Tips

- Always use environment variables for API URLs
- Never commit `.env` files to Git
- Test APIs with Postman before integrating
- Use browser DevTools Network tab to debug
- Keep API documentation updated
- Use TypeScript for better type safety
- Implement proper error handling
- Add loading states for better UX

---

## 📧 Support

If you need help with integration:
1. Check this guide first
2. Review API documentation
3. Test with Postman
4. Check browser console for errors
5. Contact backend team with specific error messages
