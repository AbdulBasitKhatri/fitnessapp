# Fitness App

A simple fitness tracking app built with React Native and Expo.

## What This App Does

- View a list of exercises
- Add new exercises
- Mark exercises as completed
- View motivational quotes

## How to Run

1. Install dependencies:
   ```
   npm install
   ```

2. Start the app:
   ```
   npm start
   ```

3. Press 'a' for Android or 'i' for iOS simulator

## Tech Used

- React Native with Expo
- React Navigation (bottom tabs + stack)
- AsyncStorage for saving data

## Project Structure

```
src/
  screens/     - App screens
  navigation/  - Navigation setup
  context/     - App state management
  types/       - TypeScript types
```

## Screens

- **Exercises** - List of all exercises
- **Add** - Add a new exercise
- **Completed** - View completed exercises
- **Quotes** - Motivational quotes

## Notes

- Data is stored locally on your device
- Images use placeholder URLs by default