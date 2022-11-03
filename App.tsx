
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ScreenOrientation from 'expo-screen-orientation';
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AppLoading from "expo-app-loading";
import React, { useEffect } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AuthContextProvider from "./service/register/Auth.context";
import MapContextProvider from "./service/map/Map.context";
import ObjectContextProvider from "./service/object/Object.context";
import ProfileContextProvider from "./service/profile/Profile.context";
import { Text } from "react-native";
import { navigationStatic } from "./utils/main";

export default function App() {
  
  const colorScheme = useColorScheme();
  // Load any resources or data that we need prior to rendering the app
 
  const [isLoadingComplete] = useFonts({
    Hurme:  require("./assets/fonts/Hurme-Bold.ttf"),
  });
  
 
  if (!isLoadingComplete) {
    return <AppLoading/>;
  } else {
    return (
      <SafeAreaProvider>
       
        <AuthContextProvider>
          <ProfileContextProvider>
          <MapContextProvider>
            <ObjectContextProvider>
              
            <Navigation colorScheme={colorScheme} />
           
            </ObjectContextProvider>
          </MapContextProvider>
          </ProfileContextProvider>
        </AuthContextProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
