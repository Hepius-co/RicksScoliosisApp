import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DeviceMotion } from 'expo-sensors';

const { width } = Dimensions.get('window');

export default function ScoliometerScreen() {
  const [angle, setAngle] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [frozenAngle, setFrozenAngle] = useState(0);
  const [isWebPlatform] = useState(Platform.OS === 'web');
  const [sensorAvailable, setSensorAvailable] = useState(true);

  useEffect(() => {
    // Skip sensor setup on web
    if (isWebPlatform) {
      setSensorAvailable(false);
      return;
    }

    // Check if DeviceMotion is available
    DeviceMotion.isAvailableAsync().then((available) => {
      if (!available) {
        setSensorAvailable(false);
        return;
      }

      try {
        DeviceMotion.setUpdateInterval(100);

        const sub = DeviceMotion.addListener((data) => {
          if (data.rotation && !isPaused) {
            // Calculate roll angle in degrees
            const roll = data.rotation.beta * (180 / Math.PI);
            setAngle(Math.abs(roll));
          }
        });

        setSubscription(sub);
      } catch (error) {
        console.log('DeviceMotion error:', error);
        setSensorAvailable(false);
      }
    }).catch(() => {
      setSensorAvailable(false);
    });

    return () => {
      if (subscription && subscription.remove) {
        subscription.remove();
      }
    };
  }, [isPaused, isWebPlatform]);

  const togglePause = () => {
    if (!isPaused) {
      setFrozenAngle(angle);
    }
    setIsPaused(!isPaused);
  };

  const reset = () => {
    setAngle(0);
    setIsPaused(false);
    setFrozenAngle(0);
  };

  const displayAngle = isPaused ? frozenAngle : angle;

  // Show message if sensors not available (web platform)
  if (!sensorAvailable) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.unavailableContainer}>
          <Text style={styles.unavailableTitle}>🧭 Scoliometer</Text>
          <Text style={styles.unavailableSubtitle}>Device sensors not available</Text>
          <View style={styles.unavailableBox}>
            <Text style={styles.unavailableText}>
              The Scoliometer requires device motion sensors that are only available in the native mobile apps.
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
            <Text style={styles.instructionTitle}>About the Scoliometer:</Text>
            <Text style={styles.instructionText}>
              The Scoliometer measures trunk rotation angle by using your device's motion sensors.
              It's a screening tool to detect potential scoliosis during forward bend tests.{'\n\n'}
              <Text style={{ fontWeight: 'bold' }}>How it works in the mobile app:</Text>{'\n'}
              1. Patient bends forward at the waist{'\n'}
              2. Place phone horizontally on spine{'\n'}
              3. Read trunk rotation angle{'\n'}
              4. Angles ≥7° suggest referral for X-ray
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Rotated display container for landscape viewing */}
      <View style={styles.rotatedWrapper}>
        <View style={styles.displayContainer}>
          {/* Pause button at the top */}
          <View style={styles.controlButtons}>
            <TouchableOpacity
              style={[styles.controlButton, isPaused ? styles.resumeButton : styles.pauseButton]}
              onPress={togglePause}
            >
              <Text style={styles.controlButtonText}>
                {isPaused ? '▶ Resume' : '⏸ Pause'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Angle display - full width */}
          <View style={styles.angleDisplay}>
            <Text style={styles.angleText}>{displayAngle.toFixed(1)}°</Text>
          </View>

          {/* Level indicator */}
          <View style={styles.levelIndicator}>
            <View
              style={[
                styles.bubble,
                {
                  left: `${Math.max(10, Math.min(90, 50 + (displayAngle * 2)))}%`,
                  backgroundColor: Math.abs(displayAngle) < 5 ? '#4CAF50' : '#FF9800'
                }
              ]}
            />
          </View>

          {/* Interpretation box - below level indicator */}
          <View style={styles.interpretationBox}>
            <Text style={styles.interpretationTitle}>Interpretation:</Text>
            {displayAngle < 5 && <Text style={styles.interpretationText}>✓ Normal (0-5°)</Text>}
            {displayAngle >= 5 && displayAngle < 7 && (
              <Text style={[styles.interpretationText, { color: '#FF9800' }]}>
                ⚠ Mild rotation (5-7°) - Monitor
              </Text>
            )}
            {displayAngle >= 7 && (
              <Text style={[styles.interpretationText, { color: '#F44336' }]}>
                ⚠ Significant rotation (≥7°) - Consider referral
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>How to use:</Text>
        <Text style={styles.instructionText}>
          1. Have patient bend forward at the waist{'\n'}
          2. Place phone horizontally on the spine at the area of prominence{'\n'}
          3. Tap "Pause" to freeze the measurement{'\n'}
          4. Read the trunk rotation angle
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={reset}
        >
          <Text style={styles.buttonText}>Reset All</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  rotatedWrapper: {
    transform: [{ rotate: '90deg' }],
    height: width,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 8,
  },
  displayContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    height: '100%',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  controlButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  angleDisplay: {
    alignItems: 'center',
    marginBottom: 12,
  },
  angleText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#00b5e2',
  },
  levelIndicator: {
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    marginBottom: 12,
    position: 'relative',
    justifyContent: 'center',
  },
  bubble: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    position: 'absolute',
    marginLeft: -17.5,
  },
  interpretationBox: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#00b5e2',
    marginTop: 8,
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
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  instructionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  instructionText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  calibrateButton: {
    backgroundColor: '#00b5e2',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resumeButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  unavailableContainer: {
    flex: 1,
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
