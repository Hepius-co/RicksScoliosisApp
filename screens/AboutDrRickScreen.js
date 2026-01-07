import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';

export default function AboutDrRickScreen() {
  const openRickHodesWebsite = () => {
    Linking.openURL('https://rickhodes.org');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Placeholder for Dr. Rick's Photo */}
        <View style={styles.photoContainer}>
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>Dr. Rick Hodes{'\n'}Photo Placeholder</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>A Life of Compassion and Service</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who is Dr. Rick Hodes?</Text>
          <Text style={styles.text}>
            Dr. Rick Hodes is an American physician who has dedicated his life to treating
            some of the world's most vulnerable patients. For over three decades, he has
            worked in Ethiopia, providing medical care to patients with spinal tuberculosis,
            scoliosis, and other complex spinal conditions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>His Work</Text>
          <Text style={styles.text}>
            Dr. Hodes serves as the Medical Director for the American Jewish Joint Distribution
            Committee (JDC) in Ethiopia. He specializes in treating patients with severe
            spinal deformities, many of whom have been abandoned by society due to their
            conditions.
          </Text>
          <Text style={styles.text}>
            He has personally arranged for hundreds of Ethiopian patients to receive
            life-changing spinal surgery, often navigating complex medical, financial, and
            logistical challenges to ensure they get the care they need.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impact on Scoliosis Treatment</Text>
          <Text style={styles.text}>
            • Treated thousands of patients with spinal conditions{'\n'}
            • Pioneered access to spinal surgery for underserved communities{'\n'}
            • Mentored countless medical professionals in resource-limited settings{'\n'}
            • Advocated for patients who would otherwise have no voice{'\n'}
            • Demonstrated that quality medical care can reach the most remote areas
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recognition</Text>
          <Text style={styles.text}>
            Dr. Hodes has been featured in numerous documentaries and news programs,
            including CNN Heroes. His work has inspired medical professionals worldwide
            to consider how they can serve vulnerable populations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beyond Medicine</Text>
          <Text style={styles.text}>
            Dr. Hodes has adopted five Ethiopian children, several of whom came to him
            as patients. He has opened his home and his heart to those in need, embodying
            the principle that healing extends beyond medical treatment.
          </Text>
        </View>

        <View style={styles.quote}>
          <Text style={styles.quoteText}>
            "I don't think I'm doing anything special. I'm just doing what doctors are
            supposed to do - taking care of sick people."
          </Text>
          <Text style={styles.quoteAuthor}>- Dr. Rick Hodes</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>His Legacy</Text>
          <Text style={styles.text}>
            Dr. Hodes' work demonstrates that with dedication, compassion, and the right
            tools, medical professionals can make an extraordinary difference in the lives
            of their patients, regardless of where they practice.
          </Text>
          <Text style={styles.text}>
            This app is inspired by his commitment to making spinal health assessment
            accessible to healthcare workers around the world, especially in areas where
            specialized equipment may not be readily available.
          </Text>
        </View>

        <View style={styles.inspiration}>
          <Text style={styles.inspirationText}>
            "May this app serve as a small tribute to Dr. Hodes' life work and help extend
            the reach of quality spinal health screening to every corner of the world."
          </Text>
        </View>

        <TouchableOpacity style={styles.linkButton} onPress={openRickHodesWebsite}>
          <Text style={styles.linkButtonText}>🌐 Visit rickhodes.org</Text>
          <Text style={styles.linkButtonSubtext}>Learn More and Support the Cause</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Hepius.co{'\n'}
            Contact: contact@hepius.co
          </Text>
        </View>
      </View>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00b5e2',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    fontStyle: 'italic',
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
    fontSize: 20,
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
  quote: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 25,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#00b5e2',
  },
  quoteText: {
    fontSize: 16,
    color: '#1976D2',
    lineHeight: 26,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  inspiration: {
    backgroundColor: '#F3E5F5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  inspirationText: {
    fontSize: 15,
    color: '#6A1B9A',
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  footerText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#00b5e2',
  },
  photoPlaceholderText: {
    fontSize: 14,
    color: '#00b5e2',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkButton: {
    backgroundColor: '#00b5e2',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  linkButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  linkButtonSubtext: {
    fontSize: 13,
    color: 'white',
    opacity: 0.9,
  },
});
