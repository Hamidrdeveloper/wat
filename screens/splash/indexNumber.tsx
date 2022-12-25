import React, { useContext, useEffect } from "react";
import { Container, Logo, TextLogo, VerLogo } from "./style/splash.style";
import LogoSource from "../../assets/images/splashteo.png";
import Ver from "../../assets/images/ver.png";
import { SpaceH } from "../../components/space";
import Storage from "../../utils/storeData/index";
import httpCommon from "../../utils/http-common";
import { Langue, navigationStatic } from "../../utils/main";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Image, Text } from "react-native";
import { Video } from "expo-av";
import { ObjectContext } from "../../service/object/Object.context";
import { LogBox } from 'react-native';

export default function SplashNumberScreen({ navigation }) {
  const { numberCompany, setLanObject,baseDataFc } = useContext(ObjectContext);
  useEffect(() => {
    // Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();
    navigationStatic.navigation = navigation;
    setLanObject("en");
    Langue.lan= "en";
    setTimeout(() => {
      baseDataFc();
      Storage.retrieveData("User").then((res) => {
        console.log("retrieveData", res);

        if (res == null) {
          navigation.navigate("SignIn");
        } else {
          httpCommon.defaults.headers.common.Authorization = `Bearer ${res}`;
          Storage.retrieveData("lan").then((res) => {
            if(res!=null){
              Langue.lan = res;
              setLanObject(res);
            }
           
          });
          navigation.navigate("Root");
        }
      });
    }, 4000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={{ width: `100%`, height: `100%` }}
        source={require("../../assets/images/frankfurt-city-skyline-skyscraper.png")}
      />

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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  buttons: {
    margin: 16,
  },
});
