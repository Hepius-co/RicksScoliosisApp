# Dr. Rick Hodes Scoliosis Screening App

A comprehensive mobile application for scoliosis screening and assessment, featuring both digital scoliometer and AI-powered Cobb angle measurement tools.

## Overview

This React Native/Expo app provides healthcare workers, medical students, and clinicians with accessible, evidence-based tools for scoliosis screening, especially in resource-limited settings.

Created in honor of **Dr. Rick Hodes** and his decades of humanitarian medical work treating scoliosis and spinal tuberculosis in underserved communities, particularly in Ethiopia.

---

## Features

### 🦴 Scoliometer (Digital Inclinometer)
- Measures angle of trunk rotation (ATR) during Adams Forward Bend Test
- Landscape-oriented display for horizontal phone placement
- Pause/Resume functionality to freeze measurements
- Real-time interpretation:
  - 0-5°: Normal range
  - 5-7°: Mild rotation (monitor)
  - ≥7°: Significant rotation (consider referral)

### 📐 Cobb Angle Measurement
- Camera-based X-ray photo capture
- **Manual measurement** with draggable endplate lines
- **🤖 AI-Powered Detection** - Automatic endplate positioning
- Pinch-to-zoom for precision
- Real-time angle calculation
- Automatic severity assessment:
  - <10°: Normal variation
  - 10-25°: Mild scoliosis
  - 25-40°: Moderate scoliosis
  - >40°: Severe scoliosis
- Save annotated images to photo library

### ☁️ Cloud Backup
- Automatic upload of saved images to cloud storage
- Works in background when internet is available
- Automatic retry for failed uploads
- Includes metadata (Cobb angle, AI confidence, timestamp)
- Configurable endpoint for custom storage solutions

### ℹ️ Information Screens
- About the App - Purpose, features, and medical disclaimer
- About Dr. Rick Hodes - Inspiration and mission
- Privacy Policy & Terms links

---

## Technical Stack

- **Framework**: React Native with Expo (~54.0.30)
- **Navigation**: React Navigation (Bottom Tabs)
- **Camera**: expo-camera
- **Sensors**: expo-sensors (DeviceMotion)
- **Gestures**: react-native-gesture-handler
- **Graphics**: react-native-svg
- **Storage**: @react-native-async-storage/async-storage
- **AI**: Custom heuristic-based spine analyzer (no ML required)

---

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- Expo CLI
- iOS Simulator or Android emulator, or physical device with Expo Go app

### Install Dependencies

```bash
cd scoliosis-app
npm install
```

### Run the App

```bash
# Start Expo development server
npx expo start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android
```

---

## Configuration

### Cloud Storage Setup

To enable cloud backup functionality:

1. Open `utils/cloudStorage.js`
2. Update `DEFAULT_UPLOAD_ENDPOINT` with your API endpoint
3. Add authentication headers if required

See [CLOUD_STORAGE_SETUP.md](CLOUD_STORAGE_SETUP.md) for detailed instructions.

---

## Usage Guide

### Using the Scoliometer

1. Navigate to the "Scoliometer" tab
2. Have patient perform forward bend test
3. Place phone horizontally on spine at area of prominence
4. Tap "Pause" to freeze the measurement
5. Read the trunk rotation angle
6. Tap "Reset All" to start over

### Using Cobb Angle Measurement

#### Manual Method
1. Navigate to "Cobb Angle" tab
2. Tap "Take X-ray Photo" and photograph a spine X-ray
3. Pinch to zoom for precision
4. Drag **red line** endpoints to align with superior endplate of upper end vertebra
5. Drag **green line** endpoints to align with inferior endplate of lower end vertebra
6. Cobb angle is calculated automatically
7. Tap "Save" to save the annotated image

#### AI-Assisted Method
1. Take photo of spine X-ray (steps 1-2 above)
2. Tap "🤖 AI Analyze" button
3. Lines are automatically positioned on detected endplates
4. Review AI confidence score
5. Manually adjust lines if needed
6. Tap "Save" to save the annotated image

---

## File Structure

```
scoliosis-app/
├── screens/
│   ├── ScoliometerScreen.js      # Digital inclinometer
│   ├── CobbAngleScreen.js        # Cobb angle measurement + AI
│   ├── AboutAppScreen.js         # App information
│   └── AboutDrRickScreen.js      # Dr. Rick Hodes information
├── utils/
│   ├── spineAnalyzer.js          # AI spine analysis algorithm
│   └── cloudStorage.js           # Cloud upload system
├── App.js                         # Main navigation & upload retry
├── package.json
├── app.json
├── CLOUD_STORAGE_SETUP.md        # Cloud configuration guide
├── IMPLEMENTATION_SUMMARY.md      # Feature implementation details
└── README.md                      # This file
```

---

## AI Detection Details

The AI detection uses a **classical computer vision approach** (no machine learning required):

- **Lightweight**: Works completely offline
- **Fast**: <100ms processing time
- **No Training Data**: Uses anatomical heuristics
- **Confidence Score**: Reports detection confidence
- **Manual Override**: Users can always adjust automatically positioned lines

For production use with higher accuracy requirements, consider integrating the full OpenCV-based algorithm from the `files/` directory.

---

## Privacy & Security

- All measurements and images are stored locally on the device
- Cloud upload is optional and happens in the background
- Users are informed when images are queued for upload
- Privacy Policy and Terms & Conditions links included
- HIPAA compliance considerations for cloud storage (see setup guide)

---

## Medical Disclaimer

⚠️ **Important**: This app is intended for **screening and educational purposes only**. It does NOT replace professional medical diagnosis or treatment.

- All measurements should be verified by qualified healthcare professionals
- For definitive diagnosis and treatment planning, consult a licensed physician or specialist
- This is NOT a medical device

---

## Building for Production

### iOS

```bash
# Build for iOS App Store
eas build --platform ios
```

### Android

```bash
# Build for Google Play Store
eas build --platform android
```

See [Expo EAS Build documentation](https://docs.expo.dev/build/introduction/) for details.

---

## Troubleshooting

### Camera Not Working
- Check camera permissions in device settings
- Ensure expo-camera is properly installed
- Restart the app

### AI Detection Not Accurate
- Ensure X-ray image is clear and well-lit
- Center the spine in the photo
- Manually adjust lines after AI detection
- Consider implementing full OpenCV algorithm for production

### Cloud Upload Failing
- Check internet connectivity
- Verify endpoint URL in `utils/cloudStorage.js`
- Check console logs for error messages
- Ensure cloud API returns proper response format

---

## Contributing

This is a humanitarian project created to improve scoliosis screening in underserved communities. Suggestions for improvements are welcome:

- Multi-curve detection (S-shaped scoliosis)
- Enhanced AI accuracy with real ML models
- Internationalization/localization
- Offline data syncing improvements

---

## Credits & Acknowledgments

**Inspired by**: Dr. Rick Hodes, MD
- Medical Director, JDC Ethiopia
- Decades of humanitarian work treating scoliosis patients
- Pioneering accessible healthcare in resource-limited settings

**Technology**: Built with React Native, Expo, and classical computer vision techniques

**Purpose**: Making scoliosis screening accessible worldwide

---

## License

See Privacy Policy and Terms & Conditions:
- Privacy Policy: https://hepius.co/privacy-policy/
- Terms & Conditions: https://hepius.co/terms-and-conditions/

---

## Support

For technical support or questions:
- Check [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for feature details
- See [CLOUD_STORAGE_SETUP.md](CLOUD_STORAGE_SETUP.md) for cloud configuration
- Review React Native/Expo documentation

---

**Version**: 1.0.0
**Theme Color**: #00b5e2
**Platform**: iOS & Android

**Made with dedication to improving spinal health screening worldwide** 🦴
