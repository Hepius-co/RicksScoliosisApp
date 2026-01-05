import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, AppState } from 'react-native';
import { useEffect, useRef } from 'react';
import { retryPendingUploads } from './utils/cloudStorage';

// Import screens
import ScoliometerScreen from './screens/ScoliometerScreen';
import CobbAngleScreen from './screens/CobbAngleScreen';
import AboutAppScreen from './screens/AboutAppScreen';
import AboutDrRickScreen from './screens/AboutDrRickScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Try to upload pending images when app starts
    retryPendingUploads();

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground - retry pending uploads
        retryPendingUploads();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#00b5e2',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            paddingBottom: 25,
            paddingTop: 8,
            height: 85,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 2,
            marginBottom: 5,
          },
          headerStyle: {
            backgroundColor: '#00b5e2',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        <Tab.Screen
          name="Scoliometer"
          component={ScoliometerScreen}
          options={{
            tabBarLabel: 'Scoliometer',
            tabBarIcon: ({ color }) => (
              <TabIcon icon="🧭" color={color} />
            ),
            headerTitle: "Rick'S Scoliometer",
          }}
        />
        <Tab.Screen
          name="CobbAngle"
          component={CobbAngleScreen}
          options={{
            tabBarLabel: 'Cobb Angle',
            tabBarIcon: ({ color }) => (
              <TabIcon icon="📐" color={color} />
            ),
            headerTitle: "Rick'S Cobb Angle",
          }}
        />
        <Tab.Screen
          name="AboutApp"
          component={AboutAppScreen}
          options={{
            tabBarLabel: 'About App',
            tabBarIcon: ({ color }) => (
              <TabIcon icon="ℹ️" color={color} />
            ),
            headerTitle: 'About This App',
          }}
        />
        <Tab.Screen
          name="AboutDrRick"
          component={AboutDrRickScreen}
          options={{
            tabBarLabel: 'Dr. Rick',
            tabBarIcon: ({ color }) => (
              <TabIcon icon="👨‍⚕️" color={color} />
            ),
            headerTitle: 'About Dr. Rick Hodes',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Simple icon component using emoji
const TabIcon = ({ icon, color }) => {
  return (
    <Text style={{ fontSize: 24, opacity: color === '#00b5e2' ? 1 : 0.5 }}>
      {icon}
    </Text>
  );
};
