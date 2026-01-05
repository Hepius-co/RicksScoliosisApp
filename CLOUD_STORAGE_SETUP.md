# Cloud Storage Configuration

This app includes automatic cloud backup functionality for saved X-ray images. Images are automatically uploaded to your cloud storage when internet connection is available.

## How It Works

1. When a user saves an X-ray image with Cobb angle measurements, the image is:
   - Saved locally to the device photo library
   - Queued for cloud upload with metadata (Cobb angle, AI confidence, timestamp)

2. The app automatically tries to upload:
   - Immediately after saving (if internet is available)
   - When the app comes to foreground
   - Failed uploads are retried up to 3 times

3. All uploads happen in the background without interrupting the user experience.

## Setting Up Your Cloud Storage Endpoint

### Step 1: Update the Upload Endpoint

Edit `utils/cloudStorage.js` and update the `DEFAULT_UPLOAD_ENDPOINT`:

```javascript
const DEFAULT_UPLOAD_ENDPOINT = 'https://your-actual-endpoint.com/api/upload';
```

Replace with your actual cloud storage API endpoint.

### Step 2: Configure Authentication (if needed)

If your cloud storage requires authentication, update the `uploadImage` function in `utils/cloudStorage.js`:

```javascript
const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN', // Add your auth header
    // or 'X-API-Key': 'your-api-key',
  },
  body: JSON.stringify(uploadData),
});
```

### Step 3: Expected API Format

Your cloud storage API should accept POST requests with this JSON format:

```json
{
  "image": "base64_encoded_image_data",
  "filename": "spine_xray_1234567890.png",
  "metadata": {
    "cobbAngle": "28.5",
    "aiConfidence": 0.75,
    "timestamp": "2025-01-15T10:30:00.000Z",
    "imageType": "spine_xray_with_measurement",
    "queuedAt": "2025-01-15T10:30:00.000Z",
    "deviceInfo": {
      "platform": "mobile",
      "app": "Scoliosis Screening"
    }
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

Your API should return a success response (status 200) with JSON:

```json
{
  "success": true,
  "imageId": "unique-id-for-the-image",
  "uploadedAt": "2025-01-15T10:30:01.000Z"
}
```

## Common Cloud Storage Solutions

### Option 1: Firebase Storage

1. Install Firebase:
   ```bash
   npx expo install firebase
   ```

2. Update `utils/cloudStorage.js` to use Firebase Storage API

### Option 2: AWS S3

1. Install AWS SDK:
   ```bash
   npm install aws-sdk
   ```

2. Configure S3 bucket and update upload function

### Option 3: Custom Backend

Create a simple Node.js/Express endpoint that receives the images and stores them:

```javascript
app.post('/api/upload', async (req, res) => {
  const { image, filename, metadata } = req.body;

  // Decode base64 and save to your storage
  const buffer = Buffer.from(image, 'base64');

  // Save to disk, S3, or database
  await saveImage(buffer, filename, metadata);

  res.json({
    success: true,
    imageId: generateId(),
    uploadedAt: new Date().toISOString()
  });
});
```

## Privacy & Compliance

- The app includes links to Privacy Policy and Terms & Conditions
- Ensure your cloud storage complies with HIPAA or relevant medical data regulations
- Consider encrypting images before upload for sensitive medical data
- Implement proper access controls on your cloud storage

## Testing Upload Functionality

1. Run the app and take an X-ray photo
2. Measure Cobb angle and save the image
3. Check console logs for "Image queued for cloud upload"
4. Monitor your cloud storage endpoint for incoming requests

## Troubleshooting

### Uploads Not Working

1. Check internet connectivity
2. Verify the endpoint URL is correct
3. Check console logs for error messages
4. Ensure your API returns proper status codes

### Pending Uploads

Check pending uploads count programmatically:

```javascript
import { getPendingUploadsCount } from './utils/cloudStorage';

const count = await getPendingUploadsCount();
console.log(`Pending uploads: ${count}`);
```

### Clear Upload Queue

To clear all pending uploads (for testing):

```javascript
import { clearUploadHistory } from './utils/cloudStorage';

await clearUploadHistory();
```

## Security Recommendations

1. **Use HTTPS only** - Never use HTTP for medical data
2. **Implement authentication** - Require API keys or tokens
3. **Encrypt sensitive data** - Consider encrypting images before upload
4. **Rate limiting** - Implement rate limits on your API
5. **Audit logs** - Log all uploads for compliance

## Support

For issues or questions about cloud storage setup, refer to:
- Firebase: https://firebase.google.com/docs/storage
- AWS S3: https://docs.aws.amazon.com/s3/
- Custom backend: Contact your backend developer
