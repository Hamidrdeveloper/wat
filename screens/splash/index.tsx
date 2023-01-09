import React, { useContext, useEffect } from "react";
import { Container, Logo, TextLogo, VerLogo } from "./style/splash.style";
import LogoSource from "../../assets/images/splashteo.png";
import Ver from "../../assets/images/ver.png";
import { SpaceH } from "../../components/space";
import Storage from "../../utils/storeData/index";
import httpCommon from "../../utils/http-common";
import { Langue, navigationStatic } from "../../utils/main";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import { LogBox } from 'react-native';
import { ObjectContext } from "../../service/object/Object.context";

export default function SplashScreen({ navigation }) {
  navigationStatic.navigation = navigation;
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
    setTimeout(() => {
      
      navigationStatic.navigation = navigation;
    setLanObject("en");
    Langue.lan= "en";
    setTimeout(() => {
      baseDataFc();
      Storage.retrieveData("User").then((res) => {
        console.log("retrieveData", res);

        if (res != null) {
          navigation.navigate("SignIn");
        } else {
          httpCommon.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsdWIiOiIxZDZkNGY2Zi1hNDYzLTQwMDYtODQ0Yy00YmJlMzdmMzdmOTIiLCJzdWIiOiJiYWU1ZTJmNi02MDAzLTQ3NDItYTU1ZS00N2QyMDRhY2UxMjciLCJpYXQiOjE2NzIxOTI3NzksImV4cCI6MTY3NDc4NDc3OSwiaXNzIjoid3d3LnB1YmxpdHkuY29tIn0.-pcwb-wwG7fYCkmSN_EeUi9292ZTjyZgLi2Uohs8Yus`;
          Storage.retrieveData("lan").then((res) => {
            if(res!=null){
              Langue.lan = res;
              setLanObject(res);
            }
           
          });
          navigation.navigate("Root");
        }
      });
    }, 2000);
    }, 7000);

    return;
  }, []);

 

    const video = React.useRef(null);
    const secondVideo = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [statusSecondVideo, setStatusSecondVideo] = React.useState({});
    const { numberCompany, setLanObject,baseDataFc } = useContext(ObjectContext);

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
          <View
        style={{
          position: "absolute",
          top: 150,
          width: `100%`,
          height: 200,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Image
        resizeMode="contain"
        style={{ width: `100%`, height: `100%` }}
        source={require("../../assets/images/publity_logo_blue.png")}
      />
        </View>
         <View
        style={{
          position: "absolute",
          bottom: 150,
          width: `100%`,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff", fontSize: 70 }}>
            {numberCompany?.objectCount}
          </Text>
          <Text style={{ color: "#fff", fontSize: 15 }}>{"Object Count"}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff", fontSize: 70 }}>
            {numberCompany?.totalArea}
          </Text>
          <Text style={{ color: "#fff", fontSize: 15 }}>{"Total Area"}</Text>
        </View>
      </View>
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
    
