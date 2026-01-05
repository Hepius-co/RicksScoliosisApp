/**
 * Cloud Storage Upload Utility
 * Handles automatic background upload of saved images to remote storage
 */

import * as FileSystem from 'expo-file-system/legacy';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const PENDING_UPLOADS_KEY = '@pending_uploads';
const UPLOAD_ENDPOINT_KEY = '@upload_endpoint';

// Default upload endpoint - uploads to hepius.co domain
const DEFAULT_UPLOAD_ENDPOINT = 'https://hepius.co/scoliosis-uploads/upload.php';

/**
 * Configure the cloud storage upload endpoint
 * @param {string} endpoint - The URL of your cloud storage API endpoint
 */
export async function setUploadEndpoint(endpoint) {
  try {
    await AsyncStorage.setItem(UPLOAD_ENDPOINT_KEY, endpoint);
    return true;
  } catch (error) {
    console.error('Failed to set upload endpoint:', error);
    return false;
  }
}

/**
 * Get the configured upload endpoint
 * @returns {Promise<string>} The upload endpoint URL
 */
async function getUploadEndpoint() {
  try {
    const endpoint = await AsyncStorage.getItem(UPLOAD_ENDPOINT_KEY);
    return endpoint || DEFAULT_UPLOAD_ENDPOINT;
  } catch (error) {
    console.error('Failed to get upload endpoint:', error);
    return DEFAULT_UPLOAD_ENDPOINT;
  }
}

/**
 * Check if device is connected to the internet
 * @returns {Promise<boolean>}
 */
async function isConnected() {
  try {
    const networkState = await Network.getNetworkStateAsync();
    return networkState.isConnected && networkState.isInternetReachable;
  } catch (error) {
    console.error('Network check error:', error);
    return false;
  }
}

/**
 * Add image to pending uploads queue
 * @param {string} imageUri - Local URI of the image to upload
 * @param {Object} metadata - Additional metadata (Cobb angle, confidence, etc.)
 */
export async function queueImageForUpload(imageUri, metadata = {}) {
  try {
    // Get existing pending uploads
    const pendingJson = await AsyncStorage.getItem(PENDING_UPLOADS_KEY);
    const pending = pendingJson ? JSON.parse(pendingJson) : [];

    // Add new upload to queue
    const uploadItem = {
      id: Date.now().toString(),
      imageUri,
      metadata: {
        ...metadata,
        queuedAt: new Date().toISOString(),
        deviceInfo: {
          platform: 'mobile',
          app: 'Scoliosis Screening'
        }
      },
      uploadAttempts: 0,
      status: 'pending'
    };

    pending.push(uploadItem);

    // Save updated queue
    await AsyncStorage.setItem(PENDING_UPLOADS_KEY, JSON.stringify(pending));

    // Immediately try to upload if connected
    processUploadQueue();

    return uploadItem.id;
  } catch (error) {
    console.error('Failed to queue image:', error);
    throw error;
  }
}

/**
 * Process the upload queue - upload all pending images if connected
 */
export async function processUploadQueue() {
  try {
    // Check network connectivity
    const connected = await isConnected();
    if (!connected) {
      console.log('No internet connection. Upload will be retried later.');
      return { success: false, reason: 'no_connection' };
    }

    // Get pending uploads
    const pendingJson = await AsyncStorage.getItem(PENDING_UPLOADS_KEY);
    if (!pendingJson) {
      return { success: true, uploaded: 0 };
    }

    const pending = JSON.parse(pendingJson);
    const endpoint = await getUploadEndpoint();

    let successCount = 0;
    let failedUploads = [];

    for (const item of pending) {
      if (item.status === 'completed') {
        continue; // Skip already uploaded items
      }

      try {
        // Upload the image
        const uploaded = await uploadImage(item.imageUri, item.metadata, endpoint);

        if (uploaded) {
          item.status = 'completed';
          item.uploadedAt = new Date().toISOString();
          successCount++;
        } else {
          item.uploadAttempts++;
          item.status = 'failed';
          item.lastAttempt = new Date().toISOString();

          // Keep failed items if attempts < 3, otherwise remove
          if (item.uploadAttempts < 3) {
            failedUploads.push(item);
          }
        }
      } catch (error) {
        console.error('Upload error for item:', item.id, error);
        item.uploadAttempts++;
        item.status = 'failed';
        item.lastError = error.message;

        if (item.uploadAttempts < 3) {
          failedUploads.push(item);
        }
      }
    }

    // Update storage with only pending/failed items (remove completed)
    await AsyncStorage.setItem(PENDING_UPLOADS_KEY, JSON.stringify(failedUploads));

    return { success: true, uploaded: successCount, pending: failedUploads.length };
  } catch (error) {
    console.error('Failed to process upload queue:', error);
    return { success: false, reason: 'processing_error', error: error.message };
  }
}

/**
 * Upload a single image to cloud storage
 * @param {string} imageUri - Local URI of the image
 * @param {Object} metadata - Image metadata
 * @param {string} endpoint - Upload endpoint URL
 * @returns {Promise<boolean>} Success status
 */
async function uploadImage(imageUri, metadata, endpoint) {
  try {
    console.log('Starting upload to:', endpoint);

    // Read the image file as base64
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: 'base64',
    });

    console.log('Image read successfully, size:', base64Image.length);

    // Generate filename
    const filename = `spine_xray_${Date.now()}.png`;

    // Create form data with proper content type
    const formData = new FormData();

    // Append data as multipart form fields
    formData.append('image', base64Image);
    formData.append('filename', filename);
    formData.append('cobbAngle', String(metadata.cobbAngle || 'N/A'));
    formData.append('timestamp', String(metadata.timestamp || new Date().toISOString()));

    console.log('Uploading:', filename);

    // Upload to cloud storage
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    const responseText = await response.text();
    console.log('Upload response status:', response.status);
    console.log('Upload response:', responseText);

    if (!response.ok) {
      console.error('Upload failed with status:', response.status);
      console.error('Response body:', responseText);
      return false;
    }

    console.log('Upload successful for:', filename);
    return true;
  } catch (error) {
    console.error('Upload error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

/**
 * Get pending uploads count
 * @returns {Promise<number>}
 */
export async function getPendingUploadsCount() {
  try {
    const pendingJson = await AsyncStorage.getItem(PENDING_UPLOADS_KEY);
    if (!pendingJson) return 0;

    const pending = JSON.parse(pendingJson);
    return pending.filter(item => item.status !== 'completed').length;
  } catch (error) {
    console.error('Failed to get pending uploads count:', error);
    return 0;
  }
}

/**
 * Clear all upload history
 */
export async function clearUploadHistory() {
  try {
    await AsyncStorage.removeItem(PENDING_UPLOADS_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear upload history:', error);
    return false;
  }
}

// Auto-retry uploads when app comes to foreground
// This can be called in your App.js when app state changes to 'active'
export async function retryPendingUploads() {
  console.log('Checking for pending uploads...');
  return await processUploadQueue();
}
