# How to Start the Backend

## The Problem

You're seeing these errors:
- "Failed to load messages from backend"
- "Failed to load departments from backend"

This means the backend API is not running.

---

## Solution

### Step 1: Open Backend Project

Open a new terminal and navigate to your backend project:

```bash
cd path/to/jinka-city-api
```

For example:
```bash
cd C:\Users\dniel\Desktop\jinka-city-api
```

### Step 2: Install Dependencies (First Time Only)

If you haven't installed dependencies yet:

```bash
npm install
```

### Step 3: Start Backend Server

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend should start on **http://localhost:5001**

You should see output like:
```
Server running on port 5001
Connected to database
```

---

## Verify Backend is Running

### Option 1: Check in Browser

Open: http://localhost:5001/api/public/bootstrap

You should see JSON data (not an error).

### Option 2: Check in Terminal

```bash
curl http://localhost:5001/api/public/bootstrap
```

Should return JSON data.

---

## After Backend Starts

1. Keep the backend terminal running
2. Go back to your admin panel: http://localhost:3002/
3. Refresh the page
4. Try logging in again
5. Navigate to Departments or Messages

The errors should be gone and data should load!

---

## Common Issues

### Port Already in Use

If you see "Port 5001 is already in use":

**Windows:**
```bash
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:5001 | xargs kill -9
```

### Database Connection Error

Make sure your `.env` file in the backend has correct database credentials:

```env
DB_HOST=gateway01.eu-central-1.prod.aws.tidbcloud.com
DB_PORT=4000
DB_USER=3Wqoqhx4joYsHuX.root
DB_PASSWORD=tpCG7TVgBC8ph3fS
DB_NAME=Jinka_cms
JWT_SECRET=njU3jJVTjOWzmVWclYaCq5o9pskaqOAC7Rbj6gSfg8Y=
```

### CORS Error

If you see CORS errors in browser console, the backend needs to allow requests from `http://localhost:3002`.

Check backend's CORS configuration (usually in `server.js` or `app.js`):

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));
```

---

## Quick Test Checklist

- [ ] Backend terminal is open and running
- [ ] You see "Server running on port 5001"
- [ ] http://localhost:5001/api/public/bootstrap returns JSON
- [ ] Admin panel at http://localhost:3002/ is open
- [ ] You can login with admin@jinkacity.gov.et / admin123
- [ ] Departments page loads without errors
- [ ] Messages page loads without errors

---

## Both Servers Running

You should have TWO terminals open:

**Terminal 1 - Backend:**
```
cd jinka-city-api
npm run dev
→ Server running on port 5001
```

**Terminal 2 - Admin Panel:**
```
cd jinka-admin
npm run dev
→ Running on http://localhost:3002/
```

---

## Still Having Issues?

1. Check backend terminal for errors
2. Check browser console (F12) for errors
3. Verify `.env` files in both projects
4. Make sure both servers are running
5. Try restarting both servers
