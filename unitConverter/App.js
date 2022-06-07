import React from 'react';

// custom font
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';

// React Navigation
import RootStack from "./navigation/RootStack";

export default function App() {
  let [fontLoaded] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <RootStack />
  );
}

