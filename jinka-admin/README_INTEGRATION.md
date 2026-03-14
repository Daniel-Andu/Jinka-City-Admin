# 🚀 Quick Start: API Integration

## 📦 What Your Team Should Send You

Your backend team should provide:

### 1. **API Documentation** (Choose one)
- ✅ Swagger/OpenAPI URL: `https://api.jinka.gov.et/docs`
- ✅ Postman Collection file
- ✅ Written API documentation

### 2. **API URLs**
- Development: `http://localhost:8000/api`
- Production: `https://api.jinka.gov.et/api`

### 3. **Test Credentials**
```
Email: admin@jinka.gov.et
Password: test123
```

### 4. **Authentication Info**
- Token type: JWT
- Token expiration: 24 hours
- Refresh token: Yes/No

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Create Environment File
```bash
cd jinka-admin
cp .env.example .env.development
```

### Step 2: Update .env.development
```bash
VITE_API_URL=http://localhost:8000/api
VITE_CUSTOMER_PAGE_URL=http://localhost:3001
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Test Login
1. Open `http://localhost:3000/login`
2. Enter test credentials
3. Check browser console for API calls

---

## 📁 Files Created for You

```
jinka-admin/
├── src/
│   └── services/          # ✅ API service files
│       ├── api.js         # Base API configuration
│       ├── auth.js        # Authentication
│       ├── departments.js # Departments API
│       ├── projects.js    # Projects API
│       └── reports.js     # Reports API
├── .env.example           # ✅ Environment template
├── BACKEND_INTEGRATION_GUIDE.md  # ✅ Full integration guide
├── INTEGRATION_CHECKLIST.md      # ✅ Track your progress
├── USAGE_EXAMPLES.md             # ✅ Code examples
└── README_INTEGRATION.md         # ✅ This file
```

---

## 🔧 How to Use API Services

### Example: Fetch Departments
```javascript
import { departmentService } from '../services/departments';
import { message } from 'antd';

const fetchDepartments = async () => {
    try {
        const response = await departmentService.getAll();
        if (response.success) {
            setDepartments(response.data);
        }
    } catch (error) {
        message.error('Failed to load departments');
    }
};
```

### Example: Create Department
```javascript
const handleCreate = async (values) => {
    try {
        const response = await departmentService.create(values);
        if (response.success) {
            message.success('Department created!');
        }
    } catch (error) {
        message.error('Failed to create department');
    }
};
```

**See USAGE_EXAMPLES.md for more examples!**

---

## 🔗 Connecting with Customer Page

### Option 1: Same Domain (Recommended)
```
Admin:    https://admin.jinka.gov.et
Customer: https://jinka.gov.et
API:      https://api.jinka.gov.et
```

### Option 2: Different Domains
```
Admin:    https://admin-jinka.netlify.app
Customer: https://customer-jinka.netlify.app
API:      https://api.jinka.gov.et
```
**Note:** Backend must enable CORS for both domains

### Shared Data Flow
```
Admin creates announcement
    ↓
Saved to API database
    ↓
Customer page fetches announcements
    ↓
Customers see the announcement
```

---

## ✅ Integration Checklist

Use `INTEGRATION_CHECKLIST.md` to track your progress:

- [ ] Received API documentation
- [ ] Set up environment variables
- [ ] Tested authentication
- [ ] Tested departments CRUD
- [ ] Tested projects CRUD
- [ ] Tested reports
- [ ] Tested file uploads
- [ ] Connected with customer page
- [ ] Deployed to staging
- [ ] Deployed to production

---

## 🐛 Common Issues

### Issue: CORS Error
```
Error: Access blocked by CORS policy
```
**Solution:** Ask backend team to enable CORS:
```javascript
// Backend needs to add:
app.use(cors({
  origin: ['http://localhost:3000', 'https://admin.jinka.gov.et']
}));
```

### Issue: 401 Unauthorized
```
Error: 401 Unauthorized
```
**Solution:** Check if token is being sent:
```javascript
// In browser console:
console.log(localStorage.getItem('token'));
```

### Issue: Network Error
```
Error: Network Error
```
**Solution:** Verify API is running:
```bash
curl http://localhost:8000/api/health
```

---

## 📚 Documentation Files

1. **BACKEND_INTEGRATION_GUIDE.md** - Complete integration guide
2. **INTEGRATION_CHECKLIST.md** - Track your progress
3. **USAGE_EXAMPLES.md** - Code examples for all features
4. **API_INTEGRATION.md** - Original API documentation

---

## 🆘 Need Help?

### Questions to Ask Backend Team:

1. **"What's the API base URL?"**
   - Development: ?
   - Production: ?

2. **"Do you have Swagger documentation?"**
   - URL: ?

3. **"What authentication method?"**
   - JWT / OAuth / API Key?

4. **"Is CORS enabled?"**
   - For which domains?

5. **"What's the response format?"**
   - Show example

6. **"Any rate limits?"**
   - Requests per minute?

---

## 🎯 Next Steps

1. ✅ Read this file (you're here!)
2. ✅ Get API info from backend team
3. ✅ Set up environment variables
4. ✅ Test authentication
5. ✅ Follow INTEGRATION_CHECKLIST.md
6. ✅ Use USAGE_EXAMPLES.md for code
7. ✅ Deploy to staging
8. ✅ Deploy to production

---

## 💡 Pro Tips

- Test APIs with Postman before integrating
- Use browser DevTools Network tab to debug
- Check console for error messages
- Keep API documentation handy
- Commit often, push regularly
- Test on different browsers
- Test on mobile devices

---

## 📞 Support

If stuck, check:
1. Browser console for errors
2. Network tab for API calls
3. BACKEND_INTEGRATION_GUIDE.md
4. USAGE_EXAMPLES.md
5. Contact backend team with specific error messages

---

**Good luck with your integration! 🚀**
