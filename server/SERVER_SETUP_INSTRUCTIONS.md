# Server Setup Instructions for hepius.co

## Overview

Your app is now configured to automatically upload saved X-ray images to:
**https://hepius.co/scoliosis-uploads/upload.php**

This guide will help you set up the server-side upload handler.

---

## Step 1: Upload Files to Your Server

### Files to Upload:

1. **upload.php** - The main upload handler script
2. **.htaccess** - Security configuration (optional but recommended)

### Upload Location:

Upload these files to your server at:
```
https://hepius.co/scoliosis-uploads/
```

Your server directory structure should look like:
```
hepius.co/
└── scoliosis-uploads/
    ├── upload.php          (upload handler)
    ├── .htaccess           (security config)
    └── images/             (created automatically, stores uploads)
```

---

## Step 2: Set Permissions

After uploading, set the correct permissions:

### Using FTP Client (FileZilla, etc.):
1. Right-click on `scoliosis-uploads` folder
2. Select "File Permissions" or "CHMOD"
3. Set to **755** (rwxr-xr-x)

### Using SSH/Terminal:
```bash
# Navigate to the directory
cd /path/to/hepius.co/scoliosis-uploads/

# Set folder permissions
chmod 755 .
chmod 644 upload.php
chmod 644 .htaccess

# Create images folder if it doesn't exist
mkdir images
chmod 755 images
```

---

## Step 3: Test the Upload

### Method 1: Using the Mobile App

1. Open your scoliosis app
2. Take an X-ray photo
3. Save the image
4. Check console logs for "Upload successful"
5. Verify the image appears in `scoliosis-uploads/images/` folder

### Method 2: Using curl (from terminal)

```bash
curl -X POST https://hepius.co/scoliosis-uploads/upload.php \
  -F "image=iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" \
  -F "filename=test_image.png" \
  -F "cobbAngle=25.5" \
  -F "aiConfidence=0.85"
```

Expected response:
```json
{
  "success": true,
  "filename": "test_image.png",
  "uploadedAt": "2025-01-15T10:30:00+00:00",
  "metadata": {...}
}
```

---

## Step 4: View Uploaded Images

### Access Uploaded Files:

Images are stored in: `scoliosis-uploads/images/`

For each uploaded image, you'll find:
- `spine_xray_1234567890.png` - The actual X-ray image
- `spine_xray_1234567890_metadata.json` - Metadata file with Cobb angle, confidence, etc.
- `upload_log.txt` - Log of all uploads

### Example Metadata File:
```json
{
  "filename": "spine_xray_1234567890.png",
  "cobbAngle": "28.5",
  "aiConfidence": "0.75",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "uploadedAt": "2025-01-15T10:30:01+00:00",
  "imageSize": 245678,
  "imageDimensions": "1920x1080",
  "uploadIP": "192.168.1.1"
}
```

---

## Security Considerations

### 1. Protect Direct Access to Images

The included `.htaccess` file prevents direct access to uploaded images. This means:
- ✅ App can upload images
- ❌ Random people can't browse/download images

### 2. Add API Key Authentication (Recommended)

Edit `upload.php` to add API key verification:

```php
// At the top of upload.php, after headers
$apiKey = 'YOUR_SECRET_API_KEY_HERE';
$providedKey = $_SERVER['HTTP_X_API_KEY'] ?? '';

if ($providedKey !== $apiKey) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}
```

Then update the app's `utils/cloudStorage.js`:

```javascript
const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_SECRET_API_KEY_HERE',
  },
  body: formData,
});
```

### 3. Enable HTTPS

Ensure your uploads use HTTPS (already configured):
- ✅ https://hepius.co/scoliosis-uploads/upload.php
- ❌ http://hepius.co/scoliosis-uploads/upload.php

### 4. Rate Limiting (Optional)

To prevent abuse, add rate limiting to `upload.php`:

```php
// Simple rate limiting (max 10 uploads per IP per hour)
$rateFile = __DIR__ . '/rate_' . md5($_SERVER['REMOTE_ADDR']) . '.txt';
$uploads = file_exists($rateFile) ? (int)file_get_contents($rateFile) : 0;

if ($uploads >= 10) {
    http_response_code(429);
    echo json_encode(['error' => 'Rate limit exceeded']);
    exit();
}

file_put_contents($rateFile, $uploads + 1);
// Clean up old rate files with a cron job
```

---

## Troubleshooting

### Error: "Failed to create upload directory"

**Solution:**
- Check folder permissions (should be 755)
- Ensure parent directory is writable
- Contact your hosting provider

### Error: "CORS policy blocked"

**Solution:**
- Verify `.htaccess` is uploaded
- Check server supports `.htaccess` (Apache)
- Ensure `Access-Control-Allow-Origin` header is set

### Error: "Upload failed with status 500"

**Solution:**
- Check PHP error logs on server
- Verify PHP version (7.0+)
- Ensure `file_uploads = On` in php.ini
- Check `upload_max_filesize` in php.ini (should be at least 10MB)

### Images Not Appearing

**Solution:**
- Check `images/` folder exists
- Verify folder permissions (755)
- Look at `upload_log.txt` for errors
- Enable error reporting in `upload.php` temporarily

---

## Monitoring Uploads

### View Upload Log:

Access: `https://hepius.co/scoliosis-uploads/images/upload_log.txt`

Example log entries:
```
[2025-01-15 10:30:01] Uploaded: spine_xray_1705315801.png (Cobb: 28.5, Confidence: 0.75)
[2025-01-15 11:45:22] Uploaded: spine_xray_1705320322.png (Cobb: 15.2, Confidence: 0.82)
```

### Monitor Disk Space:

Check how much space uploads are using:
```bash
du -sh /path/to/scoliosis-uploads/images/
```

### Set Up Email Notifications (Optional):

Add to `upload.php` after successful upload:
```php
mail(
    'your-email@example.com',
    'New Scoliosis X-ray Upload',
    "New upload: $filename\nCobb Angle: $cobbAngle",
    'From: noreply@hepius.co'
);
```

---

## Backup Recommendations

### Regular Backups:

1. **Daily Backup Script** (cron job):
```bash
#!/bin/bash
# Backup scoliosis uploads
tar -czf backup_$(date +%Y%m%d).tar.gz /path/to/scoliosis-uploads/images/
# Move to backup location
mv backup_*.tar.gz /backup/location/
```

2. **Retention Policy**:
- Keep daily backups for 7 days
- Keep weekly backups for 30 days
- Keep monthly backups for 1 year

---

## HIPAA Compliance (If Applicable)

If this app processes protected health information (PHI):

1. **Encryption**: Ensure HTTPS is enforced
2. **Access Controls**: Implement authentication
3. **Audit Logs**: Keep detailed logs of all access
4. **Data Retention**: Define and enforce retention policies
5. **Business Associate Agreement**: May be required with hosting provider

Consult with a HIPAA compliance expert if handling PHI.

---

## Support

If you encounter issues:

1. Check server error logs
2. Enable error reporting in `upload.php` temporarily
3. Test with curl command
4. Verify permissions and folder structure

For additional help:
- PHP Documentation: https://www.php.net/
- Server logs location (varies by host)

---

## Summary Checklist

- [ ] Upload `upload.php` to server
- [ ] Upload `.htaccess` to server
- [ ] Set folder permissions (755)
- [ ] Create `images/` folder
- [ ] Test upload with curl or app
- [ ] Verify images appear in `images/` folder
- [ ] Check `upload_log.txt` for entries
- [ ] Configure API key (optional)
- [ ] Set up backups (recommended)
- [ ] Review security settings

---

**Your upload endpoint is ready at:**
`https://hepius.co/scoliosis-uploads/upload.php`

Images will be saved to:
`https://hepius.co/scoliosis-uploads/images/`
