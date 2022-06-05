import React from 'react';

// custom font
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';

import Welcome from './screens/Welcome';

export default function App() {
  let [fontLoaded] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <Welcome />
  );
}

