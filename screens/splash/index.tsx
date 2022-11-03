import React, { useEffect } from "react";
import { Container, Logo, TextLogo, VerLogo } from "./style/splash.style";
import LogoSource from "../../assets/images/splashteo.png";
import Ver from "../../assets/images/ver.png";
import { SpaceH } from "../../components/space";
import Storage from "../../utils/storeData/index";
import httpCommon from "../../utils/http-common";
import { navigationStatic } from "../../utils/main";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import { Video } from 'expo-av';
import { LogBox } from 'react-native';

export default function SplashScreen({ navigation }) {
  navigationStatic.navigation = navigation;
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
    setTimeout(() => {
      
      navigation.navigate("SplashNumberScreen");
    }, 7000);

    return;
  }, []);

 

    const video = React.useRef(null);
    const secondVideo = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [statusSecondVideo, setStatusSecondVideo] = React.useState({});
  
    return (
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={require('../../assets/video/publityf.mp4')}
          resizeMode="stretch"
          shouldPlay 
          isPlaying
          onPlaybackStatusUpdate={setStatus}
        />
        
        <StatusBar style="auto" />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      flex: 1,
      alignSelf: 'stretch'
    },
    buttons: {
      margin: 16
    }
  });
    
