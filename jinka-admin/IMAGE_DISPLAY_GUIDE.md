# Image Display Guide

## Image Preview Feature

The Hero Sliders form now includes an image preview feature. When you enter an image URL, you'll see a preview below the input field.

## Testing Image Display

### Option 1: Use Free Image URLs

Try these free image hosting services:

**Unsplash (Recommended)**
```
https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200
https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200
https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200
```

**Pexels**
```
https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?w=1200
```

**Pixabay**
```
https://pixabay.com/get/[image-id].jpg
```

### Option 2: Upload Images to Backend

The backend has an upload endpoint ready:

1. **Upload via API**:
   ```bash
   curl -X POST http://localhost:5001/api/admin/upload \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -F "file=@/path/to/image.jpg"
   ```

2. **Upload via Admin Panel** (if upload UI is added):
   - Click "Upload Image" button
   - Select image file
   - Image is uploaded to `jinka-backend/uploads/`
   - URL is automatically filled

### Option 3: Use Data URLs

For testing, you can use base64 data URLs:
```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...
```

## Common Issues

### Image Not Showing

**Issue**: "No image shown" or placeholder icon displayed

**Possible Causes**:

1. **Invalid URL**
   - Check if URL is accessible in browser
   - Make sure URL starts with `http://` or `https://`
   - Verify URL points to an actual image file

2. **CORS Blocked**
   - Some image hosts block cross-origin requests
   - Solution: Use CORS-friendly hosts like Unsplash, Pexels
   - Or upload images to your own backend

3. **Image URL Too Long** (FIXED)
   - We changed the column to TEXT type
   - Now supports very long URLs

4. **Network Error**
   - Check internet connection
   - Try opening URL directly in browser

### How to Debug

1. **Check Browser Console** (F12)
   - Look for CORS errors
   - Look for 404 errors
   - Look for network errors

2. **Test URL Directly**
   - Copy the image URL
   - Paste in browser address bar
   - If image doesn't load in browser, it won't load in admin panel

3. **Check Database**
   - Verify image URL is saved correctly
   - Check if URL has any extra characters

## Image Preview in Form

When you enter an image URL in the form:
- ✅ Preview appears below the input
- ✅ If URL is invalid, you'll see a warning
- ✅ If URL is valid, you'll see the image

## Image Display in Table

In the Hero Sliders list:
- ✅ Valid images show as thumbnails (80x50px)
- ✅ Invalid/missing images show placeholder icon
- ✅ Click image to see full preview

## Recommended Image Specifications

For best results:

**Hero Sliders**:
- Format: JPG or PNG
- Size: 1920x1080px (Full HD)
- File size: < 500KB (optimized)
- Aspect ratio: 16:9

**Thumbnails**:
- Automatically resized to 80x50px in table
- Original image used for preview

## Testing Steps

1. **Create New Hero Slider**:
   ```
   Title: Welcome to Jinka City
   Subtitle: Building a better future
   Image URL: https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200
   Button Text: Learn More
   Button Link: /about
   Active: Yes
   ```

2. **Check Preview**:
   - Image should appear below URL input
   - If not, URL might be invalid

3. **Save and Check Table**:
   - Click "Create"
   - Image should appear in table
   - Click image to see full preview

4. **Check Customer Website**:
   - Customer website fetches from `/api/public/hero`
   - Image URL is included in response
   - Customer website displays the image

## Image Upload Feature (Ready to Use)

The upload functionality is built-in. To enable it in the UI:

```jsx
<Upload
    beforeUpload={async (file) => {
        try {
            setUploading(true);
            const response = await uploadService.upload(file, 'hero-sliders');
            const uploadedUrl = `http://localhost:5001/${response.filePath}`;
            form.setFieldsValue({ image: uploadedUrl });
            message.success('Image uploaded successfully');
            return false;
        } catch (error) {
            message.error('Failed to upload image');
            return false;
        } finally {
            setUploading(false);
        }
    }}
    maxCount={1}
>
    <Button icon={<UploadOutlined />}>Upload Image</Button>
</Upload>
```

## Summary

- ✅ Image display is working
- ✅ Preview feature added
- ✅ Fallback for invalid images
- ✅ CORS-friendly image URLs recommended
- ✅ Upload feature ready to use

If images still don't show, check:
1. Is the URL valid and accessible?
2. Does the URL work in your browser?
3. Are there any CORS errors in console?
4. Is the image URL saved correctly in database?
