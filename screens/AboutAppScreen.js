import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsConditionsModal from './TermsConditionsModal';

export default function AboutAppScreen() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purpose</Text>
          <Text style={styles.text}>
            This mobile application is designed to assist healthcare workers, medical students,
            and clinicians in screening for scoliosis and assessing spinal curvature using
            accessible, evidence-based tools.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who Can Benefit</Text>
          <Text style={styles.text}>
            • Medical professionals in resource-limited settings{'\n'}
            • School screening programs{'\n'}
            • Clinics and hospitals without dedicated equipment{'\n'}
            • Medical education and training{'\n'}
            • Remote healthcare providers
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspiration</Text>
          <Text style={styles.text}>
            This app was created in honor of Dr. Rick Hodes and his decades of humanitarian
            medical work treating scoliosis and spinal tuberculosis in underserved communities,
            particularly in Ethiopia. Dr. Hodes has demonstrated that with dedication and
            the right tools, life-changing medical care can reach those who need it most.
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>⚠️ Medical Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This app is intended as a screening and educational tool only. It does not
            replace professional medical diagnosis or treatment. All measurements should be
            verified by qualified healthcare professionals. For definitive diagnosis and
            treatment planning, consult with a licensed physician or specialist.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal & Privacy</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setShowPrivacyPolicy(true)}
          >
            <Text style={styles.linkText}>📄 Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setShowTerms(true)}
          >
            <Text style={styles.linkText}>📋 Terms & Conditions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Version 1.0.0{'\n'}
            © 2025 Hepius.co{'\n'}
            Contact: contact@hepius.co{'\n'}
            Made with dedication to improving spinal health screening worldwide
          </Text>
        </View>
      </View>

      <PrivacyPolicyModal
        visible={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />

      <TermsConditionsModal
        visible={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00b5e2',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  feature: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  interpretation: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    lineHeight: 22,
    fontFamily: 'monospace',
  },
  disclaimer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 10,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#E65100',
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkButton: {
    backgroundColor: '#00b5e2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
