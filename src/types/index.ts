export interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isCompleted: boolean;
  createdAt: number;
}

export interface AppState {
  exercises: Exercise[];
}

export type AppAction =
  | { type: 'ADD_EXERCISE'; payload: Exercise }
  | { type: 'TOGGLE_COMPLETE'; payload: string }
  | { type: 'DELETE_EXERCISE'; payload: string }
  | { type: 'LOAD_EXERCISES'; payload: Exercise[] };