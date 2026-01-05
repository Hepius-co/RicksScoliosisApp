# Deploying Rick'S Web App to cPanel

## Your Web App URL
https://hepius.co/RS

## Step-by-Step Deployment Instructions

### 1. Prepare the Files
The web build is ready in the `dist` folder of your project.

### 2. Access Your cPanel
1. Log into your cPanel at your hosting provider
2. Navigate to **File Manager**

### 3. Create the RS Directory
1. In File Manager, navigate to `public_html` (this is your website root)
2. Click **+ Folder** button at the top
3. Create a new folder named `RS` (case-sensitive, use uppercase)
4. You should now have: `public_html/RS/`

### 4. Upload the Web App Files
1. Open the `RS` folder you just created
2. Click **Upload** button at the top
3. Upload ALL files from your local `dist` folder:
   - `index.html`
   - `favicon.ico`
   - `metadata.json`
   - `_expo` folder (with all its contents)

   **Alternative method using compression:**
   - Compress the contents of the `dist` folder into a ZIP file on your computer
   - Upload the ZIP file to `public_html/RS/`
   - Right-click the ZIP file in cPanel File Manager
   - Select "Extract"
   - Delete the ZIP file after extraction

### 5. Verify File Structure
After uploading, your file structure should look like this:
```
public_html/
  └── RS/
      ├── index.html
      ├── favicon.ico
      ├── metadata.json
      └── _expo/
          └── static/
              └── js/
                  └── web/
                      └── index-[hash].js
```

### 6. Set Proper Permissions
1. Select all files and folders in the `RS` directory
2. Click **Permissions** or **Change Permissions**
3. Set folders to `755` (rwxr-xr-x)
4. Set files to `644` (rw-r--r--)

### 7. Create .htaccess File (Important for React Navigation)
1. In the `RS` folder, click **+ File**
2. Create a file named `.htaccess`
3. Edit the file and add the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /RS/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /RS/index.html [L]
</IfModule>

# Enable CORS for assets
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
</IfModule>

# Set proper MIME types
<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType text/css .css
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 8. Test Your Deployment
1. Open your browser
2. Navigate to: https://hepius.co/RS
3. The Rick'S app should load

## Important Notes

### Camera Functionality
⚠️ **Camera features will NOT work in the web version** because:
- Web browsers require HTTPS (you have this ✓)
- But `expo-camera` does not support web browsers
- Only the Scoliometer (device motion sensor) might work on mobile browsers
- For full functionality, users need to install the iOS or Android app

The web version is best used for:
- Viewing app information
- About sections
- Basic navigation preview
- Directing users to download the mobile apps

### SSL Certificate
- Your site (hepius.co) should already have an SSL certificate
- If not, you can get a free one through cPanel using "SSL/TLS Status" or Let's Encrypt

### Future Updates
When you update the app:
1. Run `npx expo export --platform web` in your project folder
2. Delete all files in `public_html/RS/` (except `.htaccess`)
3. Upload the new files from the `dist` folder
4. Keep the `.htaccess` file

## Alternative: FTP Upload Method

If you prefer using FTP:
1. Use an FTP client like FileZilla
2. Connect to your hosting using FTP credentials from cPanel
3. Navigate to `public_html/RS/`
4. Upload all files from the `dist` folder
5. Set permissions as described in step 6 above

## Troubleshooting

### If the page shows "404 Not Found"
- Check that the `RS` folder is in `public_html`
- Verify all files uploaded correctly
- Check file permissions

### If the page loads but styles are broken
- Check that the `_expo` folder uploaded completely
- Verify the `.htaccess` file is in place
- Check browser console for errors (F12)

### If navigation doesn't work
- Ensure the `.htaccess` file is created and has the correct content
- Verify mod_rewrite is enabled (most cPanel hosts have it enabled by default)

## Mobile App Installation (Full Features)

For users who want the full app functionality with camera support:
- **iOS**: Coming soon (after you build with EAS and submit to App Store)
- **Android**: Coming soon (after you build with EAS - APK can be distributed directly)

---

**Deployment Location**: `c:\Users\Dag\Documents\Personal Projects\RickHodes Scoliosis app\scoliosis-app\dist`

**Live URL**: https://hepius.co/RS
