import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EducationScreen() {
  const [activeSection, setActiveSection] = useState(null);

  // Helper components for formatted text
  const Bold = ({ children }) => <Text style={styles.boldText}>{children}</Text>;

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

  const Paragraph = ({ children }) => (
    <Text style={styles.paragraph}>{children}</Text>
  );

  const SectionTitle = ({ children }) => (
    <Text style={styles.sectionTitleText}>{children}</Text>
  );

  // Content rendering functions for each section
  const renderDefinitionsContent = () => (
    <View>
      <Paragraph>
        Scoliosis is a medical condition where the spine curves sideways, forming an "S" or "C" shape when viewed from behind. Instead of being straight, the spine bends to the left or right.
      </Paragraph>

      <View style={styles.spacer} />
      <Bold>Normal Spine:</Bold>
      <Paragraph> Straight vertical line when viewed from behind</Paragraph>

      <Bold>Scoliotic Spine:</Bold>
      <Paragraph> Curved sideways, often with rotation</Paragraph>

      <View style={styles.spacer} />
      <Bold>Back Deformities Include:</Bold>
      <BulletList items={[
        'Scoliosis: Sideways curvature of the spine',
        'Kyphosis: Excessive forward rounding of the upper back ("hunchback")',
        'Lordosis: Excessive inward curve of the lower back ("swayback")',
        'Combined deformities: Sometimes multiple curves occur together'
      ]} />

      <View style={styles.spacer} />
      <Bold>Key Terms:</Bold>
      <BulletList items={[
        'Cobb Angle: The measurement of how severe the curve is (measured in degrees)',
        'Apex: The point of maximum curvature',
        'Vertebrae: The individual bones that make up the spine',
        'Rotation: The spine twisting on its axis (often accompanies scoliosis)'
      ]} />
    </View>
  );

  const renderTypesContent = () => (
    <View>
      <Paragraph>Scoliosis is categorized by its cause and when it develops:</Paragraph>

      <View style={styles.spacer} />
      <Bold>1. Idiopathic Scoliosis (80-85% of cases)</Bold>
      <Paragraph>The cause is unknown. It is the most common type.</Paragraph>
      <BulletList items={[
        'Infantile (0-3 years)',
        'Juvenile (4-10 years)',
        'Adolescent (11-18 years) - Most common',
        'Adult (after skeletal maturity)'
      ]} />

      <View style={styles.spacer} />
      <Bold>2. Congenital Scoliosis</Bold>
      <Paragraph>Present at birth due to abnormal spine formation during pregnancy.</Paragraph>
      <BulletList items={[
        'Caused by vertebrae that didn\'t form properly',
        'Usually detected in infancy or early childhood'
      ]} />

      <View style={styles.spacer} />
      <Bold>3. Neuromuscular Scoliosis</Bold>
      <Paragraph>Caused by conditions affecting nerves and muscles:</Paragraph>
      <BulletList items={[
        'Cerebral palsy',
        'Muscular dystrophy',
        'Spina bifida',
        'Spinal cord injury'
      ]} />

      <View style={styles.spacer} />
      <Bold>4. Degenerative Scoliosis</Bold>
      <Paragraph>Develops in adults due to wear and tear:</Paragraph>
      <BulletList items={[
        'Arthritis of the spine',
        'Disc degeneration',
        'Osteoporosis with compression fractures'
      ]} />

      <View style={styles.spacer} />
      <Bold>5. Other Causes</Bold>
      <BulletList items={[
        'Trauma (accidents, injuries)',
        'Infection (spinal tuberculosis)',
        'Tumors',
        'Syndromic (part of genetic syndromes like Marfan or Ehlers-Danlos)'
      ]} />
    </View>
  );

  const renderCausesContent = () => (
    <View>
      <Bold>What Causes Scoliosis?</Bold>
      <Paragraph>
        For most cases (idiopathic), we don't know the exact cause. However, research suggests:
      </Paragraph>
      <BulletList items={[
        'Genetics: Runs in families',
        'Growth spurts: Often develops during rapid growth',
        'Hormones: May play a role in development',
        'Brain-spine connection: Possible issues in how the brain controls posture'
      ]} />

      <View style={styles.spacer} />
      <Bold>Risk Factors:</Bold>
      <BulletList items={[
        'Age: Most common during growth spurts (10-15 years)',
        'Sex: Girls are more likely to have curves that progress and need treatment',
        'Family history: Having a relative with scoliosis increases risk',
        'Underlying conditions: Cerebral palsy, muscular dystrophy, etc.'
      ]} />

      <View style={styles.spacer} />
      <Bold>Common Myths (What DOESN'T Cause Scoliosis):</Bold>
      <BulletList items={[
        '✗ Bad posture',
        '✗ Carrying heavy backpacks',
        '✗ Sleeping position',
        '✗ Diet or nutrition deficiency',
        '✗ Exercise or sports activities',
        '✗ Minor leg length differences'
      ]} />

      <View style={styles.spacer} />
      <Bold>Important:</Bold>
      <Paragraph> Scoliosis is not caused by anything the patient or parents did wrong. It is not preventable in most cases.</Paragraph>
    </View>
  );

  const renderDiagnosisContent = () => (
    <View>
      <Bold>Screening & Detection:</Bold>

      <View style={styles.spacer} />
      <Bold>1. Visual Inspection</Bold>
      <Paragraph>Look for signs when patient is standing:</Paragraph>
      <BulletList items={[
        'Uneven shoulders',
        'One shoulder blade more prominent',
        'Uneven waist',
        'One hip higher than the other',
        'Leaning to one side'
      ]} />

      <View style={styles.spacer} />
      <Bold>2. Adams Forward Bend Test</Bold>
      <Paragraph>Patient bends forward at the waist:</Paragraph>
      <BulletList items={[
        'Healthcare provider looks from behind',
        'Checks for rib hump or back asymmetry',
        'One side appears higher = possible scoliosis'
      ]} />

      <View style={styles.spacer} />
      <Bold>3. Scoliometer Measurement</Bold>
      <BulletList items={[
        'Device placed on the back during forward bend',
        'Measures angle of trunk rotation (ATR)',
        'ATR ≥7° suggests referral for X-ray',
        'This app can function as a scoliometer'
      ]} />

      <View style={styles.spacer} />
      <Bold>4. X-Ray Imaging</Bold>
      <Paragraph>The definitive diagnostic test:</Paragraph>
      <BulletList items={[
        'Shows exact curve pattern',
        'Measures Cobb angle (severity)',
        'Determines skeletal maturity',
        'Identifies any bone abnormalities'
      ]} />

      <View style={styles.spacer} />
      <Bold>5. Cobb Angle Measurement</Bold>
      <Paragraph>Performed on X-ray images:</Paragraph>
      <BulletList items={[
        'Lines drawn along tilted vertebrae',
        'Angle between lines = Cobb angle',
        'This app helps measure Cobb angles from X-rays'
      ]} />

      <View style={styles.spacer} />
      <Bold>Additional Tests (if needed):</Bold>
      <BulletList items={[
        'MRI: To check for spinal cord abnormalities',
        'CT scan: For detailed bone imaging',
        'Bone age X-ray: To predict remaining growth'
      ]} />

      <View style={styles.spacer} />
      <Bold>When to Refer:</Bold>
      <BulletList items={[
        'Scoliometer reading ≥7°',
        'Visible asymmetry or deformity',
        'Back pain with curve',
        'Rapid progression',
        'Neurological symptoms (weakness, numbness)'
      ]} />
    </View>
  );

  const renderTreatmentContent = () => (
    <View>
      <Paragraph>Treatment depends on curve severity, age, and progression risk.</Paragraph>

      <View style={styles.spacer} />
      <Bold>1. Observation (Mild Curves: &lt;25°)</Bold>
      <BulletList items={[
        'Regular monitoring every 4-6 months',
        'X-rays to check for progression',
        'No active treatment needed',
        'Most curves in this range don\'t worsen'
      ]} />

      <View style={styles.spacer} />
      <Bold>2. Bracing (Moderate Curves: 25-40°)</Bold>
      <Paragraph>
        <Bold>Purpose:</Bold> Prevent curve from worsening during growth{'\n'}
        <Bold>Not a cure:</Bold> Doesn't straighten existing curve{'\n'}
        <Bold>When effective:</Bold> Growing children/adolescents
      </Paragraph>

      <View style={styles.spacer} />
      <Paragraph>Types of braces:</Paragraph>
      <BulletList items={[
        'TLSO (Thoracolumbosacral orthosis) - Most common',
        'Milwaukee brace - For high thoracic curves',
        'Charleston bending brace - Worn at night'
      ]} />

      <View style={styles.spacer} />
      <Paragraph>Wearing schedule:</Paragraph>
      <BulletList items={[
        'Usually 16-23 hours per day',
        'Continued until skeletal maturity',
        'Success rate: 70-90% in preventing progression'
      ]} />

      <View style={styles.spacer} />
      <Bold>3. Surgery (Severe Curves: &gt;40-50°)</Bold>

      <View style={styles.spacer} />
      <Bold>Spinal Fusion:</Bold>
      <BulletList items={[
        'Vertebrae fused together with bone grafts',
        'Metal rods, hooks, or screws hold spine straight',
        'Curve typically corrected 50-70%',
        'Recovery: 3-6 months for basic activities, 1 year for full healing'
      ]} />

      <View style={styles.spacer} />
      <Bold>When surgery is recommended:</Bold>
      <BulletList items={[
        'Curves >40-50° in growing children',
        'Curves >50° in adults',
        'Progression despite bracing',
        'Breathing problems from severe curve',
        'Significant pain or functional limitation'
      ]} />

      <View style={styles.spacer} />
      <Bold>Growing Rods (young children):</Bold>
      <BulletList items={[
        'Adjustable rods that are lengthened periodically',
        'Allow spine to continue growing',
        'Replaced with fusion when growth complete'
      ]} />

      <View style={styles.spacer} />
      <Bold>4. Physical Therapy & Exercise</Bold>
      <BulletList items={[
        'Doesn\'t correct the curve',
        'Can improve posture and core strength',
        'Reduces pain and improves function',
        'Schroth method: Specialized scoliosis exercises'
      ]} />

      <View style={styles.spacer} />
      <Bold>5. Alternative Approaches</Bold>
      <Paragraph> (Limited evidence)</Paragraph>
      <BulletList items={[
        'Chiropractic care: May help with pain but doesn\'t correct curve',
        'Massage therapy: For muscle tension',
        'Yoga/Pilates: For flexibility and core strength',
        'Electrical stimulation: Not proven effective'
      ]} />

      <View style={styles.spacer} />
      <Bold>Treatment Goals:</Bold>
      <BulletList items={[
        'Prevent curve progression',
        'Maintain trunk balance',
        'Minimize pain',
        'Preserve lung function',
        'Achieve best possible quality of life'
      ]} />

      <View style={styles.spacer} />
      <Bold>Important:</Bold>
      <Paragraph> Treatment decisions should be made with a spine specialist (orthopedic surgeon or neurosurgeon) based on individual factors.</Paragraph>
    </View>
  );

  const renderFollowUpContent = () => (
    <View>
      <Bold>Regular monitoring is essential for scoliosis patients, especially during growth years.</Bold>

      <View style={styles.spacer} />
      <SectionTitle>What to Track:</SectionTitle>

      <View style={styles.spacer} />
      <Bold>1. Curve Measurements</Bold>
      <BulletList items={[
        'Cobb angle from X-rays (every 4-6 months during growth)',
        'Trunk rotation angle (ATR) from scoliometer',
        'Compare to previous measurements',
        'Watch for progression (increase of 5-10° is significant)'
      ]} />

      <View style={styles.spacer} />
      <Bold>2. Growth Status</Bold>
      <BulletList items={[
        'Height measurements at each visit',
        'Weight tracking',
        'Menstrual history for girls (onset indicates skeletal maturity approaching)',
        'Risser sign from X-rays (bone maturity indicator)'
      ]} />

      <View style={styles.spacer} />
      <Bold>3. Clinical Symptoms</Bold>
      <BulletList items={[
        'Back pain (location, severity, frequency)',
        'Breathing difficulties',
        'Numbness or weakness in legs',
        'Changes in bladder or bowel function',
        'Impact on daily activities'
      ]} />

      <View style={styles.spacer} />
      <Bold>4. Brace Compliance (if applicable)</Bold>
      <BulletList items={[
        'Hours worn per day',
        'Any skin problems from brace',
        'Fit issues as child grows',
        'Emotional/social challenges'
      ]} />

      <View style={styles.spacer} />
      <Bold>5. Psychosocial Impact</Bold>
      <BulletList items={[
        'Self-esteem and body image',
        'Social interactions',
        'School participation',
        'Mental health concerns'
      ]} />

      <View style={styles.spacer} />
      <SectionTitle>8 Standard Follow-Up Photos</SectionTitle>
      <Paragraph>
        Take these photos at each follow-up visit to track visible changes. Wear minimal clothing (shorts/sports bra for girls, shorts for boys) to see spine clearly.
      </Paragraph>

      <View style={styles.spacer} />
      {/* Follow-Up Photos */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <View key={num} style={styles.photoContainer}>
          <Text style={styles.photoNumber}>Position {num}</Text>
          <View style={styles.photoWrapper}>
            <Image
              source={getPhotoSource(num)}
              style={styles.photoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.photoDescription}>{getPhotoDescription(num)}</Text>
        </View>
      ))}

      <View style={styles.spacer} />
      <SectionTitle>Follow-Up Schedule:</SectionTitle>

      <View style={styles.spacer} />
      <Bold>During Active Growth:</Bold>
      <BulletList items={[
        'Observation: Every 4-6 months',
        'Bracing: Every 3-4 months',
        'Rapid progression: Every 2-3 months'
      ]} />

      <View style={styles.spacer} />
      <Bold>After Skeletal Maturity:</Bold>
      <BulletList items={[
        'Small curves (<25°): Discharged or annual check',
        'Moderate curves (25-40°): Every 1-2 years',
        'Large curves (>40°): Annually or as needed'
      ]} />

      <View style={styles.spacer} />
      <Bold>Post-Surgery:</Bold>
      <BulletList items={[
        'First year: Every 3 months',
        'Years 2-5: Every 6-12 months',
        'After 5 years: Annually or as needed'
      ]} />

      <View style={styles.spacer} />
      <SectionTitle>Documentation Tips:</SectionTitle>
      <BulletList items={[
        'Keep all X-rays and reports in one place',
        'Maintain a measurement log (dates, Cobb angles, heights)',
        'Use this app to track scoliometer and Cobb measurements',
        'Take photos consistently (same poses, lighting, distance)',
        'Note any changes in symptoms or function',
        'Record brace-wearing hours if applicable'
      ]} />

      <View style={styles.spacer} />
      <Bold>When to Contact Doctor Immediately:</Bold>
      <BulletList items={[
        'Sudden increase in back pain',
        'New neurological symptoms (numbness, weakness, tingling)',
        'Bowel or bladder problems',
        'Difficulty breathing',
        'Rapid visible progression',
        'Severe emotional distress related to scoliosis'
      ]} />
    </View>
  );

  const getPhotoSource = (num) => {
    const photos = {
      1: require('../assets/position1.png'),
      2: require('../assets/position2.png'),
      3: require('../assets/position3.png'),
      4: require('../assets/position4.png'),
      5: require('../assets/position5.png'),
      6: require('../assets/position6.png'),
      7: require('../assets/position7.png'),
      8: require('../assets/position8.png')
    };
    return photos[num];
  };

  const getPhotoDescription = (num) => {
    const descriptions = {
      1: 'Standing straight, back view - Check for shoulder/hip asymmetry, spine alignment',
      2: 'Standing straight, front view - Check for shoulder level, chest symmetry',
      3: 'Standing straight, left side view - Check for abnormal forward/backward curves',
      4: 'Standing straight, right side view - Check for abnormal forward/backward curves',
      5: 'Forward bend, back view - Check for rib hump or back asymmetry (Adams test)',
      6: 'Forward bend, back view close-up - Detailed view of thoracic rotation',
      7: 'Forward bend, side view - Check for thoracic prominence',
      8: 'Forward bend, other side view - Complete assessment of trunk asymmetry'
    };
    return descriptions[num] || '';
  };

  const sections = [
    {
      id: 'definitions',
      title: 'What is Scoliosis?',
      icon: '📚',
      renderContent: renderDefinitionsContent
    },
    {
      id: 'types',
      title: 'Types of Scoliosis',
      icon: '🔬',
      renderContent: renderTypesContent
    },
    {
      id: 'causes',
      title: 'Causes & Risk Factors',
      icon: '🧬',
      renderContent: renderCausesContent
    },
    {
      id: 'diagnosis',
      title: 'How Scoliosis is Diagnosed',
      icon: '🏥',
      renderContent: renderDiagnosisContent
    },
    {
      id: 'treatment',
      title: 'Treatment Options',
      icon: '⚕️',
      renderContent: renderTreatmentContent
    },
    {
      id: 'followup',
      title: 'How to Follow Up',
      icon: '📋',
      renderContent: renderFollowUpContent
    }
  ];

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      {sections.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={[styles.menuItem, activeSection === section.id && styles.menuItemActive]}
          onPress={() => setActiveSection(section.id)}
        >
          <Text style={styles.menuIcon}>{section.icon}</Text>
          <Text style={[styles.menuText, activeSection === section.id && styles.menuTextActive]}>
            {section.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContent = () => {
    const section = sections.find(s => s.id === activeSection);
    if (!section) return null;

    return (
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => setActiveSection(null)}>
          <Text style={styles.backButtonText}>← Back to Menu</Text>
        </TouchableOpacity>

        <Text style={styles.contentTitle}>{section.icon} {section.title}</Text>

        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={true}>
          {section.renderContent()}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {activeSection ? renderContent() : (
        <ScrollView style={styles.content}>
          <View style={styles.intro}>
            <Text style={styles.introText}>
              This education section provides comprehensive information about scoliosis and back deformities.
              Tap any topic below to learn more.
            </Text>
          </View>
          {renderMenu()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  intro: {
    backgroundColor: 'white',
    margin: 15,
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  introText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
  },
  menuContainer: {
    padding: 15,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuItemActive: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#00b5e2',
  },
  menuIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  menuText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  menuTextActive: {
    color: '#00b5e2',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  backButtonText: {
    fontSize: 16,
    color: '#00b5e2',
    fontWeight: '600',
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00b5e2',
    padding: 20,
    paddingTop: 10,
  },
  contentScroll: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  paragraph: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#00b5e2',
    fontSize: 15,
    lineHeight: 24,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b5e2',
    marginTop: 8,
    marginBottom: 8,
  },
  bulletList: {
    marginTop: 8,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 6,
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
  spacer: {
    height: 12,
  },
  photoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  photoNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b5e2',
    marginBottom: 10,
    textAlign: 'center',
  },
  photoWrapper: {
    width: '100%',
    aspectRatio: 3 / 4,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
