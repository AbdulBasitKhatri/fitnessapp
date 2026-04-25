// filepath: src/screens/ExerciseDetailScreen.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { Exercise } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
  ExerciseDetail: { exercise: Exercise };
  AddExercise: undefined;
  Completed: undefined;
  Quotes: undefined;
};

type DetailRouteProp = RouteProp<RootStackParamList, 'ExerciseDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExerciseDetail'>;

export default function ExerciseDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const { exercise } = route.params;
  const { dispatch } = useApp();

  const handleToggleComplete = () => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: exercise.id });
    Alert.alert(
      exercise.isCompleted ? 'Marked as Incomplete' : 'Marked as Complete',
      exercise.isCompleted
        ? `${exercise.name} is now incomplete.`
        : `${exercise.name} is now completed! Great job!`
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: exercise.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.description}>{exercise.description}</Text>
          
          <TouchableOpacity
            style={[
              styles.button,
              exercise.isCompleted ? styles.completedButton : styles.primaryButton,
            ]}
            onPress={handleToggleComplete}
          >
            <Text style={styles.buttonText}>
              {exercise.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back to Exercises</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  completedButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});