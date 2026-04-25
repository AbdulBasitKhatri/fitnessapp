// filepath: src/context/AppContext.tsx
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppAction, Exercise } from '../types';

const initialExercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    description: 'Classic push-ups target chest, shoulders, and triceps. Keep your body in a straight line and lower your chest to the ground.',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400',
    isCompleted: false,
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'Squats',
    description: 'Squats are great for building lower body strength. Keep your feet shoulder-width apart and lower your hips as if sitting in a chair.',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
    isCompleted: false,
    createdAt: Date.now(),
  },
  {
    id: '3',
    name: 'Lunges',
    description: 'Lunges improve balance and strengthen legs. Step forward with one leg and lower your hips until both knees are bent at 90 degrees.',
    imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400',
    isCompleted: false,
    createdAt: Date.now(),
  },
  {
    id: '4',
    name: 'Plank',
    description: 'Plank is an excellent core exercise. Hold a push-up position with your forearms on the ground, keeping your body straight.',
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400',
    isCompleted: false,
    createdAt: Date.now(),
  },
  {
    id: '5',
    name: 'Burpees',
    description: 'Burpees are a full-body cardio exercise. Combine a squat, push-up, and jump for an intense workout.',
    imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400',
    isCompleted: false,
    createdAt: Date.now(),
  },
];

const initialState: AppState = {
  exercises: initialExercises,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_EXERCISE':
      return { ...state, exercises: [...state.exercises, action.payload] };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        exercises: state.exercises.map((ex) =>
          ex.id === action.payload ? { ...ex, isCompleted: !ex.isCompleted } : ex
        ),
      };
    case 'DELETE_EXERCISE':
      return {
        ...state,
        exercises: state.exercises.filter((ex) => ex.id !== action.payload),
      };
    case 'LOAD_EXERCISES':
      return { ...state, exercises: action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = '@fitness_exercises';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    saveExercises();
  }, [state.exercises]);

  const loadExercises = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const exercises = JSON.parse(stored);
        dispatch({ type: 'LOAD_EXERCISES', payload: exercises });
      }
    } catch (error) {
      console.error('Failed to load exercises:', error);
    }
  };

  const saveExercises = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.exercises));
    } catch (error) {
      console.error('Failed to save exercises:', error);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}