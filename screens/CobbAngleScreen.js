import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, ScrollView, PanResponder, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Line, Circle } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import { queueImageForUpload } from '../utils/cloudStorage';

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = Math.min(350, height * 0.45);

export default function CobbAngleScreen() {
  const isWebPlatform = Platform.OS === 'web';
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);
  const measurementRef = useRef(null);

  // Line endpoints
  const [line1Start, setLine1Start] = useState({ x: 60, y: 120 });
  const [line1End, setLine1End] = useState({ x: width - 80, y: 120 });
  const [line2Start, setLine2Start] = useState({ x: 60, y: 280 });
  const [line2End, setLine2End] = useState({ x: width - 80, y: 280 });

  // Zoom control with pinch gesture
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const initialDistance = useRef(0);

  // Image adjustment controls
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [isNegative, setIsNegative] = useState(false);

  // Calculate Cobb angle
  const calculateCobbAngle = () => {
    const angle1 = Math.atan2(line1End.y - line1Start.y, line1End.x - line1Start.x);
    const angle2 = Math.atan2(line2End.y - line2Start.y, line2End.x - line2Start.x);
    let degree = Math.abs((angle1 - angle2) * (180 / Math.PI));
    if (degree > 90) degree = 180 - degree;
    return degree;
  };

  const cobbAngle = calculateCobbAngle();

  // Pan responders for dragging handles
  const createPanResponder = (point, setter) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gs) => {
        const newX = Math.max(10, Math.min(width - 90, point.x + gs.dx));
        const newY = Math.max(10, Math.min(IMAGE_HEIGHT - 10, point.y + gs.dy));
        setter({ x: newX, y: newY });
      },
    });
  };

  const line1StartPan = createPanResponder(line1Start, setLine1Start);
  const line1EndPan = createPanResponder(line1End, setLine1End);
  const line2StartPan = createPanResponder(line2Start, setLine2Start);
  const line2EndPan = createPanResponder(line2End, setLine2End);

  // Pan responders for dragging entire lines
  const createLinePanResponder = (startPoint, endPoint, setStart, setEnd) => {
    const offset = useRef({ x: 0, y: 0 });

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gs) => {
        offset.current = { x: 0, y: 0 };
      },
      onPanResponderMove: (evt, gs) => {
        const dx = gs.dx - offset.current.x;
        const dy = gs.dy - offset.current.y;
        offset.current = { x: gs.dx, y: gs.dy };

        const newStartX = Math.max(10, Math.min(width - 90, startPoint.x + dx));
        const newStartY = Math.max(10, Math.min(IMAGE_HEIGHT - 10, startPoint.y + dy));
        const newEndX = Math.max(10, Math.min(width - 90, endPoint.x + dx));
        const newEndY = Math.max(10, Math.min(IMAGE_HEIGHT - 10, endPoint.y + dy));

        setStart({ x: newStartX, y: newStartY });
        setEnd({ x: newEndX, y: newEndY });
      },
    });
  };

  const line1Pan = createLinePanResponder(line1Start, line1End, setLine1Start, setLine1End);
  const line2Pan = createLinePanResponder(line2Start, line2End, setLine2Start, setLine2End);

  // Calculate distance between two touch points
  const getDistance = (touches) => {
    if (touches.length < 2) return 0;
    const [touch1, touch2] = touches;
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Pinch to zoom pan responder
  const pinchPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt) => evt.nativeEvent.touches.length === 2,
    onMoveShouldSetPanResponder: (evt) => evt.nativeEvent.touches.length === 2,
    onPanResponderGrant: (evt) => {
      initialDistance.current = getDistance(evt.nativeEvent.touches);
      scaleRef.current = scale;
    },
    onPanResponderMove: (evt) => {
      if (evt.nativeEvent.touches.length === 2) {
        const currentDistance = getDistance(evt.nativeEvent.touches);
        if (initialDistance.current > 0) {
          const newScale = Math.max(1, Math.min(3, scaleRef.current * (currentDistance / initialDistance.current)));
          setScale(newScale);
        }
      }
    },
    onPanResponderRelease: () => {
      initialDistance.current = 0;
    },
  });

  const openCamera = async () => {
    if (!cameraPermission?.granted) {
      const result = await requestCameraPermission();
      if (!result.granted) {
        Alert.alert('Permission Required', 'Camera permission is needed');
        return;
      }
    }
    setShowCamera(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
        setCapturedImage(photo.uri);
        setShowCamera(false);
        resetLines();
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
      });
      if (!result.canceled) {
        setCapturedImage(result.assets[0].uri);
        resetLines();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const resetLines = () => {
    setLine1Start({ x: 60, y: 120 });
    setLine1End({ x: width - 80, y: 120 });
    setLine2Start({ x: 60, y: 280 });
    setLine2End({ x: width - 80, y: 280 });
    setScale(1);
    setBrightness(1);
    setContrast(1);
    setIsNegative(false);
  };

  const saveMeasurement = async () => {
    if (!capturedImage) return;

    try {
      if (!mediaPermission?.granted) {
        const result = await requestMediaPermission();
        if (!result.granted) {
          Alert.alert('Permission Required', 'Media library permission is needed');
          return;
        }
      }

      // Save current zoom level and reset to 1x for capture
      const currentScale = scale;
      if (scale !== 1) {
        setScale(1);
        scaleRef.current = 1;
        // Wait for render to complete
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const uri = await captureRef(measurementRef, { format: 'png', quality: 1 });
      await MediaLibrary.saveToLibraryAsync(uri);

      // Restore zoom level
      if (currentScale !== 1) {
        setScale(currentScale);
        scaleRef.current = currentScale;
      }

      queueImageForUpload(uri, {
        type: 'cobb_angle',
        cobbAngle: cobbAngle.toFixed(1),
        timestamp: new Date().toISOString(),
      }).catch(err => console.log('Background upload queued'));

      Alert.alert('Success', 'Measurement saved to photos');
    } catch (error) {
      Alert.alert('Error', 'Failed to save measurement');
    }
  };

  const retake = () => {
    setCapturedImage(null);
    resetLines();
  };

  if (showCamera) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back">
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowCamera(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </CameraView>
      </View>
    );
  }

  // Show web platform message
  if (isWebPlatform) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.unavailableContainer}>
            <Text style={styles.unavailableTitle}>📐 Cobb Angle Measurement</Text>
            <Text style={styles.unavailableSubtitle}>Camera not available on web</Text>
            <View style={styles.unavailableBox}>
              <Text style={styles.unavailableText}>
                The Cobb Angle measurement tool requires camera access, which is only available in the native mobile apps.
              </Text>
              <Text style={[styles.unavailableText, { marginTop: 20 }]}>
                📱 To use this feature, please download the Rick'S mobile app:
              </Text>
              <Text style={styles.unavailableList}>
                • iOS app (coming soon){'\n'}
                • Android app (coming soon)
              </Text>
            </View>
            <View style={styles.instructions}>
              <Text style={styles.instructionTitle}>About Cobb Angle Measurement:</Text>
              <Text style={styles.instructionText}>
                The Cobb angle is the gold standard for measuring scoliosis severity from X-ray images.{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>How it works in the mobile app:</Text>{'\n'}
                1. Take or upload an X-ray image{'\n'}
                2. Draw lines along vertebral endplates{'\n'}
                3. App calculates the angle automatically{'\n'}
                4. Get instant interpretation{'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>Interpretation:</Text>{'\n'}
                • 0-10°: Normal{'\n'}
                • 10-25°: Mild scoliosis{'\n'}
                • 25-40°: Moderate scoliosis{'\n'}
                • ≥40°: Severe scoliosis
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {!capturedImage ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>How to use:</Text>
            <Text style={styles.instructionText}>
              1. Take or upload an X-ray image of the spine{'\n'}
              2. Drag the red line to align with superior endplate{'\n'}
              3. Drag the blue line to align with inferior endplate{'\n'}
              4. Use zoom slider to adjust view if needed{'\n'}
              5. Save the measurement when complete
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cameraButton]} onPress={openCamera}>
              <Text style={styles.buttonText}>📷 Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.libraryButton]} onPress={pickImage}>
              <Text style={styles.buttonText}>📁 Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <>
          {/* Measurement Display Container */}
          <View style={styles.displayContainer}>
            <View style={styles.controlButtons}>
              <View style={styles.controlRow}>
                <View style={styles.controlItem}>
                  <Text style={styles.controlLabel}>Brightness: {brightness.toFixed(1)}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0.5}
                    maximumValue={2}
                    value={brightness}
                    onValueChange={setBrightness}
                    minimumTrackTintColor="#00b5e2"
                    maximumTrackTintColor="#d3d3d3"
                  />
                </View>
                <View style={styles.controlItem}>
                  <Text style={styles.controlLabel}>Contrast: {contrast.toFixed(1)}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0.5}
                    maximumValue={2}
                    value={contrast}
                    onValueChange={setContrast}
                    minimumTrackTintColor="#00b5e2"
                    maximumTrackTintColor="#d3d3d3"
                  />
                </View>
                <View style={styles.controlItem}>
                  <TouchableOpacity
                    style={[styles.negativeButton, isNegative && styles.negativeButtonActive]}
                    onPress={() => setIsNegative(!isNegative)}
                  >
                    <Text style={styles.negativeButtonText}>
                      {isNegative ? '✓ Negative' : 'Negative'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Image with measurement overlay */}
            <View ref={measurementRef} style={styles.imageContainer} collapsable={false} {...pinchPanResponder.panHandlers}>
              <View style={{ transform: [{ scale }] }}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: capturedImage }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  {/* Brightness overlay */}
                  {brightness !== 1 && (
                    <View
                      style={[
                        styles.filterOverlay,
                        {
                          backgroundColor: brightness > 1 ? 'white' : 'black',
                          opacity: Math.abs(brightness - 1) * 0.5
                        }
                      ]}
                      pointerEvents="none"
                    />
                  )}
                  {/* Contrast overlay */}
                  {contrast !== 1 && (
                    <View
                      style={[
                        styles.filterOverlay,
                        {
                          backgroundColor: contrast > 1 ? 'black' : 'white',
                          opacity: Math.abs(contrast - 1) * 0.4
                        }
                      ]}
                      pointerEvents="none"
                    />
                  )}
                  {/* Negative invert overlay - simulates color inversion */}
                  {isNegative && (
                    <>
                      <View
                        style={[
                          styles.filterOverlay,
                          {
                            backgroundColor: 'white',
                            opacity: 1,
                            mixBlendMode: 'difference'
                          }
                        ]}
                        pointerEvents="none"
                      />
                    </>
                  )}
                </View>
              </View>

              {/* Lines and handles - outside zoom transform so they don't scale */}
              <Svg style={styles.svgOverlay}>
                {/* Red Line (Superior endplate) */}
                <Line
                  x1={line1Start.x}
                  y1={line1Start.y}
                  x2={line1End.x}
                  y2={line1End.y}
                  stroke="#FF5252"
                  strokeWidth={3}
                  {...line1Pan.panHandlers}
                />
                <Circle
                  cx={line1Start.x}
                  cy={line1Start.y}
                  r={15}
                  fill="#FF5252"
                  opacity={0.7}
                  {...line1StartPan.panHandlers}
                />
                <Circle
                  cx={line1End.x}
                  cy={line1End.y}
                  r={15}
                  fill="#FF5252"
                  opacity={0.7}
                  {...line1EndPan.panHandlers}
                />

                {/* Blue Line (Inferior endplate) */}
                <Line
                  x1={line2Start.x}
                  y1={line2Start.y}
                  x2={line2End.x}
                  y2={line2End.y}
                  stroke="#2196F3"
                  strokeWidth={3}
                  {...line2Pan.panHandlers}
                />
                <Circle
                  cx={line2Start.x}
                  cy={line2Start.y}
                  r={15}
                  fill="#2196F3"
                  opacity={0.7}
                  {...line2StartPan.panHandlers}
                />
                <Circle
                  cx={line2End.x}
                  cy={line2End.y}
                  r={15}
                  fill="#2196F3"
                  opacity={0.7}
                  {...line2EndPan.panHandlers}
                />
              </Svg>

              {/* Angle display overlay - lower left corner (outside zoom transform) */}
              <View style={styles.angleOverlay}>
                <Text style={styles.overlayText}>{cobbAngle.toFixed(1)}°</Text>
              </View>
            </View>

            {/* Interpretation only */}
            <View style={styles.interpretationBox}>
              <Text style={styles.interpretationTitle}>Interpretation:</Text>
              {cobbAngle < 10 && (
                <Text style={styles.interpretationText}>✓ Normal (0-10°)</Text>
              )}
              {cobbAngle >= 10 && cobbAngle < 25 && (
                <Text style={[styles.interpretationText, { color: '#FF9800' }]}>
                  ⚠ Mild scoliosis (10-25°)
                </Text>
              )}
              {cobbAngle >= 25 && cobbAngle < 40 && (
                <Text style={[styles.interpretationText, { color: '#FF5722' }]}>
                  ⚠ Moderate scoliosis (25-40°)
                </Text>
              )}
              {cobbAngle >= 40 && (
                <Text style={[styles.interpretationText, { color: '#F44336' }]}>
                  ⚠ Severe scoliosis (≥40°)
                </Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveMeasurement}>
              <Text style={styles.buttonText}>💾 Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={retake}>
              <Text style={styles.buttonText}>🔄 Retake</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  displayContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlButtons: {
    marginBottom: 10,
  },
  controlRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  controlItem: {
    flex: 1,
  },
  controlLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 30,
  },
  negativeButton: {
    backgroundColor: '#757575',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  negativeButtonActive: {
    backgroundColor: '#00b5e2',
  },
  negativeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  filterOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  angleOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  overlayText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  interpretationBox: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#00b5e2',
    marginBottom: 10,
  },
  interpretationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  interpretationText: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
  },
  instructions: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  cameraButton: {
    backgroundColor: '#00b5e2',
  },
  libraryButton: {
    backgroundColor: '#4CAF50',
  },
  saveButton: {
    backgroundColor: '#00b5e2',
  },
  resetButton: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  unavailableContainer: {
    padding: 20,
  },
  unavailableTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00b5e2',
    textAlign: 'center',
    marginBottom: 8,
  },
  unavailableSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  unavailableBox: {
    backgroundColor: '#fff3e0',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    marginBottom: 20,
  },
  unavailableText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  unavailableList: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    marginTop: 10,
    marginLeft: 10,
  },
});
