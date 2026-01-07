import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';

export default function PrivacyPolicyModal({ visible, onClose }) {
  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const SubSection = ({ title, children }) => (
    <View style={styles.subSection}>
      <Text style={styles.subTitle}>{title}</Text>
      {children}
    </View>
  );

  const Paragraph = ({ children, bold }) => (
    <Text style={[styles.paragraph, bold && styles.boldText]}>{children}</Text>
  );

  const BulletList = ({ items }) => (
    <View style={styles.bulletList}>
      {items.map((item, index) => (
        <View key={index} style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Privacy Policy</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <Text style={styles.effectiveDate}>Effective Date: January 2025</Text>

          <Section title="1. Introduction">
            <Paragraph>
              Rick'S ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use the Rick'S mobile application ("the App").
            </Paragraph>
            <Paragraph>
              This policy applies to all users of the App, including healthcare professionals, medical students, and clinical staff. By using the App, you consent to the data practices described in this policy.
            </Paragraph>
          </Section>

          <Section title="2. Information We Collect">
            <SubSection title="2.1 Information You Provide">
              <BulletList items={[
                'X-ray images you upload or capture for Cobb angle measurements',
                'Measurement data (trunk rotation angles, Cobb angles)',
                'Any notes, annotations, or labels you add to measurements',
                'Patient tracking data if you choose to use that feature',
              ]} />
            </SubSection>

            <SubSection title="2.2 Automatically Collected Information">
              <BulletList items={[
                'Device motion sensor data (for Scoliometer feature only when actively using the tool)',
                'App usage statistics and performance metrics',
                'Crash reports and error logs for debugging',
                'Device type, operating system version, and app version',
                'Anonymized analytics data to improve app functionality',
              ]} />
            </SubSection>

            <SubSection title="2.3 Information We Do NOT Collect">
              <BulletList items={[
                'We do not collect patient names or identifiable information',
                'We do not access your contacts, messages, or other apps',
                'We do not track your location',
                'We do not collect payment or financial information',
                'We do not use cookies or tracking technologies in the native app',
              ]} />
            </SubSection>
          </Section>

          <Section title="3. How We Use Your Information">
            <Paragraph bold>We use the collected information for the following purposes:</Paragraph>
            <BulletList items={[
              'To provide core app functionality (angle measurements, image processing)',
              'To improve app performance, stability, and user experience',
              'To diagnose and fix technical issues and bugs',
              'To analyze usage patterns and optimize features',
              'To comply with legal obligations and respond to legal requests',
              'To communicate important app updates or security notices',
            ]} />
            <Paragraph>
              We do NOT use your information for marketing, advertising, or selling to third parties.
            </Paragraph>
          </Section>

          <Section title="4. Data Storage and Security">
            <SubSection title="4.1 Local Storage">
              <Paragraph bold>By default, all data is stored locally on your device:</Paragraph>
              <BulletList items={[
                'X-ray images and measurements are saved in the app\'s secure storage',
                'No data is automatically sent to external servers',
                'You maintain full control over your data',
                'Data remains on your device unless you enable cloud backup',
              ]} />
            </SubSection>

            <SubSection title="4.2 Cloud Storage (Optional)">
              <Paragraph>If you enable cloud storage features:</Paragraph>
              <BulletList items={[
                'Images are encrypted during transmission using industry-standard TLS/SSL',
                'Data is stored on secure, HIPAA-compliant cloud servers',
                'You can delete cloud-stored data at any time',
                'Access to cloud data requires authentication',
              ]} />
            </SubSection>

            <SubSection title="4.3 Security Measures">
              <Paragraph>We implement multiple layers of security:</Paragraph>
              <BulletList items={[
                'Encryption of data in transit and at rest',
                'Secure authentication for cloud features',
                'Regular security audits and updates',
                'Protection against unauthorized access',
                'Automatic session timeouts for enhanced security',
              ]} />
            </SubSection>

            <SubSection title="4.4 Data Retention">
              <BulletList items={[
                'Local data: Retained until you delete it or uninstall the app',
                'Cloud data: Retained until you delete it or close your account',
                'Analytics data: Retained for up to 12 months in anonymized form',
                'Crash reports: Retained for up to 90 days',
              ]} />
            </SubSection>
          </Section>

          <Section title="5. Medical Data Privacy">
            <Paragraph bold>This app handles sensitive medical information. We take the following precautions:</Paragraph>
            <BulletList items={[
              'Patient PHI (Protected Health Information) is never required for app functionality',
              'We strongly recommend removing patient identifying information from X-rays before use',
              'Healthcare providers are solely responsible for HIPAA compliance',
              'We do not share patient data with third parties without explicit consent',
              'Medical images are not used for AI training or research without consent',
              'All data processing complies with applicable medical privacy regulations',
            ]} />
            <Paragraph bold>
              Healthcare providers using this app must ensure they comply with all applicable privacy laws including HIPAA (US), GDPR (EU), and other regional regulations.
            </Paragraph>
          </Section>

          <Section title="6. Third-Party Services">
            <SubSection title="6.1 Analytics Services">
              <Paragraph>We may use third-party analytics services to improve the app:</Paragraph>
              <BulletList items={[
                'Services are configured to minimize data collection',
                'No medical images or measurements are shared with analytics providers',
                'Only anonymized usage statistics are collected',
                'You can opt out of analytics in app settings',
              ]} />
            </SubSection>

            <SubSection title="6.2 Cloud Storage Providers">
              <Paragraph>If using cloud features, data may be stored with:</Paragraph>
              <BulletList items={[
                'HIPAA-compliant cloud service providers',
                'Providers with appropriate Business Associate Agreements (BAAs)',
                'Services with industry-standard security certifications',
              ]} />
            </SubSection>

            <SubSection title="6.3 No Third-Party Advertising">
              <Paragraph bold>
                This app does NOT contain third-party advertising or ad tracking.
              </Paragraph>
            </SubSection>
          </Section>

          <Section title="7. Your Rights and Choices">
            <SubSection title="7.1 Access and Control">
              <BulletList items={[
                'Access: You can view all data stored by the app',
                'Correction: You can edit or correct any stored data',
                'Deletion: You can delete any or all data at any time',
                'Export: You can save measurements and images to your device',
                'Portability: You can export data in standard formats',
              ]} />
            </SubSection>

            <SubSection title="7.2 Opt-Out Options">
              <BulletList items={[
                'Analytics: Disable in app settings',
                'Cloud backup: Turn off cloud features',
                'Crash reporting: Disable in settings',
                'Notifications: Manage through device settings',
              ]} />
            </SubSection>

            <SubSection title="7.3 Account Deletion">
              <Paragraph>
                You can delete your account and all associated data by:
              </Paragraph>
              <BulletList items={[
                'Contacting us at contact@hepius.co',
                'Using the account deletion feature in settings (if available)',
                'Uninstalling the app (deletes all local data)',
              ]} />
              <Paragraph>
                Upon account deletion, all data is permanently removed within 30 days.
              </Paragraph>
            </SubSection>
          </Section>

          <Section title="8. Children's Privacy">
            <Paragraph bold>
              This app is intended for use by healthcare professionals and is not directed at children under 13 years of age.
            </Paragraph>
            <BulletList items={[
              'We do not knowingly collect personal information from children',
              'If we learn we have collected data from a child, we will delete it immediately',
              'Parents or guardians should not allow children to use this app unsupervised',
            ]} />
          </Section>

          <Section title="9. International Users and Data Transfers">
            <Paragraph>
              If you use this app outside your country of residence, please be aware:
            </Paragraph>
            <BulletList items={[
              'Your information may be transferred to and stored in other jurisdictions',
              'Different jurisdictions may have different privacy laws',
              'We comply with applicable international data protection regulations',
              'For EU users: We comply with GDPR requirements for data transfers',
              'For California users: We comply with CCPA requirements',
            ]} />
          </Section>

          <Section title="10. Data Breach Notification">
            <Paragraph>
              In the event of a data breach affecting your information:
            </Paragraph>
            <BulletList items={[
              'We will notify affected users within 72 hours of discovery',
              'Notification will be sent via in-app message or email',
              'We will report the breach to applicable authorities as required by law',
              'We will take immediate steps to contain and remediate the breach',
            ]} />
          </Section>

          <Section title="11. Changes to This Policy">
            <Paragraph>
              We may update this Privacy Policy from time to time to reflect:
            </Paragraph>
            <BulletList items={[
              'Changes in app functionality',
              'Legal or regulatory requirements',
              'Improved privacy practices',
              'User feedback and requests',
            ]} />
            <Paragraph bold>
              When we make significant changes, we will notify you through the app or by email. Continued use of the app after changes constitutes acceptance of the updated policy.
            </Paragraph>
            <Paragraph>
              Previous versions of the policy will be archived and available upon request.
            </Paragraph>
          </Section>

          <Section title="12. Contact Us">
            <Paragraph>
              If you have questions, concerns, or requests regarding this Privacy Policy or your data, contact us at:
            </Paragraph>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>Email: contact@hepius.co</Text>
              <Text style={styles.contactText}>Website: hepius.co</Text>
              <Text style={styles.contactText}>
                Response time: We aim to respond within 48 business hours
              </Text>
            </View>
          </Section>

          <Section title="13. Data Controller">
            <Paragraph bold>
              Hepius.co is the data controller responsible for your personal information under this Privacy Policy.
            </Paragraph>
            <Paragraph>
              Data Controller Details:
            </Paragraph>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>Company: Hepius.co</Text>
              <Text style={styles.contactText}>Contact: contact@hepius.co</Text>
            </View>
          </Section>

          <Section title="14. Your Consent">
            <Paragraph bold>
              By using the Rick'S App, you acknowledge that you have read, understood, and agree to this Privacy Policy. If you do not agree, please do not use the app.
            </Paragraph>
          </Section>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  effectiveDate: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b5e2',
    marginBottom: 12,
  },
  subSection: {
    marginBottom: 15,
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  bulletList: {
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 5,
  },
  bullet: {
    fontSize: 15,
    color: '#00b5e2',
    marginRight: 10,
    fontWeight: 'bold',
  },
  bulletText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    flex: 1,
  },
  contactInfo: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  bottomPadding: {
    height: 40,
  },
});
