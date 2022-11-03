import 'react-native-gesture-handler';
import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Callout, Marker, MAP_TYPES, Polygon, Geojson, Polyline } from "react-native-maps";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import {
  Svg,
  Image as ImageSvg,
  Defs,
  ClipPath,
  Circle,
  Rect,
} from "react-native-svg";
import Mark from "../../assets/images/markT.png";
import Home from "../../assets/images/homeOne.png";
import WebView from "react-native-webview";
import { SpaceH, SpaceW } from "../../components/space";
import styled from "styled-components/native";
import * as Location from "expo-location";
import frame from "../../assets/images/frame.png";
import filterIcon from "../../assets/images/filterIcon.png";
import searchIcon from "../../assets/images/search_normal.png";
import addMap from "../../assets/images/addMap.png";
import findMe from "../../assets/images/findMe.png";
import nullImage from "../../assets/images/nullImage.png";
import AppLoading from "expo-app-loading";

import MapSearching from "./searchOnMap";
import { MapContext } from "../../service/map/Map.context";
import Navigation from "../../navigation";
import { ProfileContext } from "../../service/profile/Profile.context";
import { ObjectContext } from "../../service/object/Object.context";
const Shadow = styled.View`
  background: rgba(0, 0, 0, 0.2);

  height: 100%;
`;
const PopUp = styled.View`
  background: #ffffff;
  border-radius: 16px;
  height: 45%;
  margin-top: auto;
  padding-left: 25;
`;
const TextFilter = styled.Text`

  font-family: "Hurme";
  font-style: normal;

  font-size: 20px;

  /* identical to box height, or 120% */
  display: flex;
  align-items: center;

  /* Gray/700 */
  color: #445a74;
`;
const TextFilterCheckBox = styled.Text`

  font-family: "Hurme";
  font-style: normal;

  font-size: 17px;

  /* identical to box height, or 120% */
  display: flex;
  align-items: center;

  /* Gray/700 */
  color: #445a74;
`;
const Click = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  top: 25px;
  width: 50px;
  height: 50px;
`;
const ClickDelete = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 48px;

  background: #0133aa;
  border-radius: 8px;
`;
const TextButtonDelete = styled.Text`
  font-family: "Hurme";
  font-style: normal;

  font-size: 18px;

  /* identical to box height, or 133% */
  text-align: center;

  /* Gray/0 */
  color: #ffffff;
`;
const ImageFrm = styled.Image`
  width: 50px;
  height: 50px;
`;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTwo: {
    width: width - 90,
    height: 150,
    backgroundColor: "#fff",
  },
  map: {
    height: "100%",
  },
  // Callout bubble
  bubbleC: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: width - 40,
    height: 260,
  },
  bubble: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: width - 40,
    height: 260,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },

  // Character name
  name: {
    fontSize: 18,
    color: "#003E77",
    fontFamily: "Hurme",
    width:120
  },
  nameTitle: {
    fontSize: 16,
    fontFamily: "Hurme",
    color: "#7B93AF",
    width:120
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
});
const customHTML = (image) =>
  `
  <html>
<body>
<img src=${findMe} alt="Paris" style="width:80%;height:80%; border-radius: 30px;">
</body>
</html>`;
const Header = styled.View`
  width: 100%;
  height: 64px;
  left: 0px;
  flex-direction: row;
  background: #0133aa;
  align-items: center;
  justify-content: center;
`;
const Label = styled.Text`
  font-size: 18px;

  /* identical to box height, or 133% */
  display: flex;
  align-items: center;
  text-align: center;
  font-family: "Hurme";

  color: #ffffff;
`;
const TouchSort = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 20px;
`;
const IconRight = styled.Image`
  width: 24px;
  height: 24px;
`;
const IconLeft = styled.Image`
  width: 24px;
  height: 24px;
`;
const TouchSortLeft = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: 20px;
`;
const ViewBottomMap = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 48px;
  height: 104px;
  left: 24px;
  bottom: 30px;
`;
const ImageBottomMap = styled.Image`
  width: 48px;
  height: 48px;
`;
import { useFonts } from "expo-font";
import Menu from './menu';
import MenuTwo from './menuTwo';
import Animations from './anmition';
import AnimationsTwo from './AnimationsTwo';
let latOld ="";
let lngOld ="";
export default function MapScreen({ navigation }) {
  const [modelVisible, setModelVisible] = useState(false);
  const [modelVisibleSearch, setModelVisibleSearch] = useState(false);
  const [isPicture, setPicture] = useState(false);
  const [unPicture, setUnPicture] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openObject, setOpenObject] = useState(false);
  const [typeList, setTypeList] = useState(false);

  
  const [isLoadingComplete] = useFonts({
    Hurme: require("../../assets/fonts/LeagueGothic-Regular.ttf"),
  });
  const [location, setLocation] = useState({latitude:48.49213981185477,longitude: 11.405534230960301});
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the LOCATION");
      } else {
        console.log("LOCATION permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      mapRef?.current?.getCamera().then((cam) => {
        cam.center.latitude= 48.142211870984006;
        cam.center.longitude= 11.58264004828484;
        cam.zoom += 2;
        mapRef?.current?.animateCamera(cam);
      });
    }, 2000);
    
    requestCameraPermission();

    return;
  }, []);
  const ModalFilter = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modelVisible}
        onRequestClose={() => {
          setModelVisible(false);
        }}
      >
        <Shadow>
          <PopUp>
            <SpaceH space={30} />
            <TextFilter>Filter object on map</TextFilter>
            <SpaceH space={30} />
            <View style={{ flexDirection: "row" }}>
              {unPicture ? (
                <TouchableOpacity
                  onPress={() => setUnPicture(!unPicture)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0,
                      borderRadius: 7,
                      width: 20,
                      height: 20,
                      backgroundColor: "#0133aa",
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setUnPicture(!unPicture)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                  }}
                />
              )}
              <SpaceW space={15} />
              <TextFilterCheckBox>Pictured</TextFilterCheckBox>
            </View>
            <SpaceH space={20} />
            <View style={{ flexDirection: "row" }}>
              {isPicture ? (
                <TouchableOpacity
                  onPress={() => setPicture(!isPicture)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0,
                      borderRadius: 7,
                      width: 20,
                      height: 20,
                      backgroundColor: "#0133aa",
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setPicture(!isPicture)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                  }}
                />
              )}
              <SpaceW space={15} />
              <TextFilterCheckBox>Unpictured</TextFilterCheckBox>
            </View>
            <SpaceH space={40} />
            <View style={{ flexDirection: "row" }}>
              <ClickDelete
                onPress={() => {
                  setModelVisible(false);
                }}
              >
                <TextButtonDelete>{"Done"}</TextButtonDelete>
                <SpaceW space={15} />
                {/* <IconSrc source={IconDelete}/> */}
              </ClickDelete>
            </View>

            <Click
              onPress={() => {
                setModelVisible(false);
              }}
            >
              <ImageFrm source={frame} />
            </Click>
          </PopUp>
        </Shadow>
      </Modal>
    );
  };
  const mapRef = useRef(null);
  function watchLocation() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let gps = await Location.getCurrentPositionAsync({});
      setLocation(gps.coords);
      let r = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    };
    
      mapRef?.current?.getCamera().then((cam) => {
        cam.center.latitude= gps.coords.latitude;
        cam.center.longitude= gps.coords.longitude;
        cam.zoom += 8;
        mapRef?.current?.animateCamera(cam);
      });

   
      // mapRef.current?.animateToRegion(
      //   {
      //     latitude:  gps.coords.latitude,
      //     longitude: gps.coords.longitude,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   },
      //   2000
      // )
      
    })();
  }
  const myPlace = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [64.165329, 48.844287],
        }
      }
    ]
  };
 
  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <>
        <ModalFilter />
        <MapSearching
          navigation={navigation}
          show={modelVisibleSearch}
          onChangeBack={() => {
            setModelVisibleSearch(false);
          }}
        />
      
        {/* <MenuTwo/> */}
        <Animations open={openMenu} openObject={()=> {
          setTypeList(true)
          setOpenObject(true)}}/>
        <AnimationsTwo open={openObject}onChange={()=>{
         setTypeList(false)
         setOpenObject(false)
         setOpenMenu(false)
         }} type={typeList} navigation={navigation}/>
      
      </>
    );
  }
}
