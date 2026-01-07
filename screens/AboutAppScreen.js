import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity, Modal } from 'react-native';

export default function AboutAppScreen() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About This App</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purpose</Text>
          <Text style={styles.text}>
            This mobile application is designed to assist healthcare workers, medical students,
            and clinicians in screening for scoliosis and assessing spinal curvature using
            accessible, evidence-based tools.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>

          <View style={styles.feature}>
            <Text style={styles.featureTitle}>📱 Scoliometer</Text>
            <Text style={styles.text}>
              A digital inclinometer that measures the angle of trunk rotation (ATR) during
              the Adams Forward Bend Test. This non-invasive screening tool helps identify
              potential scoliosis cases that may require further evaluation.
            </Text>
            <Text style={styles.interpretation}>
              • 0-5°: Normal range{'\n'}
              • 5-7°: Mild rotation, monitor patient{'\n'}
              • ≥7°: Significant rotation, consider referral
            </Text>
          </View>

          <View style={styles.feature}>
            <Text style={styles.featureTitle}>📐 Cobb Angle Measurement</Text>
            <Text style={styles.text}>
              A tool for measuring the Cobb angle directly from spine X-rays. Healthcare
              providers can take a photo of an X-ray and use adjustable reference lines to
              determine the degree of spinal curvature.
            </Text>
            <Text style={styles.interpretation}>
              • &lt;10°: Normal variation{'\n'}
              • 10-25°: Mild scoliosis{'\n'}
              • 25-40°: Moderate scoliosis{'\n'}
              • &gt;40°: Severe scoliosis
            </Text>
          </View>
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

      {/* Privacy Policy Modal */}
      <Modal
        visible={showPrivacyPolicy}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowPrivacyPolicy(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <TouchableOpacity onPress={() => setShowPrivacyPolicy(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalText}>
              <Text style={styles.modalSectionTitle}>Effective Date: January 2025{'\n\n'}</Text>

              <Text style={styles.modalSectionTitle}>1. Introduction{'\n'}</Text>
              Rick'S ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use the Rick'S mobile application.{'\n\n'}

              <Text style={styles.modalSectionTitle}>2. Information We Collect{'\n'}</Text>
              <Text style={styles.modalSubtitle}>2.1 Information You Provide:{'\n'}</Text>
              • X-ray images you upload or capture for Cobb angle measurements{'\n'}
              • Measurement data (angles, rotation values){'\n'}
              • Any notes or annotations you add{'\n\n'}

              <Text style={styles.modalSubtitle}>2.2 Automatically Collected Information:{'\n'}</Text>
              • Device motion sensor data (for Scoliometer feature){'\n'}
              • App usage statistics and crash reports{'\n'}
              • Device type and operating system version{'\n\n'}

              <Text style={styles.modalSectionTitle}>3. How We Use Your Information{'\n'}</Text>
              • To provide the core functionality of the app (measuring angles and rotations){'\n'}
              • To improve app performance and user experience{'\n'}
              • To diagnose and fix technical issues{'\n'}
              • To comply with legal obligations{'\n\n'}

              <Text style={styles.modalSectionTitle}>4. Data Storage and Security{'\n'}</Text>
              • All X-ray images and measurements are stored locally on your device by default{'\n'}
              • If cloud storage is enabled, images are encrypted during transmission{'\n'}
              • We implement industry-standard security measures to protect your data{'\n'}
              • You can delete all stored data at any time through your device settings{'\n\n'}

              <Text style={styles.modalSectionTitle}>5. Medical Data Privacy{'\n'}</Text>
              • This app handles sensitive medical information{'\n'}
              • We do not share patient data with third parties without explicit consent{'\n'}
              • Healthcare providers using this app are responsible for HIPAA compliance{'\n'}
              • We recommend removing patient identifying information from X-rays before use{'\n\n'}

              <Text style={styles.modalSectionTitle}>6. Third-Party Services{'\n'}</Text>
              • We may use analytics services to improve the app{'\n'}
              • These services are configured to minimize data collection{'\n'}
              • No medical images or measurements are shared with analytics providers{'\n\n'}

              <Text style={styles.modalSectionTitle}>7. Your Rights{'\n'}</Text>
              • Access: You can access all data stored by the app{'\n'}
              • Deletion: You can delete your data at any time{'\n'}
              • Export: You can save measurements and images to your device{'\n'}
              • Opt-out: You can disable optional data collection in settings{'\n\n'}

              <Text style={styles.modalSectionTitle}>8. Children's Privacy{'\n'}</Text>
              This app is intended for use by healthcare professionals and is not directed at children under 13. We do not knowingly collect information from children.{'\n\n'}

              <Text style={styles.modalSectionTitle}>9. International Users{'\n'}</Text>
              If you use this app outside your country of residence, your information may be transferred and stored in other jurisdictions with different privacy laws.{'\n\n'}

              <Text style={styles.modalSectionTitle}>10. Changes to This Policy{'\n'}</Text>
              We may update this Privacy Policy periodically. Continued use of the app after changes constitutes acceptance of the updated policy.{'\n\n'}

              <Text style={styles.modalSectionTitle}>11. Contact Us{'\n'}</Text>
              If you have questions about this Privacy Policy, contact us at:{'\n'}
              Email: contact@hepius.co{'\n'}
              Website: hepius.co{'\n\n'}

              <Text style={styles.modalSectionTitle}>12. Data Controller{'\n'}</Text>
              Hepius.co is the data controller responsible for your personal information under this Privacy Policy.
            </Text>
          </ScrollView>
        </View>
      </Modal>

      {/* Terms & Conditions Modal */}
      <Modal
        visible={showTerms}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowTerms(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Terms & Conditions</Text>
            <TouchableOpacity onPress={() => setShowTerms(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalText}>
              <Text style={styles.modalSectionTitle}>Effective Date: January 2025{'\n\n'}</Text>

              <Text style={styles.modalSectionTitle}>1. Acceptance of Terms{'\n'}</Text>
              By downloading, installing, or using the Rick'S mobile application ("the App"), you agree to be bound by these Terms and Conditions. If you do not agree, do not use the App.{'\n\n'}

              <Text style={styles.modalSectionTitle}>2. License and Ownership{'\n'}</Text>
              <Text style={styles.modalSubtitle}>2.1 License Grant:{'\n'}</Text>
              Hepius.co grants you a limited, non-exclusive, non-transferable, revocable license to use the App for its intended medical screening purposes.{'\n\n'}

              <Text style={styles.modalSubtitle}>2.2 Copyright:{'\n'}</Text>
              © 2025 Hepius.co. All rights reserved. The App and its content are protected by copyright and intellectual property laws.{'\n\n'}

              <Text style={styles.modalSectionTitle}>3. Intended Use{'\n'}</Text>
              <Text style={styles.modalSubtitle}>3.1 Medical Screening Tool:{'\n'}</Text>
              The App is intended as a screening and educational tool for healthcare professionals. It is NOT a substitute for professional medical diagnosis or treatment.{'\n\n'}

              <Text style={styles.modalSubtitle}>3.2 Authorized Users:{'\n'}</Text>
              This App should be used by or under the supervision of qualified healthcare professionals, including:{'\n'}
              • Licensed physicians{'\n'}
              • Medical students under supervision{'\n'}
              • Nurses and clinical staff{'\n'}
              • Healthcare workers in screening programs{'\n\n'}

              <Text style={styles.modalSectionTitle}>4. Medical Disclaimer{'\n'}</Text>
              <Text style={styles.modalSubtitle}>4.1 No Medical Diagnosis:{'\n'}</Text>
              THE APP DOES NOT PROVIDE MEDICAL DIAGNOSIS, TREATMENT RECOMMENDATIONS, OR REPLACE PROFESSIONAL MEDICAL ADVICE. All measurements must be verified by qualified healthcare professionals.{'\n\n'}

              <Text style={styles.modalSubtitle}>4.2 Screening Purposes Only:{'\n'}</Text>
              The Scoliometer and Cobb angle measurement tools are screening instruments only. Definitive diagnosis requires comprehensive clinical evaluation and professional radiographic interpretation.{'\n\n'}

              <Text style={styles.modalSubtitle}>4.3 Measurement Accuracy:{'\n'}</Text>
              While we strive for accuracy, measurements may vary based on device calibration, user technique, image quality, and other factors. Always correlate with clinical findings.{'\n\n'}

              <Text style={styles.modalSectionTitle}>5. User Responsibilities{'\n'}</Text>
              You agree to:{'\n'}
              • Use the App in accordance with applicable laws and regulations{'\n'}
              • Comply with HIPAA and other patient privacy requirements{'\n'}
              • Verify all measurements independently{'\n'}
              • Maintain appropriate professional liability insurance{'\n'}
              • Not rely solely on App measurements for clinical decisions{'\n'}
              • Keep your device secure when storing patient data{'\n\n'}

              <Text style={styles.modalSectionTitle}>6. Prohibited Uses{'\n'}</Text>
              You may NOT:{'\n'}
              • Use the App for purposes other than medical screening{'\n'}
              • Modify, reverse engineer, or create derivative works{'\n'}
              • Remove copyright or proprietary notices{'\n'}
              • Resell or redistribute the App{'\n'}
              • Use the App in violation of any laws{'\n'}
              • Share patient data without proper authorization{'\n\n'}

              <Text style={styles.modalSectionTitle}>7. Limitation of Liability{'\n'}</Text>
              <Text style={styles.modalSubtitle}>7.1 No Warranty:{'\n'}</Text>
              THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.{'\n\n'}

              <Text style={styles.modalSubtitle}>7.2 Limitation:{'\n'}</Text>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, HEPIUS.CO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING MEDICAL MALPRACTICE CLAIMS, ARISING FROM USE OF THE APP.{'\n\n'}

              <Text style={styles.modalSubtitle}>7.3 Professional Responsibility:{'\n'}</Text>
              Healthcare professionals using this App retain full professional responsibility for patient care decisions. The App does not assume any medical liability.{'\n\n'}

              <Text style={styles.modalSectionTitle}>8. Data and Privacy{'\n'}</Text>
              Your use of the App is subject to our Privacy Policy. By using the App, you consent to our collection and use of data as described in the Privacy Policy.{'\n\n'}

              <Text style={styles.modalSectionTitle}>9. Updates and Modifications{'\n'}</Text>
              We reserve the right to:{'\n'}
              • Update the App to fix bugs or add features{'\n'}
              • Modify these Terms at any time{'\n'}
              • Discontinue the App or features with or without notice{'\n\n'}

              Continued use after updates constitutes acceptance of modified Terms.{'\n\n'}

              <Text style={styles.modalSectionTitle}>10. Indemnification{'\n'}</Text>
              You agree to indemnify and hold harmless Hepius.co from any claims, damages, or expenses arising from your use of the App or violation of these Terms.{'\n\n'}

              <Text style={styles.modalSectionTitle}>11. Regulatory Compliance{'\n'}</Text>
              This App is not FDA-cleared or CE-marked as a medical device. It is provided as a screening tool and educational resource. Users are responsible for compliance with local medical device regulations.{'\n\n'}

              <Text style={styles.modalSectionTitle}>12. Governing Law{'\n'}</Text>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.{'\n\n'}

              <Text style={styles.modalSectionTitle}>13. Severability{'\n'}</Text>
              If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.{'\n\n'}

              <Text style={styles.modalSectionTitle}>14. Entire Agreement{'\n'}</Text>
              These Terms, together with the Privacy Policy, constitute the entire agreement between you and Hepius.co regarding the App.{'\n\n'}

              <Text style={styles.modalSectionTitle}>15. Contact Information{'\n'}</Text>
              For questions about these Terms, contact:{'\n'}
              Email: contact@hepius.co{'\n'}
              Website: hepius.co{'\n\n'}

              <Text style={styles.modalSectionTitle}>Acknowledgment{'\n'}</Text>
              By using the Rick'S App, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </Text>
          </ScrollView>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    backgroundColor: '#00b5e2',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00b5e2',
  },
  modalSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
  },
});
