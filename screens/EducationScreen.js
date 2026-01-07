import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EducationScreen() {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 'definitions',
      title: 'What is Scoliosis?',
      icon: '📚',
      content: `Scoliosis is a medical condition where the spine curves sideways, forming an "S" or "C" shape when viewed from behind. Instead of being straight, the spine bends to the left or right.

**Normal Spine:** Straight vertical line when viewed from behind
**Scoliotic Spine:** Curved sideways, often with rotation

**Back Deformities Include:**

• Scoliosis: Sideways curvature of the spine
• Kyphosis: Excessive forward rounding of the upper back ("hunchback")
• Lordosis: Excessive inward curve of the lower back ("swayback")
• Combined deformities: Sometimes multiple curves occur together

**Key Terms:**

• Cobb Angle: The measurement of how severe the curve is (measured in degrees)
• Apex: The point of maximum curvature
• Vertebrae: The individual bones that make up the spine
• Rotation: The spine twisting on its axis (often accompanies scoliosis)`
    },
    {
      id: 'types',
      title: 'Types of Scoliosis',
      icon: '🔬',
      content: `Scoliosis is categorized by its cause and when it develops:

**1. Idiopathic Scoliosis (80-85% of cases)**
The cause is unknown. It is the most common type.

• Infantile (0-3 years)
• Juvenile (4-10 years)
• Adolescent (11-18 years) - Most common
• Adult (after skeletal maturity)

**2. Congenital Scoliosis**
Present at birth due to abnormal spine formation during pregnancy.

• Caused by vertebrae that didn't form properly
• Usually detected in infancy or early childhood

**3. Neuromuscular Scoliosis**
Caused by conditions affecting nerves and muscles:

• Cerebral palsy
• Muscular dystrophy
• Spina bifida
• Spinal cord injury

**4. Degenerative Scoliosis**
Develops in adults due to wear and tear:

• Arthritis of the spine
• Disc degeneration
• Osteoporosis with compression fractures

**5. Other Causes**
• Trauma (accidents, injuries)
• Infection (spinal tuberculosis)
• Tumors
• Syndromic (part of genetic syndromes like Marfan or Ehlers-Danlos)`
    },
    {
      id: 'causes',
      title: 'Causes & Risk Factors',
      icon: '🧬',
      content: `**What Causes Scoliosis?**

For most cases (idiopathic), we don't know the exact cause. However, research suggests:

• Genetics: Runs in families
• Growth spurts: Often develops during rapid growth
• Hormones: May play a role in development
• Brain-spine connection: Possible issues in how the brain controls posture

**Risk Factors:**

• Age: Most common during growth spurts (10-15 years)
• Sex: Girls are more likely to have curves that progress and need treatment
• Family history: Having a relative with scoliosis increases risk
• Underlying conditions: Cerebral palsy, muscular dystrophy, etc.

**Common Myths (What DOESN'T Cause Scoliosis):**

✗ Bad posture
✗ Carrying heavy backpacks
✗ Sleeping position
✗ Diet or nutrition deficiency
✗ Exercise or sports activities
✗ Minor leg length differences

**Important:** Scoliosis is not caused by anything the patient or parents did wrong. It is not preventable in most cases.`
    },
    {
      id: 'diagnosis',
      title: 'How Scoliosis is Diagnosed',
      icon: '🏥',
      content: `**Screening & Detection:**

**1. Visual Inspection**
Look for signs when patient is standing:
• Uneven shoulders
• One shoulder blade more prominent
• Uneven waist
• One hip higher than the other
• Leaning to one side

**2. Adams Forward Bend Test**
Patient bends forward at the waist:
• Healthcare provider looks from behind
• Checks for rib hump or back asymmetry
• One side appears higher = possible scoliosis

**3. Scoliometer Measurement**
• Device placed on the back during forward bend
• Measures angle of trunk rotation (ATR)
• ATR ≥7° suggests referral for X-ray
• This app can function as a scoliometer

**4. X-Ray Imaging**
The definitive diagnostic test:
• Shows exact curve pattern
• Measures Cobb angle (severity)
• Determines skeletal maturity
• Identifies any bone abnormalities

**5. Cobb Angle Measurement**
Performed on X-ray images:
• Lines drawn along tilted vertebrae
• Angle between lines = Cobb angle
• This app helps measure Cobb angles from X-rays

**Additional Tests (if needed):**
• MRI: To check for spinal cord abnormalities
• CT scan: For detailed bone imaging
• Bone age X-ray: To predict remaining growth

**When to Refer:**
• Scoliometer reading ≥7°
• Visible asymmetry or deformity
• Back pain with curve
• Rapid progression
• Neurological symptoms (weakness, numbness)`
    },
    {
      id: 'treatment',
      title: 'Treatment Options',
      icon: '⚕️',
      content: `Treatment depends on curve severity, age, and progression risk.

**1. Observation (Mild Curves: <25°)**
• Regular monitoring every 4-6 months
• X-rays to check for progression
• No active treatment needed
• Most curves in this range don't worsen

**2. Bracing (Moderate Curves: 25-40°)**

**Purpose:** Prevent curve from worsening during growth
**Not a cure:** Doesn't straighten existing curve
**When effective:** Growing children/adolescents

Types of braces:
• TLSO (Thoracolumbosacral orthosis) - Most common
• Milwaukee brace - For high thoracic curves
• Charleston bending brace - Worn at night

Wearing schedule:
• Usually 16-23 hours per day
• Continued until skeletal maturity
• Success rate: 70-90% in preventing progression

**3. Surgery (Severe Curves: >40-50°)**

**Spinal Fusion:**
• Vertebrae fused together with bone grafts
• Metal rods, hooks, or screws hold spine straight
• Curve typically corrected 50-70%
• Recovery: 3-6 months for basic activities, 1 year for full healing

**When surgery is recommended:**
• Curves >40-50° in growing children
• Curves >50° in adults
• Progression despite bracing
• Breathing problems from severe curve
• Significant pain or functional limitation

**Growing Rods (young children):**
• Adjustable rods that are lengthened periodically
• Allow spine to continue growing
• Replaced with fusion when growth complete

**4. Physical Therapy & Exercise**

• Doesn't correct the curve
• Can improve posture and core strength
• Reduces pain and improves function
• Schroth method: Specialized scoliosis exercises

**5. Alternative Approaches** (Limited evidence)

• Chiropractic care: May help with pain but doesn't correct curve
• Massage therapy: For muscle tension
• Yoga/Pilates: For flexibility and core strength
• Electrical stimulation: Not proven effective

**Treatment Goals:**
• Prevent curve progression
• Maintain trunk balance
• Minimize pain
• Preserve lung function
• Achieve best possible quality of life

**Important:** Treatment decisions should be made with a spine specialist (orthopedic surgeon or neurosurgeon) based on individual factors.`
    },
    {
      id: 'followup',
      title: 'How to Follow Up',
      icon: '📋',
      content: 'scroll-for-details' // Special marker for photo section
    }
  ];

  const renderFollowUpContent = () => (
    <View>
      <Text style={styles.contentText}>
        <Text style={styles.contentBold}>Regular monitoring is essential for scoliosis patients, especially during growth years.</Text>
        {'\n\n'}
        <Text style={styles.contentSectionTitle}>What to Track:{'\n\n'}</Text>

        <Text style={styles.contentBold}>1. Curve Measurements{'\n'}</Text>
        • Cobb angle from X-rays (every 4-6 months during growth){'\n'}
        • Trunk rotation angle (ATR) from scoliometer{'\n'}
        • Compare to previous measurements{'\n'}
        • Watch for progression (increase of 5-10° is significant){'\n\n'}

        <Text style={styles.contentBold}>2. Growth Status{'\n'}</Text>
        • Height measurements at each visit{'\n'}
        • Weight tracking{'\n'}
        • Menstrual history for girls (onset indicates skeletal maturity approaching){'\n'}
        • Risser sign from X-rays (bone maturity indicator){'\n\n'}

        <Text style={styles.contentBold}>3. Clinical Symptoms{'\n'}</Text>
        • Back pain (location, severity, frequency){'\n'}
        • Breathing difficulties{'\n'}
        • Numbness or weakness in legs{'\n'}
        • Changes in bladder or bowel function{'\n'}
        • Impact on daily activities{'\n\n'}

        <Text style={styles.contentBold}>4. Brace Compliance (if applicable){'\n'}</Text>
        • Hours worn per day{'\n'}
        • Any skin problems from brace{'\n'}
        • Fit issues as child grows{'\n'}
        • Emotional/social challenges{'\n\n'}

        <Text style={styles.contentBold}>5. Psychosocial Impact{'\n'}</Text>
        • Self-esteem and body image{'\n'}
        • Social interactions{'\n'}
        • School participation{'\n'}
        • Mental health concerns{'\n\n'}

        <Text style={styles.contentSectionTitle}>8 Standard Follow-Up Photos{'\n\n'}</Text>

        Take these photos at each follow-up visit to track visible changes. Wear minimal clothing (shorts/sports bra for girls, shorts for boys) to see spine clearly.
        {'\n\n'}
      </Text>

      {/* Photo Placeholders */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <View key={num} style={styles.photoPlaceholder}>
          <Text style={styles.photoPlaceholderNumber}>Position {num}</Text>
          <Text style={styles.photoPlaceholderText}>Photo Placeholder</Text>
          <Text style={styles.photoDescription}>{getPhotoDescription(num)}</Text>
        </View>
      ))}

      <Text style={styles.contentText}>
        {'\n'}
        <Text style={styles.contentSectionTitle}>Follow-Up Schedule:{'\n\n'}</Text>

        <Text style={styles.contentBold}>During Active Growth:{'\n'}</Text>
        • Observation: Every 4-6 months{'\n'}
        • Bracing: Every 3-4 months{'\n'}
        • Rapid progression: Every 2-3 months{'\n\n'}

        <Text style={styles.contentBold}>After Skeletal Maturity:{'\n'}</Text>
        • Small curves (&lt;25°): Discharged or annual check{'\n'}
        • Moderate curves (25-40°): Every 1-2 years{'\n'}
        • Large curves (&gt;40°): Annually or as needed{'\n\n'}

        <Text style={styles.contentBold}>Post-Surgery:{'\n'}</Text>
        • First year: Every 3 months{'\n'}
        • Years 2-5: Every 6-12 months{'\n'}
        • After 5 years: Annually or as needed{'\n\n'}

        <Text style={styles.contentSectionTitle}>Documentation Tips:{'\n\n'}</Text>
        • Keep all X-rays and reports in one place{'\n'}
        • Maintain a measurement log (dates, Cobb angles, heights){'\n'}
        • Use this app to track scoliometer and Cobb measurements{'\n'}
        • Take photos consistently (same poses, lighting, distance){'\n'}
        • Note any changes in symptoms or function{'\n'}
        • Record brace-wearing hours if applicable{'\n\n'}

        <Text style={styles.contentBold}>When to Contact Doctor Immediately:{'\n'}</Text>
        • Sudden increase in back pain{'\n'}
        • New neurological symptoms (numbness, weakness, tingling){'\n'}
        • Bowel or bladder problems{'\n'}
        • Difficulty breathing{'\n'}
        • Rapid visible progression{'\n'}
        • Severe emotional distress related to scoliosis
      </Text>
    </View>
  );

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
          {section.id === 'followup' ? (
            renderFollowUpContent()
          ) : (
            <Text style={styles.contentText}>{section.content}</Text>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📖 Scoliosis Education</Text>
        <Text style={styles.headerSubtitle}>Learn About Back Deformities</Text>
      </View>

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
  header: {
    backgroundColor: '#00b5e2',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  intro: {
    backgroundColor: 'white',
    margin: 15,
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
  contentText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  contentBold: {
    fontWeight: 'bold',
    color: '#00b5e2',
  },
  contentSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b5e2',
  },
  photoPlaceholder: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#00b5e2',
    borderStyle: 'dashed',
  },
  photoPlaceholderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b5e2',
    marginBottom: 5,
  },
  photoPlaceholderText: {
    fontSize: 14,
    color: '#00b5e2',
    textAlign: 'center',
    marginBottom: 10,
  },
  photoDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
