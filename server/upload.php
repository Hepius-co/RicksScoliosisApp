<?php
/**
 * Scoliosis App Image Upload Script
 *
 * This script receives base64-encoded images from the mobile app
 * and saves them to the server with metadata.
 *
 * INSTALLATION:
 * 1. Upload this file to: https://hepius.co/scoliosis-uploads/upload.php
 * 2. Create the 'images' folder in the same directory with write permissions (chmod 755)
 * 3. Create a .htaccess file to protect the images folder (optional)
 *
 * SECURITY NOTES:
 * - This is a basic implementation
 * - For production, add authentication (API key, JWT, etc.)
 * - Consider adding rate limiting
 * - Add IP whitelisting if needed
 */

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS (allow app to upload)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Directory to save images (relative to this script)
$uploadDir = __DIR__ . '/images/';

// Create directory if it doesn't exist
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create upload directory']);
        exit();
    }
}

// Get POST data
$image = isset($_POST['image']) ? $_POST['image'] : null;
$filename = isset($_POST['filename']) ? $_POST['filename'] : 'spine_xray_' . time() . '.png';
$cobbAngle = isset($_POST['cobbAngle']) ? $_POST['cobbAngle'] : 'N/A';
$aiConfidence = isset($_POST['aiConfidence']) ? $_POST['aiConfidence'] : 'N/A';
$timestamp = isset($_POST['timestamp']) ? $_POST['timestamp'] : date('c');

// Validate required fields
if (empty($image)) {
    http_response_code(400);
    echo json_encode(['error' => 'No image data provided']);
    exit();
}

// Sanitize filename
$filename = preg_replace('/[^a-zA-Z0-9_\-\.]/', '', $filename);
if (!preg_match('/\.png$/i', $filename)) {
    $filename .= '.png';
}

// Decode base64 image
$imageData = base64_decode($image);

if ($imageData === false) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid base64 image data']);
    exit();
}

// Validate it's a valid image
$imageInfo = @getimagesizefromstring($imageData);
if ($imageInfo === false) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid image format']);
    exit();
}

// Save image to file
$filePath = $uploadDir . $filename;
$saved = file_put_contents($filePath, $imageData);

if ($saved === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save image']);
    exit();
}

// Save metadata to a JSON file
$metadataFile = $uploadDir . pathinfo($filename, PATHINFO_FILENAME) . '_metadata.json';
$metadata = [
    'filename' => $filename,
    'cobbAngle' => $cobbAngle,
    'aiConfidence' => $aiConfidence,
    'timestamp' => $timestamp,
    'uploadedAt' => date('c'),
    'imageSize' => strlen($imageData),
    'imageDimensions' => $imageInfo[0] . 'x' . $imageInfo[1],
    'uploadIP' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
];

file_put_contents($metadataFile, json_encode($metadata, JSON_PRETTY_PRINT));

// Log successful upload
$logFile = $uploadDir . 'upload_log.txt';
$logEntry = sprintf(
    "[%s] Uploaded: %s (Cobb: %s, Confidence: %s)\n",
    date('Y-m-d H:i:s'),
    $filename,
    $cobbAngle,
    $aiConfidence
);
file_put_contents($logFile, $logEntry, FILE_APPEND);

// Return success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'filename' => $filename,
    'uploadedAt' => date('c'),
    'metadata' => $metadata
]);
?>
