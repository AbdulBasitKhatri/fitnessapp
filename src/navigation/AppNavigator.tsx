// filepath: src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import AddExerciseScreen from '../screens/AddExerciseScreen';
import CompletedScreen from '../screens/CompletedScreen';
import QuotesScreen from '../screens/QuotesScreen';
import { Exercise } from '../types';

export type RootStackParamList = {
  MainTabs: undefined;
  ExerciseDetail: { exercise: Exercise };
  Quotes: undefined;
};

export type TabParamList = {
  Home: undefined;
  AddExercise: undefined;
  Completed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'AddExercise') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Completed') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#757575',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Exercises' }}
      />
      <Tab.Screen
        name="AddExercise"
        component={AddExerciseScreen}
        options={{ tabBarLabel: 'Add' }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={{ tabBarLabel: 'Completed' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExerciseDetail"
          component={ExerciseDetailScreen}
          options={{
            title: 'Exercise Details',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="Quotes"
          component={QuotesScreen}
          options={{
            title: 'Motivational Quotes',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}