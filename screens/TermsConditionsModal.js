import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';

export default function TermsConditionsModal({ visible, onClose }) {
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

  const WarningBox = ({ children }) => (
    <View style={styles.warningBox}>
      <Text style={styles.warningText}>{children}</Text>
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
          <Text style={styles.modalTitle}>Terms & Conditions</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <Text style={styles.effectiveDate}>Effective Date: January 2025</Text>

          <Section title="1. Acceptance of Terms">
            <Paragraph bold>
              By downloading, installing, or using the Rick'S mobile application ("the App"), you agree to be bound by these Terms and Conditions.
            </Paragraph>
            <Paragraph>
              If you do not agree to these terms, you must not download, install, or use the App. Your use of the App constitutes your acceptance of these terms and your agreement to comply with them.
            </Paragraph>
            <Paragraph>
              These terms apply to all users, including healthcare professionals, medical students, clinical staff, and any other individuals who access or use the App.
            </Paragraph>
          </Section>

          <Section title="2. License and Ownership">
            <SubSection title="2.1 Limited License">
              <Paragraph>
                Hepius.co grants you a limited, non-exclusive, non-transferable, revocable license to use the App for its intended medical screening and educational purposes, subject to these Terms.
              </Paragraph>
              <Paragraph bold>This license does NOT permit you to:</Paragraph>
              <BulletList items={[
                'Use the App for commercial purposes without authorization',
                'Transfer, sublicense, or resell the App',
                'Modify, adapt, or create derivative works',
                'Reverse engineer, decompile, or disassemble the App',
                'Remove or alter any copyright, trademark, or proprietary notices',
              ]} />
            </SubSection>

            <SubSection title="2.2 Intellectual Property Rights">
              <Paragraph bold>
                © 2025 Hepius.co. All rights reserved.
              </Paragraph>
              <Paragraph>
                The App and all its content, features, and functionality (including but not limited to software code, user interface design, graphics, logos, text, and documentation) are owned by Hepius.co and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </Paragraph>
            </SubSection>

            <SubSection title="2.3 User-Generated Content">
              <Paragraph>
                You retain ownership of any images, measurements, or data you input into the App. By using the App, you grant Hepius.co a limited license to process and store your data solely for the purpose of providing App functionality.
              </Paragraph>
            </SubSection>
          </Section>

          <Section title="3. Intended Use and Authorized Users">
            <SubSection title="3.1 Medical Screening Tool">
              <WarningBox>
                THE APP IS INTENDED AS A SCREENING AND EDUCATIONAL TOOL ONLY. IT IS NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL DIAGNOSIS, TREATMENT, OR ADVICE.
              </WarningBox>
              <Paragraph>
                The App provides tools to assist in the preliminary screening for scoliosis and measurement of spinal curvature. All findings must be verified by qualified healthcare professionals using appropriate clinical evaluation and diagnostic imaging.
              </Paragraph>
            </SubSection>

            <SubSection title="3.2 Authorized Users">
              <Paragraph bold>This App should be used by or under the supervision of qualified healthcare professionals, including:</Paragraph>
              <BulletList items={[
                'Licensed physicians (MDs, DOs)',
                'Orthopedic surgeons and spine specialists',
                'Physical therapists and physiotherapists',
                'Medical students under appropriate supervision',
                'Nurses and clinical staff in screening programs',
                'Healthcare workers in community health settings',
                'School nurses conducting scoliosis screenings',
              ]} />
              <Paragraph bold>
                Use by unqualified individuals for self-diagnosis or diagnosis of others is not recommended and is done at the user's own risk.
              </Paragraph>
            </SubSection>
          </Section>

          <Section title="4. Medical Disclaimer">
            <SubSection title="4.1 No Medical Diagnosis or Treatment">
              <WarningBox>
                THE APP DOES NOT PROVIDE MEDICAL DIAGNOSIS, TREATMENT RECOMMENDATIONS, OR REPLACE PROFESSIONAL MEDICAL ADVICE. ALL MEASUREMENTS AND ASSESSMENTS MUST BE VERIFIED BY QUALIFIED HEALTHCARE PROFESSIONALS.
              </WarningBox>
              <Paragraph>
                The Scoliometer and Cobb angle measurement features are screening tools only. They cannot:
              </Paragraph>
              <BulletList items={[
                'Diagnose scoliosis or any medical condition',
                'Determine the cause or type of spinal curvature',
                'Recommend specific treatments',
                'Replace clinical judgment or professional expertise',
                'Substitute for formal radiographic interpretation',
              ]} />
            </SubSection>

            <SubSection title="4.2 Screening Purposes Only">
              <Paragraph bold>
                The tools provided in this App are for initial screening and educational purposes:
              </Paragraph>
              <BulletList items={[
                'Scoliometer: Measures trunk rotation as an indicator for further evaluation',
                'Cobb Angle Tool: Assists in measuring spinal curvature from radiographs',
                'Both tools require clinical correlation and professional interpretation',
                'Positive findings should be referred to appropriate specialists',
              ]} />
            </SubSection>

            <SubSection title="4.3 Measurement Accuracy and Limitations">
              <Paragraph>
                While we strive for accuracy, measurements may vary due to:
              </Paragraph>
              <BulletList items={[
                'Device calibration and sensor accuracy',
                'User technique and experience',
                'Image quality and positioning',
                'Patient positioning and cooperation',
                'Inherent limitations of the measurement methods',
              ]} />
              <Paragraph bold>
                ALWAYS correlate App measurements with clinical findings, repeat measurements, and professional radiographic interpretation.
              </Paragraph>
            </SubSection>

            <SubSection title="4.4 Emergency Situations">
              <WarningBox>
                DO NOT use this App in emergency situations. If you or a patient experiences severe back pain, sudden neurological symptoms, bowel/bladder dysfunction, or any medical emergency, seek immediate medical attention.
              </WarningBox>
            </SubSection>
          </Section>

          <Section title="5. User Responsibilities">
            <Paragraph bold>By using this App, you agree to:</Paragraph>

            <SubSection title="5.1 Professional Conduct">
              <BulletList items={[
                'Use the App in accordance with applicable laws, regulations, and professional standards',
                'Maintain your professional competence and clinical judgment',
                'Not rely solely on App measurements for clinical decisions',
                'Verify all measurements independently when critical decisions are involved',
                'Document App use appropriately in medical records when applicable',
              ]} />
            </SubSection>

            <SubSection title="5.2 Privacy and Confidentiality">
              <BulletList items={[
                'Comply with HIPAA, GDPR, and other applicable patient privacy requirements',
                'Obtain appropriate consent before capturing patient images',
                'Remove or obscure patient identifying information from images when possible',
                'Secure your device and App access with appropriate passwords/authentication',
                'Not share patient data without proper authorization',
                'Follow your institution\'s policies regarding medical apps and patient data',
              ]} />
            </SubSection>

            <SubSection title="5.3 Professional Liability">
              <BulletList items={[
                'Maintain appropriate professional liability insurance',
                'Understand that use of this App does not transfer liability from you to Hepius.co',
                'Take full professional responsibility for patient care decisions',
                'Understand and work within your scope of practice',
              ]} />
            </SubSection>

            <SubSection title="5.4 Accurate Information">
              <BulletList items={[
                'Provide accurate information when using the App',
                'Use the App only with quality images appropriate for measurement',
                'Not manipulate or alter images in ways that could affect measurements',
                'Report any bugs, errors, or safety concerns to Hepius.co',
              ]} />
            </SubSection>
          </Section>

          <Section title="6. Prohibited Uses">
            <Paragraph bold>You may NOT:</Paragraph>
            <BulletList items={[
              'Use the App for purposes other than medical screening and education',
              'Use the App if you are not qualified or supervised by qualified professionals',
              'Use the App for self-diagnosis or diagnosis of family members without professional oversight',
              'Modify, reverse engineer, decompile, or disassemble the App',
              'Create derivative works based on the App',
              'Remove, alter, or obscure any copyright, trademark, or proprietary notices',
              'Resell, redistribute, or sublicense the App',
              'Use the App in violation of any applicable laws or regulations',
              'Share patient data in violation of privacy laws',
              'Use the App to harm, harass, or violate the rights of others',
              'Attempt to gain unauthorized access to App systems or user accounts',
              'Use the App to transmit viruses, malware, or harmful code',
              'Interfere with or disrupt the App\'s functionality',
              'Use automated systems or bots to access the App',
            ]} />
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <SubSection title="7.1 "AS IS" Provision">
              <WarningBox>
                THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY.
              </WarningBox>
            </SubSection>

            <SubSection title="7.2 No Guarantees">
              <Paragraph>Hepius.co does NOT warrant that:</Paragraph>
              <BulletList items={[
                'The App will be uninterrupted, timely, secure, or error-free',
                'The results obtained from the App will be accurate or reliable',
                'The quality of any products, services, or information obtained through the App will meet your expectations',
                'Any errors in the App will be corrected',
                'The App will be compatible with all devices or operating systems',
              ]} />
            </SubSection>
          </Section>

          <Section title="8. Limitation of Liability">
            <SubSection title="8.1 No Liability for Damages">
              <WarningBox>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, HEPIUS.CO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </WarningBox>
              <BulletList items={[
                'Medical malpractice claims or allegations',
                'Misdiagnosis or delayed diagnosis',
                'Inappropriate treatment decisions',
                'Patient injury or harm',
                'Loss of data or information',
                'Loss of profits or business opportunities',
                'Reputational damage',
                'Any other damages arising from use or inability to use the App',
              ]} />
            </SubSection>

            <SubSection title="8.2 Maximum Liability">
              <Paragraph>
                In jurisdictions that do not allow the exclusion or limitation of liability, Hepius.co's total liability shall not exceed the amount you paid for the App (if any) in the 12 months preceding the claim.
              </Paragraph>
            </SubSection>

            <SubSection title="8.3 Professional Responsibility">
              <Paragraph bold>
                Healthcare professionals using this App retain full professional responsibility for patient care decisions. The App does not assume any medical liability, and use of the App does not create a doctor-patient relationship between Hepius.co and any patient.
              </Paragraph>
            </SubSection>
          </Section>

          <Section title="9. Indemnification">
            <Paragraph bold>
              You agree to indemnify, defend, and hold harmless Hepius.co, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
            </Paragraph>
            <BulletList items={[
              'Your use or misuse of the App',
              'Your violation of these Terms',
              'Your violation of any rights of another party',
              'Your violation of any applicable laws or regulations',
              'Any medical malpractice or negligence claims',
              'Any breach of patient confidentiality or privacy',
            ]} />
          </Section>

          <Section title="10. Updates and Modifications">
            <SubSection title="10.1 App Updates">
              <Paragraph>We reserve the right to:</Paragraph>
              <BulletList items={[
                'Update the App to fix bugs or add features',
                'Modify the App\'s functionality',
                'Discontinue features or the entire App with or without notice',
                'Require you to accept updated terms to continue using the App',
              ]} />
            </SubSection>

            <SubSection title="10.2 Terms Modifications">
              <Paragraph>
                We may modify these Terms at any time. Significant changes will be communicated through the App or by email. Continued use of the App after modifications constitutes acceptance of the updated Terms.
              </Paragraph>
            </SubSection>
          </Section>

          <Section title="11. Privacy and Data">
            <Paragraph>
              Your use of the App is also governed by our Privacy Policy. By using the App, you consent to our collection, use, and disclosure of data as described in the Privacy Policy.
            </Paragraph>
            <Paragraph bold>
              You are responsible for ensuring your use of the App complies with all applicable privacy laws and regulations, including HIPAA (if in the US), GDPR (if in the EU), and other regional requirements.
            </Paragraph>
          </Section>

          <Section title="12. Regulatory Compliance">
            <SubSection title="12.1 Not a Medical Device">
              <WarningBox>
                This App is NOT FDA-cleared, CE-marked, or approved as a medical device. It is provided as a screening tool and educational resource only.
              </WarningBox>
            </SubSection>

            <SubSection title="12.2 User Responsibility">
              <Paragraph>
                Users are responsible for ensuring compliance with local medical device regulations and professional practice standards. Some jurisdictions may require specific authorization or regulatory approval for use of medical screening tools.
              </Paragraph>
            </SubSection>
          </Section>

          <Section title="13. Termination">
            <Paragraph>
              We reserve the right to terminate or suspend your access to the App at any time, without notice, for any reason, including but not limited to:
            </Paragraph>
            <BulletList items={[
              'Violation of these Terms',
              'Fraudulent, abusive, or illegal activity',
              'Risk to patient safety',
              'Upon your request',
            ]} />
            <Paragraph>
              Upon termination, your right to use the App will immediately cease. Provisions regarding liability, indemnification, and dispute resolution shall survive termination.
            </Paragraph>
          </Section>

          <Section title="14. Governing Law and Dispute Resolution">
            <SubSection title="14.1 Governing Law">
              <Paragraph>
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
              </Paragraph>
            </SubSection>

            <SubSection title="14.2 Dispute Resolution">
              <Paragraph>
                Any disputes arising from these Terms or use of the App should first be addressed through good-faith negotiation. If negotiation fails, disputes may be resolved through binding arbitration or in courts of competent jurisdiction, as applicable in your region.
              </Paragraph>
            </SubSection>
          </Section>

          <Section title="15. Severability">
            <Paragraph>
              If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
            </Paragraph>
          </Section>

          <Section title="16. Entire Agreement">
            <Paragraph>
              These Terms, together with the Privacy Policy, constitute the entire agreement between you and Hepius.co regarding the App, and supersede all prior or contemporaneous communications, whether electronic, oral, or written.
            </Paragraph>
          </Section>

          <Section title="17. No Waiver">
            <Paragraph>
              Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver must be in writing and signed by an authorized representative of Hepius.co.
            </Paragraph>
          </Section>

          <Section title="18. Contact Information">
            <Paragraph>
              For questions about these Terms and Conditions, contact:
            </Paragraph>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>Company: Hepius.co</Text>
              <Text style={styles.contactText}>Email: contact@hepius.co</Text>
              <Text style={styles.contactText}>Website: hepius.co</Text>
            </View>
          </Section>

          <Section title="19. Acknowledgment">
            <WarningBox>
              BY USING THE RICK'S APP, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS. IF YOU DO NOT AGREE, YOU MUST NOT USE THE APP.
            </WarningBox>
            <Paragraph bold>
              You further acknowledge that:
            </Paragraph>
            <BulletList items={[
              'You understand the App is a screening tool, not a diagnostic device',
              'You accept full professional responsibility for clinical decisions',
              'You will comply with all applicable laws and professional standards',
              'You have read and understood the limitations and disclaimers',
            ]} />
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
  warningBox: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    marginBottom: 15,
  },
  warningText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E65100',
    lineHeight: 22,
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
