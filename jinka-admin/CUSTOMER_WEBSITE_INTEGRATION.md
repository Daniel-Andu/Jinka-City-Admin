# Customer Website Integration Guide

## 📧 Contact Form Integration

Your customer-facing website needs to send contact form submissions to the backend API. Here's how to integrate it:

---

## ✅ Backend Endpoint (Already Working!)

The backend contact endpoint is ready and working:

```
POST http://localhost:5001/api/public/contact
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "subject": "Subject Line",
  "message": "Message content here..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Contact message submitted"
}
```

**Error Response (400):**
```json
{
  "error": "name, email, subject, and message are required"
}
```

---

## 🌐 Frontend Integration Examples

### Example 1: Plain JavaScript (Fetch API)

```html
<form id="contactForm">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <input type="text" name="subject" placeholder="Subject" required>
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send Message</button>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };

  try {
    const response = await fetch('http://localhost:5001/api/public/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      alert('Message sent successfully!');
      e.target.reset();
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    alert('Failed to send message. Please try again.');
    console.error('Error:', error);
  }
});
</script>
```

---

### Example 2: React

```jsx
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5001/api/public/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(result.error || 'Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
        required
      />
      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      
      {success && <p style={{color: 'green'}}>Message sent successfully!</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
}
```

---

### Example 3: jQuery

```javascript
$('#contactForm').on('submit', function(e) {
  e.preventDefault();
  
  const data = {
    name: $('#name').val(),
    email: $('#email').val(),
    subject: $('#subject').val(),
    message: $('#message').val()
  };

  $.ajax({
    url: 'http://localhost:5001/api/public/contact',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(response) {
      alert('Message sent successfully!');
      $('#contactForm')[0].reset();
    },
    error: function(xhr) {
      const error = xhr.responseJSON?.error || 'Failed to send message';
      alert('Error: ' + error);
    }
  });
});
```

---

### Example 4: Axios (React/Vue/Angular)

```javascript
import axios from 'axios';

const submitContact = async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/api/public/contact',
      formData
    );
    
    console.log('Success:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Failed to send message' 
    };
  }
};

// Usage
const result = await submitContact({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Question',
  message: 'Hello, I have a question...'
});

if (result.success) {
  alert('Message sent!');
} else {
  alert('Error: ' + result.error);
}
```

---

## 🔧 Important Configuration

### 1. Update API URL for Production

When deploying to production, update the API URL:

```javascript
// Development
const API_URL = 'http://localhost:5001/api/public';

// Production
const API_URL = 'https://api.jinkacity.gov.et/api/public';
```

### 2. CORS Configuration

The backend should already have CORS enabled. If you get CORS errors, check `jinka-backend/src/server.js`:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://jinkacity.gov.et'],
  credentials: true
}));
```

---

## 📱 Newsletter Subscription

Similarly, for newsletter subscriptions:

```
POST http://localhost:5001/api/public/subscribe
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "customer@example.com"
}
```

**Example:**
```javascript
const subscribeNewsletter = async (email) => {
  const response = await fetch('http://localhost:5001/api/public/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};
```

---

## 🧪 Testing the Integration

### Test from Command Line:

**Windows PowerShell:**
```powershell
$body = @{
  name='Test Customer'
  email='test@customer.com'
  subject='Test Message'
  message='This is a test'
} | ConvertTo-Json

Invoke-WebRequest -Uri 'http://localhost:5001/api/public/contact' `
  -Method POST `
  -Body $body `
  -ContentType 'application/json'
```

**Linux/Mac (curl):**
```bash
curl -X POST http://localhost:5001/api/public/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "test@customer.com",
    "subject": "Test Message",
    "message": "This is a test"
  }'
```

### Verify in Admin Panel:

1. Go to http://localhost:3001
2. Login with admin credentials
3. Click "Messages" in sidebar
4. You should see the test message!

---

## 🐛 Troubleshooting

### Messages not appearing in admin panel?

1. **Check backend is running:**
   ```bash
   curl http://localhost:5001/api/health
   ```

2. **Check database connection:**
   - Verify `.env` file has correct credentials
   - Check `contact_messages` table exists

3. **Check for errors:**
   - Open browser console (F12)
   - Look for network errors
   - Check backend logs

4. **Test the endpoint directly:**
   - Use the PowerShell/curl commands above
   - Check if message appears in admin panel

### CORS errors?

Add your customer website domain to CORS whitelist in `jinka-backend/src/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://jinkacity.gov.et',
    'https://www.jinkacity.gov.et'
  ],
  credentials: true
}));
```

### 400 Bad Request?

Make sure all required fields are included:
- `name` (required)
- `email` (required)
- `subject` (required)
- `message` (required)

---

## 📊 Message Flow

```
Customer Website
    ↓
    | Submit Contact Form
    ↓
POST /api/public/contact
    ↓
Backend API (interactionController.js)
    ↓
Save to contact_messages table
    ↓
Admin Panel Messages Page
    ↓
Admin views and responds
```

---

## ✅ Checklist for Customer Website Developers

- [ ] Contact form sends to `POST /api/public/contact`
- [ ] All 4 required fields included (name, email, subject, message)
- [ ] Content-Type header set to `application/json`
- [ ] Success message shown to user
- [ ] Error handling implemented
- [ ] Form resets after successful submission
- [ ] Loading state shown during submission
- [ ] API URL configured for production
- [ ] CORS configured if needed
- [ ] Tested and verified messages appear in admin panel

---

## 🎉 Summary

The backend is ready and working! Your customer website developers just need to:

1. Create a contact form
2. Send POST request to `/api/public/contact`
3. Include all 4 required fields
4. Handle success/error responses

Messages will automatically appear in the admin panel at `/messages`!
